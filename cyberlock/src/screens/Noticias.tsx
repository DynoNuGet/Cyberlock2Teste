import React from 'react';
import { Header } from '../components/Header';
import { CarrosselNoticias } from '../components/CarrosselNoticias';
import { Footer } from '../components/Footer';
import { NOTICIAS_LISTA } from '../dados/noticias';
import { FileText } from 'lucide-react';
import '../main.css';

export const Noticias: React.FC = () => {
  return (
    <div style={{ backgroundColor: 'var(--primary-bg)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />

      <main style={styles.mainContainer}>
        <section style={styles.headerSection}>
          <div>
            <h1 style={styles.pageTitle}>Notícias</h1>
            <p style={styles.pageSubtitle}>
              Conteúdos práticos que contribuem de verdade para os seus conhecimento sobre vazamento de dados e como se prevenir!
            </p>
          </div>

          <div style={styles.badgeHighlight}>
            <FileText size={14} color="#3b00a5" />
            <span>{NOTICIAS_LISTA.length} artigos destaque</span>
          </div>
        </section>

        {/* Carrossel Noticias */}
        <section style={styles.section}>
          <CarrosselNoticias larguraItem={480} />
        </section>

        <div style={styles.infoBadge}>
          <FileText size={12} color="rgba(255, 255, 255, 0.8)" />
          <span>Mais conteúdos em breve</span>
        </div>
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
    gap: '30px',
    flex: 1,
  },
  headerSection: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    gap: '16px',
  },
  pageTitle: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: '8px',
  },
  pageSubtitle: {
    fontSize: '0.9rem',
    color: 'rgba(255, 255, 255, 0.8)',
    maxWidth: '700px',
    lineHeight: '1.4',
  },
  badgeHighlight: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    backgroundColor: '#ffffff',
    color: '#3b00a5',
    padding: '8px 16px',
    borderRadius: '20px',
    fontSize: '0.75rem',
    fontWeight: 'bold',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
  },
  section: {
    width: '100%',
  },
  infoBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    padding: '8px 16px',
    borderRadius: '20px',
    fontSize: '0.75rem',
    color: 'rgba(255, 255, 255, 0.9)',
    width: 'fit-content',
  },
};