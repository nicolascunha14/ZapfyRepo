#!/usr/bin/env node
// Generate seed SQL for chapters, missions, and final exams
// Run: node scripts/generate-seed.mjs > scripts/chapters-seed.sql

const CHAPTERS = {
  "7-9": [
    { n: 1, title: "O que é Dinheiro?", desc: "Aprenda sobre moedas, notas e o valor do dinheiro", icon: "💰" },
    { n: 2, title: "Como Ganhar Dinheiro?", desc: "Descubra formas de ganhar sua mesada e mais", icon: "💼" },
    { n: 3, title: "Como Gastar Bem?", desc: "Aprenda a fazer escolhas inteligentes", icon: "🛒" },
    { n: 4, title: "Troco e Cálculos", desc: "Pratique contas de somar e calcular troco", icon: "🧮" },
    { n: 5, title: "Como Guardar Dinheiro?", desc: "Entenda a importância de poupar", icon: "🐷" },
    { n: 6, title: "Planejando Compras", desc: "Compare preços e faça boas escolhas", icon: "📝" },
    { n: 7, title: "Dinheiro e Família", desc: "Aprenda sobre responsabilidade financeira", icon: "👨‍👩‍👧‍👦" },
    { n: 8, title: "Cuidando do Dinheiro", desc: "Evite desperdícios e perdas", icon: "🔒" },
    { n: 9, title: "Meus Primeiros Objetivos", desc: "Planeje e alcance seus sonhos", icon: "🎯" },
  ],
  "10-12": [
    { n: 1, title: "Dinheiro Digital", desc: "PIX, cartões e apps de banco", icon: "📱" },
    { n: 2, title: "Matemática do Dinheiro", desc: "Porcentagens, descontos e acréscimos", icon: "📊" },
    { n: 3, title: "Mesada Inteligente", desc: "Planeje sua mesada como um pro", icon: "💳" },
    { n: 4, title: "Necessidades vs Desejos", desc: "Aprenda a priorizar gastos", icon: "⚖️" },
    { n: 5, title: "Comparando Preços", desc: "Encontre as melhores ofertas", icon: "🔍" },
    { n: 6, title: "Primeiros Investimentos", desc: "O que é investir e como começar", icon: "📈" },
    { n: 7, title: "Empreendedorismo Infantil", desc: "Crie seu pequeno negócio", icon: "🚀" },
    { n: 8, title: "Consumo Consciente", desc: "Compre de forma sustentável", icon: "♻️" },
    { n: 9, title: "Planejamento Financeiro", desc: "Objetivos de curto, médio e longo prazo", icon: "🗓️" },
  ],
  "13-15": [
    { n: 1, title: "Sistema Financeiro", desc: "Como funcionam bancos e economia", icon: "🏦" },
    { n: 2, title: "Juros Simples e Compostos", desc: "Entenda o poder dos juros", icon: "💹" },
    { n: 3, title: "Tipos de Investimento", desc: "Renda fixa, ações e fundos", icon: "📊" },
    { n: 4, title: "Orçamento Pessoal", desc: "Controle suas receitas e despesas", icon: "💼" },
    { n: 5, title: "Crédito e Dívidas", desc: "Use crédito com responsabilidade", icon: "💳" },
    { n: 6, title: "Impostos e Taxas", desc: "Por que pagamos e como nos afetam", icon: "🧾" },
    { n: 7, title: "Empreendedorismo", desc: "Modelos de negócio e lucro", icon: "🎯" },
    { n: 8, title: "Investindo no Futuro", desc: "Educação e carreira", icon: "🎓" },
    { n: 9, title: "Independência Financeira", desc: "Planeje sua liberdade financeira", icon: "🏆" },
  ],
};

// Mission types cycle for each chapter's 10 missions
const TYPE_CYCLE = ["quiz", "true_false", "drag_drop", "numeric_input", "text_input", "matching", "quiz", "true_false", "quiz", "numeric_input"];

// Content templates per age group per chapter
const MISSIONS_CONTENT = {
  "7-9": {
    1: [ // O que é Dinheiro?
      { t: "O que são moedas?", q: "O que usamos para comprar coisas?", opts: ["Dinheiro", "Papel de carta", "Folha de árvore", "Pedra"], correct: "a", expl: "Dinheiro é o que usamos para trocar por coisas que precisamos!" },
      { t: "Dinheiro cresce em árvore?", q: "Dinheiro cresce em árvores. Verdadeiro ou Falso?", correct: false, expl: "Falso! Dinheiro precisa ser conquistado através do trabalho." },
      { t: "Classifique as moedas", q: "Arraste cada moeda para seu valor", cats: [{ id: "c1", l: "Moedas" }, { id: "c2", l: "Notas" }], items: [{ id: "i1", t: "R$ 0,50" }, { id: "i2", t: "R$ 1,00" }, { id: "i3", t: "R$ 10,00" }, { id: "i4", t: "R$ 50,00" }], answer: { c1: ["i1", "i2"], c2: ["i3", "i4"] }, expl: "Moedas são para valores menores e notas para valores maiores!" },
      { t: "Somando moedas", q: "Se você tem 3 moedas de R$ 1,00, quanto tem no total?", correct: 3, tol: 0, expl: "3 x R$ 1,00 = R$ 3,00" },
      { t: "Onde guardar dinheiro?", q: "Qual o lugar mais seguro para guardar dinheiro?", placeholder: "Digite aqui...", correct: ["cofre", "banco", "cofrinho"], expl: "Um cofre ou banco são lugares seguros para guardar dinheiro!" },
      { t: "Combine os valores", q: "Conecte cada moeda ao seu valor", pairs: [{ id: "p1", l: "Moeda dourada pequena", r: "R$ 0,10" }, { id: "p2", l: "Moeda prateada grande", r: "R$ 1,00" }, { id: "p3", l: "Nota verde", r: "R$ 1,00 (nota)" }, { id: "p4", l: "Nota azul", r: "R$ 2,00" }], expl: "Cada moeda e nota tem um valor diferente!" },
      { t: "Para que serve o dinheiro?", q: "Para que as pessoas usam dinheiro?", opts: ["Comprar comida e coisas importantes", "Jogar fora", "Usar como brinquedo", "Fazer aviãozinho"], correct: "a", expl: "Dinheiro serve para comprar o que precisamos!" },
      { t: "Todo dinheiro é igual?", q: "Todas as moedas valem a mesma coisa. Verdadeiro ou Falso?", correct: false, expl: "Falso! Cada moeda tem um valor diferente." },
      { t: "Quem faz o dinheiro?", q: "Quem fabrica o dinheiro no Brasil?", opts: ["Casa da Moeda", "Supermercado", "Escola", "Hospital"], correct: "a", expl: "A Casa da Moeda do Brasil é responsável por fabricar nosso dinheiro!" },
      { t: "Contando notas", q: "Se você tem 2 notas de R$ 5,00, quanto tem?", correct: 10, tol: 0, expl: "2 x R$ 5,00 = R$ 10,00" },
    ],
    2: [ // Como Ganhar Dinheiro?
      { t: "O que é mesada?", q: "O que é mesada?", opts: ["Dinheiro que os pais dão todo mês", "Um tipo de comida", "Uma brincadeira", "Um esporte"], correct: "a", expl: "Mesada é o dinheiro que os pais dão regularmente para você aprender a administrar!" },
      { t: "Trabalho gera dinheiro", q: "Pessoas ganham dinheiro trabalhando. Verdadeiro ou Falso?", correct: true, expl: "Verdadeiro! O trabalho é a principal forma de ganhar dinheiro." },
      { t: "Formas de ganhar", q: "Classifique as atividades", cats: [{ id: "c1", l: "Pode ganhar dinheiro" }, { id: "c2", l: "Não ganha dinheiro" }], items: [{ id: "i1", t: "Vender limonada" }, { id: "i2", t: "Ajudar em casa" }, { id: "i3", t: "Dormir" }, { id: "i4", t: "Passear no parque" }], answer: { c1: ["i1", "i2"], c2: ["i3", "i4"] }, expl: "Vender coisas e ajudar em tarefas são formas de ganhar dinheiro!" },
      { t: "Calculando a mesada", q: "Se você ganha R$ 5,00 por semana, quanto ganha em 4 semanas?", correct: 20, tol: 0, expl: "4 x R$ 5,00 = R$ 20,00 por mês!" },
      { t: "Profissão que ganha dinheiro", q: "Cite uma profissão que ganha dinheiro", placeholder: "Digite uma profissão...", correct: ["médico", "medico", "professor", "professora", "dentista", "engenheiro", "policial"], expl: "Existem muitas profissões! Cada uma ganha dinheiro de forma diferente." },
      { t: "Conecte trabalho e pagamento", q: "Conecte cada trabalho ao que recebe", pairs: [{ id: "p1", l: "Mesada", r: "Ajudar em casa" }, { id: "p2", l: "Salário", r: "Trabalhar na empresa" }, { id: "p3", l: "Gorjeta", r: "Servir bem" }, { id: "p4", l: "Lucro", r: "Vender algo" }], expl: "Cada tipo de trabalho tem uma forma diferente de pagamento!" },
      { t: "Qual ganha mais?", q: "Quem geralmente ganha mais dinheiro?", opts: ["Quem estudou mais", "Quem dorme mais", "Quem come mais", "Quem brinca mais"], correct: "a", expl: "Estudar ajuda a conseguir melhores empregos e ganhar mais!" },
      { t: "Criança pode ganhar dinheiro?", q: "Crianças podem aprender a ganhar dinheiro de formas simples. Verdadeiro ou Falso?", correct: true, expl: "Sim! Vender limonada, fazer artesanato ou ajudar em tarefas são exemplos." },
      { t: "Ideia de negócio", q: "O que uma criança poderia vender em uma feira?", opts: ["Biscoitos caseiros", "Carros", "Casas", "Aviões"], correct: "a", expl: "Biscoitos caseiros são um ótimo produto para uma feira!" },
      { t: "Quanto ganhou?", q: "Você vendeu 5 copos de limonada por R$ 2,00 cada. Quanto ganhou?", correct: 10, tol: 0, expl: "5 x R$ 2,00 = R$ 10,00!" },
    ],
    3: [ // Como Gastar Bem?
      { t: "Gastar com sabedoria", q: "O que significa gastar bem?", opts: ["Pensar antes de comprar", "Comprar tudo que vê", "Gastar tudo de uma vez", "Nunca comprar nada"], correct: "a", expl: "Gastar bem é pensar se realmente precisa antes de comprar!" },
      { t: "Precisa ou quer?", q: "Comida é uma necessidade básica. Verdadeiro ou Falso?", correct: true, expl: "Verdadeiro! Comida é algo que precisamos para viver." },
      { t: "Necessidade ou desejo?", q: "Classifique os itens", cats: [{ id: "c1", l: "Necessidade" }, { id: "c2", l: "Desejo" }], items: [{ id: "i1", t: "Comida" }, { id: "i2", t: "Videogame" }, { id: "i3", t: "Roupa para escola" }, { id: "i4", t: "Brinquedo novo" }], answer: { c1: ["i1", "i3"], c2: ["i2", "i4"] }, expl: "Necessidades são coisas que precisamos. Desejos são coisas que queremos!" },
      { t: "Quanto sobra?", q: "Você tem R$ 20,00 e gastou R$ 12,00. Quanto sobrou?", correct: 8, tol: 0, expl: "R$ 20,00 - R$ 12,00 = R$ 8,00" },
      { t: "O que é caro?", q: "Complete: quando algo custa muito, dizemos que é...", placeholder: "Digite aqui...", correct: ["caro", "caros", "cara"], expl: "Quando algo custa muito dinheiro, dizemos que é caro!" },
      { t: "Preço x Valor", q: "Conecte cada item ao que melhor descreve", pairs: [{ id: "p1", l: "Água", r: "Barato e necessário" }, { id: "p2", l: "Brinquedo raro", r: "Caro e desejo" }, { id: "p3", l: "Lanche na escola", r: "Preço médio" }, { id: "p4", l: "Diamante", r: "Muito caro" }], expl: "Cada coisa tem um preço diferente!" },
      { t: "Melhor escolha", q: "Qual é a melhor escolha ao ir ao mercado?", opts: ["Levar uma lista do que precisa", "Comprar tudo que parece legal", "Ir sem dinheiro", "Comprar só doces"], correct: "a", expl: "Fazer uma lista ajuda a comprar apenas o necessário!" },
      { t: "Impulso", q: "Comprar algo só porque está na vitrine é sempre uma boa ideia. Verdadeiro ou Falso?", correct: false, expl: "Falso! Compras por impulso podem gastar dinheiro com coisas que não precisamos." },
      { t: "Comparando preços", q: "Se um lápis custa R$ 2,00 na loja A e R$ 3,00 na loja B, onde é melhor comprar?", opts: ["Loja A", "Loja B", "Tanto faz", "Nenhuma"], correct: "a", expl: "Na loja A é mais barato! Sempre vale comparar preços." },
      { t: "Conta do lanche", q: "Um suco custa R$ 4,00 e um pão R$ 3,00. Quanto custa o lanche?", correct: 7, tol: 0, expl: "R$ 4,00 + R$ 3,00 = R$ 7,00" },
    ],
    4: [ // Troco e Cálculos
      { t: "O que é troco?", q: "O que é troco?", opts: ["O dinheiro que volta quando você paga a mais", "Um tipo de moeda", "O preço de algo", "Uma nota especial"], correct: "a", expl: "Troco é a diferença entre o que você pagou e o preço do produto!" },
      { t: "Sempre recebe troco?", q: "Se você paga o valor exato, recebe troco. Verdadeiro ou Falso?", correct: false, expl: "Falso! Se pagar o valor exato, não há troco." },
      { t: "Moedas para troco", q: "Classifique", cats: [{ id: "c1", l: "Dá troco" }, { id: "c2", l: "Não dá troco" }], items: [{ id: "i1", t: "Paga R$10 por item de R$7" }, { id: "i2", t: "Paga R$5 por item de R$5" }, { id: "i3", t: "Paga R$20 por item de R$15" }, { id: "i4", t: "Paga R$3 por item de R$3" }], answer: { c1: ["i1", "i3"], c2: ["i2", "i4"] }, expl: "Quando pagamos mais que o preço, recebemos troco!" },
      { t: "Calculando troco", q: "Você comprou um sorvete de R$ 6,00 e pagou com R$ 10,00. Qual o troco?", correct: 4, tol: 0, expl: "R$ 10,00 - R$ 6,00 = R$ 4,00 de troco!" },
      { t: "Qual moeda de troco?", q: "Se o troco é R$ 0,50, qual moeda você recebe?", placeholder: "Digite o valor...", correct: ["0,50", "cinquenta centavos", "50 centavos"], expl: "Uma moeda de R$ 0,50!" },
      { t: "Combine pagamento e troco", q: "Conecte o pagamento ao troco correto (item custa R$ 8,00)", pairs: [{ id: "p1", l: "Paga R$ 10,00", r: "Troco R$ 2,00" }, { id: "p2", l: "Paga R$ 20,00", r: "Troco R$ 12,00" }, { id: "p3", l: "Paga R$ 8,00", r: "Sem troco" }, { id: "p4", l: "Paga R$ 50,00", r: "Troco R$ 42,00" }], expl: "Troco = Pagamento - Preço" },
      { t: "Troco correto?", q: "Você pagou R$ 5,00 por um lanche de R$ 3,50. Qual o troco correto?", opts: ["R$ 1,50", "R$ 2,00", "R$ 1,00", "R$ 2,50"], correct: "a", expl: "R$ 5,00 - R$ 3,50 = R$ 1,50" },
      { t: "Conferir o troco", q: "É importante conferir o troco que recebemos. Verdadeiro ou Falso?", correct: true, expl: "Verdadeiro! Sempre confira se recebeu o troco correto." },
      { t: "Troco do mercado", q: "Compras custaram R$ 17,00 e você pagou com R$ 20,00. Qual o troco?", opts: ["R$ 3,00", "R$ 2,00", "R$ 5,00", "R$ 4,00"], correct: "a", expl: "R$ 20,00 - R$ 17,00 = R$ 3,00" },
      { t: "Soma de compras", q: "Comprou caderno R$ 8,00 e caneta R$ 3,00. Pagou R$ 20,00. Qual o troco?", correct: 9, tol: 0, expl: "R$ 8 + R$ 3 = R$ 11. Troco: R$ 20 - R$ 11 = R$ 9,00" },
    ],
    5: [ // Como Guardar Dinheiro?
      { t: "Por que poupar?", q: "Por que é importante guardar dinheiro?", opts: ["Para ter dinheiro quando precisar", "Para ficar pesado", "Para decorar o quarto", "Não é importante"], correct: "a", expl: "Poupar dinheiro ajuda você a comprar coisas importantes no futuro!" },
      { t: "Cofrinho", q: "Colocar moedas no cofrinho é uma forma de poupar. Verdadeiro ou Falso?", correct: true, expl: "Verdadeiro! O cofrinho é a primeira forma de poupança!" },
      { t: "Onde guardar?", q: "Classifique os lugares", cats: [{ id: "c1", l: "Bom para guardar" }, { id: "c2", l: "Ruim para guardar" }], items: [{ id: "i1", t: "Cofrinho" }, { id: "i2", t: "Debaixo do colchão" }, { id: "i3", t: "Conta poupança" }, { id: "i4", t: "No bolso da calça" }], answer: { c1: ["i1", "i3"], c2: ["i2", "i4"] }, expl: "Cofrinhos e contas poupança são mais seguros!" },
      { t: "Poupando por semana", q: "Se guardar R$ 2,00 por semana, quanto terá em 5 semanas?", correct: 10, tol: 0, expl: "5 x R$ 2,00 = R$ 10,00" },
      { t: "Nome da conta", q: "Qual o nome da conta de banco para guardar dinheiro?", placeholder: "Digite aqui...", correct: ["poupança", "poupanca", "conta poupança", "conta poupanca"], expl: "A poupança é a conta mais simples para guardar dinheiro!" },
      { t: "Metas de poupança", q: "Conecte a meta ao tempo necessário (guardando R$ 10/semana)", pairs: [{ id: "p1", l: "Brinquedo R$ 30", r: "3 semanas" }, { id: "p2", l: "Jogo R$ 50", r: "5 semanas" }, { id: "p3", l: "Livro R$ 20", r: "2 semanas" }, { id: "p4", l: "Mochila R$ 80", r: "8 semanas" }], expl: "Dividindo o valor pela economia semanal, sabemos quanto tempo demora!" },
      { t: "Gastar tudo?", q: "O que é melhor fazer quando recebe mesada?", opts: ["Guardar uma parte e gastar outra", "Gastar tudo imediatamente", "Esconder e esquecer", "Dar tudo para amigos"], correct: "a", expl: "O ideal é guardar uma parte e usar outra com sabedoria!" },
      { t: "Formiguinha", q: "Guardar um pouquinho todo dia ajuda a juntar muito com o tempo. Verdadeiro ou Falso?", correct: true, expl: "Verdadeiro! Poupar um pouco por vez faz diferença a longo prazo." },
      { t: "Objetivo de poupar", q: "Qual é um bom motivo para poupar dinheiro?", opts: ["Comprar algo especial no futuro", "Porque é chato gastar", "Para contar moedas", "Não existe bom motivo"], correct: "a", expl: "Ter um objetivo torna mais fácil poupar!" },
      { t: "Quanto já poupou?", q: "Você tem R$ 15,00 no cofrinho e coloca mais R$ 7,00. Quanto tem agora?", correct: 22, tol: 0, expl: "R$ 15 + R$ 7 = R$ 22,00" },
    ],
    6: [ // Planejando Compras
      { t: "Lista de compras", q: "O que ajuda a não gastar demais no mercado?", opts: ["Fazer uma lista antes de ir", "Comprar de olhos fechados", "Levar todo o dinheiro", "Ir com muita fome"], correct: "a", expl: "Uma lista de compras ajuda a comprar só o necessário!" },
      { t: "Pesquisar preços", q: "Comparar preços antes de comprar é perda de tempo. Verdadeiro ou Falso?", correct: false, expl: "Falso! Comparar preços pode economizar muito dinheiro!" },
      { t: "Organizar a lista", q: "Classifique para a lista de compras", cats: [{ id: "c1", l: "Essencial" }, { id: "c2", l: "Pode esperar" }], items: [{ id: "i1", t: "Arroz" }, { id: "i2", t: "Chocolate" }, { id: "i3", t: "Leite" }, { id: "i4", t: "Figurinhas" }], answer: { c1: ["i1", "i3"], c2: ["i2", "i4"] }, expl: "Arroz e leite são essenciais. Chocolate e figurinhas podem esperar!" },
      { t: "Orçamento do lanche", q: "Você tem R$ 10,00 para o lanche. Suco R$ 4 e sanduíche R$ 5. Quanto sobra?", correct: 1, tol: 0, expl: "R$ 10 - R$ 4 - R$ 5 = R$ 1,00 de sobra!" },
      { t: "Promoção", q: "O que significa quando algo está em promoção?", placeholder: "Digite aqui...", correct: ["barato", "mais barato", "desconto", "preço menor"], expl: "Promoção significa que o produto está com preço reduzido!" },
      { t: "Combine compra e economia", q: "Conecte a estratégia ao resultado", pairs: [{ id: "p1", l: "Fazer lista", r: "Compra só o necessário" }, { id: "p2", l: "Comparar preços", r: "Encontra o mais barato" }, { id: "p3", l: "Esperar promoção", r: "Paga menos" }, { id: "p4", l: "Comprar por impulso", r: "Gasta demais" }], expl: "Planejar as compras sempre ajuda a economizar!" },
      { t: "Melhor oferta", q: "Pacote A: 3 lápis por R$ 6,00. Pacote B: 1 lápis por R$ 3,00. Qual é melhor?", opts: ["Pacote A (R$ 2 cada)", "Pacote B (R$ 3 cada)", "São iguais", "Nenhum"], correct: "a", expl: "No Pacote A cada lápis sai por R$ 2,00, mais barato!" },
      { t: "Lista ajuda?", q: "Fazer lista de compras ajuda a economizar dinheiro. Verdadeiro ou Falso?", correct: true, expl: "Verdadeiro! Com a lista, você evita compras desnecessárias." },
      { t: "Planejamento", q: "Antes de comprar um brinquedo caro, o que você deve fazer?", opts: ["Pesquisar o preço em várias lojas", "Comprar na primeira loja", "Pedir emprestado", "Desistir"], correct: "a", expl: "Pesquisar preços pode encontrar o mesmo produto mais barato!" },
      { t: "Total da compra", q: "Caderno R$ 12, borracha R$ 2, régua R$ 5. Quanto precisa?", correct: 19, tol: 0, expl: "R$ 12 + R$ 2 + R$ 5 = R$ 19,00" },
    ],
    7: [ // Dinheiro e Família
      { t: "Dinheiro da família", q: "De onde vem o dinheiro da família?", opts: ["Do trabalho dos pais", "Do governo", "Das árvores", "Da escola"], correct: "a", expl: "A principal fonte de renda da família é o trabalho dos pais!" },
      { t: "Contas da casa", q: "A família precisa pagar contas como água e luz. Verdadeiro ou Falso?", correct: true, expl: "Verdadeiro! Água, luz e moradia são despesas necessárias." },
      { t: "Despesas da família", q: "Classifique as despesas", cats: [{ id: "c1", l: "Despesa fixa" }, { id: "c2", l: "Despesa extra" }], items: [{ id: "i1", t: "Aluguel" }, { id: "i2", t: "Cinema" }, { id: "i3", t: "Mercado" }, { id: "i4", t: "Parque aquático" }], answer: { c1: ["i1", "i3"], c2: ["i2", "i4"] }, expl: "Aluguel e mercado são fixos. Cinema e parque são extras!" },
      { t: "Economizando em casa", q: "Se apagar luzes economiza R$ 30 por mês, quanto economiza em 6 meses?", correct: 180, tol: 0, expl: "6 x R$ 30 = R$ 180,00 de economia!" },
      { t: "Responsabilidade", q: "O que é ser responsável com dinheiro?", placeholder: "Digite aqui...", correct: ["economizar", "poupar", "gastar bem", "não desperdiçar"], expl: "Ser responsável é cuidar bem do dinheiro e não desperdiçar!" },
      { t: "Contribuições familiares", q: "Conecte cada pessoa ao que pode fazer para ajudar", pairs: [{ id: "p1", l: "Criança", r: "Apagar luzes" }, { id: "p2", l: "Mãe/Pai", r: "Trabalhar" }, { id: "p3", l: "Avós", r: "Ensinar economizar" }, { id: "p4", l: "Todos", r: "Evitar desperdício" }], expl: "Toda a família pode ajudar a economizar!" },
      { t: "Ajudar em casa", q: "Como crianças podem ajudar a família a economizar?", opts: ["Não desperdiçar água e comida", "Pedindo mais coisas", "Quebrando objetos", "Ligando todas as luzes"], correct: "a", expl: "Evitar desperdícios é uma grande ajuda!" },
      { t: "Orçamento familiar", q: "A família precisa gastar mais do que ganha. Verdadeiro ou Falso?", correct: false, expl: "Falso! A família deve gastar menos do que ganha para ter sobra." },
      { t: "Prioridades", q: "O que deve ser pago primeiro?", opts: ["Contas da casa (luz, água, comida)", "Brinquedos", "Roupas de marca", "Passeios"], correct: "a", expl: "As necessidades básicas sempre vêm primeiro!" },
      { t: "Conta de luz", q: "A conta de luz é R$ 80 e a de água R$ 45. Quanto a família gasta?", correct: 125, tol: 0, expl: "R$ 80 + R$ 45 = R$ 125,00" },
    ],
    8: [ // Cuidando do Dinheiro
      { t: "Protegendo seu dinheiro", q: "O que pode acontecer se não cuidar do dinheiro?", opts: ["Pode perder ou ser roubado", "Ele se multiplica", "Nada acontece", "Ele fica mais bonito"], correct: "a", expl: "Dinheiro precisa de cuidado para não ser perdido!" },
      { t: "Dinheiro rasgado", q: "Uma nota rasgada ainda vale. Verdadeiro ou Falso?", correct: true, expl: "Verdadeiro! O banco pode trocar notas danificadas." },
      { t: "Boas e más práticas", q: "Classifique os hábitos", cats: [{ id: "c1", l: "Bom hábito" }, { id: "c2", l: "Mau hábito" }], items: [{ id: "i1", t: "Guardar no cofrinho" }, { id: "i2", t: "Deixar moedas espalhadas" }, { id: "i3", t: "Contar o dinheiro" }, { id: "i4", t: "Emprestar sem anotar" }], answer: { c1: ["i1", "i3"], c2: ["i2", "i4"] }, expl: "Organizar e contar o dinheiro são bons hábitos!" },
      { t: "Dinheiro perdido", q: "Você tinha R$ 25,00 e perdeu R$ 8,00. Quanto ficou?", correct: 17, tol: 0, expl: "R$ 25 - R$ 8 = R$ 17,00. Por isso é importante guardar bem!" },
      { t: "Cuidados com dinheiro", q: "Qual a primeira coisa a fazer quando recebe dinheiro?", placeholder: "Digite aqui...", correct: ["guardar", "contar", "guardar no cofrinho", "colocar no cofre"], expl: "Guardar em lugar seguro é o primeiro passo!" },
      { t: "Segurança do dinheiro", q: "Conecte cada ação ao resultado", pairs: [{ id: "p1", l: "Guardar no cofre", r: "Seguro" }, { id: "p2", l: "Deixar no chão", r: "Pode perder" }, { id: "p3", l: "Contar antes de gastar", r: "Controle" }, { id: "p4", l: "Gastar sem pensar", r: "Desperdício" }], expl: "Cuidar do dinheiro evita perdas!" },
      { t: "Empréstimo", q: "Se emprestar dinheiro a um amigo, o que deve fazer?", opts: ["Combinar quando vai devolver", "Esquecer", "Nunca emprestar", "Pedir o dobro"], correct: "a", expl: "É importante combinar a devolução ao emprestar dinheiro." },
      { t: "Desperdício", q: "Comprar coisas que já tem é desperdício de dinheiro. Verdadeiro ou Falso?", correct: true, expl: "Verdadeiro! Antes de comprar, veja se já não tem algo parecido." },
      { t: "Dinheiro e confiança", q: "Qual é a melhor forma de cuidar da sua mesada?", opts: ["Guardar parte e planejar gastos", "Gastar tudo no mesmo dia", "Esconder e esquecer", "Dar para outras pessoas"], correct: "a", expl: "Planejar é a melhor forma de cuidar do dinheiro!" },
      { t: "Controlando gastos", q: "Se tinha R$ 30 e gastou R$ 5 + R$ 8 + R$ 7, quanto restou?", correct: 10, tol: 0, expl: "R$ 30 - R$ 5 - R$ 8 - R$ 7 = R$ 10,00" },
    ],
    9: [ // Meus Primeiros Objetivos
      { t: "O que é um objetivo?", q: "O que é um objetivo financeiro?", opts: ["Algo que você quer comprar poupando dinheiro", "Um jogo de futebol", "Uma conta de banco", "Um tipo de moeda"], correct: "a", expl: "Objetivo financeiro é uma meta que você quer alcançar com dinheiro!" },
      { t: "Todos podem ter metas", q: "Crianças podem ter objetivos financeiros. Verdadeiro ou Falso?", correct: true, expl: "Verdadeiro! Qualquer pessoa pode ter metas financeiras." },
      { t: "Curto e longo prazo", q: "Classifique os objetivos", cats: [{ id: "c1", l: "Curto prazo (semanas)" }, { id: "c2", l: "Longo prazo (meses)" }], items: [{ id: "i1", t: "Comprar figurinhas" }, { id: "i2", t: "Comprar bicicleta" }, { id: "i3", t: "Comprar lanche" }, { id: "i4", t: "Comprar videogame" }], answer: { c1: ["i1", "i3"], c2: ["i2", "i4"] }, expl: "Coisas baratas são de curto prazo, caras de longo prazo!" },
      { t: "Plano de poupança", q: "Um brinquedo custa R$ 40. Guardando R$ 5 por semana, em quantas semanas compra?", correct: 8, tol: 0, expl: "R$ 40 ÷ R$ 5 = 8 semanas!" },
      { t: "Meu sonho", q: "O que é um sonho que pode ser alcançado com dinheiro?", placeholder: "Digite seu sonho...", correct: ["bicicleta", "videogame", "celular", "tablet", "brinquedo", "viagem"], expl: "Ter um sonho é o primeiro passo para começar a poupar!" },
      { t: "Passos para o objetivo", q: "Conecte cada passo à sua ordem", pairs: [{ id: "p1", l: "1° Passo", r: "Escolher o objetivo" }, { id: "p2", l: "2° Passo", r: "Ver quanto custa" }, { id: "p3", l: "3° Passo", r: "Fazer plano de poupança" }, { id: "p4", l: "4° Passo", r: "Poupar e comprar" }], expl: "Planejar passo a passo ajuda a alcançar qualquer objetivo!" },
      { t: "Persistência", q: "O que fazer quando demora para alcançar um objetivo?", opts: ["Continuar poupando com paciência", "Desistir imediatamente", "Gastar tudo que guardou", "Ficar com raiva"], correct: "a", expl: "Paciência é fundamental para alcançar objetivos!" },
      { t: "Objetivos valem a pena", q: "Alcançar um objetivo com seu próprio dinheiro dá mais satisfação. Verdadeiro ou Falso?", correct: true, expl: "Verdadeiro! Conquistar algo com esforço próprio é muito gratificante." },
      { t: "Metas realistas", q: "Qual é uma meta realista para uma criança?", opts: ["Juntar R$ 50 em 2 meses", "Comprar um carro", "Ter R$ 1 milhão amanhã", "Nunca gastar nada"], correct: "a", expl: "Metas realistas são mais fáceis de alcançar e motivam mais!" },
      { t: "Progresso da meta", q: "Sua meta é R$ 60. Já juntou R$ 35. Quanto falta?", correct: 25, tol: 0, expl: "R$ 60 - R$ 35 = R$ 25,00. Quase lá!" },
    ],
  },
};

// For 10-12 and 13-15, generate simpler content programmatically
function generateMissionsForChapter(ageGroup, chapterNum, chapterTitle) {
  if (MISSIONS_CONTENT[ageGroup]?.[chapterNum]) {
    return MISSIONS_CONTENT[ageGroup][chapterNum];
  }

  const missions = [];
  for (let i = 0; i < 10; i++) {
    const type = TYPE_CYCLE[i];
    const mNum = i + 1;
    const base = { t: `${chapterTitle} - Missão ${mNum}` };

    if (type === "quiz") {
      missions.push({
        ...base,
        q: `Pergunta ${mNum} sobre ${chapterTitle.toLowerCase()}?`,
        opts: ["Resposta correta", "Opção B", "Opção C", "Opção D"],
        correct: "a",
        expl: `Parabéns! Você acertou sobre ${chapterTitle.toLowerCase()}!`,
      });
    } else if (type === "true_false") {
      missions.push({
        ...base,
        q: `Afirmação sobre ${chapterTitle.toLowerCase()}. Verdadeiro ou Falso?`,
        correct: true,
        expl: `Correto! Boa observação sobre ${chapterTitle.toLowerCase()}.`,
      });
    } else if (type === "drag_drop") {
      missions.push({
        ...base,
        q: `Classifique os itens sobre ${chapterTitle.toLowerCase()}`,
        cats: [{ id: "c1", l: "Categoria A" }, { id: "c2", l: "Categoria B" }],
        items: [{ id: "i1", t: "Item 1" }, { id: "i2", t: "Item 2" }, { id: "i3", t: "Item 3" }, { id: "i4", t: "Item 4" }],
        answer: { c1: ["i1", "i2"], c2: ["i3", "i4"] },
        expl: `Ótima classificação sobre ${chapterTitle.toLowerCase()}!`,
      });
    } else if (type === "numeric_input") {
      missions.push({
        ...base,
        q: `Calcule o resultado sobre ${chapterTitle.toLowerCase()}`,
        correct: 10,
        tol: 0,
        expl: `Cálculo correto! A resposta é 10.`,
      });
    } else if (type === "text_input") {
      missions.push({
        ...base,
        q: `Complete a frase sobre ${chapterTitle.toLowerCase()}`,
        placeholder: "Digite aqui...",
        correct: ["resposta", "resposta correta"],
        expl: `Muito bem! Você completou corretamente.`,
      });
    } else if (type === "matching") {
      missions.push({
        ...base,
        q: `Conecte os conceitos sobre ${chapterTitle.toLowerCase()}`,
        pairs: [{ id: "p1", l: "Conceito A", r: "Definição A" }, { id: "p2", l: "Conceito B", r: "Definição B" }, { id: "p3", l: "Conceito C", r: "Definição C" }, { id: "p4", l: "Conceito D", r: "Definição D" }],
        expl: `Conexões corretas sobre ${chapterTitle.toLowerCase()}!`,
      });
    }
  }
  return missions;
}

function missionToSQL(mission, type, ageGroup, chapterNum, missionNum) {
  const chapterRef = `(SELECT c.id FROM public.chapters c WHERE c.age_group = '${ageGroup}' AND c.chapter_number = ${chapterNum})`;

  let content, correctAnswer;

  if (type === "quiz") {
    content = JSON.stringify({
      question: mission.q,
      options: mission.opts.map((text, i) => ({ id: String.fromCharCode(97 + i), text })),
    });
    correctAnswer = JSON.stringify({ correct: mission.correct });
  } else if (type === "true_false") {
    content = JSON.stringify({ question: mission.q });
    correctAnswer = JSON.stringify({ correct: mission.correct });
  } else if (type === "drag_drop") {
    content = JSON.stringify({
      question: mission.q,
      categories: mission.cats,
      items: mission.items,
    });
    correctAnswer = JSON.stringify(mission.answer);
  } else if (type === "numeric_input") {
    content = JSON.stringify({
      question: mission.q,
      placeholder: "R$",
      unit: "reais",
    });
    correctAnswer = JSON.stringify({ correct: mission.correct, tolerance: mission.tol ?? 0 });
  } else if (type === "text_input") {
    content = JSON.stringify({
      question: mission.q,
      placeholder: mission.placeholder || "Digite aqui...",
    });
    correctAnswer = JSON.stringify({ correct: mission.correct, case_sensitive: false });
  } else if (type === "matching") {
    content = JSON.stringify({
      question: mission.q,
      pairs: mission.pairs,
    });
    const matchAnswer = {};
    mission.pairs.forEach((p) => { matchAnswer[p.id] = p.id; });
    correctAnswer = JSON.stringify(matchAnswer);
  }

  const title = mission.t.replace(/'/g, "''");
  const expl = (mission.expl || "").replace(/'/g, "''");

  return `INSERT INTO public.missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
VALUES (${chapterRef}, ${missionNum}, '${title}', '${type}', '${content.replace(/'/g, "''")}'::jsonb, '${correctAnswer.replace(/'/g, "''")}'::jsonb, '${expl}', 10, ${missionNum});`;
}

// Generate SQL
let sql = `-- =============================================
-- Seed data for Chapter-based Mission System
-- Run AFTER chapters-migration.sql
-- =============================================

-- 1. Insert 27 chapters
`;

for (const [ageGroup, chapters] of Object.entries(CHAPTERS)) {
  sql += `\n-- Faixa ${ageGroup} anos\n`;
  for (const ch of chapters) {
    const title = ch.title.replace(/'/g, "''");
    const desc = ch.desc.replace(/'/g, "''");
    sql += `INSERT INTO public.chapters (age_group, chapter_number, title, description, icon, order_position) VALUES ('${ageGroup}', ${ch.n}, '${title}', '${desc}', '${ch.icon}', ${ch.n});\n`;
  }
}

sql += `\n-- 2. Insert 270 missions (10 per chapter)\n`;

for (const [ageGroup, chapters] of Object.entries(CHAPTERS)) {
  for (const ch of chapters) {
    sql += `\n-- ${ageGroup} / Cap ${ch.n}: ${ch.title}\n`;
    const missions = generateMissionsForChapter(ageGroup, ch.n, ch.title);
    for (let i = 0; i < 10; i++) {
      sql += missionToSQL(missions[i], TYPE_CYCLE[i], ageGroup, ch.n, i + 1) + "\n";
    }
  }
}

// Final exams
sql += `\n-- 3. Insert 30 final exam questions (10 per age group)\n`;

const examTypes = ["quiz", "true_false", "quiz", "numeric_input", "quiz", "true_false", "matching", "quiz", "numeric_input", "quiz"];

for (const ageGroup of ["7-9", "10-12", "13-15"]) {
  sql += `\n-- Prova Final ${ageGroup} anos\n`;
  for (let i = 0; i < 10; i++) {
    const type = examTypes[i];
    const qNum = i + 1;
    let content, correctAnswer;

    if (type === "quiz") {
      content = JSON.stringify({
        question: `Prova Final Q${qNum}: Pergunta geral sobre educação financeira?`,
        options: [
          { id: "a", text: "Resposta correta" },
          { id: "b", text: "Opção incorreta B" },
          { id: "c", text: "Opção incorreta C" },
          { id: "d", text: "Opção incorreta D" },
        ],
      });
      correctAnswer = JSON.stringify({ correct: "a" });
    } else if (type === "true_false") {
      content = JSON.stringify({ question: `Prova Final Q${qNum}: Afirmação sobre finanças. Verdadeiro ou Falso?` });
      correctAnswer = JSON.stringify({ correct: true });
    } else if (type === "numeric_input") {
      content = JSON.stringify({ question: `Prova Final Q${qNum}: Calcule o resultado.`, placeholder: "R$", unit: "reais" });
      correctAnswer = JSON.stringify({ correct: 100, tolerance: 0 });
    } else if (type === "matching") {
      content = JSON.stringify({
        question: `Prova Final Q${qNum}: Conecte os conceitos financeiros`,
        pairs: [
          { id: "p1", left: "Poupar", right: "Guardar dinheiro" },
          { id: "p2", left: "Investir", right: "Fazer dinheiro crescer" },
          { id: "p3", left: "Gastar", right: "Usar dinheiro" },
          { id: "p4", left: "Ganhar", right: "Receber dinheiro" },
        ],
      });
      correctAnswer = JSON.stringify({ p1: "p1", p2: "p2", p3: "p3", p4: "p4" });
    }

    const chapters = qNum <= 3 ? [1, 2, 3] : qNum <= 6 ? [4, 5, 6] : [7, 8, 9];

    sql += `INSERT INTO public.final_exams (age_group, question_number, title, mission_type, content, correct_answer, explanation, points_reward, chapters_covered)
VALUES ('${ageGroup}', ${qNum}, 'Prova Final - Questão ${qNum}', '${type}', '${content.replace(/'/g, "''")}'::jsonb, '${correctAnswer.replace(/'/g, "''")}'::jsonb, 'Resposta da Prova Final Q${qNum}', 50, ARRAY[${chapters.join(",")}]);\n`;
  }
}

// Initialize progress for existing children
sql += `
-- 4. Initialize progress for all existing children
DO $$
DECLARE
  child_record RECORD;
BEGIN
  FOR child_record IN SELECT id, age_group FROM public.children LOOP
    PERFORM public.initialize_child_progress(child_record.id, child_record.age_group);
  END LOOP;
END $$;
`;

process.stdout.write(sql);
