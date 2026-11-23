import React, { useState } from 'react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Inscrito:', email);
  };

  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <h3 style={styles.title}>Inscreva-se para receber novidades</h3>

        <form onSubmit={handleSubscribe} style={styles.form}>
          <input
            type="email"
            placeholder="Seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            required
          />
          <button type="submit" style={styles.button}>
            Inscrever
          </button>
        </form>

        <div style={styles.linksRow}>
          <a href="#carreiras" style={styles.link}>Carreiras</a>
          <span style={styles.divider}>|</span>
          <a href="#privacidade" style={styles.link}>Política de Privacidade</a>
          <span style={styles.divider}>|</span>
          <a href="#termos" style={styles.link}>Termos e Condições</a>
        </div>

        <p style={styles.copyright}>
          © 2026 Segurança dos Dados Pessoais Ltda.
        </p>
      </div>
    </footer>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  footer: {
    backgroundColor: '#13112c',
    padding: '40px 20px 20px 20px',
    color: '#ffffff',
    marginTop: '60px',
  },
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '20px',
    textAlign: 'center',
  },
  title: {
    fontSize: '1rem',
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 0.9)',
  },
  form: {
    display: 'flex',
    gap: '10px',
    width: '100%',
    maxWidth: '400px',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  input: {
    flex: 1,
    minWidth: '200px',
    padding: '10px 18px',
    borderRadius: '20px',
    border: 'none',
    backgroundColor: '#e9d5ff',
    color: '#5b21b6',
    fontSize: '0.85rem',
    outline: 'none',
  },
  button: {
    padding: '10px 24px',
    borderRadius: '20px',
    border: 'none',
    backgroundColor: '#7c3aed',
    color: '#ffffff',
    fontSize: '0.85rem',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  linksRow: {
    display: 'flex',
    gap: '12px',
    alignItems: 'center',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: '10px',
  },
  link: {
    color: 'rgba(255, 255, 255, 0.6)',
    textDecoration: 'none',
    fontSize: '0.75rem',
  },
  divider: {
    color: 'rgba(255, 255, 255, 0.2)',
    fontSize: '0.75rem',
  },
  copyright: {
    fontSize: '0.7rem',
    color: 'rgba(255, 255, 255, 0.4)',
    marginTop: '10px',
  },
};