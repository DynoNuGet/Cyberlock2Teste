import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  Flame,
  Globe,
  Mail,
  MessageCircle,
  MessageSquare,
  Phone,
  RotateCcw,
  Search,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Smartphone,
  Star,
  Timer,
  Trophy,
  Users,
} from 'lucide-react';
import {
  CENARIOS_POR_NIVEL,
  CUSTO_BLOQUEOU_LEGITIMO,
  CUSTO_CAIU_NO_GOLPE,
  CUSTO_TEMPO_ESGOTADO,
  ESCUDOS_INFINITO,
  ROTULOS_CANAL,
  duracaoInfinita,
  nivelInfinito,
  proximoCenarioInfinito,
  sortearNivel,
} from '../dados/golpes';
import type { Canal, Cenario } from '../dados/golpes';
import { useAuth } from '../contexts/AuthContext';
import { useProgresso } from '../contexts/ProgressoContext';
import { registrarPartida } from '../services/progresso';
import { estilosJogo } from './estilos';

const JOGO_ID = '2'; // "Golpe ou Não" em dados/jogos.ts
const ESTRELAS_PARA_CONCLUIR = 2; // 2 estrelas = pelo menos 70% de acertos

interface GolpeOuNaoProps {
  nivelId: string; // "1" a "6" ou "infinito"
  proximoNivelId?: string;
  onAbrirNivel: (nivelId: string) => void;
}

type Fase = 'inicio' | 'jogando' | 'resultado';
type Salvamento = 'salvando' | 'ok' | 'erro';
type Escolha = 'golpe' | 'legitimo' | 'tempo';

const chaveRecorde = (nivelId: string) => `cyberlock:golpe:recorde:${nivelId}`;

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

const ICONES_CANAL: Record<Canal, React.ElementType> = {
  sms: MessageSquare,
  whatsapp: MessageCircle,
  email: Mail,
  site: Globe,
  rede: Users,
  ligacao: Phone,
  app: Smartphone,
};

/* ───────────── Cartão da mensagem ───────────── */

interface CartaoProps {
  cenario: Cenario;
  reveladas: number[];
  respondida: boolean;
  onInspecionar: (indice: number) => void;
}

const Cartao: React.FC<CartaoProps> = ({ cenario, reveladas, respondida, onInspecionar }) => {
  const Icone = ICONES_CANAL[cenario.canal];
  return (
    <div style={estilos.cartao}>
      <div style={estilos.cartaoTopo}>
        <Icone size={18} />
        <span>{ROTULOS_CANAL[cenario.canal]}</span>
      </div>
      {cenario.campos.map((campo, i) => {
        const mostrar = respondida || reveladas.includes(i);
        return (
          <div key={i} style={estilos.campo}>
            <span style={estilos.campoRotulo}>{campo.rotulo}</span>
            <span style={{ ...estilos.campoValor, ...(campo.mono ? estilos.mono : {}) }}>{campo.valor}</span>
            {campo.revela && !respondida && (
              <button style={estilos.botaoInspecionar} onClick={() => onInspecionar(i)} aria-expanded={mostrar}>
                <Search size={13} /> {mostrar ? 'Ocultar' : 'Inspecionar'}
              </button>
            )}
            {campo.revela && mostrar && <div style={estilos.revelacao}>{campo.revela}</div>}
          </div>
        );
      })}
    </div>
  );
};

/* ───────────── Partida ───────────── */

export const GolpeOuNao: React.FC<GolpeOuNaoProps> = (props) => {
  const [tentativa, setTentativa] = useState(0);
  return <Partida key={`${props.nivelId}-${tentativa}`} {...props} onReiniciar={() => setTentativa((t) => t + 1)} />;
};

interface PartidaProps extends GolpeOuNaoProps {
  onReiniciar: () => void;
}

const Partida: React.FC<PartidaProps> = ({ nivelId, proximoNivelId, onAbrirNivel, onReiniciar }) => {
  const infinito = nivelId === 'infinito';

  const [fase, setFase] = useState<Fase>(infinito ? 'inicio' : 'jogando');
  const [cenarios, setCenarios] = useState<Cenario[]>(() =>
    infinito ? [proximoCenarioInfinito(0, [])] : sortearNivel(Number(nivelId)),
  );
  const [indice, setIndice] = useState(0);
  const [escolha, setEscolha] = useState<Escolha | null>(null);
  const [reveladas, setReveladas] = useState<number[]>([]);
  const [pontos, setPontos] = useState(0);
  const [acertos, setAcertos] = useState(0);
  const [sequencia, setSequencia] = useState(0);
  const [melhorSequencia, setMelhorSequencia] = useState(0);
  const [escudos, setEscudos] = useState(ESCUDOS_INFINITO);
  const [ultimoCusto, setUltimoCusto] = useState(0);
  const [tempo, setTempo] = useState(0);
  const [recorde, setRecorde] = useState(0);
  const [novoRecorde, setNovoRecorde] = useState(false);
  const [xpGanho, setXpGanho] = useState(0);
  const [salvamento, setSalvamento] = useState<Salvamento>('salvando');
  const { usuario } = useAuth();
  const { jogos } = useProgresso();
  const botaoContinuar = useRef<HTMLButtonElement>(null);

  const atual = cenarios[indice];
  const respondida = escolha !== null;
  const duracao = infinito ? duracaoInfinita(indice) : 0;
  const rodadasJogadas = infinito ? indice + 1 : cenarios.length;
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
    const acertou = resposta !== 'tempo' && (resposta === 'golpe') === atual.golpe;
    setEscolha(resposta);

    if (acertou) {
      const bonusTempo = infinito ? Math.round(tempo / 3) : 0;
      setPontos((p) => p + 10 + Math.min(sequencia, 5) * 2 + bonusTempo);
      setAcertos((a) => a + 1);
      setSequencia(sequencia + 1);
      setMelhorSequencia((m) => Math.max(m, sequencia + 1));
      setUltimoCusto(0);
    } else {
      setSequencia(0);
      if (infinito) {
        // Cair em um golpe custa mais escudos do que desconfiar de algo legítimo.
        const custo =
          resposta === 'tempo' ? CUSTO_TEMPO_ESGOTADO : atual.golpe ? CUSTO_CAIU_NO_GOLPE : CUSTO_BLOQUEOU_LEGITIMO;
        setUltimoCusto(custo);
        setEscudos((e) => Math.max(0, e - custo));
      }
    }
  };

  const continuar = () => {
    if (infinito) {
      if (escudos <= 0) {
        finalizar(pontos);
        return;
      }
      const usados = cenarios.map((x) => x.id);
      setCenarios((lista) => [...lista, proximoCenarioInfinito(indice + 1, usados)]);
    } else if (indice + 1 >= cenarios.length) {
      finalizar(pontos);
      return;
    }
    setIndice(indice + 1);
    setEscolha(null);
    setReveladas([]);
  };

  const alternarInspecao = (i: number) =>
    setReveladas((lista) => (lista.includes(i) ? lista.filter((x) => x !== i) : [...lista, i]));

  // Cronômetro do modo infinito: reinicia a cada cenário e responde "tempo esgotado" ao zerar.
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
          Cenários aleatórios, entre golpes e situações legítimas, com dificuldade crescente e tempo limitado.
        </p>
        <ul style={estilos.regras}>
          <li>Você começa com {ESCUDOS_INFINITO} escudos.</li>
          <li>Cair em um golpe custa {CUSTO_CAIU_NO_GOLPE} escudos. Desconfiar de algo legítimo custa {CUSTO_BLOQUEOU_LEGITIMO}.</li>
          <li>Tempo esgotado custa {CUSTO_TEMPO_ESGOTADO} escudo. O jogo termina quando os escudos acabam.</li>
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
        <h2 style={estilos.tituloTela}>
          {infinito ? 'Fim de jogo!' : estrelas >= ESTRELAS_PARA_CONCLUIR ? 'Nível concluído!' : 'Quase lá!'}
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
            <strong style={estilos.resumoValor}>{`${acertos}/${rodadasJogadas}`}</strong>
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
          <p style={estilos.textoTela}>Acerte pelo menos 70% dos cenários para concluir este nível.</p>
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

  /* ───────────── Cenário ───────────── */
  if (!atual) return null;
  const acertou = respondida && escolha !== 'tempo' && (escolha === 'golpe') === atual.golpe;
  const ultima = !infinito && indice + 1 >= cenarios.length;
  const fimPorEscudos = infinito && escudos <= 0;
  const progresso = infinito ? 100 : ((indice + (respondida ? 1 : 0)) / CENARIOS_POR_NIVEL) * 100;

  let titulo = 'Correto!';
  if (!acertou) {
    if (escolha === 'tempo') titulo = 'Tempo esgotado!';
    else titulo = atual.golpe ? 'Era um golpe!' : 'Essa mensagem era legítima.';
    if (infinito && ultimoCusto > 0) titulo += ` (-${ultimoCusto} ${ultimoCusto > 1 ? 'escudos' : 'escudo'})`;
  } else {
    titulo = atual.golpe ? 'Correto! Era um golpe.' : 'Correto! Era legítimo.';
  }

  const opcoes: { valor: 'golpe' | 'legitimo'; rotulo: string; Icone: React.ElementType }[] = [
    { valor: 'golpe', rotulo: 'Golpe', Icone: ShieldAlert },
    { valor: 'legitimo', rotulo: 'Legítimo', Icone: ShieldCheck },
  ];

  return (
    <div style={estilos.jogo}>
      <div style={estilos.hud}>
        <span style={estilos.hudItem}>
          {infinito ? `Cenário ${indice + 1} · Nível ${nivelInfinito(indice)}` : `Cenário ${indice + 1}/${cenarios.length}`}
        </span>
        <div style={estilos.hudDireita}>
          {infinito && (
            <span style={estilos.hudItem} aria-label={`${escudos} escudos`}>
              {Array.from({ length: ESCUDOS_INFINITO }, (_, i) => (
                <Shield key={i} size={18} color="#3b00a5" fill={i < escudos ? '#7c3aed' : 'none'} />
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

      {atual.contexto && <p style={estilos.contexto}>{atual.contexto}</p>}
      <Cartao cenario={atual} reveladas={reveladas} respondida={respondida} onInspecionar={alternarInspecao} />

      <h3 style={estilos.pergunta}>É golpe ou é legítimo?</h3>

      <div style={estilos.opcoes}>
        {opcoes.map(({ valor, rotulo, Icone }) => {
          const eCorreta = (valor === 'golpe') === atual.golpe;
          const eEscolhida = escolha === valor;
          let estilo = estilos.opcao;
          if (respondida) {
            if (eCorreta) estilo = { ...estilo, ...estilos.opcaoCorreta };
            else if (eEscolhida) estilo = { ...estilo, ...estilos.opcaoErrada };
            else estilo = { ...estilo, ...estilos.opcaoApagada };
          }
          return (
            <button
              key={valor}
              disabled={respondida}
              onClick={() => responder(valor)}
              style={{ ...estilo, justifyContent: 'center', padding: '16px', fontSize: '1.05rem' }}
            >
              <span style={estilos.opcaoRotulo}>
                <Icone size={20} />
                {rotulo}
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
            <strong>{atual.golpe ? 'Sinais de golpe:' : 'Por que é legítimo:'}</strong>
          </p>
          <ul style={estilos.listaSinais}>
            {atual.sinais.map((sinal) => (
              <li key={sinal}>{sinal}</li>
            ))}
          </ul>
          <button ref={botaoContinuar} style={estilos.botaoPrimario} onClick={continuar}>
            {fimPorEscudos || ultima ? 'Ver resultado' : 'Continuar'} <ArrowRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
};

const estilos: { [key: string]: React.CSSProperties } = {
  ...estilosJogo,
  cartao: { backgroundColor: '#ffffff', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 0 rgba(59, 0, 165, 0.15)' },
  cartaoTopo: { display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: '#3b00a5', color: '#ffffff', padding: '10px 16px', fontWeight: 700, fontSize: '0.9rem' },
  campo: { display: 'flex', alignItems: 'baseline', flexWrap: 'wrap', gap: '4px 12px', padding: '10px 16px', borderBottom: '1px solid #ede9fe' },
  campoRotulo: { width: '110px', flexShrink: 0, color: '#6d28d9', fontWeight: 800, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.5px' },
  campoValor: { flex: 1, minWidth: '180px', color: '#2e1065', fontSize: '0.98rem', lineHeight: 1.45, overflowWrap: 'anywhere' },
  mono: { fontFamily: 'monospace' },
  botaoInspecionar: { display: 'inline-flex', alignItems: 'center', gap: '4px', backgroundColor: '#ede9fe', color: '#3b00a5', border: '1px solid #7c3aed', borderRadius: '12px', padding: '3px 10px', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer' },
  revelacao: { flexBasis: '100%', backgroundColor: '#fef3c7', color: '#78350f', borderRadius: '8px', padding: '8px 12px', fontSize: '0.88rem', lineHeight: 1.45, overflowWrap: 'anywhere' },
  opcaoRotulo: { display: 'inline-flex', alignItems: 'center', gap: '8px' },
  listaSinais: { paddingLeft: '20px', fontSize: '0.92rem', lineHeight: 1.55 },
};
