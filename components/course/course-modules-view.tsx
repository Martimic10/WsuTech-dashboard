"use client";

import { CourseModules } from "@/components/course/course-modules";
import type { CourseDetail } from "@/types";

type CourseModulesViewProps = {
  course: CourseDetail;
};

export function CourseModulesView({ course }: CourseModulesViewProps) {
  return (
    <div className="px-4 py-5 md:px-6">
      <CourseModules
        modules={course.modules}
        title="Modules"
        showCollapseToggle
      />
    </div>
  );
}
