import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import type { IconSize, IconLibrary, IconAnimation } from "./types"
import { 
  isEmoji, 
  isDotCharacter, 
  getIconComponent, 
  getDefaultIcon, 
  validateIconProps 
} from "./utils"

const iconVariants = cva(
  "inline-flex items-center justify-center shrink-0",
  {
    variants: {
      size: {
        xs: "w-3 h-3",
        sm: "w-3.5 h-3.5", 
        md: "w-4 h-4",
        lg: "w-5 h-5",
        xl: "w-6 h-6",
        "2xl": "w-8 h-8",
      },
      animation: {
        none: "",
        spin: "animate-spin",
        pulse: "animate-pulse",
        bounce: "animate-bounce",
      },
    },
    defaultVariants: {
      size: "md",
      animation: "none",
    },
  }
)

const sizeMap = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 20,
  xl: 24,
  "2xl": 32,
} as const

export interface DocyIconProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "size">,
    VariantProps<typeof iconVariants> {
  name: string
  lib?: IconLibrary
  size?: IconSize | number
  color?: string
  animation?: IconAnimation
}

function renderIcon(
  name: string,
  lib: IconLibrary,
  size: number,
  color: string,
  className: string
): React.ReactNode {
  if (!validateIconProps(name, lib)) {
    const DefaultIcon = getDefaultIcon()
    return (
      <DefaultIcon
        size={size}
        className={className}
        style={{ color }}
        strokeWidth={1.5}
      />
    )
  }

  if (isDotCharacter(name)) {
    return (
      <span 
        className={cn("flex items-center justify-center", className)}
        style={{ 
          width: size, 
          height: size, 
          color,
          fontSize: size * 0.4,
          lineHeight: 1
        }}
        role="img"
        aria-label="dot"
      >
        •
      </span>
    )
  }

  if (isEmoji(name)) {
    return (
      <span 
        className={cn("flex items-center justify-center", className)}
        style={{ 
          fontSize: size * 0.8,
          lineHeight: 1,
          color,
          width: size,
          height: size
        }}
        role="img"
        aria-label={`${name} emoji`}
      >
        {name}
      </span>
    )
  }

  const IconComponent = getIconComponent(name, lib)
  if (IconComponent) {
    return (
      <IconComponent
        size={size}
        className={className}
        style={{ color }}
        strokeWidth={1.5}
      />
    )
  }

  const DefaultIcon = getDefaultIcon()
  return (
    <DefaultIcon
      size={size}
      className={className}
      style={{ color }}
      strokeWidth={1.5}
    />
  )
}

const DocyIcon = React.forwardRef<HTMLElement, DocyIconProps>(
  ({ name, lib = "lucide", size = "md", color = "currentColor", animation, className, ...props }, ref) => {
    const iconSize = typeof size === "number" ? size : sizeMap[size]
    const iconClasses = cn(
      iconVariants({ 
        size: typeof size === "number" ? "md" : size, 
        animation 
      }),
      className
    )

    const iconElement = renderIcon(name, lib, iconSize, color, iconClasses)

    if (React.isValidElement(iconElement)) {
      return React.cloneElement(iconElement, { ref, ...props })
    }

    return (
      <span ref={ref as React.RefObject<HTMLSpanElement>} {...props}>
        {iconElement}
      </span>
    )
  }
)

DocyIcon.displayName = "DocyIcon"

export { DocyIcon, iconVariants }
export default DocyIcon