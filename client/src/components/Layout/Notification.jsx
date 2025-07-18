import { useEffect } from 'react';

const Notification = ({ message, onClose }) => {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className="fixed bottom-4 right-4 p-4 bg-blue-500 text-white rounded-lg shadow-lg max-w-xs">
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-bold">{message.title}</h4>
          <p className="text-sm">{message.body}</p>
        </div>
        <button onClick={onClose} className="ml-2 text-white hover:text-gray-200">
          ✕
        </button>
      </div>
    </div>
  );
};

export default Notification;