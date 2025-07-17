# DocyDrawer Component

## Overview
DocyDrawer is a sliding panel component built on shadcn/ui patterns that provides overlay content from screen edges. It supports multiple directions, sizes, and interactive features like drag-to-close and backdrop dismissal. It serves as the primary sliding panel interface throughout the Docyrus React application.

## Component Specification

### Props
| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-----------|
| `open` | boolean | false | No | Drawer open state |
| `onOpenChange` | function | - | No | Callback when open state changes |
| `side` | string | 'right' | No | Drawer side: 'top', 'right', 'bottom', 'left' |
| `size` | string | 'default' | No | Drawer size: 'sm', 'default', 'lg', 'xl', 'full' |
| `title` | string | - | No | Drawer title |
| `description` | string | - | No | Drawer description |
| `children` | ReactNode | - | No | Drawer content |
| `trigger` | ReactNode | - | No | Element that triggers drawer |
| `header` | ReactNode | - | No | Custom header content |
| `footer` | ReactNode | - | No | Custom footer content |
| `dismissible` | boolean | true | No | Enable backdrop dismissal |
| `closeOnEscape` | boolean | true | No | Close on Escape key |
| `modal` | boolean | true | No | Modal behavior with backdrop |
| `className` | string | - | No | Additional CSS classes |
| `overlayClassName` | string | - | No | Overlay CSS classes |
| `contentClassName` | string | - | No | Content CSS classes |

### Side Options
1. **right**: Slide from right edge (default)
2. **left**: Slide from left edge
3. **top**: Slide from top edge
4. **bottom**: Slide from bottom edge

### Size System
```typescript
const drawerVariants = cva({
  variants: {
    side: {
      top: "inset-x-0 top-0 border-b",
      bottom: "inset-x-0 bottom-0 border-t",
      left: "inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm",
      right: "inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm"
    },
    size: {
      sm: "sm:max-w-sm",
      default: "sm:max-w-md",
      lg: "sm:max-w-lg",
      xl: "sm:max-w-xl",
      full: "sm:max-w-full"
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

### States
- **Closed**: Hidden state
- **Opening**: Slide-in animation
- **Open**: Fully visible state
- **Closing**: Slide-out animation

## Component Requirements

### Technical Specifications
- **Framework**: React with TypeScript
- **Base Component**: shadcn/ui Drawer component (`pnpm dlx shadcn@latest add drawer`)
- **Extensions**: Multiple sizes, sides, and interactive features
- **Styling**: shadcn/ui patterns with class-variance-authority
- **Accessibility**: Full ARIA support, focus management
- **Animation**: Smooth slide transitions and gestures
- **Performance**: Optimized rendering and event handling

### Key Features Required
1. **Multiple Directions**: Support for all four screen edges
2. **Size Variants**: Different drawer sizes for various content
3. **Interactive Dismissal**: Backdrop click and drag gestures
4. **Focus Management**: Proper focus trapping and restoration
5. **Keyboard Navigation**: Escape key and tab navigation
6. **Smooth Animations**: Slide transitions and spring physics
7. **Accessibility**: Screen reader support and ARIA compliance
8. **Modal Behavior**: Backdrop overlay and content blocking

### Advanced Features
- **Nested Drawers**: Multiple drawer levels
- **Responsive Behavior**: Adaptive sizing and positioning
- **Custom Animations**: Configurable transition effects
- **Gesture Controls**: Touch-friendly interactions
- **Portal Rendering**: Proper DOM positioning

### Usage Examples
```tsx
// Basic drawer
<DocyDrawer
  trigger={<DocyButton>Open Drawer</DocyButton>}
  title="Drawer Title"
  description="Drawer description"
>
  <div className="p-4">
    <p>Drawer content goes here</p>
  </div>
</DocyDrawer>

// Different sides
<DocyDrawer side="left" trigger={<DocyButton>Left Drawer</DocyButton>}>
  <div className="p-4">Left side content</div>
</DocyDrawer>

<DocyDrawer side="top" trigger={<DocyButton>Top Drawer</DocyButton>}>
  <div className="p-4">Top side content</div>
</DocyDrawer>

<DocyDrawer side="bottom" trigger={<DocyButton>Bottom Drawer</DocyButton>}>
  <div className="p-4">Bottom side content</div>
</DocyDrawer>

// Different sizes
<DocyDrawer size="sm" trigger={<DocyButton>Small Drawer</DocyButton>}>
  <div className="p-4">Small drawer content</div>
</DocyDrawer>

<DocyDrawer size="lg" trigger={<DocyButton>Large Drawer</DocyButton>}>
  <div className="p-4">Large drawer content</div>
</DocyDrawer>

// Controlled drawer
<DocyDrawer
  open={isOpen}
  onOpenChange={setIsOpen}
  title="Controlled Drawer"
>
  <div className="p-4">
    <p>This drawer is controlled externally</p>
    <DocyButton onClick={() => setIsOpen(false)}>Close</DocyButton>
  </div>
</DocyDrawer>

// With custom header and footer
<DocyDrawer
  trigger={<DocyButton>Custom Drawer</DocyButton>}
  header={
    <div className="flex items-center justify-between p-4 border-b">
      <h2 className="text-lg font-semibold">Custom Header</h2>
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
</DocyDrawer>

// Non-dismissible drawer
<DocyDrawer
  trigger={<DocyButton>Non-dismissible</DocyButton>}
  dismissible={false}
  closeOnEscape={false}
  title="Important Action"
>
  <div className="p-4">
    <p>This drawer requires explicit action</p>
    <DocyButton onClick={() => setIsOpen(false)}>Complete Action</DocyButton>
  </div>
</DocyDrawer>

// Form drawer
<DocyDrawer
  trigger={<DocyButton>Edit Profile</DocyButton>}
  title="Edit Profile"
  description="Update your profile information"
  size="lg"
>
  <form className="p-4 space-y-4">
    <div>
      <label className="block text-sm font-medium">Name</label>
      <input className="w-full p-2 border rounded" />
    </div>
    <div>
      <label className="block text-sm font-medium">Email</label>
      <input className="w-full p-2 border rounded" type="email" />
    </div>
    <div className="flex justify-end gap-2">
      <DocyButton variant="outline">Cancel</DocyButton>
      <DocyButton type="submit">Save</DocyButton>
    </div>
  </form>
</DocyDrawer>
```

### Integration Requirements
- **DocyButton**: Trigger elements and actions
- **DocyIcon**: Icons for headers and actions
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

### Testing Requirements
1. **Unit Tests**: Open/close behavior, size variants, side positioning
2. **Integration Tests**: Trigger interactions, event handling
3. **Accessibility Tests**: ARIA attributes, keyboard navigation
4. **Visual Tests**: All sizes and sides across themes
5. **Animation Tests**: Smooth transitions, gesture interactions
6. **Mobile Tests**: Touch interactions, responsive behavior

## Development Priority
**High** - Essential component for mobile-friendly interfaces and detailed views

## Notes
- Built with modern shadcn/ui patterns for consistency
- Optimized for both desktop and mobile interactions
- Full accessibility compliance with WCAG guidelines
- TypeScript support with comprehensive type safety
- Supports complex nested layouts and content
- Extensible architecture for custom requirements
