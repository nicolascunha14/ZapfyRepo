"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { SubmitButton } from "@/components/auth/submit-button";
import { getAuthErrorMessage } from "@/lib/auth-errors";
import { useRateLimit } from "@/hooks/use-rate-limit";
import { motion, AnimatePresence } from "framer-motion";
import { User, Mail, Lock, CheckCircle2, AlertCircle, Eye, EyeOff } from "lucide-react";
import Link from "next/link";

type FieldErrors = {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateName(value: string): string | undefined {
  const trimmed = value.trim();
  if (!trimmed) return "Digite seu nome para continuar.";
  if (trimmed.length < 3) return "O nome precisa ter pelo menos 3 caracteres.";
  if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(trimmed)) return "O nome deve conter apenas letras.";
  return undefined;
}

function validateEmail(value: string): string | undefined {
  const trimmed = value.trim();
  if (!trimmed) return "Precisamos do seu e-mail para criar a conta.";
  if (!EMAIL_RE.test(trimmed)) return "Este e-mail não parece válido. Verifique e tente novamente.";
  return undefined;
}

function validatePassword(value: string): string | undefined {
  if (!value) return "Crie uma senha para proteger sua conta.";
  if (value.length < 8) return "A senha precisa ter no mínimo 8 caracteres.";
  if (!/[A-Z]/.test(value) && !/[0-9]/.test(value))
    return "Use pelo menos uma letra maiúscula ou número.";
  return undefined;
}

function validateConfirmPassword(
  value: string,
  password: string
): string | undefined {
  if (!value) return "Confirme sua senha para continuar.";
  if (value !== password) return "As senhas não são iguais. Tente novamente.";
  return undefined;
}

function getPasswordStrength(password: string): { label: string; color: string; width: string } {
  if (!password) return { label: "", color: "", width: "0%" };
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 1) return { label: "Fraca", color: "bg-red-400", width: "20%" };
  if (score <= 2) return { label: "Regular", color: "bg-orange-400", width: "40%" };
  if (score <= 3) return { label: "Boa", color: "bg-yellow-400", width: "60%" };
  if (score <= 4) return { label: "Forte", color: "bg-emerald-400", width: "80%" };
  return { label: "Excelente", color: "bg-emerald-500", width: "100%" };
}

export function SignupForm({ referralCode, redirectTo }: { referralCode?: string; redirectTo?: string }) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { isLimited, rateLimitError, checkLimit, recordAttempt } =
    useRateLimit({ cooldownMs: 3000, maxAttempts: 5, windowMs: 60000 });

  const setFieldError = useCallback(
    (field: keyof FieldErrors, error: string | undefined) => {
      setFieldErrors((prev) => {
        if (prev[field] === error) return prev;
        return { ...prev, [field]: error };
      });
    },
    []
  );

  const handleBlur = useCallback(
    (field: keyof FieldErrors) => {
      setTouched((prev) => ({ ...prev, [field]: true }));
      switch (field) {
        case "name":
          setFieldError("name", validateName(name));
          break;
        case "email":
          setFieldError("email", validateEmail(email));
          break;
        case "password":
          setFieldError("password", validatePassword(password));
          if (touched.confirmPassword && confirmPassword) {
            setFieldError(
              "confirmPassword",
              validateConfirmPassword(confirmPassword, password)
            );
          }
          break;
        case "confirmPassword":
          setFieldError(
            "confirmPassword",
            validateConfirmPassword(confirmPassword, password)
          );
          break;
      }
    },
    [name, email, password, confirmPassword, touched.confirmPassword, setFieldError]
  );

  function validateAll(): boolean {
    const errors: FieldErrors = {
      name: validateName(name),
      email: validateEmail(email),
      password: validatePassword(password),
      confirmPassword: validateConfirmPassword(confirmPassword, password),
    };
    setFieldErrors(errors);
    setTouched({ name: true, email: true, password: true, confirmPassword: true });
    return !errors.name && !errors.email && !errors.password && !errors.confirmPassword;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setServerError(null);

    if (!validateAll()) return;
    if (!checkLimit()) return;

    recordAttempt();
    setIsLoading(true);
    const supabase = createClient();

    try {
      const { data, error: authError } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: {
            display_name: name.trim(),
            onboarding_completed: false,
            ...(referralCode ? { referral_code: referralCode } : {}),
          },
        },
      });

      if (authError) {
        setServerError(getAuthErrorMessage(authError));
        return;
      }

      // If we got a session (email confirmation disabled), redirect to onboarding
      if (data.session) {
        // Ensure public.users row exists
        await supabase.from("users").upsert(
          {
            id: data.user!.id,
            email: data.user!.email!,
            display_name: name.trim(),
          },
          { onConflict: "id" }
        );

        // Process referral if present
        if (referralCode) {
          const { data: referrer } = await supabase
            .from("users")
            .select("id")
            .eq("referral_code", referralCode)
            .single();

          if (referrer) {
            await supabase.from("referrals").insert({
              referrer_id: referrer.id,
              referred_id: data.user!.id,
            });

            // Award points to referrer's child
            const { data: referrerChild } = await supabase
              .from("children")
              .select("id, total_points")
              .eq("parent_id", referrer.id)
              .limit(1)
              .single();

            if (referrerChild) {
              await supabase
                .from("children")
                .update({ total_points: (referrerChild.total_points ?? 0) + 50 })
                .eq("id", referrerChild.id);

              await supabase
                .from("referrals")
                .update({ points_awarded: true })
                .eq("referred_id", data.user!.id);
            }
          }
        }

        router.push(redirectTo || "/onboarding");
        router.refresh();
        return;
      }

      // Fallback: if email confirmation is still required
      setSuccess(true);
    } finally {
      setIsLoading(false);
    }
  }

  const passwordStrength = getPasswordStrength(password);
  const isFieldValid = (field: keyof FieldErrors) =>
    touched[field] && !fieldErrors[field];

  if (success) {
    return (
      <motion.div
        className="text-center space-y-5 py-4"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <motion.div
          className="w-20 h-20 mx-auto rounded-full bg-emerald-100 flex items-center justify-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300, delay: 0.2 }}
        >
          <Mail size={36} className="text-emerald-500" />
        </motion.div>
        <motion.h2
          className="font-display font-bold text-xl text-foreground"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Verifique seu e-mail!
        </motion.h2>
        <motion.p
          className="text-muted-foreground text-sm leading-relaxed max-w-xs mx-auto"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          Enviamos um link de confirmação para{" "}
          <span className="font-semibold text-foreground">{email.trim()}</span>.
          Clique nele para ativar sua conta e começar a aventura!
        </motion.p>
        <motion.div
          className="pt-2 space-y-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-xs text-muted-foreground">
            Não recebeu? Verifique a pasta de spam.
          </p>
          <Link
            href="/login"
            className="text-primary-500 font-semibold hover:underline text-sm inline-block"
          >
            Voltar para Login
          </Link>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <AnimatePresence>
        {(serverError || rateLimitError) && (
          <motion.div
            className="flex items-start gap-3 bg-red-50 text-red-700 text-sm p-4 rounded-2xl border border-red-100"
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -10, height: 0 }}
          >
            <AlertCircle size={18} className="shrink-0 mt-0.5" />
            <span>{rateLimitError || serverError}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Name field */}
      <motion.div
        className="space-y-1.5"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
      >
        <label htmlFor="name" className="text-sm font-semibold text-foreground">
          Seu nome
        </label>
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/60">
            <User size={18} />
          </div>
          <input
            name="name"
            id="name"
            type="text"
            placeholder="Como podemos te chamar?"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (touched.name) setFieldError("name", validateName(e.target.value));
            }}
            onBlur={() => handleBlur("name")}
            aria-invalid={touched.name && !!fieldErrors.name}
            className={`w-full h-13 rounded-2xl border-2 bg-white pl-11 pr-10 text-base font-medium
                       outline-none transition-all duration-200
                       ${touched.name && fieldErrors.name
                ? "border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-100"
                : isFieldValid("name")
                  ? "border-emerald-300 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                  : "border-border focus:border-primary-400 focus:ring-2 focus:ring-primary-100"
              }`}
          />
          {isFieldValid("name") && (
            <motion.div
              className="absolute right-4 top-1/2 -translate-y-1/2"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500 }}
            >
              <CheckCircle2 size={18} className="text-emerald-500" />
            </motion.div>
          )}
        </div>
        <AnimatePresence>
          {touched.name && fieldErrors.name && (
            <motion.p
              className="text-red-500 text-xs pl-1 flex items-center gap-1"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
            >
              <AlertCircle size={12} />
              {fieldErrors.name}
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Email field */}
      <motion.div
        className="space-y-1.5"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <label htmlFor="email" className="text-sm font-semibold text-foreground">
          E-mail
        </label>
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/60">
            <Mail size={18} />
          </div>
          <input
            name="email"
            id="email"
            type="email"
            placeholder="seu@email.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (touched.email) setFieldError("email", validateEmail(e.target.value));
            }}
            onBlur={() => handleBlur("email")}
            aria-invalid={touched.email && !!fieldErrors.email}
            className={`w-full h-13 rounded-2xl border-2 bg-white pl-11 pr-10 text-base font-medium
                       outline-none transition-all duration-200
                       ${touched.email && fieldErrors.email
                ? "border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-100"
                : isFieldValid("email")
                  ? "border-emerald-300 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                  : "border-border focus:border-primary-400 focus:ring-2 focus:ring-primary-100"
              }`}
          />
          {isFieldValid("email") && (
            <motion.div
              className="absolute right-4 top-1/2 -translate-y-1/2"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500 }}
            >
              <CheckCircle2 size={18} className="text-emerald-500" />
            </motion.div>
          )}
        </div>
        <AnimatePresence>
          {touched.email && fieldErrors.email && (
            <motion.p
              className="text-red-500 text-xs pl-1 flex items-center gap-1"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
            >
              <AlertCircle size={12} />
              {fieldErrors.email}
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Password field */}
      <motion.div
        className="space-y-1.5"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
      >
        <label htmlFor="password" className="text-sm font-semibold text-foreground">
          Senha
        </label>
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/60">
            <Lock size={18} />
          </div>
          <input
            name="password"
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Mínimo 8 caracteres"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (touched.password)
                setFieldError("password", validatePassword(e.target.value));
              if (touched.confirmPassword && confirmPassword)
                setFieldError(
                  "confirmPassword",
                  validateConfirmPassword(confirmPassword, e.target.value)
                );
            }}
            onBlur={() => handleBlur("password")}
            aria-invalid={touched.password && !!fieldErrors.password}
            className={`w-full h-13 rounded-2xl border-2 bg-white pl-11 pr-10 text-base font-medium
                       outline-none transition-all duration-200
                       ${touched.password && fieldErrors.password
                ? "border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-100"
                : isFieldValid("password")
                  ? "border-emerald-300 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                  : "border-border focus:border-primary-400 focus:ring-2 focus:ring-primary-100"
              }`}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground/60 hover:text-muted-foreground transition-colors cursor-pointer"
            tabIndex={-1}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        {/* Password strength indicator */}
        {password && (
          <motion.div
            className="space-y-1"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
          >
            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <motion.div
                className={`h-full rounded-full ${passwordStrength.color}`}
                initial={{ width: 0 }}
                animate={{ width: passwordStrength.width }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Força: <span className="font-medium">{passwordStrength.label}</span>
            </p>
          </motion.div>
        )}
        <AnimatePresence>
          {touched.password && fieldErrors.password && (
            <motion.p
              className="text-red-500 text-xs pl-1 flex items-center gap-1"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
            >
              <AlertCircle size={12} />
              {fieldErrors.password}
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Confirm Password field */}
      <motion.div
        className="space-y-1.5"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <label htmlFor="confirmPassword" className="text-sm font-semibold text-foreground">
          Confirmar Senha
        </label>
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/60">
            <Lock size={18} />
          </div>
          <input
            name="confirmPassword"
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Repita sua senha"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              if (touched.confirmPassword)
                setFieldError(
                  "confirmPassword",
                  validateConfirmPassword(e.target.value, password)
                );
            }}
            onBlur={() => handleBlur("confirmPassword")}
            aria-invalid={touched.confirmPassword && !!fieldErrors.confirmPassword}
            className={`w-full h-13 rounded-2xl border-2 bg-white pl-11 pr-10 text-base font-medium
                       outline-none transition-all duration-200
                       ${touched.confirmPassword && fieldErrors.confirmPassword
                ? "border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-100"
                : isFieldValid("confirmPassword")
                  ? "border-emerald-300 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                  : "border-border focus:border-primary-400 focus:ring-2 focus:ring-primary-100"
              }`}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground/60 hover:text-muted-foreground transition-colors cursor-pointer"
            tabIndex={-1}
          >
            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        <AnimatePresence>
          {touched.confirmPassword && fieldErrors.confirmPassword && (
            <motion.p
              className="text-red-500 text-xs pl-1 flex items-center gap-1"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
            >
              <AlertCircle size={12} />
              {fieldErrors.confirmPassword}
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="pt-1"
      >
        <SubmitButton disabled={isLimited} loading={isLoading}>Criar Conta</SubmitButton>
      </motion.div>
    </form>
  );
}
