# DocyRichDisplay Component

## Overview
DocyRichDisplay is a comprehensive display component that presents rich information cards with type indicators, icons, labels, and contextual actions. It serves as an enhanced information display with integrated menu functionality, built with shadcn/ui patterns and Tailwind CSS v4. The component is designed to show structured data with visual hierarchy and interactive elements.

## Component Specification

### Props
| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `type` | string | - | Yes | Type identifier displayed in the top badge |
| `icon` | string | 'square-pen' | No | Icon name for the display (uses DocyIcon) |
| `color` | string | 'sky' | No | Color theme for the type badge and icon: 'sky', 'blue', 'green', 'red', 'orange', 'purple', 'gray' |
| `label` | string | - | Yes | Primary label text displayed prominently |
| `secondaryLabel` | string | - | No | Secondary label text displayed below primary label |
| `menu` | MenuItemType[] | [] | No | Array of menu items for the actions dropdown |
| `className` | string | - | No | Additional CSS classes |
| `onMenuItemClick` | function | - | No | Callback when a menu item is clicked |

### Menu Item Type
```typescript
interface MenuItemType {
  id: string | number;
  label: string;
  icon?: string;
  disabled?: boolean;
  destructive?: boolean;
  separator?: boolean;
  subMenu?: MenuItemType[];
  onClick?: (item: MenuItemType) => void;
}
```

### Behavior
1. **Visual Hierarchy**: 
   - Type badge centered at the top with uppercase text
   - Icon in a bordered container with theme coloring
   - Primary label in medium font weight
   - Secondary label in smaller, lighter text

2. **Color Theming**:
   - Supports multiple color themes that affect the type badge and icon
   - Colors are applied using Tailwind's color system
   - Border colors match the selected theme

3. **Menu Integration**:
   - Dropdown menu with vertical ellipsis icon
   - Hover and active states for the menu button
   - Emits events when menu items are clicked

4. **Responsive Design**:
   - Flexible layout that adapts to content length
   - Proper spacing and alignment across different screen sizes

### Component Structure
```typescript
interface DocyRichDisplayProps {
  type: string;
  icon?: string;
  color?: 'sky' | 'blue' | 'green' | 'red' | 'orange' | 'purple' | 'gray';
  label: string;
  secondaryLabel?: string;
  menu?: MenuItemType[];
  className?: string;
  onMenuItemClick?: (item: MenuItemType, event: Event, index: number) => void;
}
```

## Component Requirements

### Technical Specifications
- **Framework**: React with TypeScript
- **Base Component**: Custom implementation (no direct shadcn/ui equivalent)
- **Integration**: Uses shadcn/ui design tokens and styling patterns
- **Styling**: shadcn/ui patterns with Tailwind CSS v4
- **Accessibility**: Full ARIA support, keyboard navigation, focus management
- **Icons**: Integration with DocyIcon component
- **Menu**: Integration with dropdown menu component (shadcn/ui DropdownMenu)
- **Performance**: Optimized re-renders, proper memoization

### Key Features Required
1. **Rich Display Layout**: Card-based layout with proper visual hierarchy
2. **Type Badge**: Centered badge at the top with uppercase type text
3. **Icon Display**: Themed icon container with border styling
4. **Label System**: Primary and secondary label support
5. **Color Theming**: Multiple color schemes for visual categorization
6. **Menu Integration**: Dropdown menu with customizable items
7. **Responsive Design**: Flexible layout that works across screen sizes
8. **Event Handling**: Proper event delegation and callback support

### Advanced Features
- **Theme Variants**: Support for multiple color themes with consistent styling
- **Menu Positioning**: Proper dropdown positioning and alignment
- **Hover States**: Interactive feedback for menu button
- **Accessibility**: Screen reader support and keyboard navigation

### Usage Examples
```tsx
// Basic display
<DocyRichDisplay
  type="document"
  label="Project Proposal"
  icon="file-text"
/>

// With secondary label
<DocyRichDisplay
  type="task"
  label="Review Documentation"
  secondaryLabel="DUE TODAY"
  color="red"
  icon="check-circle"
/>

// With menu actions
<DocyRichDisplay
  type="project"
  label="Docyrus Platform"
  secondaryLabel="ACTIVE"
  color="green"
  icon="folder"
  menu={[
    { id: 1, label: 'Edit', icon: 'edit' },
    { id: 2, label: 'Share', icon: 'share' },
    { id: 3, label: 'Delete', icon: 'trash', destructive: true }
  ]}
  onMenuItemClick={(item) => console.log('Menu item clicked:', item)}
/>

// Different color themes
<DocyRichDisplay
  type="user"
  label="John Doe"
  secondaryLabel="ADMIN"
  color="blue"
  icon="user"
/>

<DocyRichDisplay
  type="warning"
  label="System Alert"
  secondaryLabel="REQUIRES ATTENTION"
  color="orange"
  icon="alert-triangle"
/>

// With custom styling
<DocyRichDisplay
  type="custom"
  label="Custom Display"
  className="shadow-lg border-2"
  color="purple"
  icon="star"
/>

// Complex menu structure
<DocyRichDisplay
  type="document"
  label="Annual Report"
  secondaryLabel="DRAFT"
  color="sky"
  icon="file-text"
  menu={[
    { id: 1, label: 'Open', icon: 'external-link' },
    { id: 2, label: 'Edit', icon: 'edit' },
    { id: 3, separator: true },
    { 
      id: 4, 
      label: 'Export', 
      icon: 'download',
      subMenu: [
        { id: 5, label: 'PDF', icon: 'file-pdf' },
        { id: 6, label: 'Word', icon: 'file-word' },
        { id: 7, label: 'Excel', icon: 'file-excel' }
      ]
    },
    { id: 8, separator: true },
    { id: 9, label: 'Delete', icon: 'trash', destructive: true }
  ]}
  onMenuItemClick={(item) => handleMenuAction(item)}
/>
```

### Dependencies Required
- `@radix-ui/react-dropdown-menu`: For dropdown menu functionality
- `class-variance-authority`: For variant management
- `DocyIcon`: Icon component integration
- `clsx`: For conditional class handling

### Testing Requirements
1. **Unit Tests**: 
   - Props rendering and validation
   - Color theme application
   - Menu item click handling
   - Event emission

2. **Integration Tests**: 
   - Icon component integration
   - Menu dropdown functionality
   - Keyboard navigation
   - Accessibility compliance

3. **Visual Tests**: 
   - All color themes and variants
   - Different label configurations
   - Menu states and interactions
   - Responsive behavior

4. **Accessibility Tests**: 
   - ARIA attributes validation
   - Keyboard navigation support
   - Screen reader compatibility
   - Focus management

5. **Interaction Tests**: 
   - Menu item selection
   - Dropdown positioning
   - Event propagation
   - Hover and focus states

## Development Priority
**Medium-High** - Important display component for structured data presentation

## Notes
- Built with modern shadcn/ui patterns for consistency and maintainability
- Leverages Tailwind v4's CSS variable system for theme support
- Color theming follows design system conventions
- Menu integration provides flexible action handling
- Responsive design ensures usability across devices
- Full TypeScript support with comprehensive type definitions
- Accessibility-first approach with proper ARIA implementation