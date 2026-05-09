// All 20 questions, grouped by milestone
const QUESTIONS = [
  // ── MILESTONE 1: Fertilization (Section 13.3) ────────────────────────────
  {
    milestone: 1,
    milestoneLabel: "Milestone 1 – Fertilization",
    text: "A sperm is swimming toward the egg. Which part of the sperm contains the mitochondria providing the ATP for the journey?",
    options: { A: "Head", B: "Tail", C: "Middle piece", D: "Acrosome" },
    correct: "C"
  },
  {
    milestone: 1,
    milestoneLabel: "Milestone 1 – Fertilization",
    text: "The sperm reaches the egg's outer layer of adhering follicular cells. What is this layer called?",
    options: { A: "Zona Pellucida", B: "Corona Radiata", C: "Plasma Membrane", D: "Cortical Granules" },
    correct: "B"
  },
  {
    milestone: 1,
    milestoneLabel: "Milestone 1 – Fertilization",
    text: "To penetrate the Zona Pellucida, the sperm releases which specific digestive enzyme?",
    options: { A: "Hyaluronidase", B: "Amylase", C: "Acrosin", D: "Lipase" },
    correct: "C"
  },
  {
    milestone: 1,
    milestoneLabel: "Milestone 1 – Fertilization",
    text: "As soon as one sperm touches the oocyte membrane, the membrane depolarizes immediately. This \"Fast Block\" is meant to prevent what?",
    options: { A: "Meiosis", B: "Polyspermy", C: "Implantation", D: "Gastrulation" },
    correct: "B"
  },
  {
    milestone: 1,
    milestoneLabel: "Milestone 1 – Fertilization",
    text: "In the \"Slow Block,\" Cortical Granules secrete proteases that turn the Zona Pellucida into what?",
    options: { A: "A porous layer", B: "A yolk sac", C: "An impenetrable fertilization membrane", D: "A placenta" },
    correct: "C"
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
  {
    milestone: 2,
    milestoneLabel: "Milestone 2 – Cellular Stages",
    text: "During gastrulation, a pore called the blastopore is created by inward folding. What does this pore eventually become in humans?",
    options: { A: "The mouth", B: "The brain", C: "The heart", D: "The anus" },
    correct: "D"
  },
  {
    milestone: 2,
    milestoneLabel: "Milestone 2 – Cellular Stages",
    text: "Gastrulation is complete when which of the following is formed?",
    options: { A: "The neural tube", B: "The three germ layers", C: "The tail", D: "The 4-chambered heart" },
    correct: "B"
  },
  // ── MILESTONE 3: Tissue & Organ Stages (Section 13.4) ────────────────────
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
  {
    milestone: 3,
    milestoneLabel: "Milestone 3 – Tissue & Organ Formation",
    text: "The inner lining of the digestive and respiratory tracts comes from which layer?",
    options: { A: "Endoderm", B: "Mesoderm", C: "Ectoderm", D: "Somites" },
    correct: "A"
  },
  {
    milestone: 3,
    milestoneLabel: "Milestone 3 – Tissue & Organ Formation",
    text: "During Neurulation, the neural groove becomes a tube. The anterior (front) end of this tube develops into the:",
    options: { A: "Spinal cord", B: "Heart", C: "Brain", D: "Lungs" },
    correct: "C"
  },
  {
    milestone: 3,
    milestoneLabel: "Milestone 3 – Tissue & Organ Formation",
    text: "Somites, which give rise to the vertebrae and axial muscles, are formed from which tissue?",
    options: { A: "Ectoderm", B: "Non-notochord-forming mesoderm", C: "Endoderm", D: "Yolk sac" },
    correct: "B"
  },
  // ── MILESTONE 4: Fetal Development & Birth (Section 13.5) ────────────────
  {
    milestone: 4,
    milestoneLabel: "Milestone 4 – Fetal Development & Birth",
    text: "Which extraembryonic membrane is responsible for gas exchange?",
    options: { A: "Amnion", B: "Yolk sac", C: "Chorion", D: "Allantois" },
    correct: "C"
  },
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
    text: "By the end of which trimester do the organs and organ systems develop to the point where the fetus appears human?",
    options: { A: "Trimester 1", B: "Trimester 2", C: "Trimester 3", D: "The Aging Phase" },
    correct: "B"
  },
  {
    milestone: 4,
    milestoneLabel: "Milestone 4 – Fetal Development & Birth",
    text: "The baby is ready to be born! What is the second stage of parturition (birth)?",
    options: { A: "Dilation of the cervix", B: "Delivery of the placenta", C: "Birth of the baby", D: "Cleavage" },
    correct: "C"
  },
  {
    milestone: 4,
    milestoneLabel: "Milestone 4 – Fetal Development & Birth",
    text: "According to the Human Growth Curve, when does the \"Adolescent Phase\" typically end for males?",
    options: { A: "11 years", B: "16 years", C: "18 years", D: "30 years" },
    correct: "C"
  }
];

module.exports = QUESTIONS;
