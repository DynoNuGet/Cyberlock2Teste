import React from 'react';
import { useNavigate } from 'react-router-dom';
import { NoticiasCard } from './NoticiasCard';
import { SetasCarrossel } from './SetasCarrossel';
import { useCarrossel } from '../hooks/useCarrossel';
import { NOTICIAS } from '../dados/noticias';

interface CarrosselNoticiasProps {
  /** Esconde uma notícia do carrossel (ex.: a que está aberta na tela). */
  excluirId?: string;
  larguraItem?: number;
}

const ESPACO = 24;

/**
 * Carrossel de notícias. Os slides são escritos um a um, na ordem em que aparecem.
 * Para incluir uma notícia nova: cadastre em dados/noticias.ts e acrescente um slide abaixo.
 */
export const CarrosselNoticias: React.FC<CarrosselNoticiasProps> = ({ excluirId, larguraItem = 450 }) => {
  const navigate = useNavigate();
  const abrir = (id: string) => navigate(`/noticias/${id}`);

  const slides = [
    excluirId !== '1' && (
      <div key="1" style={styles.slide}>
        <NoticiasCard noticia={NOTICIAS['1']} onClick={() => abrir('1')} />
      </div>
    ),
    excluirId !== '2' && (
      <div key="2" style={styles.slide}>
        <NoticiasCard noticia={NOTICIAS['2']} onClick={() => abrir('2')} />
      </div>
    ),
  ].filter(Boolean);

  const { janelaRef, larguraSlide, deslocamento, podeVoltar, podeAvancar, voltar, avancar } =
    useCarrossel(slides.length, larguraItem, ESPACO);

  return (
    <div style={styles.wrapper}>
      <div ref={janelaRef} style={styles.janela}>
        <div
          style={{
            ...styles.trilho,
            gap: `${ESPACO}px`,
            transform: `translateX(-${deslocamento}px)`,
            ['--largura-slide' as string]: `${larguraSlide}px`,
          }}
        >
          {slides}
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
  slide: { flex: '0 0 var(--largura-slide)', width: 'var(--largura-slide)', display: 'flex' },
};
