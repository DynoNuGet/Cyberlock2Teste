export interface Nivel {
  id: string;
  titulo: string;
  descricao: string;
  instrucao: string;
}

export interface Licao {
  id: string;
  titulo: string;
  imageUrl: string;
  progresso: number; // 0 a 100
}

export interface Game {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  level: string;
  rating: string;
  xp: string;
  imageUrl: string;
  badge: string;
  licoes: Licao[];
  niveis: Nivel[];
}

const IMG = {
  videochamada: 'https://images.unsplash.com/photo-1587614382346-4ec70e388b28?auto=format&fit=crop&q=80&w=800',
  reuniao: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&q=80&w=800',
  codigo: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800',
  notebook: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800',
};

export const JOGOS: Record<string, Game> = {
  '1': {
    id: '1',
    title: 'Análise de senhas',
    subtitle: 'Encontre os erros nas senhas',
    description: 'Aprenda a identificar senhas frágeis e crie senhas super seguras para proteger seus dados.',
    level: 'Nível 1',
    rating: '4.8',
    xp: '100 XP',
    imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=600',
    badge: 'Recomendado',
    licoes: [
      { id: '1', titulo: 'Introdução', imageUrl: IMG.videochamada, progresso: 80 },
      { id: '2', titulo: 'Senhas curtas e sem símbolos', imageUrl: IMG.reuniao, progresso: 0 },
      { id: '3', titulo: 'Reutilização de senhas', imageUrl: IMG.codigo, progresso: 0 },
      { id: '4', titulo: 'Gerenciadores de senha', imageUrl: IMG.notebook, progresso: 0 },
    ],
    niveis: [
      { id: '1', titulo: 'Senhas fracas', descricao: 'Identifique senhas curtas, sequências numéricas e palavras comuns.', instrucao: 'Analise as senhas e avalie-as. Avaliações corretas lhe darão pontos!' },
      { id: '2', titulo: 'Informações pessoais', descricao: 'Reconheça senhas com nomes, datas de nascimento e outras informações públicas.', instrucao: 'Compare a senha com o perfil público e descubra se um estranho conseguiria adivinhá-la.' },
      { id: '3', titulo: 'Complexidade', descricao: 'Entenda por que letras, números e símbolos sozinhos não bastam.', instrucao: 'Decida se a senha é forte ou fraca. Cuidado: parecer complicada nem sempre é ser segura!' },
      { id: '4', titulo: 'Reutilização', descricao: 'Descubra os riscos de usar a mesma senha em vários serviços.', instrucao: 'Leia cada situação e escolha a resposta que protege suas contas.' },
      { id: '5', titulo: 'Segurança real', descricao: 'Compare senhas previsíveis com frases-senha longas e resistentes.', instrucao: 'Escolha, em cada par, a senha mais resistente a ataques.' },
      { id: '6', titulo: 'Desafio hacker', descricao: 'Analise senhas com vulnerabilidades menos evidentes.', instrucao: 'Encontre a vulnerabilidade escondida em cada senha, ou perceba quando não há nenhuma.' },
      { id: 'infinito', titulo: 'Modo Infinito', descricao: 'Identifique senhas vulneráveis sem parar, com tempo limitado e dificuldade crescente.', instrucao: 'Responda rápido! Cada erro ou tempo esgotado custa uma vida.' },
    ],
  },
  '2': {
    id: '2',
    title: 'Golpe ou Não',
    subtitle: 'Detector de golpes',
    description: 'Analise mensagens, links e situações do dia a dia e decida: é golpe ou é legítimo?',
    level: 'Nível 2',
    rating: '4.9',
    xp: '150 XP',
    imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=600',
    badge: 'Popular',
    licoes: [
      { id: '1', titulo: 'Golpes evidentes', imageUrl: IMG.notebook, progresso: 0 },
      { id: '2', titulo: 'Phishing', imageUrl: IMG.reuniao, progresso: 0 },
      { id: '3', titulo: 'Engenharia social', imageUrl: IMG.codigo, progresso: 0 },
      { id: '4', titulo: 'Fraudes digitais', imageUrl: IMG.videochamada, progresso: 0 },
    ],
    niveis: [
      { id: '1', titulo: 'Golpes evidentes', descricao: 'Identifique mensagens fraudulentas, promessas exageradas e pedidos suspeitos.', instrucao: 'Analise cada mensagem e decida: golpe ou legítimo? Acertos lhe darão pontos!' },
      { id: '2', titulo: 'Phishing', descricao: 'Reconheça e-mails, links e páginas falsas que tentam roubar informações.', instrucao: 'Inspecione os endereços e remetentes antes de decidir. O detalhe faz a diferença!' },
      { id: '3', titulo: 'Engenharia social', descricao: 'Identifique manipulação psicológica, urgência, ameaças e falsas autoridades.', instrucao: 'Cuidado com quem tenta fazer você agir sem pensar. Nem toda urgência é golpe, mas muita é.' },
      { id: '4', titulo: 'Fraudes digitais', descricao: 'Analise golpes envolvendo compras, pagamentos, redes sociais e falsas ofertas.', instrucao: 'Avalie ofertas, pagamentos e perfis e decida se são seguros.' },
      { id: '5', titulo: 'Golpes sofisticados', descricao: 'Identifique fraudes com aparência legítima, falsificação de identidade e mensagens personalizadas.', instrucao: 'Os golpistas capricham: procure o que não bate, e lembre que há situações legítimas também.' },
      { id: '6', titulo: 'Investigação digital', descricao: 'Analise vários elementos de uma situação para determinar sua legitimidade ou risco.', instrucao: 'Use o botão "Inspecionar" para descobrir os detalhes escondidos e então decida.' },
      { id: 'infinito', titulo: 'Modo Infinito', descricao: 'Identifique golpes e situações legítimas em cenários aleatórios com dificuldade crescente.', instrucao: 'Responda rápido! Cair em um golpe custa mais escudos do que desconfiar de algo legítimo.' },
    ],
  },
  '3': {
    id: '3',
    title: 'Mínimo possível',
    subtitle: 'Compartilhe só o necessário',
    description: 'Aprenda a compartilhar apenas os dados estritamente necessários ao usar apps.',
    level: 'Nível 3',
    rating: '4.7',
    xp: '120 XP',
    imageUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=600',
    badge: 'Novo',
    licoes: [
      { id: '1', titulo: 'Dados essenciais', imageUrl: IMG.codigo, progresso: 0 },
      { id: '2', titulo: 'Formulários e cadastros', imageUrl: IMG.notebook, progresso: 0 },
      { id: '3', titulo: 'Permissões de apps', imageUrl: IMG.videochamada, progresso: 0 },
      { id: '4', titulo: 'Redes sociais', imageUrl: IMG.reuniao, progresso: 0 },
    ],
    niveis: [
      { id: '1', titulo: 'Dados essenciais', descricao: 'Separe o que é necessário do que é excesso.', instrucao: 'Marque apenas os dados realmente necessários para cada serviço.' },
      { id: '2', titulo: 'Formulários', descricao: 'Preencha cadastros compartilhando o mínimo.', instrucao: 'Escolha quais campos do formulário você deve preencher.' },
      { id: '3', titulo: 'Permissões de apps', descricao: 'Revise acessos e decida o que liberar.', instrucao: 'Permita ou negue cada permissão solicitada pelo aplicativo.' },
      { id: '4', titulo: 'Redes sociais', descricao: 'Ajuste o que você expõe publicamente.', instrucao: 'Identifique o que não deveria estar visível no perfil.' },
      { id: '5', titulo: 'Compras online', descricao: 'Evite entregar dados desnecessários ao comprar.', instrucao: 'Descubra quais dados a loja realmente precisa para concluir a compra.' },
    ],
  },
  '4': {
    id: '4',
    title: 'Rema ao Tema',
    subtitle: 'Verdade ou mito sobre seus dados',
    description: 'Decida se cada afirmação sobre senhas, privacidade e LGPD é verdade ou mito e reme até a margem.',
    level: 'Nível 4',
    rating: '4.8',
    xp: '200 XP',
    imageUrl: 'https://images.unsplash.com/photo-1510511459019-5dda7724fd87?auto=format&fit=crop&q=80&w=600',
    badge: 'Novo',
    licoes: [
      { id: '1', titulo: 'Fundamentos digitais', imageUrl: IMG.notebook, progresso: 0 },
      { id: '2', titulo: 'Privacidade online', imageUrl: IMG.codigo, progresso: 0 },
      { id: '3', titulo: 'LGPD na prática', imageUrl: IMG.reuniao, progresso: 0 },
      { id: '4', titulo: 'Segurança avançada', imageUrl: IMG.videochamada, progresso: 0 },
    ],
    niveis: [
      { id: '1', titulo: 'Fundamentos digitais', descricao: 'Verdades e mitos básicos sobre senhas, contas e dados pessoais.', instrucao: 'Leia cada afirmação e decida: verdade ou mito? Cada acerto faz o barco avançar!' },
      { id: '2', titulo: 'Compartilhamento', descricao: 'Quando, onde e com quem é seguro compartilhar informações.', instrucao: 'Decida se cada afirmação sobre compartilhar informações é verdade ou mito.' },
      { id: '3', titulo: 'Privacidade online', descricao: 'Cookies, rastreamento, permissões e coleta de dados.', instrucao: 'Verdade ou mito? Teste o que você sabe sobre rastreamento e permissões.' },
      { id: '4', titulo: 'LGPD', descricao: 'Direitos dos titulares, princípios e obrigações das empresas.', instrucao: 'Julgue as afirmações sobre a Lei Geral de Proteção de Dados.' },
      { id: '5', titulo: 'Segurança avançada', descricao: 'Autenticação, vazamentos, criptografia e ataques digitais.', instrucao: 'Analise cada situação de segurança e diga se a afirmação é verdade ou mito.' },
      { id: '6', titulo: 'Cenários complexos', descricao: 'Afirmações ambíguas e situações reais que pedem interpretação cuidadosa.', instrucao: 'Nem tudo é verdade ou mito: algumas afirmações dependem do contexto. Leia com atenção!' },
      { id: 'infinito', titulo: 'Modo Infinito', descricao: 'Afirmações aleatórias com velocidade crescente e penalidades acumulativas.', instrucao: 'Responda rápido! Cada erro custa mais fôlego que o anterior.' },
    ],
  },
};

export const JOGOS_LISTA: Game[] = Object.values(JOGOS);

export function obterJogo(id: string | undefined): Game | undefined {
  return id ? JOGOS[id] : undefined;
}
