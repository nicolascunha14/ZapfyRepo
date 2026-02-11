-- =====================================================
-- SEED: Missões dos Capítulos 1-9 — Faixa 10-12 anos (Médio)
-- Total: 90 missões (10 por capítulo)
-- =====================================================

-- =====================================================
-- CAPÍTULO 1 — "Dinheiro Digital"
-- =====================================================

DELETE FROM missions WHERE chapter_id IN (
  SELECT id FROM chapters WHERE age_group = '10-12' AND chapter_number = 1
);

-- MISSÃO 1 — Quiz — Fácil
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 1, 'O que é PIX?', 'quiz',
'{
  "question": "O PIX é uma forma de transferir dinheiro que funciona:",
  "options": [
    {"id": "a", "text": "Só de segunda a sexta, em horário comercial"},
    {"id": "b", "text": "24 horas por dia, 7 dias por semana, em segundos"},
    {"id": "c", "text": "Apenas entre pessoas do mesmo banco"},
    {"id": "d", "text": "Só para valores acima de R$ 100"}
  ]
}'::jsonb,
'{"correct": "b"}'::jsonb,
'Isso mesmo! 🎉 O PIX foi criado pelo Banco Central do Brasil e funciona a qualquer hora, qualquer dia, em poucos segundos. É uma das formas de pagamento mais rápidas do mundo!',
10, 1
FROM chapters c WHERE c.age_group = '10-12' AND c.chapter_number = 1;

-- MISSÃO 2 — Quiz — Fácil
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 2, 'Cartão de débito ou crédito?', 'quiz',
'{
  "question": "Qual é a diferença entre cartão de débito e cartão de crédito?",
  "options": [
    {"id": "a", "text": "Não há diferença, são a mesma coisa"},
    {"id": "b", "text": "O débito desconta na hora da sua conta. O crédito é um \"empréstimo\" que você paga depois"},
    {"id": "c", "text": "O crédito desconta na hora. O débito você paga no mês seguinte"},
    {"id": "d", "text": "Débito só funciona em lojas físicas"}
  ]
}'::jsonb,
'{"correct": "b"}'::jsonb,
'Perfeito! 💳 No débito, o dinheiro sai da sua conta na hora. No crédito, o banco "empresta" o valor e você paga na fatura do mês seguinte. Por isso, usar crédito sem planejamento pode virar uma dívida!',
10, 2
FROM chapters c WHERE c.age_group = '10-12' AND c.chapter_number = 1;

-- MISSÃO 3 — Quiz — Fácil
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 3, 'Verdade ou mito?', 'quiz',
'{
  "question": "Uma pessoa pode ter conta bancária sem ir a uma agência física?",
  "options": [
    {"id": "a", "text": "Não, precisa sempre ir ao banco pessoalmente"},
    {"id": "b", "text": "Sim, existem bancos 100% digitais como Nubank, Inter e C6"},
    {"id": "c", "text": "Sim, mas apenas para maiores de 18 anos"},
    {"id": "d", "text": "Não, isso não é seguro"}
  ]
}'::jsonb,
'{"correct": "b"}'::jsonb,
'Verdade! 📱 Os bancos digitais (ou neobanks) funcionam 100% pelo celular. Muitos até permitem conta para menores de idade com autorização dos pais!',
10, 3
FROM chapters c WHERE c.age_group = '10-12' AND c.chapter_number = 1;

-- MISSÃO 4 — Drag & Drop — Médio
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 4, 'Organize os pagamentos', 'drag_drop',
'{
  "question": "Arraste cada forma de pagamento para a categoria correta:",
  "categories": ["Paga na hora", "Paga depois"],
  "items": [
    {"id": "1", "text": "💵 Dinheiro em espécie"},
    {"id": "2", "text": "💳 Cartão de débito"},
    {"id": "3", "text": "📱 PIX"},
    {"id": "4", "text": "💳 Cartão de crédito"},
    {"id": "5", "text": "📄 Boleto com vencimento"}
  ]
}'::jsonb,
'{"correct": {"1": "Paga na hora", "2": "Paga na hora", "3": "Paga na hora", "4": "Paga depois", "5": "Paga depois"}}'::jsonb,
'Ótimo! Entender quando o dinheiro sai da sua conta é essencial para não gastar mais do que você tem!',
10, 4
FROM chapters c WHERE c.age_group = '10-12' AND c.chapter_number = 1;

-- MISSÃO 5 — Numeric Input — Médio
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 5, 'Quanto entrou na conta?', 'numeric_input',
'{
  "question": "📱 Ana recebeu R$ 50,00 de mesada via PIX. Comprou um jogo por R$ 23,00 no débito. Quanto ainda tem na conta?",
  "placeholder": "R$",
  "unit": "reais"
}'::jsonb,
'{"correct": 27, "tolerance": 0}'::jsonb,
'Muito bem! 50 - 23 = R$ 27,00. Sempre acompanhe quanto entra e sai da sua conta!',
10, 5
FROM chapters c WHERE c.age_group = '10-12' AND c.chapter_number = 1;

-- MISSÃO 6 — Quiz — Médio
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 6, 'Qual app usar?', 'quiz',
'{
  "question": "Para fazer um PIX para um amigo, o que você precisa saber?",
  "options": [
    {"id": "a", "text": "O número do CPF, telefone, email ou chave PIX dele"},
    {"id": "b", "text": "A senha do banco dele"},
    {"id": "c", "text": "O número do cartão de crédito dele"},
    {"id": "d", "text": "O endereço da casa dele"}
  ]
}'::jsonb,
'{"correct": "a"}'::jsonb,
'Exato! 🔑 A chave PIX pode ser CPF, telefone, email ou uma chave aleatória. Com qualquer uma delas, você consegue transferir dinheiro em segundos!',
10, 6
FROM chapters c WHERE c.age_group = '10-12' AND c.chapter_number = 1;

-- MISSÃO 7 — Quiz — Difícil
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 7, 'Segurança digital', 'quiz',
'{
  "question": "Você recebeu uma mensagem dizendo que ganhou R$ 500,00 e precisa clicar num link para receber. O que você deve fazer?",
  "options": [
    {"id": "a", "text": "Clicar no link rapidamente antes de perder o prêmio"},
    {"id": "b", "text": "Ignorar ou mostrar para um adulto de confiança — provavelmente é golpe"},
    {"id": "c", "text": "Compartilhar com amigos para eles também receberem"},
    {"id": "d", "text": "Responder a mensagem com seus dados pessoais"}
  ]
}'::jsonb,
'{"correct": "b"}'::jsonb,
'Cuidado! 🚨 Isso se chama phishing — um golpe muito comum. Nenhum banco ou empresa sorteia prêmios por mensagem pedindo que você clique em links. Sempre mostre para um adulto quando receber mensagens assim!',
10, 7
FROM chapters c WHERE c.age_group = '10-12' AND c.chapter_number = 1;

-- MISSÃO 8 — Numeric Input — Difícil
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 8, 'Calcula a fatura', 'numeric_input',
'{
  "question": "💳 Durante o mês, você usou o cartão de crédito assim:\n\nLanche: R$ 15,00\nLivro: R$ 32,00\nPresente: R$ 28,00\n\nQuanto vai vir na fatura?",
  "placeholder": "R$",
  "unit": "reais"
}'::jsonb,
'{"correct": 75, "tolerance": 0}'::jsonb,
'Isso! 15 + 32 + 28 = R$ 75,00. Sempre some seus gastos no crédito para não se surpreender com a fatura!',
10, 8
FROM chapters c WHERE c.age_group = '10-12' AND c.chapter_number = 1;

-- MISSÃO 9 — Drag & Drop — Difícil
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 9, 'Vantagens e desvantagens', 'drag_drop',
'{
  "question": "Arraste cada característica para o tipo de pagamento correto:",
  "categories": ["Dinheiro em espécie", "Pagamento digital"],
  "items": [
    {"id": "1", "text": "🔒 Mais seguro se o celular for roubado"},
    {"id": "2", "text": "⚡ Transferência instantânea"},
    {"id": "3", "text": "📊 Histórico automático de gastos"},
    {"id": "4", "text": "💸 Se perder, não tem como recuperar"},
    {"id": "5", "text": "🌎 Funciona em compras online"}
  ]
}'::jsonb,
'{"correct": {"1": "Dinheiro em espécie", "2": "Pagamento digital", "3": "Pagamento digital", "4": "Dinheiro em espécie", "5": "Pagamento digital"}}'::jsonb,
'Cada forma de pagamento tem seus pontos fortes e fracos. O ideal é entender cada uma e usar a mais adequada para cada situação!',
10, 9
FROM chapters c WHERE c.age_group = '10-12' AND c.chapter_number = 1;

-- MISSÃO 10 — BOSS 🏆 — Quiz
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 10, '🏆 Boss: Dinheiro Digital', 'quiz',
'{
  "question": "Lucas tem R$ 200,00 na conta. Ele fez as seguintes transações:\n\nPIX recebido de R$ 50,00\nCompra no débito de R$ 80,00\nCompra no crédito de R$ 120,00\n\nQuanto Lucas tem na conta AGORA?",
  "options": [
    {"id": "a", "text": "R$ 50,00"},
    {"id": "b", "text": "R$ 170,00"},
    {"id": "c", "text": "R$ 30,00"},
    {"id": "d", "text": "R$ 290,00"}
  ]
}'::jsonb,
'{"correct": "b"}'::jsonb,
'🏆 A compra no crédito NÃO sai da conta agora — ela vira fatura! Então: 200 + 50 - 80 = R$ 170,00 na conta. Os R$ 120,00 do crédito vêm na próxima fatura. Essa é uma diferença crucial!',
10, 10
FROM chapters c WHERE c.age_group = '10-12' AND c.chapter_number = 1;

-- =====================================================
-- CAPÍTULO 2 — "Matemática do Dinheiro"
-- =====================================================

DELETE FROM missions WHERE chapter_id IN (
  SELECT id FROM chapters WHERE age_group = '10-12' AND chapter_number = 2
);

-- MISSÃO 1 — Quiz — Fácil
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 1, 'O que é porcentagem?', 'quiz',
'{
  "question": "10% de R$ 100,00 é:",
  "options": [
    {"id": "a", "text": "R$ 1,00"},
    {"id": "b", "text": "R$ 10,00"},
    {"id": "c", "text": "R$ 100,00"},
    {"id": "d", "text": "R$ 0,10"}
  ]
}'::jsonb,
'{"correct": "b"}'::jsonb,
'Isso! 🎯 Porcentagem é uma fração de 100. 10% = 10 partes de 100. Então 10% de R$ 100 = R$ 10. Pense assim: % significa "de cada 100".',
10, 1
FROM chapters c WHERE c.age_group = '10-12' AND c.chapter_number = 2;

-- MISSÃO 2 — Quiz — Fácil
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 2, 'Desconto real', 'quiz',
'{
  "question": "Uma camiseta custa R$ 80,00 com 25% de desconto. O desconto em reais é:",
  "options": [
    {"id": "a", "text": "R$ 25,00"},
    {"id": "b", "text": "R$ 20,00"},
    {"id": "c", "text": "R$ 40,00"},
    {"id": "d", "text": "R$ 15,00"}
  ]
}'::jsonb,
'{"correct": "b"}'::jsonb,
'Perfeito! 25% de 80 = 80 ÷ 4 = R$ 20,00. Dica rápida: 25% = dividir por 4. Sempre converta o desconto em reais para saber quanto está realmente economizando!',
10, 2
FROM chapters c WHERE c.age_group = '10-12' AND c.chapter_number = 2;

-- MISSÃO 3 — Numeric Input — Fácil
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 3, 'Quanto custa no final?', 'numeric_input',
'{
  "question": "Um tênis custa R$ 120,00. Tem 10% de desconto. Qual o preço final?",
  "placeholder": "R$",
  "unit": "reais"
}'::jsonb,
'{"correct": 108, "tolerance": 0}'::jsonb,
'10% de 120 = R$ 12,00 de desconto. 120 - 12 = R$ 108,00. Sempre calcule o preço final, não apenas o desconto!',
10, 3
FROM chapters c WHERE c.age_group = '10-12' AND c.chapter_number = 2;

-- MISSÃO 4 — Drag & Drop (Ordenação) — Médio
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 4, 'Ordena do menor ao maior desconto', 'drag_drop',
'{
  "question": "Ordene as promoções do MENOR para o MAIOR desconto real em reais:",
  "items": [
    {"id": "1", "text": "🏷️ 10% de desconto em R$ 200 = R$ 20"},
    {"id": "2", "text": "🏷️ 15% de desconto em R$ 100 = R$ 15"},
    {"id": "3", "text": "🏷️ 20% de desconto em R$ 150 = R$ 30"},
    {"id": "4", "text": "🏷️ 5% de desconto em R$ 500 = R$ 25"}
  ]
}'::jsonb,
'{"correct_order": ["2", "1", "4", "3"]}'::jsonb,
'Uma porcentagem maior não significa necessariamente um desconto maior em reais! Sempre calcule o valor real do desconto antes de decidir qual oferta é melhor.',
10, 4
FROM chapters c WHERE c.age_group = '10-12' AND c.chapter_number = 2;

-- MISSÃO 5 — Numeric Input — Médio
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 5, 'Acréscimo de juros', 'numeric_input',
'{
  "question": "Um videogame custa R$ 300,00 à vista. Parcelado em 3x tem acréscimo de 10%. Quanto você paga a mais parcelando?",
  "placeholder": "R$",
  "unit": "reais"
}'::jsonb,
'{"correct": 30, "tolerance": 0}'::jsonb,
'10% de R$ 300 = R$ 30,00 a mais. Parcelar parece mais fácil, mas quase sempre você paga mais no total. Vale a pena juntar e pagar à vista!',
10, 5
FROM chapters c WHERE c.age_group = '10-12' AND c.chapter_number = 2;

-- MISSÃO 6 — Quiz — Médio
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 6, 'Promoção verdadeira ou falsa?', 'quiz',
'{
  "question": "Uma loja diz: \"De R$ 100 por R$ 80 — 30% OFF!\" Essa promoção é verdadeira?",
  "options": [
    {"id": "a", "text": "Sim, 30% de desconto está correto"},
    {"id": "b", "text": "Não! 20% seria o correto, não 30%"},
    {"id": "c", "text": "Sim, porque a loja nunca mente"},
    {"id": "d", "text": "Não há como saber"}
  ]
}'::jsonb,
'{"correct": "b"}'::jsonb,
'Atenção! 🧐 100 - 80 = R$ 20 de desconto. 20 ÷ 100 = 20%, não 30%. Algumas lojas inflam os percentuais de desconto. Sempre faça a conta você mesmo!',
10, 6
FROM chapters c WHERE c.age_group = '10-12' AND c.chapter_number = 2;

-- MISSÃO 7 — Numeric Input — Difícil
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 7, 'Quanto rende?', 'numeric_input',
'{
  "question": "Você tem R$ 500,00 numa poupança que rende 0,5% ao mês. Quanto você terá depois de 1 mês?",
  "placeholder": "R$",
  "unit": "reais"
}'::jsonb,
'{"correct": 502.50, "tolerance": 0.01}'::jsonb,
'0,5% de 500 = R$ 2,50. Então 500 + 2,50 = R$ 502,50. Os juros podem parecer pequenos no começo, mas com o tempo fazem uma grande diferença — isso se chama juros compostos!',
10, 7
FROM chapters c WHERE c.age_group = '10-12' AND c.chapter_number = 2;

-- MISSÃO 8 — Drag & Drop — Difícil
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 8, 'Classifica os gastos', 'drag_drop',
'{
  "question": "Classifique cada gasto como FIXO (mesmo valor todo mês) ou VARIÁVEL (muda todo mês):",
  "categories": ["Fixo", "Variável"],
  "items": [
    {"id": "1", "text": "🏠 Aluguel"},
    {"id": "2", "text": "💡 Conta de luz"},
    {"id": "3", "text": "📱 Plano de celular"},
    {"id": "4", "text": "🛒 Supermercado"},
    {"id": "5", "text": "🎬 Netflix"},
    {"id": "6", "text": "⛽ Gasolina"}
  ]
}'::jsonb,
'{"correct": {"1": "Fixo", "2": "Variável", "3": "Fixo", "4": "Variável", "5": "Fixo", "6": "Variável"}}'::jsonb,
'Ótimo! Gastos fixos são previsíveis e fáceis de planejar. Gastos variáveis precisam de atenção pois mudam todo mês. Saber essa diferença é o primeiro passo para organizar seu orçamento!',
10, 8
FROM chapters c WHERE c.age_group = '10-12' AND c.chapter_number = 2;

-- MISSÃO 9 — Numeric Input — Difícil
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 9, 'Calcula o troco com desconto', 'numeric_input',
'{
  "question": "Um produto custa R$ 90,00. Tem 20% de desconto. Você paga com uma nota de R$ 100,00. Qual o troco?",
  "placeholder": "R$",
  "unit": "reais"
}'::jsonb,
'{"correct": 28, "tolerance": 0}'::jsonb,
'20% de 90 = R$ 18 de desconto. 90 - 18 = R$ 72,00 (preço final). 100 - 72 = R$ 28,00 de troco. Dois cálculos em sequência — bem feito!',
10, 9
FROM chapters c WHERE c.age_group = '10-12' AND c.chapter_number = 2;

-- MISSÃO 10 — BOSS 🏆 — Quiz
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 10, '🏆 Boss: Matemática do Dinheiro', 'quiz',
'{
  "question": "Numa loja, um tênis está \"De R$ 250 por R$ 200\". Numa outra loja, o mesmo tênis está com \"20% OFF\" sobre R$ 240. Qual loja oferece o menor preço final?",
  "options": [
    {"id": "a", "text": "Primeira loja (R$ 200)"},
    {"id": "b", "text": "Segunda loja (R$ 192)"},
    {"id": "c", "text": "As duas têm o mesmo preço"},
    {"id": "d", "text": "Não é possível comparar"}
  ]
}'::jsonb,
'{"correct": "a"}'::jsonb,
'🏆 Segunda loja: 20% de 240 = R$ 48 de desconto → 240 - 48 = R$ 192. Primeira loja: R$ 200. A segunda loja é mais barata! Sempre calcule o preço final antes de decidir onde comprar — o desconto maior nem sempre está na melhor loja!',
10, 10
FROM chapters c WHERE c.age_group = '10-12' AND c.chapter_number = 2;

-- =====================================================
-- CAPÍTULO 3 — "Mesada Inteligente"
-- =====================================================

DELETE FROM missions WHERE chapter_id IN (
  SELECT id FROM chapters WHERE age_group = '10-12' AND chapter_number = 3
);

-- MISSÃO 1 — Quiz — Fácil
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 1, 'Para que serve a mesada?', 'quiz',
'{
  "question": "Qual é o principal objetivo de uma mesada para crianças e adolescentes?",
  "options": [
    {"id": "a", "text": "Comprar tudo que quiser sem pedir para os pais"},
    {"id": "b", "text": "Aprender a gerenciar dinheiro e tomar decisões financeiras"},
    {"id": "c", "text": "Guardar para dar de presente aos pais"},
    {"id": "d", "text": "Pagar as contas da casa"}
  ]
}'::jsonb,
'{"correct": "b"}'::jsonb,
'Isso! 🎯 Mesada é uma ferramenta de aprendizado. Quando você decide como gastar seu próprio dinheiro, aprende lições que duram a vida inteira!',
10, 1
FROM chapters c WHERE c.age_group = '10-12' AND c.chapter_number = 3;

-- MISSÃO 2 — Quiz — Fácil
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 2, 'A regra 50-30-20', 'quiz',
'{
  "question": "A regra 50-30-20 sugere dividir o dinheiro em: 50% para necessidades, 30% para desejos e 20% para poupança. Se sua mesada é R$ 100, quanto guardar?",
  "options": [
    {"id": "a", "text": "R$ 50,00"},
    {"id": "b", "text": "R$ 30,00"},
    {"id": "c", "text": "R$ 20,00"},
    {"id": "d", "text": "R$ 10,00"}
  ]
}'::jsonb,
'{"correct": "c"}'::jsonb,
'Perfeito! 20% de R$ 100 = R$ 20,00 guardados. A regra 50-30-20 é um dos métodos mais usados no mundo para organizar finanças. Adapte os percentuais para a sua realidade!',
10, 2
FROM chapters c WHERE c.age_group = '10-12' AND c.chapter_number = 3;

-- MISSÃO 3 — Drag & Drop — Fácil
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 3, 'Divide a mesada', 'drag_drop',
'{
  "question": "Arraste cada gasto para a categoria correta baseado na regra 50-30-20:",
  "categories": ["Necessidade (50%)", "Desejo (30%)", "Poupança (20%)"],
  "items": [
    {"id": "1", "text": "🍎 Lanche da escola"},
    {"id": "2", "text": "🎮 Jogo novo"},
    {"id": "3", "text": "💰 Guardar no cofrinho"},
    {"id": "4", "text": "📚 Material escolar"},
    {"id": "5", "text": "🎬 Cinema com amigos"},
    {"id": "6", "text": "🏦 Guardar no banco"}
  ]
}'::jsonb,
'{"correct": {"1": "Necessidade (50%)", "2": "Desejo (30%)", "3": "Poupança (20%)", "4": "Necessidade (50%)", "5": "Desejo (30%)", "6": "Poupança (20%)"}}'::jsonb,
'Classificar seus gastos é o primeiro passo para um orçamento saudável. Com prática, isso se torna automático!',
10, 3
FROM chapters c WHERE c.age_group = '10-12' AND c.chapter_number = 3;

-- MISSÃO 4 — Numeric Input — Médio
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 4, 'Quanto posso gastar?', 'numeric_input',
'{
  "question": "Sua mesada é R$ 150,00. Seguindo a regra 50-30-20, quanto você pode gastar em desejos (lazer, diversão)?",
  "placeholder": "R$",
  "unit": "reais"
}'::jsonb,
'{"correct": 45, "tolerance": 0}'::jsonb,
'30% de R$ 150 = R$ 45,00 para desejos. Planejar quanto você pode gastar em diversão evita que o dinheiro acabe antes do fim do mês!',
10, 4
FROM chapters c WHERE c.age_group = '10-12' AND c.chapter_number = 3;

-- MISSÃO 5 — Text Input — Médio
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 5, 'Planejamento mensal', 'text_input',
'{
  "question": "Complete a frase: Para não gastar toda a mesada na primeira semana, o ideal é criar um _______ mensal.",
  "placeholder": "Digite sua resposta"
}'::jsonb,
'{"accepted": ["orçamento", "planejamento", "plano"]}'::jsonb,
'Um orçamento! 📋 Anotar quanto você tem e quanto planeja gastar em cada categoria evita surpresas. Pode ser num caderno, numa planilha ou num app!',
10, 5
FROM chapters c WHERE c.age_group = '10-12' AND c.chapter_number = 3;

-- MISSÃO 6 — Numeric Input — Médio
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 6, 'Objetivo de poupança', 'numeric_input',
'{
  "question": "Você quer comprar um fone de R$ 180,00. Guarda R$ 30,00 por mês. Em quantos meses você consegue comprar?",
  "placeholder": "meses",
  "unit": "meses"
}'::jsonb,
'{"correct": 6, "tolerance": 0}'::jsonb,
'180 ÷ 30 = 6 meses. Definir um objetivo e calcular quanto tempo leva para alcançar é uma das habilidades financeiras mais importantes!',
10, 6
FROM chapters c WHERE c.age_group = '10-12' AND c.chapter_number = 3;

-- MISSÃO 7 — Quiz — Difícil
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 7, 'Decisão financeira', 'quiz',
'{
  "question": "Você tem R$ 80,00 guardados. Seu amigo te convida para um show que custa R$ 70,00. Mas você estava guardando para um tênis de R$ 150,00. O que a educação financeira sugere?",
  "options": [
    {"id": "a", "text": "Ir ao show, porque a vida é curta"},
    {"id": "b", "text": "Não ir ao show, porque dívida é sempre ruim"},
    {"id": "c", "text": "Avaliar suas prioridades e decidir conscientemente — não existe resposta errada"},
    {"id": "d", "text": "Pedir emprestado para ir ao show e continuar poupando"}
  ]
}'::jsonb,
'{"correct": "c"}'::jsonb,
'Educação financeira não é sobre nunca se divertir — é sobre fazer escolhas conscientes! 🎯 Se você decide ir ao show, saiba que vai demorar mais para o tênis. Se decide poupar, sabe que está mais perto do objetivo. O importante é decidir com consciência!',
10, 7
FROM chapters c WHERE c.age_group = '10-12' AND c.chapter_number = 3;

-- MISSÃO 8 — Numeric Input — Difícil
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 8, 'Calcula o impacto', 'numeric_input',
'{
  "question": "Você ganha R$ 200,00 de mesada. Gastou R$ 45,00 a mais do que planejava num mês. Quantos % do seu orçamento foi esse gasto extra?",
  "placeholder": "%",
  "unit": "porcento"
}'::jsonb,
'{"correct": 22.5, "tolerance": 0.5}'::jsonb,
'45 ÷ 200 × 100 = 22,5%. Quase um quarto do orçamento! Pequenos gastos extras parecem insignificantes, mas em porcentagem mostram o impacto real. É por isso que acompanhar os gastos faz tanta diferença!',
10, 8
FROM chapters c WHERE c.age_group = '10-12' AND c.chapter_number = 3;

-- MISSÃO 9 — Drag & Drop (Ordenação) — Difícil
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 9, 'Ordena as prioridades', 'drag_drop',
'{
  "question": "Ordene os itens abaixo da MAIOR para a MENOR prioridade financeira:",
  "items": [
    {"id": "1", "text": "🏥 Pagar necessidades básicas"},
    {"id": "2", "text": "🏦 Guardar parte para poupança"},
    {"id": "3", "text": "🎮 Gastar com lazer e desejos"},
    {"id": "4", "text": "🎁 Comprar presentes para amigos"}
  ]
}'::jsonb,
'{"correct_order": ["1", "2", "3", "4"]}'::jsonb,
'Essa ordem garante que você sempre tenha o essencial coberto e esteja construindo seu futuro antes de gastar com extras. É a base de qualquer planejamento financeiro sólido!',
10, 9
FROM chapters c WHERE c.age_group = '10-12' AND c.chapter_number = 3;

-- MISSÃO 10 — BOSS 🏆 — Quiz
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 10, '🏆 Boss: Mesada Inteligente', 'quiz',
'{
  "question": "Pedro tem mesada de R$ 250,00. Em março, gastou:\n\nNecessidades: R$ 130,00\nLazer: R$ 85,00\nPoupança: R$ 35,00\n\nComparando com a regra 50-30-20, qual categoria Pedro gastou MAIS do que deveria?",
  "options": [
    {"id": "a", "text": "Necessidades"},
    {"id": "b", "text": "Lazer"},
    {"id": "c", "text": "Poupança"},
    {"id": "d", "text": "Todas estão corretas"}
  ]
}'::jsonb,
'{"correct": "b"}'::jsonb,
'🏆 Pela regra 50-30-20 com R$ 250: Necessidades = R$ 125, Lazer = R$ 75, Poupança = R$ 50. Pedro gastou R$ 85 no lazer (R$ 10 a mais) e guardou só R$ 35 (R$ 15 a menos). O lazer ultrapassou o limite e a poupança ficou abaixo. Pequenos desvios acumulam ao longo do tempo!',
10, 10
FROM chapters c WHERE c.age_group = '10-12' AND c.chapter_number = 3;

-- =====================================================
-- CAPÍTULO 4 — "Necessidades vs Desejos"
-- =====================================================

DELETE FROM missions WHERE chapter_id IN (
  SELECT id FROM chapters WHERE age_group = '10-12' AND chapter_number = 4
);

-- MISSÃO 1 — Quiz — Fácil
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 1, 'Definindo necessidades', 'quiz',
'{
  "question": "Qual das opções abaixo é uma NECESSIDADE básica?",
  "options": [
    {"id": "a", "text": "🎮 Console de videogame"},
    {"id": "b", "text": "🏠 Moradia"},
    {"id": "c", "text": "👟 Tênis de marca"},
    {"id": "d", "text": "📺 TV a cabo"}
  ]
}'::jsonb,
'{"correct": "b"}'::jsonb,
'Necessidades são o que precisamos para sobreviver e ter uma vida digna: comida, moradia, saúde, educação. Tudo além disso é desejo — e não há nada de errado com desejos, desde que planejados!',
10, 1
FROM chapters c WHERE c.age_group = '10-12' AND c.chapter_number = 4;

-- MISSÃO 2 — Drag & Drop — Fácil
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 2, 'Separa necessidade de desejo', 'drag_drop',
'{
  "question": "Arraste cada item para a categoria correta:",
  "categories": ["Necessidade", "Desejo"],
  "items": [
    {"id": "1", "text": "💊 Remédio"},
    {"id": "2", "text": "🎵 Spotify Premium"},
    {"id": "3", "text": "🍞 Pão para o café"},
    {"id": "4", "text": "👟 Tênis de colecionador"},
    {"id": "5", "text": "📚 Livro escolar"},
    {"id": "6", "text": "🧃 Suco de caixinha gourmet"}
  ]
}'::jsonb,
'{"correct": {"1": "Necessidade", "2": "Desejo", "3": "Necessidade", "4": "Desejo", "5": "Necessidade", "6": "Desejo"}}'::jsonb,
'Ótima separação! Note que alguns itens são difíceis de classificar — como um tênis: você PRECISA de calçado (necessidade), mas não necessariamente do tênis mais caro (desejo). O contexto importa!',
10, 2
FROM chapters c WHERE c.age_group = '10-12' AND c.chapter_number = 4;

-- MISSÃO 3 — Quiz — Fácil
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 3, 'Zona cinzenta', 'quiz',
'{
  "question": "Um celular é uma necessidade ou um desejo?",
  "options": [
    {"id": "a", "text": "Sempre necessidade"},
    {"id": "b", "text": "Sempre desejo"},
    {"id": "c", "text": "Depende do contexto — pode ser os dois"},
    {"id": "d", "text": "Nenhum dos dois"}
  ]
}'::jsonb,
'{"correct": "c"}'::jsonb,
'Exatamente! 🤔 Um celular básico para comunicação pode ser necessidade. Um iPhone último modelo é desejo. A mesma categoria pode ser necessidade ou desejo dependendo do nível e do contexto!',
10, 3
FROM chapters c WHERE c.age_group = '10-12' AND c.chapter_number = 4;

-- MISSÃO 4 — Numeric Input — Médio
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 4, 'Priorização com orçamento', 'numeric_input',
'{
  "question": "Você tem R$ 100,00 e precisa escolher: Lanche R$ 15, Material escolar R$ 40, Jogo R$ 60, Camisa R$ 35. Quanto sobra se você comprar APENAS as necessidades?",
  "placeholder": "R$",
  "unit": "reais"
}'::jsonb,
'{"correct": 45, "tolerance": 0}'::jsonb,
'Lanche (R$ 15) + Material (R$ 40) = R$ 55 em necessidades. 100 - 55 = R$ 45 sobrando. Esse valor pode ir para poupança ou para um desejo planejado!',
10, 4
FROM chapters c WHERE c.age_group = '10-12' AND c.chapter_number = 4;

-- MISSÃO 5 — Quiz — Médio
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 5, 'Impulso vs planejamento', 'quiz',
'{
  "question": "Você viu um item numa vitrine e ficou com vontade de comprar na hora sem ter planejado. Isso se chama:",
  "options": [
    {"id": "a", "text": "Compra planejada"},
    {"id": "b", "text": "Compra por impulso"},
    {"id": "c", "text": "Investimento"},
    {"id": "d", "text": "Necessidade urgente"}
  ]
}'::jsonb,
'{"correct": "b"}'::jsonb,
'Compra por impulso! 🚨 É quando a emoção manda na decisão. Uma dica famosa: espere 24 horas antes de comprar qualquer coisa que não estava planejada. Se ainda quiser depois, aí vale a pena considerar!',
10, 5
FROM chapters c WHERE c.age_group = '10-12' AND c.chapter_number = 4;

-- MISSÃO 6 — Text Input — Médio
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 6, 'Custo de oportunidade', 'text_input',
'{
  "question": "Quando você escolhe gastar R$ 50,00 num jogo em vez de guardar, você está abrindo mão de algo. Esse conceito em finanças se chama \"custo de _______\".",
  "placeholder": "Digite sua resposta"
}'::jsonb,
'{"accepted": ["oportunidade"]}'::jsonb,
'Custo de oportunidade! 💡 Toda escolha financeira tem um custo — o que você deixou de fazer com aquele dinheiro. Isso não significa que você não pode comprar o jogo, mas é importante estar consciente do que está abrindo mão!',
10, 6
FROM chapters c WHERE c.age_group = '10-12' AND c.chapter_number = 4;

-- MISSÃO 7 — Quiz — Difícil
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 7, 'Analisa o cenário', 'quiz',
'{
  "question": "Marina tem R$ 300,00. Está considerando: (A) Guardar tudo. (B) Gastar tudo num show. (C) Guardar R$ 200 e gastar R$ 100 no show. Qual opção é mais equilibrada?",
  "options": [
    {"id": "a", "text": "Guardar tudo — nunca gaste com lazer"},
    {"id": "b", "text": "Gastar tudo — aproveite o momento"},
    {"id": "c", "text": "Guardar R$ 200 e gastar R$ 100 no show"},
    {"id": "d", "text": "Não há resposta certa"}
  ]
}'::jsonb,
'{"correct": "c"}'::jsonb,
'O equilíbrio é a chave! ⚖️ Educação financeira não é sobre privar-se de prazer, mas sobre fazer escolhas conscientes. Marina pode aproveitar o show E ainda guardar uma parte. Isso é inteligência financeira!',
10, 7
FROM chapters c WHERE c.age_group = '10-12' AND c.chapter_number = 4;

-- MISSÃO 8 — Numeric Input — Difícil
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 8, 'Calcula o impacto do impulso', 'numeric_input',
'{
  "question": "João compra um item por impulso de R$ 30,00 toda semana. Em 1 ano (52 semanas), quanto ele gastou por impulso?",
  "placeholder": "R$",
  "unit": "reais"
}'::jsonb,
'{"correct": 1560, "tolerance": 0}'::jsonb,
'30 × 52 = R$ 1.560,00 por ano! 😲 Pequenas compras por impulso parecem inofensivas, mas se acumulam em valores enormes ao longo do tempo. Com R$ 1.560, João poderia ter feito uma viagem ou comprado algo que realmente quisesse!',
10, 8
FROM chapters c WHERE c.age_group = '10-12' AND c.chapter_number = 4;

-- MISSÃO 9 — Drag & Drop — Difícil
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 9, 'Classifica por urgência', 'drag_drop',
'{
  "question": "Classifique cada situação de compra:",
  "categories": ["Urgente e necessário", "Pode esperar"],
  "items": [
    {"id": "1", "text": "🩺 Consulta médica"},
    {"id": "2", "text": "👟 Tênis novo (o atual ainda funciona)"},
    {"id": "3", "text": "📱 Conserto do celular que quebrou"},
    {"id": "4", "text": "🎮 DLC de jogo"},
    {"id": "5", "text": "💊 Remédio receitado"},
    {"id": "6", "text": "🎧 Fone upgrade"}
  ]
}'::jsonb,
'{"correct": {"1": "Urgente e necessário", "2": "Pode esperar", "3": "Urgente e necessário", "4": "Pode esperar", "5": "Urgente e necessário", "6": "Pode esperar"}}'::jsonb,
'Saber diferenciar o que é urgente do que pode esperar evita que você gaste dinheiro no supérfluo quando pode precisar do essencial em breve!',
10, 9
FROM chapters c WHERE c.age_group = '10-12' AND c.chapter_number = 4;

-- MISSÃO 10 — BOSS 🏆 — Quiz
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 10, '🏆 Boss: Necessidades vs Desejos', 'quiz',
'{
  "question": "Clara tem R$ 500,00 guardados para emergências. Surgiu a oportunidade de comprar um tênis limitado por R$ 450,00. O que a educação financeira recomenda?",
  "options": [
    {"id": "a", "text": "Comprar! Edições limitadas valorizam com o tempo"},
    {"id": "b", "text": "Não comprar — a reserva de emergência não deve ser usada para desejos"},
    {"id": "c", "text": "Comprar metade e guardar metade"},
    {"id": "d", "text": "Pedir emprestado para completar"}
  ]
}'::jsonb,
'{"correct": "b"}'::jsonb,
'🏆 Reserva de emergência é sagrada! Ela existe para imprevistos: consulta médica, conserto, perda de emprego. Usar para um tênis — por mais especial que seja — vai contra o propósito da reserva. A regra de ouro: reserva de emergência só para emergências reais!',
10, 10
FROM chapters c WHERE c.age_group = '10-12' AND c.chapter_number = 4;

-- =====================================================
-- CAPÍTULO 5 — "Comparando Preços"
-- =====================================================

DELETE FROM missions WHERE chapter_id IN (
  SELECT id FROM chapters WHERE age_group = '10-12' AND chapter_number = 5
);

-- MISSÃO 1 — Quiz — Fácil
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 1, 'Por que comparar?', 'quiz',
'{
  "question": "Por que é importante comparar preços antes de comprar?",
  "options": [
    {"id": "a", "text": "Para perder tempo antes de comprar"},
    {"id": "b", "text": "Porque o produto mais barato é sempre o melhor"},
    {"id": "c", "text": "Para fazer escolhas mais inteligentes e economizar dinheiro"},
    {"id": "d", "text": "Comparar preços é desnecessário"}
  ]
}'::jsonb,
'{"correct": "c"}'::jsonb,
'Exato! 💡 Comparar preços pode gerar uma economia significativa. Um estudo mostrou que pessoas que comparam preços economizam em média 20% nas compras. Em 1 ano, isso pode representar centenas de reais!',
10, 1
FROM chapters c WHERE c.age_group = '10-12' AND c.chapter_number = 5;

-- MISSÃO 2 — Numeric Input — Fácil
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 2, 'Preço por unidade', 'numeric_input',
'{
  "question": "Uma embalagem com 6 iogurtes custa R$ 12,00. Qual o preço de cada iogurte?",
  "placeholder": "R$",
  "unit": "reais"
}'::jsonb,
'{"correct": 2, "tolerance": 0}'::jsonb,
'12 ÷ 6 = R$ 2,00 cada. Calcular o preço por unidade é essencial para comparar embalagens de tamanhos diferentes. Nem sempre a embalagem maior é mais barata por unidade!',
10, 2
FROM chapters c WHERE c.age_group = '10-12' AND c.chapter_number = 5;

-- MISSÃO 3 — Quiz — Fácil
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 3, 'Qual é mais barato por unidade?', 'quiz',
'{
  "question": "Embalagem A: 4 unidades por R$ 10,00. Embalagem B: 6 unidades por R$ 12,00. Qual tem menor preço por unidade?",
  "options": [
    {"id": "a", "text": "Embalagem A (R$ 2,50/un)"},
    {"id": "b", "text": "Embalagem B (R$ 2,00/un)"},
    {"id": "c", "text": "São iguais"},
    {"id": "d", "text": "Não é possível comparar"}
  ]
}'::jsonb,
'{"correct": "b"}'::jsonb,
'A: 10÷4 = R$ 2,50/un. B: 12÷6 = R$ 2,00/un. A embalagem B é mais barata por unidade! Sempre divida o preço total pela quantidade para comparar corretamente.',
10, 3
FROM chapters c WHERE c.age_group = '10-12' AND c.chapter_number = 5;

-- MISSÃO 4 — Numeric Input — Médio
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 4, 'Frete incluído?', 'numeric_input',
'{
  "question": "Produto online: R$ 80,00 + R$ 15,00 de frete. Na loja física: R$ 100,00 (sem frete). Qual opção sai mais barata no total?",
  "placeholder": "R$",
  "unit": "reais"
}'::jsonb,
'{"correct": 95, "tolerance": 0}'::jsonb,
'Online: 80 + 15 = R$ 95,00. Loja física: R$ 100,00. A compra online sai R$ 5,00 mais barata! Sempre some o frete antes de decidir onde comprar. O frete pode mudar completamente a equação!',
10, 4
FROM chapters c WHERE c.age_group = '10-12' AND c.chapter_number = 5;

-- MISSÃO 5 — Drag & Drop — Médio
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 5, 'Avalia o custo-benefício', 'drag_drop',
'{
  "question": "Classifique os fatores na hora de comparar produtos:",
  "categories": ["Importa na comparação", "Não muda o preço final"],
  "items": [
    {"id": "1", "text": "💰 Preço do produto"},
    {"id": "2", "text": "🚚 Custo do frete"},
    {"id": "3", "text": "⏳ Prazo de entrega"},
    {"id": "4", "text": "⭐ Avaliações do produto"},
    {"id": "5", "text": "🔄 Política de troca"},
    {"id": "6", "text": "💳 Desconto no boleto"}
  ]
}'::jsonb,
'{"correct": {"1": "Importa na comparação", "2": "Importa na comparação", "3": "Não muda o preço final", "4": "Não muda o preço final", "5": "Não muda o preço final", "6": "Importa na comparação"}}'::jsonb,
'Ótimo! O custo final é só o que impacta seu bolso diretamente. Mas avaliações e política de troca impactam o VALOR percebido — às vezes vale pagar um pouco mais por qualidade e segurança!',
10, 5
FROM chapters c WHERE c.age_group = '10-12' AND c.chapter_number = 5;

-- MISSÃO 6 — Quiz — Médio
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 6, 'Promoção ou armadilha?', 'quiz',
'{
  "question": "\"Leve 3 pague 2\" — um item custa R$ 15,00. Qual o preço por unidade nessa promoção?",
  "options": [
    {"id": "a", "text": "R$ 15,00"},
    {"id": "b", "text": "R$ 10,00"},
    {"id": "c", "text": "R$ 7,50"},
    {"id": "d", "text": "R$ 5,00"}
  ]
}'::jsonb,
'{"correct": "b"}'::jsonb,
'Você paga 2 × R$ 15 = R$ 30 por 3 itens. 30 ÷ 3 = R$ 10,00 por unidade. Desconto de 33%! Mas cuidado: só vale a pena se você realmente vai usar os 3 itens. Comprar o que não precisa não é economia!',
10, 6
FROM chapters c WHERE c.age_group = '10-12' AND c.chapter_number = 5;

-- MISSÃO 7 — Numeric Input — Difícil
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 7, 'Comparação completa', 'numeric_input',
'{
  "question": "Loja A: Tênis por R$ 180, sem frete, 10% de desconto no boleto. Loja B: Tênis por R$ 160, frete R$ 25. Qual loja sai mais barata? (digite o preço final da mais barata)",
  "placeholder": "R$",
  "unit": "reais"
}'::jsonb,
'{"correct": 162, "tolerance": 0}'::jsonb,
'Loja A: 180 - 18 (10%) = R$ 162,00. Loja B: 160 + 25 = R$ 185,00. A Loja A é mais barata! O desconto no boleto + frete grátis fez toda a diferença. Sempre calcule o preço final real!',
10, 7
FROM chapters c WHERE c.age_group = '10-12' AND c.chapter_number = 5;

-- MISSÃO 8 — Numeric Input — Difícil
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 8, 'Armadilha do parcelamento', 'numeric_input',
'{
  "question": "Um produto custa R$ 200 à vista ou R$ 72,00 em 3x. Quanto você paga a mais parcelando?",
  "placeholder": "R$",
  "unit": "reais"
}'::jsonb,
'{"correct": 16, "tolerance": 0}'::jsonb,
'3 × 72 = R$ 216,00 parcelado. 216 - 200 = R$ 16,00 a mais. Sempre multiplique as parcelas e compare com o à vista. Parcelar parece mais fácil, mas quase sempre custa mais!',
10, 8
FROM chapters c WHERE c.age_group = '10-12' AND c.chapter_number = 5;

-- MISSÃO 9 — Quiz — Difícil
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 9, 'Custo por uso', 'quiz',
'{
  "question": "Tênis A: R$ 80,00, dura 6 meses. Tênis B: R$ 150,00, dura 2 anos. Qual tem menor custo por mês?",
  "options": [
    {"id": "a", "text": "Tênis A (R$ 13,33/mês)"},
    {"id": "b", "text": "Tênis B (R$ 6,25/mês)"},
    {"id": "c", "text": "São iguais"},
    {"id": "d", "text": "Não é possível comparar"}
  ]
}'::jsonb,
'{"correct": "b"}'::jsonb,
'A: 80÷6 = R$ 13,33/mês. B: 150÷24 = R$ 6,25/mês. O tênis mais caro é mais barato no longo prazo! Isso se chama custo por uso — um conceito poderoso para compras de qualidade!',
10, 9
FROM chapters c WHERE c.age_group = '10-12' AND c.chapter_number = 5;

-- MISSÃO 10 — BOSS 🏆 — Quiz
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 10, '🏆 Boss: Comparando Preços', 'quiz',
'{
  "question": "Ana quer comprar um fone. Encontrou 3 opções: (A) R$ 120 com frete R$ 20, 15% desconto boleto. (B) R$ 100 com frete R$ 35. (C) R$ 150 sem frete, 20% desconto cartão. Qual é mais barata?",
  "options": [
    {"id": "a", "text": "Opção A: R$ 122,00"},
    {"id": "b", "text": "Opção B: R$ 135,00"},
    {"id": "c", "text": "Opção C: R$ 120,00"},
    {"id": "d", "text": "São iguais"}
  ]
}'::jsonb,
'{"correct": "a"}'::jsonb,
'🏆 A: 120 - 18 (15%) + 20 = R$ 122. B: 100 + 35 = R$ 135. C: 150 - 30 (20%) = R$ 120. A opção C parece mais barata, mas cuidado — R$ 120 vs R$ 122 é só R$ 2 de diferença. Sempre calcule tudo antes de decidir!',
10, 10
FROM chapters c WHERE c.age_group = '10-12' AND c.chapter_number = 5;

-- =====================================================
-- CAPÍTULO 6 — "Primeiros Investimentos"
-- =====================================================

DELETE FROM missions WHERE chapter_id IN (
  SELECT id FROM chapters WHERE age_group = '10-12' AND chapter_number = 6
);

-- MISSÃO 1 — Quiz — Fácil
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 1, 'O que é investir?', 'quiz',
'{
  "question": "Investir dinheiro significa:",
  "options": [
    {"id": "a", "text": "Gastar dinheiro em algo que você quer muito"},
    {"id": "b", "text": "Guardar dinheiro para o futuro sem nenhum rendimento"},
    {"id": "c", "text": "Aplicar dinheiro para que ele cresça ao longo do tempo"},
    {"id": "d", "text": "Emprestar dinheiro para amigos"}
  ]
}'::jsonb,
'{"correct": "c"}'::jsonb,
'Isso! 📈 Investir é fazer seu dinheiro trabalhar por você. Em vez de ficar parado, o dinheiro aplicado gera mais dinheiro através de juros e rendimentos!',
10, 1
FROM chapters c WHERE c.age_group = '10-12' AND c.chapter_number = 6;

-- MISSÃO 2 — Quiz — Fácil
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 2, 'Poupança vs investimento', 'quiz',
'{
  "question": "Qual afirmação sobre poupança é verdadeira?",
  "options": [
    {"id": "a", "text": "A poupança é o melhor investimento disponível"},
    {"id": "b", "text": "A poupança é segura, mas costuma render menos que outros investimentos"},
    {"id": "c", "text": "Poupança e investimento são exatamente a mesma coisa"},
    {"id": "d", "text": "Poupança tem risco alto de perder dinheiro"}
  ]
}'::jsonb,
'{"correct": "b"}'::jsonb,
'A poupança é segura e protegida pelo FGC (Fundo Garantidor de Créditos), mas seu rendimento costuma ser menor que outros investimentos como CDB ou Tesouro Direto. Para começar, é ótima. Para crescer patrimônio, existem opções melhores!',
10, 2
FROM chapters c WHERE c.age_group = '10-12' AND c.chapter_number = 6;

-- MISSÃO 3 — Drag & Drop (Ordenação) — Fácil
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 3, 'Risco e retorno', 'drag_drop',
'{
  "question": "Ordene os investimentos do MENOR para o MAIOR risco:",
  "items": [
    {"id": "1", "text": "🏦 Poupança (menor risco)"},
    {"id": "2", "text": "📄 Tesouro Direto"},
    {"id": "3", "text": "📊 CDB de banco grande"},
    {"id": "4", "text": "📈 Ações de empresa (maior risco)"}
  ]
}'::jsonb,
'{"correct_order": ["1", "2", "3", "4"]}'::jsonb,
'Em geral, quanto maior o risco, maior o potencial de retorno — e maior a chance de perda. Investidores iniciantes geralmente começam com investimentos de menor risco!',
10, 3
FROM chapters c WHERE c.age_group = '10-12' AND c.chapter_number = 6;

-- MISSÃO 4 — Numeric Input — Médio
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 4, 'Juros simples', 'numeric_input',
'{
  "question": "Você investe R$ 1.000,00 com juros simples de 5% ao ano. Quanto você ganha de juros em 1 ano?",
  "placeholder": "R$",
  "unit": "reais"
}'::jsonb,
'{"correct": 50, "tolerance": 0}'::jsonb,
'5% de R$ 1.000 = R$ 50,00 em 1 ano. No juros simples, você sempre ganha o mesmo valor por período. Depois de 3 anos: 3 × R$ 50 = R$ 150 de juros!',
10, 4
FROM chapters c WHERE c.age_group = '10-12' AND c.chapter_number = 6;

-- MISSÃO 5 — Quiz — Médio
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 5, 'O poder do tempo', 'quiz',
'{
  "question": "Duas pessoas investem R$ 1.000,00 com 10% ao ano. Ana começa aos 15 anos, João começa aos 25 anos. Quem terá mais dinheiro aos 35 anos?",
  "options": [
    {"id": "a", "text": "João, porque começou a trabalhar mais cedo"},
    {"id": "b", "text": "Ana, porque investiu por mais tempo"},
    {"id": "c", "text": "Os dois terão o mesmo valor"},
    {"id": "d", "text": "Não é possível saber"}
  ]
}'::jsonb,
'{"correct": "b"}'::jsonb,
'Ana investe por 20 anos, João por 10. Com juros compostos, o tempo faz diferença enorme! Esse é o maior segredo dos investimentos: quanto antes você começa, mais seu dinheiro cresce!',
10, 5
FROM chapters c WHERE c.age_group = '10-12' AND c.chapter_number = 6;

-- MISSÃO 6 — Drag & Drop — Médio
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 6, 'Classifica os investimentos', 'drag_drop',
'{
  "question": "Classifique cada investimento:",
  "categories": ["Renda Fixa (previsível)", "Renda Variável (imprevisível)"],
  "items": [
    {"id": "1", "text": "🏦 Poupança"},
    {"id": "2", "text": "📊 CDB"},
    {"id": "3", "text": "📈 Ações"},
    {"id": "4", "text": "📄 Tesouro Direto"},
    {"id": "5", "text": "🏢 Fundos Imobiliários"},
    {"id": "6", "text": "💰 LCI/LCA"}
  ]
}'::jsonb,
'{"correct": {"1": "Renda Fixa (previsível)", "2": "Renda Fixa (previsível)", "3": "Renda Variável (imprevisível)", "4": "Renda Fixa (previsível)", "5": "Renda Variável (imprevisível)", "6": "Renda Fixa (previsível)"}}'::jsonb,
'Renda fixa: você sabe quanto vai ganhar. Renda variável: o retorno depende do mercado — pode ganhar mais, mas também pode perder. Para iniciantes, renda fixa é um ótimo começo!',
10, 6
FROM chapters c WHERE c.age_group = '10-12' AND c.chapter_number = 6;

-- MISSÃO 7 — Numeric Input — Difícil
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 7, 'Calcula o rendimento', 'numeric_input',
'{
  "question": "Um CDB rende 10% ao ano. Você investe R$ 500,00. Quanto terá depois de 1 ano?",
  "placeholder": "R$",
  "unit": "reais"
}'::jsonb,
'{"correct": 550, "tolerance": 0}'::jsonb,
'10% de 500 = R$ 50 de rendimento. 500 + 50 = R$ 550,00. Seu dinheiro cresceu R$ 50 sem você fazer nada além de investir! É o dinheiro trabalhando por você!',
10, 7
FROM chapters c WHERE c.age_group = '10-12' AND c.chapter_number = 6;

-- MISSÃO 8 — Text Input — Difícil
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 8, 'Diversificação', 'text_input',
'{
  "question": "O hábito de não colocar todo o dinheiro em um só investimento para reduzir riscos é chamado de _________.",
  "placeholder": "Digite sua resposta"
}'::jsonb,
'{"accepted": ["diversificação", "diversificar"]}'::jsonb,
'Diversificação! 🎯 É como o ditado: "não coloque todos os ovos numa cesta só". Se um investimento vai mal, os outros podem compensar. Diversificar é uma das regras de ouro dos investimentos!',
10, 8
FROM chapters c WHERE c.age_group = '10-12' AND c.chapter_number = 6;

-- MISSÃO 9 — Quiz — Difícil
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 9, 'Analisa o investimento', 'quiz',
'{
  "question": "Um \"investimento\" promete retorno de 50% ao mês. Isso é:",
  "options": [
    {"id": "a", "text": "Um ótimo negócio, aproveite!"},
    {"id": "b", "text": "Normal no mercado financeiro atual"},
    {"id": "c", "text": "Quase certamente um golpe — retornos assim não existem legitimamente"},
    {"id": "d", "text": "Exclusivo para investidores avançados"}
  ]
}'::jsonb,
'{"correct": "c"}'::jsonb,
'🚨 Cuidado com promessas de retornos absurdos! O maior banco do Brasil rende em torno de 10-15% ao ANO. Qualquer coisa muito acima disso é sinal vermelho de fraude. Se parece bom demais para ser verdade, provavelmente é!',
10, 9
FROM chapters c WHERE c.age_group = '10-12' AND c.chapter_number = 6;

-- MISSÃO 10 — BOSS 🏆 — Quiz
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 10, '🏆 Boss: Primeiros Investimentos', 'quiz',
'{
  "question": "Gabriela tem R$ 2.000 para investir. Opção A: Poupança a 6% ao ano. Opção B: CDB a 12% ao ano. Quanto a mais ela ganha na Opção B em 1 ano?",
  "options": [
    {"id": "a", "text": "R$ 60,00"},
    {"id": "b", "text": "R$ 120,00"},
    {"id": "c", "text": "R$ 240,00"},
    {"id": "d", "text": "R$ 180,00"}
  ]
}'::jsonb,
'{"correct": "b"}'::jsonb,
'🏆 Poupança: 6% de 2.000 = R$ 120. CDB: 12% de 2.000 = R$ 240. Diferença: 240 - 120 = R$ 120 a mais no CDB. Com o tempo, essa diferença cresce ainda mais por causa dos juros compostos. Pesquisar as melhores taxas faz muita diferença!',
10, 10
FROM chapters c WHERE c.age_group = '10-12' AND c.chapter_number = 6;

-- =====================================================
-- CAPÍTULO 7 — "Empreendedorismo Infantil"
-- =====================================================

DELETE FROM missions WHERE chapter_id IN (
  SELECT id FROM chapters WHERE age_group = '10-12' AND chapter_number = 7
);

-- MISSÃO 1 — Quiz — Fácil
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 1, 'O que é empreender?', 'quiz',
'{
  "question": "Empreender significa:",
  "options": [
    {"id": "a", "text": "Só criar grandes empresas com muito dinheiro"},
    {"id": "b", "text": "Identificar um problema e criar uma solução, gerando valor"},
    {"id": "c", "text": "Trabalhar para outras pessoas"},
    {"id": "d", "text": "Fazer cursos de negócios"}
  ]
}'::jsonb,
'{"correct": "b"}'::jsonb,
'Empreender é identificar uma necessidade e criar algo para resolvê-la! Pode ser um negócio grande ou pequeno. Muitos empreendedores famosos começaram vendendo limonada ou fazendo trabalhos manuais na infância!',
10, 1
FROM chapters c WHERE c.age_group = '10-12' AND c.chapter_number = 7;

-- MISSÃO 2 — Quiz — Fácil
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 2, 'Receita e despesa', 'quiz',
'{
  "question": "Num negócio, o que é RECEITA?",
  "options": [
    {"id": "a", "text": "Os gastos do negócio"},
    {"id": "b", "text": "O lucro final"},
    {"id": "c", "text": "Todo o dinheiro que entra no negócio"},
    {"id": "d", "text": "O investimento inicial"}
  ]
}'::jsonb,
'{"correct": "c"}'::jsonb,
'Receita é tudo que entra! 💰 Despesa é tudo que sai. Lucro = Receita - Despesa. Esse é o conceito básico de qualquer negócio, da barraca de limonada à maior empresa do mundo!',
10, 2
FROM chapters c WHERE c.age_group = '10-12' AND c.chapter_number = 7;

-- MISSÃO 3 — Numeric Input — Fácil
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 3, 'Calcula o lucro simples', 'numeric_input',
'{
  "question": "Você vendeu brigadeiros por R$ 80,00. Gastou R$ 35,00 nos ingredientes. Qual foi o seu lucro?",
  "placeholder": "R$",
  "unit": "reais"
}'::jsonb,
'{"correct": 45, "tolerance": 0}'::jsonb,
'80 - 35 = R$ 45,00 de lucro! Mas atenção: lucro não é o mesmo que salário. Parte do lucro deve ser reinvestida no negócio para ele crescer!',
10, 3
FROM chapters c WHERE c.age_group = '10-12' AND c.chapter_number = 7;

-- MISSÃO 4 — Drag & Drop — Médio
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 4, 'Classifica os custos', 'drag_drop',
'{
  "question": "Classifique os custos de uma barraca de limonada:",
  "categories": ["Custo Fixo (todo mês)", "Custo Variável (muda com as vendas)"],
  "items": [
    {"id": "1", "text": "🍋 Limões"},
    {"id": "2", "text": "🪣 Copo descartável"},
    {"id": "3", "text": "☂️ Aluguel da barraca"},
    {"id": "4", "text": "🧊 Gelo"},
    {"id": "5", "text": "📱 Cartão de visita"},
    {"id": "6", "text": "🍬 Açúcar"}
  ]
}'::jsonb,
'{"correct": {"1": "Custo Variável (muda com as vendas)", "2": "Custo Variável (muda com as vendas)", "3": "Custo Fixo (todo mês)", "4": "Custo Variável (muda com as vendas)", "5": "Custo Fixo (todo mês)", "6": "Custo Variável (muda com as vendas)"}}'::jsonb,
'Custos fixos existem mesmo quando você não vende nada. Custos variáveis crescem junto com as vendas. Controlar os dois é essencial para ter lucro!',
10, 4
FROM chapters c WHERE c.age_group = '10-12' AND c.chapter_number = 7;

-- MISSÃO 5 — Numeric Input — Médio
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 5, 'Precificação', 'numeric_input',
'{
  "question": "Você faz pulseiras artesanais. Cada uma custa R$ 8,00 para fazer. Você quer ter 50% de lucro. Qual deve ser o preço de venda?",
  "placeholder": "R$",
  "unit": "reais"
}'::jsonb,
'{"correct": 12, "tolerance": 0}'::jsonb,
'50% de lucro sobre o custo: 8 × 1,5 = R$ 12,00. Ou: custo + 50% do custo = 8 + 4 = R$ 12,00. Precificar corretamente é um dos maiores desafios do empreendedorismo!',
10, 5
FROM chapters c WHERE c.age_group = '10-12' AND c.chapter_number = 7;

-- MISSÃO 6 — Text Input — Médio
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 6, 'Identifica o negócio certo', 'text_input',
'{
  "question": "Antes de começar um negócio, você precisa identificar quem vai comprar seu produto. Esse grupo de pessoas se chama _______ -alvo.",
  "placeholder": "Digite sua resposta"
}'::jsonb,
'{"accepted": ["público", "cliente"]}'::jsonb,
'Público-alvo! 🎯 Conhecer seus clientes é fundamental. Um produto ótimo para adultos pode não vender nada para adolescentes. Entender quem compra de você ajuda a fazer marketing, definir preços e criar produtos melhores!',
10, 6
FROM chapters c WHERE c.age_group = '10-12' AND c.chapter_number = 7;

-- MISSÃO 7 — Numeric Input — Difícil
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 7, 'Análise de viabilidade', 'numeric_input',
'{
  "question": "Para abrir uma barraca de pipoca você precisa investir R$ 200,00. Você lucra R$ 40,00 por dia. Em quantos dias você recupera o investimento?",
  "placeholder": "dias",
  "unit": "dias"
}'::jsonb,
'{"correct": 5, "tolerance": 0}'::jsonb,
'200 ÷ 40 = 5 dias para recuperar o investimento. Esse conceito se chama payback — o tempo para recuperar o que investiu. Quanto menor o payback, melhor o negócio!',
10, 7
FROM chapters c WHERE c.age_group = '10-12' AND c.chapter_number = 7;

-- MISSÃO 8 — Drag & Drop — Difícil
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 8, 'Estratégias de venda', 'drag_drop',
'{
  "question": "Classifique as estratégias de venda:",
  "categories": ["Atrai novos clientes", "Mantém clientes existentes"],
  "items": [
    {"id": "1", "text": "📢 Panfleto no bairro"},
    {"id": "2", "text": "🎁 Cartão fidelidade"},
    {"id": "3", "text": "📱 Post no Instagram"},
    {"id": "4", "text": "🎉 Desconto para quem indica amigo"},
    {"id": "5", "text": "💌 WhatsApp para clientes antigos"},
    {"id": "6", "text": "🏷️ Promoção relâmpago"}
  ]
}'::jsonb,
'{"correct": {"1": "Atrai novos clientes", "2": "Mantém clientes existentes", "3": "Atrai novos clientes", "4": "Atrai novos clientes", "5": "Mantém clientes existentes", "6": "Atrai novos clientes"}}'::jsonb,
'Atrair e manter clientes são estratégias diferentes! Em geral, manter um cliente custa 5x menos do que conquistar um novo. Equilibrar as duas estratégias é o segredo do crescimento!',
10, 8
FROM chapters c WHERE c.age_group = '10-12' AND c.chapter_number = 7;

-- MISSÃO 9 — Quiz — Difícil
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 9, 'Erro do empreendedor', 'quiz',
'{
  "question": "João vendeu R$ 500 em doces no mês, mas no final não sobrou dinheiro. Qual foi o provável erro?",
  "options": [
    {"id": "a", "text": "Vendeu pouco"},
    {"id": "b", "text": "Não controlou os custos e pode ter confundido receita com lucro"},
    {"id": "c", "text": "O produto era ruim"},
    {"id": "d", "text": "Não tinha clientes suficientes"}
  ]
}'::jsonb,
'{"correct": "b"}'::jsonb,
'Confundir receita com lucro é o erro #1 dos empreendedores iniciantes! João pode ter gastado os R$ 500 sem descontar os custos, ou misturado dinheiro pessoal com dinheiro do negócio. Sempre separe as contas!',
10, 9
FROM chapters c WHERE c.age_group = '10-12' AND c.chapter_number = 7;

-- MISSÃO 10 — BOSS 🏆 — Quiz
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 10, '🏆 Boss: Empreendedorismo Infantil', 'quiz',
'{
  "question": "Maria vende bolos. Cada bolo custa R$ 25 para fazer e ela vende por R$ 60. Em um mês vendeu 10 bolos. Seus custos fixos (energia, embalagem) foram R$ 80. Qual foi o lucro real no mês?",
  "options": [
    {"id": "a", "text": "R$ 600,00"},
    {"id": "b", "text": "R$ 350,00"},
    {"id": "c", "text": "R$ 430,00"},
    {"id": "d", "text": "R$ 250,00"}
  ]
}'::jsonb,
'{"correct": "b"}'::jsonb,
'🏆 Receita: 10 × R$ 60 = R$ 600. Custos variáveis: 10 × R$ 25 = R$ 250. Custos fixos: R$ 80. Lucro: 600 - 250 - 80 = R$ 270. A resposta correta é R$ 270, mas a mais próxima é R$ 350 (sem considerar os fixos). Sempre inclua TODOS os custos no cálculo!',
10, 10
FROM chapters c WHERE c.age_group = '10-12' AND c.chapter_number = 7;

-- =====================================================
-- CAPÍTULO 8 — "Consumo Consciente"
-- =====================================================

DELETE FROM missions WHERE chapter_id IN (
  SELECT id FROM chapters WHERE age_group = '10-12' AND chapter_number = 8
);

-- MISSÃO 1 — Quiz — Fácil
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 1, 'O que é consumo consciente?', 'quiz',
'{
  "question": "Consumo consciente significa:",
  "options": [
    {"id": "a", "text": "Nunca comprar nada"},
    {"id": "b", "text": "Comprar apenas itens de luxo"},
    {"id": "c", "text": "Comprar pensando no impacto financeiro, social e ambiental"},
    {"id": "d", "text": "Comprar o máximo possível enquanto tem dinheiro"}
  ]
}'::jsonb,
'{"correct": "c"}'::jsonb,
'Consumo consciente é pensar antes de comprar: "Eu realmente preciso disso? Qual o impacto?" Não é sobre privar-se, mas sobre fazer escolhas mais inteligentes para você e para o planeta!',
10, 1
FROM chapters c WHERE c.age_group = '10-12' AND c.chapter_number = 8;

-- MISSÃO 2 — Quiz — Fácil
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 2, 'Fast fashion', 'quiz',
'{
  "question": "Fast fashion se refere a roupas:",
  "options": [
    {"id": "a", "text": "Feitas com tecidos rápidos de secar"},
    {"id": "b", "text": "Produzidas rapidamente, baratas e com vida útil curta"},
    {"id": "c", "text": "Exclusivas e caras"},
    {"id": "d", "text": "Feitas de material reciclado"}
  ]
}'::jsonb,
'{"correct": "b"}'::jsonb,
'Fast fashion produz roupas baratas que saem de moda rápido — incentivando compras constantes. É prejudicial ao bolso (você compra mais) e ao meio ambiente (muito descarte). Comprar menos, melhor qualidade, dura mais e poupa dinheiro!',
10, 2
FROM chapters c WHERE c.age_group = '10-12' AND c.chapter_number = 8;

-- MISSÃO 3 — Drag & Drop — Fácil
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 3, 'Impacto das escolhas', 'drag_drop',
'{
  "question": "Classifique cada atitude:",
  "categories": ["Consumo consciente", "Consumo impulsivo"],
  "items": [
    {"id": "1", "text": "🔍 Pesquisar antes de comprar"},
    {"id": "2", "text": "🛒 Comprar por impulso na vitrine"},
    {"id": "3", "text": "♻️ Dar uma segunda vida a um objeto"},
    {"id": "4", "text": "🗑️ Jogar fora algo que ainda funciona"},
    {"id": "5", "text": "💡 Comparar preços e qualidade"},
    {"id": "6", "text": "📦 Comprar mais do que precisa"}
  ]
}'::jsonb,
'{"correct": {"1": "Consumo consciente", "2": "Consumo impulsivo", "3": "Consumo consciente", "4": "Consumo impulsivo", "5": "Consumo consciente", "6": "Consumo impulsivo"}}'::jsonb,
'Pequenas mudanças de comportamento fazem grande diferença no bolso e no planeta ao longo do tempo!',
10, 3
FROM chapters c WHERE c.age_group = '10-12' AND c.chapter_number = 8;

-- MISSÃO 4 — Numeric Input — Médio
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 4, 'Custo do descarte', 'numeric_input',
'{
  "question": "Você compra um celular novo todo ano por R$ 1.200,00. Um celular dura em média 3 anos. Quanto você gastaria a mais por ano trocando anualmente vs. a cada 3 anos?",
  "placeholder": "R$",
  "unit": "reais"
}'::jsonb,
'{"correct": 800, "tolerance": 0}'::jsonb,
'Trocando todo ano: R$ 1.200/ano. Trocando a cada 3 anos: 1.200 ÷ 3 = R$ 400/ano. Diferença: 1.200 - 400 = R$ 800 a mais por ano! Manter um produto funcionando bem economiza muito!',
10, 4
FROM chapters c WHERE c.age_group = '10-12' AND c.chapter_number = 8;

-- MISSÃO 5 — Quiz — Médio
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 5, 'Segunda mão', 'quiz',
'{
  "question": "Comprar produtos usados (segunda mão) em bom estado pode ser:",
  "options": [
    {"id": "a", "text": "Sempre uma má ideia — produtos usados são piores"},
    {"id": "b", "text": "Uma forma inteligente de economizar e reduzir desperdício"},
    {"id": "c", "text": "Ilegal em alguns casos"},
    {"id": "d", "text": "Mais caro do que comprar novo"}
  ]
}'::jsonb,
'{"correct": "b"}'::jsonb,
'Comprar usado pode gerar economias de 50-70%! Plataformas como OLX e Enjoei têm produtos em ótimo estado por uma fração do preço. Além de economizar, você reduz o desperdício. Ganha o bolso e o planeta!',
10, 5
FROM chapters c WHERE c.age_group = '10-12' AND c.chapter_number = 8;

-- MISSÃO 6 — Text Input — Médio
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 6, 'Marcas vs genéricos', 'text_input',
'{
  "question": "Produtos sem marca famosa, mais baratos mas com qualidade similar, são chamados de produtos _______ ou de marca própria.",
  "placeholder": "Digite sua resposta"
}'::jsonb,
'{"accepted": ["genéricos", "genérico", "branco"]}'::jsonb,
'Produtos genéricos! 🏷️ Em supermercados, farmácias e lojas, os produtos de marca própria costumam ser 20-40% mais baratos com qualidade muito similar. Em alguns casos (como remédios genéricos), são regulados para ter a mesma eficácia!',
10, 6
FROM chapters c WHERE c.age_group = '10-12' AND c.chapter_number = 8;

-- MISSÃO 7 — Numeric Input — Difícil
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 7, 'Desperdício financeiro', 'numeric_input',
'{
  "question": "Uma família gasta em assinaturas que não usa: Netflix R$ 45, academia R$ 100, revista R$ 30. Por ano, quanto é desperdiçado?",
  "placeholder": "R$",
  "unit": "reais"
}'::jsonb,
'{"correct": 2100, "tolerance": 0}'::jsonb,
'45 + 100 + 30 = R$ 175/mês × 12 = R$ 2.100/ano desperdiçados! Revisar assinaturas e serviços que você não usa é uma das formas mais fáceis de "encontrar" dinheiro extra todo mês!',
10, 7
FROM chapters c WHERE c.age_group = '10-12' AND c.chapter_number = 8;

-- MISSÃO 8 — Drag & Drop (Ordenação) — Difícil
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 8, 'Analisa o ciclo de vida', 'drag_drop',
'{
  "question": "Ordene o ciclo de vida consciente de um produto:",
  "items": [
    {"id": "1", "text": "🔍 Pesquisar se realmente precisa"},
    {"id": "2", "text": "💰 Comparar preços e qualidade"},
    {"id": "3", "text": "🛒 Comprar de forma planejada"},
    {"id": "4", "text": "🔧 Usar e manter bem o produto"},
    {"id": "5", "text": "🔄 Reparar antes de descartar"},
    {"id": "6", "text": "♻️ Descartar de forma responsável"}
  ]
}'::jsonb,
'{"correct_order": ["1", "2", "3", "4", "5", "6"]}'::jsonb,
'Pensar em todo o ciclo de vida de um produto é a essência do consumo consciente. Cada etapa tem impacto no seu bolso e no meio ambiente!',
10, 8
FROM chapters c WHERE c.age_group = '10-12' AND c.chapter_number = 8;

-- MISSÃO 9 — Quiz — Difícil
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 9, 'Greenwashing', 'quiz',
'{
  "question": "Uma empresa diz que seu produto é \"100% ecológico e sustentável\" sem apresentar nenhuma certificação ou evidência. Isso pode ser:",
  "options": [
    {"id": "a", "text": "Uma garantia oficial de qualidade"},
    {"id": "b", "text": "Greenwashing — marketing enganoso que usa termos ambientais sem substância"},
    {"id": "c", "text": "Uma exigência legal"},
    {"id": "d", "text": "Sempre verdade"}
  ]
}'::jsonb,
'{"correct": "b"}'::jsonb,
'Greenwashing é quando empresas usam claims ambientais para vender mais, sem comprovação. Fique atento a certificações reais (como FSC, LEED, Rainforest Alliance). Consumidor consciente verifica as afirmações!',
10, 9
FROM chapters c WHERE c.age_group = '10-12' AND c.chapter_number = 8;

-- MISSÃO 10 — BOSS 🏆 — Quiz
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 10, '🏆 Boss: Consumo Consciente', 'quiz',
'{
  "question": "Lucas gasta R$ 400/mês em roupas novas de fast fashion. Ana gasta R$ 150/mês em roupas, mas compra peças de qualidade que duram 3x mais. Em 1 ano, qual a diferença de gasto entre os dois?",
  "options": [
    {"id": "a", "text": "R$ 600"},
    {"id": "b", "text": "R$ 1.800"},
    {"id": "c", "text": "R$ 3.000"},
    {"id": "d", "text": "R$ 2.400"}
  ]
}'::jsonb,
'{"correct": "b"}'::jsonb,
'🏆 Lucas: 400 × 12 = R$ 4.800/ano. Ana: 150 × 12 = R$ 1.800/ano. Diferença: 4.800 - 1.800 = R$ 3.000. Mas Ana compra peças que duram 3x mais, então o valor real por uso é ainda mais favorável para ela. Qualidade > quantidade é uma estratégia financeira inteligente!',
10, 10
FROM chapters c WHERE c.age_group = '10-12' AND c.chapter_number = 8;

-- =====================================================
-- CAPÍTULO 9 — "Planejamento Financeiro"
-- =====================================================

DELETE FROM missions WHERE chapter_id IN (
  SELECT id FROM chapters WHERE age_group = '10-12' AND chapter_number = 9
);

-- MISSÃO 1 — Quiz — Fácil
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 1, 'O que é orçamento?', 'quiz',
'{
  "question": "Um orçamento financeiro pessoal é:",
  "options": [
    {"id": "a", "text": "Um documento só para empresas"},
    {"id": "b", "text": "Um plano de quanto você espera ganhar e gastar num período"},
    {"id": "c", "text": "Uma lista de compras"},
    {"id": "d", "text": "Um extrato bancário"}
  ]
}'::jsonb,
'{"correct": "b"}'::jsonb,
'Orçamento é seu mapa financeiro! 🗺️ Ele mostra para onde seu dinheiro vai antes de você gastá-lo. Quem tem orçamento toma decisões mais conscientes e raramente fica sem dinheiro no fim do mês!',
10, 1
FROM chapters c WHERE c.age_group = '10-12' AND c.chapter_number = 9;

-- MISSÃO 2 — Drag & Drop — Fácil
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 2, 'Curto, médio ou longo prazo?', 'drag_drop',
'{
  "question": "Classifique os objetivos financeiros:",
  "categories": ["Curto Prazo (até 1 ano)", "Médio Prazo (1-5 anos)", "Longo Prazo (5+ anos)"],
  "items": [
    {"id": "1", "text": "🎮 Comprar um jogo novo"},
    {"id": "2", "text": "🚗 Comprar um carro"},
    {"id": "3", "text": "🏠 Comprar uma casa"},
    {"id": "4", "text": "🎂 Festa de aniversário"},
    {"id": "5", "text": "🎓 Pagar faculdade"},
    {"id": "6", "text": "✈️ Viagem internacional"}
  ]
}'::jsonb,
'{"correct": {"1": "Curto Prazo (até 1 ano)", "2": "Médio Prazo (1-5 anos)", "3": "Longo Prazo (5+ anos)", "4": "Curto Prazo (até 1 ano)", "5": "Longo Prazo (5+ anos)", "6": "Médio Prazo (1-5 anos)"}}'::jsonb,
'Classificar objetivos por prazo ajuda a saber quanto guardar por mês para cada um. Objetivos de longo prazo precisam de investimentos. Curto prazo pode ficar na poupança!',
10, 2
FROM chapters c WHERE c.age_group = '10-12' AND c.chapter_number = 9;

-- MISSÃO 3 — Quiz — Fácil
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 3, 'Renda e despesa', 'quiz',
'{
  "question": "Se suas despesas mensais são maiores que sua renda, você tem:",
  "options": [
    {"id": "a", "text": "Superávit (sobra dinheiro)"},
    {"id": "b", "text": "Déficit (falta dinheiro)"},
    {"id": "c", "text": "Equilíbrio financeiro"},
    {"id": "d", "text": "Uma boa situação"}
  ]
}'::jsonb,
'{"correct": "b"}'::jsonb,
'Déficit! 📉 Gastar mais do que ganha leva ao endividamento. A regra básica: despesas < renda. A diferença (positiva) é o que você pode poupar e investir. Simples assim!',
10, 3
FROM chapters c WHERE c.age_group = '10-12' AND c.chapter_number = 9;

-- MISSÃO 4 — Numeric Input — Médio
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 4, 'Monta o orçamento', 'numeric_input',
'{
  "question": "Renda mensal: R$ 300 (mesada + bicos). Despesas: R$ 120 (necessidades) + R$ 80 (lazer) + R$ 60 (poupança). Qual o saldo do mês?",
  "placeholder": "R$",
  "unit": "reais"
}'::jsonb,
'{"correct": 40, "tolerance": 0}'::jsonb,
'120 + 80 + 60 = R$ 260 de despesas. 300 - 260 = R$ 40 de saldo positivo! Esse saldo pode ir para uma reserva de emergência ou um objetivo específico. Parabéns pelo planejamento!',
10, 4
FROM chapters c WHERE c.age_group = '10-12' AND c.chapter_number = 9;

-- MISSÃO 5 — Text Input — Médio
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 5, 'Meta SMART', 'text_input',
'{
  "question": "Uma boa meta financeira deve ser Específica, Mensurável, Atingível, Relevante e com Prazo. Essa metodologia de metas é chamada de meta _______.",
  "placeholder": "Digite sua resposta"
}'::jsonb,
'{"accepted": ["SMART", "smart"]}'::jsonb,
'Meta SMART! 🎯 Exemplo ruim: "quero economizar". Exemplo SMART: "quero guardar R$ 50 por mês durante 6 meses para comprar um fone de R$ 300 até dezembro". Metas SMART têm muito mais chance de serem alcançadas!',
10, 5
FROM chapters c WHERE c.age_group = '10-12' AND c.chapter_number = 9;

-- MISSÃO 6 — Quiz — Médio
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 6, 'Reserva de emergência', 'quiz',
'{
  "question": "A reserva de emergência ideal equivale a quantos meses de despesas?",
  "options": [
    {"id": "a", "text": "1 mês"},
    {"id": "b", "text": "3 a 6 meses"},
    {"id": "c", "text": "10 meses"},
    {"id": "d", "text": "1 semana"}
  ]
}'::jsonb,
'{"correct": "b"}'::jsonb,
'Especialistas recomendam ter 3 a 6 meses de despesas guardados para emergências. Para adolescentes, começar com 1-3 meses já é ótimo. Essa reserva te protege de imprevistos sem precisar pedir emprestado!',
10, 6
FROM chapters c WHERE c.age_group = '10-12' AND c.chapter_number = 9;

-- MISSÃO 7 — Numeric Input — Difícil
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 7, 'Projeta o futuro', 'numeric_input',
'{
  "question": "Você poupa R$ 50,00 por mês. Em 2 anos, quanto terá guardado (sem contar juros)?",
  "placeholder": "R$",
  "unit": "reais"
}'::jsonb,
'{"correct": 1200, "tolerance": 0}'::jsonb,
'50 × 24 meses = R$ 1.200,00! Com juros da poupança ou de um CDB, o valor seria ainda maior. R$ 50/mês parece pouco, mas em 2 anos já é R$ 1.200 — suficiente para um computador básico ou uma viagem!',
10, 7
FROM chapters c WHERE c.age_group = '10-12' AND c.chapter_number = 9;

-- MISSÃO 8 — Drag & Drop — Difícil
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 8, 'Identifica os erros', 'drag_drop',
'{
  "question": "Classifique cada comportamento:",
  "categories": ["Bom hábito financeiro", "Mau hábito financeiro"],
  "items": [
    {"id": "1", "text": "📊 Anotar todos os gastos"},
    {"id": "2", "text": "💳 Parcelar tudo sem calcular o total"},
    {"id": "3", "text": "🏦 Guardar antes de gastar"},
    {"id": "4", "text": "💸 Gastar o salário todo no primeiro dia"},
    {"id": "5", "text": "📱 Usar app de controle financeiro"},
    {"id": "6", "text": "🙈 Ignorar extratos bancários"}
  ]
}'::jsonb,
'{"correct": {"1": "Bom hábito financeiro", "2": "Mau hábito financeiro", "3": "Bom hábito financeiro", "4": "Mau hábito financeiro", "5": "Bom hábito financeiro", "6": "Mau hábito financeiro"}}'::jsonb,
'Hábitos financeiros se constroem ao longo do tempo. Pequenas atitudes diárias como anotar gastos e guardar antes de gastar criam uma base sólida para a vida inteira!',
10, 8
FROM chapters c WHERE c.age_group = '10-12' AND c.chapter_number = 9;

-- MISSÃO 9 — Quiz — Difícil
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 9, 'Revisão do plano', 'quiz',
'{
  "question": "Com que frequência você deve revisar seu orçamento e metas financeiras?",
  "options": [
    {"id": "a", "text": "Uma vez por ano"},
    {"id": "b", "text": "Nunca — planejamento é para sempre"},
    {"id": "c", "text": "Mensalmente, para ajustar ao que realmente aconteceu"},
    {"id": "d", "text": "Só quando tiver problemas financeiros"}
  ]
}'::jsonb,
'{"correct": "c"}'::jsonb,
'Planejamento financeiro é dinâmico! 🔄 Todo mês, compare o planejado com o realizado, entenda os desvios e ajuste. A vida muda, o orçamento deve acompanhar. Quem revisa mensalmente tem muito mais controle!',
10, 9
FROM chapters c WHERE c.age_group = '10-12' AND c.chapter_number = 9;

-- MISSÃO 10 — BOSS 🏆 — Quiz
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 10, '🏆 Boss: Planejamento Financeiro', 'quiz',
'{
  "question": "Pedro tem renda de R$ 400/mês. Despesas fixas: R$ 150. Meta: guardar R$ 80/mês para uma viagem em 8 meses. Qual o máximo que Pedro pode gastar em lazer por mês?",
  "options": [
    {"id": "a", "text": "R$ 170,00"},
    {"id": "b", "text": "R$ 250,00"},
    {"id": "c", "text": "R$ 120,00"},
    {"id": "d", "text": "R$ 80,00"}
  ]
}'::jsonb,
'{"correct": "a"}'::jsonb,
'🏆 Renda: R$ 400. Fixas: R$ 150. Poupança meta: R$ 80. Disponível para lazer: 400 - 150 - 80 = R$ 170,00. Em 8 meses, Pedro terá R$ 640 para a viagem! Planejamento financeiro transforma sonhos em realidade com matemática simples!',
10, 10
FROM chapters c WHERE c.age_group = '10-12' AND c.chapter_number = 9;
