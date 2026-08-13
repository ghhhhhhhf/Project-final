const startBtn = document.getElementById("startBtn");
const completeBtn = document.getElementById("completeBtn");
const resetBtn = document.getElementById("resetBtn");

const dashboard = document.getElementById("dashboard");

const levelEl = document.getElementById("level");
const xpEl = document.getElementById("xp");
const questsEl = document.getElementById("quests");
const streakEl = document.getElementById("streak");

const progressBar = document.getElementById("progressBar");
const progressText = document.getElementById("progressText");

let data = JSON.parse(
  localStorage.getItem("systemAwakened")
) || {
  level: 1,
  xp: 0,
  quests: 0,
  streak: 0,
  progress: 0
};

function save() {
  localStorage.setItem(
    "systemAwakened",
    JSON.stringify(data)
  );
}

function updateUI() {
  levelEl.textContent = data.level;
  xpEl.textContent = data.xp;
  questsEl.textContent = data.quests;
  streakEl.textContent = data.streak;

  progressBar.style.width = data.progress + "%";
  progressText.textContent =
    data.progress + "% Complete";
}

startBtn.addEventListener("click", () => {
  document.querySelector(".hero").style.display = "none";
  dashboard.classList.remove("hidden");

  updateUI();
});

completeBtn.addEventListener("click", () => {

  if (data.progress < 100) {
    data.progress += 20;
    data.xp += 25;
  }

  if (data.progress >= 100) {

    data.progress = 0;
    data.quests += 1;
    data.streak += 1;
    data.xp += 100;

    if (data.xp >= data.level * 250) {
      data.level += 1;
      data.xp = 0;
    }

    alert(
      "QUEST COMPLETE ⚡\nSYSTEM LEVEL UP!"
    );
  }

  save();
  updateUI();
});

resetBtn.addEventListener("click", () => {

  const confirmReset =
    confirm("Reset SYSTEM progress?");

  if (!confirmReset) return;

  data = {
    level: 1,
    xp: 0,
    quests: 0,
    streak: 0,
    progress: 0
  };

  save();
  updateUI();
});

function createParticles() {

  const container =
    document.getElementById("particles");

  for (let i = 0; i < 35; i++) {

    const particle =
      document.createElement("div");

    particle.className = "particle";

    particle.style.left =
      Math.random() * 100 + "%";

    particle.style.animationDelay =
      Math.random() * 6 + "s";

    particle.style.animationDuration =
      4 + Math.random() * 5 + "s";

    container.appendChild(particle);
  }
}

createParticles();
