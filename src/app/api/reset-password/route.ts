import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

function getSupabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

function getResend() {
  return new Resend(process.env.RESEND_API_KEY!);
}

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email obrigatório" }, { status: 400 });
    }

    // Generate password reset link via Supabase Admin
    const { data, error } = await getSupabaseAdmin().auth.admin.generateLink({
      type: "recovery",
      email,
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || "https://zapfy.app"}/auth/confirm?next=/update-password`,
      },
    });

    if (error) {
      console.error("[reset-password] generateLink error:", error.message);
      // Don't reveal if user exists or not
      return NextResponse.json({ success: true });
    }

    const tokenHash = data.properties?.hashed_token;
    if (!tokenHash) {
      console.error("[reset-password] No hashed_token in response");
      return NextResponse.json({ success: true });
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://zapfy.app";
    const resetLink = `${siteUrl}/auth/confirm?token_hash=${tokenHash}&type=recovery`;

    // Send email via Resend
    const { error: emailError } = await getResend().emails.send({
      from: "Zapfy <noreply@zapfy.app>",
      to: email,
      subject: "Redefinir sua senha - Zapfy",
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 480px; margin: 0 auto; padding: 40px 20px;">
          <div style="text-align: center; margin-bottom: 32px;">
            <h1 style="color: #1E88E5; font-size: 28px; margin: 0;">⚡ Zapfy</h1>
          </div>
          <div style="background: #f8fafc; border-radius: 16px; padding: 32px; text-align: center;">
            <h2 style="color: #1e293b; font-size: 20px; margin: 0 0 12px;">Redefinir sua senha</h2>
            <p style="color: #64748b; font-size: 14px; line-height: 1.6; margin: 0 0 24px;">
              Recebemos uma solicitação para redefinir a senha da sua conta Zapfy.
              Clique no botão abaixo para criar uma nova senha.
            </p>
            <a href="${resetLink}"
               style="display: inline-block; background: linear-gradient(135deg, #1E88E5, #42A5F5); color: white;
                      text-decoration: none; padding: 14px 32px; border-radius: 12px; font-weight: bold; font-size: 14px;">
              Redefinir Senha
            </a>
            <p style="color: #94a3b8; font-size: 12px; margin-top: 24px; line-height: 1.5;">
              Se você não solicitou a redefinição de senha, ignore este e-mail.<br>
              Este link expira em 1 hora.
            </p>
          </div>
          <p style="text-align: center; color: #cbd5e1; font-size: 11px; margin-top: 24px;">
            © 2026 Zapfy - Educação Financeira Gamificada
          </p>
        </div>
      `,
    });

    if (emailError) {
      console.error("[reset-password] Resend error:", emailError);
    }

    // Always return success (don't reveal if email exists)
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[reset-password] Unexpected error:", err);
    return NextResponse.json({ success: true });
  }
}
