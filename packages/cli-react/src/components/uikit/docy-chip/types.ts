export type ChipSize = "3xs" | "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl"
export type ChipVariant = "light" | "dark"
export type ChipColor = 
  | "slate" 
  | "slateDarker"
  | "white"
  | "opaque"
  | "gray"
  | "zinc"
  | "stone"
  | "neutral"
  | "blue"
  | "green"
  | "orange"
  | "red"
  | "rose"
  | "violet"
  | "yellow"

// Constants for better maintainability
export const DEFAULT_CHIP_SIZE = "sm" as const
export const DEFAULT_CHIP_VARIANT = "light" as const
export const DEFAULT_CHIP_COLOR = "slate" as const

// Supported color palettes following ShadCN patterns
export const SUPPORTED_COLORS: ChipColor[] = [
  "slate",
  "slateDarker", 
  "white",
  "opaque",
  "gray",
  "zinc",
  "stone", 
  "neutral",
  "blue",
  "green",
  "orange",
  "red",
  "rose",
  "violet",
  "yellow"
]