import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Check, Flag, Flame, RotateCcw, Scale, Star, Timer, Trophy, X } from 'lucide-react';
import {
  AFIRMACOES_POR_NIVEL,
  ENERGIA_INICIAL,
  ENERGIA_RECUPERADA,
  ROTULOS,
  duracaoInfinita,
  nivelInfinito,
  penalidadeDoErro,
  proximaAfirmacaoInfinita,
  sortearNivel,
} from '../dados/rema';
import type { Afirmacao, Resposta } from '../dados/rema';
import { useAuth } from '../contexts/AuthContext';
import { useProgresso } from '../contexts/ProgressoContext';
import { registrarPartida } from '../services/progresso';
import { estilosJogo } from './estilos';

const JOGO_ID = '4'; // "Rema ao Tema" em dados/jogos.ts
const ESTRELAS_PARA_CONCLUIR = 2; // 2 estrelas = pelo menos 70% de acertos

interface RemaAoTemaProps {
  nivelId: string; // "1" a "6" ou "infinito"
  proximoNivelId?: string;
  onAbrirNivel: (nivelId: string) => void;
}

type Fase = 'inicio' | 'jogando' | 'resultado';
type Salvamento = 'salvando' | 'ok' | 'erro';
type Escolha = Resposta | 'tempo';

const chaveRecorde = (nivelId: string) => `cyberlock:rema:recorde:${nivelId}`;

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

function calcularEstrelas(proporcao: number): number {
  return proporcao >= 0.9 ? 3 : proporcao >= 0.7 ? 2 : proporcao >= 0.5 ? 1 : 0;
}

const opcoesDe = (a: Afirmacao): Resposta[] => (a.nivel === 6 ? ['verdade', 'mito', 'depende'] : ['verdade', 'mito']);

/* ───────────── Barco e rio ───────────── */

const Barco: React.FC = () => (
  <svg width="44" height="40" viewBox="0 0 44 40" aria-hidden="true">
    <path d="M22 3 L22 24 L6 24 Z" fill="#ffffff" stroke="#3b00a5" strokeWidth="2" strokeLinejoin="round" />
    <path d="M24 8 L24 24 L36 24 Z" fill="#ede9fe" stroke="#3b00a5" strokeWidth="2" strokeLinejoin="round" />
    <path d="M4 27 H40 L35 36 H9 Z" fill="#7c3aed" stroke="#3b00a5" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);

const Rio: React.FC<{ progresso: number }> = ({ progresso }) => (
  <div style={estilos.rio} role="img" aria-label={`Barco com ${Math.round(progresso * 100)}% do caminho percorrido`}>
    <style>{`
      @keyframes remaBalanco { 0%, 100% { transform: translateY(0) rotate(-2deg); } 50% { transform: translateY(-3px) rotate(2deg); } }
      @media (prefers-reduced-motion: reduce) { .rema-balanco { animation: none !important; } }
    `}</style>
    <div style={{ ...estilos.barco, left: `calc(${progresso} * (100% - 100px) + 8px)` }}>
      <div className="rema-balanco" style={estilos.barcoBalanco}>
        <Barco />
      </div>
    </div>
    <Flag size={22} color="#3b00a5" style={estilos.bandeira} />
  </div>
);

/* ───────────── Partida ───────────── */

export const RemaAoTema: React.FC<RemaAoTemaProps> = (props) => {
  const [tentativa, setTentativa] = useState(0);
  return (
    <Partida key={`${props.nivelId}-${tentativa}`} {...props} onReiniciar={() => setTentativa((t) => t + 1)} />
  );
};

interface PartidaProps extends RemaAoTemaProps {
  onReiniciar: () => void;
}

const Partida: React.FC<PartidaProps> = ({ nivelId, proximoNivelId, onAbrirNivel, onReiniciar }) => {
  const infinito = nivelId === 'infinito';

  const [fase, setFase] = useState<Fase>(infinito ? 'inicio' : 'jogando');
  const [afirmacoes, setAfirmacoes] = useState<Afirmacao[]>(() =>
    infinito ? [proximaAfirmacaoInfinita(0, [])] : sortearNivel(Number(nivelId)),
  );
  const [indice, setIndice] = useState(0);
  const [escolha, setEscolha] = useState<Escolha | null>(null);
  const [pontos, setPontos] = useState(0);
  const [acertos, setAcertos] = useState(0);
  const [sequencia, setSequencia] = useState(0);
  const [melhorSequencia, setMelhorSequencia] = useState(0);
  const [energia, setEnergia] = useState(ENERGIA_INICIAL);
  const [erros, setErros] = useState(0);
  const [ultimaPenalidade, setUltimaPenalidade] = useState(0);
  const [tempo, setTempo] = useState(0);
  const [recorde, setRecorde] = useState(0);
  const [novoRecorde, setNovoRecorde] = useState(false);
  const [xpGanho, setXpGanho] = useState(0);
  const [salvamento, setSalvamento] = useState<Salvamento>('salvando');
  const { usuario } = useAuth();
  const { jogos } = useProgresso();
  const botaoContinuar = useRef<HTMLButtonElement>(null);

  const atual = afirmacoes[indice];
  const respondida = escolha !== null;
  const duracao = infinito ? duracaoInfinita(indice) : 0;
  const rodadasJogadas = infinito ? indice + 1 : afirmacoes.length;
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

  const responder = (resposta: Escolha) => {
    if (respondida || !atual) return;
    const acertou = resposta === atual.resposta;
    setEscolha(resposta);

    if (acertou) {
      const bonusTempo = infinito ? Math.round(tempo / 2) : 0;
      setPontos((p) => p + 10 + Math.min(sequencia, 5) * 2 + bonusTempo);
      setAcertos((a) => a + 1);
      setSequencia(sequencia + 1);
      setMelhorSequencia((m) => Math.max(m, sequencia + 1));
      setUltimaPenalidade(0);
      if (infinito) setEnergia((e) => Math.min(ENERGIA_INICIAL, e + ENERGIA_RECUPERADA));
    } else {
      setSequencia(0);
      if (infinito) {
        // Penalidade acumulativa: cada erro custa mais fôlego que o anterior.
        const penalidade = penalidadeDoErro(erros);
        setUltimaPenalidade(penalidade);
        setErros(erros + 1);
        setEnergia((e) => Math.max(0, e - penalidade));
      }
    }
  };

  const continuar = () => {
    if (infinito) {
      if (energia <= 0) {
        finalizar(pontos);
        return;
      }
      const usadas = afirmacoes.map((a) => a.id);
      setAfirmacoes((lista) => [...lista, proximaAfirmacaoInfinita(indice + 1, usadas)]);
    } else if (indice + 1 >= afirmacoes.length) {
      finalizar(pontos);
      return;
    }
    setIndice(indice + 1);
    setEscolha(null);
  };

  // Cronômetro do modo infinito: reinicia a cada afirmação e responde "tempo esgotado" ao zerar.
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
        responderRef.current('tempo');
      }
    }, 100);
    return () => clearInterval(intervalo);
  }, [infinito, fase, indice, escolha, duracao]);

  useEffect(() => {
    if (respondida) botaoContinuar.current?.focus();
  }, [respondida]);

  /* ───────────── Tela inicial do modo infinito ───────────── */
  if (fase === 'inicio') {
    return (
      <div style={estilos.painel}>
        <h2 style={estilos.tituloTela}>Modo Infinito</h2>
        <p style={estilos.textoTela}>
          Afirmações aleatórias sem parar. A correnteza fica mais forte: o tempo para responder diminui e cada erro custa
          mais fôlego que o anterior.
        </p>
        <ul style={estilos.regras}>
          <li>Você começa com {ENERGIA_INICIAL} de fôlego e recupera {ENERGIA_RECUPERADA} a cada acerto.</li>
          <li>O primeiro erro custa 10, o segundo 15, o terceiro 20, e assim por diante.</li>
          <li>Tempo esgotado conta como erro. O jogo termina quando o fôlego chega a zero.</li>
        </ul>
        {recordeSalvo > 0 && <p style={estilos.recordeTexto}>Seu recorde: {recordeSalvo} pontos</p>}
        <button style={estilos.botaoPrimario} onClick={() => setFase('jogando')}>
          Começar a remar
        </button>
      </div>
    );
  }

  /* ───────────── Tela de resultado ───────────── */
  if (fase === 'resultado') {
    return (
      <div style={estilos.painel}>
        <Trophy size={44} color="#6d28d9" />
        <h2 style={estilos.tituloTela}>
          {infinito ? 'A correnteza venceu!' : estrelas >= ESTRELAS_PARA_CONCLUIR ? 'Você remou até a margem!' : 'Quase lá!'}
        </h2>

        {!infinito && (
          <div style={estilos.estrelas} aria-label={`${estrelas} de 3 estrelas`}>
            {[1, 2, 3].map((n) => (
              <Star key={n} size={34} color="#f59e0b" fill={n <= estrelas ? '#f59e0b' : 'none'} />
            ))}
          </div>
        )}

        <div style={estilos.resumo}>
          <div style={estilos.resumoItem}>
            <strong style={estilos.resumoValor}>{infinito ? `${acertos}/${indice + 1}` : `${acertos}/${afirmacoes.length}`}</strong>
            <span>acertos</span>
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
          <p style={estilos.textoTela}>Acerte pelo menos 70% das afirmações para concluir este nível.</p>
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

  /* ───────────── Afirmação ───────────── */
  if (!atual) return null;
  const acertou = respondida && escolha === atual.resposta;
  const tempoEsgotado = escolha === 'tempo';
  const ultima = !infinito && indice + 1 >= afirmacoes.length;
  const fimPorEnergia = infinito && energia <= 0;
  const progressoBarco = infinito ? 0 : acertos / AFIRMACOES_POR_NIVEL;

  let titulo = 'Correto!';
  if (!acertou) {
    if (tempoEsgotado) titulo = 'Tempo esgotado!';
    else titulo = infinito ? 'Não foi dessa vez.' : 'A correnteza segurou o barco.';
    if (infinito && ultimaPenalidade > 0) titulo += ` (-${ultimaPenalidade} de fôlego)`;
  }

  return (
    <div style={estilos.jogo}>
      <div style={estilos.hud}>
        <span style={estilos.hudItem}>
          {infinito ? `Afirmação ${indice + 1} · Nível ${nivelInfinito(indice)}` : `Afirmação ${indice + 1}/${afirmacoes.length}`}
        </span>
        <div style={estilos.hudDireita}>
          {infinito && (
            <span style={estilos.hudItem} aria-label={`Fôlego ${energia}`}>
              Fôlego
              <span style={estilos.folegoFundo}>
                <span
                  style={{
                    ...estilos.folegoPreenchido,
                    width: `${energia}%`,
                    backgroundColor: energia <= 30 ? '#dc2626' : '#16a34a',
                  }}
                />
              </span>
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

      {infinito ? (
        <>
          <div
            style={estilos.barraFundo}
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(respondida ? 0 : (tempo / duracao) * 100)}
            aria-label="Tempo restante"
          >
            <div
              style={{
                ...estilos.barraPreenchida,
                width: `${respondida ? 0 : (tempo / duracao) * 100}%`,
                backgroundColor: tempo / duracao < 0.3 ? '#dc2626' : '#7c3aed',
                transition: 'none',
              }}
            />
          </div>
          <span style={estilos.tempoTexto}>
            <Timer size={14} /> {respondida ? '—' : `${tempo.toFixed(1)}s`}
          </span>
        </>
      ) : (
        <Rio progresso={progressoBarco} />
      )}

      <div style={estilos.cartaAfirmacao}>
        <span style={estilos.cartaRotulo}>Afirmação</span>
        <p style={estilos.cartaTexto}>{atual.texto}</p>
      </div>

      <div style={estilos.opcoes}>
        {opcoesDe(atual).map((opcao) => {
          const eCorreta = opcao === atual.resposta;
          const eEscolhida = escolha === opcao;
          let estilo = estilos.opcao;
          if (respondida) {
            if (eCorreta) estilo = { ...estilo, ...estilos.opcaoCorreta };
            else if (eEscolhida) estilo = { ...estilo, ...estilos.opcaoErrada };
            else estilo = { ...estilo, ...estilos.opcaoApagada };
          }
          return (
            <button
              key={opcao}
              disabled={respondida}
              onClick={() => responder(opcao)}
              style={{ ...estilo, ...estilos.opcaoGrande }}
            >
              <span style={estilos.opcaoRotulo}>
                {opcao === 'verdade' && <Check size={20} />}
                {opcao === 'mito' && <X size={20} />}
                {opcao === 'depende' && <Scale size={20} />}
                {ROTULOS[opcao]}
              </span>
            </button>
          );
        })}
      </div>

      {respondida && (
        <div
          role="status"
          aria-live="polite"
          style={{ ...estilos.feedback, ...(acertou ? estilos.feedbackCerto : estilos.feedbackErrado) }}
        >
          <strong>{titulo}</strong>
          <p style={estilos.feedbackTexto}>
            <strong>Resposta: {ROTULOS[atual.resposta]}.</strong> {atual.explicacao}
          </p>
          <button ref={botaoContinuar} style={estilos.botaoPrimario} onClick={continuar}>
            {fimPorEnergia || ultima ? 'Ver resultado' : 'Continuar'} <ArrowRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
};

const estilos: { [key: string]: React.CSSProperties } = {
  ...estilosJogo,
  rio: { position: 'relative', width: '100%', height: '64px', borderRadius: '14px', overflow: 'hidden', background: 'linear-gradient(#dbeafe, #93c5fd)', boxShadow: 'inset 0 -6px 0 rgba(59, 130, 246, 0.35)' },
  barco: { position: 'absolute', bottom: '8px', transition: 'left 0.7s ease-in-out' },
  barcoBalanco: { animation: 'remaBalanco 2.4s ease-in-out infinite' },
  bandeira: { position: 'absolute', right: '16px', top: '12px' },
  cartaAfirmacao: { backgroundColor: '#ffffff', borderRadius: '16px', padding: '20px 22px', borderLeft: '6px solid #7c3aed', display: 'flex', flexDirection: 'column', gap: '8px' },
  cartaRotulo: { color: '#6d28d9', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px' },
  cartaTexto: { color: '#2e1065', fontSize: '1.2rem', fontWeight: 700, lineHeight: 1.45 },
  opcaoGrande: { justifyContent: 'center', padding: '16px', fontSize: '1.05rem' },
  opcaoRotulo: { display: 'inline-flex', alignItems: 'center', gap: '8px' },
  folegoFundo: { display: 'inline-block', width: '90px', height: '10px', backgroundColor: '#ffffff', borderRadius: '10px', overflow: 'hidden' },
  folegoPreenchido: { display: 'block', height: '100%', borderRadius: '10px', transition: 'width 0.3s' },
};
