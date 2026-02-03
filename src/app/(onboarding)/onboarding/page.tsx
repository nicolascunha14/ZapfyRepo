import type { Metadata } from "next";
import { OnboardingFlow } from "@/components/onboarding/onboarding-flow";

export const metadata: Metadata = {
  title: "Bem-vindo ao Zapfy!",
};

export default function OnboardingPage() {
  return <OnboardingFlow />;
}
