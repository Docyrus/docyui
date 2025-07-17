# DocyUserAvatar Component

## Overview
DocyUserAvatar is a comprehensive user avatar component built with shadcn/ui patterns and Tailwind CSS v4. It supports single user avatars, multiple user groups with overlap, initials display, status indicators, and custom fallback handling. It serves as the primary user representation component throughout the Docyrus React application.

## Component Specification

### Props
| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `src` | string | - | No | Direct image source URL |
| `userId` | string/number/array | - | No | User ID or array of user IDs for group avatars |
| `user` | object | - | No | User object with profile data |
| `users` | array | - | No | Array of user objects for lookups |
| `size` | string | 'sm' | No | Size variant: 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', 'max' |
| `maxItems` | number | 5 | No | Maximum number of avatars to show in group mode |
| `showUserStatus` | boolean | false | No | Display online/offline status indicator |
| `status` | string | - | No | User status: 'online', 'offline', 'away' |
| `className` | string | - | No | Additional CSS classes |
| `fallbackIcon` | string | 'user' | No | Icon to show when no user data available |

### Behavior
1. **Single User Mode**:
   - Displays user photo when available
   - Falls back to colored initials circle
   - Shows status indicator when enabled
   - Handles broken image gracefully

2. **Group Avatar Mode**:
   - Renders overlapping avatars when userId is array
   - Shows count badge when users exceed maxItems
   - Maintains consistent spacing and z-index ordering
   - Supports individual user status indicators

3. **Fallback Handling**:
   - Graceful image loading error handling
   - Automatic initials generation from user names
   - Color-coded backgrounds for better identification
   - Generic user/image icons for missing data

4. **Status Indicators**:
   - Positioned at bottom-right of avatar
   - Color-coded: green (online), red (offline), amber (away)
   - Proper sizing relative to avatar size
   - Ring styling for visual separation

### Size System
```typescript
const sizeVariants = {
  xs: { avatar: 16, text: "text-3xs", status: 4 },    // 16px × 16px
  sm: { avatar: 20, text: "text-2xs", status: 5 },    // 20px × 20px
  md: { avatar: 24, text: "text-xs", status: 6 },     // 24px × 24px
  lg: { avatar: 28, text: "text-sm", status: 7 },     // 28px × 28px
  xl: { avatar: 32, text: "text-base", status: 8 },   // 32px × 32px
  '2xl': { avatar: 36, text: "text-lg", status: 9 },  // 36px × 36px
  '3xl': { avatar: 40, text: "text-lg", status: 10 }, // 40px × 40px
  '4xl': { avatar: 48, text: "text-xl", status: 12 }, // 48px × 48px
  '5xl': { avatar: 64, text: "text-xl", status: 16 }, // 64px × 64px
  max: { avatar: 80, text: "text-2xl", status: 20 }   // 80px × 80px
} as const
```

### Status Colors
```typescript
const statusColors = {
  online: "bg-green-400",
  offline: "bg-red-400", 
  away: "bg-amber-400"
} as const
```

### Advanced Features

#### Group Avatar Layout
- Overlapping avatars with negative margin spacing
- Proper z-index management for hover effects
- Count badge for overflow items
- Consistent ring styling for visual separation

#### Initials Generation
- Automatic extraction from firstname/lastname
- Fallback to name splitting for single name field
- Proper case handling and localization
- Special handling for system users (e.g., "WU" for webform user)

#### Image Handling
- Graceful error handling with fallback URLs
- Proper aspect ratio maintenance
- Object-fit cover for consistent display
- Loading state management

#### Color System
- User-specific color assignments
- Fallback color generation
- Consistent color application across initials backgrounds
- Integration with design system color palette

## Component Requirements

### Technical Specifications
- **Framework**: React with TypeScript
- **Base Component**: Custom implementation (no direct shadcn/ui equivalent)
- **Integration**: Uses shadcn/ui design tokens and styling patterns
- **Styling**: shadcn/ui patterns with class-variance-authority
- **Accessibility**: Full ARIA support, alt text, proper roles
- **Performance**: Optimized rendering, proper memoization for groups
- **Image Handling**: Graceful error handling, lazy loading support

### Key Features Required
1. **Single User Display**: Photo, initials, status indicator, fallback handling
2. **Group Avatar Mode**: Overlapping layout, count badges, individual status
3. **Size Variants**: Complete size system with proper text scaling
4. **Status Indicators**: Online/offline/away with proper positioning
5. **Fallback System**: Graceful handling of missing data/images
6. **Color System**: User-specific colors with consistent application
7. **Accessibility**: Screen reader support, proper alt text, ARIA labels
8. **Performance**: Efficient group rendering, proper key management

### Image Management
- **Error Handling**: Automatic fallback to default broken image URL
- **Loading States**: Proper loading indication during image fetch
- **Aspect Ratio**: Consistent circular cropping with object-fit
- **Lazy Loading**: Support for performance optimization

### User Data Integration
- **Flexible Props**: Support for direct user object or ID-based lookup
- **Name Parsing**: Intelligent initials extraction from various name formats
- **Status Management**: Real-time status updates with proper state handling
- **Data Validation**: Proper handling of missing or malformed user data

### Usage Examples
```tsx
// Single user with photo
<DocyUserAvatar userId="123" users={userList} />

// Single user with direct data
<DocyUserAvatar 
  user={{ 
    firstname: "John", 
    lastname: "Doe", 
    photo: "/path/to/photo.jpg" 
  }} 
/>

// Group avatars
<DocyUserAvatar userId={["123", "456", "789"]} users={userList} />

// With status indicator
<DocyUserAvatar 
  userId="123" 
  users={userList}
  showUserStatus={true}
  status="online"
/>

// Different sizes
<DocyUserAvatar userId="123" users={userList} size="xs" />
<DocyUserAvatar userId="123" users={userList} size="lg" />
<DocyUserAvatar userId="123" users={userList} size="max" />

// Group with custom max items
<DocyUserAvatar 
  userId={["123", "456", "789", "101", "102", "103"]}
  users={userList}
  maxItems={3}
/>

// With custom fallback
<DocyUserAvatar 
  userId="123"
  users={userList}
  fallbackIcon="user-circle"
/>

// Direct image source
<DocyUserAvatar src="/path/to/avatar.jpg" size="md" />

// With custom styling
<DocyUserAvatar 
  userId="123"
  users={userList}
  className="ring-2 ring-blue-500"
/>
```

### Integration Requirements
- **User Store**: Integration with user management state
- **Status System**: Real-time status updates from presence service
- **Image Service**: Integration with image upload/storage service
- **Tooltip System**: Hover tooltips showing user information

### Accessibility Requirements
- **Alt Text**: Proper alt text for user images
- **ARIA Labels**: Descriptive labels for screen readers
- **Role Attributes**: Proper roles for avatar containers
- **Keyboard Navigation**: Focus management for interactive elements
- **Screen Reader**: Proper announcement of user information and status

### Dependencies Required
- `class-variance-authority`: Variant management
- `DocyIcon`: Icon component for fallback states
- Image loading utilities for error handling
- Color generation utilities for user-specific colors

### Testing Requirements
1. **Unit Tests**: Props validation, initials generation, status handling
2. **Visual Tests**: All sizes, group layouts, status indicators
3. **Accessibility Tests**: ARIA attributes, alt text, screen reader compatibility
4. **Integration Tests**: User data lookup, status updates, error handling
5. **Performance Tests**: Group rendering performance, image loading optimization
6. **Error Handling Tests**: Broken images, missing user data, malformed props

## Development Priority
**High** - Core user interface component used throughout the application

## Notes
- Built with modern shadcn/ui patterns for consistency
- Leverages Tailwind v4's improved color system and utilities
- Designed for maximum flexibility with single and group usage
- Comprehensive fallback system ensures graceful degradation
- Performance-optimized for large user lists and group avatars
- Full accessibility compliance with WCAG guidelines