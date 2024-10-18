import React, { useState, useEffect } from 'react';
import axiosInstance from '../../services/authService';
import { useNavigate } from 'react-router-dom';
import SidebarMenu from '../SidebarMenu';
import './ConfiguracionParqueadero.css';

export default function ConfiguracionParqueadero() {
  const [formData, setFormData] = useState({
    nombre_parqueadero: '',
    nit: '',
    direccion: '',
    telefono: '',
    poliza: '',
    fecha_vencimiento_poliza: '',
    horario_atencion: '',
    atencion_cliente: '',
    capacidad_espacios: '',
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const response = await axiosInstance.get('/api/parkinginfo/1/');
        const data = response.data;
        setFormData({
          ...data,
          fecha_vencimiento_poliza: data.fecha_vencimiento_poliza || '',
          horario_atencion: data.horario_atencion || '',
        });
      } catch (error) {
        if (error.response && error.response.status === 404) {
          // Si no existe el registro, los campos permanecerán vacíos
          console.log('No existe configuración previa. Puede crear una nueva.');
        } else {
          console.error('Error al obtener la configuración:', error);
        }
      }
    };

    fetchConfig();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLimpiar = () => {
    setFormData({
      nombre_parqueadero: '',
      nit: '',
      direccion: '',
      telefono: '',
      poliza: '',
      fecha_vencimiento_poliza: '',
      horario_atencion: '',
      atencion_cliente: '',
      capacidad_espacios: '',
    });
  };

  const handleVolver = () => {
    navigate('/configuracion-sistema');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.put(`/api/parkinginfo/1/`, formData);
      setMessage('Configuración actualizada correctamente.');
    } catch (error) {
      if (error.response && error.response.status === 404) {
        // Si no existe el registro, lo creamos
        try {
          await axiosInstance.post('/api/parkinginfo/', { ...formData, id: 1 });
          setMessage('Configuración creada correctamente.');
        } catch (err) {
          console.error('Error al crear la configuración:', err);
          setMessage('Error al crear la configuración.');
        }
      } else {
        console.error('Error al guardar la configuración:', error);
        setMessage('Error al guardar la configuración.');
      }
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
          <h1 className="mt-4">Configuración de Parqueadero</h1>
          <form onSubmit={handleSubmit} className="mt-4">
            {/* Campos del formulario */}
            <div className="mb-3">
              <label className="form-label">Nombre del Parqueadero</label>
              <input
                type="text"
                className="form-control"
                name="nombre_parqueadero"
                value={formData.nombre_parqueadero}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">NIT</label>
              <input
                type="text"
                className="form-control"
                name="nit"
                value={formData.nit}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Dirección</label>
              <input
                type="text"
                className="form-control"
                name="direccion"
                value={formData.direccion}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Teléfono</label>
              <input
                type="text"
                className="form-control"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Póliza</label>
              <input
                type="text"
                className="form-control"
                name="poliza"
                value={formData.poliza}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Fecha de Vencimiento de Póliza</label>
              <input
                type="date"
                className="form-control"
                name="fecha_vencimiento_poliza"
                value={formData.fecha_vencimiento_poliza}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Horario de Atención</label>
              <input
                type="text"
                className="form-control"
                name="horario_atencion"
                value={formData.horario_atencion}
                onChange={handleChange}
                maxLength="250"
                placeholder="Por ejemplo: Lunes a Viernes: 8am - 5pm"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Atención al Cliente</label>
              <input
                type="text"
                className="form-control"
                name="atencion_cliente"
                value={formData.atencion_cliente}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Capacidad de Espacios</label>
              <input
                type="number"
                className="form-control"
                name="capacidad_espacios"
                value={formData.capacidad_espacios}
                onChange={handleChange}
                required
              />
            </div>

            {/* Mensaje de éxito o error */}
            {message && <div className="alert alert-info">{message}</div>}

            {/* Botones */}
            <div className="form-buttons">
              <button type="submit" className="btn btn-primary">
                Actualizar
              </button>
              <button type="button" className="btn btn-secondary" onClick={handleLimpiar}>
                Limpiar
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