export default function SubHead({
  gameState,
  onPlayButton,
  finds,
  misses,
  difficulty,
}) {
  let gamePlayMessage = "";
  let buttonText = "";
  switch (gameState) {
    case "idle":
      buttonText = "Play";
      break;
    case "memorize":
      gamePlayMessage = "Memorize the highlighted cells";
      break;
    case "playing":
      gamePlayMessage = "Click the cells that were highlighted!";
      break;
    case "game-over":
      gamePlayMessage = `You got all of the boxes with ${misses} mistakes!`;
      buttonText = "Play again?";
      break;
    default:
      console.error("Gamestate was not found");
      break;
  }

  return (
    <>
      {gameState === "idle" ? (
        <button onClick={() => onPlayButton()}>{buttonText}</button>
      ) : null}
      {gamePlayMessage ? <p>{gamePlayMessage}</p> : null}
      {gameState === "playing" ? (
        <p>
          {finds} right out of {difficulty} total with {misses} mistakes.
        </p>
      ) : null}
      {gameState === "game-over" ? (
        <button onClick={() => onPlayButton()}>{buttonText}</button>
      ) : null}
    </>
  );
}
