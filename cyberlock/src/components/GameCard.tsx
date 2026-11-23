import React from 'react';
import { Star, Zap } from 'lucide-react';
import type { Game } from '../dados/jogos';

interface GameCardProps {
  jogo: Game;
  onClick?: () => void;
  variante?: 'padrao' | 'compacto';
}

export const GameCard: React.FC<GameCardProps> = ({ jogo, onClick, variante = 'padrao' }) => {
  const teclado = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick?.();
    }
  };

  if (variante === 'compacto') {
    return (
      <div role="button" tabIndex={0} onClick={onClick} onKeyDown={teclado} style={styles.compacto}>
        <span style={styles.compactoBadge}>{jogo.badge}</span>
        <h3 style={styles.compactoTitulo}>{jogo.title}</h3>
        <p style={styles.compactoDescricao}>{jogo.description}</p>
        <div style={styles.compactoRodape}>
          <span style={styles.compactoNiveis}>{jogo.niveis.length} níveis</span>
          <span style={styles.compactoBotao}>Jogar</span>
        </div>
      </div>
    );
  }

  return (
    <div role="button" tabIndex={0} onClick={onClick} onKeyDown={teclado} style={styles.card}>
      <div style={styles.imageContainer}>
        <img src={jogo.imageUrl} alt={jogo.title} style={styles.image} />
        <span style={styles.levelBadge}>{jogo.level}</span>
      </div>

      <div style={styles.content}>
        <h3 style={styles.title}>{jogo.title}</h3>
        <p style={styles.description}>{jogo.description}</p>

        <div style={styles.footer}>
          <div style={styles.metricBadge}>
            <Star size={12} color="#7c3aed" />
            <span>{jogo.rating}</span>
          </div>
          <div style={styles.metricBadge}>
            <Zap size={12} color="#7c3aed" />
            <span>{jogo.xp}</span>
          </div>
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
    maxWidth: '270px',
    cursor: 'pointer',
    textAlign: 'left',
  },
  imageContainer: { position: 'relative', height: '140px', width: '100%' },
  image: { width: '100%', height: '100%', objectFit: 'cover' },
  levelBadge: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    backgroundColor: 'rgba(233, 213, 255, 0.9)',
    color: '#6d28d9',
    fontSize: '0.65rem',
    fontWeight: 'bold',
    padding: '4px 10px',
    borderRadius: '12px',
    textTransform: 'uppercase',
  },
  content: { padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 },
  title: { color: '#2e1065', fontSize: '1rem', fontWeight: '700' },
  description: {
    color: '#6b21a8',
    fontSize: '0.75rem',
    lineHeight: '1.4',
    display: '-webkit-box',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  },
  footer: { display: 'flex', gap: '8px', marginTop: 'auto', paddingTop: '8px' },
  metricBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    backgroundColor: '#f3e8ff',
    padding: '4px 8px',
    borderRadius: '10px',
    fontSize: '0.7rem',
    fontWeight: 'bold',
    color: '#6d28d9',
  },
  compacto: {
    backgroundColor: '#ddd6fe',
    border: '1px solid #818cf8',
    borderRadius: '20px',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    width: '100%',
    height: '100%',
    cursor: 'pointer',
    textAlign: 'left',
  },
  compactoBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#c4b5fd',
    color: '#ffffff',
    fontSize: '0.65rem',
    fontWeight: 'bold',
    padding: '4px 10px',
    borderRadius: '12px',
  },
  compactoTitulo: { color: '#3b00a5', fontSize: '1.3rem', fontWeight: 700 },
  compactoDescricao: { color: '#7c3aed', fontSize: '0.8rem', lineHeight: '1.4', flex: 1 },
  compactoRodape: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' },
  compactoNiveis: { color: '#7c3aed', fontSize: '0.8rem', fontWeight: 600 },
  compactoBotao: {
    backgroundColor: '#3b00a5',
    color: '#ffffff',
    fontSize: '0.8rem',
    fontWeight: 'bold',
    padding: '8px 20px',
    borderRadius: '14px',
  },
};
