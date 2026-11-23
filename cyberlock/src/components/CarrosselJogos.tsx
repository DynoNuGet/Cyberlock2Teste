import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GameCard } from './GameCard';
import { SetasCarrossel } from './SetasCarrossel';
import { useCarrossel } from '../hooks/useCarrossel';
import { JOGOS } from '../dados/jogos';

interface CarrosselJogosProps {
  /** Esconde um jogo do carrossel (ex.: o jogo da tela atual). */
  excluirId?: string;
  variante?: 'padrao' | 'compacto';
}

const ESPACO = 20;

/**
 * Carrossel de jogos. Os slides são escritos um a um, na ordem em que aparecem.
 * Para incluir um jogo novo: cadastre em dados/jogos.ts e acrescente um slide abaixo.
 */
export const CarrosselJogos: React.FC<CarrosselJogosProps> = ({ excluirId, variante = 'padrao' }) => {
  const navigate = useNavigate();
  const abrir = (id: string) => navigate(`/jogos/${id}`);
  const larguraItem = variante === 'compacto' ? 300 : 270;

  const slides = [
    excluirId !== '1' && (
      <div key="1" style={styles.slide}>
        <GameCard jogo={JOGOS['1']} variante={variante} onClick={() => abrir('1')} />
      </div>
    ),
    excluirId !== '2' && (
      <div key="2" style={styles.slide}>
        <GameCard jogo={JOGOS['2']} variante={variante} onClick={() => abrir('2')} />
      </div>
    ),
    excluirId !== '3' && (
      <div key="3" style={styles.slide}>
        <GameCard jogo={JOGOS['3']} variante={variante} onClick={() => abrir('3')} />
      </div>
    ),
    excluirId !== '4' && (
      <div key="4" style={styles.slide}>
        <GameCard jogo={JOGOS['4']} variante={variante} onClick={() => abrir('4')} />
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
            // largura dos slides vem do hook, para acompanhar telas pequenas
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
