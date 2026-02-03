"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface SectionItem {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface SectionCarouselProps {
  items: SectionItem[];
}

export function SectionCarousel({ items }: SectionCarouselProps) {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c === 0 ? items.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === items.length - 1 ? 0 : c + 1));

  return (
    <>
      {/* Desktop: grid */}
      <div className="hidden md:grid md:grid-cols-3 gap-6">
        {items.map((item, i) => (
          <div key={i} className="card-zapfy text-center space-y-4">
            <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-zapfy-mint flex items-center justify-center">
              {item.icon}
            </div>
            <h3 className="text-lg font-display font-bold">{item.title}</h3>
            <p className="text-muted-foreground text-sm">{item.description}</p>
          </div>
        ))}
      </div>

      {/* Mobile: carousel */}
      <div className="md:hidden">
        <div className="card-zapfy text-center space-y-4 min-h-[200px]">
          <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-zapfy-mint flex items-center justify-center">
            {items[current].icon}
          </div>
          <h3 className="text-lg font-display font-bold">
            {items[current].title}
          </h3>
          <p className="text-muted-foreground text-sm">
            {items[current].description}
          </p>
        </div>
        <div className="flex items-center justify-center gap-4 mt-4">
          <button
            onClick={prev}
            className="p-2 rounded-full bg-muted hover:bg-muted/80 cursor-pointer"
          >
            <ChevronLeft size={20} />
          </button>
          <div className="flex gap-2">
            {items.map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full transition-colors ${
                  i === current ? "bg-primary-500" : "bg-muted-foreground/30"
                }`}
              />
            ))}
          </div>
          <button
            onClick={next}
            className="p-2 rounded-full bg-muted hover:bg-muted/80 cursor-pointer"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </>
  );
}
