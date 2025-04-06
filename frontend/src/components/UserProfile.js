import React from 'react';
import './UserProfile.css';

const UserProfile = ({ user }) => {
  if (!user) return null;

  return (
    <div className="user-profile" title="View Profile">
      <img
        src={`https://api.dicebear.com/7.x/bottts/svg?seed=${user.username}`}
        alt={`${user.username}'s avatar`}
        className="avatar"
      />
      <div className="user-info">
        <h4>{user.username}</h4>
        <p>{user.email || 'Welcome user'}</p>
      </div>
    </div>
  );
};

export default UserProfile;
