export interface Game {
  id: string;
  title: string;
  description: string;
  level: string;
  rating: string;
  xp: string;
  imageUrl: string;
}

export interface NewsArticle {
  id: string;
  category: string;
  views: string;
  title: string;
  description: string;
  authorName: string;
  authorRole: string;
  authorAvatar: string;
  imageUrl: string;
}

export const Dados_Jogos: Game[] = [
  {
    id: '1',
    title: 'Análise de senhas',
    description: 'Aprenda a identificar senhas frágeis e crie senhas super seguras para proteger seus dados.',
    level: 'Nível 1',
    rating: '4.8',
    xp: '100 XP',
    imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: '2',
    title: 'Golpe ou Não',
    description: 'Analise mensagens, links e situações do dia a dia e decida: é golpe ou é legítimo?',
    level: 'Nível 2',
    rating: '4.9',
    xp: '150 XP',
    imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: '3',
    title: 'Mínimo possível',
    description: 'Aprenda a compartilhar apenas os dados estritamente necessários ao usar apps.',
    level: 'Nível 3',
    rating: '4.7',
    xp: '120 XP',
    imageUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: '4',
    title: 'Rema ao Tema',
    description: 'Decida se cada afirmação sobre senhas, privacidade e LGPD é verdade ou mito e reme até a margem.',
    level: 'Nível 4',
    rating: '4.8',
    xp: '200 XP',
    imageUrl: 'https://images.unsplash.com/photo-1510511459019-5dda7724fd87?auto=format&fit=crop&q=80&w=600',
  },
];

export const Dados_Noticias: NewsArticle[] = [
  {
    id: '1',
    category: 'Vazamento de dados',
    views: '251.232 leituras',
    title: 'Vazou seus dados? Sem problemas! Aqui estão 10 dicas para quando o pior acontecer!',
    description: 'Geralmente não estamos preparados para quando os nossos dados estão sendo expostos, então aqui, vamos dar 10 dicas práticas para agir rápido.',
    authorName: 'Liane',
    authorRole: 'Segurança e TI',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100',
    imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: '2',
    category: 'Segurança na Web',
    views: '145.323 leituras',
    title: 'Como saber se um site é confiável em 5 passos',
    description: 'Hoje em dia, os sites costumam ser duvidosos, pedindo informações que não são necessárias para funcionar, e costumam usar truques para confundir o usuário.',
    authorName: 'Lina',
    authorRole: 'Segurança Digital',
    authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100',
    imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800',
  },
];