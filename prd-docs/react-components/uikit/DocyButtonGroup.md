# DocyButtonGroup Component

## Overview
DocyButtonGroup is a container component that manages grouped buttons with consistent styling and behavior. Built with shadcn/ui patterns and Tailwind CSS v4, it provides context to child buttons for seamless visual grouping with connected borders and shared styling properties. It serves as a wrapper for related button actions throughout the Docyrus React application.

## Component Specification

### Props
| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `children` | ReactNode | - | Yes | Button components to group together |
| `color` | string | 'slate' | No | Color theme for all child buttons |
| `variant` | string | 'light' | No | Style variant applied to all child buttons |
| `size` | string | 'default' | No | Size applied to all child buttons |
| `orientation` | string | 'horizontal' | No | Layout orientation: 'horizontal', 'vertical' |
| `className` | string | - | No | Additional CSS classes |

### Behavior
1. **Context Provider**: 
   - Provides styling context to child DocyButton components
   - Automatically applies grouping styles to connected buttons
   - Overrides individual button styling with group-level properties
   - Manages focus states across grouped buttons

2. **Visual Grouping**:
   - Removes borders between adjacent buttons
   - Applies rounded corners only to first and last buttons
   - Maintains consistent spacing and alignment
   - Supports both horizontal and vertical orientations

3. **Keyboard Navigation**:
   - Arrow key navigation between buttons
   - Focus management within the group
   - Proper tab order handling

### Color System
Supports all standard Docyrus color palettes:
- **slate** (default): Neutral gray tones
- **white**: Clean white background
- **opaque**: Semi-transparent styling
- **Brand colors**: All non-gray palette colors from the design system

### Variant System
```typescript
const variants = {
  primary: "solid brand-colored buttons",
  secondary: "outlined buttons with subtle backgrounds", 
  light: "light background with subtle borders",
  text: "text-only buttons with hover effects"
} as const
```

### Size Variants
```typescript
const sizeVariants = {
  '3xs': "minimal padding, 2xs text",
  '2xs': "xs padding, xs text", 
  xs: "sm padding, xs text",
  sm: "md padding, sm text",
  md: "lg padding, base text",
  lg: "xl padding, lg text",
  xl: "xxl padding, xl text",
  xxl: "3xl padding, xxl text"
} as const
```

### Orientation Support
- **horizontal**: Default left-to-right button grouping
- **vertical**: Top-to-bottom button stacking

## Component Requirements

### Technical Specifications
- **Framework**: React with TypeScript
- **Base Component**: Custom implementation (no direct shadcn/ui equivalent)
- **Integration**: Uses shadcn/ui Button patterns and styling conventions
- **Styling**: shadcn/ui patterns with class-variance-authority
- **Context**: React Context API for child component communication
- **Accessibility**: Full ARIA support, keyboard navigation, focus management
- **Performance**: Optimized re-renders, proper context memoization

### Key Features Required
1. **Context Management**: Provides styling context to child buttons via React Context
2. **Visual Grouping**: Seamless border connections between adjacent buttons
3. **Orientation Support**: Horizontal and vertical button arrangements
4. **Consistent Styling**: Unified color, variant, and size application across all children
5. **Focus Management**: Proper keyboard navigation and focus handling
6. **Responsive Design**: Adapts to different screen sizes and orientations
7. **Accessibility**: ARIA group roles and proper keyboard navigation

### Advanced Features
- **Dynamic Sizing**: Automatic sizing based on content and container
- **Keyboard Navigation**: Arrow key navigation with proper focus management
- **State Inheritance**: Child buttons inherit group-level properties
- **Flexible Layout**: Support for both horizontal and vertical orientations

### Usage Examples
```tsx
// Basic horizontal button group
<DocyButtonGroup>
  <DocyButton>First</DocyButton>
  <DocyButton>Second</DocyButton>
  <DocyButton>Third</DocyButton>
</DocyButtonGroup>

// With custom color and variant
<DocyButtonGroup color="blue" variant="primary">
  <DocyButton>Save</DocyButton>
  <DocyButton>Cancel</DocyButton>
</DocyButtonGroup>

// Vertical orientation
<DocyButtonGroup orientation="vertical">
  <DocyButton>Option 1</DocyButton>
  <DocyButton>Option 2</DocyButton>
  <DocyButton>Option 3</DocyButton>
</DocyButtonGroup>

// Different sizes
<DocyButtonGroup size="sm" variant="secondary">
  <DocyButton>Small</DocyButton>
  <DocyButton>Buttons</DocyButton>
</DocyButtonGroup>

// With mixed button types
<DocyButtonGroup color="red" variant="light">
  <DocyButton>Edit</DocyButton>
  <DocyButton variant="destructive">Delete</DocyButton>
  <DocyButton>More</DocyButton>
</DocyButtonGroup>

// Action button groups
<DocyButtonGroup>
  <DocyButton icon="save">Save</DocyButton>
  <DocyButton icon="copy">Copy</DocyButton>
  <DocyButton icon="share">Share</DocyButton>
</DocyButtonGroup>

// Toolbar style
<DocyButtonGroup variant="text" size="sm">
  <DocyButton icon="bold" size="icon" />
  <DocyButton icon="italic" size="icon" />
  <DocyButton icon="underline" size="icon" />
</DocyButtonGroup>
```

### Dependencies Required
- `DocyButton`: Child button components
- `class-variance-authority`: Variant management
- `React.createContext`: Context provider functionality
- `clsx`: Class name utilities

### Testing Requirements
1. **Unit Tests**: Context provision, styling inheritance, orientation rendering
2. **Integration Tests**: Child button integration, keyboard navigation, focus management
3. **Accessibility Tests**: ARIA group roles, keyboard navigation patterns
4. **Visual Tests**: All color/variant combinations, orientations, and sizes
5. **Interaction Tests**: Focus management, keyboard navigation, state inheritance

## Development Priority
**Medium-High** - Important grouping component for UI consistency and user experience

## Notes
- Built with modern shadcn/ui patterns for consistency and maintainability
- Leverages React Context for efficient child component communication
- Supports all Docyrus color palettes and design system variants
- Provides seamless keyboard navigation experience
- Automatically handles border connections and corner rounding
- Fully responsive and accessible by default