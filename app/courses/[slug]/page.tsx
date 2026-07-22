import { notFound } from "next/navigation";

import { CourseView } from "@/components/course/course-view";
import { getCourseBySlug, getCourseSlugs } from "@/lib/data";

type CoursePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getCourseSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: CoursePageProps) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);
  if (!course) {
    return { title: "Course" };
  }
  return { title: course.title };
}

export default async function CoursePage({ params }: CoursePageProps) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);

  if (!course) {
    notFound();
  }

  return <CourseView course={course} />;
}
