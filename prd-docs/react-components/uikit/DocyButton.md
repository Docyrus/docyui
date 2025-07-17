# DocyButton Component

## Overview
DocyButton is a comprehensive button component built with shadcn/ui patterns and Tailwind CSS v4. It supports multiple variants, sizes, colors, icons, badges, and advanced features like click-to-confirm, loading states, and form submission. It serves as the primary interactive element throughout the Docyrus React application.

## Component Specification

### Props
| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `children` | ReactNode | - | No | Button content |
| `variant` | string | 'default' | No | Button style: 'default', 'destructive', 'outline', 'secondary', 'ghost', 'link' |
| `size` | string | 'default' | No | Button size: 'default', 'sm', 'lg', 'icon' |
| `asChild` | boolean | false | No | Render as child element using Radix Slot |
| `disabled` | boolean | false | No | Disable button interaction |
| `loading` | boolean | false | No | Show loading state with spinner |
| `loadingText` | string | - | No | Text to show during loading |
| `icon` | string | - | No | Icon name (uses DocyIcon) |
| `iconPosition` | string | 'left' | No | Icon position: 'left', 'right' |
| `destructive` | boolean | false | No | Enable destructive confirmation flow |
| `confirmText` | string | - | No | Custom confirmation text |
| `confirmTimeout` | number | 3000 | No | Confirmation timeout in ms |
| `fullWidth` | boolean | false | No | Make button full width |
| `className` | string | - | No | Additional CSS classes |

### Variants
Built following shadcn/ui button patterns:

1. **default**: Primary solid button with brand colors
2. **destructive**: Red button for dangerous actions
3. **outline**: Bordered button with transparent background
4. **secondary**: Muted button with light background
5. **ghost**: Transparent button with hover effects
6. **link**: Text-only button styled as link

### Size System
```typescript
const buttonVariants = cva({
  variants: {
    size: {
      default: "h-10 px-4 py-2",
      sm: "h-9 rounded-md px-3",
      lg: "h-11 rounded-md px-8",
      icon: "h-10 w-10"
    }
  }
})
```

### Advanced Features

#### Destructive Confirmation
- Two-step confirmation for dangerous actions
- Visual feedback with confirmation/cancel options
- Automatic timeout with progress indicator
- Smooth animations and transitions

#### Loading States
- Integrated spinner component
- Automatic button disabling
- Custom loading text support
- Smooth state transitions

#### Accessibility
- Built-in ARIA attributes
- Keyboard navigation support
- Screen reader compatibility
- Focus management

## Component Requirements

### Technical Specifications
- **Framework**: React with TypeScript
- **Base Component**: shadcn/ui Button component (`pnpm dlx shadcn@latest add button`)
- **Extensions**: Loading states, destructive confirmation, icon support built on top of shadcn Button
- **Styling**: shadcn/ui patterns with class-variance-authority
- **Accessibility**: Full ARIA support, keyboard navigation, focus management
- **Polymorphic**: Support for rendering as different elements using Radix Slot
- **Performance**: Optimized re-renders, proper memoization

### Key Features Required
1. **Variant System**: Multiple button styles (default, destructive, outline, secondary, ghost, link)
2. **Size Variants**: Different button sizes (sm, default, lg, icon)
3. **Loading States**: Integrated spinner with custom loading text
4. **Icon Support**: Flexible icon positioning (left/right) with DocyIcon integration
5. **Destructive Confirmation**: Two-step confirmation flow with visual progress indicator
6. **Polymorphic Rendering**: Can render as different elements (button, Link, etc.)
7. **Full Width Support**: Option for full-width buttons
8. **State Management**: Proper handling of disabled, loading, and confirmation states

### Advanced Features
- **Click-to-Confirm**: Visual countdown with automatic timeout for destructive actions
- **Progress Animation**: Smooth progress bar during confirmation timeout
- **Event Handling**: Proper click event management with confirmation flow
- **Cleanup**: Proper cleanup of timers and intervals

### Usage Examples
```tsx
// Basic button
<DocyButton>Click me</DocyButton>

// Variants
<DocyButton variant="destructive">Delete</DocyButton>
<DocyButton variant="outline">Cancel</DocyButton>
<DocyButton variant="secondary">Secondary</DocyButton>
<DocyButton variant="ghost">Ghost</DocyButton>
<DocyButton variant="link">Link</DocyButton>

// Sizes
<DocyButton size="sm">Small</DocyButton>
<DocyButton size="lg">Large</DocyButton>
<DocyButton size="icon">
  <DocyIcon name="plus" />
</DocyButton>

// With icons
<DocyButton icon="save">Save</DocyButton>
<DocyButton icon="download" iconPosition="right">
  Download
</DocyButton>

// Loading state
<DocyButton loading>Loading...</DocyButton>
<DocyButton loading loadingText="Saving">
  Save
</DocyButton>

// Destructive with confirmation
<DocyButton 
  destructive 
  variant="destructive"
  confirmText="Delete this item?"
>
  Delete Item
</DocyButton>

// As child (polymorphic)
<DocyButton asChild>
  <Link href="/dashboard">Go to Dashboard</Link>
</DocyButton>

// Full width
<DocyButton fullWidth>Full Width Button</DocyButton>
```

### Dependencies Required
- `@radix-ui/react-slot`: For polymorphic rendering
- `class-variance-authority`: Variant management
- `DocyIcon`: Icon component integration
- `DocySpinner`: Loading state spinner

### Testing Requirements
1. **Unit Tests**: Variant rendering, loading states, destructive confirmation flow
2. **Integration Tests**: Icon integration, event handling, polymorphic rendering
3. **Accessibility Tests**: ARIA attributes, keyboard navigation, focus management
4. **Visual Tests**: All variants and states across different themes
5. **Interaction Tests**: Click-to-confirm flow, timeout handling, event propagation

## Development Priority
**High** - Core interactive component used throughout the application

## Notes
- Built with modern shadcn/ui patterns for consistency and maintainability
- Leverages Tailwind v4's CSS variable system for theme support
- Polymorphic design allows maximum flexibility
- Destructive confirmation provides smooth UX for dangerous actions
- Full TypeScript support with excellent IntelliSense