import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateJobForm = () => {
  const { id } = useParams();
  const [jobApplication, setJobApplication] = useState({});
  const [formData, setFormData] = useState({
    jobTitle: '',
    company: '',
    applicationDate: '',
    status: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:5000/jobApplications/${id}`, {
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    })
      .then(response => {
        setJobApplication(response.data);
        // Update formData with values from the fetched data
        setFormData({
          jobTitle: response.data.jobTitle,
          company: response.data.company,
          applicationDate: response.data.applicationDate,
          status: response.data.status,
        });
      })
      .catch(error => console.error('Error fetching job application:', error))
      .finally(() => setLoading(false));
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:5000/jobApplications/${id}`, formData, {
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    })
      .then(response => {
        console.log('Job application updated:', response.data);
        navigate('/');
      })
      .catch(error => console.error('Error updating job application:', error));
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Update Job Application</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Job Title:
          <input type="text" name="jobTitle" value={formData.jobTitle} onChange={handleChange} />
        </label> <br />
        <label>
          Company Name:
          <input type="text" name="company" value={formData.company} onChange={handleChange} />
        </label> <br />
        <label>
          Application Date:
          <input type="date" name="applicationDate" value={formData.applicationDate} onChange={handleChange} />
        </label> <br />
        <label>
          Status:
          <input type="text" name="status" value={formData.status} onChange={handleChange} />
        </label> <br />
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateJobForm;
