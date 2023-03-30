import AgoraRTM from "agora-rtm-sdk";
import { v4 as uuidv4 } from "uuid";
import "./Styling/Chat.css";

const APP_ID = "bc38613fec1e4347a1c3e44c0473d06f";
const CHANNEL = "abc";

let client = AgoraRTM.createInstance(APP_ID);

var time = new Date();

import React, { useEffect, useRef, useState } from "react";
import Sidebar from "../components/Sidebar";

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
        <div>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Enter your name"
              value={uid}
              onChange={(e) => setUid(e.target.value)}
            />
            <input
              type="text"
              placeholder="Join a channel"
              value={channelInput}
              onChange={(e) => setChannelInput(e.target.value)}
            />
            <input type="submit" value="Submit" />
          </form>
          <form>
            <input type="submit" value="subbbbb"></input>
          </form>
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

            <form onSubmit={sendMessage}>
              <input value={text} onChange={(e) => setText(e.target.value)} />
              <button>+</button>
            </form>
          </div>
        )
      )}
    </main>
  );
}
