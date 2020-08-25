import React from "react";

import "./Message.css";

const Message = (props) => {
  let isCurrentUser = false;

  if (props.message.user.trim() === props.user.trim().toLowerCase()) {
    isCurrentUser = true;
  }

  if (props.message.user.trim() === "admin") {
    return (
      <div className="admin-message-container">
        <p className="admin-message">{props.message.text}</p>
      </div>
    );
  }

  return isCurrentUser ? (
    <div className="message-box-container current">
      <p className="user-name">{props.user}</p>
      <div className="message-container">{props.message.text}</div>
    </div>
  ) : (
    <div className="message-box-container others">
      <div className="message-container">{props.message.text}</div>
      <p className="user-name">{props.message.user}</p>
    </div>
  );
};

export default Message;
