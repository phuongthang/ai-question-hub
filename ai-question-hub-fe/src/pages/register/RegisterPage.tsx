import { Icon } from "@/components/ui/icon"
import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { useFormContext } from "react-hook-form"
import { type RegisterInput } from "@/schemas/auth"
import { FormInput } from "@/components/FormInput"
import { useRegister } from "@/contexts/RegisterContext"
import { AuthHeader } from "@/components/AuthHeader"

export function RegisterPage() {
  const { t } = useTranslation()
  const { handleSubmit } = useFormContext<RegisterInput>()
  const { onSubmit, errorMessage, isLoading } = useRegister()

  return (
    <div className="glass-panel w-full rounded-2xl relative overflow-hidden flex flex-col">
      <div className="p-10 flex flex-col gap-6">
        <AuthHeader
          title={t("auth.registerTitle")}
          description={t("auth.registerWelcome")}
        />

        {/* Error Alert */}
        {errorMessage && (
          <div className="p-3.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-sm font-medium animate-in fade-in slide-in-from-top-1 duration-200">
            {errorMessage}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col" autoComplete="off">
          {/* Full Name */}
          <FormInput
            name="fullname"
            label={t("auth.fullNameLabel")}
            placeholder={t("auth.fullNamePlaceholder")}
            icon="person"
          />

          {/* Username */}
          <FormInput
            name="username"
            label={t("auth.userNameLabel")}
            placeholder={t("auth.userNamePlaceholder")}
            icon="person_check"
          />

          {/* Email */}
          <FormInput
            name="email"
            label={t("auth.emailLabel")}
            placeholder={t("auth.emailPlaceholder")}
            icon="mail"
          />

          {/* Phone Number */}
          <FormInput
            name="phoneNumber"
            label={t("auth.phoneNumberLabel")}
            placeholder={t("auth.phoneNumberPlaceholder")}
            icon="phone"
          />

          {/* Password */}
          <FormInput
            name="password"
            label={t("auth.passwordLabel")}
            placeholder="••••••••"
            type="password"
            icon="lock"
          />

          {/* Confirm Password */}
          <FormInput
            name="confirmPassword"
            label={t("auth.confirmPasswordLabel")}
            placeholder="••••••••"
            type="password"
            icon="lock"
          />

          {/* Action Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 mt-4 rounded-full bg-[#2e5d97] hover:bg-[#214874] disabled:bg-[#2e5d97]/60 text-white font-semibold text-sm shadow-[0_4px_14px_rgba(46,93,151,0.39)] hover:translate-y-[-2px] disabled:translate-y-0 hover:shadow-[0_6px_20px_rgba(46,93,151,0.23)] transition-all duration-200 flex justify-center items-center gap-2 cursor-pointer disabled:cursor-not-allowed"
          >
            {isLoading && <Icon name="progress_activity" className="size-4 animate-spin" />}
            {isLoading ? t("common.loading") : t("auth.registerButton")}
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
