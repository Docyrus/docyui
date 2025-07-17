# DocyFieldHtmlEditor Component

## Overview
DocyFieldHtmlEditor is a comprehensive WYSIWYG (What You See Is What You Get) HTML editor component that extends DocyFieldBase to provide rich text editing capabilities. It features a visual editor with formatting tools, HTML source editing, real-time preview, and support for advanced content like tables, media, and custom HTML elements.

The component is designed for content management systems, email composition, blog posts, and any application requiring rich text editing with HTML output.

## Component Specification

### Props
DocyFieldHtmlEditor inherits ALL props from DocyFieldBase and adds the following HTML editor-specific properties:

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `modelValue` | string | '' | No | Current HTML content |
| `mode` | 'visual' \| 'source' \| 'preview' \| 'split' | 'visual' | No | Editor display mode |
| `theme` | 'light' \| 'dark' \| 'auto' | 'light' | No | Editor theme |
| `height` | number \| string | 400 | No | Editor height in pixels or CSS units |
| `width` | number \| string | '100%' | No | Editor width in pixels or CSS units |
| `autoResize` | boolean | true | No | Automatically resize editor to content |
| `minHeight` | number | 200 | No | Minimum editor height |
| `maxHeight` | number | 1000 | No | Maximum editor height |
| `showToolbar` | boolean | true | No | Show formatting toolbar |
| `toolbarStyle` | 'floating' \| 'sticky' \| 'static' | 'static' | No | Toolbar positioning style |
| `toolbarItems` | ToolbarGroup[] | defaultToolbar | No | Custom toolbar configuration |
| `showStatusBar` | boolean | true | No | Show status bar with editor info |
| `placeholder` | string | 'Enter content...' | No | Placeholder text for empty editor |
| `spellCheck` | boolean | true | No | Enable spell checking |
| `autoSave` | boolean | false | No | Enable auto-save functionality |
| `autoSaveInterval` | number | 30000 | No | Auto-save interval in milliseconds |
| `enableTables` | boolean | true | No | Enable table creation and editing |
| `enableImages` | boolean | true | No | Enable image insertion and editing |
| `enableMedia` | boolean | true | No | Enable media (video/audio) insertion |
| `enableLinks` | boolean | true | No | Enable link creation and editing |
| `enableLists` | boolean | true | No | Enable ordered and unordered lists |
| `enableQuotes` | boolean | true | No | Enable blockquote formatting |
| `enableCode` | boolean | true | No | Enable code formatting |
| `enableMath` | boolean | false | No | Enable math equation support |
| `enableEmoji` | boolean | true | No | Enable emoji insertion |
| `enableMentions` | boolean | false | No | Enable @mention functionality |
| `enableHashtags` | boolean | false | No | Enable #hashtag functionality |
| `enableWordCount` | boolean | true | No | Show word count in status bar |
| `enableCharCount` | boolean | true | No | Show character count in status bar |
| `enableReadingTime` | boolean | true | No | Show estimated reading time |
| `maxLength` | number | - | No | Maximum character limit |
| `maxWords` | number | - | No | Maximum word limit |
| `allowedTags` | string[] | - | No | Allowed HTML tags (whitelist) |
| `forbiddenTags` | string[] | [] | No | Forbidden HTML tags (blacklist) |
| `allowedAttributes` | Record<string, string[]> | - | No | Allowed HTML attributes per tag |
| `sanitizeHtml` | boolean | true | No | Enable HTML sanitization |
| `sanitizeOptions` | SanitizeOptions | defaultSanitize | No | HTML sanitization configuration |
| `imageUpload` | boolean | false | No | Enable image upload functionality |
| `imageUploadHandler` | function | - | No | Custom image upload handler |
| `fileUpload` | boolean | false | No | Enable file upload functionality |
| `fileUploadHandler` | function | - | No | Custom file upload handler |
| `mediaUpload` | boolean | false | No | Enable media upload functionality |
| `mediaUploadHandler` | function | - | No | Custom media upload handler |
| `maxImageSize` | number | 5242880 | No | Maximum image size in bytes (5MB) |
| `maxFileSize` | number | 10485760 | No | Maximum file size in bytes (10MB) |
| `allowedImageTypes` | string[] | ['jpg', 'jpeg', 'png', 'gif', 'webp'] | No | Allowed image file types |
| `allowedFileTypes` | string[] | ['pdf', 'doc', 'docx', 'txt'] | No | Allowed file types |
| `customStyles` | CSSStyleSheet[] | [] | No | Custom CSS styles for editor content |
| `contentCSS` | string | - | No | Custom CSS URL for editor content |
| `baseUrl` | string | - | No | Base URL for relative links and images |
| `linkTargets` | LinkTarget[] | [] | No | Available link target options |
| `customMenus` | CustomMenu[] | [] | No | Custom context menus |
| `plugins` | EditorPlugin[] | [] | No | Additional editor plugins |
| `shortcuts` | KeyboardShortcut[] | defaultShortcuts | No | Custom keyboard shortcuts |
| `onModeChange` | function | - | No | Callback when editor mode changes |
| `onContentChange` | function | - | No | Callback when content changes |
| `onSelectionChange` | function | - | No | Callback when selection changes |
| `onImageUpload` | function | - | No | Callback when image is uploaded |
| `onFileUpload` | function | - | No | Callback when file is uploaded |
| `onLinkClick` | function | - | No | Callback when link is clicked |
| `onTableEdit` | function | - | No | Callback when table is edited |
| `readOnly` | boolean | false | No | Make editor read-only |
| `fullScreen` | boolean | false | No | Enable full-screen mode |
| `enableSourceEdit` | boolean | true | No | Allow HTML source editing |
| `enablePreview` | boolean | true | No | Enable preview mode |
| `enablePrint` | boolean | true | No | Enable print functionality |
| `enableExport` | boolean | false | No | Enable export functionality |
| `exportFormats` | ExportFormat[] | ['html', 'pdf'] | No | Available export formats |
| `collaborativeMode` | boolean | false | No | Enable collaborative editing |
| `collaborativeConfig` | CollaborativeConfig | - | No | Collaborative editing configuration |
| `mentionUsers` | MentionUser[] | [] | No | Available users for @mentions |
| `hashtagSuggestions` | string[] | [] | No | Available hashtag suggestions |

**Note**: DocyFieldHtmlEditor inherits all DocyFieldBase props including validation, layout, dynamic computed properties, AI integration, and more. See [DocyFieldBase documentation](./DocyFieldBase.md) for the complete list.

### TypeScript Interfaces

```typescript
interface ToolbarGroup {
  id: string;
  label?: string;
  items: ToolbarItem[];
  visible?: boolean;
  collapsible?: boolean;
}

interface ToolbarItem {
  id: string;
  type: 'button' | 'dropdown' | 'color' | 'separator' | 'input';
  label?: string;
  icon?: string;
  tooltip?: string;
  command?: string;
  keyboard?: string;
  active?: boolean;
  disabled?: boolean;
  visible?: boolean;
  options?: ToolbarOption[];
  style?: Record<string, any>;
}

interface ToolbarOption {
  value: string;
  label: string;
  icon?: string;
  style?: Record<string, any>;
}

interface SanitizeOptions {
  allowedTags: string[];
  allowedAttributes: Record<string, string[]>;
  allowedSchemes: string[];
  allowedClasses: Record<string, string[]>;
  transformTags: Record<string, string>;
  stripIgnoreTag: boolean;
  stripIgnoreTagBody: boolean;
}

interface LinkTarget {
  value: string;
  label: string;
  default?: boolean;
}

interface CustomMenu {
  id: string;
  label: string;
  items: MenuItem[];
  context?: string;
}

interface MenuItem {
  id: string;
  label: string;
  icon?: string;
  command?: string;
  separator?: boolean;
  disabled?: boolean;
  visible?: boolean;
  submenu?: MenuItem[];
}

interface EditorPlugin {
  name: string;
  plugin: any;
  options?: Record<string, any>;
}

interface KeyboardShortcut {
  key: string;
  command: string;
  description?: string;
}

interface ExportFormat {
  format: string;
  label: string;
  mime?: string;
  extension?: string;
}

interface CollaborativeConfig {
  endpoint: string;
  roomId: string;
  userInfo: {
    name: string;
    color: string;
    avatar?: string;
  };
  features: {
    cursors: boolean;
    comments: boolean;
    suggestions: boolean;
    history: boolean;
  };
}

interface MentionUser {
  id: string;
  name: string;
  username: string;
  avatar?: string;
  email?: string;
}

interface EditorSelection {
  start: number;
  end: number;
  text: string;
  html: string;
  node?: Element;
}

interface EditorState {
  mode: 'visual' | 'source' | 'preview' | 'split';
  content: string;
  wordCount: number;
  characterCount: number;
  readingTime: number;
  isModified: boolean;
  canUndo: boolean;
  canRedo: boolean;
  selection: EditorSelection;
  isFullScreen: boolean;
}

interface ImageUploadResult {
  url: string;
  alt?: string;
  title?: string;
  width?: number;
  height?: number;
}

interface FileUploadResult {
  url: string;
  filename: string;
  size: number;
  type: string;
}

interface MediaUploadResult {
  url: string;
  type: 'video' | 'audio';
  filename: string;
  duration?: number;
  thumbnail?: string;
}
```

### Behavior

1. **Multi-Mode Interface**:
   - Visual mode: WYSIWYG editing with formatting toolbar
   - Source mode: Direct HTML editing with syntax highlighting
   - Preview mode: Read-only rendered content display
   - Split mode: Side-by-side visual and source editing

2. **Rich Text Formatting**:
   - Comprehensive formatting toolbar (bold, italic, underline, etc.)
   - Font family, size, and color selection
   - Text alignment and indentation
   - Lists, quotes, and code formatting

3. **Advanced Content**:
   - Table creation and editing with row/column operations
   - Image insertion with resize and alignment options
   - Media embedding (video/audio) with controls
   - Link creation with target and title options

4. **Content Management**:
   - HTML sanitization for security
   - Content validation and error checking
   - Auto-save functionality
   - Undo/redo operations

5. **Collaboration Features**:
   - Real-time collaborative editing
   - User mentions and hashtags
   - Comments and suggestions
   - Change tracking and history

6. **Media Upload**:
   - Drag-and-drop file upload
   - Image optimization and processing
   - File type validation
   - Progress tracking and error handling

## Component Requirements

### Technical Specifications
- **Framework**: React 18+ with TypeScript
- **Base Component**: Custom implementation using TinyMCE, CKEditor, or similar
- **Integration**: Uses shadcn/ui patterns for consistent styling and theming
- **Wrapper**: Extends DocyFieldBase for consistent field structure
- **Styling**: shadcn/ui patterns with Tailwind CSS v4
- **Editor Engine**: TinyMCE, CKEditor, or Slate.js
- **HTML Sanitization**: DOMPurify for security
- **Accessibility**: WCAG 2.1 AA compliance

### Key Features Required
1. **WYSIWYG Editing**: Visual content editing with formatting toolbar
2. **HTML Source Editing**: Direct HTML editing with syntax highlighting
3. **Content Security**: HTML sanitization and validation
4. **Media Support**: Image, video, and file upload capabilities
5. **Table Editing**: Advanced table creation and manipulation
6. **Collaboration**: Real-time editing with multiple users
7. **Accessibility**: Full keyboard navigation and screen reader support

### Usage Examples

```tsx
// Basic rich text editor
<DocyFieldHtmlEditor
  name="content"
  label="Content"
  placeholder="Enter your content..."
  height={400}
  enableTables={true}
  enableImages={true}
/>

// Blog post editor with media upload
<DocyFieldHtmlEditor
  name="blogPost"
  label="Blog Post"
  height={600}
  imageUpload={true}
  mediaUpload={true}
  imageUploadHandler={async (file) => {
    const formData = new FormData();
    formData.append('image', file);
    const response = await fetch('/api/upload/image', {
      method: 'POST',
      body: formData
    });
    const result = await response.json();
    return { url: result.url, alt: file.name };
  }}
  mediaUploadHandler={async (file) => {
    const formData = new FormData();
    formData.append('media', file);
    const response = await fetch('/api/upload/media', {
      method: 'POST',
      body: formData
    });
    const result = await response.json();
    return { url: result.url, type: file.type.startsWith('video') ? 'video' : 'audio' };
  }}
/>

// Secure editor with sanitization
<DocyFieldHtmlEditor
  name="userContent"
  label="User Content"
  sanitizeHtml={true}
  allowedTags={['p', 'br', 'strong', 'em', 'u', 'a', 'ul', 'ol', 'li', 'blockquote']}
  forbiddenTags={['script', 'style', 'iframe', 'object', 'embed']}
  allowedAttributes={{
    'a': ['href', 'title', 'target'],
    'img': ['src', 'alt', 'title', 'width', 'height']
  }}
  maxLength={5000}
  maxWords={1000}
/>

// Email composition editor
<DocyFieldHtmlEditor
  name="emailContent"
  label="Email Content"
  toolbarItems={[
    {
      id: 'formatting',
      label: 'Formatting',
      items: [
        { id: 'bold', type: 'button', icon: 'bold', command: 'bold' },
        { id: 'italic', type: 'button', icon: 'italic', command: 'italic' },
        { id: 'underline', type: 'button', icon: 'underline', command: 'underline' },
        { id: 'color', type: 'color', command: 'forecolor' }
      ]
    },
    {
      id: 'content',
      label: 'Content',
      items: [
        { id: 'link', type: 'button', icon: 'link', command: 'createLink' },
        { id: 'image', type: 'button', icon: 'image', command: 'insertImage' },
        { id: 'table', type: 'button', icon: 'table', command: 'insertTable' }
      ]
    }
  ]}
  height={500}
  enableEmoji={true}
  baseUrl="https://example.com"
/>

// Collaborative document editor
<DocyFieldHtmlEditor
  name="sharedDocument"
  label="Shared Document"
  collaborativeMode={true}
  collaborativeConfig={{
    endpoint: 'wss://collab.example.com',
    roomId: 'doc-123',
    userInfo: {
      name: 'John Doe',
      color: '#3b82f6',
      avatar: 'https://avatar.com/john.jpg'
    },
    features: {
      cursors: true,
      comments: true,
      suggestions: true,
      history: true
    }
  }}
  enableMentions={true}
  mentionUsers={[
    { id: '1', name: 'John Doe', username: 'john.doe', avatar: 'john.jpg' },
    { id: '2', name: 'Jane Smith', username: 'jane.smith', avatar: 'jane.jpg' }
  ]}
  height={700}
/>

// Full-featured editor with all capabilities
<DocyFieldHtmlEditor
  name="fullEditor"
  label="Full Editor"
  mode="visual"
  height={600}
  enableTables={true}
  enableImages={true}
  enableMedia={true}
  enableLinks={true}
  enableLists={true}
  enableQuotes={true}
  enableCode={true}
  enableMath={true}
  enableEmoji={true}
  enableMentions={true}
  enableHashtags={true}
  imageUpload={true}
  fileUpload={true}
  autoSave={true}
  autoSaveInterval={30000}
  enableWordCount={true}
  enableCharCount={true}
  enableReadingTime={true}
  fullScreen={true}
  enablePrint={true}
  enableExport={true}
  exportFormats={[
    { format: 'html', label: 'HTML', mime: 'text/html', extension: 'html' },
    { format: 'pdf', label: 'PDF', mime: 'application/pdf', extension: 'pdf' },
    { format: 'docx', label: 'Word', mime: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', extension: 'docx' }
  ]}
/>

// Custom styled editor
<DocyFieldHtmlEditor
  name="customEditor"
  label="Custom Editor"
  contentCSS="/css/editor-content.css"
  customStyles={[customStyleSheet]}
  customMenus={[
    {
      id: 'custom',
      label: 'Custom',
      items: [
        { id: 'highlight', label: 'Highlight', command: 'highlight' },
        { id: 'separator', separator: true },
        { id: 'custom-format', label: 'Custom Format', command: 'customFormat' }
      ]
    }
  ]}
  plugins={[
    { name: 'highlight', plugin: highlightPlugin },
    { name: 'custom-format', plugin: customFormatPlugin }
  ]}
/>

// Read-only content display
<DocyFieldHtmlEditor
  name="readOnlyContent"
  label="Content Preview"
  mode="preview"
  readOnly={true}
  showToolbar={false}
  height={400}
  modelValue={`
    <h1>Sample Content</h1>
    <p>This is a <strong>sample</strong> content with <em>formatting</em>.</p>
    <ul>
      <li>Item 1</li>
      <li>Item 2</li>
    </ul>
    <blockquote>This is a quote</blockquote>
  `}
/>

// Form integration with validation
<DocyFieldHtmlEditor
  name="validatedContent"
  label="Article Content"
  validations={[
    { type: 'required', message: 'Content is required' },
    { type: 'minLength', value: 200, message: 'Content must be at least 200 characters' }
  ]}
  customValidations={[
    {
      formula: '$length($stripTags(validatedContent)) > 100',
      message: 'Content should have substantial text content'
    },
    {
      formula: '$not($contains(validatedContent, "<script"))',
      message: 'Script tags are not allowed'
    }
  ]}
  actions={{
    change: [
      ['setFieldValue', {
        field: 'wordCount',
        value: '{{ $length($split($stripTags(validatedContent), " ")) }}'
      }],
      ['setFieldValue', {
        field: 'lastModified',
        value: new Date().toISOString()
      }]
    ]
  }}
/>

// Advanced configuration with custom shortcuts
<DocyFieldHtmlEditor
  name="advancedEditor"
  label="Advanced HTML Editor"
  shortcuts={[
    { key: 'Ctrl+B', command: 'bold', description: 'Bold text' },
    { key: 'Ctrl+I', command: 'italic', description: 'Italic text' },
    { key: 'Ctrl+K', command: 'createLink', description: 'Insert link' },
    { key: 'Ctrl+Shift+T', command: 'insertTable', description: 'Insert table' }
  ]}
  onContentChange={(content, state) => {
    console.log('Content changed:', content);
    console.log('Editor state:', state);
  }}
  onSelectionChange={(selection) => {
    console.log('Selection changed:', selection);
  }}
/>
```

### Integration Requirements
- **DocyFieldBase**: Base wrapper component (required)
- **TinyMCE/CKEditor**: Rich text editor engine
- **DOMPurify**: HTML sanitization library
- **DocyIcon**: For toolbar and menu icons
- **DocyMenu**: For dropdown menus and context menus
- **DocyDialog**: For link dialogs, table wizards, and settings
- **DocyUpload**: For image and file upload functionality
- **DocyTooltip**: For toolbar tooltips and help text

### Dependencies Required
- `tinymce` or `@ckeditor/ckeditor5-react`: Rich text editor
- `dompurify`: HTML sanitization
- `html2pdf.js`: PDF export functionality
- `mammoth`: DOCX export functionality
- `react-hook-form`: Form integration (inherited from DocyFieldBase)
- `class-variance-authority`: Variant management
- `file-saver`: File download functionality
- All DocyFieldBase dependencies

### Testing Requirements
1. **Unit Tests**: HTML sanitization, formatting commands, toolbar actions
2. **Integration Tests**: React Hook Form integration, upload handlers, collaborative features
3. **Visual Tests**: All modes, themes, responsive behavior, content rendering
4. **Accessibility Tests**: Keyboard navigation, screen reader support, ARIA attributes
5. **Performance Tests**: Large content handling, real-time collaboration, media upload
6. **Security Tests**: HTML sanitization, XSS prevention, content validation
7. **Feature Tests**: All editing features, export functionality, collaboration tools

## Development Priority
**High** - Essential for content management, email composition, and rich text editing workflows

## Notes
- Built with comprehensive security features including HTML sanitization
- Supports multiple editor engines for flexibility and performance
- Collaborative editing enables team content creation workflows
- Advanced media handling with upload and optimization capabilities
- Accessibility features ensure inclusive content creation experience
- Performance optimized for large documents and real-time editing
- Extensible plugin architecture allows custom editor enhancements
- Complete keyboard shortcuts and command support for efficient editing
- Export capabilities provide flexible output options for various formats
- Integration with AI assistance for content generation and improvement