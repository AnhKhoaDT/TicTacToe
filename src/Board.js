import React from 'react';
import Square from './Square';

export default function Board({ squares, onClick, winningLine = [] }) {
  function renderSquare(i) {
    const highlight = winningLine && winningLine.indexOf(i) !== -1;
    return (
      <Square
        key={i}
        value={squares[i]}
        onClick={() => onClick(i)}
        highlight={highlight}
      />
    );
  }

  const boardRows = [];
  for (let row = 0; row < 3; row++) {
    const cols = [];
    for (let col = 0; col < 3; col++) {
      cols.push(renderSquare(row * 3 + col));
    }
    boardRows.push(
      <div key={row} className="board-row">
        {cols}
      </div>
    );
  }

  return <div>{boardRows}</div>;
}
