# DocyEditor Component

## Overview
DocyEditor is a comprehensive rich text editor component built with shadcn/ui patterns and Tailwind CSS v4. It provides a full-featured document editing experience with support for real-time collaboration, multiple editing modes, extensive formatting options, and advanced features like block-level components, tables, images, and document structures. It serves as the core content editing component throughout the Docyrus React application.

## Component Specification

### Props
| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `content` | JSONContent | null | No | Initial editor content in TipTap JSON format |
| `docContent` | DocContent | null | No | Document metadata and configuration |
| `title` | string | null | No | Document title |
| `description` | string | null | No | Document description |
| `mode` | EditorMode | 'inline' | No | Editor mode: 'inline', 'email', 'page', 'editor', 'personal' |
| `editable` | boolean | true | No | Whether the editor is editable |
| `showTitleEditor` | boolean | false | No | Show the title editor section |
| `showHorizontalToolbar` | boolean | true | No | Show the horizontal toolbar |
| `showBlockToolbar` | boolean | false | No | Show the block-level toolbar |
| `showHeadings` | boolean | false | No | Show table of contents panel |
| `showComments` | boolean | false | No | Enable comments functionality |
| `showSidePanel` | boolean | false | No | Show side panel for additional tools |
| `fullWidth` | boolean | false | No | Use full width layout |
| `nestedPagesVisible` | boolean | true | No | Show nested pages section |
| `collaboration` | boolean | false | No | Enable real-time collaboration |
| `collaborationDocumentName` | string | null | No | Document name for collaboration (required if collaboration is true) |
| `dataSource` | DataSource | null | No | Data source configuration |
| `recordId` | string | null | No | Record ID for the document |
| `extensionOptions` | ExtensionOptions | null | No | Configuration options for editor extensions |
| `className` | string | - | No | Additional CSS classes |

### Editor Modes
The editor supports multiple modes for different use cases:

1. **inline**: Simple inline editing with minimal toolbar
2. **email**: Email-optimized editing with email-specific features
3. **page**: Full page editing with all features and wide layout
4. **editor**: Standard document editing mode
5. **personal**: Personal note-taking mode with optimized features

### Data Structures

#### DocContent Interface
```typescript
interface DocContent {
  title?: string;
  description?: string;
  icon?: string;
  color?: string;
  image?: string;
  page_type?: {
    value: number;
  };
  last_modified_on?: string;
  created_on?: string;
  last_modified_by?: string;
  created_by?: string;
  records?: NestedPageRecord[];
  relatedData?: {
    [key: string]: any;
  };
}
```

#### DataSource Interface
```typescript
interface DataSource {
  id: string;
  name: string;
  type: string;
  config: any;
}
```

#### ExtensionOptions Interface
```typescript
interface ExtensionOptions {
  comment?: boolean;
  mentions?: boolean;
  hashtags?: boolean;
  dataFields?: boolean;
  templates?: boolean;
  fileAttachments?: boolean;
  [key: string]: any;
}
```

### Editor Events
| Event | Payload | Description |
|-------|---------|-------------|
| `onContentChange` | JSONContent | Fired when editor content changes |
| `onTitleChange` | string | Fired when document title changes |
| `onDescriptionChange` | string | Fired when document description changes |
| `onIconChange` | string | Fired when document icon changes |
| `onSave` | JSONContent | Fired when document is saved (Ctrl+S) |
| `onBlur` | { event: Event, json: JSONContent } | Fired when editor loses focus |
| `onMentionsChange` | Mention[] | Fired when mentions are updated |
| `onHashtagsChange` | Hashtag[] | Fired when hashtags are updated |
| `onActiveUsersChange` | string[] | Fired when active collaboration users change |
| `onCommentToggle` | boolean | Fired when comments panel is toggled |
| `onEditableChange` | boolean | Fired when editable state changes |

## Behavior Description

### Editor Initialization
- Initializes with TipTap editor instance
- Loads extensions based on mode and configuration
- Sets up collaboration if enabled
- Configures toolbar based on mode
- Initializes title editor if enabled

### Content Management
- Handles rich text content with JSON structure
- Supports undo/redo functionality
- Auto-saves content changes
- Manages document metadata (title, description, icon)
- Handles image upload and management

### Collaboration Features
- Real-time collaborative editing with Y.js
- User awareness and cursor tracking
- Conflict resolution and synchronization
- Offline support with IndexedDB persistence
- Active user indicators

### Toolbar System
- Dynamic toolbar based on selection context
- Responsive toolbar with overflow handling
- Block-level and inline formatting options
- Layout tools for columns and panels
- Table manipulation tools

### Block Components
- Custom block components (panels, layouts, embeds)
- Image boxes with captions and controls
- Tables with advanced features
- Code blocks with syntax highlighting
- File attachments and embeds

## Component Requirements

### Technical Specifications
- **Framework**: React with TypeScript
- **Base Component**: Custom implementation (no direct shadcn/ui equivalent)
- **Integration**: Uses shadcn/ui design tokens and styling patterns
- **Editor**: TipTap v2 with ProseMirror
- **Styling**: shadcn/ui patterns with Tailwind CSS v4
- **Collaboration**: Y.js with WebSocket provider
- **Accessibility**: Full ARIA support, keyboard navigation
- **Performance**: Optimized rendering, proper memoization

### Key Features Required

#### Core Editor Features
1. **Rich Text Editing**: Full rich text support with formatting options
2. **Block Components**: Custom block-level components (panels, layouts, tables)
3. **Image Management**: Upload, resize, caption, and alignment controls
4. **Table Support**: Advanced table editing with merge/split cells
5. **Code Blocks**: Syntax-highlighted code blocks
6. **Lists**: Ordered, unordered, and task lists
7. **Links**: Internal and external link support

#### Advanced Features
1. **Real-time Collaboration**: Multi-user editing with conflict resolution
2. **Comments System**: Inline comments with threading
3. **Mentions**: User mentions with autocomplete
4. **Hashtags**: Hashtag support with autocomplete
5. **Template Variables**: Dynamic content with template support
6. **File Attachments**: Drag-and-drop file support
7. **Table of Contents**: Auto-generated TOC with navigation

#### Layout and UI
1. **Multiple Modes**: Different editor modes for various use cases
2. **Responsive Design**: Adaptive layout for different screen sizes
3. **Toolbar Management**: Dynamic toolbar with overflow handling
4. **Side Panels**: Expandable panels for additional tools
5. **Full-width Support**: Flexible layout options

#### Data Integration
1. **Data Sources**: Integration with external data sources
2. **Record Management**: Document and record association
3. **Nested Pages**: Hierarchical document structure
4. **Export/Import**: Content export in various formats

### Usage Examples

#### Basic Editor
```tsx
<DocyEditor
  content={initialContent}
  mode="editor"
  editable={true}
  onContentChange={(content) => handleContentChange(content)}
/>
```

#### Page Editor with Title
```tsx
<DocyEditor
  content={pageContent}
  docContent={docMetadata}
  mode="page"
  showTitleEditor={true}
  showHeadings={true}
  fullWidth={true}
  onTitleChange={(title) => handleTitleChange(title)}
  onSave={(content) => handleSave(content)}
/>
```

#### Collaborative Editor
```tsx
<DocyEditor
  content={collaborativeContent}
  mode="page"
  collaboration={true}
  collaborationDocumentName="doc-123"
  showComments={true}
  onActiveUsersChange={(users) => setActiveUsers(users)}
  onCommentToggle={(show) => setCommentsOpen(show)}
/>
```

#### Email Editor
```tsx
<DocyEditor
  content={emailContent}
  mode="email"
  showHorizontalToolbar={true}
  extensionOptions={{
    comment: false,
    mentions: true,
    hashtags: false
  }}
/>
```

#### Inline Editor
```tsx
<DocyEditor
  content={inlineContent}
  mode="inline"
  showHorizontalToolbar={false}
  showBlockToolbar={false}
  className="min-h-[100px]"
/>
```

#### Editor with Data Source
```tsx
<DocyEditor
  content={documentContent}
  docContent={documentMetadata}
  dataSource={dataSourceConfig}
  recordId="record-123"
  mode="editor"
  nestedPagesVisible={true}
  extensionOptions={{
    dataFields: true,
    templates: true,
    fileAttachments: true
  }}
/>
```

#### Read-only Editor
```tsx
<DocyEditor
  content={readOnlyContent}
  mode="page"
  editable={false}
  showHorizontalToolbar={false}
  showTitleEditor={false}
/>
```

### Dependencies Required
- `@tiptap/react`: Core TipTap React integration
- `@tiptap/core`: TipTap core functionality
- `@tiptap/pm`: ProseMirror utilities
- `@tiptap/extension-*`: Various TipTap extensions
- `yjs`: Collaborative editing backend
- `y-indexeddb`: Offline persistence
- `@hocuspocus/provider`: Collaboration provider
- `perfect-scrollbar`: Custom scrollbar component
- `floating-ui`: Popover and tooltip positioning
- `date-fns`: Date formatting utilities

### Testing Requirements

#### Unit Tests
1. **Editor Initialization**: Proper setup across all modes
2. **Content Management**: Content updates and persistence
3. **Event Handling**: All editor events and callbacks
4. **Extension Loading**: Proper extension configuration
5. **Toolbar Functionality**: Toolbar state and interactions

#### Integration Tests
1. **Collaboration**: Real-time editing and conflict resolution
2. **File Upload**: Image and file handling
3. **Block Components**: Custom block functionality
4. **Table Operations**: Advanced table features
5. **Comment System**: Comment creation and management

#### Accessibility Tests
1. **Keyboard Navigation**: Full keyboard support
2. **Screen Reader**: ARIA attributes and announcements
3. **Focus Management**: Proper focus handling
4. **Color Contrast**: Visual accessibility standards

#### Performance Tests
1. **Large Documents**: Performance with extensive content
2. **Collaboration Load**: Multiple concurrent users
3. **Image Handling**: Large image processing
4. **Memory Usage**: Proper cleanup and garbage collection

## Development Priority
**High** - Core content editing component used throughout the application

## Notes
- Built with modern TipTap v2 architecture for extensibility
- Leverages Y.js for robust real-time collaboration
- Integrates with shadcn/ui patterns for consistent design
- Supports complex document structures with nested pages
- Provides flexible extension system for customization
- Optimized for performance with large documents
- Full TypeScript support with comprehensive type definitions
- Responsive design adapts to different screen sizes and contexts