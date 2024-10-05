// src/components/SidebarMenu.js

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Importación correcta
import './SidebarMenu.css';

export default function SidebarMenu() {
  const navigate = useNavigate();

  // Obtener el token desde localStorage
  const token = localStorage.getItem('token');

  // Decodificar el token para obtener el rol del usuario
  let role = '';
  if (token) {
    const decoded = jwtDecode(token); // Uso de jwtDecode
    role = decoded.role; // Asegúrate de que 'role' está incluido en el token JWT
  }

  // Definir las opciones del menú según el rol del usuario
  const menuOptions = [
    {
      label: 'Gestión de Usuarios',
      icon: 'fas fa-users',
      link: '/gestion-usuarios',
      roles: ['admin', 'other_user'],
      backgroundColor: '#6902FF',
    },
    {
      label: 'Configuración de Sistema',
      icon: 'fas fa-cogs',
      link: '/configuracion-sistema',
      roles: ['admin', 'other_user'],
      backgroundColor: '#15B0F6',
    },
    {
      label: 'Generación de Reportes',
      icon: 'fas fa-file-alt',
      link: '/reportes',
      roles: ['admin', 'operator', 'other_user'],
      backgroundColor: '#06DCC2',
    },
    {
      label: 'Sistema',
      icon: 'fas fa-desktop',
      link: '/sistema',
      roles: ['admin', 'operator', 'other_user'],
      backgroundColor: '#140055',
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="sidebar-menu d-flex flex-column align-items-center py-3">
      <div className="logo mb-4">
        <img src="/logo.png" alt="ParkGenius" className="img-fluid" />
      </div>
      <h6 className="menu-heading text-white text-center mb-4">Menú</h6>
      <ul className="nav flex-column w-100">
        {menuOptions
          .filter((option) => option.roles.includes(role))
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