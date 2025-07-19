export type ButtonVariant = 
  | "default" 
  | "destructive" 
  | "outline" 
  | "secondary" 
  | "ghost" 
  | "link"

export type ButtonSize = 
  | "default" 
  | "sm" 
  | "lg" 
  | "icon"

export type IconPosition = "left" | "right"

export const DEFAULT_VARIANT: ButtonVariant = "default"
export const DEFAULT_SIZE: ButtonSize = "default"
export const DEFAULT_ICON_POSITION: IconPosition = "left"
export const DEFAULT_CONFIRM_TIMEOUT = 3000

export interface ConfirmationState {
  isConfirming: boolean
  timeRemaining: number
  progressPercentage: number
}