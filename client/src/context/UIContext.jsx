/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useState } from "react";

const UIContext = createContext(null);
const THEME_KEY = "screensense-theme";
const PROFILE_KEY = "screensense-profile";

function getInitialProfile() {
  try {
    const saved = JSON.parse(localStorage.getItem(PROFILE_KEY));
    if (saved) return saved;
    const user = JSON.parse(localStorage.getItem("user"));
    return { name: user?.name || "User", email: user?.email || "", role: "Student", avatar: "" };
  } catch { return { name: "User", email: "", role: "Student", avatar: "" }; }
}

export function UIProvider({ children }) {
  const [theme, setThemeState] = useState(() => localStorage.getItem(THEME_KEY) || "dark");
  const [profile, setProfile] = useState(getInitialProfile);
  const setTheme = (value) => { setThemeState(value); localStorage.setItem(THEME_KEY, value); };
  const updateProfile = (next) => setProfile((current) => {
    const updated = { ...current, ...next };
    localStorage.setItem(PROFILE_KEY, JSON.stringify(updated));
    return updated;
  });

  useEffect(() => {
    const resolved = theme === "system" ? (window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark") : theme;
    document.documentElement.dataset.theme = resolved;
  }, [theme]);

  const value = useMemo(() => ({ theme, setTheme, profile, updateProfile }), [theme, profile]);
  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}

export function useUI() {
  const context = useContext(UIContext);
  if (!context) throw new Error("useUI must be used inside UIProvider");
  return context;
}
