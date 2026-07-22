"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import type { CourseNavItem } from "@/types";

type CourseNavProps = {
  term: string;
  items: CourseNavItem[];
  className?: string;
  onNavigate?: () => void;
};

export function CourseNav({
  term,
  items,
  className,
  onNavigate,
}: CourseNavProps) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "flex h-full w-[200px] shrink-0 flex-col border-r border-[#e8eaec] bg-white",
        className
      )}
    >
      <div className="px-4 pt-4 pb-2">
        <p className="text-xs italic text-[#6b7780]">{term}</p>
      </div>
      <ScrollArea className="flex-1">
        <nav className="flex flex-col pb-4">
          {items.map((item) => {
            const isHome = item.title === "Home";
            const active = isHome
              ? pathname === item.href
              : pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onNavigate}
                className={cn(
                  "relative flex min-h-11 items-center gap-2 px-4 py-2.5 text-sm transition-colors lg:min-h-0 lg:py-1.5",
                  active
                    ? "bg-[#f5f5f5] font-bold text-[#2d3b45]"
                    : "font-medium text-[#0374B5] hover:underline"
                )}
              >
                {active && (
                  <span className="absolute top-1 bottom-1 left-0 w-[3px] rounded-r bg-[#0374B5]" />
                )}
                <span className="min-w-0 flex-1 truncate">{item.title}</span>
                {typeof item.badge === "number" && item.badge > 0 && (
                  <span className="flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full bg-black px-1.5 text-[11px] font-bold text-white">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </ScrollArea>
    </aside>
  );
}
