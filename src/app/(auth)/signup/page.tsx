import type { Metadata } from "next";
import { SignupForm } from "@/components/auth/signup-form";
import { OAuthButtons } from "@/components/auth/oauth-buttons";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Criar Conta - Zapfy",
};

export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<{ ref?: string; redirect?: string }>;
}) {
  const { ref, redirect } = await searchParams;

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground">
          Comece a aventura!
        </h1>
        <p className="text-muted-foreground text-sm">
          Crie sua conta e ensine educação financeira de forma divertida
        </p>
      </div>

      <OAuthButtons referralCode={ref} redirectTo={redirect} />

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border/60" />
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="bg-white px-4 text-muted-foreground font-medium uppercase tracking-wider">
            ou cadastre com e-mail
          </span>
        </div>
      </div>

      <SignupForm referralCode={ref} redirectTo={redirect} />

      <p className="text-center text-sm text-muted-foreground">
        Já tem uma conta?{" "}
        <Link
          href="/login"
          className="text-primary-500 font-semibold hover:underline"
        >
          Entrar
        </Link>
      </p>
    </div>
  );
}
