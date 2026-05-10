// All 20 questions, grouped by milestone
const QUESTIONS = [
  // ── MILESTONE 1: Fertilization (Section 13.3) ────────────────────────────
  {
    milestone: 1,
    milestoneLabel: "Milestone 1 – Fertilization",
    text: "The foundational step of a new human life occurs when a sperm cell fuses with an ovum (egg). What is the resulting single cell called?",
    options: { A: "Blastocyst", B: "Zygote", C: "Morula", D: "Gastrula" },
    correct: "B"
  },
  {
    milestone: 1,
    milestoneLabel: "Milestone 1 – Fertilization",
    text: "As soon as one sperm touches the oocyte membrane, the membrane depolarizes immediately. This \"Fast Block\" is meant to prevent what?",
    options: { A: "Meiosis", B: "Polyspermy", C: "Implantation", D: "Gastrulation" },
    correct: "B"
  },
  // ── MILESTONE 2: Cellular Stages (Section 13.4) ──────────────────────────
  {
    milestone: 2,
    milestoneLabel: "Milestone 2 – Cellular Stages",
    text: "The zygote begins dividing rapidly without increasing in size. What is this process called?",
    options: { A: "Gastrulation", B: "Neurulation", C: "Cleavage", D: "Parturition" },
    correct: "C"
  },
  {
    milestone: 2,
    milestoneLabel: "Milestone 2 – Cellular Stages",
    text: "The embryo has reached a stage where it is a solid ball of 16–64 cells. What is its name?",
    options: { A: "Blastula", B: "Morula", C: "Gastrula", D: "Neurula" },
    correct: "B"
  },
  {
    milestone: 2,
    milestoneLabel: "Milestone 2 – Cellular Stages",
    text: "When the morula becomes a hollow, fluid-filled ball, it is now called a:",
    options: { A: "Zygote", B: "Blastula/Blastocyst", C: "Somite", D: "Embryo" },
    correct: "B"
  },
  // ── MILESTONE 3: Tissue & Organ Stages (Section 13.4) ────────────────────
  {
    milestone: 3,
    milestoneLabel: "Milestone 3 – Tissue & Organ Formation",
    text: "Gastrulation is complete when which of the following is formed?",
    options: { A: "The neural tube", B: "The three germ layers", C: "The tail", D: "The 4-chambered heart" },
    correct: "B"
  },
  {
    milestone: 3,
    milestoneLabel: "Milestone 3 – Tissue & Organ Formation",
    text: "Your baby needs a nervous system. Which germ layer is responsible for forming the brain and spinal cord?",
    options: { A: "Endoderm", B: "Mesoderm", C: "Ectoderm", D: "Neural Crest" },
    correct: "C"
  },
  {
    milestone: 3,
    milestoneLabel: "Milestone 3 – Tissue & Organ Formation",
    text: "Which layer will form the baby's muscles and skeleton?",
    options: { A: "Ectoderm", B: "Mesoderm", C: "Endoderm", D: "Blastula" },
    correct: "B"
  },
  // ── MILESTONE 4: Fetal Development & Birth (Section 13.5) ────────────────
  {
    milestone: 4,
    milestoneLabel: "Milestone 4 – Fetal Development & Birth",
    text: "The baby is floating in a fluid that protects it from shocks. Which membrane contains this amniotic fluid?",
    options: { A: "Allantois", B: "Chorion", C: "Amnion", D: "Yolk sac" },
    correct: "C"
  },
  {
    milestone: 4,
    milestoneLabel: "Milestone 4 – Fetal Development & Birth",
    text: "The baby is ready to be born! What is the second stage of parturition (birth)?",
    options: { A: "Dilation of the cervix", B: "Delivery of the placenta", C: "Birth of the baby", D: "Cleavage" },
    correct: "C"
  }
];

module.exports = QUESTIONS;
