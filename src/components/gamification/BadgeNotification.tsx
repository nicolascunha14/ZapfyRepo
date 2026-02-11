"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Badge {
  slug: string;
  name: string;
  icon: string;
  description: string;
}

interface BadgeNotificationProps {
  badges: Badge[];
  onDismiss?: (slug: string) => void;
}

export function BadgeNotification({ badges, onDismiss }: BadgeNotificationProps) {
  const [queue, setQueue] = useState<Badge[]>([]);
  const [current, setCurrent] = useState<Badge | null>(null);

  useEffect(() => {
    if (badges.length > 0) {
      setQueue((prev) => [...prev, ...badges]);
    }
  }, [badges]);

  const showNext = useCallback(() => {
    if (queue.length > 0) {
      const [next, ...rest] = queue;
      setCurrent(next);
      setQueue(rest);
    } else {
      setCurrent(null);
    }
  }, [queue]);

  useEffect(() => {
    if (!current && queue.length > 0) {
      showNext();
    }
  }, [current, queue, showNext]);

  useEffect(() => {
    if (current) {
      const timeout = setTimeout(() => {
        onDismiss?.(current.slug);
        setCurrent(null);
      }, 4000);
      return () => clearTimeout(timeout);
    }
  }, [current, onDismiss]);

  return (
    <div className="fixed bottom-24 lg:bottom-6 right-4 z-40">
      <AnimatePresence mode="wait">
        {current && (
          <motion.div
            key={current.slug}
            className="bg-card border border-border rounded-2xl p-4 shadow-xl flex items-center gap-3 min-w-[280px]"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <motion.span
              className="text-4xl"
              animate={{ scale: [1, 1.3, 1], rotate: [0, 10, -10, 0] }}
              transition={{ duration: 0.6 }}
            >
              {current.icon}
            </motion.span>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-amber-500 font-bold uppercase tracking-wide">
                Nova conquista!
              </p>
              <p className="font-display font-bold text-sm text-foreground truncate">
                {current.name}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {current.description}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
