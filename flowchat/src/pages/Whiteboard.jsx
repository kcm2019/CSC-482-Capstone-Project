import React, { useState, useEffect } from "react";
import { WhiteWebSdk, RoomWhiteboard } from "white-react-sdk";
import Sidebar from "../components/Sidebar";
import './Styling/Whiteboard.css'

const Whiteboard = () => {
  const sdkToken =
    "NETLESSSDK_YWs9TFVodkJDc2R1ZDNEQXRHUyZub25jZT05MGQ4MDNlMC1jODc4LTExZWQtYjliMC0yNzQ4MDgwOTZjNGEmcm9sZT0wJnNpZz1mODI3MmViZDVhNTNiMWRhY2Y5MjEyY2M4ZDUxODY0OGY1YWRiOWI0YzJjMjMwODM3NzgxZDNkNjRiNjk2YWJl";
  const [room, setRoom] = useState(null);
  const [hasRoom, setHasRoom] = useState(false);
  const [roomID, setRoomID] = useState(null);
  const [roomInput, setRoomInput] = useState(null);
  const [userID, setUserID] = useState(null);
  const [token, setToken] = useState(null);
  
  const create = async (e) => {
    e.preventDefault();
    let roomUUID = "";

    const createRoom = async () => {
      const url = "https://shunt-api.netless.link/v5/rooms";
      const requestInit = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: sdkToken,
          region: "cn-hz",
        },
      };
      const response = await fetch(url, requestInit);
      const roomJSON = await response.json();
      roomUUID = roomJSON.uuid;
      return createRoomToken(roomUUID);
    };

    const createRoomToken = async (roomUUID) => {
      const url = `https://shunt-api.netless.link/v5/tokens/rooms/${roomUUID}`;
      const requestInit = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: sdkToken,
          region: "cn-hz",
        },
        body: JSON.stringify({
          lifespan: 3600000,
          role: "admin",
        }),
      };
      const response = await fetch(url, requestInit);
      const roomToken = await response.json();
      return joinRoom(roomUUID, roomToken);
    };

    const joinRoom = async (roomUUID, roomToken) => {
      const whiteWebSdk = new WhiteWebSdk({
        appIdentifier: "mygjQMf0Ee25sCdICAlsSg/WqdYFhdelBvruA",
      });
      const room = await whiteWebSdk.joinRoom({
        uuid: roomUUID,
        uid: "OWNER",
        roomToken,
      });
      setRoom(room);
      setHasRoom(true);
      setRoomID(roomUUID);
      setToken(roomToken);
    };

    createRoom().catch((err) => {
      console.error(err);
    });
  };

  const join = async (e) => {
    e.preventDefault();

    const whiteWebSdk = new WhiteWebSdk({
      appIdentifier: "mygjQMf0Ee25sCdICAlsSg/WqdYFhdelBvruA",
    });
    console.log(token);
    console.log(roomInput);
    console.log(userID);
    const room = await whiteWebSdk.joinRoom({
      uuid: roomInput,
      uid: userID,
      roomToken: token,
    })

    setRoom(room);
    setHasRoom(true);
    setRoomID(roomId);
    setToken(rt);
  }

  return (
    <div className="App">
      <Sidebar/>
      <div>

      {room ? (
        <div>
          <h3>Room ID: {roomID}</h3>
          <h3>Room Token: {token}</h3>
        <RoomWhiteboard
          room={room}
          style={{
            width: "100%",
            height: "100vh",
          }}
        />
        </div>

      ) : (
        <div class="container">
          <p>No Room</p>
          <button class="container-button" onClick={(e) => create(e)}>Create one here</button>
          <form onSubmit={(e) => join(e)}>
            Join a room
            <input
              type="text"
              placeholder="Room ID"
              value={roomInput}
              onChange={(e) => setRoomInput(e.target.value)}
            />
            <input 
              type="text"
              placeholder="Username"
              value={userID}
              onChange={(e) => setUserID(e.target.value)}/>
            <input 
              type="text"
              placeholder="Token"
              value={token}
              onChange={(e) => setToken(e.target.value)}/>
            <input type="submit" value="Join"/>
          </form>
        </div>
      )}
    </div>
    </div>
  );
};

export default Whiteboard;
