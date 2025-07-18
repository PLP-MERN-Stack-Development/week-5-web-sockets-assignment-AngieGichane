const RoomSelector = ({ currentRoom, onRoomChange }) => {
  const rooms = ['global', 'general', 'random', 'help'];

  return (
    <div className="p-4 border-t border-gray-300">
      <h3 className="font-semibold text-lg mb-2">Chat Rooms</h3>
      <div className="flex flex-wrap gap-2">
        {rooms.map((room) => (
          <button
            key={room}
            onClick={() => onRoomChange(room)}
            className={`px-3 py-1 rounded-full text-sm ${
              currentRoom === room
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            #{room}
          </button>
        ))}
      </div>
    </div>
  );
};

export default RoomSelector;