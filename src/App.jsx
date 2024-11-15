import { useState } from "react";

// component Square => button (square)
// className => class (css)
// value => X/O/null
function Square({ className, onClick, value }) {
  return (
    <button className={className} onClick={onClick}>
      {value}
    </button>
  );
}

// logic calculateWinner => X/O (winner)
// squares => array (last move)
function calculateWinner(squares) {
  const rules = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const [a, b, c] of rules) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
}

// component Board => status, board, reset (result structure)
// player => true/false
// squares => array (last move)
function Board({ player, squares, onClickPlay, onReset }) {
  const playerWinner = calculateWinner(squares);
  const playerDraw = squares.every((square) => square !== null);
  const status = playerWinner
    ? `Winner : ${playerWinner}`
    : playerDraw
    ? `Draw!`
    : `${player ? "X" : "O"} is playing`;

  return (
    <>
      <div className="main">
        <h1 className="status">{status}</h1>
        <div className="board">
          {squares.map((value, i) => (
            <Square
              key={i}
              className={"square"}
              // disable click && send index to onClickPlay
              onClick={() => {
                !squares[i] && !playerWinner && onClickPlay(i);
              }}
              value={value}
            />
          ))}
        </div>
        <Square className={"reset"} onClick={onReset} value={"Reset!"} />
      </div>
    </>
  );
}

// main App => Board, game info (result structure)
function App() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [indexSquares, setIndexSquares] = useState(0);
  const player = indexSquares % 2 === 0;
  const dynamicSquares = history[indexSquares];

  function onClickPlay(i) {
    const newSquares = dynamicSquares.slice();
    newSquares[i] = player ? "X" : "O";

    const newHistory = [...history.slice(0, indexSquares + 1), newSquares];
    setIndexSquares(newHistory.length - 1);
    setHistory(newHistory);
  }

  // logic onReset => reset array in array && reset player
  function onReset() {
    setHistory([Array(9).fill(null)]);
    setIndexSquares(0);
  }

  const moves = history.map((move, i) => {
    const description = i > 0 ? `Go To #${i}` : `Game Start!`;

    return (
      <li key={i}>
        <button
          data-move={move}
          className="history"
          onClick={() => setIndexSquares(i)}
        >
          {description}
        </button>
      </li>
    );
  });

  return (
    <>
      <div className="game">
        <Board
          player={player}
          squares={dynamicSquares}
          onClickPlay={onClickPlay}
          onReset={onReset}
        />
        <div className="game-info">
          <p>History :</p>
          <ol className="number">{moves}</ol>
        </div>
      </div>
    </>
  );
}

export default App;
