import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Eliminar el token del localStorage
    localStorage.removeItem('token');
    // Redirigir a la página de inicio de sesión
    navigate('/');
  };

  return (
    <div>
      <h1>Bienvenido a ParkGenius</h1>
      <button onClick={handleLogout}>Cerrar sesión</button>
    </div>
  );
}
