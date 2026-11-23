import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Check, Flame, Heart, RotateCcw, Star, Timer, Trophy, X } from 'lucide-react';
import {
  RODADAS_POR_NIVEL,
  VIDAS_INFINITO,
  duracaoRodadaInfinita,
  nivelDaRodadaInfinita,
  proximaRodadaInfinita,
  sortearNivel,
} from '../dados/senhas';
import type { RodadaPreparada } from '../dados/senhas';
import { useAuth } from '../contexts/AuthContext';
import { useProgresso } from '../contexts/ProgressoContext';
import { registrarPartida } from '../services/progresso';

const JOGO_ID = '1'; // "Análise de senhas" em dados/jogos.ts
const ESTRELAS_PARA_CONCLUIR = 2; // 2 estrelas = pelo menos 70% de acertos

interface AnalisarSenhasProps {
  nivelId: string; // "1" a "6" ou "infinito"
  proximoNivelId?: string;
  onAbrirNivel: (nivelId: string) => void;
}

type Fase = 'inicio' | 'jogando' | 'resultado';
type Salvamento = 'salvando' | 'ok' | 'erro';

function calcularEstrelas(proporcao: number): number {
  return proporcao >= 0.9 ? 3 : proporcao >= 0.7 ? 2 : proporcao >= 0.5 ? 1 : 0;
}

const chaveRecorde = (nivelId: string) => `cyberlock:senhas:recorde:${nivelId}`;

function lerRecorde(nivelId: string): number {
  try {
    return Number(localStorage.getItem(chaveRecorde(nivelId))) || 0;
  } catch {
    return 0;
  }
}

function salvarRecorde(nivelId: string, pontos: number) {
  try {
    localStorage.setItem(chaveRecorde(nivelId), String(pontos));
  } catch {
    // armazenamento indisponível: o jogo continua normalmente
  }
}

// Wrapper: permite "Jogar novamente" recriando a partida do zero.
export const AnalisarSenhas: React.FC<AnalisarSenhasProps> = (props) => {
  const [tentativa, setTentativa] = useState(0);
  return (
    <Partida
      key={`${props.nivelId}-${tentativa}`}
      {...props}
      onReiniciar={() => setTentativa((t) => t + 1)}
    />
  );
};

interface PartidaProps extends AnalisarSenhasProps {
  onReiniciar: () => void;
}

const Partida: React.FC<PartidaProps> = ({ nivelId, proximoNivelId, onAbrirNivel, onReiniciar }) => {
  const infinito = nivelId === 'infinito';

  const [fase, setFase] = useState<Fase>(infinito ? 'inicio' : 'jogando');
  const [rodadas, setRodadas] = useState<RodadaPreparada[]>(() =>
    infinito ? [proximaRodadaInfinita(0, [])] : sortearNivel(Number(nivelId)),
  );
  const [indice, setIndice] = useState(0);
  const [escolha, setEscolha] = useState<number | null>(null); // posição clicada (-1 = tempo esgotado)
  const [pontos, setPontos] = useState(0);
  const [acertos, setAcertos] = useState(0);
  const [sequencia, setSequencia] = useState(0);
  const [melhorSequencia, setMelhorSequencia] = useState(0);
  const [vidas, setVidas] = useState(VIDAS_INFINITO);
  const [tempo, setTempo] = useState(0);
  const [recorde, setRecorde] = useState(0);
  const [novoRecorde, setNovoRecorde] = useState(false);
  const [xpGanho, setXpGanho] = useState(0);
  const [salvamento, setSalvamento] = useState<Salvamento>('salvando');
  const { usuario } = useAuth();
  const { jogos } = useProgresso();
  const botaoContinuar = useRef<HTMLButtonElement>(null);

  const atual = rodadas[indice];
  const respondida = escolha !== null;
  const duracao = infinito ? duracaoRodadaInfinita(indice) : 0;
  const total = infinito ? indice + 1 : rodadas.length;
  const rodadasJogadas = infinito ? indice + 1 : rodadas.length;
  const estrelas = infinito ? 0 : calcularEstrelas(acertos / Math.max(rodadasJogadas, 1));
  const recordeSalvo = Math.max(lerRecorde(nivelId), jogos[JOGO_ID]?.[nivelId]?.melhorPontos ?? 0);

  // Fim da partida: grava no Firestore; se falhar, mantém o recorde no navegador.
  const finalizar = (pontosFinais: number) => {
    setFase('resultado');
    setSalvamento('salvando');

    const salvarLocalmente = () => {
      const anterior = lerRecorde(nivelId);
      setRecorde(Math.max(anterior, pontosFinais));
      setNovoRecorde(pontosFinais > anterior);
      if (pontosFinais > anterior) salvarRecorde(nivelId, pontosFinais);
      setSalvamento('erro');
    };

    if (!usuario) {
      salvarLocalmente();
      return;
    }

    registrarPartida(usuario.uid, JOGO_ID, nivelId, {
      pontos: pontosFinais,
      acertos,
      totalRodadas: rodadasJogadas,
      estrelas,
      concluido: !infinito && estrelas >= ESTRELAS_PARA_CONCLUIR,
    })
      .then((retorno) => {
        setXpGanho(retorno.xpGanho);
        setRecorde(Math.max(retorno.recordeAnterior, pontosFinais));
        setNovoRecorde(retorno.novoRecorde);
        setSalvamento('ok');
      })
      .catch(salvarLocalmente);
  };

  const responder = (posicao: number) => {
    if (respondida || !atual) return;
    const acertou = posicao >= 0 && atual.ordem[posicao] === atual.rodada.correta;
    setEscolha(posicao);

    if (acertou) {
      const bonusTempo = infinito ? Math.round(tempo / 2) : 0;
      setPontos((p) => p + 10 + Math.min(sequencia, 5) * 2 + bonusTempo);
      setAcertos((a) => a + 1);
      setSequencia(sequencia + 1);
      setMelhorSequencia((m) => Math.max(m, sequencia + 1));
    } else {
      setSequencia(0);
      if (infinito) setVidas((v) => v - 1);
    }
  };

  const continuar = () => {
    if (infinito) {
      if (vidas <= 0) {
        finalizar(pontos);
        return;
      }
      const usadas = rodadas.map((r) => r.rodada.id);
      setRodadas((lista) => [...lista, proximaRodadaInfinita(indice + 1, usadas)]);
    } else if (indice + 1 >= rodadas.length) {
      finalizar(pontos);
      return;
    }
    setIndice(indice + 1);
    setEscolha(null);
  };

  // Cronômetro do modo infinito: reinicia a cada rodada e responde "tempo esgotado" ao zerar.
  const responderRef = useRef(responder);
  useEffect(() => {
    responderRef.current = responder;
  });

  useEffect(() => {
    if (!infinito || fase !== 'jogando' || escolha !== null) return;
    const limite = Date.now() + duracao * 1000;
    setTempo(duracao);
    const intervalo = setInterval(() => {
      const restante = Math.max(0, (limite - Date.now()) / 1000);
      setTempo(restante);
      if (restante <= 0) {
        clearInterval(intervalo);
        responderRef.current(-1);
      }
    }, 100);
    return () => clearInterval(intervalo);
  }, [infinito, fase, indice, escolha, duracao]);

  // Após responder, leva o foco ao botão "Continuar" (acessibilidade por teclado).
  useEffect(() => {
    if (respondida) botaoContinuar.current?.focus();
  }, [respondida]);

  /* ───────────── Tela inicial do modo infinito ───────────── */
  if (fase === 'inicio') {
    return (
      <div style={estilos.painel}>
        <h2 style={estilos.tituloTela}>Modo Infinito</h2>
        <p style={estilos.textoTela}>
          Identifique senhas vulneráveis sem parar. A dificuldade sobe a cada rodada e o tempo para responder diminui.
        </p>
        <ul style={estilos.regras}>
          <li>Você começa com {VIDAS_INFINITO} vidas.</li>
          <li>Resposta errada ou tempo esgotado custa uma vida.</li>
          <li>Acertos em sequência e respostas rápidas valem mais pontos.</li>
        </ul>
        {recordeSalvo > 0 && <p style={estilos.recordeTexto}>Seu recorde: {recordeSalvo} pontos</p>}
        <button style={estilos.botaoPrimario} onClick={() => setFase('jogando')}>
          Começar
        </button>
      </div>
    );
  }

  /* ───────────── Tela de resultado ───────────── */
  if (fase === 'resultado') {
    return (
      <div style={estilos.painel}>
        <Trophy size={44} color="#6d28d9" />
        <h2 style={estilos.tituloTela}>{infinito ? 'Fim de jogo!' : estrelas >= ESTRELAS_PARA_CONCLUIR ? 'Nível concluído!' : 'Quase lá!'}</h2>

        {!infinito && (
          <div style={estilos.estrelas} aria-label={`${estrelas} de 3 estrelas`}>
            {[1, 2, 3].map((n) => (
              <Star key={n} size={34} color="#f59e0b" fill={n <= estrelas ? '#f59e0b' : 'none'} />
            ))}
          </div>
        )}

        <div style={estilos.resumo}>
          <div style={estilos.resumoItem}>
            <strong style={estilos.resumoValor}>{infinito ? indice + 1 : `${acertos}/${rodadas.length}`}</strong>
            <span>{infinito ? 'rodadas jogadas' : 'acertos'}</span>
          </div>
          <div style={estilos.resumoItem}>
            <strong style={estilos.resumoValor}>{pontos}</strong>
            <span>pontos</span>
          </div>
          <div style={estilos.resumoItem}>
            <strong style={estilos.resumoValor}>{melhorSequencia}</strong>
            <span>melhor sequência</span>
          </div>
        </div>

        {salvamento === 'salvando' && <p style={estilos.recordeTexto}>Salvando seu progresso...</p>}
        {salvamento !== 'salvando' && (
          <p style={estilos.recordeTexto}>
            {novoRecorde ? 'Novo recorde!' : `Recorde: ${recorde} pontos`}
            {salvamento === 'ok' && xpGanho > 0 && ` · +${xpGanho} XP`}
          </p>
        )}
        {salvamento === 'erro' && (
          <p style={estilos.avisoErro}>Não foi possível salvar seu progresso na conta. Verifique sua conexão e tente novamente.</p>
        )}
        {!infinito && estrelas < ESTRELAS_PARA_CONCLUIR && (
          <p style={estilos.textoTela}>Acerte pelo menos 70% das rodadas para concluir este nível.</p>
        )}

        <div style={estilos.linhaBotoes}>
          <button style={estilos.botaoSecundario} onClick={onReiniciar}>
            <RotateCcw size={16} /> Jogar novamente
          </button>
          {!infinito && proximoNivelId && (
            <button style={estilos.botaoPrimario} onClick={() => onAbrirNivel(proximoNivelId)}>
              {proximoNivelId === 'infinito' ? 'Modo Infinito' : 'Próximo nível'} <ArrowRight size={16} />
            </button>
          )}
        </div>
      </div>
    );
  }

  /* ───────────── Rodada ───────────── */
  if (!atual) return null;
  const { rodada, ordem } = atual;
  const acertou = respondida && escolha !== null && escolha >= 0 && ordem[escolha] === rodada.correta;
  const tempoEsgotado = escolha === -1;
  const ultimaRodada = !infinito && indice + 1 >= rodadas.length;
  const fimPorVidas = infinito && vidas <= 0;
  const progresso = infinito ? 100 : ((indice + (respondida ? 1 : 0)) / RODADAS_POR_NIVEL) * 100;

  return (
    <div style={estilos.jogo}>
      {/* Barra superior */}
      <div style={estilos.hud}>
        <span style={estilos.hudItem}>
          {infinito ? `Rodada ${total} · Nível ${nivelDaRodadaInfinita(indice)}` : `Rodada ${indice + 1}/${rodadas.length}`}
        </span>
        <div style={estilos.hudDireita}>
          {infinito && (
            <span style={estilos.hudItem} aria-label={`${vidas} vidas`}>
              {Array.from({ length: VIDAS_INFINITO }, (_, i) => (
                <Heart key={i} size={18} color="#dc2626" fill={i < vidas ? '#dc2626' : 'none'} />
              ))}
            </span>
          )}
          {sequencia >= 2 && (
            <span style={estilos.hudItem}>
              <Flame size={18} color="#ea580c" /> {sequencia}
            </span>
          )}
          <span style={estilos.hudPontos}>{pontos} pts</span>
        </div>
      </div>

      {/* Barra de progresso (níveis) ou de tempo (infinito) */}
      <div
        style={estilos.barraFundo}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(infinito && !respondida ? (tempo / duracao) * 100 : progresso)}
        aria-label={infinito ? 'Tempo restante' : 'Progresso do nível'}
      >
        <div
          style={{
            ...estilos.barraPreenchida,
            width: `${infinito ? (respondida ? 0 : (tempo / duracao) * 100) : progresso}%`,
            backgroundColor: infinito && tempo / duracao < 0.3 ? '#dc2626' : '#7c3aed',
            transition: infinito ? 'none' : 'width 0.3s',
          }}
        />
      </div>
      {infinito && (
        <span style={estilos.tempoTexto}>
          <Timer size={14} /> {respondida ? '—' : `${tempo.toFixed(1)}s`}
        </span>
      )}

      {/* Contexto e senha */}
      {rodada.contexto && <p style={estilos.contexto}>{rodada.contexto}</p>}
      {rodada.senha && (
        <div style={estilos.tela} aria-label={`Senha: ${rodada.senha}`}>
          <span style={estilos.telaRotulo}>senha&gt;</span>
          <span style={estilos.telaSenha}>{rodada.senha}</span>
        </div>
      )}

      <h3 style={estilos.pergunta}>{rodada.pergunta}</h3>

      {/* Opções */}
      <div style={estilos.opcoes}>
        {ordem.map((indiceOriginal, posicao) => {
          const eCorreta = indiceOriginal === rodada.correta;
          const eEscolhida = escolha === posicao;
          let estilo = estilos.opcao;
          if (respondida) {
            if (eCorreta) estilo = { ...estilo, ...estilos.opcaoCorreta };
            else if (eEscolhida) estilo = { ...estilo, ...estilos.opcaoErrada };
            else estilo = { ...estilo, ...estilos.opcaoApagada };
          }
          return (
            <button
              key={posicao}
              disabled={respondida}
              onClick={() => responder(posicao)}
              style={{ ...estilo, ...(rodada.mono ? estilos.opcaoMono : {}) }}
            >
              <span style={estilos.opcaoTexto}>{rodada.opcoes[indiceOriginal]}</span>
              {respondida && eCorreta && <Check size={20} />}
              {respondida && eEscolhida && !eCorreta && <X size={20} />}
            </button>
          );
        })}
      </div>

      {/* Feedback */}
      {respondida && (
        <div
          role="status"
          aria-live="polite"
          style={{ ...estilos.feedback, ...(acertou ? estilos.feedbackCerto : estilos.feedbackErrado) }}
        >
          <strong>{acertou ? 'Correto!' : tempoEsgotado ? 'Tempo esgotado!' : 'Não foi dessa vez.'}</strong>
          <p style={estilos.feedbackTexto}>{rodada.explicacao}</p>
          <button ref={botaoContinuar} style={estilos.botaoPrimario} onClick={continuar}>
            {fimPorVidas ? 'Ver resultado' : ultimaRodada ? 'Ver resultado' : 'Continuar'} <ArrowRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
};

const estilos: { [key: string]: React.CSSProperties } = {
  jogo: { width: '100%', maxWidth: '760px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '14px' },
  hud: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px', flexWrap: 'wrap', color: '#3b00a5', fontWeight: 700, fontSize: '0.9rem' },
  hudDireita: { display: 'flex', alignItems: 'center', gap: '14px' },
  hudItem: { display: 'inline-flex', alignItems: 'center', gap: '4px' },
  hudPontos: { backgroundColor: '#3b00a5', color: '#ffffff', padding: '4px 14px', borderRadius: '14px', fontSize: '0.85rem' },
  barraFundo: { width: '100%', height: '10px', backgroundColor: '#ffffff', borderRadius: '10px', overflow: 'hidden' },
  barraPreenchida: { height: '100%', borderRadius: '10px' },
  tempoTexto: { display: 'inline-flex', alignItems: 'center', gap: '4px', alignSelf: 'flex-end', color: '#3b00a5', fontWeight: 700, fontSize: '0.8rem' },

  contexto: { backgroundColor: '#ede9fe', color: '#3b00a5', borderLeft: '5px solid #7c3aed', borderRadius: '10px', padding: '12px 16px', fontSize: '0.95rem', lineHeight: 1.5 },
  tela: { backgroundColor: '#1d0f2e', borderRadius: '16px', padding: '22px 20px', display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', boxShadow: 'inset 0 0 0 2px #4c1d95' },
  telaRotulo: { color: '#a78bfa', fontFamily: 'monospace', fontSize: '1rem' },
  telaSenha: { color: '#86efac', fontFamily: 'monospace', fontSize: '1.7rem', fontWeight: 700, letterSpacing: '2px', overflowWrap: 'anywhere' },
  pergunta: { color: '#2e1065', fontSize: '1.15rem', fontWeight: 700, marginTop: '4px' },

  opcoes: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '10px' },
  opcao: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px', textAlign: 'left', backgroundColor: '#ffffff', color: '#3b00a5', border: '2px solid #c4b5fd', borderBottom: '4px solid #a78bfa', borderRadius: '14px', padding: '14px 16px', fontSize: '0.95rem', fontWeight: 600, cursor: 'pointer' },
  opcaoMono: { fontFamily: 'monospace', fontSize: '1rem' },
  opcaoTexto: { overflowWrap: 'anywhere' },
  opcaoCorreta: { backgroundColor: '#dcfce7', color: '#14532d', borderColor: '#16a34a', cursor: 'default' },
  opcaoErrada: { backgroundColor: '#fee2e2', color: '#7f1d1d', borderColor: '#dc2626', cursor: 'default' },
  opcaoApagada: { opacity: 0.55, cursor: 'default' },

  feedback: { borderRadius: '14px', padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'flex-start' },
  feedbackCerto: { backgroundColor: '#dcfce7', color: '#14532d' },
  feedbackErrado: { backgroundColor: '#fee2e2', color: '#7f1d1d' },
  feedbackTexto: { fontSize: '0.92rem', lineHeight: 1.5 },

  painel: { width: '100%', maxWidth: '620px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', textAlign: 'center', padding: '16px 0' },
  tituloTela: { color: '#3b00a5', fontSize: '1.8rem', fontWeight: 800 },
  textoTela: { color: '#4c1d95', fontSize: '1rem', lineHeight: 1.5 },
  regras: { color: '#4c1d95', fontSize: '0.95rem', lineHeight: 1.7, textAlign: 'left', paddingLeft: '20px' },
  estrelas: { display: 'flex', gap: '8px' },
  resumo: { display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' },
  resumoItem: { backgroundColor: '#ffffff', color: '#4c1d95', borderRadius: '14px', padding: '12px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', fontSize: '0.8rem', minWidth: '120px' },
  resumoValor: { color: '#3b00a5', fontSize: '1.6rem' },
  recordeTexto: { color: '#6d28d9', fontWeight: 700 },
  avisoErro: { backgroundColor: '#fee2e2', color: '#7f1d1d', borderRadius: '10px', padding: '8px 14px', fontSize: '0.85rem' },
  linhaBotoes: { display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' },
  botaoPrimario: { display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: '#3b00a5', color: '#ffffff', border: 'none', borderBottom: '4px solid #24006b', borderRadius: '14px', padding: '12px 26px', fontSize: '0.95rem', fontWeight: 700, cursor: 'pointer' },
  botaoSecundario: { display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: '#ffffff', color: '#3b00a5', border: '2px solid #c4b5fd', borderBottom: '4px solid #a78bfa', borderRadius: '14px', padding: '12px 22px', fontSize: '0.95rem', fontWeight: 700, cursor: 'pointer' },
};
