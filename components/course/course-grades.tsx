"use client";

import { FileText, MessageSquare, Printer } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { cn } from "@/lib/utils";
import type { CourseDetail, CourseGradeEntry, User } from "@/types";

type CourseGradesProps = {
  course: CourseDetail;
  student: User;
};

function ScoreCell({ entry }: { entry: CourseGradeEntry }) {
  if (entry.score !== null) {
    return (
      <span className="whitespace-nowrap text-[#2d3b45]">
        {entry.score} / {entry.pointsPossible}
      </span>
    );
  }

  if (entry.awaitingGrade) {
    return (
      <span className="inline-flex items-center gap-1.5 whitespace-nowrap text-[#2d3b45]">
        <FileText className="size-4 text-[#6b7780]" strokeWidth={1.75} />
        <span>/ {entry.pointsPossible}</span>
      </span>
    );
  }

  return (
    <span className="whitespace-nowrap text-[#2d3b45]">
      – / {entry.pointsPossible}
    </span>
  );
}

export function CourseGrades({ course, student }: CourseGradesProps) {
  const [tab, setTab] = useState<"assignments" | "mastery">("assignments");
  const [gradedOnly, setGradedOnly] = useState(true);
  const categories = course.gradesSummary.categories ?? [];

  return (
    <div className="flex min-h-full flex-col xl:flex-row">
      <div className="min-w-0 flex-1 px-4 py-5 md:px-6">
        <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
          <h1 className="text-2xl font-bold tracking-tight text-[#2d3b45]">
            Grades for {student.name}
          </h1>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-md border border-[#c7cdd1] bg-[#f5f5f5] px-3 py-2 text-sm font-medium text-[#2d3b45] transition-colors hover:bg-[#ebebeb]"
          >
            <Printer className="size-4" strokeWidth={1.75} />
            Print Grades
          </button>
        </div>

        <div className="mb-4 flex flex-wrap items-end gap-3">
          <label className="flex min-w-[180px] flex-col gap-1 text-xs font-medium text-[#6b7780]">
            Course
            <select
              defaultValue={course.code}
              className="h-9 rounded-md border border-[#c7cdd1] bg-white px-2.5 text-sm text-[#2d3b45] outline-none focus:border-[#0374B5]"
            >
              <option value={course.code}>{course.code}</option>
            </select>
          </label>
          <label className="flex min-w-[160px] flex-col gap-1 text-xs font-medium text-[#6b7780]">
            Arrange By
            <select
              defaultValue="due"
              className="h-9 rounded-md border border-[#c7cdd1] bg-white px-2.5 text-sm text-[#2d3b45] outline-none focus:border-[#0374B5]"
            >
              <option value="due">Due Date</option>
              <option value="name">Name</option>
              <option value="module">Module</option>
            </select>
          </label>
          <button
            type="button"
            className="h-9 rounded-md border border-[#c7cdd1] bg-[#f5f5f5] px-4 text-sm font-medium text-[#2d3b45] transition-colors hover:bg-[#ebebeb]"
          >
            Apply
          </button>
        </div>

        <div className="mb-0 flex gap-6 border-b border-[#e8eaec]">
          <button
            type="button"
            onClick={() => setTab("assignments")}
            className={cn(
              "relative pb-2.5 text-sm font-medium transition-colors",
              tab === "assignments"
                ? "text-[#0374B5]"
                : "text-[#6b7780] hover:text-[#2d3b45]"
            )}
          >
            Assignments
            {tab === "assignments" && (
              <span className="absolute inset-x-0 -bottom-px h-0.5 bg-[#0374B5]" />
            )}
          </button>
          <button
            type="button"
            onClick={() => setTab("mastery")}
            className={cn(
              "relative pb-2.5 text-sm font-medium transition-colors",
              tab === "mastery"
                ? "text-[#0374B5]"
                : "text-[#6b7780] hover:text-[#2d3b45]"
            )}
          >
            Learning Mastery
            {tab === "mastery" && (
              <span className="absolute inset-x-0 -bottom-px h-0.5 bg-[#0374B5]" />
            )}
          </button>
        </div>

        {tab === "assignments" ? (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-[#e8eaec] text-left text-xs font-semibold tracking-wide text-[#6b7780] uppercase">
                  <th className="py-3 pr-3 font-semibold normal-case tracking-normal">
                    Name
                  </th>
                  <th className="px-3 py-3 font-semibold normal-case tracking-normal">
                    Due
                  </th>
                  <th className="px-3 py-3 font-semibold normal-case tracking-normal">
                    Submitted
                  </th>
                  <th className="px-3 py-3 font-semibold normal-case tracking-normal">
                    Status
                  </th>
                  <th className="px-3 py-3 font-semibold normal-case tracking-normal">
                    Score
                  </th>
                  <th className="py-3 pl-3" />
                </tr>
              </thead>
              <tbody>
                {course.grades.map((entry) => (
                  <tr
                    key={entry.id}
                    className="border-b border-[#e8eaec] align-top"
                  >
                    <td className="py-3.5 pr-3">
                      <Link
                        href="#"
                        className="font-medium text-[#0374B5] hover:underline"
                      >
                        {entry.name}
                      </Link>
                      <p className="mt-0.5 text-xs text-[#2d3b45]">
                        {entry.category}
                      </p>
                    </td>
                    <td className="whitespace-nowrap px-3 py-3.5 text-[#2d3b45]">
                      {entry.due}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3.5 text-[#2d3b45]">
                      {entry.submitted ?? ""}
                    </td>
                    <td className="px-3 py-3.5">
                      {entry.status === "late" && (
                        <span className="inline-flex rounded-full bg-[#d9ebf7] px-2.5 py-0.5 text-xs font-medium text-[#0374B5]">
                          late
                        </span>
                      )}
                      {entry.status === "missing" && (
                        <span className="inline-flex rounded-full bg-[#fce8e8] px-2.5 py-0.5 text-xs font-medium text-[#c41e3a]">
                          missing
                        </span>
                      )}
                    </td>
                    <td className="px-3 py-3.5">
                      <ScoreCell entry={entry} />
                    </td>
                    <td className="py-3.5 pl-3">
                      <div className="flex items-center justify-end gap-2">
                        {entry.comments > 0 && (
                          <button
                            type="button"
                            className="relative rounded p-1 text-[#0374B5] hover:bg-[#f0f7fb]"
                            aria-label={`${entry.comments} comments`}
                          >
                            <MessageSquare
                              className="size-4"
                              strokeWidth={1.75}
                            />
                            <span className="absolute -top-0.5 -right-0.5 flex h-3.5 min-w-3.5 items-center justify-center rounded-full bg-[#0374B5] px-0.5 text-[9px] font-bold text-white">
                              {entry.comments}
                            </span>
                          </button>
                        )}
                        {entry.comments > 0 && (
                          <span className="size-2.5 rounded-full bg-[#0374B5]" />
                        )}
                      </div>
                    </td>
                  </tr>
                ))}

                {categories.map((category) => (
                  <tr
                    key={category.id}
                    className="border-b border-[#e8eaec] bg-[#fafafa]"
                  >
                    <td className="py-3 pr-3 font-semibold text-[#2d3b45]">
                      {category.name}
                    </td>
                    <td className="px-3 py-3" />
                    <td className="px-3 py-3" />
                    <td className="px-3 py-3" />
                    <td className="whitespace-nowrap px-3 py-3 text-[#2d3b45]">
                      <span className="font-medium">{category.percentLabel}</span>
                      <span className="ml-3 text-[#6b7780]">
                        {category.pointsLabel}
                      </span>
                    </td>
                    <td />
                  </tr>
                ))}

                <tr className="border-t-2 border-[#c7cdd1]">
                  <td className="py-3.5 pr-3 text-base font-bold text-[#2d3b45]">
                    Total
                  </td>
                  <td className="px-3 py-3.5" />
                  <td className="px-3 py-3.5" />
                  <td className="px-3 py-3.5" />
                  <td className="whitespace-nowrap px-3 py-3.5 text-[#2d3b45]">
                    <span className="text-base font-bold">
                      {course.gradesSummary.totalPercent.toFixed(2)}%
                    </span>
                    {course.gradesSummary.totalPointsLabel ? (
                      <span className="ml-3 text-[#6b7780]">
                        {course.gradesSummary.totalPointsLabel}
                      </span>
                    ) : null}
                  </td>
                  <td />
                </tr>
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-12 text-center text-sm text-[#6b7780]">
            Learning Mastery outcomes are not available for this course.
          </div>
        )}
      </div>

      <aside className="w-full shrink-0 border-t border-[#e8eaec] px-4 py-5 md:px-6 xl:w-[260px] xl:border-t-0 xl:border-l">
        <p className="text-lg font-bold text-[#2d3b45]">
          Total: {course.gradesSummary.totalPercent.toFixed(2)}% (
          {course.gradesSummary.letterGrade})
        </p>
        <button
          type="button"
          className="mt-3 w-full rounded-md border border-[#c7cdd1] bg-[#f5f5f5] px-3 py-2 text-sm font-medium text-[#2d3b45] transition-colors hover:bg-[#ebebeb]"
        >
          Show All Details
        </button>
        <p className="mt-4 text-sm text-[#2d3b45]">
          {course.gradesSummary.weighted
            ? "Course assignments are weighted."
            : "Course assignments are not weighted."}
        </p>
        <label className="mt-4 flex cursor-pointer items-start gap-2.5 text-sm text-[#2d3b45]">
          <input
            type="checkbox"
            checked={gradedOnly}
            onChange={(e) => setGradedOnly(e.target.checked)}
            className="mt-0.5 size-4 rounded border-[#c7cdd1] accent-[#0374B5]"
          />
          <span>Calculate based only on graded assignments</span>
        </label>
        <p className="mt-4 text-xs leading-relaxed text-[#6b7780]">
          You can use What-If scores to calculate your total grade. Enter a
          hypothetical score for an assignment to see how it affects your
          course total. To revert, clear the What-If score or click{" "}
          <span className="font-medium text-[#2d3b45]">
            Revert to Actual Score
          </span>
          .
        </p>
      </aside>
    </div>
  );
}
