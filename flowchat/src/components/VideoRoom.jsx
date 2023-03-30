import React, { useEffect, useState } from "react";
import AgoraRTC from "agora-rtc-sdk-ng";
import VideoPlayer from "./VideoPlayer";

const APP_ID = "0dc239d53b1a474aa923bd796c3948c6";
const TOKEN =
  "007eJxTYPhWUTNDPuzPzr4JV1WUtqYqLCvZs1/w6gfXs/UqSmmtc+cpMBikJBsZW6aYGicZJpqYmyQmWhoZJ6WYW5olG1uaWCSbMUgypDQEMjI4tk5nZGSAQBCfmSExKZmBAQBJBR4I";
const CHANNEL = "abc";

const client = AgoraRTC.createClient({
  mode: "rtc",
  codec: "vp8",
});

const VideoRoom = ({channelInput}) => {
  const [users, setUsers] = useState([]);
  const [localTracks, setLocalTracks] = useState([])

  const handleUserJoined = async (user, mediaType) => {
    await client.subscribe(user, mediaType)

    if (mediaType === 'video'){
        setUsers((previousUsers) => [...previousUsers, user]);
    }

    if (mediaType === 'audio'){
        user.audioTrack.play()
    }
  };

  const handleUserLeft = (user) => {
    setUsers((previousUsers) => 
        previousUsers.filter((u) => u.uid !== user.uid)
    )
  };

  useEffect(() => {
    client.on("user-published", handleUserJoined);
    client.on("user-left", handleUserLeft);

    client
      .join(APP_ID, channelInput, TOKEN, null)
      .then((uid) =>
        Promise.all([AgoraRTC.createMicrophoneAndCameraTracks(), uid])
      )
      .then(([tracks, uid]) => {
        const [audioTrack, videoTrack] = tracks;
        setLocalTracks(tracks);
        setUsers((previousUsers) => [
          ...previousUsers,
          {
            uid,
            videoTrack,
            audioTrack
          },
        ]);
        client.publish(tracks);
      });

      return () => {
        for(let localTrack of localTracks){
            localTrack.stop();
            localTrack.close();
        }
        client.off('user-published', handleUserJoined)
        client.off('user-left', handleUserLeft)
        client.unpublish(tracks).then(() => client.leave())
      }

  }, []);

  return (

    <div style={{display: 'flex', justifyContent: 'center', marginLeft: '30vw'}}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 200px)'
      }}>
        {users.map((user) => (
          <VideoPlayer key={user.uid} user={user} />
        ))}
      </div>
    </div>
  );
};

export default VideoRoom;
