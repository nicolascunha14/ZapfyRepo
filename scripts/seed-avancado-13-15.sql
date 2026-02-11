-- =====================================================
-- SEED: Missões do Capítulo 1 — "Sistema Financeiro"
-- Faixa: 13-15 anos (Avançado)
-- =====================================================

-- Limpa missões antigas do capítulo 1 (13-15)
DELETE FROM missions WHERE chapter_id IN (
  SELECT id FROM chapters WHERE age_group = '13-15' AND chapter_number = 1
);

-- MISSÃO 1 — Quiz — Fácil
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 1, 'O que é o Banco Central?', 'quiz',
'{
  "question": "O Banco Central do Brasil tem como principal função:",
  "options": [
    {"id": "a", "text": "Emprestar dinheiro diretamente para pessoas físicas"},
    {"id": "b", "text": "Regular o sistema financeiro e controlar a inflação"},
    {"id": "c", "text": "Vender ações na bolsa de valores"},
    {"id": "d", "text": "Cobrar impostos dos cidadãos"}
  ]
}'::jsonb,
'{"correct": "b"}'::jsonb,
'O Banco Central (BACEN) é o "banco dos bancos". Ele define a taxa Selic, controla a inflação, regula os bancos comerciais e emite moeda. Entender seu papel é essencial para compreender a economia!',
10, 1
FROM chapters c WHERE c.age_group = '13-15' AND c.chapter_number = 1;

-- MISSÃO 2 — Matching — Fácil
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 2, 'Associa as instituições', 'matching',
'{
  "question": "Ligue cada instituição à sua função:",
  "left_items": [
    {"id": "1", "text": "Banco Central"},
    {"id": "2", "text": "Receita Federal"},
    {"id": "3", "text": "CVM"},
    {"id": "4", "text": "BACEN"},
    {"id": "5", "text": "B3"}
  ],
  "right_items": [
    {"id": "a", "text": "Controla inflação e regula o sistema financeiro"},
    {"id": "b", "text": "Arrecada impostos e fiscaliza contribuintes"},
    {"id": "c", "text": "Regula o mercado de capitais e protege investidores"},
    {"id": "d", "text": "Emite moeda e define a taxa Selic"},
    {"id": "e", "text": "Bolsa de valores onde ações são negociadas"}
  ]
}'::jsonb,
'{"correct": {"1": "a", "2": "b", "3": "c", "4": "d", "5": "e"}}'::jsonb,
'Cada instituição tem um papel específico no ecossistema financeiro brasileiro.',
10, 2
FROM chapters c WHERE c.age_group = '13-15' AND c.chapter_number = 1;

-- MISSÃO 3 — Quiz — Fácil
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 3, 'O que é inflação?', 'quiz',
'{
  "question": "Inflação de 5% ao ano significa que:",
  "options": [
    {"id": "a", "text": "Seu salário aumentou 5%"},
    {"id": "b", "text": "Os preços em geral subiram 5%, então seu dinheiro compra menos"},
    {"id": "c", "text": "O dólar subiu 5%"},
    {"id": "d", "text": "Os juros do banco aumentaram 5%"}
  ]
}'::jsonb,
'{"correct": "b"}'::jsonb,
'Inflação corrói o poder de compra do dinheiro. Se você guarda R$ 1.000 embaixo do colchão e a inflação é 5%, no ano seguinte aquele dinheiro compra o equivalente a R$ 950 de hoje. É por isso que investir é tão importante!',
10, 3
FROM chapters c WHERE c.age_group = '13-15' AND c.chapter_number = 1;

-- MISSÃO 4 — Drag & Drop — Médio
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 4, 'Selic e seu impacto', 'drag_drop',
'{
  "question": "A taxa Selic subiu de 10% para 13%. Arraste o impacto correto para cada situação:",
  "categories": ["Fica mais caro", "Fica mais barato/rentável"],
  "items": [
    {"id": "1", "text": "🏠 Financiamento imobiliário"},
    {"id": "2", "text": "💳 Crédito pessoal"},
    {"id": "3", "text": "🏦 Investimentos em renda fixa"},
    {"id": "4", "text": "🚗 Financiamento de carro"},
    {"id": "5", "text": "📄 Tesouro Selic"},
    {"id": "6", "text": "💸 Empréstimo bancário"}
  ]
}'::jsonb,
'{"correct": {"1": "Fica mais caro", "2": "Fica mais caro", "3": "Fica mais barato/rentável", "4": "Fica mais caro", "5": "Fica mais barato/rentável", "6": "Fica mais caro"}}'::jsonb,
'Quando a Selic sobe, crédito fica mais caro (desestimula consumo e controla inflação), mas renda fixa rende mais.',
10, 4
FROM chapters c WHERE c.age_group = '13-15' AND c.chapter_number = 1;

-- MISSÃO 5 — Numeric Input — Médio
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 5, 'Calcula a inflação', 'numeric_input',
'{
  "question": "Um produto custava R$ 200,00. Com inflação de 8% ao ano, quanto custará no ano seguinte?",
  "placeholder": "R$",
  "unit": "reais"
}'::jsonb,
'{"correct": 216, "tolerance": 0}'::jsonb,
'8% de 200 = R$ 16 de aumento. 200 + 16 = R$ 216,00.',
10, 5
FROM chapters c WHERE c.age_group = '13-15' AND c.chapter_number = 1;

-- MISSÃO 6 — Matching — Médio
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 6, 'Tipos de banco', 'matching',
'{
  "question": "Ligue cada tipo de banco ao seu perfil:",
  "left_items": [
    {"id": "1", "text": "Banco comercial"},
    {"id": "2", "text": "Banco de investimento"},
    {"id": "3", "text": "Banco digital"},
    {"id": "4", "text": "Cooperativa de crédito"},
    {"id": "5", "text": "Banco central"}
  ],
  "right_items": [
    {"id": "a", "text": "Oferece conta corrente, crédito e serviços do dia a dia"},
    {"id": "b", "text": "Foca em operações de mercado de capitais e grandes empresas"},
    {"id": "c", "text": "Opera 100% online, sem agências físicas"},
    {"id": "d", "text": "Pertence aos próprios clientes, que são \"donos\""},
    {"id": "e", "text": "Regula todo o sistema e não atende pessoas físicas"}
  ]
}'::jsonb,
'{"correct": {"1": "a", "2": "b", "3": "c", "4": "d", "5": "e"}}'::jsonb,
'O sistema bancário brasileiro é diversificado.',
10, 6
FROM chapters c WHERE c.age_group = '13-15' AND c.chapter_number = 1;

-- MISSÃO 7 — Quiz — Difícil
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 7, 'PIB e economia', 'quiz',
'{
  "question": "O PIB (Produto Interno Bruto) mede:",
  "options": [
    {"id": "a", "text": "A quantidade de dinheiro em circulação no país"},
    {"id": "b", "text": "O total de bens e serviços produzidos num país em determinado período"},
    {"id": "c", "text": "O valor das exportações do país"},
    {"id": "d", "text": "A renda média por pessoa no país"}
  ]
}'::jsonb,
'{"correct": "b"}'::jsonb,
'PIB é o principal indicador do tamanho de uma economia.',
10, 7
FROM chapters c WHERE c.age_group = '13-15' AND c.chapter_number = 1;

-- MISSÃO 8 — Drag & Drop (ordering) — Difícil
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 8, 'Ciclo econômico', 'drag_drop',
'{
  "question": "Ordene as fases do ciclo econômico da expansão à recessão:",
  "items": [
    {"id": "1", "text": "📈 Expansão — economia crescendo, emprego alto"},
    {"id": "2", "text": "🏔️ Pico — crescimento máximo, inflação começa a subir"},
    {"id": "3", "text": "📉 Contração — crescimento desacelera, desemprego cresce"},
    {"id": "4", "text": "🕳️ Recessão — dois trimestres seguidos de queda no PIB"},
    {"id": "5", "text": "🔄 Recuperação — economia começa a crescer novamente"}
  ]
}'::jsonb,
'{"correct_order": ["1", "2", "3", "4", "5"]}'::jsonb,
'Toda economia passa por esses ciclos.',
10, 8
FROM chapters c WHERE c.age_group = '13-15' AND c.chapter_number = 1;

-- MISSÃO 9 — Numeric Input — Difícil
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 9, 'Taxa de câmbio', 'numeric_input',
'{
  "question": "O dólar está a R$ 5,20. Você quer comprar um produto americano de US$ 80,00. Quanto vai custar em reais?",
  "placeholder": "R$",
  "unit": "reais"
}'::jsonb,
'{"correct": 416, "tolerance": 0}'::jsonb,
'80 × 5,20 = R$ 416,00.',
10, 9
FROM chapters c WHERE c.age_group = '13-15' AND c.chapter_number = 1;

-- MISSÃO 10 — Quiz — BOSS 🏆
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 10, '🏆 Boss: Sistema Financeiro', 'quiz',
'{
  "question": "A inflação está em 6% ao ano e a taxa Selic em 10,5% ao ano. Um investimento em Tesouro Selic rende 100% da Selic. Qual o ganho REAL (acima da inflação) desse investimento em 1 ano?",
  "options": [
    {"id": "a", "text": "10,5%"},
    {"id": "b", "text": "6%"},
    {"id": "c", "text": "Aproximadamente 4,5%"},
    {"id": "d", "text": "16,5%"}
  ]
}'::jsonb,
'{"correct": "c"}'::jsonb,
'🏆 Ganho real ≈ rendimento nominal - inflação = 10,5% - 6% = 4,5%.',
10, 10
FROM chapters c WHERE c.age_group = '13-15' AND c.chapter_number = 1;


-- =====================================================
-- SEED: Missões do Capítulo 2 — "Juros Simples e Compostos"
-- Faixa: 13-15 anos (Avançado)
-- =====================================================

-- Limpa missões antigas do capítulo 2 (13-15)
DELETE FROM missions WHERE chapter_id IN (
  SELECT id FROM chapters WHERE age_group = '13-15' AND chapter_number = 2
);

-- MISSÃO 1 — Quiz — Fácil
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 1, 'Juros simples: fórmula', 'quiz',
'{
  "question": "Na fórmula de juros simples J = P × i × t, o que representa \"i\"?",
  "options": [
    {"id": "a", "text": "O tempo do investimento"},
    {"id": "b", "text": "O capital inicial"},
    {"id": "c", "text": "A taxa de juros por período"},
    {"id": "d", "text": "O juros total"}
  ]
}'::jsonb,
'{"correct": "c"}'::jsonb,
'J = P × i × t. J = Juros, P = Principal (capital inicial), i = taxa de juros, t = tempo.',
10, 1
FROM chapters c WHERE c.age_group = '13-15' AND c.chapter_number = 2;

-- MISSÃO 2 — Numeric Input — Fácil
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 2, 'Calcula juros simples', 'numeric_input',
'{
  "question": "Você investe R$ 2.000,00 a juros simples de 3% ao mês por 4 meses. Qual o total de juros?",
  "placeholder": "R$",
  "unit": "reais"
}'::jsonb,
'{"correct": 240, "tolerance": 0}'::jsonb,
'J = 2.000 × 0,03 × 4 = R$ 240,00 de juros.',
10, 2
FROM chapters c WHERE c.age_group = '13-15' AND c.chapter_number = 2;

-- MISSÃO 3 — Quiz — Fácil
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 3, 'Juros compostos: a diferença', 'quiz',
'{
  "question": "O que diferencia os juros compostos dos juros simples?",
  "options": [
    {"id": "a", "text": "Juros compostos sempre rendem menos"},
    {"id": "b", "text": "Nos juros compostos, os juros se acumulam sobre o montante total (capital + juros anteriores)"},
    {"id": "c", "text": "Juros simples são usados em investimentos, compostos em dívidas"},
    {"id": "d", "text": "Não há diferença prática entre eles"}
  ]
}'::jsonb,
'{"correct": "b"}'::jsonb,
'Juros compostos = juros sobre juros.',
10, 3
FROM chapters c WHERE c.age_group = '13-15' AND c.chapter_number = 2;

-- MISSÃO 4 — Numeric Input — Médio
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 4, 'Calcula juros compostos', 'numeric_input',
'{
  "question": "Você investe R$ 1.000,00 a 10% ao ano de juros compostos. Qual o montante após 2 anos?",
  "placeholder": "R$",
  "unit": "reais"
}'::jsonb,
'{"correct": 1210, "tolerance": 0}'::jsonb,
'Ano 1: 1.000 × 1,10 = R$ 1.100. Ano 2: 1.100 × 1,10 = R$ 1.210.',
10, 4
FROM chapters c WHERE c.age_group = '13-15' AND c.chapter_number = 2;

-- MISSÃO 5 — Matching — Médio
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 5, 'Compara simples vs compostos', 'matching',
'{
  "question": "Ligue cada característica ao tipo de juros correto:",
  "left_items": [
    {"id": "1", "text": "Rendimento linear (cresce igual todo período)"},
    {"id": "2", "text": "Efeito bola de neve"},
    {"id": "3", "text": "Usado em cheque especial e cartão de crédito"},
    {"id": "4", "text": "J = P × i × t"},
    {"id": "5", "text": "M = P × (1+i)^t"},
    {"id": "6", "text": "Juros sempre sobre o capital inicial"}
  ],
  "right_items": [
    {"id": "a", "text": "Juros Simples"},
    {"id": "b", "text": "Juros Compostos"}
  ]
}'::jsonb,
'{"correct": {"1": "a", "2": "b", "3": "b", "4": "a", "5": "b", "6": "a"}}'::jsonb,
'Entender qual tipo está sendo aplicado em cada produto financeiro é fundamental.',
10, 5
FROM chapters c WHERE c.age_group = '13-15' AND c.chapter_number = 2;

-- MISSÃO 6 — Text Input — Médio
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 6, 'A regra dos 72', 'text_input',
'{
  "question": "Existe um atalho matemático que diz: divida 72 pela taxa de juros anual para saber em quantos anos seu dinheiro dobra. Se a taxa é 9% ao ano, em quantos anos seu dinheiro dobra?",
  "placeholder": "Digite sua resposta"
}'::jsonb,
'{"accepted": ["8", "oito"]}'::jsonb,
'72 ÷ 9 = 8 anos para dobrar o capital!',
10, 6
FROM chapters c WHERE c.age_group = '13-15' AND c.chapter_number = 2;

-- MISSÃO 7 — Numeric Input — Difícil
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 7, 'Dívida exponencial', 'numeric_input',
'{
  "question": "Você tem uma dívida de R$ 500,00 no cartão de crédito com juros compostos de 12% ao mês. Quanto você deve após 3 meses sem pagar?",
  "placeholder": "R$",
  "unit": "reais"
}'::jsonb,
'{"correct": 702.46, "tolerance": 1}'::jsonb,
'Mês 1: 500 × 1,12 = R$ 560. Mês 2: 560 × 1,12 = R$ 627,20. Mês 3: 627,20 × 1,12 = R$ 702,46.',
10, 7
FROM chapters c WHERE c.age_group = '13-15' AND c.chapter_number = 2;

-- MISSÃO 8 — Drag & Drop — Difícil
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 8, 'Classifica o impacto dos juros', 'drag_drop',
'{
  "question": "Classifique cada situação onde os juros compostos trabalham a seu FAVOR ou CONTRA você:",
  "categories": ["A seu favor 📈", "Contra você 📉"],
  "items": [
    {"id": "1", "text": "🏦 Investimento em CDB por 10 anos"},
    {"id": "2", "text": "💳 Fatura do cartão não paga"},
    {"id": "3", "text": "📈 Ações reinvestindo dividendos"},
    {"id": "4", "text": "🏠 Financiamento imobiliário de 30 anos"},
    {"id": "5", "text": "💰 Previdência privada por 20 anos"},
    {"id": "6", "text": "📱 Parcelamento com juros no cartão"}
  ]
}'::jsonb,
'{"correct": {"1": "A seu favor 📈", "2": "Contra você 📉", "3": "A seu favor 📈", "4": "Contra você 📉", "5": "A seu favor 📈", "6": "Contra você 📉"}}'::jsonb,
'Os juros compostos são neutros — são uma ferramenta.',
10, 8
FROM chapters c WHERE c.age_group = '13-15' AND c.chapter_number = 2;

-- MISSÃO 9 — Quiz — Difícil
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 9, 'Impacto do tempo', 'quiz',
'{
  "question": "Pedro investe R$ 5.000 a 8% ao ano por 30 anos (juros compostos). Qual o montante aproximado?",
  "options": [
    {"id": "a", "text": "R$ 17.000"},
    {"id": "b", "text": "R$ 29.000"},
    {"id": "c", "text": "R$ 50.000"},
    {"id": "d", "text": "R$ 120.000"}
  ]
}'::jsonb,
'{"correct": "c"}'::jsonb,
'M = 5.000 × (1,08)^30 ≈ 5.000 × 10,06 ≈ R$ 50.313.',
10, 9
FROM chapters c WHERE c.age_group = '13-15' AND c.chapter_number = 2;

-- MISSÃO 10 — Numeric Input — BOSS 🏆
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 10, '🏆 Boss: Juros Compostos', 'numeric_input',
'{
  "question": "Ana investe R$ 200/mês a partir dos 15 anos com 10% ao ano. João investe R$ 400/mês a partir dos 25 anos com 10% ao ano. Aos 35 anos, quem tem mais dinheiro? Calcule o total investido por cada um (sem juros).",
  "placeholder": "R$",
  "unit": "reais"
}'::jsonb,
'{"correct": 24000, "tolerance": 0}'::jsonb,
'🏆 Ana: 200 × 12 × 20 anos = R$ 48.000 investidos. João: 400 × 12 × 10 anos = R$ 48.000 investidos. Investiram o mesmo!',
10, 10
FROM chapters c WHERE c.age_group = '13-15' AND c.chapter_number = 2;


-- =====================================================
-- SEED: Missões do Capítulo 3 — "Tipos de Investimento"
-- Faixa: 13-15 anos (Avançado)
-- =====================================================

-- Limpa missões antigas do capítulo 3 (13-15)
DELETE FROM missions WHERE chapter_id IN (
  SELECT id FROM chapters WHERE age_group = '13-15' AND chapter_number = 3
);

-- MISSÃO 1 — Quiz — Fácil
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 1, 'Renda fixa vs variável', 'quiz',
'{
  "question": "Em renda fixa, o investidor:",
  "options": [
    {"id": "a", "text": "Não sabe quanto vai ganhar"},
    {"id": "b", "text": "Conhece previamente a taxa ou indexador do rendimento"},
    {"id": "c", "text": "Sempre ganha mais do que em renda variável"},
    {"id": "d", "text": "Não corre nenhum tipo de risco"}
  ]
}'::jsonb,
'{"correct": "b"}'::jsonb,
'Renda fixa = você sabe a regra do jogo antes.',
10, 1
FROM chapters c WHERE c.age_group = '13-15' AND c.chapter_number = 3;

-- MISSÃO 2 — Matching — Fácil
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 2, 'Associa investimentos', 'matching',
'{
  "question": "Ligue cada investimento à sua categoria:",
  "left_items": [
    {"id": "1", "text": "Tesouro Direto"},
    {"id": "2", "text": "Ações"},
    {"id": "3", "text": "CDB"},
    {"id": "4", "text": "FII (Fundo Imobiliário)"},
    {"id": "5", "text": "LCI/LCA"},
    {"id": "6", "text": "ETF"}
  ],
  "right_items": [
    {"id": "a", "text": "Renda fixa (empréstimo ao governo)"},
    {"id": "b", "text": "Renda variável (participação em empresas)"},
    {"id": "c", "text": "Renda fixa (empréstimo ao banco)"},
    {"id": "d", "text": "Renda variável (cotas de imóveis)"},
    {"id": "e", "text": "Renda fixa (isenta de IR para pessoa física)"},
    {"id": "f", "text": "Renda variável (fundo que replica um índice)"}
  ]
}'::jsonb,
'{"correct": {"1": "a", "2": "b", "3": "c", "4": "d", "5": "e", "6": "f"}}'::jsonb,
'Conhecer a categoria de cada investimento ajuda a montar uma carteira diversificada.',
10, 2
FROM chapters c WHERE c.age_group = '13-15' AND c.chapter_number = 3;

-- MISSÃO 3 — Text Input — Fácil
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 3, 'O que é CDI?', 'text_input',
'{
  "question": "O CDI é o principal índice de referência para investimentos de renda fixa no Brasil. A sigla significa Certificado de _______ Interbancário.",
  "placeholder": "Digite sua resposta"
}'::jsonb,
'{"accepted": ["Depósito", "deposito", "depósito", "Deposito"]}'::jsonb,
'CDI = Certificado de Depósito Interbancário.',
10, 3
FROM chapters c WHERE c.age_group = '13-15' AND c.chapter_number = 3;

-- MISSÃO 4 — Numeric Input — Médio
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 4, 'Calcula rendimento CDB', 'numeric_input',
'{
  "question": "Você investe R$ 5.000,00 num CDB que rende 110% do CDI. O CDI está em 12% ao ano. Qual o rendimento bruto em 1 ano?",
  "placeholder": "R$",
  "unit": "reais"
}'::jsonb,
'{"correct": 660, "tolerance": 0}'::jsonb,
'CDI efetivo para você: 12% × 110% = 13,2% ao ano. 13,2% de 5.000 = R$ 660,00.',
10, 4
FROM chapters c WHERE c.age_group = '13-15' AND c.chapter_number = 3;

-- MISSÃO 5 — Drag & Drop — Médio
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 5, 'Perfil de investidor', 'drag_drop',
'{
  "question": "Classifique cada investidor no perfil correto:",
  "categories": ["Conservador", "Moderado", "Arrojado"],
  "items": [
    {"id": "1", "text": "👴 Quer segurança total, aceita menor rendimento"},
    {"id": "2", "text": "📊 Aceita algum risco por rentabilidade maior"},
    {"id": "3", "text": "🚀 Aceita alta volatilidade buscando grandes ganhos"},
    {"id": "4", "text": "🏦 Investe só em poupança e Tesouro Selic"},
    {"id": "5", "text": "📈 Mistura renda fixa (60%) e ações (40%)"},
    {"id": "6", "text": "💹 Investe em small caps e criptomoedas"}
  ]
}'::jsonb,
'{"correct": {"1": "Conservador", "2": "Moderado", "3": "Arrojado", "4": "Conservador", "5": "Moderado", "6": "Arrojado"}}'::jsonb,
'Não existe perfil certo ou errado.',
10, 5
FROM chapters c WHERE c.age_group = '13-15' AND c.chapter_number = 3;

-- MISSÃO 6 — Matching — Médio
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 6, 'Imposto de Renda nos investimentos', 'matching',
'{
  "question": "Ligue o prazo de investimento à alíquota de IR:",
  "left_items": [
    {"id": "1", "text": "Até 180 dias"},
    {"id": "2", "text": "De 181 a 360 dias"},
    {"id": "3", "text": "De 361 a 720 dias"},
    {"id": "4", "text": "Acima de 720 dias"},
    {"id": "5", "text": "LCI/LCA (qualquer prazo)"}
  ],
  "right_items": [
    {"id": "a", "text": "22,5% de IR"},
    {"id": "b", "text": "20% de IR"},
    {"id": "c", "text": "17,5% de IR"},
    {"id": "d", "text": "15% de IR"},
    {"id": "e", "text": "0% (isento de IR)"}
  ]
}'::jsonb,
'{"correct": {"1": "a", "2": "b", "3": "c", "4": "d", "5": "e"}}'::jsonb,
'O IR em investimentos é regressivo.',
10, 6
FROM chapters c WHERE c.age_group = '13-15' AND c.chapter_number = 3;

-- MISSÃO 7 — Numeric Input — Difícil
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 7, 'Calcula rendimento líquido', 'numeric_input',
'{
  "question": "Um CDB rende R$ 800,00 bruto em 13 meses. Qual o rendimento líquido após IR de 20%?",
  "placeholder": "R$",
  "unit": "reais"
}'::jsonb,
'{"correct": 640, "tolerance": 0}'::jsonb,
'IR = 20% de 800 = R$ 160. Rendimento líquido = 800 - 160 = R$ 640,00.',
10, 7
FROM chapters c WHERE c.age_group = '13-15' AND c.chapter_number = 3;

-- MISSÃO 8 — Drag & Drop — Difícil
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 8, 'Monta carteira diversificada', 'drag_drop',
'{
  "question": "Para um investidor moderado com R$ 10.000, arraste a alocação ideal:",
  "categories": ["Reserva de emergência", "Renda fixa", "Renda variável"],
  "items": [
    {"id": "1", "text": "🏦 R$ 3.000 em Tesouro Selic"},
    {"id": "2", "text": "📄 R$ 4.000 em CDB 2 anos"},
    {"id": "3", "text": "📈 R$ 2.000 em ETF de ações"},
    {"id": "4", "text": "💰 R$ 1.000 em FII"}
  ]
}'::jsonb,
'{"correct": {"1": "Reserva de emergência", "2": "Renda fixa", "3": "Renda variável", "4": "Renda variável"}}'::jsonb,
'Uma carteira equilibrada para perfil moderado.',
10, 8
FROM chapters c WHERE c.age_group = '13-15' AND c.chapter_number = 3;

-- MISSÃO 9 — Quiz — Difícil
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 9, 'Análise de risco', 'quiz',
'{
  "question": "Uma ação caiu 30% em um mês. O que um investidor racional de longo prazo deve considerar?",
  "options": [
    {"id": "a", "text": "Vender imediatamente para evitar mais perdas"},
    {"id": "b", "text": "Avaliar se os fundamentos da empresa mudaram antes de decidir"},
    {"id": "c", "text": "Comprar mais, pois quedas sempre recuperam"},
    {"id": "d", "text": "Ignorar completamente e não acompanhar"}
  ]
}'::jsonb,
'{"correct": "b"}'::jsonb,
'Quedas em ações são normais e esperadas.',
10, 9
FROM chapters c WHERE c.age_group = '13-15' AND c.chapter_number = 3;

-- MISSÃO 10 — Quiz — BOSS 🏆
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 10, '🏆 Boss: Tipos de Investimento', 'quiz',
'{
  "question": "Investidor A: R$ 10.000 em CDB a 12% ao ano por 2 anos (IR 17,5%). Investidor B: R$ 10.000 em LCI a 10% ao ano por 2 anos (isenta de IR). Qual tem maior rendimento líquido?",
  "options": [
    {"id": "a", "text": "Investidor A"},
    {"id": "b", "text": "Investidor B"},
    {"id": "c", "text": "São iguais"},
    {"id": "d", "text": "Depende da inflação"}
  ]
}'::jsonb,
'{"correct": "b"}'::jsonb,
'🏆 A: Bruto = 12% × 2 = R$ 2.400. IR = 17,5% = R$ 420. Líquido = R$ 1.980. B: 10% × 2 = R$ 2.000 (isento).',
10, 10
FROM chapters c WHERE c.age_group = '13-15' AND c.chapter_number = 3;


-- =====================================================
-- SEED: Missões do Capítulo 4 — "Orçamento Pessoal"
-- Faixa: 13-15 anos (Avançado)
-- =====================================================

-- Limpa missões antigas do capítulo 4 (13-15)
DELETE FROM missions WHERE chapter_id IN (
  SELECT id FROM chapters WHERE age_group = '13-15' AND chapter_number = 4
);

-- MISSÃO 1 — Matching — Fácil
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 1, 'Componentes do orçamento', 'matching',
'{
  "question": "Ligue cada conceito à sua definição:",
  "left_items": [
    {"id": "1", "text": "Receita"},
    {"id": "2", "text": "Despesa fixa"},
    {"id": "3", "text": "Despesa variável"},
    {"id": "4", "text": "Superávit"},
    {"id": "5", "text": "Déficit"},
    {"id": "6", "text": "Fluxo de caixa"}
  ],
  "right_items": [
    {"id": "a", "text": "Todo dinheiro que entra (salário, mesada, freelance)"},
    {"id": "b", "text": "Gasto que não muda todo mês (aluguel, mensalidade)"},
    {"id": "c", "text": "Gasto que oscila todo mês (alimentação, transporte)"},
    {"id": "d", "text": "Quando receita > despesa (sobra dinheiro)"},
    {"id": "e", "text": "Quando despesa > receita (falta dinheiro)"},
    {"id": "f", "text": "Registro de todas entradas e saídas"}
  ]
}'::jsonb,
'{"correct": {"1": "a", "2": "b", "3": "c", "4": "d", "5": "e", "6": "f"}}'::jsonb,
'Dominar esses conceitos é a base do orçamento pessoal.',
10, 1
FROM chapters c WHERE c.age_group = '13-15' AND c.chapter_number = 4;

-- MISSÃO 2 — Numeric Input — Fácil
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 2, 'Método 50-30-20 avançado', 'numeric_input',
'{
  "question": "Renda mensal de R$ 1.500,00. Aplicando 50-30-20, quanto deve ir para investimentos?",
  "placeholder": "R$",
  "unit": "reais"
}'::jsonb,
'{"correct": 300, "tolerance": 0}'::jsonb,
'20% de R$ 1.500 = R$ 300/mês.',
10, 2
FROM chapters c WHERE c.age_group = '13-15' AND c.chapter_number = 4;

-- MISSÃO 3 — Text Input — Fácil
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 3, 'Identifica o método', 'text_input',
'{
  "question": "Um método de orçamento consiste em dar um \"destino\" para cada real da sua renda antes do mês começar, de forma que receita - despesas = zero. Esse método se chama orçamento _______ zero.",
  "placeholder": "Digite sua resposta"
}'::jsonb,
'{"accepted": ["base zero", "baseado em zero", "base", "baseado"]}'::jsonb,
'Orçamento base zero!',
10, 3
FROM chapters c WHERE c.age_group = '13-15' AND c.chapter_number = 4;

-- MISSÃO 4 — Drag & Drop — Médio
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 4, 'Analisa o orçamento', 'drag_drop',
'{
  "question": "Classifique cada item no orçamento mensal de R$ 2.000 (limites: Necessidades R$1.000 | Desejos R$600 | Invest. R$400):",
  "categories": ["Dentro do limite 50-30-20", "Acima do limite"],
  "items": [
    {"id": "1", "text": "🏠 Aluguel R$ 600 + Alimentação R$ 350 = R$ 950 necessidades"},
    {"id": "2", "text": "🎬 Cinema + roupas + streaming = R$ 750 desejos"},
    {"id": "3", "text": "🏦 Guardou apenas R$ 300 investimentos"},
    {"id": "4", "text": "💡 Energia + internet = R$ 200 necessidades"}
  ]
}'::jsonb,
'{"correct": {"1": "Dentro do limite 50-30-20", "2": "Acima do limite", "3": "Acima do limite", "4": "Dentro do limite 50-30-20"}}'::jsonb,
'No exemplo, lazer está R$ 150 acima e investimentos R$ 100 abaixo.',
10, 4
FROM chapters c WHERE c.age_group = '13-15' AND c.chapter_number = 4;

-- MISSÃO 5 — Numeric Input — Médio
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 5, 'Calcula ponto de equilíbrio', 'numeric_input',
'{
  "question": "Suas despesas mensais fixas são R$ 800 e variáveis em média R$ 400. Qual a renda mínima mensal para não ter déficit?",
  "placeholder": "R$",
  "unit": "reais"
}'::jsonb,
'{"correct": 1200, "tolerance": 0}'::jsonb,
'800 + 400 = R$ 1.200/mês.',
10, 5
FROM chapters c WHERE c.age_group = '13-15' AND c.chapter_number = 4;

-- MISSÃO 6 — Matching — Médio
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 6, 'Gorduras no orçamento', 'matching',
'{
  "question": "Ligue cada estratégia ao seu impacto no orçamento:",
  "left_items": [
    {"id": "1", "text": "Cancelar assinaturas não usadas"},
    {"id": "2", "text": "Cozinhar em vez de pedir delivery"},
    {"id": "3", "text": "Negociar fatura de internet"},
    {"id": "4", "text": "Comparar preços no mercado"},
    {"id": "5", "text": "Refinanciar dívida com juros menores"},
    {"id": "6", "text": "Usar transporte público"}
  ],
  "right_items": [
    {"id": "a", "text": "Reduz despesas fixas"},
    {"id": "b", "text": "Reduz despesas variáveis"}
  ]
}'::jsonb,
'{"correct": {"1": "a", "2": "b", "3": "a", "4": "b", "5": "a", "6": "b"}}'::jsonb,
'Orçamento enxuto não significa miserável — significa eficiente.',
10, 6
FROM chapters c WHERE c.age_group = '13-15' AND c.chapter_number = 4;

-- MISSÃO 7 — Numeric Input — Difícil
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 7, 'Dívidas no orçamento', 'numeric_input',
'{
  "question": "Você tem 3 dívidas: R$ 200/mês (12% a.a.), R$ 300/mês (35% a.a.), R$ 150/mês (8% a.a.). Pela estratégia \"avalanche\" (quitar maior juros primeiro), qual deve ser pago primeiro?",
  "placeholder": "R$",
  "unit": "reais"
}'::jsonb,
'{"correct": 300, "tolerance": 0}'::jsonb,
'A dívida de R$ 300/mês tem 35% a.a. — a maior taxa.',
10, 7
FROM chapters c WHERE c.age_group = '13-15' AND c.chapter_number = 4;

-- MISSÃO 8 — Numeric Input — Difícil
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 8, 'Projeta o patrimônio', 'numeric_input',
'{
  "question": "Você investe R$ 500/mês a 12% ao ano por 10 anos (juros compostos mensais). Aproximadamente quanto terá? (Use: 500 × 12 meses × 10 anos × fator 1,7)",
  "placeholder": "R$",
  "unit": "reais"
}'::jsonb,
'{"correct": 102000, "tolerance": 5000}'::jsonb,
'Investindo R$ 500/mês por 10 anos com 12% a.a., você terá aproximadamente R$ 115.000.',
10, 8
FROM chapters c WHERE c.age_group = '13-15' AND c.chapter_number = 4;

-- MISSÃO 9 — Quiz — Difícil
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 9, 'Independência financeira', 'quiz',
'{
  "question": "A \"Regra dos 4%\" diz que você pode se aposentar quando seu patrimônio investido for suficiente para retirar 4% ao ano sem esgotá-lo. Para viver com R$ 5.000/mês, qual patrimônio você precisa?",
  "options": [
    {"id": "a", "text": "R$ 600.000"},
    {"id": "b", "text": "R$ 1.500.000"},
    {"id": "c", "text": "R$ 3.000.000"},
    {"id": "d", "text": "R$ 750.000"}
  ]
}'::jsonb,
'{"correct": "b"}'::jsonb,
'R$ 5.000/mês = R$ 60.000/ano. 60.000 ÷ 0,04 = R$ 1.500.000.',
10, 9
FROM chapters c WHERE c.age_group = '13-15' AND c.chapter_number = 4;

-- MISSÃO 10 — Quiz — BOSS 🏆
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 10, '🏆 Boss: Orçamento Pessoal', 'quiz',
'{
  "question": "Lucas (16 anos) investe R$ 300/mês a 10% ao ano. Quer ter R$ 1.000.000 para se aposentar. Com quantos anos aproximadamente ele chegará lá?",
  "options": [
    {"id": "a", "text": "35 anos de idade"},
    {"id": "b", "text": "45 anos de idade"},
    {"id": "c", "text": "55 anos de idade"},
    {"id": "d", "text": "65 anos de idade"}
  ]
}'::jsonb,
'{"correct": "b"}'::jsonb,
'🏆 Investindo R$ 300/mês com 10% ao ano a partir dos 16, Lucas atingirá ~R$ 1.000.000 por volta dos 45-47 anos.',
10, 10
FROM chapters c WHERE c.age_group = '13-15' AND c.chapter_number = 4;


-- =====================================================
-- SEED: Missões do Capítulo 5 — "Crédito e Dívidas"
-- Faixa: 13-15 anos (Avançado)
-- =====================================================

-- Limpa missões antigas do capítulo 5 (13-15)
DELETE FROM missions WHERE chapter_id IN (
  SELECT id FROM chapters WHERE age_group = '13-15' AND chapter_number = 5
);

-- MISSÃO 1 — Quiz — Fácil
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 1, 'O que é crédito?', 'quiz',
'{
  "question": "Crédito é:",
  "options": [
    {"id": "a", "text": "Dinheiro que você ganhou trabalhando"},
    {"id": "b", "text": "Dinheiro emprestado que você usa agora e paga depois, com juros"},
    {"id": "c", "text": "Uma forma de investimento"},
    {"id": "d", "text": "Dinheiro guardado no banco"}
  ]
}'::jsonb,
'{"correct": "b"}'::jsonb,
'Crédito é poder de compra antecipado.',
10, 1
FROM chapters c WHERE c.age_group = '13-15' AND c.chapter_number = 5;

-- MISSÃO 2 — Matching — Fácil
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 2, 'Score de crédito', 'matching',
'{
  "question": "Ligue cada comportamento ao seu impacto no score de crédito:",
  "left_items": [
    {"id": "1", "text": "Pagar contas em dia"},
    {"id": "2", "text": "Atrasar pagamentos"},
    {"id": "3", "text": "Usar muito do limite do cartão"},
    {"id": "4", "text": "Ter CPF limpo (sem dívidas)"},
    {"id": "5", "text": "Consultar o próprio CPF"},
    {"id": "6", "text": "Solicitar crédito com frequência"}
  ],
  "right_items": [
    {"id": "a", "text": "Aumenta o score"},
    {"id": "b", "text": "Reduz o score"},
    {"id": "c", "text": "Pode reduzir o score"},
    {"id": "d", "text": "Mantém/aumenta o score"},
    {"id": "e", "text": "Não afeta o score"},
    {"id": "f", "text": "Pode reduzir temporariamente"}
  ]
}'::jsonb,
'{"correct": {"1": "a", "2": "b", "3": "c", "4": "d", "5": "e", "6": "f"}}'::jsonb,
'Score de crédito é sua "nota de confiabilidade financeira".',
10, 2
FROM chapters c WHERE c.age_group = '13-15' AND c.chapter_number = 5;

-- MISSÃO 3 — Text Input — Fácil
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 3, 'Tipos de crédito', 'text_input',
'{
  "question": "O crédito com as maiores taxas de juros do Brasil, chegando a mais de 400% ao ano, é o _______ especial.",
  "placeholder": "Digite sua resposta"
}'::jsonb,
'{"accepted": ["cheque", "cheque especial"]}'::jsonb,
'Cheque especial! Pode chegar a 400%+ ao ano.',
10, 3
FROM chapters c WHERE c.age_group = '13-15' AND c.chapter_number = 5;

-- MISSÃO 4 — Drag & Drop (ordering) — Médio
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 4, 'Compara taxas de juros', 'drag_drop',
'{
  "question": "Ordene os tipos de crédito do MAIS BARATO ao MAIS CARO:",
  "items": [
    {"id": "1", "text": "🏠 Crédito consignado (~1,5-2% a.m.)"},
    {"id": "2", "text": "🏦 Crédito imobiliário (~0,7-0,9% a.m.)"},
    {"id": "3", "text": "💳 Crédito pessoal (~3-5% a.m.)"},
    {"id": "4", "text": "🛒 Carnê de loja (~5-8% a.m.)"},
    {"id": "5", "text": "💳 Cartão de crédito rotativo (~15-20% a.m.)"},
    {"id": "6", "text": "💰 Cheque especial (~10-30% a.m.)"}
  ]
}'::jsonb,
'{"correct_order": ["1", "2", "3", "4", "5", "6"]}'::jsonb,
'A diferença de taxas é brutal!',
10, 4
FROM chapters c WHERE c.age_group = '13-15' AND c.chapter_number = 5;

-- MISSÃO 5 — Numeric Input — Médio
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 5, 'Calcula o custo real', 'numeric_input',
'{
  "question": "Você parcela R$ 1.200,00 em 12x no cartão com juros de 3% ao mês. Qual o valor de cada parcela?",
  "placeholder": "R$",
  "unit": "reais"
}'::jsonb,
'{"correct": 142, "tolerance": 5}'::jsonb,
'1.200 × (1,03)^12 = ~R$ 1.711 total. ÷ 12 = ~R$ 142/mês.',
10, 5
FROM chapters c WHERE c.age_group = '13-15' AND c.chapter_number = 5;

-- MISSÃO 6 — Matching — Médio
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 6, 'Boa dívida vs má dívida', 'matching',
'{
  "question": "Ligue cada dívida à sua classificação:",
  "left_items": [
    {"id": "1", "text": "Financiamento de imóvel para morar"},
    {"id": "2", "text": "Empréstimo para curso profissionalizante"},
    {"id": "3", "text": "Cartão de crédito para compras supérfluas"},
    {"id": "4", "text": "Cheque especial para pagar contas"},
    {"id": "5", "text": "Financiamento de carro de trabalho"},
    {"id": "6", "text": "Crédito pessoal para viagem de lazer"}
  ],
  "right_items": [
    {"id": "a", "text": "Boa dívida (patrimônio)"},
    {"id": "b", "text": "Boa dívida (investimento)"},
    {"id": "c", "text": "Má dívida"},
    {"id": "d", "text": "Pode ser boa dívida"}
  ]
}'::jsonb,
'{"correct": {"1": "a", "2": "b", "3": "c", "4": "c", "5": "d", "6": "c"}}'::jsonb,
'"Boa dívida" gera um ativo ou aumenta sua capacidade de gerar renda.',
10, 6
FROM chapters c WHERE c.age_group = '13-15' AND c.chapter_number = 5;

-- MISSÃO 7 — Text Input — Difícil
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 7, 'Estratégia de quitação', 'text_input',
'{
  "question": "Na estratégia de quitação de dívidas chamada \"bola de neve\" (snowball), você quita primeiro a dívida de _______ valor, independente dos juros.",
  "placeholder": "Digite sua resposta"
}'::jsonb,
'{"accepted": ["menor", "menor valor", "mais baixo"]}'::jsonb,
'Método bola de neve: quita o menor valor primeiro.',
10, 7
FROM chapters c WHERE c.age_group = '13-15' AND c.chapter_number = 5;

-- MISSÃO 8 — Numeric Input — Difícil
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 8, 'Renegocia a dívida', 'numeric_input',
'{
  "question": "Você tem R$ 3.000 de dívida a 20% a.m. O banco oferece refinanciamento a 5% a.m. Quanto você economiza de juros no primeiro mês?",
  "placeholder": "R$",
  "unit": "reais"
}'::jsonb,
'{"correct": 450, "tolerance": 0}'::jsonb,
'20% de 3.000 = R$ 600. 5% de 3.000 = R$ 150. Economia: R$ 450.',
10, 8
FROM chapters c WHERE c.age_group = '13-15' AND c.chapter_number = 5;

-- MISSÃO 9 — Drag & Drop — Difícil
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 9, 'Armadilhas do crédito', 'drag_drop',
'{
  "question": "Classifique cada prática como armadilha ou uso inteligente do crédito:",
  "categories": ["Uso inteligente ✅", "Armadilha ⚠️"],
  "items": [
    {"id": "1", "text": "💳 Pagar fatura total todo mês"},
    {"id": "2", "text": "🔄 Pagar só o mínimo do cartão"},
    {"id": "3", "text": "✈️ Acumular milhas sem pagar juros"},
    {"id": "4", "text": "🛒 Parcelar o que caberia à vista"},
    {"id": "5", "text": "🏠 Financiar imóvel com entrada de 30%"},
    {"id": "6", "text": "💸 Usar limite como extensão da renda"}
  ]
}'::jsonb,
'{"correct": {"1": "Uso inteligente ✅", "2": "Armadilha ⚠️", "3": "Uso inteligente ✅", "4": "Armadilha ⚠️", "5": "Uso inteligente ✅", "6": "Armadilha ⚠️"}}'::jsonb,
'O crédito, usado corretamente, pode ser uma ferramenta poderosa.',
10, 9
FROM chapters c WHERE c.age_group = '13-15' AND c.chapter_number = 5;

-- MISSÃO 10 — Quiz — BOSS 🏆
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 10, '🏆 Boss: Crédito e Dívidas', 'quiz',
'{
  "question": "Carlos tem R$ 500/mês \"sobrando\". Tem uma dívida de R$ 10.000 a 8% a.m. e uma oportunidade de investir a 1% a.m. O que a matemática indica?",
  "options": [
    {"id": "a", "text": "Investir, pois 1% ao mês composta gera muito dinheiro"},
    {"id": "b", "text": "Pagar a dívida, pois 8% de custo > 1% de rendimento"},
    {"id": "c", "text": "Fazer os dois em partes iguais"},
    {"id": "d", "text": "Esperar e não fazer nada"}
  ]
}'::jsonb,
'{"correct": "b"}'::jsonb,
'🏆 Se você paga 8% de juros mas ganha 1% investindo, cada R$ 100 em dívida custa R$ 8/mês mas rende apenas R$ 1.',
10, 10
FROM chapters c WHERE c.age_group = '13-15' AND c.chapter_number = 5;


-- =====================================================
-- SEED: Missões do Capítulo 6 — "Impostos e Taxas"
-- Faixa: 13-15 anos (Avançado)
-- =====================================================

-- Limpa missões antigas do capítulo 6 (13-15)
DELETE FROM missions WHERE chapter_id IN (
  SELECT id FROM chapters WHERE age_group = '13-15' AND chapter_number = 6
);

-- MISSÃO 1 — Quiz — Fácil
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 1, 'Para que servem os impostos?', 'quiz',
'{
  "question": "Os impostos arrecadados pelo governo são usados para:",
  "options": [
    {"id": "a", "text": "Enriquecer os políticos"},
    {"id": "b", "text": "Financiar serviços públicos como saúde, educação e infraestrutura"},
    {"id": "c", "text": "Pagar dívidas de outros países"},
    {"id": "d", "text": "Guardar em reservas sem uso"}
  ]
}'::jsonb,
'{"correct": "b"}'::jsonb,
'Impostos financiam o Estado: hospitais, escolas, estradas, segurança.',
10, 1
FROM chapters c WHERE c.age_group = '13-15' AND c.chapter_number = 6;

-- MISSÃO 2 — Matching — Fácil
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 2, 'Associa os impostos', 'matching',
'{
  "question": "Ligue cada imposto à sua aplicação:",
  "left_items": [
    {"id": "1", "text": "IR (Imposto de Renda)"},
    {"id": "2", "text": "ICMS"},
    {"id": "3", "text": "ISS"},
    {"id": "4", "text": "IOF"},
    {"id": "5", "text": "IPTU"},
    {"id": "6", "text": "IPVA"}
  ],
  "right_items": [
    {"id": "a", "text": "Incide sobre renda de pessoas e empresas"},
    {"id": "b", "text": "Imposto estadual sobre circulação de mercadorias"},
    {"id": "c", "text": "Imposto municipal sobre prestação de serviços"},
    {"id": "d", "text": "Incide sobre operações financeiras (câmbio, crédito)"},
    {"id": "e", "text": "Imposto municipal sobre propriedade urbana"},
    {"id": "f", "text": "Imposto estadual sobre veículos automotores"}
  ]
}'::jsonb,
'{"correct": {"1": "a", "2": "b", "3": "c", "4": "d", "5": "e", "6": "f"}}'::jsonb,
'O Brasil tem mais de 60 tipos de impostos!',
10, 2
FROM chapters c WHERE c.age_group = '13-15' AND c.chapter_number = 6;

-- MISSÃO 3 — Text Input — Fácil
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 3, 'Imposto direto vs indireto', 'text_input',
'{
  "question": "O imposto embutido no preço de produtos sem que o consumidor perceba diretamente é chamado de imposto _______.",
  "placeholder": "Digite sua resposta"
}'::jsonb,
'{"accepted": ["indireto", "indiretos"]}'::jsonb,
'Imposto indireto!',
10, 3
FROM chapters c WHERE c.age_group = '13-15' AND c.chapter_number = 6;

-- MISSÃO 4 — Numeric Input — Médio
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 4, 'Tabela do IR', 'numeric_input',
'{
  "question": "A faixa de isenção do IR é até R$ 2.824/mês (2024). Quem ganha R$ 2.000/mês paga quanto de IR?",
  "placeholder": "R$",
  "unit": "reais"
}'::jsonb,
'{"correct": 0, "tolerance": 0}'::jsonb,
'R$ 0! Rendimentos até R$ 2.824/mês são isentos.',
10, 4
FROM chapters c WHERE c.age_group = '13-15' AND c.chapter_number = 6;

-- MISSÃO 5 — Numeric Input — Médio
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 5, 'Simula o IR', 'numeric_input',
'{
  "question": "Renda mensal de R$ 5.000. Alíquota efetiva de IR: 11,5%. Quanto é descontado de IR por mês?",
  "placeholder": "R$",
  "unit": "reais"
}'::jsonb,
'{"correct": 575, "tolerance": 0}'::jsonb,
'11,5% de 5.000 = R$ 575,00/mês.',
10, 5
FROM chapters c WHERE c.age_group = '13-15' AND c.chapter_number = 6;

-- MISSÃO 6 — Drag & Drop — Médio
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 6, 'Deduções do IR', 'drag_drop',
'{
  "question": "Classifique o que pode ou não ser deduzido no IR:",
  "categories": ["Pode deduzir ✅", "Não pode deduzir ❌"],
  "items": [
    {"id": "1", "text": "🏥 Gastos com saúde (sem limite)"},
    {"id": "2", "text": "📚 Educação (até o limite anual)"},
    {"id": "3", "text": "🛒 Gastos com supermercado"},
    {"id": "4", "text": "👶 Dependentes"},
    {"id": "5", "text": "🎮 Compras de entretenimento"},
    {"id": "6", "text": "💰 Previdência privada PGBL"}
  ]
}'::jsonb,
'{"correct": {"1": "Pode deduzir ✅", "2": "Pode deduzir ✅", "3": "Não pode deduzir ❌", "4": "Pode deduzir ✅", "5": "Não pode deduzir ❌", "6": "Pode deduzir ✅"}}'::jsonb,
'Deduções reduzem a base de cálculo do IR.',
10, 6
FROM chapters c WHERE c.age_group = '13-15' AND c.chapter_number = 6;

-- MISSÃO 7 — Numeric Input — Difícil
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 7, 'Carga tributária nos produtos', 'numeric_input',
'{
  "question": "Num produto de R$ 100,00, os impostos representam em média 33% do preço final no Brasil. Qual o preço do produto sem impostos?",
  "placeholder": "R$",
  "unit": "reais"
}'::jsonb,
'{"correct": 67, "tolerance": 0}'::jsonb,
'33% de R$ 100 = R$ 33. 100 - 33 = R$ 67.',
10, 7
FROM chapters c WHERE c.age_group = '13-15' AND c.chapter_number = 6;

-- MISSÃO 8 — Matching — Difícil
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 8, 'Planejamento tributário', 'matching',
'{
  "question": "Ligue cada estratégia ao conceito correto:",
  "left_items": [
    {"id": "1", "text": "Usar deduções legais para pagar menos IR"},
    {"id": "2", "text": "Omitir rendimentos na declaração"},
    {"id": "3", "text": "Investir em LCI para ter isenção de IR"},
    {"id": "4", "text": "Declarar despesas inexistentes"},
    {"id": "5", "text": "Migrar para Simples Nacional como MEI"},
    {"id": "6", "text": "Não declarar renda recebida"}
  ],
  "right_items": [
    {"id": "a", "text": "Elisão fiscal (legal)"},
    {"id": "b", "text": "Evasão fiscal (crime)"},
    {"id": "c", "text": "Planejamento tributário"},
    {"id": "d", "text": "Sonegação (crime)"},
    {"id": "e", "text": "Otimização fiscal legal"}
  ]
}'::jsonb,
'{"correct": {"1": "a", "2": "b", "3": "c", "4": "d", "5": "e", "6": "d"}}'::jsonb,
'Planejar para pagar menos impostos de forma LEGAL é direito de todo contribuinte.',
10, 8
FROM chapters c WHERE c.age_group = '13-15' AND c.chapter_number = 6;

-- MISSÃO 9 — Quiz — Difícil
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 9, 'Nota fiscal', 'quiz',
'{
  "question": "Pedir nota fiscal em compras é importante porque:",
  "options": [
    {"id": "a", "text": "Aumenta o preço dos produtos"},
    {"id": "b", "text": "Comprova a compra, garante seus direitos como consumidor e ajuda no controle fiscal"},
    {"id": "c", "text": "Só é necessário para compras acima de R$ 500"},
    {"id": "d", "text": "É obrigação apenas das grandes lojas"}
  ]
}'::jsonb,
'{"correct": "b"}'::jsonb,
'Nota fiscal protege você e a sociedade.',
10, 9
FROM chapters c WHERE c.age_group = '13-15' AND c.chapter_number = 6;

-- MISSÃO 10 — Quiz — BOSS 🏆
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 10, '🏆 Boss: Impostos e Taxas', 'quiz',
'{
  "question": "Ana ganha R$ 8.000/mês. IR: R$ 1.200. INSS: R$ 720. Tem R$ 400 de deduções de saúde. Se as deduções reduzem o IR em R$ 112, qual sua renda líquida real?",
  "options": [
    {"id": "a", "text": "R$ 6.080"},
    {"id": "b", "text": "R$ 6.192"},
    {"id": "c", "text": "R$ 6.800"},
    {"id": "d", "text": "R$ 5.680"}
  ]
}'::jsonb,
'{"correct": "b"}'::jsonb,
'🏆 IR com dedução: 1.200 - 112 = R$ 1.088. Renda líquida: 8.000 - 1.088 - 720 = R$ 6.192.',
10, 10
FROM chapters c WHERE c.age_group = '13-15' AND c.chapter_number = 6;


-- =====================================================
-- SEED: Missões do Capítulo 7 — "Empreendedorismo"
-- Faixa: 13-15 anos (Avançado)
-- =====================================================

-- Limpa missões antigas do capítulo 7 (13-15)
DELETE FROM missions WHERE chapter_id IN (
  SELECT id FROM chapters WHERE age_group = '13-15' AND chapter_number = 7
);

-- MISSÃO 1 — Text Input — Fácil
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 1, 'Modelo de negócio', 'text_input',
'{
  "question": "O documento que descreve como uma empresa cria, entrega e captura valor é chamado de Business _______ Canvas.",
  "placeholder": "Digite sua resposta"
}'::jsonb,
'{"accepted": ["Model", "model"]}'::jsonb,
'Business Model Canvas!',
10, 1
FROM chapters c WHERE c.age_group = '13-15' AND c.chapter_number = 7;

-- MISSÃO 2 — Matching — Fácil
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 2, 'DRE simplificado', 'matching',
'{
  "question": "Ligue cada linha do DRE à sua posição correta:",
  "left_items": [
    {"id": "1", "text": "Receita bruta"},
    {"id": "2", "text": "(-) Impostos sobre vendas"},
    {"id": "3", "text": "Receita líquida"},
    {"id": "4", "text": "(-) Custos dos produtos"},
    {"id": "5", "text": "Lucro bruto"},
    {"id": "6", "text": "(-) Despesas operacionais"},
    {"id": "7", "text": "Lucro líquido"}
  ],
  "right_items": [
    {"id": "a", "text": "Ponto de partida (vendas totais)"},
    {"id": "b", "text": "Dedução da receita bruta"},
    {"id": "c", "text": "Receita bruta - impostos"},
    {"id": "d", "text": "Subtrai da receita líquida"},
    {"id": "e", "text": "Receita líquida - custos"},
    {"id": "f", "text": "Subtrai do lucro bruto"},
    {"id": "g", "text": "Resultado final"}
  ]
}'::jsonb,
'{"correct": {"1": "a", "2": "b", "3": "c", "4": "d", "5": "e", "6": "f", "7": "g"}}'::jsonb,
'O DRE é o "extrato" do negócio.',
10, 2
FROM chapters c WHERE c.age_group = '13-15' AND c.chapter_number = 7;

-- MISSÃO 3 — Numeric Input — Fácil
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 3, 'Margem de contribuição', 'numeric_input',
'{
  "question": "Você vende um produto por R$ 80,00. Os custos variáveis são R$ 35,00. Qual a margem de contribuição unitária?",
  "placeholder": "R$",
  "unit": "reais"
}'::jsonb,
'{"correct": 45, "tolerance": 0}'::jsonb,
'80 - 35 = R$ 45,00.',
10, 3
FROM chapters c WHERE c.age_group = '13-15' AND c.chapter_number = 7;

-- MISSÃO 4 — Numeric Input — Médio
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 4, 'Ponto de equilíbrio', 'numeric_input',
'{
  "question": "Custos fixos mensais R$ 2.700. Margem de contribuição por unidade R$ 45. Quantas unidades para o ponto de equilíbrio?",
  "placeholder": "R$",
  "unit": "reais"
}'::jsonb,
'{"correct": 60, "tolerance": 0}'::jsonb,
'2.700 ÷ 45 = 60 unidades.',
10, 4
FROM chapters c WHERE c.age_group = '13-15' AND c.chapter_number = 7;

-- MISSÃO 5 — Drag & Drop — Médio
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 5, 'Análise SWOT', 'drag_drop',
'{
  "question": "Classifique cada fator na análise SWOT de uma lanchonete:",
  "categories": ["Forças (interno)", "Fraquezas (interno)", "Oportunidades (externo)", "Ameaças (externo)"],
  "items": [
    {"id": "1", "text": "👨‍🍳 Chef experiente na equipe"},
    {"id": "2", "text": "💸 Pouco capital de giro"},
    {"id": "3", "text": "🏗️ Nova empresa no bairro (clientela potencial)"},
    {"id": "4", "text": "🛵 Crescimento do delivery"},
    {"id": "5", "text": "🏪 Concorrente grande abrindo perto"},
    {"id": "6", "text": "📦 Problemas com fornecedor"}
  ]
}'::jsonb,
'{"correct": {"1": "Forças (interno)", "2": "Fraquezas (interno)", "3": "Oportunidades (externo)", "4": "Oportunidades (externo)", "5": "Ameaças (externo)", "6": "Fraquezas (interno)"}}'::jsonb,
'SWOT é a análise estratégica mais usada no mundo.',
10, 5
FROM chapters c WHERE c.age_group = '13-15' AND c.chapter_number = 7;

-- MISSÃO 6 — Matching — Médio
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 6, 'CAC e LTV', 'matching',
'{
  "question": "Ligue cada métrica à sua definição:",
  "left_items": [
    {"id": "1", "text": "CAC (Custo de Aquisição de Cliente)"},
    {"id": "2", "text": "LTV (Lifetime Value)"},
    {"id": "3", "text": "Ticket médio"},
    {"id": "4", "text": "Churn rate"},
    {"id": "5", "text": "NPS"},
    {"id": "6", "text": "ROI"}
  ],
  "right_items": [
    {"id": "a", "text": "Quanto você gasta em marketing para conquistar 1 cliente"},
    {"id": "b", "text": "Quanto um cliente gera de receita durante todo o relacionamento"},
    {"id": "c", "text": "Valor médio gasto por cliente por compra"},
    {"id": "d", "text": "Taxa de clientes que param de comprar"},
    {"id": "e", "text": "Indicador de lealdade e satisfação dos clientes"},
    {"id": "f", "text": "Retorno sobre o investimento em campanhas"}
  ]
}'::jsonb,
'{"correct": {"1": "a", "2": "b", "3": "c", "4": "d", "5": "e", "6": "f"}}'::jsonb,
'LTV > CAC é a equação fundamental.',
10, 6
FROM chapters c WHERE c.age_group = '13-15' AND c.chapter_number = 7;

-- MISSÃO 7 — Numeric Input — Difícil
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 7, 'Precificação estratégica', 'numeric_input',
'{
  "question": "Custo do produto: R$ 40. Despesas fixas alocadas: R$ 20. Margem de lucro desejada: 25% sobre o custo total. Qual o preço de venda?",
  "placeholder": "R$",
  "unit": "reais"
}'::jsonb,
'{"correct": 75, "tolerance": 0}'::jsonb,
'Custo total = 60. Lucro = 25% de 60 = R$ 15. Preço = R$ 75.',
10, 7
FROM chapters c WHERE c.age_group = '13-15' AND c.chapter_number = 7;

-- MISSÃO 8 — Drag & Drop — Difícil
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 8, 'Fluxo de caixa', 'drag_drop',
'{
  "question": "Classifique as movimentações no fluxo de caixa:",
  "categories": ["Entrada (positivo)", "Saída (negativo)"],
  "items": [
    {"id": "1", "text": "💰 Recebimento de vendas"},
    {"id": "2", "text": "📦 Pagamento de fornecedores"},
    {"id": "3", "text": "🏦 Empréstimo bancário"},
    {"id": "4", "text": "💼 Pagamento de salários"},
    {"id": "5", "text": "🔄 Recebimento de duplicatas"},
    {"id": "6", "text": "🏢 Aluguel do espaço"}
  ]
}'::jsonb,
'{"correct": {"1": "Entrada (positivo)", "2": "Saída (negativo)", "3": "Entrada (positivo)", "4": "Saída (negativo)", "5": "Entrada (positivo)", "6": "Saída (negativo)"}}'::jsonb,
'Fluxo de caixa positivo ≠ lucro!',
10, 8
FROM chapters c WHERE c.age_group = '13-15' AND c.chapter_number = 7;

-- MISSÃO 9 — Quiz — Difícil
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 9, 'Valuation simplificado', 'quiz',
'{
  "question": "Uma startup fatura R$ 1.000.000/ano e cresce 50% ao ano. Um investidor oferece R$ 5.000.000 por 20% da empresa. Qual o valuation implícito?",
  "options": [
    {"id": "a", "text": "R$ 1.000.000"},
    {"id": "b", "text": "R$ 5.000.000"},
    {"id": "c", "text": "R$ 25.000.000"},
    {"id": "d", "text": "R$ 10.000.000"}
  ]
}'::jsonb,
'{"correct": "c"}'::jsonb,
'5.000.000 ÷ 0,20 = R$ 25.000.000.',
10, 9
FROM chapters c WHERE c.age_group = '13-15' AND c.chapter_number = 7;

-- MISSÃO 10 — Quiz — BOSS 🏆
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 10, '🏆 Boss: Empreendedorismo', 'quiz',
'{
  "question": "Uma empresa tem: Receita R$ 500.000, CMV R$ 200.000, Despesas fixas R$ 150.000, Impostos R$ 50.000. Qual o lucro líquido e a margem líquida?",
  "options": [
    {"id": "a", "text": "Lucro R$ 100.000 / Margem 20%"},
    {"id": "b", "text": "Lucro R$ 150.000 / Margem 30%"},
    {"id": "c", "text": "Lucro R$ 300.000 / Margem 60%"},
    {"id": "d", "text": "Lucro R$ 50.000 / Margem 10%"}
  ]
}'::jsonb,
'{"correct": "a"}'::jsonb,
'🏆 500.000 - 200.000 - 150.000 - 50.000 = R$ 100.000. Margem = 100.000 ÷ 500.000 = 20%.',
10, 10
FROM chapters c WHERE c.age_group = '13-15' AND c.chapter_number = 7;


-- =====================================================
-- SEED: Missões do Capítulo 8 — "Investindo no Futuro"
-- Faixa: 13-15 anos (Avançado)
-- =====================================================

-- Limpa missões antigas do capítulo 8 (13-15)
DELETE FROM missions WHERE chapter_id IN (
  SELECT id FROM chapters WHERE age_group = '13-15' AND chapter_number = 8
);

-- MISSÃO 1 — Quiz — Fácil
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 1, 'Capital humano', 'quiz',
'{
  "question": "\"Capital humano\" se refere a:",
  "options": [
    {"id": "a", "text": "Dinheiro guardado para emergências"},
    {"id": "b", "text": "O conjunto de habilidades, conhecimentos e experiências de uma pessoa"},
    {"id": "c", "text": "Investimentos em ações de empresas"},
    {"id": "d", "text": "O salário mínimo nacional"}
  ]
}'::jsonb,
'{"correct": "b"}'::jsonb,
'Você é seu maior ativo!',
10, 1
FROM chapters c WHERE c.age_group = '13-15' AND c.chapter_number = 8;

-- MISSÃO 2 — Numeric Input — Fácil
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 2, 'ROI da educação', 'numeric_input',
'{
  "question": "Você investe R$ 3.000 em um curso. Seu salário aumenta R$ 400/mês. Em quantos meses você recupera o investimento?",
  "placeholder": "R$",
  "unit": "reais"
}'::jsonb,
'{"correct": 7.5, "tolerance": 0.5}'::jsonb,
'3.000 ÷ 400 = 7,5 meses.',
10, 2
FROM chapters c WHERE c.age_group = '13-15' AND c.chapter_number = 8;

-- MISSÃO 3 — Matching — Fácil
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 3, 'Previdência privada', 'matching',
'{
  "question": "Ligue cada produto de previdência à sua característica principal:",
  "left_items": [
    {"id": "1", "text": "PGBL"},
    {"id": "2", "text": "VGBL"},
    {"id": "3", "text": "INSS"},
    {"id": "4", "text": "Previdência aberta"},
    {"id": "5", "text": "Previdência fechada"},
    {"id": "6", "text": "Fundo de pensão"}
  ],
  "right_items": [
    {"id": "a", "text": "Indicado para quem declara IR completo (deduz até 12% da renda)"},
    {"id": "b", "text": "Indicado para quem declara IR simplificado ou isento"},
    {"id": "c", "text": "Previdência pública obrigatória para empregados"},
    {"id": "d", "text": "Contratada em bancos e seguradoras"},
    {"id": "e", "text": "Planos de empresas para funcionários"},
    {"id": "f", "text": "Outro nome para previdência fechada"}
  ]
}'::jsonb,
'{"correct": {"1": "a", "2": "b", "3": "c", "4": "d", "5": "e", "6": "f"}}'::jsonb,
'Previdência privada complementa o INSS.',
10, 3
FROM chapters c WHERE c.age_group = '13-15' AND c.chapter_number = 8;

-- MISSÃO 4 — Drag & Drop (ordering) — Médio
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 4, 'Planejamento de carreira', 'drag_drop',
'{
  "question": "Ordene as etapas de um planejamento de carreira estruturado:",
  "items": [
    {"id": "1", "text": "🔍 Autoconhecimento (valores, habilidades, interesses)"},
    {"id": "2", "text": "🎯 Definição de objetivos profissionais"},
    {"id": "3", "text": "📊 Análise do mercado (demanda, salários, tendências)"},
    {"id": "4", "text": "📚 Identificação de gaps (o que falta aprender)"},
    {"id": "5", "text": "🛠️ Plano de desenvolvimento (cursos, experiências)"},
    {"id": "6", "text": "📈 Execução e revisão periódica"}
  ]
}'::jsonb,
'{"correct_order": ["1", "2", "3", "4", "5", "6"]}'::jsonb,
'Carreira não acontece por acaso.',
10, 4
FROM chapters c WHERE c.age_group = '13-15' AND c.chapter_number = 8;

-- MISSÃO 5 — Quiz — Médio
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 5, 'Tendências do mercado de trabalho', 'quiz',
'{
  "question": "Qual habilidade será mais valorizada no mercado de trabalho nos próximos 10 anos?",
  "options": [
    {"id": "a", "text": "Memorização e repetição de tarefas"},
    {"id": "b", "text": "Habilidades socioemocionais + pensamento crítico + adaptabilidade"},
    {"id": "c", "text": "Digitação rápida"},
    {"id": "d", "text": "Conhecimento de uma única área específica"}
  ]
}'::jsonb,
'{"correct": "b"}'::jsonb,
'Com IA e automação substituindo tarefas repetitivas...',
10, 5
FROM chapters c WHERE c.age_group = '13-15' AND c.chapter_number = 8;

-- MISSÃO 6 — Numeric Input — Médio
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 6, 'Calcula aposentadoria', 'numeric_input',
'{
  "question": "Você quer se aposentar com R$ 800.000. Investe R$ 400/mês a 10% ao ano. São necessários ~30 anos. Quanto terá investido (sem juros)?",
  "placeholder": "R$",
  "unit": "reais"
}'::jsonb,
'{"correct": 144000, "tolerance": 0}'::jsonb,
'400 × 12 × 30 = R$ 144.000 investidos.',
10, 6
FROM chapters c WHERE c.age_group = '13-15' AND c.chapter_number = 8;

-- MISSÃO 7 — Drag & Drop — Difícil
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 7, 'Diversificação de renda', 'drag_drop',
'{
  "question": "Classifique as fontes de renda:",
  "categories": ["Renda ativa (exige seu tempo)", "Renda passiva (não exige seu tempo)"],
  "items": [
    {"id": "1", "text": "💼 Salário CLT"},
    {"id": "2", "text": "🏠 Aluguel de imóvel"},
    {"id": "3", "text": "💻 Freelance"},
    {"id": "4", "text": "📈 Dividendos de ações"},
    {"id": "5", "text": "🎓 Aulas particulares"},
    {"id": "6", "text": "📚 Royalties de livro"}
  ]
}'::jsonb,
'{"correct": {"1": "Renda ativa (exige seu tempo)", "2": "Renda passiva (não exige seu tempo)", "3": "Renda ativa (exige seu tempo)", "4": "Renda passiva (não exige seu tempo)", "5": "Renda ativa (exige seu tempo)", "6": "Renda passiva (não exige seu tempo)"}}'::jsonb,
'Renda passiva é o objetivo de longo prazo.',
10, 7
FROM chapters c WHERE c.age_group = '13-15' AND c.chapter_number = 8;

-- MISSÃO 8 — Text Input — Difícil
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 8, 'Estratégia de FIIs', 'text_input',
'{
  "question": "Fundos de investimento imobiliário que distribuem renda mensal aos cotistas são chamados de _______ (sigla de 3 letras).",
  "placeholder": "Digite sua resposta"
}'::jsonb,
'{"accepted": ["FII", "FIIs", "fii", "fiis"]}'::jsonb,
'FIIs!',
10, 8
FROM chapters c WHERE c.age_group = '13-15' AND c.chapter_number = 8;

-- MISSÃO 9 — Quiz — Difícil
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 9, 'Impacto das escolhas', 'quiz',
'{
  "question": "Aos 20 anos, qual decisão financeira terá MAIOR impacto positivo aos 60 anos?",
  "options": [
    {"id": "a", "text": "Comprar o carro mais caro possível para status"},
    {"id": "b", "text": "Começar a investir R$ 200/mês imediatamente, mesmo com renda baixa"},
    {"id": "c", "text": "Esperar ter salário alto para começar a investir"},
    {"id": "d", "text": "Gastar tudo agora pois o futuro é incerto"}
  ]
}'::jsonb,
'{"correct": "b"}'::jsonb,
'Começar com pouco e cedo bate esperar para começar com muito.',
10, 9
FROM chapters c WHERE c.age_group = '13-15' AND c.chapter_number = 8;

-- MISSÃO 10 — Quiz — BOSS 🏆
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 10, '🏆 Boss: Investindo no Futuro', 'quiz',
'{
  "question": "Carolina tem 16 anos e pode escolher: (A) Gastar R$ 300/mês em lazer pelos próximos 30 anos. (B) Investir R$ 300/mês por 30 anos a 10% ao ano. Qual a diferença de patrimônio aos 46 anos?",
  "options": [
    {"id": "a", "text": "R$ 108.000"},
    {"id": "b", "text": "R$ 500.000"},
    {"id": "c", "text": "Aproximadamente R$ 550.000"},
    {"id": "d", "text": "R$ 200.000"}
  ]
}'::jsonb,
'{"correct": "c"}'::jsonb,
'🏆 Opção A: R$ 0. Opção B: ~R$ 658.000. Diferença: ~R$ 658.000.',
10, 10
FROM chapters c WHERE c.age_group = '13-15' AND c.chapter_number = 8;


-- =====================================================
-- SEED: Missões do Capítulo 9 — "Independência Financeira"
-- Faixa: 13-15 anos (Avançado)
-- =====================================================

-- Limpa missões antigas do capítulo 9 (13-15)
DELETE FROM missions WHERE chapter_id IN (
  SELECT id FROM chapters WHERE age_group = '13-15' AND chapter_number = 9
);

-- MISSÃO 1 — Quiz — Fácil
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 1, 'O que é IF?', 'quiz',
'{
  "question": "Independência Financeira (IF) significa:",
  "options": [
    {"id": "a", "text": "Ter muito dinheiro e não precisar trabalhar nunca mais"},
    {"id": "b", "text": "Ter patrimônio suficiente para que os rendimentos cubram suas despesas sem precisar trocar tempo por dinheiro"},
    {"id": "c", "text": "Ganhar o salário mais alto possível"},
    {"id": "d", "text": "Não ter nenhuma dívida"}
  ]
}'::jsonb,
'{"correct": "b"}'::jsonb,
'IF não é sobre ser milionário necessariamente.',
10, 1
FROM chapters c WHERE c.age_group = '13-15' AND c.chapter_number = 9;

-- MISSÃO 2 — Matching — Fácil
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 2, 'Movimentos de IF', 'matching',
'{
  "question": "Ligue cada movimento/conceito à sua definição:",
  "left_items": [
    {"id": "1", "text": "FIRE"},
    {"id": "2", "text": "Lean FIRE"},
    {"id": "3", "text": "Fat FIRE"},
    {"id": "4", "text": "Coast FIRE"},
    {"id": "5", "text": "Barista FIRE"},
    {"id": "6", "text": "Número FIRE"}
  ],
  "right_items": [
    {"id": "a", "text": "Financial Independence, Retire Early"},
    {"id": "b", "text": "IF com estilo de vida minimalista e baixo custo"},
    {"id": "c", "text": "IF com alto padrão de vida"},
    {"id": "d", "text": "Já investiu o suficiente para aposentar sem aportes futuros"},
    {"id": "e", "text": "Semiapsentado, trabalha part-time para complementar renda"},
    {"id": "f", "text": "O patrimônio necessário para a independência financeira"}
  ]
}'::jsonb,
'{"correct": {"1": "a", "2": "b", "3": "c", "4": "d", "5": "e", "6": "f"}}'::jsonb,
'O movimento FIRE ganhou força nos anos 2000.',
10, 2
FROM chapters c WHERE c.age_group = '13-15' AND c.chapter_number = 9;

-- MISSÃO 3 — Numeric Input — Fácil
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 3, 'Calcula o número FIRE', 'numeric_input',
'{
  "question": "Você quer viver com R$ 6.000/mês na aposentadoria. Usando a Regra dos 4%, qual patrimônio você precisa?",
  "placeholder": "R$",
  "unit": "reais"
}'::jsonb,
'{"correct": 1800000, "tolerance": 0}'::jsonb,
'6.000 × 12 = R$ 72.000. 72.000 ÷ 0,04 = R$ 1.800.000.',
10, 3
FROM chapters c WHERE c.age_group = '13-15' AND c.chapter_number = 9;

-- MISSÃO 4 — Numeric Input — Médio
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 4, 'Taxa de poupança', 'numeric_input',
'{
  "question": "Renda: R$ 4.000. Despesas: R$ 2.800. Qual sua taxa de poupança mensal em percentual?",
  "placeholder": "R$",
  "unit": "reais"
}'::jsonb,
'{"correct": 30, "tolerance": 0}'::jsonb,
'1.200 ÷ 4.000 × 100 = 30%.',
10, 4
FROM chapters c WHERE c.age_group = '13-15' AND c.chapter_number = 9;

-- MISSÃO 5 — Drag & Drop — Médio
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 5, 'Acelera a IF', 'drag_drop',
'{
  "question": "Classifique cada estratégia pelo seu impacto na velocidade de atingir a IF:",
  "categories": ["Acelera muito 🚀", "Acelera moderadamente 📈", "Pouco impacto 🐢"],
  "items": [
    {"id": "1", "text": "💼 Aumentar a renda principal"},
    {"id": "2", "text": "📚 Desenvolver renda extra"},
    {"id": "3", "text": "☕ Parar de tomar café fora"},
    {"id": "4", "text": "📊 Otimizar carteira de investimentos"},
    {"id": "5", "text": "🏠 Reduzir custo de moradia"},
    {"id": "6", "text": "🛒 Comparar preços no mercado"}
  ]
}'::jsonb,
'{"correct": {"1": "Acelera muito 🚀", "2": "Acelera muito 🚀", "3": "Pouco impacto 🐢", "4": "Acelera moderadamente 📈", "5": "Acelera muito 🚀", "6": "Pouco impacto 🐢"}}'::jsonb,
'O que realmente acelera é aumentar renda e reduzir grandes despesas.',
10, 5
FROM chapters c WHERE c.age_group = '13-15' AND c.chapter_number = 9;

-- MISSÃO 6 — Matching — Médio
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 6, 'Renda passiva suficiente', 'matching',
'{
  "question": "Ligue cada fonte de renda passiva ao mecanismo que gera o rendimento:",
  "left_items": [
    {"id": "1", "text": "Dividendos de ações"},
    {"id": "2", "text": "Aluguel de FIIs"},
    {"id": "3", "text": "Juros do Tesouro"},
    {"id": "4", "text": "Royalties"},
    {"id": "5", "text": "Cashback em cartão"},
    {"id": "6", "text": "Renda de CDB"}
  ],
  "right_items": [
    {"id": "a", "text": "Parcela do lucro distribuída pelas empresas"},
    {"id": "b", "text": "Receitas de aluguel dos imóveis do fundo"},
    {"id": "c", "text": "Remuneração pelo empréstimo ao governo"},
    {"id": "d", "text": "Pagamento pelo uso de propriedade intelectual"},
    {"id": "e", "text": "Devolução de percentual dos gastos"},
    {"id": "f", "text": "Juros pelo empréstimo ao banco"}
  ]
}'::jsonb,
'{"correct": {"1": "a", "2": "b", "3": "c", "4": "d", "5": "e", "6": "f"}}'::jsonb,
'Diversificar fontes de renda passiva é mais seguro.',
10, 6
FROM chapters c WHERE c.age_group = '13-15' AND c.chapter_number = 9;

-- MISSÃO 7 — Numeric Input — Difícil
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 7, 'Simula o caminho', 'numeric_input',
'{
  "question": "Patrimônio atual: R$ 50.000. Aporte mensal: R$ 800. Rendimento: 10% ao ano. Após 20 anos, quanto terá aproximadamente?",
  "placeholder": "R$",
  "unit": "reais"
}'::jsonb,
'{"correct": 663000, "tolerance": 50000}'::jsonb,
'Patrimônio inicial × 6,73 ≈ R$ 336.500 + aportes com juros ≈ total R$ 660-700k.',
10, 7
FROM chapters c WHERE c.age_group = '13-15' AND c.chapter_number = 9;

-- MISSÃO 8 — Drag & Drop — Difícil
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 8, 'Erros que atrasam a IF', 'drag_drop',
'{
  "question": "Classifique cada comportamento:",
  "categories": ["Atrasam a IF ⛔", "Aceleram a IF ✅"],
  "items": [
    {"id": "1", "text": "🏎️ Upgrade constante de carro"},
    {"id": "2", "text": "📈 Reinvestir dividendos"},
    {"id": "3", "text": "💳 Lifestyle inflation"},
    {"id": "4", "text": "🎓 Investir em educação"},
    {"id": "5", "text": "🏘️ Comprar imóvel além do necessário"},
    {"id": "6", "text": "💰 Automatizar investimentos"}
  ]
}'::jsonb,
'{"correct": {"1": "Atrasam a IF ⛔", "2": "Aceleram a IF ✅", "3": "Atrasam a IF ⛔", "4": "Aceleram a IF ✅", "5": "Atrasam a IF ⛔", "6": "Aceleram a IF ✅"}}'::jsonb,
'Lifestyle inflation é o maior inimigo da IF.',
10, 8
FROM chapters c WHERE c.age_group = '13-15' AND c.chapter_number = 9;

-- MISSÃO 9 — Quiz — Difícil
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 9, 'Fase de acumulação vs distribuição', 'quiz',
'{
  "question": "Na fase de distribuição da IF, qual a principal mudança na estratégia de investimentos?",
  "options": [
    {"id": "a", "text": "Vender tudo e colocar na poupança"},
    {"id": "b", "text": "Migrar para ativos mais conservadores e de maior liquidez, reduzindo risco"},
    {"id": "c", "text": "Continuar exatamente com a mesma carteira"},
    {"id": "d", "text": "Parar completamente de acompanhar os investimentos"}
  ]
}'::jsonb,
'{"correct": "b"}'::jsonb,
'Na acumulação, pode correr mais risco. Na distribuição, preservação é mais importante.',
10, 9
FROM chapters c WHERE c.age_group = '13-15' AND c.chapter_number = 9;

-- MISSÃO 10 — Quiz — BOSS 🏆
INSERT INTO missions (chapter_id, mission_number, title, mission_type, content, correct_answer, explanation, points_reward, order_position)
SELECT c.id, 10, '🏆 Boss: Independência Financeira', 'quiz',
'{
  "question": "Lucas tem 17 anos. Consegue poupar R$ 500/mês e quer atingir a IF com R$ 2.000.000. A 10% ao ano de retorno real, em que ano de idade ele atingirá?",
  "options": [
    {"id": "a", "text": "35 anos"},
    {"id": "b", "text": "42 anos"},
    {"id": "c", "text": "55 anos"},
    {"id": "d", "text": "30 anos"}
  ]
}'::jsonb,
'{"correct": "b"}'::jsonb,
'🏆 R$ 500/mês a 10% ao ano por ~25 anos = ~R$ 2.000.000. Começando aos 17, chegaria por volta dos 42 anos.',
10, 10
FROM chapters c WHERE c.age_group = '13-15' AND c.chapter_number = 9;
