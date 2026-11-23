import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { NaoEncontrado } from '../components/NaoEncontrado';
import { CarrosselJogos } from '../components/CarrosselJogos';
import { obterJogo } from '../dados/jogos';
import { AnalisarSenhas } from '../games/AnalisarSenhas';
import { RemaAoTema } from '../games/RemaAoTema';
import { GolpeOuNao } from '../games/GolpeOuNao';
import '../main.css';

export const JogoNivel: React.FC = () => {
  const { jogoId, nivelId } = useParams();
  const navigate = useNavigate();
  const jogo = obterJogo(jogoId);
  const nivel = jogo?.niveis.find((n) => n.id === nivelId);

  if (!jogo || !nivel) {
    return (
      <NaoEncontrado
        mensagem="Fase não encontrada."
        voltarPara={jogo ? `/jogos/${jogo.id}` : '/jogos'}
        textoBotao={jogo ? 'Voltar ao jogo' : 'Ver todos os jogos'}
      />
    );
  }

  const indiceNivel = jogo.niveis.findIndex((n) => n.id === nivel.id);
  const proximoNivel = jogo.niveis[indiceNivel + 1];
  const infinito = nivel.id === 'infinito';
  const totalNumerados = jogo.niveis.filter((n) => n.id !== 'infinito').length;

  return (
    <div style={styles.pagina}>
      <Header />

      <main style={styles.principal}>
        <section style={styles.cabecalho}>
          <h1 style={styles.titulo}>
            {infinito ? `${jogo.title} - Modo Infinito` : `${jogo.title} - Nível ${nivel.id}/${totalNumerados}`}
          </h1>
          <p style={styles.instrucao}>{nivel.instrucao}</p>
        </section>

        {/* Área reservada para a implementação do jogo */}
        <section
          id="area-do-jogo"
          data-jogo={jogo.id}
          data-nivel={nivel.id}
          style={styles.areaJogo}
          aria-label="Área do jogo"
        >
          {(() => {
            const propsDoJogo = {
              nivelId: nivel.id,
              proximoNivelId: proximoNivel?.id,
              onAbrirNivel: (id: string) => {
                navigate(`/jogos/${jogo.id}/nivel/${id}`);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              },
            };
            if (jogo.id === '1') return <AnalisarSenhas {...propsDoJogo} />;
            if (jogo.id === '2') return <GolpeOuNao {...propsDoJogo} />;
            if (jogo.id === '4') return <RemaAoTema {...propsDoJogo} />;
            return <p style={styles.emBreve}>Este jogo estará disponível em breve.</p>;
          })()}
        </section>

        <section style={styles.secao}>
          <h2 style={styles.tituloSecao}>Níveis do jogo</h2>
          <p style={styles.subtituloSecao}>Explore cada etapa do desafio e avance conforme você domina {jogo.title.toLowerCase()}.</p>

          <div style={styles.gradeNiveis}>
            {jogo.niveis.map((item) => {
              const atual = item.id === nivel.id;
              return (
                <div
                  key={item.id}
                  role="button"
                  tabIndex={0}
                  onClick={() => navigate(`/jogos/${jogo.id}/nivel/${item.id}`)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      navigate(`/jogos/${jogo.id}/nivel/${item.id}`);
                    }
                  }}
                  style={{ ...styles.cartaoNivel, ...(atual ? styles.cartaoNivelAtual : styles.cartaoNivelOutro) }}
                >
                  <div style={styles.cartaoNivelTopo}>
                    <span style={{ ...styles.selo, ...(atual ? styles.seloClaro : styles.seloEscuro) }}>Nível {item.id}</span>
                    <span style={{ ...styles.selo, ...(atual ? styles.seloAtual : styles.seloExplorar) }}>{atual ? 'Atual' : 'Explorar'}</span>
                  </div>
                  <h3 style={{ ...styles.cartaoNivelTitulo, color: atual ? '#3b00a5' : '#ffffff' }}>{item.titulo}</h3>
                  <p style={{ ...styles.cartaoNivelTexto, color: atual ? '#4c1d95' : 'rgba(255,255,255,0.85)' }}>{item.descricao}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section style={styles.secao}>
          <h2 style={styles.tituloSecao}>Outros jogos</h2>
          <p style={styles.subtituloSecao}>Explore mais desafios para reforçar sua segurança digital.</p>
          <CarrosselJogos excluirId={jogo.id} variante="compacto" />
        </section>
      </main>

      <Footer />
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  pagina: { background: 'linear-gradient(180deg, #4400a3 0%, #7c2ff0 100%)', minHeight: '100vh', display: 'flex', flexDirection: 'column' },
  principal: { maxWidth: '1100px', width: '100%', margin: '0 auto', padding: '50px 24px 20px', display: 'flex', flexDirection: 'column', gap: '40px', flex: 1 },
  cabecalho: { display: 'flex', flexDirection: 'column', gap: '12px' },
  titulo: { color: '#d8c4ff', fontSize: '2rem', fontWeight: 700 },
  instrucao: { color: '#ffffff', fontSize: '1.6rem', fontWeight: 500, lineHeight: 1.4 },
  areaJogo: { width: '100%', minHeight: '480px', backgroundColor: '#d9d9d9', borderRadius: '24px', padding: '28px 24px', display: 'flex', flexDirection: 'column', justifyContent: 'center' },
  emBreve: { color: '#4c1d95', textAlign: 'center', fontWeight: 600 },
  secao: { display: 'flex', flexDirection: 'column', gap: '8px' },
  tituloSecao: { color: '#d8c4ff', fontSize: '1.5rem', fontWeight: 600 },
  subtituloSecao: { color: '#ffffff', fontSize: '0.85rem', marginBottom: '14px' },
  gradeNiveis: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '20px' },
  cartaoNivel: { borderRadius: '20px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px', cursor: 'pointer', minHeight: '180px' },
  cartaoNivelAtual: { backgroundColor: '#ddc9ff', border: '1px solid #ddc9ff' },
  cartaoNivelOutro: { backgroundColor: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.2)' },
  cartaoNivelTopo: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  selo: { fontSize: '0.7rem', fontWeight: 'bold', padding: '4px 12px', borderRadius: '12px' },
  seloClaro: { backgroundColor: '#c4b5fd', color: '#3b00a5' },
  seloEscuro: { backgroundColor: '#c4b5fd', color: '#3b00a5' },
  seloAtual: { backgroundColor: '#3b00a5', color: '#ffffff' },
  seloExplorar: { backgroundColor: 'rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.85)' },
  cartaoNivelTitulo: { fontSize: '1.3rem', fontWeight: 700 },
  cartaoNivelTexto: { fontSize: '0.85rem', lineHeight: 1.4 },
};
