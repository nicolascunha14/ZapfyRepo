"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubmitButton } from "@/components/auth/submit-button";
import { getAuthErrorMessage } from "@/lib/auth-errors";
import { useRateLimit } from "@/hooks/use-rate-limit";
import Link from "next/link";

export function SignupForm() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const { isLimited, rateLimitError, checkLimit, recordAttempt } =
    useRateLimit({ cooldownMs: 3000, maxAttempts: 5, windowMs: 60000 });

  async function handleSubmit(formData: FormData) {
    setError(null);

    if (!checkLimit()) return;

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (password.length < 6) {
      setError("A senha precisa ter pelo menos 6 caracteres.");
      return;
    }

    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    recordAttempt();
    const supabase = createClient();

    const { error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { display_name: name },
      },
    });

    if (authError) {
      setError(getAuthErrorMessage(authError));
      return;
    }

    setSuccess(true);
  }

  if (success) {
    return (
      <div className="text-center space-y-3">
        <div className="text-5xl">📬</div>
        <h2 className="font-display font-bold text-xl text-foreground">
          Verifique seu e-mail!
        </h2>
        <p className="text-muted-foreground text-sm">
          Enviamos um link de confirmação para o seu endereço de e-mail.
          Clique nele para ativar sua conta.
        </p>
        <p className="pt-2">
          <Link
            href="/login"
            className="text-primary-500 font-semibold hover:underline text-sm"
          >
            Voltar para Login
          </Link>
        </p>
      </div>
    );
  }

  return (
    <form action={handleSubmit} className="space-y-4">
      {(error || rateLimitError) && (
        <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-xl">
          {rateLimitError || error}
        </div>
      )}
      <div className="space-y-2">
        <Label htmlFor="name">Nome</Label>
        <Input name="name" id="name" type="text" placeholder="Seu nome" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">E-mail</Label>
        <Input name="email" id="email" type="email" placeholder="voce@exemplo.com" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Senha</Label>
        <Input name="password" id="password" type="password" placeholder="Mínimo 6 caracteres" required minLength={6} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirmar Senha</Label>
        <Input name="confirmPassword" id="confirmPassword" type="password" placeholder="Repita sua senha" required minLength={6} />
      </div>
      <SubmitButton disabled={isLimited}>Criar Conta</SubmitButton>
    </form>
  );
}
