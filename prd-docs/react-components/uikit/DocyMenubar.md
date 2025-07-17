# DocyMenubar Component

## Overview
DocyMenubar is a horizontal menu bar component built on shadcn/ui patterns that provides application-level navigation and actions. It supports nested menus, keyboard navigation, and accessibility features. It serves as the primary menu bar component throughout the Docyrus React application.

## Component Specification

### Props
| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-----------|
| `menus` | array | [] | Yes | Menu items array |
| `className` | string | - | No | Additional CSS classes |
| `itemClassName` | string | - | No | Item CSS classes |
| `triggerClassName` | string | - | No | Trigger CSS classes |
| `contentClassName` | string | - | No | Content CSS classes |
| `onSelect` | function | - | No | Item selection callback |
| `disabled` | boolean | false | No | Disable entire menubar |
| `loop` | boolean | true | No | Enable keyboard navigation loop |
| `dir` | string | 'ltr' | No | Text direction: 'ltr', 'rtl' |

### Menu Structure
```typescript
interface MenubarMenu {
  id: string;
  label: string;
  items: MenubarItem[];
  disabled?: boolean;
}

interface MenubarItem {
  id: string;
  label: string;
  icon?: string;
  shortcut?: string;
  disabled?: boolean;
  separator?: boolean;
  submenu?: MenubarItem[];
  checked?: boolean;
  action?: () => void;
}
```

### Menu Types
- **File**: File operations (New, Open, Save, etc.)
- **Edit**: Editing actions (Cut, Copy, Paste, etc.)
- **View**: View options (Zoom, Layout, etc.)
- **Tools**: Application tools and utilities
- **Help**: Help and documentation

### Keyboard Navigation
- **Arrow Keys**: Navigate between menu items
- **Enter/Space**: Open menu or select item
- **Escape**: Close menu
- **Alt**: Access key activation
- **Tab**: Navigate between menu triggers

## Component Requirements

### Technical Specifications
- **Framework**: React with TypeScript
- **Base Component**: shadcn/ui Menubar (`pnpm dlx shadcn@latest add menubar`)
- **Extensions**: Custom content, keyboard shortcuts, separators
- **Styling**: shadcn/ui patterns with class-variance-authority
- **Accessibility**: Full ARIA support, keyboard navigation
- **Performance**: Optimized rendering and interactions
- **Responsive**: Desktop-focused with mobile considerations

### Key Features Required
1. **Horizontal Layout**: Traditional menu bar appearance
2. **Nested Menus**: Multi-level menu support
3. **Keyboard Navigation**: Full keyboard accessibility
4. **Keyboard Shortcuts**: Display and handle shortcuts
5. **Separators**: Visual grouping of menu items
6. **Checkable Items**: Toggle and radio button items
7. **Accessibility**: Screen reader support and ARIA compliance
8. **Desktop Focus**: Optimized for desktop applications

### Usage Examples
```tsx
// Basic menubar
<DocyMenubar
  menus={[
    {
      id: 'file',
      label: 'File',
      items: [
        {
          id: 'new',
          label: 'New',
          icon: 'file-plus',
          shortcut: 'Ctrl+N',
          action: () => createNew()
        },
        {
          id: 'open',
          label: 'Open',
          icon: 'folder-open',
          shortcut: 'Ctrl+O',
          action: () => openFile()
        },
        {
          id: 'separator1',
          separator: true
        },
        {
          id: 'save',
          label: 'Save',
          icon: 'save',
          shortcut: 'Ctrl+S',
          action: () => saveFile()
        },
        {
          id: 'save-as',
          label: 'Save As...',
          icon: 'save',
          shortcut: 'Ctrl+Shift+S',
          action: () => saveAsFile()
        }
      ]
    },
    {
      id: 'edit',
      label: 'Edit',
      items: [
        {
          id: 'undo',
          label: 'Undo',
          icon: 'undo',
          shortcut: 'Ctrl+Z',
          action: () => undo()
        },
        {
          id: 'redo',
          label: 'Redo',
          icon: 'redo',
          shortcut: 'Ctrl+Y',
          action: () => redo()
        },
        {
          id: 'separator1',
          separator: true
        },
        {
          id: 'cut',
          label: 'Cut',
          icon: 'scissors',
          shortcut: 'Ctrl+X',
          action: () => cut()
        },
        {
          id: 'copy',
          label: 'Copy',
          icon: 'copy',
          shortcut: 'Ctrl+C',
          action: () => copy()
        },
        {
          id: 'paste',
          label: 'Paste',
          icon: 'clipboard',
          shortcut: 'Ctrl+V',
          action: () => paste()
        }
      ]
    },
    {
      id: 'view',
      label: 'View',
      items: [
        {
          id: 'zoom-in',
          label: 'Zoom In',
          icon: 'zoom-in',
          shortcut: 'Ctrl+Plus',
          action: () => zoomIn()
        },
        {
          id: 'zoom-out',
          label: 'Zoom Out',
          icon: 'zoom-out',
          shortcut: 'Ctrl+Minus',
          action: () => zoomOut()
        },
        {
          id: 'zoom-reset',
          label: 'Reset Zoom',
          icon: 'zoom-out',
          shortcut: 'Ctrl+0',
          action: () => resetZoom()
        }
      ]
    }
  ]}
/>

// Text editor menubar
<DocyMenubar
  menus={[
    {
      id: 'file',
      label: 'File',
      items: [
        {
          id: 'new',
          label: 'New Document',
          icon: 'file-plus',
          shortcut: 'Ctrl+N',
          action: () => newDocument()
        },
        {
          id: 'open',
          label: 'Open...',
          icon: 'folder-open',
          shortcut: 'Ctrl+O',
          action: () => openDocument()
        },
        {
          id: 'recent',
          label: 'Recent Files',
          icon: 'clock',
          submenu: recentFiles.map(file => ({
            id: file.id,
            label: file.name,
            action: () => openRecentFile(file.id)
          }))
        },
        {
          id: 'separator1',
          separator: true
        },
        {
          id: 'save',
          label: 'Save',
          icon: 'save',
          shortcut: 'Ctrl+S',
          disabled: !hasUnsavedChanges,
          action: () => save()
        },
        {
          id: 'export',
          label: 'Export',
          icon: 'download',
          submenu: [
            {
              id: 'export-pdf',
              label: 'Export as PDF',
              icon: 'file-text',
              action: () => exportAsPDF()
            },
            {
              id: 'export-docx',
              label: 'Export as Word',
              icon: 'file-text',
              action: () => exportAsWord()
            },
            {
              id: 'export-html',
              label: 'Export as HTML',
              icon: 'code',
              action: () => exportAsHTML()
            }
          ]
        }
      ]
    },
    {
      id: 'edit',
      label: 'Edit',
      items: [
        {
          id: 'find',
          label: 'Find',
          icon: 'search',
          shortcut: 'Ctrl+F',
          action: () => openFind()
        },
        {
          id: 'replace',
          label: 'Replace',
          icon: 'replace',
          shortcut: 'Ctrl+H',
          action: () => openReplace()
        },
        {
          id: 'separator1',
          separator: true
        },
        {
          id: 'select-all',
          label: 'Select All',
          shortcut: 'Ctrl+A',
          action: () => selectAll()
        }
      ]
    },
    {
      id: 'format',
      label: 'Format',
      items: [
        {
          id: 'bold',
          label: 'Bold',
          icon: 'bold',
          shortcut: 'Ctrl+B',
          checked: isFormatActive('bold'),
          action: () => toggleFormat('bold')
        },
        {
          id: 'italic',
          label: 'Italic',
          icon: 'italic',
          shortcut: 'Ctrl+I',
          checked: isFormatActive('italic'),
          action: () => toggleFormat('italic')
        },
        {
          id: 'underline',
          label: 'Underline',
          icon: 'underline',
          shortcut: 'Ctrl+U',
          checked: isFormatActive('underline'),
          action: () => toggleFormat('underline')
        },
        {
          id: 'separator1',
          separator: true
        },
        {
          id: 'align',
          label: 'Align',
          icon: 'align-left',
          submenu: [
            {
              id: 'align-left',
              label: 'Left',
              icon: 'align-left',
              checked: alignment === 'left',
              action: () => setAlignment('left')
            },
            {
              id: 'align-center',
              label: 'Center',
              icon: 'align-center',
              checked: alignment === 'center',
              action: () => setAlignment('center')
            },
            {
              id: 'align-right',
              label: 'Right',
              icon: 'align-right',
              checked: alignment === 'right',
              action: () => setAlignment('right')
            },
            {
              id: 'align-justify',
              label: 'Justify',
              icon: 'align-justify',
              checked: alignment === 'justify',
              action: () => setAlignment('justify')
            }
          ]
        }
      ]
    },
    {
      id: 'tools',
      label: 'Tools',
      items: [
        {
          id: 'spell-check',
          label: 'Spell Check',
          icon: 'spell-check',
          shortcut: 'F7',
          action: () => runSpellCheck()
        },
        {
          id: 'word-count',
          label: 'Word Count',
          icon: 'hash',
          action: () => showWordCount()
        },
        {
          id: 'separator1',
          separator: true
        },
        {
          id: 'preferences',
          label: 'Preferences',
          icon: 'settings',
          action: () => openPreferences()
        }
      ]
    },
    {
      id: 'help',
      label: 'Help',
      items: [
        {
          id: 'documentation',
          label: 'Documentation',
          icon: 'book',
          action: () => openDocumentation()
        },
        {
          id: 'shortcuts',
          label: 'Keyboard Shortcuts',
          icon: 'keyboard',
          action: () => showShortcuts()
        },
        {
          id: 'separator1',
          separator: true
        },
        {
          id: 'about',
          label: 'About',
          icon: 'info',
          action: () => showAbout()
        }
      ]
    }
  ]}
/>

// Media player menubar
<DocyMenubar
  menus={[
    {
      id: 'file',
      label: 'File',
      items: [
        {
          id: 'open-file',
          label: 'Open File...',
          icon: 'folder-open',
          shortcut: 'Ctrl+O',
          action: () => openMediaFile()
        },
        {
          id: 'open-url',
          label: 'Open URL...',
          icon: 'link',
          shortcut: 'Ctrl+U',
          action: () => openURL()
        },
        {
          id: 'separator1',
          separator: true
        },
        {
          id: 'close',
          label: 'Close',
          shortcut: 'Ctrl+W',
          action: () => closeMedia()
        }
      ]
    },
    {
      id: 'playback',
      label: 'Playback',
      items: [
        {
          id: 'play-pause',
          label: isPlaying ? 'Pause' : 'Play',
          icon: isPlaying ? 'pause' : 'play',
          shortcut: 'Space',
          action: () => togglePlayback()
        },
        {
          id: 'stop',
          label: 'Stop',
          icon: 'square',
          shortcut: 'S',
          action: () => stopPlayback()
        },
        {
          id: 'separator1',
          separator: true
        },
        {
          id: 'speed',
          label: 'Playback Speed',
          icon: 'gauge',
          submenu: [
            {
              id: 'speed-0.5',
              label: '0.5x',
              checked: playbackSpeed === 0.5,
              action: () => setPlaybackSpeed(0.5)
            },
            {
              id: 'speed-1',
              label: '1x',
              checked: playbackSpeed === 1,
              action: () => setPlaybackSpeed(1)
            },
            {
              id: 'speed-1.5',
              label: '1.5x',
              checked: playbackSpeed === 1.5,
              action: () => setPlaybackSpeed(1.5)
            },
            {
              id: 'speed-2',
              label: '2x',
              checked: playbackSpeed === 2,
              action: () => setPlaybackSpeed(2)
            }
          ]
        }
      ]
    },
    {
      id: 'view',
      label: 'View',
      items: [
        {
          id: 'fullscreen',
          label: 'Fullscreen',
          icon: 'maximize',
          shortcut: 'F11',
          action: () => toggleFullscreen()
        },
        {
          id: 'separator1',
          separator: true
        },
        {
          id: 'show-controls',
          label: 'Show Controls',
          checked: showControls,
          action: () => toggleControls()
        },
        {
          id: 'show-playlist',
          label: 'Show Playlist',
          checked: showPlaylist,
          action: () => togglePlaylist()
        }
      ]
    }
  ]}
/>

// Application menubar with themes
<DocyMenubar
  menus={[
    {
      id: 'view',
      label: 'View',
      items: [
        {
          id: 'theme',
          label: 'Theme',
          icon: 'palette',
          submenu: [
            {
              id: 'theme-light',
              label: 'Light',
              checked: theme === 'light',
              action: () => setTheme('light')
            },
            {
              id: 'theme-dark',
              label: 'Dark',
              checked: theme === 'dark',
              action: () => setTheme('dark')
            },
            {
              id: 'theme-system',
              label: 'System',
              checked: theme === 'system',
              action: () => setTheme('system')
            }
          ]
        },
        {
          id: 'separator1',
          separator: true
        },
        {
          id: 'sidebar',
          label: 'Toggle Sidebar',
          icon: 'sidebar',
          shortcut: 'Ctrl+\\',
          checked: showSidebar,
          action: () => toggleSidebar()
        }
      ]
    },
    {
      id: 'window',
      label: 'Window',
      items: [
        {
          id: 'minimize',
          label: 'Minimize',
          icon: 'minimize',
          shortcut: 'Ctrl+M',
          action: () => minimizeWindow()
        },
        {
          id: 'close',
          label: 'Close',
          icon: 'x',
          shortcut: 'Ctrl+W',
          action: () => closeWindow()
        }
      ]
    }
  ]}
/>

// Custom styled menubar
<DocyMenubar
  menus={menuItems}
  className="bg-gray-800 text-white"
  itemClassName="hover:bg-gray-700 focus:bg-gray-700"
  contentClassName="bg-gray-800 border-gray-700"
/>
```

### Integration Requirements
- **DocyIcon**: Menu item icons
- **DocyKbd**: Keyboard shortcut display
- **Application State**: Integration with app state
- **Keyboard Handler**: Global shortcut handling
- **Theme System**: Theme switching support

### Accessibility Requirements
- **ARIA Attributes**: menubar, menu, menuitem roles
- **Keyboard Navigation**: Arrow keys, Enter, Escape, Tab
- **Screen Reader Support**: Proper announcements
- **Focus Management**: Focus indicators and restoration
- **Access Keys**: Alt key menu activation

### Testing Requirements
1. **Unit Tests**: Menu rendering, item actions, keyboard navigation
2. **Integration Tests**: Nested menus, keyboard shortcuts
3. **Accessibility Tests**: ARIA attributes, keyboard interaction
4. **Visual Tests**: All menu types and states
5. **Performance Tests**: Large menu structures
6. **Desktop Tests**: Traditional desktop app behavior

## Development Priority
**Medium** - Useful for desktop-focused applications and traditional interfaces

## Notes
- Built with modern shadcn/ui patterns for consistency
- Optimized for desktop application interfaces
- Full accessibility compliance with WCAG guidelines
- TypeScript support with comprehensive type safety
- Supports complex nested menu structures
- Traditional desktop menu bar behavior
- Extensible architecture for custom requirements
