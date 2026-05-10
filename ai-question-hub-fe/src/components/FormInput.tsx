import * as React from "react"
import { Controller, useFormContext, useFormState } from "react-hook-form"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Icon } from "@/components/ui/icon"
import { useTranslation } from "react-i18next"

interface FormInputProps extends Omit<React.ComponentProps<typeof Input>, "name"> {
  name: string
  label: string
  icon?: string
}

export function FormInput({
  name,
  label,
  placeholder,
  type = "text",
  icon,
  className,
  ...props
}: FormInputProps) {
  const { t } = useTranslation()
  const { control } = useFormContext()
  const { errors } = useFormState({ control })
  const [showPassword, setShowPassword] = React.useState(false)

  const isPasswordField = type === "password"
  const inputType = isPasswordField && showPassword ? "text" : type
  const error = errors[name]

  return (
    <div className="flex flex-col gap-[2px]">
      <Label htmlFor={name} className="text-sm font-medium text-slate-700 dark:text-slate-300">
        {label}
      </Label>
      <div
        className={`glass-input h-11 rounded-lg flex items-center px-3 gap-3 transition-all duration-200 ${error ? "border-destructive/85 ring-1 ring-destructive/40" : ""
          }`}
      >
        {icon && <Icon name={icon} className="text-muted-foreground size-5 shrink-0" />}
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              id={name}
              type={inputType}
              placeholder={placeholder}
              className="bg-transparent border-none focus-visible:ring-0 shadow-none p-0 h-full w-full font-sans text-[14px] text-foreground placeholder:text-muted-foreground/40"
              value={field.value ?? ""}
              {...props}
              autoComplete={props.autoComplete ?? "new-password"}
            />
          )}
        />
        {isPasswordField && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-muted-foreground hover:text-foreground transition-colors flex items-center cursor-pointer"
          >
            {showPassword ? <Icon name="visibility_off" className="size-5" /> : <Icon name="visibility" className="size-5" />}
          </button>
        )}
      </div>
      <div className="h-5">
        {error ? (
          <span className="text-[12px] text-red-500 dark:text-red-400 font-sans block animate-in fade-in slide-in-from-top-1 duration-200">
            {t(error.message as string || "")}
          </span>
        ) : null}
      </div>
    </div>
  )
}
