"use client";

import { useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

const SESSION_KEY = "terasight_session";

export interface SessionUser {
  name: string;
  email: string;
  organization: string;
  role: string;
  avatarInitials: string;
}

const DEFAULT_USER: SessionUser = {
  name: "Vishal Sharma",
  email: "vishal.sharma@suratmunicipal.gov.in",
  organization: "Surat Municipal Corporation",
  role: "Environmental Analyst",
  avatarInitials: "VS",
};

interface SessionContextValue {
  user: SessionUser | null;
  isAuthenticated: boolean;
  login: (user?: Partial<SessionUser>) => void;
  logout: () => void;
}

const SessionContext = createContext<SessionContextValue | null>(null);

export function SessionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<SessionUser | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(SESSION_KEY);
      if (raw) {
        setUser(JSON.parse(raw) as SessionUser);
      }
    } catch {
      localStorage.removeItem(SESSION_KEY);
    }
    setHydrated(true);
  }, []);

  const login = useCallback((partial?: Partial<SessionUser>) => {
    const nextUser = { ...DEFAULT_USER, ...partial };
    localStorage.setItem(SESSION_KEY, JSON.stringify(nextUser));
    setUser(nextUser);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(SESSION_KEY);
    setUser(null);
    router.push("/login");
  }, [router]);

  const value = useMemo(
    () => ({
      user: hydrated ? user : null,
      isAuthenticated: hydrated && user !== null,
      login,
      logout,
    }),
    [hydrated, user, login, logout],
  );

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}

export function useSession() {
  const ctx = useContext(SessionContext);
  if (!ctx) {
    throw new Error("useSession must be used within SessionProvider");
  }
  return ctx;
}
