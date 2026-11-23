import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { collection, doc, onSnapshot } from 'firebase/firestore';
import { db } from '../services/firebase';
import { useAuth } from './AuthContext';
import { nivelDoUsuario, type ProgressoJogo } from '../services/progresso';

interface ProgressoValue {
  xpTotal: number;
  nivelUsuario: number;
  xpPorDia: Record<string, number>;
  jogos: Record<string, ProgressoJogo>; // chave = id do jogo
  carregando: boolean;
  erro: boolean; // true se o Firestore não pôde ser lido (regras, conexão...)
}

const VAZIO: ProgressoValue = { xpTotal: 0, nivelUsuario: 1, xpPorDia: {}, jogos: {}, carregando: false, erro: false };

interface Dados {
  uid: string;
  xpTotal: number;
  xpPorDia: Record<string, number>;
  jogos: Record<string, ProgressoJogo>;
  resumoPronto: boolean;
  jogosPronto: boolean;
  erro: boolean;
}

const ProgressoContext = createContext<ProgressoValue>(VAZIO);

export function ProgressoProvider({ children }: { children: ReactNode }) {
  const { usuario } = useAuth();
  const uid = usuario?.uid;
  const [dados, setDados] = useState<Dados | null>(null);

  useEffect(() => {
    if (!uid) return;

    const atualizar = (parcial: Partial<Dados>) =>
      setDados((atual) => {
        const base: Dados =
          atual && atual.uid === uid
            ? atual
            : { uid, xpTotal: 0, xpPorDia: {}, jogos: {}, resumoPronto: false, jogosPronto: false, erro: false };
        return { ...base, ...parcial };
      });

    // Tempo real: o Header e o Perfil atualizam sozinhos quando uma partida termina.
    const cancelarResumo = onSnapshot(
      doc(db, 'usuarios', uid),
      (snap) => {
        const d = snap.data();
        atualizar({ xpTotal: d?.xpTotal ?? 0, xpPorDia: d?.xpPorDia ?? {}, resumoPronto: true });
      },
      () => atualizar({ erro: true, resumoPronto: true }),
    );

    const cancelarJogos = onSnapshot(
      collection(db, 'usuarios', uid, 'progresso'),
      (snap) => {
        const jogos: Record<string, ProgressoJogo> = {};
        snap.forEach((d) => {
          jogos[d.id] = d.data().niveis ?? {};
        });
        atualizar({ jogos, jogosPronto: true });
      },
      () => atualizar({ erro: true, jogosPronto: true }),
    );

    return () => {
      cancelarResumo();
      cancelarJogos();
    };
  }, [uid]);

  const atual = dados && dados.uid === uid ? dados : null;
  const valor: ProgressoValue = !uid
    ? VAZIO
    : {
        xpTotal: atual?.xpTotal ?? 0,
        nivelUsuario: nivelDoUsuario(atual?.xpTotal ?? 0),
        xpPorDia: atual?.xpPorDia ?? {},
        jogos: atual?.jogos ?? {},
        carregando: !(atual?.resumoPronto && atual?.jogosPronto),
        erro: atual?.erro ?? false,
      };

  return <ProgressoContext.Provider value={valor}>{children}</ProgressoContext.Provider>;
}

export function useProgresso(): ProgressoValue {
  return useContext(ProgressoContext);
}
