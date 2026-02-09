"use client";

import { useState } from "react";
import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { Send } from "lucide-react";

export function Footer() {
  const [email, setEmail] = useState("");
  const [question, setQuestion] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !question || question.length < 10) {
      toast.error(
        "Preencha todos os campos. A mensagem precisa ter pelo menos 10 caracteres."
      );
      return;
    }

    setIsSubmitting(true);
    try {
      const supabase = createClient();
      const { error } = await supabase
        .from("contacts")
        .insert({ email, question });

      if (error) throw error;

      toast.success(
        "Mensagem enviada com sucesso! Entraremos em contato em breve."
      );
      setEmail("");
      setQuestion("");
    } catch {
      toast.error("Erro ao enviar mensagem. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <footer id="contato" className="bg-muted/50 border-t border-border">
      <div className="container-zapfy section-padding">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <Logo size="md" />
            <p className="text-sm text-muted-foreground leading-relaxed">
              A Zapfy é uma plataforma inovadora de educação financeira para
              crianças, combinando gamificação e segurança para ensinar o valor
              do dinheiro de forma divertida.
            </p>
          </div>

          {/* About */}
          <div className="space-y-4">
            <h3 className="font-display font-bold text-lg">Sobre a Zapfy</h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>
                Nossa missão é transformar a relação das crianças com o dinheiro
                através da educação financeira gamificada.
              </p>
              <div className="space-y-2">
                <h4 className="font-medium text-foreground">
                  Por que escolher a Zapfy?
                </h4>
                <ul className="space-y-1">
                  <li>
                    • Educação financeira personalizada para cada idade
                  </li>
                  <li>• Gamificação que mantém as crianças engajadas</li>
                  <li>• Segurança e supervisão parental integrada</li>
                  <li>• Conteúdo desenvolvido por especialistas</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div className="space-y-4">
            <h3 className="font-display font-bold text-lg">Contato</h3>
            <p className="text-sm text-muted-foreground">
              Tem dúvidas? Deixe seu e-mail que entraremos em contato:
            </p>
            <form onSubmit={handleSubmit} className="space-y-3">
              <Input
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubmitting}
                required
              />
              <Textarea
                placeholder="Escreva sua dúvida aqui..."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                disabled={isSubmitting}
                rows={4}
                required
                minLength={10}
                className="resize-none"
              />
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-primary-500 to-zapfy-mint text-white rounded-full"
              >
                <Send className="w-4 h-4 mr-2" />
                {isSubmitting ? "Enviando..." : "Enviar"}
              </Button>
            </form>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Zapfy. Todos os direitos
            reservados.
          </p>
          <nav className="flex gap-6">
            <a
              href="#"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Política de Privacidade
            </a>
            <a
              href="#"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Termos de Uso
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
