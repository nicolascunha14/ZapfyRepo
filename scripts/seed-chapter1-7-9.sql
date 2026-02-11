-- =====================================================
-- SEED: Missões do Capítulo 1 — "O que é Dinheiro?"
-- Faixa: 7-9 anos
-- =====================================================

-- Limpa missões antigas do capítulo 1 (7-9)
DELETE FROM missions WHERE chapter_id IN (
  SELECT id FROM chapters WHERE age_group = '7-9' AND chapter_number = 1
);

-- MISSÃO 1 — Quiz — Fácil
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 1, 'O que é dinheiro?', 'quiz',
'{
  "question": "Dinheiro é uma coisa que usamos para...",
  "options": [
    {"id": "a", "text": "🍕 Comer quando temos fome"},
    {"id": "b", "text": "🛍️ Trocar por coisas que precisamos ou queremos"},
    {"id": "c", "text": "🎈 Decorar festas"},
    {"id": "d", "text": "📚 Ler histórias"}
  ]
}'::jsonb,
'{"correct": "b"}'::jsonb,
'Isso mesmo! 🎉 Dinheiro é como uma "chave mágica" que usamos para trocar por coisas: comida, brinquedos, roupas e muito mais!',
10, 1
FROM chapters c WHERE c.age_group = '7-9' AND c.chapter_number = 1;

-- MISSÃO 2 — Verdadeiro/Falso — Fácil
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 2, 'Dinheiro cresce em árvore?', 'true_false',
'{
  "question": "Dinheiro pode ser encontrado crescendo em árvores ou caindo do céu."
}'::jsonb,
'{"correct": false}'::jsonb,
'Falso! 😄 Dinheiro precisa ser CONQUISTADO! As pessoas trabalham, ajudam os outros ou vendem coisas para ganhar dinheiro. Não cai do céu — mas pode cair no seu cofrinho se você se esforçar! 🐷',
10, 2
FROM chapters c WHERE c.age_group = '7-9' AND c.chapter_number = 1;

-- MISSÃO 3 — Quiz — Fácil
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 3, 'Quem usa dinheiro?', 'quiz',
'{
  "question": "Quem usa dinheiro no dia a dia?",
  "options": [
    {"id": "a", "text": "🦁 Só animais"},
    {"id": "b", "text": "👶 Só bebês"},
    {"id": "c", "text": "👨‍👩‍👧‍👦 Pessoas de todas as idades"},
    {"id": "d", "text": "🤖 Só robôs"}
  ]
}'::jsonb,
'{"correct": "c"}'::jsonb,
'Exatamente! 🙌 Crianças, adultos, avós... todo mundo usa dinheiro. Você também já usa quando compra um lanche ou um brinquedo!',
10, 3
FROM chapters c WHERE c.age_group = '7-9' AND c.chapter_number = 1;

-- MISSÃO 4 — Quiz — Médio
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 4, 'Moedas e notas', 'quiz',
'{
  "question": "Qual dessas opções é uma forma de dinheiro no Brasil?",
  "options": [
    {"id": "a", "text": "🪨 Pedras coloridas"},
    {"id": "b", "text": "🍃 Folhas de árvore"},
    {"id": "c", "text": "💵 Notas de Real"},
    {"id": "d", "text": "🧸 Brinquedos"}
  ]
}'::jsonb,
'{"correct": "c"}'::jsonb,
'Correto! 💚 No Brasil usamos o Real (R$). Ele vem em moedas (R$0,05, R$0,10, R$0,25, R$0,50, R$1,00) e notas (R$2, R$5, R$10, R$20, R$50, R$100, R$200)!',
10, 4
FROM chapters c WHERE c.age_group = '7-9' AND c.chapter_number = 1;

-- MISSÃO 5 — Quiz — Médio
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 5, 'Vale mais ou menos?', 'quiz',
'{
  "question": "Uma nota de R$ 10 vale...",
  "options": [
    {"id": "a", "text": "💰 Mais do que uma nota de R$ 50"},
    {"id": "b", "text": "💸 Menos do que uma nota de R$ 50"},
    {"id": "c", "text": "💵 O mesmo que uma nota de R$ 50"},
    {"id": "d", "text": "🤷 Não tem diferença"}
  ]
}'::jsonb,
'{"correct": "b"}'::jsonb,
'Isso aí! 🌟 R$ 50 vale CINCO VEZES mais do que R$ 10. Quanto maior o número na nota, mais coisas você consegue comprar!',
10, 5
FROM chapters c WHERE c.age_group = '7-9' AND c.chapter_number = 1;

-- MISSÃO 6 — Numeric Input — Médio
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 6, 'Conta as moedas!', 'numeric_input',
'{
  "question": "🪙🪙🪙 Você tem 3 moedas de R$ 1,00. Quanto você tem no total?",
  "placeholder": "R$",
  "unit": "reais"
}'::jsonb,
'{"correct": 3, "tolerance": 0}'::jsonb,
'Perfeito! ✨ 1 + 1 + 1 = R$ 3,00. Você já sabe somar dinheiro!',
10, 6
FROM chapters c WHERE c.age_group = '7-9' AND c.chapter_number = 1;

-- MISSÃO 7 — Verdadeiro/Falso — Difícil
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 7, 'Dinheiro antigamente', 'true_false',
'{
  "question": "Antigamente, as pessoas trocavam coisas entre si (como comida por roupas) antes de existir dinheiro."
}'::jsonb,
'{"correct": true}'::jsonb,
'Verdadeiro! 🏺 Isso se chama escambo. Imagine trocar uma galinha por um saco de arroz! Dinheiro foi inventado para facilitar essas trocas. Bem mais fácil, né?',
10, 7
FROM chapters c WHERE c.age_group = '7-9' AND c.chapter_number = 1;

-- MISSÃO 8 — Numeric Input — Difícil
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 8, 'Quanto sobrou?', 'numeric_input',
'{
  "question": "🎒 Você tinha R$ 5,00 no bolso. Gastou R$ 3,00 num sorvete 🍦. Quanto sobrou?",
  "placeholder": "R$",
  "unit": "reais"
}'::jsonb,
'{"correct": 2, "tolerance": 0}'::jsonb,
'Muito bem! 🎊 5 - 3 = R$ 2,00. Isso se chama troco — é o que sobra quando você paga mais do que o preço de algo!',
10, 8
FROM chapters c WHERE c.age_group = '7-9' AND c.chapter_number = 1;

-- MISSÃO 9 — Verdadeiro/Falso — Difícil
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 9, 'Dinheiro digital', 'true_false',
'{
  "question": "Hoje em dia, dinheiro só existe em papel e moedas. Não existe dinheiro no celular ou computador."
}'::jsonb,
'{"correct": false}'::jsonb,
'Falso! 📱 Hoje existe o dinheiro digital! Quando seus pais pagam pelo celular ou fazem um PIX, eles estão usando dinheiro real — só que em formato digital. O valor é o mesmo, só a forma mudou!',
10, 9
FROM chapters c WHERE c.age_group = '7-9' AND c.chapter_number = 1;

-- MISSÃO 10 — Quiz — BOSS 🏆
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 10, '🏆 Você é expert em dinheiro!', 'quiz',
'{
  "question": "Pedro tem R$ 10,00 e quer comprar um lanche de R$ 7,00. Qual das opções abaixo é VERDADEIRA?",
  "options": [
    {"id": "a", "text": "😢 Pedro não tem dinheiro suficiente para o lanche"},
    {"id": "b", "text": "✅ Pedro tem dinheiro suficiente e vai receber R$ 3,00 de troco"},
    {"id": "c", "text": "🤔 Pedro vai precisar de mais R$ 3,00 para comprar o lanche"},
    {"id": "d", "text": "💸 Pedro vai gastar todo o seu dinheiro sem sobrar nada"}
  ]
}'::jsonb,
'{"correct": "b"}'::jsonb,
'Arrasou! 🏆 Pedro TEM dinheiro suficiente (R$10 > R$7). E o troco é 10 - 7 = R$ 3,00. Você entendeu dinheiro, troco e comparação de valores — tudo de uma vez! Incrível!',
10, 10
FROM chapters c WHERE c.age_group = '7-9' AND c.chapter_number = 1;
