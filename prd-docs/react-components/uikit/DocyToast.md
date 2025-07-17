# DocyToast Component

## Overview
DocyToast is a notification component system that provides contextual feedback to users through toast notifications. It supports multiple variants, auto-dismissal, and positioning with smooth animations. Built with shadcn/ui patterns and class-variance-authority for consistent styling.

## Component Specification

### Props
| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `title` | string | - | Yes | Toast notification title |
| `description` | string | - | No | Additional toast description text |
| `variant` | string | 'info' | No | Toast variant: 'info', 'success', 'warning', 'error' |
| `duration` | number | 5000 | No | Auto-dismiss duration in milliseconds (0 for persistent) |
| `closable` | boolean | true | No | Whether toast can be manually closed |
| `position` | string | 'top-right' | No | Toast position: 'top-right', 'top-left', 'bottom-right', 'bottom-left' |
| `onClose` | function | - | No | Callback function when toast is closed |
| `className` | string | - | No | Additional CSS classes |

### Behavior
1. **Toast Management**:
   - Global notification system with proper stacking
   - Auto-dismiss functionality with configurable duration
   - Manual close action with close button
   - Smooth enter/exit animations

2. **Variant System**:
   - **Info**: Blue styling with information icon
   - **Success**: Green styling with check circle icon
   - **Warning**: Yellow styling with warning triangle icon
   - **Error**: Red styling with error circle icon

3. **Positioning**:
   - Fixed positioning with z-index layering
   - Responsive layout for mobile and desktop
   - Proper spacing between multiple toasts

### Toast Manager
The component includes a toast manager system for programmatic control:
```typescript
const toastManager = {
  info: (title: string, description?: string) => void,
  success: (title: string, description?: string) => void,
  warning: (title: string, description?: string) => void,
  error: (title: string, description?: string) => void,
  dismiss: (id: string) => void,
  clear: () => void
}
```

### Variant Classes
```typescript
const variantClasses = {
  info: 'text-blue-400',
  success: 'text-green-400', 
  warning: 'text-yellow-400',
  error: 'text-red-400'
} as const
```

## Component Requirements

### Technical Specifications
- **Framework**: React with TypeScript
- **Base Component**: shadcn/ui Toast component (`pnpm dlx shadcn@latest add toast`)
- **Extensions**: Multiple variants, positioning system, and toast manager built on top of shadcn Toast
- **Styling**: shadcn/ui patterns with class-variance-authority
- **Icons**: Heroicons for status indicators
- **Animation**: Smooth transitions with Tailwind CSS v4
- **Accessibility**: ARIA live regions and proper focus management

### Key Features Required
1. **Global Notification System**: Centralized toast management with provider pattern
2. **Variant Support**: Four semantic variants with appropriate styling and icons
3. **Auto-Dismiss**: Configurable duration with manual override
4. **Manual Close**: Close button with proper accessibility
5. **Position Control**: Flexible positioning system
6. **Animation System**: Smooth enter/exit animations with proper timing

### Usage Examples
```tsx
// Basic usage
<DocyToast title="Success!" description="Your changes have been saved" variant="success" />

// Different variants
<DocyToast title="Information" description="Please review the changes" variant="info" />
<DocyToast title="Warning" description="This action cannot be undone" variant="warning" />
<DocyToast title="Error" description="Failed to save changes" variant="error" />

// Custom duration and position
<DocyToast 
  title="Persistent message" 
  description="This will not auto-dismiss"
  duration={0}
  position="bottom-left"
/>

// Programmatic usage
toastManager.success('Data saved successfully');
toastManager.error('Failed to connect to server');
```

### Dependencies Required
- `@heroicons/react`: Status icons (InformationCircleIcon, CheckCircleIcon, ExclamationTriangleIcon, XCircleIcon, XMarkIcon)
- `class-variance-authority`: Variant management
- `framer-motion` or similar: Animation support
- Toast notification library or custom implementation

### Testing Requirements
1. **Unit Tests**: Toast rendering, variant styling, auto-dismiss functionality
2. **Integration Tests**: Toast manager operations, multiple toast handling
3. **Accessibility Tests**: ARIA live regions, keyboard navigation, screen reader compatibility
4. **Visual Tests**: All variants, positions, and animations

## Development Priority
**High** - Essential feedback component for user interactions

## Notes
- Built with modern shadcn/ui patterns for consistency
- Implements proper accessibility with ARIA live regions
- Supports global state management for toast notifications
- Designed for optimal performance with minimal re-renders