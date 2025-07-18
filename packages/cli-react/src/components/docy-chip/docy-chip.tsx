import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"
import DocyIcon from "../docy-icon"
import type { ChipSize, ChipVariant, ChipColor } from "./types"
import { DEFAULT_CHIP_SIZE, DEFAULT_CHIP_VARIANT, DEFAULT_CHIP_COLOR } from "./types"

const chipVariants = cva(
  "inline-flex items-center gap-1 rounded-md border-0 px-2 py-0.5 font-mono font-medium uppercase tracking-tight",
  {
    variants: {
      size: {
        "3xs": "text-3xs",
        "2xs": "text-2xs", 
        "xs": "text-xs",
        "sm": "text-sm",
        "md": "text-md",
        "lg": "text-lg",
        "xl": "text-xl",
        "xxl": "text-xxl"
      },
      variant: {
        light: "",
        dark: ""
      },
      color: {
        // Light variants
        slate: "",
        slateDarker: "",
        white: "",
        opaque: "",
        gray: "",
        zinc: "",
        stone: "",
        neutral: "",
        blue: "",
        green: "",
        orange: "",
        red: "",
        rose: "",
        violet: "",
        yellow: ""
      }
    },
    compoundVariants: [
      // Light variants
      { variant: "light", color: "slate", class: "bg-slate-100 text-slate-800" },
      { variant: "light", color: "slateDarker", class: "bg-slate-200 text-slate-900" },
      { variant: "light", color: "white", class: "bg-white text-gray-800 border border-gray-200" },
      { variant: "light", color: "opaque", class: "bg-gray-50/80 text-gray-700 backdrop-blur-sm" },
      { variant: "light", color: "gray", class: "bg-gray-100 text-gray-800" },
      { variant: "light", color: "zinc", class: "bg-zinc-100 text-zinc-800" },
      { variant: "light", color: "stone", class: "bg-stone-100 text-stone-800" },
      { variant: "light", color: "neutral", class: "bg-neutral-100 text-neutral-800" },
      { variant: "light", color: "blue", class: "bg-blue-100 text-blue-800" },
      { variant: "light", color: "green", class: "bg-green-100 text-green-800" },
      { variant: "light", color: "orange", class: "bg-orange-100 text-orange-800" },
      { variant: "light", color: "red", class: "bg-red-100 text-red-800" },
      { variant: "light", color: "rose", class: "bg-rose-100 text-rose-800" },
      { variant: "light", color: "violet", class: "bg-violet-100 text-violet-800" },
      { variant: "light", color: "yellow", class: "bg-yellow-100 text-yellow-800" },
      
      // Dark variants
      { variant: "dark", color: "slate", class: "bg-slate-800 text-white" },
      { variant: "dark", color: "slateDarker", class: "bg-slate-900 text-white" },
      { variant: "dark", color: "white", class: "bg-gray-800 text-white" },
      { variant: "dark", color: "opaque", class: "bg-gray-800/80 text-white backdrop-blur-sm" },
      { variant: "dark", color: "gray", class: "bg-gray-800 text-white" },
      { variant: "dark", color: "zinc", class: "bg-zinc-800 text-white" },
      { variant: "dark", color: "stone", class: "bg-stone-800 text-white" },
      { variant: "dark", color: "neutral", class: "bg-neutral-800 text-white" },
      { variant: "dark", color: "blue", class: "bg-blue-800 text-white" },
      { variant: "dark", color: "green", class: "bg-green-800 text-white" },
      { variant: "dark", color: "orange", class: "bg-orange-800 text-white" },
      { variant: "dark", color: "red", class: "bg-red-800 text-white" },
      { variant: "dark", color: "rose", class: "bg-rose-800 text-white" },
      { variant: "dark", color: "violet", class: "bg-violet-800 text-white" },
      { variant: "dark", color: "yellow", class: "bg-yellow-800 text-white" }
    ],
    defaultVariants: {
      size: "sm",
      variant: "light",
      color: "slate"
    }
  }
)

export interface DocyChipProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "size" | "color">,
    VariantProps<typeof chipVariants> {
  children?: React.ReactNode
  color?: ChipColor
  variant?: ChipVariant
  size?: ChipSize
  icon?: string
  className?: string
}

// Helper function to get icon size based on chip size
function getIconSize(chipSize: ChipSize): "xs" | "sm" | "md" | "lg" | "xl" | "2xl" {
  switch (chipSize) {
    case "3xs":
    case "2xs":
      return "xs"
    case "xs":
    case "sm":
      return "sm"
    case "md":
      return "md"
    case "lg":
      return "lg"
    case "xl":
      return "xl"
    case "xxl":
      return "2xl"
    default:
      return "sm"
  }
}

const DocyChip = React.forwardRef<HTMLDivElement, DocyChipProps>(
  ({ 
    children,
    color = DEFAULT_CHIP_COLOR,
    variant = DEFAULT_CHIP_VARIANT,
    size = DEFAULT_CHIP_SIZE,
    icon,
    className,
    ...props 
  }, ref) => {
    const iconSize = getIconSize(size)
    
    return (
      <div
        ref={ref}
        className={cn(
          chipVariants({ size, variant, color }),
          className
        )}
        role="img"
        aria-label={typeof children === "string" ? children : undefined}
        {...props}
      >
        {icon && (
          <DocyIcon 
            name={icon} 
            size={iconSize}
            decorative={true}
            className="shrink-0"
          />
        )}
        {children && <span className="truncate">{children}</span>}
      </div>
    )
  }
)

DocyChip.displayName = "DocyChip"

export { DocyChip, chipVariants }
export default DocyChip