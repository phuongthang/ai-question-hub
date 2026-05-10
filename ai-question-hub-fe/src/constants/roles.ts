export const UserRole = {
  ADMIN: 1,
  USER: 2,
} as const

export type UserRoleType = typeof UserRole[keyof typeof UserRole]

export const UserRoleLabelMap: Record<number, string> = {
  [UserRole.ADMIN]: "roles.admin",
  [UserRole.USER]: "roles.user",
}
