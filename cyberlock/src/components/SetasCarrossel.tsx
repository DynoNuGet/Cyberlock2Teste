import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface SetasCarrosselProps {
  podeVoltar: boolean;
  podeAvancar: boolean;
  onVoltar: () => void;
  onAvancar: () => void;
}

export const SetasCarrossel: React.FC<SetasCarrosselProps> = ({ podeVoltar, podeAvancar, onVoltar, onAvancar }) => {
  // Se tudo cabe na tela, não há o que navegar.
  if (!podeVoltar && !podeAvancar) return null;

  return (
    <div style={styles.linha}>
      <button type="button" onClick={onVoltar} disabled={!podeVoltar} style={{ ...styles.seta, opacity: podeVoltar ? 1 : 0.4 }} aria-label="Anterior">
        <ChevronLeft size={18} />
      </button>
      <button type="button" onClick={onAvancar} disabled={!podeAvancar} style={{ ...styles.seta, opacity: podeAvancar ? 1 : 0.4 }} aria-label="Próximo">
        <ChevronRight size={18} />
      </button>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  linha: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '10px',
  },
  seta: {
    backgroundColor: '#7c3aed',
    border: 'none',
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#ffffff',
    cursor: 'pointer',
    boxShadow: '0 4px 12px rgba(124, 58, 237, 0.3)',
  },
};
