# DocyProgress Component

## Overview
DocyProgress is a flexible progress indicator component that supports both linear bar and circular ring visualizations. Built with shadcn/ui patterns and Tailwind CSS v4, it provides clear visual feedback for loading states, task completion, and process indicators throughout the application.

## Component Specification

### Props
| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `value` | number | 0 | No | Current progress value |
| `max` | number | 100 | No | Maximum progress value |
| `variant` | string | 'bar' | No | Visual variant: 'bar', 'ring' |
| `size` | string/number | 'md' | No | Size variant or custom size |
| `showLabel` | boolean | false | No | Display progress percentage label |
| `fillColor` | string | 'blue' | No | Progress fill color from design system |
| `emptyColor` | string | 'gray' | No | Background/empty color from design system |
| `stroke` | number | 2 | No | Stroke width for ring variant |
| `className` | string | - | No | Additional CSS classes |

### Variant System
```typescript
const progressVariants = cva({
  variants: {
    variant: {
      bar: "w-full bg-gray-100 rounded-full",
      ring: "inline-block"
    },
    size: {
      sm: "h-1.5", // For bar variant
      md: "h-2.5", // For bar variant  
      lg: "h-3.5"  // For bar variant
    }
  }
})
```

### Size System
- **Bar Variant**: Uses height-based sizing (sm: 6px, md: 10px, lg: 14px)
- **Ring Variant**: Uses diameter-based sizing (sm: 20px, md: 34px, lg: 48px)
- **Custom Size**: Accepts number values for precise control

### Visual Design
- **Bar Progress**: Rounded horizontal progress bar with smooth transitions
- **Ring Progress**: Circular SVG-based progress indicator
- **Color System**: Integration with Docyrus color palette
- **Animations**: Smooth progress updates with CSS transitions

## Component Requirements

### Technical Specifications
- **Framework**: React with TypeScript
- **Base Component**: shadcn/ui Progress component (`pnpm dlx shadcn@latest add progress`)
- **Extensions**: Circular ring variant, size system, and color customization built on top of shadcn Progress
- **Styling**: shadcn/ui patterns with class-variance-authority
- **SVG Support**: Circular progress using SVG elements
- **Performance**: Optimized rendering for smooth progress updates
- **Accessibility**: Full ARIA support with progress semantics

### Key Features Required
1. **Dual Variants**: Both linear bar and circular ring progress indicators
2. **Color Customization**: Support for design system color tokens
3. **Size Flexibility**: Predefined sizes plus custom numeric values
4. **Label Display**: Optional percentage or custom label rendering
5. **Smooth Animations**: CSS transitions for progress value changes
6. **Value Validation**: Automatic clamping between 0 and max values

### Visual Design Requirements
- **Bar Progress**: Rounded corners, consistent height, smooth fill animation
- **Ring Progress**: Circular SVG with proper stroke rendering and rotation
- **Color Consistency**: Proper contrast between fill and empty states
- **Responsive**: Maintains proportions across different screen sizes

### Usage Examples
```tsx
// Basic progress bar
<DocyProgress value={60} />

// Ring progress indicator
<DocyProgress value={75} variant="ring" />

// Different sizes
<DocyProgress value={45} size="sm" />
<DocyProgress value={85} size="lg" variant="ring" />

// Custom colors
<DocyProgress 
  value={90} 
  fillColor="green" 
  emptyColor="slate" 
/>

// With label display
<DocyProgress 
  value={33} 
  showLabel 
  className="w-64" 
/>

// Custom maximum value
<DocyProgress 
  value={7} 
  max={10} 
  variant="ring" 
  size="lg"
/>

// Loading state integration
<div className="space-y-2">
  <DocyProgress value={progress} />
  <span className="text-sm text-gray-600">
    {progress}% Complete
  </span>
</div>
```

### Integration Requirements
- **Form Components**: Upload progress indicators
- **Data Loading**: Content loading progress
- **Task Management**: Completion status visualization
- **Dashboard Components**: Metrics and analytics displays

### Accessibility Requirements
- **Role**: `role="progressbar"` for screen readers
- **ARIA Attributes**: `aria-valuenow`, `aria-valuemin`, `aria-valuemax`
- **Labels**: Proper labeling for progress states
- **Screen Reader**: Announce progress changes appropriately

### Dependencies Required
- `class-variance-authority`: Variant management
- SVG utilities for ring variant rendering
- Progress calculation utilities

### Testing Requirements
1. **Unit Tests**: Value validation, variant rendering, color application
2. **Visual Tests**: Both variants across all sizes and color combinations
3. **Accessibility Tests**: ARIA attributes, screen reader compatibility
4. **Performance Tests**: Smooth animation rendering, progress updates
5. **Integration Tests**: Usage within forms, dashboards, and loading states

## Development Priority
**Medium** - Important for user feedback but not critical for initial functionality

## Notes
- Built with modern shadcn/ui patterns for consistency
- Supports both determinate and indeterminate progress states
- Designed for smooth 60fps animations during progress updates
- Leverages Tailwind v4's improved color system and transitions
- Ring variant requires SVG rendering optimization for performance