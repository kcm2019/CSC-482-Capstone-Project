import React, { useState, useEffect } from "react";
import { WhiteWebSdk, RoomWhiteboard } from "white-react-sdk";
import Sidebar from "../components/Sidebar";
import "./Styling/Whiteboard.css";
import Room from "../components/Room";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
} from "firebase/firestore";
import { db } from "../firebase";

const querySnaphot = await getDocs(collection(db, "Whiteboard"));

const Whiteboard = () => {
  const sdkToken =
    "NETLESSSDK_YWs9TFVodkJDc2R1ZDNEQXRHUyZub25jZT05MGQ4MDNlMC1jODc4LTExZWQtYjliMC0yNzQ4MDgwOTZjNGEmcm9sZT0wJnNpZz1mODI3MmViZDVhNTNiMWRhY2Y5MjEyY2M4ZDUxODY0OGY1YWRiOWI0YzJjMjMwODM3NzgxZDNkNjRiNjk2YWJl";
  const [room, setRoom] = useState(null);
  const [hasRoom, setHasRoom] = useState(false);
  const [roomID, setRoomID] = useState(null);
  const [roomInput, setRoomInput] = useState(null);
  const [userID, setUserID] = useState(null);
  const [token, setToken] = useState(null);
  const rooms = [];
  const tokens = [];

  const getAllRooms = () => {
    querySnaphot.forEach((doc) => {
      rooms.push(doc.data());
    });
    console.log(rooms);
  };

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
      setDoc(doc(db,"Whiteboard", roomUUID), {ID: roomUUID, Token: roomToken});

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
    });

    setRoom(room);
    setHasRoom(true);
    setRoomID(roomID);
    setToken(token);
  };

  getAllRooms();

  return (
    <main className="home">
      <Sidebar />
        {room ? (
          <div className="overflow-hidden">
            <div>
              <h3>Room ID: {roomID}</h3>
              <h3>Room Token: {token}</h3>
            </div>
            <RoomWhiteboard
              room={room}
              style={{
                width: "100%",
                height: "500px",
                border: "solid 1px gray"
              }}
            />
          </div>
        ) : (
          <div className="flex bg-green-300 h-full w-full place-content-around">
            <div className="bg-gray-200 w-1/2 flex flex-col items-center border-r-2 border-black">
              <button
                className="mt-10 bg-blue-500 w-10 self-center text-white font-semibold focus:pointer-events-auto rounded-lg hover:cursor-pointer"
                onClick={(e) => create(e)}
              >
                +{" "}
              </button>
              <form
                onSubmit={(e) => join(e)}
                className="flex flex-col text-center justify-center align-center"
              >
                <p className="mt-10">Join a whiteboard session:</p>
                <input
                  type="text"
                  placeholder="Room ID"
                  className="w-4/4 mt-10 self-center focus:outline-none p-1 rounded"
                  value={roomInput}
                  onChange={(e) => setRoomInput(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Username"
                  value={userID}
                  className="w-4/4 mt-10 self-center focus:outline-none p-1 rounded"
                  onChange={(e) => setUserID(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Token"
                  value={token}
                  className="w-4/4 mt-10 self-center focus:outline-none p-1 rounded"
                  onChange={(e) => setToken(e.target.value)}
                />
                <input
                  type="submit"
                  value="Join"
                  className="mt-10 bg-blue-500 w-24 self-center text-white font-semibold focus:pointer-events-auto rounded-lg hover:cursor-pointer"
                />
              </form>
            </div>
            <div className="bg-gray-200 w-1/2 pl-10 pr-10 overflow-y-scroll">
              <p className="mt-10">List of chatrooms:</p>
              {rooms.map((room) => (
                <Room room={room.ID} token={room.Token}/>
              ))}
            </div>
          </div>
        )}
    </main>
  );
};

export default Whiteboard;