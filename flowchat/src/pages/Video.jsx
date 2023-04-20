import { useState } from "react";
import Sidebar from "../components/Sidebar";
import VideoRoom from "../components/VideoRoom";
import "./Styling/Chat.css";
import Room from "../components/Room";

function Video() {
  const [joined, setJoined] = useState(false);
  const [channelInput, setChannelInput] = useState("");

  const handleSubmit = () => {
    setJoined(true);
  };

  return (
    <main className="home">
      <Sidebar />
      {!joined && (
      <div className="flex bg-green-300 h-full w-full place-content-around">
        <div className="bg-gray-200 w-1/2 border-r-2 border-black text-center">
          <p className="self-center mt-10">Create or join a video call:</p>
          <form
          onSubmit={handleSubmit}
          className="flex flex-col text-center justify-center align-center"
        >
          <input
            type="text"
            placeholder="Enter channel code"
            value={channelInput}
            onChange={(e) => setChannelInput(e.target.value)}
            className="w-2/4 mt-10 self-center focus:outline-none p-1 rounded"
          />
          <input
            type="submit"
            value="Join or Create"
            className="mt-10 bg-blue-500 w-32 self-center text-white font-semibold focus:pointer-events-auto rounded-lg hover:cursor-pointer"
          />
        </form>
        </div>
        <div className="bg-gray-200 w-1/2 pl-10 pr-10 overflow-y-scroll">
            <p className="mt-10">List of sessions:</p>
            <Room room="abc"/>
          </div>
        </div>
      )}
      {joined && <VideoRoom channelInput={channelInput} />}
    </main>
  );
}

export default Video;
