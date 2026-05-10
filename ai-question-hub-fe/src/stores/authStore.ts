import type { UserRoleType } from "@/constants/roles"
import { create } from "zustand"

export interface UserProfile {
  name: string
  role: UserRoleType
  avatar: string
  userCode?: string
  email?: string
  username?: string
  phoneNumber?: string
}

interface AuthState {
  isLoggedIn: boolean
  token: string | null
  user: UserProfile | null
  login: (token: string, user: UserProfile) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>((set) => {
  const token = localStorage.getItem("token")
  const savedUser = localStorage.getItem("user")
  const user = savedUser ? JSON.parse(savedUser) : null

  return {
    isLoggedIn: !!token,
    token: token || null,
    user: user,
    login: (token: string, user: UserProfile) => {
      localStorage.setItem("token", token)
      localStorage.setItem("user", JSON.stringify(user))
      set({
        isLoggedIn: true,
        token,
        user,
      })
    },
    logout: () => {
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      set({ isLoggedIn: false, token: null, user: null })
    }
  }
})
