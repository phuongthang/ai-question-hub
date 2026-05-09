import * as React from "react"
import { BrainCircuit, Mail, Lock, Eye, EyeOff } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"

interface LoginProps {
  onNavigateToRegister: () => void
  onLoginSuccess?: () => void
}

export function Login({ onNavigateToRegister, onLoginSuccess }: LoginProps) {
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
      alert(`Đăng nhập thành công với: ${email}`)
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
            Đăng nhập
          </h2>
          <p className="text-[14px] text-muted-foreground font-sans">
            Chào mừng trở lại!
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Email Input */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="email" className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Email hoặc tên đăng nhập
            </Label>
            <div className="glass-input h-11 rounded-lg flex items-center px-3 gap-3 transition-all duration-200">
              <Mail className="text-muted-foreground size-5 shrink-0" />
              <Input
                id="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Nhập email của bạn"
                required
                className="bg-transparent border-none focus-visible:ring-0 shadow-none p-0 h-full w-full font-sans text-[14px] text-foreground placeholder:text-muted-foreground/40"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="password" className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Mật khẩu
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
                className="text-muted-foreground hover:text-foreground transition-colors flex items-center"
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
                Ghi nhớ đăng nhập
              </Label>
            </label>
            <a
              href="#"
              className="text-sm font-medium text-primary hover:text-primary-hover transition-colors"
            >
              Quên mật khẩu?
            </a>
          </div>

          {/* Action Button */}
          <button
            type="submit"
            className="w-full h-12 mt-2 rounded-full bg-[#2e5d97] hover:bg-[#214874] text-white font-semibold text-sm shadow-[0_4px_14px_rgba(46,93,151,0.39)] hover:translate-y-[-2px] hover:shadow-[0_6px_20px_rgba(46,93,151,0.23)] transition-all duration-200 flex justify-center items-center cursor-pointer"
          >
            Đăng nhập
          </button>
        </form>

        {/* Footer Section */}
        <div className="flex flex-col gap-4 mt-2">
          <div className="flex items-center gap-3">
            <div className="h-px bg-slate-200 dark:bg-slate-800 flex-1" />
            <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
              hoặc
            </span>
            <div className="h-px bg-slate-200 dark:bg-slate-800 flex-1" />
          </div>
          <div className="text-center">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Chưa có tài khoản?{" "}
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  onNavigateToRegister()
                }}
                className="font-semibold text-primary hover:text-primary-hover transition-colors underline decoration-primary/30 hover:decoration-primary underline-offset-4"
              >
                Đăng ký ngay
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
