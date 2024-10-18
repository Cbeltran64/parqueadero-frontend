import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Importar componentes
import Dashboard from './components/Dashboard';
import Login from './components/Login/Login';
import ConfiguracionSistema from './components/ConfiguracionSistema/ConfiguracionSistema';
import ConfiguracionParqueadero from './components/ConfiguracionSistema/ConfiguracionParqueadero';
import ConfiguracionTarifas from './components/ConfiguracionSistema/ConfiguracionTarifas';
import ConfiguracionConvenios from './components/ConfiguracionSistema/ConfiguracionConvenios';
import CrearTarifa from './components/ConfiguracionSistema/CrearTarifa';
import CrearConvenio from './components/ConfiguracionSistema/CrearConvenio';
import EditarTarifa from './components/ConfiguracionSistema/EditarTarifa';
import EditarConvenio from './components/ConfiguracionSistema/EditarConvenio';
import UserManagement from './components/GestionUsuarios/UserManagement';
import CrearUsuario from './components/GestionUsuarios/CrearUsuario';
import ParkingManagement from './components/ParkingManagement'; 
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        {/* Ruta pública para el inicio de sesión */}
        <Route path="/" element={<Login />} />

        {/* Rutas protegidas */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/configuracion-sistema"
          element={
            <ProtectedRoute>
              <ConfiguracionSistema />
            </ProtectedRoute>
          }
        />
        <Route
          path="/configuracion-parqueadero"
          element={
            <ProtectedRoute>
              <ConfiguracionParqueadero />
            </ProtectedRoute>
          }
        />
        <Route
          path="/configuracion-tarifas"
          element={
            <ProtectedRoute>
              <ConfiguracionTarifas />
            </ProtectedRoute>
          }
        />
        <Route
          path="/configuracion-convenios"
          element={
            <ProtectedRoute>
              <ConfiguracionConvenios />
            </ProtectedRoute>
          }
        />
        <Route
          path="/crear-tarifa"
          element={
            <ProtectedRoute>
              <CrearTarifa />
            </ProtectedRoute>
          }
        />
        <Route
          path="/crear-convenio"
          element={
            <ProtectedRoute>
              <CrearConvenio />
            </ProtectedRoute>
          }
        />
        <Route
          path="/editar-tarifa/:id"
          element={
            <ProtectedRoute>
              <EditarTarifa />
            </ProtectedRoute>
          }
        />
        <Route
          path="/editar-convenio/:id"
          element={
            <ProtectedRoute>
              <EditarConvenio />
            </ProtectedRoute>
          }
        />
        <Route
          path="/gestion-usuarios"
          element={
            <ProtectedRoute>
              <UserManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/crear-usuario"
          element={
            <ProtectedRoute>
              <CrearUsuario />
            </ProtectedRoute>
          }
        />
        <Route
          path="/sistema"
          element={
            <ProtectedRoute>
              <ParkingManagement />
            </ProtectedRoute>
          }
        />
        
      </Routes>
    </Router>
  );
}

export default App;
