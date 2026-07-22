"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, type ReactNode } from "react";

import { AccountPanel, AccountTray } from "@/components/layout/account-tray";
import { MobileNavTrigger, Sidebar } from "@/components/layout/sidebar";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useSidebar } from "@/hooks/use-sidebar";
import type { NavItem, User } from "@/types";

type AppShellProps = {
  children: ReactNode;
  mainNav: NavItem[];
  user: User;
};

export function AppShell({ children, mainNav, user }: AppShellProps) {
  const pathname = usePathname();
  const { mobileOpen, setMobileOpen, accountOpen, setAccountOpen } =
    useSidebar();
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const isCourseRoute = pathname.startsWith("/courses/");

  useEffect(() => {
    if (isDesktop) {
      setMobileOpen(false);
    }
  }, [isDesktop, setMobileOpen]);

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
          className="gap-0 overflow-hidden border-0 bg-sidebar p-0 shadow-[4px_0_24px_rgba(0,0,0,0.18)] data-[side=left]:w-[88px] data-[side=left]:max-w-[88px]"
        >
          <SheetHeader className="sr-only">
            <SheetTitle>Navigation</SheetTitle>
            <SheetDescription>Primary dashboard navigation</SheetDescription>
          </SheetHeader>
          <Sidebar mainNav={mainNav} forceExpanded className="h-full w-full" />
        </SheetContent>
      </Sheet>

      <Sheet
        open={!isDesktop && accountOpen}
        onOpenChange={(open) => setAccountOpen(open)}
      >
        <SheetContent
          side="left"
          showCloseButton={false}
          className="gap-0 overflow-hidden border-0 p-0 shadow-[4px_0_24px_rgba(0,0,0,0.18)] data-[side=left]:w-[min(100vw,320px)] data-[side=left]:max-w-[320px]"
        >
          <SheetHeader className="sr-only">
            <SheetTitle>Account</SheetTitle>
            <SheetDescription>Account settings and profile</SheetDescription>
          </SheetHeader>
          <AccountPanel user={user} />
        </SheetContent>
      </Sheet>

      <div className="flex min-w-0 flex-1 flex-col">
        {!isCourseRoute && (
          <div className="flex h-12 shrink-0 items-center gap-2 border-b border-border px-3 md:hidden">
            <MobileNavTrigger />
            <span className="text-sm font-semibold tracking-tight">WSU Tech</span>
          </div>
        )}

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
