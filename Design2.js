class MemoryMatchMania {

    constructor() {

        this.difficulty = "easy";
        this.theme = "animals";

        this.cards = [];
        this.flippedCards = [];

        this.moves = 0;
        this.matches = 0;
        this.time = 0;
        this.timer = null;

        this.init();
    }

    init() {
        this.injectStyles();
        this.renderHTML();
        this.setupEventListeners();
    }

    injectStyles() {
        // all CSS
    }

    renderHTML() {
        document.body.innerHTML = `
            ${this.renderHero()}
            ${this.renderSetupScreen()}
            ${this.renderGameArea()}
            ${this.renderWinScreen()}
        `;
    }

    renderHero() {
        return `
            <section class="hero">
                <h1>Memory Match Mania</h1>
                <p>Train your memory through exciting challenges.</p>
            </section>
        `;
    }

    renderSetupScreen() {
        return `
            <section class="setup">
                <h2>Select Difficulty</h2>

                <button onclick="window.app.selectDifficulty('easy')">
                    Easy
                </button>

                <button onclick="window.app.selectDifficulty('medium')">
                    Medium
                </button>

                <button onclick="window.app.selectDifficulty('hard')">
                    Hard
                </button>

                <h2>Select Theme</h2>

                <button onclick="window.app.selectTheme('animals')">
                    Animals
                </button>

                <button onclick="window.app.selectTheme('nature')">
                    Nature
                </button>

                <button onclick="window.app.startGame()">
                    Start Game
                </button>
            </section>
        `;
    }

    renderGameArea() {
        return `
            <section id="gameArea" class="hidden">

                <div class="game-header">

                    <div>
                        Moves:
                        <span id="moveCounter">0</span>
                    </div>

                    <div>
                        Time:
                        <span id="timer">0</span>s
                    </div>

                </div>

                <div class="progress-container">
                    <div id="progressBar"></div>
                </div>

                <div id="gameBoard"></div>

            </section>
        `;
    }

    renderWinScreen() {
        return `
            <section id="winScreen" class="hidden">

                <h2>Congratulations!</h2>

                <p id="finalStats"></p>

                <button onclick="window.app.restartGame()">
                    Play Again
                </button>

            </section>
        `;
    }

    startGame() {

        document
            .querySelector(".setup")
            .classList.add("hidden");

        document
            .getElementById("gameArea")
            .classList.remove("hidden");

        this.createBoard();

        this.startTimer();
    }

    createBoard() {

        let symbols;

        if (this.theme === "animals") {

            symbols = [
                "🐶","🐱","🐼",
                "🐸","🦁","🐻",
                "🐰","🦊"
            ];

        } else {

            symbols = [
                "🌸","🌲","🌙",
                "⭐","🌊","☀️",
                "🍄","🌈"
            ];
        }

        let pairCount = 6;

        if (this.difficulty === "medium") {
            pairCount = 8;
        }

        if (this.difficulty === "hard") {
            pairCount = 10;
        }

        let chosen = symbols.slice(0, pairCount);

        let deck = [...chosen, ...chosen];

        deck.sort(() => Math.random() - 0.5);

        this.cards = deck;

        const board =
            document.getElementById("gameBoard");

        board.innerHTML = "";

        deck.forEach((symbol, index) => {

            board.innerHTML += `
                <div
                    class="card"
                    data-index="${index}"
                    onclick="window.app.flipCard(${index})"
                >
                    ?
                </div>
            `;
        });
    }

    flipCard(index) {

        const card =
            document.querySelector(
                '[data-index="' + index + '"]'
            );

        if (
            card.classList.contains("matched")
        ) {
            return;
        }

        if (
            this.flippedCards.length >= 2
        ) {
            return;
        }

        card.textContent =
            this.cards[index];

        this.flippedCards.push({
            index,
            value: this.cards[index]
        });

        if (
            this.flippedCards.length === 2
        ) {

            this.moves++;

            document.getElementById(
                "moveCounter"
            ).textContent = this.moves;

            this.checkMatch();
        }
    }

    checkMatch() {

        const first =
            this.flippedCards[0];

        const second =
            this.flippedCards[1];

        if (
            first.value === second.value
        ) {

            document
                .querySelector(
                    '[data-index="' +
                    first.index +
                    '"]'
                )
                .classList.add("matched");

            document
                .querySelector(
                    '[data-index="' +
                    second.index +
                    '"]'
                )
                .classList.add("matched");

            this.matches++;

            this.updateProgress();

            this.flippedCards = [];

            this.checkWin();

        } else {

            setTimeout(() => {

                document.querySelector(
                    '[data-index="' +
                    first.index +
                    '"]'
                ).textContent = "?";

                document.querySelector(
                    '[data-index="' +
                    second.index +
                    '"]'
                ).textContent = "?";

                this.flippedCards = [];

            }, 800);
        }
    }

    updateProgress() {

        let totalPairs = 6;

        if (this.difficulty === "medium") {
            totalPairs = 8;
        }

        if (this.difficulty === "hard") {
            totalPairs = 10;
        }

        const percentage =
            (this.matches / totalPairs) * 100;

        document.getElementById(
            "progressBar"
        ).style.width =
            percentage + "%";
    }

    startTimer() {

        this.timer = setInterval(() => {

            this.time++;

            document.getElementById(
                "timer"
            ).textContent =
                this.time;

        }, 1000);
    }

    checkWin() {

        let totalPairs = 6;

        if (this.difficulty === "medium") {
            totalPairs = 8;
        }

        if (this.difficulty === "hard") {
            totalPairs = 10;
        }

        if (
            this.matches === totalPairs
        ) {

            clearInterval(this.timer);

            document
                .getElementById("gameArea")
                .classList.add("hidden");

            document
                .getElementById("winScreen")
                .classList.remove("hidden");

            document.getElementById(
                "finalStats"
            ).textContent =
                "Completed in " +
                this.moves +
                " moves and " +
                this.time +
                " seconds.";
        }
    }

    restartGame() {
        location.reload();
    }

    selectDifficulty(level) {
        this.difficulty = level;
    }

    selectTheme(theme) {
        this.theme = theme;
    }

    setupEventListeners() {}
}

document.addEventListener(
    "DOMContentLoaded",
    () => {
        window.app =
            new MemoryMatchMania();
    }
);
