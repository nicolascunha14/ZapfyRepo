"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  UserPlus,
  UserCheck,
  UserX,
  Users,
  Search,
  X,
  Check,
  Trash2,
  Loader2,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/client";
import { getLevel } from "@/lib/types";

type Friend = {
  id: string;
  name: string;
  age_group: string;
  total_points: number;
};

type FriendRequest = {
  id: string;
  requester: Friend;
};

export function FriendsManager({
  childId,
  initialFriends,
  initialPendingRequests,
}: {
  childId: string;
  initialFriends: Friend[];
  initialPendingRequests: FriendRequest[];
}) {
  const [friends, setFriends] = useState(initialFriends);
  const [pendingRequests, setPendingRequests] = useState(initialPendingRequests);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    text: string;
    type: "success" | "error";
  } | null>(null);

  async function handleAddFriend(e: React.FormEvent) {
    e.preventDefault();
    if (!code.trim() || loading) return;

    setLoading(true);
    setMessage(null);

    const supabase = createClient();
    const trimmedCode = code.trim().toUpperCase();

    try {
      // Find user by referral code
      const { data: referralUser } = await supabase
        .from("users")
        .select("id")
        .eq("referral_code", trimmedCode)
        .single();

      if (!referralUser) {
        setMessage({ text: "Codigo nao encontrado.", type: "error" });
        return;
      }

      // Find their child
      const { data: friendChild } = await supabase
        .from("children")
        .select("id, name, age_group, total_points")
        .eq("parent_id", referralUser.id)
        .limit(1)
        .single();

      if (!friendChild) {
        setMessage({ text: "Nenhuma crianca encontrada com esse codigo.", type: "error" });
        return;
      }

      if (friendChild.id === childId) {
        setMessage({ text: "Voce nao pode adicionar a si mesmo!", type: "error" });
        return;
      }

      // Check if friendship already exists (either direction)
      const { data: existing } = await supabase
        .from("friendships")
        .select("id, status")
        .or(
          `and(requester_id.eq.${childId},addressee_id.eq.${friendChild.id}),and(requester_id.eq.${friendChild.id},addressee_id.eq.${childId})`
        );

      if (existing && existing.length > 0) {
        const friendship = existing[0];
        if (friendship.status === "accepted") {
          setMessage({ text: "Voces ja sao amigos!", type: "error" });
        } else if (friendship.status === "pending") {
          setMessage({ text: "Solicitacao ja enviada!", type: "error" });
        } else {
          setMessage({ text: "Solicitacao ja existe.", type: "error" });
        }
        return;
      }

      // Create friendship request
      const { error } = await supabase.from("friendships").insert({
        requester_id: childId,
        addressee_id: friendChild.id,
        status: "pending",
      });

      if (error) {
        setMessage({ text: "Erro ao enviar solicitacao.", type: "error" });
        return;
      }

      setMessage({
        text: `Solicitacao enviada para ${friendChild.name}!`,
        type: "success",
      });
      setCode("");
    } finally {
      setLoading(false);
    }
  }

  async function handleAccept(requestId: string, requester: Friend) {
    const supabase = createClient();
    const { error } = await supabase
      .from("friendships")
      .update({ status: "accepted" })
      .eq("id", requestId);

    if (!error) {
      setPendingRequests((prev) => prev.filter((r) => r.id !== requestId));
      setFriends((prev) =>
        [...prev, requester].sort((a, b) => b.total_points - a.total_points)
      );
    }
  }

  async function handleReject(requestId: string) {
    const supabase = createClient();
    const { error } = await supabase
      .from("friendships")
      .update({ status: "rejected" })
      .eq("id", requestId);

    if (!error) {
      setPendingRequests((prev) => prev.filter((r) => r.id !== requestId));
    }
  }

  async function handleRemoveFriend(friendId: string) {
    const supabase = createClient();
    const { error } = await supabase
      .from("friendships")
      .delete()
      .or(
        `and(requester_id.eq.${childId},addressee_id.eq.${friendId}),and(requester_id.eq.${friendId},addressee_id.eq.${childId})`
      );

    if (!error) {
      setFriends((prev) => prev.filter((f) => f.id !== friendId));
    }
  }

  return (
    <div className="space-y-5">
      {/* Add friend form */}
      <div>
        <h3 className="font-display font-bold text-sm mb-2 flex items-center gap-2">
          <UserPlus size={16} className="text-primary-500" />
          Adicionar Amigo
        </h3>
        <form onSubmit={handleAddFriend} className="flex gap-2">
          <div className="relative flex-1">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground/50"
            />
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              placeholder="Codigo do amigo"
              maxLength={8}
              className="w-full h-10 rounded-xl border border-border/50 bg-white pl-9 pr-3 text-sm font-mono tracking-wider
                         outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all"
            />
          </div>
          <button
            type="submit"
            disabled={loading || !code.trim()}
            className="h-10 px-4 rounded-xl bg-primary-500 text-white font-display font-bold text-sm
                       hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all
                       flex items-center gap-1.5 cursor-pointer shrink-0"
          >
            {loading ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <UserPlus size={16} />
            )}
            Adicionar
          </button>
        </form>
        <AnimatePresence>
          {message && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={`text-xs mt-2 ${
                message.type === "success"
                  ? "text-emerald-600"
                  : "text-red-500"
              }`}
            >
              {message.text}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Pending requests */}
      {pendingRequests.length > 0 && (
        <div>
          <h3 className="font-display font-bold text-sm mb-2 flex items-center gap-2">
            <UserCheck size={16} className="text-amber-500" />
            Solicitacoes Pendentes
            <span className="text-xs bg-amber-100 text-amber-600 px-2 py-0.5 rounded-full font-medium">
              {pendingRequests.length}
            </span>
          </h3>
          <div className="space-y-2">
            {pendingRequests.map((req) => (
              <motion.div
                key={req.id}
                layout
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
              >
                <Card className="p-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                      <UserPlus size={14} className="text-amber-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-display font-bold text-sm truncate">
                        {req.requester.name}
                      </p>
                      <p className="text-[10px] text-muted-foreground">
                        {getLevel(req.requester.total_points).name} ·{" "}
                        {req.requester.total_points} pts
                      </p>
                    </div>
                    <div className="flex gap-1.5 shrink-0">
                      <button
                        type="button"
                        onClick={() => handleAccept(req.id, req.requester)}
                        className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center
                                   hover:bg-emerald-200 transition-colors cursor-pointer"
                      >
                        <Check size={16} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleReject(req.id)}
                        className="w-8 h-8 rounded-lg bg-red-100 text-red-500 flex items-center justify-center
                                   hover:bg-red-200 transition-colors cursor-pointer"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Friends list */}
      <div>
        <h3 className="font-display font-bold text-sm mb-2 flex items-center gap-2">
          <Users size={16} className="text-primary-500" />
          Amigos
          <span className="text-xs bg-primary-100 text-primary-600 px-2 py-0.5 rounded-full font-medium">
            {friends.length}
          </span>
        </h3>
        {friends.length === 0 ? (
          <p className="text-sm text-muted-foreground py-4 text-center">
            Nenhum amigo ainda. Use o codigo acima para adicionar!
          </p>
        ) : (
          <div className="space-y-2">
            {friends.map((friend) => (
              <motion.div
                key={friend.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-white border border-border/50">
                  <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center shrink-0">
                    <UserCheck size={14} className="text-primary-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-display font-bold text-sm truncate">
                      {friend.name}
                    </p>
                    <p className="text-[10px] text-muted-foreground">
                      {friend.age_group} anos ·{" "}
                      {getLevel(friend.total_points).name} ·{" "}
                      {friend.total_points} pts
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveFriend(friend.id)}
                    className="w-7 h-7 rounded-lg text-muted-foreground/40 flex items-center justify-center
                               hover:bg-red-50 hover:text-red-400 transition-colors cursor-pointer shrink-0"
                    title="Remover amigo"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
