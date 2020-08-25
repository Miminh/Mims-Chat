const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const cors = require("cors");

const route = require("./router");
const { addUser, deleteUser, getUser, getUsersInRoom } = require("./Users");

const PORT = process.env.PORT || 5000;
const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(cors());
app.use(route);

io.on("connection", (socket) => {
  socket.on("join", ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });
    if (error) return callback(error);

    socket.emit("message", {
      user: "admin",
      text: `Welcome ${user.name}, to Room ${user.room}`,
    });

    socket.broadcast.to(user.room).emit("message", {
      user: "admin",
      text: `${user.name} has joined the room`,
    });

    socket.join(user.room);
    io.to(user.room).emit("roomData", { users: getUsersInRoom(user.room) });
    callback();
  });

  socket.on("sendMessage", (message, callback) => {
    console.log(socket.id);
    const user = getUser(socket.id);

    io.to(user.room).emit("message", { user: user.name, text: message });

    callback();
  });

  socket.on("disconnect", () => {
    const user = deleteUser(socket.id)[0];
    console.log(user, "disconnecting");
    if (user) {
      io.to(user.room).emit("message", {
        user: "admin",
        text: `${user.name} has left`,
      });
      io.to(user.room).emit("roomData", { users: getUsersInRoom(user.room) });
    }
  });
});

app.use((req, res, next) => {
  res.send({ Error: "No Such Page Exists" });
});

server.listen(PORT, () => console.log(`listening atport ${PORT}`));
