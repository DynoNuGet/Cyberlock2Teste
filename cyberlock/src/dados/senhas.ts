// Banco de rodadas do jogo "Análise de senhas".
// Cada rodada tem UMA resposta correta e uma explicação que ensina o porquê.

export interface Rodada {
  id: string;
  nivel: number; // 1 a 6
  contexto?: string; // cenário ou perfil público mostrado acima da pergunta
  senha?: string; // senha exibida na "tela" do jogo
  pergunta: string;
  opcoes: string[];
  mono?: boolean; // exibe as opções em fonte monoespaçada (usado ao comparar senhas)
  correta: number; // índice em "opcoes"
  explicacao: string;
  fixa?: boolean; // true = não embaralha as opções (ex.: Sim/Não, Forte/Fraca)
}

export interface RodadaPreparada {
  rodada: Rodada;
  ordem: number[]; // ordem[i] = índice da opção exibida na posição i
}

export const RODADAS_POR_NIVEL = 6;
export const VIDAS_INFINITO = 3;
export const NIVEIS_NUMERADOS = 6;

const SIM_NAO = ['Sim, usa informação pública', 'Não, não depende do perfil'];
const FORTE_FRACA = ['Forte', 'Fraca'];

export const RODADAS: Rodada[] = [
  // ───────────── Nível 1 – Senhas fracas ─────────────
  {
    id: '1-1', nivel: 1, senha: '123456',
    pergunta: 'Por que esta senha é fraca?',
    opcoes: ['É uma sequência numérica', 'Contém nome próprio', 'Usa símbolos demais', 'Ela é forte'],
    correta: 0,
    explicacao: '"123456" é uma das senhas mais usadas do mundo. Sequências numéricas são as primeiras que um atacante testa.',
  },
  {
    id: '1-2', nivel: 1, senha: 'senha',
    pergunta: 'Por que esta senha é fraca?',
    opcoes: ['É uma palavra comum', 'É uma sequência numérica', 'É longa demais', 'Ela é forte'],
    correta: 0,
    explicacao: 'Palavras como "senha", "admin" ou "login" estão no topo de qualquer lista de ataque por dicionário.',
  },
  {
    id: '1-3', nivel: 1, senha: 'qwerty',
    pergunta: 'Por que esta senha é fraca?',
    opcoes: ['Segue a ordem das teclas do teclado', 'Contém data de nascimento', 'Usa muitos símbolos', 'Ela é forte'],
    correta: 0,
    explicacao: '"qwerty" são as primeiras letras do teclado. Sequências de teclado são previsíveis e muito testadas.',
  },
  {
    id: '1-4', nivel: 1, senha: 'Ab3',
    pergunta: 'Por que esta senha é fraca?',
    opcoes: ['É muito curta', 'É uma palavra comum', 'É uma sequência numérica', 'Ela é forte'],
    correta: 0,
    explicacao: 'Com apenas 3 caracteres, existem poucas combinações possíveis e um computador testa todas em instantes.',
  },
  {
    id: '1-5', nivel: 1, senha: '11111111',
    pergunta: 'Por que esta senha é fraca?',
    opcoes: ['Repete o mesmo caractere', 'É uma palavra comum', 'Contém nome de pessoa', 'Ela é forte'],
    correta: 0,
    explicacao: 'Ter 8 caracteres não basta: repetir o mesmo número deixa a senha totalmente previsível.',
  },
  {
    id: '1-6', nivel: 1, senha: 'password',
    pergunta: 'Por que esta senha é fraca?',
    opcoes: ['É uma palavra comum', 'É muito longa', 'Contém símbolos', 'Ela é forte'],
    correta: 0,
    explicacao: '"password" é a palavra mais óbvia em inglês e aparece em todos os dicionários de ataque.',
  },
  {
    id: '1-7', nivel: 1, senha: 'Qm7!vTz2#pLx9',
    pergunta: 'Esta senha tem algum problema de padrão?',
    opcoes: ['Muito curta', 'Sequência numérica', 'Palavra comum', 'Ela é forte'],
    correta: 3,
    explicacao: 'São 13 caracteres sem palavras, sequências ou repetições. Mesmo assim, use-a só em um serviço.',
  },
  {
    id: '1-8', nivel: 1, senha: 'Vb4%nT7!eRw2Lq',
    pergunta: 'Esta senha tem algum problema de padrão?',
    opcoes: ['Sequência de teclado', 'Palavra comum', 'Muito curta', 'Ela é forte'],
    correta: 3,
    explicacao: 'Longa e aleatória: nenhum padrão óbvio para o atacante explorar.',
  },

  // ───────────── Nível 2 – Informações pessoais ─────────────
  {
    id: '2-1', nivel: 2, fixa: true,
    contexto: 'Perfil público de Marina: aniversário em 14/03/1998 e um cachorro chamado Thor.',
    senha: 'Thor1403',
    pergunta: 'Um estranho conseguiria adivinhar esta senha olhando o perfil?',
    opcoes: SIM_NAO, correta: 0,
    explicacao: 'Nome do pet + dia e mês do aniversário: tudo está no perfil. Dados pessoais públicos nunca devem virar senha.',
  },
  {
    id: '2-2', nivel: 2, fixa: true,
    contexto: 'Perfil público de Carlos: torcedor do Corinthians, que foi fundado em 1910.',
    senha: 'Corinthians1910',
    pergunta: 'Um estranho conseguiria adivinhar esta senha olhando o perfil?',
    opcoes: SIM_NAO, correta: 0,
    explicacao: 'Time do coração + ano de fundação é uma combinação que qualquer pessoa testaria.',
  },
  {
    id: '2-3', nivel: 2, fixa: true,
    contexto: 'Perfil público de Beatriz: marca a mãe, Lúcia, nas fotos e mostra a casa, número 120.',
    senha: 'Lucia120',
    pergunta: 'Um estranho conseguiria adivinhar esta senha olhando o perfil?',
    opcoes: SIM_NAO, correta: 0,
    explicacao: 'Nome de familiar + número da casa. Redes sociais entregam esses dados de graça.',
  },
  {
    id: '2-4', nivel: 2, fixa: true,
    contexto: 'Perfil público de Rafael: posta fotos de uma viagem a Lisboa e informa que nasceu em 2001.',
    senha: 'Lisboa2001',
    pergunta: 'Um estranho conseguiria adivinhar esta senha olhando o perfil?',
    opcoes: SIM_NAO, correta: 0,
    explicacao: 'Lugar favorito + ano de nascimento. Basta uma olhada no perfil para montar essa senha.',
  },
  {
    id: '2-5', nivel: 2, fixa: true,
    contexto: 'Perfil público de Júlia: nasceu em 05/07/1999 e tem uma gata chamada Mel.',
    senha: 'R7$kd!Qw9zT2',
    pergunta: 'Um estranho conseguiria adivinhar esta senha olhando o perfil?',
    opcoes: SIM_NAO, correta: 1,
    explicacao: 'Nada nessa senha se liga ao perfil da Júlia: ela é aleatória e não usa dados pessoais.',
  },
  {
    id: '2-6', nivel: 2, fixa: true,
    contexto: 'Perfil público de Júlia: nasceu em 05/07/1999 e tem uma gata chamada Mel.',
    senha: 'Mel0507',
    pergunta: 'Um estranho conseguiria adivinhar esta senha olhando o perfil?',
    opcoes: SIM_NAO, correta: 0,
    explicacao: 'Nome da gata + dia e mês do aniversário. Trocar a ordem dos dados não esconde a informação.',
  },
  {
    id: '2-7', nivel: 2, fixa: true,
    contexto: 'Perfil público de Pedro: faz aniversário em 22/11/2000 e comenta muito sobre futebol.',
    senha: 'pk3-Hu8+Wm1cLa',
    pergunta: 'Um estranho conseguiria adivinhar esta senha olhando o perfil?',
    opcoes: SIM_NAO, correta: 1,
    explicacao: 'Não há nome, data ou assunto do perfil na senha. Informações pessoais ficam fora dela.',
  },
  {
    id: '2-8', nivel: 2, fixa: true,
    contexto: 'Perfil público de Ana Souza: informa que nasceu em 2003 e usa o nome completo em todas as redes.',
    senha: 'AnaSouza2003',
    pergunta: 'Um estranho conseguiria adivinhar esta senha olhando o perfil?',
    opcoes: SIM_NAO, correta: 0,
    explicacao: 'Nome completo + ano de nascimento: exatamente o que o perfil já mostra.',
  },

  // ───────────── Nível 3 – Complexidade ─────────────
  {
    id: '3-1', nivel: 3, fixa: true, senha: 'P@ssw0rd!',
    pergunta: 'Esta senha é forte ou fraca?',
    opcoes: FORTE_FRACA, correta: 1,
    explicacao: 'Tem maiúscula, número e símbolo, mas é "password" com trocas óbvias (@ por a, 0 por o). Essas trocas já estão nas listas de ataque.',
  },
  {
    id: '3-2', nivel: 3, fixa: true, senha: 'Brasil2026!',
    pergunta: 'Esta senha é forte ou fraca?',
    opcoes: FORTE_FRACA, correta: 1,
    explicacao: 'Palavra comum + ano + símbolo no final é um padrão que atacantes testam automaticamente.',
  },
  {
    id: '3-3', nivel: 3, fixa: true, senha: 'chuva fina na janela do onibus',
    pergunta: 'Esta senha é forte ou fraca?',
    opcoes: FORTE_FRACA, correta: 0,
    explicacao: 'Só tem letras minúsculas, mas é longa e difícil de adivinhar. O tamanho pesa mais do que a variedade de símbolos.',
  },
  {
    id: '3-4', nivel: 3, fixa: true, senha: 'Qm7!vTz2#pLx9',
    pergunta: 'Esta senha é forte ou fraca?',
    opcoes: FORTE_FRACA, correta: 0,
    explicacao: 'Aqui a complexidade vem junto com aleatoriedade e tamanho, e é isso que a torna forte.',
  },
  {
    id: '3-5', nivel: 3, fixa: true, senha: 'Senha@123',
    pergunta: 'Esta senha é forte ou fraca?',
    opcoes: FORTE_FRACA, correta: 1,
    explicacao: 'Cumpre todas as "regras" de cadastro (maiúscula, símbolo, número), mas é palavra comum + sequência 123.',
  },
  {
    id: '3-6', nivel: 3, fixa: true, senha: 'Admin#2024',
    pergunta: 'Esta senha é forte ou fraca?',
    opcoes: FORTE_FRACA, correta: 1,
    explicacao: '"Admin" é um dos primeiros termos testados. Símbolo e ano no final não escondem o padrão.',
  },
  {
    id: '3-7', nivel: 3, fixa: true, senha: 'girafa vermelha toca violino',
    pergunta: 'Esta senha é forte ou fraca?',
    opcoes: FORTE_FRACA, correta: 0,
    explicacao: 'Quatro palavras sem relação entre si formam uma senha longa, fácil de lembrar e difícil de adivinhar.',
  },
  {
    id: '3-8', nivel: 3, fixa: true, senha: 'Abcd@1234',
    pergunta: 'Esta senha é forte ou fraca?',
    opcoes: FORTE_FRACA, correta: 1,
    explicacao: 'Letras em ordem alfabética, símbolo e números em sequência: tem de tudo, mas só padrões previsíveis.',
  },

  // ───────────── Nível 4 – Reutilização ─────────────
  {
    id: '4-1', nivel: 4,
    contexto: 'Lucas usa a senha abaixo no e-mail, no banco e em uma loja online. A loja sofre um vazamento e a senha é exposta.',
    senha: 'Gato@2024',
    pergunta: 'O que é mais provável que aconteça?',
    opcoes: [
      'Só a conta da loja corre risco',
      'Criminosos testam a senha no e-mail e no banco dele',
      'As outras contas são protegidas automaticamente',
      'A senha muda sozinha nos outros sites',
    ],
    correta: 1,
    explicacao: 'Criminosos testam senhas vazadas em vários serviços (credential stuffing). Quem reutiliza a senha entrega todas as contas de uma vez.',
  },
  {
    id: '4-2', nivel: 4,
    pergunta: 'Qual hábito reduz mais o risco de vazamentos em cadeia?',
    opcoes: [
      'Usar a mesma senha forte em tudo',
      'Uma senha única para cada serviço, guardada em um gerenciador',
      'Mudar só o número final da senha em cada site',
      'Anotar as senhas no celular sem proteção',
    ],
    correta: 1,
    explicacao: 'Senhas únicas impedem que um vazamento afete outros serviços. O gerenciador guarda todas por você. Variações previsíveis (Gato1, Gato2) não resolvem.',
  },
  {
    id: '4-3', nivel: 4,
    contexto: 'Você usa a mesma senha no e-mail e em um fórum antigo. O fórum avisa que houve vazamento de dados.',
    pergunta: 'Qual é a melhor primeira ação?',
    opcoes: [
      'Ignorar, o fórum é pouco importante',
      'Trocar a senha só do fórum',
      'Trocar a senha em todos os serviços onde ela foi usada, começando pelo e-mail',
      'Apagar a conta do fórum e mais nada',
    ],
    correta: 2,
    explicacao: 'A senha vazada pode ser testada em outros serviços. Comece pelo e-mail e ative a verificação em duas etapas sempre que possível.',
  },
  {
    id: '4-4', nivel: 4,
    contexto: 'Mariana usa a senha abaixo em 6 sites diferentes.',
    senha: 'Flor#Azul88',
    pergunta: 'Mesmo sendo complexa, qual é o problema?',
    opcoes: [
      'Ela é curta demais para qualquer site',
      'Um vazamento em um site expõe todos os outros cinco',
      'Sites não aceitam símbolos',
      'Nenhum, senhas complexas podem ser reutilizadas',
    ],
    correta: 1,
    explicacao: 'A força da senha não importa se o site a perde. Quando ela vaza em um lugar, vale para todos os outros em que foi usada.',
  },
  {
    id: '4-5', nivel: 4,
    pergunta: 'Por que o e-mail é a conta que mais precisa de uma senha exclusiva?',
    opcoes: [
      'Porque os links de redefinição de senha das outras contas chegam nele',
      'Porque e-mails têm muitos anúncios',
      'Porque o e-mail é sempre pago',
      'Não existe diferença entre as contas',
    ],
    correta: 0,
    explicacao: 'Quem controla o seu e-mail consegue pedir a redefinição de senha de quase todas as suas outras contas.',
  },
  {
    id: '4-6', nivel: 4,
    pergunta: 'Um site novo pede que você crie uma senha. Qual é a atitude correta?',
    opcoes: [
      'Reaproveitar a do banco, já que é forte',
      'Criar uma senha nova e única só para ele',
      'Usar a mesma e trocar apenas uma letra',
      'Usar o nome do site junto com a senha antiga',
    ],
    correta: 1,
    explicacao: 'Cada serviço deve ter a sua senha. Pequenas variações da mesma senha são fáceis de deduzir.',
  },
  {
    id: '4-7', nivel: 4,
    contexto: 'Rafa usa a senha abaixo no e-mail, na rede social e no streaming. Alguém descobre a senha do streaming.',
    senha: 'Rafa@Futebol1',
    pergunta: 'Quais contas ficam em risco?',
    opcoes: [
      'Só o streaming',
      'Só as contas gratuitas',
      'Todas as contas em que ele usa essa mesma senha',
      'Nenhuma, o streaming é separado',
    ],
    correta: 2,
    explicacao: 'Quem descobre a senha de um serviço tenta a mesma combinação nos outros.',
  },

  // ───────────── Nível 5 – Segurança real ─────────────
  {
    id: '5-1', nivel: 5, mono: true,
    pergunta: 'Qual destas senhas é mais resistente?',
    opcoes: ['X7#kq2!', 'bolo-de-cenoura-cai-no-chao'], correta: 1,
    explicacao: 'A frase-senha tem 27 caracteres, e o tamanho multiplica o número de tentativas necessárias. Fácil de lembrar e difícil de quebrar.',
  },
  {
    id: '5-2', nivel: 5, mono: true,
    pergunta: 'Qual destas senhas é mais resistente?',
    opcoes: ['Corinthians@10', 'ovelha navio xicara tempestade'], correta: 1,
    explicacao: 'A primeira junta nome de time e número. A frase usa palavras sem relação entre si e é bem mais longa.',
  },
  {
    id: '5-3', nivel: 5, mono: true,
    pergunta: 'Qual destas senhas é mais resistente?',
    opcoes: ['P@ssw0rd2026!', 'minha-bicicleta-azul-sobe-o-morro'], correta: 1,
    explicacao: 'A primeira é uma palavra óbvia com trocas previsíveis. A segunda é longa e não segue nenhum padrão de lista de ataque.',
  },
  {
    id: '5-4', nivel: 5, mono: true,
    pergunta: 'Qual destas senhas é mais resistente?',
    opcoes: ['Qm7!vTz2#pLx9', 'eu amo meu cachorro'], correta: 0,
    explicacao: 'Tamanho ajuda, mas frases comuns e previsíveis são adivinháveis. Uma frase-senha boa usa palavras aleatórias, não uma frase óbvia.',
  },
  {
    id: '5-5', nivel: 5, mono: true,
    pergunta: 'Qual destas senhas é mais resistente?',
    opcoes: ['12345678901234567890', 'tY6#nQ!w8Lp3'], correta: 1,
    explicacao: 'A primeira é longa, mas é só uma sequência numérica. Aleatoriedade vale mais do que tamanho com padrão.',
  },
  {
    id: '5-6', nivel: 5, mono: true,
    pergunta: 'Qual destas senhas é mais resistente?',
    opcoes: ['pedra-azul-tomate-guitarra-onibus', 'Pedra#Azul1'], correta: 0,
    explicacao: 'Cinco palavras aleatórias formam uma frase-senha longa. A segunda é curta e previsível, com maiúscula, símbolo e número no lugar de sempre.',
  },
  {
    id: '5-7', nivel: 5, mono: true,
    pergunta: 'Qual destas senhas é mais resistente?',
    opcoes: ['senha-senha-senha-senha', 'queijo.relogio.montanha.sapo'], correta: 1,
    explicacao: 'Repetir a mesma palavra deixa a senha longa só na aparência. Palavras diferentes e sem ligação criam combinações reais.',
  },

  // ───────────── Nível 6 – Desafio hacker ─────────────
  {
    id: '6-1', nivel: 6, senha: '1qaz2wsx',
    pergunta: 'Qual é a vulnerabilidade desta senha?',
    opcoes: ['Segue um caminho do teclado', 'Contém uma data', 'Usa nome próprio', 'Nenhuma, é forte'],
    correta: 0,
    explicacao: 'Ela percorre as colunas do teclado (1-q-a-z, 2-w-s-x). Parece embaralhada, mas é um padrão conhecido.',
  },
  {
    id: '6-2', nivel: 6, senha: 'abcabcabcabc',
    pergunta: 'Qual é a vulnerabilidade desta senha?',
    opcoes: ['Repete um bloco curto várias vezes', 'Contém uma data', 'É muito curta', 'Nenhuma, é forte'],
    correta: 0,
    explicacao: 'São 12 caracteres, mas só 3 de informação repetidos quatro vezes. Atacantes testam repetições automaticamente.',
  },
  {
    id: '6-3', nivel: 6, senha: 'drowssap',
    pergunta: 'Qual é a vulnerabilidade desta senha?',
    opcoes: ['Palavra comum escrita ao contrário', 'Sequência numérica', 'Contém nome pessoal', 'Nenhuma, é forte'],
    correta: 0,
    explicacao: '"drowssap" é "password" invertida. Listas de ataque incluem palavras comuns também ao contrário.',
  },
  {
    id: '6-4', nivel: 6, senha: 'Verao2026!',
    pergunta: 'Qual é a vulnerabilidade desta senha?',
    opcoes: ['Palavra + ano atual + símbolo no final', 'Segue um caminho do teclado', 'É uma sequência numérica', 'Nenhuma, é forte'],
    correta: 0,
    explicacao: 'É o padrão típico de quem troca a senha por estação ou ano. Atacantes testam "Palavra + ano + símbolo" em massa.',
  },
  {
    id: '6-5', nivel: 6, senha: 's3nh4F0rt3',
    pergunta: 'Qual é a vulnerabilidade desta senha?',
    opcoes: ['Troca letras por números parecidos em palavras comuns', 'Repete um bloco', 'Segue um caminho do teclado', 'Nenhuma, é forte'],
    correta: 0,
    explicacao: '"senhaForte" com 3, 4 e 0 no lugar de e, a e o. Essas substituições são testadas por qualquer ferramenta de ataque.',
  },
  {
    id: '6-6', nivel: 6, senha: 'Maria1998Maria',
    pergunta: 'Qual é a vulnerabilidade desta senha?',
    opcoes: ['Nome e ano de nascimento repetindo o nome', 'Segue um caminho do teclado', 'É palavra escrita ao contrário', 'Nenhuma, é forte'],
    correta: 0,
    explicacao: 'Repetir o nome deixa a senha mais longa, mas ela continua formada por dados pessoais fáceis de adivinhar.',
  },
  {
    id: '6-7', nivel: 6, senha: '7vN!qL2#xP8z',
    pergunta: 'Qual é a vulnerabilidade desta senha?',
    opcoes: ['Segue um caminho do teclado', 'Contém palavra do dicionário', 'Nenhuma vulnerabilidade evidente', 'Repete um bloco'],
    correta: 2,
    explicacao: 'Caracteres aleatórios, sem palavras e sem repetições. Nem toda senha do desafio é fraca: o segredo é saber diferenciar.',
  },
  {
    id: '6-8', nivel: 6, senha: 'Admin2026#',
    pergunta: 'Qual é a vulnerabilidade desta senha?',
    opcoes: ['Termo padrão de sistemas + ano + símbolo', 'Palavra ao contrário', 'Sequência de teclado', 'Nenhuma, é forte'],
    correta: 0,
    explicacao: '"Admin" é uma das primeiras tentativas contra qualquer conta. O ano e o símbolo no final seguem o padrão mais comum.',
  },
];

export function embaralhar<T>(lista: T[]): T[] {
  const copia = [...lista];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

export function prepararRodada(rodada: Rodada): RodadaPreparada {
  const indices = rodada.opcoes.map((_, i) => i);
  return { rodada, ordem: rodada.fixa ? indices : embaralhar(indices) };
}

export function sortearNivel(nivel: number): RodadaPreparada[] {
  const pool = RODADAS.filter((r) => r.nivel === nivel);
  return embaralhar(pool).slice(0, RODADAS_POR_NIVEL).map(prepararRodada);
}

// Modo infinito: a dificuldade sobe a cada 3 rodadas e o tempo por rodada diminui.
export function nivelDaRodadaInfinita(indice: number): number {
  return Math.min(NIVEIS_NUMERADOS, 1 + Math.floor(indice / 3));
}

export function duracaoRodadaInfinita(indice: number): number {
  return Math.max(8, 20 - indice * 0.75);
}

export function proximaRodadaInfinita(indice: number, usadas: string[]): RodadaPreparada {
  const alvo = nivelDaRodadaInfinita(indice);
  // 60% das vezes sorteia do nível-alvo; nas demais, de qualquer nível até ele (revisão)
  const nivel = Math.random() < 0.6 ? alvo : 1 + Math.floor(Math.random() * alvo);
  let candidatas = RODADAS.filter((r) => r.nivel === nivel && !usadas.includes(r.id));
  if (candidatas.length === 0) candidatas = RODADAS.filter((r) => !usadas.includes(r.id));
  if (candidatas.length === 0) candidatas = RODADAS.filter((r) => r.nivel === nivel);
  return prepararRodada(candidatas[Math.floor(Math.random() * candidatas.length)]);
}
