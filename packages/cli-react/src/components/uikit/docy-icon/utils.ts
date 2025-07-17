import * as LucideIcons from "lucide-react"
import type { IconLibrary } from "./types"

export function isEmoji(str: string): boolean {
  const emojiRegex = /^(\p{Emoji}|\p{Emoji_Modifier}|\p{Emoji_Component})+$/u
  return emojiRegex.test(str.trim())
}

export function isDotCharacter(str: string): boolean {
  return str.trim() === "dot" || str.trim() === "•"
}

export function isValidLucideIconName(name: string): name is keyof typeof LucideIcons {
  return name in LucideIcons && typeof LucideIcons[name as keyof typeof LucideIcons] === "function"
}

export function normalizeIconName(name: string): string {
  return name
    .split(/[-_\s]/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join("")
}

export function getLucideIcon(name: string): React.ComponentType<any> | null {
  if (isValidLucideIconName(name)) {
    return LucideIcons[name]
  }
  
  const normalizedName = normalizeIconName(name)
  if (isValidLucideIconName(normalizedName)) {
    return LucideIcons[normalizedName]
  }
  
  return null
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
      console.warn(
        `Icon library "${lib}" is not yet implemented. ` +
        `Please install the corresponding package and update the icon resolver.`
      )
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
    console.warn("DocyIcon: name prop is required and must be a string")
    return false
  }
  
  if (lib && !["lucide", "heroicons", "tabler", "phosphor", "custom"].includes(lib)) {
    console.warn(`DocyIcon: unsupported icon library "${lib}"`)
    return false
  }
  
  return true
}