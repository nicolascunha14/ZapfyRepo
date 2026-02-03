import { Zap } from "lucide-react";
import Link from "next/link";

type LogoSize = "sm" | "md" | "lg";

const sizes: Record<LogoSize, { icon: number; text: string; ring: string }> = {
  sm: { icon: 18, text: "text-xl", ring: "p-1.5" },
  md: { icon: 22, text: "text-2xl", ring: "p-2" },
  lg: { icon: 28, text: "text-3xl", ring: "p-2.5" },
};

export function Logo({ size = "md" }: { size?: LogoSize }) {
  const s = sizes[size];

  return (
    <Link href="/" className="flex items-center gap-2">
      <div
        className={`bg-gradient-to-br from-primary-500 to-zapfy-mint rounded-xl ${s.ring} flex items-center justify-center`}
      >
        <Zap size={s.icon} className="text-white fill-white" />
      </div>
      <span className={`font-display font-bold bg-gradient-to-r from-primary-500 to-primary-700 bg-clip-text text-transparent ${s.text}`}>
        Zapfy
      </span>
    </Link>
  );
}
