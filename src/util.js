export function setRandomHighlightedCells(arr, difficulty) {
  let randomNum = Math.floor(Math.random() * (difficulty * difficulty));
  if (arr[randomNum] !== "highlighted") {
    arr[randomNum] = "highlighted";
  } else {
    setRandomHighlightedCells(arr, difficulty);
  }
}

export function handleCellClick(
  cells,
  index,
  found,
  setFound,
  missed,
  setMissed,
  setCells
) {
  let updatedCells = [...cells];
  if (cells[index] === "highlighted") {
    updatedCells[index] = "found";
    setFound(found);
  } else {
    updatedCells[index] = "miss";
    setMissed(missed);
  }
  setCells(updatedCells);
}
