const users = [];

const addUser = ({ id, name, room }) => {
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();
  const userExists = users.find(
    (user) => user.name === name && user.room == room
  );
  if (userExists) {
    return { error: "The user name already exists in the room" };
  }
  const user = { id, name, room };
  users.push(user);
  return { user };
};

const deleteUser = (id) => {
  const userIndex = users.findIndex((user) => user.id === id);
  return users.splice(userIndex, 1);
};

const getUser = (id) => {
  return users.find((user) => user.id === id);
};

const getUsersInRoom = (room) => {
  return users.filter((user) => user.room === room);
};

module.exports = { addUser, deleteUser, getUser, getUsersInRoom };
