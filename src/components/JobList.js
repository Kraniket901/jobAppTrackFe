import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const JobList = () => {
  const [jobApplications, setJobApplications] = useState([]);
  const [userRole, setUserRole] = useState('user'); // Default role

  useEffect(() => {
    const fetchJobApplications = async () => {
      try {
        const response = await axios.get('http://localhost:5000/jobApplications', {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        });
        setJobApplications(response.data.jobApplications);
        setUserRole(response.data.role);
      } catch (error) {
        console.error('Error fetching job applications:', error.message);
      }
    };

    fetchJobApplications();
  }, []);

  const navigate = useNavigate();

  const handleUpdate = (id) => {
    navigate(`/update/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/jobApplications/${id}`, {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      });
      setJobApplications((prevApplications) =>
        prevApplications.filter((application) => application._id !== id)
      );
      console.log(`Job application with ID ${id} deleted successfully`);
    } catch (error) {
      console.error('Error deleting job application:', error);
    }
  };

  return (
    <div>
      <h2>All Job Application</h2>
      <ul>
        {jobApplications.map((application) => (
          <li key={application._id}>
            {application.jobTitle} - {application.company}
            {userRole === 'admin' && (
              <>
                <button onClick={() => handleUpdate(application._id)}>Update</button>
                <button onClick={() => handleDelete(application._id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JobList;
