import { z } from "zod"

/**
 * Reusable schema for email field validation.
 */
export const emailSchema = z
  .string()
  .min(1, { message: "validation.emailRequired" })
  .email({ message: "validation.emailInvalid" })

/**
 * Reusable schema for password field validation.
 */
export const passwordSchema = z
  .string()
  .min(6, { message: "validation.passwordLength" })

/**
 * Reusable schema for full name field validation.
 */
export const fullNameSchema = z
  .string()
  .min(1, { message: "validation.fullNameRequired" })
