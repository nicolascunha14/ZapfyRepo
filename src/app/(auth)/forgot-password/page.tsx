import type { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";
import { ForgotPasswordForm } from "@/components/auth/forgot-password-form";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Esqueceu a Senha - Zapfy",
};

export default function ForgotPasswordPage() {
  return (
    <Card>
      <CardContent className="pt-6">
        <h1 className="text-2xl font-display font-bold text-center mb-2">
          Esqueceu sua senha?
        </h1>
        <p className="text-center text-muted-foreground text-sm mb-6">
          Sem problemas! Digite seu e-mail e enviaremos um link para redefinir.
        </p>

        <ForgotPasswordForm />

        <p className="text-center text-sm text-muted-foreground mt-6">
          <Link
            href="/login"
            className="text-primary-500 font-semibold hover:underline"
          >
            Voltar para Login
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
