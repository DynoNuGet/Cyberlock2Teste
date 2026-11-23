// Banco de cenários do jogo "Golpe ou Não". Marcas e endereços são fictícios, feitos só para o jogo.

export type Canal = 'sms' | 'whatsapp' | 'email' | 'site' | 'rede' | 'ligacao' | 'app';

export interface Campo {
  rotulo: string;
  valor: string;
  revela?: string; // detalhe que o jogador descobre ao "inspecionar"
  mono?: boolean; // fonte monoespaçada (endereços)
}

export interface Cenario {
  id: string;
  nivel: number; // 1 a 6
  canal: Canal;
  contexto?: string; // situação em que a mensagem aparece
  campos: Campo[];
  golpe: boolean;
  sinais: string[]; // sinais de golpe, ou motivos para confiar
}

export const CENARIOS_POR_NIVEL = 6;
export const NIVEIS_NUMERADOS = 6;

// Modo Infinito
export const ESCUDOS_INFINITO = 5;
export const CUSTO_CAIU_NO_GOLPE = 2; // marcou "legítimo" em um golpe
export const CUSTO_BLOQUEOU_LEGITIMO = 1; // marcou "golpe" em algo legítimo
export const CUSTO_TEMPO_ESGOTADO = 1;
export const duracaoInfinita = (indice: number) => Math.max(10, 25 - indice);
export const nivelInfinito = (indice: number) => Math.min(NIVEIS_NUMERADOS, 1 + Math.floor(indice / 3));

export const ROTULOS_CANAL: Record<Canal, string> = {
  sms: 'SMS',
  whatsapp: 'WhatsApp',
  email: 'E-mail',
  site: 'Site',
  rede: 'Rede social',
  ligacao: 'Ligação',
  app: 'Aplicativo',
};

const c = (rotulo: string, valor: string, revela?: string, mono?: boolean): Campo => ({ rotulo, valor, revela, mono });

export const CENARIOS: Cenario[] = [
  // ───────────── Nível 1 – Golpes evidentes ─────────────
  { id: '1-1', nivel: 1, canal: 'sms', golpe: true,
    campos: [c('De', '+55 11 94000-1234'), c('Mensagem', 'PARABÉNS! Você foi sorteado e ganhou um celular de última geração! Para receber, pague R$ 49,90 de frete por Pix hoje.')],
    sinais: ['Prêmio de um sorteio do qual você não participou', 'Pede pagamento adiantado para entregar o "prêmio"', 'Vem de um número desconhecido e cria urgência'] },
  { id: '1-2', nivel: 1, canal: 'whatsapp', golpe: true,
    campos: [c('De', '+55 21 98888-0000 (número novo)'), c('Mensagem', 'Oi, mãe! Troquei de número, pode salvar esse. Preciso pagar uma conta hoje, me faz um Pix de R$ 1.800? Depois eu explico.')],
    sinais: ['Número desconhecido dizendo ser um parente', 'Pede dinheiro com pressa e sem explicar', 'Confirme ligando para o número antigo da pessoa'] },
  { id: '1-3', nivel: 1, canal: 'email', golpe: true,
    campos: [c('De', 'trabalho@ganhe-mais-agora.com'), c('Assunto', 'Ganhe R$ 5.000 por dia trabalhando 10 minutos de casa'), c('Mensagem', 'Vagas limitadas! Deposite R$ 200 para liberar seu acesso à plataforma e comece hoje.')],
    sinais: ['Promessa de ganho exagerado e sem esforço', 'Cobra um valor para "liberar" o acesso', 'Cria escassez ("vagas limitadas") para você não pensar'] },
  { id: '1-4', nivel: 1, canal: 'sms', golpe: false,
    contexto: 'Você acabou de pagar R$ 38,90 em uma padaria com o cartão.',
    campos: [c('De', 'Banco Aurora'), c('Mensagem', 'Compra aprovada de R$ 38,90 em PADARIA CENTRAL. Não reconhece? Ligue para o número que está no verso do seu cartão.')],
    sinais: ['Informa algo que você acabou de fazer', 'Não traz links nem pede dados ou senha', 'Orienta usar o número oficial do verso do cartão'] },
  { id: '1-5', nivel: 1, canal: 'sms', golpe: true,
    campos: [c('De', '+55 31 97777-5555'), c('Mensagem', 'Sua conta será BLOQUEADA hoje! Responda esta mensagem com seu CPF e sua senha para evitar o bloqueio.')],
    sinais: ['Bancos nunca pedem senha por mensagem', 'Ameaça de bloqueio para causar medo', 'Número de celular comum, não um canal oficial'] },
  { id: '1-6', nivel: 1, canal: 'rede', golpe: true,
    contexto: 'Um anúncio aparece no seu feed.',
    campos: [c('Anúncio', 'Notebook novo por R$ 199! Últimas 3 unidades!'), c('Pagamento', 'Somente Pix para uma conta de pessoa física')],
    sinais: ['Preço muito abaixo do mercado', 'Urgência: "últimas unidades"', 'Pagamento só por Pix para pessoa física, sem proteção ao comprador'] },
  { id: '1-7', nivel: 1, canal: 'sms', golpe: false,
    contexto: 'Você comprou um liquidificador e acompanha a entrega pelo aplicativo da loja.',
    campos: [c('De', 'Mercado Azul'), c('Mensagem', 'Seu pedido #48213 saiu para entrega e chega hoje. Acompanhe pelo app da loja, em "Meus pedidos".')],
    sinais: ['Corresponde a uma compra que você fez', 'Não pede dinheiro, dados nem cliques em links', 'Orienta acompanhar pelo aplicativo oficial'] },
  { id: '1-8', nivel: 1, canal: 'email', golpe: false,
    contexto: 'Você tentou entrar na sua conta agora há pouco.',
    campos: [c('De', 'Mercado Azul <nao-responda@mercadoazul.com.br>'), c('Mensagem', 'Seu código de verificação é 482913 e vale por 10 minutos. Se não foi você, ignore este e-mail e nunca compartilhe o código.')],
    sinais: ['Chegou logo depois de uma ação sua', 'Não pede para clicar em links nem informar dados', 'Avisa para não compartilhar o código'] },

  // ───────────── Nível 2 – Phishing ─────────────
  { id: '2-1', nivel: 2, canal: 'email', golpe: true,
    campos: [c('De', 'Suporte Banco Aurora <atendimento@banco-aurora-seguranca.com>'), c('Assunto', 'Atualize seus dados ou sua conta será encerrada'), c('Mensagem', 'Prezado cliente, identificamos inconsistências no seu cadastro. Atualize em até 24 horas.'),
      c('Link', 'Atualizar cadastro agora', 'Endereço real: http://banco-aurora-seguranca.com/login. Não é o site oficial (banco-aurora.com.br).')],
    sinais: ['Domínio do remetente diferente do site oficial do banco', 'Ameaça de encerrar a conta e prazo curto', 'O link leva a uma página fora do domínio oficial'] },
  { id: '2-2', nivel: 2, canal: 'site', golpe: false,
    contexto: 'Você digitou o endereço do seu banco diretamente no navegador.',
    campos: [c('Endereço', 'https://www.banco-aurora.com.br/entrar', undefined, true), c('Página', 'Pede agência, conta e senha. Não pede o número completo do cartão.')],
    sinais: ['O domínio é o oficial e foi digitado por você', 'Você não chegou por um link de mensagem', 'Não pede dados fora do normal para fazer login'] },
  { id: '2-3', nivel: 2, canal: 'email', golpe: true,
    campos: [c('De', 'Correios <rastreio@correios-entrega.info>'), c('Assunto', 'Encomenda retida: taxa de R$ 7,90'), c('Mensagem', 'Pague a taxa para liberar sua encomenda ou ela será devolvida.'),
      c('Link', 'Pagar taxa agora', 'Endereço real: pagamento-correios-taxa.xyz', true)],
    sinais: ['Remetente e link usam domínios (.info e .xyz) que não são os oficiais', 'Cobra uma taxa pequena para parecer inofensiva', 'Ameaça devolver a encomenda'] },
  { id: '2-4', nivel: 2, canal: 'site', golpe: true,
    contexto: 'Você chegou a esta página por um link recebido em uma mensagem.',
    campos: [c('Endereço', 'https://banco-aurora.com.br.verificar-conta.net/entrar', undefined, true), c('Página', 'Pede CPF, senha, número completo do cartão e código CVV')],
    sinais: ['O domínio verdadeiro é o que vem antes da primeira barra: verificar-conta.net', 'O nome do banco aparece só no começo, para enganar', 'Pede cartão completo e CVV só para entrar'] },
  { id: '2-5', nivel: 2, canal: 'email', golpe: false,
    contexto: 'Você fez um pedido na loja hoje cedo.',
    campos: [c('De', 'Mercado Azul <noreply@mercadoazul.com.br>'), c('Assunto', 'Confirmação do pedido #7781'), c('Mensagem', 'Recebemos seu pedido. Você pode acompanhá-lo em Minha conta. Não é necessário responder.'),
      c('Link', 'Acompanhar pedido', 'Endereço real: https://www.mercadoazul.com.br/minha-conta/pedidos')],
    sinais: ['Corresponde a uma compra sua', 'Remetente e link no domínio oficial da loja', 'Não pede dados nem pagamento'] },
  { id: '2-6', nivel: 2, canal: 'sms', golpe: true,
    campos: [c('De', '+55 61 96666-0000'), c('Mensagem', 'Receita Federal: restituição de IR disponível para o seu CPF. Resgate agora:'), c('Link', 'receita-restituicao.online/cpf', undefined, true)],
    sinais: ['Órgãos públicos não pedem dados por links em SMS', 'O domínio .online não é gov.br', 'Consulte restituição só pelo site ou aplicativo oficial'] },
  { id: '2-7', nivel: 2, canal: 'email', golpe: true,
    campos: [c('De', 'Cobrança <financeiro@empresa-xyz.com>'), c('Assunto', 'Fatura em atraso'), c('Anexo', 'Fatura_Maio.pdf.exe', 'O arquivo termina em .exe: é um programa, não um PDF. Abri-lo pode instalar um vírus.', true)],
    sinais: ['A extensão dupla (.pdf.exe) disfarça um programa', 'Cobrança que você não esperava', 'Remetente genérico, sem identificação clara'] },
  { id: '2-8', nivel: 2, canal: 'email', golpe: false,
    contexto: 'Você clicou em "Esqueci minha senha" agora há pouco.',
    campos: [c('De', 'Mercado Azul <seguranca@mercadoazul.com.br>'), c('Mensagem', 'Use o botão abaixo para criar uma nova senha. O link vale por 30 minutos.'),
      c('Link', 'Criar nova senha', 'Endereço real: https://www.mercadoazul.com.br/redefinir-senha')],
    sinais: ['Você mesmo pediu a redefinição', 'Link no domínio oficial', 'Não pede a senha atual por e-mail'] },

  // ───────────── Nível 3 – Engenharia social ─────────────
  { id: '3-1', nivel: 3, canal: 'ligacao', golpe: true,
    campos: [c('Quem liga', '"Setor de segurança" do seu banco'), c('Fala', 'Detectamos uma compra suspeita no seu cartão. Para cancelar, informe agora o código que chegou por SMS.')],
    sinais: ['Pede um código de verificação, que dá acesso à sua conta', 'Cria urgência para você não pensar', 'Banco de verdade não pede códigos nem senhas por telefone'] },
  { id: '3-2', nivel: 3, canal: 'whatsapp', golpe: true,
    contexto: 'A foto do perfil é a do seu chefe, mas o número é novo.',
    campos: [c('De', '+55 11 95555-0101'), c('Mensagem', 'Preciso de um favor urgente e sigiloso. Compre 5 cartões-presente de R$ 200 e me mande os códigos. Não conte a ninguém.')],
    sinais: ['Falsa autoridade usando a foto de uma pessoa real', 'Pede sigilo para você não confirmar com ninguém', 'Pede cartões-presente, difíceis de rastrear'] },
  { id: '3-3', nivel: 3, canal: 'ligacao', golpe: true,
    campos: [c('Quem liga', '"Delegado da Polícia Federal"'), c('Fala', 'Seu CPF foi usado em um crime. Para evitar a prisão, transfira seu dinheiro agora para uma "conta segura".')],
    sinais: ['Falsa autoridade e ameaça de prisão', 'A polícia não pede transferência de dinheiro', 'Pressão para agir sem consultar ninguém'] },
  { id: '3-4', nivel: 3, canal: 'email', golpe: true,
    campos: [c('De', 'RH <beneficios@rh-empresa-portal.com>'), c('Assunto', 'Último dia: atualize seus dados ou perca o vale-alimentação'), c('Mensagem', 'Preencha o formulário em até 2 horas.'),
      c('Link', 'Abrir formulário', 'Endereço real: http://rh-empresa-portal.com/formulario. Fora do domínio da sua empresa.')],
    sinais: ['Prazo de 2 horas cria pressão', 'Ameaça de perder um benefício', 'Link fora do domínio da empresa'] },
  { id: '3-5', nivel: 3, canal: 'ligacao', golpe: false,
    contexto: 'Mais cedo, você abriu um chamado pelo aplicativo do banco.',
    campos: [c('Quem liga', 'Banco Aurora'), c('Fala', 'Estou retornando o seu chamado, protocolo 2026-884. Não vou pedir senha nem códigos. Se preferir, desligue e retorne pelo número do seu cartão.')],
    sinais: ['A ligação responde a um contato que você iniciou', 'Cita um protocolo e não pede senhas nem códigos', 'Oferece desligar e ligar para o número oficial'] },
  { id: '3-6', nivel: 3, canal: 'whatsapp', golpe: true,
    campos: [c('De', '+55 85 94444-7878 (número novo)'), c('Mensagem', 'Oi, vó, sou eu! Caí com o celular e estou com outro número. Faz um Pix para mim? Não liga, estou sem sinal.')],
    sinais: ['Número novo e história de emergência', 'Impede você de ligar para confirmar', 'Apela para o afeto para você agir rápido'] },
  { id: '3-7', nivel: 3, canal: 'email', golpe: false,
    contexto: 'Sua empresa costuma avisar manutenções por e-mail do TI.',
    campos: [c('De', 'TI <ti@minhaempresa.com.br>'), c('Mensagem', 'Haverá manutenção programada no sistema neste sábado, das 8h às 12h. Você não precisa fazer nada. Dúvidas? Abra um chamado no portal interno.')],
    sinais: ['Só informa, sem exigir ação ou dados', 'Sem pressa, ameaça ou prazo curto', 'Orienta usar o canal interno que você já conhece'] },
  { id: '3-8', nivel: 3, canal: 'sms', golpe: true,
    campos: [c('De', 'INSS'), c('Mensagem', 'Seu benefício será CANCELADO em 24 horas. Ligue agora para 0800 000 0000 e confirme seus dados.')],
    sinais: ['Ameaça de cancelamento em 24 horas', 'Pede confirmação de dados por telefone', 'Para saber da situação, use o site ou o aplicativo oficial'] },
  { id: '3-9', nivel: 3, canal: 'app', golpe: false,
    contexto: 'Mensagem no aplicativo oficial da escola do seu filho.',
    campos: [c('De', 'Coordenação'), c('Mensagem', 'Reunião de pais na quinta, às 19h. Confirme sua presença pelo aplicativo, se puder.')],
    sinais: ['Vem por um canal oficial e conhecido', 'Sem urgência, ameaça ou pedido de dinheiro', 'Pedido simples e coerente com a rotina da escola'] },

  // ───────────── Nível 4 – Fraudes digitais ─────────────
  { id: '4-1', nivel: 4, canal: 'site', golpe: true,
    campos: [c('Endereço', 'megaofertasbr.shop', 'Domínio registrado há 6 dias, sem CNPJ nem endereço físico.', true), c('Oferta', 'TV 55" por R$ 799 (preço normal: R$ 3.200). Só hoje!'), c('Pagamento', 'Pix com 20% de desconto')],
    sinais: ['Preço absurdamente baixo', 'Site novo e sem CNPJ ou endereço', 'Estimula o Pix com desconto extra'] },
  { id: '4-2', nivel: 4, canal: 'rede', golpe: true,
    contexto: 'Você viu um celular seminovo à venda em um marketplace.',
    campos: [c('Anúncio', 'Celular seminovo por R$ 1.100'), c('Vendedor', 'Pague adiantado por Pix que eu envio hoje. Não uso o chat da plataforma, vamos falar pelo WhatsApp.')],
    sinais: ['Quer sair da plataforma, que protege a compra', 'Exige pagamento antes de qualquer garantia', 'Preço atrativo e pressa'] },
  { id: '4-3', nivel: 4, canal: 'site', golpe: false,
    contexto: 'Você pesquisou o produto em vários lugares e o preço é parecido.',
    campos: [c('Endereço', 'https://www.mercadoazul.com.br', undefined, true), c('Rodapé', 'CNPJ, endereço e canais de atendimento'), c('Pagamento', 'Cartão em até 10x, boleto e Pix')],
    sinais: ['Preço compatível com o mercado', 'Empresa identificável, com CNPJ e atendimento', 'Aceita cartão, que oferece mais proteção ao comprador'] },
  { id: '4-4', nivel: 4, canal: 'whatsapp', golpe: true,
    contexto: 'Um amigo seu manda esta mensagem, sem nenhuma conversa antes.',
    campos: [c('De', 'Pedro (amigo)'), c('Mensagem', 'Olha esse vídeo seu!!!'), c('Link', 'bit.ly/3xVid-eo', 'Link encurtado: leva a um site que rouba o login da sua rede social.', true)],
    sinais: ['Mensagem genérica com link, sem contexto', 'Contas invadidas mandam o mesmo link para todos os contatos', 'Link encurtado esconde o destino; confirme com seu amigo por outro canal'] },
  { id: '4-5', nivel: 4, canal: 'email', golpe: true,
    contexto: 'Você recebeu a conta de luz por e-mail.',
    campos: [c('Valor', 'R$ 187,40'), c('Beneficiário', 'João P. Silva', 'O beneficiário de uma conta de luz deve ser a distribuidora, nunca uma pessoa física. O boleto foi adulterado.'), c('Vencimento', 'Amanhã')],
    sinais: ['O beneficiário é uma pessoa física', 'Um boleto adulterado leva o dinheiro para o golpista', 'Confira o beneficiário no app do banco antes de pagar'] },
  { id: '4-6', nivel: 4, canal: 'app', golpe: false,
    contexto: 'Você está no caixa de uma loja física e o QR code aparece na tela da maquininha.',
    campos: [c('Ao ler o QR code', 'O aplicativo do seu banco mostra "Loja Central LTDA — R$ 54,90"')],
    sinais: ['QR code mostrado na hora, pelo próprio caixa', 'O aplicativo mostra o nome do recebedor e o valor', 'Loja e valor conferem com a sua compra'] },
  { id: '4-7', nivel: 4, canal: 'rede', golpe: true,
    campos: [c('Vaga', 'Digitador remoto: ganhe R$ 3.500 por mês, sem experiência'), c('Condição', 'Para começar, compre o kit de trabalho por R$ 150.')],
    sinais: ['Salário alto para pouco esforço', 'Cobra do candidato para começar', 'Empresa séria não pede pagamento a quem quer trabalhar'] },
  { id: '4-8', nivel: 4, canal: 'email', golpe: false,
    contexto: 'Você assinou o Streaming Mais há alguns meses.',
    campos: [c('De', 'Streaming Mais <avisos@streamingmais.com.br>'), c('Mensagem', 'Sua assinatura renova em 3 dias por R$ 29,90. Para alterar ou cancelar, entre na sua conta pelo aplicativo.')],
    sinais: ['Corresponde a um serviço que você contratou', 'O valor é o mesmo que você já paga', 'Orienta acessar pelo aplicativo e não pede dados de cartão'] },
  { id: '4-9', nivel: 4, canal: 'whatsapp', golpe: true,
    campos: [c('De', 'Número desconhecido'), c('Mensagem', 'Fiz um Pix para você por engano! Pode devolver para esta outra conta? É a do meu irmão.'), c('Comprovante', 'Imagem enviada pelo contato')],
    sinais: ['Pede devolução para uma conta diferente da que pagou', 'O comprovante pode ser falso: confira no seu aplicativo', 'A devolução correta é feita pelo app do banco, na própria transação'] },

  // ───────────── Nível 5 – Golpes sofisticados ─────────────
  { id: '5-1', nivel: 5, canal: 'sms', golpe: true,
    contexto: 'A mensagem aparece na mesma conversa onde você já recebeu avisos reais do banco.',
    campos: [c('De', 'Banco Aurora'), c('Mensagem', 'Detectamos um acesso em novo dispositivo (Recife - PE). Se não foi você, conteste agora:'),
      c('Link', 'banco-aurora.com.br-seguro.app/contestar', 'O domínio verdadeiro é "seguro.app", não o do banco.', true)],
    sinais: ['Golpistas conseguem inserir SMS na conversa verdadeira do banco', 'O domínio real do link termina em seguro.app', 'Cria susto para você clicar sem conferir'] },
  { id: '5-2', nivel: 5, canal: 'email', golpe: true,
    contexto: 'Você não comprou nada recentemente.',
    campos: [c('De', 'Faturamento <pedidos@loja-eletro-pay.com>'), c('Mensagem', 'Olá, Ana Lima! Seu pedido #3392 (Fone Bluetooth Pro) foi cobrado em R$ 1.499,00. Se não reconhece a compra, ligue para 0800 000 0000.')],
    sinais: ['Usa o seu nome para parecer legítimo', 'Cobra uma compra que você não fez', 'Pede para ligar para um número do e-mail, onde o golpista pede seus dados'] },
  { id: '5-3', nivel: 5, canal: 'email', golpe: false,
    contexto: 'Você entrou na sua conta agora há pouco, pelo seu notebook.',
    campos: [c('De', 'Mercado Azul <seguranca@mercadoazul.com.br>'), c('Mensagem', 'Novo login detectado: Chrome no Windows, São Paulo. Se foi você, ignore. Se não foi, acesse sua conta pelo site oficial e troque a senha.'),
      c('Link', 'Revisar atividade', 'Endereço real: https://conta.mercadoazul.com.br/seguranca')],
    sinais: ['Descreve exatamente a sua atividade recente', 'Domínio oficial no remetente e no link', 'Orienta acessar pelo site oficial, sem pedir dados'] },
  { id: '5-4', nivel: 5, canal: 'whatsapp', golpe: true,
    campos: [c('Perfil', '"Atendimento Banco Aurora"'), c('Número', '+55 21 98000-1122', 'Número de celular pessoal, perfil sem selo de verificação e criado recentemente. Os canais oficiais não funcionam assim.'),
      c('Mensagem', 'Para evitar o bloqueio do seu Pix, confirme seu CPF e o código que enviamos.')],
    sinais: ['Perfil copiado, com o logotipo do banco', 'Número pessoal e sem verificação', 'Pede o código enviado por SMS'] },
  { id: '5-5', nivel: 5, canal: 'email', golpe: true,
    contexto: 'Você está negociando um contrato com o Rafael, da Empresa Parceira.',
    campos: [c('De', 'Rafael Lima <rafael.lima@empresaparceira.co>', 'O domínio oficial é empresaparceira.com.br. Este termina em .co.'), c('Mensagem', 'Oi! Segue o contrato revisado para a sua assinatura.'),
      c('Link', 'Abrir contrato', 'Leva a uma página falsa de login de e-mail.')],
    sinais: ['Domínio parecido com o verdadeiro, mas diferente', 'Usa um contexto real para parecer natural', 'O link abre uma página que pede seu login'] },
  { id: '5-6', nivel: 5, canal: 'email', golpe: false,
    contexto: 'Todo mês a sua contabilidade envia o boleto do imposto, e você confere o valor e o código no portal oficial.',
    campos: [c('De', 'Contabilidade Prado <contato@contabilidadeprado.com.br>'), c('Anexo', 'DAS_novembro.pdf'), c('Mensagem', 'Segue a guia do mês, com o mesmo valor do portal oficial.')],
    sinais: ['Remetente e rotina iguais aos dos outros meses', 'Você confirmou valor e código no portal oficial', 'Nenhum link nem pedido fora do comum'] },
  { id: '5-7', nivel: 5, canal: 'ligacao', golpe: true,
    contexto: 'A pessoa que liga tem a voz do seu filho, chorando.',
    campos: [c('Fala', 'Pai, tive um acidente e preciso de dinheiro agora. Faz um Pix para esta conta que o advogado vai passar.')],
    sinais: ['A voz pode ser clonada com inteligência artificial', 'A emoção e a urgência impedem de pensar', 'Desligue e ligue para o número que você conhece'] },
  { id: '5-8', nivel: 5, canal: 'site', golpe: true,
    contexto: 'Um aviso aparece no meio de um site que você visitava.',
    campos: [c('Aviso', 'SEU COMPUTADOR ESTÁ INFECTADO! Ligue agora para o suporte e instale o programa de acesso remoto.')],
    sinais: ['Navegadores e sites não detectam vírus desse jeito', 'Pedir acesso remoto entrega o seu computador', 'O alarme e a tela que não fecha servem para pressionar'] },
  { id: '5-9', nivel: 5, canal: 'sms', golpe: false,
    contexto: 'Você marcou uma consulta na clínica na semana passada.',
    campos: [c('De', 'Clínica Vida'), c('Mensagem', 'Sua consulta com a Dra. Ana é amanhã, às 14h. Para remarcar, ligue para o telefone do seu cadastro.')],
    sinais: ['Combina com um agendamento seu', 'Sem links nem pedido de dados ou pagamento', 'Pede ligar para o telefone que você já tem'] },

  // ───────────── Nível 6 – Investigação digital (inspecione os detalhes) ─────────────
  { id: '6-1', nivel: 6, canal: 'email', golpe: false,
    contexto: 'Você tem o pedido #7781 aberto na sua conta (conferido pelo aplicativo).',
    campos: [c('De', 'Mercado Azul <contato@mercadoazul.com.br>', 'Domínio oficial. O e-mail passou nas verificações de autenticidade.'), c('Assunto', 'Pedido #7781 cancelado'),
      c('Mensagem', 'O vendedor cancelou o pedido. O valor será estornado em até 5 dias úteis.'),
      c('Link', 'Ver detalhes do pedido', 'Endereço real: https://www.mercadoazul.com.br/pedidos/7781')],
    sinais: ['O número do pedido confere com o da sua conta', 'Remetente e link no domínio oficial', 'Informa um estorno, sem pedir dados nem pagamento'] },
  { id: '6-2', nivel: 6, canal: 'email', golpe: true,
    campos: [c('De', 'Banco Aurora <fatura@bancoaurora.com.br>', 'O domínio oficial do banco é banco-aurora.com.br (com hífen). Este é um domínio parecido.'), c('Assunto', 'Sua fatura está disponível'),
      c('Anexo', 'fatura.html', 'Arquivo HTML: ao abrir, mostra uma página falsa que pede seus dados.', true), c('Link', 'Segunda via', 'Endereço real: http://fatura-aurora.info/2via')],
    sinais: ['O domínio do remetente não é o oficial', 'Anexo HTML abre uma página falsa', 'O link leva a um domínio .info sem relação com o banco'] },
  { id: '6-3', nivel: 6, canal: 'whatsapp', golpe: true,
    campos: [c('De', '"RH Empresa"', 'Número de celular pessoal, que não está na lista de contatos do RH.'), c('Foto', 'Logotipo da sua empresa', 'Qualquer pessoa pode usar um logotipo como foto de perfil.'),
      c('Mensagem', 'Olá! Estamos fazendo o recadastramento. Preencha seus dados para continuar recebendo o benefício.'),
      c('Link', 'Formulário de recadastramento', 'Endereço real: formulario-rh-recadastro.com. Não é da sua empresa.')],
    sinais: ['Número pessoal fingindo ser um setor da empresa', 'Foto e logotipo não provam nada', 'Link fora do domínio da empresa, com ameaça de perder benefício'] },
  { id: '6-4', nivel: 6, canal: 'site', golpe: false,
    campos: [c('Endereço', 'https://www.lojasestrela.com.br', 'Domínio registrado há 11 anos.', true), c('Preço', 'R$ 2.899 (média do mercado: R$ 2.950)'),
      c('Empresa', 'CNPJ e endereço no rodapé', 'O CNPJ está ativo e o endereço confere nos dados públicos da empresa.'),
      c('Reclamações', 'Nota 8,4 em site de reclamações', 'A empresa responde à maioria das reclamações.')],
    sinais: ['Domínio antigo e empresa verificável', 'Preço coerente com o mercado', 'Histórico público de atendimento'] },
  { id: '6-5', nivel: 6, canal: 'email', golpe: true,
    campos: [c('De', 'Pontos+ <promocoes@pontosmais.com.br>', 'O domínio é o oficial, mas o campo "Responder para" é premios@pontosmais-resgate.com.'), c('Assunto', 'Seus pontos vencem hoje! Resgate um prêmio'),
      c('Mensagem', 'Informe seu CPF para resgatar.'), c('Link', 'Resgatar prêmio', 'Endereço real: https://pontosmais-resgate.com/cpf')],
    sinais: ['O remetente parece oficial, mas a resposta e o link vão para outro domínio', 'Urgência de prazo', 'Pede CPF em uma página que não é do programa'] },
  { id: '6-6', nivel: 6, canal: 'sms', golpe: true,
    contexto: 'Você não está esperando nenhuma encomenda.',
    campos: [c('De', 'Transportadora Ligeirinho', 'O nome do remetente pode ser falsificado. O aviso não cita número de pedido nem de rastreio.'), c('Mensagem', 'Falha na entrega! Reagende agora:'),
      c('Link', 'ligeirinho-reagendar.com/xyz', 'Domínio criado há 2 dias, sem relação com a transportadora.', true)],
    sinais: ['Você não espera nenhuma entrega', 'Aviso genérico, sem número de pedido', 'Domínio novo e sem relação com a transportadora'] },
  { id: '6-7', nivel: 6, canal: 'email', golpe: false,
    contexto: 'A taxa do condomínio chega todo mês por esta administradora, e o valor é o de sempre.',
    campos: [c('De', 'Administradora Predial <boletos@admpredial.com.br>', 'Mesmo remetente dos meses anteriores.'),
      c('Anexo', 'boleto_novembro.pdf', 'Beneficiário: Condomínio Edifício Aurora, com o mesmo CNPJ dos boletos anteriores.'),
      c('Mensagem', 'Segue o boleto de novembro. Dúvidas, ligue para a administração.')],
    sinais: ['Remetente e rotina iguais aos dos meses anteriores', 'Beneficiário e CNPJ conferem', 'Sem links nem urgência'] },
  { id: '6-8', nivel: 6, canal: 'rede', golpe: true,
    campos: [c('Perfil', 'Clínica Vida Oficial', 'Perfil criado há 9 dias, com 120 seguidores e sem selo. O perfil verdadeiro tem 48 mil seguidores e está no site da clínica.'),
      c('Mensagem', 'Promoção relâmpago: consulta por R$ 29! Envie os dados do seu cartão para reservar sua vaga.'), c('Pagamento', 'Dados do cartão por mensagem direta')],
    sinais: ['Perfil novo e com poucos seguidores se passando pela clínica', 'Promoção relâmpago com preço muito baixo', 'Pede dados de cartão por mensagem'] },
];

export function embaralhar<T>(lista: T[]): T[] {
  const copia = [...lista];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

export function sortearNivel(nivel: number): Cenario[] {
  return embaralhar(CENARIOS.filter((x) => x.nivel === nivel)).slice(0, CENARIOS_POR_NIVEL);
}

export function proximoCenarioInfinito(indice: number, usados: string[]): Cenario {
  const alvo = nivelInfinito(indice);
  const nivel = Math.random() < 0.6 ? alvo : 1 + Math.floor(Math.random() * alvo);
  let candidatos = CENARIOS.filter((x) => x.nivel === nivel && !usados.includes(x.id));
  if (candidatos.length === 0) candidatos = CENARIOS.filter((x) => !usados.includes(x.id));
  if (candidatos.length === 0) candidatos = CENARIOS.filter((x) => x.nivel === nivel);
  return candidatos[Math.floor(Math.random() * candidatos.length)];
}
