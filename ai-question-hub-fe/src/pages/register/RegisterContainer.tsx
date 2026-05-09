import { useForm, FormProvider } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { registerSchema, type RegisterInput } from "@/schemas/auth"
import { RegisterContext } from "@/contexts/RegisterContext"
import RegisterPage from "./RegisterPage"

interface RegisterContainerProps {
  onNavigateToLogin?: () => void
}

export function RegisterContainer({ onNavigateToLogin }: RegisterContainerProps) {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const methods = useForm<RegisterInput>({
    mode: "onBlur",
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullname: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  const onSubmit = (data: RegisterInput) => {
    console.log("Đăng ký thành công với dữ liệu:", data)
    alert(`${t("auth.registerSuccess")} ${data.fullname}`)

    if (onNavigateToLogin) {
      onNavigateToLogin()
    } else {
      navigate("/login")
    }
  }

  return (
    <FormProvider {...methods}>
      <RegisterContext.Provider value={{ onSubmit }}>
        <RegisterPage />
      </RegisterContext.Provider>
    </FormProvider>
  )
}
export default RegisterContainer
