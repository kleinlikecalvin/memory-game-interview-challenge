import React from "react";
import { setRandomHighlightedCells } from "./util";

/**
 * gameState: idle || memorize || playing || game-over
 */
export const initialState = {
  buttonText: "Play",
  gamePlayMessage: "",
  difficulty: 5,
  cells: Array(25).fill(null),
  gameState: "idle",
  found: 0,
  missed: 0,
};

export function reducer(state, action) {
  switch (action.type) {
    case "set-difficulty": {
      const difficulty = action.payload;
      const cells = Array(action.payload * action.payload).fill(null);
      return {
        ...initialState,
        difficulty,
        cells,
      };
    }
    case "idle": {
      return state;
    }
    case "memorize": {
      const gamePlayMessage = "Memorize the highlighted cells";
      const cells = [...state.cells];
      const gameState = "memorize";
      for (let i = 0; i < action.payload; i++) {
        setRandomHighlightedCells(cells, action.payload);
      }
      return {
        ...state,
        gamePlayMessage,
        cells,
        gameState,
      };
    }
    case "set-found": {
      const found = action.payload;
      return {
        ...state,
        found,
      };
    }
    case "set-missed": {
      const missed = action.payload;
      return {
        ...state,
        missed,
      };
    }
    case "playing": {
      const gamePlayMessage = "Click the cells that were highlighted!";
      const gameState = "playing";
      return {
        ...state,
        gamePlayMessage,
        gameState,
      };
    }
    case "set-cells": {
      const cells = action.payload;
      return {
        ...state,
        cells,
      };
    }
    case "game-over": {
      const buttonText = "Play again?";
      const gamePlayMessage = `You got all of the boxes with ${state.missed} mistakes!`;
      const gameState = "game-over";
      return {
        ...state,
        buttonText,
        gamePlayMessage,
        gameState,
      };
    }
    case "reset": {
      const cells = Array(state.difficulty * state.difficulty).fill(null);
      const difficulty = state.difficulty;
      return {
        ...initialState,
        cells,
        difficulty,
      };
    }
    default:
      console.error("Incorrect game state.");
      break;
  }
}

export function useAppState() {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const dispatcher = React.useMemo(
    () => ({
      setDifficulty: (difficulty) =>
        dispatch({ type: "set-difficulty", payload: difficulty }),
      idle: () => dispatch({ type: "idle" }),
      memorize: (difficulty) =>
        dispatch({ type: "memorize", payload: difficulty }),
      playing: () => dispatch({ type: "playing" }),
      setCells: (cells) => dispatch({ type: "set-cells", payload: cells }),
      setFound: (found) => dispatch({ type: "set-found", payload: found + 1 }),
      setMissed: (missed) =>
        dispatch({ type: "set-missed", payload: missed + 1 }),
      gameOver: () => dispatch({ type: "game-over" }),
      reset: () => dispatch({ type: "reset" }),
    }),
    [dispatch]
  );
  return [state, dispatcher];
}
