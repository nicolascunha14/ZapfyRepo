-- =====================================================
-- SEED: Missões dos Capítulos 2-9 — Faixa 7-9 anos
-- Total: 80 missões (10 por capítulo × 8 capítulos)
-- =====================================================

-- =====================================================
-- CAPÍTULO 2 — "Como Ganhar Dinheiro?"
-- =====================================================

DELETE FROM missions WHERE chapter_id IN (
  SELECT id FROM chapters WHERE age_group = '7-9' AND chapter_number = 2
);

-- MISSÃO 1 — Quiz — Fácil
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 1, 'Como as pessoas ganham dinheiro?', 'quiz',
'{
  "question": "Como a maioria das pessoas ganha dinheiro?",
  "options": [
    {"id": "a", "text": "🎲 Jogando e torcendo para ganhar"},
    {"id": "b", "text": "💼 Trabalhando e oferecendo algo útil para outras pessoas"},
    {"id": "c", "text": "🌳 Colhendo de árvores especiais"},
    {"id": "d", "text": "⭐ Pedindo para as estrelas"}
  ]
}'::jsonb,
'{"correct": "b"}'::jsonb,
'Exato! 💼 As pessoas ganham dinheiro quando oferecem algo valioso: seu tempo, habilidade ou produto. Um padeiro vende pão, um médico cuida de doentes, um professor ensina. Todo trabalho tem valor!',
10, 1
FROM chapters c WHERE c.age_group = '7-9' AND c.chapter_number = 2;

-- MISSÃO 2 — Verdadeiro/Falso — Fácil
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 2, 'Só adultos podem ganhar dinheiro?', 'true_false',
'{
  "question": "Somente adultos podem ganhar dinheiro. Crianças nunca podem receber dinheiro pelo que fazem."
}'::jsonb,
'{"correct": false}'::jsonb,
'Falso! 😄 Crianças também podem ganhar dinheiro ajudando em casa, vendendo artesanato, reciclando, cuidando de plantas dos vizinhos e muito mais! Nunca é cedo demais para aprender!',
10, 2
FROM chapters c WHERE c.age_group = '7-9' AND c.chapter_number = 2;

-- MISSÃO 3 — Quiz — Fácil
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 3, 'O que é mesada?', 'quiz',
'{
  "question": "Mesada é:",
  "options": [
    {"id": "a", "text": "🍽️ Uma mesa pequena para crianças"},
    {"id": "b", "text": "💰 Um valor que os pais dão regularmente para os filhos aprenderem a usar dinheiro"},
    {"id": "c", "text": "🎂 Um presente de aniversário"},
    {"id": "d", "text": "📚 Uma lição de casa sobre dinheiro"}
  ]
}'::jsonb,
'{"correct": "b"}'::jsonb,
'Isso mesmo! 🎉 Mesada é uma quantia que os pais dão regularmente (semanal ou mensalmente) para os filhos aprenderem a lidar com dinheiro. É uma ferramenta de aprendizado muito importante!',
10, 3
FROM chapters c WHERE c.age_group = '7-9' AND c.chapter_number = 2;

-- MISSÃO 4 — Quiz — Médio
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 4, 'Trabalho e recompensa', 'quiz',
'{
  "question": "Pedro ajudou a lavar o carro do pai e ganhou R$ 5,00. O que Pedro fez para ganhar esse dinheiro?",
  "options": [
    {"id": "a", "text": "🎁 Pediu um presente"},
    {"id": "b", "text": "💼 Ofereceu um serviço útil (lavou o carro)"},
    {"id": "c", "text": "😢 Chorou até ganhar"},
    {"id": "d", "text": "🎲 Teve sorte"}
  ]
}'::jsonb,
'{"correct": "b"}'::jsonb,
'Perfeito! 💪 Pedro ofereceu seu trabalho e recebeu uma recompensa justa. Isso é o básico da economia: você oferece algo útil e recebe dinheiro em troca. Toda profissão funciona assim!',
10, 4
FROM chapters c WHERE c.age_group = '7-9' AND c.chapter_number = 2;

-- MISSÃO 5 — Numeric Input — Médio
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 5, 'Soma a mesada!', 'numeric_input',
'{
  "question": "Ana recebe R$ 10,00 de mesada por semana. Em 4 semanas, quanto ela recebeu no total?",
  "placeholder": "R$",
  "unit": "reais"
}'::jsonb,
'{"correct": 40, "tolerance": 0}'::jsonb,
'Muito bem! 🌟 10 × 4 = R$ 40,00. Saber calcular quanto você vai receber ajuda a planejar o que fazer com o dinheiro antes mesmo de ele chegar!',
10, 5
FROM chapters c WHERE c.age_group = '7-9' AND c.chapter_number = 2;

-- MISSÃO 6 — Verdadeiro/Falso — Médio
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 6, 'Todo trabalho tem valor?', 'true_false',
'{
  "question": "Alguns trabalhos são mais importantes que outros. Por exemplo, um médico é mais importante que um lixeiro."
}'::jsonb,
'{"correct": false}'::jsonb,
'Falso! 🤝 Todo trabalho é importante! Sem lixeiros, a cidade ficaria cheia de lixo e doenças. Sem médicos, não teríamos saúde. Cada profissão tem seu papel e merece respeito. Nunca subestime nenhum trabalho!',
10, 6
FROM chapters c WHERE c.age_group = '7-9' AND c.chapter_number = 2;

-- MISSÃO 7 — Quiz — Difícil
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 7, 'Ideia de negócio', 'quiz',
'{
  "question": "Maria quer ganhar dinheiro na escola. Ela percebeu que os colegas sempre esquecem lápis. Qual a melhor ideia?",
  "options": [
    {"id": "a", "text": "😤 Reclamar que os colegas são desorganizados"},
    {"id": "b", "text": "✏️ Vender lápis por um preço justo para os colegas que esquecem"},
    {"id": "c", "text": "🎁 Dar lápis de graça para todo mundo"},
    {"id": "d", "text": "🙈 Ignorar a situação"}
  ]
}'::jsonb,
'{"correct": "b"}'::jsonb,
'Que ideia genial! 🚀 Maria identificou um PROBLEMA (colegas sem lápis) e criou uma SOLUÇÃO (vender lápis). Isso é empreendedorismo! Os maiores negócios do mundo começaram identificando um problema e resolvendo ele.',
10, 7
FROM chapters c WHERE c.age_group = '7-9' AND c.chapter_number = 2;

-- MISSÃO 8 — Numeric Input — Difícil
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 8, 'Calcula o ganho!', 'numeric_input',
'{
  "question": "João vende brigadeiros por R$ 2,00 cada. Vendeu 8 brigadeiros hoje. Quanto ele ganhou?",
  "placeholder": "R$",
  "unit": "reais"
}'::jsonb,
'{"correct": 16, "tolerance": 0}'::jsonb,
'Arrasou! 🍫 2 × 8 = R$ 16,00. João trabalhou, vendeu e ganhou dinheiro! Claro que ele também gastou para fazer os brigadeiros — o que sobra depois dos gastos é o lucro. Você já está pensando como um empreendedor!',
10, 8
FROM chapters c WHERE c.age_group = '7-9' AND c.chapter_number = 2;

-- MISSÃO 9 — Verdadeiro/Falso — Difícil
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 9, 'Habilidades valem dinheiro?', 'true_false',
'{
  "question": "Quanto melhor você é em alguma coisa (desenhar, programar, cozinhar), mais as pessoas estão dispostas a pagar pelo seu trabalho."
}'::jsonb,
'{"correct": true}'::jsonb,
'Verdadeiro! ⭐ Habilidade = valor. Um médico especialista ganha mais que um médico geral. Um chef famoso cobra mais que um cozinheiro iniciante. Investir em aprender e melhorar suas habilidades é o melhor investimento que existe!',
10, 9
FROM chapters c WHERE c.age_group = '7-9' AND c.chapter_number = 2;

-- MISSÃO 10 — Quiz — BOSS 🏆
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 10, '🏆 Desafio do empreendedor!', 'quiz',
'{
  "question": "Sofia faz pulseiras e vende por R$ 5,00 cada. Gastou R$ 12,00 em materiais e fez 5 pulseiras. Ela teve lucro ou prejuízo?",
  "options": [
    {"id": "a", "text": "😢 Prejuízo — ela perdeu dinheiro"},
    {"id": "b", "text": "🎉 Lucro de R$ 13,00"},
    {"id": "c", "text": "😐 Nem lucro nem prejuízo — empatou"},
    {"id": "d", "text": "🤷 Não é possível calcular"}
  ]
}'::jsonb,
'{"correct": "b"}'::jsonb,
'Incrível! 🏆 Receita: 5 × R$ 5 = R$ 25. Custo: R$ 12. Lucro = 25 - 12 = R$ 13,00! Sofia ganhou R$ 13 além do que gastou. Você calculou receita, custo e lucro — conceitos que empresários usam todo dia. Você é demais!',
10, 10
FROM chapters c WHERE c.age_group = '7-9' AND c.chapter_number = 2;

-- =====================================================
-- CAPÍTULO 3 — "Como Gastar Bem?"
-- =====================================================

DELETE FROM missions WHERE chapter_id IN (
  SELECT id FROM chapters WHERE age_group = '7-9' AND chapter_number = 3
);

-- MISSÃO 1 — Quiz — Fácil
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 1, 'Preciso ou quero?', 'quiz',
'{
  "question": "Qual a diferença entre PRECISAR e QUERER algo?",
  "options": [
    {"id": "a", "text": "Não há diferença — se você quer, você precisa"},
    {"id": "b", "text": "Precisar é algo essencial para viver. Querer é um desejo extra"},
    {"id": "c", "text": "Querer é mais importante que precisar"},
    {"id": "d", "text": "Só adultos precisam de coisas"}
  ]
}'::jsonb,
'{"correct": "b"}'::jsonb,
'Exatamente! ⚖️ Comida, abrigo e saúde são NECESSIDADES. Um brinquedo novo, sorvete ou jogo são DESEJOS. Os dois têm seu lugar, mas precisamos cuidar das necessidades primeiro!',
10, 1
FROM chapters c WHERE c.age_group = '7-9' AND c.chapter_number = 3;

-- MISSÃO 2 — Verdadeiro/Falso — Fácil
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 2, 'Gastar tudo é bom?', 'true_false',
'{
  "question": "Quando você recebe dinheiro, o melhor é gastar tudo de uma vez para aproveitar."
}'::jsonb,
'{"correct": false}'::jsonb,
'Falso! 🐷 Gastar tudo de uma vez deixa você sem dinheiro para emergências ou coisas que podem surgir depois. O segredo é gastar com inteligência: um pouco agora, um pouco guardado para depois!',
10, 2
FROM chapters c WHERE c.age_group = '7-9' AND c.chapter_number = 3;

-- MISSÃO 3 — Quiz — Fácil
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 3, 'Escolha inteligente', 'quiz',
'{
  "question": "Você tem R$ 8,00. Um lanche custa R$ 5,00 e um brinquedo pequeno custa R$ 8,00. O que é mais inteligente?",
  "options": [
    {"id": "a", "text": "🧸 Comprar o brinquedo e ficar sem lanche"},
    {"id": "b", "text": "🍔 Comprar o lanche e guardar os R$ 3,00 restantes"},
    {"id": "c", "text": "😤 Não comprar nada e ficar bravo"},
    {"id": "d", "text": "💸 Gastar tudo de qualquer jeito"}
  ]
}'::jsonb,
'{"correct": "b"}'::jsonb,
'Ótima escolha! 🌟 Comprar o que você precisa (lanche) e guardar o restante é pensar no futuro. Com os R$ 3,00 guardados toda semana, logo você terá dinheiro para o brinquedo também!',
10, 3
FROM chapters c WHERE c.age_group = '7-9' AND c.chapter_number = 3;

-- MISSÃO 4 — Numeric Input — Médio
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 4, 'Quanto sobra?', 'numeric_input',
'{
  "question": "Você tem R$ 15,00. Gastou R$ 6,00 no lanche e R$ 4,00 num caderno. Quanto sobrou?",
  "placeholder": "R$",
  "unit": "reais"
}'::jsonb,
'{"correct": 5, "tolerance": 0}'::jsonb,
'Muito bem! 🎯 6 + 4 = R$ 10 gastos. 15 - 10 = R$ 5,00 sobrando. Saber quanto sobrou depois dos gastos é o primeiro passo para planejar o dinheiro. Você está indo muito bem!',
10, 4
FROM chapters c WHERE c.age_group = '7-9' AND c.chapter_number = 3;

-- MISSÃO 5 — Quiz — Médio
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 5, 'Compra por impulso', 'quiz',
'{
  "question": "Você viu um brinquedo na vitrine e ficou com muita vontade de comprar na hora, sem ter planejado. Isso se chama:",
  "options": [
    {"id": "a", "text": "🧠 Compra inteligente"},
    {"id": "b", "text": "⚡ Compra por impulso"},
    {"id": "c", "text": "📋 Compra planejada"},
    {"id": "d", "text": "🎁 Presente para si mesmo"}
  ]
}'::jsonb,
'{"correct": "b"}'::jsonb,
'Isso mesmo! ⚡ Compra por impulso é quando a emoção manda. Uma dica: se você ainda quiser o brinquedo depois de dormir e pensar bem, aí vale comprar! Isso evita arrependimentos.',
10, 5
FROM chapters c WHERE c.age_group = '7-9' AND c.chapter_number = 3;

-- MISSÃO 6 — Verdadeiro/Falso — Médio
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 6, 'Mais barato é sempre melhor?', 'true_false',
'{
  "question": "O produto mais barato é sempre a melhor escolha quando você vai comprar algo."
}'::jsonb,
'{"correct": false}'::jsonb,
'Falso! 🤔 Às vezes um produto mais caro dura muito mais e acaba sendo mais econômico. Um tênis de R$ 80 que dura 2 anos pode ser melhor que um de R$ 30 que estraga em 3 meses. Qualidade importa!',
10, 6
FROM chapters c WHERE c.age_group = '7-9' AND c.chapter_number = 3;

-- MISSÃO 7 — Quiz — Difícil
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 7, 'Comparando preços', 'quiz',
'{
  "question": "Loja A vende suco por R$ 4,00. Loja B vende o mesmo suco por R$ 3,00. Se você compra 3 sucos por semana, quanto economiza na Loja B em 1 mês (4 semanas)?",
  "options": [
    {"id": "a", "text": "💰 R$ 4,00"},
    {"id": "b", "text": "💰 R$ 12,00"},
    {"id": "c", "text": "💰 R$ 6,00"},
    {"id": "d", "text": "💰 R$ 3,00"}
  ]
}'::jsonb,
'{"correct": "b"}'::jsonb,
'Calculou muito bem! 🧮 Economia por suco: R$ 1,00. Por semana: 3 × 1 = R$ 3,00. Por mês: 3 × 4 = R$ 12,00! Parece pouco por suco, mas comparar preços sempre que possível gera uma economia enorme ao longo do tempo!',
10, 7
FROM chapters c WHERE c.age_group = '7-9' AND c.chapter_number = 3;

-- MISSÃO 8 — Numeric Input — Difícil
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 8, 'Lista de compras', 'numeric_input',
'{
  "question": "Você foi ao mercado com R$ 20,00. Comprou: leite R$ 4,00, pão R$ 3,50, fruta R$ 5,00. Quanto sobrou?",
  "placeholder": "R$",
  "unit": "reais"
}'::jsonb,
'{"correct": 7.50, "tolerance": 0.01}'::jsonb,
'Ótimo! 🛒 4 + 3,50 + 5 = R$ 12,50 gastos. 20 - 12,50 = R$ 7,50 sobrando. Fazer lista de compras antes de ir ao mercado evita gastos desnecessários e ajuda a não esquecer nada importante!',
10, 8
FROM chapters c WHERE c.age_group = '7-9' AND c.chapter_number = 3;

-- MISSÃO 9 — Verdadeiro/Falso — Difícil
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 9, 'Planejar antes de gastar', 'true_false',
'{
  "question": "Planejar o que você vai comprar ANTES de receber o dinheiro ajuda a gastar melhor."
}'::jsonb,
'{"correct": true}'::jsonb,
'Verdadeiro! 📋 Quando você decide antes o que vai comprar, evita gastos por impulso. É como ter um mapa antes de viajar — você chega onde quer sem se perder pelo caminho!',
10, 9
FROM chapters c WHERE c.age_group = '7-9' AND c.chapter_number = 3;

-- MISSÃO 10 — Quiz — BOSS 🏆
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 10, '🏆 Mestre das compras!', 'quiz',
'{
  "question": "Luisa tem R$ 25,00. Precisa de: lanche R$ 5,00 e caderno R$ 8,00. Quer: adesivos R$ 7,00. Quanto sobra se ela comprar tudo que precisa E o que quer?",
  "options": [
    {"id": "a", "text": "💰 R$ 5,00"},
    {"id": "b", "text": "💰 R$ 12,00"},
    {"id": "c", "text": "💰 R$ 7,00"},
    {"id": "d", "text": "💰 R$ 10,00"}
  ]
}'::jsonb,
'{"correct": "a"}'::jsonb,
'Perfeito! 🏆 Necessidades: 5 + 8 = R$ 13. Desejo: R$ 7. Total: R$ 20. Sobram: 25 - 20 = R$ 5,00! Luisa conseguiu comprar tudo que precisava, ainda realizou um desejo E guardou R$ 5. Isso é gastar bem de verdade!',
10, 10
FROM chapters c WHERE c.age_group = '7-9' AND c.chapter_number = 3;

-- =====================================================
-- CAPÍTULO 4 — "Troco e Cálculos"
-- =====================================================

DELETE FROM missions WHERE chapter_id IN (
  SELECT id FROM chapters WHERE age_group = '7-9' AND chapter_number = 4
);

-- MISSÃO 1 — Quiz — Fácil
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 1, 'O que é troco?', 'quiz',
'{
  "question": "Troco é:",
  "options": [
    {"id": "a", "text": "🎁 Um presente que o vendedor te dá"},
    {"id": "b", "text": "💰 A diferença que você recebe quando paga mais do que o preço"},
    {"id": "c", "text": "🏷️ O preço de um produto"},
    {"id": "d", "text": "📝 A lista de compras"}
  ]
}'::jsonb,
'{"correct": "b"}'::jsonb,
'Isso mesmo! 💰 Se um produto custa R$ 7 e você paga R$ 10, o vendedor devolve R$ 3. Esses R$ 3 são o troco! Sempre verifique se o troco está correto antes de sair da loja.',
10, 1
FROM chapters c WHERE c.age_group = '7-9' AND c.chapter_number = 4;

-- MISSÃO 2 — Numeric Input — Fácil
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 2, 'Calcula o troco!', 'numeric_input',
'{
  "question": "Um sorvete custa R$ 4,00. Você paga com R$ 10,00. Qual é o troco?",
  "placeholder": "R$",
  "unit": "reais"
}'::jsonb,
'{"correct": 6, "tolerance": 0}'::jsonb,
'Correto! 🍦 10 - 4 = R$ 6,00 de troco. Sempre faça essa conta na cabeça antes de receber o troco — assim você garante que não está sendo enganado!',
10, 2
FROM chapters c WHERE c.age_group = '7-9' AND c.chapter_number = 4;

-- MISSÃO 3 — Verdadeiro/Falso — Fácil
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 3, 'Troco errado?', 'true_false',
'{
  "question": "Se o vendedor te deu troco errado (menos do que deveria), não adianta reclamar — você deve aceitar assim mesmo."
}'::jsonb,
'{"correct": false}'::jsonb,
'Falso! ✋ Você tem todo o direito de pedir o troco correto! Diga educadamente: "Com licença, acho que o troco está errado. Paguei R$ X e o produto custa R$ Y." Ser educado e correto andam juntos!',
10, 3
FROM chapters c WHERE c.age_group = '7-9' AND c.chapter_number = 4;

-- MISSÃO 4 — Numeric Input — Médio
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 4, 'Compra de dois itens', 'numeric_input',
'{
  "question": "Você comprou um suco de R$ 3,50 e uma bala de R$ 1,50. Pagou com R$ 10,00. Qual o troco?",
  "placeholder": "R$",
  "unit": "reais"
}'::jsonb,
'{"correct": 5, "tolerance": 0}'::jsonb,
'Muito bem! 🧮 3,50 + 1,50 = R$ 5,00 gastos. 10 - 5 = R$ 5,00 de troco. Quando compra mais de um item, some todos antes de calcular o troco. Prática faz a perfeição!',
10, 4
FROM chapters c WHERE c.age_group = '7-9' AND c.chapter_number = 4;

-- MISSÃO 5 — Quiz — Médio
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 5, 'Qual nota usar?', 'quiz',
'{
  "question": "Um produto custa R$ 13,00. Qual combinação de notas você pode usar para pagar exato?",
  "options": [
    {"id": "a", "text": "💵 Uma nota de R$ 10 + uma nota de R$ 5"},
    {"id": "b", "text": "💵 Uma nota de R$ 10 + três moedas de R$ 1"},
    {"id": "c", "text": "💵 Duas notas de R$ 5 + três moedas de R$ 1"},
    {"id": "d", "text": "💵 Qualquer das opções B ou C"}
  ]
}'::jsonb,
'{"correct": "d"}'::jsonb,
'Ótimo raciocínio! 🧠 Tanto B quanto C somam R$ 13! 10+1+1+1 = 13 e 5+5+1+1+1 = 13. Existem várias formas de pagar o mesmo valor. Quanto mais você pratica, mais rápido fica!',
10, 5
FROM chapters c WHERE c.age_group = '7-9' AND c.chapter_number = 4;

-- MISSÃO 6 — Numeric Input — Médio
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 6, 'Troco com centavos', 'numeric_input',
'{
  "question": "Um lanche custa R$ 6,50. Você paga com R$ 10,00. Qual o troco?",
  "placeholder": "R$",
  "unit": "reais"
}'::jsonb,
'{"correct": 3.50, "tolerance": 0.01}'::jsonb,
'Perfeito com centavos! 🎯 10 - 6,50 = R$ 3,50. Centavos parecem pequenos, mas somados fazem diferença! Prestar atenção nos centavos é sinal de quem cuida bem do próprio dinheiro.',
10, 6
FROM chapters c WHERE c.age_group = '7-9' AND c.chapter_number = 4;

-- MISSÃO 7 — Quiz — Difícil
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 7, 'Conferindo o troco', 'quiz',
'{
  "question": "Você comprou R$ 17,50 em produtos e pagou com uma nota de R$ 20,00. O caixa te deu duas moedas de R$ 1,00. O troco está certo?",
  "options": [
    {"id": "a", "text": "✅ Sim, está correto"},
    {"id": "b", "text": "❌ Não, faltou R$ 0,50"},
    {"id": "c", "text": "❌ Não, faltou R$ 1,50"},
    {"id": "d", "text": "❌ Não, sobrou dinheiro"}
  ]
}'::jsonb,
'{"correct": "b"}'::jsonb,
'Muito observador! 🔍 20 - 17,50 = R$ 2,50 de troco correto. O caixa deu apenas R$ 2,00 (duas moedas de R$1). Faltaram R$ 0,50! Sempre calcule o troco esperado antes de receber. Erros acontecem!',
10, 7
FROM chapters c WHERE c.age_group = '7-9' AND c.chapter_number = 4;

-- MISSÃO 8 — Numeric Input — Difícil
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 8, 'Compras múltiplas', 'numeric_input',
'{
  "question": "Você comprou 3 balas de R$ 0,50 cada e 2 chicletes de R$ 1,00 cada. Pagou com R$ 5,00. Qual o troco?",
  "placeholder": "R$",
  "unit": "reais"
}'::jsonb,
'{"correct": 1.50, "tolerance": 0.01}'::jsonb,
'Excelente! 🌟 Balas: 3 × 0,50 = R$ 1,50. Chicletes: 2 × 1,00 = R$ 2,00. Total: 1,50 + 2,00 = R$ 3,50. Troco: 5 - 3,50 = R$ 1,50. Três etapas de cálculo — você mandou bem!',
10, 8
FROM chapters c WHERE c.age_group = '7-9' AND c.chapter_number = 4;

-- MISSÃO 9 — Verdadeiro/Falso — Difícil
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 9, 'Calcular de cabeça', 'true_false',
'{
  "question": "Saber calcular troco mentalmente (sem calculadora) é uma habilidade inútil porque sempre podemos usar o celular."
}'::jsonb,
'{"correct": false}'::jsonb,
'Falso! 🧠 Calcular de cabeça é uma habilidade valiosa! Seu celular pode estar sem bateria, sem sinal ou simplesmente não estar à mão. Além disso, quem calcula bem mentalmente nunca é enganado em troco. Pratique sempre!',
10, 9
FROM chapters c WHERE c.age_group = '7-9' AND c.chapter_number = 4;

-- MISSÃO 10 — Quiz — BOSS 🏆
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 10, '🏆 Expert em troco!', 'quiz',
'{
  "question": "Carlos foi ao mercadinho com R$ 50,00. Comprou: arroz R$ 12,00, feijão R$ 8,50, pão R$ 4,00, suco R$ 6,50. Qual o troco?",
  "options": [
    {"id": "a", "text": "💰 R$ 19,00"},
    {"id": "b", "text": "💰 R$ 18,00"},
    {"id": "c", "text": "💰 R$ 21,00"},
    {"id": "d", "text": "💰 R$ 16,50"}
  ]
}'::jsonb,
'{"correct": "a"}'::jsonb,
'Mestre do troco! 🏆 12 + 8,50 + 4 + 6,50 = R$ 31,00 gastos. 50 - 31 = R$ 19,00 de troco. Quatro itens com centavos, e você acertou! Esse é o tipo de cálculo que você vai usar pelo resto da vida. Parabéns!',
10, 10
FROM chapters c WHERE c.age_group = '7-9' AND c.chapter_number = 4;

-- =====================================================
-- CAPÍTULO 5 — "Como Guardar Dinheiro?"
-- =====================================================

DELETE FROM missions WHERE chapter_id IN (
  SELECT id FROM chapters WHERE age_group = '7-9' AND chapter_number = 5
);

-- MISSÃO 1 — Quiz — Fácil
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 1, 'Por que guardar dinheiro?', 'quiz',
'{
  "question": "Por que é importante guardar dinheiro?",
  "options": [
    {"id": "a", "text": "💸 Para esquecer que tem dinheiro"},
    {"id": "b", "text": "🎯 Para realizar sonhos maiores e ter dinheiro em emergências"},
    {"id": "c", "text": "😴 Porque não tem nada para comprar"},
    {"id": "d", "text": "📺 Porque os adultos mandam"}
  ]
}'::jsonb,
'{"correct": "b"}'::jsonb,
'Exato! 🌟 Guardar dinheiro é construir o futuro! Com dinheiro guardado você realiza sonhos maiores (uma bicicleta, uma viagem) e fica tranquilo se acontecer algo inesperado. É liberdade!',
10, 1
FROM chapters c WHERE c.age_group = '7-9' AND c.chapter_number = 5;

-- MISSÃO 2 — Verdadeiro/Falso — Fácil
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 2, 'Cofrinho funciona?', 'true_false',
'{
  "question": "Um cofrinho é um bom lugar para uma criança começar a guardar dinheiro."
}'::jsonb,
'{"correct": true}'::jsonb,
'Verdadeiro! 🐷 O cofrinho é perfeito para começar! Ele torna o hábito de poupar visível e divertido. Ver o dinheiro crescendo motiva você a guardar mais. Todo grande poupador começou com um cofrinho!',
10, 2
FROM chapters c WHERE c.age_group = '7-9' AND c.chapter_number = 5;

-- MISSÃO 3 — Quiz — Fácil
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 3, 'Quanto guardar?', 'quiz',
'{
  "question": "Uma boa regra para guardar dinheiro é separar pelo menos ___ parte do que você recebe.",
  "options": [
    {"id": "a", "text": "🔟 Uma pequena parte (pelo menos 10%)"},
    {"id": "b", "text": "💯 Tudo, sem gastar nada"},
    {"id": "c", "text": "🚫 Nada, dinheiro é para gastar"},
    {"id": "d", "text": "😐 Depende do humor do dia"}
  ]
}'::jsonb,
'{"correct": "a"}'::jsonb,
'Isso aí! ✨ Uma regra famosa: guarde pelo menos 10% do que receber. Se recebe R$ 10, guarda R$ 1. Parece pouco, mas o hábito de guardar sempre é o que importa. Com o tempo, você vai querer guardar cada vez mais!',
10, 3
FROM chapters c WHERE c.age_group = '7-9' AND c.chapter_number = 5;

-- MISSÃO 4 — Numeric Input — Médio
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 4, 'Guardando toda semana', 'numeric_input',
'{
  "question": "Você guarda R$ 3,00 por semana no cofrinho. Em 10 semanas, quanto terá guardado?",
  "placeholder": "R$",
  "unit": "reais"
}'::jsonb,
'{"correct": 30, "tolerance": 0}'::jsonb,
'Ótimo! 🐷 3 × 10 = R$ 30,00! Consistência é a chave. Mesmo valores pequenos, guardados regularmente, viram quantias significativas. Em 1 ano (52 semanas), seria R$ 156!',
10, 4
FROM chapters c WHERE c.age_group = '7-9' AND c.chapter_number = 5;

-- MISSÃO 5 — Quiz — Médio
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 5, 'Objetivo de poupança', 'quiz',
'{
  "question": "Ana quer comprar um livro de R$ 24,00. Ela guarda R$ 6,00 por semana. Em quantas semanas ela consegue?",
  "options": [
    {"id": "a", "text": "🗓️ 2 semanas"},
    {"id": "b", "text": "🗓️ 4 semanas"},
    {"id": "c", "text": "🗓️ 6 semanas"},
    {"id": "d", "text": "🗓️ 3 semanas"}
  ]
}'::jsonb,
'{"correct": "b"}'::jsonb,
'Calculou bem! 📅 24 ÷ 6 = 4 semanas. Definir um objetivo e calcular quanto tempo leva é uma habilidade poderosa. Ana sabe exatamente quando vai realizar seu sonho. E você?',
10, 5
FROM chapters c WHERE c.age_group = '7-9' AND c.chapter_number = 5;

-- MISSÃO 6 — Verdadeiro/Falso — Médio
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 6, 'Poupança no banco', 'true_false',
'{
  "question": "Guardar dinheiro no banco é mais seguro do que guardar em casa, pois o banco cuida do dinheiro e ainda pode fazer ele crescer."
}'::jsonb,
'{"correct": true}'::jsonb,
'Verdadeiro! 🏦 O banco guarda seu dinheiro com segurança e ainda paga juros — ou seja, seu dinheiro cresce um pouquinho todo mês. É muito melhor do que esconder embaixo do colchão, onde pode ser perdido ou roubado!',
10, 6
FROM chapters c WHERE c.age_group = '7-9' AND c.chapter_number = 5;

-- MISSÃO 7 — Numeric Input — Difícil
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 7, 'Quanto falta?', 'numeric_input',
'{
  "question": "Você quer uma bicicleta de R$ 120,00. Já guardou R$ 45,00. Quanto ainda falta guardar?",
  "placeholder": "R$",
  "unit": "reais"
}'::jsonb,
'{"correct": 75, "tolerance": 0}'::jsonb,
'Quase lá! 🚲 120 - 45 = R$ 75,00 ainda faltam. Mas veja: você já guardou R$ 45! Mais de um terço do caminho foi. Continue assim e logo a bicicleta será sua!',
10, 7
FROM chapters c WHERE c.age_group = '7-9' AND c.chapter_number = 5;

-- MISSÃO 8 — Quiz — Difícil
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 8, 'Emergência ou sonho?', 'quiz',
'{
  "question": "Carlos guardou R$ 50,00 para comprar um videogame. Seu amigo se machucou e precisa de ajuda para pagar o médico. Carlos deve:",
  "options": [
    {"id": "a", "text": "🎮 Manter o dinheiro para o videogame — é seu sonho"},
    {"id": "b", "text": "🤝 Ajudar o amigo — saúde é mais importante que brinquedo"},
    {"id": "c", "text": "😔 Fingir que não tem dinheiro"},
    {"id": "d", "text": "🤷 Não fazer nada e deixar o amigo resolver"}
  ]
}'::jsonb,
'{"correct": "b"}'::jsonb,
'Que coração generoso! 💚 Emergências de saúde são sempre prioridade. Videogame pode esperar, saúde não. Carlos pode guardar de novo para o videogame depois. Ajudar quem precisa é uma das coisas mais importantes que existem!',
10, 8
FROM chapters c WHERE c.age_group = '7-9' AND c.chapter_number = 5;

-- MISSÃO 9 — Verdadeiro/Falso — Difícil
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 9, 'Guardar é difícil?', 'true_false',
'{
  "question": "Guardar dinheiro fica mais fácil com o tempo, pois se torna um hábito automático."
}'::jsonb,
'{"correct": true}'::jsonb,
'Verdadeiro! 🧠 Hábitos são poderosos. No começo guardar parece difícil, mas depois de algumas semanas se torna automático — como escovar os dentes. Quem desenvolve o hábito de poupar cedo, nunca mais larga!',
10, 9
FROM chapters c WHERE c.age_group = '7-9' AND c.chapter_number = 5;

-- MISSÃO 10 — Quiz — BOSS 🏆
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 10, '🏆 Campeão da poupança!', 'quiz',
'{
  "question": "Julia recebe R$ 20,00 de mesada. Guarda 25% todo mês. Em 6 meses, quanto ela terá guardado?",
  "options": [
    {"id": "a", "text": "💰 R$ 25,00"},
    {"id": "b", "text": "💰 R$ 30,00"},
    {"id": "c", "text": "💰 R$ 20,00"},
    {"id": "d", "text": "💰 R$ 15,00"}
  ]
}'::jsonb,
'{"correct": "b"}'::jsonb,
'Mandou bem! 🏆 25% de R$ 20 = R$ 5 por mês. Em 6 meses: 5 × 6 = R$ 30,00! Julia guarda um quarto da mesada e em 6 meses tem R$ 30 guardados. Com esse dinheiro ela pode comprar algo maior ou continuar guardando para algo ainda melhor!',
10, 10
FROM chapters c WHERE c.age_group = '7-9' AND c.chapter_number = 5;

-- =====================================================
-- CAPÍTULO 6 — "Planejando Compras"
-- =====================================================

DELETE FROM missions WHERE chapter_id IN (
  SELECT id FROM chapters WHERE age_group = '7-9' AND chapter_number = 6
);

-- MISSÃO 1 — Quiz — Fácil
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 1, 'O que é planejamento?', 'quiz',
'{
  "question": "Planejar uma compra significa:",
  "options": [
    {"id": "a", "text": "🎲 Comprar sem pensar e ver o que acontece"},
    {"id": "b", "text": "📋 Pensar antes: o que vou comprar, quanto custa e se tenho dinheiro"},
    {"id": "c", "text": "📺 Comprar tudo que aparece na propaganda"},
    {"id": "d", "text": "😴 Esperar os pais comprarem"}
  ]
}'::jsonb,
'{"correct": "b"}'::jsonb,
'Isso mesmo! 📋 Planejar é pensar antes de agir. Quando você sabe o que quer, quanto custa e se tem o dinheiro, faz escolhas muito melhores. Planejar evita arrependimentos e garante que você compra o que realmente importa!',
10, 1
FROM chapters c WHERE c.age_group = '7-9' AND c.chapter_number = 6;

-- MISSÃO 2 — Verdadeiro/Falso — Fácil
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 2, 'Promoção é sempre vantagem?', 'true_false',
'{
  "question": "Toda promoção é uma boa oportunidade e você deve aproveitar todas que aparecerem."
}'::jsonb,
'{"correct": false}'::jsonb,
'Falso! 🤔 Promoção só é vantagem se você realmente precisava do produto! Comprar algo que não precisa mesmo com desconto é desperdiçar dinheiro. Antes de aproveitar uma promoção, pergunte: "Eu ia comprar isso de qualquer forma?"',
10, 2
FROM chapters c WHERE c.age_group = '7-9' AND c.chapter_number = 6;

-- MISSÃO 3 — Quiz — Fácil
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 3, 'Pesquisar preços', 'quiz',
'{
  "question": "Antes de comprar um produto caro, o que é mais inteligente fazer?",
  "options": [
    {"id": "a", "text": "🏃 Comprar na primeira loja que encontrar"},
    {"id": "b", "text": "🔍 Pesquisar o preço em pelo menos 2 ou 3 lugares diferentes"},
    {"id": "c", "text": "😤 Comprar o mais caro porque é sempre o melhor"},
    {"id": "d", "text": "📺 Comprar o que apareceu na propaganda"}
  ]
}'::jsonb,
'{"correct": "b"}'::jsonb,
'Muito esperto! 🔍 Pesquisar preços antes de comprar pode economizar bastante dinheiro. O mesmo produto pode custar muito diferente dependendo da loja. Essa pesquisa de 5 minutos pode valer muito!',
10, 3
FROM chapters c WHERE c.age_group = '7-9' AND c.chapter_number = 6;

-- MISSÃO 4 — Numeric Input — Médio
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 4, 'Desconto simples', 'numeric_input',
'{
  "question": "Um brinquedo custa R$ 40,00. Está com R$ 8,00 de desconto. Qual o preço com desconto?",
  "placeholder": "R$",
  "unit": "reais"
}'::jsonb,
'{"correct": 32, "tolerance": 0}'::jsonb,
'Certo! 🏷️ 40 - 8 = R$ 32,00. Descontos são subtrações! Sempre calcule o preço final com desconto antes de decidir se a compra vale a pena. R$ 8 de economia já ajuda bastante!',
10, 4
FROM chapters c WHERE c.age_group = '7-9' AND c.chapter_number = 6;

-- MISSÃO 5 — Quiz — Médio
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 5, 'Melhor negócio', 'quiz',
'{
  "question": "Loja A vende o mesmo caderno por R$ 6,00. Loja B vende por R$ 8,00 mas dá um lápis de brinde. Qual é melhor?",
  "options": [
    {"id": "a", "text": "📓 Loja A — mais barato"},
    {"id": "b", "text": "📓 Loja B — tem brinde"},
    {"id": "c", "text": "🤔 Depende se você precisa do lápis ou não"},
    {"id": "d", "text": "😐 São iguais"}
  ]
}'::jsonb,
'{"correct": "c"}'::jsonb,
'Pensamento crítico! 🧠 Se você precisa de lápis, a Loja B pode valer mais. Se você já tem lápis, a Loja A é melhor. Sempre avalie se o "brinde" ou extra realmente tem valor para você antes de pagar mais!',
10, 5
FROM chapters c WHERE c.age_group = '7-9' AND c.chapter_number = 6;

-- MISSÃO 6 — Verdadeiro/Falso — Médio
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 6, 'Esperar para comprar', 'true_false',
'{
  "question": "Às vezes, esperar alguns dias antes de comprar algo pode fazer você perceber que não precisava tanto assim."
}'::jsonb,
'{"correct": true}'::jsonb,
'Verdadeiro! ⏳ Isso se chama "período de reflexão". Muitas vezes a vontade de comprar passa com o tempo — especialmente em compras por impulso. Se depois de 3 dias você ainda quiser muito, aí a compra provavelmente é mais consciente!',
10, 6
FROM chapters c WHERE c.age_group = '7-9' AND c.chapter_number = 6;

-- MISSÃO 7 — Numeric Input — Difícil
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 7, 'Economizou quanto?', 'numeric_input',
'{
  "question": "Um tênis custava R$ 60,00. Na promoção está por R$ 45,00. Quanto você economizou?",
  "placeholder": "R$",
  "unit": "reais"
}'::jsonb,
'{"correct": 15, "tolerance": 0}'::jsonb,
'Ótimo! 💰 60 - 45 = R$ 15,00 de economia! Mas lembre: essa economia só é real se você ia comprar o tênis de qualquer forma. Se comprou só por causa da promoção, gastou R$ 45 que não estavam planejados!',
10, 7
FROM chapters c WHERE c.age_group = '7-9' AND c.chapter_number = 6;

-- MISSÃO 8 — Quiz — Difícil
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 8, 'Armadilha da propaganda', 'quiz',
'{
  "question": "Uma propaganda diz: IMPERDÍVEL! Só hoje! Última chance! Isso é para fazer você:",
  "options": [
    {"id": "a", "text": "🧠 Pensar com cuidado antes de comprar"},
    {"id": "b", "text": "⚡ Comprar rapidamente sem pensar muito, com medo de perder"},
    {"id": "c", "text": "🚫 Nunca comprar nada que aparece em propaganda"},
    {"id": "d", "text": "📞 Ligar para a empresa para saber mais"}
  ]
}'::jsonb,
'{"correct": "b"}'::jsonb,
'Muito perspicaz! 🚨 Frases como "só hoje" e "última chance" criam urgência artificial para fazer você comprar por impulso. Na maioria das vezes, a promoção continua ou volta. Não deixe o marketing controlar suas decisões!',
10, 8
FROM chapters c WHERE c.age_group = '7-9' AND c.chapter_number = 6;

-- MISSÃO 9 — Verdadeiro/Falso — Difícil
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 9, 'Lista de compras ajuda?', 'true_false',
'{
  "question": "Fazer uma lista de compras antes de ir ao mercado ajuda a gastar menos e não esquecer o que realmente precisa."
}'::jsonb,
'{"correct": true}'::jsonb,
'Verdadeiro! 📝 Pesquisas mostram que quem vai ao mercado com lista gasta em média 30% menos do que quem vai sem lista. A lista foca você no que é necessário e evita aquelas comprinhas extras que aparecem pelo caminho!',
10, 9
FROM chapters c WHERE c.age_group = '7-9' AND c.chapter_number = 6;

-- MISSÃO 10 — Quiz — BOSS 🏆
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 10, '🏆 Planejador expert!', 'quiz',
'{
  "question": "Tiago tem R$ 30,00. Precisa: caderno R$ 8, caneta R$ 3. Quer: jogo R$ 25. Ele encontrou o jogo por R$ 20 numa promoção. Deve comprar?",
  "options": [
    {"id": "a", "text": "✅ Sim, pois tem dinheiro para tudo: 8+3+20=31 — espera, não tem!"},
    {"id": "b", "text": "❌ Não, pois 8+3+20=R$31 e ele só tem R$30 — falta R$1"},
    {"id": "c", "text": "✅ Sim, comprar só o jogo e esquecer o caderno"},
    {"id": "d", "text": "🤷 Não dá para saber"}
  ]
}'::jsonb,
'{"correct": "b"}'::jsonb,
'Que atenção aos detalhes! 🏆 8 + 3 + 20 = R$ 31. Tiago só tem R$ 30 — falta R$ 1! Ele deve comprar o necessário (caderno + caneta = R$ 11) e guardar R$ 19. Com mais R$ 1 guardado, na próxima semana compra o jogo em promoção ou espera juntar mais. Planejar evita exatamente esse tipo de problema!',
10, 10
FROM chapters c WHERE c.age_group = '7-9' AND c.chapter_number = 6;

-- =====================================================
-- CAPÍTULO 7 — "Dinheiro e Família"
-- =====================================================

DELETE FROM missions WHERE chapter_id IN (
  SELECT id FROM chapters WHERE age_group = '7-9' AND chapter_number = 7
);

-- MISSÃO 1 — Quiz — Fácil
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 1, 'De onde vem o dinheiro da família?', 'quiz',
'{
  "question": "De onde vem o dinheiro que sua família usa para pagar as contas da casa?",
  "options": [
    {"id": "a", "text": "🏦 O banco dá de graça"},
    {"id": "b", "text": "💼 Do trabalho dos pais e responsáveis"},
    {"id": "c", "text": "🌳 De árvores do quintal"},
    {"id": "d", "text": "🎁 De presentes do governo"}
  ]
}'::jsonb,
'{"correct": "b"}'::jsonb,
'Exato! 💪 O dinheiro da família vem do trabalho. Seus pais ou responsáveis trabalham todos os dias para pagar aluguel, comida, escola e tudo mais. Por isso valorizar e não desperdiçar é uma forma de respeitar esse esforço!',
10, 1
FROM chapters c WHERE c.age_group = '7-9' AND c.chapter_number = 7;

-- MISSÃO 2 — Verdadeiro/Falso — Fácil
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 2, 'Contas da casa', 'true_false',
'{
  "question": "Uma família precisa pagar várias contas todo mês, como aluguel, luz, água e alimentação."
}'::jsonb,
'{"correct": true}'::jsonb,
'Verdadeiro! 🏠 Toda família tem despesas fixas mensais. Conhecer essas contas ajuda você a entender por que seus pais às vezes não podem comprar tudo que você pede. É questão de prioridade e planejamento familiar!',
10, 2
FROM chapters c WHERE c.age_group = '7-9' AND c.chapter_number = 7;

-- MISSÃO 3 — Quiz — Fácil
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 3, 'Como ajudar em casa?', 'quiz',
'{
  "question": "Como uma criança pode ajudar a família a economizar dinheiro?",
  "options": [
    {"id": "a", "text": "💡 Apagando as luzes ao sair do quarto e não desperdiçando água"},
    {"id": "b", "text": "📺 Deixando a TV ligada para a casa não ficar quieta"},
    {"id": "c", "text": "🍎 Pedindo mais comida do que vai comer"},
    {"id": "d", "text": "🛁 Tomando banhos muito longos"}
  ]
}'::jsonb,
'{"correct": "a"}'::jsonb,
'Muito bem! 💡 Pequenas atitudes fazem diferença real na conta de luz e água. Apagar luzes, fechar torneira ao escovar dentes, desligar aparelhos — tudo isso economiza dinheiro para a família usar em coisas mais importantes!',
10, 3
FROM chapters c WHERE c.age_group = '7-9' AND c.chapter_number = 7;

-- MISSÃO 4 — Numeric Input — Médio
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 4, 'Conta de luz', 'numeric_input',
'{
  "question": "A família gasta R$ 80,00 por mês em luz. Com economia, reduziram para R$ 65,00. Quanto economizaram em 3 meses?",
  "placeholder": "R$",
  "unit": "reais"
}'::jsonb,
'{"correct": 45, "tolerance": 0}'::jsonb,
'Muito bem! 💡 Economia por mês: 80 - 65 = R$ 15. Em 3 meses: 15 × 3 = R$ 45,00! Pequenas economias mensais somam bastante. Esse dinheiro pode ir para um passeio em família ou uma reserva para emergências!',
10, 4
FROM chapters c WHERE c.age_group = '7-9' AND c.chapter_number = 7;

-- MISSÃO 5 — Quiz — Médio
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 5, 'Despesas da família', 'quiz',
'{
  "question": "Qual dessas NÃO é uma despesa comum de uma família?",
  "options": [
    {"id": "a", "text": "🏠 Aluguel ou financiamento da casa"},
    {"id": "b", "text": "🌈 Comprar arco-íris no mercado"},
    {"id": "c", "text": "🛒 Alimentação"},
    {"id": "d", "text": "📚 Material escolar"}
  ]
}'::jsonb,
'{"correct": "b"}'::jsonb,
'Haha! 🌈 Arco-íris não se compra! As despesas reais da família incluem moradia, comida, escola, saúde, transporte e muito mais. Entender essas despesas ajuda você a ter mais empatia com as decisões financeiras da sua família!',
10, 5
FROM chapters c WHERE c.age_group = '7-9' AND c.chapter_number = 7;

-- MISSÃO 6 — Verdadeiro/Falso — Médio
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 6, 'Conversar sobre dinheiro', 'true_false',
'{
  "question": "Conversar sobre dinheiro em família é algo ruim e constrangedor que deve ser evitado."
}'::jsonb,
'{"correct": false}'::jsonb,
'Falso! 💬 Famílias que conversam sobre dinheiro tomam melhores decisões financeiras juntas. Entender de onde vem o dinheiro, para onde vai e como pode ser melhor usado é saudável e importante. Não tenha vergonha de perguntar!',
10, 6
FROM chapters c WHERE c.age_group = '7-9' AND c.chapter_number = 7;

-- MISSÃO 7 — Quiz — Difícil
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 7, 'Renda e gastos', 'quiz',
'{
  "question": "Uma família ganha R$ 3.000 por mês e gasta R$ 2.800. O que sobra para poupança?",
  "options": [
    {"id": "a", "text": "💰 R$ 200,00"},
    {"id": "b", "text": "💰 R$ 300,00"},
    {"id": "c", "text": "💰 R$ 100,00"},
    {"id": "d", "text": "😢 Não sobra nada"}
  ]
}'::jsonb,
'{"correct": "a"}'::jsonb,
'Correto! 💰 3.000 - 2.800 = R$ 200,00 por mês disponíveis. Parece pouco, mas em 1 ano são R$ 2.400! Famílias que guardam mesmo que pouco constroem uma reserva importante ao longo do tempo.',
10, 7
FROM chapters c WHERE c.age_group = '7-9' AND c.chapter_number = 7;

-- MISSÃO 8 — Numeric Input — Difícil
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 8, 'Dividindo as despesas', 'numeric_input',
'{
  "question": "A conta de água da família é R$ 60,00 por mês. Dividindo entre 4 pessoas da família, qual a parte de cada um?",
  "placeholder": "R$",
  "unit": "reais"
}'::jsonb,
'{"correct": 15, "tolerance": 0}'::jsonb,
'Legal pensar assim! 💧 60 ÷ 4 = R$ 15,00 por pessoa. Quando cada um entende sua parte nas despesas, fica mais fácil economizar juntos. Se cada um economizar um pouquinho de água, a conta toda cai!',
10, 8
FROM chapters c WHERE c.age_group = '7-9' AND c.chapter_number = 7;

-- MISSÃO 9 — Verdadeiro/Falso — Difícil
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 9, 'Crianças e responsabilidade', 'true_false',
'{
  "question": "Crianças também têm responsabilidade financeira em casa, como não desperdiçar comida, água e energia."
}'::jsonb,
'{"correct": true}'::jsonb,
'Verdadeiro! 🌱 Responsabilidade começa cedo! Não desperdiçar comida, tomar banho rápido, cuidar dos seus pertences — são formas concretas de contribuir financeiramente com a família. Cada atitude conta!',
10, 9
FROM chapters c WHERE c.age_group = '7-9' AND c.chapter_number = 7;

-- MISSÃO 10 — Quiz — BOSS 🏆
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 10, '🏆 Guardião da família!', 'quiz',
'{
  "question": "A família ganha R$ 2.500/mês. Despesas: aluguel R$ 800, comida R$ 600, escola R$ 300, luz/água R$ 150, outros R$ 350. Quanto sobra para poupança?",
  "options": [
    {"id": "a", "text": "💰 R$ 200,00"},
    {"id": "b", "text": "💰 R$ 300,00"},
    {"id": "c", "text": "💰 R$ 400,00"},
    {"id": "d", "text": "💰 R$ 500,00"}
  ]
}'::jsonb,
'{"correct": "b"}'::jsonb,
'Calculou tudo! 🏆 Despesas: 800+600+300+150+350 = R$ 2.200. Sobra: 2.500 - 2.200 = R$ 300,00. Com esse planejamento você enxerga o orçamento familiar inteiro. Esse é o tipo de cálculo que os pais fazem todo mês. Agora você entende por que às vezes não dá para comprar tudo!',
10, 10
FROM chapters c WHERE c.age_group = '7-9' AND c.chapter_number = 7;

-- =====================================================
-- CAPÍTULO 8 — "Cuidando do Dinheiro"
-- =====================================================

DELETE FROM missions WHERE chapter_id IN (
  SELECT id FROM chapters WHERE age_group = '7-9' AND chapter_number = 8
);

-- MISSÃO 1 — Quiz — Fácil
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 1, 'Como cuidar do dinheiro?', 'quiz',
'{
  "question": "Qual é a melhor forma de guardar suas moedas e notas?",
  "options": [
    {"id": "a", "text": "👖 No bolso do short sem zíper"},
    {"id": "b", "text": "🌧️ Numa caixinha do lado de fora da casa"},
    {"id": "c", "text": "👛 Numa carteira ou cofre em lugar seguro"},
    {"id": "d", "text": "🎒 Espalhado dentro da mochila escolar"}
  ]
}'::jsonb,
'{"correct": "c"}'::jsonb,
'Certo! 👛 Guardar dinheiro em lugar seguro (carteira, cofre, gaveta especial) evita perdas e roubos. Uma carteira também ajuda a saber exatamente quanto você tem a qualquer momento!',
10, 1
FROM chapters c WHERE c.age_group = '7-9' AND c.chapter_number = 8;

-- MISSÃO 2 — Verdadeiro/Falso — Fácil
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 2, 'Mostrar dinheiro na rua', 'true_false',
'{
  "question": "É seguro mostrar quanto dinheiro você tem para estranhos na rua."
}'::jsonb,
'{"correct": false}'::jsonb,
'Falso! ⚠️ Mostrar dinheiro em público pode atrair ladrões e situações perigosas. Sempre conte seu dinheiro em lugares privados e discretos. Segurança financeira começa com atitudes simples como essa!',
10, 2
FROM chapters c WHERE c.age_group = '7-9' AND c.chapter_number = 8;

-- MISSÃO 3 — Quiz — Fácil
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 3, 'Anotar os gastos', 'quiz',
'{
  "question": "Por que é útil anotar tudo que você gasta?",
  "options": [
    {"id": "a", "text": "📝 Para saber para onde o dinheiro foi e melhorar as decisões"},
    {"id": "b", "text": "😴 Para ter algo para fazer quando está entediado"},
    {"id": "c", "text": "📺 Para mostrar para os amigos"},
    {"id": "d", "text": "🗑️ Para jogar fora depois"}
  ]
}'::jsonb,
'{"correct": "a"}'::jsonb,
'Isso mesmo! 📊 Anotar gastos é como ter um mapa do seu dinheiro. Você descobre onde está gastando demais e pode ajustar. Muitos adultos ricos têm esse hábito desde crianças. Comece hoje!',
10, 3
FROM chapters c WHERE c.age_group = '7-9' AND c.chapter_number = 8;

-- MISSÃO 4 — Numeric Input — Médio
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 4, 'Controle dos gastos', 'numeric_input',
'{
  "question": "Na semana, você gastou: segunda R$ 3,00, quarta R$ 5,00, sexta R$ 2,50. Quanto gastou no total?",
  "placeholder": "R$",
  "unit": "reais"
}'::jsonb,
'{"correct": 10.50, "tolerance": 0.01}'::jsonb,
'Perfeito! 📋 3 + 5 + 2,50 = R$ 10,50 na semana. Quando você anota os gastos assim, pode ver claramente: "Gastei mais na quarta — o que comprei?" Esse controle te dá poder sobre o dinheiro!',
10, 4
FROM chapters c WHERE c.age_group = '7-9' AND c.chapter_number = 8;

-- MISSÃO 5 — Quiz — Médio
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 5, 'Perdi meu dinheiro!', 'quiz',
'{
  "question": "Você perdeu R$ 10,00 que estavam no bolso. O que aprender com isso?",
  "options": [
    {"id": "a", "text": "😢 Nunca mais ter dinheiro para não perder"},
    {"id": "b", "text": "💡 Guardar dinheiro em lugar mais seguro e ter mais cuidado"},
    {"id": "c", "text": "😤 Culpar os outros pela perda"},
    {"id": "d", "text": "🎲 Não fazer nada, isso acontece sempre"}
  ]
}'::jsonb,
'{"correct": "b"}'::jsonb,
'Boa lição! 💡 Perder dinheiro é frustrante, mas é uma oportunidade de aprender. O que fazer diferente da próxima vez? Uma carteira com bolso com zíper? Um cofrinho em casa para não sair com tudo? Erros ensinam quando você aprende com eles!',
10, 5
FROM chapters c WHERE c.age_group = '7-9' AND c.chapter_number = 8;

-- MISSÃO 6 — Verdadeiro/Falso — Médio
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 6, 'Emprestar dinheiro', 'true_false',
'{
  "question": "Emprestar dinheiro para amigos sempre termina bem e nunca cria problemas."
}'::jsonb,
'{"correct": false}'::jsonb,
'Falso! 🤝 Emprestar dinheiro para amigos pode criar situações desconfortáveis se a pessoa não devolver. Uma regra útil: só empreste o que você estaria disposto a dar de presente. Se você não pode perder, é melhor não emprestar!',
10, 6
FROM chapters c WHERE c.age_group = '7-9' AND c.chapter_number = 8;

-- MISSÃO 7 — Quiz — Difícil
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 7, 'Cuidar dos pertences', 'quiz',
'{
  "question": "Cuidar bem dos seus brinquedos e pertences tem relação com finanças porque:",
  "options": [
    {"id": "a", "text": "🧸 Não tem nenhuma relação com dinheiro"},
    {"id": "b", "text": "💰 Evita ter que gastar dinheiro comprando de novo o que quebrou por descuido"},
    {"id": "c", "text": "😤 Para não emprestar para amigos"},
    {"id": "d", "text": "📺 Para aparecer na televisão"}
  ]
}'::jsonb,
'{"correct": "b"}'::jsonb,
'Conexão perfeita! 💡 Cuidar dos seus pertences é uma decisão financeira! Um tênis que dura 2 anos economiza uma compra nova. Um celular com capinha dura mais. Cuidar = economizar. Simples assim!',
10, 7
FROM chapters c WHERE c.age_group = '7-9' AND c.chapter_number = 8;

-- MISSÃO 8 — Numeric Input — Difícil
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 8, 'Custo do descuido', 'numeric_input',
'{
  "question": "Você quebrou seu estojo por descuido e precisa comprar outro por R$ 15,00. Se tivesse cuidado, quantos sorvetes de R$ 3,00 poderia ter comprado com esse dinheiro?",
  "placeholder": "sorvetes",
  "unit": "sorvetes"
}'::jsonb,
'{"correct": 5, "tolerance": 0}'::jsonb,
'Que comparação inteligente! 🍦 15 ÷ 3 = 5 sorvetes! Cada vez que algo se quebra por descuido, você perde a oportunidade de usar esse dinheiro em outra coisa. Cuidar é economizar!',
10, 8
FROM chapters c WHERE c.age_group = '7-9' AND c.chapter_number = 8;

-- MISSÃO 9 — Verdadeiro/Falso — Difícil
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 9, 'Desperdício é prejuízo', 'true_false',
'{
  "question": "Desperdiçar comida, água ou energia em casa não tem impacto financeiro para a família."
}'::jsonb,
'{"correct": false}'::jsonb,
'Falso! 💸 Todo desperdício vira dinheiro perdido! Comida jogada fora = dinheiro no lixo. Torneira aberta sem necessidade = conta de água maior. Luz acesa sem ninguém = conta de energia maior. Cada recurso desperdiçado custou dinheiro para alguém!',
10, 9
FROM chapters c WHERE c.age_group = '7-9' AND c.chapter_number = 8;

-- MISSÃO 10 — Quiz — BOSS 🏆
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 10, '🏆 Guardião do dinheiro!', 'quiz',
'{
  "question": "Lucas tem R$ 40,00. Perdeu R$ 5 no bolso furado. Emprestou R$ 8 para o amigo (que nunca devolveu). Gastou R$ 12 em lanches. Quanto sobrou?",
  "options": [
    {"id": "a", "text": "💰 R$ 20,00"},
    {"id": "b", "text": "💰 R$ 15,00"},
    {"id": "c", "text": "💰 R$ 25,00"},
    {"id": "d", "text": "💰 R$ 10,00"}
  ]
}'::jsonb,
'{"correct": "b"}'::jsonb,
'Calculou tudo! 🏆 40 - 5 (perdeu) - 8 (emprestou) - 12 (gastou) = R$ 15,00. De R$ 40 sobraram apenas R$ 15! O bolso furado, o empréstimo que não voltou e os lanches não planejados custaram R$ 25. Cada uma dessas situações poderia ter sido evitada com mais cuidado!',
10, 10
FROM chapters c WHERE c.age_group = '7-9' AND c.chapter_number = 8;

-- =====================================================
-- CAPÍTULO 9 — "Meus Primeiros Objetivos"
-- =====================================================

DELETE FROM missions WHERE chapter_id IN (
  SELECT id FROM chapters WHERE age_group = '7-9' AND chapter_number = 9
);

-- MISSÃO 1 — Quiz — Fácil
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 1, 'O que é um objetivo?', 'quiz',
'{
  "question": "Um objetivo financeiro é:",
  "options": [
    {"id": "a", "text": "🎯 Uma meta com valor e prazo definidos para conquistar algo"},
    {"id": "b", "text": "😴 Sonhar acordado com coisas que quer"},
    {"id": "c", "text": "📺 Uma lista de compras"},
    {"id": "d", "text": "🎲 Uma aposta sobre o futuro"}
  ]
}'::jsonb,
'{"correct": "a"}'::jsonb,
'Perfeito! 🎯 Objetivo é diferente de sonho. Sonho: "quero uma bicicleta". Objetivo: "vou guardar R$ 15 por semana durante 8 semanas para comprar a bicicleta de R$ 120". Com prazo e valor definidos, sonho vira realidade!',
10, 1
FROM chapters c WHERE c.age_group = '7-9' AND c.chapter_number = 9;

-- MISSÃO 2 — Verdadeiro/Falso — Fácil
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 2, 'Qualquer objetivo é válido?', 'true_false',
'{
  "question": "Não existe objetivo financeiro pequeno demais. Guardar para comprar um sorvete favorito também é um objetivo válido."
}'::jsonb,
'{"correct": true}'::jsonb,
'Verdadeiro! 🍦 Todo objetivo é válido! O importante é o hábito de definir o que quer, calcular quanto custa e guardar para isso. Começar com objetivos pequenos treina você para os grandes. Roma não foi construída em um dia!',
10, 2
FROM chapters c WHERE c.age_group = '7-9' AND c.chapter_number = 9;

-- MISSÃO 3 — Quiz — Fácil
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 3, 'Objetivo com prazo', 'quiz',
'{
  "question": "Por que é importante colocar um prazo no objetivo (ex: comprar em 2 meses)?",
  "options": [
    {"id": "a", "text": "⏰ Para criar urgência e manter o foco em guardar"},
    {"id": "b", "text": "😴 Para esquecer mais rápido"},
    {"id": "c", "text": "📝 Para ter algo para escrever no caderno"},
    {"id": "d", "text": "🤷 Não faz diferença ter prazo ou não"}
  ]
}'::jsonb,
'{"correct": "a"}'::jsonb,
'Isso mesmo! ⏰ Prazo cria foco! "Quero guardar R$ 80 em 4 semanas" é muito mais motivador que "algum dia vou guardar R$ 80". O prazo te lembra toda semana quanto falta e mantém você no caminho!',
10, 3
FROM chapters c WHERE c.age_group = '7-9' AND c.chapter_number = 9;

-- MISSÃO 4 — Numeric Input — Médio
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 4, 'Calculando o prazo', 'numeric_input',
'{
  "question": "Você quer um jogo de R$ 60,00. Guarda R$ 12,00 por semana. Em quantas semanas consegue?",
  "placeholder": "semanas",
  "unit": "semanas"
}'::jsonb,
'{"correct": 5, "tolerance": 0}'::jsonb,
'Ótimo planejamento! 📅 60 ÷ 12 = 5 semanas. Você já sabe exatamente quando vai atingir seu objetivo! Esse cálculo simples transforma um sonho em um plano real. Em 5 semanas o jogo será seu!',
10, 4
FROM chapters c WHERE c.age_group = '7-9' AND c.chapter_number = 9;

-- MISSÃO 5 — Quiz — Médio
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 5, 'Priorizar objetivos', 'quiz',
'{
  "question": "Você tem 3 objetivos: bicicleta R$ 200, livro R$ 20, passeio no parque R$ 15. Com R$ 10 por semana, qual faz mais sentido focar primeiro?",
  "options": [
    {"id": "a", "text": "🚲 Bicicleta — é o mais legal"},
    {"id": "b", "text": "📚 Livro + passeio — são menores e você os realiza mais rápido, ganhando motivação"},
    {"id": "c", "text": "🎯 Os três ao mesmo tempo"},
    {"id": "d", "text": "😴 Nenhum, é muita coisa"}
  ]
}'::jsonb,
'{"correct": "b"}'::jsonb,
'Estratégia inteligente! 🧠 Realizar objetivos menores primeiro dá motivação para continuar. Com R$ 10/semana: livro em 2 semanas, passeio na semana seguinte — e você já realizou 2 objetivos! Aí foca na bicicleta com gás total!',
10, 5
FROM chapters c WHERE c.age_group = '7-9' AND c.chapter_number = 9;

-- MISSÃO 6 — Verdadeiro/Falso — Médio
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 6, 'Objetivo pode mudar?', 'true_false',
'{
  "question": "Se você estiver guardando para um objetivo e mudar de ideia, pode trocar o objetivo sem problemas."
}'::jsonb,
'{"correct": true}'::jsonb,
'Verdadeiro! 🔄 Objetivos podem mudar — você não está preso! O importante é não gastar o dinheiro guardado por impulso, mas sim redirecionar para algo que ainda faz sentido. O hábito de poupar é o que importa, não o objetivo específico!',
10, 6
FROM chapters c WHERE c.age_group = '7-9' AND c.chapter_number = 9;

-- MISSÃO 7 — Numeric Input — Difícil
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 7, 'Acelerou a poupança!', 'numeric_input',
'{
  "question": "Você guardava R$ 8/semana para um objetivo de R$ 96. Na semana 5, ganhou R$ 20 de presente e adicionou à poupança. Quantas semanas vai economizar?",
  "placeholder": "semanas",
  "unit": "semanas"
}'::jsonb,
'{"correct": 4, "tolerance": 0}'::jsonb,
'Incrível! 🚀 Sem o presente: 96 ÷ 8 = 12 semanas. Após 5 semanas: guardou 5 × 8 = R$ 40 + R$ 20 = R$ 60. Faltam: 96 - 60 = R$ 36. Semanas restantes: 36 ÷ 8 = 4,5 → 5 semanas. Total: 5 + 5 = 10 semanas (economizou 2!). Adicionar extras acelera muito os objetivos!',
10, 7
FROM chapters c WHERE c.age_group = '7-9' AND c.chapter_number = 9;

-- MISSÃO 8 — Quiz — Difícil
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 8, 'Dois objetivos ao mesmo tempo', 'quiz',
'{
  "question": "Pedro tem R$ 20 por semana para guardar. Quer uma bicicleta (R$ 120) e um livro (R$ 30). Como dividir para alcançar os dois?",
  "options": [
    {"id": "a", "text": "📚 R$ 15 para bicicleta e R$ 5 para livro — livro em 6 semanas, bike em 8"},
    {"id": "b", "text": "🚲 Tudo para a bicicleta (6 semanas), depois começa o livro (mais 1,5 semana)"},
    {"id": "c", "text": "📊 Qualquer divisão funciona, depende da prioridade de Pedro"},
    {"id": "d", "text": "😔 Não é possível ter dois objetivos ao mesmo tempo"}
  ]
}'::jsonb,
'{"correct": "c"}'::jsonb,
'Ótima reflexão! 🎯 Qualquer divisão pode funcionar! Se a bicicleta é mais urgente, foca tudo nela primeiro. Se quer o livro logo, divide. Não existe resposta única — existe a melhor escolha para as SUAS prioridades. Educação financeira é sobre consciência, não regras rígidas!',
10, 8
FROM chapters c WHERE c.age_group = '7-9' AND c.chapter_number = 9;

-- MISSÃO 9 — Verdadeiro/Falso — Difícil
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 9, 'Celebrar conquistas', 'true_false',
'{
  "question": "Quando você atinge um objetivo financeiro, vale a pena celebrar a conquista antes de definir o próximo objetivo."
}'::jsonb,
'{"correct": true}'::jsonb,
'Verdadeiro! 🎉 Celebrar é importante! Reconhecer que você se dedicou, guardou e conquistou algo reforça positivamente o hábito. Uma pequena celebração (não necessariamente cara!) motiva você a continuar para o próximo objetivo!',
10, 9
FROM chapters c WHERE c.age_group = '7-9' AND c.chapter_number = 9;

-- MISSÃO 10 — Quiz — BOSS 🏆
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 10, '🏆 Mestre dos objetivos!', 'quiz',
'{
  "question": "Julia (8 anos) quer: patins R$ 80 (sonho), livro R$ 15 (precisa para escola), presente para mãe R$ 20 (aniversário em 3 semanas). Tem R$ 10/semana. Qual o plano ideal?",
  "options": [
    {"id": "a", "text": "🎯 Semanas 1-2: guardar tudo para o livro (R$15 em 2sem) + presente (R$20 em mais 2sem). Depois foca nos patins"},
    {"id": "b", "text": "🎯 Focar só nos patins pois é o maior sonho"},
    {"id": "c", "text": "🎯 Guardar tudo junto sem prioridade"},
    {"id": "d", "text": "😔 Com só R$10/semana é impossível"}
  ]
}'::jsonb,
'{"correct": "a"}'::jsonb,
'Planejamento de mestre! 🏆 O plano A é o mais inteligente: 1) Prioriza o livro (necessidade escolar — urgente!) 2) Depois o presente da mãe (prazo fixo de 3 semanas — não pode atrasar!) 3) Por último os patins (sonho sem prazo urgente). Esse raciocínio de prioridade — necessidade > prazo fixo > sonho — é a base de todo planejamento financeiro inteligente. Você completou a jornada da faixa 7-9 anos! 🌟',
10, 10
FROM chapters c WHERE c.age_group = '7-9' AND c.chapter_number = 9;
