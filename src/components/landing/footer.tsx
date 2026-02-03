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
      toast.error("Preencha todos os campos. A mensagem precisa ter pelo menos 10 caracteres.");
      return;
    }

    setIsSubmitting(true);
    try {
      const supabase = createClient();
      const { error } = await supabase
        .from("contacts")
        .insert({ email, question });

      if (error) throw error;

      toast.success("Mensagem enviada com sucesso! Entraremos em contato em breve.");
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
              Plataforma de educação financeira gamificada para crianças de 7 a
              14 anos. Transformando o futuro financeiro das famílias
              brasileiras.
            </p>
          </div>

          {/* About */}
          <div className="space-y-4">
            <h3 className="font-display font-bold text-lg">Sobre a Zapfy</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Educação financeira acessível</li>
              <li>Gamificação que engaja</li>
              <li>Segura para crianças</li>
              <li>Alinhada com a BNCC</li>
            </ul>
          </div>

          {/* Contact form */}
          <div className="space-y-4">
            <h3 className="font-display font-bold text-lg">Fale Conosco</h3>
            <form onSubmit={handleSubmit} className="space-y-3">
              <Input
                type="email"
                placeholder="Seu e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubmitting}
                required
              />
              <Textarea
                placeholder="Sua mensagem (mínimo 10 caracteres)"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                disabled={isSubmitting}
                rows={3}
                required
                minLength={10}
              />
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-primary-500 to-zapfy-mint text-white rounded-full"
              >
                <Send className="w-4 h-4 mr-2" />
                {isSubmitting ? "Enviando..." : "Enviar Mensagem"}
              </Button>
            </form>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Zapfy. Todos os direitos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
