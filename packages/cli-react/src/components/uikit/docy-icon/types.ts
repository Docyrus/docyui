export type IconSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl"
export type IconLibrary = "lucide" | "heroicons" | "tabler" | "phosphor" | "custom"  
export type IconAnimation = "spin" | "pulse" | "bounce"

export interface IconSizeMap {
  xs: 12
  sm: 14
  md: 16
  lg: 20
  xl: 24
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