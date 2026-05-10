import { Icon } from "@/components/ui/icon"
import { Link } from "react-router-dom"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useTranslation } from "react-i18next"
import { Controller, useFormContext } from "react-hook-form"
import { type LoginInput } from "@/schemas/auth"
import { FormInput } from "@/components/FormInput"
import { useLogin } from "@/contexts/LoginContext"
import { AuthHeader } from "@/components/AuthHeader"

export function LoginPage() {
  const { t } = useTranslation()
  const { control, handleSubmit } = useFormContext<LoginInput>()
  const { onSubmit, errorMessage, isLoading } = useLogin()

  return (
    <div className="glass-panel w-full rounded-2xl relative overflow-hidden flex flex-col">
      <div className="p-10 flex flex-col gap-6">
        <AuthHeader 
          title={t("auth.loginTitle")} 
          description={t("auth.loginWelcome")} 
        />

        {/* Error Alert */}
        {errorMessage && (
          <div className="p-3.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-sm font-medium animate-in fade-in slide-in-from-top-1 duration-200">
            {errorMessage}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col" autoComplete="off">
          {/* Username Input */}
          <FormInput
            name="username"
            label={t("auth.userNameLabel")}
            placeholder={t("auth.userNamePlaceholder")}
            icon="person"
          />

          {/* Password Input */}
          <FormInput
            name="password"
            label={t("auth.passwordLabel")}
            type="password"
            placeholder="••••••••"
            icon="lock"
          />

          {/* Controls */}
          <div className="flex items-center justify-between mt-1">
            <label className="flex items-center gap-2 cursor-pointer group">
              <Controller
                name="remember"
                control={control}
                render={({ field }) => (
                  <Checkbox
                    id="remember"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
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
            disabled={isLoading}
            className="w-full h-12 mt-4 rounded-full bg-[#2e5d97] hover:bg-[#214874] disabled:bg-[#2e5d97]/60 text-white font-semibold text-sm shadow-[0_4px_14px_rgba(46,93,151,0.39)] hover:translate-y-[-2px] disabled:translate-y-0 hover:shadow-[0_6px_20px_rgba(46,93,151,0.23)] transition-all duration-200 flex justify-center items-center gap-2 cursor-pointer disabled:cursor-not-allowed"
          >
            {isLoading && <Icon name="progress_activity" className="size-4 animate-spin" />}
            {isLoading ? t("common.loading") : t("auth.loginButton")}
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
              <Link
                to="/register"
                className="font-semibold text-primary hover:text-primary-hover transition-colors underline decoration-primary/30 hover:decoration-primary underline-offset-4"
              >
                {t("auth.registerNow")}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
export default LoginPage
