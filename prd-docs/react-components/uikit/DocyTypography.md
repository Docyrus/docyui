# DocyTypography Component

## Overview
DocyTypography is a text styling component built on shadcn/ui patterns that provides consistent typography throughout the application. It supports various text elements, sizes, weights, and semantic styling. It serves as the primary typography component throughout the Docyrus React application.

## Component Specification

### Props
| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-----------|
| `variant` | string | 'body' | No | Typography variant: 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'body', 'caption', 'small', 'muted', 'code' |
| `size` | string | - | No | Font size override: 'xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl' |
| `weight` | string | - | No | Font weight: 'thin', 'light', 'normal', 'medium', 'semibold', 'bold', 'extrabold', 'black' |
| `color` | string | - | No | Text color: 'default', 'muted', 'accent', 'destructive', 'success', 'warning' |
| `align` | string | - | No | Text alignment: 'left', 'center', 'right', 'justify' |
| `transform` | string | - | No | Text transform: 'none', 'capitalize', 'uppercase', 'lowercase' |
| `as` | string | - | No | HTML element to render as |
| `className` | string | - | No | Additional CSS classes |
| `children` | ReactNode | - | Yes | Typography content |

### Typography Variants
- **h1-h6**: Heading elements with appropriate sizing
- **body**: Standard body text
- **caption**: Smaller caption text
- **small**: Fine print text
- **muted**: Muted/secondary text
- **code**: Inline code text

### Font Sizes
```typescript
const fontSizes = {
  xs: 'text-xs',     // 12px
  sm: 'text-sm',     // 14px
  base: 'text-base', // 16px
  lg: 'text-lg',     // 18px
  xl: 'text-xl',     // 20px
  '2xl': 'text-2xl', // 24px
  '3xl': 'text-3xl', // 30px
  '4xl': 'text-4xl', // 36px
  '5xl': 'text-5xl', // 48px
  '6xl': 'text-6xl'  // 60px
}
```

### Color Variants
- **default**: Primary text color
- **muted**: Secondary/muted text color
- **accent**: Accent color
- **destructive**: Error/danger color
- **success**: Success color
- **warning**: Warning color

## Component Requirements

### Technical Specifications
- **Framework**: React with TypeScript
- **Base Component**: shadcn/ui Typography (`pnpm dlx shadcn@latest add typography`)
- **Extensions**: Enhanced variants, colors, and utilities
- **Styling**: shadcn/ui patterns with class-variance-authority
- **Accessibility**: Semantic HTML elements and ARIA support
- **Performance**: Optimized rendering and styling
- **Responsive**: Mobile-friendly typography scaling

### Key Features Required
1. **Typography Hierarchy**: Complete heading and text system
2. **Flexible Sizing**: Custom size overrides
3. **Color System**: Semantic color variants
4. **Font Weights**: Complete weight range
5. **Text Alignment**: Flexible alignment options
6. **Text Transform**: Case transformation options
7. **Semantic Elements**: Proper HTML semantics
8. **Responsive**: Mobile-friendly scaling

### Usage Examples
```tsx
// Headings
<DocyTypography variant="h1">Main Heading</DocyTypography>
<DocyTypography variant="h2">Section Heading</DocyTypography>
<DocyTypography variant="h3">Subsection Heading</DocyTypography>
<DocyTypography variant="h4">Minor Heading</DocyTypography>
<DocyTypography variant="h5">Small Heading</DocyTypography>
<DocyTypography variant="h6">Tiny Heading</DocyTypography>

// Body text
<DocyTypography variant="body">
  This is standard body text. It's readable and comfortable for longer passages of text.
</DocyTypography>

// Text variants
<DocyTypography variant="caption">
  This is caption text, typically used for image captions or small notes.
</DocyTypography>

<DocyTypography variant="small">
  This is small text, often used for fine print or secondary information.
</DocyTypography>

<DocyTypography variant="muted">
  This is muted text, used for less important information.
</DocyTypography>

<DocyTypography variant="code">
  This is inline code text: const example = 'hello world';
</DocyTypography>

// Custom sizes
<DocyTypography size="xs">Extra small text</DocyTypography>
<DocyTypography size="sm">Small text</DocyTypography>
<DocyTypography size="base">Base text</DocyTypography>
<DocyTypography size="lg">Large text</DocyTypography>
<DocyTypography size="xl">Extra large text</DocyTypography>
<DocyTypography size="2xl">2X large text</DocyTypography>
<DocyTypography size="3xl">3X large text</DocyTypography>
<DocyTypography size="4xl">4X large text</DocyTypography>
<DocyTypography size="5xl">5X large text</DocyTypography>
<DocyTypography size="6xl">6X large text</DocyTypography>

// Font weights
<DocyTypography weight="thin">Thin weight</DocyTypography>
<DocyTypography weight="light">Light weight</DocyTypography>
<DocyTypography weight="normal">Normal weight</DocyTypography>
<DocyTypography weight="medium">Medium weight</DocyTypography>
<DocyTypography weight="semibold">Semibold weight</DocyTypography>
<DocyTypography weight="bold">Bold weight</DocyTypography>
<DocyTypography weight="extrabold">Extra bold weight</DocyTypography>
<DocyTypography weight="black">Black weight</DocyTypography>

// Colors
<DocyTypography color="default">Default color</DocyTypography>
<DocyTypography color="muted">Muted color</DocyTypography>
<DocyTypography color="accent">Accent color</DocyTypography>
<DocyTypography color="destructive">Destructive color</DocyTypography>
<DocyTypography color="success">Success color</DocyTypography>
<DocyTypography color="warning">Warning color</DocyTypography>

// Text alignment
<DocyTypography align="left">Left aligned text</DocyTypography>
<DocyTypography align="center">Center aligned text</DocyTypography>
<DocyTypography align="right">Right aligned text</DocyTypography>
<DocyTypography align="justify">Justified text that spreads across the full width</DocyTypography>

// Text transform
<DocyTypography transform="none">No transform</DocyTypography>
<DocyTypography transform="capitalize">Capitalize each word</DocyTypography>
<DocyTypography transform="uppercase">UPPERCASE TEXT</DocyTypography>
<DocyTypography transform="lowercase">lowercase text</DocyTypography>

// Custom elements
<DocyTypography variant="h2" as="h1">H2 styling as H1 element</DocyTypography>
<DocyTypography variant="body" as="p">Body text as paragraph</DocyTypography>
<DocyTypography variant="caption" as="span">Caption as span</DocyTypography>

// Article layout
<article className="prose max-w-none">
  <DocyTypography variant="h1" className="mb-4">
    Article Title
  </DocyTypography>
  
  <DocyTypography variant="muted" className="mb-6">
    Published on March 15, 2024 by John Doe
  </DocyTypography>
  
  <DocyTypography variant="body" className="mb-4">
    This is the opening paragraph of the article. It provides an introduction to the topic and sets the stage for the content that follows.
  </DocyTypography>
  
  <DocyTypography variant="h2" className="mb-3">
    First Section
  </DocyTypography>
  
  <DocyTypography variant="body" className="mb-4">
    This is the content of the first section. It continues the discussion started in the introduction and provides more detailed information.
  </DocyTypography>
  
  <DocyTypography variant="h3" className="mb-3">
    Subsection
  </DocyTypography>
  
  <DocyTypography variant="body" className="mb-4">
    This is a subsection that provides even more specific information about a particular aspect of the topic.
  </DocyTypography>
  
  <DocyTypography variant="caption" className="mt-8">
    Figure 1: Example diagram showing the relationship between components
  </DocyTypography>
</article>

// Card with typography
<DocyCard className="p-6">
  <DocyTypography variant="h3" className="mb-2">
    Card Title
  </DocyTypography>
  
  <DocyTypography variant="muted" className="mb-4">
    Card subtitle or description
  </DocyTypography>
  
  <DocyTypography variant="body" className="mb-4">
    This is the main content of the card. It provides information about the topic or action that the card represents.
  </DocyTypography>
  
  <DocyTypography variant="small" color="muted">
    Last updated 2 hours ago
  </DocyTypography>
</DocyCard>

// Error messages
<div className="space-y-2">
  <DocyTypography variant="h4" color="destructive">
    Error: Something went wrong
  </DocyTypography>
  
  <DocyTypography variant="body" color="destructive">
    Please check your input and try again. If the problem persists, contact support.
  </DocyTypography>
  
  <DocyTypography variant="small" color="muted">
    Error code: 500
  </DocyTypography>
</div>

// Success messages
<div className="space-y-2">
  <DocyTypography variant="h4" color="success">
    Success: Changes saved
  </DocyTypography>
  
  <DocyTypography variant="body">
    Your changes have been saved successfully and will take effect immediately.
  </DocyTypography>
</div>

// Warning messages
<div className="space-y-2">
  <DocyTypography variant="h4" color="warning">
    Warning: Action required
  </DocyTypography>
  
  <DocyTypography variant="body">
    Please review your settings before proceeding. Some options may affect system performance.
  </DocyTypography>
</div>

// Code blocks
<div className="bg-gray-50 p-4 rounded">
  <DocyTypography variant="code" className="block">
    const example = 'This is a code block';
  </DocyTypography>
  <DocyTypography variant="code" className="block">
    console.log(example);
  </DocyTypography>
</div>

// List with typography
<div className="space-y-2">
  <DocyTypography variant="h4" className="mb-3">
    Features
  </DocyTypography>
  
  <ul className="space-y-2">
    <li>
      <DocyTypography variant="body">
        • Real-time collaboration
      </DocyTypography>
    </li>
    <li>
      <DocyTypography variant="body">
        • Advanced search capabilities
      </DocyTypography>
    </li>
    <li>
      <DocyTypography variant="body">
        • Customizable workflows
      </DocyTypography>
    </li>
  </ul>
</div>

// Responsive typography
<DocyTypography 
  variant="h1" 
  className="text-2xl md:text-4xl lg:text-6xl"
>
  Responsive Heading
</DocyTypography>

// Custom combinations
<DocyTypography 
  variant="h2" 
  size="3xl" 
  weight="bold" 
  color="accent" 
  align="center" 
  transform="uppercase"
>
  Custom Styled Heading
</DocyTypography>

// Inline text variations
<DocyTypography variant="body">
  This paragraph contains <DocyTypography variant="code" as="span">inline code</DocyTypography>,
  <DocyTypography weight="bold" as="span"> bold text</DocyTypography>,
  <DocyTypography color="accent" as="span"> accent colored text</DocyTypography>, and
  <DocyTypography variant="small" as="span"> small text</DocyTypography>.
</DocyTypography>

// Form labels
<div className="space-y-4">
  <div>
    <DocyTypography variant="small" weight="medium" as="label" htmlFor="name">
      Full Name
    </DocyTypography>
    <input id="name" className="w-full p-2 border rounded" />
  </div>
  
  <div>
    <DocyTypography variant="small" weight="medium" as="label" htmlFor="email">
      Email Address
    </DocyTypography>
    <DocyTypography variant="caption" color="muted" className="block mb-1">
      We'll never share your email with anyone else.
    </DocyTypography>
    <input id="email" type="email" className="w-full p-2 border rounded" />
  </div>
</div>
```

### Integration Requirements
- **Theme System**: Consistent color and font integration
- **Responsive Design**: Mobile-friendly typography scaling
- **Accessibility**: Semantic HTML and ARIA support
- **CSS Framework**: Tailwind CSS utility classes

### Accessibility Requirements
- **Semantic HTML**: Proper heading hierarchy and elements
- **ARIA Attributes**: When semantic HTML isn't sufficient
- **Color Contrast**: Sufficient contrast for all text colors
- **Screen Reader**: Proper text structure and navigation
- **Focus Management**: Proper focus indicators for interactive text

### Responsive Typography
```css
/* Example responsive typography */
.responsive-heading {
  @apply text-2xl;
  @screen md {
    @apply text-4xl;
  }
  @screen lg {
    @apply text-6xl;
  }
}
```

### Testing Requirements
1. **Unit Tests**: Variant rendering, prop combinations
2. **Integration Tests**: Theme integration, responsive behavior
3. **Accessibility Tests**: Semantic HTML, ARIA attributes
4. **Visual Tests**: All variants, colors, and sizes
5. **Responsive Tests**: Typography scaling across screen sizes
6. **Typography Tests**: Proper font loading and rendering

## Development Priority
**Medium** - Important for consistent text styling and branding

## Notes
- Built with modern shadcn/ui patterns for consistency
- Provides comprehensive typography system
- Full accessibility compliance with WCAG guidelines
- TypeScript support with comprehensive type safety
- Flexible styling and customization options
- Responsive design considerations
- Semantic HTML element usage
