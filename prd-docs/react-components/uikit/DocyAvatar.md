# DocyAvatar Component

## Overview
DocyAvatar is a versatile avatar component built with shadcn/ui patterns and Tailwind CSS v4. It supports single and multiple user avatars, image fallbacks, initials display, status indicators, and grouped avatar layouts. It serves as the primary user representation component throughout the Docyrus React application.

## Component Specification

### Props
| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `src` | string | - | No | Direct image URL for avatar |
| `userId` | string/number/array | - | No | User ID or array of user IDs for multiple avatars |
| `user` | object | - | No | User object with name, photo, and color properties |
| `users` | array | - | No | Array of user objects for resolving user data |
| `size` | string | 'sm' | No | Size variant: 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', 'max' |
| `maxItems` | number | 5 | No | Maximum number of avatars to show in group mode |
| `showUserStatus` | boolean | false | No | Whether to show user status indicator |
| `status` | string | - | No | User status: 'online', 'offline', 'away' |
| `className` | string | - | No | Additional CSS classes |
| `fallbackSrc` | string | - | No | Custom fallback image URL |

### Size System
```typescript
const avatarVariants = cva({
  variants: {
    size: {
      xs: "h-4 w-4",      // 16px × 16px
      sm: "h-5 w-5",      // 20px × 20px  
      md: "h-6 w-6",      // 24px × 24px
      lg: "h-7 w-7",      // 28px × 28px
      xl: "h-8 w-8",      // 32px × 32px
      "2xl": "h-9 w-9",   // 36px × 36px
      "3xl": "h-10 w-10", // 40px × 40px
      "4xl": "h-12 w-12", // 48px × 48px
      "5xl": "h-16 w-16", // 64px × 64px
      max: "h-20 w-20"    // 80px × 80px
    }
  }
})
```

### Rendering Modes

#### 1. Single Avatar
- **Image Mode**: Displays user photo with fallback handling
- **Initials Mode**: Shows user initials with colored background
- **Placeholder Mode**: Generic user or image icon when no data available

#### 2. Multiple Avatars (Group Mode)
- **Stacked Layout**: Overlapping avatars with `-space-x-2` offset
- **Count Badge**: Shows total count when exceeding `maxItems`
- **Hover Effects**: Individual avatar hover states with z-index elevation

#### 3. Status Indicators
- **Online**: Green indicator (bg-green-400)
- **Offline**: Red indicator (bg-red-400)
- **Away**: Amber indicator (bg-amber-400)
- **Position**: Bottom-right corner with white ring

### Fallback Behavior
1. **Image Loading**: Attempts to load provided image source
2. **Fallback Image**: Uses system fallback or custom fallback on error
3. **Initials Display**: Shows user initials with colored background
4. **Generic Icon**: Falls back to user or image icon
5. **Error Handling**: Graceful degradation for all failure modes

### Color System
- **Background Colors**: Dynamic color assignment based on user data
- **Status Colors**: Semantic colors for online/offline/away states
- **Ring Colors**: White rings for separation and visual hierarchy
- **Text Colors**: Appropriate contrast for initials display

## Component Requirements

### Technical Specifications
- **Framework**: React with TypeScript
- **Base Component**: shadcn/ui Avatar component (`pnpm dlx shadcn@latest add avatar`)
- **Extensions**: Additional features built on top of shadcn Avatar
- **Styling**: shadcn/ui patterns with class-variance-authority
- **Image Handling**: Robust error handling and fallback mechanisms
- **Performance**: Optimized for large user lists and frequent updates
- **Accessibility**: Full ARIA support, alt text, and screen reader compatibility

### Key Features Required
1. **Multiple Display Modes**: Single avatar, grouped avatars, and placeholder states
2. **Image Fallback System**: Graceful degradation from image to initials to icons
3. **Status Indicators**: Visual user status with semantic colors
4. **Size Variants**: Comprehensive size system from xs to max
5. **Group Avatar Layout**: Stacked layout with count badges for large groups
6. **Dynamic Color System**: User-specific background colors and theming
7. **Responsive Design**: Consistent appearance across all screen sizes
8. **Error Handling**: Robust handling of missing images and user data

### Advanced Features
- **Initials Generation**: Smart extraction from various name formats
- **Hover Effects**: Elevated z-index and shadow effects in group mode
- **Count Badges**: Visual indicators for avatar groups exceeding max items
- **Tooltip Integration**: User information display on hover
- **Dynamic Sizing**: Text and icon scaling based on avatar size

### Usage Examples
```tsx
// Basic avatar with image
<DocyAvatar src="https://example.com/avatar.jpg" />

// User avatar with initials fallback
<DocyAvatar 
  user={{ 
    firstname: "John", 
    lastname: "Doe", 
    photo: "https://example.com/john.jpg",
    color: "blue-500"
  }} 
/>

// Multiple avatars (group mode)
<DocyAvatar 
  userId={["user1", "user2", "user3", "user4", "user5", "user6"]}
  users={userList}
  maxItems={4}
/>

// With status indicator
<DocyAvatar 
  user={user}
  showUserStatus
  status="online"
  size="lg"
/>

// Different sizes
<DocyAvatar user={user} size="xs" />
<DocyAvatar user={user} size="md" />
<DocyAvatar user={user} size="xl" />
<DocyAvatar user={user} size="max" />

// Placeholder states
<DocyAvatar users={[]} />  // Shows generic user icon
<DocyAvatar />             // Shows generic image icon

// With custom fallback
<DocyAvatar 
  src="https://example.com/avatar.jpg"
  fallbackSrc="https://example.com/custom-fallback.jpg"
  user={user}
/>

// Custom styling
<DocyAvatar 
  user={user}
  className="ring-2 ring-blue-500 shadow-lg"
  size="lg"
/>
```

### Integration Requirements
- **DocyIcon**: Used for placeholder icons (user, image)
- **User Management**: Integration with user data systems
- **Tooltip System**: Hover information display
- **Theme System**: Dynamic color generation and theming

### Data Structure Requirements
```typescript
interface User {
  userId: string | number;
  firstname: string;
  lastname: string;
  name?: string;
  photo?: string;
  color?: string;
  status?: 'online' | 'offline' | 'away';
  fullname?: string;
}

interface UserData {
  id: string;
  initials: string;
  photoExists: boolean;
  photo?: string;
  color?: string;
  fullname: string;
  userStatus?: boolean;
  status?: string;
}
```

### Accessibility Requirements
- **Alt Text**: Descriptive alt text for all images
- **ARIA Labels**: Proper labeling for status indicators
- **Screen Reader**: Meaningful content for assistive technology
- **Keyboard Navigation**: Focus management for interactive elements
- **Color Contrast**: Sufficient contrast for all text and indicators

### Dependencies Required
- `class-variance-authority`: Variant management
- `DocyIcon`: Icon component for placeholders
- Image loading utilities for error handling
- Tooltip component for user information display

### Testing Requirements
1. **Unit Tests**: Size variants, fallback behavior, initials generation
2. **Integration Tests**: User data resolution, group avatar layout
3. **Visual Tests**: All sizes, colors, and states across themes
4. **Accessibility Tests**: Screen reader compatibility, keyboard navigation
5. **Performance Tests**: Large user lists, frequent updates, image loading
6. **Error Handling Tests**: Network failures, missing data, invalid images

## Development Priority
**High** - Core component used throughout the application for user representation

## Notes
- Built with modern shadcn/ui patterns for consistency
- Supports both single and multiple user scenarios
- Robust fallback system ensures graceful degradation
- Optimized for performance with large user datasets
- Full TypeScript support with comprehensive type safety
- Integrates seamlessly with existing user management systems