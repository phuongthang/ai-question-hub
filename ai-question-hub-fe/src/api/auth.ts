import { useMutation } from "@tanstack/react-query"
import { api } from "./client"
import { type LoginInput, type RegisterInput } from "@/schemas/auth"
import type { UserRoleType } from "@/constants/roles"

export interface UserResponse {
  id: number
  username: string
  userCode: string
  role: UserRoleType
  email: string
  fullName: string
  avatarUrl: string | null
  phoneNumber: string
}

export interface AuthResponse {
  accessToken: string
  tokenType: string
  expiresIn: number
  user: UserResponse
}

/**
 * Hook for user login.
 */
export function useLoginMutation() {
  return useMutation<AuthResponse, any, LoginInput>({
    mutationFn: (credentials) => {
      return api.post<AuthResponse>("/auth/login", {
        username: credentials.username,
        password: credentials.password,
      })
    },
  })
}

/**
 * Hook for user registration.
 */
export function useRegisterMutation() {
  return useMutation<AuthResponse, any, RegisterInput>({
    mutationFn: (userData) => {
      return api.post<AuthResponse>("/auth/register", {
        username: userData.username,
        email: userData.email,
        password: userData.password,
        fullName: userData.fullname,
        phoneNumber: userData.phoneNumber,
      })
    },
  })
}
