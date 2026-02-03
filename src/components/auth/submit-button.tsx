"use client";

import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";

interface SubmitButtonProps {
  children: React.ReactNode;
  disabled?: boolean;
}

export function SubmitButton({ children, disabled }: SubmitButtonProps) {
  const { pending } = useFormStatus();
  const isDisabled = pending || disabled;

  return (
    <button
      type="submit"
      disabled={isDisabled}
      className="w-full rounded-full bg-gradient-to-r from-primary-500 to-zapfy-mint px-4 py-3 text-white font-semibold
                 hover:opacity-90 transition-all disabled:opacity-50
                 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-2"
    >
      {pending ? (
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
