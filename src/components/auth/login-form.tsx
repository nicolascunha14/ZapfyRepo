"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubmitButton } from "@/components/auth/submit-button";
import { getAuthErrorMessage } from "@/lib/auth-errors";
import { useRateLimit } from "@/hooks/use-rate-limit";
import Link from "next/link";

const URL_ERROR_MESSAGES: Record<string, string> = {
  missing_code:
    "Código de autenticação não encontrado. Tente fazer login novamente.",
  exchange_failed:
    "Não foi possível completar o login. Tente novamente.",
  auth_callback_failed:
    "Erro na autenticação. Tente novamente.",
  verification_failed:
    "Link de verificação inválido ou expirado. Solicite um novo.",
};

export function LoginForm() {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isLimited, rateLimitError, checkLimit, recordAttempt } =
    useRateLimit({ cooldownMs: 2000, maxAttempts: 5, windowMs: 60000 });

  useEffect(() => {
    const errorCode = searchParams.get("error");
    const message = searchParams.get("message");
    if (errorCode) {
      setError(
        message || URL_ERROR_MESSAGES[errorCode] || "Erro na autenticação."
      );
    }
  }, [searchParams]);

  async function handleSubmit(formData: FormData) {
    setError(null);

    if (!checkLimit()) return;

    recordAttempt();
    const supabase = createClient();

    const { data, error: authError } = await supabase.auth.signInWithPassword({
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    });

    if (authError) {
      setError(getAuthErrorMessage(authError));
      return;
    }

    const onboardingDone =
      data.user?.user_metadata?.onboarding_completed === true;
    router.push(onboardingDone ? "/dashboard" : "/onboarding");
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
        <Label htmlFor="email">E-mail</Label>
        <Input name="email" id="email" type="email" placeholder="voce@exemplo.com" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Senha</Label>
        <Input name="password" id="password" type="password" placeholder="Sua senha" required />
      </div>
      <div className="flex justify-end">
        <Link href="/forgot-password" className="text-sm text-primary-500 hover:underline">
          Esqueceu a senha?
        </Link>
      </div>
      <SubmitButton disabled={isLimited}>Entrar</SubmitButton>
    </form>
  );
}
