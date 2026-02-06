import { AuthError } from "@supabase/supabase-js";

const ERROR_MAP: Record<string, string> = {
  // Login errors
  invalid_credentials: "E-mail ou senha incorretos.",
  invalid_grant: "E-mail ou senha incorretos.",
  // Signup errors
  user_already_exists: "Já existe uma conta com este e-mail.",
  weak_password: "A senha é muito fraca. Use pelo menos 8 caracteres.",
  // Rate limiting
  over_request_rate_limit: "Muitas tentativas. Aguarde um momento antes de tentar novamente.",
  over_email_send_rate_limit: "Muitos e-mails enviados. Aguarde alguns minutos.",
  // Email errors
  email_not_confirmed: "Verifique seu e-mail antes de fazer login.",
  // Password reset
  same_password: "A nova senha deve ser diferente da senha atual.",
  // Session errors
  session_not_found: "Sessão expirada. Faça login novamente.",
  refresh_token_not_found: "Sessão expirada. Faça login novamente.",
  // OAuth errors
  provider_disabled: "Login com Google não está disponível no momento.",
  // Generic
  validation_failed: "Dados inválidos. Verifique e tente novamente.",
  bad_json: "Erro ao processar dados. Tente novamente.",
  bad_jwt: "Sessão inválida. Faça login novamente.",
};

const STATUS_MAP: Record<number, string> = {
  400: "Dados inválidos. Verifique e tente novamente.",
  401: "Sessão expirada. Faça login novamente.",
  403: "Acesso negado.",
  404: "Recurso não encontrado.",
  422: "Dados inválidos. Verifique os campos e tente novamente.",
  429: "Muitas tentativas. Aguarde um momento.",
  500: "Erro interno do servidor. Tente novamente mais tarde.",
};

const FALLBACK_MESSAGE = "Ocorreu um erro inesperado. Tente novamente.";

export function getAuthErrorMessage(error: unknown): string {
  if (error instanceof AuthError) {
    // Check error code first (most specific)
    if (error.code && ERROR_MAP[error.code]) {
      return ERROR_MAP[error.code];
    }

    // Check known message patterns
    const msg = error.message.toLowerCase();

    if (msg.includes("invalid login credentials")) {
      return "E-mail ou senha incorretos.";
    }
    if (msg.includes("email not confirmed")) {
      return "Verifique seu e-mail antes de fazer login.";
    }
    if (msg.includes("user already registered")) {
      return "Já existe uma conta com este e-mail.";
    }
    if (msg.includes("password") && msg.includes("weak")) {
      return "A senha é muito fraca. Use pelo menos 8 caracteres.";
    }
    if (msg.includes("rate") || msg.includes("too many")) {
      return "Muitas tentativas. Aguarde um momento antes de tentar novamente.";
    }
    if (msg.includes("same password")) {
      return "A nova senha deve ser diferente da senha atual.";
    }

    // Check HTTP status
    if (error.status && STATUS_MAP[error.status]) {
      return STATUS_MAP[error.status];
    }

    return error.message || FALLBACK_MESSAGE;
  }

  if (error instanceof Error) {
    return error.message || FALLBACK_MESSAGE;
  }

  return FALLBACK_MESSAGE;
}
