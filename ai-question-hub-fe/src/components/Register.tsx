import * as React from "react"
import { BrainCircuit, Mail, Lock, Eye, EyeOff, User, UserCheck, ArrowRight, AlertCircle } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useTranslation } from "react-i18next"

interface RegisterProps {
  onNavigateToLogin: () => void
}

export function Register({ onNavigateToLogin }: RegisterProps) {
  const { t } = useTranslation()
  const [fullname, setFullname] = React.useState("")
  const [username, setUsername] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [confirmPassword, setConfirmPassword] = React.useState("")
  
  const [showPassword, setShowPassword] = React.useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false)
  
  const [emailTouched, setEmailTouched] = React.useState(false)
  const [confirmTouched, setConfirmTouched] = React.useState(false)

  // Validate email format
  const isEmailValid = (emailStr: string) => {
    if (!emailStr) return true
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(emailStr)
  }

  const hasEmailError = emailTouched && !isEmailValid(email)
  const hasPasswordMismatch = confirmTouched && password !== confirmPassword

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setEmailTouched(true)
    setConfirmTouched(true)

    if (!isEmailValid(email)) {
      return
    }

    if (password !== confirmPassword) {
      return
    }

    console.log("Đăng ký với:", { fullname, username, email, password })
    alert(`${t("auth.registerSuccess")} ${fullname}`)
    onNavigateToLogin()
  }

  return (
    <div className="glass-panel w-full rounded-2xl relative overflow-hidden flex flex-col">
      <div className="p-10 flex flex-col gap-6">
        {/* Logo Header */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl logo-gradient flex items-center justify-center shadow-sm">
            <BrainCircuit className="text-white size-6" />
          </div>
          <h1 className="text-[22px] font-semibold tracking-[-0.3px] text-foreground font-sans">
            AI Q-Gen
          </h1>
        </div>

        {/* Title & Description */}
        <div>
          <h2 className="text-[26px] font-bold tracking-[-0.4px] text-foreground mb-1 font-sans">
            {t("auth.registerTitle")}
          </h2>
          <p className="text-[14px] text-muted-foreground font-sans">
            {t("auth.registerWelcome")}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Họ và tên */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="fullname" className="text-sm font-medium text-slate-700 dark:text-slate-300">
              {t("auth.fullNameLabel")}
            </Label>
            <div className="glass-input h-11 rounded-lg flex items-center px-3 gap-3 transition-all duration-200">
              <User className="text-muted-foreground size-5 shrink-0" />
              <Input
                id="fullname"
                type="text"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                placeholder={t("auth.fullNamePlaceholder")}
                required
                className="bg-transparent border-none focus-visible:ring-0 shadow-none p-0 h-full w-full font-sans text-[14px] text-foreground placeholder:text-muted-foreground/40"
              />
            </div>
          </div>

          {/* Tên đăng nhập */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="username" className="text-sm font-medium text-slate-700 dark:text-slate-300">
              {t("auth.emailLabel")}
            </Label>
            <div className="glass-input h-11 rounded-lg flex items-center px-3 gap-3 transition-all duration-200">
              <UserCheck className="text-muted-foreground size-5 shrink-0" />
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder={t("auth.emailPlaceholder")}
                required
                className="bg-transparent border-none focus-visible:ring-0 shadow-none p-0 h-full w-full font-sans text-[14px] text-foreground placeholder:text-muted-foreground/40"
              />
            </div>
          </div>

          {/* Email Input with Error State */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="email" className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Email
            </Label>
            <div 
              className={`glass-input h-11 rounded-lg flex items-center px-3 gap-3 transition-all duration-200 ${
                hasEmailError ? "border-destructive/80 focus-within:border-destructive/80 focus-within:ring-destructive/30" : ""
              }`}
            >
              <Mail className={`${hasEmailError ? "text-destructive" : "text-muted-foreground"} size-5 shrink-0`} />
              <Input
                id="email"
                type="text"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  if (emailTouched) setEmailTouched(false) // clear error while typing, re-evaluate on blur
                }}
                onBlur={() => setEmailTouched(true)}
                placeholder={t("auth.emailPlaceholder")}
                required
                className="bg-transparent border-none focus-visible:ring-0 shadow-none p-0 h-full w-full font-sans text-[14px] text-foreground placeholder:text-muted-foreground/40"
              />
              {hasEmailError && (
                <AlertCircle className="text-destructive size-5 shrink-0 animate-bounce" />
              )}
            </div>
            {hasEmailError && (
              <p className="text-xs text-destructive font-sans mt-0.5 flex items-center gap-1">
                Email không hợp lệ
              </p>
            )}
          </div>

          {/* Mật khẩu */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="password" className="text-sm font-medium text-slate-700 dark:text-slate-300">
              {t("auth.passwordLabel")}
            </Label>
            <div className="glass-input h-11 rounded-lg flex items-center px-3 gap-3 transition-all duration-200">
              <Lock className="text-muted-foreground size-5 shrink-0" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="bg-transparent border-none focus-visible:ring-0 shadow-none p-0 h-full w-full font-sans text-[14px] text-foreground placeholder:text-muted-foreground/40"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-muted-foreground hover:text-foreground transition-colors flex items-center cursor-pointer"
              >
                {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
              </button>
            </div>
          </div>

          {/* Xác nhận mật khẩu */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="confirm_password" className="text-sm font-medium text-slate-700 dark:text-slate-300">
              {t("auth.confirmPasswordLabel")}
            </Label>
            <div 
              className={`glass-input h-11 rounded-lg flex items-center px-3 gap-3 transition-all duration-200 ${
                hasPasswordMismatch ? "border-destructive/80 focus-within:border-destructive/80 focus-within:ring-destructive/30" : ""
              }`}
            >
              <Lock className={`${hasPasswordMismatch ? "text-destructive" : "text-muted-foreground"} size-5 shrink-0`} />
              <Input
                id="confirm_password"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value)
                  if (confirmTouched) setConfirmTouched(false)
                }}
                onBlur={() => setConfirmTouched(true)}
                placeholder="••••••••"
                required
                className="bg-transparent border-none focus-visible:ring-0 shadow-none p-0 h-full w-full font-sans text-[14px] text-foreground placeholder:text-muted-foreground/40"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="text-muted-foreground hover:text-foreground transition-colors flex items-center cursor-pointer"
              >
                {showConfirmPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
              </button>
            </div>
            {hasPasswordMismatch && (
              <p className="text-xs text-destructive font-sans mt-0.5 flex items-center gap-1">
                Mật khẩu không khớp
              </p>
            )}
          </div>

          {/* Action Button */}
          <button
            type="submit"
            className="w-full h-12 mt-2 rounded-full bg-[#2e5d97] hover:bg-[#214874] text-white font-semibold text-sm shadow-[0_4px_14px_rgba(46,93,151,0.39)] hover:translate-y-[-2px] hover:shadow-[0_6px_20px_rgba(46,93,151,0.23)] transition-all duration-200 flex justify-center items-center gap-2 cursor-pointer"
          >
            {t("auth.registerButton")}
            <ArrowRight className="size-4 shrink-0" />
          </button>
        </form>

        {/* Footer Section */}
        <div className="flex flex-col gap-4 mt-2">
          <div className="flex items-center gap-3">
            <div className="h-px bg-slate-200 dark:bg-slate-800 flex-1" />
            <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
              {t("common.or") || "or"}
            </span>
            <div className="h-px bg-slate-200 dark:bg-slate-800 flex-1" />
          </div>
          <div className="text-center">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              {t("auth.haveAccount")}{" "}
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  onNavigateToLogin()
                }}
                className="font-semibold text-primary hover:text-primary-hover transition-colors underline decoration-primary/30 hover:decoration-primary underline-offset-4"
              >
                {t("auth.loginNow")}
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
