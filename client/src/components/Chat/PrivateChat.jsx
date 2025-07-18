import { useEffect } from 'react';

const PrivateChat = ({ selectedUser, onClose }) => {
  useEffect(() => {
    return () => {
      // Cleanup when private chat is closed
      onClose();
    };
  }, [onClose]);

  if (!selectedUser) return null;

  return (
    <div className="border-t border-gray-300 p-4">
      <div className="flex justify-between items-center mb-2">
        <h4 className="font-medium">Private Chat with {selectedUser.username}</h4>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </div>
      <p className="text-sm text-gray-500">
        Messages in this chat are only visible to you and {selectedUser.username}
      </p>
    </div>
  );
};

export default PrivateChat;