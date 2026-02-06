import { Logo } from "@/components/ui/logo";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-dvh flex flex-col bg-white">
      {/* Top gradient accent */}
      <div className="bg-gradient-to-r from-primary-500 to-zapfy-mint h-2" />

      <div className="flex-1 flex flex-col items-center justify-center px-5 py-8">
        <div className="mb-8">
          <Logo size="lg" />
        </div>
        <div className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 sm:shadow-[var(--shadow-card)] sm:border sm:border-border/30">
          {children}
        </div>
      </div>
    </div>
  );
}
