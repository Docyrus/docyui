# DocyCollapsible Component

## Overview
DocyCollapsible is an expandable/collapsible content component built on shadcn/ui patterns that provides smooth show/hide functionality for content sections. It supports custom triggers, animations, and accessibility features. It serves as the primary collapsible content component throughout the Docyrus React application.

## Component Specification

### Props
| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-----------|
| `children` | ReactNode | - | Yes | Collapsible content |
| `trigger` | ReactNode | - | Yes | Element that triggers collapse/expand |
| `open` | boolean | false | No | Controlled open state |
| `defaultOpen` | boolean | false | No | Default open state |
| `onOpenChange` | function | - | No | Callback when open state changes |
| `disabled` | boolean | false | No | Disable interactions |
| `animationDuration` | number | 200 | No | Animation duration in ms |
| `className` | string | - | No | Additional CSS classes |
| `triggerClassName` | string | - | No | Trigger CSS classes |
| `contentClassName` | string | - | No | Content CSS classes |
| `collapsedHeight` | number | 0 | No | Height when collapsed |
| `orientation` | string | 'vertical' | No | Collapse direction: 'vertical', 'horizontal' |

### Visual States
- **Collapsed**: Content hidden with smooth animation
- **Expanded**: Content visible with full height
- **Transitioning**: Smooth animation between states
- **Disabled**: Non-interactive state

### Animation Options
- **Height**: Vertical collapse/expand
- **Width**: Horizontal collapse/expand
- **Opacity**: Fade in/out effects
- **Scale**: Scale-based transitions

### Trigger Types
- **Button**: Clickable button element
- **Text**: Plain text trigger
- **Icon**: Icon-only trigger
- **Custom**: Any custom element

## Component Requirements

### Technical Specifications
- **Framework**: React with TypeScript
- **Base Component**: shadcn/ui Collapsible component (`pnpm dlx shadcn@latest add collapsible`)
- **Extensions**: Custom animations, orientations, and triggers
- **Styling**: shadcn/ui patterns with class-variance-authority
- **Accessibility**: Full ARIA support, keyboard navigation
- **Animation**: Smooth height/width transitions
- **Performance**: Optimized rendering and state management

### Key Features Required
1. **Smooth Animations**: Fluid expand/collapse transitions
2. **Custom Triggers**: Flexible trigger element support
3. **Controlled State**: Both controlled and uncontrolled modes
4. **Accessibility**: Screen reader support and keyboard navigation
5. **Orientation Options**: Vertical and horizontal collapse
6. **Disabled State**: Non-interactive mode
7. **Animation Control**: Configurable animation duration
8. **Performance**: Optimized for frequent state changes

### Advanced Features
- **Nested Collapsibles**: Collapsible content within collapsible sections
- **Partial Collapse**: Collapsed state with partial content visible
- **Loading States**: Async content loading during expansion
- **Gesture Support**: Touch gestures for mobile

### Usage Examples
```tsx
// Basic collapsible
<DocyCollapsible
  trigger={<DocyButton variant="outline">Show Details</DocyButton>}
>
  <div className="p-4 border rounded mt-2">
    <h3 className="font-semibold mb-2">Additional Information</h3>
    <p>This content can be shown or hidden using the trigger button.</p>
  </div>
</DocyCollapsible>

// FAQ collapsible
<DocyCollapsible
  trigger={
    <button className="flex items-center justify-between w-full p-4 text-left border rounded hover:bg-gray-50">
      <span className="font-medium">What is your refund policy?</span>
      <DocyIcon name="chevron-down" className="transition-transform" />
    </button>
  }
  triggerClassName="[data-state=open]>[data-icon]:rotate-180"
>
  <div className="p-4 border-t">
    <p>We offer a 30-day money-back guarantee for all purchases. Simply contact our support team to initiate a refund.</p>
  </div>
</DocyCollapsible>

// Controlled collapsible
<DocyCollapsible
  open={isExpanded}
  onOpenChange={setIsExpanded}
  trigger={
    <DocyButton variant="ghost">
      {isExpanded ? 'Hide' : 'Show'} Advanced Settings
    </DocyButton>
  }
>
  <div className="mt-4 p-4 bg-gray-50 rounded">
    <div className="space-y-4">
      <div>
        <DocyLabel htmlFor="timeout">Request Timeout</DocyLabel>
        <input id="timeout" type="number" className="w-full p-2 border rounded" />
      </div>
      <div>
        <DocyLabel htmlFor="retries">Max Retries</DocyLabel>
        <input id="retries" type="number" className="w-full p-2 border rounded" />
      </div>
      <DocySwitch label="Enable debug mode" />
    </div>
  </div>
</DocyCollapsible>

// Default open
<DocyCollapsible
  defaultOpen
  trigger={
    <h3 className="text-lg font-semibold cursor-pointer hover:text-blue-600">
      Project Overview
    </h3>
  }
>
  <div className="mt-2 text-gray-600">
    <p>This project aims to create a comprehensive document management system with real-time collaboration features.</p>
  </div>
</DocyCollapsible>

// Disabled collapsible
<DocyCollapsible
  disabled
  trigger={
    <DocyButton variant="outline" disabled>
      Premium Feature (Upgrade Required)
    </DocyButton>
  }
>
  <div className="p-4 border rounded mt-2">
    <p>This feature is available in our premium plans.</p>
  </div>
</DocyCollapsible>

// Custom animation duration
<DocyCollapsible
  animationDuration={500}
  trigger={
    <DocyButton variant="outline">
      Slow Animation
    </DocyButton>
  }
>
  <div className="p-4 mt-2 bg-blue-50 rounded">
    <p>This collapsible has a slower animation duration.</p>
  </div>
</DocyCollapsible>

// Horizontal collapsible
<DocyCollapsible
  orientation="horizontal"
  trigger={
    <DocyButton variant="outline" size="sm">
      <DocyIcon name="menu" />
    </DocyButton>
  }
  className="flex items-center gap-2"
>
  <nav className="flex gap-2">
    <DocyButton variant="ghost" size="sm">Home</DocyButton>
    <DocyButton variant="ghost" size="sm">About</DocyButton>
    <DocyButton variant="ghost" size="sm">Contact</DocyButton>
  </nav>
</DocyCollapsible>

// Sidebar collapsible
<DocyCollapsible
  trigger={
    <button className="flex items-center gap-2 p-2 w-full hover:bg-gray-100 rounded">
      <DocyIcon name="folder" />
      <span>Projects</span>
      <DocyIcon name="chevron-right" className="ml-auto transition-transform" />
    </button>
  }
  triggerClassName="[data-state=open]>[data-icon]:rotate-90"
>
  <div className="ml-6 mt-2 space-y-1">
    <a href="#" className="block p-2 text-sm hover:bg-gray-100 rounded">Web App</a>
    <a href="#" className="block p-2 text-sm hover:bg-gray-100 rounded">Mobile App</a>
    <a href="#" className="block p-2 text-sm hover:bg-gray-100 rounded">Desktop App</a>
  </div>
</DocyCollapsible>

// Code example collapsible
<DocyCollapsible
  trigger={
    <DocyButton variant="outline" size="sm" className="mb-2">
      <DocyIcon name="code" className="mr-2" />
      View Code Example
    </DocyButton>
  }
>
  <DocyCodeView language="typescript">
    {`function example() {
  console.log('Hello, World!');
  return 'Example function';
}`}
  </DocyCodeView>
</DocyCollapsible>

// Search filters collapsible
<DocyCollapsible
  trigger={
    <DocyButton variant="outline" className="mb-4">
      <DocyIcon name="filter" className="mr-2" />
      Advanced Filters
    </DocyButton>
  }
>
  <div className="space-y-4 p-4 border rounded">
    <div className="grid grid-cols-2 gap-4">
      <div>
        <DocyLabel htmlFor="dateFrom">Date From</DocyLabel>
        <input id="dateFrom" type="date" className="w-full p-2 border rounded" />
      </div>
      <div>
        <DocyLabel htmlFor="dateTo">Date To</DocyLabel>
        <input id="dateTo" type="date" className="w-full p-2 border rounded" />
      </div>
    </div>
    <div>
      <DocyLabel htmlFor="category">Category</DocyLabel>
      <select id="category" className="w-full p-2 border rounded">
        <option>All Categories</option>
        <option>Documents</option>
        <option>Images</option>
        <option>Videos</option>
      </select>
    </div>
    <div className="flex gap-2">
      <DocyButton variant="outline">Reset</DocyButton>
      <DocyButton>Apply Filters</DocyButton>
    </div>
  </div>
</DocyCollapsible>

// Nested collapsibles
<DocyCollapsible
  trigger={<h2 className="text-xl font-bold cursor-pointer">Documentation</h2>}
>
  <div className="ml-4 mt-2 space-y-2">
    <DocyCollapsible
      trigger={<h3 className="text-lg font-semibold cursor-pointer">Getting Started</h3>}
    >
      <div className="ml-4 mt-2 space-y-1">
        <a href="#" className="block text-blue-600 hover:underline">Installation</a>
        <a href="#" className="block text-blue-600 hover:underline">Quick Start</a>
        <a href="#" className="block text-blue-600 hover:underline">Configuration</a>
      </div>
    </DocyCollapsible>
    
    <DocyCollapsible
      trigger={<h3 className="text-lg font-semibold cursor-pointer">API Reference</h3>}
    >
      <div className="ml-4 mt-2 space-y-1">
        <a href="#" className="block text-blue-600 hover:underline">Components</a>
        <a href="#" className="block text-blue-600 hover:underline">Hooks</a>
        <a href="#" className="block text-blue-600 hover:underline">Utilities</a>
      </div>
    </DocyCollapsible>
  </div>
</DocyCollapsible>
```

### Integration Requirements
- **DocyButton**: Trigger buttons and controls
- **DocyIcon**: Expand/collapse indicators
- **DocyLabel**: Form labels within content
- **DocySwitch**: Toggle controls within content
- **DocyCodeView**: Code examples within content
- **Animation Library**: Smooth transitions

### Accessibility Requirements
- **ARIA Attributes**: button, region, expanded, controls
- **Keyboard Navigation**: Enter, Space, Tab
- **Screen Reader Support**: Proper announcements
- **Focus Management**: Logical focus flow
- **Semantic HTML**: Proper content structure

### Animation Implementation
```css
/* CSS for smooth height transitions */
.collapsible-content {
  overflow: hidden;
  transition: height 200ms ease-out;
}

.collapsible-content[data-state="closed"] {
  height: 0;
}

.collapsible-content[data-state="open"] {
  height: var(--collapsible-height);
}
```

### Performance Optimization
- **Lazy Rendering**: Render content only when needed
- **Height Calculation**: Efficient height measurements
- **Memory Management**: Proper cleanup of animations
- **Throttled Updates**: Optimize frequent state changes

### Testing Requirements
1. **Unit Tests**: Open/close behavior, animation timing
2. **Integration Tests**: Trigger interactions, content rendering
3. **Accessibility Tests**: ARIA attributes, keyboard navigation
4. **Visual Tests**: Animation smoothness, responsive behavior
5. **Performance Tests**: Frequent state changes, memory usage
6. **Mobile Tests**: Touch interactions, responsive design

## Development Priority
**Medium** - Useful component for space-efficient content organization

## Notes
- Built with modern shadcn/ui patterns for consistency
- Optimized for both simple and complex collapsible scenarios
- Full accessibility compliance with WCAG guidelines
- TypeScript support with comprehensive type safety
- Smooth animations provide excellent user experience
- Flexible trigger system supports various use cases
- Extensible architecture for custom requirements
