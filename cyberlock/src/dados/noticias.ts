export interface NewsArticle {
  id: string;
  category: string;
  views: string;
  title: string;
  description: string;
  content: string[];
  tags: string[];
  authorName: string;
  authorRole: string;
  authorAvatar: string;
  imageUrl: string;
}

export const NOTICIAS: Record<string, NewsArticle> = {
  '1': {
    id: '1',
    category: 'Vazamento de dados',
    views: '251.232 leituras',
    title: 'Vazou seus dados? Sem problemas! Aqui estão 10 dicas para quando o pior acontecer!',
    description: 'Geralmente não estamos preparados para quando os nossos dados estão sendo expostos, então aqui, vamos dar 10 dicas práticas para agir rápido.',
    content: [
      'Descobrir que os seus dados foram expostos é uma situação que assusta, mas agir rápido faz toda a diferença. Na maioria das vezes, o dano pode ser reduzido bastante se as primeiras medidas forem tomadas nas primeiras horas.',
      'A primeira dica é confirmar o vazamento. Use serviços de verificação de e-mail e consulte o comunicado oficial da empresa envolvida. Desconfie de mensagens que chegam avisando sobre o problema, pois golpistas aproveitam o momento para pedir ainda mais informações.',
      'Em seguida, troque imediatamente as senhas das contas afetadas e de qualquer outra conta em que você usava a mesma senha. Reutilizar senhas é o que transforma um vazamento isolado em uma sequência de invasões.',
      'Ative a verificação em duas etapas sempre que possível. Mesmo que alguém tenha a sua senha, o segundo fator impede o acesso. Prefira aplicativos autenticadores em vez de códigos enviados por SMS.',
      'Fique atento a movimentações estranhas: cobranças desconhecidas, e-mails de redefinição de senha que você não pediu e tentativas de login em horários incomuns. Se dados bancários foram expostos, avise o banco e peça a troca do cartão.',
      'Por fim, lembre-se de que a LGPD garante a você o direito de saber como seus dados foram tratados. Registre uma solicitação formal à empresa e, se não houver resposta, procure a Autoridade Nacional de Proteção de Dados. Guardar prints e protocolos ajuda em qualquer etapa.',
    ],
    tags: ['Vulnerável', 'Vazamento', 'Técnico'],
    authorName: 'Liane',
    authorRole: 'Segurança e TI',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100',
    imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1600',
  },
  '2': {
    id: '2',
    category: 'Segurança na Web',
    views: '145.323 leituras',
    title: 'Como saber se um site é confiável em 5 passos',
    description: 'Hoje em dia, os sites costumam ser duvidosos, pedindo informações que não são necessárias para funcionar, e costumam usar truques para confundir o usuário.',
    content: [
      'Antes de digitar qualquer dado em um site, vale dedicar alguns segundos para checar se ele merece a sua confiança. Golpes online dependem justamente da pressa e da distração de quem navega.',
      'Passo 1: observe o endereço. Letras trocadas, hífens demais e domínios estranhos são sinais clássicos de páginas falsas. Digitar o endereço manualmente é mais seguro do que clicar em links recebidos.',
      'Passo 2: verifique o cadeado e o protocolo HTTPS. Ele garante que a conexão é criptografada, mas não prova que o site é honesto, então use esse sinal junto com os outros.',
      'Passo 3: desconfie de ofertas boas demais e de contagens regressivas agressivas. Passo 4: confira se existem política de privacidade, CNPJ e canais de contato reais. Passo 5: pesquise a reputação do site em fontes independentes antes de comprar.',
      'Se algo parecer fora do normal, feche a página. Nenhum desconto compensa o risco de entregar seus dados para a pessoa errada.',
    ],
    tags: ['Navegação', 'Golpes', 'Iniciante'],
    authorName: 'Lina',
    authorRole: 'Segurança Digital',
    authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100',
    imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=1600',
  },
};

export const NOTICIAS_LISTA: NewsArticle[] = Object.values(NOTICIAS);

export function obterNoticia(id: string | undefined): NewsArticle | undefined {
  return id ? NOTICIAS[id] : undefined;
}
