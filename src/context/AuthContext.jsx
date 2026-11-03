import { createContext, useContext, useMemo, useState } from "react";

// Mock authentication. There is no backend: "logged in" is just a boolean.
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const value = useMemo(
    () => ({
      isLoggedIn,
      login: () => setIsLoggedIn(true),
      logout: () => setIsLoggedIn(false),
    }),
    [isLoggedIn]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside an AuthProvider");
  return context;
}
