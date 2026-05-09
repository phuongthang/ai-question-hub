import { z } from "zod"
import { emailSchema, passwordSchema, fullNameSchema } from "./common"

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  remember: z.boolean().optional(),
})

export type LoginInput = z.infer<typeof loginSchema>

export const registerSchema = z
  .object({
    fullname: fullNameSchema,
    username: z.string().min(1, { message: "validation.usernameRequired" }),
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string().min(1, { message: "validation.confirmPasswordRequired" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "validation.passwordMismatch",
    path: ["confirmPassword"],
  })

export type RegisterInput = z.infer<typeof registerSchema>


