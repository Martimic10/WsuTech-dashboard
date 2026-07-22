"use client";

import { MoreVertical } from "lucide-react";

import { CourseCard } from "@/components/dashboard/course-card";
import { DashboardAside } from "@/components/dashboard/dashboard-aside";
import { Button } from "@/components/ui/button";
import type { Course, FeedbackItem, TodoItem } from "@/types";

type DashboardViewProps = {
  courses: Course[];
  todos: TodoItem[];
  feedback: FeedbackItem[];
};

export function DashboardView({
  courses,
  todos,
  feedback,
}: DashboardViewProps) {
  return (
    <div className="min-h-full overflow-y-auto">
      <div className="flex items-center justify-between border-b border-border px-3 py-3.5 sm:px-4 md:px-6 md:py-4">
        <h1 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl md:text-[1.75rem]">
          Dashboard
        </h1>
        <Button
          variant="ghost"
          size="icon"
          className="size-9 text-muted-foreground"
          aria-label="Dashboard options"
        >
          <MoreVertical className="size-5" />
        </Button>
      </div>

      <div className="flex flex-col gap-6 px-3 py-4 sm:px-4 md:px-6 md:py-5 lg:flex-row lg:gap-10">
        <div className="min-w-0 flex-1">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3">
            {courses.map((course, index) => (
              <CourseCard key={course.id} course={course} index={index} />
            ))}
          </div>
        </div>

        <DashboardAside todos={todos} feedback={feedback} />
      </div>
    </div>
  );
}
