import AgoraRTM from "agora-rtm-sdk";
import { v4 as uuid } from "uuid";
import { useEffect } from "react";
import "./Styling/Chat.css";
import { useState } from "react";

const APP_ID = "bc38613fec1e4347a1c3e44c0473d06f";
const CHANNEL_NAME = "abc";

const client = AgoraRTM.createInstance(APP_ID);
const uid = uuid();

function Chat() {
  const [text, setText] = useState("");
  const [channel, setChannel] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const connect = async () => {
      await client.login({ uid, token: null });
      const channel = await client.createChannel(CHANNEL_NAME);
      await channel.join();
      channel.on("ChannelMessage", (message, memberId) => {
        setMessages((currentMessages) => [
          ...currentMessages,
          {
            uid: memberId,
            text: message.text,
          },
        ]);
      });
      setChannel(channel);
      return channel;
    };
    const connection = connect();

    return () => {
      const logout = async () => {
        const channel = await connection;
        await client.logout();
        await channel.leave();
      };
      logout();
    };
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    if (text === "") return;
    channel.sendMessage({
      text,
      type: "text",
    });
    setMessages((currentMessages) => [
        ...currentMessages,
        {
          uid,
          text
        },
    ]);
    setText("");
  };

  return (
    <main>
      <div className="panel">
        <div className="messages">
          <div className="inner">
            {messages.map((message, index) => (
              <div key={index} className="message">
                {message.uid === uid && <div className="user-self">You: &nbsp;</div>}
                {message.uid !== uid && <div className="user-them">Them: &nbsp;</div>}
                {message.text}
              </div>
            ))}
          </div>
        </div>
      </div>
      <form onSubmit={sendMessage}>
        <input
          value={text}
          onChange={(e) => setText(e.currentTarget.value)}
        ></input>
        <button>+</button>
      </form>
    </main>
  );
}

export default Chat;
