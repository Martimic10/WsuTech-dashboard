"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

const SIDEBAR_STORAGE_KEY = "wsutech-sidebar-collapsed";

type SidebarContextValue = {
  collapsed: boolean;
  mobileOpen: boolean;
  accountOpen: boolean;
  toggleCollapsed: () => void;
  setCollapsed: (value: boolean) => void;
  setMobileOpen: (value: boolean) => void;
  toggleMobileOpen: () => void;
  setAccountOpen: (value: boolean) => void;
  toggleAccountOpen: () => void;
};

const SidebarContext = createContext<SidebarContextValue | null>(null);

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsedState] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(SIDEBAR_STORAGE_KEY);
    if (stored === "true") {
      setCollapsedState(true);
    }
    setHydrated(true);
  }, []);

  const setCollapsed = useCallback((value: boolean) => {
    setCollapsedState(value);
    window.localStorage.setItem(SIDEBAR_STORAGE_KEY, String(value));
  }, []);

  const toggleCollapsed = useCallback(() => {
    setCollapsedState((prev) => {
      const next = !prev;
      window.localStorage.setItem(SIDEBAR_STORAGE_KEY, String(next));
      return next;
    });
  }, []);

  const toggleMobileOpen = useCallback(() => {
    setMobileOpen((prev) => !prev);
  }, []);

  const toggleAccountOpen = useCallback(() => {
    setAccountOpen((prev) => !prev);
  }, []);

  return (
    <SidebarContext.Provider
      value={{
        collapsed: hydrated ? collapsed : false,
        mobileOpen,
        accountOpen,
        toggleCollapsed,
        setCollapsed,
        setMobileOpen,
        toggleMobileOpen,
        setAccountOpen,
        toggleAccountOpen,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
}
