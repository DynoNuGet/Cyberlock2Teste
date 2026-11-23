import { doc, runTransaction, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';
import { JOGOS_LISTA } from '../dados/jogos';

/*
 * Estrutura no Firestore:
 *   usuarios/{uid}                      -> { xpTotal, xpPorDia: { "2026-11-22": 40 } }
 *   usuarios/{uid}/progresso/{jogoId}   -> { niveis: { "1": ProgressoNivel, ... } }
 */

export const META_XP_DIARIA = 50;
export const XP_POR_NIVEL_DO_USUARIO = 100;

export interface ProgressoNivel {
  melhorPontos: number;
  melhorAcertos: number;
  totalRodadas: number;
  estrelas: number;
  tentativas: number;
  concluido: boolean;
}

export type ProgressoJogo = Record<string, ProgressoNivel>; // chave = id do nível

export interface ResultadoPartida {
  pontos: number;
  acertos: number;
  totalRodadas: number;
  estrelas: number;
  concluido: boolean;
}

export interface RetornoPartida {
  xpGanho: number;
  recordeAnterior: number;
  novoRecorde: boolean;
}

const TITULOS = ['Iniciante', 'Aprendiz', 'Analista', 'Especialista', 'Mestre'];

export function nivelDoUsuario(xpTotal: number): number {
  return Math.floor(xpTotal / XP_POR_NIVEL_DO_USUARIO) + 1;
}

export function tituloDoNivel(nivel: number): string {
  return TITULOS[Math.min(nivel, TITULOS.length) - 1];
}

// Data local no formato AAAA-MM-DD (chave do XP diário)
export function chaveDia(data: Date = new Date()): string {
  const mes = String(data.getMonth() + 1).padStart(2, '0');
  const dia = String(data.getDate()).padStart(2, '0');
  return `${data.getFullYear()}-${mes}-${dia}`;
}

// Um jogo está concluído quando todos os níveis numerados (exceto o Modo Infinito) foram concluídos.
export function contarJogosConcluidos(jogos: Record<string, ProgressoJogo>): number {
  return JOGOS_LISTA.filter((jogo) =>
    jogo.niveis.filter((n) => n.id !== 'infinito').every((n) => jogos[jogo.id]?.[n.id]?.concluido),
  ).length;
}

/**
 * Registra uma partida de forma atômica (transação).
 * O XP ganho é só a melhora sobre o recorde anterior do nível: repetir a mesma pontuação não rende XP.
 */
export function registrarPartida(
  uid: string,
  jogoId: string,
  nivelId: string,
  resultado: ResultadoPartida,
): Promise<RetornoPartida> {
  const refJogo = doc(db, 'usuarios', uid, 'progresso', jogoId);
  const refUsuario = doc(db, 'usuarios', uid);

  return runTransaction(db, async (transacao) => {
    const snapJogo = await transacao.get(refJogo);
    const snapUsuario = await transacao.get(refUsuario);

    const anterior = (snapJogo.data()?.niveis?.[nivelId] ?? null) as ProgressoNivel | null;
    const recordeAnterior = anterior?.melhorPontos ?? 0;
    const xpGanho = Math.max(0, resultado.pontos - recordeAnterior);

    const novo: ProgressoNivel = {
      melhorPontos: Math.max(recordeAnterior, resultado.pontos),
      melhorAcertos: Math.max(anterior?.melhorAcertos ?? 0, resultado.acertos),
      totalRodadas: resultado.totalRodadas,
      estrelas: Math.max(anterior?.estrelas ?? 0, resultado.estrelas),
      tentativas: (anterior?.tentativas ?? 0) + 1,
      concluido: (anterior?.concluido ?? false) || resultado.concluido,
    };

    transacao.set(refJogo, { niveis: { [nivelId]: novo }, atualizadoEm: serverTimestamp() }, { merge: true });

    if (xpGanho > 0) {
      const dados = snapUsuario.data();
      const dia = chaveDia();
      transacao.set(
        refUsuario,
        {
          xpTotal: (dados?.xpTotal ?? 0) + xpGanho,
          xpPorDia: { [dia]: (dados?.xpPorDia?.[dia] ?? 0) + xpGanho },
          atualizadoEm: serverTimestamp(),
        },
        { merge: true },
      );
    }

    return { xpGanho, recordeAnterior, novoRecorde: resultado.pontos > recordeAnterior };
  });
}
