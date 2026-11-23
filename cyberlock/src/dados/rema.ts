// Banco de afirmações do jogo "Rema ao Tema" (verdade ou mito).

export type Resposta = 'verdade' | 'mito' | 'depende';

export interface Afirmacao {
  id: string;
  nivel: number; // 1 a 6
  texto: string;
  resposta: Resposta;
  explicacao: string;
}

export const AFIRMACOES_POR_NIVEL = 6;
export const NIVEIS_NUMERADOS = 6;

// Modo Infinito
export const ENERGIA_INICIAL = 100;
export const ENERGIA_RECUPERADA = 3; // por acerto
export const penalidadeDoErro = (errosAnteriores: number) => 10 + 5 * errosAnteriores; // 10, 15, 20, 25...
export const duracaoInfinita = (indice: number) => Math.max(6, 15 - indice * 0.6);
export const nivelInfinito = (indice: number) => Math.min(NIVEIS_NUMERADOS, 1 + Math.floor(indice / 3));

export const AFIRMACOES: Afirmacao[] = [
  // ───────────── Nível 1 – Fundamentos digitais ─────────────
  { id: '1-1', nivel: 1, resposta: 'mito',
    texto: 'Trocar a senha toda semana é a melhor forma de se proteger.',
    explicacao: 'Trocas forçadas e frequentes levam a senhas previsíveis (Senha1, Senha2...). Vale mais ter uma senha longa e única, e trocá-la quando houver suspeita de vazamento.' },
  { id: '1-2', nivel: 1, resposta: 'mito',
    texto: 'Usar a mesma senha em vários sites é seguro, desde que ela seja forte.',
    explicacao: 'Se um dos sites vazar a senha, criminosos a testam nos outros serviços. A força da senha não protege contra reutilização.' },
  { id: '1-3', nivel: 1, resposta: 'verdade',
    texto: 'Um gerenciador de senhas ajuda a ter uma senha forte e diferente em cada serviço.',
    explicacao: 'Ele cria e guarda as senhas por você, então você só precisa lembrar de uma senha mestra bem forte.' },
  { id: '1-4', nivel: 1, resposta: 'verdade',
    texto: 'Nome completo, CPF e data de nascimento juntos já podem ser usados em golpes de falsa identidade.',
    explicacao: 'Esses dados bastam para abrir contas, pedir crédito ou convencer uma central de atendimento de que o golpista é você.' },
  { id: '1-5', nivel: 1, resposta: 'mito',
    texto: 'Só pessoas famosas ou ricas são alvo de ataques digitais.',
    explicacao: 'A maior parte dos golpes é automatizada e atinge qualquer pessoa. Para o criminoso, o que importa é o dado e a facilidade, não quem você é.' },
  { id: '1-6', nivel: 1, resposta: 'verdade',
    texto: 'A verificação em duas etapas protege sua conta mesmo se alguém descobrir a sua senha.',
    explicacao: 'Sem o segundo fator (código do aplicativo, chave de segurança), a senha sozinha não basta para entrar.' },
  { id: '1-7', nivel: 1, resposta: 'mito',
    texto: 'Se uma conta não tem nada importante, não faz diferença se ela for invadida.',
    explicacao: 'Contas "sem importância" servem para aplicar golpes em seus contatos e, muitas vezes, estão ligadas ao seu e-mail principal.' },
  { id: '1-8', nivel: 1, resposta: 'verdade',
    texto: 'Empresas sérias não pedem sua senha por e-mail, SMS ou WhatsApp.',
    explicacao: 'Qualquer mensagem pedindo sua senha é suspeita, mesmo que use o logotipo de uma empresa conhecida.' },

  // ───────────── Nível 2 – Compartilhamento ─────────────
  { id: '2-1', nivel: 2, resposta: 'mito',
    texto: 'Postar a foto do cartão de embarque ou do ingresso é inofensivo.',
    explicacao: 'O código de barras e o QR code trazem dados da reserva e podem permitir alterações ou o uso do seu ingresso por outra pessoa.' },
  { id: '2-2', nivel: 2, resposta: 'mito',
    texto: 'Enviar foto do seu documento a quem pedir é seguro, se a pessoa parecer simpática.',
    explicacao: 'Documentos permitem fraudes em seu nome. Confirme quem pede, para quê e se o envio é mesmo necessário.' },
  { id: '2-3', nivel: 2, resposta: 'verdade',
    texto: 'Antes de informar um dado pessoal, vale perguntar para que ele será usado.',
    explicacao: 'Saber a finalidade ajuda a decidir se o pedido é razoável. Você também tem esse direito de informação garantido pela LGPD.' },
  { id: '2-4', nivel: 2, resposta: 'mito',
    texto: 'Wi-Fi público aberto é um bom lugar para acessar o aplicativo do banco.',
    explicacao: 'Redes abertas podem ser monitoradas ou imitadas por golpistas. Prefira os dados móveis para operações financeiras.' },
  { id: '2-5', nivel: 2, resposta: 'verdade',
    texto: 'Um site que só mostra receitas não precisa do seu CPF para funcionar.',
    explicacao: 'Compartilhe só o necessário para o serviço. Se o pedido não combina com a finalidade, desconfie.' },
  { id: '2-6', nivel: 2, resposta: 'verdade',
    texto: 'Mostrar publicamente a sua rotina e a sua localização em tempo real facilita golpes e perseguição.',
    explicacao: 'Essas informações revelam quando você está fora de casa e por onde costuma passar.' },
  { id: '2-7', nivel: 2, resposta: 'mito',
    texto: 'Se um conhecido pede um Pix urgente por mensagem, basta responder, pois o contato é confiável.',
    explicacao: 'A conta dele pode ter sido clonada. Ligue ou confirme por outro canal antes de transferir qualquer valor.' },
  { id: '2-8', nivel: 2, resposta: 'mito',
    texto: 'O código de verificação recebido por SMS pode ser passado ao suporte que ligar para você.',
    explicacao: 'Esse código dá acesso à sua conta. Nenhum suporte legítimo precisa dele por telefone ou mensagem.' },

  // ───────────── Nível 3 – Privacidade online ─────────────
  { id: '3-1', nivel: 3, resposta: 'verdade',
    texto: 'Você geralmente pode recusar os cookies não essenciais e continuar usando o site.',
    explicacao: 'Cookies essenciais mantêm o site funcionando, mas os de publicidade e análise normalmente podem ser recusados no aviso de cookies.' },
  { id: '3-2', nivel: 3, resposta: 'mito',
    texto: 'A janela anônima do navegador impede que seu provedor e os sites saibam o que você acessa.',
    explicacao: 'O modo anônimo apenas não guarda histórico e cookies no seu aparelho. Provedor, empregador e sites ainda enxergam o acesso.' },
  { id: '3-3', nivel: 3, resposta: 'verdade',
    texto: 'Cookies de terceiros permitem acompanhar sua navegação entre sites diferentes.',
    explicacao: 'Anunciantes usam esses cookies para montar um perfil dos seus interesses e mostrar anúncios direcionados.' },
  { id: '3-4', nivel: 3, resposta: 'mito',
    texto: 'Um aplicativo de lanterna precisa acessar seus contatos para funcionar.',
    explicacao: 'Permissões devem combinar com a função do app. Pedir contatos, localização ou microfone sem motivo é sinal de alerta.' },
  { id: '3-5', nivel: 3, resposta: 'verdade',
    texto: 'Você pode revisar e retirar as permissões dos aplicativos nas configurações do celular.',
    explicacao: 'Vale fazer essa revisão de tempos em tempos e retirar o que não for necessário.' },
  { id: '3-6', nivel: 3, resposta: 'verdade',
    texto: 'Em um serviço gratuito, os seus dados pessoais podem ser parte do pagamento.',
    explicacao: 'Muitos serviços gratuitos ganham dinheiro com publicidade direcionada, que depende da coleta de dados. Leia a política de privacidade.' },
  { id: '3-7', nivel: 3, resposta: 'mito',
    texto: 'Apagar uma publicação garante que nenhuma cópia dela continue existindo.',
    explicacao: 'Alguém pode ter feito print, baixado ou compartilhado antes. Pense bem antes de publicar.' },
  { id: '3-8', nivel: 3, resposta: 'verdade',
    texto: 'Fotos podem guardar metadados, como data e local, que ficam visíveis quando o arquivo original é enviado.',
    explicacao: 'Muitos aplicativos removem esses dados ao enviar, mas nem todos. Desative a gravação de localização nas fotos se não precisar dela.' },

  // ───────────── Nível 4 – LGPD ─────────────
  { id: '4-1', nivel: 4, resposta: 'verdade',
    texto: 'A LGPD garante ao titular o direito de saber se uma empresa trata os seus dados.',
    explicacao: 'É o direito de confirmação e acesso: você pode pedir à empresa informações sobre o tratamento dos seus dados.' },
  { id: '4-2', nivel: 4, resposta: 'mito',
    texto: 'Para tratar qualquer dado pessoal, a empresa sempre precisa do consentimento do titular.',
    explicacao: 'O consentimento é uma das bases legais. Também existem outras, como cumprir uma obrigação legal, executar um contrato ou o legítimo interesse.' },
  { id: '4-3', nivel: 4, resposta: 'mito',
    texto: 'A LGPD só vale para grandes empresas.',
    explicacao: 'Ela vale para pessoas e organizações públicas ou privadas de qualquer porte que tratam dados pessoais.' },
  { id: '4-4', nivel: 4, resposta: 'verdade',
    texto: 'O titular pode pedir a correção de dados incompletos, inexatos ou desatualizados.',
    explicacao: 'A correção é um dos direitos do titular, ligado ao princípio da qualidade dos dados.' },
  { id: '4-5', nivel: 4, resposta: 'mito',
    texto: 'A empresa pode usar seus dados para qualquer finalidade, mesmo diferente da que informou.',
    explicacao: 'O princípio da finalidade exige que o tratamento tenha propósitos legítimos, específicos e informados ao titular.' },
  { id: '4-6', nivel: 4, resposta: 'verdade',
    texto: 'A ANPD é o órgão que fiscaliza o cumprimento da LGPD no Brasil.',
    explicacao: 'A Autoridade Nacional de Proteção de Dados orienta, fiscaliza e pode aplicar sanções às empresas.' },
  { id: '4-7', nivel: 4, resposta: 'verdade',
    texto: 'Dados sobre saúde e religião são considerados sensíveis e têm regras mais rígidas de tratamento.',
    explicacao: 'Dados sensíveis (como saúde, origem racial, religião e opinião política) podem gerar discriminação, por isso exigem mais cuidado.' },
  { id: '4-8', nivel: 4, resposta: 'mito',
    texto: 'Depois de dar o consentimento, o titular não pode mais retirá-lo.',
    explicacao: 'O consentimento pode ser revogado a qualquer momento, de forma facilitada e gratuita.' },
  { id: '4-9', nivel: 4, resposta: 'verdade',
    texto: 'O encarregado (DPO) é o canal de comunicação entre a empresa, os titulares e a ANPD.',
    explicacao: 'A empresa deve divulgar a identidade e o contato do encarregado para que os titulares possam fazer solicitações.' },

  // ───────────── Nível 5 – Segurança avançada ─────────────
  { id: '5-1', nivel: 5, resposta: 'verdade',
    texto: 'Um e-mail do "banco" com um link urgente para "regularizar a conta" é um sinal clássico de phishing.',
    explicacao: 'Golpistas criam urgência para você agir sem pensar. Acesse o banco pelo aplicativo ou site oficial, não pelo link.' },
  { id: '5-2', nivel: 5, resposta: 'verdade',
    texto: 'Na criptografia de ponta a ponta, só quem participa da conversa consegue ler as mensagens.',
    explicacao: 'A mensagem é cifrada no aparelho de quem envia e só é decifrada no de quem recebe, nem o serviço consegue lê-la.' },
  { id: '5-3', nivel: 5, resposta: 'mito',
    texto: 'O código por SMS é a forma mais segura de verificação em duas etapas.',
    explicacao: 'O SMS pode ser interceptado ou desviado por clonagem de chip. Aplicativos autenticadores e chaves de segurança são mais fortes.' },
  { id: '5-4', nivel: 5, resposta: 'verdade',
    texto: 'Depois de um vazamento, trocar a senha e ativar a verificação em duas etapas nas contas afetadas é uma boa resposta.',
    explicacao: 'Isso tira o valor da senha vazada e dificulta o acesso mesmo que ela já esteja em posse de criminosos.' },
  { id: '5-5', nivel: 5, resposta: 'mito',
    texto: 'Se o site tem cadeado (HTTPS), ele com certeza é confiável.',
    explicacao: 'O cadeado indica apenas que a conexão é criptografada. Sites falsos também podem usar HTTPS.' },
  { id: '5-6', nivel: 5, resposta: 'verdade',
    texto: 'Atualizar o sistema e os aplicativos corrige falhas que atacantes costumam explorar.',
    explicacao: 'Muitas invasões usam vulnerabilidades já conhecidas e corrigidas em atualizações.' },
  { id: '5-7', nivel: 5, resposta: 'verdade',
    texto: 'Ransomware é um ataque que bloqueia seus arquivos e exige pagamento para liberá-los.',
    explicacao: 'Backups atualizados e guardados fora do computador são a melhor defesa.' },
  { id: '5-8', nivel: 5, resposta: 'mito',
    texto: 'Um pen drive achado no estacionamento pode ser plugado no computador sem riscos.',
    explicacao: 'Dispositivos deixados de propósito podem instalar programas maliciosos assim que são conectados.' },
  { id: '5-9', nivel: 5, resposta: 'verdade',
    texto: 'Uma empresa que guarda senhas em texto puro expõe todas elas se o banco de dados vazar.',
    explicacao: 'Senhas devem ser guardadas com hash e sal. Assim, mesmo com o vazamento, não podem ser lidas diretamente.' },

  // ───────────── Nível 6 – Cenários complexos (Verdade / Mito / Depende) ─────────────
  { id: '6-1', nivel: 6, resposta: 'depende',
    texto: 'Uma empresa pode tratar seus dados pessoais sem pedir o seu consentimento.',
    explicacao: 'Depende da base legal. Cumprir uma obrigação legal, executar um contrato ou proteger a vida permitem o tratamento sem consentimento, mas sempre com finalidade e necessidade.' },
  { id: '6-2', nivel: 6, resposta: 'mito',
    texto: 'Uma loja pode usar seu e-mail para enviar o código de rastreio e, sem aviso, vendê-lo a terceiros para publicidade.',
    explicacao: 'O dado foi coletado para uma finalidade (entrega). Usar para outra, como vender a terceiros, exige base legal e informação ao titular.' },
  { id: '6-3', nivel: 6, resposta: 'depende',
    texto: 'Um aplicativo que pede acesso à sua localização está sendo abusivo.',
    explicacao: 'Depende da função. Um app de mapas ou de entrega precisa da localização, já um app de lanterna não.' },
  { id: '6-4', nivel: 6, resposta: 'depende',
    texto: 'Publicar uma foto em que aparecem outras pessoas exige autorização de todas elas.',
    explicacao: 'Depende do contexto: uso pessoal em um evento aberto é diferente de uso comercial ou que exponha alguém. O direito à imagem protege contra usos indevidos, e perguntar antes é sempre a atitude mais segura.' },
  { id: '6-5', nivel: 6, resposta: 'mito',
    texto: 'Um e-mail que traz seu nome correto e os dados reais da sua compra só pode ter vindo da loja de verdade.',
    explicacao: 'Golpistas usam dados vazados para parecerem legítimos. Confira o endereço do remetente e acesse a loja pelo site oficial.' },
  { id: '6-6', nivel: 6, resposta: 'depende',
    texto: 'Em caso de vazamento, a empresa sempre precisa comunicar a ANPD e os titulares.',
    explicacao: 'A comunicação é exigida quando o incidente puder acarretar risco ou dano relevante aos titulares. A avaliação do risco faz parte da resposta da empresa.' },
  { id: '6-7', nivel: 6, resposta: 'verdade',
    texto: 'Uma empresa pode ser obrigada a manter alguns dados do cliente mesmo depois do fim da relação.',
    explicacao: 'Obrigações legais e fiscais podem exigir a guarda por um período. Fora isso, os dados devem ser eliminados quando a finalidade termina.' },
  { id: '6-8', nivel: 6, resposta: 'mito',
    texto: 'Aceitar o termo "concordo com tudo" dá à empresa liberdade para fazer qualquer coisa com seus dados.',
    explicacao: 'Consentimento genérico não é válido: ele precisa ser livre, informado, inequívoco e para finalidades determinadas.' },
  { id: '6-9', nivel: 6, resposta: 'depende',
    texto: 'Um dado anonimizado deixa de ser dado pessoal.',
    explicacao: 'Em geral sim, mas deixa de valer se o processo de anonimização puder ser revertido com esforços razoáveis, caso em que a LGPD volta a se aplicar.' },
  { id: '6-10', nivel: 6, resposta: 'verdade',
    texto: 'Um dado biométrico, como a impressão digital, vinculado a uma pessoa é considerado dado pessoal sensível.',
    explicacao: 'A LGPD lista o dado biométrico, quando vinculado a uma pessoa natural, entre os dados sensíveis.' },
];

export function embaralhar<T>(lista: T[]): T[] {
  const copia = [...lista];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

export function sortearNivel(nivel: number): Afirmacao[] {
  return embaralhar(AFIRMACOES.filter((a) => a.nivel === nivel)).slice(0, AFIRMACOES_POR_NIVEL);
}

export function proximaAfirmacaoInfinita(indice: number, usadas: string[]): Afirmacao {
  const alvo = nivelInfinito(indice);
  const nivel = Math.random() < 0.6 ? alvo : 1 + Math.floor(Math.random() * alvo);
  let candidatas = AFIRMACOES.filter((a) => a.nivel === nivel && !usadas.includes(a.id));
  if (candidatas.length === 0) candidatas = AFIRMACOES.filter((a) => !usadas.includes(a.id));
  if (candidatas.length === 0) candidatas = AFIRMACOES.filter((a) => a.nivel === nivel);
  return candidatas[Math.floor(Math.random() * candidatas.length)];
}

export const ROTULOS: Record<Resposta, string> = {
  verdade: 'Verdade',
  mito: 'Mito',
  depende: 'Depende do contexto',
};
