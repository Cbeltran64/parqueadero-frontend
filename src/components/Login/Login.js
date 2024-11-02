import React, { useState, useEffect } from 'react';
import axiosInstance from '../../services/authService';
import './Login.css';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState('');

  // Verificar si el usuario ya está autenticado
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/home');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/api/token/', {
        username,
        password,
      });
      console.log('Login successful:', response.data);
      // Guardar el token en localStorage
      localStorage.setItem('token', response.data.access);
      // Redirigir a la página principal
      navigate('/home');
    } catch (error) {
      console.error('Login failed:', error.response || error.message);
      // Mostrar mensaje de error al usuario
      setError('Credenciales inválidas. Por favor, inténtalo de nuevo.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <img src="/logo.png" alt="ParkGenius Logo" className="logo" />
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="input-field"
            placeholder="User"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            className="input-field"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="submit-button">
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
