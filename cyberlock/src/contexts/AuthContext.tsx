import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { auth } from '../services/firebase';

export interface UsuarioLogado {
  uid: string;
  nome: string;
  email: string;
  fotoUrl: string | null;
}

interface AuthContextValue {
  usuario: UsuarioLogado | null;
  carregando: boolean;
  /** Relê os dados do Firebase (use depois de updateProfile). */
  atualizarUsuario: () => void;
}

function montarUsuario(user: User | null): UsuarioLogado | null {
  if (!user) return null;
  const email = user.email ?? '';
  return {
    uid: user.uid,
    email,
    nome: user.displayName?.trim() || email.split('@')[0] || 'Usuário',
    fotoUrl: user.photoURL,
  };
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<UsuarioLogado | null>(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const cancelar = onAuthStateChanged(auth, (user) => {
      setUsuario(montarUsuario(user));
      setCarregando(false);
    });
    return cancelar;
  }, []);

  const atualizarUsuario = useCallback(() => {
    setUsuario(montarUsuario(auth.currentUser));
  }, []);

  return (
    <AuthContext.Provider value={{ usuario, carregando, atualizarUsuario }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const contexto = useContext(AuthContext);
  if (!contexto) throw new Error('useAuth deve ser usado dentro de <AuthProvider>');
  return contexto;
}
