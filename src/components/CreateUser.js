// src/components/CreateUser.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateUser = ({ onUserCreated }) => { // Receive a callback prop
  const [name, setName] = useState('');
  const [job, setJob] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Bearer Token
  const token = localStorage.getItem('token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'https://reqres.in/api/users',
        {
          name,
          job,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('User Created:', response.data);
      alert('User created successfully!');
      
      // Call the callback to update the user list in the parent component
      if (onUserCreated) {
        onUserCreated(response.data);
      }

      navigate('/users'); // Navigate back to user list
    } catch (err) {
      setError('Failed to create user');
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Create User</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter name"
            required
          />
        </div>
        <div>
          <input
            type="text"
            value={job}
            onChange={(e) => setJob(e.target.value)}
            placeholder="Enter job"
            required
          />
        </div>
        <button type="submit">Create User</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};

export default CreateUser;
