import { format } from 'date-fns';
import { useContext } from 'react';
import AuthContext from '../../context/AuthContext';

const Message = ({ message, currentUser }) => {
  const { user } = useContext(AuthContext);
  const isCurrentUser = message.senderId === user?.id;
  const isSystem = message.system;

  // Reaction emoji mapping
  const reactionEmojis = {
    like: '👍',
    love: '❤️',
    laugh: '😂',
    wow: '😮',
    sad: '😢',
    angry: '😠'
  };

  return (
    <div 
      className={`flex mb-4 ${isCurrentUser ? 'justify-end' : 'justify-start'} ${
        isSystem ? 'justify-center' : ''
      }`}
    >
      <div
        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg relative ${
          isSystem
            ? 'bg-gray-200 text-gray-700 text-sm'
            : isCurrentUser
            ? 'bg-blue-500 text-white'
            : 'bg-gray-200 text-gray-800'
        }`}
      >
        {!isSystem && (
          <div className="font-semibold">
            {isCurrentUser ? 'You' : message.sender}
          </div>
        )}
        <div className="whitespace-pre-wrap">{message.message}</div>
        
        {/* Message timestamp */}
        <div className={`text-xs mt-1 ${
          isCurrentUser && !isSystem ? 'text-blue-100' : 'text-gray-500'
        }`}>
          {format(new Date(message.timestamp), 'HH:mm')}
          {message.read && isCurrentUser && (
            <span className="ml-1">✓✓</span>
          )}
        </div>
        
        {/* Message reactions */}
        {message.reactions && Object.keys(message.reactions).length > 0 && (
          <div className="absolute -bottom-2 right-2 flex space-x-1 bg-white/90 dark:bg-gray-800/90 rounded-full px-2 py-0.5 shadow">
            {Object.entries(message.reactions).map(([reaction, userIds]) => (
              <span key={reaction} className="text-xs">
                {reactionEmojis[reaction]} {userIds.length}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Message;