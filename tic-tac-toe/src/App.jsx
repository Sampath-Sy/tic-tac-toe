import "./App.css";
import useTicTacToe from "./hooks/use-tic-tac-toe";
const SIZE = 3;
export default function App() {
  const { board, handleClick, getStatusMessage, resetGame } =
    useTicTacToe(SIZE);
  return (
    <div className="game">
      <div className="status">
        {getStatusMessage()}
        <button className="reset-btn" onClick={resetGame}>
          Reset Game
        </button>
      </div>
      <div
        className="board"
        style={{ display: "grid", gridTemplateColumns: `repeat(${SIZE},1fr)` }}
      >
        {board.map((b, idx) => {
          return (
            <button
              className="cell"
              key={idx}
              disabled={b !== null}
              onClick={() => handleClick(idx)}
            >
              {b}
            </button>
          );
        })}
      </div>
    </div>
  );
}
