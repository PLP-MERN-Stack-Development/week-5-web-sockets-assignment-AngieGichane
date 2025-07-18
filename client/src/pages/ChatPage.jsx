import { useContext } from 'react';
import ChatContainer from '../components/Chat/ChatContainer';
import AuthContext from '../context/AuthContext';

const ChatPage = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <div>Please login to access the chat</div>;
  }

  return (
    <div className="h-screen flex flex-col">
      <ChatContainer username={user.username} />
    </div>
  );
};

export default ChatPage;