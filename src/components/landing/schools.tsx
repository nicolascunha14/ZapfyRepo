"use client";

import { useState } from "react";
import { GraduationCap } from "lucide-react";
import {
  ScrollAnimation,
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

export function Schools() {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <section className="py-12 bg-muted/20 relative">
      <div className="container-zapfy relative z-10">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <h3 className="text-xl md:text-2xl font-display font-semibold text-muted-foreground">
            Sua Escola Também Pode Ter{" "}
            <span className="text-primary-500">Zapfy</span>
          </h3>

          <p className="text-muted-foreground">
            Professores e coordenadores: a Zapfy está disponível{" "}
            <strong>GRATUITAMENTE</strong> para escolas públicas. Alinhada à
            BNCC, pronta para usar.
          </p>

          <ScrollAnimation animation="fadeUp" delay={0.2}>
            <button
              onClick={() => setDialogOpen(true)}
              className="text-primary-500 hover:text-primary-500/80 font-medium inline-flex items-center gap-1 transition-colors group"
            >
              Quero Zapfy na Minha Escola
              <span className="group-hover:translate-x-1 transition-transform">
                →
              </span>
            </button>
          </ScrollAnimation>
        </div>
      </div>

      <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2 font-display">
              <GraduationCap className="w-6 h-6 text-primary-500" />
              Zapfy para Escolas - Em Breve
            </AlertDialogTitle>
            <AlertDialogDescription className="text-base space-y-3 pt-2">
              <p>Obrigado pelo seu interesse!</p>
              <p>
                Atualmente, a{" "}
                <strong>
                  Zapfy está disponível exclusivamente para famílias
                </strong>
                . Estamos desenvolvendo uma versão completa para escolas com
                gestão de turmas, relatórios pedagógicos e alinhamento total com
                a BNCC.
              </p>
              <p>
                <strong>Quer ser avisado quando lançarmos?</strong>
                <br />
                Entre em contato conosco pelo email:{" "}
                <span className="text-primary-500 font-semibold">
                  escolas@zapfy.com.br
                </span>
              </p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction className="bg-primary-500 hover:bg-primary-500/90">
              Entendi
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  );
}
