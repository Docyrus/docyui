# DocyModal Component

## Overview
DocyModal is a flexible modal dialog component that provides overlay-based content display with customizable sizes, animations, and interaction patterns. Built with shadcn/ui patterns and Tailwind CSS v4, it supports both standard modal dialogs and full-screen presentations.

## Component Specification

### Props
| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `open` | boolean | false | No | Controls modal visibility |
| `onClose` | function | - | No | Callback fired when modal should close |
| `size` | string | '5xl' | No | Modal width: 'xs', 'sm', 'md', 'lg', 'xl', 'xxl', '2xl', '3xl', '4xl', '5xl', '6xl', '7xl', 'fit', '50vw', '60vw', '70vw', '80vw', '90vw', '95vw' |
| `height` | string | - | No | Modal height: '30vh', '40vh', '50vh', '60vh', '70vh', '80vh', '90vh', '95vh' |
| `mode` | string | 'box' | No | Display mode: 'box', 'full' |
| `title` | string | '' | No | Modal title text |
| `icon` | string | - | No | Icon name for title area |
| `hideTitle` | boolean | false | No | Hide the title header |
| `closeOnClickOutside` | boolean | true | No | Allow closing by clicking overlay |
| `scrollable` | boolean | true | No | Enable content scrolling |
| `zIndex` | string/number | 40 | No | Z-index value: '10', '20', '30', '40', '50', '9999', '99999' |
| `className` | string | - | No | Additional CSS classes |

### Behavior
1. **Display Management**:
   - Overlay background with backdrop blur
   - Smooth enter/exit animations with scale and opacity
   - Focus management and keyboard navigation
   - Scroll lock on document body when open

2. **Size System**:
   - Responsive sizing with viewport-based options
   - Height constraints with scrolling support
   - Full-screen mode for immersive experiences
   - Automatic centering and positioning

3. **Interaction Patterns**:
   - Click outside to close (configurable)
   - ESC key to close
   - Close button in header
   - Customizable header and footer slots

### Size Variants
```typescript
const sizeVariants = {
  xs: 'max-w-xs',
  sm: 'max-w-sm', 
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  xxl: 'max-w-xxl',
  '2xl': 'max-w-2xl',
  '3xl': 'max-w-3xl',
  '4xl': 'max-w-4xl',
  '5xl': 'max-w-5xl',
  '6xl': 'max-w-6xl',
  '7xl': 'max-w-7xl',
  fit: 'max-w-fit',
  '50vw': 'max-w-[50vw]',
  '60vw': 'max-w-[60vw]',
  '70vw': 'max-w-[70vw]',
  '80vw': 'max-w-[80vw]',
  '90vw': 'max-w-[90vw]',
  '95vw': 'max-w-[95vw]'
} as const
```

## Component Requirements

### Technical Specifications
- **Framework**: React with TypeScript
- **Base Component**: shadcn/ui Dialog component (`pnpm dlx shadcn@latest add dialog`)
- **Extensions**: Size system, full-screen mode, and z-index management built on top of shadcn Dialog
- **Styling**: shadcn/ui patterns with class-variance-authority
- **Animations**: Framer Motion or CSS transitions
- **Portal**: React Portal for rendering outside component tree
- **Accessibility**: Focus trap, ARIA attributes, keyboard navigation

### Key Features Required
1. **Portal Rendering**: Render modal content in document body
2. **Focus Management**: Trap focus within modal, restore on close
3. **Keyboard Navigation**: ESC to close, tab navigation
4. **Scroll Management**: Lock body scroll when modal is open
5. **Animation System**: Smooth enter/exit transitions
6. **Responsive Design**: Adaptive sizing across devices

### Usage Examples
```tsx
// Basic modal
<DocyModal open={isOpen} onClose={() => setIsOpen(false)} title="Settings">
  <p>Modal content here</p>
</DocyModal>

// Large modal with icon
<DocyModal 
  open={isOpen} 
  onClose={() => setIsOpen(false)}
  title="User Profile"
  icon="user"
  size="4xl"
>
  <UserProfileForm />
</DocyModal>

// Full-screen modal
<DocyModal 
  open={isOpen} 
  onClose={() => setIsOpen(false)}
  mode="full"
  title="Document Editor"
>
  <DocumentEditor />
</DocyModal>

// Non-dismissible modal
<DocyModal 
  open={isOpen} 
  onClose={() => setIsOpen(false)}
  closeOnClickOutside={false}
  title="Processing..."
>
  <ProcessingIndicator />
</DocyModal>

// Custom height with scrolling
<DocyModal 
  open={isOpen} 
  onClose={() => setIsOpen(false)}
  height="70vh"
  scrollable={true}
  title="Long Content"
>
  <LongContentList />
</DocyModal>

// With custom styling
<DocyModal 
  open={isOpen} 
  onClose={() => setIsOpen(false)}
  className="custom-modal"
  zIndex={9999}
>
  <ImportantContent />
</DocyModal>
```

### Dependencies Required
- `@radix-ui/react-dialog`: Accessible dialog primitives
- `framer-motion`: Animation library
- `class-variance-authority`: Variant management
- `@heroicons/react`: Close icon
- Focus trap utility

### Testing Requirements
1. **Unit Tests**: Open/close behavior, prop validation, keyboard navigation
2. **Integration Tests**: Focus management, scroll locking, portal rendering
3. **Visual Tests**: All size variants, animations, responsive behavior
4. **Accessibility Tests**: ARIA attributes, keyboard navigation, focus trap

## Development Priority
**High** - Essential UI component for dialogs and overlays

## Notes
- Built with modern shadcn/ui patterns for consistency
- Leverages Radix UI for accessibility and behavior
- Supports both controlled and uncontrolled usage patterns
- Designed for maximum flexibility and performance
- Type-safe with excellent developer experience