import { useEffect, useState } from "react";
import "./App.css";
import useTicTacToe from "./hooks/use-tic-tac-toe";
export default function App() {
  const [size, setSize] = useState(3);

  const { board, handleClick, getStatusMessage, resetGame } =
    useTicTacToe(size);

  const handleChange = (event) => {
    const value = Number(event.target.value);
    if (value < 3) return;
    setSize(value);
  };

  return (
    <div className="game">
      <label htmlFor="">Enter Board Size:</label>
      <input
        className="input-box"
        type="number"
        min={3}
        placeholder="Enter Board Size"
        onChange={(event) => handleChange(event)}
        value={size}
      />
      <div className="status">
        {getStatusMessage()}
        <button className="reset-btn" onClick={resetGame}>
          Reset Game
        </button>
      </div>
      <div
        className="board"
        style={{ display: "grid", gridTemplateColumns: `repeat(${size},1fr)` }}
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
