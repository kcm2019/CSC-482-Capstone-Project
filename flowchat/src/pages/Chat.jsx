import AgoraRTM from 'agora-rtm-sdk';
import { v4 as uuidv4 } from 'uuid';
import './Styling/Chat.css';

const APP_ID = 'bc38613fec1e4347a1c3e44c0473d06f';
const CHANNEL = 'abc';

let client = AgoraRTM.createInstance(APP_ID);
let uid = uuidv4();

import React, { useEffect, useRef, useState } from 'react';

export default function Chat() {
  const messagesRef = useRef();
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const [channel, setChannel] = useState(null);

  const appendMessage = (message) => {
    setMessages((messages) => [...messages, message]);
  };

  useEffect(() => {
    const connect = async () => {
      await client.login({ uid, token: null });
      const channel = await client.createChannel(CHANNEL);
      await channel.join();
      channel.on('ChannelMessage', (message, peerId) => {
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
  }, []);

  useEffect(() => {
    messagesRef.current.scrollTop =
      messagesRef.current.scrollHeight;
  }, [messages]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (text === '') return;
    channel.sendMessage({ text, type: 'text' });
    appendMessage({
      text: text,
      uid,
    });
    setText('');
  };

  return (
    <main>
      <div className="panel">
        <div className="messages" ref={messagesRef}>
          <div className="inner">
            {messages.map((message, idx) => (
              <div key={idx} className="message">
                {message.uid === uid && (
                  <div className="user-self">
                    You:&nbsp;
                  </div>
                )}
                {message.uid !== uid && (
                  <div className="user-them">
                    Them:&nbsp;
                  </div>
                )}
                <div className="text">{message.text}</div>
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={sendMessage}>
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button>+</button>
        </form>
      </div>
    </main>
  );
}

