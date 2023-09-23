import "./App.css";
import React, { useEffect } from "react";
import SubHead from "./SubHead";

export default function App() {
  const [difficulty, setDifficulty] = React.useState(5);
  const [cells, setCells] = React.useState(Array(25).fill(null));
  const [gameState, setGameState] = React.useState("idle"); //memorize, playing, game-over
  const [found, setFound] = React.useState(0);
  const [miss, setMiss] = React.useState(0);

  useEffect(() => {
    setCells(Array(difficulty * difficulty).fill(null));
    setFound(0);
    setMiss(0);
    setGameState("idle");
  }, [difficulty]);

  useEffect(() => {
    if (found === difficulty) {
      setGameState("game-over");
    }
  }, [found, difficulty]);

  function getRandomHighlightedCells(arr) {
    let randomNum = Math.floor(Math.random() * (difficulty * difficulty));
    if (arr[randomNum] !== "highlighted") {
      arr[randomNum] = "highlighted";
    } else {
      getRandomHighlightedCells(arr);
    }
  }

  function handlePlayButton() {
    if (gameState === "idle") {
      const gamePlayCells = [...cells];
      setGameState("memorize");
      for (let i = 0; i < difficulty; i++) {
        getRandomHighlightedCells(gamePlayCells);
      }
      setCells(gamePlayCells);
      setTimeout(() => {
        setGameState("playing");
      }, 1000);
    }

    if (gameState === "game-over") {
      setGameState("idle");
      setCells(Array(difficulty * difficulty).fill(null));
      setFound(0);
      setMiss(0);
    }
  }

  function handleCellClick(index) {
    let updatedCells = [...cells];
    if (cells[index] === "highlighted") {
      updatedCells[index] = "found";
      setFound((found) => found + 1);
    } else {
      updatedCells[index] = "miss";
      setMiss((miss) => miss + 1);
    }
    setCells(updatedCells);
  }

  return (
    <div className="App">
      <input
        type="range"
        min={2}
        max={20}
        value={difficulty}
        onChange={(e) => setDifficulty(Number.parseInt(e.target.value, 10))}
      />
      <p>Difficulty: {difficulty}</p>
      <h1>Memory Game</h1>
      <SubHead
        gameState={gameState}
        onPlayButton={handlePlayButton}
        finds={found}
        misses={miss}
        difficulty={difficulty}
      />
      <div
        className={gameState === "playing" ? "board playing" : "board"}
        style={{
          gridTemplateColumns: `repeat(${difficulty}, 1fr)`,
          gridTemplateRows: `repeat(${difficulty}, 1fr)`,
        }}
      >
        {cells.map((cell, index) => {
          return (
            <button
              key={index}
              className={cell != null ? `cell ${cell}` : "cell"}
              onClick={() => handleCellClick(index)}
              disabled={
                gameState !== "playing" || cell === "found" || cell === "miss"
              }
            ></button>
          );
        })}
      </div>
    </div>
  );
}
