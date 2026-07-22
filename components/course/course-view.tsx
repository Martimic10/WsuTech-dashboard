"use client";

import { CourseAside } from "@/components/course/course-aside";
import { CourseHome } from "@/components/course/course-home";
import { CourseShell } from "@/components/course/course-shell";
import type { CourseDetail } from "@/types";

type CourseViewProps = {
  course: CourseDetail;
};

export function CourseView({ course }: CourseViewProps) {
  return (
    <CourseShell
      course={course}
      breadcrumbs={[
        { label: course.title, href: `/courses/${course.slug}` },
        { label: "Modules" },
      ]}
    >
      <div className="flex min-h-full flex-col xl:flex-row">
        <div className="min-w-0 flex-1 px-4 py-5 md:px-6">
          <CourseHome
            announcements={course.announcements}
            modules={course.modules}
          />
        </div>
        <div className="border-t border-[#e8eaec] px-4 py-5 md:px-6 xl:border-t-0 xl:border-l">
          <CourseAside todos={course.todos} feedback={course.feedback} />
        </div>
      </div>
    </CourseShell>
  );
}
