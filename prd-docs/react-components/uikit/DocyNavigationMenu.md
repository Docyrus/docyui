# DocyNavigationMenu Component

## Overview
DocyNavigationMenu is a comprehensive navigation component built on shadcn/ui patterns that provides hierarchical menu navigation with support for dropdowns, mega menus, and responsive behavior. It supports keyboard navigation, accessibility features, and flexible styling. It serves as the primary site navigation component throughout the Docyrus React application.

## Component Specification

### Props
| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-----------|
| `items` | array | [] | Yes | Navigation menu items |
| `orientation` | string | 'horizontal' | No | Menu orientation: 'horizontal', 'vertical' |
| `variant` | string | 'default' | No | Menu style: 'default', 'pills', 'underline' |
| `size` | string | 'default' | No | Menu size: 'sm', 'default', 'lg' |
| `defaultValue` | string | - | No | Default active item |
| `value` | string | - | No | Controlled active item |
| `onValueChange` | function | - | No | Callback when active item changes |
| `className` | string | - | No | Additional CSS classes |
| `itemClassName` | string | - | No | Item CSS classes |
| `activeClassName` | string | - | No | Active item CSS classes |
| `dropdownClassName` | string | - | No | Dropdown CSS classes |
| `logo` | ReactNode | - | No | Brand logo element |
| `actions` | ReactNode | - | No | Action buttons/elements |
| `mobile` | boolean | false | No | Mobile menu mode |
| `collapsible` | boolean | true | No | Enable mobile collapse |

### Menu Item Structure
```typescript
interface NavigationItem {
  id: string;
  label: string;
  href?: string;
  icon?: string;
  badge?: string | number;
  disabled?: boolean;
  target?: string;
  children?: NavigationItem[];
  description?: string;
  featured?: boolean;
  onClick?: () => void;
}
```

### Variants
1. **default**: Standard navigation with subtle hover effects
2. **pills**: Rounded background on active/hover states
3. **underline**: Underline indicator for active items

### Size System
```typescript
const navigationVariants = cva({
  variants: {
    size: {
      sm: "text-sm py-1 px-2",
      default: "text-sm py-2 px-3",
      lg: "text-base py-3 px-4"
    },
    orientation: {
      horizontal: "flex-row",
      vertical: "flex-col"
    }
  }
})
```

### Navigation Features
- **Hierarchical Structure**: Multi-level menu support
- **Dropdown Menus**: Nested menu items with smooth transitions
- **Mega Menus**: Wide dropdown layouts for complex navigation
- **Keyboard Navigation**: Full keyboard accessibility
- **Mobile Responsive**: Collapsible mobile menu
- **Active State**: Visual indicators for current page

## Component Requirements

### Technical Specifications
- **Framework**: React with TypeScript
- **Base Component**: shadcn/ui Navigation Menu (`pnpm dlx shadcn@latest add navigation-menu`)
- **Extensions**: Mobile responsiveness, mega menus, badge support
- **Styling**: shadcn/ui patterns with class-variance-authority
- **Accessibility**: Full ARIA support, keyboard navigation
- **Performance**: Optimized rendering and interactions
- **Router Integration**: Support for React Router and Next.js

### Key Features Required
1. **Multi-level Navigation**: Nested menu items with dropdowns
2. **Responsive Design**: Mobile-friendly collapsible menu
3. **Keyboard Navigation**: Full keyboard accessibility
4. **Active State Management**: Visual indicators for current location
5. **Flexible Styling**: Multiple variants and customization options
6. **Icon Support**: Icons for menu items and states
7. **Badge Support**: Notification badges on menu items
8. **Router Integration**: Seamless navigation with routing libraries

### Advanced Features
- **Mega Menus**: Complex dropdown layouts with multiple columns
- **Search Integration**: Built-in search functionality
- **Breadcrumb Integration**: Navigation path display
- **Tooltip Support**: Help text for menu items
- **Animation**: Smooth transitions and hover effects

### Usage Examples
```tsx
// Basic navigation menu
<DocyNavigationMenu
  items={[
    { id: 'home', label: 'Home', href: '/' },
    { id: 'about', label: 'About', href: '/about' },
    { id: 'contact', label: 'Contact', href: '/contact' }
  ]}
/>

// With dropdown items
<DocyNavigationMenu
  items={[
    { id: 'home', label: 'Home', href: '/' },
    {
      id: 'products',
      label: 'Products',
      children: [
        { id: 'web-apps', label: 'Web Apps', href: '/products/web' },
        { id: 'mobile-apps', label: 'Mobile Apps', href: '/products/mobile' },
        { id: 'apis', label: 'APIs', href: '/products/apis' }
      ]
    },
    { id: 'support', label: 'Support', href: '/support' }
  ]}
/>

// With icons and badges
<DocyNavigationMenu
  items={[
    { id: 'dashboard', label: 'Dashboard', href: '/dashboard', icon: 'dashboard' },
    { id: 'messages', label: 'Messages', href: '/messages', icon: 'mail', badge: 3 },
    { id: 'settings', label: 'Settings', href: '/settings', icon: 'settings' }
  ]}
/>

// Different variants
<DocyNavigationMenu
  variant="pills"
  items={menuItems}
/>

<DocyNavigationMenu
  variant="underline"
  items={menuItems}
/>

// Vertical orientation
<DocyNavigationMenu
  orientation="vertical"
  items={menuItems}
  className="w-64"
/>

// With logo and actions
<DocyNavigationMenu
  logo={<img src="/logo.png" alt="Logo" className="h-8" />}
  items={menuItems}
  actions={
    <div className="flex gap-2">
      <DocyButton variant="ghost">Sign In</DocyButton>
      <DocyButton>Sign Up</DocyButton>
    </div>
  }
/>

// Mobile responsive
<DocyNavigationMenu
  items={menuItems}
  mobile={isMobile}
  collapsible={true}
  className="md:hidden"
/>

// Controlled navigation
<DocyNavigationMenu
  items={menuItems}
  value={activeItem}
  onValueChange={setActiveItem}
/>

// Mega menu example
<DocyNavigationMenu
  items={[
    { id: 'home', label: 'Home', href: '/' },
    {
      id: 'solutions',
      label: 'Solutions',
      children: [
        {
          id: 'enterprise',
          label: 'Enterprise',
          description: 'Solutions for large organizations',
          featured: true,
          children: [
            { id: 'crm', label: 'CRM', href: '/solutions/crm' },
            { id: 'erp', label: 'ERP', href: '/solutions/erp' }
          ]
        },
        {
          id: 'small-business',
          label: 'Small Business',
          description: 'Solutions for small teams',
          children: [
            { id: 'accounting', label: 'Accounting', href: '/solutions/accounting' },
            { id: 'invoicing', label: 'Invoicing', href: '/solutions/invoicing' }
          ]
        }
      ]
    }
  ]}
/>

// With custom styling
<DocyNavigationMenu
  items={menuItems}
  className="bg-white shadow-lg"
  itemClassName="hover:bg-gray-100"
  activeClassName="bg-blue-50 text-blue-600"
  dropdownClassName="bg-white border shadow-lg"
/>
```

### Integration Requirements
- **DocyIcon**: Icons for menu items and states
- **DocyButton**: Action buttons and mobile toggle
- **DocyBadge**: Notification badges
- **DocyTooltip**: Help text for menu items
- **Router Library**: React Router or Next.js integration
- **Animation Library**: Smooth transitions

### Accessibility Requirements
- **ARIA Attributes**: menubar, menu, menuitem roles
- **Keyboard Navigation**: Arrow keys, Enter, Escape, Tab
- **Screen Reader Support**: Proper announcements and structure
- **Focus Management**: Logical focus flow and indicators
- **Responsive Design**: Mobile-friendly interactions

### Router Integration
```tsx
// React Router integration
import { Link, useLocation } from 'react-router-dom';

function AppNavigation() {
  const location = useLocation();
  
  return (
    <DocyNavigationMenu
      items={menuItems}
      value={location.pathname}
      renderItem={(item) => (
        <Link to={item.href} className="nav-link">
          {item.label}
        </Link>
      )}
    />
  );
}

// Next.js integration
import Link from 'next/link';
import { useRouter } from 'next/router';

function AppNavigation() {
  const router = useRouter();
  
  return (
    <DocyNavigationMenu
      items={menuItems}
      value={router.pathname}
      renderItem={(item) => (
        <Link href={item.href}>
          <a className="nav-link">{item.label}</a>
        </Link>
      )}
    />
  );
}
```

### Testing Requirements
1. **Unit Tests**: Menu rendering, item navigation, dropdown behavior
2. **Integration Tests**: Router integration, keyboard navigation
3. **Accessibility Tests**: ARIA attributes, keyboard interaction
4. **Visual Tests**: All variants and responsive states
5. **Mobile Tests**: Touch interactions, collapsible behavior
6. **Performance Tests**: Large menu structures, smooth animations

## Development Priority
**High** - Essential component for application navigation and user experience

## Notes
- Built with modern shadcn/ui patterns for consistency
- Full accessibility compliance with WCAG guidelines
- Optimized for both desktop and mobile experiences
- TypeScript support with comprehensive type safety
- Flexible architecture supports various navigation patterns
- Integrates seamlessly with popular routing libraries
