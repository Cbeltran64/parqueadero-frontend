import React, { useState } from 'react';
import axiosInstance from '../services/authService';
import { useNavigate } from 'react-router-dom';
import SidebarMenu from './SidebarMenu';
import './CrearConvenio.css';

export default function CrearConvenio() {
  const [formData, setFormData] = useState({
    nombre_convenio: '',
    porcentaje_descuento: '',
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleVolver = () => {
    navigate('/configuracion-convenios');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post('/api/convenios/', formData);
      setMessage('Convenio creado correctamente.');
      // Redirigir a la lista de convenios
      navigate('/configuracion-convenios');
    } catch (error) {
      console.error('Error al crear el convenio:', error);
      setMessage('Error al crear el convenio.');
    }
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
          <h1 className="mt-4">Crear Convenio</h1>
          <form onSubmit={handleSubmit} className="mt-4">
            {/* Campos del formulario */}
            <div className="mb-3">
              <label className="form-label">Nombre del Convenio</label>
              <input
                type="text"
                className="form-control"
                name="nombre_convenio"
                value={formData.nombre_convenio}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Porcentaje de Descuento</label>
              <input
                type="number"
                className="form-control"
                name="porcentaje_descuento"
                value={formData.porcentaje_descuento}
                onChange={handleChange}
                required
                min="0"
                max="100"
                step="0.01"
              />
            </div>

            {/* Mensaje de éxito o error */}
            {message && <div className="alert alert-info">{message}</div>}

            {/* Botones */}
            <div className="form-buttons">
              <button type="submit" className="btn btn-success">
                Crear
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
