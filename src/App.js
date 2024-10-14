import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Login from './components/Login/Login';
import ConfiguracionSistema from './components/ConfiguracionSistema';
import ConfiguracionParqueadero from './components/ConfiguracionParqueadero';
import ConfiguracionTarifas from './components/ConfiguracionTarifas';
import ConfiguracionConvenios from './components/ConfiguracionConvenios';
import CrearTarifa from './components/CrearTarifa';
import CrearConvenio from './components/CrearConvenio';
// Importa los demás componentes según sea necesario
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
        {/* Agrega las demás rutas para editar tarifas y convenios */}
      </Routes>
    </Router>
  );
}

export default App;
