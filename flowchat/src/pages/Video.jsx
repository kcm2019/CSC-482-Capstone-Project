import { useState } from 'react'
import Sidebar from '../components/Sidebar';
import VideoRoom from '../components/VideoRoom';
import './Styling/Chat.css';

function Video() {
  const [joined, setJoined] = useState(false);
  const [channelInput, setChannelInput] = useState("");

  const handleSubmit = () => {
    setJoined(true)
  }

  return (
    <main className='home'>
      <Sidebar/>
      {!joined && (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter channel code"
            value={channelInput}
            onChange={(e) => setChannelInput(e.target.value)}
          />
          <input type="submit" value="Join or Create"/>
        </form>
      )}
      {joined && (
        <VideoRoom channelInput={channelInput}/>
      )}
    </main>
  )
}

export default Video
