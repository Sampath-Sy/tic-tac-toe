import { useEffect, useState } from "react";

const initialBoard = (size) => Array(size * size).fill(null);

const generateWinningPatterns = (size) => {
  const patterns = [];

  // Rows
  for (let r = 0; r < size; r++) {
    patterns.push([...Array(size)].map((_, i) => r * size + i));
  }
  // Columns
  for (let c = 0; c < size; c++) {
    patterns.push([...Array(size)].map((_, i) => i * size + c));
  }
  // Diagonal (top-left to bottom-right)
  patterns.push([...Array(size)].map((_, i) => i * size + i));
  // Diagonal (top-right to bottom-left)
  patterns.push([...Array(size)].map((_, i) => i * size + (size - 1 - i)));

  return patterns;
};

const useTicTacToe = (size = 3) => {
  const [board, setBoard] = useState(initialBoard(size));
  const [isXNext, setIsXNext] = useState(true);

  useEffect(() => {
    setBoard(initialBoard(size));
    setIsXNext(true);
  }, [size]);

  const WINNING_PATTERNS = generateWinningPatterns(size);

  const calculateWinner = (currentBoard) => {
    for (let i = 0; i < WINNING_PATTERNS.length; i++) {
      const pattern = WINNING_PATTERNS[i];
      const first = currentBoard[pattern[0]];
      if (first && pattern.every((idx) => currentBoard[idx] === first)) {
        return first;
      }
    }
    return null;
  };

  const handleClick = (index) => {
    const winner = calculateWinner(board);
    if (winner || board[index]) return;
    const newBoard = [...board];
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const getStatusMessage = () => {
    const winner = calculateWinner(board);
    if (winner) return `Player ${winner} wins!`;
    if (!board.includes(null)) return `It's a draw!`;
    return `Player ${isXNext ? "X" : "O"} turn`;
  };

  const resetGame = () => {
    setBoard(initialBoard(size));
    setIsXNext(true);
  };

  return { board, handleClick, calculateWinner, getStatusMessage, resetGame };
};
export default useTicTacToe;
