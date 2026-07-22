"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

import { AccountTray } from "@/components/layout/account-tray";
import { MobileNavTrigger, Sidebar } from "@/components/layout/sidebar";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useSidebar } from "@/hooks/use-sidebar";
import type { NavItem, User } from "@/types";

type AppShellProps = {
  children: ReactNode;
  mainNav: NavItem[];
  user: User;
};

export function AppShell({ children, mainNav, user }: AppShellProps) {
  const { mobileOpen, setMobileOpen } = useSidebar();

  return (
    <div className="flex h-dvh overflow-hidden bg-background">
      <div className="relative z-40 hidden h-full shrink-0 md:flex">
        <Sidebar mainNav={mainNav} />
        <AccountTray user={user} />
      </div>

      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent
          side="left"
          showCloseButton={false}
          className="w-[84px] gap-0 overflow-visible border-0 bg-sidebar p-0 sm:max-w-[84px]"
        >
          <SheetHeader className="sr-only">
            <SheetTitle>Navigation</SheetTitle>
            <SheetDescription>Primary dashboard navigation</SheetDescription>
          </SheetHeader>
          <div className="relative h-full">
            <Sidebar
              mainNav={mainNav}
              forceExpanded
              className="h-full w-full"
            />
            <AccountTray user={user} />
          </div>
        </SheetContent>
      </Sheet>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex h-12 items-center gap-2 border-b border-border px-3 md:hidden">
          <MobileNavTrigger />
          <span className="text-sm font-semibold tracking-tight">WSU Tech</span>
        </div>

        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.25 }}
          className="flex min-h-0 flex-1 flex-col overflow-hidden"
        >
          {children}
        </motion.main>
      </div>
    </div>
  );
}
