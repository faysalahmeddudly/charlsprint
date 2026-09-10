import { apiClient } from "./api-client"
import type { AuthSession } from "@/types"
import type { LoginInput, RegisterInput } from "@/lib/validations/auth"

export const authService = {
  login: (input: LoginInput) => apiClient.post<AuthSession>("/auth/login", input),
  register: (input: Omit<RegisterInput, "confirmPassword">) =>
    apiClient.post<AuthSession>("/auth/register", input),
  logout: () => apiClient.post<void>("/auth/logout"),
  me: () => apiClient.get<AuthSession["user"]>("/auth/me"),
}
