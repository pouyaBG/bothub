import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "./api";

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface User {
  id: string;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  full_name: string;
  name?: string; // For backward compatibility with TopBar
  status: string;
  role?: string;
}

export interface LoginResponse {
  access: string;
  refresh: string;
  user?: User; // Make user optional since API might not return it
}

// API calls
export const authAPI = {
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    return api.post<LoginResponse>("/login/", credentials);
  },

  logout: async (): Promise<void> => {
    return api.post<void>("/logout", {});
  },

  // me: async (): Promise<User> => {
  //   return api.get<User>("/me");
  // }
};

// React Query hooks
export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authAPI.login,
    onSuccess: (data) => {
      // Store token and user data
      localStorage.setItem("authToken", data.access);
      localStorage.setItem("refreshToken", data.refresh);

      // If API returns user data, store it. Otherwise create a minimal user object
      const userData = data.user || {
        id: "temp_user",
        username: "user",
        first_name: "کاربر",
        last_name: "سیستم",
        email: "user@example.com",
        full_name: "کاربر سیستم",
        name: "کاربر سیستم", // Add name field for TopBar compatibility
        status: "ACTIVE"
      };

      localStorage.setItem("user", JSON.stringify(userData));

      // Update query cache
      queryClient.setQueryData(["user"], userData);
    },
    onError: (error) => {
      console.error("Login failed:", error);
      // Clear any existing auth data on login failure
      localStorage.removeItem("authToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
    }
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authAPI.logout,
    onSuccess: () => {
      // Clear all auth data
      localStorage.removeItem("authToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");

      // Clear query cache
      queryClient.removeQueries({ queryKey: ["user"] });
      queryClient.clear();
    },
    onError: (error) => {
      console.error("Logout failed:", error);
      // Even if logout API fails, clear local data
      localStorage.removeItem("authToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
      queryClient.removeQueries({ queryKey: ["user"] });
    }
  });
};