import "./App.css";
import MainPage from "./mainPage/mainPage";
import GamePage from "./gamePage/gamePage";
import io from 'socket.io-client';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

function App() {
  const socket = io("localhost:5001/");

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