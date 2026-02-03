"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubmitButton } from "@/components/auth/submit-button";
import { getAuthErrorMessage } from "@/lib/auth-errors";
import { useRateLimit } from "@/hooks/use-rate-limit";

export function UpdatePasswordForm() {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { isLimited, rateLimitError, checkLimit, recordAttempt } =
    useRateLimit({ cooldownMs: 3000, maxAttempts: 5, windowMs: 60000 });

  async function handleSubmit(formData: FormData) {
    setError(null);

    if (!checkLimit()) return;

    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (password.length < 6) {
      setError("A senha precisa ter pelo menos 6 caracteres.");
      return;
    }

    if (!/[A-Za-z]/.test(password) || !/\d/.test(password)) {
      setError("A senha deve conter letras e números.");
      return;
    }

    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    recordAttempt();
    const supabase = createClient();
    const { error: authError } = await supabase.auth.updateUser({ password });

    if (authError) {
      setError(getAuthErrorMessage(authError));
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <form action={handleSubmit} className="space-y-4">
      {(error || rateLimitError) && (
        <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-xl">
          {rateLimitError || error}
        </div>
      )}
      <div className="space-y-2">
        <Label htmlFor="password">Nova Senha</Label>
        <Input name="password" id="password" type="password" placeholder="Mínimo 6 caracteres" required minLength={6} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirmar Nova Senha</Label>
        <Input name="confirmPassword" id="confirmPassword" type="password" placeholder="Repita sua nova senha" required minLength={6} />
      </div>
      <p className="text-xs text-muted-foreground">
        A senha deve ter pelo menos 6 caracteres, com letras e números.
      </p>
      <SubmitButton disabled={isLimited}>Atualizar Senha</SubmitButton>
    </form>
  );
}
