# DocyTooltip Component

## Overview
DocyTooltip is a hover tooltip component built on shadcn/ui patterns that provides contextual information and help text. It supports multiple triggers, positioning options, and accessibility features. It serves as the primary tooltip component throughout the Docyrus React application.

## Component Specification

### Props
| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-----------|
| `children` | ReactNode | - | Yes | Trigger element |
| `content` | ReactNode | - | Yes | Tooltip content |
| `side` | string | 'top' | No | Tooltip position: 'top', 'right', 'bottom', 'left' |
| `align` | string | 'center' | No | Tooltip alignment: 'start', 'center', 'end' |
| `sideOffset` | number | 4 | No | Distance from trigger |
| `alignOffset` | number | 0 | No | Alignment offset |
| `delayDuration` | number | 700 | No | Delay before showing (ms) |
| `skipDelayDuration` | number | 300 | No | Skip delay when quickly moving between triggers |
| `disabled` | boolean | false | No | Disable tooltip |
| `open` | boolean | - | No | Controlled open state |
| `defaultOpen` | boolean | false | No | Default open state |
| `onOpenChange` | function | - | No | Open state change callback |
| `className` | string | - | No | Additional CSS classes |
| `contentClassName` | string | - | No | Content CSS classes |
| `arrowClassName` | string | - | No | Arrow CSS classes |
| `disableHoverableContent` | boolean | false | No | Disable hoverable content |
| `avoidCollisions` | boolean | true | No | Avoid viewport collisions |
| `collisionBoundary` | Element | - | No | Collision boundary element |
| `sticky` | string | 'partial' | No | Sticky behavior: 'partial', 'always' |

### Positioning Options
1. **side**: Controls which side of the trigger the tooltip appears
2. **align**: Controls alignment along the side
3. **sideOffset**: Distance from the trigger
4. **alignOffset**: Offset from the alignment position

### Trigger Options
- **Hover**: Default hover behavior
- **Focus**: Keyboard focus trigger
- **Click**: Click to show/hide
- **Manual**: Controlled visibility

### Content Types
- **Text**: Simple text content
- **Rich Content**: HTML/React elements
- **Icons**: Icon-only tooltips
- **Interactive**: Hoverable content with actions

## Component Requirements

### Technical Specifications
- **Framework**: React with TypeScript
- **Base Component**: shadcn/ui Tooltip component (`pnpm dlx shadcn@latest add tooltip`)
- **Extensions**: Enhanced positioning, content types, and interactions
- **Styling**: shadcn/ui patterns with class-variance-authority
- **Accessibility**: Full ARIA support, keyboard navigation
- **Performance**: Optimized rendering and positioning
- **Portal**: Proper DOM positioning with portals

### Key Features Required
1. **Flexible Positioning**: Multiple sides and alignment options
2. **Accessibility**: Screen reader support and keyboard navigation
3. **Collision Detection**: Automatic repositioning to stay in viewport
4. **Delay Management**: Configurable show/hide delays
5. **Rich Content**: Support for complex tooltip content
6. **Interactive Content**: Hoverable tooltip content
7. **Responsive**: Mobile-friendly touch interactions
8. **Performance**: Optimized for frequent usage

### Advanced Features
- **Nested Tooltips**: Tooltips within tooltips
- **Custom Arrows**: Styled arrow pointers
- **Animation**: Smooth show/hide transitions
- **Portal Options**: Custom portal containers
- **Boundary Detection**: Custom collision boundaries

### Usage Examples
```tsx
// Basic tooltip
<DocyTooltip content="This is a helpful tooltip">
  <DocyButton>Hover me</DocyButton>
</DocyTooltip>

// Different positions
<DocyTooltip content="Top tooltip" side="top">
  <DocyButton>Top</DocyButton>
</DocyTooltip>

<DocyTooltip content="Right tooltip" side="right">
  <DocyButton>Right</DocyButton>
</DocyTooltip>

<DocyTooltip content="Bottom tooltip" side="bottom">
  <DocyButton>Bottom</DocyButton>
</DocyTooltip>

<DocyTooltip content="Left tooltip" side="left">
  <DocyButton>Left</DocyButton>
</DocyTooltip>

// Different alignments
<DocyTooltip content="Start aligned" align="start">
  <DocyButton>Start</DocyButton>
</DocyTooltip>

<DocyTooltip content="Center aligned" align="center">
  <DocyButton>Center</DocyButton>
</DocyTooltip>

<DocyTooltip content="End aligned" align="end">
  <DocyButton>End</DocyButton>
</DocyTooltip>

// Custom delays
<DocyTooltip content="Quick tooltip" delayDuration={100}>
  <DocyButton>Quick</DocyButton>
</DocyTooltip>

<DocyTooltip content="Slow tooltip" delayDuration={1000}>
  <DocyButton>Slow</DocyButton>
</DocyTooltip>

// Rich content tooltip
<DocyTooltip
  content={
    <div className="space-y-2">
      <h3 className="font-medium">Rich Tooltip</h3>
      <p className="text-sm">This tooltip contains multiple elements</p>
      <div className="flex gap-2">
        <DocyButton size="sm">Action 1</DocyButton>
        <DocyButton size="sm" variant="outline">Action 2</DocyButton>
      </div>
    </div>
  }
  side="bottom"
  className="p-4 max-w-xs"
>
  <DocyButton>Rich Content</DocyButton>
</DocyTooltip>

// Icon tooltip
<DocyTooltip content="Help information">
  <DocyIcon name="help-circle" className="cursor-help" />
</DocyTooltip>

// Disabled tooltip
<DocyTooltip content="This tooltip is disabled" disabled>
  <DocyButton disabled>Disabled</DocyButton>
</DocyTooltip>

// Controlled tooltip
<DocyTooltip
  content="Controlled tooltip"
  open={isOpen}
  onOpenChange={setIsOpen}
>
  <DocyButton onClick={() => setIsOpen(!isOpen)}>
    Click to toggle
  </DocyButton>
</DocyTooltip>

// Form field tooltip
<div className="space-y-2">
  <label className="flex items-center gap-2">
    Username
    <DocyTooltip content="Must be 3-20 characters, letters and numbers only">
      <DocyIcon name="help-circle" size={16} className="cursor-help" />
    </DocyTooltip>
  </label>
  <input className="w-full p-2 border rounded" />
</div>

// Navigation tooltip
<nav className="flex gap-2">
  {navigationItems.map((item) => (
    <DocyTooltip key={item.id} content={item.label}>
      <DocyButton variant="ghost" size="icon">
        <DocyIcon name={item.icon} />
      </DocyButton>
    </DocyTooltip>
  ))}
</nav>

// Status tooltip
<div className="flex items-center gap-2">
  <span>Server Status</span>
  <DocyTooltip
    content={
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full" />
          <span>Online</span>
        </div>
        <div className="text-sm text-gray-500">
          Last checked: 2 minutes ago
        </div>
      </div>
    }
  >
    <div className="w-3 h-3 bg-green-500 rounded-full cursor-help" />
  </DocyTooltip>
</div>

// Table cell tooltip
<DocyTable
  data={data}
  columns={[
    {
      id: 'name',
      header: 'Name',
      accessor: 'name',
      render: (value, row) => (
        <DocyTooltip content={row.description}>
          <span className="cursor-help">{value}</span>
        </DocyTooltip>
      )
    }
  ]}
/>

// Error tooltip
<DocyTooltip
  content="This field is required"
  side="right"
  className="bg-red-500 text-white"
>
  <input className="p-2 border border-red-500 rounded" />
</DocyTooltip>

// Interactive tooltip
<DocyTooltip
  content={
    <div className="space-y-2">
      <h3 className="font-medium">User Actions</h3>
      <div className="flex flex-col gap-1">
        <DocyButton size="sm" variant="ghost">View Profile</DocyButton>
        <DocyButton size="sm" variant="ghost">Send Message</DocyButton>
        <DocyButton size="sm" variant="ghost">Block User</DocyButton>
      </div>
    </div>
  }
  side="bottom"
  disableHoverableContent={false}
>
  <DocyAvatar user={user} />
</DocyTooltip>
```

### Integration Requirements
- **DocyButton**: Common trigger element
- **DocyIcon**: Icon triggers and content
- **DocyAvatar**: User information tooltips
- **Portal**: DOM positioning
- **Animation**: Smooth transitions
- **Theme System**: Consistent styling

### Accessibility Requirements
- **ARIA Attributes**: tooltip role, aria-describedby
- **Keyboard Navigation**: Tab, Escape key support
- **Screen Reader Support**: Proper announcements
- **Focus Management**: Logical focus flow
- **Touch Support**: Mobile-friendly interactions

### Performance Optimization
- **Lazy Rendering**: Render content only when needed
- **Portal Optimization**: Efficient DOM updates
- **Event Handling**: Optimized mouse/touch events
- **Memory Management**: Proper cleanup

### Mobile Considerations
- **Touch Interactions**: Tap to show/hide on mobile
- **Responsive Positioning**: Adaptive positioning
- **Touch Targets**: Appropriate trigger sizes
- **Gesture Support**: Swipe to dismiss

### Testing Requirements
1. **Unit Tests**: Positioning, delay behavior, content rendering
2. **Integration Tests**: Trigger interactions, portal rendering
3. **Accessibility Tests**: ARIA attributes, keyboard navigation
4. **Visual Tests**: All positions and alignments
5. **Mobile Tests**: Touch interactions, responsive behavior
6. **Performance Tests**: Frequent tooltip usage, memory leaks

## Development Priority
**High** - Essential component for providing contextual help and information

## Notes
- Built with modern shadcn/ui patterns for consistency
- Optimized for both simple and complex tooltip scenarios
- Full accessibility compliance with WCAG guidelines
- TypeScript support with comprehensive type safety
- Supports various content types and interactions
- Mobile-friendly with touch support
- Extensible architecture for custom requirements
