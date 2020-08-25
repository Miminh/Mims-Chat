import React from "react";

import "./Input.css";

const Input = (props) => {
  return (
    <div className="input-container">
      <input
        className="message-box"
        value={props.message}
        onChange={(event) => props.setMessage(event.target.value)}
        onKeyPress={(event) =>
          event.key === "Enter" ? props.sendMessage(event) : null
        }
      />
      <button
        className="chat-btn"
        onClick={(event) => props.sendMessage(event)}
      >
        Send
      </button>
    </div>
  );
};

export default Input;
