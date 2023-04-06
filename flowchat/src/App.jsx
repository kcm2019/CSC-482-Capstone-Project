import Chat from "./pages/Chat";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { HashRouter, Routes, Route, BrowserRouter } from "react-router-dom";
import Register from "./pages/Register";
import { AuthContextProvider } from "./context/AuthContext";
import Video from "./pages/Video";
import Whiteboard from "./pages/Whiteboard";

function App() {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/chat" element={<Chat />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/video" element={<Video/>}/>
          <Route exact path="/whiteboard" element={<Whiteboard />} />
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App;
