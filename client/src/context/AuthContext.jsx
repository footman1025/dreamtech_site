import { createContext, useContext } from 'react';

const AuthContext = createContext({ user: null, login: () => {}, logout: () => {} });

export function AuthProvider({ children }) {
  return <AuthContext.Provider value={{ user: null, login: () => {}, logout: () => {} }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
