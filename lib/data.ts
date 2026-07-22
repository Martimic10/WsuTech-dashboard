import courses from "@/data/courses.json";
import his120 from "@/data/courses/his-120.json";
import pols101 from "@/data/courses/pols-101.json";
import feedback from "@/data/feedback.json";
import navigation from "@/data/navigation.json";
import notifications from "@/data/notifications.json";
import todos from "@/data/todos.json";
import user from "@/data/user.json";
import type {
  Course,
  CourseDetail,
  FeedbackItem,
  NavItem,
  Notification,
  TodoItem,
  User,
} from "@/types";

const courseDetails: Record<string, CourseDetail> = {
  "his-120": his120 as CourseDetail,
  "pols-101": pols101 as CourseDetail,
};

export function getNavigation(): { main: NavItem[] } {
  return navigation as { main: NavItem[] };
}

export function getCurrentUser(): User {
  return user as User;
}

export function getNotifications(): Notification[] {
  return notifications as Notification[];
}

export function getCourses(): Course[] {
  return courses as Course[];
}

export function getCourseBySlug(slug: string): CourseDetail | null {
  return courseDetails[slug] ?? null;
}

export function getCourseSlugs(): string[] {
  return Object.keys(courseDetails);
}

export function getTodos(): TodoItem[] {
  return todos as TodoItem[];
}

export function getFeedback(): FeedbackItem[] {
  return feedback as FeedbackItem[];
}
