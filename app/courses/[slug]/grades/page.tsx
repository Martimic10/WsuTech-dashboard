import { notFound } from "next/navigation";

import { CourseGrades } from "@/components/course/course-grades";
import { CourseShell } from "@/components/course/course-shell";
import { getCourseBySlug, getCourseSlugs, getCurrentUser } from "@/lib/data";

type GradesPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getCourseSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: GradesPageProps) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);
  if (!course) {
    return { title: "Grades" };
  }
  return { title: `Grades · ${course.title}` };
}

export default async function CourseGradesPage({ params }: GradesPageProps) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);
  const student = getCurrentUser();

  if (!course) {
    notFound();
  }

  return (
    <CourseShell
      course={course}
      breadcrumbs={[
        { label: course.title, href: `/courses/${course.slug}` },
        { label: "Grades", href: `/courses/${course.slug}/grades` },
        { label: student.name },
      ]}
    >
      <CourseGrades course={course} student={student} />
    </CourseShell>
  );
}
