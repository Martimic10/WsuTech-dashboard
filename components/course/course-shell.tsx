"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";

import { CourseNav } from "@/components/course/course-nav";
import { MobileNavTrigger } from "@/components/layout/sidebar";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useMediaQuery } from "@/hooks/use-media-query";
import type { CourseDetail } from "@/types";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

type CourseShellProps = {
  course: CourseDetail;
  breadcrumbs: BreadcrumbItem[];
  children: ReactNode;
};

export function CourseShell({
  course,
  breadcrumbs,
  children,
}: CourseShellProps) {
  const [navOpen, setNavOpen] = useState(false);
  const isLarge = useMediaQuery("(min-width: 1024px)");

  useEffect(() => {
    if (isLarge) {
      setNavOpen(false);
    }
  }, [isLarge]);

  return (
    <div className="flex h-full min-h-0 flex-1 flex-col bg-white">
      <div className="flex h-12 shrink-0 items-center gap-1.5 border-b border-[#e8eaec] px-2 sm:gap-2 sm:px-3 md:px-4">
        <MobileNavTrigger />
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={() => setNavOpen(true)}
          aria-label="Open course navigation"
        >
          <Menu className="size-5" />
        </Button>
        <nav
          aria-label="Breadcrumb"
          className="flex min-w-0 flex-1 items-center gap-1.5 overflow-hidden text-sm"
        >
          {breadcrumbs.map((crumb, index) => {
            const isLast = index === breadcrumbs.length - 1;
            return (
              <span
                key={`${crumb.label}-${index}`}
                className="flex min-w-0 items-center gap-1.5"
              >
                {index > 0 && (
                  <span className="shrink-0 text-[#6b7780]" aria-hidden>
                    &gt;
                  </span>
                )}
                {crumb.href && !isLast ? (
                  <Link
                    href={crumb.href}
                    className="truncate font-medium text-[#0374B5] hover:underline"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span
                    className={
                      isLast
                        ? "truncate text-[#2d3b45]"
                        : "truncate font-medium text-[#0374B5]"
                    }
                  >
                    {crumb.label}
                  </span>
                )}
              </span>
            );
          })}
        </nav>
      </div>

      <div className="flex min-h-0 flex-1">
        <div className="hidden h-full lg:flex">
          <CourseNav term={course.term} items={course.nav} />
        </div>

        <Sheet open={navOpen} onOpenChange={setNavOpen}>
          <SheetContent
            side="left"
            className="gap-0 p-0 shadow-[4px_0_24px_rgba(0,0,0,0.18)] data-[side=left]:w-[min(100vw,280px)] data-[side=left]:max-w-[280px]"
            showCloseButton
          >
            <SheetHeader className="sr-only">
              <SheetTitle>Course navigation</SheetTitle>
              <SheetDescription>{course.title} menu</SheetDescription>
            </SheetHeader>
            <CourseNav
              term={course.term}
              items={course.nav}
              className="w-full border-0"
              onNavigate={() => setNavOpen(false)}
            />
          </SheetContent>
        </Sheet>

        <div className="min-w-0 flex-1 overflow-y-auto overscroll-contain">
          {children}
        </div>
      </div>
    </div>
  );
}
