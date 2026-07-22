export type NavItem = {
  title: string;
  href: string;
  icon: string;
  badge?: number;
};

export type User = {
  id: string;
  name: string;
  email: string;
  role: "student" | "instructor" | "admin";
  avatarUrl?: string;
  program?: string;
};

export type Notification = {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  read: boolean;
  type: "assignment" | "grade" | "announcement" | "message";
};

export type Course = {
  id: string;
  name: string;
  subtitle: string;
  detail?: string;
  color: string;
  thumbnail: string;
  /** null hides the announcements control; 0 shows icon without a badge */
  announcements: number | null;
  href: string;
};

export type CourseNavItem = {
  title: string;
  href: string;
  badge: number | null;
};

export type CourseAnnouncement = {
  id: string;
  title: string;
  preview: string;
  postedAt: string;
  unread: boolean;
};

export type CourseModuleItem = {
  id: string;
  title: string;
  type: "page" | "link" | "file" | "assignment" | "discussion" | "header" | "video";
  href?: string;
  meta?: string;
  indent?: boolean;
  restricted?: boolean;
  bold?: boolean;
};

export type CourseModule = {
  id: string;
  title: string;
  expanded: boolean;
  items: CourseModuleItem[];
};

export type CourseGradeEntry = {
  id: string;
  name: string;
  category: "Discussion" | "Assignment" | "Quiz" | "Exam";
  due: string;
  submitted: string | null;
  status: "late" | "missing" | "excused" | null;
  score: number | null;
  pointsPossible: number;
  comments: number;
  /** When true and score is null, show submission icon instead of a dash */
  awaitingGrade?: boolean;
};

export type CourseGradeCategory = {
  id: string;
  name: string;
  percentLabel: string;
  pointsLabel: string;
};

export type CourseGradesSummary = {
  totalPercent: number;
  letterGrade: string;
  weighted: boolean;
  totalPointsLabel?: string;
  categories?: CourseGradeCategory[];
};

export type CourseDetail = {
  slug: string;
  code: string;
  title: string;
  term: string;
  color: string;
  nav: CourseNavItem[];
  announcements: CourseAnnouncement[];
  modules: CourseModule[];
  todos: TodoItem[];
  feedback: FeedbackItem[];
  grades: CourseGradeEntry[];
  gradesSummary: CourseGradesSummary;
};

export type TodoItem = {
  id: string;
  title: string;
  courseCode: string;
  dueLabel: string;
  type: "announcement" | "assignment";
  href: string;
};

export type FeedbackItem = {
  id: string;
  title: string;
  courseCode: string;
  scoreLabel: string;
  comment: string;
  href: string;
};
