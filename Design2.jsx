import React, { useMemo, useState, useEffect } from "react";
import "./Design2.css";

const PAIRS = { easy: 6, medium: 8, hard: 10 };
const ANIMALS = ["🐶","🐱","🐻","🦊","🐼","🐯","🐸","🦁","🐰","🐨"];
const NATURE = ["🌈","🌲","🌻","🍄","🌙","⭐","🌊","🌸","☀️","🌵"];

function formatTime(totalSec) {
  const m = Math.floor(totalSec / 60);
  const s = totalSec % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

export default function Design2() {
  const [screen, setScreen] = useState("setup");
  const [difficulty, setDifficulty] = useState("medium");
  const [theme, setTheme] = useState("animals");

  const [cards, setCards] = useState([]);
  const [picked, setPicked] = useState([]);

  const [moves, setMoves] = useState(0);
  const [time, setTime] = useState(0);
  const [matches, setMatches] = useState(0);

  const totalPairs = PAIRS[difficulty];
  const icons = theme === "animals" ? ANIMALS : NATURE;

  const preview = useMemo(() => icons.slice(0, 5), [icons]);

  function startGame() {
    const selectedIcons = icons.slice(0, totalPairs);
    const deck = [...selectedIcons, ...selectedIcons]
      .map((icon, idx) => ({
        id: idx,
        icon,
        flipped: false,
        matched: false
      }))
      .sort(() => Math.random() - 0.5);

    setCards(deck);
    setPicked([]);
    setMoves(0);
    setTime(0);
    setMatches(0);
    setScreen("game");
  }

  useEffect(() => {
    if (screen !== "game") return;
    const t = setInterval(() => setTime(prev => prev + 1), 1000);
    return () => clearInterval(t);
  }, [screen]);

  function flipCard(index) {
    const c = cards[index];
    if (!c || c.flipped || c.matched) return;
    if (picked.length === 2) return;

    const next = cards.map((card, i) =>
      i === index ? { ...card, flipped: true } : card
    );
    setCards(next);
    setPicked(prev => [...prev, index]);
  }

  useEffect(() => {
    if (picked.length !== 2) return;

    const [a, b] = picked;
    const first = cards[a];
    const second = cards[b];
    if (!first || !second) return;

    setMoves(prev => prev + 1);

    if (first.icon === second.icon) {
      setCards(prev =>
        prev.map((card, i) =>
          i === a || i === b ? { ...card, matched: true } : card
        )
      );
      setMatches(prev => prev + 1);
      setPicked([]);
    } else {
      const timeout = setTimeout(() => {
        setCards(prev =>
          prev.map((card, i) =>
            i === a || i === b ? { ...card, flipped: false } : card
          )
        );
        setPicked([]);
      }, 800);
      return () => clearTimeout(timeout);
    }
  }, [picked, cards]);

  useEffect(() => {
    if (screen === "game" && matches === totalPairs) {
      setScreen("win");
    }
  }, [matches, totalPairs, screen]);

  function stars() {
    if (moves <= totalPairs + 2) return "⭐⭐⭐";
    if (moves <= totalPairs + 6) return "⭐⭐";
    return "⭐";
  }

  if (screen === "setup") {
    return (
      <section className="setup-screen">
        <div className="logo">🃏</div>

        <h1 className="title">
          Memory Match<br />
          <span className="accent">Mania</span>
        </h1>

        <p className="subtitle">Flip cards • Find pairs • Beat your score</p>

        <div className="section-title">DIFFICULTY</div>
        <div className="difficulty-row">
          {[
            ["easy", "Easy", "6 pairs • 4×3 grid"],
            ["medium", "Medium", "8 pairs • 4×4 grid"],
            ["hard", "Hard", "10 pairs • 5×4 grid"]
          ].map(([value, label, desc]) => (
            <button
              key={value}
              className={`card-option difficulty ${difficulty === value ? "active" : ""}`}
              onClick={() => setDifficulty(value)}
            >
              <h3>{label}</h3>
              <p>{desc}</p>
            </button>
          ))}
        </div>

        <div className="section-title">THEME</div>
        <div className="theme-row">
          <button
            className={`card-option theme-btn ${theme === "animals" ? "active" : ""}`}
            onClick={() => setTheme("animals")}
          >
            <span>🐾</span><span>Animals</span>
          </button>

          <button
            className={`card-option theme-btn ${theme === "nature" ? "active" : ""}`}
            onClick={() => setTheme("nature")}
          >
            <span>🌿</span><span>Nature</span>
          </button>
        </div>

        <div className="preview">
          {preview.map((p, i) => <div key={i} className="preview-card">{p}</div>)}
          <div className="preview-card">+{Math.max(totalPairs - 5, 1)}</div>
        </div>

        <button className="primary-btn" onClick={startGame}>▷ Start Game</button>
      </section>
    );
  }

  if (screen === "win") {
    return (
      <section className="win-screen">
        <div className="win-icon">🎉</div>
        <h1 className="win-title">You Won!</h1>
        <p className="win-sub">{difficulty[0].toUpperCase() + difficulty.slice(1)} · {theme}</p>

        <div className="stars">{stars()}</div>

        <div className="stats">
          <div className="stat">
            <div className="label">⚡ Moves</div>
            <div className="value">{moves}</div>
          </div>
          <div className="stat">
            <div className="label">🕒 Time</div>
            <div className="value">{formatTime(time)}</div>
          </div>
        </div>

        <p className="message">👏 Great job! A few more tries and you'll be perfect.</p>

        <button className="primary-btn" onClick={startGame}>↻ Play Again</button>
        <button className="secondary-btn" onClick={() => setScreen("setup")}>New Game Setup</button>
      </section>
    );
  }

  const progress = (matches / totalPairs) * 100;
  const cols = difficulty === "hard" ? 5 : 4;

  return (
    <section className="game-screen">
      <header className="top-bar">
        <span>⚡ <strong>{moves}</strong> moves</span>
        <span>🕒 <strong>{formatTime(time)}</strong></span>
        <span>🏆 <strong>{matches}/{totalPairs}</strong></span>
      </header>

      <div className="progress-wrap">
        <div className="progress-bar" style={{ width: `${progress}%` }} />
      </div>

      <main className="board" style={{ gridTemplateColumns: `repeat(${cols},1fr)` }}>
        {cards.map((card, i) => (
          <button
            key={`${card.id}-${i}`}
            className={`memory-card ${card.flipped || card.matched ? "flipped" : ""} ${card.matched ? "matched" : ""}`}
            onClick={() => flipCard(i)}
          >
            {card.flipped || card.matched ? card.icon : "M"}
          </button>
        ))}
      </main>
    </section>
  );
}
