// socket.js - Socket.io client setup
import { io } from 'socket.io-client';
import { useEffect, useState } from 'react';

// Socket.io connection URL (preserved your original environment variable)
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';

// Create socket instance (keeping all your original options)
export const socket = io(SOCKET_URL, {
  autoConnect: false,          // Preserved your original setting
  reconnection: true,         // Preserved
  reconnectionAttempts: 5,    // Preserved
  reconnectionDelay: 1000,    // Preserved
  withCredentials: true,      // Added for secure cookies
  transports: ['websocket']   // Added for better performance
});

// Custom hook for using socket.io (enhanced version with all original features)
export const useSocket = () => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [lastMessage, setLastMessage] = useState(null);
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [typingUsers, setTypingUsers] = useState([]);
  const [reconnectionAttempts, setReconnectionAttempts] = useState(0);

  // Connect to socket server (enhanced with username handling)
  const connect = (username) => {
    socket.connect();
    if (username) {
      socket.emit('user_join', username);
    }
  };

  // Disconnect from socket server (preserved)
  const disconnect = () => {
    socket.disconnect();
  };

  // Send a message (preserved)
  const sendMessage = (message) => {
    socket.emit('send_message', { message });
  };

  // Send a private message (preserved)
  const sendPrivateMessage = (to, message) => {
    socket.emit('private_message', { to, message });
  };

  // Set typing status (preserved)
  const setTyping = (isTyping) => {
    socket.emit('typing', isTyping);
  };

  // Join room (added new functionality)
  const joinRoom = (room) => {
    socket.emit('join_room', room);
  };

  // Socket event listeners (preserved all original events + added new ones)
  useEffect(() => {
    // Connection events
    const onConnect = () => {
      setIsConnected(true);
      setReconnectionAttempts(0);
    };

    const onDisconnect = () => {
      setIsConnected(false);
    };

    const onReconnectAttempt = () => {
      setReconnectionAttempts(prev => prev + 1);
    };

    // Message events (preserved)
    const onReceiveMessage = (message) => {
      setLastMessage(message);
      setMessages((prev) => [...prev, message]);
    };

    const onPrivateMessage = (message) => {
      setLastMessage(message);
      setMessages((prev) => [...prev, message]);
    };

    // User events (preserved)
    const onUserList = (userList) => {
      setUsers(userList);
    };

    const onUserJoined = (user) => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          system: true,
          message: `${user.username} joined the chat`,
          timestamp: new Date().toISOString(),
        },
      ]);
    };

    const onUserLeft = (user) => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          system: true,
          message: `${user.username} left the chat`,
          timestamp: new Date().toISOString(),
        },
      ]);
    };

    // Typing events (preserved)
    const onTypingUsers = (users) => {
      setTypingUsers(users);
    };

    // Room events (added new)
    const onRoomJoined = (room) => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          system: true,
          message: `You joined room: ${room}`,
          timestamp: new Date().toISOString(),
        },
      ]);
    };

    // Register all event listeners
    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('reconnect_attempt', onReconnectAttempt);
    socket.on('receive_message', onReceiveMessage);
    socket.on('private_message', onPrivateMessage);
    socket.on('user_list', onUserList);
    socket.on('user_joined', onUserJoined);
    socket.on('user_left', onUserLeft);
    socket.on('typing_users', onTypingUsers);
    socket.on('room_joined', onRoomJoined);

    // Clean up all event listeners
    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('reconnect_attempt', onReconnectAttempt);
      socket.off('receive_message', onReceiveMessage);
      socket.off('private_message', onPrivateMessage);
      socket.off('user_list', onUserList);
      socket.off('user_joined', onUserJoined);
      socket.off('user_left', onUserLeft);
      socket.off('typing_users', onTypingUsers);
      socket.off('room_joined', onRoomJoined);
    };
  }, []);

  return {
    socket,
    isConnected,
    lastMessage,
    messages,
    users,
    typingUsers,
    reconnectionAttempts,
    connect,
    disconnect,
    sendMessage,
    sendPrivateMessage,
    setTyping,
    joinRoom, // Added new method
  };
};

export default socket;