import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';

interface NaoEncontradoProps {
  mensagem: string;
  voltarPara: string;
  textoBotao: string;
}

export const NaoEncontrado: React.FC<NaoEncontradoProps> = ({ mensagem, voltarPara, textoBotao }) => {
  const navigate = useNavigate();

  return (
    <div style={{ backgroundColor: 'var(--primary-bg)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '20px', color: '#ffffff', padding: '40px 20px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '1.4rem' }}>{mensagem}</h1>
        <button
          onClick={() => navigate(voltarPara)}
          style={{ backgroundColor: '#7c3aed', color: '#ffffff', border: 'none', padding: '12px 24px', borderRadius: '20px', fontWeight: 'bold', cursor: 'pointer' }}
        >
          {textoBotao}
        </button>
      </main>
      <Footer />
    </div>
  );
};
