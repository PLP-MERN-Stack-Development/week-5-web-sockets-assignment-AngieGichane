const TypingIndicator = ({ typingUsers }) => {
  if (typingUsers.length === 0) return null;

  return (
    <div className="text-sm text-gray-500 italic">
      {typingUsers.length === 1
        ? `${typingUsers[0]} is typing...`
        : `${typingUsers.join(', ')} are typing...`}
    </div>
  );
};

export default TypingIndicator;