import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"
import { Avatar, AvatarImage, AvatarFallback } from "./avatar"
import DocyIcon from "../docy-icon"
import type { User, AvatarSize, UserStatus } from "./types"
import { DEFAULT_AVATAR_SIZE, DEFAULT_MAX_ITEMS } from "./types"
import { 
  getInitials, 
  getFullName, 
  getUserColor, 
  resolveUser, 
  resolveUsers, 
  validateImageUrl, 
  getAvatarSizeClasses,
  getStatusIndicatorSize 
} from "./utils"
import { STATUS_COLORS } from "./types"
import { AvatarErrorBoundary } from "./error-boundary"

const avatarVariants = cva(
  "relative inline-flex shrink-0 overflow-hidden rounded-full",
  {
    variants: {
      size: {
        xs: "h-4 w-4",
        sm: "h-5 w-5", 
        md: "h-6 w-6",
        lg: "h-7 w-7",
        xl: "h-8 w-8",
        "2xl": "h-9 w-9",
        "3xl": "h-10 w-10",
        "4xl": "h-12 w-12",
        "5xl": "h-16 w-16",
        max: "h-20 w-20"
      }
    },
    defaultVariants: {
      size: "sm"
    }
  }
)

const avatarGroupVariants = cva(
  "flex items-center",
  {
    variants: {
      spacing: {
        default: "-space-x-2",
        tight: "-space-x-1",
        loose: "-space-x-3"
      }
    },
    defaultVariants: {
      spacing: "default"
    }
  }
)

export interface DocyAvatarProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "size">,
    VariantProps<typeof avatarVariants> {
  src?: string
  userId?: string | number | (string | number)[]
  user?: User
  users?: User[]
  size?: AvatarSize
  maxItems?: number
  showUserStatus?: boolean
  status?: UserStatus
  fallbackSrc?: string
}

function SingleAvatar({
  user,
  src,
  size = DEFAULT_AVATAR_SIZE,
  showUserStatus = false,
  status,
  fallbackSrc,
  className
}: {
  user?: User
  src?: string
  size: AvatarSize
  showUserStatus: boolean
  status?: UserStatus
  fallbackSrc?: string
  className?: string
}) {
  const [imageError, setImageError] = React.useState(false)
  const [fallbackError, setFallbackError] = React.useState(false)

  const avatarClasses = cn(avatarVariants({ size }), className)
  const sizeClasses = getAvatarSizeClasses(size)
  
  const displayStatus = status || user?.status
  const initials = user ? getInitials(user) : "?"
  const bgColor = user ? getUserColor(user) : "bg-gray-500"
  const fullName = user ? getFullName(user) : ""

  const primarySrc = src || user?.photo
  const shouldShowImage = primarySrc && !imageError && validateImageUrl(primarySrc)
  const shouldShowFallback = fallbackSrc && !fallbackError && !shouldShowImage && validateImageUrl(fallbackSrc)

  return (
    <div className="relative">
      <Avatar className={avatarClasses}>
        {shouldShowImage && (
          <AvatarImage
            src={primarySrc}
            alt={fullName || "User avatar"}
            onError={() => setImageError(true)}
            className="object-cover"
          />
        )}
        
        {shouldShowFallback && (
          <AvatarImage
            src={fallbackSrc}
            alt={fullName || "User avatar"}
            onError={() => setFallbackError(true)}
            className="object-cover"
          />
        )}
        
        <AvatarFallback className={cn(bgColor, "text-white", sizeClasses)}>
          {user ? (
            <span className="font-medium">{initials}</span>
          ) : (
            <DocyIcon 
              name="user" 
              size={size === "xs" || size === "sm" ? "xs" : size === "md" ? "sm" : "md"} 
              className="text-white"
            />
          )}
        </AvatarFallback>
      </Avatar>
      
      {showUserStatus && displayStatus && (
        <span
          className={cn(
            "absolute -bottom-0.5 -right-0.5 block rounded-full ring-2 ring-white z-10",
            STATUS_COLORS[displayStatus],
            getStatusIndicatorSize(size)
          )}
          aria-label={`User is ${displayStatus}`}
        />
      )}
    </div>
  )
}

function MultipleAvatars({
  users,
  size = DEFAULT_AVATAR_SIZE,
  maxItems = DEFAULT_MAX_ITEMS,
  showUserStatus = false,
  className
}: {
  users: User[]
  size: AvatarSize
  maxItems: number
  showUserStatus: boolean
  className?: string
}) {
  const visibleUsers = users.slice(0, maxItems)
  const remainingCount = users.length - maxItems
  const sizeClasses = getAvatarSizeClasses(size)

  return (
    <div className={cn(avatarGroupVariants(), className)}>
      {visibleUsers.map((user, index) => (
        <div 
          key={user.userId || index}
          className="relative hover:z-10 hover:scale-105 transition-transform duration-150 origin-center"
        >
          <SingleAvatar
            user={user}
            size={size}
            showUserStatus={showUserStatus}
            className="ring-2 ring-white"
          />
        </div>
      ))}
      
      {remainingCount > 0 && (
        <Avatar className={cn(avatarVariants({ size }), "ring-2 ring-white bg-gray-100")}>
          <AvatarFallback className={cn("bg-gray-100 text-gray-600", sizeClasses)}>
            <span className="font-medium">+{remainingCount}</span>
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  )
}

const DocyAvatar = React.forwardRef<HTMLDivElement, DocyAvatarProps>(
  ({ 
    src,
    userId,
    user,
    users = [],
    size = DEFAULT_AVATAR_SIZE,
    maxItems = DEFAULT_MAX_ITEMS,
    showUserStatus = false,
    status,
    className,
    fallbackSrc,
    ...props 
  }, ref) => {
    
    const renderContent = () => {
      // Handle multiple user IDs
      if (Array.isArray(userId)) {
        const resolvedUsers = resolveUsers(userId, users)
        
        if (resolvedUsers.length === 0) {
          // Show placeholder for empty group
          return (
            <Avatar className={avatarVariants({ size })}>
              <AvatarFallback className={getAvatarSizeClasses(size)}>
                <DocyIcon 
                  name="users" 
                  size={size === "xs" || size === "sm" ? "xs" : size === "md" ? "sm" : "md"} 
                  className="text-gray-400"
                />
              </AvatarFallback>
            </Avatar>
          )
        }
        
        if (resolvedUsers.length === 1) {
          return (
            <SingleAvatar
              user={resolvedUsers[0]}
              size={size}
              showUserStatus={showUserStatus}
              status={status}
              fallbackSrc={fallbackSrc}
            />
          )
        }
        
        return (
          <MultipleAvatars
            users={resolvedUsers}
            size={size}
            maxItems={maxItems}
            showUserStatus={showUserStatus}
          />
        )
      }
      
      // Handle single user ID
      if (userId) {
        const resolvedUser = resolveUser(userId, users)
        
        if (!resolvedUser) {
          // Show placeholder when user not found
          return (
            <Avatar className={avatarVariants({ size })}>
              <AvatarFallback className={getAvatarSizeClasses(size)}>
                <DocyIcon 
                  name="user" 
                  size={size === "xs" || size === "sm" ? "xs" : size === "md" ? "sm" : "md"} 
                  className="text-gray-400"
                />
              </AvatarFallback>
            </Avatar>
          )
        }
        
        return (
          <SingleAvatar
            user={resolvedUser}
            size={size}
            showUserStatus={showUserStatus}
            status={status}
            fallbackSrc={fallbackSrc}
          />
        )
      }
      
      // Handle direct user prop or src
      if (user || src) {
        return (
          <SingleAvatar
            user={user}
            src={src}
            size={size}
            showUserStatus={showUserStatus}
            status={status}
            fallbackSrc={fallbackSrc}
          />
        )
      }
      
      // Default placeholder
      return (
        <Avatar className={avatarVariants({ size })}>
          <AvatarFallback className={getAvatarSizeClasses(size)}>
            <DocyIcon 
              name="image" 
              size={size === "xs" || size === "sm" ? "xs" : size === "md" ? "sm" : "md"} 
              className="text-gray-400"
            />
          </AvatarFallback>
        </Avatar>
      )
    }
    
    return (
      <div ref={ref} {...props} className={className}>
        <AvatarErrorBoundary size={size}>
          {renderContent()}
        </AvatarErrorBoundary>
      </div>
    )
  }
)

DocyAvatar.displayName = "DocyAvatar"

export { DocyAvatar, avatarVariants }
export default DocyAvatar