import * as React from 'react';
import Button from '@mui/material/Button';

import { styled } from "@mui/material/styles";
import { useState } from 'react';
import JoinRoom from '../components/joinRoom';
import BoardGame from '../components/BoardGame';

const ColorButton = styled(Button)((props) => ({
    width: "100%",
    height: "100px",
    marginBottom: "100px",
    color: "#ffffff",
    fontSize: "80px",
}));

export default function MainContent() {
    const [isInRoom, setInRoom] = useState(false);

    return (
        <>
            <header style={{margin: '10px 0 0 0'}}>
                <h1>Hi! Welcome to Tic Tac Toe.</h1>
            </header>
            <section style={{display: 'flex', flexDirection: 'column'}}>
                <h3>Enter Room ID to Join the Game:</h3>
                {!isInRoom && <JoinRoom />}
                {isInRoom && <BoardGame />}
            </section>
        </>
    )
}