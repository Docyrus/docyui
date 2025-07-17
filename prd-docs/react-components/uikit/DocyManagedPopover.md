# DocyManagedPopover Component

## Overview
DocyManagedPopover is a sophisticated popover component that provides flexible tooltip and dropdown functionality with advanced positioning, animations, and interaction patterns. Built with shadcn/ui patterns and Tailwind CSS v4, it leverages Tippy.js-style positioning with portal rendering and comprehensive customization options. The component supports both element-based and coordinate-based positioning, making it ideal for tooltips, dropdowns, context menus, and floating UI elements.

## Component Specification

### Props
| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `reference` | HTMLElement \| boolean \| null | null | No | Element to position popover relative to |
| `referenceRect` | DOMRect \| object | - | No | Coordinate-based positioning rectangle |
| `show` | boolean | false | No | Controls popover visibility |
| `hideOnClickOutside` | boolean | true | No | Close popover when clicking outside |
| `followCursor` | string \| boolean | null | No | Follow cursor movement ('horizontal', 'vertical', 'initial', true) |
| `arrow` | boolean | false | No | Display arrow pointing to reference element |
| `skidding` | number | 0 | No | Horizontal offset from reference element |
| `distance` | number | 10 | No | Vertical offset from reference element |
| `placement` | string | 'auto' | No | Placement relative to reference element |
| `portal` | string \| object \| boolean | null | No | Portal target for rendering |
| `mask` | boolean | false | No | Show loading mask overlay |
| `shadow` | boolean | true | No | Apply shadow styling |
| `scrollable` | boolean | true | No | Enable content scrolling |
| `animation` | string | 'scale' | No | Animation type for show/hide |
| `autoFocusElement` | HTMLElement \| object | null | No | Element to focus when popover opens |
| `zIndex` | number \| string | 9999 | No | Z-index value for popover |
| `children` | ReactNode | - | No | Popover content |
| `onShow` | function | - | No | Callback when popover shows |
| `onHide` | function | - | No | Callback when popover hides |
| `onShown` | function | - | No | Callback when popover animation completes |

### TypeScript Interfaces
```typescript
interface DocyManagedPopoverProps {
  reference?: HTMLElement | boolean | null;
  referenceRect?: DOMRect | {
    top: number;
    left: number;
    width: number;
    height: number;
    right: number;
    bottom: number;
    x: number;
    y: number;
  };
  show?: boolean;
  hideOnClickOutside?: boolean;
  followCursor?: 'horizontal' | 'vertical' | 'initial' | boolean | null;
  arrow?: boolean;
  skidding?: number;
  distance?: number;
  placement?: PopoverPlacement;
  portal?: string | HTMLElement | boolean | null;
  mask?: boolean;
  shadow?: boolean;
  scrollable?: boolean;
  animation?: 'scale' | 'fade' | 'shift-away' | 'shift-toward' | 'perspective';
  autoFocusElement?: HTMLElement | { focus: () => void } | null;
  zIndex?: number | string;
  children?: ReactNode;
  onShow?: (instance: PopoverInstance) => void;
  onHide?: (instance: PopoverInstance) => void;
  onShown?: (instance: PopoverInstance) => void;
}

type PopoverPlacement = 
  | 'top' | 'top-start' | 'top-end'
  | 'bottom' | 'bottom-start' | 'bottom-end'
  | 'right' | 'right-start' | 'right-end'
  | 'left' | 'left-start' | 'left-end'
  | 'auto' | 'auto-start' | 'auto-end';

interface PopoverInstance {
  show: () => void;
  hide: () => void;
  setProps: (props: Partial<TippyOptions>) => void;
  destroy: () => void;
  popper: HTMLElement;
}

interface PopoverRenderProps {
  hide: () => void;
  show: () => void;
  visible: boolean;
  popover: PopoverInstance | null;
}
```

### Behavior
1. **Positioning System**:
   - Element-based positioning using reference prop
   - Coordinate-based positioning using referenceRect
   - Automatic placement with collision detection
   - Center positioning when no reference provided
   - Smart portal detection for proper layering

2. **Animation States**:
   - Configurable animations: scale, fade, shift-away, shift-toward, perspective
   - Smooth enter/exit transitions with inertia
   - Delay timing: 200ms show, 100ms hide
   - Animation synchronization with visibility state

3. **Interaction Patterns**:
   - Manual trigger control via show prop
   - Click outside to close (configurable)
   - Cursor following for dynamic tooltips
   - Arrow pointing to reference element
   - Interactive content support

4. **Portal Management**:
   - Automatic portal selection based on modal/sidepanel context
   - Fallback to document.body when no portal detected
   - Dynamic portal target updates
   - Proper z-index layering

5. **Content Management**:
   - Render props pattern for dynamic content
   - Loading mask integration
   - Scrollable content support
   - Focus management with auto-focus capability

## Component Requirements

### Technical Specifications
- **Framework**: React with TypeScript
- **Base Component**: shadcn/ui Popover component (`pnpm dlx shadcn@latest add popover`)
- **Extensions**: Advanced positioning, cursor following, portal management, and animation system built on top of shadcn Popover
- **Styling**: shadcn/ui patterns with class-variance-authority
- **Positioning**: Floating UI (@floating-ui/react) or Tippy.js-style positioning
- **Portal**: React Portal for document.body rendering
- **Animation**: Framer Motion or CSS transitions
- **Accessibility**: ARIA attributes, focus management, keyboard navigation

### Key Features Required
1. **Advanced Positioning**: Support for both element and coordinate-based positioning
2. **Portal Rendering**: Intelligent portal selection with context awareness
3. **Animation System**: Multiple animation types with smooth transitions
4. **Cursor Following**: Dynamic positioning that follows cursor movement
5. **Focus Management**: Automatic focus handling with custom element support
6. **Loading Integration**: Built-in loading mask capability
7. **Collision Detection**: Smart placement adjustment to stay within viewport

### Visual Design Requirements
- **Shadow System**: Configurable shadow with shadow-lg default
- **Scrolling**: Configurable overflow behavior with scrollable content
- **Arrow Styling**: Optional arrow with proper positioning and styling
- **Loading Mask**: Integrated DocyLoaderMask component
- **Z-Index Management**: Proper layering with configurable z-index values

### Usage Examples
```tsx
// Basic tooltip
<DocyManagedPopover
  reference={buttonRef.current}
  show={isHovered}
  placement="top"
  arrow
>
  <div className="p-2 text-sm">
    This is a tooltip message
  </div>
</DocyManagedPopover>

// Dropdown menu
<DocyManagedPopover
  reference={triggerRef.current}
  show={isOpen}
  placement="bottom-start"
  hideOnClickOutside
  shadow
>
  <div className="py-2 w-48">
    <MenuItem>Option 1</MenuItem>
    <MenuItem>Option 2</MenuItem>
    <MenuItem>Option 3</MenuItem>
  </div>
</DocyManagedPopover>

// Context menu with cursor following
<DocyManagedPopover
  referenceRect={contextMenuPosition}
  show={showContextMenu}
  placement="auto"
  followCursor="initial"
>
  <ContextMenu onClose={() => setShowContextMenu(false)} />
</DocyManagedPopover>

// Loading popover
<DocyManagedPopover
  reference={formRef.current}
  show={isSubmitting}
  mask
  placement="center"
>
  <div className="p-4">
    <p>Processing your request...</p>
  </div>
</DocyManagedPopover>

// Render props pattern
<DocyManagedPopover
  reference={elementRef.current}
  show={isVisible}
  placement="right"
  onShown={handleShown}
>
  {({ hide, show, visible, popover }) => (
    <div className="p-4">
      <p>Popover is {visible ? 'visible' : 'hidden'}</p>
      <button onClick={hide}>Close</button>
    </div>
  )}
</DocyManagedPopover>

// With custom animation and focus
<DocyManagedPopover
  reference={buttonRef.current}
  show={isOpen}
  animation="shift-away"
  autoFocusElement={firstInputRef.current}
  placement="bottom"
  distance={20}
  skidding={10}
>
  <form className="p-4 space-y-4">
    <input ref={firstInputRef} placeholder="First field" />
    <input placeholder="Second field" />
    <button type="submit">Submit</button>
  </form>
</DocyManagedPopover>

// Modal-aware popover
<DocyManagedPopover
  reference={triggerRef.current}
  show={isOpen}
  portal="#modal-portal"
  zIndex={10000}
  placement="top"
>
  <div className="p-3">
    This popover renders in modal context
  </div>
</DocyManagedPopover>

// Coordinate-based positioning
<DocyManagedPopover
  referenceRect={{
    top: mouseY,
    left: mouseX,
    width: 1,
    height: 1,
    right: mouseX + 1,
    bottom: mouseY + 1,
    x: mouseX,
    y: mouseY
  }}
  show={showAtCoordinates}
  placement="auto"
>
  <div className="p-2">
    Positioned at coordinates ({mouseX}, {mouseY})
  </div>
</DocyManagedPopover>

// Scrollable content
<DocyManagedPopover
  reference={listRef.current}
  show={isOpen}
  scrollable
  className="max-h-64"
  placement="bottom-start"
>
  <div className="w-64">
    {longList.map(item => (
      <div key={item.id} className="p-2 hover:bg-gray-100">
        {item.name}
      </div>
    ))}
  </div>
</DocyManagedPopover>
```

### Integration Requirements
- **Form Components**: Validation tooltips and help text
- **Data Views**: Column filters and sorting options
- **Button Components**: Dropdown menus and action lists
- **Input Components**: Autocomplete and suggestion lists
- **Navigation**: Submenu and mega menu support
- **Card Components**: Quick actions and detail popovers

### Accessibility Requirements
- **ARIA Role**: `role="tooltip"` or `role="dialog"` based on content
- **ARIA Labels**: Proper labeling with `aria-labelledby` and `aria-describedby`
- **Focus Management**: Trap focus within interactive popovers
- **Keyboard Navigation**: ESC to close, tab navigation
- **Screen Reader**: Announce popover state changes
- **High Contrast**: Proper contrast ratios for all content

### Dependencies Required
- `@floating-ui/react`: Modern positioning engine
- `framer-motion`: Animation system
- `class-variance-authority`: Variant management
- `@radix-ui/react-portal`: Portal rendering
- `uuid`: Unique element ID generation
- Focus trap utility for accessibility
- Resize observer for position updates

### Testing Requirements
1. **Unit Tests**:
   - Show/hide behavior
   - Positioning calculations
   - Portal rendering
   - Animation timing
   - Props validation
   - Event handling

2. **Integration Tests**:
   - Reference element positioning
   - Coordinate-based positioning
   - Portal selection logic
   - Focus management
   - Click outside behavior
   - Animation completion

3. **Visual Tests**:
   - All placement variants
   - Animation types
   - Arrow positioning
   - Shadow rendering
   - Loading mask integration
   - Scrollable content

4. **Accessibility Tests**:
   - ARIA attributes
   - Focus trap functionality
   - Keyboard navigation
   - Screen reader announcements
   - High contrast support

5. **Performance Tests**:
   - Position calculation efficiency
   - Animation smoothness
   - Memory leak prevention
   - Large content handling
   - Rapid show/hide cycles

## Development Priority
**High** - Essential component for tooltips, dropdowns, and floating UI elements

## Notes
- Built with modern positioning engine for accurate placement
- Supports both controlled and uncontrolled usage patterns
- Integrates seamlessly with DocyLoaderMask for loading states
- Portal selection logic handles complex modal/sidepanel contexts
- Cursor following provides enhanced user experience for dynamic tooltips
- Animation system should match other Docy components for consistency
- Focus management critical for accessibility compliance
- Consider viewport changes and responsive positioning
- Cleanup positioning observers and event listeners on unmount
- Support for both imperative and declarative usage patterns
- Render props pattern enables flexible content composition