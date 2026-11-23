import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const RotaProtegida: React.FC = () => {
  const { usuario, carregando } = useAuth();

  if (carregando) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: 'var(--primary-bg)', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        Carregando...
      </div>
    );
  }

  if (!usuario) return <Navigate to="/" replace />;

  return <Outlet />;
};
