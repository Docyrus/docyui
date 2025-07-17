# DocyPageHeader Component

## Overview
DocyPageHeader is a comprehensive page header component built with shadcn/ui patterns and Tailwind CSS v4. It provides a standardized page header with flexible content areas for title, actions, and navigation elements. The component supports title editing, fullscreen mode, dropdown menus, and various layout configurations including tab view integration.

## Component Specification

### Props
| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `title` | string | '' | No | Main title text |
| `titleEditable` | boolean | false | No | Enable inline title editing |
| `onTitleUpdate` | function | - | No | Callback when title is updated |
| `description` | string | - | No | Subtitle/description text |
| `icon` | string | - | No | Icon name (uses DocyIcon) |
| `image` | string | - | No | Image URL to display instead of icon |
| `imageClassName` | string | - | No | CSS classes for image styling |
| `size` | string | 'md' | No | Text size: 'xs', 'sm', 'md', 'lg', 'xl' |
| `compact` | boolean | false | No | Compact layout with reduced spacing |
| `withTabView` | boolean | false | No | Special layout for tab view integration |
| `showIcon` | boolean | true | No | Show icon/placeholder when no image |
| `showFullscreenButton` | boolean | false | No | Show fullscreen toggle button |
| `menu` | MenuItem[] | [] | No | Dropdown menu items |
| `onMenuClick` | function | - | No | Callback for menu item clicks |
| `className` | string | - | No | Additional CSS classes |
| `children` | ReactNode | - | No | Content area (typically tabs or navigation) |
| `titleSlot` | ReactNode | - | No | Custom title content |
| `buttonsSlot` | ReactNode | - | No | Custom buttons/actions area |

### Data Interfaces
```typescript
interface MenuItem {
  id: string;
  label: string;
  icon?: string;
  disabled?: boolean;
  separator?: boolean;
  onClick?: () => void;
}

interface DocyPageHeaderProps {
  title?: string;
  titleEditable?: boolean;
  onTitleUpdate?: (title: string) => void;
  description?: string;
  icon?: string;
  image?: string;
  imageClassName?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  compact?: boolean;
  withTabView?: boolean;
  showIcon?: boolean;
  showFullscreenButton?: boolean;
  menu?: MenuItem[];
  onMenuClick?: (item: MenuItem) => void;
  className?: string;
  children?: ReactNode;
  titleSlot?: ReactNode;
  buttonsSlot?: ReactNode;
}
```

## Behavior

### Layout Structure
The component follows a three-column layout:
1. **Left Section**: Title area with icon/image, title text, and edit controls
2. **Center Section**: Flexible content area (typically for tabs or navigation)
3. **Right Section**: Action buttons and dropdown menu

### Title Editing
- Click-to-edit functionality with inline editing
- Visual feedback during editing state
- Save/cancel buttons appear during editing
- Keyboard shortcuts: Enter to save, Escape to cancel
- Empty state placeholder when no title

### Fullscreen Mode
- Toggle button to expand content to fullscreen
- Hides application sidebar and tab bar
- Visual indicator for fullscreen state
- Smooth transitions between states

### Responsive Behavior
- Adapts to different screen sizes
- Compact mode for mobile interfaces
- Flexible content area that grows/shrinks as needed
- Proper text truncation for long titles

## Component Requirements

### Technical Specifications
- **Framework**: React with TypeScript
- **Base Component**: Custom implementation (no direct shadcn/ui equivalent)
- **Integration**: Uses shadcn/ui design tokens and styling patterns
- **Styling**: shadcn/ui patterns with Tailwind CSS v4
- **Accessibility**: Full ARIA support, keyboard navigation, focus management
- **Responsive**: Mobile-first design with breakpoint considerations
- **Performance**: Optimized re-renders, proper memoization

### Key Features Required
1. **Flexible Layout**: Three-column responsive layout with flexible content area
2. **Title Management**: Inline editing with save/cancel functionality
3. **Icon/Image Support**: Flexible icon or image display with fallback states
4. **Fullscreen Integration**: Toggle fullscreen mode with proper state management
5. **Menu System**: Dropdown menu with customizable items
6. **Layout Variants**: Compact and tab view specific layouts
7. **Slot System**: Flexible content areas for customization
8. **Size Variants**: Multiple text size options for different contexts

### Advanced Features
- **Inline Editing**: Click-to-edit title with visual feedback
- **Fullscreen Management**: Coordinate with application layout for fullscreen mode
- **Menu Integration**: Dropdown menu with icons and separators
- **Tab View Support**: Special layout considerations for tab integration
- **Keyboard Navigation**: Full keyboard support for all interactive elements

## Usage Examples

### Basic Header
```tsx
<DocyPageHeader
  title="Page Title"
  description="Page description"
  icon="fal memo-pad"
/>
```

### With Editable Title
```tsx
<DocyPageHeader
  title="Editable Page Title"
  titleEditable={true}
  onTitleUpdate={(newTitle) => console.log('Title updated:', newTitle)}
  icon="fal document"
/>
```

### With Image and Custom Size
```tsx
<DocyPageHeader
  title="Project Dashboard"
  image="/project-logo.png"
  imageClassName="w-10 h-10 rounded"
  size="lg"
  description="Project management overview"
/>
```

### Compact Layout
```tsx
<DocyPageHeader
  title="Mobile View"
  compact={true}
  size="sm"
  icon="fal mobile"
  showIcon={true}
/>
```

### With Tab View Integration
```tsx
<DocyPageHeader
  title="Data View"
  withTabView={true}
  icon="fal table"
>
  <DocyTabView>
    <DocyTab label="Overview" />
    <DocyTab label="Details" />
    <DocyTab label="Settings" />
  </DocyTabView>
</DocyPageHeader>
```

### With Fullscreen Support
```tsx
<DocyPageHeader
  title="Full Screen Document"
  showFullscreenButton={true}
  icon="fal expand"
  description="Document viewer with fullscreen capability"
/>
```

### With Menu and Custom Actions
```tsx
<DocyPageHeader
  title="Project Settings"
  menu={[
    { id: 'export', label: 'Export', icon: 'fal download' },
    { id: 'separator', separator: true },
    { id: 'delete', label: 'Delete', icon: 'fal trash', disabled: false }
  ]}
  onMenuClick={(item) => handleMenuAction(item)}
  buttonsSlot={
    <>
      <DocyButton variant="outline" size="sm">
        Cancel
      </DocyButton>
      <DocyButton size="sm">
        Save
      </DocyButton>
    </>
  }
/>
```

### Custom Title Slot
```tsx
<DocyPageHeader
  titleSlot={
    <div className="flex items-center space-x-2">
      <DocyAvatar src="/user-avatar.jpg" size="sm" />
      <div>
        <h1 className="text-lg font-semibold">Custom Title</h1>
        <p className="text-sm text-muted-foreground">with custom layout</p>
      </div>
    </div>
  }
  buttonsSlot={
    <DocyButton variant="ghost" size="sm" icon="fal settings">
      Settings
    </DocyButton>
  }
/>
```

### Complete Example with All Features
```tsx
<DocyPageHeader
  title="Document Editor"
  titleEditable={true}
  onTitleUpdate={handleTitleUpdate}
  description="Edit and collaborate on documents"
  icon="fal edit"
  size="lg"
  showFullscreenButton={true}
  menu={[
    { id: 'share', label: 'Share', icon: 'fal share' },
    { id: 'export', label: 'Export', icon: 'fal download' },
    { id: 'separator', separator: true },
    { id: 'settings', label: 'Settings', icon: 'fal cog' }
  ]}
  onMenuClick={handleMenuClick}
  buttonsSlot={
    <DocyButtonGroup>
      <DocyButton variant="outline" size="sm">
        Preview
      </DocyButton>
      <DocyButton size="sm">
        Publish
      </DocyButton>
    </DocyButtonGroup>
  }
>
  <DocyTabView>
    <DocyTab label="Edit" />
    <DocyTab label="Preview" />
    <DocyTab label="History" />
  </DocyTabView>
</DocyPageHeader>
```

## Dependencies Required
- `DocyIcon`: Icon component integration
- `DocyButton`: Action buttons and edit controls
- `DocyButtonGroup`: Button grouping
- `DocyMenu`: Dropdown menu component
- `DocyTabView`: Tab integration (optional)
- `@radix-ui/react-slot`: For slot-based content areas
- `class-variance-authority`: Variant management
- React hooks for state management

## Testing Requirements

### Unit Tests
1. **Rendering**: All prop combinations render correctly
2. **Title Editing**: Inline editing workflow with save/cancel
3. **Menu Integration**: Menu items render and click events work
4. **Fullscreen Toggle**: Fullscreen state management
5. **Layout Variants**: Compact and tab view layouts
6. **Size Variants**: All text size options

### Integration Tests
1. **Tab View Integration**: Proper layout with tab components
2. **Fullscreen Coordination**: Integration with application layout
3. **Menu Actions**: End-to-end menu item interactions
4. **Title Updates**: Title editing with parent component updates

### Accessibility Tests
1. **Keyboard Navigation**: All interactive elements accessible via keyboard
2. **Screen Reader**: Proper ARIA labels and descriptions
3. **Focus Management**: Focus handling during editing states
4. **Color Contrast**: All text meets accessibility standards

### Visual Tests
1. **Layout Responsiveness**: All breakpoints and layouts
2. **State Variations**: Editing, fullscreen, and menu states
3. **Theme Support**: Light/dark theme compatibility
4. **Size Variants**: All text sizes and compact layouts

## Development Priority
**High** - Core navigation component used across multiple page types

## Notes
- Built with shadcn/ui patterns for consistency and maintainability
- Leverages Tailwind v4's CSS variable system for theme support
- Flexible slot system allows maximum customization
- Fullscreen mode requires coordination with application layout
- Title editing provides smooth inline editing experience
- Menu system supports icons, separators, and disabled states
- Full TypeScript support with excellent IntelliSense
- Responsive design adapts to mobile and desktop layouts
- Integration with tab view component for navigation patterns