"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useSidebar } from "@/hooks/use-sidebar";
import { getNavIcon } from "@/lib/nav-icons";
import { cn } from "@/lib/utils";
import type { NavItem } from "@/types";

const SIDEBAR_EXPANDED = 84;
const SIDEBAR_COLLAPSED = 56;
const LOGO_SRC = "/WSUTech-image-removebg-preview.png";
const ACCOUNT_HREF = "/account";

type SidebarProps = {
  mainNav: NavItem[];
  className?: string;
  forceExpanded?: boolean;
};

function WsuLogo({ compact = false }: { compact?: boolean }) {
  return (
    <Link
      href="/"
      className={cn(
        "group relative flex items-center justify-center rounded-xl transition-transform hover:scale-[1.03] active:scale-[0.98]",
        compact ? "p-1" : "px-2 py-1"
      )}
      aria-label="WSU Tech Dashboard home"
    >
      <span
        className={cn(
          "absolute inset-0 rounded-xl bg-black/5 opacity-0 transition-opacity group-hover:opacity-100",
          compact && "rounded-lg"
        )}
      />
      <motion.div
        initial={false}
        animate={{
          width: compact ? 48 : 76,
          height: compact ? 34 : 48,
        }}
        transition={{ type: "spring", stiffness: 360, damping: 32 }}
        className="relative"
      >
        <Image
          src={LOGO_SRC}
          alt="WSU Tech"
          fill
          priority
          sizes="64px"
          className="object-contain drop-shadow-[0_1px_1px_rgba(0,0,0,0.12)]"
        />
      </motion.div>
    </Link>
  );
}

function NavItemContent({
  item,
  collapsed,
  active,
}: {
  item: NavItem;
  collapsed: boolean;
  active: boolean;
}) {
  const Icon = getNavIcon(item.icon);

  return (
    <>
      <span className="relative">
        <Icon
          className={cn("shrink-0", collapsed ? "size-5" : "size-[22px]")}
          strokeWidth={1.75}
        />
        {typeof item.badge === "number" && item.badge > 0 && (
          <span className="absolute -top-1.5 -right-2.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#0374B5] px-1 text-[10px] font-bold text-white">
            {item.badge}
          </span>
        )}
      </span>
      <AnimatePresence initial={false}>
        {!collapsed && (
          <motion.span
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="text-[11px] font-medium leading-none"
          >
            {item.title}
          </motion.span>
        )}
      </AnimatePresence>
      <span className="sr-only">{active ? "(current)" : ""}</span>
    </>
  );
}

function navItemClassName(collapsed: boolean, active: boolean) {
  return cn(
    "relative mx-auto flex w-full flex-col items-center justify-center gap-1 px-1 text-black transition-colors",
    collapsed ? "py-3" : "py-2.5",
    active
      ? "bg-white shadow-[inset_0_0_0_1px_rgba(0,0,0,0.04)]"
      : "hover:bg-black/5"
  );
}

function NavLink({
  item,
  collapsed,
  onNavigate,
}: {
  item: NavItem;
  collapsed: boolean;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const { accountOpen, toggleAccountOpen, setAccountOpen } = useSidebar();
  const isAccount = item.href === ACCOUNT_HREF;

  const active = isAccount
    ? accountOpen
    : item.href === "/"
      ? pathname === "/" && !accountOpen
      : item.href === "/courses"
        ? pathname.startsWith("/courses") && !accountOpen
        : pathname.startsWith(item.href) && !accountOpen;

  if (isAccount) {
    const button = (
      <button
        type="button"
        onClick={() => {
          toggleAccountOpen();
          onNavigate?.();
        }}
        className={navItemClassName(collapsed, active)}
        aria-expanded={accountOpen}
        aria-controls="account-tray"
      >
        <NavItemContent item={item} collapsed={collapsed} active={active} />
      </button>
    );

    if (!collapsed) {
      return button;
    }

    return (
      <Tooltip>
        <TooltipTrigger render={<div className="w-full" />}>
          {button}
        </TooltipTrigger>
        <TooltipContent side="right" className="font-medium">
          {item.title}
        </TooltipContent>
      </Tooltip>
    );
  }

  const link = (
    <Link
      href={item.href}
      onClick={() => {
        setAccountOpen(false);
        onNavigate?.();
      }}
      className={navItemClassName(collapsed, active)}
      aria-current={active ? "page" : undefined}
    >
      <NavItemContent item={item} collapsed={collapsed} active={active} />
    </Link>
  );

  if (!collapsed) {
    return link;
  }

  return (
    <Tooltip>
      <TooltipTrigger render={<div className="w-full" />}>{link}</TooltipTrigger>
      <TooltipContent side="right" className="font-medium">
        {item.title}
        {typeof item.badge === "number" && item.badge > 0
          ? ` (${item.badge})`
          : ""}
      </TooltipContent>
    </Tooltip>
  );
}

export function Sidebar({
  mainNav,
  className,
  forceExpanded = false,
}: SidebarProps) {
  const { collapsed: collapsedState, toggleCollapsed, setMobileOpen } =
    useSidebar();
  const collapsed = forceExpanded ? false : collapsedState;

  return (
    <motion.aside
      initial={false}
      animate={{
        width: forceExpanded
          ? "100%"
          : collapsed
            ? SIDEBAR_COLLAPSED
            : SIDEBAR_EXPANDED,
      }}
      transition={{ type: "spring", stiffness: 360, damping: 36 }}
      className={cn(
        "relative z-30 flex h-full flex-col bg-sidebar text-sidebar-foreground",
        className
      )}
    >
      <div
        className={cn(
          "flex shrink-0 items-center justify-center border-b border-black/10 bg-white",
          collapsed ? "h-16 px-1" : "h-[5.25rem] px-2"
        )}
      >
        <WsuLogo compact={collapsed} />
      </div>

      <ScrollArea className="flex-1">
        <nav className="flex flex-col py-1">
          {mainNav.map((item) => (
            <NavLink
              key={item.href}
              item={item}
              collapsed={collapsed}
              onNavigate={() => {
                if (item.href !== ACCOUNT_HREF) {
                  setMobileOpen(false);
                }
              }}
            />
          ))}
        </nav>
      </ScrollArea>

      {!forceExpanded && (
        <div className="hidden border-t border-black/10 p-2 md:block">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleCollapsed}
            className="mx-auto flex size-9 text-black hover:bg-black/10"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? (
              <ChevronRight className="size-4" />
            ) : (
              <ChevronLeft className="size-4" />
            )}
          </Button>
        </div>
      )}
    </motion.aside>
  );
}

export function MobileNavTrigger() {
  const { toggleMobileOpen } = useSidebar();

  return (
    <Button
      variant="ghost"
      size="icon"
      className="md:hidden"
      onClick={toggleMobileOpen}
      aria-label="Open navigation"
    >
      <Menu className="size-5" />
    </Button>
  );
}

export { SIDEBAR_COLLAPSED, SIDEBAR_EXPANDED };
