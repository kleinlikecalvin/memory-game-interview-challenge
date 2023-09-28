import React from "react";
import { setRandomHighlightedCells } from "./util";

/**
 * gameState: idle || revealing || playing || game-over
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
    case "reveal-board": {
      const gamePlayMessage = "Memorize the highlighted cells";
      const cells = [...state.cells];
      const gameState = "revealing";
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
    case "start-playing": {
      const gamePlayMessage = "Click the cells that were highlighted!";
      const gameState = "playing";
      return {
        ...state,
        gamePlayMessage,
        gameState,
      };
    }
    case "click-cell": {
      const updatedCells = [...state.cells];
      let { buttonText, gamePlayMessage, gameState, found, missed } = state;

      if (state.cells[action.payload] === "highlighted") {
        updatedCells[action.payload] = "found";
        found++;
      } else {
        updatedCells[action.payload] = "missed";
        missed++;
      }

      if (found === state.difficulty) {
        buttonText = "Play again?";
        gamePlayMessage = `You got all of the boxes with ${missed} mistakes!`;
        gameState = "game-over";
      }

      return {
        ...state,
        buttonText,
        gamePlayMessage,
        cells: updatedCells,
        gameState,
        found,
        missed,
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
      revealBoard: (difficulty) =>
        dispatch({ type: "reveal-board", payload: difficulty }),
      playing: () => dispatch({ type: "start-playing" }),
      cellClick: (index) => dispatch({ type: "click-cell", payload: index }),
      reset: () => dispatch({ type: "reset" }),
    }),
    [dispatch]
  );
  return [state, dispatcher];
}
