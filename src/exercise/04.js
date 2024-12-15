import * as React from 'react';
import { useLocalStorageState } from './useLocalStorageState'; 

function Board({ squares, onClick }) {
  function renderSquare(i) {
    return (
      <button className="square" onClick={() => onClick(i)} disabled={squares[i]}>
        {squares[i]}
      </button>
    );
  }

  return (
    <div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
}

function Game() {
  const [history, setHistory] = useLocalStorageState('gameHistory', [Array(9).fill(null)]);
  const [currentStep, setCurrentStep] = React.useState(0);
  const squares = history[currentStep];
  const nextValue = calculateNextValue(squares);
  const winner = calculateWinner(squares);
  const status = calculateStatus(winner, squares, nextValue);
  const isGameOver = winner || squares.every(Boolean);

  function selectSquare(square) {
    if (squares[square] || isGameOver) {
      return; 
    }

    const newSquares = squares.slice();
    newSquares[square] = nextValue;

    const newHistory = history.slice(0, currentStep + 1).concat([newSquares]);
    setHistory(newHistory);
    setCurrentStep(newHistory.length - 1);
  }

  function restart() {
    setHistory([Array(9).fill(null)]);
    setCurrentStep(0);
  }

  function jumpTo(step) {
    setCurrentStep(step);
  }

  const moves = history.map((squares, step) => {
    const desc = step ? `Go to move #${step}` : 'Go to game start';
    return (
      <li key={step}>
        <button onClick={() => jumpTo(step)}>{desc}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={squares} onClick={selectSquare} />
        <button className="restart" onClick={restart}>
          Restart
        </button>
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

function calculateStatus(winner, squares, nextValue) {
  return winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
    ? `Scratch: Cat's game`
    : `Next player: ${nextValue}`;
}

function calculateNextValue(squares) {
  return squares.filter(Boolean).length % 2 === 0 ? 'X' : 'O';
}

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
      return squares[a];
    }
  }
  return null;
}

function App() {
  return <Game />;
}

export default App;