"use client";

import { Clock, ShieldCheck } from "lucide-react";
import { ScrollAnimation } from "@/components/ui/scroll-animation";

export function AccessTiming() {
  return (
    <section className="section-padding bg-white">
      <div className="container-zapfy max-w-xl mx-auto">
        <ScrollAnimation animation="fadeUp">
          {/* Access timing */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary-50 mb-4">
              <Clock className="w-7 h-7 text-primary-600" />
            </div>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-slate-900 mb-3">
              Quando terei acesso?
            </h2>
            <p className="text-slate-500 leading-relaxed">
              O acesso antecipado será liberado nas próximas semanas. Você
              receberá todas as instruções por email.
            </p>
          </div>

          {/* Guarantee card */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 flex items-start gap-4">
            <ShieldCheck className="w-8 h-8 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-display font-bold text-slate-900 mb-1">
                Garantia incondicional de 7 dias
              </p>
              <p className="text-slate-600 text-sm leading-relaxed">
                Após o acesso, se a Zapfy não fizer sentido para você e seu
                filho, devolvemos 100% do valor. Sem perguntas.
              </p>
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
}
