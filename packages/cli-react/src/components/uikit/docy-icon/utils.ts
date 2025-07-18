import * as React from "react"
import * as LucideIcons from "lucide-react"
import type { IconLibrary } from "./types"
import { SIZE_VALIDATION_RANGE } from "./types"

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

export function isValidLucideIconName(name: string): boolean {
  try {
    const icon = (LucideIcons as Record<string, unknown>)[name]
    return icon !== undefined && React.isValidElement(React.createElement(icon as React.ComponentType))
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

export function getLucideIcon(name: string): React.ComponentType<LucideIcons.LucideProps> | null {
  try {
    const icon = (LucideIcons as Record<string, unknown>)[name]
    if (icon && React.isValidElement(React.createElement(icon as React.ComponentType))) {
      return icon as React.ComponentType<LucideIcons.LucideProps>
    }
    
    const normalizedName = normalizeIconName(name)
    const normalizedIcon = (LucideIcons as Record<string, unknown>)[normalizedName]
    if (normalizedIcon && React.isValidElement(React.createElement(normalizedIcon as React.ComponentType))) {
      return normalizedIcon as React.ComponentType<LucideIcons.LucideProps>
    }
    
    return null
  } catch {
    return null
  }
}

export function getIconComponent(
  name: string, 
  lib: IconLibrary
): React.ComponentType<LucideIcons.LucideProps> | null {
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

export function getDefaultIcon(): React.ComponentType<LucideIcons.LucideProps> {
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