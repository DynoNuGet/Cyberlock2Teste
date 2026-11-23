import type React from 'react';

// Estilos compartilhados pelos jogos (mesmo visual da área cinza).
export const estilosJogo: { [key: string]: React.CSSProperties } = {
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
