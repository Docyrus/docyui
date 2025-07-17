# DocyCommand Component

## Overview
DocyCommand is a command palette component built on shadcn/ui patterns that provides a searchable interface for commands and actions. It supports keyboard shortcuts, grouping, and contextual commands. It serves as the primary command interface throughout the Docyrus React application.

## Component Specification

### Props
| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-----------|
| `open` | boolean | false | No | Command palette open state |
| `onOpenChange` | function | - | No | Callback when open state changes |
| `commands` | array | [] | Yes | Available commands array |
| `placeholder` | string | 'Type a command...' | No | Search input placeholder |
| `emptyMessage` | string | 'No results found' | No | Message when no commands match |
| `shouldFilter` | boolean | true | No | Enable built-in filtering |
| `filter` | function | - | No | Custom filter function |
| `onSelect` | function | - | No | Callback when command is selected |
| `value` | string | - | No | Current search value |
| `onValueChange` | function | - | No | Search value change callback |
| `className` | string | - | No | Additional CSS classes |
| `contentClassName` | string | - | No | Content CSS classes |
| `inputClassName` | string | - | No | Input CSS classes |
| `listClassName` | string | - | No | List CSS classes |
| `modal` | boolean | true | No | Modal behavior with backdrop |
| `side` | string | 'center' | No | Positioning: 'center', 'top', 'bottom' |

### Command Structure
```typescript
interface Command {
  id: string;
  label: string;
  description?: string;
  icon?: string;
  shortcut?: string[];
  group?: string;
  disabled?: boolean;
  hidden?: boolean;
  keywords?: string[];
  action: () => void;
  subCommands?: Command[];
}
```

### Command Groups
- **Navigation**: Page and route navigation
- **Actions**: User actions and operations
- **Settings**: Configuration and preferences
- **Search**: Search and filter operations
- **Recent**: Recently used commands
- **Custom**: Application-specific commands

### Keyboard Shortcuts
- **Open**: Cmd/Ctrl + K
- **Navigate**: Arrow keys
- **Select**: Enter
- **Close**: Escape
- **Group Navigation**: Tab/Shift+Tab

### Search Features
- **Fuzzy Search**: Intelligent matching
- **Keyword Search**: Match by keywords
- **Group Filtering**: Filter by command groups
- **Recent Commands**: Show recently used

## Component Requirements

### Technical Specifications
- **Framework**: React with TypeScript
- **Base Component**: shadcn/ui Command component (`pnpm dlx shadcn@latest add command`)
- **Extensions**: Keyboard shortcuts, grouping, recent commands
- **Styling**: shadcn/ui patterns with class-variance-authority
- **Accessibility**: Full ARIA support, keyboard navigation
- **Performance**: Optimized searching and filtering
- **Portal**: Proper modal positioning

### Key Features Required
1. **Searchable Interface**: Fast command searching and filtering
2. **Keyboard Navigation**: Full keyboard accessibility
3. **Command Grouping**: Organized command categories
4. **Keyboard Shortcuts**: Quick access shortcuts
5. **Recent Commands**: Track and display recent usage
6. **Modal Behavior**: Overlay with backdrop dismissal
7. **Accessibility**: Screen reader support and ARIA compliance
8. **Performance**: Efficient search and rendering

### Advanced Features
- **Nested Commands**: Sub-command hierarchies
- **Context Awareness**: Commands based on current context
- **Plugin System**: Extensible command registration
- **Custom Renderers**: Custom command item rendering

### Usage Examples
```tsx
// Basic command palette
<DocyCommand
  open={isOpen}
  onOpenChange={setIsOpen}
  commands={[
    {
      id: 'dashboard',
      label: 'Go to Dashboard',
      icon: 'home',
      shortcut: ['g', 'd'],
      group: 'Navigation',
      action: () => navigate('/dashboard')
    },
    {
      id: 'settings',
      label: 'Open Settings',
      icon: 'settings',
      shortcut: ['g', 's'],
      group: 'Navigation',
      action: () => navigate('/settings')
    },
    {
      id: 'new-project',
      label: 'Create New Project',
      icon: 'plus',
      shortcut: ['cmd', 'n'],
      group: 'Actions',
      action: () => createProject()
    }
  ]}
/>

// With custom filter
<DocyCommand
  open={isOpen}
  onOpenChange={setIsOpen}
  commands={commands}
  filter={(value, search) => {
    // Custom fuzzy search implementation
    return fuzzyMatch(value, search) ? 1 : 0;
  }}
  placeholder="Search commands..."
/>

// Grouped commands
<DocyCommand
  open={isOpen}
  onOpenChange={setIsOpen}
  commands={[
    // Navigation group
    {
      id: 'nav-home',
      label: 'Home',
      icon: 'home',
      group: 'Navigation',
      action: () => navigate('/')
    },
    {
      id: 'nav-projects',
      label: 'Projects',
      icon: 'folder',
      group: 'Navigation',
      action: () => navigate('/projects')
    },
    // Actions group
    {
      id: 'action-create',
      label: 'Create Project',
      icon: 'plus',
      group: 'Actions',
      action: () => openCreateModal()
    },
    {
      id: 'action-import',
      label: 'Import Data',
      icon: 'upload',
      group: 'Actions',
      action: () => openImportModal()
    }
  ]}
/>

// With keyboard shortcuts
<DocyCommand
  open={isOpen}
  onOpenChange={setIsOpen}
  commands={[
    {
      id: 'save',
      label: 'Save Document',
      icon: 'save',
      shortcut: ['cmd', 's'],
      group: 'File',
      action: () => saveDocument()
    },
    {
      id: 'copy',
      label: 'Copy',
      icon: 'copy',
      shortcut: ['cmd', 'c'],
      group: 'Edit',
      action: () => copyToClipboard()
    },
    {
      id: 'paste',
      label: 'Paste',
      icon: 'clipboard',
      shortcut: ['cmd', 'v'],
      group: 'Edit',
      action: () => pasteFromClipboard()
    }
  ]}
/>

// Context-aware commands
const getContextualCommands = (context: string) => {
  const baseCommands = [
    {
      id: 'home',
      label: 'Go Home',
      icon: 'home',
      group: 'Navigation',
      action: () => navigate('/')
    }
  ];

  if (context === 'project') {
    return [
      ...baseCommands,
      {
        id: 'edit-project',
        label: 'Edit Project',
        icon: 'edit',
        group: 'Project',
        action: () => editProject()
      },
      {
        id: 'delete-project',
        label: 'Delete Project',
        icon: 'trash',
        group: 'Project',
        action: () => deleteProject()
      }
    ];
  }

  return baseCommands;
};

<DocyCommand
  open={isOpen}
  onOpenChange={setIsOpen}
  commands={getContextualCommands(currentContext)}
/>

// With recent commands
<DocyCommand
  open={isOpen}
  onOpenChange={setIsOpen}
  commands={[
    // Recent commands group
    ...recentCommands.map(cmd => ({
      ...cmd,
      group: 'Recent'
    })),
    // All commands
    ...allCommands
  ]}
  onSelect={(command) => {
    // Track usage
    trackCommandUsage(command.id);
    command.action();
  }}
/>

// Admin commands
<DocyCommand
  open={isOpen}
  onOpenChange={setIsOpen}
  commands={[
    {
      id: 'user-management',
      label: 'User Management',
      icon: 'users',
      group: 'Admin',
      action: () => navigate('/admin/users')
    },
    {
      id: 'system-settings',
      label: 'System Settings',
      icon: 'cog',
      group: 'Admin',
      action: () => navigate('/admin/settings')
    },
    {
      id: 'backup-data',
      label: 'Backup Data',
      icon: 'database',
      group: 'Admin',
      action: () => initiateBackup()
    }
  ]}
/>

// Search commands
<DocyCommand
  open={isOpen}
  onOpenChange={setIsOpen}
  commands={[
    {
      id: 'search-documents',
      label: 'Search Documents',
      description: 'Search through all documents',
      icon: 'search',
      keywords: ['find', 'lookup', 'documents'],
      group: 'Search',
      action: () => openSearchModal('documents')
    },
    {
      id: 'search-users',
      label: 'Search Users',
      description: 'Find users by name or email',
      icon: 'user-search',
      keywords: ['find', 'people', 'members'],
      group: 'Search',
      action: () => openSearchModal('users')
    }
  ]}
/>

// With nested commands
<DocyCommand
  open={isOpen}
  onOpenChange={setIsOpen}
  commands={[
    {
      id: 'theme',
      label: 'Change Theme',
      icon: 'palette',
      group: 'Settings',
      subCommands: [
        {
          id: 'theme-light',
          label: 'Light Theme',
          action: () => setTheme('light')
        },
        {
          id: 'theme-dark',
          label: 'Dark Theme',
          action: () => setTheme('dark')
        },
        {
          id: 'theme-system',
          label: 'System Theme',
          action: () => setTheme('system')
        }
      ]
    }
  ]}
/>

// Custom command renderer
<DocyCommand
  open={isOpen}
  onOpenChange={setIsOpen}
  commands={commands}
  renderCommand={(command) => (
    <div className="flex items-center justify-between p-2 hover:bg-gray-100 rounded">
      <div className="flex items-center gap-2">
        {command.icon && <DocyIcon name={command.icon} size={16} />}
        <div>
          <div className="font-medium">{command.label}</div>
          {command.description && (
            <div className="text-sm text-gray-500">{command.description}</div>
          )}
        </div>
      </div>
      {command.shortcut && (
        <div className="flex gap-1">
          {command.shortcut.map((key, index) => (
            <kbd key={index} className="px-2 py-1 text-xs border rounded">
              {key}
            </kbd>
          ))}
        </div>
      )}
    </div>
  )}
/>
```

### Integration Requirements
- **DocyIcon**: Command icons and indicators
- **DocyKbd**: Keyboard shortcut display
- **Portal**: Modal positioning
- **Router**: Navigation commands
- **Hotkeys**: Keyboard shortcut handling
- **Search**: Fuzzy search implementation

### Keyboard Shortcuts Implementation
```tsx
// Global keyboard shortcut handler
useEffect(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      setIsOpen(true);
    }
  };

  document.addEventListener('keydown', handleKeyDown);
  return () => document.removeEventListener('keydown', handleKeyDown);
}, []);
```

### Accessibility Requirements
- **ARIA Attributes**: combobox, listbox, option roles
- **Keyboard Navigation**: Arrow keys, Enter, Escape
- **Screen Reader Support**: Proper announcements
- **Focus Management**: Focus trapping and restoration
- **Live Regions**: Search result announcements

### Performance Optimization
- **Virtualization**: Handle large command lists
- **Debounced Search**: Optimize search performance
- **Memoization**: Cache command processing
- **Lazy Loading**: Load commands on demand

### Testing Requirements
1. **Unit Tests**: Search functionality, command execution
2. **Integration Tests**: Keyboard shortcuts, navigation
3. **Accessibility Tests**: ARIA attributes, keyboard navigation
4. **Visual Tests**: All states and command types
5. **Performance Tests**: Large command sets, search speed
6. **User Tests**: Real-world usage scenarios

## Development Priority
**Medium** - Useful component for power users and efficient navigation

## Notes
- Built with modern shadcn/ui patterns for consistency
- Optimized for keyboard-centric workflows
- Full accessibility compliance with WCAG guidelines
- TypeScript support with comprehensive type safety
- Extensible architecture supports various command types
- Performance optimized for large command sets
- Integrates with routing and application state
