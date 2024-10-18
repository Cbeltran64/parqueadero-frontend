import React, { useState, useEffect } from 'react';
import axiosInstance from '../../services/authService';
import './UserForm.css';

export default function UserForm({ user, onUpdate, onDeactivate }) {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    first_name: '',
    last_name: '',
    password: '',
    is_active: true,
    is_staff: false,
    is_superuser: false,
    gestion_usuarios: false,
    configuracion_sistema: false,
    generacion_reportes: false,
    sistema: false,
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Cargamos los datos del usuario en el formulario
    setFormData({
      username: user.username || '',
      email: user.email || '',
      first_name: user.first_name || '',
      last_name: user.last_name || '',
      password: '', // El campo contraseña se deja vacío inicialmente
      is_active: user.is_active,
      is_staff: user.is_staff,
      is_superuser: user.is_superuser,
      gestion_usuarios: user.gestion_usuarios,
      configuracion_sistema: user.configuracion_sistema,
      generacion_reportes: user.generacion_reportes,
      sistema: user.sistema,
    });
  }, [user]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;
    setFormData({ ...formData, [name]: val });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Creamos una copia de formData
      const dataToSend = { ...formData };

      // Si el campo password está vacío, lo eliminamos del objeto
      if (!dataToSend.password || dataToSend.password.trim() === '') {
        delete dataToSend.password;
      }

      // Usamos PATCH para actualizaciones parciales
      await axiosInstance.patch(`/api/users/${user.id}/`, dataToSend);

      setMessage('Usuario actualizado correctamente.');
      onUpdate(dataToSend);
    } catch (error) {
      console.error('Error al actualizar el usuario:', error);
      if (error.response && error.response.data) {
        // Extraemos y mostramos los mensajes de error del backend
        const errorMessages = Object.values(error.response.data)
          .flat()
          .join(' ');
        setMessage(`Error al actualizar el usuario: ${errorMessages}`);
      } else {
        setMessage('Error al actualizar el usuario.');
      }
    }
  };

  return (
    <div className="user-form-container">
      <form onSubmit={handleSubmit}>
        {/* Contenedor de campos del formulario */}
        <div className="form-fields">
          {/* Fila 1 */}
          <div className="form-group">
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

          <div className="form-group">
            <label className="form-label">Nombre</label>
            <input
              type="text"
              className="form-control"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Apellido</label>
            <input
              type="text"
              className="form-control"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
            />
          </div>

          {/* Fila 2 */}
          <div className="form-group">
            <label className="form-label">Correo Electrónico</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              Contraseña (dejar en blanco para no cambiar)
            </label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          {/* Espacio vacío para mantener la estructura de tres columnas */}
          <div className="form-group"></div>

          {/* Fila 3 - Checkboxes */}
          <div className="form-group">
            <label className="form-label">Estado</label>
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                name="is_active"
                checked={formData.is_active}
                onChange={handleChange}
              />
              <label className="form-check-label">Activo</label>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Roles</label>
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                name="is_staff"
                checked={formData.is_staff}
                onChange={handleChange}
              />
              <label className="form-check-label">Staff</label>
            </div>
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                name="is_superuser"
                checked={formData.is_superuser}
                onChange={handleChange}
              />
              <label className="form-check-label">Superusuario</label>
            </div>
          </div>

          {/* Espacio vacío para mantener la estructura de tres columnas */}
          <div className="form-group"></div>

          {/* Fila 4 - Permisos Personalizados */}
          <div className="form-group">
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
              <label className="form-check-label">
                Configuración del Sistema
              </label>
            </div>
          </div>

          <div className="form-group">
            {/* Etiqueta vacía para alineación */}
            <label className="form-label">&nbsp;</label>
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                name="generacion_reportes"
                checked={formData.generacion_reportes}
                onChange={handleChange}
              />
              <label className="form-check-label">
                Generación de Reportes
              </label>
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

          {/* Espacio vacío para mantener la estructura de tres columnas */}
          <div className="form-group"></div>
        </div>

        {/* Mensaje de éxito o error */}
        {message && <div className="alert alert-info mt-3">{message}</div>}

        {/* Botones */}
        <div className="form-buttons mt-3">
          <button type="submit" className="btn btn-primary">
            Actualizar Usuario
          </button>
          <button type="button" className="btn btn-danger" onClick={onDeactivate}>
            Desactivar Usuario
          </button>
        </div>
      </form>
    </div>
  );
}