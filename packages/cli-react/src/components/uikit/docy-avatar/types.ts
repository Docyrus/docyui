export type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "max"
export type UserStatus = "online" | "offline" | "away"

export interface User {
  userId: string | number
  firstname: string
  lastname: string
  name?: string
  photo?: string
  color?: string
  status?: UserStatus
  fullname?: string
}

export interface UserData {
  id: string
  initials: string
  photoExists: boolean
  photo?: string
  color?: string
  fullname: string
  userStatus?: boolean
  status?: string
}

export const DEFAULT_AVATAR_SIZE = "sm" as const
export const DEFAULT_MAX_ITEMS = 5 as const

export const AVATAR_SIZE_MAP = {
  xs: "h-4 w-4",     // 16px × 16px
  sm: "h-5 w-5",     // 20px × 20px  
  md: "h-6 w-6",     // 24px × 24px
  lg: "h-7 w-7",     // 28px × 28px
  xl: "h-8 w-8",     // 32px × 32px
  "2xl": "h-9 w-9",  // 36px × 36px
  "3xl": "h-10 w-10", // 40px × 40px
  "4xl": "h-12 w-12", // 48px × 48px
  "5xl": "h-16 w-16", // 64px × 64px
  max: "h-20 w-20"   // 80px × 80px
} as const

export const STATUS_COLORS = {
  online: "bg-green-400",
  offline: "bg-red-400", 
  away: "bg-amber-400"
} as const

export const AVATAR_COLORS = [
  "bg-red-500",
  "bg-orange-500", 
  "bg-amber-500",
  "bg-yellow-500",
  "bg-lime-500",
  "bg-green-500",
  "bg-emerald-500",
  "bg-teal-500",
  "bg-cyan-500",
  "bg-sky-500",
  "bg-blue-500",
  "bg-indigo-500",
  "bg-violet-500",
  "bg-purple-500",
  "bg-fuchsia-500",
  "bg-pink-500",
  "bg-rose-500"
] as const