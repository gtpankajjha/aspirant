// src/components/UserList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './style/UserList.css'; // Import the CSS for styling

const UserList = () => {
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://reqres.in/api/users', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(response.data.data);
      } catch (err) {
        console.error('Error fetching users:', err);
      }
    };
    fetchUsers();
  }, [token]);

  return (
    <div className="userlist-container">
      <h2 className="userlist-title">User List</h2>
      <Link to="/create-user" className="create-user-link">
        <button className="create-user-button">Create New User</button>
      </Link>
      <ul className="userlist">
        {users.map((user) => (
          <li key={user.id} className="user-item">
            <img
              src={user.avatar}
              alt={`${user.first_name} ${user.last_name}`}
              className="user-avatar"
            />
            <p className="user-info">
              {user.first_name} {user.last_name} <br />
              <span className="user-email">({user.email})</span>
            </p>
            <div className="user-actions">
              <Link to={`/user-details/${user.id}`}>
                <button className="action-button">Details</button>
              </Link>
              <Link to={`/edit-user/${user.id}`}>
                <button className="action-button">Edit</button>
              </Link>
              <Link to={`/file-preview/${user.id}`}>
                <button className="action-button">Files</button>
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
