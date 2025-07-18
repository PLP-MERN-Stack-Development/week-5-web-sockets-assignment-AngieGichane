import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-900">Real-Time Chat</h1>
        {user && (
          <div className="flex items-center space-x-4">
            <span className="text-gray-700">Hello, {user.username}</span>
            <button
              onClick={handleLogout}
              className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300 text-sm"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;