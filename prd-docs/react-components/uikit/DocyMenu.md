# DocyMenu React Component

## Component Overview

The DocyMenu component is a flexible, multi-position dropdown menu system that supports various triggers, positioning options, and advanced features like search, nested submenus, role-based access control, and click-to-confirm actions. It serves as the main menu wrapper that delegates rendering to specific position-based implementations.

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `items` | `MenuItem[]` | `[]` | No | Array of menu items to display |
| `position` | `'absolute' \| 'relative' \| 'vdropdown'` | `'absolute'` | No | Menu positioning strategy |
| `trigger` | `'click' \| 'hover'` | `'click'` | No | Event that triggers menu visibility |
| `direction` | `'up' \| 'down' \| 'left' \| 'right'` | `'down'` | No | Direction where menu opens |
| `align` | `'left' \| 'right'` | `'left'` | No | Alignment of menu relative to trigger |
| `size` | `'xs' \| 'sm' \| 'md'` | `'sm'` | No | Size variant of menu items |
| `search` | `boolean` | `false` | No | Enable search functionality |
| `searchable` | `boolean` | `false` | No | Enable search input field |
| `title` | `string` | `undefined` | No | Optional title displayed at menu top |
| `titleIcon` | `string` | `undefined` | No | Icon displayed next to title |
| `buttonClass` | `string \| string[]` | `undefined` | No | Custom CSS classes for trigger button |
| `containerClass` | `string` | `'max-h-[15rem] w-fit max-w-[20rem]'` | No | Custom CSS classes for menu container |
| `itemData` | `object` | `undefined` | No | Additional data passed to menu items |
| `onItemClick` | `(item: MenuItem, event: Event, index: number) => void` | `undefined` | No | Callback fired when menu item is clicked |
| `onHide` | `() => void` | `undefined` | No | Callback fired when menu is hidden |

## MenuItem Interface

```typescript
interface MenuItem {
  id?: string | number;
  label: string;
  icon?: string;
  image?: string;
  shortcut?: string;
  type?: 'separator' | 'item';
  hidden?: boolean;
  clickToConfirm?: boolean;
  allowedRoles?: string[];
  disallowedRoles?: string[];
  class?: string;
  hide?: (itemData: any) => boolean;
  subMenu?: {
    menu: MenuItem[];
    trigger?: 'click' | 'hover';
    direction?: 'up' | 'down' | 'left' | 'right';
    position?: 'absolute' | 'relative';
    search?: boolean;
  };
}
```

## Behavior

### Position Types
- **Absolute**: Uses floating positioning with portal rendering for maximum flexibility
- **Relative**: Renders menu inline within document flow
- **VDropdown**: Uses Vue-style dropdown positioning with custom theming

### Trigger Behaviors
- **Click**: Menu opens/closes on click events
- **Hover**: Menu opens on hover with 300ms debounce on hide

### Search Functionality
- When enabled, displays search input at top of menu
- Filters menu items based on label matching
- Case-insensitive search with substring matching
- Search input auto-focuses when menu opens

### Role-Based Access Control
- Items can specify `allowedRoles` or `disallowedRoles`
- Role checking function injected via React Context
- Hidden items are automatically filtered out

### Click-to-Confirm
- Items with `clickToConfirm: true` require double-click
- First click shows confirmation state with cancel option
- Confirmation state auto-expires after 3 seconds
- Visual feedback with rose color scheme

### Nested Submenus
- Support for multi-level menu hierarchies
- Submenu positioning based on parent menu direction
- Independent trigger and search configuration per submenu
- Proper hover state management across menu levels

## Component Requirements

### Technical Specifications
- **Framework**: React 18+ with TypeScript
- **Base Component**: shadcn/ui DropdownMenu component (`pnpm dlx shadcn@latest add dropdown-menu`)
- **Extensions**: Multiple positioning strategies, nested submenus, search functionality, and role-based access control built on top of shadcn DropdownMenu
- **Styling**: Tailwind CSS v4 with custom CSS variables
- **Accessibility**: Full ARIA support with keyboard navigation
- **Positioning**: Floating UI for absolute positioning
- **Portal Rendering**: Support for rendering outside DOM hierarchy

### Key Features Required
1. **Multi-Position Support**: Implement all three positioning strategies
2. **Advanced Hover Logic**: Debounced hover with proper submenu handling
3. **Search Integration**: Real-time filtering with keyboard focus management
4. **Role-Based Filtering**: Dynamic item visibility based on user permissions
5. **Click-to-Confirm**: Double-click safety mechanism for destructive actions
6. **Nested Menu Support**: Unlimited depth submenu hierarchies
7. **Keyboard Navigation**: Full keyboard accessibility with arrow keys
8. **Animation System**: Smooth transitions using CSS transitions
9. **Event Handling**: Comprehensive event system with proper propagation
10. **Size Variants**: Multiple size options with consistent spacing

### shadcn/ui Integration
- Utilize `@radix-ui/react-dropdown-menu` for base functionality
- Implement custom positioning logic for multiple strategies
- Use `@floating-ui/react` for absolute positioning
- Integrate with existing shadcn/ui theme system

## Usage Examples

### Basic Menu
```tsx
const basicItems: MenuItem[] = [
  { label: 'Edit', icon: 'edit' },
  { label: 'Delete', icon: 'trash', clickToConfirm: true },
  { type: 'separator' },
  { label: 'Settings', icon: 'cog' }
];

<DocyMenu items={basicItems} onItemClick={handleItemClick}>
  <DocyButton>Actions</DocyButton>
</DocyMenu>
```

### Searchable Menu with Title
```tsx
const searchableItems: MenuItem[] = [
  { label: 'Documents', icon: 'file-text' },
  { label: 'Images', icon: 'image' },
  { label: 'Videos', icon: 'video' },
  { label: 'Audio', icon: 'volume-up' }
];

<DocyMenu 
  items={searchableItems}
  search={true}
  title="File Types"
  titleIcon="folder"
  position="absolute"
  direction="down"
>
  <DocyButton>Browse Files</DocyButton>
</DocyMenu>
```

### Nested Submenu
```tsx
const nestedItems: MenuItem[] = [
  { label: 'New', icon: 'plus' },
  { 
    label: 'Import', 
    icon: 'upload',
    subMenu: {
      menu: [
        { label: 'From File', icon: 'file' },
        { label: 'From URL', icon: 'link' },
        { label: 'From Clipboard', icon: 'clipboard' }
      ],
      trigger: 'hover',
      direction: 'right'
    }
  },
  { type: 'separator' },
  { label: 'Export', icon: 'download' }
];

<DocyMenu 
  items={nestedItems}
  trigger="hover"
  direction="up"
>
  <DocyButton>File</DocyButton>
</DocyMenu>
```

### Role-Based Menu
```tsx
const adminItems: MenuItem[] = [
  { label: 'View', icon: 'eye' },
  { label: 'Edit', icon: 'edit', allowedRoles: ['editor', 'admin'] },
  { label: 'Delete', icon: 'trash', allowedRoles: ['admin'], clickToConfirm: true },
  { type: 'separator' },
  { label: 'Settings', icon: 'cog', disallowedRoles: ['viewer'] }
];

<DocyMenu 
  items={adminItems}
  itemData={{ userId: 123 }}
  onItemClick={handleActionClick}
>
  <DocyButton>Record Actions</DocyButton>
</DocyMenu>
```

### Custom Positioning
```tsx
<DocyMenu 
  items={contextItems}
  position="vdropdown"
  size="xs"
  align="right"
  containerClass="max-h-[20rem] w-[12rem]"
  buttonClass="p-1 rounded-md hover:bg-gray-100"
>
  <DocyIcon name="more-vertical" />
</DocyMenu>
```

## Dependencies Required

### Core Dependencies
- `@radix-ui/react-dropdown-menu`: Base dropdown functionality
- `@floating-ui/react`: Advanced positioning system
- `@headlessui/react`: Headless UI components for accessibility
- `react-hotkeys-hook`: Keyboard shortcut handling
- `fuse.js`: Advanced search functionality

### Internal Dependencies
- `DocyIcon`: Icon rendering component
- `DocyButton`: Button component for triggers
- `useAuth`: Authentication hook for role checking
- `useKeyboard`: Keyboard navigation utilities
- `useClickOutside`: Click outside detection hook

## Testing Requirements

### Unit Tests
- Props validation and default values
- Event handling and callback execution
- Search functionality and filtering
- Role-based access control
- Click-to-confirm behavior
- Submenu rendering and navigation

### Integration Tests
- Keyboard navigation flow
- Hover behavior with debouncing
- Multi-level submenu interaction
- Search input focus management
- Position calculation accuracy

### Accessibility Tests
- ARIA attributes and roles
- Keyboard navigation support
- Screen reader compatibility
- Focus management
- Color contrast compliance

### Visual Tests
- All size variants rendering
- Position strategies accuracy
- Animation and transition states
- Theme integration
- Responsive behavior

## Development Priority

**Priority Level**: High

**Justification**: 
The DocyMenu component is a fundamental UI element used throughout the application for context menus, action menus, and navigation. Its advanced features like nested submenus, role-based access control, and multiple positioning strategies make it critical for user interaction patterns.

**Complexity Factors**:
- Multiple positioning strategies requiring different implementations
- Advanced hover logic with proper debouncing
- Complex state management for nested menus
- Integration with authentication system
- Accessibility requirements for keyboard navigation

**Dependencies Impact**: 
High - This component is likely used extensively throughout the application and will block development of many other features until implemented.

## Notes

### Migration Considerations
- The Vue implementation uses HeadlessUI Vue components, which have React equivalents
- Floating UI positioning logic will need to be adapted for React patterns
- Role checking injection system needs to be converted to React Context
- Search functionality should be optimized for React's rendering patterns

### Performance Optimizations
- Implement virtualization for large menu lists
- Use React.memo for menu items to prevent unnecessary re-renders
- Debounce search input to avoid excessive filtering
- Lazy load submenu content until needed

### Future Enhancements
- Add support for menu item grouping with visual separators
- Implement drag-and-drop reordering for admin users
- Add support for custom menu item renderers
- Consider adding tooltips for menu items with long labels

### Technical Debt
- The Vue implementation has some code duplication between position variants
- Search functionality could be more robust with fuzzy matching
- Role checking could be more granular with action-based permissions
- Animation system could be more configurable