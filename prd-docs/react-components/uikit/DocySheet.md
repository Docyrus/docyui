# DocySheet Component

## Overview
DocySheet is a sliding sheet component built on shadcn/ui patterns that provides overlay content panels from screen edges. It supports multiple directions, sizes, and interactive features like drag-to-close and backdrop dismissal. It serves as an alternative to modals for detailed content views throughout the Docyrus React application.

## Component Specification

### Props
| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-----------|
| `open` | boolean | false | No | Sheet open state |
| `onOpenChange` | function | - | No | Callback when open state changes |
| `side` | string | 'right' | No | Sheet side: 'top', 'right', 'bottom', 'left' |
| `size` | string | 'default' | No | Sheet size: 'sm', 'default', 'lg', 'xl', 'full' |
| `title` | string | - | No | Sheet title |
| `description` | string | - | No | Sheet description |
| `children` | ReactNode | - | No | Sheet content |
| `trigger` | ReactNode | - | No | Element that triggers sheet |
| `header` | ReactNode | - | No | Custom header content |
| `footer` | ReactNode | - | No | Custom footer content |
| `dismissible` | boolean | true | No | Enable backdrop dismissal |
| `closeOnEscape` | boolean | true | No | Close on Escape key |
| `modal` | boolean | true | No | Modal behavior with backdrop |
| `className` | string | - | No | Additional CSS classes |
| `overlayClassName` | string | - | No | Overlay CSS classes |
| `contentClassName` | string | - | No | Content CSS classes |
| `headerClassName` | string | - | No | Header CSS classes |
| `footerClassName` | string | - | No | Footer CSS classes |

### Side Options
1. **right**: Slide from right edge (default)
2. **left**: Slide from left edge
3. **top**: Slide from top edge
4. **bottom**: Slide from bottom edge

### Size System
```typescript
const sheetVariants = cva({
  variants: {
    side: {
      top: "inset-x-0 top-0 border-b",
      bottom: "inset-x-0 bottom-0 border-t",
      left: "inset-y-0 left-0 h-full border-r",
      right: "inset-y-0 right-0 h-full border-l"
    },
    size: {
      sm: "max-w-sm",
      default: "max-w-md",
      lg: "max-w-lg",
      xl: "max-w-xl",
      full: "max-w-full"
    }
  }
})
```

### Interactive Features
- **Drag to Close**: Swipe gesture to dismiss
- **Backdrop Dismissal**: Click outside to close
- **Keyboard Navigation**: Escape key support
- **Focus Management**: Proper focus trapping
- **Smooth Animations**: Slide transitions

### Sheet Structure
- **Header**: Title, description, and close button
- **Content**: Main scrollable content area
- **Footer**: Action buttons and controls

### States
- **Closed**: Hidden state
- **Opening**: Slide-in animation
- **Open**: Fully visible state
- **Closing**: Slide-out animation

## Component Requirements

### Technical Specifications
- **Framework**: React with TypeScript
- **Base Component**: shadcn/ui Sheet component (`pnpm dlx shadcn@latest add sheet`)
- **Extensions**: Multiple sizes, sides, and interactive features
- **Styling**: shadcn/ui patterns with class-variance-authority
- **Accessibility**: Full ARIA support, focus management
- **Animation**: Smooth slide transitions and gestures
- **Performance**: Optimized rendering and event handling

### Key Features Required
1. **Multiple Directions**: Support for all four screen edges
2. **Size Variants**: Different sheet sizes for various content
3. **Interactive Dismissal**: Backdrop click and drag gestures
4. **Focus Management**: Proper focus trapping and restoration
5. **Keyboard Navigation**: Escape key and tab navigation
6. **Smooth Animations**: Slide transitions with spring physics
7. **Accessibility**: Screen reader support and ARIA compliance
8. **Structured Layout**: Header, content, and footer sections

### Advanced Features
- **Nested Sheets**: Multiple sheet levels
- **Responsive Behavior**: Adaptive sizing and positioning
- **Custom Animations**: Configurable transition effects
- **Gesture Controls**: Touch-friendly interactions
- **Portal Rendering**: Proper DOM positioning

### Usage Examples
```tsx
// Basic sheet
<DocySheet
  trigger={<DocyButton>Open Sheet</DocyButton>}
  title="Sheet Title"
  description="Sheet description"
>
  <div className="p-4">
    <p>Sheet content goes here</p>
  </div>
</DocySheet>

// Different sides
<DocySheet side="left" trigger={<DocyButton>Left Sheet</DocyButton>}>
  <div className="p-4">Left side content</div>
</DocySheet>

<DocySheet side="top" trigger={<DocyButton>Top Sheet</DocyButton>}>
  <div className="p-4">Top side content</div>
</DocySheet>

<DocySheet side="bottom" trigger={<DocyButton>Bottom Sheet</DocyButton>}>
  <div className="p-4">Bottom side content</div>
</DocySheet>

// Different sizes
<DocySheet size="sm" trigger={<DocyButton>Small Sheet</DocyButton>}>
  <div className="p-4">Small sheet content</div>
</DocySheet>

<DocySheet size="lg" trigger={<DocyButton>Large Sheet</DocyButton>}>
  <div className="p-4">Large sheet content</div>
</DocySheet>

<DocySheet size="full" trigger={<DocyButton>Full Sheet</DocyButton>}>
  <div className="p-4">Full width sheet content</div>
</DocySheet>

// Controlled sheet
<DocySheet
  open={isOpen}
  onOpenChange={setIsOpen}
  title="Controlled Sheet"
>
  <div className="p-4">
    <p>This sheet is controlled externally</p>
    <DocyButton onClick={() => setIsOpen(false)}>Close</DocyButton>
  </div>
</DocySheet>

// With custom header and footer
<DocySheet
  trigger={<DocyButton>Custom Sheet</DocyButton>}
  header={
    <div className="flex items-center justify-between p-4 border-b">
      <div>
        <h2 className="text-lg font-semibold">Custom Header</h2>
        <p className="text-sm text-gray-500">Custom description</p>
      </div>
      <DocyButton variant="ghost" size="sm">
        <DocyIcon name="settings" />
      </DocyButton>
    </div>
  }
  footer={
    <div className="flex justify-end gap-2 p-4 border-t">
      <DocyButton variant="outline">Cancel</DocyButton>
      <DocyButton>Save</DocyButton>
    </div>
  }
>
  <div className="p-4">
    <p>Content with custom header and footer</p>
  </div>
</DocySheet>

// Non-dismissible sheet
<DocySheet
  trigger={<DocyButton>Non-dismissible</DocyButton>}
  dismissible={false}
  closeOnEscape={false}
  title="Important Action"
>
  <div className="p-4">
    <p>This sheet requires explicit action</p>
    <DocyButton onClick={() => setIsOpen(false)}>Complete Action</DocyButton>
  </div>
</DocySheet>

// Form sheet
<DocySheet
  trigger={<DocyButton>Edit Profile</DocyButton>}
  title="Edit Profile"
  description="Update your profile information"
  size="lg"
>
  <form className="p-4 space-y-4">
    <div>
      <DocyLabel htmlFor="name">Name</DocyLabel>
      <input id="name" className="w-full p-2 border rounded" />
    </div>
    <div>
      <DocyLabel htmlFor="email">Email</DocyLabel>
      <input id="email" className="w-full p-2 border rounded" type="email" />
    </div>
    <div className="flex justify-end gap-2">
      <DocyButton variant="outline">Cancel</DocyButton>
      <DocyButton type="submit">Save</DocyButton>
    </div>
  </form>
</DocySheet>

// Shopping cart sheet
<DocySheet
  trigger={<DocyButton>Cart ({cartItems.length})</DocyButton>}
  title="Shopping Cart"
  side="right"
  size="lg"
>
  <div className="p-4">
    {cartItems.map((item) => (
      <div key={item.id} className="flex items-center justify-between py-2">
        <div>
          <h3 className="font-medium">{item.name}</h3>
          <p className="text-sm text-gray-500">${item.price}</p>
        </div>
        <DocyButton variant="ghost" size="sm">
          <DocyIcon name="x" />
        </DocyButton>
      </div>
    ))}
  </div>
  <div className="p-4 border-t">
    <div className="flex justify-between mb-4">
      <span className="font-medium">Total: ${total}</span>
    </div>
    <DocyButton className="w-full">Checkout</DocyButton>
  </div>
</DocySheet>

// Details sheet
<DocySheet
  trigger={<DocyButton>View Details</DocyButton>}
  title="Item Details"
  description="Detailed information about this item"
  side="right"
  size="xl"
>
  <div className="p-4 space-y-6">
    <div>
      <h3 className="font-medium mb-2">Description</h3>
      <p className="text-gray-600">Detailed description content...</p>
    </div>
    <div>
      <h3 className="font-medium mb-2">Specifications</h3>
      <ul className="space-y-1 text-sm">
        <li>Specification 1</li>
        <li>Specification 2</li>
        <li>Specification 3</li>
      </ul>
    </div>
  </div>
</DocySheet>
```

### Integration Requirements
- **DocyButton**: Trigger elements and actions
- **DocyIcon**: Icons for headers and actions
- **DocyLabel**: Form labels within sheets
- **Portal**: Proper DOM positioning
- **Animation Library**: Smooth transitions
- **Focus Management**: Focus trapping utilities
- **Gesture Library**: Touch and drag interactions

### Accessibility Requirements
- **ARIA Attributes**: dialog, modal, labelledby, describedby
- **Focus Management**: Focus trapping and restoration
- **Keyboard Navigation**: Escape key, tab navigation
- **Screen Reader Support**: Proper announcements
- **Color Contrast**: Sufficient contrast for all elements

### Animation System
- **Slide Transitions**: Smooth enter/exit animations
- **Spring Physics**: Natural motion feel
- **Gesture Feedback**: Visual response to interactions
- **Performance**: GPU-accelerated animations

### Mobile Optimization
- **Touch Gestures**: Swipe to dismiss
- **Responsive Sizing**: Adaptive dimensions
- **Touch Targets**: Appropriate button sizes
- **Scroll Behavior**: Proper content scrolling

### Testing Requirements
1. **Unit Tests**: Open/close behavior, size variants, side positioning
2. **Integration Tests**: Trigger interactions, event handling
3. **Accessibility Tests**: ARIA attributes, keyboard navigation
4. **Visual Tests**: All sizes and sides across themes
5. **Animation Tests**: Smooth transitions, gesture interactions
6. **Mobile Tests**: Touch interactions, responsive behavior

## Development Priority
**High** - Essential component for detailed views and mobile-friendly interfaces

## Notes
- Built with modern shadcn/ui patterns for consistency
- Optimized for both desktop and mobile interactions
- Full accessibility compliance with WCAG guidelines
- TypeScript support with comprehensive type safety
- Supports complex nested layouts and content
- Extensible architecture for custom requirements
- Alternative to modals for better mobile experience
