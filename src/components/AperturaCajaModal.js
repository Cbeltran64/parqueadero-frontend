import React, { useState } from 'react';
import axiosInstance from '../services/authService';

const AperturaCajaModal = ({ onCajaAbierta }) => {
  const [montoInicial, setMontoInicial] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post('/api/caja/abrir/', { monto_inicial: montoInicial });
      setMensaje('Caja abierta correctamente.');
      onCajaAbierta();
    } catch (error) {
      console.error('Error al abrir la caja:', error);
      setMensaje('Error al abrir la caja.');
    }
  };

  return (
    <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <form onSubmit={handleSubmit}>
            <div className="modal-header">
              <h5 className="modal-title">Apertura de Caja</h5>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="montoInicial" className="form-label">Monto Inicial:</label>
                <input
                  type="number"
                  className="form-control"
                  id="montoInicial"
                  value={montoInicial}
                  onChange={(e) => setMontoInicial(e.target.value)}
                  required
                />
              </div>
              {mensaje && <div className="alert alert-info">{mensaje}</div>}
            </div>
            <div className="modal-footer">
              <button type="submit" className="btn btn-primary">Abrir Caja</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AperturaCajaModal;
