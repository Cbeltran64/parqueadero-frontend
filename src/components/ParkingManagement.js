import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axiosInstance from '../services/authService';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import AperturaCajaModal from './AperturaCajaModal';

const ParkingManagement = () => {
  const [isCajaAbierta, setIsCajaAbierta] = useState(false);
  const [showAperturaCajaModal, setShowAperturaCajaModal] = useState(false);
  const [entryPlate, setEntryPlate] = useState('');
  const [entryComment, setEntryComment] = useState('');
  const [exitPlate, setExitPlate] = useState('');
  const [exitRate, setExitRate] = useState('');
  const [exitAdditional, setExitAdditional] = useState('');
  const [exitInvoice, setExitInvoice] = useState('');
  const [tarifas, setTarifas] = useState([]);
  const [adicionales, setAdicionales] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      navigate('/');
    } else {
      verificarCajaAbierta();
    }
  }, []);

  const verificarCajaAbierta = async () => {
    try {
      const response = await axiosInstance.get('/api/caja/estado/');
      if (response.data.is_abierta) {
        setIsCajaAbierta(true);
      } else {
        setShowAperturaCajaModal(true);
      }
    } catch (error) {
      console.error('Error al verificar el estado de la caja:', error);
    }
  };

  useEffect(() => {
    if (isCajaAbierta) {
      obtenerTarifas();
      obtenerAdicionales();
    }
  }, [isCajaAbierta]);

  const obtenerTarifas = async () => {
    try {
      const response = await axiosInstance.get('/api/tarifas/');
      setTarifas(response.data);
    } catch (error) {
      console.error('Error al obtener las tarifas:', error);
    }
  };

  const obtenerAdicionales = async () => {
    try {
      const response = await axiosInstance.get('/api/adicionales/');
      setAdicionales(response.data);
    } catch (error) {
      console.error('Error al obtener los adicionales:', error);
    }
  };

  const handleIngresarVehiculo = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post('/api/vehiculos/ingreso/', {
        placa: entryPlate,
        comentario: entryComment,
      });
      setEntryPlate('');
      setEntryComment('');
      alert('Vehículo ingresado correctamente.');
    } catch (error) {
      console.error('Error al ingresar el vehículo:', error);
      alert('Error al ingresar el vehículo.');
    }
  };

  const handleSacarVehiculo = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post('/api/vehiculos/salida/', {
        placa: exitPlate,
        tarifa_id: exitRate,
        adicional_id: exitAdditional || null,
        informacion_factura: exitInvoice,
      });
      setExitPlate('');
      setExitRate('');
      setExitAdditional('');
      setExitInvoice('');
      alert('Vehículo sacado correctamente.');
    } catch (error) {
      console.error('Error al sacar el vehículo:', error);
      alert('Error al sacar el vehículo.');
    }
  };

  return (
    <div className="container-fluid">
      {showAperturaCajaModal && (
        <AperturaCajaModal
          onCajaAbierta={() => {
            setIsCajaAbierta(true);
            setShowAperturaCajaModal(false);
          }}
        />
      )}
      <div className="row">
        {isCajaAbierta && (
          <>
            <div className="col-md-3 col-lg-2 d-md-block bg-dark sidebar" style={{ minHeight: '100vh' }}>
              <div className="position-sticky pt-3">
                <div className="mb-4 px-3">
                  <img src="/logo.png" alt="ParkGenius" className="img-fluid" />
                </div>
                <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-white">
                  Menú
                </h6>
                <ul className="nav flex-column">
                  <li className="nav-item mb-2">
                    <Link className="nav-link text-white" to="/gestion-usuarios" style={{ backgroundColor: '#6902FF' }}>
                      <i className="fas fa-users me-2"></i>
                      Gestión de Usuarios
                    </Link>
                  </li>
                  <li className="nav-item mb-2">
                    <Link className="nav-link text-white" to="/configuracion-sistema" style={{ backgroundColor: '#15B0F6' }}>
                      <i className="fas fa-cogs me-2"></i>
                      Configuración de Sistema
                    </Link>
                  </li>
                  <li className="nav-item mb-2">
                    <Link className="nav-link text-white" to="/generacion-reportes" style={{ backgroundColor: '#06DCC2' }}>
                      <i className="fas fa-file-alt me-2"></i>
                      Generación de Reportes
                    </Link>
                  </li>
                  <li className="nav-item mb-2">
                    <Link className="nav-link text-white" to="/sistema" style={{ backgroundColor: '#140055' }}>
                      <i className="fas fa-desktop me-2"></i>
                      Sistema
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
              <div className="row justify-content-center pt-4">
                <div className="col-12 text-center mb-4">
                  <img src="/logo.png" alt="ParkGenius" className="img-fluid" style={{ maxHeight: '50px' }} />
                </div>
              </div>
              <div className="row justify-content-center">
                <div className="col-md-6 mb-4">
                  <div className="card shadow rounded-lg h-100">
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title text-center mb-4">
                        <i className="fas fa-car text-primary me-2"></i>
                        <span className="text-primary">Ingreso de Vehículos</span>
                      </h5>
                      <form className="flex-grow-1 d-flex flex-column" onSubmit={handleIngresarVehiculo}>
                        <div className="mb-3">
                          <label htmlFor="entryPlate" className="form-label">Placa:</label>
                          <input
                            type="text"
                            className="form-control"
                            id="entryPlate"
                            value={entryPlate}
                            onChange={(e) => setEntryPlate(e.target.value)}
                            required
                          />
                        </div>
                        <div className="mb-3 flex-grow-1">
                          <label htmlFor="entryComment" className="form-label">Comentario:</label>
                          <textarea
                            className="form-control h-100"
                            id="entryComment"
                            style={{ resize: 'none' }}
                            value={entryComment}
                            onChange={(e) => setEntryComment(e.target.value)}
                          ></textarea>
                        </div>
                        <div className="d-grid gap-2 mt-auto">
                          <button type="submit" className="btn btn-primary">Ingresar Vehículo</button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                {/* Formulario de Salida de Vehículos */}
                <div className="col-md-6 mb-4">
                  <div className="card shadow rounded-lg h-100">
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title text-center mb-4">
                        <i className="fas fa-car text-success me-2"></i>
                        <span className="text-success">Salida de Vehículos</span>
                      </h5>
                      <form className="flex-grow-1 d-flex flex-column" onSubmit={handleSacarVehiculo}>
                        <div className="mb-3">
                          <label htmlFor="exitPlate" className="form-label">Placa:</label>
                          <input
                            type="text"
                            className="form-control"
                            id="exitPlate"
                            value={exitPlate}
                            onChange={(e) => setExitPlate(e.target.value)}
                            required
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="exitRate" className="form-label">Tarifas:</label>
                          <select
                            className="form-select"
                            id="exitRate"
                            value={exitRate}
                            onChange={(e) => setExitRate(e.target.value)}
                            required
                          >
                            <option value="">---Seleccionar---</option>
                            {tarifas.map((tarifa) => (
                              <option key={tarifa.id} value={tarifa.id}>
                                {tarifa.nombre} - ${tarifa.precio}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="mb-3">
                          <label htmlFor="exitAdditional" className="form-label">Adicionales:</label>
                          <select
                            className="form-select"
                            id="exitAdditional"
                            value={exitAdditional}
                            onChange={(e) => setExitAdditional(e.target.value)}
                          >
                            <option value="">---Seleccionar---</option>
                            {adicionales.map((adicional) => (
                              <option key={adicional.id} value={adicional.id}>
                                {adicional.nombre} - ${adicional.precio}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="mb-3 flex-grow-1">
                          <label htmlFor="exitInvoice" className="form-label">Información Factura:</label>
                          <textarea
                            className="form-control h-100"
                            id="exitInvoice"
                            style={{ resize: 'none' }}
                            value={exitInvoice}
                            onChange={(e) => setExitInvoice(e.target.value)}
                          ></textarea>
                        </div>
                        <div className="d-grid gap-2 mt-auto">
                          <button type="submit" className="btn btn-success">Sacar Vehículo</button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </>
        )}
      </div>
    </div>
  );
};

export default ParkingManagement;