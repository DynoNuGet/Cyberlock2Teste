import React from 'react';
import { SetasCarrossel } from './SetasCarrossel';
import { useCarrossel } from '../hooks/useCarrossel';
import type { Licao } from '../dados/jogos';

interface CarrosselLicoesProps {
  licoes: Licao[];
}

const ESPACO = 40;

export const CarrosselLicoes: React.FC<CarrosselLicoesProps> = ({ licoes }) => {
  const { janelaRef, larguraSlide, deslocamento, podeVoltar, podeAvancar, voltar, avancar } =
    useCarrossel(licoes.length, 420, ESPACO);

  return (
    <div style={styles.wrapper}>
      <div ref={janelaRef} style={styles.janela}>
        <div
          style={{
            ...styles.trilho,
            gap: `${ESPACO}px`,
            transform: `translateX(-${deslocamento}px)`,
          }}
        >
          {licoes.map((licao, i) => (
            <div key={licao.id} style={{ ...styles.card, flex: `0 0 ${larguraSlide}px`, width: larguraSlide }}>
              <img src={licao.imageUrl} alt={licao.titulo} style={styles.imagem} />
              <h3 style={styles.titulo}>{licao.titulo}</h3>
              <div style={styles.barraFundo}>
                <div style={{ ...styles.barraPreenchida, width: `${licao.progresso}%` }} />
              </div>
              <span style={styles.contagem}>Lição {i + 1} de {licoes.length}</span>
            </div>
          ))}
        </div>
      </div>

      <SetasCarrossel podeVoltar={podeVoltar} podeAvancar={podeAvancar} onVoltar={voltar} onAvancar={avancar} />
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  wrapper: { width: '100%', display: 'flex', flexDirection: 'column', gap: '16px' },
  janela: { width: '100%', overflow: 'hidden', padding: '4px 0 10px' },
  trilho: { display: 'flex', alignItems: 'stretch', transition: 'transform 0.4s ease' },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  imagem: { width: '100%', height: '200px', objectFit: 'cover', borderRadius: '12px' },
  titulo: { color: '#1e1b4b', fontSize: '1.1rem', fontWeight: 500 },
  barraFundo: { width: '100%', height: '6px', backgroundColor: '#e5e7eb', borderRadius: '10px', overflow: 'hidden', marginTop: 'auto' },
  barraPreenchida: { height: '100%', backgroundColor: '#a855f7', borderRadius: '10px' },
  contagem: { alignSelf: 'flex-end', fontSize: '0.7rem', color: '#6b7280', fontWeight: 600 },
};
