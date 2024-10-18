import React, { useState, useEffect } from 'react';
import axiosInstance from '../../services/authService';
import { useNavigate } from 'react-router-dom';
import SidebarMenu from '../SidebarMenu';
import './ConfiguracionTarifas.css';

export default function ConfiguracionTarifas() {
  const [tarifas, setTarifas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTarifas = async () => {
      try {
        const response = await axiosInstance.get('/api/tariffs/');
        setTarifas(response.data);
      } catch (error) {
        console.error('Error al obtener las tarifas:', error);
      }
    };

    fetchTarifas();
  }, []);

  const handleEditar = (id) => {
    navigate(`/editar-tarifa/${id}`);
  };

  const handleEliminar = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar esta tarifa?')) {
      try {
        await axiosInstance.delete(`/api/tariffs/${id}/`);
        setTarifas(tarifas.filter((tarifa) => tarifa.id !== id));
      } catch (error) {
        console.error('Error al eliminar la tarifa:', error);
      }
    }
  };

  const handleCrearTarifa = () => {
    navigate('/crear-tarifa');
  };

  const handleVolver = () => {
    navigate('/configuracion-sistema');
  };

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar */}
        <div className="col-12 col-md-3 col-lg-2 p-0">
          <SidebarMenu />
        </div>

        {/* Main content */}
        <main className="col-12 col-md-9 col-lg-10 px-4">
          <h1 className="mt-4">Configuración de Tarifas</h1>
          <table className="table mt-4">
            <thead>
              <tr>
                <th>Nombre Tarifa</th>
                <th>Tipo de Vehículo</th>
                <th>Precio por Minuto</th>
                <th>Convenio</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {tarifas.map((tarifa) => (
                <tr key={tarifa.id}>
                  <td>{tarifa.nombre_tarifa}</td>
                  <td>{tarifa.vehicle_type}</td>
                  <td>{tarifa.price_per_minute}</td>
                  <td>{tarifa.convenio}</td>
                  <td>
                    <button
                      className="btn btn-primary btn-sm me-2"
                      onClick={() => handleEditar(tarifa.id)}
                    >
                      Actualizar
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleEliminar(tarifa.id)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-4">
            <button className="btn btn-success me-2" onClick={handleCrearTarifa}>
              Crear Tarifa
            </button>
            <button className="btn btn-danger" onClick={handleVolver}>
              Volver
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
