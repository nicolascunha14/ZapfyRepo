"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubmitButton } from "@/components/auth/submit-button";
import { getAuthErrorMessage } from "@/lib/auth-errors";
import { useRateLimit } from "@/hooks/use-rate-limit";
import Link from "next/link";

export function ForgotPasswordForm() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const { isLimited, rateLimitError, checkLimit, recordAttempt } =
    useRateLimit({ cooldownMs: 5000, maxAttempts: 3, windowMs: 120000 });

  async function handleSubmit(formData: FormData) {
    setError(null);

    if (!checkLimit()) return;

    const email = formData.get("email") as string;

    recordAttempt();
    const supabase = createClient();
    const { error: authError } = await supabase.auth.resetPasswordForEmail(
      email,
      {
        redirectTo: `${window.location.origin}/auth/confirm?next=/update-password`,
      }
    );

    if (authError) {
      setError(getAuthErrorMessage(authError));
      return;
    }

    setSuccess(true);
  }

  if (success) {
    return (
      <div className="text-center space-y-3">
        <div className="text-5xl">📧</div>
        <h2 className="font-display font-bold text-xl text-foreground">
          Verifique seu e-mail!
        </h2>
        <p className="text-muted-foreground text-sm">
          Se uma conta existir com esse e-mail, enviamos um link para redefinir sua senha.
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
        <Label htmlFor="email">E-mail</Label>
        <Input name="email" id="email" type="email" placeholder="voce@exemplo.com" required />
      </div>
      <SubmitButton disabled={isLimited}>Enviar Link de Redefinição</SubmitButton>
    </form>
  );
}
