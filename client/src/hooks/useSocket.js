import { useEffect, useState, useCallback } from 'react';
import { io } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';

export const useSocket = () => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [typingUsers, setTypingUsers] = useState([]);
  const [reconnectionAttempts, setReconnectionAttempts] = useState(0);

  const connect = useCallback((username) => {
    const newSocket = io(SOCKET_URL, {
      autoConnect: true,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      query: { username },
    });

    newSocket.on('connect', () => {
      setIsConnected(true);
      setReconnectionAttempts(0);
      if (username) {
        newSocket.emit('user_join', username);
      }
    });

    newSocket.on('disconnect', () => {
      setIsConnected(false);
    });

    newSocket.on('reconnect_attempt', () => {
      setReconnectionAttempts(prev => prev + 1);
    });

    newSocket.on('receive_message', (message) => {
      setMessages(prev => [...prev, message]);
    });

    newSocket.on('private_message', (message) => {
      setMessages(prev => [...prev, message]);
    });

    newSocket.on('user_list', (userList) => {
      setUsers(userList);
    });

    newSocket.on('user_joined', (user) => {
      setUsers(prev => [...prev.filter(u => u.id !== user.id), user]);
    });

    newSocket.on('user_left', (user) => {
      setUsers(prev => prev.filter(u => u.id !== user.id));
    });

    newSocket.on('typing_users', (users) => {
      setTypingUsers(users);
    });

    newSocket.on('error', (error) => {
      console.error('Socket error:', error);
    });

    setSocket(newSocket);
    return newSocket;
  }, []);

  const disconnect = useCallback(() => {
    if (socket) {
      socket.disconnect();
      setSocket(null);
      setIsConnected(false);
    }
  }, [socket]);

  const sendMessage = useCallback((message) => {
    if (socket && isConnected) {
      socket.emit('send_message', { message });
    }
  }, [socket, isConnected]);

  const sendPrivateMessage = useCallback((to, message) => {
    if (socket && isConnected) {
      socket.emit('private_message', { to, message });
    }
  }, [socket, isConnected]);

  const setTyping = useCallback((isTyping) => {
    if (socket && isConnected) {
      socket.emit('typing', isTyping);
    }
  }, [socket, isConnected]);

  const joinRoom = useCallback((room) => {
    if (socket && isConnected) {
      socket.emit('join_room', room);
    }
  }, [socket, isConnected]);

  useEffect(() => {
    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [socket]);

  return {
    socket,
    isConnected,
    messages,
    users,
    typingUsers,
    reconnectionAttempts,
    connect,
    disconnect,
    sendMessage,
    sendPrivateMessage,
    setTyping,
    joinRoom,
  };
};

const socket = io(SOCKET_URL, {
  autoConnect: false,
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
  withCredentials: true,
  transports: ['websocket'],
});

export default socket;