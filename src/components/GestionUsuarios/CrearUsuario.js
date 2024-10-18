import React, { useState } from 'react';
import axiosInstance from '../../services/authService';
import { useNavigate } from 'react-router-dom';
import SidebarMenu from '../SidebarMenu';
import './CrearUsuario.css';

export default function CrearUsuario() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    first_name: '',
    last_name: '',
    is_active: true,
    is_staff: false,
    is_superuser: false,
    gestion_usuarios: false,
    configuracion_sistema: false,
    generacion_reportes: false,
    sistema: false,
    // No incluimos last_login y date_joined en la creación
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;
    setFormData({ ...formData, [name]: val });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post('/api/users/', formData);
      setMessage('Usuario creado correctamente.');
      // Redirigir a la lista de usuarios
      navigate('/gestion-usuarios');
    } catch (error) {
      console.error('Error al crear el usuario:', error);
      setMessage('Error al crear el usuario.');
    }
  };

  const handleVolver = () => {
    navigate('/gestion-usuarios');
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
          <h1 className="mt-4">Crear Usuario</h1>
          <form onSubmit={handleSubmit} className="mt-4">
            {/* Campos del formulario */}
            <div className="mb-3">
              <label className="form-label">Nombre de Usuario</label>
              <input
                type="text"
                className="form-control"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>

            {/* Campo de contraseña */}
            <div className="mb-3">
              <label className="form-label">Contraseña</label>
              <input
                type="password"
                className="form-control"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            {/* Otros campos */}
            <div className="mb-3">
              <label className="form-label">Nombre</label>
              <input
                type="text"
                className="form-control"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Apellido</label>
              <input
                type="text"
                className="form-control"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Correo Electrónico</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            {/* Campos de permisos y estado */}
            <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                name="is_active"
                checked={formData.is_active}
                onChange={handleChange}
              />
              <label className="form-check-label">Activo</label>
            </div>

            <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                name="is_staff"
                checked={formData.is_staff}
                onChange={handleChange}
              />
              <label className="form-check-label">Staff</label>
            </div>

            <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                name="is_superuser"
                checked={formData.is_superuser}
                onChange={handleChange}
              />
              <label className="form-check-label">Superusuario</label>
            </div>

            {/* Campos de permisos personalizados */}
            <div className="mb-3">
              <label className="form-label">Permisos Personalizados</label>
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="gestion_usuarios"
                  checked={formData.gestion_usuarios}
                  onChange={handleChange}
                />
                <label className="form-check-label">Gestión de Usuarios</label>
              </div>
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="configuracion_sistema"
                  checked={formData.configuracion_sistema}
                  onChange={handleChange}
                />
                <label className="form-check-label">Configuración del Sistema</label>
              </div>
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="generacion_reportes"
                  checked={formData.generacion_reportes}
                  onChange={handleChange}
                />
                <label className="form-check-label">Generación de Reportes</label>
              </div>
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="sistema"
                  checked={formData.sistema}
                  onChange={handleChange}
                />
                <label className="form-check-label">Sistema</label>
              </div>
            </div>

            {/* Mensaje de éxito o error */}
            {message && <div className="alert alert-info">{message}</div>}

            {/* Botones */}
            <div className="form-buttons">
              <button type="submit" className="btn btn-success">
                Crear Usuario
              </button>
              <button type="button" className="btn btn-danger" onClick={handleVolver}>
                Volver
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}