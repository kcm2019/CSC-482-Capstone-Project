import React, { useEffect, useRef } from "react";

const VideoPlayer = ({ user }) => {
  const ref = useRef();

  useEffect(() => {
    user.videoTrack.play(ref.current);
  }, []);
  return (
    <div>
      UID: {user.uid}
      <div ref={ref} style={{ width: "200px", height: "200px" }}>

      </div>
    </div>
  );
};

export default VideoPlayer;
