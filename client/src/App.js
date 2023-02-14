import "./App.css";
import MainPage from "./mainPage/mainPage";
import GamePage from "./gamePage/gamePage";
import io from 'socket.io-client';
import socketService from "./services/socketService";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useEffect } from "react";

function App() {
  const connectSocket = async () => {
    const socket = await socketService
      .connect("http://localhost:5001")
      .catch((err) => {
        console.log("Error: ", err);
      });
  };

  useEffect(() => {
    connectSocket();
  }, []);

  return (
    <>
      <Router>
        <div className="App">
          <Routes>
            <Route exact path="/home" element={<MainPage />}></Route>
            <Route exact path="/gamePage" element={<GamePage />}></Route>
            <Route path="*" element={<Navigate replace to="/home" />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;