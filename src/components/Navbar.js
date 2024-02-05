import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const token = localStorage.getItem('token');
  const isAdmin = token ? JSON.parse(atob(token.split('.')[1])).role === 'admin' : false;

  return (
    <nav>
      <ul>
        <li><Link to="/">Job List</Link></li>
        {token ? (
          <>
            <li><button onClick={handleLogout}>Logout</button></li>
            {isAdmin && <li><Link to="/add">Add Job</Link></li>}
          </>
        ) : (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;