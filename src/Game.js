import React, { useState } from 'react';
import Board from './Board';

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: lines[i] };
    }
  }
  return { winner: null, line: [] };
}

export default function Game() {
  const [history, setHistory] = useState([// lịch sử các nút đã chơi
    { squares: Array(9).fill(null), lastMove: null },
  ]);
  const [stepNumber, setStepNumber] = useState(0);// bước hiện tại trong lịch sử, hỗ trợ quay lại
  const [xIsNext, setXIsNext] = useState(true);
  const [ascending, setAscending] = useState(true);

  const current = history[stepNumber];
  const { winner, line } = calculateWinner(current.squares);

  function handleClick(i) {
    const sliced = history.slice(0, stepNumber + 1);// cắt bỏ các bước lịch sử sau bước hiện tại
    const currentSquares = sliced[sliced.length - 1].squares.slice();// sao chép mảng ô hiện tại
    if (calculateWinner(currentSquares).winner || currentSquares[i]) {
      return;
    }
    currentSquares[i] = xIsNext ? 'X' : 'O';
    setHistory(sliced.concat([{ squares: currentSquares, lastMove: i }]));
    setStepNumber(sliced.length);
    setXIsNext(!xIsNext);
  }

  function jumpTo(step) {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
  }

  const moves = history.map((step, move) => {
    const desc = move
      ? `Go to move #${move} (${Math.floor(step.lastMove / 3) + 1}, ${step.lastMove % 3 + 1})`
      : 'Go to game start';

    if (move === stepNumber) {
      // For the current move, show text instead of a button
      return (
        <li key={move}>
          <span className="current-move">You are at move #{move}</span>
        </li>
      );
    }

    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>// nút để quay lại bước lịch sử
      </li>
    );
  });

  const sortedMoves = ascending ? moves : moves.slice().reverse();

  const status = winner
    ? `Winner: ${winner}`
    : current.squares.every(Boolean)
    ? 'The game is a draw.'
    : `Next player: ${xIsNext ? 'X' : 'O'}`;

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={current.squares}
          onClick={(i) => handleClick(i)}
          winningLine={line}
        />
      </div>
      <div className="game-info">
        <div className="status">{status}</div>
        <div className="controls">
          <button onClick={() => setAscending(!ascending)}>
            Sort: {ascending ? 'Ascending' : 'Descending'}
          </button>
        </div>
        <ol>{sortedMoves}</ol>
      
      </div>
    </div>
  );
}
