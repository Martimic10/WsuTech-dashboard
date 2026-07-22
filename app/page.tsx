import { DashboardView } from "@/components/dashboard/dashboard-view";
import { getCourses, getFeedback, getTodos } from "@/lib/data";

export default function HomePage() {
  const courses = getCourses();
  const todos = getTodos();
  const feedback = getFeedback();

  return (
    <DashboardView courses={courses} todos={todos} feedback={feedback} />
  );
}
