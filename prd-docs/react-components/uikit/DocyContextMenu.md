# DocyContextMenu Component

## Overview
DocyContextMenu is a right-click context menu component built on shadcn/ui patterns that provides contextual actions and options. It supports nested menus, keyboard navigation, and accessibility features. It serves as the primary context menu component throughout the Docyrus React application.

## Component Specification

### Props
| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-----------|
| `children` | ReactNode | - | Yes | Trigger element |
| `items` | array | [] | Yes | Menu items array |
| `onSelect` | function | - | No | Callback when item is selected |
| `disabled` | boolean | false | No | Disable context menu |
| `modal` | boolean | true | No | Modal behavior |
| `side` | string | 'bottom' | No | Preferred side: 'top', 'right', 'bottom', 'left' |
| `align` | string | 'start' | No | Alignment: 'start', 'center', 'end' |
| `sideOffset` | number | 2 | No | Distance from trigger |
| `alignOffset` | number | 0 | No | Alignment offset |
| `className` | string | - | No | Additional CSS classes |
| `contentClassName` | string | - | No | Content CSS classes |
| `itemClassName` | string | - | No | Item CSS classes |
| `separatorClassName` | string | - | No | Separator CSS classes |
| `avoidCollisions` | boolean | true | No | Avoid viewport collisions |
| `collisionPadding` | number | 8 | No | Collision padding |

### Menu Item Structure
```typescript
interface ContextMenuItem {
  id: string;
  label: string;
  icon?: string;
  shortcut?: string;
  disabled?: boolean;
  destructive?: boolean;
  separator?: boolean;
  submenu?: ContextMenuItem[];
  action?: () => void;
  type?: 'item' | 'separator' | 'submenu';
}
```

### Item Types
- **Item**: Regular menu item with action
- **Separator**: Visual divider between items
- **Submenu**: Nested menu with sub-items
- **Destructive**: Dangerous action item
- **Disabled**: Non-interactive item

### Trigger Events
- **Right Click**: Primary context menu trigger
- **Long Press**: Mobile context menu trigger
- **Keyboard**: Context menu key (Menu key)
- **Custom**: Programmatic trigger

### Positioning
- **Collision Detection**: Automatic repositioning
- **Viewport Awareness**: Stay within screen bounds
- **Cursor Positioning**: Appear at cursor location
- **Element Positioning**: Relative to trigger element

## Component Requirements

### Technical Specifications
- **Framework**: React with TypeScript
- **Base Component**: shadcn/ui Context Menu (`pnpm dlx shadcn@latest add context-menu`)
- **Extensions**: Nested menus, keyboard shortcuts, touch support
- **Styling**: shadcn/ui patterns with class-variance-authority
- **Accessibility**: Full ARIA support, keyboard navigation
- **Performance**: Optimized rendering and positioning
- **Portal**: Proper DOM positioning

### Key Features Required
1. **Right-click Trigger**: Standard context menu behavior
2. **Nested Menus**: Sub-menu support with indicators
3. **Keyboard Navigation**: Full keyboard accessibility
4. **Touch Support**: Long press for mobile devices
5. **Collision Detection**: Automatic repositioning
6. **Keyboard Shortcuts**: Display and handle shortcuts
7. **Accessibility**: Screen reader support and ARIA compliance
8. **Performance**: Efficient rendering and positioning

### Advanced Features
- **Custom Triggers**: Alternative trigger methods
- **Dynamic Items**: Context-aware menu items
- **Icon Support**: Icons for menu items
- **Grouping**: Visual grouping of related items
- **Search**: Searchable menu items

### Usage Examples
```tsx
// Basic context menu
<DocyContextMenu
  items={[
    {
      id: 'copy',
      label: 'Copy',
      icon: 'copy',
      shortcut: 'Ctrl+C',
      action: () => copyToClipboard()
    },
    {
      id: 'paste',
      label: 'Paste',
      icon: 'clipboard',
      shortcut: 'Ctrl+V',
      action: () => pasteFromClipboard()
    },
    {
      id: 'separator1',
      type: 'separator'
    },
    {
      id: 'delete',
      label: 'Delete',
      icon: 'trash',
      destructive: true,
      action: () => deleteItem()
    }
  ]}
>
  <div className="p-4 border rounded cursor-pointer">
    Right-click me for context menu
  </div>
</DocyContextMenu>

// File context menu
<DocyContextMenu
  items={[
    {
      id: 'open',
      label: 'Open',
      icon: 'external-link',
      action: () => openFile()
    },
    {
      id: 'open-with',
      label: 'Open with...',
      icon: 'more-horizontal',
      submenu: [
        {
          id: 'open-editor',
          label: 'Text Editor',
          icon: 'edit',
          action: () => openWith('editor')
        },
        {
          id: 'open-viewer',
          label: 'Image Viewer',
          icon: 'image',
          action: () => openWith('viewer')
        }
      ]
    },
    {
      id: 'separator1',
      type: 'separator'
    },
    {
      id: 'rename',
      label: 'Rename',
      icon: 'edit-2',
      shortcut: 'F2',
      action: () => startRename()
    },
    {
      id: 'duplicate',
      label: 'Duplicate',
      icon: 'copy',
      action: () => duplicateFile()
    },
    {
      id: 'separator2',
      type: 'separator'
    },
    {
      id: 'move-to-trash',
      label: 'Move to Trash',
      icon: 'trash',
      destructive: true,
      action: () => moveToTrash()
    }
  ]}
>
  <div className="p-2 hover:bg-gray-100 rounded cursor-pointer">
    📄 document.pdf
  </div>
</DocyContextMenu>

// Table row context menu
<DocyContextMenu
  items={[
    {
      id: 'view',
      label: 'View Details',
      icon: 'eye',
      action: () => viewDetails(row.id)
    },
    {
      id: 'edit',
      label: 'Edit',
      icon: 'edit',
      action: () => editRow(row.id)
    },
    {
      id: 'separator1',
      type: 'separator'
    },
    {
      id: 'share',
      label: 'Share',
      icon: 'share',
      submenu: [
        {
          id: 'share-link',
          label: 'Copy Link',
          icon: 'link',
          action: () => copyShareLink(row.id)
        },
        {
          id: 'share-email',
          label: 'Send via Email',
          icon: 'mail',
          action: () => shareViaEmail(row.id)
        }
      ]
    },
    {
      id: 'separator2',
      type: 'separator'
    },
    {
      id: 'delete',
      label: 'Delete',
      icon: 'trash',
      destructive: true,
      action: () => deleteRow(row.id)
    }
  ]}
>
  <tr className="hover:bg-gray-50">
    <td className="p-2">{row.name}</td>
    <td className="p-2">{row.email}</td>
    <td className="p-2">{row.status}</td>
  </tr>
</DocyContextMenu>

// Text selection context menu
<DocyContextMenu
  items={[
    {
      id: 'copy',
      label: 'Copy',
      icon: 'copy',
      shortcut: 'Ctrl+C',
      action: () => copySelection()
    },
    {
      id: 'cut',
      label: 'Cut',
      icon: 'scissors',
      shortcut: 'Ctrl+X',
      action: () => cutSelection()
    },
    {
      id: 'separator1',
      type: 'separator'
    },
    {
      id: 'format',
      label: 'Format',
      icon: 'type',
      submenu: [
        {
          id: 'bold',
          label: 'Bold',
          icon: 'bold',
          shortcut: 'Ctrl+B',
          action: () => formatText('bold')
        },
        {
          id: 'italic',
          label: 'Italic',
          icon: 'italic',
          shortcut: 'Ctrl+I',
          action: () => formatText('italic')
        },
        {
          id: 'underline',
          label: 'Underline',
          icon: 'underline',
          shortcut: 'Ctrl+U',
          action: () => formatText('underline')
        }
      ]
    },
    {
      id: 'separator2',
      type: 'separator'
    },
    {
      id: 'search',
      label: 'Search Google',
      icon: 'search',
      action: () => searchGoogle(selectedText)
    }
  ]}
>
  <div className="p-4 border rounded select-text">
    Select text and right-click for formatting options
  </div>
</DocyContextMenu>

// Image context menu
<DocyContextMenu
  items={[
    {
      id: 'view-original',
      label: 'View Original Size',
      icon: 'maximize',
      action: () => viewOriginalSize()
    },
    {
      id: 'download',
      label: 'Download Image',
      icon: 'download',
      action: () => downloadImage()
    },
    {
      id: 'separator1',
      type: 'separator'
    },
    {
      id: 'copy-image',
      label: 'Copy Image',
      icon: 'copy',
      action: () => copyImage()
    },
    {
      id: 'copy-link',
      label: 'Copy Image Link',
      icon: 'link',
      action: () => copyImageLink()
    },
    {
      id: 'separator2',
      type: 'separator'
    },
    {
      id: 'set-as',
      label: 'Set as...',
      icon: 'image',
      submenu: [
        {
          id: 'set-avatar',
          label: 'Profile Picture',
          icon: 'user',
          action: () => setAsAvatar()
        },
        {
          id: 'set-background',
          label: 'Background',
          icon: 'layout',
          action: () => setAsBackground()
        }
      ]
    }
  ]}
>
  <img 
    src="/image.jpg" 
    alt="Context menu demo" 
    className="w-64 h-48 object-cover rounded cursor-pointer"
  />
</DocyContextMenu>

// Kanban card context menu
<DocyContextMenu
  items={[
    {
      id: 'edit',
      label: 'Edit Card',
      icon: 'edit',
      action: () => editCard(card.id)
    },
    {
      id: 'duplicate',
      label: 'Duplicate',
      icon: 'copy',
      action: () => duplicateCard(card.id)
    },
    {
      id: 'separator1',
      type: 'separator'
    },
    {
      id: 'move',
      label: 'Move to...',
      icon: 'move',
      submenu: columns.map(column => ({
        id: `move-${column.id}`,
        label: column.name,
        action: () => moveCard(card.id, column.id)
      }))
    },
    {
      id: 'separator2',
      type: 'separator'
    },
    {
      id: 'archive',
      label: 'Archive',
      icon: 'archive',
      action: () => archiveCard(card.id)
    },
    {
      id: 'delete',
      label: 'Delete',
      icon: 'trash',
      destructive: true,
      action: () => deleteCard(card.id)
    }
  ]}
>
  <div className="p-3 bg-white border rounded shadow-sm cursor-pointer">
    <h3 className="font-medium">{card.title}</h3>
    <p className="text-sm text-gray-600">{card.description}</p>
  </div>
</DocyContextMenu>

// Conditional context menu
<DocyContextMenu
  items={[
    {
      id: 'view',
      label: 'View',
      icon: 'eye',
      action: () => viewItem()
    },
    ...(canEdit ? [{
      id: 'edit',
      label: 'Edit',
      icon: 'edit',
      action: () => editItem()
    }] : []),
    {
      id: 'separator1',
      type: 'separator'
    },
    {
      id: 'share',
      label: 'Share',
      icon: 'share',
      disabled: !canShare,
      action: () => shareItem()
    },
    ...(canDelete ? [{
      id: 'separator2',
      type: 'separator'
    }, {
      id: 'delete',
      label: 'Delete',
      icon: 'trash',
      destructive: true,
      action: () => deleteItem()
    }] : [])
  ]}
>
  <div className="p-2 hover:bg-gray-100 rounded">
    Context-sensitive menu
  </div>
</DocyContextMenu>

// Custom styled context menu
<DocyContextMenu
  items={contextItems}
  className="min-w-48"
  contentClassName="bg-gray-900 text-white border-gray-700"
  itemClassName="hover:bg-gray-800 focus:bg-gray-800"
  separatorClassName="bg-gray-700"
>
  <div className="p-4 bg-gray-800 text-white rounded">
    Dark theme context menu
  </div>
</DocyContextMenu>
```

### Integration Requirements
- **DocyIcon**: Menu item icons
- **DocyKbd**: Keyboard shortcut display
- **Portal**: Proper DOM positioning
- **Gesture Library**: Touch and long press support
- **Clipboard API**: Copy/paste operations
- **Theme System**: Consistent styling

### Touch Support
```tsx
// Long press handler for mobile
const useLongPress = (onLongPress: () => void, delay = 500) => {
  const timeoutRef = useRef<NodeJS.Timeout>();
  
  const handleTouchStart = useCallback(() => {
    timeoutRef.current = setTimeout(onLongPress, delay);
  }, [onLongPress, delay]);
  
  const handleTouchEnd = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }, []);
  
  return {
    onTouchStart: handleTouchStart,
    onTouchEnd: handleTouchEnd,
    onTouchMove: handleTouchEnd
  };
};
```

### Accessibility Requirements
- **ARIA Attributes**: menu, menuitem, menuitemcheckbox roles
- **Keyboard Navigation**: Arrow keys, Enter, Escape
- **Screen Reader Support**: Proper announcements
- **Focus Management**: Focus indicators and restoration
- **Semantic HTML**: Proper menu structure

### Performance Optimization
- **Lazy Rendering**: Render menu only when needed
- **Event Delegation**: Efficient event handling
- **Portal Optimization**: Optimized DOM positioning
- **Memory Management**: Proper cleanup

### Testing Requirements
1. **Unit Tests**: Menu rendering, item actions, keyboard navigation
2. **Integration Tests**: Touch support, nested menus
3. **Accessibility Tests**: ARIA attributes, keyboard interaction
4. **Visual Tests**: All menu types and styling
5. **Mobile Tests**: Long press, touch interactions
6. **Performance Tests**: Large menu sets, frequent usage

## Development Priority
**Medium** - Useful component for contextual actions and improved user experience

## Notes
- Built with modern shadcn/ui patterns for consistency
- Optimized for both desktop and mobile interactions
- Full accessibility compliance with WCAG guidelines
- TypeScript support with comprehensive type safety
- Supports complex nested menu structures
- Touch-friendly with long press support
- Extensible architecture for custom requirements
