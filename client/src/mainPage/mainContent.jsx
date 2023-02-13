import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from "@mui/material/styles";
import { useNavigate } from 'react-router-dom';

const ColorButton = styled(Button)((props) => ({
    width: "100%",
    height: "100px",
    marginBottom: "100px",
    color: "#ffffff",
    fontSize: "80px",
}));

export default function MainContent() {
    const directToEventPage = (link) => {
        navigate("../" + link, { replace: true });
    };

    const navigate = useNavigate();

    return (
        <>
            <header style={{margin: '10px 0 0 0'}}>
                <h1>Hi! Welcome to Tic Tac Toe.</h1>
            </header>
            <section style={{display: 'flex', flexDirection: 'column'}}>
                <h3>Choose which game room to play:</h3>
                <ColorButton 
                    style={{backgroundColor: "red"}}
                    onClick={() => directToEventPage("gamePage")}>
                    Room 1
                </ColorButton>
                <ColorButton style={{backgroundColor: "green"}}>
                    Room 2
                </ColorButton>
                <ColorButton style={{backgroundColor: "blue"}}>
                    Room 3
                </ColorButton>
            </section>
        </>
    )
}