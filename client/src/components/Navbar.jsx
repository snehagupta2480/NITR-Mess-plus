import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-primary text-textLight shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to={user?.role === 'admin' ? '/admin/dashboard' : '/student/dashboard'} className="text-2xl font-bold">
            NITR Mess Plus
          </Link>
          
          {user && (
            <div className="flex items-center gap-6">
              <span className="text-sm">
                Welcome, {user.name}
              </span>
              <button
                onClick={handleLogout}
                className="bg-white text-primary px-4 py-2 rounded hover:bg-gray-100 transition"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;