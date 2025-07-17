# DocyUserDisplay Component

## Overview
DocyUserDisplay is a comprehensive user display component that shows user information with interactive dropdown details. It combines avatar display with contextual user information in a clean, accessible interface built with shadcn/ui patterns and Tailwind CSS v4.

## Component Specification

### Props
| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `userId` | string \| string[] | - | No | User ID or array of user IDs to display |
| `users` | User[] | - | No | Array of user objects (overrides userId lookup) |
| `size` | string | 'sm' | No | Avatar size: 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', 'max' |
| `maxItems` | number | 5 | No | Maximum number of avatars to display before showing count |
| `showStatus` | boolean | false | No | Whether to show user status indicators |
| `className` | string | - | No | Additional CSS classes |
| `onUserClick` | function | - | No | Callback when user is clicked |

### Behavior
1. **User Data Handling**:
   - Accepts either user IDs for store lookup or direct user objects
   - Supports single user or multiple users display
   - Automatically fetches user data from store when using userId prop

2. **Avatar Display**:
   - Shows user avatars with configurable sizes
   - Supports status indicators when enabled
   - Handles multiple users with stacked avatar layout
   - Shows user count when exceeding maxItems

3. **Interactive Dropdown**:
   - Click/touch triggers dropdown with detailed user info
   - Shows full name, tenant information, and larger avatar
   - Auto-hide behavior with proper accessibility
   - Hover and click trigger support

### Size Variants
```typescript
const sizeVariants = {
  xs: 'h-6 w-6',
  sm: 'h-8 w-8',
  md: 'h-10 w-10',
  lg: 'h-12 w-12',
  xl: 'h-14 w-14',
  '2xl': 'h-16 w-16',
  '3xl': 'h-20 w-20',
  '4xl': 'h-24 w-24',
  '5xl': 'h-32 w-32',
  max: 'h-full w-full'
} as const
```

### User Object Structure
```typescript
interface User {
  userId: string;
  fullname: string;
  initials: string;
  photo?: string;
  photoExists?: boolean;
  status?: 'online' | 'offline' | 'away' | 'busy';
  tenant: {
    name: string;
  };
}
```

## Component Requirements

### Technical Specifications
- **Framework**: React with TypeScript
- **Base Component**: Custom implementation (no direct shadcn/ui equivalent)
- **Integration**: Uses shadcn/ui design tokens and styling patterns
- **Styling**: shadcn/ui patterns with class-variance-authority
- **Interactions**: Dropdown with Radix UI primitives
- **Performance**: Efficient user data fetching and caching
- **Accessibility**: Full ARIA support, keyboard navigation

### Key Features Required
1. **Multi-User Support**: Display single or multiple users efficiently
2. **Interactive Dropdown**: Detailed user information on interaction
3. **Status Indicators**: Optional user status display
4. **Responsive Design**: Works across all screen sizes
5. **Avatar Integration**: Seamless DocyAvatar component integration
6. **Store Integration**: Automatic user data fetching from application state

### Usage Examples
```tsx
// Single user display
<DocyUserDisplay userId="user-123" />

// Multiple users with status
<DocyUserDisplay 
  userId={["user-1", "user-2", "user-3"]} 
  showStatus={true}
  maxItems={3}
/>

// Direct user objects
<DocyUserDisplay 
  users={userArray}
  size="lg"
  showStatus={true}
/>

// Large display with custom styling
<DocyUserDisplay
  userId="user-123"
  size="xl"
  className="border-2 border-blue-200"
/>

// Callback handling
<DocyUserDisplay
  userId="user-123"
  onUserClick={(user) => console.log('User clicked:', user)}
/>

// Maximum items control
<DocyUserDisplay
  userId={userIds}
  maxItems={8}
  size="md"
/>
```

### Dependencies Required
- `@radix-ui/react-dropdown-menu`: Dropdown functionality
- `DocyAvatar`: Avatar display component
- `class-variance-authority`: Variant management
- User store/context for data fetching

### Testing Requirements
1. **Unit Tests**: User data handling, dropdown interactions, prop validation
2. **Visual Tests**: All size variants, multi-user display, status indicators
3. **Accessibility Tests**: Keyboard navigation, ARIA attributes, screen reader support
4. **Integration Tests**: Store integration, user data fetching, error handling

## Development Priority
**Medium** - Important user interface component for displaying user information

## Notes
- Built with modern shadcn/ui patterns for consistency
- Integrates seamlessly with existing DocyAvatar component
- Supports both controlled and uncontrolled user data patterns
- Designed for optimal performance with large user lists
- Follows Docyrus design system conventions