# DocySidebar Component

## Overview
DocySidebar is a comprehensive sidebar component built on shadcn/ui patterns that provides application navigation and layout structure. It supports collapsible states, multiple variants, nested navigation, and responsive behavior. It serves as the primary application sidebar throughout the Docyrus React application.

## Component Specification

### Props
| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-----------|
| `children` | ReactNode | - | No | Sidebar content |
| `variant` | string | 'default' | No | Sidebar variant: 'default', 'floating', 'inset' |
| `side` | string | 'left' | No | Sidebar side: 'left', 'right' |
| `collapsible` | boolean | true | No | Enable collapse functionality |
| `collapsed` | boolean | false | No | Collapsed state |
| `onCollapsedChange` | function | - | No | Callback when collapsed state changes |
| `width` | string | '16rem' | No | Sidebar width when expanded |
| `collapsedWidth` | string | '3rem' | No | Sidebar width when collapsed |
| `header` | ReactNode | - | No | Sidebar header content |
| `footer` | ReactNode | - | No | Sidebar footer content |
| `className` | string | - | No | Additional CSS classes |
| `contentClassName` | string | - | No | Content area CSS classes |
| `overlayOnMobile` | boolean | true | No | Show as overlay on mobile |
| `closeOnMobile` | boolean | true | No | Auto-close on mobile navigation |

### Sidebar Structure
- **Header**: Logo, brand, or title area
- **Navigation**: Menu items and links
- **Content**: Main sidebar content area
- **Footer**: User info or additional actions

### Variants
1. **default**: Standard sidebar with border
2. **floating**: Floating sidebar with shadow
3. **inset**: Inset sidebar with background

### Responsive Behavior
- **Desktop**: Fixed sidebar with collapse functionality
- **Tablet**: Collapsible sidebar with overlay option
- **Mobile**: Overlay sidebar with backdrop dismissal

### Navigation Integration
```typescript
interface SidebarItem {
  id: string;
  label: string;
  icon?: string;
  href?: string;
  badge?: string | number;
  children?: SidebarItem[];
  active?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}
```

## Component Requirements

### Technical Specifications
- **Framework**: React with TypeScript
- **Base Component**: shadcn/ui Sidebar component (`pnpm dlx shadcn@latest add sidebar`)
- **Extensions**: Navigation items, collapse functionality, responsive behavior
- **Styling**: shadcn/ui patterns with class-variance-authority
- **Accessibility**: Full ARIA support, keyboard navigation
- **Animation**: Smooth collapse/expand transitions
- **Performance**: Optimized rendering and state management

### Key Features Required
1. **Collapsible Design**: Smooth expand/collapse functionality
2. **Responsive Layout**: Adaptive behavior across screen sizes
3. **Navigation Support**: Hierarchical menu structure
4. **Multiple Variants**: Different styling options
5. **Keyboard Navigation**: Full accessibility support
6. **State Management**: Persistent collapse state
7. **Mobile Optimization**: Overlay behavior on mobile
8. **Customizable Layout**: Flexible content organization

### Advanced Features
- **Nested Navigation**: Multi-level menu support
- **Search Integration**: Built-in search functionality
- **Tooltip Support**: Collapsed state tooltips
- **Breadcrumb Integration**: Navigation context
- **Theme Switching**: Built-in theme controls

### Usage Examples
```tsx
// Basic sidebar
<DocySidebar>
  <nav className="p-4">
    <ul className="space-y-2">
      <li><a href="/dashboard" className="block p-2 rounded hover:bg-gray-100">Dashboard</a></li>
      <li><a href="/projects" className="block p-2 rounded hover:bg-gray-100">Projects</a></li>
      <li><a href="/settings" className="block p-2 rounded hover:bg-gray-100">Settings</a></li>
    </ul>
  </nav>
</DocySidebar>

// With header and footer
<DocySidebar
  header={
    <div className="p-4 border-b">
      <img src="/logo.png" alt="Logo" className="h-8" />
    </div>
  }
  footer={
    <div className="p-4 border-t">
      <DocyUserDisplay user={currentUser} />
    </div>
  }
>
  <nav className="p-4">
    <SidebarNavigation items={navigationItems} />
  </nav>
</DocySidebar>

// Collapsible sidebar
<DocySidebar
  collapsible={true}
  collapsed={isCollapsed}
  onCollapsedChange={setIsCollapsed}
  width="20rem"
  collapsedWidth="4rem"
>
  <nav className="p-4">
    <SidebarNavigation items={navigationItems} collapsed={isCollapsed} />
  </nav>
</DocySidebar>

// Different variants
<DocySidebar variant="floating">
  <nav className="p-4">
    <SidebarNavigation items={navigationItems} />
  </nav>
</DocySidebar>

<DocySidebar variant="inset">
  <nav className="p-4">
    <SidebarNavigation items={navigationItems} />
  </nav>
</DocySidebar>

// Right-side sidebar
<DocySidebar side="right">
  <div className="p-4">
    <h3 className="font-medium mb-4">Quick Actions</h3>
    <div className="space-y-2">
      <DocyButton variant="outline" className="w-full">New Project</DocyButton>
      <DocyButton variant="outline" className="w-full">Import Data</DocyButton>
      <DocyButton variant="outline" className="w-full">Export Data</DocyButton>
    </div>
  </div>
</DocySidebar>

// Navigation with icons and badges
<DocySidebar>
  <nav className="p-4">
    <ul className="space-y-1">
      <li>
        <a href="/dashboard" className="flex items-center gap-3 p-2 rounded hover:bg-gray-100">
          <DocyIcon name="home" size={16} />
          <span>Dashboard</span>
        </a>
      </li>
      <li>
        <a href="/messages" className="flex items-center gap-3 p-2 rounded hover:bg-gray-100">
          <DocyIcon name="mail" size={16} />
          <span>Messages</span>
          <DocyBadge variant="destructive" className="ml-auto">3</DocyBadge>
        </a>
      </li>
      <li>
        <a href="/projects" className="flex items-center gap-3 p-2 rounded hover:bg-gray-100">
          <DocyIcon name="folder" size={16} />
          <span>Projects</span>
        </a>
      </li>
    </ul>
  </nav>
</DocySidebar>

// Nested navigation
<DocySidebar>
  <nav className="p-4">
    <ul className="space-y-1">
      <li>
        <details className="group">
          <summary className="flex items-center gap-3 p-2 rounded hover:bg-gray-100 cursor-pointer">
            <DocyIcon name="folder" size={16} />
            <span>Projects</span>
            <DocyIcon name="chevron-down" size={16} className="ml-auto group-open:rotate-180" />
          </summary>
          <ul className="ml-6 mt-2 space-y-1">
            <li><a href="/projects/web" className="block p-2 rounded hover:bg-gray-100">Web Apps</a></li>
            <li><a href="/projects/mobile" className="block p-2 rounded hover:bg-gray-100">Mobile Apps</a></li>
            <li><a href="/projects/api" className="block p-2 rounded hover:bg-gray-100">APIs</a></li>
          </ul>
        </details>
      </li>
    </ul>
  </nav>
</DocySidebar>

// Mobile responsive
<DocySidebar
  overlayOnMobile={true}
  closeOnMobile={true}
  className="md:relative md:block"
>
  <nav className="p-4">
    <SidebarNavigation items={navigationItems} />
  </nav>
</DocySidebar>

// With search
<DocySidebar
  header={
    <div className="p-4 border-b">
      <input
        type="search"
        placeholder="Search..."
        className="w-full p-2 border rounded"
      />
    </div>
  }
>
  <nav className="p-4">
    <SidebarNavigation items={filteredItems} />
  </nav>
</DocySidebar>

// With custom content
<DocySidebar>
  <div className="p-4">
    <h3 className="font-medium mb-4">Recent Files</h3>
    <ul className="space-y-2">
      {recentFiles.map((file) => (
        <li key={file.id} className="flex items-center gap-2">
          <DocyIcon name="file" size={16} />
          <span className="text-sm truncate">{file.name}</span>
        </li>
      ))}
    </ul>
  </div>
</DocySidebar>
```

### Integration Requirements
- **DocyIcon**: Navigation icons and indicators
- **DocyButton**: Action buttons and toggles
- **DocyBadge**: Notification badges
- **DocyUserDisplay**: User information display
- **DocyTooltip**: Collapsed state tooltips
- **Router Library**: Navigation integration
- **State Management**: Persistent sidebar state

### Accessibility Requirements
- **ARIA Attributes**: navigation, menu, menuitem roles
- **Keyboard Navigation**: Arrow keys, Enter, Tab
- **Screen Reader Support**: Proper structure and labels
- **Focus Management**: Logical focus flow
- **Landmark Roles**: Proper navigation landmarks

### Responsive Design
- **Desktop**: Fixed sidebar with collapse
- **Tablet**: Collapsible with overlay option
- **Mobile**: Overlay with backdrop dismissal
- **Touch Targets**: Appropriate sizes for touch

### State Management
```tsx
// Persistent collapse state
import { useState, useEffect } from 'react';

function useSidebarState() {
  const [collapsed, setCollapsed] = useState(() => {
    const stored = localStorage.getItem('sidebar-collapsed');
    return stored ? JSON.parse(stored) : false;
  });

  useEffect(() => {
    localStorage.setItem('sidebar-collapsed', JSON.stringify(collapsed));
  }, [collapsed]);

  return [collapsed, setCollapsed];
}
```

### Testing Requirements
1. **Unit Tests**: Collapse functionality, navigation rendering
2. **Integration Tests**: Router integration, state persistence
3. **Accessibility Tests**: ARIA attributes, keyboard navigation
4. **Visual Tests**: All variants and responsive states
5. **Mobile Tests**: Touch interactions, overlay behavior
6. **Performance Tests**: Smooth animations, efficient rendering

## Development Priority
**High** - Essential component for application layout and navigation

## Notes
- Built with modern shadcn/ui patterns for consistency
- Optimized for both desktop and mobile experiences
- Full accessibility compliance with WCAG guidelines
- TypeScript support with comprehensive type safety
- Flexible architecture supports various navigation patterns
- Integrates seamlessly with routing and state management
- Persistent state management for user preferences
