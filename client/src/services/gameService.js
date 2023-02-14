class GameService {
    async joinGameRoom(socket, roomId) {
        return new Promise((rs, rj) => {
            socket.emit("join_game", { roomId });
            socket.on("room_joined", () => rs(true));
            socket.on("room_join_error", ({ error }) => rj(error));
        });
    }

    onStartGame(socket, listener) {
        socket.on("start_game", listener);
    }
}

export default new GameService();