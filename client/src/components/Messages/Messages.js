import React from "react";
import ScrollToBottom from "react-scroll-to-bottom";

import "./Messages.css";
import Message from "./Message/Message";

const Messages = (props) => {
  return (
    <ScrollToBottom className="messages-container">
      {props.messages.map((message, index) => (
        <Message key={index} message={message} user={props.name} />
      ))}
    </ScrollToBottom>
  );
};

export default Messages;
