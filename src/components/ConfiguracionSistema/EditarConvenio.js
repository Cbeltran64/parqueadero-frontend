import React, { useState, useEffect } from 'react';
import axiosInstance from '../../services/authService';
import { useNavigate, useParams } from 'react-router-dom';
import SidebarMenu from '../SidebarMenu';
import './EditarConvenio.css';

export default function EditarConvenio() {
  const [formData, setFormData] = useState({
    nombre_convenio: '',
    porcentaje_descuento: '',
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const { id } = useParams(); // Obtener el ID del convenio desde la URL

  useEffect(() => {
    const fetchConvenio = async () => {
      try {
        const response = await axiosInstance.get(`/api/convenios/${id}/`);
        const data = response.data;
        setFormData({
          ...data,
        });
      } catch (error) {
        console.error('Error al obtener el convenio:', error);
      }
    };

    fetchConvenio();
  }, [id]);

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
      await axiosInstance.put(`/api/convenios/${id}/`, formData);
      setMessage('Convenio actualizado correctamente.');
      // Redirigir a la lista de convenios
      navigate('/configuracion-convenios');
    } catch (error) {
      console.error('Error al actualizar el convenio:', error);
      setMessage('Error al actualizar el convenio.');
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
          <h1 className="mt-4">Editar Convenio</h1>
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
              <button type="submit" className="btn btn-primary">
                Actualizar
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
