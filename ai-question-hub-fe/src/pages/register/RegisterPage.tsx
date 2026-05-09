import { BrainCircuit, Mail, Lock, User, UserCheck, ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { useFormContext } from "react-hook-form"
import { type RegisterInput } from "@/schemas/auth"
import { FormInput } from "@/components/FormInput"
import { useRegister } from "@/contexts/RegisterContext"

export function RegisterPage() {
  const { t } = useTranslation()
  const { handleSubmit } = useFormContext<RegisterInput>()
  const { onSubmit } = useRegister()

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
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
          {/* Full Name */}
          <FormInput
            name="fullname"
            label={t("auth.fullNameLabel")}
            placeholder={t("auth.fullNamePlaceholder")}
            icon={User}
          />

          {/* Username */}
          <FormInput
            name="username"
            label={t("auth.userNameLabel")}
            placeholder={t("auth.userNamePlaceholder")}
            icon={UserCheck}
          />

          {/* Email */}
          <FormInput
            name="email"
            label={t("auth.emailLabel")}
            placeholder={t("auth.emailPlaceholder")}
            icon={Mail}
          />

          {/* Password */}
          <FormInput
            name="password"
            label={t("auth.passwordLabel")}
            placeholder="••••••••"
            type="password"
            icon={Lock}
          />

          {/* Confirm Password */}
          <FormInput
            name="confirmPassword"
            label={t("auth.confirmPasswordLabel")}
            placeholder="••••••••"
            type="password"
            icon={Lock}
          />

          {/* Action Button */}
          <button
            type="submit"
            className="w-full h-12 mt-4 rounded-full bg-[#2e5d97] hover:bg-[#214874] text-white font-semibold text-sm shadow-[0_4px_14px_rgba(46,93,151,0.39)] hover:translate-y-[-2px] hover:shadow-[0_6px_20px_rgba(46,93,151,0.23)] transition-all duration-200 flex justify-center items-center gap-2 cursor-pointer"
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
              <Link
                to="/login"
                className="font-semibold text-primary hover:text-primary-hover transition-colors underline decoration-primary/30 hover:decoration-primary underline-offset-4"
              >
                {t("auth.loginNow")}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
export default RegisterPage
