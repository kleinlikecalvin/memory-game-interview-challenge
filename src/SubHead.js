export default function SubHead({
  gameState,
  onPlayButton,
  difficulty,
  buttonText,
  gamePlayMessage,
  found,
  missed,
  onGameOver,
}) {
  return (
    <>
      {gameState === "idle" ? (
        <button onClick={() => onPlayButton()}>{buttonText}</button>
      ) : null}
      {gamePlayMessage ? <p>{gamePlayMessage}</p> : <p></p>}
      {gameState === "playing" ? (
        <p>
          {found} right out of {difficulty} total with {missed} mistakes.
        </p>
      ) : (
        <p></p>
      )}
      {gameState === "game-over" ? (
        <button onClick={() => onGameOver()}>{buttonText}</button>
      ) : null}
    </>
  );
}
