const users = {};
const typingUsers = {};

exports.handleUserJoin = (socket, username, io) => {
  users[socket.id] = { username, id: socket.id };
  socket.user = users[socket.id];
  io.emit('user_list', Object.values(users));
  io.emit('user_joined', { username, id: socket.id });
  console.log(`${username} joined the chat`);
};

exports.handleUserDisconnect = (socket, io) => {
  if (users[socket.id]) {
    const { username } = users[socket.id];
    io.emit('user_left', { username, id: socket.id });
    console.log(`${username} left the chat`);
  }
  
  delete users[socket.id];
  delete typingUsers[socket.id];
  
  io.emit('user_list', Object.values(users));
  io.emit('typing_users', Object.values(typingUsers));
};

exports.handleTyping = (socket, isTyping, io) => {
  if (users[socket.id]) {
    const username = users[socket.id].username;
    
    if (isTyping) {
      typingUsers[socket.id] = username;
    } else {
      delete typingUsers[socket.id];
    }
    
    io.emit('typing_users', Object.values(typingUsers));
  }
};

exports.handlePrivateMessage = (socket, { to, message }, io) => {
  if (!users[socket.id] || !users[to]) return;

  const messageData = {
    id: Date.now(),
    sender: users[socket.id].username,
    senderId: socket.id,
    message,
    timestamp: new Date().toISOString(),
    isPrivate: true,
    recipientId: to
  };
  
  socket.to(to).emit('private_message', messageData);
  socket.emit('private_message', messageData);
};