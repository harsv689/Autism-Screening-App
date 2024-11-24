// src/components/MessageList.js
import React from 'react';
import Message from './Message';

const MessageList = ({ messages }) => (
  <div style={{ overflowY: 'auto', height: 'calc(100vh - 150px)', padding: '10px' }}>
    {messages.map((msg, idx) => (
      <Message key={idx} text={msg.text} isUser={msg.isUser} />
    ))}
  </div>
);

export default MessageList;
