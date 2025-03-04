/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import AuthService from "../services/AuthService";

interface User {
  userId?: string;
  email?: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isWorker: boolean;
  isSupervisor: boolean;
  loading: boolean;
  login: (credentials: { username: string; password: string }) => Promise<{
    success: boolean;
    message: string;
  }>;
  logout: () => void;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const authService = new AuthService();

  // Initialize auth state on component mount
  useEffect(() => {
    const initializeAuth = () => {
      try {
        if (authService.isAuthenticated()) {
          const currentUser = authService.getCurrentUser();
          if (currentUser) {
            setUser({
              userId: currentUser.userId,
              role: currentUser.role
            });
          }
        }
      } catch (error) {
        console.error("Error initializing auth:", error);
        // Clear invalid auth state
        authService.logout();
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // Login function
  const login = async (credentials: { username: string; password: string }) => {
    setLoading(true);
    try {
      const result = await authService.login(credentials);
      
      if (result.success && result.role) {
        const currentUser = authService.getCurrentUser();
        if (currentUser) {
          setUser({
            userId: currentUser.userId,
            role: currentUser.role
          });
        }
      }
      
      setLoading(false);
      return result;
    } catch (error: any) {
      setLoading(false);
      return {
        success: false,
        message: error.message || "An unexpected error occurred"
      };
    }
  };

  // Logout function
  const logout = () => {
    authService.logout();
    setUser(null);
  };

  // Derived state
  const isAuthenticated = !!user;
  const isAdmin = user?.role === "admin";
  const isWorker = user?.role === "worker";
  const isSupervisor = user?.role === "supervisor";

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isAdmin,
        isWorker,
        isSupervisor,
        loading,
        login,
        logout,
        setUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};