import * as React from "react"
import { BrainCircuit, Mail, Lock, Eye, EyeOff } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { useTranslation } from "react-i18next"

interface LoginProps {
  onNavigateToRegister: () => void
  onLoginSuccess?: () => void
}

export function Login({ onNavigateToRegister, onLoginSuccess }: LoginProps) {
  const { t } = useTranslation()
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [remember, setRemember] = React.useState(false)
  const [showPassword, setShowPassword] = React.useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Đăng nhập với:", { email, password, remember })
    if (onLoginSuccess) {
      onLoginSuccess()
    } else {
      alert(`${t("auth.loginSuccess")} ${email}`)
    }
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
            {t("auth.loginTitle")}
          </h2>
          <p className="text-[14px] text-muted-foreground font-sans">
            {t("auth.loginWelcome")}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Email Input */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="email" className="text-sm font-medium text-slate-700 dark:text-slate-300">
              {t("auth.emailLabel")}
            </Label>
            <div className="glass-input h-11 rounded-lg flex items-center px-3 gap-3 transition-all duration-200">
              <Mail className="text-muted-foreground size-5 shrink-0" />
              <Input
                id="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("auth.emailPlaceholder")}
                required
                className="bg-transparent border-none focus-visible:ring-0 shadow-none p-0 h-full w-full font-sans text-[14px] text-foreground placeholder:text-muted-foreground/40"
              />
            </div>
          </div>

          {/* Password Input */}
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

          {/* Controls */}
          <div className="flex items-center justify-between mt-1">
            <label className="flex items-center gap-2 cursor-pointer group">
              <Checkbox
                id="remember"
                checked={remember}
                onCheckedChange={(checked) => setRemember(!!checked)}
              />
              <Label
                htmlFor="remember"
                className="text-sm font-normal text-slate-600 dark:text-slate-400 group-hover:text-foreground transition-colors cursor-pointer"
              >
                {t("auth.rememberMe")}
              </Label>
            </label>
            <a
              href="#"
              className="text-sm font-medium text-primary hover:text-primary-hover transition-colors"
            >
              {t("auth.forgotPassword")}
            </a>
          </div>

          {/* Action Button */}
          <button
            type="submit"
            className="w-full h-12 mt-2 rounded-full bg-[#2e5d97] hover:bg-[#214874] text-white font-semibold text-sm shadow-[0_4px_14px_rgba(46,93,151,0.39)] hover:translate-y-[-2px] hover:shadow-[0_6px_20px_rgba(46,93,151,0.23)] transition-all duration-200 flex justify-center items-center cursor-pointer"
          >
            {t("auth.loginButton")}
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
              {t("auth.noAccount")}{" "}
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  onNavigateToRegister()
                }}
                className="font-semibold text-primary hover:text-primary-hover transition-colors underline decoration-primary/30 hover:decoration-primary underline-offset-4"
              >
                {t("auth.registerNow")}
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
