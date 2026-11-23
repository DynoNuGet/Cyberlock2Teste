import React from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import '../main.css';

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  avatarUrl: string;
}

export const SobreNos: React.FC = () => {
  const teamMembers: TeamMember[] = [
    {
      name: 'Anderson Julião',
      role: 'Líder',
      bio: 'Lorem Ipsum',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    },
    {
      name: 'Arthur Sales',
      role: 'Documentação',
      bio: 'Lorem Ipsum',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    },
    {
      name: 'Diego Ernesto',
      role: 'Programação',
      bio: 'Lorem Ipsum',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    },
    {
      name: 'Erick de Moura',
      role: 'História e documentação',
      bio: 'Lorem Ipsum',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    },
  ];

  return (
    <div style={{ backgroundColor: 'var(--primary-bg)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />

      <main style={styles.mainContainer}>
        <h1 style={styles.title}>Nossos desenvolvedores e contribuidores</h1>

        <div style={styles.teamGrid}>
          {teamMembers.map((member, index) => (
            <div key={index} style={styles.memberCard}>
              <img
                src={member.avatarUrl}
                alt={member.name}
                style={styles.avatar}
              />
              <h3 style={styles.memberName}>{member.name}</h3>
              <span style={styles.memberRole}>{member.role}</span>
              <p style={styles.memberBio}>{member.bio}</p>
            </div>
          ))}
        </div>

        <div style={styles.navControls}>
          <button style={styles.arrowBtn} aria-label="Anterior">
            <ChevronLeft size={18} />
          </button>
          <button style={styles.arrowBtn} aria-label="Próximo">
            <ChevronRight size={18} />
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  mainContainer: {
    maxWidth: '1200px',
    width: '100%',
    margin: '0 auto',
    padding: '60px 20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '40px',
    flex: 1,
  },
  title: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
  },
  teamGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
    gap: '20px',
    width: '100%',
    justifyContent: 'center',
  },
  memberCard: {
    backgroundColor: '#ffffff',
    borderRadius: '20px',
    padding: '24px 20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)',
  },
  avatar: {
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    objectFit: 'cover',
    marginBottom: '16px',
  },
  memberName: {
    fontSize: '1rem',
    fontWeight: 'bold',
    color: '#1e1b4b',
    marginBottom: '4px',
  },
  memberRole: {
    fontSize: '0.8rem',
    fontWeight: '600',
    color: '#7c3aed',
    marginBottom: '12px',
  },
  memberBio: {
    fontSize: '0.75rem',
    color: '#6b7280',
    lineHeight: '1.4',
  },
  navControls: {
    display: 'flex',
    gap: '12px',
    justifyContent: 'center',
    marginTop: '10px',
  },
  arrowBtn: {
    backgroundColor: '#7c3aed',
    border: 'none',
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#ffffff',
    cursor: 'pointer',
    boxShadow: '0 4px 12px rgba(124, 58, 237, 0.3)',
  },
};