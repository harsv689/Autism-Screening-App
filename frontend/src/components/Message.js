import React from 'react';
import styled from 'styled-components';

const MessageContainer = styled.div`
  display: flex;
  justify-content: ${({ isUser }) => (isUser ? 'flex-end' : 'flex-start')};
  padding: 10px 20px;
`;

const MessageBubble = styled.div`
  background-color: ${({ isUser }) => (isUser ? '#0078d4' : '#e1e1e1')};
  color: ${({ isUser }) => (isUser ? 'white' : 'black')};
  padding: 10px 15px;
  border-radius: 15px;
  max-width: 60%;
  font-size: 15px;
`;

const Message = ({ text, isUser }) => (
  <MessageContainer isUser={isUser}>
    <MessageBubble isUser={isUser}>
      {React.isValidElement(text) ? text : text}
    </MessageBubble>
  </MessageContainer>
);

export default Message;