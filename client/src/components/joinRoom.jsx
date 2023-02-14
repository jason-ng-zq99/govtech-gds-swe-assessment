import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import socketService from "../services/socketService";
import gameService from "../services/gameService";

export default function JoinRoom() {
    const [roomName, setRoomName] = useState("");
    const [isJoining, setJoining] = useState(false);

    // const { setInRoom, isInRoom } = useContext(gameContext);
    const { setInRoom, isInRoom } = useState(false);

    const handleRoomNameChange = (event) => {
        const value = event.target.value;
        setRoomName(value);
    };

    const joinRoom = async (event) => {
        event.preventDefault();

        const socket = socketService.socket;
        if (!roomName || roomName.trim() === "" || !socket) return;

        setJoining(true);

        const joined = await gameService
        .joinGameRoom(socket, roomName)
        .catch((err) => {
            alert(err);
        });

        if (joined) setInRoom(true);

        setJoining(false);
    };

    return (
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
    )
}