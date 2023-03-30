import Chat from "./pages/Chat";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import { AuthContextProvider } from "./context/AuthContext";
import Video from "./pages/Video";
import Whiteboard from "./pages/Whiteboard";

function App() {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/video" element={<Video/>}/>
          <Route path="/whiteboard" element={<Whiteboard />} />
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App;
