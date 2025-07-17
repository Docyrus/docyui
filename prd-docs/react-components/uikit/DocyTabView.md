# DocyTabView Component

## Overview
DocyTabView is a comprehensive tabbed interface component built with shadcn/ui patterns and Tailwind CSS v4. It provides flexible tab navigation with multiple visual styles, positioning options, and content management capabilities for organizing complex interfaces.

## Component Specification

### Props
| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `tabs` | Tab[] | [] | Yes | Array of tab objects with structure |
| `activeTab` | number | 0 | No | Index of currently active tab |
| `onTabChange` | function | - | No | Callback when tab changes: (index, tab) => void |
| `variant` | string | 'underline' | No | Visual style: 'underline', 'pills' |
| `position` | string | 'top' | No | Tab bar position: 'top', 'bottom', 'left', 'right' |
| `alignment` | string | 'left' | No | Tab bar alignment: 'left', 'center', 'right' |
| `scrollable` | boolean | true | No | Enable content area scrolling |
| `menu` | MenuItem[] | [] | No | Context menu items for tabs |
| `onMenuClick` | function | - | No | Tab menu click handler: (item, tabIndex) => void |
| `className` | string | - | No | Additional CSS classes |
| `pageHeader` | object | null | No | Optional page header configuration |

### Tab Object Structure
```typescript
interface Tab {
  id: string;
  title: string;
  subtitle?: string;
  icon?: string;
  image?: string;
  tooltip?: string;
  type?: 'tab' | 'separator';
  disabled?: boolean;
}
```

### Variant System
```typescript
const tabViewVariants = cva({
  variants: {
    variant: {
      underline: "border-b border-slate-200",
      pills: "bg-slate-100 rounded-md p-1"
    },
    position: {
      top: "flex-col",
      bottom: "flex-col-reverse", 
      left: "flex-row",
      right: "flex-row-reverse"
    }
  }
})
```

### Visual Design
- **Underline Variant**: Clean minimal tabs with bottom border indicators
- **Pills Variant**: Rounded background tabs with sliding active indicator
- **Multi-Position**: Support for top, bottom, left, right positioning
- **Rich Content**: Icons, images, subtitles, and separators in tabs

### Behavior
1. **Tab Navigation**: 
   - Click handling with keyboard navigation support
   - Active state management and visual feedback
   - Smooth transitions between tab states

2. **Content Management**:
   - Dynamic content rendering based on active tab
   - Scroll control for content areas
   - Flexible slot-based content system

3. **Menu Integration**:
   - Context menus for individual tabs
   - Dropdown actions and tab management
   - Event handling for menu interactions

## Component Requirements

### Technical Specifications
- **Framework**: React with TypeScript
- **Base Component**: shadcn/ui Tabs component (`pnpm dlx shadcn@latest add tabs`)
- **Extensions**: Rich tab content, multiple variants, positioning options, and context menus built on top of shadcn Tabs
- **Styling**: shadcn/ui patterns with class-variance-authority
- **Navigation**: Keyboard accessibility and focus management
- **Animation**: Smooth transitions for pills variant active indicator
- **Accessibility**: Full ARIA support, proper tab navigation

### Key Features Required
1. **Multiple Variants**: Underline and pills visual styles
2. **Flexible Positioning**: Top, bottom, left, right tab bar placement
3. **Rich Tab Content**: Icons, images, titles, subtitles, separators
4. **Context Menus**: Dropdown actions for tabs
5. **Keyboard Navigation**: Full keyboard accessibility support
6. **Smooth Animations**: Sliding indicator for pills variant

### Usage Examples
```tsx
// Basic tab view
<DocyTabView
  tabs={[
    { id: 'tab1', title: 'Overview', icon: 'home' },
    { id: 'tab2', title: 'Details', icon: 'info' }
  ]}
  activeTab={0}
  onTabChange={(index, tab) => console.log('Tab changed:', index, tab)}
>
  <TabPanel>Content for active tab</TabPanel>
</DocyTabView>

// Pills variant with menu
<DocyTabView
  variant="pills"
  tabs={tabs}
  menu={[
    { id: 'close', title: 'Close Tab', icon: 'x' },
    { id: 'duplicate', title: 'Duplicate Tab', icon: 'copy' }
  ]}
  onMenuClick={(item, tabIndex) => handleMenuAction(item, tabIndex)}
/>

// Vertical tabs (left positioned)
<DocyTabView
  position="left"
  tabs={[
    { id: 'nav1', title: 'Navigation', subtitle: 'Primary' },
    { id: 'nav2', title: 'Settings', subtitle: 'Secondary' }
  ]}
  className="h-96"
/>

// With separators and rich content
<DocyTabView
  tabs={[
    { id: 'user', title: 'Profile', image: '/avatar.jpg' },
    { type: 'separator', title: 'ADMIN' },
    { id: 'admin', title: 'Dashboard', icon: 'dashboard' }
  ]}
/>

// Complex configuration with page header
<DocyTabView
  variant="underline"
  position="top"
  alignment="center"
  pageHeader={{
    title: 'Project Settings',
    subtitle: 'Configure your project'
  }}
  tabs={complexTabs}
  scrollable={false}
/>

// With keyboard navigation
<DocyTabView
  tabs={tabs}
  onTabChange={(index, tab) => {
    // Handle programmatic tab switching
    updateActiveContent(tab.id);
  }}
  onKeyDown={(e) => {
    // Custom keyboard handling
    if (e.key === 'ArrowLeft') switchToPrevTab();
    if (e.key === 'ArrowRight') switchToNextTab();
  }}
/>
```

### Integration Requirements
- **DocyIcon**: For tab icons and menu indicators
- **DocyAvatar**: For user profile images in tabs
- **DocyMenu**: For context menu functionality
- **DocyPageHeader**: For integrated page headers

### Accessibility Requirements
- **ARIA Roles**: `role="tablist"`, `role="tab"`, `role="tabpanel"`
- **Keyboard Navigation**: Arrow keys, Enter, Space, Home, End
- **Focus Management**: Proper focus indicators and tab order
- **Screen Reader**: Descriptive labels and state announcements

### Dependencies Required
- `class-variance-authority`: Variant management
- `@radix-ui/react-tabs`: Accessibility foundation
- Tab navigation utilities and keyboard handlers

### Testing Requirements
1. **Unit Tests**: Tab switching, menu interactions, variant rendering
2. **Visual Tests**: All variants, positions, and alignments
3. **Accessibility Tests**: ARIA attributes, keyboard navigation, focus management
4. **Integration Tests**: Menu actions, content rendering, event handling
5. **Performance Tests**: Animation smoothness, large tab sets

## Development Priority
**High** - Core navigation component essential for complex interfaces

## Notes
- Built with shadcn/ui patterns for consistency with design system
- Supports both simple and complex tab configurations
- Flexible positioning system accommodates various layout needs
- Smooth animations enhance user experience in pills variant
- Comprehensive keyboard navigation for accessibility compliance