import type { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";
import { SignupForm } from "@/components/auth/signup-form";
import { OAuthButtons } from "@/components/auth/oauth-buttons";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Criar Conta - Zapfy",
};

export default function SignupPage() {
  return (
    <Card>
      <CardContent className="pt-6">
        <h1 className="text-2xl font-display font-bold text-center mb-6">
          Junte-se à Aventura!
        </h1>

        <OAuthButtons />

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-card px-4 text-muted-foreground">
              ou cadastre-se com e-mail
            </span>
          </div>
        </div>

        <SignupForm />

        <p className="text-center text-sm text-muted-foreground mt-6">
          Já tem uma conta?{" "}
          <Link
            href="/login"
            className="text-primary-500 font-semibold hover:underline"
          >
            Entrar
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
