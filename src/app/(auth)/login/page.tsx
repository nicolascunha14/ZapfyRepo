import type { Metadata } from "next";
import { Suspense } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { LoginForm } from "@/components/auth/login-form";
import { OAuthButtons } from "@/components/auth/oauth-buttons";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Entrar - Zapfy",
};

export default function LoginPage() {
  return (
    <Card>
      <CardContent className="pt-6">
        <h1 className="text-2xl font-display font-bold text-center mb-6">
          Bem-vindo de volta!
        </h1>

        <OAuthButtons />

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-card px-4 text-muted-foreground">
              ou continue com e-mail
            </span>
          </div>
        </div>

        <Suspense>
          <LoginForm />
        </Suspense>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Não tem uma conta?{" "}
          <Link
            href="/signup"
            className="text-primary-500 font-semibold hover:underline"
          >
            Criar Conta
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
