import * as React from "react"
import { cva } from "class-variance-authority"
import { cn } from "../../lib/utils"
import type { IconSize, IconLibrary, IconAnimation } from "./types"
import { DEFAULT_ICON_SIZE, DEFAULT_ICON_LIB, DEFAULT_STROKE_WIDTH } from "./types"
import { 
  isEmoji, 
  isDotCharacter, 
  getIconComponent, 
  getDefaultIcon, 
  validateIconProps,
  validateNumericSize
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
  md: 20,
  lg: 24,
  xl: 28,
  "2xl": 32,
} as const

export interface DocyIconProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "size"> {
  name: string
  lib?: IconLibrary
  size?: IconSize | number
  color?: string
  animation?: IconAnimation
  decorative?: boolean
}

// Helper functions for style optimization
function createDotStyle(size: number, color: string) {
  return { 
    width: size, 
    height: size, 
    color,
    fontSize: size * 0.4,
    lineHeight: 1
  }
}

function createEmojiStyle(size: number, color: string) {
  return { 
    fontSize: size * 0.8,
    lineHeight: 1,
    color,
    width: size,
    height: size
  }
}

function createIconStyle(color: string) {
  return { color }
}

function renderIcon(
  name: string,
  lib: IconLibrary,
  size: number,
  color: string,
  className: string,
  decorative: boolean = false
): React.ReactNode {
  if (!validateIconProps(name, lib)) {
    const DefaultIcon = getDefaultIcon()
    return (
      <DefaultIcon
        size={size}
        className={className}
        style={createIconStyle(color)}
        strokeWidth={DEFAULT_STROKE_WIDTH}
        aria-hidden={decorative}
      />
    )
  }

  if (isDotCharacter(name)) {
    return (
      <span 
        className={cn("flex items-center justify-center", className)}
        style={createDotStyle(size, color)}
        role="img"
        aria-label={decorative ? undefined : "dot"}
        aria-hidden={decorative}
      >
        •
      </span>
    )
  }

  if (isEmoji(name)) {
    return (
      <span 
        className={cn("flex items-center justify-center", className)}
        style={createEmojiStyle(size, color)}
        role="img"
        aria-label={decorative ? undefined : `${name} emoji`}
        aria-hidden={decorative}
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
        style={createIconStyle(color)}
        strokeWidth={DEFAULT_STROKE_WIDTH}
        aria-hidden={decorative}
      />
    )
  }

  const DefaultIcon = getDefaultIcon()
  return (
    <DefaultIcon
      size={size}
      className={className}
      style={createIconStyle(color)}
      strokeWidth={DEFAULT_STROKE_WIDTH}
      aria-hidden={decorative}
    />
  )
}

const DocyIcon = React.forwardRef<HTMLElement, DocyIconProps>(
  ({ 
    name, 
    lib = DEFAULT_ICON_LIB, 
    size = DEFAULT_ICON_SIZE, 
    color = "currentColor", 
    animation, 
    className, 
    decorative = false,
    ...props 
  }, ref) => {
    const validatedSize = typeof size === "number" ? validateNumericSize(size) : sizeMap[size]
    const iconClasses = cn(
      iconVariants({ 
        size: typeof size === "number" ? DEFAULT_ICON_SIZE : size, 
        animation 
      }),
      className
    )

    const iconElement = renderIcon(name, lib, validatedSize, color, iconClasses, decorative)

    // Add error boundary around React.cloneElement
    try {
      if (React.isValidElement(iconElement)) {
        return React.cloneElement(iconElement, { ...props })
      }
    } catch {
      // Fallback if cloneElement fails
      return (
        <span ref={ref as React.RefObject<HTMLSpanElement>} {...props}>
          {iconElement}
        </span>
      )
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