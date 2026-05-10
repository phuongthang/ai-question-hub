import { useForm, FormProvider } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { registerSchema, type RegisterInput } from "@/schemas/auth"
import { RegisterContext } from "@/contexts/RegisterContext"
import { RegisterPage } from "./RegisterPage"
import { useRegisterMutation } from "@/api/auth"
import { useState } from "react"

interface RegisterContainerProps {
  onNavigateToLogin?: () => void
}

export function RegisterContainer({ onNavigateToLogin }: RegisterContainerProps) {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const registerMutation = useRegisterMutation()
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const methods = useForm<RegisterInput>({
    mode: "onBlur",
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullname: "",
      username: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
    },
  })

  const onSubmit = (data: RegisterInput) => {
    setErrorMessage(null)
    registerMutation.mutate(data, {
      onSuccess: (res) => {
        console.log("Đăng ký thành công:", res)
        alert(`${t("auth.registerSuccess")} ${res.user.fullName}`)
        if (onNavigateToLogin) {
          onNavigateToLogin()
        } else {
          navigate("/login")
        }
      },
      onError: (err: any) => {
        console.error("Lỗi đăng ký:", err)
        setErrorMessage(err.message || "Đăng ký thất bại. Vui lòng kiểm tra lại thông tin.")
      },
    })
  }

  return (
    <FormProvider {...methods}>
      <RegisterContext.Provider value={{ onSubmit, errorMessage, isLoading: registerMutation.isPending }}>
        <RegisterPage />
      </RegisterContext.Provider>
    </FormProvider>
  )
}
export default RegisterContainer
