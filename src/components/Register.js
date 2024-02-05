import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    role: 'user', // Default role for registration
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/register', formData)
      .then(response => {
        console.log('User registered successfully:', response.data);
        navigate('/login');
      })
      .catch(error => console.error('Error registering user:', error));
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <label>Username:</label>
        <input type="text" name="username" value={formData.username} onChange={handleInputChange} required /> <br />
        <label>Password:</label>
        <input type="password" name="password" value={formData.password} onChange={handleInputChange} required /> <br />
        <label>Role:</label>
        <select name="role" value={formData.role} onChange={handleInputChange}>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select> <br />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
