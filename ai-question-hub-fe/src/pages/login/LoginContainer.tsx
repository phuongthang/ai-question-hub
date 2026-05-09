import { useForm, FormProvider } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { loginSchema, type LoginInput } from "@/schemas/auth"
import { useAuthStore } from "@/stores/authStore"
import { LoginPage } from "./LoginPage"
import { LoginContext } from "@/contexts/LoginContext"

interface LoginContainerProps {
  onLoginSuccess?: () => void
}

export function LoginContainer({ onLoginSuccess }: LoginContainerProps) {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const login = useAuthStore((state) => state.login)

  const methods = useForm<LoginInput>({
    mode: "onBlur",
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  })

  const onSubmit = (data: LoginInput) => {
    console.log("Đăng nhập thành công với dữ liệu:", data)
    login(data.email)
    if (onLoginSuccess) {
      onLoginSuccess()
    } else {
      alert(`${t("auth.loginSuccess")} ${data.email}`)
      navigate("/dashboard")
    }
  }

  return (
    <FormProvider {...methods}>
      <LoginContext.Provider value={{ onSubmit }}>
        <LoginPage />
      </LoginContext.Provider>
    </FormProvider>
  )
}

