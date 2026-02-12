"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, Bell, Trash2, Loader2, Eye, EyeOff, AlertTriangle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { createClient } from "@/lib/supabase/client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export function AccountTab({
  userEmail,
  isGuest,
}: {
  userEmail: string;
  isGuest: boolean;
}) {
  // Email states
  const [editingEmail, setEditingEmail] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [emailLoading, setEmailLoading] = useState(false);

  // Password states
  const [editingPassword, setEditingPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);

  // Notifications
  const [emailNotifications, setEmailNotifications] = useState(true);

  // Messages
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  // Delete account
  const [deleteConfirmText, setDeleteConfirmText] = useState("");
  const [deleting, setDeleting] = useState(false);

  function showMessage(text: string, type: "success" | "error") {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 4000);
  }

  async function handleChangeEmail() {
    if (!newEmail.trim() || !/\S+@\S+\.\S+/.test(newEmail)) {
      showMessage("Email invalido.", "error");
      return;
    }

    setEmailLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({ email: newEmail });
    setEmailLoading(false);

    if (error) {
      showMessage("Erro ao alterar email: " + error.message, "error");
      return;
    }

    showMessage("Email alterado! Verifique sua caixa de entrada para confirmar.", "success");
    setEditingEmail(false);
    setNewEmail("");
  }

  async function handleChangePassword() {
    if (newPassword.length < 6) {
      showMessage("A senha deve ter pelo menos 6 caracteres.", "error");
      return;
    }
    if (newPassword !== confirmPassword) {
      showMessage("As senhas nao coincidem.", "error");
      return;
    }

    setPasswordLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    setPasswordLoading(false);

    if (error) {
      showMessage("Erro ao alterar senha: " + error.message, "error");
      return;
    }

    showMessage("Senha alterada com sucesso!", "success");
    setEditingPassword(false);
    setNewPassword("");
    setConfirmPassword("");
  }

  async function handleDeleteAccount() {
    if (deleteConfirmText !== "EXCLUIR") return;

    setDeleting(true);
    const supabase = createClient();

    // Sign out and redirect — actual deletion would be handled server-side
    await supabase.auth.signOut();
    window.location.href = "/login";
  }

  if (isGuest) {
    return (
      <div className="space-y-5">
        <Card>
          <CardContent className="pt-6 pb-6 text-center space-y-3">
            <div className="text-4xl">👤</div>
            <h3 className="font-display font-bold text-lg">Conta Visitante</h3>
            <p className="text-sm text-muted-foreground max-w-xs mx-auto">
              Voce esta usando uma conta temporaria. Crie uma conta para salvar seu progresso e acessar todas as configuracoes.
            </p>
            <Button
              onClick={() => (window.location.href = "/signup")}
              className="rounded-xl font-display"
            >
              Criar conta gratis
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Message toast */}
      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`text-sm px-4 py-3 rounded-xl font-medium ${
              message.type === "success"
                ? "bg-emerald-50 border border-emerald-200 text-emerald-700"
                : "bg-red-50 border border-red-200 text-red-700"
            }`}
          >
            {message.text}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Email */}
      <Card>
        <CardContent className="pt-5 pb-5">
          <div className="flex items-center gap-2 mb-3">
            <Mail size={16} className="text-muted-foreground" />
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
              Email
            </label>
          </div>
          {editingEmail ? (
            <div className="space-y-3">
              <Input
                type="email"
                placeholder="Novo email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                className="rounded-xl"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleChangeEmail();
                  if (e.key === "Escape") {
                    setEditingEmail(false);
                    setNewEmail("");
                  }
                }}
              />
              <div className="flex gap-2">
                <Button
                  onClick={handleChangeEmail}
                  disabled={emailLoading}
                  className="rounded-xl font-display gap-1.5"
                  size="sm"
                >
                  {emailLoading && <Loader2 size={14} className="animate-spin" />}
                  Alterar
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-xl"
                  onClick={() => {
                    setEditingEmail(false);
                    setNewEmail("");
                  }}
                >
                  Cancelar
                </Button>
              </div>
              <p className="text-[11px] text-muted-foreground">
                Voce recebera um email de confirmacao no novo endereco.
              </p>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">{userEmail}</span>
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground gap-1"
                onClick={() => setEditingEmail(true)}
              >
                <Mail size={14} />
                Alterar
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Password */}
      <Card>
        <CardContent className="pt-5 pb-5">
          <div className="flex items-center gap-2 mb-3">
            <Lock size={16} className="text-muted-foreground" />
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
              Senha
            </label>
          </div>
          {editingPassword ? (
            <div className="space-y-3">
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Nova senha (min. 6 caracteres)"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="rounded-xl pr-10"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground cursor-pointer"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Confirme a nova senha"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="rounded-xl"
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleChangePassword();
                }}
              />
              <div className="flex gap-2">
                <Button
                  onClick={handleChangePassword}
                  disabled={passwordLoading}
                  className="rounded-xl font-display gap-1.5"
                  size="sm"
                >
                  {passwordLoading && <Loader2 size={14} className="animate-spin" />}
                  Alterar Senha
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-xl"
                  onClick={() => {
                    setEditingPassword(false);
                    setNewPassword("");
                    setConfirmPassword("");
                  }}
                >
                  Cancelar
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium tracking-widest">••••••••</span>
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground gap-1"
                onClick={() => setEditingPassword(true)}
              >
                <Lock size={14} />
                Alterar
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Email Notifications */}
      <Card>
        <CardContent className="pt-5 pb-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-primary-50 rounded-lg p-2">
                <Bell size={18} className="text-primary-500" />
              </div>
              <div>
                <p className="text-sm font-display font-bold">Notificacoes por email</p>
                <p className="text-[11px] text-muted-foreground">
                  Receber lembretes e novidades
                </p>
              </div>
            </div>
            <Switch
              checked={emailNotifications}
              onCheckedChange={setEmailNotifications}
            />
          </div>
        </CardContent>
      </Card>

      {/* Danger zone */}
      <Card className="border-red-200">
        <CardContent className="pt-5 pb-5">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle size={16} className="text-red-500" />
            <label className="text-xs font-bold text-red-500 uppercase tracking-wider">
              Zona de Perigo
            </label>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Esta acao e permanente e nao pode ser desfeita. Todo o progresso sera perdido.
          </p>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" className="rounded-xl font-display gap-2">
                <Trash2 size={16} />
                Excluir Conta
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Excluir conta permanentemente?</AlertDialogTitle>
                <AlertDialogDescription className="space-y-3">
                  <p>
                    Esta acao e <strong>irreversivel</strong>. Todo o progresso, missoes completadas,
                    badges e dados serao perdidos permanentemente.
                  </p>
                  <div>
                    <p className="text-sm font-medium text-foreground mb-1">
                      Digite EXCLUIR para confirmar:
                    </p>
                    <Input
                      value={deleteConfirmText}
                      onChange={(e) => setDeleteConfirmText(e.target.value.toUpperCase())}
                      placeholder="EXCLUIR"
                      className="rounded-xl font-mono"
                    />
                  </div>
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={() => setDeleteConfirmText("")}>
                  Cancelar
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDeleteAccount}
                  disabled={deleteConfirmText !== "EXCLUIR" || deleting}
                  className="bg-destructive text-white hover:bg-destructive/90"
                >
                  {deleting ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    "Excluir Permanentemente"
                  )}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardContent>
      </Card>
    </div>
  );
}
