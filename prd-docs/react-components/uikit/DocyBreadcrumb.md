# DocyBreadcrumb Component

## Overview
DocyBreadcrumb is a navigation component built on shadcn/ui patterns that displays hierarchical navigation paths. It supports various separators, truncation, and accessibility features. It serves as the primary navigation trail component throughout the Docyrus React application.

## Component Specification

### Props
| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-----------|
| `items` | array | [] | Yes | Breadcrumb items array |
| `separator` | ReactNode | '/' | No | Separator between items |
| `maxItems` | number | - | No | Maximum items to display |
| `showRoot` | boolean | true | No | Show root item |
| `truncate` | boolean | false | No | Enable truncation for long paths |
| `collapsedText` | string | '...' | No | Text for collapsed items |
| `className` | string | - | No | Additional CSS classes |
| `itemClassName` | string | - | No | Item CSS classes |
| `separatorClassName` | string | - | No | Separator CSS classes |
| `linkClassName` | string | - | No | Link CSS classes |
| `currentClassName` | string | - | No | Current item CSS classes |

### Breadcrumb Item Structure
```typescript
interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: string;
  current?: boolean;
  disabled?: boolean;
  onClick?: (item: BreadcrumbItem) => void;
}
```

### Visual Elements
- **Items**: Clickable navigation links
- **Separators**: Visual dividers between items
- **Current Item**: Non-clickable current location
- **Truncation**: Collapsed middle items for long paths
- **Icons**: Optional icons for items

### Truncation Behavior
- Shows first item (root)
- Shows last few items (current and parents)
- Collapses middle items with ellipsis
- Expandable on click/hover

## Component Requirements

### Technical Specifications
- **Framework**: React with TypeScript
- **Base Component**: shadcn/ui Breadcrumb component (`pnpm dlx shadcn@latest add breadcrumb`)
- **Extensions**: Truncation, icons, custom separators
- **Styling**: shadcn/ui patterns with class-variance-authority
- **Accessibility**: Full ARIA support, keyboard navigation
- **Router Integration**: Support for React Router and Next.js
- **Performance**: Optimized rendering for long paths

### Key Features Required
1. **Hierarchical Navigation**: Display navigation path structure
2. **Clickable Items**: Navigate to parent paths
3. **Current Item**: Visual indicator for current location
4. **Truncation**: Handle long navigation paths
5. **Custom Separators**: Flexible separator options
6. **Icon Support**: Icons for breadcrumb items
7. **Accessibility**: Screen reader support and keyboard navigation
8. **Router Integration**: Seamless navigation with routing libraries

### Advanced Features
- **Dropdown Navigation**: Click collapsed items to show menu
- **Keyboard Shortcuts**: Quick navigation with shortcuts
- **Contextual Actions**: Actions on breadcrumb items
- **Dynamic Loading**: Async breadcrumb item loading

### Usage Examples
```tsx
// Basic breadcrumb
<DocyBreadcrumb
  items={[
    { label: 'Home', href: '/' },
    { label: 'Projects', href: '/projects' },
    { label: 'Web App', href: '/projects/web-app' },
    { label: 'Settings', current: true }
  ]}
/>

// With icons
<DocyBreadcrumb
  items={[
    { label: 'Home', href: '/', icon: 'home' },
    { label: 'Documents', href: '/documents', icon: 'folder' },
    { label: 'Reports', href: '/documents/reports', icon: 'file-text' },
    { label: 'Monthly Report', current: true, icon: 'file' }
  ]}
/>

// Custom separator
<DocyBreadcrumb
  separator={<DocyIcon name="chevron-right" size={16} />}
  items={[
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Analytics', href: '/analytics' },
    { label: 'Performance', current: true }
  ]}
/>

// Truncated breadcrumb
<DocyBreadcrumb
  maxItems={4}
  truncate
  items={[
    { label: 'Root', href: '/' },
    { label: 'Level 1', href: '/level1' },
    { label: 'Level 2', href: '/level1/level2' },
    { label: 'Level 3', href: '/level1/level2/level3' },
    { label: 'Level 4', href: '/level1/level2/level3/level4' },
    { label: 'Current', current: true }
  ]}
/>

// Without root
<DocyBreadcrumb
  showRoot={false}
  items={[
    { label: 'Home', href: '/' },
    { label: 'Settings', href: '/settings' },
    { label: 'Profile', current: true }
  ]}
/>

// With click handlers
<DocyBreadcrumb
  items={[
    {
      label: 'Projects',
      href: '/projects',
      onClick: (item) => {
        console.log('Clicked:', item.label);
        // Custom navigation logic
      }
    },
    {
      label: 'Current Project',
      current: true
    }
  ]}
/>

// Disabled items
<DocyBreadcrumb
  items={[
    { label: 'Home', href: '/' },
    { label: 'Restricted', disabled: true },
    { label: 'Current', current: true }
  ]}
/>

// Custom styling
<DocyBreadcrumb
  className="bg-gray-50 p-2 rounded"
  itemClassName="text-blue-600 hover:text-blue-800"
  separatorClassName="text-gray-400"
  currentClassName="font-semibold text-gray-900"
  items={breadcrumbItems}
/>

// Dynamic breadcrumb from route
const routeToBreadcrumb = (pathname: string) => {
  const segments = pathname.split('/').filter(Boolean);
  return segments.map((segment, index) => {
    const href = '/' + segments.slice(0, index + 1).join('/');
    const isLast = index === segments.length - 1;
    
    return {
      label: segment.charAt(0).toUpperCase() + segment.slice(1),
      href: isLast ? undefined : href,
      current: isLast
    };
  });
};

<DocyBreadcrumb items={routeToBreadcrumb(location.pathname)} />

// File system breadcrumb
<DocyBreadcrumb
  separator={<DocyIcon name="folder" size={12} />}
  items={[
    { label: 'Documents', href: '/documents', icon: 'hard-drive' },
    { label: 'Projects', href: '/documents/projects', icon: 'folder' },
    { label: 'Web App', href: '/documents/projects/web-app', icon: 'folder' },
    { label: 'src', href: '/documents/projects/web-app/src', icon: 'folder' },
    { label: 'components', current: true, icon: 'folder' }
  ]}
/>

// E-commerce breadcrumb
<DocyBreadcrumb
  items={[
    { label: 'Store', href: '/store', icon: 'store' },
    { label: 'Electronics', href: '/store/electronics', icon: 'zap' },
    { label: 'Computers', href: '/store/electronics/computers', icon: 'monitor' },
    { label: 'Laptops', href: '/store/electronics/computers/laptops', icon: 'laptop' },
    { label: 'MacBook Pro', current: true, icon: 'laptop' }
  ]}
/>
```

### Integration Requirements
- **DocyIcon**: Icons for items and separators
- **Router Library**: React Router or Next.js integration
- **DocyDropdown**: Dropdown menu for truncated items
- **Theme System**: Consistent styling and theming

### Router Integration
```tsx
// React Router integration
import { Link } from 'react-router-dom';

function AppBreadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <DocyBreadcrumb
      items={items}
      renderItem={(item) => {
        if (item.current) {
          return <span className="text-gray-900">{item.label}</span>;
        }
        return (
          <Link to={item.href} className="text-blue-600 hover:text-blue-800">
            {item.label}
          </Link>
        );
      }}
    />
  );
}

// Next.js integration
import Link from 'next/link';

function AppBreadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <DocyBreadcrumb
      items={items}
      renderItem={(item) => {
        if (item.current) {
          return <span>{item.label}</span>;
        }
        return (
          <Link href={item.href}>
            <a className="text-blue-600 hover:text-blue-800">{item.label}</a>
          </Link>
        );
      }}
    />
  );
}
```

### Accessibility Requirements
- **ARIA Attributes**: navigation, breadcrumb, current page
- **Keyboard Navigation**: Tab, Enter key support
- **Screen Reader Support**: Proper navigation structure
- **Focus Management**: Clear focus indicators
- **Semantic HTML**: Proper navigation landmarks

### Truncation Algorithm
```typescript
function truncateItems(items: BreadcrumbItem[], maxItems: number) {
  if (items.length <= maxItems) return items;
  
  const result = [];
  const firstItem = items[0];
  const lastItems = items.slice(-maxItems + 2);
  
  result.push(firstItem);
  
  if (items.length > maxItems) {
    result.push({
      label: '...',
      collapsed: true,
      items: items.slice(1, -maxItems + 2)
    });
  }
  
  result.push(...lastItems);
  
  return result;
}
```

### Performance Optimization
- **Memoization**: Optimize breadcrumb generation
- **Lazy Loading**: Load breadcrumb data on demand
- **Efficient Rendering**: Minimize re-renders
- **Route Caching**: Cache breadcrumb paths

### Testing Requirements
1. **Unit Tests**: Item rendering, truncation, navigation
2. **Integration Tests**: Router integration, event handling
3. **Accessibility Tests**: ARIA attributes, keyboard navigation
4. **Visual Tests**: All variants and states
5. **Performance Tests**: Long paths, frequent updates
6. **Mobile Tests**: Touch interactions, responsive behavior

## Development Priority
**Medium** - Useful component for navigation context and user orientation

## Notes
- Built with modern shadcn/ui patterns for consistency
- Optimized for both simple and complex navigation scenarios
- Full accessibility compliance with WCAG guidelines
- TypeScript support with comprehensive type safety
- Supports various navigation patterns and use cases
- Integrates seamlessly with popular routing libraries
- Extensible architecture for custom requirements
