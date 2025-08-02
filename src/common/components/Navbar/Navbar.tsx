import React from 'react';
import { useNavigate } from 'react-router';

import { authApi } from '../../../api';
import { useUser } from '../../../context/UserContext/UserContext';

const Navbar = () => {
  const navigate = useNavigate();
  const { setUser } = useUser();

  const handleLogout = async () => {
    await authApi.delete('/v1/users/logout');
    setUser(null);
    navigate('/login');
  };

  return (
    <nav className="bg-gray-100 px-6 py-4 flex justify-between items-center">
      <div className="text-gray-600 text-xl font-semibold">
        <a href="/">filmotheque</a>
      </div>
      <button
        onClick={handleLogout}
        className="border-2 border-red-600 bg-transparent text-red-600 py-1 px-3 rounded-sm"
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
