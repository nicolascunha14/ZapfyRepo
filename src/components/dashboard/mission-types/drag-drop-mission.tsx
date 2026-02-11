"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { GripVertical, Check } from "lucide-react";

type Category = { id: string; label: string };
type DragItem = { id: string; text: string };
type DragDropContent = {
  question: string;
  categories: Category[];
  items: DragItem[];
};

export function DragDropMission({
  content,
  correctAnswer,
  onAnswer,
  disabled,
}: {
  content: Record<string, unknown>;
  correctAnswer: Record<string, unknown>;
  onAnswer: (answer: Record<string, unknown>, isCorrect: boolean) => void;
  disabled: boolean;
}) {
  const dd = content as unknown as DragDropContent;
  const correct = correctAnswer as Record<string, string[]>;

  // State: which items are placed in which category
  const [placements, setPlacements] = useState<Record<string, string[]>>(() => {
    const initial: Record<string, string[]> = {};
    dd.categories.forEach((cat) => (initial[cat.id] = []));
    return initial;
  });

  // Items not yet placed
  const placedItemIds = Object.values(placements).flat();
  const unplacedItems = dd.items.filter((item) => !placedItemIds.includes(item.id));

  // Currently selected item for tap-to-place
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  function handleItemTap(itemId: string) {
    if (disabled) return;
    setSelectedItem(selectedItem === itemId ? null : itemId);
  }

  function handleCategoryTap(catId: string) {
    if (disabled || !selectedItem) return;

    setPlacements((prev) => {
      const updated = { ...prev };
      // Remove from any existing category
      Object.keys(updated).forEach((key) => {
        updated[key] = updated[key].filter((id) => id !== selectedItem);
      });
      // Add to selected category
      updated[catId] = [...(updated[catId] || []), selectedItem];
      return updated;
    });
    setSelectedItem(null);
  }

  function handleRemoveFromCategory(catId: string, itemId: string) {
    if (disabled) return;
    setPlacements((prev) => ({
      ...prev,
      [catId]: prev[catId].filter((id) => id !== itemId),
    }));
  }

  function handleSubmit() {
    if (disabled) return;

    // Check if all items are placed
    if (unplacedItems.length > 0) return;

    // Compare with correct answer
    let isCorrect = true;
    for (const catId of Object.keys(correct)) {
      const expected = [...correct[catId]].sort();
      const actual = [...(placements[catId] || [])].sort();
      if (JSON.stringify(expected) !== JSON.stringify(actual)) {
        isCorrect = false;
        break;
      }
    }

    onAnswer({ placements }, isCorrect);
  }

  const getItemText = (id: string) => dd.items.find((i) => i.id === id)?.text || id;

  return (
    <div className="flex flex-col space-y-6">
      <motion.h3
        className="text-xl md:text-2xl font-display font-bold text-foreground text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {dd.question}
      </motion.h3>

      {/* Unplaced items */}
      {unplacedItems.length > 0 && (
        <div className="flex flex-wrap gap-2 justify-center">
          {unplacedItems.map((item) => (
            <motion.button
              key={item.id}
              onClick={() => handleItemTap(item.id)}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl border-2 font-medium text-sm transition-all cursor-pointer
                ${selectedItem === item.id
                  ? "border-primary-400 bg-primary-100 text-primary-700 scale-105"
                  : "border-border bg-white hover:border-primary-300"
                }`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              whileTap={{ scale: 0.95 }}
            >
              <GripVertical size={14} className="text-muted-foreground" />
              {item.text}
            </motion.button>
          ))}
        </div>
      )}

      {selectedItem && (
        <p className="text-center text-xs text-primary-500 font-medium">
          Toque na categoria para colocar o item
        </p>
      )}

      {/* Categories */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg mx-auto w-full">
        {dd.categories.map((cat) => (
          <motion.div
            key={cat.id}
            onClick={() => handleCategoryTap(cat.id)}
            className={`rounded-xl border-2 p-3 min-h-[100px] transition-all
              ${selectedItem
                ? "border-dashed border-primary-400 bg-primary-50/50 cursor-pointer hover:bg-primary-100/50"
                : "border-border bg-muted/30"
              }`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="text-sm font-display font-bold text-foreground mb-2">{cat.label}</p>
            <div className="flex flex-wrap gap-1.5">
              {(placements[cat.id] || []).map((itemId) => (
                <button
                  key={itemId}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveFromCategory(cat.id, itemId);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-primary-100 text-primary-700 text-xs font-medium hover:bg-primary-200 transition-colors cursor-pointer"
                >
                  {getItemText(itemId)} x
                </button>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Submit */}
      <motion.button
        onClick={handleSubmit}
        disabled={disabled || unplacedItems.length > 0}
        className="w-full max-w-xs mx-auto rounded-full bg-primary-500 px-6 py-3.5 text-white font-display font-semibold hover:bg-primary-600 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
        whileTap={{ scale: 0.97 }}
      >
        Confirmar
      </motion.button>
    </div>
  );
}
