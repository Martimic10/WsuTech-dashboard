"use client";

import {
  BookOpen,
  CalendarDays,
  CircleHelp,
  Gauge,
  History,
  Inbox,
  User,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  User,
  Gauge,
  BookOpen,
  CalendarDays,
  Inbox,
  History,
  CircleHelp,
};

export function getNavIcon(name: string): LucideIcon {
  return iconMap[name] ?? Gauge;
}
