import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { NaoEncontrado } from '../components/NaoEncontrado';
import { CarrosselNoticias } from '../components/CarrosselNoticias';
import { obterNoticia } from '../dados/noticias';
import '../main.css';

export const NoticiaDetalhe: React.FC = () => {
  const { noticiaId } = useParams();
  const navigate = useNavigate();
  const [expandido, setExpandido] = useState(false);
  const [seguindo, setSeguindo] = useState(false);
  const noticia = obterNoticia(noticiaId);

  if (!noticia) {
    return <NaoEncontrado mensagem="Notícia não encontrada." voltarPara="/noticias" textoBotao="Ver todas as notícias" />;
  }

  return (
    <div style={{ backgroundColor: 'var(--primary-bg)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />

      <img src={noticia.imageUrl} alt={noticia.title} style={styles.imagemTopo} />

      <section style={styles.secaoArtigo}>
        <div style={styles.conteudo}>
          <h1 style={styles.titulo}>{noticia.title}</h1>

          <div style={styles.textoWrapper}>
            <div style={{ ...styles.texto, ...(expandido ? {} : styles.textoRecolhido) }}>
              {noticia.content.map((paragrafo, i) => (
                <p key={i} style={{ ...styles.paragrafo, ...(i > 0 ? styles.paragrafoSecundario : {}) }}>
                  {paragrafo}
                </p>
              ))}
            </div>
            {!expandido && <div style={styles.degrade} />}
          </div>

          <div style={styles.linhaExpandir}>
            <button
              onClick={() => setExpandido(!expandido)}
              style={styles.botaoExpandir}
              aria-label={expandido ? 'Recolher texto' : 'Expandir texto'}
              aria-expanded={expandido}
            >
              <ChevronDown size={22} style={{ transform: expandido ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
            </button>
          </div>

          <hr style={styles.divisor} />

          <div style={styles.tags}>
            {noticia.tags.map((tag) => (
              <span key={tag} style={styles.tag}>{tag}</span>
            ))}
          </div>

          <div style={styles.linhaAutor}>
            <div style={styles.autor}>
              <img src={noticia.authorAvatar} alt={noticia.authorName} style={styles.autorAvatar} />
              <div style={styles.autorTextos}>
                <span style={styles.escritoPor}>Escrito por</span>
                <span style={styles.autorNome}>{noticia.authorName}</span>
                <span style={styles.autorCargo}>{noticia.authorRole}</span>
              </div>
            </div>

            <button
              onClick={() => setSeguindo(!seguindo)}
              style={{ ...styles.botaoSeguir, ...(seguindo ? styles.botaoSeguindo : {}) }}
            >
              {seguindo ? 'Seguindo' : 'Seguir'}
            </button>
          </div>
        </div>
      </section>

      <section style={styles.secaoRelacionadas}>
        <div style={styles.conteudo}>
          <div style={styles.linhaRelacionadas}>
            <h2 style={styles.tituloRelacionadas}>Notícias relacionadas</h2>
            <button style={styles.verTudo} onClick={() => navigate('/noticias')}>Ver tudo</button>
          </div>
          <CarrosselNoticias excluirId={noticia.id} />
        </div>
      </section>

      <Footer />
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  imagemTopo: { width: '100%', height: '420px', objectFit: 'cover', display: 'block' },
  secaoArtigo: { background: 'linear-gradient(180deg, #5b16c4 0%, #8433ff 100%)', padding: '60px 0 40px' },
  conteudo: { maxWidth: '1100px', width: '100%', margin: '0 auto', padding: '0 24px', display: 'flex', flexDirection: 'column', gap: '24px' },
  titulo: { color: '#e4d4ff', fontSize: '2rem', fontWeight: 600, lineHeight: 1.3 },
  textoWrapper: { position: 'relative' },
  texto: { display: 'flex', flexDirection: 'column', overflow: 'hidden', transition: 'max-height 0.3s' },
  textoRecolhido: { maxHeight: '260px' },
  paragrafo: { color: '#ffffff', fontSize: '1.05rem', lineHeight: 1.9 },
  paragrafoSecundario: { marginTop: '24px', color: '#e9ddff' },
  degrade: { position: 'absolute', left: 0, right: 0, bottom: 0, height: '120px', background: 'linear-gradient(180deg, rgba(120,45,235,0) 0%, #7a2cec 100%)', pointerEvents: 'none' },
  linhaExpandir: { display: 'flex', justifyContent: 'center' },
  botaoExpandir: { backgroundColor: '#ddc9ff', color: '#3b00a5', border: 'none', width: '110px', height: '38px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' },
  divisor: { border: 'none', height: '2px', backgroundColor: '#ffffff', opacity: 0.9 },
  tags: { display: 'flex', flexWrap: 'wrap', gap: '20px' },
  tag: { backgroundColor: '#ddc9ff', color: '#7c3aed', fontSize: '0.85rem', fontWeight: 'bold', padding: '12px 24px', borderRadius: '24px' },
  linhaAutor: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' },
  autor: { display: 'flex', alignItems: 'center', gap: '14px' },
  autorAvatar: { width: '60px', height: '60px', borderRadius: '12px', objectFit: 'cover' },
  autorTextos: { display: 'flex', flexDirection: 'column', color: '#ffffff' },
  escritoPor: { fontSize: '0.7rem', opacity: 0.8 },
  autorNome: { fontSize: '1rem', fontWeight: 'bold' },
  autorCargo: { fontSize: '0.75rem', opacity: 0.85 },
  botaoSeguir: { backgroundColor: 'transparent', color: '#ffffff', border: '2px solid #c4b5fd', borderRadius: '10px', padding: '12px 56px', fontWeight: 'bold', fontSize: '0.85rem', cursor: 'pointer' },
  botaoSeguindo: { backgroundColor: '#ddc9ff', color: '#3b00a5', border: '2px solid #ddc9ff' },
  secaoRelacionadas: { backgroundColor: '#8b57ff', padding: '50px 0 30px', flex: 1 },
  linhaRelacionadas: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  tituloRelacionadas: { color: '#ffffff', fontSize: '1.5rem', fontWeight: 500 },
  verTudo: { background: 'none', border: 'none', color: '#e4d4ff', fontWeight: 'bold', cursor: 'pointer' },
};
