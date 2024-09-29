// src/components/EditUser.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './style/EditUser.css'; // Import the CSS file

const EditUser = () => {
  const { id } = useParams(); // Get user ID from URL
  const navigate = useNavigate(); // For navigation after update
  const [user, setUser] = useState({
    first_name: '',
    last_name: '',
    email: '',
    avatar: '',
  });
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false); // State to show modal

  // Bearer Token
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`https://reqres.in/api/users/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data.data);
      } catch (err) {
        setError('Failed to fetch user details');
        console.error(err);
      }
    };

    fetchUserDetails();
  }, [id, token]);

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Simulate user update and display the modal
      console.log('Updated User:', user);
      setShowModal(true); // Show modal on successful update
    } catch (err) {
      setError('Failed to update user');
      console.error(err);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    navigate('/users'); // Navigate back to user list after closing the modal
  };

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  return (
    <div className="edit-user-container">
      <h2 className="edit-user-title">Edit User</h2>
      <form onSubmit={handleSubmit} className="edit-user-form">
        <div className="form-group">
          <label>First Name:</label>
          <input
            type="text"
            name="first_name"
            value={user.first_name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Last Name:</label>
          <input
            type="text"
            name="last_name"
            value={user.last_name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Avatar URL:</label>
          <input
            type="text"
            name="avatar"
            value={user.avatar}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="update-button">Update User</button>
      </form>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>User Updated Successfully!</h2>
            <button className="close-modal-button" onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditUser;
