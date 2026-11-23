import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Lógica compartilhada pelos carrosséis (jogos, notícias e lições).
 * Cada carrossel cuida do seu próprio visual; aqui fica só a mecânica
 * de medir a janela, calcular quantos itens cabem e andar para os lados.
 */
export function useCarrossel(totalItens: number, larguraItem: number, espaco = 20) {
  const janelaRef = useRef<HTMLDivElement>(null);
  const [indice, setIndice] = useState(0);
  const [medidas, setMedidas] = useState({ largura: larguraItem, visiveis: 1 });

  useEffect(() => {
    const janela = janelaRef.current;
    if (!janela) return;

    const medir = () => {
      const disponivel = janela.clientWidth;
      if (disponivel === 0) return;
      const largura = Math.min(larguraItem, disponivel);
      const visiveis = Math.max(1, Math.floor((disponivel + espaco) / (largura + espaco)));
      setMedidas({ largura, visiveis });
    };

    medir();
    const observador = new ResizeObserver(medir);
    observador.observe(janela);
    return () => observador.disconnect();
  }, [larguraItem, espaco]);

  const maxIndice = Math.max(0, totalItens - medidas.visiveis);
  const indiceAtual = Math.min(indice, maxIndice);

  const voltar = useCallback(() => setIndice(Math.max(0, indiceAtual - 1)), [indiceAtual]);
  const avancar = useCallback(() => setIndice(Math.min(maxIndice, indiceAtual + 1)), [indiceAtual, maxIndice]);

  return {
    janelaRef,
    larguraSlide: medidas.largura,
    deslocamento: indiceAtual * (medidas.largura + espaco),
    podeVoltar: indiceAtual > 0,
    podeAvancar: indiceAtual < maxIndice,
    voltar,
    avancar,
  };
}
