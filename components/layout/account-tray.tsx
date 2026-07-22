"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Info, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useSidebar } from "@/hooks/use-sidebar";
import { cn } from "@/lib/utils";
import type { User } from "@/types";

const ACCOUNT_LINKS = [
  { label: "Notifications", href: "/account/notifications" },
  { label: "Profile", href: "/account/profile" },
  { label: "Files", href: "/account/files" },
  { label: "Settings", href: "/account/settings" },
  { label: "Accredible", href: "/account/accredible" },
  { label: "Portfolio", href: "/account/portfolio" },
  { label: "QR for Mobile Login", href: "/account/qr" },
  { label: "Global Announcements", href: "/account/announcements" },
] as const;

type AccountTrayProps = {
  user: User;
};

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function AccessibilityToggle({
  id,
  label,
  checked,
  onCheckedChange,
}: {
  id: string;
  label: string;
  checked: boolean;
  onCheckedChange: (value: boolean) => void;
}) {
  return (
    <div className="flex items-center gap-3">
      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        onClick={() => onCheckedChange(!checked)}
        className={cn(
          "relative flex h-6 w-11 shrink-0 items-center rounded-full border transition-colors",
          checked
            ? "border-[#0374B5] bg-[#0374B5]"
            : "border-[#c7cdd1] bg-[#e8eaec]"
        )}
      >
        <span
          className={cn(
            "absolute flex size-5 items-center justify-center rounded-full bg-white shadow-sm transition-transform",
            checked ? "translate-x-[22px]" : "translate-x-0.5"
          )}
        >
          {!checked && <X className="size-2.5 text-[#6b7780]" strokeWidth={3} />}
        </span>
      </button>
      <label
        htmlFor={id}
        className="flex cursor-pointer items-center gap-1.5 text-sm text-[#2d3b45]"
      >
        {label}
        <Info className="size-3.5 text-[#6b7780]" strokeWidth={2} />
      </label>
    </div>
  );
}

export function AccountPanel({ user }: AccountTrayProps) {
  const { setAccountOpen } = useSidebar();
  const [highContrast, setHighContrast] = useState(false);
  const [dyslexiaFont, setDyslexiaFont] = useState(false);

  return (
    <div
      className="flex h-full min-h-0 w-full flex-col bg-white"
      id="account-tray"
      role="dialog"
      aria-modal="true"
      aria-label="Account"
    >
      <div className="relative flex flex-col items-center px-5 pt-4 pb-5">
        <Button
          variant="outline"
          size="icon-sm"
          className="absolute top-3 right-3 size-8 rounded-md border-[#c7cdd1] bg-white text-[#2d3b45] shadow-none hover:bg-[#f5f5f5]"
          onClick={() => setAccountOpen(false)}
          aria-label="Close"
        >
          <X className="size-4" />
        </Button>

        <div
          className="mt-2 flex size-[88px] items-center justify-center rounded-full border-[3px] border-[#0374B5] bg-white"
          aria-hidden
        >
          <span className="text-[28px] font-semibold leading-none tracking-tight text-[#0374B5]">
            {getInitials(user.name)}
          </span>
        </div>

        <h2 className="mt-3 text-center text-xl font-bold tracking-tight text-[#2d3b45]">
          {user.name}
        </h2>

        <button
          type="button"
          className="mt-3 rounded-md border border-[#c7cdd1] bg-[#f5f5f5] px-3.5 py-1 text-sm text-[#2d3b45] transition-colors hover:bg-[#ebebeb]"
        >
          Logout
        </button>
      </div>

      <div className="mx-5 h-px bg-[#e8eaec]" />

      <ScrollArea className="flex-1">
        <nav className="flex flex-col gap-3 px-6 py-4">
          {ACCOUNT_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setAccountOpen(false)}
              className="text-sm font-medium text-[#0374B5] hover:underline"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="mx-5 h-px bg-[#e8eaec]" />

        <div className="space-y-4 px-6 py-5">
          <h3 className="text-sm font-bold text-[#2d3b45]">
            Accessibility Settings
          </h3>
          <AccessibilityToggle
            id="high-contrast"
            label="Use High Contrast UI"
            checked={highContrast}
            onCheckedChange={setHighContrast}
          />
          <AccessibilityToggle
            id="dyslexia-font"
            label="Use a Dyslexia Friendly Font"
            checked={dyslexiaFont}
            onCheckedChange={setDyslexiaFont}
          />
        </div>
      </ScrollArea>
    </div>
  );
}

/** Desktop docked tray that slides out beside the sidebar. */
export function AccountTray({ user }: AccountTrayProps) {
  const { accountOpen, setAccountOpen } = useSidebar();

  return (
    <AnimatePresence>
      {accountOpen && (
        <>
          <motion.button
            type="button"
            aria-label="Close account menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-40 bg-transparent"
            onClick={() => setAccountOpen(false)}
          />

          <motion.aside
            initial={{ x: -24, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -16, opacity: 0 }}
            transition={{ type: "spring", stiffness: 380, damping: 34 }}
            className="absolute top-0 bottom-0 left-full z-50 flex w-[280px] flex-col border-r border-[#e8eaec] bg-white shadow-[4px_0_24px_rgba(0,0,0,0.08)]"
          >
            <AccountPanel user={user} />
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
