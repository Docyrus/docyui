# DocySpinner Component

## Overview
DocySpinner is a simple, lightweight loading indicator component built with shadcn/ui patterns and Tailwind CSS v4. It displays a spinning circular animation and supports multiple sizes and colors, making it suitable for various loading states throughout the application.

## Component Specification

### Props
| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `size` | string | 'default' | No | Size variant: 'sm', 'default', 'lg' |
| `className` | string | - | No | Additional CSS classes |
| `color` | string | 'current' | No | Color using Tailwind color tokens |
| `speed` | string | 'normal' | No | Animation speed: 'slow', 'normal', 'fast' |

### Size System
```typescript
const spinnerVariants = cva({
  variants: {
    size: {
      sm: "h-4 w-4",      // 16px × 16px
      default: "h-6 w-6", // 24px × 24px  
      lg: "h-8 w-8"       // 32px × 32px
    },
    speed: {
      slow: "animate-spin-slow",
      normal: "animate-spin",
      fast: "animate-spin-fast"
    }
  }
})
```

### Visual Design
- **Shape**: Circular spinner with gradient arc
- **Animation**: Smooth rotation using CSS animations
- **Colors**: Support for Tailwind v4 color system with CSS variables
- **Performance**: Hardware-accelerated transforms for 60fps animation

### Accessibility
- **Role**: `role="status"` for screen readers
- **ARIA**: Proper `aria-label` attributes
- **Reduced Motion**: Respects `prefers-reduced-motion` setting

## Component Requirements

### Technical Specifications
- **Framework**: React with TypeScript
- **Base Component**: Custom implementation (no direct shadcn/ui equivalent)
- **Integration**: Uses shadcn/ui animation patterns and design tokens
- **Styling**: shadcn/ui patterns with class-variance-authority
- **Animation**: Hardware-accelerated CSS animations
- **Accessibility**: Full ARIA support, reduced motion respect
- **Performance**: Lightweight SVG implementation, minimal DOM footprint

### Key Features Required
1. **Size Variants**: Multiple size options (sm, default, lg)
2. **Speed Control**: Variable animation speeds (slow, normal, fast)
3. **Color Support**: Integration with design system color tokens
4. **Accessibility**: Proper ARIA attributes and screen reader support
5. **Reduced Motion**: Respect for user motion preferences
6. **Performance**: Hardware-accelerated animations for smooth 60fps

### Visual Design Requirements
- **Shape**: Circular spinner with gradient arc
- **Animation**: Smooth rotation using CSS transforms
- **Opacity**: Proper contrast with background and foreground circles
- **Responsive**: Consistent appearance across different screen sizes

### Usage Examples
```tsx
// Basic spinner
<DocySpinner />

// Different sizes
<DocySpinner size="sm" />
<DocySpinner size="lg" />

// Different speeds
<DocySpinner speed="slow" />
<DocySpinner speed="fast" />

// Custom accessibility label
<DocySpinner aria-label="Loading content..." />

// In a button (integration example)
<DocyButton loading>
  <DocySpinner size="sm" />
  Loading...
</DocyButton>

// With custom styling
<DocySpinner 
  className="text-blue-500" 
  size="lg" 
  speed="slow"
/>

// In loading states
<div className="flex items-center gap-2">
  <DocySpinner size="sm" />
  <span>Processing...</span>
</div>
```

### Integration Requirements
- **DocyButton**: Used in loading states
- **Form Components**: Field validation and submission indicators
- **Data Views**: Content loading placeholders
- **Overlay Components**: Full-screen loading states

### Accessibility Requirements
- **Role**: `role="status"` for screen readers
- **ARIA Labels**: Proper labeling for loading states
- **Reduced Motion**: Fallback for users who prefer reduced motion
- **Screen Reader**: Hidden loading text for assistive technology

### Dependencies Required
- `class-variance-authority`: Variant management
- CSS animation utilities for smooth performance

### Testing Requirements
1. **Unit Tests**: Variant rendering, props validation, accessibility attributes
2. **Visual Tests**: All sizes, speeds, and color combinations
3. **Accessibility Tests**: Screen reader compatibility, reduced motion support
4. **Performance Tests**: Animation smoothness, CPU usage validation
5. **Integration Tests**: Usage within buttons, forms, and loading states

## Development Priority
**High** - Foundation component used throughout the application for loading states

## Notes
- Simple, lightweight component perfect for implementing early
- Built with modern accessibility standards
- Respects user preferences for reduced motion
- Integrates seamlessly with shadcn/ui design system
- Performance-optimized for smooth 60fps animations