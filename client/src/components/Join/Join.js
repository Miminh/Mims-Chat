import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./Join.css";

const Join = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

  return (
    <div className="join-wrapper">
      <h1>Join a Room</h1>
      <div className="join-form">
        <input
          type="text"
          placeholder="Your Name"
          onChange={(event) => {
            setName(event.target.value.trim());
          }}
          className="join-form__info"
        ></input>
        <input
          type="text"
          placeholder="Room Id"
          onChange={(event) => {
            setRoom(event.target.value.trim());
          }}
          className="join-form__info"
        ></input>
        <Link
          className="join-btn"
          onClick={(event) => {
            if (room === "" || name === "") {
              event.preventDefault();
            }
          }}
          to={`/chat?name=${name}&room=${room}`}
        >
          <button className="join-btn-btn">Enter Room</button>
        </Link>
      </div>
    </div>
  );
};

export default Join;
