"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { ScrollAnimation } from "@/components/ui/scroll-animation";

const faqs = [
  {
    q: "O que é o acesso de fundador?",
    a: "São as primeiras vagas da pré-venda do Zapfy, com desconto especial e acesso vitalício. Quem garante agora paga apenas R$ 97 (em vez de R$ 197) e nunca paga mensalidade.",
  },
  {
    q: "Quando vou conseguir usar a plataforma?",
    a: "O acesso é liberado imediatamente após o pagamento confirmado. Você receberá um e-mail com os dados de acesso.",
  },
  {
    q: "Para quantos filhos funciona?",
    a: "Você pode cadastrar múltiplos filhos na mesma conta familiar, cada um com seu próprio perfil, progresso e conquistas.",
  },
  {
    q: "Qual é a faixa etária atendida?",
    a: "O Zapfy atende crianças de 7 a 15 anos, com conteúdo adaptado para 3 faixas: Iniciante (7-9), Intermediário (10-12) e Avançado (13-15).",
  },
  {
    q: "E se eu não ficar satisfeito?",
    a: "Você tem 7 dias de garantia incondicional. Se não ficar satisfeito por qualquer motivo, basta solicitar o reembolso e devolvemos 100% do valor pago.",
  },
  {
    q: "O pagamento é seguro?",
    a: "Sim! O checkout é processado pelo Stripe, plataforma de pagamentos líder mundial. Seus dados financeiros nunca passam pelos nossos servidores.",
  },
  {
    q: "Após a pré-venda, o preço muda?",
    a: "Sim. Após o período de pré-venda, o Zapfy passará a ter planos com mensalidade. Quem comprar agora fica com acesso vitalício e não paga mais nada.",
  },
  {
    q: "Posso usar no celular e no computador?",
    a: "Sim! O Zapfy funciona em qualquer dispositivo com navegador: celular, tablet e computador. Não é necessário baixar nenhum app.",
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-border/60 rounded-2xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left font-display font-semibold text-foreground hover:bg-muted/40 transition-colors cursor-pointer"
      >
        <span>{q}</span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="w-5 h-5 text-muted-foreground shrink-0" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-5 text-muted-foreground leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FaqPreVenda() {
  return (
    <section className="section-padding bg-white">
      <div className="container-zapfy max-w-2xl">
        <ScrollAnimation animation="fadeUp">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">
              Perguntas frequentes
            </h2>
            <p className="text-muted-foreground">
              Tem mais dúvidas? Entre em contato pelo rodapé da página.
            </p>
          </div>
        </ScrollAnimation>

        <ScrollAnimation animation="fadeUp" delay={0.1}>
          <div className="space-y-3">
            {faqs.map((faq) => (
              <FaqItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
}
