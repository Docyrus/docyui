import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import type { SpinnerSize, SpinnerSpeed, SpinnerColor } from "./types"
import { DEFAULT_SPINNER_SIZE, DEFAULT_SPINNER_SPEED, DEFAULT_SPINNER_COLOR } from "./types"

const spinnerVariants = cva(
  "animate-spin inline-block rounded-full border-2 border-solid",
  {
    variants: {
      size: {
        sm: "h-4 w-4 border-[1.5px]",
        default: "h-6 w-6 border-2",
        lg: "h-8 w-8 border-[2.5px]"
      },
      speed: {
        slow: "animation-duration-1000",
        normal: "animation-duration-700",
        fast: "animation-duration-500"
      },
      color: {
        current: "border-current border-t-transparent",
        primary: "border-primary border-t-transparent",
        secondary: "border-secondary border-t-transparent",
        muted: "border-muted-foreground border-t-transparent",
        accent: "border-accent border-t-transparent",
        destructive: "border-destructive border-t-transparent"
      }
    },
    defaultVariants: {
      size: "default",
      speed: "normal",
      color: "current"
    }
  }
)

export interface DocySpinnerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "size" | "color">,
    VariantProps<typeof spinnerVariants> {
  size?: SpinnerSize
  speed?: SpinnerSpeed
  color?: SpinnerColor
  className?: string
  "aria-label"?: string
}

const DocySpinner = React.forwardRef<HTMLDivElement, DocySpinnerProps>(
  ({ 
    size = DEFAULT_SPINNER_SIZE,
    speed = DEFAULT_SPINNER_SPEED,
    color = DEFAULT_SPINNER_COLOR,
    className,
    "aria-label": ariaLabel,
    ...props 
  }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          spinnerVariants({ size, speed, color }),
          "motion-reduce:animate-pulse motion-reduce:border-t-current",
          className
        )}
        role="status"
        aria-label={ariaLabel || "Loading"}
        {...props}
      >
        <span className="sr-only">Loading...</span>
      </div>
    )
  }
)

DocySpinner.displayName = "DocySpinner"

export { DocySpinner, spinnerVariants }
export default DocySpinner