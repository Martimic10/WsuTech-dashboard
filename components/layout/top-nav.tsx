"use client";

import { Bell, Menu, Search } from "lucide-react";
import { motion } from "framer-motion";

import { ThemeToggle } from "@/components/layout/theme-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { useSidebar } from "@/hooks/use-sidebar";
import type { Notification, User } from "@/types";

type TopNavProps = {
  user: User;
  notifications: Notification[];
};

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function TopNav({ user, notifications }: TopNavProps) {
  const { toggleMobileOpen } = useSidebar();
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-border/80 bg-background/80 px-4 backdrop-blur-xl md:px-6">
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden"
        onClick={toggleMobileOpen}
        aria-label="Open navigation"
      >
        <Menu className="size-5" />
      </Button>

      <div className="relative hidden min-w-0 flex-1 md:block md:max-w-md">
        <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search courses, assignments, people…"
          className="h-10 rounded-xl border-border/80 bg-muted/40 pl-9 shadow-none focus-visible:bg-background"
          disabled
          aria-label="Search"
        />
      </div>

      <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          aria-label="Search"
          disabled
        >
          <Search className="size-4" />
        </Button>

        <ThemeToggle />

        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button
                variant="ghost"
                size="icon"
                className="relative size-9"
                aria-label="Notifications"
              />
            }
          >
            <Bell className="size-4" />
            {unreadCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-1.5 right-1.5 flex size-4 items-center justify-center rounded-full bg-brand text-[10px] font-semibold text-brand-foreground"
              >
                {unreadCount}
              </motion.span>
            )}
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel className="flex items-center justify-between">
              <span>Notifications</span>
              {unreadCount > 0 && (
                <Badge variant="secondary" className="rounded-full text-[10px]">
                  {unreadCount} new
                </Badge>
              )}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {notifications.length === 0 ? (
              <div className="px-2 py-6 text-center text-sm text-muted-foreground">
                You&apos;re all caught up.
              </div>
            ) : (
              notifications.map((notification) => (
                <DropdownMenuItem
                  key={notification.id}
                  className="flex flex-col items-start gap-0.5 py-2.5"
                >
                  <span className="text-sm font-medium">{notification.title}</span>
                  <span className="line-clamp-2 text-xs text-muted-foreground">
                    {notification.description}
                  </span>
                </DropdownMenuItem>
              ))
            )}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button
                variant="ghost"
                className="h-10 gap-2 rounded-xl px-1.5 sm:px-2"
                aria-label="Account menu"
              />
            }
          >
            <Avatar size="sm" className="size-8">
              {user.avatarUrl ? (
                <AvatarImage src={user.avatarUrl} alt={user.name} />
              ) : null}
              <AvatarFallback className="bg-brand/15 text-xs font-semibold text-brand">
                {getInitials(user.name)}
              </AvatarFallback>
            </Avatar>
            <span className="hidden min-w-0 flex-col items-start text-left sm:flex">
              <span className="max-w-[120px] truncate text-sm font-medium leading-tight">
                {user.name}
              </span>
              <span className="max-w-[120px] truncate text-[11px] text-muted-foreground leading-tight">
                {user.program ?? user.role}
              </span>
            </span>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div className="flex flex-col gap-0.5">
                <span>{user.name}</span>
                <span className="text-xs font-normal text-muted-foreground">
                  {user.email}
                </span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem disabled>Profile</DropdownMenuItem>
            <DropdownMenuItem disabled>Preferences</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem disabled>Sign out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
