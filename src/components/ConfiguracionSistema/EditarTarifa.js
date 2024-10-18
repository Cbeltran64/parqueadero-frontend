import React, { useState, useEffect } from 'react';
import axiosInstance from '../../services/authService';
import { useNavigate, useParams } from 'react-router-dom';
import SidebarMenu from '../SidebarMenu';
import './EditarTarifa.css';

export default function EditarTarifa() {
  const [formData, setFormData] = useState({
    nombre_tarifa: '',
    vehicle_type: '',
    price_per_minute: '',
    convenio: '',
  });
  const [convenios, setConvenios] = useState([]);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const { id } = useParams(); // Obtener el ID de la tarifa desde la URL

  useEffect(() => {
    const fetchTarifa = async () => {
      try {
        const response = await axiosInstance.get(`/api/tariffs/${id}/`);
        const data = response.data;
        setFormData({
          ...data,
          convenio: data.convenio || '',
        });
      } catch (error) {
        console.error('Error al obtener la tarifa:', error);
      }
    };

    const fetchConvenios = async () => {
      try {
        const response = await axiosInstance.get('/api/convenios/');
        setConvenios(response.data.results || response.data);
      } catch (error) {
        console.error('Error al obtener los convenios:', error);
      }
    };

    fetchTarifa();
    fetchConvenios();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleVolver = () => {
    navigate('/configuracion-tarifas');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.put(`/api/tariffs/${id}/`, formData);
      setMessage('Tarifa actualizada correctamente.');
      // Redirigir a la lista de tarifas
      navigate('/configuracion-tarifas');
    } catch (error) {
      console.error('Error al actualizar la tarifa:', error);
      setMessage('Error al actualizar la tarifa.');
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
          <h1 className="mt-4">Editar Tarifa</h1>
          <form onSubmit={handleSubmit} className="mt-4">
            {/* Campos del formulario */}
            <div className="mb-3">
              <label className="form-label">Nombre Tarifa</label>
              <input
                type="text"
                className="form-control"
                name="nombre_tarifa"
                value={formData.nombre_tarifa}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Tipo de Vehículo</label>
              <select
                className="form-control"
                name="vehicle_type"
                value={formData.vehicle_type}
                onChange={handleChange}
                required
              >
                <option value="">Seleccione</option>
                <option value="car">Carro</option>
                <option value="motorcycle">Moto</option>
                <option value="bicycle">Bicicleta</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Precio por Minuto</label>
              <input
                type="number"
                className="form-control"
                name="price_per_minute"
                value={formData.price_per_minute}
                onChange={handleChange}
                required
                min="0"
                step="0.01"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Convenio (Opcional)</label>
              <select
                className="form-control"
                name="convenio"
                value={formData.convenio || ''}
                onChange={handleChange}
              >
                <option value="">Sin Convenio</option>
                {convenios.map((convenio) => (
                  <option key={convenio.id} value={convenio.id}>
                    {convenio.nombre_convenio}
                  </option>
                ))}
              </select>
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
