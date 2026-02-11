import type { Metadata } from "next";
import { GuestSetupFlow } from "@/components/guest/guest-setup-flow";

export const metadata: Metadata = {
  title: "Escolha sua idade - Zapfy",
};

export default function GuestSetupPage() {
  return <GuestSetupFlow />;
}
