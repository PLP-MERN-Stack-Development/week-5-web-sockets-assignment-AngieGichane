import { useState, useEffect, useRef, useContext } from 'react';
import { useSocket } from '../../hooks/useSocket';
import MessageList from './MessageList';
import OnlineUsers from './OnlineUsers';
import TypingIndicator from '../UI/TypingIndicator';
import Input from '../UI/Input';
import Button from '../UI/Button';
import PrivateChat from './PrivateChat';
import RoomSelector from './RoomSelector';
import Notification from '../Layout/Notification';
import AuthContext from '../../context/AuthContext';

const ChatContainer = () => {
  const { user } = useContext(AuthContext);
  const {
    isConnected,
    messages,
    users,
    typingUsers,
    sendMessage,
    sendPrivateMessage,
    setTyping,
    connect,
    disconnect,
    joinRoom
  } = useSocket();
  
  const [message, setMessage] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentRoom, setCurrentRoom] = useState('global');
  const [notification, setNotification] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (user?.username) {
      connect(user.username);
    }
    return () => disconnect();
  }, [user, connect, disconnect]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      if (selectedUser) {
        sendPrivateMessage(selectedUser.id, message);
      } else {
        sendMessage(message);
      }
      setMessage('');
      setTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleTypingChange = (e) => {
    setMessage(e.target.value);
    setTyping(e.target.value.length > 0);
  };

  const handleUserSelect = (user) => {
    setSelectedUser(user.id === selectedUser?.id ? null : user);
  };

  const handleRoomChange = (room) => {
    setCurrentRoom(room);
    setSelectedUser(null);
    joinRoom(room);
  };

  if (!user) return <div>Please login to access the chat</div>;

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-1/4 border-r border-gray-300 bg-white">
        <OnlineUsers 
          users={users} 
          selectedUser={selectedUser} 
          onSelectUser={handleUserSelect} 
        />
        <RoomSelector 
          currentRoom={currentRoom} 
          onRoomChange={handleRoomChange} 
        />
      </div>
      
      <div className="flex flex-col w-3/4">
        <div className="p-4 border-b border-gray-300 bg-white">
          <h2 className="text-xl font-semibold">
            {selectedUser ? `Private chat with ${selectedUser.username}` : currentRoom}
          </h2>
          <TypingIndicator typingUsers={typingUsers} />
        </div>
        
        <div className="flex-1 overflow-y-auto p-4">
          <MessageList messages={messages} currentUser={user} />
          <div ref={messagesEndRef} />
        </div>
        
        <div className="p-4 border-t border-gray-300 bg-white">
          <div className="flex gap-2">
            <Input
              value={message}
              onChange={handleTypingChange}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              className="flex-1"
            />
            <Button onClick={handleSendMessage} disabled={!message.trim()}>
              Send
            </Button>
          </div>
        </div>
      </div>
      
      <Notification 
        message={notification} 
        onClose={() => setNotification(null)} 
      />
    </div>
  );
};

export default ChatContainer;