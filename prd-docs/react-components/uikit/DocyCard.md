# DocyCard Component

## Overview
DocyCard is a flexible card component built on shadcn/ui patterns that serves as a content container with optional header, body, and footer sections. It supports multiple variants, sizes, interactive states, and advanced features like loading states and action menus. It serves as the primary content organization component throughout the Docyrus React application.

## Component Specification

### Props
| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-----------|
| `children` | ReactNode | - | No | Card content |
| `variant` | string | 'default' | No | Card style: 'default', 'elevated', 'outlined', 'ghost' |
| `size` | string | 'default' | No | Card size: 'sm', 'default', 'lg', 'full' |
| `header` | ReactNode | - | No | Card header content |
| `title` | string | - | No | Card title |
| `description` | string | - | No | Card description |
| `footer` | ReactNode | - | No | Card footer content |
| `loading` | boolean | false | No | Show loading state |
| `clickable` | boolean | false | No | Enable click interactions |
| `onClick` | function | - | No | Click handler |
| `className` | string | - | No | Additional CSS classes |
| `headerClassName` | string | - | No | Header section CSS classes |
| `bodyClassName` | string | - | No | Body section CSS classes |
| `footerClassName` | string | - | No | Footer section CSS classes |

### Variants
Built following shadcn/ui card patterns:

1. **default**: Standard card with subtle border and background
2. **elevated**: Card with shadow elevation effects
3. **outlined**: Card with prominent border styling
4. **ghost**: Minimal card with transparent background

### Size System
```typescript
const cardVariants = cva({
  variants: {
    size: {
      sm: "p-4 text-sm",
      default: "p-6",
      lg: "p-8 text-lg",
      full: "p-6 h-full"
    }
  }
})
```

### Card Structure
- **Header**: Optional top section with title and actions
- **Body**: Main content area with flexible layout
- **Footer**: Optional bottom section with actions or metadata

### Interactive States
- **Default State**: Static card appearance
- **Hover State**: Subtle elevation and color changes
- **Loading State**: Skeleton loading with shimmer effect
- **Clickable State**: Cursor pointer with press effects

## Component Requirements

### Technical Specifications
- **Framework**: React with TypeScript
- **Base Component**: shadcn/ui Card component (`pnpm dlx shadcn@latest add card`)
- **Extensions**: Additional variants, sizes, and interactive states
- **Styling**: shadcn/ui patterns with class-variance-authority
- **Accessibility**: Full ARIA support, keyboard navigation
- **Animation**: Smooth hover and loading transitions
- **Performance**: Optimized re-renders, lazy loading support

### Key Features Required
1. **Variant System**: Multiple card styles with semantic appearance
2. **Size Variants**: Different card sizes for various contexts
3. **Structured Layout**: Header, body, and footer sections
4. **Interactive States**: Clickable cards with hover effects
5. **Loading States**: Skeleton loading with smooth animations
6. **Flexible Content**: Support for any content type
7. **Accessibility**: Screen reader support and keyboard navigation
8. **Responsive Design**: Mobile-friendly layout adaptation

### Advanced Features
- **Action Menus**: Dropdown menus in card header
- **Drag and Drop**: Card reordering and grouping
- **Expandable Content**: Collapsible card sections
- **Status Indicators**: Visual status badges
- **Custom Animations**: Entrance and exit animations

### Usage Examples
```tsx
// Basic card
<DocyCard>
  <p>This is a basic card with content</p>
</DocyCard>

// Card with header and footer
<DocyCard
  title="Card Title"
  description="Card description text"
  footer={<DocyButton>Action</DocyButton>}
>
  <p>Card body content</p>
</DocyCard>

// Card variants
<DocyCard variant="elevated">
  <p>Elevated card with shadow</p>
</DocyCard>
<DocyCard variant="outlined">
  <p>Outlined card with border</p>
</DocyCard>
<DocyCard variant="ghost">
  <p>Ghost card with minimal styling</p>
</DocyCard>

// Different sizes
<DocyCard size="sm">
  <p>Small card</p>
</DocyCard>
<DocyCard size="lg">
  <p>Large card</p>
</DocyCard>
<DocyCard size="full">
  <p>Full height card</p>
</DocyCard>

// Clickable card
<DocyCard
  clickable
  onClick={() => console.log('Card clicked')}
>
  <p>Click me!</p>
</DocyCard>

// Loading state
<DocyCard loading>
  <p>This content is loading...</p>
</DocyCard>

// Complex card with all sections
<DocyCard
  header={
    <div className="flex justify-between items-center">
      <h3>Custom Header</h3>
      <DocyButton variant="ghost" size="sm">⋮</DocyButton>
    </div>
  }
  footer={
    <div className="flex justify-end gap-2">
      <DocyButton variant="outline" size="sm">Cancel</DocyButton>
      <DocyButton size="sm">Save</DocyButton>
    </div>
  }
>
  <form className="space-y-4">
    <input className="w-full p-2 border rounded" placeholder="Enter text" />
    <textarea className="w-full p-2 border rounded" placeholder="Enter description" />
  </form>
</DocyCard>

// Card with custom styling
<DocyCard
  className="border-blue-500 bg-blue-50"
  headerClassName="bg-blue-100"
  bodyClassName="text-blue-900"
  footerClassName="bg-blue-100"
  title="Custom Styled Card"
>
  <p>Custom styled content</p>
</DocyCard>
```

### Integration Requirements
- **DocyButton**: Button components for actions
- **DocyIcon**: Icons for headers and actions
- **DocySpinner**: Loading state indicators
- **DocyMenu**: Action menus and dropdowns
- **Animation Library**: Smooth transitions and effects

### Testing Requirements
1. **Unit Tests**: Variant rendering, size variations, interactive states
2. **Integration Tests**: Header/footer rendering, click handling
3. **Accessibility Tests**: ARIA attributes, keyboard navigation
4. **Visual Tests**: All variants and sizes across themes
5. **Performance Tests**: Large card lists, loading states
6. **Interaction Tests**: Click handling, hover effects

## Development Priority
**High** - Core component for content organization and layout

## Notes
- Built with modern shadcn/ui patterns for consistency
- Flexible content structure supports various use cases
- Interactive features enhance user engagement
- Loading states provide smooth user experience
- TypeScript support with comprehensive type safety
- Optimized for both simple and complex content layouts
