// src/components/Dashboard.js

import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import SidebarMenu from './SidebarMenu';
import axios from 'axios';

export default function Dashboard() {
  const [vehicleCounts, setVehicleCounts] = useState({
    cars: 0,
    motorcycles: 0,
    bicycles: 0,
  });

  useEffect(() => {
    // Función para obtener los conteos de vehículos desde el backend
    const fetchVehicleCounts = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://tu-backend.com/api/vehicle-counts/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setVehicleCounts(response.data);
      } catch (error) {
        console.error('Error al obtener los conteos de vehículos:', error);
      }
    };

    fetchVehicleCounts();
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar */}
        <div className="col-12 col-md-3 col-lg-2 p-0">
          <SidebarMenu />
        </div>

        {/* Main content */}
        <main className="col-12 col-md-9 col-lg-10 px-4">
          <div className="d-flex justify-content-center align-items-center pt-3 pb-2 mb-3 border-bottom">
            {/* Logo más grande */}
            <img src="/logo.png" alt="ParkGenius" className="img-fluid" style={{ height: '80px' }} />
          </div>
          <div className="container">
            <h1 className="text-center mb-4">
              <span style={{ color: '#6902FF' }}>Bien</span>
              <span style={{ color: '#15B0F6' }}>venidos</span>
              <i className="fas fa-car ms-2" style={{ color: '#15B0F6' }}></i>
            </h1><br/><br/>

            {/* Tarjetas con los conteos de vehículos */}
            <div className="row">
              <div className="col-md-4 mb-4">
                <div className="card text-white bg-primary h-100">
                  <div className="card-body d-flex flex-column align-items-center justify-content-center">
                    <i className="fas fa-car fa-3x mb-3"></i>
                    <h5 className="card-title">Carros en el Parqueadero</h5>
                    <p className="card-text display-4">{vehicleCounts.cars}</p>
                  </div>
                </div>
              </div>

              <div className="col-md-4 mb-4">
                <div className="card text-white bg-success h-100">
                  <div className="card-body d-flex flex-column align-items-center justify-content-center">
                    <i className="fas fa-motorcycle fa-3x mb-3"></i>
                    <h5 className="card-title">Motos en el Parqueadero</h5>
                    <p className="card-text display-4">{vehicleCounts.motorcycles}</p>
                  </div>
                </div>
              </div>

              <div className="col-md-4 mb-4">
                <div className="card text-white bg-warning h-100">
                  <div className="card-body d-flex flex-column align-items-center justify-content-center">
                    <i className="fas fa-bicycle fa-3x mb-3"></i>
                    <h5 className="card-title">Bicicletas en el Parqueadero</h5>
                    <p className="card-text display-4">{vehicleCounts.bicycles}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Puedes agregar más elementos aquí */}
            <div className="row">
              <div className="col-md-6 mb-4">
                <div className="card text-white bg-info h-100">
                  <div className="card-body d-flex flex-column align-items-center justify-content-center">
                    <i className="fas fa-parking fa-3x mb-3"></i>
                    <h5 className="card-title">Espacios Totales</h5>
                    <p className="card-text display-4">{vehicleCounts.totalSpaces || 'N/A'}</p>
                  </div>
                </div>
              </div>

              <div className="col-md-6 mb-4">
                <div className="card text-white bg-secondary h-100">
                  <div className="card-body d-flex flex-column align-items-center justify-content-center">
                    <i className="fas fa-door-open fa-3x mb-3"></i>
                    <h5 className="card-title">Espacios Disponibles</h5>
                    <p className="card-text display-4">{vehicleCounts.availableSpaces || 'N/A'}</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}
