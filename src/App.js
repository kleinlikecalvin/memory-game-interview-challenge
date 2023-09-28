import "./App.css";
import React from "react";
import { useAppState } from "./reducer";
import SubHead from "./SubHead";

export default function App() {
  const [state, dispatch] = useAppState();

  return (
    <div className="App">
      <input
        type="range"
        min={2}
        max={20}
        value={state.difficulty}
        onChange={(e) =>
          dispatch.setDifficulty(Number.parseInt(e.target.value, 10))
        }
      />
      <p>Difficulty: {state.difficulty}</p>
      <h1>Memory Game</h1>
      <SubHead
        gameState={state.gameState}
        onPlayButton={() => {
          dispatch.revealBoard(state.difficulty);
          setTimeout(() => dispatch.playing(), 1000);
        }}
        difficulty={state.difficulty}
        buttonText={state.buttonText}
        gamePlayMessage={state.gamePlayMessage}
        found={state.found}
        missed={state.missed}
        onGameOver={() => {
          dispatch.reset();
        }}
      />
      <div
        className={state.gameState === "playing" ? "board playing" : "board"}
        style={{
          gridTemplateColumns: `repeat(${state.difficulty}, 1fr)`,
          gridTemplateRows: `repeat(${state.difficulty}, 1fr)`,
        }}
      >
        {state.cells.map((cell, index) => {
          return (
            <button
              key={index}
              className={cell != null ? `cell ${cell}` : "cell"}
              onClick={() => dispatch.cellClick(index)}
              disabled={
                state.gameState !== "playing" ||
                cell === "found" ||
                cell === "miss"
              }
            ></button>
          );
        })}
      </div>
    </div>
  );
}
