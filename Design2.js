class MemoryMatchMania {
  constructor() {
    this.difficulty = "medium";
    this.theme = "animals";

    this.moves = 0;
    this.matches = 0;
    this.time = 0;
    this.timer = null;

    this.cards = [];
    this.flippedIndexes = [];

    this.pairsByDifficulty = {
      easy: 6,
      medium: 8,
      hard: 10
    };

    this.animals = ["🐶","🐱","🐻","🦊","🐼","🐯","🐸","🦁","🐰","🐨"];
    this.nature  = ["🌈","🌲","🌻","🍄","🌙","⭐","🌊","🌸","☀️","🌵"];

    this.mount();
  }

  mount() {
    const app = document.getElementById("app");
    if (!app) return;

    clearInterval(this.timer);
    this.timer = null;

    app.innerHTML = this.renderSetup();
    this.bindSetupEvents();
  }

  renderSetup() {
    return `
      <section class="setup-screen">
        <div class="logo">🃏</div>

        <h1 class="title">
          Memory Match<br />
          <span class="accent">Mania</span>
        </h1>
        <p class="subtitle">Flip cards • Find pairs • Beat your score</p>

        <div class="section-title">DIFFICULTY</div>
        <div class="difficulty-row">
          ${this.renderDifficultyCard("easy", "Easy", "6 pairs • 4×3 grid")}
          ${this.renderDifficultyCard("medium", "Medium", "8 pairs • 4×4 grid")}
          ${this.renderDifficultyCard("hard", "Hard", "10 pairs • 5×4 grid")}
        </div>

        <div class="section-title">THEME</div>
        <div class="theme-row">
          ${this.renderThemeCard("animals", "🐾", "Animals")}
          ${this.renderThemeCard("nature", "🌿", "Nature")}
        </div>

        ${this.renderPreview()}

        <button id="startBtn" class="primary-btn">▷ Start Game</button>
      </section>
    `;
  }

  renderDifficultyCard(value, label, desc) {
    const active = this.difficulty === value ? "active" : "";
    return `
      <button class="card-option difficulty ${active}" data-difficulty="${value}">
        <h3>${label}</h3>
        <p>${desc}</p>
      </button>
    `;
  }

  renderThemeCard(value, emoji, label) {
    const active = this.theme === value ? "active" : "";
    return `
      <button class="card-option theme-btn ${active}" data-theme="${value}">
        <span>${emoji}</span>
        <span>${label}</span>
      </button>
    `;
  }

  renderPreview() {
    const icons = this.theme === "animals" ? this.animals : this.nature;
    const shown = icons.slice(0, 5);

    return `
      <div class="preview">
        ${shown.map(i => `<div class="preview-card">${i}</div>`).join("")}
        <div class="preview-card">+${Math.max(this.pairsByDifficulty[this.difficulty]-5, 1)}</div>
      </div>
    `;
  }

  bindSetupEvents() {
    const difficultyButtons = document.querySelectorAll("[data-difficulty]");
    const themeButtons = document.querySelectorAll("[data-theme]");
    const startBtn = document.getElementById("startBtn");

    difficultyButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        this.difficulty = btn.dataset.difficulty;
        this.mount();
      });
    });

    themeButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        this.theme = btn.dataset.theme;
        this.mount();
      });
    });

    startBtn?.addEventListener("click", () => this.startGame());
  }

  buildDeck() {
    const pairCount = this.pairsByDifficulty[this.difficulty];
    const source = this.theme === "animals" ? this.animals : this.nature;
    const selectedIcons = source.slice(0, pairCount);

    return [...selectedIcons, ...selectedIcons]
      .map((icon, i) => ({
        id: i,
        icon,
        flipped: false,
        matched: false
      }))
      .sort(() => Math.random() - 0.5);
  }

  startGame() {
    this.moves = 0;
    this.matches = 0;
    this.time = 0;
    this.flippedIndexes = [];

    this.cards = this.buildDeck();

    const app = document.getElementById("app");
    app.innerHTML = this.renderGame();

    this.bindGameEvents();
    this.startTimer();
    this.updateHUD();
  }

  resetCurrentGame() {
    this.moves = 0;
    this.matches = 0;
    this.time = 0;
    this.flippedIndexes = [];

    this.cards = this.buildDeck();
    this.renderBoard();
    this.updateHUD();

    this.startTimer();
  }

  renderGame() {
    const cols = this.difficulty === "hard" ? 5 : 4;

    return `
      <section class="game-screen">
        <header class="top-bar">
          <button class="icon-btn" id="homeBtn" title="Back to Home" aria-label="Back to Home">⌂</button>

          <div class="top-stats">
            <span class="stat-item moves">⚡ <strong id="moveCounter">0</strong> moves</span>
            <span class="stat-item time">◔ <strong id="timeCounter">0:00</strong></span>
            <span class="stat-item matches">🏆 <strong id="matchCounter">0/${this.pairsByDifficulty[this.difficulty]}</strong></span>
          </div>

          <button class="icon-btn" id="resetBtn" title="Reset Game" aria-label="Reset Game">↻</button>
        </header>

        <div class="progress-wrap">
          <div id="progressBar" class="progress-bar"></div>
        </div>

        <main id="board" class="board" style="grid-template-columns:repeat(${cols},1fr)">
          ${this.cards.map((card, index) => `
            <button class="memory-card" data-index="${index}">M</button>
          `).join("")}
        </main>
      </section>
    `;
  }

  bindGameEvents() {
    const board = document.getElementById("board");
    const homeBtn = document.getElementById("homeBtn");
    const resetBtn = document.getElementById("resetBtn");

    if (board) {
      board.addEventListener("click", (e) => {
        const btn = e.target.closest(".memory-card");
        if (!btn) return;

        const index = Number(btn.dataset.index);
        this.flipCard(index);
      });
    }

    homeBtn?.addEventListener("click", () => {
      this.mount();
    });

    resetBtn?.addEventListener("click", () => {
      this.resetCurrentGame();
    });
  }

  flipCard(index) {
    const card = this.cards[index];
    if (!card || card.flipped || card.matched) return;
    if (this.flippedIndexes.length === 2) return;

    card.flipped = true;
    this.flippedIndexes.push(index);
    this.renderBoard();

    if (this.flippedIndexes.length === 2) {
      this.moves++;
      this.updateHUD();

      const [a, b] = this.flippedIndexes;
      const first = this.cards[a];
      const second = this.cards[b];

      if (first.icon === second.icon) {
        first.matched = true;
        second.matched = true;
        this.matches++;
        this.flippedIndexes = [];
        this.updateHUD();

        if (this.matches === this.pairsByDifficulty[this.difficulty]) {
          clearInterval(this.timer);
          setTimeout(() => this.showWinScreen(), 350);
        }
      } else {
        setTimeout(() => {
          first.flipped = false;
          second.flipped = false;
          this.flippedIndexes = [];
          this.renderBoard();
        }, 800);
      }
    }
  }

  renderBoard() {
    const board = document.getElementById("board");
    if (!board) return;

    board.innerHTML = this.cards.map((card, index) => {
      const visible = card.flipped || card.matched;
      const classes = [
        "memory-card",
        card.flipped ? "flipped" : "",
        card.matched ? "matched" : ""
      ].join(" ");

      return `
        <button class="${classes}" data-index="${index}">
          ${visible ? card.icon : "M"}
        </button>
      `;
    }).join("");
  }

  startTimer() {
    clearInterval(this.timer);
    this.timer = setInterval(() => {
      this.time++;
      this.updateHUD();
    }, 1000);
  }

  formatTime(totalSec) {
    const m = Math.floor(totalSec / 60);
    const s = totalSec % 60;
    return `${m}:${String(s).padStart(2, "0")}`;
  }

  updateHUD() {
    const moveEl = document.getElementById("moveCounter");
    const timeEl = document.getElementById("timeCounter");
    const matchEl = document.getElementById("matchCounter");
    const progress = document.getElementById("progressBar");

    if (moveEl) moveEl.textContent = String(this.moves);
    if (timeEl) timeEl.textContent = this.formatTime(this.time);
    if (matchEl) matchEl.textContent = `${this.matches}/${this.pairsByDifficulty[this.difficulty]}`;

    if (progress) {
      const pct = (this.matches / this.pairsByDifficulty[this.difficulty]) * 100;
      progress.style.width = `${pct}%`;
    }
  }

  showWinScreen() {
    const app = document.getElementById("app");
    app.innerHTML = `
      <section class="win-screen">
        <div class="win-icon">🎉</div>
        <h1 class="win-title">You Won!</h1>
        <p class="win-sub">${this.capitalize(this.difficulty)} · ${this.theme}</p>

        <div class="stars">${this.getStars()}</div>

        <div class="stats">
          <div class="stat">
            <div class="label">⚡ Moves</div>
            <div class="value">${this.moves}</div>
          </div>
          <div class="stat">
            <div class="label">🕒 Time</div>
            <div class="value">${this.formatTime(this.time)}</div>
          </div>
        </div>

        <p class="message">👏 Great job! A few more tries and you'll be perfect.</p>

        <button id="playAgainBtn" class="primary-btn">↻ Play Again</button>
        <button id="newSetupBtn" class="secondary-btn">New Game Setup</button>
      </section>
    `;

    document.getElementById("playAgainBtn")?.addEventListener("click", () => this.startGame());
    document.getElementById("newSetupBtn")?.addEventListener("click", () => {
      clearInterval(this.timer);
      this.mount();
    });
  }

  getStars() {
    if (this.moves <= this.pairsByDifficulty[this.difficulty] + 2) return "⭐⭐⭐";
    if (this.moves <= this.pairsByDifficulty[this.difficulty] + 6) return "⭐⭐";
    return "⭐";
  }

  capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  window.app = new MemoryMatchMania();
});
