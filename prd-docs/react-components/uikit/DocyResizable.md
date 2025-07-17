# DocyResizable Component

## Overview
DocyResizable is a resizable panel component built on shadcn/ui patterns that provides drag-to-resize functionality for layout panels. It supports various orientations, constraints, and handle styles. It serves as the primary resizable layout component throughout the Docyrus React application.

## Component Specification

### Props
| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-----------|
| `children` | ReactNode | - | Yes | Resizable content |
| `orientation` | string | 'horizontal' | No | Resize orientation: 'horizontal', 'vertical' |
| `defaultSize` | number | 50 | No | Default size percentage |
| `minSize` | number | 10 | No | Minimum size percentage |
| `maxSize` | number | 90 | No | Maximum size percentage |
| `disabled` | boolean | false | No | Disable resizing |
| `collapsible` | boolean | false | No | Enable collapse/expand |
| `collapsed` | boolean | false | No | Collapsed state |
| `onCollapse` | function | - | No | Collapse callback |
| `onResize` | function | - | No | Resize callback |
| `className` | string | - | No | Additional CSS classes |
| `handleClassName` | string | - | No | Handle CSS classes |
| `resizerClassName` | string | - | No | Resizer CSS classes |
| `storageKey` | string | - | No | localStorage key for persistence |

### Panel Group Props
| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-----------|
| `children` | ReactNode | - | Yes | Panel components |
| `direction` | string | 'horizontal' | No | Layout direction: 'horizontal', 'vertical' |
| `className` | string | - | No | Additional CSS classes |
| `autoSaveId` | string | - | No | Auto-save layout ID |

### Panel Props
| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-----------|
| `children` | ReactNode | - | Yes | Panel content |
| `defaultSize` | number | - | No | Default size percentage |
| `minSize` | number | 0 | No | Minimum size percentage |
| `maxSize` | number | 100 | No | Maximum size percentage |
| `collapsible` | boolean | false | No | Enable collapse |
| `collapsed` | boolean | false | No | Collapsed state |
| `onCollapse` | function | - | No | Collapse callback |
| `onResize` | function | - | No | Resize callback |
| `className` | string | - | No | Additional CSS classes |
| `id` | string | - | No | Panel identifier |

### Resize Handle Props
| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-----------|
| `disabled` | boolean | false | No | Disable handle |
| `className` | string | - | No | Additional CSS classes |
| `withHandle` | boolean | false | No | Show handle indicator |
| `handleClassName` | string | - | No | Handle indicator CSS classes |

## Component Requirements

### Technical Specifications
- **Framework**: React with TypeScript
- **Base Component**: shadcn/ui Resizable (`pnpm dlx shadcn@latest add resizable`)
- **Extensions**: Collapse functionality, persistence, constraints
- **Styling**: shadcn/ui patterns with class-variance-authority
- **Accessibility**: Full ARIA support, keyboard navigation
- **Performance**: Optimized dragging and resizing
- **Persistence**: localStorage support for layout state

### Key Features Required
1. **Drag to Resize**: Smooth dragging interactions
2. **Size Constraints**: Minimum and maximum size limits
3. **Collapse/Expand**: Panel collapse functionality
4. **Persistence**: Save layout state to localStorage
5. **Keyboard Navigation**: Keyboard resize support
6. **Accessibility**: Screen reader support and ARIA compliance
7. **Responsive**: Mobile-friendly interactions
8. **Multiple Orientations**: Horizontal and vertical layouts

### Usage Examples
```tsx
// Basic horizontal resizable
<DocyResizable orientation="horizontal">
  <DocyPanel defaultSize={30} minSize={20} maxSize={50}>
    <div className="p-4 bg-gray-50 h-full">
      <h3 className="font-semibold mb-2">Left Panel</h3>
      <p>Resizable left panel content</p>
    </div>
  </DocyPanel>
  <DocyResizeHandle />
  <DocyPanel defaultSize={70}>
    <div className="p-4 h-full">
      <h3 className="font-semibold mb-2">Right Panel</h3>
      <p>Main content area</p>
    </div>
  </DocyPanel>
</DocyResizable>

// Vertical resizable panels
<DocyResizable orientation="vertical" className="h-96">
  <DocyPanel defaultSize={40} minSize={30}>
    <div className="p-4 bg-blue-50 h-full">
      <h3 className="font-semibold mb-2">Top Panel</h3>
      <p>Content in the top panel</p>
    </div>
  </DocyPanel>
  <DocyResizeHandle />
  <DocyPanel defaultSize={60}>
    <div className="p-4 h-full">
      <h3 className="font-semibold mb-2">Bottom Panel</h3>
      <p>Content in the bottom panel</p>
    </div>
  </DocyPanel>
</DocyResizable>

// Three-panel layout
<DocyResizable orientation="horizontal" className="h-96">
  <DocyPanel defaultSize={25} minSize={15} maxSize={40}>
    <div className="p-4 bg-gray-50 h-full">
      <h3 className="font-semibold mb-2">Sidebar</h3>
      <nav>
        <ul className="space-y-2">
          <li><a href="#" className="text-blue-600">Navigation 1</a></li>
          <li><a href="#" className="text-blue-600">Navigation 2</a></li>
          <li><a href="#" className="text-blue-600">Navigation 3</a></li>
        </ul>
      </nav>
    </div>
  </DocyPanel>
  <DocyResizeHandle />
  <DocyPanel defaultSize={50}>
    <div className="p-4 h-full">
      <h3 className="font-semibold mb-2">Main Content</h3>
      <p>Main application content goes here</p>
    </div>
  </DocyPanel>
  <DocyResizeHandle />
  <DocyPanel defaultSize={25} minSize={20} maxSize={35}>
    <div className="p-4 bg-gray-50 h-full">
      <h3 className="font-semibold mb-2">Details</h3>
      <p>Additional details and information</p>
    </div>
  </DocyPanel>
</DocyResizable>

// Collapsible panels
<DocyResizable orientation="horizontal" className="h-96">
  <DocyPanel 
    defaultSize={30} 
    minSize={20} 
    maxSize={50}
    collapsible
    collapsed={leftCollapsed}
    onCollapse={setLeftCollapsed}
  >
    <div className="p-4 bg-gray-50 h-full">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold">Left Panel</h3>
        <DocyButton 
          variant="ghost" 
          size="sm"
          onClick={() => setLeftCollapsed(!leftCollapsed)}
        >
          {leftCollapsed ? <DocyIcon name="chevron-right" /> : <DocyIcon name="chevron-left" />}
        </DocyButton>
      </div>
      {!leftCollapsed && (
        <p>Collapsible panel content</p>
      )}
    </div>
  </DocyPanel>
  <DocyResizeHandle />
  <DocyPanel defaultSize={70}>
    <div className="p-4 h-full">
      <h3 className="font-semibold mb-2">Main Content</h3>
      <p>Main content area</p>
    </div>
  </DocyPanel>
</DocyResizable>

// Code editor layout
<DocyResizable orientation="horizontal" className="h-96 border rounded">
  <DocyPanel defaultSize={20} minSize={15} maxSize={30}>
    <div className="p-2 bg-gray-50 h-full">
      <h4 className="font-semibold mb-2 text-sm">File Explorer</h4>
      <div className="text-sm">
        <div className="p-1 hover:bg-gray-100 rounded cursor-pointer">
          📁 src/
        </div>
        <div className="p-1 hover:bg-gray-100 rounded cursor-pointer ml-2">
          📄 index.js
        </div>
        <div className="p-1 hover:bg-gray-100 rounded cursor-pointer ml-2">
          📄 App.js
        </div>
      </div>
    </div>
  </DocyPanel>
  <DocyResizeHandle />
  <DocyPanel defaultSize={60}>
    <div className="h-full">
      <DocyResizable orientation="vertical">
        <DocyPanel defaultSize={70}>
          <div className="p-4 h-full">
            <h4 className="font-semibold mb-2 text-sm">Editor</h4>
            <DocyCodeView language="javascript">
              {`function App() {
  return (
    <div className="App">
      <h1>Hello World</h1>
    </div>
  );
}`}
            </DocyCodeView>
          </div>
        </DocyPanel>
        <DocyResizeHandle />
        <DocyPanel defaultSize={30} minSize={20}>
          <div className="p-4 h-full bg-gray-50">
            <h4 className="font-semibold mb-2 text-sm">Terminal</h4>
            <div className="text-sm font-mono">
              <div>$ npm start</div>
              <div className="text-green-600">Server running on port 3000</div>
            </div>
          </div>
        </DocyPanel>
      </DocyResizable>
    </div>
  </DocyPanel>
  <DocyResizeHandle />
  <DocyPanel defaultSize={20} minSize={15} maxSize={30}>
    <div className="p-2 bg-gray-50 h-full">
      <h4 className="font-semibold mb-2 text-sm">Properties</h4>
      <div className="text-sm space-y-2">
        <div>
          <label className="block font-medium">Width:</label>
          <input type="number" className="w-full p-1 border rounded" />
        </div>
        <div>
          <label className="block font-medium">Height:</label>
          <input type="number" className="w-full p-1 border rounded" />
        </div>
      </div>
    </div>
  </DocyPanel>
</DocyResizable>

// Dashboard layout
<DocyResizable orientation="vertical" className="h-96">
  <DocyPanel defaultSize={15} minSize={10} maxSize={25}>
    <div className="p-4 bg-blue-50 h-full">
      <h3 className="font-semibold mb-2">Header</h3>
      <div className="flex items-center gap-4">
        <DocyButton size="sm">Dashboard</DocyButton>
        <DocyButton size="sm" variant="outline">Analytics</DocyButton>
        <DocyButton size="sm" variant="outline">Settings</DocyButton>
      </div>
    </div>
  </DocyPanel>
  <DocyResizeHandle />
  <DocyPanel defaultSize={85}>
    <DocyResizable orientation="horizontal" className="h-full">
      <DocyPanel defaultSize={75}>
        <div className="p-4 h-full">
          <h3 className="font-semibold mb-4">Main Dashboard</h3>
          <div className="grid grid-cols-2 gap-4">
            <DocyCard className="p-4">
              <h4 className="font-medium">Metric 1</h4>
              <p className="text-2xl font-bold">1,234</p>
            </DocyCard>
            <DocyCard className="p-4">
              <h4 className="font-medium">Metric 2</h4>
              <p className="text-2xl font-bold">5,678</p>
            </DocyCard>
          </div>
        </div>
      </DocyPanel>
      <DocyResizeHandle />
      <DocyPanel defaultSize={25} minSize={20} maxSize={35}>
        <div className="p-4 bg-gray-50 h-full">
          <h3 className="font-semibold mb-2">Activity</h3>
          <div className="space-y-2 text-sm">
            <div className="p-2 bg-white rounded">
              <div className="font-medium">New user registered</div>
              <div className="text-gray-600">2 minutes ago</div>
            </div>
            <div className="p-2 bg-white rounded">
              <div className="font-medium">Order completed</div>
              <div className="text-gray-600">5 minutes ago</div>
            </div>
          </div>
        </div>
      </DocyPanel>
    </DocyResizable>
  </DocyPanel>
</DocyResizable>

// Persistent layout
<DocyResizable 
  orientation="horizontal" 
  className="h-96"
  storageKey="my-layout"
>
  <DocyPanel defaultSize={30} minSize={20} maxSize={50}>
    <div className="p-4 bg-gray-50 h-full">
      <h3 className="font-semibold mb-2">Persistent Panel</h3>
      <p>This panel size will be remembered</p>
    </div>
  </DocyPanel>
  <DocyResizeHandle />
  <DocyPanel defaultSize={70}>
    <div className="p-4 h-full">
      <h3 className="font-semibold mb-2">Main Content</h3>
      <p>Resize and refresh to see persistence</p>
    </div>
  </DocyPanel>
</DocyResizable>

// Custom handle styling
<DocyResizable orientation="horizontal" className="h-96">
  <DocyPanel defaultSize={50}>
    <div className="p-4 h-full">
      <h3 className="font-semibold mb-2">Left Panel</h3>
      <p>Custom styled resize handle</p>
    </div>
  </DocyPanel>
  <DocyResizeHandle 
    withHandle
    className="bg-blue-500 hover:bg-blue-600 transition-colors"
    handleClassName="bg-white rounded-full"
  />
  <DocyPanel defaultSize={50}>
    <div className="p-4 h-full">
      <h3 className="font-semibold mb-2">Right Panel</h3>
      <p>Content in the right panel</p>
    </div>
  </DocyPanel>
</DocyResizable>

// Disabled resizing
<DocyResizable orientation="horizontal" className="h-96">
  <DocyPanel defaultSize={30}>
    <div className="p-4 bg-gray-50 h-full">
      <h3 className="font-semibold mb-2">Fixed Panel</h3>
      <p>This panel cannot be resized</p>
    </div>
  </DocyPanel>
  <DocyResizeHandle disabled />
  <DocyPanel defaultSize={70}>
    <div className="p-4 h-full">
      <h3 className="font-semibold mb-2">Main Content</h3>
      <p>Main content area</p>
    </div>
  </DocyPanel>
</DocyResizable>
```

### Integration Requirements
- **DocyButton**: Panel controls and actions
- **DocyIcon**: Collapse/expand indicators
- **DocyCard**: Panel content organization
- **DocyCodeView**: Code editor integration
- **Storage**: localStorage for persistence
- **Touch**: Mobile touch support

### Accessibility Requirements
- **ARIA Attributes**: separator, orientation, valuenow
- **Keyboard Navigation**: Arrow keys, Enter, Space
- **Screen Reader Support**: Resize announcements
- **Focus Management**: Focus indicators on handles
- **Reduced Motion**: Respect user preferences

### Performance Optimization
- **Efficient Dragging**: Optimized drag performance
- **Debounced Events**: Throttled resize callbacks
- **Memory Management**: Proper event cleanup
- **Smooth Animations**: GPU-accelerated transitions

### Testing Requirements
1. **Unit Tests**: Panel resizing, constraints, collapse
2. **Integration Tests**: Complex layouts, persistence
3. **Accessibility Tests**: ARIA attributes, keyboard navigation
4. **Visual Tests**: All orientations and configurations
5. **Performance Tests**: Smooth dragging, memory usage
6. **Mobile Tests**: Touch interactions, responsive behavior

## Development Priority
**Medium** - Useful for complex layouts and dashboard interfaces

## Notes
- Built with modern shadcn/ui patterns for consistency
- Optimized for complex layout scenarios
- Full accessibility compliance with WCAG guidelines
- TypeScript support with comprehensive type safety
- Supports nested resizable layouts
- Persistence for user preferences
- Extensible for custom layout requirements
