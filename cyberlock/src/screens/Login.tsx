import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../services/firebase';
import '../main.css';

export const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg('');

    try {
      // autenticação firebase
      await signInWithEmailAndPassword(auth, email, password);
      console.log('Login efetuado com sucesso!');
      navigate('/home');
    } catch (error: any) {
      console.error('Erro ao fazer login:', error.message);
      setErrorMsg('E-mail ou senha incorretos. Tente novamente.');
    }
  };

  return (
    <div className="page-container">
      <div className="auth-wrapper">
        <div className="banner-card">
          <img
            src="https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&q=80&w=1000"
            alt="Pessoa utilizando computador com sistema de proteção"
          />
          <div className="banner-overlay">
            <h1 className="pixel-title">
              CyberLock para proteger seus dados
            </h1>
            <span className="badge">SIMPLES E DIVERTIDO</span>
          </div>
        </div>

        <div className="form-card">
          <h2 className="logo-title">CYBERLOCK</h2>

          <div style={internalStyles.tabContainer}>
            <button
              type="button"
              style={{
                ...internalStyles.tabButton,
                ...(activeTab === 'login' ? internalStyles.tabButtonActive : internalStyles.tabButtonInactive),
              }}
              onClick={() => setActiveTab('login')}
            >
              Login
            </button>
            <button
              type="button"
              style={{
                ...internalStyles.tabButton,
                ...(activeTab === 'register' ? internalStyles.tabButtonActive : internalStyles.tabButtonInactive),
              }}
              onClick={() => {
                setActiveTab('register');
                navigate('/cadastro');
              }}
            >
              Cadastro
            </button>
          </div>

          <p style={internalStyles.description}>
            Entre em seu perfil para salvar o progresso de seus jogos!
          </p>

          {errorMsg && <p style={internalStyles.errorText}>{errorMsg}</p>}

          <form onSubmit={handleSubmit} style={internalStyles.form}>
            <div style={internalStyles.inputWrapper}>
              <input
                type="email"
                placeholder="Escreva seu e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
                required
              />
            </div>

            <div style={internalStyles.inputWrapper}>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Escreva sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
                required
              />
              <button
                type="button"
                style={internalStyles.iconButton}
                onClick={() => setShowPassword(!showPassword)}
                aria-label="Alternar exibição da senha"
              >
                {showPassword ? (
                  <Eye size={18} color="#8b5cf6" />
                ) : (
                  <EyeOff size={18} color="#8b5cf6" />
                )}
              </button>
            </div>

            <div style={internalStyles.optionsRow}>
              <label style={internalStyles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  style={internalStyles.checkboxInput}
                />
                Lembre-se de mim
              </label>
              <a href="#forgot" style={internalStyles.forgotLink}>
                Esqueceu sua senha?
              </a>
            </div>

            <button type="submit" className="btn-primary" style={{ marginTop: '10px' }}>
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

const internalStyles: { [key: string]: React.CSSProperties } = {
  tabContainer: {
    backgroundColor: '#c4b5fd',
    borderRadius: '25px',
    padding: '4px',
    display: 'flex',
    width: '100%',
    marginBottom: '20px',
  },
  tabButton: {
    flex: 1,
    padding: '10px 0',
    border: 'none',
    borderRadius: '20px',
    fontSize: '0.9rem',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.2s ease-in-out',
  },
  tabButtonActive: {
    backgroundColor: '#ddd6fe',
    color: '#6d28d9',
  },
  tabButtonInactive: {
    backgroundColor: 'transparent',
    color: '#ffffff',
  },
  description: {
    color: '#4c1d95',
    fontSize: '0.95rem',
    textAlign: 'center',
    marginBottom: '20px',
    fontWeight: 500,
    lineHeight: '1.4',
  },
  errorText: {
    color: '#ef4444',
    fontSize: '0.8rem',
    marginBottom: '15px',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  form: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  inputWrapper: {
    position: 'relative',
    width: '100%',
  },
  iconButton: {
    position: 'absolute',
    right: '14px',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2px',
  },
  optionsRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '0.75rem',
    color: '#6b21a8',
    marginTop: '2px',
  },
  checkboxLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    cursor: 'pointer',
    userSelect: 'none',
  },
  checkboxInput: {
    accentColor: '#8b5cf6',
    cursor: 'pointer',
  },
  forgotLink: {
    color: '#8b5cf6',
    textDecoration: 'none',
  },
};