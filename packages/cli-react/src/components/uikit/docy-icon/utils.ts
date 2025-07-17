import * as LucideIcons from "lucide-react"
import type { IconLibrary, SIZE_VALIDATION_RANGE } from "./types"

// Module-level constant to prevent ReDoS attacks
const EMOJI_REGEX = /^(\p{Emoji}|\p{Emoji_Modifier}|\p{Emoji_Component})+$/u

// Check if running in development mode
const IS_DEV = process.env.NODE_ENV === "development"

export function isEmoji(str: string): boolean {
  return EMOJI_REGEX.test(str.trim())
}

export function isDotCharacter(str: string): boolean {
  return str.trim() === "dot" || str.trim() === "•"
}

export function isValidLucideIconName(name: string): name is keyof typeof LucideIcons {
  try {
    return name in LucideIcons && typeof LucideIcons[name as keyof typeof LucideIcons] === "function"
  } catch {
    return false
  }
}

export function normalizeIconName(name: string): string {
  return name
    .split(/[-_\s]/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join("")
}

export function validateNumericSize(size: number): number {
  if (size < SIZE_VALIDATION_RANGE.min || size > SIZE_VALIDATION_RANGE.max) {
    if (IS_DEV) {
      console.warn(`DocyIcon: size must be between ${SIZE_VALIDATION_RANGE.min}-${SIZE_VALIDATION_RANGE.max}px`)
    }
    return 20 // Default fallback
  }
  return size
}

export function getLucideIcon(name: string): React.ComponentType<any> | null {
  try {
    if (isValidLucideIconName(name)) {
      return LucideIcons[name]
    }
    
    const normalizedName = normalizeIconName(name)
    if (isValidLucideIconName(normalizedName)) {
      return LucideIcons[normalizedName]
    }
    
    return null
  } catch {
    return null
  }
}

export function getIconComponent(
  name: string, 
  lib: IconLibrary
): React.ComponentType<any> | null {
  switch (lib) {
    case "lucide":
      return getLucideIcon(name)
      
    case "heroicons":
    case "tabler": 
    case "phosphor":
    case "custom":
      if (IS_DEV) {
        console.warn(`DocyIcon: ${lib} library not yet implemented`)
      }
      return getLucideIcon(name)
      
    default:
      return getLucideIcon(name)
  }
}

export function getDefaultIcon(): React.ComponentType<any> {
  return LucideIcons.HelpCircle
}

export function validateIconProps(name: string, lib: IconLibrary): boolean {
  if (!name || typeof name !== "string") {
    if (IS_DEV) {
      console.warn("DocyIcon: name prop required")
    }
    return false
  }
  
  if (lib && !["lucide", "heroicons", "tabler", "phosphor", "custom"].includes(lib)) {
    if (IS_DEV) {
      console.warn(`DocyIcon: unsupported library "${lib}"`)
    }
    return false
  }
  
  return true
}