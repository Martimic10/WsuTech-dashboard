"use client";

import { CheckCircle2, FileText, Megaphone, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import type { FeedbackItem, TodoItem } from "@/types";

type DashboardAsideProps = {
  todos: TodoItem[];
  feedback: FeedbackItem[];
};

export function DashboardAside({ todos, feedback }: DashboardAsideProps) {
  const [dismissed, setDismissed] = useState<string[]>([]);
  const visibleTodos = todos.filter((item) => !dismissed.includes(item.id));

  return (
    <aside className="w-full shrink-0 space-y-8 lg:w-[280px] xl:w-[300px]">
      <section>
        <h2 className="mb-3 text-base font-bold text-foreground">To Do</h2>
        <ul className="space-y-4">
          {visibleTodos.map((item) => {
            const Icon = item.type === "announcement" ? Megaphone : FileText;
            return (
              <li key={item.id} className="group flex gap-2.5">
                <Icon
                  className="mt-0.5 size-4 shrink-0 text-muted-foreground"
                  strokeWidth={1.75}
                />
                <div className="min-w-0 flex-1">
                  <Link
                    href={item.href}
                    className="text-sm font-medium text-link hover:underline"
                  >
                    {item.title}
                  </Link>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {item.courseCode}
                  </p>
                  <p className="text-xs text-muted-foreground">{item.dueLabel}</p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setDismissed((prev) => [...prev, item.id])
                  }
                  className="mt-0.5 rounded p-0.5 text-muted-foreground opacity-60 transition-opacity hover:bg-muted hover:opacity-100"
                  aria-label={`Dismiss ${item.title}`}
                >
                  <X className="size-3.5" />
                </button>
              </li>
            );
          })}
        </ul>
        <button
          type="button"
          className="mt-4 text-sm font-medium text-link hover:underline"
        >
          Show All
        </button>
      </section>

      <section>
        <h2 className="mb-3 text-base font-bold text-foreground">
          Recent Feedback
        </h2>
        <ul className="space-y-4">
          {feedback.map((item) => (
            <li key={item.id} className="flex gap-2.5">
              <CheckCircle2
                className="mt-0.5 size-4 shrink-0 text-emerald-600"
                strokeWidth={1.75}
              />
              <div className="min-w-0 flex-1">
                <Link
                  href={item.href}
                  className="text-sm font-medium text-link hover:underline"
                >
                  {item.title}
                </Link>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {item.courseCode}
                </p>
                <p className="text-xs text-muted-foreground">{item.scoreLabel}</p>
                <p className="mt-1 text-xs italic text-muted-foreground">
                  &ldquo;{item.comment}&rdquo;
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </aside>
  );
}
