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
import { savedAnalyses as initialSavedAnalyses, type SavedAnalysis } from "@/lib/data/intelligence-mock";

const SESSION_KEY = "terasight_session";
const WORKSPACE_KEY = "terasight_workspace";
const SAVED_ANALYSES_KEY = "terasight_saved_analyses";

export interface SessionUser {
  name: string;
  email: string;
  organization: string;
  role: string;
  avatarInitials: string;
}

export interface Workspace {
  id: string;
  name: string;
  short: string;
}

export const WORKSPACES: Workspace[] = [
  { id: "smc", name: "Surat Municipal Corp", short: "SMC" },
  { id: "namami", name: "Namami Gange Mission", short: "NGM" },
  { id: "iitb", name: "IIT Bombay Analytics", short: "IITB" },
];

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
  activeWorkspace: Workspace;
  setActiveWorkspace: (workspace: Workspace) => void;
  savedAnalysesList: SavedAnalysis[];
  saveAnalysis: (title: string, site: string, risk: number, tags: string[]) => void;
}

const SessionContext = createContext<SessionContextValue | null>(null);

export function SessionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<SessionUser | null>(null);
  const [activeWorkspace, setActiveWorkspaceState] = useState<Workspace>(WORKSPACES[0]);
  const [savedAnalysesList, setSavedAnalysesList] = useState<SavedAnalysis[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(SESSION_KEY);
      if (raw) {
        setUser(JSON.parse(raw) as SessionUser);
      }
      const rawWs = localStorage.getItem(WORKSPACE_KEY);
      if (rawWs) {
        const found = WORKSPACES.find((w) => w.id === rawWs);
        if (found) setActiveWorkspaceState(found);
      }
      const rawSaved = localStorage.getItem(SAVED_ANALYSES_KEY);
      if (rawSaved) {
        setSavedAnalysesList(JSON.parse(rawSaved));
      } else {
        setSavedAnalysesList(initialSavedAnalyses);
      }
    } catch {
      localStorage.removeItem(SESSION_KEY);
      localStorage.removeItem(WORKSPACE_KEY);
      localStorage.removeItem(SAVED_ANALYSES_KEY);
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
    localStorage.removeItem(WORKSPACE_KEY);
    localStorage.removeItem(SAVED_ANALYSES_KEY);
    setUser(null);
    router.push("/login");
  }, [router]);

  const setActiveWorkspace = useCallback((ws: Workspace) => {
    localStorage.setItem(WORKSPACE_KEY, ws.id);
    setActiveWorkspaceState(ws);
  }, []);

  const saveAnalysis = useCallback((title: string, site: string, risk: number, tags: string[]) => {
    const newSaved: SavedAnalysis = {
      id: `saved-${Date.now()}`,
      title,
      site,
      risk,
      tags,
      savedAt: "just now",
    };
    setSavedAnalysesList((prev) => {
      const next = [newSaved, ...prev];
      localStorage.setItem(SAVED_ANALYSES_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const value = useMemo(
    () => ({
      user: hydrated ? user : null,
      isAuthenticated: hydrated && user !== null,
      login,
      logout,
      activeWorkspace,
      setActiveWorkspace,
      savedAnalysesList,
      saveAnalysis,
    }),
    [hydrated, user, login, logout, activeWorkspace, setActiveWorkspace, savedAnalysesList, saveAnalysis],
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
