import React from "react";

const defaultState = {
  isInRoom: false,
  setInRoom: () => {},
  playerSymbol: "x",
  setPlayerSymbol: () => {},
  isPlayerTurn: false,
  setPlayerTurn: () => {},
  isGameStarted: false,
  setGameStarted: () => {},
  roomName: "",
  setRoomName: () => {},
  gameId: "",
  setGameId: () => {}
};

export default React.createContext(defaultState);