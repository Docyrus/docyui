export type IconSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl"
export type IconLibrary = "lucide" | "heroicons" | "tabler" | "phosphor" | "custom"  
export type IconAnimation = "spin" | "pulse" | "bounce"

// Constants for better maintainability
export const DEFAULT_ICON_SIZE = "md" as const
export const DEFAULT_ICON_LIB = "lucide" as const
export const DEFAULT_STROKE_WIDTH = 1.5 as const
export const SIZE_VALIDATION_RANGE = { min: 4, max: 200 } as const

export interface IconSizeMap {
  xs: 12
  sm: 14
  md: 20
  lg: 24
  xl: 28
  "2xl": 32
}

export interface IconLibraryConfig {
  name: IconLibrary
  displayName: string
  packageName?: string
  importPath?: string
  isInstalled: boolean
}

export const SUPPORTED_LIBRARIES: IconLibraryConfig[] = [
  {
    name: "lucide",
    displayName: "Lucide",
    packageName: "lucide-react",
    importPath: "lucide-react",
    isInstalled: true
  },
  {
    name: "heroicons", 
    displayName: "Heroicons",
    packageName: "@heroicons/react",
    importPath: "@heroicons/react",
    isInstalled: false
  },
  {
    name: "tabler",
    displayName: "Tabler Icons", 
    packageName: "@tabler/icons-react",
    importPath: "@tabler/icons-react",
    isInstalled: false
  },
  {
    name: "phosphor",
    displayName: "Phosphor Icons",
    packageName: "phosphor-react", 
    importPath: "phosphor-react",
    isInstalled: false
  },
  {
    name: "custom",
    displayName: "Custom Icons",
    isInstalled: true
  }
]