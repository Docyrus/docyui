# DocyIcon Component

## Overview
DocyIcon is a versatile icon component that supports multiple icon libraries, emoji display, and basic animations. It serves as the foundation for all icon usage throughout the Docyrus React application, built with shadcn/ui patterns and Tailwind CSS v4.

## Component Specification

### Props
| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `name` | string | - | Yes | Icon name or emoji character |
| `lib` | string | 'lucide' | No | Icon library: 'lucide', 'heroicons', 'tabler', 'phosphor', 'custom' |
| `size` | string/number | 16 | No | Icon size in pixels or size variant |
| `className` | string | - | No | Additional CSS classes |
| `animation` | string | - | No | Animation type: 'spin', 'pulse', 'bounce' |
| `color` | string | 'current' | No | Icon color using Tailwind color tokens |

### Behavior
1. **Icon Resolution**: 
   - Supports multiple icon libraries with shadcn/ui integration
   - Automatically detects and handles emoji characters
   - Falls back to default icon for missing icons
   - Smart icon name parsing and validation

2. **Rendering Logic**:
   - SVG Icons: Uses React components from icon libraries
   - Emoji: Renders native emoji characters
   - Custom Icons: Supports custom SVG components
   - Dot character: Renders bullet point for special cases

3. **Animation Support**:
   - Built-in animations using Tailwind CSS v4
   - Smooth 60fps animations
   - Extensible animation system

### Size Variants
```typescript
const sizeVariants = {
  xs: 12,
  sm: 14, 
  md: 16,
  lg: 20,
  xl: 24,
  '2xl': 32
} as const
```

### Supported Icon Libraries
- **Lucide** (default): Modern, consistent icon set
- **Heroicons**: Beautiful hand-crafted SVG icons
- **Tabler Icons**: Free SVG icons
- **Phosphor Icons**: Flexible icon family
- **Custom**: Support for custom icon components

## Component Requirements

### Technical Specifications
- **Framework**: React with TypeScript
- **Base Component**: Custom implementation (no direct shadcn/ui equivalent)
- **Integration**: Uses shadcn/ui icon patterns and Lucide as default library
- **Styling**: shadcn/ui patterns with class-variance-authority
- **Icons**: Support for multiple icon libraries (Lucide, Heroicons, Tabler, Phosphor)
- **Performance**: Tree-shaking support, optimal bundle size
- **Accessibility**: Full ARIA support, screen reader compatibility

### Key Features Required
1. **Multi-Library Support**: Seamless integration with popular icon libraries
2. **Emoji Detection**: Automatic detection and rendering of emoji characters
3. **Variant System**: Size and animation variants using cva
4. **Type Safety**: Complete TypeScript support with proper inference
5. **Fallback Handling**: Graceful fallback for missing icons
6. **Animation Support**: Spin, pulse, and bounce animations

### Usage Examples
```tsx
// Basic icon
<DocyIcon name="user" />

// Different libraries
<DocyIcon name="home" lib="heroicons" />
<DocyIcon name="star" lib="lucide" />

// Sizes and animations
<DocyIcon name="loader" size="lg" animation="spin" />
<DocyIcon name="heart" size="xl" animation="pulse" />

// Emoji and special characters
<DocyIcon name="🚀" />
<DocyIcon name="dot" />

// With custom styling
<DocyIcon 
  name="settings" 
  className="text-blue-500 hover:text-blue-600" 
  size="md"
/>
```

### Dependencies Required
- `lucide-react`: Modern icon library
- `@heroicons/react`: Heroicons React components
- `class-variance-authority`: Variant management
- Emoji detection utility function

### Testing Requirements
1. **Unit Tests**: Icon resolution, emoji detection, variant rendering
2. **Visual Tests**: All sizes, animations, and libraries
3. **Accessibility Tests**: ARIA attributes, screen reader compatibility
4. **Performance Tests**: Bundle size, tree-shaking effectiveness

## Development Priority
**High** - Foundation component used throughout the application

## Notes
- Built with modern shadcn/ui patterns for consistency
- Leverages Tailwind v4's improved color system and animations
- Designed for maximum flexibility and performance
- Type-safe with excellent developer experience