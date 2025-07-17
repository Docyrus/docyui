import * as React from "react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "./avatar"
import DocyIcon from "../docy-icon"
import { type AvatarSize } from "./types"
import { getAvatarSizeClasses } from "./utils"

interface AvatarErrorBoundaryProps {
  children: React.ReactNode
  size?: AvatarSize
  className?: string
}

interface AvatarErrorBoundaryState {
  hasError: boolean
}

export class AvatarErrorBoundary extends React.Component<AvatarErrorBoundaryProps, AvatarErrorBoundaryState> {
  constructor(props: AvatarErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(): AvatarErrorBoundaryState {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.warn("DocyAvatar Error:", error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      const { size = "sm", className } = this.props
      
      return (
        <Avatar className={cn("bg-red-100", className)}>
          <AvatarFallback className={cn("bg-red-100 text-red-600", getAvatarSizeClasses(size))}>
            <DocyIcon 
              name="alert-circle" 
              size={size === "xs" || size === "sm" ? "xs" : size === "md" ? "sm" : "md"} 
              className="text-red-600"
            />
          </AvatarFallback>
        </Avatar>
      )
    }

    return this.props.children
  }
}