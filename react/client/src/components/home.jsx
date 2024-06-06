import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('token');

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div>
      <h1>Home</h1>
      <Link to='/editUser'>Edit User</Link>
      <br />
      <a onClick={handleLogout} style={{ color: 'red',cursor:'pointer' }}>Logout</a>
    </div>
  );
};

export default Home;