import React, {
  createContext,
  useState,
  useLayoutEffect,
  useContext,
} from "react";
import { api } from "./axiosConfig";
import type { User, AuthState } from "./types/auth";
import axios from "axios";
const AuthContext = createContext<AuthState | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = (): AuthState => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return authContext;
};

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);
  const fetchMe = async () => {
    try {
      const response = await api.get("/users/me");
      setIsAuthenticated(true);
      setUser(response.data.data.email);
      setToken(response.data.data.access_token);
    } catch {
      setToken(null);
      throw Error("Invalid token");
    }
  };

  useLayoutEffect(() => {
    const authInterceptor = api.interceptors.request.use((config) => {
      config.headers.Authorization =
        !config._retry && token
          ? `Bearer ${token}`
          : config.headers.Authorization;
      return config;
    });

    return () => {
      api.interceptors.request.eject(authInterceptor);
    };
  }, [token]);

  useLayoutEffect(() => {
    const refreshInterceptor = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        if (
          error.response.status === 403 &&
          error.response.data.message === "Unauthorized"
        ) {
          try {
            const response = await api.get("/api/refreshToken");
            setToken(response.data.accessToken);
            originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;
            originalRequest._retry = true;

            return api(originalRequest);
          } catch {
            setToken(null);
          }
        }
        return Promise.reject(error);
      }
    );
    return () => {
      api.interceptors.response.eject(refreshInterceptor);
    };
  }, []);

  const login = async (email: string, password: string) => {
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    const redirectValue = params.get("redirect");

    setIsAuthenticated(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_HOST}auth/login`,
        { email, password },
        { withCredentials: true }
      );

      setIsAuthenticated(true);
      setUser(response.data.data.email);
      setToken(response.data.data.access_token);

      window.history.pushState({}, "", redirectValue ? redirectValue : "/");
      window.dispatchEvent(new PopStateEvent("popstate"));
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  const register = async (
    email: string,
    password: string,
    confirmPassword: string
  ) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_HOST}auth/register`,
        { email, password, confirmPassword }
      );
      console.log(response);
      window.location.href = "/about";
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, login, logout, register, fetchMe }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
