// src/components/SidebarMenu.js

import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import axiosInstance from '../services/authService'; // Ruta actualizada
import './SidebarMenu.css';

export default function SidebarMenu() {
  const navigate = useNavigate();
  const [permissions, setPermissions] = useState({
    gestion_usuarios: false,
    configuracion_sistema: false,
    generacion_reportes: false,
    sistema: false,
  });

  useEffect(() => {
    const fetchPermissions = async () => {
      try {
        const response = await axiosInstance.get('/api/users/menu-permissions/');
        setPermissions(response.data);
      } catch (error) {
        console.error('Error al obtener los permisos del usuario:', error);
      }
    };

    fetchPermissions();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const menuOptions = [
    {
      label: 'Gestión de Usuarios',
      icon: 'fas fa-users',
      link: '/gestion-usuarios',
      permission: permissions.gestion_usuarios,
      backgroundColor: '#6902FF',
    },
    {
      label: 'Configuración de Sistema',
      icon: 'fas fa-cogs',
      link: '/configuracion-sistema',
      permission: permissions.configuracion_sistema,
      backgroundColor: '#15B0F6',
    },
    {
      label: 'Generación de Reportes',
      icon: 'fas fa-file-alt',
      link: '/reportes',
      permission: permissions.generacion_reportes,
      backgroundColor: '#06DCC2',
    },
    {
      label: 'Sistema',
      icon: 'fas fa-desktop',
      link: '/sistema',
      permission: permissions.sistema,
      backgroundColor: '#140055',
    },
  ];

  return (
    <div className="sidebar-menu d-flex flex-column align-items-center py-3">
      <div className="logo mb-4">
        <img src="/logo.png" alt="ParkGenius" className="img-fluid" />
      </div>
      <h6 className="menu-heading text-white text-center mb-4">Menú</h6>
      <ul className="nav flex-column w-100">
        {menuOptions
          .filter((option) => option.permission)
          .map((option, index) => (
            <li className="nav-item mb-3" key={index}>
              <Link
                className="nav-link text-white d-flex flex-column align-items-center"
                to={option.link}
                style={{
                  backgroundColor: option.backgroundColor,
                  borderRadius: '8px',
                  padding: '10px 0',
                  margin: '0 10px',
                }}
              >
                <i className={`${option.icon}`} style={{ fontSize: '24px' }}></i>
                <span style={{ marginTop: '5px', fontSize: '14px' }}>{option.label}</span>
              </Link>
            </li>
          ))}
      </ul>
      <div className="mt-auto w-100 px-3">
        <button
          className="btn btn-danger w-100"
          onClick={handleLogout}
          style={{ borderRadius: '8px' }}
        >
          <i className="fas fa-sign-out-alt me-2"></i> Cerrar Sesión
        </button>
      </div>
    </div>
  );
}