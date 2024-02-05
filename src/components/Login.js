import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData);
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/login', formData)
      .then(response => {
        localStorage.setItem('token', response.data.token);
        console.log('User logged in successfully:', response.data);
        navigate('/');
      })
      .catch(error => console.error('Error logging in:', error));
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>Username:</label>
        <input type="text" name="username" value={formData.username} onChange={handleInputChange} required /> <br />
        <label>Password:</label>
        <input type="password" name="password" value={formData.password} onChange={handleInputChange} required /> <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
