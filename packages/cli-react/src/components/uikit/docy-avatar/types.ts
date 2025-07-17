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


export const DEFAULT_AVATAR_SIZE = "sm" as const
export const DEFAULT_MAX_ITEMS = 5 as const


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