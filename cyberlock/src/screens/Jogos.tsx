import React from 'react';
import { Header } from '../components/Header';
import { CarrosselJogos } from '../components/CarrosselJogos';
import { Footer } from '../components/Footer';
import { JOGOS_LISTA } from '../dados/jogos';
import { useNavigate } from 'react-router-dom';
import { Shield, Award } from 'lucide-react';
import '../main.css';

export const Jogos: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div style={{ backgroundColor: 'var(--primary-bg)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />

      <main style={styles.mainContainer}>
        <section style={styles.heroSection}>
          <div style={styles.heroLeft}>
            <div style={styles.categoryBadge}>
              <Shield size={12} color="#ffffff" />
              <span>CATÁLOGO GAMIFICADO</span>
            </div>

            <h1 style={styles.heroTitle}>
              JOGOS INFORMATIVOS PARA PROTEGER SEUS DADOS
            </h1>

            <p style={styles.heroSubtitle}>
              Aprenda a prevenir e reagir a vazamentos de dados de forma divertida. Cada jogo ensina conceitos práticos, rotinas de segurança e decisões rápidas para proteger suas informações.
            </p>

            <div style={styles.heroButtons}>
              <button style={styles.primaryBtn}>Explorar catálogo</button>
              <button style={styles.secondaryBtn}>Ver recompensas</button>
            </div>
          </div>

          <div style={styles.quickViewCard}>
            <span style={styles.quickViewTag}>VISÃO RÁPIDA</span>
            <h3 style={styles.quickViewTitle}>{JOGOS_LISTA.length} desafios</h3>
            <p style={styles.quickViewDesc}>
              Um catálogo progressivo com níveis, XP e recompensas para transformar segurança de dados em aprendizado contínuo.
            </p>
          </div>
        </section>

        {/* Card de Jogo em Destaque */}
        <section style={styles.featuredSection}>
          <div style={{ ...styles.featuredCard, cursor: 'pointer' }} onClick={() => navigate('/jogos/1')}>
            <img
              src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=1200"
              alt="Jogo Destaque"
              style={styles.featuredImage}
            />

            <div style={styles.featuredTopBadges}>
              <span style={styles.purpleBadge}>VAZAMENTO DE DADOS</span>
              <span style={styles.whiteBadge}>{JOGOS_LISTA.length} Jogos Informativos</span>
            </div>

            <div style={styles.featuredContentCard}>
              <div style={styles.featuredMetaRow}>
                <span style={styles.darkBadge}>JOGO DESTAQUE</span>
                <span style={styles.xpPill}>+120 XP</span>
              </div>

              <h2 style={styles.featuredTitle}>Análise de senhas</h2>

              <p style={styles.featuredDesc}>
                Descubra como identificar senhas frágeis e criar rotinas de segurança simples para proteger seus dados.
              </p>

              <div style={styles.featuredTags}>
                <span style={styles.levelTag}>NÍVEL 1</span>
                <span style={styles.progressTag}>4/5</span>
              </div>
            </div>
          </div>
        </section>

        <section style={styles.section}>
          <div style={styles.sectionHeader}>
            <div>
              <h2 style={styles.sectionTitle}>Nossos jogos informativos</h2>
              <p style={styles.sectionSubtitle}>
                Explore o catálogo e avance por desafios, recompensas e progresso.
              </p>
            </div>
            <span style={styles.badgeCount}>
              <Award size={12} /> {JOGOS_LISTA.length} jogos informativos
            </span>
          </div>

          <CarrosselJogos />
        </section>

        {/* Grid de Progresso */}
        <section style={styles.statsGrid}>
          <div style={styles.statCard}>
            <div style={styles.statHeader}>
              <span>Progresso</span>
              <span style={styles.statBadge}>60%</span>
            </div>
            <p style={styles.statText}>
              Você já completou 3 de 5 jogos informativos e está perto de liberar a próxima recompensa.
            </p>
            <div style={styles.progressBarBg}>
              <div style={{ ...styles.progressBarFill, width: '60%' }} />
            </div>
            <span style={styles.statFooterText}>3 de 5 desafios concluídos</span>
          </div>

          <div style={styles.statCard}>
            <div style={styles.statHeader}>
              <span>Desafio da semana</span>
              <span style={styles.statBadge}>+250 XP</span>
            </div>
            <p style={styles.statText}>
              Complete Rema ao Tema e Mínimo possível para desbloquear a próxima recompensa e subir de nível.
            </p>
            <div style={styles.progressBarBg}>
              <div style={{ ...styles.progressBarFill, width: '40%' }} />
            </div>
            <span style={styles.statFooterText}>2 desafios ativos esta semana</span>
          </div>

          <div style={styles.statCard}>
            <div style={styles.statHeader}>
              <span>Recompensa próxima</span>
              <span style={styles.statBadge}>32 XP</span>
            </div>
            <p style={styles.statText}>
              Faltam 32 pontos para liberar o selo de Proteção Avançada e desbloquear conteúdos exclusivos.
            </p>
            <div style={styles.progressBarBg}>
              <div style={{ ...styles.progressBarFill, width: '80%' }} />
            </div>
            <span style={styles.statFooterText}>Selo de Proteção Avançada</span>
          </div>

          <div style={styles.statCard}>
            <div style={styles.statHeader}>
              <span>Ranking</span>
              <span style={styles.statBadge}>12º lugar</span>
            </div>
            <p style={styles.statText}>
              Você está entre os 15% melhores do mês e pode subir mais 3 posições com mais 1 jogo concluído.
            </p>
            <div style={styles.progressBarBg}>
              <div style={{ ...styles.progressBarFill, width: '75%' }} />
            </div>
            <span style={styles.statFooterText}>15% melhores do mês</span>
          </div>
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
    padding: '30px 20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '40px',
    flex: 1,
  },
  heroSection: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: '30px',
    flexWrap: 'wrap',
  },
  heroLeft: {
    flex: '1 1 550px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  categoryBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    padding: '4px 12px',
    borderRadius: '15px',
    fontSize: '0.65rem',
    fontWeight: 'bold',
    color: '#ffffff',
    width: 'fit-content',
    letterSpacing: '0.5px',
  },
  heroTitle: {
    fontFamily: 'var(--font-pixel)',
    fontSize: '1.8rem',
    lineHeight: '1.3',
    color: '#ffffff',
    textShadow: '3px 3px 0px #000',
  },
  heroSubtitle: {
    color: 'rgba(255, 255, 255, 0.85)',
    fontSize: '0.9rem',
    lineHeight: '1.5',
  },
  heroButtons: {
    display: 'flex',
    gap: '12px',
    flexWrap: 'wrap',
  },
  primaryBtn: {
    backgroundColor: '#7c3aed',
    color: '#ffffff',
    border: 'none',
    padding: '12px 24px',
    borderRadius: '20px',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontSize: '0.85rem',
  },
  secondaryBtn: {
    backgroundColor: '#ffffff',
    color: '#3b00a5',
    border: 'none',
    padding: '12px 24px',
    borderRadius: '20px',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontSize: '0.85rem',
  },
  quickViewCard: {
    backgroundColor: '#ffffff',
    borderRadius: '20px',
    padding: '24px',
    maxWidth: '280px',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
  },
  quickViewTag: {
    fontSize: '0.65rem',
    fontWeight: 'bold',
    color: '#7c3aed',
    letterSpacing: '0.5px',
  },
  quickViewTitle: {
    color: '#2e1065',
    fontSize: '1.4rem',
    fontWeight: 'bold',
  },
  quickViewDesc: {
    color: '#6b21a8',
    fontSize: '0.75rem',
    lineHeight: '1.4',
  },
  featuredSection: {
    width: '100%',
  },
  featuredCard: {
    position: 'relative',
    borderRadius: '24px',
    overflow: 'hidden',
    minHeight: '320px',
    display: 'flex',
    alignItems: 'center',
    boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
  },
  featuredImage: {
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  featuredTopBadges: {
    position: 'absolute',
    top: '16px',
    left: '16px',
    display: 'flex',
    gap: '10px',
    zIndex: 2,
  },
  purpleBadge: {
    backgroundColor: '#7c3aed',
    color: '#ffffff',
    fontSize: '0.65rem',
    fontWeight: 'bold',
    padding: '6px 12px',
    borderRadius: '15px',
  },
  whiteBadge: {
    backgroundColor: '#ffffff',
    color: '#3b00a5',
    fontSize: '0.65rem',
    fontWeight: 'bold',
    padding: '6px 12px',
    borderRadius: '15px',
  },
  featuredContentCard: {
    position: 'relative',
    zIndex: 2,
    marginLeft: '20px',
    marginRight: '20px',
    marginTop: '60px',
    marginBottom: '20px',
    backgroundColor: '#ffffff',
    borderRadius: '20px',
    padding: '20px',
    maxWidth: '320px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    boxShadow: '0 8px 20px rgba(0,0,0,0.25)',
  },
  featuredMetaRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  darkBadge: {
    backgroundColor: '#3b00a5',
    color: '#ffffff',
    fontSize: '0.6rem',
    fontWeight: 'bold',
    padding: '4px 8px',
    borderRadius: '10px',
  },
  xpPill: {
    backgroundColor: '#e9d5ff',
    color: '#6d28d9',
    fontSize: '0.65rem',
    fontWeight: 'bold',
    padding: '4px 8px',
    borderRadius: '10px',
  },
  featuredTitle: {
    color: '#2e1065',
    fontSize: '1.2rem',
    fontWeight: 'bold',
  },
  featuredDesc: {
    color: '#6b21a8',
    fontSize: '0.75rem',
    lineHeight: '1.4',
  },
  featuredTags: {
    display: 'flex',
    gap: '8px',
  },
  levelTag: {
    backgroundColor: '#3b00a5',
    color: '#ffffff',
    fontSize: '0.6rem',
    fontWeight: 'bold',
    padding: '4px 8px',
    borderRadius: '10px',
  },
  progressTag: {
    backgroundColor: '#e9d5ff',
    color: '#6d28d9',
    fontSize: '0.6rem',
    fontWeight: 'bold',
    padding: '4px 8px',
    borderRadius: '10px',
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    gap: '10px',
  },
  sectionTitle: {
    fontSize: '1.4rem',
    fontWeight: 'bold',
    color: '#ffffff',
  },
  sectionSubtitle: {
    fontSize: '0.85rem',
    color: 'rgba(255, 255, 255, 0.7)',
  },
  badgeCount: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    padding: '6px 14px',
    borderRadius: '15px',
    fontSize: '0.75rem',
    color: '#ffffff',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: '16px',
  },
  statCard: {
    backgroundColor: '#ffffff',
    borderRadius: '20px',
    padding: '18px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  statHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontWeight: 'bold',
    color: '#2e1065',
    fontSize: '0.9rem',
  },
  statBadge: {
    backgroundColor: '#3b00a5',
    color: '#ffffff',
    fontSize: '0.65rem',
    padding: '3px 8px',
    borderRadius: '10px',
  },
  statText: {
    fontSize: '0.75rem',
    color: '#6b21a8',
    lineHeight: '1.4',
  },
  progressBarBg: {
    width: '100%',
    height: '6px',
    backgroundColor: '#e9d5ff',
    borderRadius: '10px',
    overflow: 'hidden',
    marginTop: '4px',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#3b00a5',
    borderRadius: '10px',
  },
  statFooterText: {
    fontSize: '0.65rem',
    color: '#7c3aed',
    fontWeight: '600',
  },
};