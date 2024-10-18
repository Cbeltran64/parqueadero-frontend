import React, { useState, useEffect } from 'react';
import axiosInstance from '../../services/authService';
import { useNavigate } from 'react-router-dom';
import SidebarMenu from '../SidebarMenu';
import './ConfiguracionConvenios.css';

export default function ConfiguracionConvenios() {
  const [convenios, setConvenios] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchConvenios = async () => {
      try {
        const response = await axiosInstance.get('/api/convenios/');
        console.log('Respuesta del backend:', response.data);
        // Ajusta aquí según la estructura de la respuesta
        setConvenios(response.data.results || response.data);
      } catch (error) {
        console.error('Error al obtener los convenios:', error);
      }
    };

    fetchConvenios();
  }, []);

  const handleEditar = (id) => {
    navigate(`/editar-convenio/${id}`);
  };

  const handleEliminar = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este convenio?')) {
      try {
        await axiosInstance.delete(`/api/convenios/${id}/`);
        setConvenios(convenios.filter((convenio) => convenio.id !== id));
      } catch (error) {
        console.error('Error al eliminar el convenio:', error);
      }
    }
  };

  const handleCrearConvenio = () => {
    navigate('/crear-convenio');
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
          <h1 className="mt-4">Configuración de Convenios</h1>
          <table className="table mt-4">
            <thead>
              <tr>
                <th>Nombre Convenio</th>
                <th>Porcentaje Descuento</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(convenios) && convenios.length > 0 ? (
                convenios.map((convenio) => (
                  <tr key={convenio.id}>
                    <td>{convenio.nombre_convenio}</td>
                    <td>{convenio.porcentaje_descuento}%</td>
                    <td>
                      <button
                        className="btn btn-primary btn-sm me-2"
                        onClick={() => handleEditar(convenio.id)}
                      >
                        Actualizar
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleEliminar(convenio.id)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3">No hay convenios disponibles.</td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="mt-4">
            <button className="btn btn-success me-2" onClick={handleCrearConvenio}>
              Crear Convenio
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