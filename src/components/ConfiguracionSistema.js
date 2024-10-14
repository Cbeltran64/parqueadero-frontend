import React from 'react';
import { useNavigate } from 'react-router-dom';
import SidebarMenu from './SidebarMenu';
import './ConfiguracionSistema.css';

export default function ConfiguracionSistema() {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
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
          <h1 className="mt-4">Configuración del Sistema</h1>
          <div className="config-options mt-5">
            <button
              className="config-button"
              onClick={() => handleNavigate('/configuracion-parqueadero')}
            >
              Configuración de Parqueadero
            </button>
            <button
              className="config-button"
              onClick={() => handleNavigate('/configuracion-tarifas')}
            >
              Configuración de Tarifas
            </button>
            <button
              className="config-button"
              onClick={() => handleNavigate('/configuracion-convenios')}
            >
              Configuración de Convenios
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
