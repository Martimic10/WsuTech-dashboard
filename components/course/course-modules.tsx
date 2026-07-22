"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronDown,
  ExternalLink,
  FileText,
  MessageSquare,
  Paperclip,
  PencilLine,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import type { CourseModule, CourseModuleItem } from "@/types";
import { cn } from "@/lib/utils";

type CourseModulesProps = {
  modules: CourseModule[];
  showCollapseToggle?: boolean;
  title?: string;
};

function ModuleItemIcon({ type }: { type: CourseModuleItem["type"] }) {
  const className = "size-4 shrink-0 text-[#6b7780]";
  switch (type) {
    case "discussion":
      return <MessageSquare className={className} strokeWidth={1.75} />;
    case "assignment":
      return <PencilLine className={className} strokeWidth={1.75} />;
    case "file":
      return <Paperclip className={className} strokeWidth={1.75} />;
    case "link":
      return <ExternalLink className={className} strokeWidth={1.75} />;
    default:
      return <FileText className={className} strokeWidth={1.75} />;
  }
}

function ModuleItemRow({ item }: { item: CourseModuleItem }) {
  if (item.type === "header") {
    return (
      <li className="border-t border-[#e8eaec]">
        <div
          className={cn(
            "px-4 py-3 text-sm font-bold text-[#2d3b45]",
            item.indent && "pl-10"
          )}
        >
          {item.title}
        </div>
      </li>
    );
  }

  const isBold = item.bold !== false;

  return (
    <li className="border-t border-[#e8eaec]">
      <div
        className={cn(
          "flex items-start gap-3 px-4 py-3 hover:bg-[#f8f8f8]",
          item.indent && "pl-10"
        )}
      >
        <ModuleItemIcon type={item.type} />
        <div className="min-w-0 flex-1">
          <Link
            href={item.href ?? "#"}
            className={cn(
              "text-sm text-[#2d3b45] hover:text-[#0374B5] hover:underline",
              isBold && "font-bold"
            )}
          >
            {item.title}
          </Link>
          {item.meta ? (
            <p className="mt-0.5 text-xs text-[#6b7780]">{item.meta}</p>
          ) : null}
        </div>
        {item.restricted ? (
          <span
            className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-[#e35d0f] text-white"
            title="Restricted"
            aria-label="Restricted"
          >
            <span className="block h-0.5 w-2 bg-white" />
          </span>
        ) : null}
      </div>
    </li>
  );
}

function ModuleSection({
  module,
  defaultExpanded,
}: {
  module: CourseModule;
  defaultExpanded: boolean;
}) {
  const [expanded, setExpanded] = useState(defaultExpanded);

  return (
    <div className="overflow-hidden rounded-sm border border-[#e8eaec]">
      <button
        type="button"
        onClick={() => setExpanded((prev) => !prev)}
        className="flex w-full items-center gap-2 bg-[#f2f2f2] px-3 py-2.5 text-left text-sm font-semibold text-[#2d3b45] transition-colors hover:bg-[#ebebeb]"
      >
        <ChevronDown
          className={cn(
            "size-4 shrink-0 text-[#6b7780] transition-transform",
            !expanded && "-rotate-90"
          )}
        />
        {module.title}
      </button>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden bg-white"
          >
            {module.items.map((item) => (
              <ModuleItemRow key={item.id} item={item} />
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

export function CourseModules({
  modules,
  showCollapseToggle = true,
  title,
}: CourseModulesProps) {
  const [allExpanded, setAllExpanded] = useState(true);

  return (
    <div className="space-y-3">
      {(title || showCollapseToggle) && (
        <div className="mb-1 flex items-start justify-between gap-4">
          {title ? (
            <h1 className="text-2xl font-bold tracking-tight text-[#2d3b45]">
              {title}
            </h1>
          ) : (
            <span />
          )}
          {showCollapseToggle ? (
            <button
              type="button"
              onClick={() => setAllExpanded((prev) => !prev)}
              className="shrink-0 rounded-md border border-[#c7cdd1] bg-white px-3 py-1.5 text-sm font-medium text-[#2d3b45] transition-colors hover:bg-[#f5f5f5]"
            >
              {allExpanded ? "Collapse All" : "Expand All"}
            </button>
          ) : null}
        </div>
      )}

      {modules.map((module) => (
        <ModuleSection
          key={`${module.id}-${allExpanded}`}
          module={module}
          defaultExpanded={allExpanded ? module.expanded : false}
        />
      ))}
    </div>
  );
}
