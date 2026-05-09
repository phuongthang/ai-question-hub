import * as React from "react"
import { type RegisterInput } from "@/schemas/auth"

export interface RegisterContextType {
  onSubmit: (data: RegisterInput) => void
}

export const RegisterContext = React.createContext<RegisterContextType | undefined>(undefined)

export function useRegister() {
  const context = React.useContext(RegisterContext)
  if (!context) {
    throw new Error("useRegister must be used within a RegisterContext.Provider")
  }
  return context
}
