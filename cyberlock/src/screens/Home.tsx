import React from 'react';
import { Header } from '../components/Header';
import { CarrosselJogos } from '../components/CarrosselJogos';
import { CarrosselNoticias } from '../components/CarrosselNoticias';
import { Footer } from '../components/Footer';
import { JOGOS_LISTA } from '../dados/jogos';
import { useNavigate } from 'react-router-dom';
import '../main.css';

export const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div style={{ backgroundColor: 'var(--primary-bg)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />

      <main style={styles.mainContainer}>
        {/* Hero Section */}
        <section style={styles.heroSection}>
          <div style={styles.heroText}>
            <span style={styles.categoryBadge}>PROTEÇÃO DE DADOS</span>
            
            <h1 style={styles.heroTitle}>
              APRENDA.<br />JOGUE.<br />PROTEJA.
            </h1>

            <p style={styles.heroSubtitle}>
              Explore o nosso catálogo de jogos informativos divertidos e aprenda a proteger seus dados em situações reais de vazamento.
            </p>

            <div style={styles.heroButtons}>
              <button 
                style={styles.primaryBtn} 
                onClick={() => navigate('/jogos')}
              >
                Comece agora
              </button>
              <button 
                style={styles.secondaryBtn} 
                onClick={() => navigate('/jogos')}
              >
                Ver catálogo
              </button>
            </div>
          </div>
        </section>

        {/* Carrossel Jogos */}
        <section style={styles.section}>
          <div style={styles.sectionHeader}>
            <div>
              <h2 style={styles.sectionTitle}>Nossos jogos</h2>
              <p style={styles.sectionSubtitle}>
                Explore o catálogo e avance por desafios, recompensas e progresso.
              </p>
            </div>
            <button 
              style={styles.seeAllBtn} 
              onClick={() => navigate('/jogos')}
            >
              Ver todos ({JOGOS_LISTA.length})
            </button>
          </div>

          <CarrosselJogos />
        </section>

        {/* Carrossel Noticias */}
        <section style={styles.section}>
          <div style={styles.sectionHeader}>
            <div>
              <h2 style={styles.sectionTitle}>Notícias em destaque</h2>
              <p style={styles.sectionSubtitle}>
                Conteúdo prático para entender vazamentos de dados e manter seus hábitos de segurança atualizados.
              </p>
            </div>
            <button 
              style={styles.seeAllBtn} 
              onClick={() => navigate('/noticias')}
            >
              Ver todos os artigos
            </button>
          </div>

          <CarrosselNoticias />
        </section>
      </main>

      <Footer />
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  mainContainer: {
    maxWidth: '1200px',
    width: '100%',
    margin: '0 auto',
    padding: '40px 20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '50px',
    flex: 1,
  },
  heroSection: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '40px 0 20px 0',
  },
  heroText: {
    maxWidth: '700px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    gap: '20px',
  },
  categoryBadge: {
    display: 'inline-block',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    padding: '6px 16px',
    borderRadius: '15px',
    fontSize: '0.7rem',
    fontWeight: 'bold',
    color: '#ffffff',
    letterSpacing: '0.5px',
  },
  heroTitle: {
    fontFamily: 'var(--font-pixel)',
    fontSize: '2.5rem',
    lineHeight: '1.2',
    color: '#ffffff',
    textShadow: '3px 3px 0px #000',
  },
  heroSubtitle: {
    color: 'rgba(255, 255, 255, 0.85)',
    fontSize: '1rem',
    lineHeight: '1.6',
    maxWidth: '600px',
  },
  heroButtons: {
    display: 'flex',
    gap: '16px',
    marginTop: '10px',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  primaryBtn: {
    backgroundColor: '#7c3aed',
    color: '#ffffff',
    border: 'none',
    padding: '14px 28px',
    borderRadius: '20px',
    fontWeight: 'bold',
    fontSize: '0.9rem',
    cursor: 'pointer',
    boxShadow: '0 4px 12px rgba(124, 58, 237, 0.35)',
    transition: 'transform 0.1s, background-color 0.2s',
  },
  secondaryBtn: {
    backgroundColor: '#ffffff',
    color: '#3b00a5',
    border: 'none',
    padding: '14px 28px',
    borderRadius: '20px',
    fontWeight: 'bold',
    fontSize: '0.9rem',
    cursor: 'pointer',
    transition: 'transform 0.1s',
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    flexWrap: 'wrap',
    gap: '12px',
  },
  sectionTitle: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#ffffff',
  },
  sectionSubtitle: {
    fontSize: '0.85rem',
    color: 'rgba(255, 255, 255, 0.7)',
    marginTop: '4px',
  },
  seeAllBtn: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    border: 'none',
    color: '#ffffff',
    padding: '8px 16px',
    borderRadius: '15px',
    fontSize: '0.75rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
};