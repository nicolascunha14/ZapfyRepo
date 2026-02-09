import { Navbar } from "@/components/landing/navbar";
import { Hero } from "@/components/landing/hero";
import { About } from "@/components/landing/about";
import { BenefitsForParents } from "@/components/landing/benefits-parents";
import { BenefitsForKids } from "@/components/landing/benefits-kids";
import { Demo } from "@/components/landing/demo";
import { Schools } from "@/components/landing/schools";
import { Cta } from "@/components/landing/cta";
import { Footer } from "@/components/landing/footer";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <section id="hero">
        <Hero />
      </section>
      <section id="about">
        <About />
      </section>
      <section id="benefits-parents">
        <BenefitsForParents />
      </section>
      <section id="benefits-kids">
        <BenefitsForKids />
      </section>
      <Demo />
      <section id="schools">
        <Schools />
      </section>
      <Cta />
      <Footer />
    </main>
  );
}
