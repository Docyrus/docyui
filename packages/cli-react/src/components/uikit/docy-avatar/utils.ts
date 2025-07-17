import type { User, AvatarSize } from "./types"
import { AVATAR_COLORS } from "./types"

export function getInitials(user: User | string): string {
  if (typeof user === "string") {
    const names = user.trim().split(/\s+/)
    if (names.length === 1) {
      return names[0].charAt(0).toUpperCase()
    }
    return names[0].charAt(0).toUpperCase() + names[names.length - 1].charAt(0).toUpperCase()
  }

  const firstname = user.firstname?.trim() || ""
  const lastname = user.lastname?.trim() || ""
  const name = user.name?.trim() || ""
  const fullname = user.fullname?.trim() || ""

  if (firstname && lastname) {
    return firstname.charAt(0).toUpperCase() + lastname.charAt(0).toUpperCase()
  }

  if (name) {
    const nameParts = name.split(/\s+/)
    if (nameParts.length >= 2) {
      return nameParts[0].charAt(0).toUpperCase() + nameParts[nameParts.length - 1].charAt(0).toUpperCase()
    }
    return nameParts[0].charAt(0).toUpperCase()
  }

  if (fullname) {
    const fullnameParts = fullname.split(/\s+/)
    if (fullnameParts.length >= 2) {
      return fullnameParts[0].charAt(0).toUpperCase() + fullnameParts[fullnameParts.length - 1].charAt(0).toUpperCase()
    }
    return fullnameParts[0].charAt(0).toUpperCase()
  }

  return "?"
}

export function getFullName(user: User): string {
  if (user.fullname) return user.fullname
  if (user.name) return user.name
  if (user.firstname && user.lastname) return `${user.firstname} ${user.lastname}`
  if (user.firstname) return user.firstname
  if (user.lastname) return user.lastname
  return ""
}

export function getUserColor(user: User, index?: number): string {
  if (user.color) {
    // If color is provided with bg- prefix, use it as is
    if (user.color.startsWith("bg-")) {
      return user.color
    }
    // If color is just the color name, add bg- prefix
    return `bg-${user.color}`
  }

  // Generate deterministic color based on user ID or index
  const userId = user.userId || index || 0
  const colorIndex = typeof userId === "string" 
    ? userId.length % AVATAR_COLORS.length
    : Number(userId) % AVATAR_COLORS.length
  
  return AVATAR_COLORS[colorIndex]
}

export function resolveUser(
  userId: string | number, 
  users: User[] = []
): User | null {
  return users.find(user => user.userId === userId) || null
}

export function resolveUsers(
  userIds: (string | number)[], 
  users: User[] = []
): User[] {
  return userIds
    .map(id => resolveUser(id, users))
    .filter((user): user is User => user !== null)
}

export function validateImageUrl(url: string): boolean {
  try {
    const parsedUrl = new URL(url)
    return parsedUrl.protocol === "https:" || parsedUrl.protocol === "data:"
  } catch {
    return false
  }
}


export function getAvatarSizeClasses(size: AvatarSize): string {
  const sizeMap = {
    xs: "h-4 w-4 text-xs",
    sm: "h-5 w-5 text-xs", 
    md: "h-6 w-6 text-sm",
    lg: "h-7 w-7 text-sm",
    xl: "h-8 w-8 text-sm",
    "2xl": "h-9 w-9 text-base",
    "3xl": "h-10 w-10 text-base",
    "4xl": "h-12 w-12 text-lg",
    "5xl": "h-16 w-16 text-xl",
    max: "h-20 w-20 text-2xl"
  }
  return sizeMap[size]
}

export function getStatusIndicatorSize(size: AvatarSize): string {
  const statusSizeMap = {
    xs: "h-1 w-1",
    sm: "h-1.5 w-1.5",
    md: "h-2 w-2", 
    lg: "h-2 w-2",
    xl: "h-2.5 w-2.5",
    "2xl": "h-3 w-3",
    "3xl": "h-3 w-3", 
    "4xl": "h-4 w-4",
    "5xl": "h-5 w-5",
    max: "h-6 w-6"
  }
  return statusSizeMap[size]
}