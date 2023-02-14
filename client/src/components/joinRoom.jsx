import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import socketService from "../services/socketService";
import gameService from "../services/gameService";
import gameContext from '../gameContext';
import { useContext } from 'react';

export default function JoinRoom() {
    const [roomName, setRoomName] = useState("");
    const [isJoining, setJoining] = useState(false);
    const { setInRoom } = useContext(gameContext);

    const handleRoomNameChange = (event) => {
        const value = event.target.value;
        setRoomName(value);
    };

    const joinRoom = async (event) => {
        event.preventDefault();
        console.log("Joining room -- room name: ", roomName);
        
        const socket = socketService.socket;

        if (!roomName || roomName.trim() === "" || !socket) {
            return;
        }

        setJoining(true);
        console.log('Sending join game request')
        const joined = gameService
        .joinGameRoom(socket, roomName)
        .catch((err) => {
        alert(err);
        });
        console.log("LIST OF ROOMS:", socket.rooms);                               

        if (joined) {
            console.log("now in room");
            setInRoom(true);
        }
        setJoining(false);
    };

    return (
        <>
            <header>Enter Room ID to Join the Game: </header>
            <form onSubmit={joinRoom}>
                <div>
                    <TextField
                    placeholder="Room ID"
                    value={roomName}
                    onChange={handleRoomNameChange}
                    />
                    <Button type="submit" disabled={isJoining}>
                        {isJoining ? "Joining..." : "Join"}
                    </Button>
                </div>
            </form>
        </>
    )
}