export function setRandomHighlightedCells(arr, difficulty) {
  let randomNum = Math.floor(Math.random() * (difficulty * difficulty));
  if (arr[randomNum] !== "highlighted") {
    arr[randomNum] = "highlighted";
  } else {
    setRandomHighlightedCells(arr, difficulty);
  }
}
