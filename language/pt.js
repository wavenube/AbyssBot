
const translations = {
    
    afktemx: 'Cara, você quer deixar um testamento ou o quê?',
    afkdone: 'AFK configurado',
    afkdel: 'Bem-vindo/a de volta',
    afktime: 'Ausente desde',
    with: 'Razão',
    afkmsg: 'Avisarei quem mencionar você',
    afktag: 'O usuário está AFK',
    name: 'Nome',
    noMention: 'Mencione um usuário',
    userDb: 'O usuário não está em meu banco de dados',
    example: 'Exemplo',

    //-- Stick reaction
    killmsg: 'Matou',
    kismsg: 'Deu um beijo em',
    patmsg: 'Acariciou',
    slapmsg: 'Deu um tapa em',

    next: 'Próximo',
    hi: 'Olá',
    gp: 'Grupo',
    nobbot: 'Este comando só pode ser usado no bot principal',
    botqr: '*Use este Código para se tornar um Bot*\n\n1. Clique nos três pontos no canto superior direito.\n2. Toque em Dispositivos vinculados\n3. Selecione *Vincular com o número de telefone*\n\n*Nota:* O código só é válido para este número',
    recon: 'Conexão perdida...',
    sesClose: 'A conexão foi encerrada. Você precisará se reconectar manualmente enviando o *ID*',
    connet: 'Conectado com sucesso',
    connID: '*Conectado com sucesso!*\n\nEm alguns segundos, enviaremos o *Id* que você deve usar para se reconectar\n\n*NOTA:* Saia do grupo *Senna  ┃ ᴮᴼᵀ*\nGuarde este link para que você possa entrar novamente depois\nhttps://chat.whatsapp.com/IYsbScC3cMzBcakINRWJL6',
    connMsg: 'Da próxima vez que você se conectar, envie a seguinte mensagem para fazer login sem escanear outro código *QR*',
    botlist: 'Lista de Sub Bots Ativos',
    newcode: (usedPrefix) => `Ótimo! Agora você pode usar *${usedPrefix}botclone* para solicitar um novo código QR`,
    nsbot: 'Este comando é apenas para *Sub Bots Ativos*',
    msgcode: 'O novo código foi enviado em sua mensagem privada',
    stopbot: 'Bot desconectado',

    total: 'Total',
    tx: 'Transmissão',
    txdone: 'Transmissão enviada',
    cmdlist: '*LISTA DE COMANDOS*\n\n▢ *Info:* Se estiver em *negrito*, está bloqueado',
    notext: 'Digite novamente adicionando um texto',
    textSe: 'Separe o texto com um',
    reply: 'Responda a uma mensagem',
    replyImg: 'Responda a uma imagem',
    cmdSave: 'Comando salvo',

    oversizePrem: 'O tamanho do arquivo excede o limite de download',
    error: 'Ocorreu um erro, tente novamente mais tarde',
    size: 'Tamanho',
    link: 'Link',
    dev: 'Desenvolvedor',
    version: 'Versão',
    searchTo: (value, usedPrefix, command) => `Para pesquisar em ${value}:\n\n📌 Use: *${usedPrefix + command} <texto>*\n\nPara baixar a partir de URL:\n*${usedPrefix + command}* <link>`,
    search: (value) => `Digite o que deseja pesquisar em *${value}*`,
    lastUp: 'Última atualização',
    noLink: (value) => `Insira um link do(a) ${value}`,
    title: 'Título',
    noUsername: 'Digite um nome de usuário',
    username: 'Nome de usuário',
    followers: 'Seguidores',
    follows: 'Seguindo',
    bio: 'Biografia',
    posts: 'Publicações',
    aploud: 'Carregado',
    limitdl: 'O arquivo excede o limite de download',
    limitdlTe: 'Atualize para premium para poder baixar arquivos de até',
    duration: 'Duração',
    views: 'Visualizações',
    quality: 'Qualidade',
    type: 'Tipo',
    desc: 'Descrição',
    useCmd: 'Uso do comando',
    noNum: 'Insira apenas números',
    random: 'Aleatório',

    purse: 'Carteira',
    dmd: 'Diamantes',
    money: 'Moedas',
    bank: 'Banco',
    itemV: 'Para ver todos os *Itens*',
    isNan: 'A quantidade deve ser um número válido',
    voucher: 'Comprovante',
    buy: 'Comprado',
    buyCount: 'Quantidade comprada',
    spent: 'Gasto',
    buyNan: (value) => `Você não tem moedas *${value}* suficientes para comprar`,
    noItem: (usedPrefix) => `Esse item não existe:\n\n*${usedPrefix}shop* para ver os itens disponíveis`,
    noTime: 'Formato de tempo inválido',
    second: 'Segundo(s)',
    hour: 'Hora(s)',
    minute: 'Minuto(s)',
    day: 'Dia(s)',

    robCd: 'Você não pode cometer um *Crime* neste momento. Você precisa esperar',
    crime: 'Você cometeu um crime com sucesso',
    crimeAl: 'Você não foi muito cuidadoso ao entrar para roubar e ativou o alarme. Você só conseguiu levar',
    robMul: 'Oh não! Seu crime falhou e você foi multado em',
    victin: 'Víctima',
    robDo: 'Você roubou',
    tag: 'Tag',
    dailyCd: 'Você já coletou sua recompensa diária. Volte em',
    daily: 'Recompensa Diária',
    amount: 'Valor',
    dep: (value) => `Você depositou *${value}🪙* no Banco`,
    depNan: 'Você não tem dinheiro para depositar',
    resBt: 'Reinicia',
    lbTitle: 'Tabela de Classificação',
    top: 'Topo',
    lvl: 'Nivel',
    of: 'De',
    you: 'Você',
    rank: 'Classificação',
    fxp: 'Faltam pontos para subir de nível',
    lvlbfor: 'Nível anterior',
    lvlup: 'Nível atual',
    mineCd: 'Você poderá voltar para a mina em',
    mine: 'Legal! Você minerou',
  restEcon: 'A economia do bot foi restabelecida',
  shop: 'Loja',
  shopMsg: 'Você pode comprar usando',
  prem: 'Premium',
  onTransfer: 'Você está fazendo uma transferência',
  transItem: 'Itens transferíveis',
  confirm: 'Tem certeza de que deseja transferir',
  to: 'para',
  payNan: 'Saldo insuficiente para transferência',
  payCd: 'Tempo esgotado',
  cancelPay: 'Transferência cancelada',
  pay: 'Transferência de',
  payError: 'Erro ao transferir',
  wd: 'Quantas *Coins* você está tentando sacar?',
  wdYes: 'Você sacou',
  noWd: 'Você não pode sacar mais do que tem no banco',
  weeklyCd: 'É a recompensa semanal 😉. Volte em',
  weekly: '*RECOMPENSA SEMANAL*\n\nJá se passou uma semana? De qualquer forma, aqui está',
  workCd: 'Você poderá voltar a trabalhar em',

    nable: 'Ativado',
  disable: 'Desativado',
  toBot: 'Para este bot',
  toGp: 'Para este grupo',
  gaytex: 'Quem quer estuprar esse gay?',
  result: 'Resultado',
  shipCd: 'Você poderá escolher outro parceiro em',
  shipp: 'Casal do dia',
  toaud: 'Responda ao vídeo ou nota de voz que deseja converter em mp3 com o comando',
  toav: 'Responda ao áudio que deseja converter em nota de voz com',

    noGame: 'Não está em jogo',
  resGame: 'A sessão de *TicTacToe* foi reiniciada',
  gameOff: 'O jogo acabou',
  gaDone: 'Resposta correta',
  win: 'Você ganhou',
  mathOff: 'As chances acabaram',
  chance: 'Chances',
  answer: 'Resposta',
  mathError: '*Resposta incorreta*\n\nAinda restam',
  gameMode: 'Dificuldades disponíveis',
  mathOn: 'Ainda há perguntas sem resposta neste grupo',
  time: 'Tempo',
  timeOff: 'O tempo acabou!\nA resposta é:',
  reward: 'Recompensa',
  pptCd: 'Para jogar novamente, você precisa esperar',
  ppt: (usedPrefix, command) => `Selecione pedra/papel/tesoura\n\n📌 Exemplo: *${usedPrefix + command}* papel`,
  coinNan: 'Você não tem moedas suficientes para jogar',
  stone: 'pedra',
  sciss: 'tesoura',
  paper: 'papel',
  tie: 'Empate',
  win: 'Você ganhou',
  lost: 'Você perdeu',
  roulet: (usedPrefix) => `Você pode fazer várias apostas em um jogo de roleta.\n\nUso: *${usedPrefix}roulette* <quantidade> <espaço>\n\nMultiplicador de pagamento`,
  rouletCd: 'Você já fez uma aposta. Aguarde',
  moreInfo: 'Para mais informações',
  betMin: 'A quantidade da aposta deve ser maior que',
  betMax: 'A quantidade da aposta excede o limite máximo de',
  betNan: 'Você não tem moedas suficientes para fazer essa aposta',
  in: 'em',
  bet: 'Você fez uma aposta de',
  fell: 'A roleta caiu em',
  slotC: 'Quase lá, continue tentando :)',

    delWarnUser: 'Um administrador removeu seu aviso, agora você tem',
  warnNan: 'O usuário não possui nenhum aviso',
  delwarn: 'Remover aviso',
  warns: 'Avisos',
  warn: 'Aviso',
  warnRec: 'Você recebeu um aviso de um administrador',
  numError: 'Número incorreto',
  promote: 'Usuário promovido',
  demote: 'Usuário rebaixado',
  gpInfo: 'Informações do grupo',
  members: 'Membros',
  gpOwner: 'Dono do grupo',
  admin: 'Administrador',
  gpConf: 'Configurações do grupo',
  gpConfMsg: 'Configurações de mensagens',
  kick: 'Usuário expulso',
  linkGp: 'Link do grupo',
  preNan: 'Insira o prefixo de um número válido',
  gpNanPre: 'O grupo não possui membros com o prefixo',
  userPref: 'Usuários com o prefixo',
  profile: 'Perfil',
  number: 'Número',
  age: 'Idade',
  gender: 'Gênero',
  lang: 'Idioma',
  regOn: 'Registrado em',
  xpUp: 'Pronto para',
  upNan: 'Falta pouco para subir de nível',
  gpRulesNan: 'Grupo sem regras no momento',
  gpRules: 'Regras do grupo',
  rulesMsgOn: 'As *Regras do Grupo* foram estabelecidas',
  rulesMsg: 'Digite as regras do grupo',
  welMsgOn: 'A mensagem de boas-vindas foi estabelecida',
  leaMsgOn: 'A mensagem de despedida foi estabelecida',
  welMsg: 'Digite a mensagem de boas-vindas\n\n@user (menção)\n@group (nome do grupo)\n@desc (descrição do grupo)',
  leaMsg: 'Digite a mensagem de despedida\n\n@user (menção)',
  gpSetting: 'Configurações do grupo\n\nAbrir e fechar o grupo',
  user: 'Usuário',
  userWarn: 'Usuário avisado',
  wningUser: (war) => `Se você receber *${war}* avisos, será automaticamente expulso do grupo`,
  warnMaxU: (war) => `O usuário excedeu os *${war}* avisos e será expulso`,
  blockNan: 'Não há números bloqueados',
  bckList: 'Lista de bloqueados',
  donate: '*DOAÇÃO*\nVocê pode doar se quiser ajudar a manter o bot ativo',
  langList: 'Selecione o idioma que deseja usar\n\n≡ *Idiomas disponíveis*',
  expire: 'Expira em',
  ping: 'Velocidade',
  uptime: 'Tempo ativo',
  gpNsfw: (usedPrefix) => `O grupo não permite conteúdo NSFW\nUse este grupo\n${bgp3}\n\nSe você é um administrador, habilite com\n*${usedPrefix}enable* nsfw`,
  nsfwAge: 'Você é menor de idade! Volte quando tiver mais de 18 anos',
  addPremUser: 'Agora você é um usuário Premium',
  banChat: 'O Bot foi desativado neste grupo',
  unBanChat: 'Bot ativo neste grupo',
  banUser: 'Você não poderá mais usar meus comandos',
  unBanUser: 'Ele foi desbanido',
  restartBot: 'Reiniciando o Bot...\nAguarde um momento',

    genderList: 'Gêneros disponíveis',
  man: 'Homem',
  woman: 'Mulher',
  other: 'Outro',
  regIsOn: 'Você já está registrado\n\nDeseja se registrar novamente?\n\n 📌 Use este comando para remover seu registro',
  nameMax: 'O nome é muito longo',
  oldReg: 'Uau, o vovô quer jogar com o bot',
  numSn: 'Número de série',
  snVerify: 'Verifique seu número de série com o comando',
  snError: 'Número de série incorreto',
  unReg: 'Registro removido',
  stickError: 'A conversão falhou, tente enviar primeiro uma *imagem/vídeo/gif* e depois responda com o comando',
  tgStick: 'Digite o link de um pacote de adesivos do Telegram',
  replyStick: 'Responda a um adesivo',
  ssWeb: 'Digite a URL de uma página',
  tradList: 'Lista de idiomas compatíveis',
  searchError: 'Nenhum resultado encontrado',

    rownerH: 'Este comando só pode ser usado pelo *criador do bot*',
  ownerH: 'Este comando só pode ser usado pelo *dono e subbots*',
  modsH: 'Esta função é apenas para *moderadores do bot*',
  premH: 'Este comando é apenas para *membros Premium*\n\nDigite */premium* para mais informações',
  groupH: 'Este comando só pode ser usado em grupos',
  privateH: 'Este comando só pode ser usado no *chat privado com o Bot*',
  adminH: 'Este comando é apenas para *administradores* do grupo',
  botAdmin: 'Para usar este comando, devo ser *Administrador*!',
  unregH: 'Registre-se para usar esta função. Digite:\n\n*/reg*',
  ig: `▢ Siga-me no Instagram\n${fgig}`
}

export default translations
