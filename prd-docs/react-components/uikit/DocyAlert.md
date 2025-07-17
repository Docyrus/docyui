# DocyAlert Component

## Overview
DocyAlert is a flexible alert component built on shadcn/ui patterns that displays callouts for user attention. It supports multiple variants, sizes, and can include icons, actions, and dismissible functionality. It serves as the primary notification and feedback component throughout the Docyrus React application.

## Component Specification

### Props
| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-----------|
| `children` | ReactNode | - | No | Alert content |
| `variant` | string | 'default' | No | Alert style: 'default', 'destructive', 'success', 'warning', 'info' |
| `size` | string | 'default' | No | Alert size: 'sm', 'default', 'lg' |
| `icon` | string | - | No | Icon name (uses DocyIcon) |
| `title` | string | - | No | Alert title/heading |
| `description` | string | - | No | Alert description text |
| `dismissible` | boolean | false | No | Enable dismiss functionality |
| `onDismiss` | function | - | No | Callback when alert is dismissed |
| `actions` | ReactNode | - | No | Action buttons or elements |
| `className` | string | - | No | Additional CSS classes |

### Variants
Built following shadcn/ui alert patterns:

1. **default**: Standard alert with neutral colors
2. **destructive**: Red alert for errors and dangerous actions
3. **success**: Green alert for successful operations
4. **warning**: Amber alert for warnings and cautions
5. **info**: Blue alert for informational messages

### Size System
```typescript
const alertVariants = cva({
  variants: {
    size: {
      sm: "p-3 text-sm",
      default: "p-4",
      lg: "p-6 text-lg"
    }
  }
})
```

### Visual States
- **Default State**: Standard appearance with appropriate colors
- **Dismissible State**: Includes close button with hover effects
- **With Actions**: Footer area for action buttons
- **Icon State**: Left-aligned icon with proper spacing

## Component Requirements

### Technical Specifications
- **Framework**: React with TypeScript
- **Base Component**: shadcn/ui Alert component (`pnpm dlx shadcn@latest add alert`)
- **Extensions**: Additional variants, sizes, and actions built on shadcn Alert
- **Styling**: shadcn/ui patterns with class-variance-authority
- **Accessibility**: Full ARIA support, role="alert", keyboard navigation
- **Animation**: Smooth enter/exit transitions, dismiss animations
- **Performance**: Optimized re-renders, proper event handling

### Key Features Required
1. **Variant System**: Multiple alert types with semantic colors
2. **Size Variants**: Different alert sizes for various contexts
3. **Icon Integration**: Flexible icon display with DocyIcon
4. **Dismissible Functionality**: Close button with smooth animations
5. **Action Support**: Footer area for buttons and links
6. **Title and Description**: Structured content layout
7. **Accessibility**: Screen reader support and keyboard navigation
8. **Animation System**: Smooth transitions and state changes

### Advanced Features
- **Auto-dismiss**: Optional timeout for automatic dismissal
- **Stacking**: Multiple alerts with proper spacing
- **Responsive Design**: Mobile-friendly layout
- **Custom Icons**: Variant-specific default icons

### Usage Examples
```tsx
// Basic alert
<DocyAlert>This is a basic alert message</DocyAlert>

// Alert variants
<DocyAlert variant="destructive">Error: Something went wrong</DocyAlert>
<DocyAlert variant="success">Success: Operation completed</DocyAlert>
<DocyAlert variant="warning">Warning: Please review</DocyAlert>
<DocyAlert variant="info">Info: New feature available</DocyAlert>

// Alert with title and description
<DocyAlert
  title="Error"
  description="Unable to save changes. Please try again."
  variant="destructive"
/>

// Alert with icon
<DocyAlert
  icon="alert-circle"
  variant="warning"
  title="Warning"
  description="This action cannot be undone."
/>

// Dismissible alert
<DocyAlert
  dismissible
  onDismiss={() => console.log('Alert dismissed')}
  variant="info"
>
  This alert can be dismissed
</DocyAlert>

// Alert with actions
<DocyAlert
  title="Confirm Action"
  description="Are you sure you want to proceed?"
  actions={
    <>
      <DocyButton variant="outline" size="sm">Cancel</DocyButton>
      <DocyButton variant="destructive" size="sm">Confirm</DocyButton>
    </>
  }
/>

// Different sizes
<DocyAlert size="sm">Small alert</DocyAlert>
<DocyAlert size="lg">Large alert</DocyAlert>
```

### Integration Requirements
- **DocyIcon**: Icon component for alert icons
- **DocyButton**: Button component for actions
- **Animation Library**: For smooth transitions
- **Theme System**: Color variants and theming

### Testing Requirements
1. **Unit Tests**: Variant rendering, dismissible functionality, action handling
2. **Integration Tests**: Icon integration, button actions, event handling
3. **Accessibility Tests**: ARIA attributes, keyboard navigation, screen reader support
4. **Visual Tests**: All variants and sizes across different themes
5. **Animation Tests**: Smooth transitions, dismiss animations

## Development Priority
**High** - Core component for user feedback and notifications

## Notes
- Built with modern shadcn/ui patterns for consistency
- Supports both simple and complex alert scenarios
- Flexible action system for interactive alerts
- Full accessibility compliance
- TypeScript support with comprehensive type safety
