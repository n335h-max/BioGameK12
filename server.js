const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');
const QUESTIONS = require('./questions');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

const PORT = process.env.PORT || 3001;
const TOTAL_GROUPS = 9;
const QUESTION_TIME = 10; // seconds per question

let questionTimer = null;
let timerSecondsLeft = 0;

function clearQuestionTimer() {
  if (questionTimer) { clearInterval(questionTimer); questionTimer = null; }
  timerSecondsLeft = 0;
}

function startQuestionTimer() {
  clearQuestionTimer();
  timerSecondsLeft = QUESTION_TIME;
  io.emit('timer:tick', { seconds: timerSecondsLeft });
  questionTimer = setInterval(() => {
    timerSecondsLeft--;
    io.emit('timer:tick', { seconds: timerSecondsLeft });
    if (timerSecondsLeft <= 0) {
      clearQuestionTimer();
      // Auto-reveal if still in question phase
      if (state.phase === 'question') {
        const q = QUESTIONS[state.questionIndex];
        const { winner, tally } = calcMajority(state.votes);
        state.voteCount = tally;
        state.majorityAnswer = winner || null;
        state.correct = winner === q.correct;
        let delta = state.correct ? +10 : -15;
        state.health = Math.max(0, Math.min(100, state.health + delta));
        state.healthDelta = delta;
        if (state.correct) state.score.correct++; else state.score.wrong++;
        state.phase = 'revealed';
        broadcast();
      }
    }
  }, 1000);
}

// ── Milestone break points: milestone screen shown AFTER these question indices ─
// 3 | 2 | 3 | 2  questions per milestone  →  breaks at Q3, Q5, Q8, Q10
const MILESTONE_BREAKS = [3, 5, 8, 10];

// ── Initial game state ────────────────────────────────────────────────────────
function freshState() {
  return {
    phase: 'lobby',      // lobby | question | revealed | milestone | gameover
    questionIndex: 0,
    votes: {},           // { groupId: 'A'|'B'|'C'|'D' }
    voteCount: { A: 0, B: 0, C: 0, D: 0 },
    majorityAnswer: null,
    correct: false,
    health: 100,
    stage: 0,            // 0-4
    milestonesCompleted: 0,
    score: { correct: 0, wrong: 0 },
    revealedAt: null,
  };
}

let state = freshState();

// ── Majority vote logic ───────────────────────────────────────────────────────
function calcMajority(voteMap) {
  const tally = { A: 0, B: 0, C: 0, D: 0 };
  Object.values(voteMap).forEach(v => { if (tally[v] !== undefined) tally[v]++; });
  let winner = null;
  let maxVotes = 0;
  for (const [opt, count] of Object.entries(tally)) {
    if (count > maxVotes || (count === maxVotes && winner !== null && opt < winner)) {
      maxVotes = count;
      winner = opt;
    }
  }
  return { winner, tally };
}

// ── Build public state (what gets sent to clients) ────────────────────────────
function publicState() {
  const q = QUESTIONS[state.questionIndex] || null;
  return {
    phase: state.phase,
    questionIndex: state.questionIndex,
    totalQuestions: QUESTIONS.length,
    question: q ? { text: q.text, options: q.options, milestone: q.milestone, milestoneLabel: q.milestoneLabel } : null,
    correctAnswer: state.phase === 'revealed' || state.phase === 'milestone' || state.phase === 'gameover'
      ? (q ? q.correct : null) : null,
    voteCount: state.voteCount,
    groupsVoted: Object.keys(state.votes).length,
    groupVotes: state.votes,   // { "1": "C", "3": "A", … }
    majorityAnswer: state.majorityAnswer,
    correct: state.correct,
    health: state.health,
    stage: state.stage,
    score: state.score,
    healthDelta: state.healthDelta || 0,
    milestonesCompleted: state.milestonesCompleted,
    myVote: null, // filled per-client on vote.html
  };
}

function broadcast() {
  io.emit('state:update', publicState());
}

// ── Static files ──────────────────────────────────────────────────────────────
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => res.redirect('/display.html'));

// ── Socket events ─────────────────────────────────────────────────────────────
io.on('connection', (socket) => {
  // Send current state immediately on connect
  const ps = publicState();
  // Also send their personal vote if they reconnect
  socket.emit('state:update', ps);

  // Host: start the game
  socket.on('host:start', () => {
    state = freshState();
    state.phase = 'question';
    broadcast();
    startQuestionTimer();
  });

  // Host: reset to lobby
  socket.on('host:reset', () => {
    clearQuestionTimer();
    io.emit('timer:tick', { seconds: 0 });
    state = freshState();
    broadcast();
  });

  // Group: submit vote
  socket.on('group:vote', ({ groupId, answer }) => {
    if (state.phase !== 'question') return;
    if (!['A', 'B', 'C', 'D'].includes(answer)) return;
    const gid = String(groupId);
    if (state.votes[gid]) return; // already voted

    state.votes[gid] = answer;
    // Recalculate tally
    const { tally } = calcMajority(state.votes);
    state.voteCount = tally;
    broadcast();

    // Send the voter their personal confirmation
    socket.emit('vote:confirmed', { groupId: gid, answer });
  });

  // Host: reveal answer
  socket.on('host:reveal', () => {
    if (state.phase !== 'question') return;
    clearQuestionTimer();
    io.emit('timer:tick', { seconds: 0 });

    const q = QUESTIONS[state.questionIndex];
    const { winner, tally } = calcMajority(state.votes);
    state.voteCount = tally;
    state.majorityAnswer = winner || null;
    state.correct = winner === q.correct;

    let delta = 0;
    if (state.correct) {
      delta = +10;
      state.score.correct++;
    } else {
      delta = -15;
      state.score.wrong++;
    }
    state.health = Math.max(0, Math.min(100, state.health + delta));
    state.healthDelta = delta;
    state.phase = 'revealed';
    broadcast();
  });

  // Host: next question / advance
  socket.on('host:next', () => {
    if (state.phase !== 'revealed' && state.phase !== 'milestone') return;

    const nextIndex = state.questionIndex + 1;

    // Check if we just finished a milestone group (every 5 questions)
    if (state.phase === 'revealed' && MILESTONE_BREAKS.includes(nextIndex)) {
      state.milestonesCompleted++;
      state.stage = Math.min(4, state.milestonesCompleted);
      state.phase = 'milestone';
      state.questionIndex = nextIndex;
      state.votes = {};
      state.voteCount = { A: 0, B: 0, C: 0, D: 0 };
      state.healthDelta = 0;
      state.majorityAnswer = null;
      broadcast();
      return;
    }

    if (nextIndex >= QUESTIONS.length) {
      state.phase = 'gameover';
      state.stage = 4;
      broadcast();
      return;
    }

    state.questionIndex = nextIndex;
    state.votes = {};
    state.voteCount = { A: 0, B: 0, C: 0, D: 0 };
    state.phase = 'question';
    state.majorityAnswer = null;
    state.healthDelta = 0;
    broadcast();
    startQuestionTimer();
  });

  // Host: continue from milestone screen
  socket.on('host:milestone:continue', () => {
    if (state.phase !== 'milestone') return;
    if (state.questionIndex >= QUESTIONS.length) {
      state.phase = 'gameover';
      broadcast();
      return;
    }
    state.phase = 'question';
    broadcast();
    startQuestionTimer();
  });
});

server.listen(PORT, () => {
  console.log(`\n🧬 BioGame server running!`);
  console.log(`   Host display : http://localhost:${PORT}/display.html`);
  console.log(`   Group voting : http://localhost:${PORT}/vote.html`);
  console.log(`   Press Ctrl+C to stop.\n`);
});
