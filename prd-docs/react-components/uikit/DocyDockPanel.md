# DocyDockPanel Component

## Overview
DocyDockPanel is a collapsible side panel component that docks to any edge of its container. It features smooth animations, toggle functionality, and flexible positioning for creating expandable sidebars, tool panels, or navigation drawers. Built with shadcn/ui patterns and Tailwind CSS v4, it supports both horizontal and vertical orientations.

## Component Specification

### Props
| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `open` | boolean | false | No | Controls panel visibility state |
| `onOpenChange` | function | - | No | Callback fired when panel visibility changes |
| `position` | string | 'right' | No | Panel position: 'left', 'right', 'top', 'bottom' |
| `size` | string | '16rem' | No | Panel size in the primary dimension (width for horizontal, height for vertical) |
| `bodyClass` | string | - | No | Additional CSS classes for the panel body |
| `className` | string | - | No | Additional CSS classes for the container |

### Behavior
1. **Positioning System**:
   - Automatically detects orientation (horizontal: left/right, vertical: top/bottom)
   - Adjusts flex direction and transform animations based on position
   - Maintains consistent toggle button placement relative to panel position

2. **Animation System**:
   - Smooth slide-in/slide-out transitions using CSS transforms
   - 300ms duration with ease-in-out timing function
   - Transform-based animations for optimal performance
   - Collapsed state shows only 8px of panel edge

3. **Toggle Interaction**:
   - Click-to-toggle functionality on both handle and resize bar
   - Visual feedback with rotating arrow icon
   - Controlled component pattern with onOpenChange callback

4. **Size Management**:
   - Flexible sizing with CSS units (rem, px, %, vw, vh)
   - Special 'full' value for 100% of available space
   - Responsive design considerations for different screen sizes

### Position Variants
```typescript
const positionVariants = {
  left: {
    orientation: 'horizontal',
    flexDirection: 'flex-row-reverse',
    transform: 'translateX(calc(8px - 100%))',
    handlePosition: 'top-4 -right-2'
  },
  right: {
    orientation: 'horizontal', 
    flexDirection: 'flex-row',
    transform: 'translateX(calc(100% - 8px))',
    handlePosition: 'top-4 -left-2'
  },
  top: {
    orientation: 'vertical',
    flexDirection: 'flex-col-reverse', 
    transform: 'translateY(calc(8px - 100%))',
    handlePosition: 'left-4 -bottom-2'
  },
  bottom: {
    orientation: 'vertical',
    flexDirection: 'flex-col',
    transform: 'translateY(calc(100% - 8px))',
    handlePosition: 'left-4 -top-2'
  }
} as const
```

## Component Requirements

### Technical Specifications
- **Framework**: React with TypeScript
- **Base Component**: Custom implementation (no direct shadcn/ui equivalent)
- **Integration**: Uses shadcn/ui design tokens and styling patterns
- **Styling**: shadcn/ui patterns with class-variance-authority
- **Animations**: CSS transitions with transform-based animations
- **Icons**: Integration with DocyIcon component system
- **State Management**: Controlled component with optional internal state

### Key Features Required
1. **Flexible Positioning**: Support for all four edge positions (left, right, top, bottom)
2. **Smooth Animations**: CSS transform-based slide animations with proper timing
3. **Toggle Controls**: Both handle button and resize bar should trigger toggle
4. **Size Control**: Dynamic sizing with support for various CSS units
5. **Responsive Behavior**: Proper handling of different screen sizes and orientations
6. **Accessibility**: Proper ARIA attributes and keyboard navigation support

### Usage Examples
```tsx
// Basic right-side panel
<DocyDockPanel open={isOpen} onOpenChange={setIsOpen}>
  <div className="p-4">
    <h3>Side Panel Content</h3>
    <p>Panel content goes here</p>
  </div>
</DocyDockPanel>

// Left-side navigation panel
<DocyDockPanel 
  open={isNavOpen} 
  onOpenChange={setIsNavOpen}
  position="left"
  size="20rem"
  bodyClass="bg-slate-100 border-r"
>
  <NavigationMenu />
</DocyDockPanel>

// Top toolbar panel
<DocyDockPanel 
  open={isToolbarOpen} 
  onOpenChange={setIsToolbarOpen}
  position="top"
  size="4rem"
  bodyClass="border-b bg-white"
>
  <Toolbar />
</DocyDockPanel>

// Bottom status panel
<DocyDockPanel 
  open={isStatusOpen} 
  onOpenChange={setIsStatusOpen}
  position="bottom"
  size="6rem"
  bodyClass="border-t bg-slate-50"
>
  <StatusBar />
</DocyDockPanel>

// Full-width panel
<DocyDockPanel 
  open={isFullOpen} 
  onOpenChange={setIsFullOpen}
  position="right"
  size="full"
  bodyClass="bg-white shadow-lg"
>
  <DetailView />
</DocyDockPanel>

// Custom sized panel with percentage
<DocyDockPanel 
  open={isCustomOpen} 
  onOpenChange={setIsCustomOpen}
  position="left"
  size="25vw"
  bodyClass="bg-gray-50"
>
  <SidebarContent />
</DocyDockPanel>

// Controlled state example
const [panelOpen, setPanelOpen] = useState(false);

<DocyDockPanel 
  open={panelOpen} 
  onOpenChange={setPanelOpen}
  position="right"
  size="24rem"
  bodyClass="overflow-y-auto"
>
  <ScrollableContent />
</DocyDockPanel>
```

### Dependencies Required
- `@docyrus/icon`: For toggle handle icon
- `class-variance-authority`: For variant management
- `clsx`: For conditional class joining
- React hooks: `useState`, `useCallback`, `useEffect`

### Testing Requirements
1. **Unit Tests**: 
   - Toggle functionality with open/onOpenChange
   - Position variant rendering and animations
   - Size property handling (rem, px, %, vw, vh, 'full')
   - Proper CSS class application

2. **Integration Tests**:
   - Animation timing and transform values
   - Handle and resize bar click interactions
   - Responsive behavior across breakpoints
   - Content rendering within panel body

3. **Visual Tests**:
   - All position variants (left, right, top, bottom)
   - Open/closed states with proper animations
   - Different size configurations
   - Handle icon rotation and positioning

4. **Accessibility Tests**:
   - ARIA attributes for collapsible panel
   - Keyboard navigation support
   - Focus management during toggle
   - Screen reader compatibility

### Interface Definition
```typescript
interface DocyDockPanelProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  position?: 'left' | 'right' | 'top' | 'bottom';
  size?: string;
  bodyClass?: string;
  className?: string;
  children?: React.ReactNode;
}

interface DockPanelState {
  isOpen: boolean;
  isAnimating: boolean;
}
```

## Development Priority
**Medium** - Useful for creating collapsible panels and sidebars in complex layouts

## Notes
- Uses CSS transforms for smooth, performant animations
- Supports both controlled and uncontrolled usage patterns
- Handle positioning automatically adjusts based on panel position
- Resize bar provides additional interaction area for better UX
- Built with responsive design considerations for mobile and desktop
- Compatible with various content types and scrolling behaviors
- Follows shadcn/ui patterns for consistent styling and behavior