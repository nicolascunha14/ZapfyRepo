import type { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";
import { UpdatePasswordForm } from "@/components/auth/update-password-form";

export const metadata: Metadata = {
  title: "Nova Senha - Zapfy",
};

export default function UpdatePasswordPage() {
  return (
    <Card>
      <CardContent className="pt-6">
        <h1 className="text-2xl font-display font-bold text-center mb-2">
          Definir Nova Senha
        </h1>
        <p className="text-center text-muted-foreground text-sm mb-6">
          Escolha uma senha forte para sua conta.
        </p>

        <UpdatePasswordForm />
      </CardContent>
    </Card>
  );
}
