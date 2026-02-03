export type StepIntro = {
  type: "intro";
  title: string;
  description: string;
};

export type StepMultipleChoice = {
  type: "multiple_choice";
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
};

export type StepNumberInput = {
  type: "number_input";
  question: string;
  correctAnswer: number;
  tolerance: number;
  unit: string;
  explanation: string;
};

export type StepCelebration = {
  type: "celebration";
};

export type TutorialItem = {
  label: string;
  value: string;
  variant: "coin" | "note";
};

export type StepTutorial = {
  type: "tutorial";
  title: string;
  description: string;
  items?: TutorialItem[];
  /** Optional highlight to show a single item prominently */
  highlight?: {
    label: string;
    value: string;
    variant: "coin" | "note";
  };
};

export type MissionStep =
  | StepIntro
  | StepMultipleChoice
  | StepNumberInput
  | StepCelebration
  | StepTutorial;

export type MissionContent = {
  steps: MissionStep[];
};

// Keyed by `${theme}-${age_group}`
export const MISSION_CONTENT: Record<string, MissionContent> = {
  // ─── Age 7-9 ────────────────────────────────────────

  "conceitos_basicos-7-9": {
    steps: [
      {
        type: "intro",
        title: "O que é dinheiro?",
        description:
          "Vamos aprender sobre as moedas e notas do Brasil! Dinheiro é usado para comprar coisas que precisamos e queremos.",
      },
      {
        type: "tutorial",
        title: "Moedas do Brasil",
        description:
          "Essas são as moedas brasileiras. Cada uma tem um valor diferente!",
        items: [
          { label: "1 centavo", value: "0,01", variant: "coin" },
          { label: "5 centavos", value: "0,05", variant: "coin" },
          { label: "10 centavos", value: "0,10", variant: "coin" },
          { label: "25 centavos", value: "0,25", variant: "coin" },
          { label: "50 centavos", value: "0,50", variant: "coin" },
          { label: "1 real", value: "1,00", variant: "coin" },
        ],
      },
      {
        type: "tutorial",
        title: "Notas do Brasil",
        description:
          "E essas são as notas! Elas valem mais que as moedas.",
        items: [
          { label: "2 reais", value: "2", variant: "note" },
          { label: "5 reais", value: "5", variant: "note" },
          { label: "10 reais", value: "10", variant: "note" },
          { label: "20 reais", value: "20", variant: "note" },
          { label: "50 reais", value: "50", variant: "note" },
          { label: "100 reais", value: "100", variant: "note" },
          { label: "200 reais", value: "200", variant: "note" },
        ],
      },
      {
        type: "multiple_choice",
        question: "Qual é esta moeda?",
        options: ["10 centavos", "50 centavos", "1 real"],
        correctIndex: 2,
        explanation:
          "Isso mesmo! A moeda de 1 real é prateada com o centro dourado. É a moeda que mais vale!",
      },
      {
        type: "number_input",
        question:
          "Você tem 3 moedas de 1 real. Quantos reais você tem no total?",
        correctAnswer: 3,
        tolerance: 0.01,
        unit: "R$",
        explanation:
          "1 + 1 + 1 = 3 reais! Contar moedas é o primeiro passo para cuidar do dinheiro.",
      },
      {
        type: "multiple_choice",
        question: "Qual é a nota de 10 reais?",
        options: [
          "A nota verde com a arara",
          "A nota azul com a bandeira",
          "A nota vermelha com o papagaio",
        ],
        correctIndex: 0,
        explanation:
          "A nota de 10 reais é verde e tem a imagem de uma arara. Ela vale o mesmo que 10 moedas de 1 real!",
      },
      { type: "celebration" },
    ],
  },

  "economizar-7-9": {
    steps: [
      {
        type: "intro",
        title: "O que você quer comprar?",
        description:
          "Todo mundo tem algo que quer muito! Vamos aprender a planejar e descobrir como conseguir comprar o que você deseja.",
      },
      {
        type: "tutorial",
        title: "Economizar é guardar dinheiro!",
        description:
          "Quando você quer comprar algo, precisa guardar dinheiro aos poucos. É como encher um cofrinho — moeda por moeda, até chegar no valor que precisa!",
        items: [
          { label: "1 real", value: "1,00", variant: "coin" },
          { label: "1 real", value: "1,00", variant: "coin" },
          { label: "1 real", value: "1,00", variant: "coin" },
          { label: "5 reais", value: "5", variant: "note" },
          { label: "10 reais", value: "10", variant: "note" },
        ],
      },
      {
        type: "multiple_choice",
        question: "Qual destes itens você mais gostaria de comprar?",
        options: [
          "Um brinquedo legal",
          "Um jogo novo",
          "Uma bicicleta",
          "Um livro de histórias",
        ],
        correctIndex: 0,
        explanation:
          "Ótima escolha! Não importa o que você quer — o importante é aprender a planejar para conseguir!",
      },
      {
        type: "number_input",
        question:
          "Um brinquedo que você quer custa R$ 25. Se você ganha R$ 5 por semana de mesada, quantas semanas precisa guardar?",
        correctAnswer: 5,
        tolerance: 0.01,
        unit: "semanas",
        explanation:
          "R$ 25 ÷ R$ 5 = 5 semanas. É só ter paciência e guardar toda semana!",
      },
      {
        type: "multiple_choice",
        question: "Onde você pode descobrir o preço de algo que quer comprar?",
        options: [
          "Pesquisar na internet",
          "Ir até a loja e ver a etiqueta",
          "Perguntar para os pais",
          "Todas as opções acima!",
        ],
        correctIndex: 3,
        explanation:
          "Todas estão certas! Pesquisar preços é o primeiro passo para planejar uma compra inteligente.",
      },
      { type: "celebration" },
    ],
  },

  // Tópico 1: De onde vem o dinheiro?
  "conceitos_basicos-7-9-origens": {
    steps: [
      {
        type: "intro",
        title: "De onde vem o dinheiro?",
        description:
          "Voce ja parou para pensar de onde vem o dinheiro? Vamos descobrir juntos!",
      },
      {
        type: "tutorial",
        title: "Dinheiro vem do trabalho!",
        description:
          "As pessoas trabalham para ganhar dinheiro. Cada profissao ajuda a sociedade de um jeito diferente e recebe um pagamento por isso.",
      },
      {
        type: "multiple_choice",
        question: "De onde vem o dinheiro que seus pais usam?",
        options: ["Do trabalho", "Nasce em arvores", "Cai do ceu", "Da televisao"],
        correctIndex: 0,
        explanation:
          "O dinheiro vem do trabalho! Seus pais trabalham e recebem um salario por isso.",
      },
      {
        type: "multiple_choice",
        question: "Qual destes e um exemplo de trabalho?",
        options: ["Medico", "Assistir TV", "Dormir", "Comer"],
        correctIndex: 0,
        explanation:
          "O medico cuida da saude das pessoas e recebe dinheiro pelo seu trabalho. Assistir TV, dormir e comer nao sao trabalhos!",
      },
      {
        type: "multiple_choice",
        question: "O padeiro ganha dinheiro fazendo o que?",
        options: ["Paes e bolos", "Brinquedos", "Carros", "Roupas"],
        correctIndex: 0,
        explanation:
          "O padeiro faz paes, bolos e outros alimentos. Cada profissional tem sua especialidade!",
      },
      { type: "celebration" },
    ],
  },

  // Tópico 2: Formas de ganhar
  "ganhar-7-9": {
    steps: [
      {
        type: "intro",
        title: "Formas de ganhar",
        description:
          "Existem varias formas de ganhar dinheiro, ate para criancas! Vamos descobrir quais sao.",
      },
      {
        type: "tutorial",
        title: "Criancas tambem podem ganhar!",
        description:
          "Voce pode ganhar mesada ajudando em casa, vender limonada, fazer artesanato ou ajudar vizinhos. O importante e fazer com responsabilidade!",
      },
      {
        type: "multiple_choice",
        question: "Qual e uma forma de ganhar dinheiro?",
        options: [
          "Ajudar em casa e ganhar mesada",
          "Pegar dos outros",
          "Achar na rua",
          "Nao fazer nada",
        ],
        correctIndex: 0,
        explanation:
          "Ajudar em casa e uma otima forma de mostrar responsabilidade e ganhar uma mesada!",
      },
      {
        type: "multiple_choice",
        question: "O que voce pode fazer para merecer sua mesada?",
        options: [
          "Arrumar o quarto",
          "Assistir TV o dia todo",
          "Jogar videogame",
          "Dormir ate tarde",
        ],
        correctIndex: 0,
        explanation:
          "Arrumar o quarto mostra responsabilidade. Quando voce ajuda, merece ser recompensado!",
      },
      {
        type: "multiple_choice",
        question: "A Joana vende limonada na rua. Ela e uma...",
        options: ["Empreendedora", "Preguicosa", "Artista", "Estudante"],
        correctIndex: 0,
        explanation:
          "A Joana e uma empreendedora! Ela teve uma ideia e esta ganhando dinheiro com ela. Muito legal!",
      },
      { type: "celebration" },
    ],
  },

  // Tópico 3: Desejo vs necessidade
  "gastar-7-9": {
    steps: [
      {
        type: "intro",
        title: "Desejo vs necessidade",
        description:
          "Voce sabe a diferenca entre o que voce PRECISA e o que voce QUER? Vamos aprender!",
      },
      {
        type: "tutorial",
        title: "Necessidade e desejo",
        description:
          "NECESSIDADES sao coisas que voce precisa para viver: comida, agua, escola, saude. DESEJOS sao coisas legais, mas que da para viver sem: brinquedos, jogos, doces.",
      },
      {
        type: "multiple_choice",
        question: "Qual e uma NECESSIDADE?",
        options: ["Comida", "Brinquedo", "Videogame", "Figurinhas"],
        correctIndex: 0,
        explanation:
          "Comida e uma necessidade — voce precisa comer para viver e crescer saudavel!",
      },
      {
        type: "multiple_choice",
        question: "Qual e um DESEJO?",
        options: [
          "Uma boneca nova",
          "Remedio quando esta doente",
          "Material escolar",
          "Agua",
        ],
        correctIndex: 0,
        explanation:
          "Uma boneca nova e um desejo. E legal ter, mas voce consegue viver sem ela!",
      },
      {
        type: "multiple_choice",
        question: "O que devemos comprar PRIMEIRO?",
        options: [
          "Necessidades",
          "Desejos",
          "O que e mais divertido",
          "O mais caro",
        ],
        correctIndex: 0,
        explanation:
          "Sempre cuide das necessidades primeiro! Depois, se sobrar dinheiro, podemos pensar nos desejos.",
      },
      { type: "celebration" },
    ],
  },

  // Tópico 4: Por que guardar?
  "economizar-7-9-guardar": {
    steps: [
      {
        type: "intro",
        title: "Por que guardar?",
        description:
          "Guardar dinheiro e um superpoder! Vamos aprender por que e tao importante economizar.",
      },
      {
        type: "tutorial",
        title: "O cofrinho magico",
        description:
          "Quando voce guarda dinheiro no cofrinho, ele vai acumulando. Moeda por moeda, voce chega la! E como plantar uma semente que cresce aos poucos.",
        items: [
          { label: "1 real", value: "1,00", variant: "coin" },
          { label: "1 real", value: "1,00", variant: "coin" },
          { label: "1 real", value: "1,00", variant: "coin" },
          { label: "5 reais", value: "5", variant: "note" },
        ],
      },
      {
        type: "multiple_choice",
        question: "Por que e bom guardar dinheiro?",
        options: [
          "Para comprar algo especial no futuro",
          "Para jogar fora depois",
          "Para esconder de todo mundo",
          "Para parecer rico",
        ],
        correctIndex: 0,
        explanation:
          "Guardar dinheiro te ajuda a comprar algo especial ou ter uma reserva para emergencias!",
      },
      {
        type: "number_input",
        question:
          "Voce guarda R$ 3,00 por semana. Em 4 semanas, quanto tera?",
        correctAnswer: 12,
        tolerance: 0.01,
        unit: "R$",
        explanation:
          "R$ 3 x 4 = R$ 12! Guardando um pouquinho por semana, o valor cresce rapido.",
      },
      {
        type: "multiple_choice",
        question: "Onde e seguro guardar dinheiro?",
        options: [
          "Cofrinho ou conta no banco",
          "Debaixo da cama",
          "No chao da escola",
          "Na mochila aberta",
        ],
        correctIndex: 0,
        explanation:
          "Um cofrinho em casa ou uma conta no banco sao os lugares mais seguros!",
      },
      { type: "celebration" },
    ],
  },

  // ─── Age 10-12 ──────────────────────────────────────

  "troco-10-12": {
    steps: [
      {
        type: "intro",
        title: "Desafio do troco rápido",
        description:
          "Será que você consegue calcular o troco mais rápido que uma calculadora? Vamos testar suas habilidades!",
      },
      {
        type: "tutorial",
        title: "Como calcular troco?",
        description:
          "Troco = valor pago − valor da compra. Por exemplo: se algo custa R$ 7,00 e você paga com R$ 10,00, o troco é R$ 3,00. Simples assim!",
        items: [
          { label: "Pago", value: "10", variant: "note" },
          { label: "Compra", value: "7", variant: "note" },
          { label: "Troco", value: "3", variant: "note" },
        ],
      },
      {
        type: "multiple_choice",
        question:
          "Você comprou um lanche de R$ 5,50 e pagou com uma nota de R$ 10,00. Qual é o troco?",
        options: ["R$ 3,50", "R$ 4,50", "R$ 5,50", "R$ 4,00"],
        correctIndex: 1,
        explanation:
          "R$ 10,00 - R$ 5,50 = R$ 4,50. Dica: pense primeiro no valor inteiro (10 - 5 = 5), depois ajuste os centavos!",
      },
      {
        type: "number_input",
        question:
          "Uma camiseta custa R$ 12,75 e você paga com R$ 20,00. Quanto é o troco?",
        correctAnswer: 7.25,
        tolerance: 0.05,
        unit: "R$",
        explanation:
          "R$ 20,00 - R$ 12,75 = R$ 7,25. Boa! Calcular com centavos exige atenção extra.",
      },
      {
        type: "number_input",
        question:
          "Você comprou um caderno de R$ 8,90 e uma caneta de R$ 3,50. Pagou com R$ 20,00. Qual o troco?",
        correctAnswer: 7.6,
        tolerance: 0.05,
        unit: "R$",
        explanation:
          "R$ 8,90 + R$ 3,50 = R$ 12,40. Troco: R$ 20,00 - R$ 12,40 = R$ 7,60. Primeiro some os itens, depois calcule o troco!",
      },
      { type: "celebration" },
    ],
  },

  "economizar-10-12": {
    steps: [
      {
        type: "intro",
        title: "Quanto tempo para juntar?",
        description:
          "Aprenda a calcular quanto tempo precisa para juntar dinheiro e realizar seus sonhos de compra!",
      },
      {
        type: "tutorial",
        title: "O segredo: dividir a meta!",
        description:
          "Para saber quantas semanas precisa guardar, divida o preço do que quer pelo que consegue economizar por semana. Exemplo: R$ 30 ÷ R$ 10/semana = 3 semanas!",
        items: [
          { label: "Semana 1", value: "10", variant: "note" },
          { label: "Semana 2", value: "10", variant: "note" },
          { label: "Semana 3", value: "10", variant: "note" },
        ],
      },
      {
        type: "multiple_choice",
        question:
          "Você quer comprar um jogo de R$ 50,00 e ganha R$ 10,00 por semana. Em quantas semanas consegue?",
        options: ["3 semanas", "4 semanas", "5 semanas", "6 semanas"],
        correctIndex: 2,
        explanation:
          "R$ 50 ÷ R$ 10 = 5 semanas. Pouco mais de um mês guardando toda semana!",
      },
      {
        type: "number_input",
        question:
          "Sua meta é R$ 100,00 e você consegue guardar R$ 15,00 por semana. Quantas semanas precisa? (arredonde para cima)",
        correctAnswer: 7,
        tolerance: 0.5,
        unit: "semanas",
        explanation:
          "R$ 100 ÷ R$ 15 = 6,67 semanas. Arredondando: 7 semanas! Na última, você precisa guardar só R$ 10.",
      },
      {
        type: "number_input",
        question:
          "Você quer um tênis de R$ 120,00. Já tem R$ 45,00 guardados e economiza R$ 25,00 por semana. Quantas semanas mais precisa?",
        correctAnswer: 3,
        tolerance: 0.5,
        unit: "semanas",
        explanation:
          "Faltam R$ 120 - R$ 45 = R$ 75. Dividido por R$ 25/semana = 3 semanas. Você já tem quase metade!",
      },
      { type: "celebration" },
    ],
  },
  // Tópico 1: Trabalho gera dinheiro (10-12)
  "conceitos_basicos-10-12": {
    steps: [
      {
        type: "intro",
        title: "Trabalho gera dinheiro",
        description:
          "Por que algumas pessoas ganham mais que outras? Vamos entender como o trabalho gera renda!",
      },
      {
        type: "tutorial",
        title: "Diferentes trabalhos, diferentes salarios",
        description:
          "Cada profissao paga de um jeito. Quanto mais estudo e experiencia, geralmente maior o salario. Mas todo trabalho honesto tem valor!",
      },
      {
        type: "multiple_choice",
        question: "O que faz um trabalho pagar mais?",
        options: [
          "Estudo e experiencia",
          "Sorte",
          "Idade",
          "Altura da pessoa",
        ],
        correctIndex: 0,
        explanation:
          "Estudo e experiencia sao os principais fatores! Investir em aprender sempre vale a pena.",
      },
      {
        type: "number_input",
        question:
          "Um professor ganha R$ 4.000 por mes. Quanto ganha em 1 ano (12 meses)?",
        correctAnswer: 48000,
        tolerance: 100,
        unit: "R$",
        explanation:
          "R$ 4.000 x 12 = R$ 48.000 por ano. Pensar no salario anual ajuda a planejar melhor!",
      },
      {
        type: "multiple_choice",
        question: "Todo trabalho honesto merece...",
        options: [
          "Respeito e pagamento justo",
          "Ser ignorado",
          "Pagar pouco",
          "Nenhuma importancia",
        ],
        correctIndex: 0,
        explanation:
          "Toda profissao contribui para a sociedade. Do faxineiro ao medico, todos merecem respeito!",
      },
      { type: "celebration" },
    ],
  },

  // Tópico 2: Valor da habilidade (10-12)
  "ganhar-10-12": {
    steps: [
      {
        type: "intro",
        title: "Valor da habilidade",
        description:
          "Suas habilidades tem valor! Vamos aprender como transformar o que voce sabe fazer em dinheiro.",
      },
      {
        type: "tutorial",
        title: "Habilidade = Valor",
        description:
          "Quanto melhor voce faz algo, mais as pessoas pagam. Um bolo bonito e gostoso vale mais que um simples. Pratica e dedicacao aumentam o valor do seu trabalho!",
      },
      {
        type: "multiple_choice",
        question: "Quem pode cobrar mais pelo seu trabalho?",
        options: [
          "Quem tem mais pratica e qualidade",
          "Quem e mais alto",
          "Quem e mais velho",
          "Quem tem mais amigos",
        ],
        correctIndex: 0,
        explanation:
          "Qualidade e pratica sao o que determinam o valor. Continue melhorando suas habilidades!",
      },
      {
        type: "number_input",
        question:
          "Voce faz pulseiras artesanais e vende por R$ 5 cada. Vendeu 8 na semana. Quanto ganhou?",
        correctAnswer: 40,
        tolerance: 0.01,
        unit: "R$",
        explanation:
          "R$ 5 x 8 = R$ 40! Vender produtos feitos por voce e uma forma de empreender.",
      },
      {
        type: "multiple_choice",
        question: "Como aumentar o valor do seu trabalho?",
        options: [
          "Melhorar a qualidade e aprender mais",
          "Fazer mais rapido e com menos qualidade",
          "Copiar o que outros fazem",
          "Baixar o preco sempre",
        ],
        correctIndex: 0,
        explanation:
          "Investir em qualidade e aprendizado e o melhor caminho para ganhar mais!",
      },
      { type: "celebration" },
    ],
  },

  // Tópico 3: Gastar com sabedoria (10-12)
  "gastar-10-12": {
    steps: [
      {
        type: "intro",
        title: "Gastar com sabedoria",
        description:
          "Saber gastar e tao importante quanto saber ganhar! Vamos aprender a fazer compras inteligentes.",
      },
      {
        type: "tutorial",
        title: "Compra inteligente",
        description:
          "Antes de comprar, pesquise precos, compare opcoes e pergunte: eu realmente preciso disso? Comprar por impulso pode desperdicar seu dinheiro!",
      },
      {
        type: "multiple_choice",
        question: "Antes de comprar algo, o que devemos fazer?",
        options: [
          "Pesquisar precos em diferentes lugares",
          "Comprar na primeira loja",
          "Pedir emprestado",
          "Ignorar o preco",
        ],
        correctIndex: 0,
        explanation:
          "Pesquisar precos pode economizar muito dinheiro! O mesmo produto pode ter precos bem diferentes.",
      },
      {
        type: "number_input",
        question:
          "Tenis na loja A: R$ 150. Na loja B: R$ 120. Quanto voce economiza comprando na loja B?",
        correctAnswer: 30,
        tolerance: 0.01,
        unit: "R$",
        explanation:
          "R$ 150 - R$ 120 = R$ 30 de economia! So pesquisando voce ja guardou dinheiro.",
      },
      {
        type: "multiple_choice",
        question: "Qual compra e mais inteligente?",
        options: [
          "Esperar promocao e pesquisar",
          "Comprar quando quiser",
          "Sempre o mais caro e melhor",
          "Comprar tudo de uma vez",
        ],
        correctIndex: 0,
        explanation:
          "Esperar a hora certa e pesquisar e o segredo de quem gasta bem!",
      },
      { type: "celebration" },
    ],
  },

  // Tópico 5: Fazendo dinheiro crescer (10-12)
  "investir-10-12": {
    steps: [
      {
        type: "intro",
        title: "Fazendo dinheiro crescer",
        description:
          "Voce sabia que dinheiro pode crescer sozinho? Vamos entender como investir faz seu dinheiro aumentar!",
      },
      {
        type: "tutorial",
        title: "O poder dos juros",
        description:
          "Quando voce coloca dinheiro na poupanca ou em um investimento, ele rende JUROS. E como se o banco te pagasse por guardar dinheiro la. E o dinheiro cresce cada vez mais rapido!",
        items: [
          { label: "Ano 1", value: "100", variant: "note" },
          { label: "Ano 2", value: "110", variant: "note" },
          { label: "Ano 3", value: "121", variant: "note" },
        ],
      },
      {
        type: "multiple_choice",
        question: "O que acontece quando voce deixa dinheiro na poupanca?",
        options: [
          "Ele rende juros e cresce",
          "Ele desaparece",
          "Fica sempre igual",
          "Diminui com o tempo",
        ],
        correctIndex: 0,
        explanation:
          "Na poupanca, seu dinheiro rende juros todo mes. E pouco, mas e seguro!",
      },
      {
        type: "number_input",
        question:
          "Voce investiu R$ 100 e ganhou 10% de juros no primeiro ano. Quanto tem agora?",
        correctAnswer: 110,
        tolerance: 0.5,
        unit: "R$",
        explanation:
          "10% de R$ 100 = R$ 10 de juros. Total: R$ 110! Seu dinheiro trabalhou para voce.",
      },
      {
        type: "multiple_choice",
        question: "Qual a vantagem de comecar a investir cedo?",
        options: [
          "Mais tempo para o dinheiro crescer",
          "Menos imposto",
          "E mais facil quando jovem",
          "Nao tem vantagem",
        ],
        correctIndex: 0,
        explanation:
          "Quanto mais cedo voce comeca, mais tempo os juros tem para fazer seu dinheiro crescer!",
      },
      {
        type: "number_input",
        question:
          "Se R$ 100 viram R$ 110 no 1o ano (10% de juros), quanto de juros voce ganha no 2o ano (10% de R$ 110)?",
        correctAnswer: 11,
        tolerance: 0.5,
        unit: "R$",
        explanation:
          "10% de R$ 110 = R$ 11! No 2o ano voce ganhou mais que no 1o. Isso se chama juros compostos!",
      },
      { type: "celebration" },
    ],
  },

  // ─── Age 13-15 ──────────────────────────────────────

  // Tópico 1: Renda vs herança (13-15)
  "conceitos_basicos-13-15": {
    steps: [
      {
        type: "intro",
        title: "Renda vs heranca",
        description:
          "Existem diferentes formas de receber dinheiro. Vamos entender a diferenca entre renda ativa, passiva e heranca.",
      },
      {
        type: "tutorial",
        title: "Tipos de renda",
        description:
          "RENDA ATIVA: voce trabalha e recebe (salario). RENDA PASSIVA: seu dinheiro ou propriedade gera renda (aluguel, investimentos). HERANCA: dinheiro recebido de familiares. A mais sustentavel e desenvolver suas proprias fontes de renda!",
      },
      {
        type: "multiple_choice",
        question: "O que e renda ativa?",
        options: [
          "Salario recebido pelo trabalho",
          "Dinheiro parado no banco",
          "Heranca de familia",
          "Presente de aniversario",
        ],
        correctIndex: 0,
        explanation:
          "Renda ativa e quando voce troca seu tempo e trabalho por dinheiro. E a forma mais comum!",
      },
      {
        type: "multiple_choice",
        question: "O que e renda passiva?",
        options: [
          "Aluguel de um imovel",
          "Trabalho extra no fim de semana",
          "Mesada dos pais",
          "Emprestimo do banco",
        ],
        correctIndex: 0,
        explanation:
          "Renda passiva vem de algo que voce possui (imovel, investimento) sem precisar trabalhar ativamente.",
      },
      {
        type: "multiple_choice",
        question: "Qual a fonte de renda mais sustentavel a longo prazo?",
        options: [
          "Desenvolver habilidades e investir",
          "Esperar heranca",
          "Apostar em jogos",
          "Pedir dinheiro emprestado",
        ],
        correctIndex: 0,
        explanation:
          "Habilidades e investimentos sao suas e ninguem pode tirar. E a base de uma vida financeira saudavel!",
      },
      { type: "celebration" },
    ],
  },

  // Tópico 2: Crie seu negócio (13-15)
  "ganhar-13-15": {
    steps: [
      {
        type: "intro",
        title: "Crie seu negocio",
        description:
          "Ja pensou em ter seu proprio negocio? Vamos aprender os primeiros passos do empreendedorismo!",
      },
      {
        type: "tutorial",
        title: "Passos para empreender",
        description:
          "1) Identifique um problema ou necessidade. 2) Pense em uma solucao. 3) Calcule os custos. 4) Defina o preco de venda. 5) Comece pequeno e aprenda com os clientes!",
      },
      {
        type: "multiple_choice",
        question: "O primeiro passo para criar um negocio e...",
        options: [
          "Identificar um problema que as pessoas tem",
          "Pedir muito dinheiro emprestado",
          "Abrir uma loja grande",
          "Fazer propaganda cara",
        ],
        correctIndex: 0,
        explanation:
          "Todo negocio de sucesso comeca resolvendo um problema real. Observe as necessidades ao seu redor!",
      },
      {
        type: "number_input",
        question:
          "Custo para fazer 1 brigadeiro: R$ 1,50. Voce vende por R$ 4,00. Qual o lucro por brigadeiro?",
        correctAnswer: 2.5,
        tolerance: 0.05,
        unit: "R$",
        explanation:
          "R$ 4,00 - R$ 1,50 = R$ 2,50 de lucro. Lucro = preco de venda - custo de producao!",
      },
      {
        type: "number_input",
        question:
          "Se voce vender 20 brigadeiros por dia com R$ 2,50 de lucro cada, qual o lucro diario?",
        correctAnswer: 50,
        tolerance: 0.5,
        unit: "R$",
        explanation:
          "R$ 2,50 x 20 = R$ 50 por dia! Em um mes (20 dias uteis) seriam R$ 1.000 de lucro.",
      },
      {
        type: "multiple_choice",
        question: "O que e mais importante para um negocio dar certo?",
        options: [
          "Atender bem o cliente e ter qualidade",
          "Ter sempre o preco mais baixo",
          "Gastar muito com propaganda",
          "Copiar tudo dos concorrentes",
        ],
        correctIndex: 0,
        explanation:
          "Qualidade e bom atendimento fazem clientes voltarem e recomendarem! E o melhor investimento.",
      },
      { type: "celebration" },
    ],
  },
};

export function getMissionContent(contentKey: string): MissionContent | null {
  return MISSION_CONTENT[contentKey] ?? null;
}
