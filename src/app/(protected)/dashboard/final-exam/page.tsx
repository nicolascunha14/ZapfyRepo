import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { FinalExamPlayer } from "@/components/dashboard/final-exam-player";
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import type { AgeGroup, FinalExam } from "@/lib/types";
import { AGE_GROUP_LABELS, NEXT_AGE_GROUP } from "@/lib/types";

export const metadata: Metadata = {
  title: "Prova Final - Zapfy",
};

export default async function FinalExamPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: child } = await supabase
    .from("children")
    .select("id, age_group")
    .eq("parent_id", user.id)
    .limit(1)
    .single();

  if (!child) redirect("/dashboard");

  const ageGroup = child.age_group as AgeGroup;

  // Check if all 9 chapters are completed
  const { data: chapters } = await supabase
    .from("chapters")
    .select("id")
    .eq("age_group", ageGroup);

  if (!chapters || chapters.length === 0) redirect("/dashboard");

  const chapterIds = chapters.map((c) => c.id);

  const { data: progress } = await supabase
    .from("user_progress")
    .select("chapter_id, status")
    .eq("child_id", child.id)
    .in("chapter_id", chapterIds);

  const allCompleted =
    progress &&
    progress.length === chapters.length &&
    progress.every((p) => p.status === "completed");

  if (!allCompleted) redirect("/dashboard");

  // Check if already passed this exam
  const { data: passedExam } = await supabase
    .from("exam_attempts")
    .select("id, questions_correct")
    .eq("child_id", child.id)
    .eq("age_group", ageGroup)
    .eq("passed", true)
    .limit(1)
    .single();

  if (passedExam) {
    const nextGroup = NEXT_AGE_GROUP[ageGroup];
    return (
      <div className="max-w-md mx-auto text-center space-y-6 py-12">
        <div className="w-20 h-20 mx-auto rounded-full bg-emerald-100 flex items-center justify-center">
          <CheckCircle2 size={40} className="text-emerald-500" />
        </div>
        <h1 className="font-display font-bold text-2xl text-foreground">
          Prova já aprovada!
        </h1>
        <p className="text-muted-foreground">
          Você já passou na prova final do nível {AGE_GROUP_LABELS[ageGroup]}{" "}
          com {passedExam.questions_correct} acertos.
          {nextGroup && (
            <>
              {" "}
              Agora você está no nível{" "}
              <span className="font-bold text-primary-500">
                {AGE_GROUP_LABELS[nextGroup]}
              </span>
              !
            </>
          )}
        </p>
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 rounded-xl bg-primary-500 px-6 py-3 text-white font-display font-bold hover:bg-primary-600 transition-colors"
        >
          Voltar ao Dashboard
        </Link>
      </div>
    );
  }

  // Fetch final exam questions
  const { data: questions } = await supabase
    .from("final_exams")
    .select("*")
    .eq("age_group", ageGroup)
    .order("question_number", { ascending: true });

  if (!questions || questions.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <GraduationCap size={40} className="mx-auto text-muted-foreground mb-3" />
          <p className="text-muted-foreground">
            Prova final ainda não disponível para esta faixa.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <FinalExamPlayer
      questions={questions as FinalExam[]}
      childId={child.id}
      ageGroup={ageGroup}
    />
  );
}
