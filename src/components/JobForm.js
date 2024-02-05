import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const JobForm = () => {
  const [formData, setFormData] = useState({
    jobTitle: '',
    company: '',
    applicationDate: '',
    status: '',
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/jobApplications', formData, {
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    })
      .then(response => {
        console.log('Job application added:', response.data);
        navigate('/');
      })
      .catch(error => console.error('Error adding job application:', error));
  };

  return (
    <div>
      <h2>Add Job Application</h2>
      <form onSubmit={handleSubmit}>
        <label>Job Title:</label>
        <input type="text" name="jobTitle" value={formData.jobTitle} onChange={handleInputChange} required /> <br />
        <label>Company Name:</label>
        <input type="text" name="company" value={formData.company} onChange={handleInputChange} required /> <br />
        <label>Application Date:</label>
        <input type="date" name="applicationDate" value={formData.applicationDate} onChange={handleInputChange} required /> <br />
        <label>Status:</label>
        <input type="text" name="status" value={formData.status} onChange={handleInputChange} required />
        <button type="submit">Add Application</button>
      </form>
    </div>
  );
};

export default JobForm;
