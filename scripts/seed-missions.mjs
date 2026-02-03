// Seed script for Zapfy missions
// Usage: npm run seed
//
// Requires SUPABASE_SERVICE_ROLE_KEY in .env.local
// (get it from: Supabase Dashboard > Project Settings > API > service_role key)

import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Load .env.local manually (no dotenv dependency needed)
const envPath = resolve(__dirname, "..", ".env.local");
const envContent = readFileSync(envPath, "utf-8");
const env = {};
for (const line of envContent.split("\n")) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith("#")) continue;
  const [key, ...rest] = trimmed.split("=");
  env[key.trim()] = rest.join("=").trim();
}

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL in .env.local");
  process.exit(1);
}

if (!serviceRoleKey) {
  console.error(
    "Missing SUPABASE_SERVICE_ROLE_KEY in .env.local\n" +
      "Get it from: Supabase Dashboard > Project Settings > API > service_role key\n" +
      "Add to .env.local: SUPABASE_SERVICE_ROLE_KEY=your_key_here"
  );
  process.exit(1);
}

// Run raw SQL against the Supabase database via the pg-meta endpoint
async function runSQL(sql) {
  const res = await fetch(`${supabaseUrl}/rest/v1/rpc/`, {
    method: "POST",
    headers: {
      apikey: serviceRoleKey,
      Authorization: `Bearer ${serviceRoleKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  });

  // Fallback: use the SQL file content via Supabase SQL endpoint
  // Try the database query endpoint
  const sqlRes = await fetch(
    `${supabaseUrl.replace(".supabase.co", ".supabase.co")}/pg/query`,
    {
      method: "POST",
      headers: {
        apikey: serviceRoleKey,
        Authorization: `Bearer ${serviceRoleKey}`,
        "Content-Type": "application/json",
        "x-connection-encrypted": "true",
      },
      body: JSON.stringify({ query: sql }),
    }
  );

  return sqlRes;
}

const SETUP_SQL = `
-- Add content_key column if not exists
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'missions' AND column_name = 'content_key'
  ) THEN
    ALTER TABLE public.missions ADD COLUMN content_key text not null default '';
  END IF;
END $$;

-- Update theme CHECK constraint to allow new themes
DO $$
DECLARE
  constraint_name text;
BEGIN
  SELECT con.conname INTO constraint_name
  FROM pg_constraint con
  JOIN pg_attribute att ON att.attnum = ANY(con.conkey) AND att.attrelid = con.conrelid
  WHERE con.conrelid = 'public.missions'::regclass
    AND con.contype = 'c'
    AND att.attname = 'theme';

  IF constraint_name IS NOT NULL THEN
    EXECUTE 'ALTER TABLE public.missions DROP CONSTRAINT ' || constraint_name;
  END IF;

  ALTER TABLE public.missions ADD CONSTRAINT missions_theme_check
    CHECK (theme IN ('lanche', 'troco', 'economizar', 'conceitos_basicos', 'ganhar', 'gastar', 'investir'));
END $$;
`;

const missions = [
  // ─── Age 7-9 (50 points each) ─────────────────────
  {
    title: "O que é dinheiro?",
    description:
      "Aprenda sobre as moedas e notas do Brasil! Descubra quanto cada uma vale e pratique contando dinheiro de verdade.",
    tips: "Dica: Peça a um adulto para mostrar moedas e notas de verdade. Toque nelas, sinta o tamanho e o peso. A moeda de 1 real tem duas cores: prata por fora e dourada por dentro!",
    age_group: "7-9",
    theme: "conceitos_basicos",
    points_reward: 50,
    display_order: 1,
    content_key: "conceitos_basicos-7-9",
  },
  {
    title: "O que você quer comprar?",
    description:
      "Descubra como planejar para comprar o que você mais quer! Aprenda a pesquisar preços e calcular quanto precisa economizar.",
    tips: "Dica: Escolha algo que você quer muito e descubra o preço. Depois, pense em como guardar dinheiro toda semana até chegar no valor. Use um cofrinho!",
    age_group: "7-9",
    theme: "economizar",
    points_reward: 50,
    display_order: 2,
    content_key: "economizar-7-9",
  },
  {
    title: "De onde vem o dinheiro?",
    description:
      "Descubra de onde vem o dinheiro que usamos no dia a dia! Aprenda sobre profissões e como o trabalho gera renda.",
    tips: "Dica: Converse com seus pais sobre o trabalho deles. Pergunte o que fazem e como isso ajuda as pessoas. Toda profissão é importante!",
    age_group: "7-9",
    theme: "conceitos_basicos",
    points_reward: 50,
    display_order: 3,
    content_key: "conceitos_basicos-7-9-origens",
  },
  {
    title: "Formas de ganhar",
    description:
      "Existem várias formas de ganhar dinheiro, até para crianças! Descubra como ser responsável e criativo para conseguir sua mesada.",
    tips: "Dica: Ajudar em casa é uma ótima forma de mostrar responsabilidade. Arrumar o quarto, guardar brinquedos e ajudar na cozinha são boas tarefas!",
    age_group: "7-9",
    theme: "ganhar",
    points_reward: 50,
    display_order: 4,
    content_key: "ganhar-7-9",
  },
  {
    title: "Desejo vs necessidade",
    description:
      "Aprenda a diferença entre o que você PRECISA e o que você QUER. Isso vai te ajudar a gastar melhor o seu dinheiro!",
    tips: "Dica: Antes de pedir algo, pense: eu preciso disso para viver ou só quero porque é legal? Necessidades vêm primeiro!",
    age_group: "7-9",
    theme: "gastar",
    points_reward: 50,
    display_order: 5,
    content_key: "gastar-7-9",
  },
  {
    title: "Por que guardar?",
    description:
      "Guardar dinheiro é um superpoder! Aprenda por que economizar é tão importante e como um cofrinho pode te ajudar.",
    tips: "Dica: Arranje um cofrinho e comece a guardar moedas todo dia. No final do mês, conte quanto juntou. Vai se surpreender!",
    age_group: "7-9",
    theme: "economizar",
    points_reward: 50,
    display_order: 6,
    content_key: "economizar-7-9-guardar",
  },

  // ─── Age 10-12 (75 points each) ───────────────────
  {
    title: "Desafio do troco rápido",
    description:
      "Teste suas habilidades de cálculo mental! Calcule o troco de compras reais sem usar calculadora e vire um mestre do troco.",
    tips: "Dica: Primeiro arredonde os valores para facilitar. Se a compra é R$ 12,75 e você paga com R$ 20, pense: 20 - 13 = 7, depois ajuste os centavos. Pratique com compras de verdade!",
    age_group: "10-12",
    theme: "troco",
    points_reward: 75,
    display_order: 1,
    content_key: "troco-10-12",
  },
  {
    title: "Quanto tempo para juntar?",
    description:
      "Aprenda a calcular quanto tempo precisa para juntar dinheiro e comprar o que quer! Divida sua meta em semanas e veja como é possível.",
    tips: "Dica: Divida o valor do que quer pelo que consegue guardar por semana. Exemplo: R$ 50 ÷ R$ 10/semana = 5 semanas. Anote sua meta e acompanhe o progresso!",
    age_group: "10-12",
    theme: "economizar",
    points_reward: 75,
    display_order: 2,
    content_key: "economizar-10-12",
  },
  {
    title: "Trabalho gera dinheiro",
    description:
      "Por que algumas pessoas ganham mais que outras? Entenda como o trabalho, estudo e experiência determinam o salário.",
    tips: "Dica: Pesquise salários de diferentes profissões. Note como profissões que exigem mais estudo costumam pagar mais, mas todo trabalho honesto tem valor!",
    age_group: "10-12",
    theme: "conceitos_basicos",
    points_reward: 75,
    display_order: 3,
    content_key: "conceitos_basicos-10-12",
  },
  {
    title: "Valor da habilidade",
    description:
      "Suas habilidades têm valor! Aprenda como transformar o que você sabe fazer em dinheiro e como melhorar para ganhar mais.",
    tips: "Dica: Pense no que você faz bem: desenhar, cozinhar, ajudar com tecnologia? Toda habilidade pode virar um trabalho se você se dedicar!",
    age_group: "10-12",
    theme: "ganhar",
    points_reward: 75,
    display_order: 4,
    content_key: "ganhar-10-12",
  },
  {
    title: "Gastar com sabedoria",
    description:
      "Saber gastar é tão importante quanto saber ganhar! Aprenda a pesquisar preços, comparar opções e fazer compras inteligentes.",
    tips: "Dica: Antes de comprar, pesquise em pelo menos 3 lugares diferentes. O mesmo produto pode ter preços muito diferentes!",
    age_group: "10-12",
    theme: "gastar",
    points_reward: 75,
    display_order: 5,
    content_key: "gastar-10-12",
  },
  {
    title: "Fazendo dinheiro crescer",
    description:
      "Você sabia que dinheiro pode crescer sozinho? Entenda como investir faz seu dinheiro aumentar com o poder dos juros compostos!",
    tips: "Dica: A poupança é o investimento mais simples. Pergunte aos seus pais como funciona e peça para ver uma conta de poupança real!",
    age_group: "10-12",
    theme: "investir",
    points_reward: 75,
    display_order: 6,
    content_key: "investir-10-12",
  },

  // ─── Age 13-15 (100 points each) ──────────────────
  {
    title: "Renda vs herança",
    description:
      "Existem diferentes formas de receber dinheiro. Entenda a diferença entre renda ativa, passiva e herança, e qual é mais sustentável.",
    tips: "Dica: Renda ativa = você trabalha e ganha. Renda passiva = seu dinheiro ou propriedade gera renda. A mais sustentável é desenvolver suas próprias fontes!",
    age_group: "13-15",
    theme: "conceitos_basicos",
    points_reward: 100,
    display_order: 1,
    content_key: "conceitos_basicos-13-15",
  },
  {
    title: "Crie seu negócio",
    description:
      "Já pensou em ter seu próprio negócio? Aprenda os primeiros passos do empreendedorismo: da ideia ao lucro!",
    tips: "Dica: Todo negócio começa resolvendo um problema. Observe as necessidades ao seu redor e pense em soluções criativas!",
    age_group: "13-15",
    theme: "ganhar",
    points_reward: 100,
    display_order: 2,
    content_key: "ganhar-13-15",
  },
];

async function seed() {
  console.log("Zapfy Mission Seeder\n");

  // Step 1: Run setup SQL (add content_key column + update theme constraint)
  console.log("1. Running setup SQL...");
  const sqlRes = await runSQL(SETUP_SQL);

  if (!sqlRes.ok) {
    const text = await sqlRes.text().catch(() => "");
    console.log(
      `   Could not run setup SQL (status ${sqlRes.status}).`
    );
    console.log(
      "   You may need to run the following SQL manually in the Supabase SQL Editor:"
    );
    console.log("   1. ALTER TABLE public.missions ADD COLUMN content_key text not null default '';");
    console.log("   2. Update the theme CHECK constraint to include 'ganhar', 'gastar', 'investir'\n");
    console.log("   Proceeding to check if table already exists...\n");
  } else {
    console.log("   Setup complete.\n");
  }

  // Step 2: Seed data using supabase-js
  const { createClient } = await import("@supabase/supabase-js");
  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false },
  });

  // Check if table is accessible
  console.log("2. Checking table access...");
  const { error: checkError } = await supabase
    .from("missions")
    .select("id", { count: "exact", head: true });

  if (checkError) {
    console.error(`\n   Table 'missions' not found: ${checkError.message}\n`);
    console.error("   You need to create the table first.");
    console.error("   Run this SQL in the Supabase SQL Editor:\n");
    console.error("   https://supabase.com/dashboard/project/iuwopuhcdazwgmtjyveq/sql\n");
    console.error("   Copy the contents of: supabase/missions.sql\n");
    process.exit(1);
  }

  console.log("   Table accessible.\n");

  // Step 3: Clear existing data
  console.log("3. Clearing existing missions...");
  const { count } = await supabase
    .from("missions")
    .select("*", { count: "exact", head: true });

  if (count && count > 0) {
    const { error: deleteError } = await supabase
      .from("missions")
      .delete()
      .neq("id", "00000000-0000-0000-0000-000000000000");

    if (deleteError) {
      console.error("   Failed to clear:", deleteError.message);
      process.exit(1);
    }
    console.log(`   Cleared ${count} existing missions.\n`);
  } else {
    console.log("   No existing missions.\n");
  }

  // Step 4: Insert all missions
  console.log(`4. Inserting ${missions.length} missions...`);
  const { data, error } = await supabase
    .from("missions")
    .insert(missions)
    .select();

  if (error) {
    console.error("   Failed to insert:", error.message);
    process.exit(1);
  }

  console.log(`   Inserted ${data.length} missions.\n`);

  // Summary
  console.log("=".repeat(50));
  console.log("  MISSIONS SEEDED SUCCESSFULLY");
  console.log("=".repeat(50));
  console.log();

  const groups = { "7-9": [], "10-12": [], "13-15": [] };
  for (const m of data) {
    groups[m.age_group].push(m);
  }

  for (const [age, items] of Object.entries(groups)) {
    if (items.length === 0) continue;
    const pts = items[0]?.points_reward || 0;
    console.log(`  Faixa ${age} anos (${pts} pts cada):`);
    for (const m of items) {
      console.log(`    ${m.display_order}. [${m.theme}] ${m.title} (${m.content_key})`);
    }
    console.log();
  }

  console.log("Done! Missions are ready for the app.");
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
