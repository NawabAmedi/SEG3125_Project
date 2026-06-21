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
    
        // wait ONE tick so DOM exists
        setTimeout(() => {
            this.setupEventListeners();
        }, 0);
    }

    injectStyles() {
        const style = document.createElement("style");
    
        style.textContent = `
        *{
            margin:0;
            padding:0;
            box-sizing:border-box;
        }
    
        body{
            background:#020d26;
            color:white;
            font-family:Arial, Helvetica, sans-serif;
            min-height:100vh;
        }
    
        .setup-screen{
            max-width:600px;
            margin:auto;
            padding-top:60px;
            text-align:center;
        }
    
        .logo{
            width:80px;
            height:80px;
            margin:auto;
            margin-bottom:30px;
            border-radius:20px;
            background:linear-gradient(135deg,#3182ff,#00d4ff);
            display:flex;
            justify-content:center;
            align-items:center;
            font-size:32px;
        }
    
        h1{
            font-size:72px;
            font-weight:800;
            line-height:1;
            margin-bottom:20px;
        }
    
        .blue{
            color:#2f82ff;
        }
    
        .subtitle{
            color:#7ea4c5;
            margin-bottom:50px;
            font-size:24px;
        }
    
        .section-title{
            text-align:left;
            color:#7ea4c5;
            letter-spacing:2px;
            font-size:14px;
            margin-bottom:15px;
            margin-top:30px;
        }
    
        .difficulty-container{
            display:flex;
            gap:15px;
        }
    
        .difficulty{
            flex:1;
            background:#102344;
            border:2px solid #183766;
            border-radius:18px;
            padding:25px;
            cursor:pointer;
            transition:0.3s;
            text-align:left;
        }
    
        .difficulty:hover{
            border-color:#2f82ff;
        }
    
        .difficulty.active{
            border-color:#2f82ff;
            box-shadow:0 0 20px rgba(47,130,255,.4);
        }
    
        .difficulty h3{
            margin-bottom:10px;
            font-size:28px;
        }
    
        .difficulty p{
            color:#7ea4c5;
        }
    
        .theme-container{
            display:flex;
            gap:15px;
        }
    
        .theme{
            flex:1;
            background:#102344;
            border:2px solid #183766;
            border-radius:18px;
            padding:25px;
            cursor:pointer;
            font-size:26px;
            transition:.3s;
        }
    
        .theme.active{
            border-color:#00d4ff;
            background:#072c39;
        }
    
        .preview{
            display:flex;
            justify-content:center;
            gap:10px;
            margin:40px 0;
        }
    
        .preview-card{
            width:55px;
            height:55px;
            background:#102344;
            border-radius:12px;
            display:flex;
            align-items:center;
            justify-content:center;
            font-size:28px;
        }
    
        .start-btn{
            width:100%;
            border:none;
            border-radius:18px;
            background:linear-gradient(90deg,#2f82ff,#3f5fff);
            color:white;
            font-size:28px;
            padding:22px;
            cursor:pointer;
            font-weight:bold;
            box-shadow:0 10px 25px rgba(47,130,255,.4);
        }
    
        .game-screen{
            display:none;
            min-height:100vh;
        }
    
        .top-bar{
            height:80px;
            border-bottom:1px solid #163763;
            display:flex;
            justify-content:center;
            align-items:center;
            gap:50px;
            font-size:24px;
        }
    
        .progress-container{
            height:5px;
            background:#12264a;
        }
    
        .progress-bar{
            height:100%;
            width:0%;
            background:#00d4ff;
            transition:.3s;
        }
    
        .board{
            display:grid;
            gap:15px;
            width:500px;
            margin:80px auto;
            grid-template-columns:repeat(4,1fr);
        }
    
        .card{
            height:110px;
            background:linear-gradient(180deg,#3872ff,#2555d8);
            border-radius:18px;
            display:flex;
            justify-content:center;
            align-items:center;
            cursor:pointer;
            font-size:40px;
            font-weight:bold;
        }
    
        .card.flipped{
            background:#073f4f;
            border:2px solid #00d4ff;
        }
    
        .win-screen{
            display:none;
            text-align:center;
            padding-top:120px;
        }
    
        .stars{
            font-size:50px;
            color:gold;
            margin:25px 0;
        }
    
        .stat-boxes{
            display:flex;
            justify-content:center;
            gap:20px;
            margin:40px 0;
        }
    
        .stat{
            width:180px;
            background:#102344;
            padding:30px;
            border-radius:18px;
        }
    
        .play-again{
            width:400px;
            max-width:90%;
            border:none;
            background:linear-gradient(90deg,#2f82ff,#3f5fff);
            color:white;
            padding:20px;
            border-radius:18px;
            font-size:24px;
            cursor:pointer;
        }
        `;
    
        document.head.appendChild(style);
    }

    renderHTML() {
        document.body.innerHTML = `
            <div class="setup-screen">
    
                <div class="logo">🎴</div>
    
                <h1>
                    Memory Match<br>
                    <span class="blue">Mania</span>
                </h1>
    
                <p class="subtitle">
                    Flip cards • Find pairs • Beat your score
                </p>
    
                <div class="section-title">
                    DIFFICULTY
                </div>
    
                <div class="difficulty-container">
    
                    <div class="difficulty">
                        <h3>Easy</h3>
                        <p>6 pairs • 4×3 grid</p>
                    </div>
    
                    <div class="difficulty active">
                        <h3>Medium</h3>
                        <p>8 pairs • 4×4 grid</p>
                    </div>
    
                    <div class="difficulty">
                        <h3>Hard</h3>
                        <p>10 pairs • 5×4 grid</p>
                    </div>
    
                </div>
    
                <div class="section-title">
                    THEME
                </div>
    
                <div class="theme-container">
    
                    <div class="theme active">
                        🐾 Animals
                    </div>
    
                    <div class="theme">
                        🌿 Nature
                    </div>
    
                </div>
    
                <div class="preview">
                    <div class="preview-card">🐶</div>
                    <div class="preview-card">🐱</div>
                    <div class="preview-card">🐻</div>
                    <div class="preview-card">🦊</div>
                    <div class="preview-card">🐼</div>
                    <div class="preview-card">+7</div>
                </div>
    
                <button class="start-btn">
                    ▶ Start Game
                </button>
    
            </div>
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
        
        if (this.difficulty === "easy") {
            board.style.gridTemplateColumns = "repeat(3, 1fr)";
        } 
        else if (this.difficulty === "medium") {
            board.style.gridTemplateColumns = "repeat(4, 1fr)";
        } 
        else {
            board.style.gridTemplateColumns = "repeat(5, 1fr)";
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
        this.moves = 0;
        this.matches = 0;
        this.time = 0;
        this.flippedCards = [];
        clearInterval(this.timer);
    
        this.renderHTML();
        this.setupEventListeners();
    }

    selectDifficulty(level) {
        this.difficulty = level;
    }

    selectTheme(theme) {
        this.theme = theme;
    }

    .hidden {
        display: none !important;
    }

    setupEventListeners() {
    
        const difficultyButtons = document.querySelectorAll(".difficulty");
        const themeButtons = document.querySelectorAll(".theme");
        const startBtn = document.querySelector(".start-btn");
    
        if (!startBtn) return;
    
        difficultyButtons.forEach((btn) => {
            btn.addEventListener("click", () => {
    
                difficultyButtons.forEach(b => b.classList.remove("active"));
                btn.classList.add("active");
    
                const text = btn.querySelector("h3").textContent.toLowerCase();
    
                this.selectDifficulty(text);
            });
        });
    
        themeButtons.forEach((btn) => {
            btn.addEventListener("click", () => {
    
                themeButtons.forEach(b => b.classList.remove("active"));
                btn.classList.add("active");
    
                const text = btn.textContent.trim().toLowerCase();
    
                this.selectTheme(text.includes("animals") ? "animals" : "nature");
            });
        });
    
        startBtn.addEventListener("click", () => {
            this.startGame();
        });
    }

    document.addEventListener(
        "DOMContentLoaded",
        () => {
            window.app =
                new MemoryMatchMania();
        }
    );
