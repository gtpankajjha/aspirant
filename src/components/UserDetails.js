import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './style/UserDetails.css'; 

const UserDetails = () => {
  const { id } = useParams(); // Get user ID from URL
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [id, token]);

  if (loading) {
    return <p className="loading-message">Loading user details...</p>;
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  return user ? (
    <div className="user-details-container">
      <h2 className="user-details-title">User Details</h2>
      <img
        src={user.avatar}
        alt={`${user.first_name} ${user.last_name}`}
        className="user-avatar"
      />
      <div className="user-info">
        <p>
          <strong>Name:</strong> {user.first_name} {user.last_name}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
      </div>
    </div>
  ) : (
    <p className="error-message">No user found.</p>
  );
};

export default UserDetails;
