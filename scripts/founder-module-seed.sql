-- =============================================
-- Módulo Fundador — Seed: 10 Missões em Família
-- Faixa: 7-9 anos / chapter_number: 10
-- Run AFTER founder-module-migration.sql
-- =============================================

-- Limpa missões antigas do capítulo Módulo Fundador (se já existir)
DELETE FROM missions WHERE chapter_id IN (
  SELECT id FROM chapters WHERE age_group = '7-9' AND chapter_number = 10
);

-- MISSÃO 1 — De Onde Vem o Dinheiro?
-- Capítulo referenciado: O que é Dinheiro?
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 1, 'De Onde Vem o Dinheiro?', 'family_mission',
'{
  "story": "Você sabia que o dinheiro não aparece do nada? Cada nota ou moeda que a sua família tem veio de algum trabalho ou esforço. Hoje você vai descobrir de onde vem o dinheiro da SUA família!",
  "real_world_action": "Pergunte a um adulto da sua família: Como você ganha dinheiro? Ouça com atenção e tente entender o que ele faz.",
  "related_chapter": "O que é Dinheiro?",
  "parent_guidance": "Compartilhe de forma simples e adequada à idade como você ganha dinheiro — pode ser emprego, negócio próprio, aposentadoria, etc. Aproveite para explicar que trabalho é a principal fonte de renda da maioria das famílias. Seja honesto e acolhedor durante a conversa.",
  "registration_prompt": "O que você descobriu? Escreva de onde vem o dinheiro da sua família.",
  "registration_type": "text"
}'::jsonb,
'{"always_correct": true}'::jsonb,
'Incrível! Saber de onde vem o dinheiro da família é o primeiro passo para entender finanças de verdade. 🌟',
15, 1
FROM chapters c WHERE c.age_group = '7-9' AND c.chapter_number = 10;

-- MISSÃO 2 — Pequeno Empreendedor
-- Capítulo referenciado: Como Ganhar Dinheiro?
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 2, 'Pequeno Empreendedor', 'family_mission',
'{
  "story": "Algumas crianças já ganham seu próprio dinheiro fazendo coisas que gostam ou que são boas em fazer. Você pode ganhar dinheiro também — ajudando em casa, vendendo algo, ou prestando um serviço para os vizinhos!",
  "real_world_action": "Com a ajuda de um adulto, pense em uma ideia de como você poderia ganhar um dinheiro extra. Pode ser lavar o carro, vender limonada, fazer origami... Apresente sua ideia para a família!",
  "related_chapter": "Como Ganhar Dinheiro?",
  "parent_guidance": "Incentive a criança a pensar em habilidades e interesses que ela já tem. Ajude-a a tornar a ideia viável e segura. Se possível, coloque em prática juntos! O objetivo não é ganhar muito dinheiro, mas entender o conceito de valor e esforço.",
  "registration_prompt": "Qual foi a sua ideia de empreendimento? Escreva como você planejou ganhar dinheiro.",
  "registration_type": "text"
}'::jsonb,
'{"always_correct": true}'::jsonb,
'Parabéns, pequeno empreendedor! Toda grande empresa começa com uma ideia simples. 🚀',
15, 2
FROM chapters c WHERE c.age_group = '7-9' AND c.chapter_number = 10;

-- MISSÃO 3 — Quer ou Preciso?
-- Capítulo referenciado: Como Gastar Bem?
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 3, 'Quer ou Preciso?', 'family_mission',
'{
  "story": "Nem tudo que queremos comprar é uma necessidade. Às vezes a gente QUER uma coisa, mas não PRECISA dela. Saber a diferença é um superpoder financeiro!",
  "real_world_action": "Olhe em volta da sua casa com um adulto e escolha 5 coisas. Para cada uma, decidam juntos: é uma necessidade (precisamos para viver) ou um desejo (queremos, mas não precisamos)?",
  "related_chapter": "Como Gastar Bem?",
  "parent_guidance": "Percorra a casa juntos e escolham 5 objetos variados — pode ser comida, brinquedo, TV, roupa de frio, etc. Discuta cada um com a criança sem julgamentos. O objetivo é desenvolver o pensamento crítico sobre consumo, não criar culpa.",
  "registration_prompt": "Das 5 coisas que vocês escolheram, quantas eram necessidades e quantas eram desejos?",
  "registration_type": "selection",
  "registration_options": [
    "5 necessidades e 0 desejos",
    "4 necessidades e 1 desejo",
    "3 necessidades e 2 desejos",
    "2 ou menos necessidades"
  ]
}'::jsonb,
'{"always_correct": true}'::jsonb,
'Ótimo trabalho! Identificar necessidades e desejos é essencial para gastar de forma inteligente. 🧠',
15, 3
FROM chapters c WHERE c.age_group = '7-9' AND c.chapter_number = 10;

-- MISSÃO 4 — Escolha Inteligente
-- Capítulo referenciado: Como Gastar Bem?
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 4, 'Escolha Inteligente', 'family_mission',
'{
  "story": "Quando queremos comprar algo, nem sempre precisamos pegar o primeiro que vemos. Comparar opções é a atitude de quem sabe gastar bem!",
  "real_world_action": "Escolha um item que a família precise comprar em breve (pode ser um alimento, um produto de limpeza, um caderno...). Juntos, pesquisem o preço em pelo menos 2 lugares diferentes — loja física, app ou site.",
  "related_chapter": "Como Gastar Bem?",
  "parent_guidance": "Escolha um item simples do dia a dia para a pesquisa de preços. Use isso para mostrar que a mesma coisa pode custar valores diferentes em lugares diferentes. Mostre como pesquisar no supermercado, no app de compras ou no Google. Calcule juntos quanto se economizaria comprando no mais barato.",
  "registration_prompt": "Vocês conseguiram encontrar preços diferentes para o mesmo produto?",
  "registration_type": "selection",
  "registration_options": [
    "Sim! O mais barato economizou até R$ 2,00",
    "Sim! O mais barato economizou mais de R$ 2,00",
    "Os preços eram quase iguais",
    "Pesquisamos em apenas um lugar"
  ]
}'::jsonb,
'{"always_correct": true}'::jsonb,
'Pesquisar preços é um hábito dos melhores compradores. Continue assim! 🔍',
15, 4
FROM chapters c WHERE c.age_group = '7-9' AND c.chapter_number = 10;

-- MISSÃO 5 — Supermercado Investigador
-- Capítulo referenciado: Troco e Cálculos
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 5, 'Supermercado Investigador', 'family_mission',
'{
  "story": "O supermercado é um lugar cheio de números! Preços, quantidades, descontos... Se você prestar atenção, vai perceber que é quase uma aula de matemática!",
  "real_world_action": "Na próxima ida ao supermercado (ou usando um aplicativo de compras), tente adivinhar o total de 3 itens antes de ver o preço final. Depois compare: você chegou perto?",
  "related_chapter": "Troco e Cálculos",
  "parent_guidance": "No supermercado, peça à criança para ler o preço de cada item escolhido e tentar somar mentalmente ou no papel. Depois mostre o total na máquina. Se não for ao supermercado esta semana, use um app ou anúncio de jornal. O importante é praticar a soma de preços reais.",
  "registration_prompt": "Como foi sua investigação no supermercado? Escreva o que você descobriu.",
  "registration_type": "text"
}'::jsonb,
'{"always_correct": true}'::jsonb,
'Muito bem, detetive das compras! Calcular preços na cabeça é uma habilidade valiosa. 🧮',
15, 5
FROM chapters c WHERE c.age_group = '7-9' AND c.chapter_number = 10;

-- MISSÃO 6 — Regra dos 3 Potes
-- Capítulo referenciado: Como Guardar Dinheiro?
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 6, 'Regra dos 3 Potes', 'family_mission',
'{
  "story": "Uma das formas mais divertidas de organizar o dinheiro é a Regra dos 3 Potes: um pote para GASTAR (coisas do dia a dia), um para GUARDAR (sonhos futuros) e um para COMPARTILHAR (ajudar alguém ou um projeto). Hoje você vai criar os seus!",
  "real_world_action": "Junto com um adulto, encontre 3 potes, copos ou caixas em casa. Identifique cada um com um papel: Gastar, Guardar, Compartilhar. Se você tiver qualquer dinheiro disponível (mesada, presente...), divida-o entre os três potes.",
  "related_chapter": "Como Guardar Dinheiro?",
  "parent_guidance": "Ajude a criança a encontrar ou criar os 3 potes (podem ser copos com post-it, potes de plástico, etc.). Se ela tiver mesada ou qualquer valor disponível, oriente-a a dividir: sugestão 50% gastar, 40% guardar, 10% compartilhar. Se não tiver dinheiro disponível agora, faça a divisão simbólica ou combine como será dividida a próxima mesada.",
  "registration_prompt": "Você conseguiu criar os 3 potes?",
  "registration_type": "selection",
  "registration_options": [
    "Sim! Já coloquei dinheiro em cada um",
    "Sim! Criei os potes e sei como usar",
    "Criei só alguns dos potes",
    "Ainda não consigo criar, mas entendi a ideia"
  ]
}'::jsonb,
'{"always_correct": true}'::jsonb,
'Os 3 potes são um sistema simples e poderoso! Pessoas bem-sucedidas usam essa estratégia a vida toda. 🐷',
15, 6
FROM chapters c WHERE c.age_group = '7-9' AND c.chapter_number = 10;

-- MISSÃO 7 — Meu Primeiro Objetivo
-- Capítulo referenciado: Planejando Compras
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 7, 'Meu Primeiro Objetivo', 'family_mission',
'{
  "story": "Guardar dinheiro fica muito mais fácil quando temos um objetivo claro. Um objetivo é quando você sabe EXATAMENTE o que quer comprar, quanto custa, e quanto tempo precisa para juntar.",
  "real_world_action": "Escolha uma coisa que você REALMENTE quer e que custa entre R$ 20,00 e R$ 100,00. Junto com um adulto, calcule: quanto você precisaria guardar por semana para comprar em 4 semanas?",
  "related_chapter": "Planejando Compras",
  "parent_guidance": "Ajude a criança a escolher um objetivo realista. Mostre como calcular: preço ÷ número de semanas = valor semanal a guardar. Escreva o objetivo em um papel e coloque em lugar visível. Isso torna o sonho concreto e ensinará perseverança financeira.",
  "registration_prompt": "Qual é o seu objetivo de compra e quanto você precisa guardar por semana?",
  "registration_type": "text"
}'::jsonb,
'{"always_correct": true}'::jsonb,
'Com um objetivo claro, fica muito mais fácil economizar! Você está no caminho certo. 🎯',
15, 7
FROM chapters c WHERE c.age_group = '7-9' AND c.chapter_number = 10;

-- MISSÃO 8 — Conversa de 10 Minutos
-- Capítulo referenciado: Dinheiro e Família
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 8, 'Conversa de 10 Minutos', 'family_mission',
'{
  "story": "Nas famílias em que as pessoas falam abertamente sobre dinheiro, todo mundo aprende mais e fica mais preparado para a vida. Hoje é o dia da conversa sobre dinheiro em família!",
  "real_world_action": "Sente com um adulto por 10 minutos e façam perguntas um para o outro: Qual foi o maior erro com dinheiro que você já cometeu? O que você aprendeu com isso? Qual é o seu conselho de dinheiro favorito?",
  "related_chapter": "Dinheiro e Família",
  "parent_guidance": "Esta é uma conversa de troca — você também faz perguntas à criança! Seja vulnerável ao compartilhar erros passados (de forma adequada à idade). Normalize falar sobre dinheiro em casa. Se possível, inclua outros membros da família. Não precisa durar exatamente 10 minutos, mas foque na qualidade da conversa.",
  "registration_prompt": "Qual foi a coisa mais interessante que você aprendeu na conversa?",
  "registration_type": "text"
}'::jsonb,
'{"always_correct": true}'::jsonb,
'Falar sobre dinheiro em família é um dos maiores presentes que você pode dar ao seu futuro! 💬',
15, 8
FROM chapters c WHERE c.age_group = '7-9' AND c.chapter_number = 10;

-- MISSÃO 9 — O Dinheiro Não É Infinito
-- Capítulo referenciado: Cuidando do Dinheiro
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 9, 'O Dinheiro Não É Infinito', 'family_mission',
'{
  "story": "Toda família tem uma renda (o que entra) e gastos (o que sai). Quando os gastos são maiores do que a renda, surgem problemas. Entender isso ajuda a cuidar melhor do dinheiro da família!",
  "real_world_action": "Peça a um adulto para te mostrar (de forma resumida) as principais despesas fixas da família — como aluguel, água, luz, mercado. Tente entender: se a família ganha R$ 100,00, quanto vai para cada coisa?",
  "related_chapter": "Cuidando do Dinheiro",
  "parent_guidance": "Compartilhe de forma simplificada as principais contas fixas da família, usando valores reais ou proporcionais (ex: de cada R$ 100 que entra, R$ 40 vão para aluguel). Não é necessário revelar a renda exata — use porcentagens ou proporções. O objetivo é que a criança compreenda que há limites e que gastar de forma responsável ajuda a família.",
  "registration_prompt": "O que você aprendeu sobre as despesas da sua família? Escreva 2 coisas que você descobriu.",
  "registration_type": "text"
}'::jsonb,
'{"always_correct": true}'::jsonb,
'Entender o orçamento da família é um passo enorme! Crianças que aprendem isso crescem muito mais preparadas. 💪',
15, 9
FROM chapters c WHERE c.age_group = '7-9' AND c.chapter_number = 10;

-- MISSÃO 10 — Planejamento da Semana
-- Capítulo referenciado: Meus Primeiros Objetivos
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 10, 'Planejamento da Semana', 'family_mission',
'{
  "story": "Você chegou à missão final do Módulo Fundador! Agora é hora de colocar tudo em prática. Um plano simples de uma semana já é suficiente para criar o hábito de pensar no dinheiro com responsabilidade.",
  "real_world_action": "Junto com um adulto, crie um mini plano financeiro para a próxima semana: Quanto de dinheiro a família tem disponível para gastos extras? Quais são os gastos planejados? Quanto vai para o pote de guardar?",
  "related_chapter": "Meus Primeiros Objetivos",
  "parent_guidance": "Crie um planejamento simples da semana com a criança — pode ser numa folha de papel ou no celular. Inclua: valor disponível para gastos extras, o que está planejado gastar e quanto vai para a poupança. Deixe a criança participar das decisões. Ao final da semana, revisem juntos se o plano foi seguido. Isso cria o hábito do orçamento.",
  "registration_prompt": "Seu plano da semana está pronto! Como foi criar o planejamento com a sua família?",
  "registration_type": "selection",
  "registration_options": [
    "Foi fácil e aprendi muito!",
    "Foi um pouco difícil, mas conseguimos",
    "Tivemos dificuldades, mas tentamos",
    "Ainda preciso terminar com a família"
  ]
}'::jsonb,
'{"always_correct": true}'::jsonb,
'Parabéns! Você completou o Módulo Fundador — Jornada Prática em Família! Você é um verdadeiro Fundador Zapfy! 🏅🎉',
15, 10
FROM chapters c WHERE c.age_group = '7-9' AND c.chapter_number = 10;
