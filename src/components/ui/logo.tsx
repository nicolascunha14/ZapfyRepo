import Image from "next/image";
import Link from "next/link";

type LogoSize = "sm" | "md" | "lg";

const sizes: Record<LogoSize, { img: number; text: string }> = {
  sm: { img: 40, text: "text-xl" },
  md: { img: 48, text: "text-2xl" },
  lg: { img: 64, text: "text-3xl" },
};

export function Logo({ size = "md" }: { size?: LogoSize }) {
  const s = sizes[size];

  return (
    <Link href="/" className="flex items-center gap-2">
      <Image
        src="/zapfy-logo.png"
        alt="Zapfy"
        width={s.img}
        height={s.img}
        className="shrink-0"
      />
      <span className={`font-display font-bold bg-gradient-to-r from-primary-500 to-primary-700 bg-clip-text text-transparent ${s.text}`}>
        Zapfy
      </span>
    </Link>
  );
}
