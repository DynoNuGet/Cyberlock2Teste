import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Check, Lock, Star, NotebookText } from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { NaoEncontrado } from '../components/NaoEncontrado';
import { CarrosselLicoes } from '../components/CarrosselLicoes';
import { CarrosselJogos } from '../components/CarrosselJogos';
import { obterJogo } from '../dados/jogos';
import { useProgresso } from '../contexts/ProgressoContext';
import { chaveDia, META_XP_DIARIA } from '../services/progresso';
import '../main.css';

// Os cadeados refletem o progresso real (Firestore). Com false, fases bloqueadas ainda podem ser abertas
// (útil no desenvolvimento). Troque para true para impedir o acesso a fases ainda não liberadas.
const BLOQUEAR_NIVEIS_FUTUROS = false;

const TAMANHO_TRILHA = 340;
const RAIO_TRILHA = 132;
const TAMANHO_NO = 56;

type AbaTrilha = 'inicio' | 'pratica' | 'placar';

const NOMES_DIAS = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];

export const JogoDetalhe: React.FC = () => {
  const { jogoId } = useParams();
  const navigate = useNavigate();
  const [aba, setAba] = useState<AbaTrilha>('inicio');
  const jogo = obterJogo(jogoId);
  const { jogos, xpPorDia } = useProgresso();

  if (!jogo) {
    return <NaoEncontrado mensagem="Jogo não encontrado." voltarPara="/jogos" textoBotao="Ver todos os jogos" />;
  }

  // Estado de cada fase a partir do progresso salvo: concluída, atual (próxima a jogar) ou bloqueada.
  const progressoJogo = jogos[jogo.id] ?? {};
  const primeiroPendente = jogo.niveis
    .filter((n) => n.id !== 'infinito')
    .findIndex((n) => !progressoJogo[n.id]?.concluido);
  const todosConcluidos = primeiroPendente === -1;

  const abrirNivel = (nivelId: string, bloqueado: boolean) => {
    if (BLOQUEAR_NIVEIS_FUTUROS && bloqueado) return;
    navigate(`/jogos/${jogo.id}/nivel/${nivelId}`);
  };

  // XP da semana atual (segunda a domingo), vindo do Firestore
  const hoje = new Date();
  const segunda = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate() - ((hoje.getDay() + 6) % 7));
  const xpSemana = NOMES_DIAS.map((dia, i) => ({
    dia,
    xp: xpPorDia[chaveDia(new Date(segunda.getFullYear(), segunda.getMonth(), segunda.getDate() + i))] ?? 0,
  }));
  const xpHoje = xpPorDia[chaveDia(hoje)] ?? 0;

  // Gráfico de XP semanal (a escala cresce em múltiplos de 20 conforme o XP)
  const escalaMax = Math.max(20, Math.ceil(Math.max(...xpSemana.map((d) => d.xp)) / 20) * 20);
  const larguraGrafico = 260;
  const alturaGrafico = 110;
  const pontos = xpSemana.map((item, i) => {
    const x = 20 + (i * (larguraGrafico - 30)) / (xpSemana.length - 1);
    const y = alturaGrafico - (item.xp / escalaMax) * alturaGrafico;
    return { x, y, ...item };
  });

  return (
    <div style={{ backgroundColor: 'var(--primary-bg)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />

      {/* Lições */}
      <section style={styles.secaoLicoes}>
        <div style={styles.conteudo}>
          <div style={styles.linhaTitulo}>
            <h1 style={styles.tituloLicoes}>Bem vindo de volta, pronto para a sua próxima lição?</h1>
            <button style={styles.linkTexto}>Ver histórico</button>
          </div>
          <CarrosselLicoes licoes={jogo.licoes} />
        </div>
      </section>

      {/* Trilha */}
      <section style={styles.secaoTrilha}>
        <div style={styles.conteudo}>
          <h2 style={styles.tituloSecao}>Trilha de aprendizado</h2>

          <div style={styles.gradeTrilha}>
            <nav style={styles.menuLateral}>
              {([
                ['inicio', 'INÍCIO'],
                ['pratica', 'PRÁTICA'],
                ['placar', 'PLACAR'],
              ] as [AbaTrilha, string][]).map(([chave, rotulo]) => (
                <button
                  key={chave}
                  onClick={() => setAba(chave)}
                  style={{ ...styles.itemMenu, ...(aba === chave ? styles.itemMenuAtivo : {}) }}
                >
                  {rotulo}
                </button>
              ))}
            </nav>

            <div style={styles.colunaCentral}>
              <div style={styles.cartaoJogo}>
                <div>
                  <h3 style={styles.cartaoJogoTitulo}>{jogo.title}</h3>
                  <p style={styles.cartaoJogoSub}>{jogo.subtitle}</p>
                </div>
                <button style={styles.botaoGuia}>
                  <NotebookText size={16} /> GUIA
                </button>
              </div>

              <div style={{ ...styles.trilha, width: TAMANHO_TRILHA, height: TAMANHO_TRILHA }}>
                <div
                  style={{
                    ...styles.anel,
                    width: RAIO_TRILHA * 2,
                    height: RAIO_TRILHA * 2,
                    left: TAMANHO_TRILHA / 2 - RAIO_TRILHA,
                    top: TAMANHO_TRILHA / 2 - RAIO_TRILHA,
                  }}
                />
                {jogo.niveis.map((nivel, i) => {
                  const angulo = -Math.PI / 2 + (i * 2 * Math.PI) / jogo.niveis.length;
                  const x = TAMANHO_TRILHA / 2 + RAIO_TRILHA * Math.cos(angulo) - TAMANHO_NO / 2;
                  const y = TAMANHO_TRILHA / 2 + RAIO_TRILHA * Math.sin(angulo) - TAMANHO_NO / 2;
                  const concluido = !!progressoJogo[nivel.id]?.concluido;
                  const atual = !concluido && (nivel.id === 'infinito' ? todosConcluidos : i === primeiroPendente);
                  const bloqueado = !concluido && !atual;

                  return (
                    <button
                      key={nivel.id}
                      onClick={() => abrirNivel(nivel.id, bloqueado)}
                      title={`Nível ${nivel.id}: ${nivel.titulo}`}
                      aria-label={`Nível ${nivel.id}: ${nivel.titulo}`}
                      style={{
                        ...styles.noTrilha,
                        left: x,
                        top: y,
                        width: TAMANHO_NO,
                        height: TAMANHO_NO,
                        ...(concluido ? styles.noConcluido : atual ? styles.noAtual : styles.noBloqueado),
                      }}
                    >
                      {concluido && <Check size={28} color="#ffffff" strokeWidth={3} />}
                      {atual && <Star size={26} color="#ffffff" fill="#ffffff" />}
                      {bloqueado && <Lock size={20} color="#9ca3af" />}
                    </button>
                  );
                })}
              </div>
            </div>

            <aside style={styles.colunaDireita}>
              <div style={styles.cartaoLateral}>
                <h3 style={styles.lateralTitulo}>Teste o plano pro</h3>
                <p style={styles.lateralTexto}>Sem anúncios, modo infinito e muito mais!</p>
                <button style={styles.botaoPro} onClick={() => navigate('/planos')}>
                  TESTE POR 2 SEMANAS
                </button>
              </div>

              <div style={styles.cartaoLateral}>
                <h3 style={styles.lateralTitulo}>Desbloqueie a competição!</h3>
                <div style={styles.linhaCompeticao}>
                  <Lock size={28} color="#e9d5ff" />
                  <p style={styles.lateralTextoClaro}>Complete 2 atividades ou mais para desbloquear</p>
                </div>
              </div>

              <div style={styles.cartaoLateral}>
                <div style={styles.linhaXp}>
                  <h3 style={styles.lateralTitulo}>Progresso de XP</h3>
                  <button style={styles.editarMeta}>EDITE A META</button>
                </div>
                <div style={styles.metaDiaria}>
                  <span style={styles.lateralTexto}>Meta diária</span>
                  <div style={styles.barraMetaFundo}>
                    <div style={{ ...styles.barraMetaPreenchida, width: `${Math.min(100, (xpHoje / META_XP_DIARIA) * 100)}%` }} />
                  </div>
                  <span style={styles.metaValor}>{xpHoje}/{META_XP_DIARIA} XP</span>
                </div>

                <svg viewBox={`0 0 ${larguraGrafico} ${alturaGrafico + 28}`} style={{ width: '100%' }} role="img" aria-label="XP ganho na semana">
                  {[0, 0.25, 0.5, 0.75, 1].map((fracao) => {
                    const marca = Math.round(fracao * escalaMax);
                    const y = alturaGrafico - fracao * alturaGrafico;
                    return (
                      <g key={marca}>
                        <line x1="20" x2={larguraGrafico} y1={y} y2={y} stroke="rgba(255,255,255,0.35)" strokeWidth="1" />
                        <text x="0" y={y + 4} fontSize="9" fill="#e9d5ff">{marca}</text>
                      </g>
                    );
                  })}
                  <polyline
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth="1.5"
                    points={pontos.map((p) => `${p.x},${p.y}`).join(' ')}
                  />
                  {pontos.map((p) => (
                    <g key={p.dia}>
                      <circle cx={p.x} cy={p.y} r="3" fill="#a78bfa" stroke="#ffffff" strokeWidth="1" />
                      <text x={p.x} y={alturaGrafico + 20} fontSize="9" fill="#ffffff" textAnchor="middle">{p.dia}</text>
                    </g>
                  ))}
                </svg>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Mais jogos */}
      <section style={styles.secaoJogos}>
        <div style={styles.conteudo}>
          <div style={styles.linhaTitulo}>
            <h2 style={styles.tituloSecao}>Mais jogos disponíveis</h2>
            <button style={styles.linkTexto} onClick={() => navigate('/jogos')}>Ver todos</button>
          </div>
          <CarrosselJogos excluirId={jogo.id} />
        </div>
      </section>

      <Footer />
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  conteudo: { maxWidth: '1200px', width: '100%', margin: '0 auto', padding: '0 24px', display: 'flex', flexDirection: 'column', gap: '28px' },
  linhaTitulo: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' },
  linkTexto: { background: 'none', border: 'none', color: '#e9d5ff', fontWeight: 'bold', fontSize: '0.9rem', cursor: 'pointer' },

  secaoLicoes: { backgroundColor: '#5330b8', padding: '50px 0 40px' },
  tituloLicoes: { color: '#c4a1ff', fontSize: '1.7rem', fontWeight: 600 },

  secaoTrilha: { backgroundColor: '#1d0f2e', padding: '60px 0' },
  tituloSecao: { color: '#b98cff', fontSize: '1.7rem', fontWeight: 600 },
  gradeTrilha: { display: 'flex', flexWrap: 'wrap', gap: '28px', alignItems: 'flex-start', justifyContent: 'center' },

  menuLateral: { width: '180px', backgroundColor: '#d4b8ff', borderRadius: '12px', overflow: 'hidden', display: 'flex', flexDirection: 'column' },
  itemMenu: { background: 'none', border: '2px solid transparent', padding: '14px 16px', fontSize: '0.8rem', fontWeight: 'bold', color: '#5b3a8c', cursor: 'pointer', textAlign: 'center' },
  itemMenuAtivo: { backgroundColor: '#e6d5ff', border: '2px solid #38bdf8', color: '#0ea5e9', borderRadius: '8px' },

  colunaCentral: { flex: '1 1 400px', maxWidth: '520px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '28px' },
  cartaoJogo: { width: '100%', backgroundColor: '#8b2ff5', borderRadius: '24px', padding: '22px 26px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px', color: '#ffffff' },
  cartaoJogoTitulo: { fontSize: '1.2rem', fontWeight: 'bold' },
  cartaoJogoSub: { fontSize: '0.85rem', marginTop: '4px', opacity: 0.9 },
  botaoGuia: { display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(255,255,255,0.2)', color: '#ffffff', border: 'none', padding: '10px 18px', borderRadius: '16px', fontWeight: 'bold', fontSize: '0.75rem', cursor: 'pointer' },

  trilha: { position: 'relative', maxWidth: '100%' },
  anel: { position: 'absolute', borderRadius: '50%', border: '18px solid #c4b5fd', boxSizing: 'border-box' },
  noTrilha: { position: 'absolute', borderRadius: '50%', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'transform 0.15s' },
  noAtual: { backgroundColor: '#3b82f6', boxShadow: '0 0 0 6px #7c3aed, 0 6px 0 rgba(0,0,0,0.25)' },
  noConcluido: { backgroundColor: '#16a34a', boxShadow: '0 6px 0 #166534' },
  noBloqueado: { backgroundColor: '#e5e7eb', boxShadow: '0 6px 0 #bdbdbd' },

  colunaDireita: { width: '320px', maxWidth: '100%', display: 'flex', flexDirection: 'column', gap: '18px' },
  cartaoLateral: { backgroundColor: '#b57bff', borderRadius: '20px', padding: '22px', display: 'flex', flexDirection: 'column', gap: '12px', color: '#ffffff' },
  lateralTitulo: { fontSize: '1.1rem', fontWeight: 'bold' },
  lateralTexto: { fontSize: '0.8rem', lineHeight: 1.4 },
  lateralTextoClaro: { fontSize: '0.8rem', color: '#ede0ff', lineHeight: 1.4 },
  botaoPro: { backgroundColor: '#3b5bff', color: '#ffffff', border: 'none', borderBottom: '4px solid #2a3fb8', padding: '12px', borderRadius: '14px', fontWeight: 'bold', fontSize: '0.75rem', cursor: 'pointer' },
  linhaCompeticao: { display: 'flex', alignItems: 'center', gap: '14px' },
  linhaXp: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px' },
  editarMeta: { background: 'none', border: 'none', color: '#4c1d95', fontSize: '0.65rem', fontWeight: 'bold', cursor: 'pointer', textAlign: 'right' },
  metaDiaria: { display: 'flex', alignItems: 'center', gap: '10px' },
  barraMetaFundo: { flex: 1, height: '10px', backgroundColor: '#ffffff', borderRadius: '10px', overflow: 'hidden' },
  barraMetaPreenchida: { height: '100%', backgroundColor: '#38bdf8' },
  metaValor: { fontSize: '0.75rem', fontWeight: 'bold', whiteSpace: 'nowrap' },

  secaoJogos: { backgroundColor: '#4400a3', padding: '60px 0 20px' },
};
