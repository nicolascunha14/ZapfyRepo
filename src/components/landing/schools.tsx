"use client";

import { useState } from "react";
import { GraduationCap, Puzzle, Heart } from "lucide-react";
import {
  ScrollAnimation,
  StaggerContainer,
  StaggerItem,
} from "@/components/ui/scroll-animation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const features = [
  {
    icon: <Puzzle className="w-8 h-8 text-white" />,
    title: "Plug & Play para Professores",
    description:
      "Plataforma pronta para usar com gerenciamento de turmas, relatórios por aluno e conteúdo didático completo.",
  },
  {
    icon: <GraduationCap className="w-8 h-8 text-white" />,
    title: "Alinhado à BNCC",
    description:
      "Conteúdo desenvolvido seguindo as diretrizes da Base Nacional Comum Curricular para educação financeira.",
  },
  {
    icon: <Heart className="w-8 h-8 text-white" />,
    title: "Gratuito para Escolas Públicas",
    description:
      "Acreditamos que educação financeira é um direito. Por isso, escolas públicas têm acesso gratuito à Zapfy.",
  },
];

export function Schools() {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <section className="section-padding bg-muted/30 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-transparent to-zapfy-mint/5 blur-3xl" />

      <div className="container-zapfy relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <StaggerContainer className="space-y-6">
            <StaggerItem>
              <h2 className="text-3xl md:text-4xl font-display font-bold">
                Zapfy nas{" "}
                <span className="bg-gradient-to-r from-primary-500 to-zapfy-mint bg-clip-text text-transparent">
                  Escolas
                </span>
              </h2>
            </StaggerItem>
            <StaggerItem>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Leve educação financeira para sua escola. Plataforma completa
                para professores, alunos e coordenadores.
              </p>
            </StaggerItem>
          </StaggerContainer>

          <ScrollAnimation animation="scale" delay={0.2}>
            <div className="grid md:grid-cols-3 gap-6">
              {features.map((feature) => (
                <div key={feature.title} className="card-zapfy text-center space-y-4">
                  <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-zapfy-mint flex items-center justify-center">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-display font-bold">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </ScrollAnimation>

          <ScrollAnimation animation="fadeUp" delay={0.3}>
            <button
              onClick={() => setDialogOpen(true)}
              className="btn-outline-zapfy"
            >
              Quero Zapfy na Minha Escola
            </button>
          </ScrollAnimation>
        </div>
      </div>

      <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="font-display">
              Zapfy para Escolas
            </AlertDialogTitle>
            <AlertDialogDescription>
              A versão para escolas está chegando em breve! Enquanto isso, entre
              em contato pelo e-mail{" "}
              <strong>escolas@zapfy.com.br</strong> para saber mais sobre como
              levar educação financeira para sua instituição.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction>Entendi</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  );
}
