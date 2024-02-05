import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import JobList from './components/JobList';
import JobForm from './components/JobForm';
import UpdateJobForm from './components/UpdateJobForm';
import Register from './components/Register';
import Login from './components/Login';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<JobList />} />
        <Route path="/add" element={<JobForm />} />
        <Route path="/update/:id" element={<UpdateJobForm />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
