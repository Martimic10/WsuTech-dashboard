"use client";

import { CourseModules } from "@/components/course/course-modules";
import type { CourseDetail } from "@/types";

type CourseModulesViewProps = {
  course: CourseDetail;
};

export function CourseModulesView({ course }: CourseModulesViewProps) {
  return (
    <div className="px-3 py-4 sm:px-4 md:px-6 md:py-5">
      <CourseModules
        modules={course.modules}
        title="Modules"
        showCollapseToggle
      />
    </div>
  );
}
