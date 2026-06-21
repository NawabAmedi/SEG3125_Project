import React, { useState, useEffect } from "react";
import './Design2.js';

export default function Design2() {

    const [screen, setScreen] = useState("setup");

    const [difficulty, setDifficulty] = useState("easy");
    const [theme, setTheme] = useState("animals");

    const [cards, setCards] = useState([]);
    const [selected, setSelected] = useState([]);

    const [moves, setMoves] = useState(0);
    const [time, setTime] = useState(0);
    const [matches, setMatches] = useState(0);

    const difficulties = {
        easy: 6,
        medium: 8,
        hard: 10
    };

    const animals = [
        "🐶","🐱","🐻","🦊","🐼",
        "🐯","🐸","🦁","🐰","🐨"
    ];

    const nature = [
        "🌈","🌲","🌻","🍄","🌙",
        "⭐","🌊","🌸","☀️","🌵"
    ];

    function startGame() {

        const pairCount =
            difficulties[difficulty];

        const icons =
            theme === "animals"
                ? animals
                : nature;

        const selectedIcons =
            icons.slice(0, pairCount);

        const deck =
            [...selectedIcons, ...selectedIcons]
                .map((icon, index) => ({
                    id: index,
                    icon,
                    flipped: false,
                    matched: false
                }))
                .sort(() => Math.random() - 0.5);

        setCards(deck);
        setMoves(0);
        setTime(0);
        setMatches(0);

        setScreen("game");
    }

    useEffect(() => {

        if (screen !== "game") {
            return;
        }

        const timer = setInterval(() => {

            setTime(prev => prev + 1);

        }, 1000);

        return () => clearInterval(timer);

    }, [screen]);

    function flipCard(card) {

        if (card.flipped) {
            return;
        }

        if (selected.length === 2) {
            return;
        }

        const updated =
            cards.map(c =>
                c.id === card.id
                    ? { ...c, flipped: true }
                    : c
            );

        setCards(updated);

        setSelected([...selected, card]);
    }

    useEffect(() => {

        if (selected.length !== 2) {
            return;
        }

        setMoves(prev => prev + 1);

        if (
            selected[0].icon ===
            selected[1].icon
        ) {

            setCards(prev =>
                prev.map(card =>
                    card.icon === selected[0].icon
                        ? {
                            ...card,
                            matched: true
                        }
                        : card
                )
            );

            setMatches(prev => prev + 1);

            setSelected([]);
        }

        else {

            setTimeout(() => {

                setCards(prev =>
                    prev.map(card =>
                        card.id === selected[0].id ||
                        card.id === selected[1].id
                            ? {
                                ...card,
                                flipped: false
                            }
                            : card
                    )
                );

                setSelected([]);

            }, 1000);
        }

    }, [selected]);

    useEffect(() => {

        if (
            matches ===
            difficulties[difficulty]
        ) {
            setScreen("win");
        }

    }, [matches]);

    if (screen === "setup") {

        return (
            <div>
                <h1>Memory Match Mania</h1>

                <h2>Difficulty</h2>

                <button onClick={() =>
                    setDifficulty("easy")
                }>
                    Easy
                </button>

                <button onClick={() =>
                    setDifficulty("medium")
                }>
                    Medium
                </button>

                <button onClick={() =>
                    setDifficulty("hard")
                }>
                    Hard
                </button>

                <h2>Theme</h2>

                <button onClick={() =>
                    setTheme("animals")
                }>
                    Animals
                </button>

                <button onClick={() =>
                    setTheme("nature")
                }>
                    Nature
                </button>

                <br /><br />

                <button onClick={startGame}>
                    Start Game
                </button>
            </div>
        );
    }

    if (screen === "win") {

        return (
            <div>
                <h1>You Won!</h1>

                <h2>Moves: {moves}</h2>

                <h2>Time: {time}s</h2>

                <button
                    onClick={() =>
                        setScreen("setup")
                    }
                >
                    Play Again
                </button>
            </div>
        );
    }

    const progress =
        (matches /
        difficulties[difficulty]) * 100;

    return (

        <div>

            <div
                style={{
                    width: progress + "%",
                    height: "6px",
                    background: "cyan"
                }}
            />

            <h3>
                Moves: {moves}
            </h3>

            <h3>
                Time: {time}s
            </h3>

            <h3>
                {matches}/
                {difficulties[difficulty]}
            </h3>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns:
                        difficulty === "hard"
                        ? "repeat(5,120px)"
                        : "repeat(4,120px)",
                    gap: "15px"
                }}
            >

                {cards.map(card => (

                    <button
                        key={card.id}
                        onClick={() =>
                            flipCard(card)
                        }
                        style={{
                            width: "120px",
                            height: "150px",
                            fontSize: "40px"
                        }}
                    >

                        {
                            card.flipped ||
                            card.matched
                                ? card.icon
                                : "M"
                        }

                    </button>

                ))}

            </div>

        </div>
    );
}
