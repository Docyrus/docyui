# DocySidePanel Component

## Overview
DocySidePanel is a slide-out panel component that provides overlay-based content display from the right side of the screen. Built with shadcn/ui patterns and Tailwind CSS v4, it features smooth animations, configurable sizes, and flexible positioning options. It serves as the primary container for secondary content and contextual information throughout the Docyrus React application.

## Component Specification

### Props
| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `open` | boolean | false | No | Controls panel visibility |
| `onClose` | function | - | No | Callback fired when panel should close |
| `onOpenChange` | function | - | No | Callback fired when open state changes |
| `overlay` | boolean | true | No | Show background overlay |
| `size` | string | 'base' | No | Panel width: '2xs', 'xs', 'sm', 'base', 'md', 'lg', 'max', 'xl' |
| `shadow` | boolean | true | No | Apply shadow effect to panel |
| `bgColor` | string | 'bg-white' | No | Background color class |
| `closeOnClickOutside` | boolean | true | No | Allow closing by clicking overlay |
| `showHeader` | boolean | true | No | Show header section with close button |
| `headerContent` | ReactNode | - | No | Custom header content |
| `className` | string | - | No | Additional CSS classes |
| `id` | string | - | No | Custom element ID |

### Behavior
1. **Animation System**:
   - Smooth slide-in/out animations from right edge
   - Overlay fade-in/out effects
   - Configurable animation duration and easing
   - Proper cleanup on unmount

2. **Positioning & Layout**:
   - Fixed positioning on right side of viewport
   - Responsive width with size variants
   - Full height with proper overflow handling
   - Z-index management for proper layering

3. **Interaction Patterns**:
   - Click outside to close (configurable)
   - ESC key to close
   - Dedicated close button in header
   - Touch/swipe gestures for mobile

4. **State Management**:
   - Controlled open/close state
   - Proper event handling and propagation
   - Focus management and restoration
   - Body scroll lock when open

### Size Variants
```typescript
const sizeVariants = {
  '2xs': 'max-w-lg',      // ~32rem
  'xs': 'max-w-xl',       // ~36rem
  'sm': 'max-w-3xl',      // ~48rem
  'base': 'max-w-4xl',    // ~56rem
  'md': 'max-w-5xl',      // ~64rem
  'lg': 'max-w-6xl',      // ~72rem
  'max': 'w-11/12',       // 91.666667%
  'xl': 'max-w-[80rem]'   // 80rem
} as const
```

### Internal Components
The component includes several internal elements:
- **Panel Container**: Main sliding panel with animations
- **Overlay**: Background overlay with blur effect
- **Header**: Optional header with close button and custom content
- **Content Area**: Main content area with proper overflow handling
- **Close Button**: Styled close button with gradient border

## Component Requirements

### Technical Specifications
- **Framework**: React with TypeScript
- **Base Component**: Custom implementation (no direct shadcn/ui equivalent)
- **Integration**: Uses shadcn/ui design tokens and styling patterns
- **Styling**: shadcn/ui patterns with class-variance-authority
- **Animations**: Framer Motion for smooth transitions
- **Portal**: React Portal for rendering outside component tree
- **Accessibility**: Focus trap, ARIA attributes, keyboard navigation
- **State Management**: Proper controlled/uncontrolled patterns

### Key Features Required
1. **Portal Rendering**: Render panel content in document body
2. **Animation System**: Smooth slide-in/out with configurable timing
3. **Overlay Management**: Background overlay with proper z-index
4. **Focus Management**: Trap focus within panel, restore on close
5. **Keyboard Navigation**: ESC to close, proper tab order
6. **Touch Support**: Swipe gestures for mobile devices
7. **Scroll Management**: Lock body scroll when panel is open
8. **Responsive Design**: Adaptive sizing across devices

### Advanced Features
- **Full Window Mode**: Integration with full-window display functionality
- **Position Tracking**: Expose panel position and dimensions to child components
- **Custom Header**: Flexible header slot with close button
- **Gradient Close Button**: Styled close button with gradient border
- **Element Bounding**: Track panel dimensions for child component positioning

### Usage Examples
```tsx
// Basic side panel
<DocySidePanel open={isOpen} onClose={() => setIsOpen(false)}>
  <div className="p-6">
    <h2>Panel Content</h2>
    <p>This is the panel content</p>
  </div>
</DocySidePanel>

// Large panel with custom header
<DocySidePanel 
  open={isOpen} 
  onClose={() => setIsOpen(false)}
  size="lg"
  headerContent={
    <div className="flex items-center gap-2">
      <DocyIcon name="settings" />
      <span>Settings Panel</span>
    </div>
  }
>
  <SettingsForm />
</DocySidePanel>

// Panel without overlay
<DocySidePanel 
  open={isOpen} 
  onClose={() => setIsOpen(false)}
  overlay={false}
  size="sm"
>
  <QuickActions />
</DocySidePanel>

// Panel with custom background
<DocySidePanel 
  open={isOpen} 
  onClose={() => setIsOpen(false)}
  bgColor="bg-gray-50"
  shadow={false}
>
  <LightContent />
</DocySidePanel>

// Non-dismissible panel
<DocySidePanel 
  open={isOpen} 
  onClose={() => setIsOpen(false)}
  closeOnClickOutside={false}
  showHeader={false}
>
  <ProcessingView />
</DocySidePanel>

// Controlled with state changes
<DocySidePanel 
  open={isOpen} 
  onOpenChange={setIsOpen}
  onClose={() => {
    // Custom close logic
    handleSaveState();
    setIsOpen(false);
  }}
>
  <EditForm />
</DocySidePanel>

// With custom styling
<DocySidePanel 
  open={isOpen} 
  onClose={() => setIsOpen(false)}
  className="custom-panel"
  id="main-sidebar"
>
  <CustomContent />
</DocySidePanel>
```

### Context Integration
The component should provide context for child components:
```typescript
interface SidePanelContextType {
  isOpen: boolean;
  position: {
    x: number;
    width: number;
  };
  floatingContainer: HTMLElement | null;
  close: () => void;
}
```

### Dependencies Required
- `@radix-ui/react-dialog`: Accessible dialog primitives
- `framer-motion`: Animation library
- `class-variance-authority`: Variant management
- `@heroicons/react`: Close icon
- `react-use-gesture`: Touch/swipe gesture support
- Focus trap utility
- Body scroll lock utility

### Testing Requirements
1. **Unit Tests**: Open/close behavior, prop validation, size variants
2. **Integration Tests**: Focus management, scroll locking, portal rendering
3. **Accessibility Tests**: ARIA attributes, keyboard navigation, focus trap
4. **Animation Tests**: Smooth transitions, timing, cleanup
5. **Touch Tests**: Swipe gestures, mobile interactions
6. **Visual Tests**: All size variants, overlay effects, responsive behavior

## Development Priority
**High** - Core navigation and content display component

## Notes
- Built with modern shadcn/ui patterns for consistency and maintainability
- Leverages Radix UI for accessibility and behavior foundations
- Supports both controlled and uncontrolled usage patterns
- Designed for maximum flexibility with slot-based content
- Includes full-window mode integration for immersive experiences
- Provides context for child components to access panel state and positioning
- Optimized for performance with proper memoization and cleanup
- Mobile-first responsive design with touch gesture support