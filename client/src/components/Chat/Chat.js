import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import query from "query-string";
import InfoBar from "../InfoBar/InfoBar";

import "./Chat.css";
import Input from "../Input.js/Input";
import Messages from "../Messages/Messages";

//Global Variable for storing the current socket information
let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState("");
  //The api address
  const END_POINT = process.env.REACT_APP_SERVER_URL;
  console.log(process.env.REACT_APP_SERVER_URL);

  //When a user joins the Room
  useEffect(() => {
    const { name, room } = query.parse(location.search);
    socket = io(END_POINT);
    setName(name);
    setRoom(room);

    //Emits an event with a request to join a Room
    socket.emit("join", { name, room }, (err) => {
      if (err) alert(err);
    });

    //Cleanup fn when a user exits the room
    return () => {
      socket.on("disconnect");
      console.log("disconnected");
      socket.off();
    };
  }, [END_POINT, location.search]);

  //To add any new incoming messages to the Screen
  useEffect(() => {
    socket.on("message", (message) => {
      setMessages([...messages, message]);
    });
  }, [messages]);

  //method to send a message to the room
  const sendMessage = (event) => {
    event.preventDefault();
    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };

  return (
    <div className="chat-container">
      <InfoBar name={name} users={users} />
      <Messages messages={messages} name={name} />
      <Input
        message={message}
        setMessage={setMessage}
        sendMessage={sendMessage}
      />
    </div>
  );
};

export default Chat;
