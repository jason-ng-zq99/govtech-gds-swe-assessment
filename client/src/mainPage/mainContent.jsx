import * as React from 'react';
import { useState } from 'react';
import JoinRoom from '../components/joinRoom';
import BoardGame from '../components/BoardGame';
import GameContext from '../gameContext';

export default function MainContent() {
    const [isInRoom, setInRoom] = useState(false);
    const [playerSymbol, setPlayerSymbol] = useState("X");
    const [isPlayerTurn, setPlayerTurn] = useState(false);
    const [isGameStarted, setGameStarted] = useState(false);

    const gameContextValue = {
        isInRoom,
        setInRoom,
        playerSymbol,
        setPlayerSymbol,
        isPlayerTurn,
        setPlayerTurn,
        isGameStarted,
        setGameStarted,
    };

    return (
        <GameContext.Provider value={gameContextValue}>
            <header style={{margin: '10px 0 0 0'}}>
                <h1>Hi! Welcome to Tic Tac Toe.</h1>
            </header>
            <section style={{display: 'flex', flexDirection: 'column'}}>
                {!isInRoom && <JoinRoom />}
                {isInRoom && <BoardGame />}
            </section>
        </GameContext.Provider>
    )
}