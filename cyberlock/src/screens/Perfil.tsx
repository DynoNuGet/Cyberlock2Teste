import React, { useState } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { User, Mail, Shield, Award, KeyRound, CheckCircle2 } from 'lucide-react';
import { updateProfile, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../services/firebase';
import { useAuth } from '../contexts/AuthContext';
import { useProgresso } from '../contexts/ProgressoContext';
import { contarJogosConcluidos, tituloDoNivel } from '../services/progresso';
import { JOGOS_LISTA } from '../dados/jogos';
import { Avatar } from '../components/Avatar';
import '../main.css';

export const Perfil: React.FC = () => {
  const { usuario, atualizarUsuario } = useAuth();
  const { xpTotal, nivelUsuario, jogos } = useProgresso();
  const [name, setName] = useState(usuario?.nome ?? '');
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const mostrarSucesso = (mensagem: string) => {
    setErrorMsg('');
    setSuccessMsg(mensagem);
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth.currentUser) return;

    try {
      await updateProfile(auth.currentUser, { displayName: name.trim() });
      atualizarUsuario();
      mostrarSucesso('Alterações salvas com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar perfil:', error);
      setSuccessMsg('');
      setErrorMsg('Não foi possível salvar as alterações. Tente novamente.');
    }
  };

  const handleResetPassword = async () => {
    if (!usuario?.email) return;

    try {
      await sendPasswordResetEmail(auth, usuario.email);
      mostrarSucesso(`Enviamos um e-mail de redefinição para ${usuario.email}.`);
    } catch (error) {
      console.error('Erro ao enviar e-mail de redefinição:', error);
      setSuccessMsg('');
      setErrorMsg('Não foi possível enviar o e-mail de redefinição.');
    }
  };

  return (
    <div style={{ backgroundColor: 'var(--primary-bg)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />

      <main style={styles.mainContainer}>
        <section style={styles.heroSection}>
          <div style={styles.categoryBadge}>
            <Shield size={12} color="#ffffff" />
            <span>PAINEL DO USUÁRIO</span>
          </div>
          <h1 style={styles.pixelTitle}>Configurações da Conta</h1>
          <p style={styles.subtitle}>Gerencie suas informações pessoais e acompanhe seu nível de segurança.</p>
        </section>

        <div style={styles.contentGrid}>
          <div style={styles.profileSummaryCard}>
            <div style={styles.avatarWrapper}>
              <Avatar nome={usuario?.nome ?? ''} fotoUrl={usuario?.fotoUrl} tamanho={84} />
            </div>
            <h2 style={styles.profileName}>{usuario?.nome}</h2>
            <span style={styles.roleBadge}>Nível {nivelUsuario} • {tituloDoNivel(nivelUsuario)}</span>

            <div style={styles.statsRow}>
              <div style={styles.statItem}>
                <Award size={18} color="#7c3aed" />
                <span style={styles.statValue}>{xpTotal} XP</span>
                <span style={styles.statLabel}>Pontuação</span>
              </div>
              <div style={styles.statItem}>
                <Shield size={18} color="#7c3aed" />
                <span style={styles.statValue}>{contarJogosConcluidos(jogos)} / {JOGOS_LISTA.length}</span>
                <span style={styles.statLabel}>Jogos Concluídos</span>
              </div>
            </div>
          </div>

          <div style={styles.formCard}>
            <h3 style={styles.cardTitle}>Informações Pessoais</h3>
            <p style={styles.cardDesc}>Atualize o nome exibido na sua conta.</p>

            {successMsg && (
              <div style={styles.successBanner}>
                <CheckCircle2 size={16} />
                <span>{successMsg}</span>
              </div>
            )}

            {errorMsg && <div style={styles.errorBanner}>{errorMsg}</div>}

            <form onSubmit={handleSave} style={styles.form}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Nome de Exibição</label>
                <div style={styles.inputWrapper}>
                  <User size={18} color="#7c3aed" style={styles.inputIcon} />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={styles.inputField}
                    required
                  />
                </div>
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>E-mail</label>
                <div style={styles.inputWrapper}>
                  <Mail size={18} color="#7c3aed" style={styles.inputIcon} />
                  <input
                    type="email"
                    value={usuario?.email ?? ''}
                    readOnly
                    style={{ ...styles.inputField, color: '#6b7280', cursor: 'not-allowed' }}
                  />
                </div>
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Senha</label>
                <button type="button" onClick={handleResetPassword} style={styles.resetButton}>
                  <KeyRound size={16} color="#7c3aed" />
                  <span>Enviar e-mail para redefinir senha</span>
                </button>
              </div>

              <button type="submit" style={styles.saveButton}>
                Salvar Alterações
              </button>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  mainContainer: {
    maxWidth: '1100px',
    width: '100%',
    margin: '0 auto',
    padding: '40px 20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '40px',
    flex: 1,
  },
  heroSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    gap: '10px',
  },
  categoryBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    padding: '4px 14px',
    borderRadius: '15px',
    fontSize: '0.65rem',
    fontWeight: 'bold',
    color: '#ffffff',
    letterSpacing: '0.5px',
  },
  pixelTitle: {
    fontFamily: 'var(--font-pixel)',
    fontSize: '2rem',
    color: '#ffffff',
    textShadow: '3px 3px 0px #000',
  },
  subtitle: {
    fontSize: '0.9rem',
    color: 'rgba(255, 255, 255, 0.8)',
  },
  contentGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '24px',
    alignItems: 'flex-start',
  },
  profileSummaryCard: {
    backgroundColor: '#ffffff',
    borderRadius: '24px',
    padding: '32px 24px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
  },
  avatarWrapper: {
    width: '90px',
    height: '90px',
    borderRadius: '50%',
    overflow: 'hidden',
    border: '3px solid #7c3aed',
    marginBottom: '16px',
  },
  profileName: {
    fontSize: '1.4rem',
    fontWeight: 'bold',
    color: '#1e1b4b',
    marginBottom: '4px',
  },
  roleBadge: {
    fontSize: '0.75rem',
    fontWeight: 'bold',
    color: '#7c3aed',
    backgroundColor: '#f3e8ff',
    padding: '4px 12px',
    borderRadius: '12px',
    marginBottom: '24px',
  },
  statsRow: {
    display: 'flex',
    justifyContent: 'space-around',
    width: '100%',
    borderTop: '1px solid #f3f4f6',
    paddingTop: '20px',
  },
  statItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '4px',
  },
  statValue: {
    fontSize: '1rem',
    fontWeight: 'bold',
    color: '#1e1b4b',
  },
  statLabel: {
    fontSize: '0.65rem',
    color: '#6b7280',
  },
  formCard: {
    backgroundColor: '#ffffff',
    borderRadius: '24px',
    padding: '32px 24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
  },
  cardTitle: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    color: '#1e1b4b',
  },
  cardDesc: {
    fontSize: '0.8rem',
    color: '#6b7280',
    marginTop: '-10px',
    marginBottom: '10px',
  },
  successBanner: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    backgroundColor: '#ecfdf5',
    color: '#065f46',
    padding: '10px 14px',
    borderRadius: '12px',
    fontSize: '0.8rem',
    fontWeight: 'bold',
  },
  errorBanner: {
    backgroundColor: '#fef2f2',
    color: '#991b1b',
    padding: '10px 14px',
    borderRadius: '12px',
    fontSize: '0.8rem',
    fontWeight: 'bold',
  },
  resetButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    backgroundColor: '#f3e8ff',
    color: '#6d28d9',
    border: 'none',
    borderRadius: '16px',
    padding: '12px 14px',
    fontSize: '0.85rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    textAlign: 'left',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  label: {
    fontSize: '0.75rem',
    fontWeight: 'bold',
    color: '#4b5563',
  },
  inputWrapper: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  inputIcon: {
    position: 'absolute',
    left: '14px',
  },
  inputField: {
    width: '100%',
    padding: '12px 14px 12px 42px',
    borderRadius: '16px',
    border: '1px solid #e5e7eb',
    backgroundColor: '#f9fafb',
    fontSize: '0.85rem',
    color: '#1f2937',
    outline: 'none',
    transition: 'border-color 0.2px',
  },
  saveButton: {
    backgroundColor: '#7c3aed',
    color: '#ffffff',
    border: 'none',
    padding: '12px',
    borderRadius: '16px',
    fontSize: '0.9rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginTop: '8px',
    boxShadow: '0 4px 12px rgba(124, 58, 237, 0.3)',
    transition: 'background-color 0.2s',
  },
};