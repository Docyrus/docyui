# DocyFieldMarkdownEditor Component

## Overview
DocyFieldMarkdownEditor is a comprehensive Markdown editor component that extends DocyFieldBase to provide advanced Markdown editing, real-time preview, and rich formatting capabilities. It features live preview, syntax highlighting, toolbar actions, table editing, and support for extended Markdown features like math equations, diagrams, and code blocks.

The component is designed for documentation, blog posts, README files, technical writing, and any content requiring rich text formatting with Markdown syntax.

## Component Specification

### Props
DocyFieldMarkdownEditor inherits ALL props from DocyFieldBase and adds the following Markdown editor-specific properties:

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `modelValue` | string | '' | No | Current Markdown content |
| `mode` | 'edit' \| 'preview' \| 'split' | 'split' | No | Editor display mode |
| `theme` | 'light' \| 'dark' \| 'auto' | 'light' | No | Editor theme |
| `height` | number \| string | 400 | No | Editor height in pixels or CSS units |
| `width` | number \| string | '100%' | No | Editor width in pixels or CSS units |
| `autoResize` | boolean | true | No | Automatically resize editor to content |
| `minHeight` | number | 200 | No | Minimum editor height |
| `maxHeight` | number | 1000 | No | Maximum editor height |
| `showLineNumbers` | boolean | false | No | Show line numbers in editor |
| `wordWrap` | boolean | true | No | Enable word wrapping |
| `tabSize` | number | 2 | No | Tab size for indentation |
| `insertSpaces` | boolean | true | No | Insert spaces instead of tabs |
| `showToolbar` | boolean | true | No | Show formatting toolbar |
| `toolbarItems` | ToolbarItem[] | defaultToolbar | No | Custom toolbar configuration |
| `showPreview` | boolean | true | No | Show live preview pane |
| `previewTheme` | string | 'github' | No | Preview theme (github, gitlab, etc.) |
| `syncScroll` | boolean | true | No | Synchronize scrolling between editor and preview |
| `placeholder` | string | 'Enter Markdown...' | No | Placeholder text for empty editor |
| `spellCheck` | boolean | true | No | Enable spell checking |
| `autoComplete` | boolean | true | No | Enable auto-completion |
| `bracketMatching` | boolean | true | No | Enable bracket matching |
| `autoCloseBrackets` | boolean | true | No | Auto-close brackets and quotes |
| `autoLinkify` | boolean | true | No | Automatically convert URLs to links |
| `enableMath` | boolean | false | No | Enable LaTeX math rendering |
| `mathDelimiters` | MathDelimiters | defaultMath | No | Math delimiter configuration |
| `enableDiagrams` | boolean | false | No | Enable diagram rendering (Mermaid) |
| `enableTables` | boolean | true | No | Enable table editing helpers |
| `enableCodeBlocks` | boolean | true | No | Enable code block syntax highlighting |
| `enableEmoji` | boolean | true | No | Enable emoji shortcuts and rendering |
| `enableTaskLists` | boolean | true | No | Enable task list (checkbox) support |
| `enableFootnotes` | boolean | true | No | Enable footnote support |
| `enableTOC` | boolean | false | No | Enable table of contents generation |
| `tocLevels` | number[] | [1, 2, 3] | No | Heading levels to include in TOC |
| `enableHighlight` | boolean | true | No | Enable text highlighting |
| `enableSubscript` | boolean | true | No | Enable subscript text |
| `enableSuperscript` | boolean | true | No | Enable superscript text |
| `enableStrikethrough` | boolean | true | No | Enable strikethrough text |
| `enableDefinitionLists` | boolean | true | No | Enable definition list syntax |
| `imageUpload` | boolean | false | No | Enable image upload functionality |
| `imageUploadHandler` | function | - | No | Custom image upload handler |
| `fileUpload` | boolean | false | No | Enable file upload functionality |
| `fileUploadHandler` | function | - | No | Custom file upload handler |
| `maxImageSize` | number | 5242880 | No | Maximum image size in bytes (5MB) |
| `allowedImageTypes` | string[] | ['jpg', 'jpeg', 'png', 'gif', 'webp'] | No | Allowed image file types |
| `customRenderers` | CustomRenderer[] | [] | No | Custom Markdown renderers |
| `plugins` | MarkdownPlugin[] | [] | No | Additional Markdown plugins |
| `shortcuts` | KeyboardShortcut[] | defaultShortcuts | No | Custom keyboard shortcuts |
| `onModeChange` | function | - | No | Callback when editor mode changes |
| `onPreviewScroll` | function | - | No | Callback when preview scrolls |
| `onImageUpload` | function | - | No | Callback when image is uploaded |
| `onFileUpload` | function | - | No | Callback when file is uploaded |
| `onLinkClick` | function | - | No | Callback when link is clicked |
| `readOnly` | boolean | false | No | Make editor read-only |
| `showStatusBar` | boolean | true | No | Show status bar with document info |
| `statusBarItems` | StatusBarItem[] | defaultStatus | No | Custom status bar items |
| `searchEnabled` | boolean | true | No | Enable search functionality |
| `replaceEnabled` | boolean | true | No | Enable find/replace functionality |
| `printEnabled` | boolean | true | No | Enable print functionality |
| `exportEnabled` | boolean | true | No | Enable export functionality |
| `exportFormats` | ExportFormat[] | ['html', 'pdf'] | No | Available export formats |

**Note**: DocyFieldMarkdownEditor inherits all DocyFieldBase props including validation, layout, dynamic computed properties, AI integration, and more. See [DocyFieldBase documentation](./DocyFieldBase.md) for the complete list.

### TypeScript Interfaces

```typescript
interface ToolbarItem {
  id: string;
  type: 'button' | 'separator' | 'dropdown' | 'group';
  label?: string;
  icon?: string;
  tooltip?: string;
  command?: string;
  keyboard?: string;
  active?: boolean;
  disabled?: boolean;
  visible?: boolean;
  options?: ToolbarOption[];
  children?: ToolbarItem[];
}

interface ToolbarOption {
  value: string;
  label: string;
  icon?: string;
}

interface MathDelimiters {
  inline: [string, string];
  display: [string, string];
}

interface CustomRenderer {
  type: string;
  render: (tokens: any[], idx: number, options: any, env: any) => string;
}

interface MarkdownPlugin {
  name: string;
  plugin: any;
  options?: Record<string, any>;
}

interface KeyboardShortcut {
  key: string;
  command: string;
  description?: string;
}

interface StatusBarItem {
  id: string;
  type: 'text' | 'button' | 'progress';
  content: string | (() => string);
  position: 'left' | 'right';
  priority: number;
  visible?: boolean;
}

interface ExportFormat {
  format: string;
  label: string;
  mime?: string;
  extension?: string;
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

interface EditorState {
  mode: 'edit' | 'preview' | 'split';
  wordCount: number;
  characterCount: number;
  lineCount: number;
  selectedText: string;
  cursorPosition: { line: number; column: number };
  scrollPosition: { top: number; left: number };
  isModified: boolean;
  isValid: boolean;
}

interface TableEditHelper {
  insertTable: (rows: number, cols: number) => void;
  insertRow: (position: 'above' | 'below') => void;
  insertColumn: (position: 'left' | 'right') => void;
  deleteRow: () => void;
  deleteColumn: () => void;
  alignColumn: (alignment: 'left' | 'center' | 'right') => void;
}
```

### Behavior

1. **Multi-Mode Interface**:
   - Edit mode: Full-screen Markdown editor
   - Preview mode: Rendered Markdown display
   - Split mode: Side-by-side editor and preview
   - Seamless mode switching with content preservation

2. **Real-time Preview**:
   - Live rendering of Markdown content
   - Synchronized scrolling between editor and preview
   - Custom preview themes and styling
   - Math equation and diagram rendering

3. **Rich Formatting Tools**:
   - Comprehensive toolbar with formatting options
   - Keyboard shortcuts for common operations
   - Auto-completion for Markdown syntax
   - Table editing helpers and wizards

4. **Extended Markdown Support**:
   - LaTeX math equations with MathJax/KaTeX
   - Mermaid diagrams and flowcharts
   - Task lists with interactive checkboxes
   - Footnotes and definition lists

5. **Media Handling**:
   - Image upload with drag-and-drop support
   - File attachment capabilities
   - Automatic image optimization
   - Custom upload handlers

6. **Export and Sharing**:
   - Export to HTML, PDF, and other formats
   - Print functionality with custom styling
   - Copy formatted content to clipboard
   - Share and collaboration features

## Component Requirements

### Technical Specifications
- **Framework**: React 18+ with TypeScript
- **Base Component**: Custom implementation using Monaco Editor or CodeMirror
- **Integration**: Uses shadcn/ui patterns for consistent styling and theming
- **Wrapper**: Extends DocyFieldBase for consistent field structure
- **Styling**: shadcn/ui patterns with Tailwind CSS v4
- **Markdown Engine**: Marked.js or Remark with custom plugins
- **Math Rendering**: MathJax or KaTeX for LaTeX support
- **Diagrams**: Mermaid for diagram rendering
- **Accessibility**: WCAG 2.1 AA compliance

### Key Features Required
1. **Multi-Mode Interface**: Edit, preview, and split-screen modes
2. **Real-time Preview**: Live rendering with synchronized scrolling
3. **Rich Toolbar**: Comprehensive formatting tools and shortcuts
4. **Extended Markdown**: Math, diagrams, tables, and task lists
5. **Media Support**: Image and file upload capabilities
6. **Export Options**: Multiple export formats and print support
7. **Accessibility**: Full keyboard navigation and screen reader support

### Usage Examples

```tsx
// Basic Markdown editor
<DocyFieldMarkdownEditor
  name="description"
  label="Description"
  placeholder="Enter your description in Markdown..."
  height={400}
  mode="split"
/>

// Advanced editor with math and diagrams
<DocyFieldMarkdownEditor
  name="documentation"
  label="Technical Documentation"
  enableMath={true}
  enableDiagrams={true}
  enableTOC={true}
  tocLevels={[1, 2, 3, 4]}
  height={600}
  mathDelimiters={{
    inline: ['$', '$'],
    display: ['$$', '$$']
  }}
/>

// Blog post editor with image upload
<DocyFieldMarkdownEditor
  name="blogPost"
  label="Blog Post"
  imageUpload={true}
  imageUploadHandler={async (file) => {
    const formData = new FormData();
    formData.append('image', file);
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData
    });
    const result = await response.json();
    return { url: result.url, alt: file.name };
  }}
  maxImageSize={10485760} // 10MB
  allowedImageTypes={['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg']}
/>

// README editor with custom toolbar
<DocyFieldMarkdownEditor
  name="readme"
  label="README.md"
  toolbarItems={[
    { id: 'bold', type: 'button', icon: 'bold', command: 'bold', keyboard: 'Ctrl+B' },
    { id: 'italic', type: 'button', icon: 'italic', command: 'italic', keyboard: 'Ctrl+I' },
    { id: 'separator1', type: 'separator' },
    { id: 'heading', type: 'dropdown', icon: 'heading', options: [
      { value: '1', label: 'Heading 1' },
      { value: '2', label: 'Heading 2' },
      { value: '3', label: 'Heading 3' }
    ]},
    { id: 'code', type: 'button', icon: 'code', command: 'code-block' },
    { id: 'table', type: 'button', icon: 'table', command: 'insert-table' }
  ]}
  height={500}
/>

// Documentation with custom plugins
<DocyFieldMarkdownEditor
  name="apiDocs"
  label="API Documentation"
  plugins={[
    { name: 'highlight', plugin: highlightPlugin, options: { theme: 'github' } },
    { name: 'api-docs', plugin: apiDocsPlugin, options: { baseUrl: '/api' } }
  ]}
  customRenderers={[
    {
      type: 'api-endpoint',
      render: (tokens, idx, options, env) => {
        const token = tokens[idx];
        return `<div class="api-endpoint">${token.content}</div>`;
      }
    }
  ]}
/>

// Collaborative editing
<DocyFieldMarkdownEditor
  name="sharedDoc"
  label="Shared Document"
  mode="split"
  height={600}
  syncScroll={true}
  enableTables={true}
  enableTaskLists={true}
  enableFootnotes={true}
  onModeChange={(mode) => {
    console.log('Mode changed to:', mode);
  }}
/>

// Read-only documentation viewer
<DocyFieldMarkdownEditor
  name="docViewer"
  label="Documentation"
  mode="preview"
  readOnly={true}
  showToolbar={false}
  enableMath={true}
  enableDiagrams={true}
  height={400}
  modelValue={`
# API Documentation

## Authentication

All API requests require authentication using Bearer tokens:

\`\`\`javascript
const response = await fetch('/api/users', {
  headers: {
    'Authorization': 'Bearer ' + token
  }
});
\`\`\`

## Math Example

The quadratic formula is: $x = \\frac{-b \\pm \\sqrt{b^2-4ac}}{2a}$

## Diagram Example

\`\`\`mermaid
graph TD
    A[Start] --> B{Is it?}
    B -->|Yes| C[OK]
    B -->|No| D[End]
\`\`\`
  `}
/>

// Form integration with validation
<DocyFieldMarkdownEditor
  name="validatedMarkdown"
  label="Content"
  validations={[
    { type: 'required', message: 'Content is required' },
    { type: 'minLength', value: 100, message: 'Content must be at least 100 characters' }
  ]}
  customValidations={[
    {
      formula: '$length(validatedMarkdown) > 50',
      message: 'Content should be more detailed'
    },
    {
      formula: '$contains(validatedMarkdown, "#")',
      message: 'Content should include at least one heading'
    }
  ]}
  actions={{
    change: [
      ['setFieldValue', {
        field: 'wordCount',
        value: '{{ $length($split(validatedMarkdown, " ")) }}'
      }],
      ['setFieldValue', {
        field: 'lastEdited',
        value: new Date().toISOString()
      }]
    ]
  }}
/>

// Custom export options
<DocyFieldMarkdownEditor
  name="exportableContent"
  label="Exportable Content"
  exportEnabled={true}
  exportFormats={[
    { format: 'html', label: 'HTML', mime: 'text/html', extension: 'html' },
    { format: 'pdf', label: 'PDF', mime: 'application/pdf', extension: 'pdf' },
    { format: 'docx', label: 'Word Document', mime: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', extension: 'docx' }
  ]}
  printEnabled={true}
  statusBarItems={[
    { id: 'words', type: 'text', content: () => `Words: ${wordCount}`, position: 'left', priority: 1 },
    { id: 'chars', type: 'text', content: () => `Characters: ${charCount}`, position: 'left', priority: 2 },
    { id: 'export', type: 'button', content: 'Export', position: 'right', priority: 1 }
  ]}
/>

// Advanced configuration
<DocyFieldMarkdownEditor
  name="advancedEditor"
  label="Advanced Markdown Editor"
  height={700}
  enableMath={true}
  enableDiagrams={true}
  enableTables={true}
  enableTaskLists={true}
  enableFootnotes={true}
  enableHighlight={true}
  enableSubscript={true}
  enableSuperscript={true}
  enableStrikethrough={true}
  enableDefinitionLists={true}
  shortcuts={[
    { key: 'Ctrl+K', command: 'insert-link', description: 'Insert link' },
    { key: 'Ctrl+Shift+K', command: 'insert-code-block', description: 'Insert code block' },
    { key: 'Ctrl+T', command: 'insert-table', description: 'Insert table' }
  ]}
  onImageUpload={(result) => {
    console.log('Image uploaded:', result);
  }}
/>
```

### Integration Requirements
- **DocyFieldBase**: Base wrapper component (required)
- **Monaco Editor**: For advanced code editing capabilities
- **Marked.js**: Markdown parsing and rendering
- **MathJax/KaTeX**: Math equation rendering
- **Mermaid**: Diagram and flowchart rendering
- **DocyIcon**: For toolbar and status icons
- **DocyMenu**: For dropdown menus and context menus
- **DocyDialog**: For table wizards and export dialogs
- **DocyUpload**: For image and file upload functionality

### Dependencies Required
- `marked`: Markdown parsing library
- `highlight.js`: Code syntax highlighting
- `katex` or `mathjax`: Math rendering
- `mermaid`: Diagram rendering
- `dompurify`: HTML sanitization
- `react-hook-form`: Form integration (inherited from DocyFieldBase)
- `class-variance-authority`: Variant management
- `file-saver`: Export functionality
- All DocyFieldBase dependencies

### Testing Requirements
1. **Unit Tests**: Markdown parsing, rendering, toolbar actions, shortcuts
2. **Integration Tests**: React Hook Form integration, upload handlers, export functionality
3. **Visual Tests**: All modes, themes, responsive behavior, preview rendering
4. **Accessibility Tests**: Keyboard navigation, screen reader support, ARIA attributes
5. **Performance Tests**: Large document handling, real-time preview, math rendering
6. **Feature Tests**: Math equations, diagrams, tables, task lists, footnotes
7. **Export Tests**: All export formats, print functionality, file generation

## Development Priority
**High** - Essential for documentation, content creation, and technical writing workflows

## Notes
- Built with extensible plugin architecture for custom features
- Comprehensive Markdown support including CommonMark and GitHub extensions
- Real-time preview with synchronized scrolling enhances writing experience
- Math and diagram support enables technical documentation
- Image upload and media handling streamline content creation
- Export capabilities provide flexible output options
- Accessibility features ensure inclusive content creation experience
- Performance optimized for large documents and real-time editing
- Collaborative features enable team documentation workflows
- Complete keyboard shortcuts and command support for efficient editing