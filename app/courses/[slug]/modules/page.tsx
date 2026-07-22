import { notFound } from "next/navigation";

import { CourseModulesView } from "@/components/course/course-modules-view";
import { CourseShell } from "@/components/course/course-shell";
import { getCourseBySlug, getCourseSlugs } from "@/lib/data";

type ModulesPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getCourseSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ModulesPageProps) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);
  if (!course) {
    return { title: "Modules" };
  }
  return { title: `Modules · ${course.title}` };
}

export default async function CourseModulesPage({ params }: ModulesPageProps) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);

  if (!course) {
    notFound();
  }

  return (
    <CourseShell
      course={course}
      breadcrumbs={[
        { label: course.title, href: `/courses/${course.slug}` },
        { label: "Modules" },
      ]}
    >
      <CourseModulesView course={course} />
    </CourseShell>
  );
}
