"use client";

import { User } from "lucide-react";
import Link from "next/link";

import { CourseModules } from "@/components/course/course-modules";
import type { CourseAnnouncement, CourseModule } from "@/types";

type CourseHomeProps = {
  announcements: CourseAnnouncement[];
  modules: CourseModule[];
};

function AnnouncementRow({ item }: { item: CourseAnnouncement }) {
  return (
    <div className="flex gap-3 border-b border-[#e8eaec] py-4 last:border-b-0">
      {item.unread ? (
        <span className="mt-2 size-2 shrink-0 rounded-full bg-black" />
      ) : (
        <span className="mt-2 size-2 shrink-0" />
      )}
      <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#e8eaec] text-[#6b7780]">
        <User className="size-5" strokeWidth={1.5} />
      </div>
      <div className="min-w-0 flex-1">
        <Link
          href="#"
          className="break-words text-base font-semibold text-[#0374B5] hover:underline"
        >
          {item.title}
        </Link>
        <p className="mt-0.5 line-clamp-2 text-sm text-[#2d3b45] sm:truncate">
          {item.preview}
        </p>
        <p className="mt-1 text-xs text-[#6b7780]">Posted on: {item.postedAt}</p>
      </div>
    </div>
  );
}

export function CourseHome({ announcements, modules }: CourseHomeProps) {
  return (
    <div className="min-w-0 flex-1 space-y-8">
      <section>
        <div className="mb-1 flex items-start justify-between gap-4">
          <h1 className="text-xl font-bold tracking-tight text-[#2d3b45] sm:text-2xl">
            Recent Announcements
          </h1>
        </div>
        <div>
          {announcements.map((item) => (
            <AnnouncementRow key={item.id} item={item} />
          ))}
        </div>
      </section>

      <section>
        <CourseModules modules={modules} showCollapseToggle />
      </section>
    </div>
  );
}
