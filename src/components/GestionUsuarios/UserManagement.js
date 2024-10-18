import React, { useState, useEffect } from 'react';
import axiosInstance from '../../services/authService';
import { useNavigate } from 'react-router-dom';
import SidebarMenu from '../SidebarMenu';
import UserRow from './UserRow';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import './UserManagement.css';

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get('/api/users/');
        setUsers(response.data);
      } catch (error) {
        console.error('Error al obtener los usuarios:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleCreateUser = () => {
    navigate('/crear-usuario');
  };

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar */}
        <div className="col-12 col-md-3 col-lg-2 p-0">
          <SidebarMenu />
        </div>

        {/* Main content */}
        <main className="col-12 col-md-9 col-lg-10 px-4 main-content">
          <div className="d-flex justify-content-between align-items-center mt-4">
            <h1>Gestión de Usuarios</h1>
            <button className="btn btn-success" onClick={handleCreateUser}>
              <FontAwesomeIcon icon={faPlus} /> Crear Usuario
            </button>
          </div>

          {/* Contenedor con scroll que incluye toda el área de contenido */}
          <div className="user-content-container mt-4">
            <table className="table user-table">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Nombre</th>
                  <th>Usuario</th>
                  <th>Correo</th>
                  <th>Activo</th>
                  <th>Detalles</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <UserRow key={user.id} user={user} />
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}