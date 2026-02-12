"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { MissionPath } from "@/components/dashboard/mission-path";
import type { AgeGroup, ChapterWithProgress, Mission } from "@/lib/types";
import { AGE_GROUP_LABELS } from "@/lib/types";

const AGE_GROUP_ICONS: Record<AgeGroup, string> = {
  "7-9": "🌱",
  "10-12": "🌿",
  "13-15": "🌳",
};

type Props = {
  currentAgeGroup: AgeGroup;
  completedAgeGroups: string[];
  childId: string;
  // Initial data for the current age group
  initialChapters: ChapterWithProgress[];
  initialActiveChapterIndex: number;
  initialMissions: Mission[];
  initialCompletedMissionIds: string[];
  allChaptersCompleted: boolean;
  examPassed: boolean;
};

export function AgeGroupTabs({
  currentAgeGroup,
  completedAgeGroups,
  childId,
  initialChapters,
  initialActiveChapterIndex,
  initialMissions,
  initialCompletedMissionIds,
  allChaptersCompleted,
  examPassed,
}: Props) {
  const [selectedGroup, setSelectedGroup] = useState<AgeGroup>(currentAgeGroup);
  const [loading, setLoading] = useState(false);
  const [otherGroupData, setOtherGroupData] = useState<{
    chapters: ChapterWithProgress[];
    activeChapterIndex: number;
    missions: Mission[];
    completedMissionIds: string[];
  } | null>(null);

  // All available groups: completed + current
  const availableGroups: AgeGroup[] = [
    ...(completedAgeGroups as AgeGroup[]),
    currentAgeGroup,
  ].sort((a, b) => {
    const order: AgeGroup[] = ["7-9", "10-12", "13-15"];
    return order.indexOf(a) - order.indexOf(b);
  });

  // Remove duplicates
  const uniqueGroups = [...new Set(availableGroups)];

  const fetchGroupData = useCallback(
    async (group: AgeGroup) => {
      if (group === currentAgeGroup) {
        setOtherGroupData(null);
        return;
      }

      setLoading(true);
      const supabase = createClient();

      // Fetch chapters for the selected group
      const { data: chaptersData } = await supabase
        .from("chapters")
        .select("*")
        .eq("age_group", group)
        .order("order_position", { ascending: true });

      if (!chaptersData) {
        setLoading(false);
        return;
      }

      // Fetch progress
      const chapterIds = chaptersData.map((c) => c.id);
      const { data: progressData } = await supabase
        .from("user_progress")
        .select("chapter_id, status, missions_completed, total_score")
        .eq("child_id", childId)
        .in("chapter_id", chapterIds);

      const progressMap = new Map(
        (progressData ?? []).map((p) => [p.chapter_id, p])
      );

      const chapters: ChapterWithProgress[] = chaptersData.map((ch) => {
        const prog = progressMap.get(ch.id);
        return {
          ...ch,
          status: (prog?.status as ChapterWithProgress["status"]) ?? "locked",
          missions_completed: prog?.missions_completed ?? 0,
          total_score: prog?.total_score ?? 0,
        };
      });

      // Find active chapter
      const activeIdx = chapters.findIndex(
        (c) => c.status === "unlocked" || c.status === "in_progress"
      );
      const activeChapterIndex = activeIdx >= 0 ? activeIdx : 0;

      // Fetch missions for active chapter
      const activeChapter = chapters[activeChapterIndex];
      let missions: Mission[] = [];
      let completedMissionIds: string[] = [];

      if (activeChapter && activeChapter.status !== "locked") {
        const { data: missionsData } = await supabase
          .from("missions")
          .select("*")
          .eq("chapter_id", activeChapter.id)
          .order("order_position", { ascending: true });

        missions = (missionsData ?? []) as Mission[];

        const missionIds = missions.map((m) => m.id);
        if (missionIds.length > 0) {
          const { data: attempts } = await supabase
            .from("mission_attempts")
            .select("mission_id")
            .eq("child_id", childId)
            .eq("is_correct", true)
            .in("mission_id", missionIds);

          completedMissionIds = [
            ...new Set((attempts ?? []).map((a) => a.mission_id)),
          ];
        }
      }

      setOtherGroupData({
        chapters,
        activeChapterIndex,
        missions,
        completedMissionIds,
      });
      setLoading(false);
    },
    [childId, currentAgeGroup]
  );

  const handleTabChange = (group: AgeGroup) => {
    setSelectedGroup(group);
    fetchGroupData(group);
  };

  // Don't show tabs if there's only one group
  if (uniqueGroups.length <= 1) {
    return (
      <MissionPath
        chapters={initialChapters}
        activeChapterIndex={initialActiveChapterIndex}
        missions={initialMissions}
        completedMissionIds={initialCompletedMissionIds}
        childId={childId}
        allChaptersCompleted={allChaptersCompleted}
        examPassed={examPassed}
        ageGroup={currentAgeGroup}
      />
    );
  }

  const isViewingCurrent = selectedGroup === currentAgeGroup;
  const chapters = isViewingCurrent
    ? initialChapters
    : otherGroupData?.chapters ?? [];
  const activeChapterIndex = isViewingCurrent
    ? initialActiveChapterIndex
    : otherGroupData?.activeChapterIndex ?? 0;
  const missions = isViewingCurrent
    ? initialMissions
    : otherGroupData?.missions ?? [];
  const completedMissionIds = isViewingCurrent
    ? initialCompletedMissionIds
    : otherGroupData?.completedMissionIds ?? [];

  // For other groups, all chapters should be completed (since the group is in completedAgeGroups)
  const viewAllCompleted = isViewingCurrent
    ? allChaptersCompleted
    : true;

  return (
    <div className="space-y-4">
      {/* Age group tabs */}
      <div className="flex gap-2 p-1 bg-muted/50 rounded-xl">
        {uniqueGroups.map((group) => {
          const isActive = group === selectedGroup;
          const isCompleted = completedAgeGroups.includes(group);
          const isCurrent = group === currentAgeGroup;

          return (
            <button
              key={group}
              onClick={() => handleTabChange(group)}
              className={`relative flex-1 flex items-center justify-center gap-1.5 rounded-lg px-3 py-2.5 text-sm font-display font-bold transition-all cursor-pointer ${
                isActive
                  ? "bg-white text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground/70"
              }`}
            >
              {isActive && (
                <motion.div
                  className="absolute inset-0 bg-white rounded-lg shadow-sm"
                  layoutId="activeTab"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-1.5">
                <span>{AGE_GROUP_ICONS[group]}</span>
                <span className="hidden sm:inline">
                  {AGE_GROUP_LABELS[group]}
                </span>
                <span className="sm:hidden">{group}</span>
                {isCompleted && !isCurrent && (
                  <span className="text-emerald-500 text-[10px]">✓</span>
                )}
              </span>
            </button>
          );
        })}
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 size={32} className="text-muted-foreground animate-spin" />
        </div>
      ) : chapters.length > 0 ? (
        <MissionPath
          chapters={chapters}
          activeChapterIndex={activeChapterIndex}
          missions={missions}
          completedMissionIds={completedMissionIds}
          childId={childId}
          allChaptersCompleted={viewAllCompleted}
          examPassed={isViewingCurrent ? examPassed : true}
          ageGroup={selectedGroup}
        />
      ) : null}
    </div>
  );
}
