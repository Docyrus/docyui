# DocyChip Component

## Overview
DocyChip is a compact, styled label component built with shadcn/ui patterns and Tailwind CSS v4. It supports multiple color variants, sizes, and optional icon integration to display badges, tags, status indicators, and categorical information throughout the Docyrus React application.

## Component Specification

### Props
| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `children` | ReactNode | - | No | Chip content/label text |
| `color` | string | 'slate' | No | Color variant using design system palette |
| `variant` | string | 'light' | No | Visual style: 'light', 'dark' |
| `size` | string | 'sm' | No | Size variant: '3xs', '2xs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl' |
| `icon` | string | - | No | Icon name (uses DocyIcon component) |
| `className` | string | - | No | Additional CSS classes |

### Variants
Built following shadcn/ui badge patterns with design system integration:

1. **light**: Light background with dark text (default)
2. **dark**: Dark background with light text for contrast

### Size System
```typescript
const chipVariants = cva({
  variants: {
    size: {
      '3xs': "text-3xs",
      '2xs': "text-2xs", 
      'xs': "text-xs",
      'sm': "text-sm",
      'md': "text-md",
      'lg': "text-lg",
      'xl': "text-xl",
      'xxl': "text-xxl"
    }
  }
})
```

### Color System
Supports full design system color palette:
- **Standard Colors**: `slate`, `slateDarker`, `white`, `opaque`
- **Brand Colors**: All non-gray colors from the design system palette
- **Semantic Colors**: Context-aware colors for status indicators

### Color Variants
```typescript
// Light variant (default)
const lightVariant = {
  background: `bg-${color}-100`,
  text: `text-${color}-800`
}

// Dark variant
const darkVariant = {
  background: `bg-${color}-800`, 
  text: `text-white`
}
```

### Icon Integration
- Optional icon support using DocyIcon component
- Icons automatically sized to match chip size
- Positioned to the left of text content
- Maintains proper spacing and alignment

## Component Requirements

### Technical Specifications
- **Framework**: React with TypeScript
- **Base Component**: shadcn/ui Badge component (`pnpm dlx shadcn@latest add badge`)
- **Extensions**: Additional color variants, size system, and icon support built on top of shadcn Badge
- **Styling**: shadcn/ui patterns with class-variance-authority
- **Typography**: Monospace font with uppercase transformation and tight tracking
- **Layout**: Flexbox with proper spacing and alignment
- **Accessibility**: Proper semantic markup and ARIA support

### Key Features Required
1. **Color Variants**: Full design system color palette support with light/dark variants
2. **Size System**: 8 different size options from 3xs to xxl
3. **Icon Support**: Optional icon integration with DocyIcon component
4. **Typography**: Monospace font with uppercase styling and tight tracking
5. **Variant System**: Light and dark variants for different contrast needs
6. **Rounded Design**: Consistent rounded corners for modern appearance
7. **Semantic HTML**: Proper HTML structure for accessibility

### Visual Design Requirements
- **Shape**: Rounded rectangle with consistent border radius
- **Typography**: Monospace font, uppercase text, tight tracking, medium weight
- **Spacing**: Consistent padding (px-2 py-0.5) across all sizes
- **Layout**: Flexbox with centered alignment for icon and text
- **Color**: High contrast ratios for accessibility compliance

### Usage Examples
```tsx
// Basic chip
<DocyChip>Basic Label</DocyChip>

// Color variants
<DocyChip color="blue">Blue Chip</DocyChip>
<DocyChip color="green">Success</DocyChip>
<DocyChip color="red">Error</DocyChip>
<DocyChip color="yellow">Warning</DocyChip>

// Dark variant
<DocyChip variant="dark" color="blue">Dark Blue</DocyChip>
<DocyChip variant="dark" color="slate">Dark Slate</DocyChip>

// Different sizes
<DocyChip size="3xs">Tiny</DocyChip>
<DocyChip size="xs">Extra Small</DocyChip>
<DocyChip size="md">Medium</DocyChip>
<DocyChip size="lg">Large</DocyChip>
<DocyChip size="xxl">Extra Large</DocyChip>

// With icons
<DocyChip icon="check" color="green">
  Completed
</DocyChip>
<DocyChip icon="alert-triangle" color="yellow">
  Warning
</DocyChip>
<DocyChip icon="x" color="red">
  Error
</DocyChip>

// Status indicators
<DocyChip icon="circle" color="green" size="xs">
  Online
</DocyChip>
<DocyChip icon="clock" color="yellow" size="sm">
  Pending
</DocyChip>

// Category tags
<DocyChip color="blue" variant="light">
  Documentation
</DocyChip>
<DocyChip color="purple" variant="dark">
  Feature
</DocyChip>

// With custom styling
<DocyChip 
  className="hover:opacity-80 transition-opacity" 
  color="slate"
  size="sm"
>
  Hoverable
</DocyChip>
```

### Integration Requirements
- **DocyIcon**: Icon component integration for optional icons
- **Forms**: Field labels, validation states, and categorization
- **Data Tables**: Status indicators and category tags
- **Navigation**: Breadcrumb indicators and section labels
- **Content**: Tag systems and metadata display

### Accessibility Requirements
- **Semantic HTML**: Proper HTML structure with appropriate roles
- **Color Contrast**: High contrast ratios between text and background
- **Screen Readers**: Clear labeling and context for assistive technology
- **Keyboard Navigation**: Proper focus management if interactive

### Color Validation
- **Palette Integration**: Validates colors against design system palette
- **Fallback Handling**: Graceful fallback for invalid color values
- **Type Safety**: TypeScript support for color validation

### Dependencies Required
- `class-variance-authority`: Variant management
- `DocyIcon`: Icon component integration
- Design system color utilities for palette validation

### Testing Requirements
1. **Unit Tests**: Color validation, size variants, icon integration
2. **Visual Tests**: All color combinations, sizes, and variants
3. **Accessibility Tests**: Color contrast, screen reader compatibility
4. **Integration Tests**: DocyIcon integration, design system compliance
5. **Responsive Tests**: Consistent appearance across screen sizes

## Development Priority
**Medium** - Utility component for labels, badges, and status indicators

## Notes
- Built with modern shadcn/ui patterns for consistency
- Leverages Tailwind v4's improved color system and typography
- Monospace typography provides consistent visual weight
- Uppercase transformation ensures consistent brand appearance
- Flexible color system supports both semantic and brand colors
- Icon integration enhances visual communication
- Lightweight and performant for frequent use in lists and tables