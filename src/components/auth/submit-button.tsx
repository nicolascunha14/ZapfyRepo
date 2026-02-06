"use client";

import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";

interface SubmitButtonProps {
  children: React.ReactNode;
  disabled?: boolean;
  loading?: boolean;
}

export function SubmitButton({ children, disabled, loading }: SubmitButtonProps) {
  const { pending } = useFormStatus();
  const isLoading = pending || loading;
  const isDisabled = isLoading || disabled;

  return (
    <button
      type="submit"
      disabled={isDisabled}
      className="w-full rounded-full bg-gradient-to-r from-primary-500 to-zapfy-mint px-4 py-3.5 text-white font-display font-semibold text-base
                 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-card)] hover:scale-[1.01]
                 transition-all disabled:opacity-50 disabled:hover:scale-100
                 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-2"
    >
      {isLoading ? (
        <>
          <Loader2 size={20} className="animate-spin" />
          Aguarde...
        </>
      ) : (
        children
      )}
    </button>
  );
}
