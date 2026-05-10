import * as React from "react"
import { type LoginInput } from "@/schemas/auth"

export interface LoginContextType {
  onSubmit: (data: LoginInput) => void
  errorMessage?: string | null
  isLoading?: boolean
}

export const LoginContext = React.createContext<LoginContextType | undefined>(undefined)

export function useLogin() {
  const context = React.useContext(LoginContext)
  if (!context) {
    throw new Error("useLogin must be used within a LoginContext.Provider")
  }
  return context
}
