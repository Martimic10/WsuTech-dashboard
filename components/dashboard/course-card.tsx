"use client";

import { motion } from "framer-motion";
import { Megaphone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import type { Course } from "@/types";

type CourseCardProps = {
  course: Course;
  index?: number;
};

function CourseBanner({ course }: { course: Course }) {
  const isDarkThumb = course.thumbnail.includes("wsutech-thumbnail");
  const isFullBleed = course.thumbnail.includes("passport");

  return (
    <div
      className={cn(
        "relative h-[130px] overflow-hidden",
        isDarkThumb ? "bg-black" : "bg-white"
      )}
    >
      <Image
        src={course.thumbnail}
        alt={course.name}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
        className={cn(
          isFullBleed
            ? "object-cover object-center"
            : "object-contain object-center p-4"
        )}
      />
    </div>
  );
}

export function CourseCard({ course, index = 0 }: CourseCardProps) {
  const showAnnouncements = course.announcements !== null;

  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.28,
        delay: index * 0.04,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group flex flex-col overflow-hidden rounded-lg border border-[#e8eaec] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.08)] transition-shadow hover:shadow-[0_4px_14px_rgba(0,0,0,0.1)]"
    >
      <Link href={course.href} className="block">
        <CourseBanner course={course} />
        <div className="space-y-0.5 px-3.5 pt-3 pb-2">
          <h3
            className="truncate text-sm font-semibold leading-snug transition-colors group-hover:underline"
            style={{ color: course.color }}
            title={course.name}
          >
            {course.name}
          </h3>
          <p
            className={
              course.detail
                ? "truncate text-sm font-semibold leading-snug text-[#2d3b45]"
                : "truncate text-sm leading-snug text-[#6b7780]"
            }
            title={course.subtitle}
          >
            {course.subtitle}
          </p>
          {course.detail ? (
            <p className="truncate text-xs text-[#6b7780]">{course.detail}</p>
          ) : null}
        </div>
      </Link>

      {showAnnouncements && (
        <div className="mt-auto flex items-center gap-2 border-t border-[#e8eaec] px-3 py-2">
          <button
            type="button"
            className="relative rounded p-1.5 text-[#6b7780] transition-colors hover:bg-[#f2f2f2] hover:text-[#2d3b45]"
            aria-label={`${course.name} announcements`}
          >
            <Megaphone className="size-4" strokeWidth={1.75} />
            {(course.announcements ?? 0) > 0 && (
              <span className="absolute -top-0.5 -right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-black px-1 text-[10px] font-bold text-white">
                {course.announcements}
              </span>
            )}
          </button>
        </div>
      )}
    </motion.article>
  );
}
