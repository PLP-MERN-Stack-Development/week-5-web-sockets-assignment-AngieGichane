import { useContext } from 'react';
import AuthContext from '../../context/AuthContext';

const OnlineUsers = ({ users, selectedUser, onSelectUser }) => {
  const { user: currentUser } = useContext(AuthContext);

  return (
    <div className="p-4">
      <h3 className="font-semibold text-lg mb-4">Online Users ({users.length})</h3>
      <ul className="space-y-2">
        {users
          .filter((user) => user.id !== currentUser?.id)
          .map((user) => (
            <li
              key={user.id}
              className={`p-2 rounded cursor-pointer ${
                selectedUser?.id === user.id
                  ? 'bg-blue-100 border border-blue-300'
                  : 'hover:bg-gray-100'
              }`}
              onClick={() => onSelectUser(user)}
            >
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                <span>{user.username}</span>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default OnlineUsers;