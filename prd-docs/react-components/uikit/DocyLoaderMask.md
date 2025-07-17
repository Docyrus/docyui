# DocyLoaderMask Component

## Overview
DocyLoaderMask is a versatile loading overlay component that provides visual feedback during asynchronous operations. Built with shadcn/ui patterns and Tailwind CSS v4, it can be positioned relative to specific elements or cover the entire viewport. The component features smooth animations, customizable content, and flexible positioning options.

## Component Specification

### Props
| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `show` | boolean | false | No | Controls overlay visibility |
| `reference` | HTMLElement \| null | null | No | Element to position overlay relative to |
| `text` | string | - | No | Loading text to display |
| `className` | string | - | No | Additional CSS classes |
| `children` | ReactNode | - | No | Custom content to replace default loader |
| `onMaskClick` | function | - | No | Callback when overlay background is clicked |
| `portal` | boolean | true | No | Whether to render in portal (document.body) |
| `zIndex` | number | 50 | No | Z-index value for overlay |

### TypeScript Interfaces
```typescript
interface DocyLoaderMaskProps {
  show?: boolean;
  reference?: HTMLElement | null;
  text?: string;
  className?: string;
  children?: ReactNode;
  onMaskClick?: () => void;
  portal?: boolean;
  zIndex?: number;
}

interface LoaderMaskStyles {
  width: string;
  height: string;
  top: string;
  left: string;
  position: 'absolute' | 'fixed';
}
```

### Behavior
1. **Positioning System**:
   - Without reference: Covers entire viewport with fixed positioning
   - With reference: Positioned absolutely over the referenced element
   - Automatically updates position when reference element changes
   - Smooth enter/exit animations with opacity transitions

2. **Portal Rendering**:
   - Renders to document.body by default for proper z-index layering
   - Can be disabled for inline positioning within containers
   - Teleports content outside current DOM hierarchy

3. **Animation States**:
   - Enter: 300ms ease-out opacity transition (0 → 1)
   - Exit: 200ms ease-in opacity transition (1 → 0)
   - Smooth transitions prevent jarring appearance changes

4. **Content Management**:
   - Default: Spinner with optional text
   - Custom: Full slot replacement with children prop
   - Responsive design adapts to content size

## Component Requirements

### Technical Specifications
- **Framework**: React with TypeScript
- **Base Component**: Custom implementation (no direct shadcn/ui equivalent)
- **Integration**: Uses shadcn/ui design tokens and styling patterns
- **Styling**: shadcn/ui patterns with class-variance-authority
- **Portal**: React Portal for document.body rendering
- **Animation**: CSS transitions for smooth opacity changes
- **Positioning**: Dynamic positioning based on reference element bounds
- **Accessibility**: Proper ARIA attributes and screen reader support

### Key Features Required
1. **Flexible Positioning**: Support both viewport-wide and element-specific overlays
2. **Portal Rendering**: Render outside component tree for proper layering
3. **Animation System**: Smooth enter/exit transitions
4. **Custom Content**: Slot system for custom loading indicators
5. **Position Tracking**: Automatic position updates when reference element changes
6. **Responsive Design**: Adapts to different screen sizes and orientations

### Visual Design Requirements
- **Overlay Background**: Semi-transparent slate with 60% opacity
- **Loading Container**: White background with rounded corners and padding
- **Spinner**: Animated circular loader with proper contrast
- **Typography**: Consistent text styling with proper spacing
- **Transitions**: Smooth opacity changes for professional appearance

### Usage Examples
```tsx
// Basic full-screen loader
<DocyLoaderMask show={loading} />

// With loading text
<DocyLoaderMask 
  show={loading} 
  text="Loading data..." 
/>

// Positioned over specific element
<DocyLoaderMask 
  show={loading} 
  reference={elementRef.current}
  text="Processing..."
/>

// Custom content with children
<DocyLoaderMask show={loading}>
  <div className="flex flex-col items-center space-y-4">
    <DocyProgress value={progress} />
    <span>Uploading files... {progress}%</span>
  </div>
</DocyLoaderMask>

// With click handler
<DocyLoaderMask 
  show={loading} 
  onMaskClick={handleCancelLoading}
  text="Click to cancel"
/>

// Inline positioning (no portal)
<DocyLoaderMask 
  show={loading} 
  portal={false}
  className="rounded-lg"
  text="Loading content..."
/>

// Custom z-index for complex layering
<DocyLoaderMask 
  show={loading} 
  zIndex={9999}
  text="High priority loading"
/>

// Form submission example
<form onSubmit={handleSubmit} className="relative">
  <DocyLoaderMask 
    show={submitting} 
    reference={formRef.current}
    text="Saving changes..."
  />
  <FormFields />
</form>

// Data table loading
<div className="relative">
  <DocyLoaderMask 
    show={loading} 
    reference={tableRef.current}
    text="Fetching records..."
  />
  <DataTable ref={tableRef} />
</div>
```

### Integration Requirements
- **Form Components**: Overlay during form submission
- **Data Views**: Loading states for tables and lists
- **Modal Components**: Loading content within dialogs
- **Card Components**: Individual card loading states
- **Page Components**: Full-page loading indicators

### Accessibility Requirements
- **ARIA Role**: `role="status"` for loading announcements
- **ARIA Labels**: Proper labeling for screen readers
- **Focus Management**: Prevent interaction with underlying content
- **Screen Reader**: Announce loading state changes
- **Keyboard Navigation**: Proper focus trap when active

### Dependencies Required
- `@radix-ui/react-portal`: Portal rendering (or React.createPortal)
- `framer-motion` or CSS transitions: Animation system
- `class-variance-authority`: Variant management
- Resize observer utility for position tracking
- Focus trap utility for accessibility

### Testing Requirements
1. **Unit Tests**: 
   - Show/hide behavior
   - Portal rendering
   - Position calculations
   - Props validation
   - Custom content rendering

2. **Integration Tests**:
   - Reference element positioning
   - Window resize handling
   - Animation timing
   - Portal cleanup
   - Click outside behavior

3. **Visual Tests**:
   - Overlay appearance
   - Loading spinner animation
   - Text rendering
   - Position accuracy
   - Responsive behavior

4. **Accessibility Tests**:
   - ARIA attributes
   - Screen reader announcements
   - Focus management
   - Keyboard navigation blocking

5. **Performance Tests**:
   - Position calculation efficiency
   - Animation smoothness
   - Memory leak prevention
   - Cleanup on unmount

## Development Priority
**High** - Essential component for loading states throughout the application

## Notes
- Position tracking requires careful handling of element bounds and scroll positions
- Portal rendering ensures proper z-index layering above all other content
- Animation timing should match Material Design or similar standards
- Default spinner should be consistent with DocySpinner component
- Consider viewport changes and responsive positioning
- Cleanup observers and event listeners on unmount
- Support for both controlled and uncontrolled usage patterns
- Integrates seamlessly with form validation and data fetching patterns