import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"
import DocyIcon from "../docy-icon"
import DocySpinner from "../docy-spinner"
import type { 
  ButtonVariant, 
  IconPosition, 
  ConfirmationState 
} from "./types"
import { 
  DEFAULT_VARIANT, 
  DEFAULT_SIZE, 
  DEFAULT_ICON_POSITION, 
  DEFAULT_CONFIRM_TIMEOUT 
} from "./types"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
      fullWidth: {
        true: "w-full",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      fullWidth: false,
    },
  }
)

export interface DocyButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
  loadingText?: string
  icon?: string
  iconPosition?: IconPosition
  destructive?: boolean
  confirmText?: string
  confirmTimeout?: number
  fullWidth?: boolean
}

const ProgressBar = React.memo(({ 
  percentage 
}: { 
  percentage: number
  variant?: ButtonVariant 
}) => (
  <div
    className="absolute bottom-0 left-0 h-1 bg-white/30 transition-all duration-75 ease-linear"
    style={{ width: `${percentage}%` }}
    role="progressbar"
    aria-valuenow={percentage}
    aria-valuemin={0}
    aria-valuemax={100}
    aria-label="Confirmation countdown"
  />
))

const ConfirmationContent = React.memo(({ 
  confirmText, 
  onCancel, 
  onConfirm
}: {
  confirmText: string
  onCancel: () => void
  onConfirm: () => void
}) => (
  <div className="flex items-center justify-center gap-2 w-full">
    <span className="text-xs font-medium truncate">
      {confirmText}
    </span>
    <div className="flex gap-1 shrink-0">
      <button
        type="button"
        onClick={onCancel}
        className="text-xs underline hover:no-underline focus:outline-none focus:ring-1 focus:ring-white rounded px-1"
        aria-label="Cancel action"
      >
        Cancel
      </button>
      <button
        type="button"
        onClick={onConfirm}
        className="text-xs underline hover:no-underline focus:outline-none focus:ring-1 focus:ring-white rounded px-1"
        aria-label="Confirm action"
      >
        Confirm
      </button>
    </div>
  </div>
))

const DocyButton = React.forwardRef<HTMLButtonElement, DocyButtonProps>(
  ({ 
    className,
    variant = DEFAULT_VARIANT,
    size = DEFAULT_SIZE,
    asChild = false,
    loading = false,
    loadingText,
    icon,
    iconPosition = DEFAULT_ICON_POSITION,
    destructive = false,
    confirmText,
    confirmTimeout = DEFAULT_CONFIRM_TIMEOUT,
    fullWidth = false,
    disabled,
    onClick,
    children,
    ...props 
  }, ref) => {
    const [confirmationState, setConfirmationState] = React.useState<ConfirmationState>({
      isConfirming: false,
      timeRemaining: 0,
      progressPercentage: 0
    })
    
    const intervalRef = React.useRef<ReturnType<typeof setInterval> | null>(null)
    const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)

    const cleanup = React.useCallback(() => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
        timeoutRef.current = null
      }
    }, [])

    React.useEffect(() => {
      return cleanup
    }, [cleanup])

    const startConfirmation = React.useCallback(() => {
      const startTime = Date.now()
      
      setConfirmationState({
        isConfirming: true,
        timeRemaining: confirmTimeout,
        progressPercentage: 0
      })

      intervalRef.current = setInterval(() => {
        const elapsed = Date.now() - startTime
        const remaining = Math.max(0, confirmTimeout - elapsed)
        const progress = Math.min(100, (elapsed / confirmTimeout) * 100)

        setConfirmationState(prev => ({
          ...prev,
          timeRemaining: remaining,
          progressPercentage: progress
        }))

        if (remaining <= 0) {
          cleanup()
          setConfirmationState(prev => ({ ...prev, isConfirming: false }))
        }
      }, 50)

      timeoutRef.current = setTimeout(() => {
        cleanup()
        setConfirmationState(prev => ({ ...prev, isConfirming: false }))
      }, confirmTimeout)
    }, [confirmTimeout, cleanup])

    const cancelConfirmation = React.useCallback(() => {
      cleanup()
      setConfirmationState({
        isConfirming: false,
        timeRemaining: 0,
        progressPercentage: 0
      })
    }, [cleanup])

    const confirmAction = React.useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
      cleanup()
      setConfirmationState({
        isConfirming: false,
        timeRemaining: 0,
        progressPercentage: 0
      })
      onClick?.(event)
    }, [cleanup, onClick])

    const handleClick = React.useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
      if (loading || disabled) return

      if (destructive && !confirmationState.isConfirming) {
        event.preventDefault()
        startConfirmation()
        return
      }

      if (!destructive) {
        onClick?.(event)
      }
    }, [loading, disabled, destructive, confirmationState.isConfirming, startConfirmation, onClick])

    const isDisabled = disabled || loading
    const displayConfirmText = confirmText || "Are you sure?"

    const renderIcon = () => {
      if (loading) {
        return <DocySpinner size="sm" className="text-current" />
      }
      if (icon) {
        return <DocyIcon name={icon} size="sm" decorative />
      }
      return null
    }

    const renderContent = () => {
      if (confirmationState.isConfirming) {
        return (
          <ConfirmationContent
            confirmText={displayConfirmText}
            onCancel={cancelConfirmation}
            onConfirm={() => confirmAction({} as React.MouseEvent<HTMLButtonElement>)}
          />
        )
      }

      const iconElement = renderIcon()
      const textContent = loading && loadingText ? loadingText : children

      if (!iconElement) {
        return textContent
      }

      if (iconPosition === "right") {
        return (
          <>
            {textContent}
            {iconElement}
          </>
        )
      }

      return (
        <>
          {iconElement}
          {textContent}
        </>
      )
    }

    const buttonClasses = cn(
      buttonVariants({ variant, size, fullWidth }),
      (loading || confirmationState.isConfirming) && "cursor-not-allowed",
      className
    )

    const gapClass = icon && children && !confirmationState.isConfirming ? "gap-2" : ""

    const Comp = asChild ? Slot : "button"
    
    return (
      <Comp
        className={cn(buttonClasses, gapClass)}
        ref={ref}
        disabled={isDisabled}
        onClick={handleClick}
        aria-busy={loading}
        aria-label={
          confirmationState.isConfirming 
            ? `Confirmation required: ${displayConfirmText}` 
            : props["aria-label"]
        }
        {...props}
      >
        {renderContent()}
        {confirmationState.isConfirming && (
          <ProgressBar
            percentage={confirmationState.progressPercentage}
            variant={variant || undefined}
          />
        )}
      </Comp>
    )
  }
)

DocyButton.displayName = "DocyButton"

export { DocyButton, buttonVariants }
export default DocyButton