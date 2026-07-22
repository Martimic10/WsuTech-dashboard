"use client";

import {
  Bell,
  CalendarDays,
  CheckCircle2,
  FileText,
  Megaphone,
  Radio,
  X,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import type { FeedbackItem, TodoItem } from "@/types";

type CourseAsideProps = {
  todos: TodoItem[];
  feedback: FeedbackItem[];
};

const ACTION_BUTTONS = [
  { label: "View Course Stream", icon: Radio },
  { label: "View Course Calendar", icon: CalendarDays },
  { label: "View Course Notifications", icon: Bell },
] as const;

export function CourseAside({ todos, feedback }: CourseAsideProps) {
  const [dismissed, setDismissed] = useState<string[]>([]);
  const visibleTodos = todos.filter((item) => !dismissed.includes(item.id));

  return (
    <aside className="w-full shrink-0 space-y-5 lg:w-[260px] xl:w-[280px]">
      <div className="flex flex-col gap-2">
        {ACTION_BUTTONS.map(({ label, icon: Icon }) => (
          <button
            key={label}
            type="button"
            className="flex items-center gap-2.5 rounded-md border border-[#c7cdd1] bg-[#f5f5f5] px-3 py-2.5 text-left text-sm font-medium text-[#2d3b45] transition-colors hover:bg-[#ebebeb]"
          >
            <Icon className="size-4 shrink-0 text-[#6b7780]" strokeWidth={1.75} />
            {label}
          </button>
        ))}
      </div>

      <section>
        <h2 className="mb-3 text-base font-bold text-[#2d3b45]">To Do</h2>
        <ul className="space-y-4">
          {visibleTodos.map((item) => {
            const Icon = item.type === "announcement" ? Megaphone : FileText;
            return (
              <li key={item.id} className="flex gap-2.5">
                <Icon
                  className="mt-0.5 size-4 shrink-0 text-[#6b7780]"
                  strokeWidth={1.75}
                />
                <div className="min-w-0 flex-1">
                  <Link
                    href={item.href}
                    className="text-sm font-medium text-[#0374B5] hover:underline"
                  >
                    {item.title}
                  </Link>
                  <p className="mt-0.5 text-xs text-[#6b7780]">{item.courseCode}</p>
                  <p className="text-xs text-[#6b7780]">{item.dueLabel}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setDismissed((prev) => [...prev, item.id])}
                  className="mt-0.5 rounded p-0.5 text-[#6b7780] opacity-60 transition-opacity hover:bg-[#f2f2f2] hover:opacity-100"
                  aria-label={`Dismiss ${item.title}`}
                >
                  <X className="size-3.5" />
                </button>
              </li>
            );
          })}
        </ul>
      </section>

      <section>
        <h2 className="mb-3 text-base font-bold text-[#2d3b45]">
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
                  className="text-sm font-medium text-[#0374B5] hover:underline"
                >
                  {item.title}
                </Link>
                <p className="mt-0.5 text-xs text-[#6b7780]">{item.courseCode}</p>
                <p className="text-xs text-[#6b7780]">{item.scoreLabel}</p>
                <p className="mt-1 text-xs italic text-[#6b7780]">
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
