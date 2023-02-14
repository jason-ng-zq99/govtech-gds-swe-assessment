// code contributed from https://beta.reactjs.org/learn/tutorial-tic-tac-toe

import { useState, useContext, useEffect } from 'react';
import styled from "styled-components";
import gameContext from '../gameContext';
import socketService from '../services/socketService';
import gameService from '../services/gameService';
import { saveMove } from '../utils/httpsFunction';

// additional container to prevent button from moving when text is input
const StyledButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`

const StyledButton = styled.button`
  width: 150px;
  height: 150px;
  color: white;
  font-size: 100px;
  background-color: ${props => gameState[props.index] === 'O' 
                                                      ? "red" 
                                                      : gameState[props.index] === 'X' 
                                                                                ? "green"
                                                                                : "black"};
`

const StopLayer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 99;
  cursor: default;
`;

function Square({ value, onSquareClick, squareIndex }) {
  return (
    <StyledButton index={squareIndex} onClick={onSquareClick}>
      {value}
    </StyledButton>
  );
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

let gameState = ['_', '_', '_', '_', '_', '_', '_', '_', '_'];

function Board({ xIsNext, squares, onPlay }) {
  const {
    roomName,
    gameId
  } = useContext(gameContext); 

  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = 'X';
      gameState[i] = 'X';
    } else {
      nextSquares[i] = 'O';
      gameState[i] = 'O';
    }
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <StyledButtonsContainer>
          <Square squareIndex={0} ariaDescribedBy={"Top left button"} value={squares[0]} onSquareClick={() => handleClick(0)} />
          <Square squareIndex={1} ariaDescribedBy={"Top centre button"} value={squares[1]} onSquareClick={() => handleClick(1)} />
          <Square squareIndex={2} ariaDescribedBy={"Top right button"} value={squares[2]} onSquareClick={() => handleClick(2)} />
        </StyledButtonsContainer>
      </div>
      <div className="board-row">
        <StyledButtonsContainer>
          <Square squareIndex={3} ariaDescribedBy={"Centre left button"} value={squares[3]} onSquareClick={() => handleClick(3)} />
          <Square squareIndex={4} ariaDescribedBy={"Centre centre button"} value={squares[4]} onSquareClick={() => handleClick(4)} />
          <Square squareIndex={5} ariaDescribedBy={"Centre right button"} value={squares[5]} onSquareClick={() => handleClick(5)} />
        </StyledButtonsContainer>
      </div>
      <div className="board-row">
        <StyledButtonsContainer>
          <Square squareIndex={6} ariaDescribedBy={"Bottom left button"} value={squares[6]} onSquareClick={() => handleClick(6)} />
          <Square squareIndex={7} ariaDescribedBy={"Bottom centre button"} value={squares[7]} onSquareClick={() => handleClick(7)} />
          <Square squareIndex={8} ariaDescribedBy={"Bottom right button"} value={squares[8]} onSquareClick={() => handleClick(8)} />
        </StyledButtonsContainer>
      </div>
    </>
  );
}

export default function BoardGame() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  const {
    setPlayerSymbol,
    playerSymbol,
    setPlayerTurn,
    isPlayerTurn,
    setGameStarted,
    isGameStarted,
    roomName,
    gameId
  } = useContext(gameContext);

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);

    let move = {
      game_id: gameId,
      move_number: currentMove,
      room_name: roomName,
      placed_symbol: xIsNext ? 'X' : 'O'
    }

    const response = async () => { await saveMove(move); }
    console.log(response.data);
  }

  // const handleGameUpdate = () => {
  //   if (socketService.socket)
  //     gameService.onGameUpdate(socketService.socket, (newMatrix) => {
  //       // setMatrix(newMatrix);
  //       // checkGameState(newMatrix);
  //       setPlayerTurn(true);
  //     });
  // };

  const handleGameStart = () => {
    if (socketService.socket)
      gameService.onStartGame(socketService.socket, (options) => {
        setGameStarted(true);
        setPlayerSymbol(options.symbol);
        if (options.start) setPlayerTurn(true);
        else setPlayerTurn(false);
      });
  };

  // const handleGameWin = () => {
  //   if (socketService.socket)
  //     gameService.onGameWin(socketService.socket, (message) => {
  //       console.log("Here", message);
  //       setPlayerTurn(false);
  //       alert(message);
  //     });
  // };

  useEffect(() => {
    // handleGameUpdate();
    handleGameStart();
    // handleGameWin();
  }, []);

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        {/* {!isGameStarted && (
          <h2>Waiting for Other Player to Join to Start the Game!</h2>
        )}
        {(!isGameStarted || !isPlayerTurn) && <StopLayer />} */}
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

