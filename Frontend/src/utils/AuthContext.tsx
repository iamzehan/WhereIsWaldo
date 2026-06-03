import React, {
  createContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import * as request from "./requests.auth";
/* ======================= Types ======================= */

export interface User {
  username: string;
  firstName: string;
  lastName: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface AuthContextType {
  accessToken: string | null;
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
  setAccessToken: React.Dispatch<React.SetStateAction<string | null>>;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

/* ======================= Context======================= */

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/* ======================= Provider ======================= */

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  /* Restore session on app reload */
  useEffect(() => {
    const restoreSession = async () => {
      try {
        // Refresh token via cookie
        const refreshRes = await request.fetchRefresh();

        if (!refreshRes.ok) throw new Error("Refresh failed");

        const refreshData: { accessToken: string } = await refreshRes.json();
        setAccessToken(refreshData.accessToken);

        // Fetch user profile
        const meRes = await request.fetchProfile(refreshData);
        if (!meRes.ok) throw new Error("User fetch failed");
        const meData: User = await meRes.json();
        setUser(meData);
      } catch (err) {
        console.log(err)
        setAccessToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    restoreSession();
  }, []);

//  ------------------------------------ LOGIN USER ----------------------------------- //
  const login = async (credentials: LoginCredentials): Promise<void> => {
    // Login form Credentials
    const loginRes = await request.fetchLogin(credentials);

    if (!loginRes.ok) {
      throw new Error("Login failed");
    }

    const loginData: { accessToken: string } = await loginRes.json();
    setAccessToken(loginData.accessToken);

    // Fetch user
    const meRes = await request.fetchProfile(loginData);
    if (!meRes.ok) {
      throw new Error("User fetch failed");
    }

    const meData: User = await meRes.json();
    setUser(meData);
  };

  //  ------------------------------------ LOGOUT USER ----------------------------------- //
  const logout = async () => {
    try {
      await request.fetchLogout();
        setAccessToken(null);
        setUser(null);
    } catch {
      // ignore network errors
    }
  };

  const value: AuthContextType = {
    accessToken,
    user,
    loading,
    isAuthenticated: !!accessToken,
    login,
    logout,
    setAccessToken,
    setUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}


export default AuthContext;