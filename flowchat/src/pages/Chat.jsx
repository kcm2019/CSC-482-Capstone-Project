import AgoraRTM from "agora-rtm-sdk";
import { v4 as uuidv4 } from "uuid";
import "./Styling/Chat.css";
import React, { useEffect, useRef, useState } from "react";
import Sidebar from "../components/Sidebar";
import Room from "../components/Room";

const APP_ID = "bc38613fec1e4347a1c3e44c0473d06f";

let client = AgoraRTM.createInstance(APP_ID);

var time = new Date();

export default function Chat() {
  const messagesRef = useRef();
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [channel, setChannel] = useState(null);
  const [channelInput, setChannelInput] = useState("");
  const [loginSubmitted, setLoginSubmitted] = useState(false);
  const [uid, setUid] = useState("");

  const appendMessage = (message) => {
    setMessages((messages) => [...messages, message]);
  };

  const handleSubmit = () => {
    setLoginSubmitted(true);
    const connect = async () => {
      await client.login({ uid, token: null });
      const channel = await client.createChannel(channelInput);
      await channel.join();
      channel.on("ChannelMessage", (message, peerId) => {
        appendMessage({
          text: message.text,
          uid: peerId,
        });
      });
      setChannel(channel);
      return channel;
    };
    const connection = connect();

    return () => {
      const disconnect = async () => {
        const channel = await connection;
        await channel.leave();
        await client.logout();
      };
      disconnect();
    };

    useEffect(() => {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }, [messages]);
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (text === "") return;
    channel.sendMessage({ text, type: "text" });
    appendMessage({
      text: text,
      uid,
    });
    setText("");
  };

  return (
    <main className="home">
      <Sidebar />
      {!loginSubmitted ? (
        <div className="flex bg-green-300 h-full w-full place-content-around">
          <div className="bg-gray-200 w-1/2 border-r-2 border-black">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col text-center justify-center align-center"
            >
              <p className="mt-10">Create or join a chatroom here:</p>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-2/4 mt-10 self-center focus:outline-none p-1 rounded"
                value={uid}
                onChange={(e) => setUid(e.target.value)}
              />
              <input
                type="text"
                placeholder="Join a channel"
                value={channelInput}
                className="w-2/4 mt-10 self-center focus:outline-none p-1 rounded"
                onChange={(e) => setChannelInput(e.target.value)}
              />
              <input
                type="submit"
                value="Submit"
                className="mt-10 bg-blue-500 w-24 self-center text-white font-semibold focus:pointer-events-auto rounded-lg hover:cursor-pointer"
              />
            </form>
          </div>
          <div className="bg-gray-200 w-1/2 pl-10 pr-10 overflow-y-scroll">
            <p className="mt-10">List of chatrooms:</p>
            <Room room="abc"/>
            <Room room="abc"/>
            <Room room="abc"/>
            <Room room="abc"/>
            <Room room="abc"/>
            <Room room="abc"/>
          </div>
        </div>
      ) : (
        loginSubmitted && (
          <div className="panel">
            <div className="messages" ref={messagesRef}>
              <div className="inner">
                {messages.map((message, idx) => (
                  <div key={idx} className="message">
                    {message.uid === uid && (
                      <div className="user-self">{message.uid}:&nbsp;</div>
                    )}
                    {message.uid !== uid && (
                      <div className="user-them">{message.uid}:&nbsp;</div>
                    )}
                    <div className="text">{message.text}</div>
                    <div className="text">
                      &nbsp;
                      {time.getHours() +
                        ":" +
                        time.getMinutes() +
                        ":" +
                        time.getSeconds()}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <form className="chat-form" onSubmit={sendMessage}>
              <input
                className="chat-input"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
              <button className="chat-button">+</button>
            </form>
          </div>
        )
      )}
    </main>
  );
}
