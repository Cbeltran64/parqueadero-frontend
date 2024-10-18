import React, { useState } from 'react';
import axiosInstance from '../../services/authService';
import UserForm from './UserForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

export default function UserRow({ user }) {
  const [showDetails, setShowDetails] = useState(false);
  const [userData, setUserData] = useState(user);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const handleUpdate = (updatedUser) => {
    setUserData({ ...userData, ...updatedUser });
    setShowDetails(false);
  };

  const handleDeactivate = async () => {
    if (window.confirm('¿Estás seguro de desactivar este usuario?')) {
      try {
        await axiosInstance.patch(`/api/users/${userData.id}/`, { is_active: false });
        setUserData({ ...userData, is_active: false });
        setShowDetails(false);
      } catch (error) {
        console.error('Error al desactivar el usuario:', error);
      }
    }
  };

  return (
    <>
      <tr>
        <td>{userData.id}</td>
        <td>
          {userData.first_name} {userData.last_name}
        </td>
        <td>{userData.username}</td>
        <td>{userData.email}</td>
        <td>
          {userData.is_active ? (
            <FontAwesomeIcon icon={faCheckCircle} className="text-success" />
          ) : (
            <FontAwesomeIcon icon={faTimesCircle} className="text-danger" />
          )}
        </td>
        <td>
          <button className="btn btn-link" onClick={toggleDetails}>
            <FontAwesomeIcon icon={faChevronDown} />
          </button>
        </td>
      </tr>
      {showDetails && (
        <tr>
          <td colSpan="6">
            <UserForm
              user={userData}
              onUpdate={handleUpdate}
              onDeactivate={handleDeactivate}
            />
          </td>
        </tr>
      )}
    </>
  );
}