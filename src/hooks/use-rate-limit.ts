"use client";

import { useState, useCallback, useRef } from "react";

interface UseRateLimitOptions {
  /** Cooldown period in milliseconds between submissions */
  cooldownMs: number;
  /** Maximum number of attempts within the window */
  maxAttempts: number;
  /** Window in milliseconds for maxAttempts tracking */
  windowMs: number;
}

interface UseRateLimitReturn {
  /** Whether the user is currently rate-limited */
  isLimited: boolean;
  /** Remaining seconds until the cooldown expires */
  remainingSeconds: number;
  /** Error message to show if rate-limited */
  rateLimitError: string | null;
  /** Call before each form submission. Returns true if allowed, false if rate-limited */
  checkLimit: () => boolean;
  /** Record a successful submission */
  recordAttempt: () => void;
}

export function useRateLimit({
  cooldownMs = 2000,
  maxAttempts = 5,
  windowMs = 60000,
}: Partial<UseRateLimitOptions> = {}): UseRateLimitReturn {
  const [isLimited, setIsLimited] = useState(false);
  const [remainingSeconds, setRemainingSeconds] = useState(0);
  const [rateLimitError, setRateLimitError] = useState<string | null>(null);
  const attemptsRef = useRef<number[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startCooldown = useCallback(
    (durationMs: number, message: string) => {
      setIsLimited(true);
      setRateLimitError(message);
      const endTime = Date.now() + durationMs;
      setRemainingSeconds(Math.ceil(durationMs / 1000));

      if (timerRef.current) clearInterval(timerRef.current);

      timerRef.current = setInterval(() => {
        const left = Math.ceil((endTime - Date.now()) / 1000);
        if (left <= 0) {
          setIsLimited(false);
          setRemainingSeconds(0);
          setRateLimitError(null);
          if (timerRef.current) clearInterval(timerRef.current);
        } else {
          setRemainingSeconds(left);
        }
      }, 1000);
    },
    []
  );

  const checkLimit = useCallback((): boolean => {
    if (isLimited) return false;

    const now = Date.now();
    // Clean old attempts outside the window
    attemptsRef.current = attemptsRef.current.filter(
      (t) => now - t < windowMs
    );

    // Check if too many attempts in the window
    if (attemptsRef.current.length >= maxAttempts) {
      const oldestInWindow = attemptsRef.current[0];
      const waitMs = windowMs - (now - oldestInWindow);
      startCooldown(
        waitMs,
        `Muitas tentativas. Aguarde ${Math.ceil(waitMs / 1000)} segundos.`
      );
      return false;
    }

    // Check cooldown from last attempt
    const lastAttempt = attemptsRef.current[attemptsRef.current.length - 1];
    if (lastAttempt && now - lastAttempt < cooldownMs) {
      startCooldown(
        cooldownMs - (now - lastAttempt),
        "Aguarde um momento antes de tentar novamente."
      );
      return false;
    }

    return true;
  }, [isLimited, cooldownMs, maxAttempts, windowMs, startCooldown]);

  const recordAttempt = useCallback(() => {
    attemptsRef.current.push(Date.now());
  }, []);

  return {
    isLimited,
    remainingSeconds,
    rateLimitError,
    checkLimit,
    recordAttempt,
  };
}
