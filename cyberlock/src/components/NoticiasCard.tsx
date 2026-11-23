import React from 'react';
import { Eye, ArrowRight } from 'lucide-react';
import type { NewsArticle } from '../dados/noticias';

interface NoticiasCardProps {
  noticia: NewsArticle;
  onClick?: () => void;
}

export const NoticiasCard: React.FC<NoticiasCardProps> = ({ noticia, onClick }) => {
  const teclado = (e: React.KeyboardEvent) => {
    if (e.target === e.currentTarget && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onClick?.();
    }
  };

  return (
    <div role="link" tabIndex={0} onClick={onClick} onKeyDown={teclado} style={styles.card}>
      <div style={styles.imageContainer}>
        <img src={noticia.imageUrl} alt={noticia.title} style={styles.image} />
      </div>

      <div style={styles.content}>
        <div style={styles.metaRow}>
          <span style={styles.categoryBadge}>{noticia.category}</span>
          <div style={styles.viewsBadge}>
            <Eye size={12} color="#6d28d9" />
            <span>{noticia.views}</span>
          </div>
        </div>

        <h3 style={styles.title}>{noticia.title}</h3>
        <p style={styles.description}>{noticia.description}</p>

        <div style={styles.footer}>
          <div style={styles.authorGroup}>
            <img src={noticia.authorAvatar} alt={noticia.authorName} style={styles.authorAvatar} />
            <div style={styles.authorInfo}>
              <span style={styles.authorName}>{noticia.authorName}</span>
              <span style={styles.authorRole}>{noticia.authorRole}</span>
            </div>
          </div>

          <span style={styles.readMoreBtn}>
            Ler mais <ArrowRight size={14} />
          </span>
        </div>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  card: {
    backgroundColor: '#ffffff',
    borderRadius: '20px',
    overflow: 'hidden',
    boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    maxWidth: '540px',
    cursor: 'pointer',
    textAlign: 'left',
  },
  imageContainer: { height: '200px', width: '100%' },
  image: { width: '100%', height: '100%', objectFit: 'cover' },
  content: { padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 },
  metaRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px' },
  categoryBadge: {
    backgroundColor: '#e9d5ff',
    color: '#6d28d9',
    fontSize: '0.65rem',
    fontWeight: 'bold',
    padding: '4px 10px',
    borderRadius: '12px',
    textTransform: 'uppercase',
  },
  viewsBadge: { display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.7rem', color: '#6d28d9', fontWeight: '600' },
  title: { color: '#2e1065', fontSize: '1.1rem', fontWeight: '700', lineHeight: '1.3' },
  description: { color: '#5b21b6', fontSize: '0.8rem', lineHeight: '1.5' },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 'auto',
    paddingTop: '12px',
    borderTop: '1px solid #f3e8ff',
  },
  authorGroup: { display: 'flex', alignItems: 'center', gap: '10px' },
  authorAvatar: { width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' },
  authorInfo: { display: 'flex', flexDirection: 'column' },
  authorName: { fontSize: '0.75rem', fontWeight: 'bold', color: '#2e1065' },
  authorRole: { fontSize: '0.65rem', color: '#7c3aed' },
  readMoreBtn: {
    color: '#7c3aed',
    fontSize: '0.8rem',
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  },
};
