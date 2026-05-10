import { useForm, FormProvider } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useNavigate } from "react-router-dom"
import { loginSchema, type LoginInput } from "@/schemas/auth"
import { useAuthStore } from "@/stores/authStore"
import { LoginPage } from "./LoginPage"
import { LoginContext } from "@/contexts/LoginContext"
import { useLoginMutation } from "@/api/auth"
import { useState } from "react"
import type { UserRoleType } from "@/constants/roles"

export function LoginContainer() {
  const navigate = useNavigate()
  const login = useAuthStore((state) => state.login)
  const loginMutation = useLoginMutation()
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const methods = useForm<LoginInput>({
    mode: "onBlur",
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
      remember: false,
    },
  })

  const onSubmit = (data: LoginInput) => {
    setErrorMessage(null)
    loginMutation.mutate(data, {
      onSuccess: (res) => {
        login(res.accessToken, {
          name: res.user.fullName,
          role: res.user.role as unknown as UserRoleType,
          avatar: res.user.avatarUrl || "",
          userCode: res.user.userCode,
          email: res.user.email,
          username: res.user.username,
          phoneNumber: res.user.phoneNumber,
        })
        navigate("/dashboard")
      },
      onError: (err: any) => {
        setErrorMessage(err.message)
      },
    })
  }

  return (
    <FormProvider {...methods}>
      <LoginContext.Provider value={{ onSubmit, errorMessage, isLoading: loginMutation.isPending }}>
        <LoginPage />
      </LoginContext.Provider>
    </FormProvider>
  )
}
export default LoginContainer
