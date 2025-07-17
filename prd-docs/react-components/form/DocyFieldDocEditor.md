# DocyFieldDocEditor Component

## Overview
DocyFieldDocEditor is a comprehensive document editor component that extends DocyFieldBase to provide advanced document editing capabilities similar to Google Docs or Microsoft Word Online. It features collaborative editing, document formatting, commenting, version control, and document management functionality for professional document creation and collaboration.

The component is designed for document management systems, collaborative writing, report generation, and any application requiring professional document editing with real-time collaboration.

## Component Specification

### Props
DocyFieldDocEditor inherits ALL props from DocyFieldBase and adds the following document editor-specific properties:

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `modelValue` | DocumentContent | - | No | Current document content object |
| `mode` | 'edit' \| 'review' \| 'preview' \| 'print' | 'edit' | No | Editor mode |
| `theme` | 'light' \| 'dark' \| 'auto' | 'light' | No | Editor theme |
| `documentType` | 'document' \| 'letter' \| 'report' \| 'article' \| 'custom' | 'document' | No | Document type for formatting |
| `pageSize` | 'A4' \| 'Letter' \| 'Legal' \| 'A3' \| 'Custom' | 'A4' | No | Document page size |
| `pageOrientation` | 'portrait' \| 'landscape' | 'portrait' | No | Page orientation |
| `pageMargins` | PageMargins | defaultMargins | No | Page margin settings |
| `showRuler` | boolean | true | No | Show document ruler |
| `showPageBreaks` | boolean | true | No | Show page break indicators |
| `showPageNumbers` | boolean | true | No | Show page numbers |
| `showWordCount` | boolean | true | No | Show word count |
| `showCharCount` | boolean | true | No | Show character count |
| `showReadingTime` | boolean | true | No | Show estimated reading time |
| `enableZoom` | boolean | true | No | Enable zoom functionality |
| `zoomLevel` | number | 100 | No | Initial zoom level (percentage) |
| `minZoom` | number | 25 | No | Minimum zoom level |
| `maxZoom` | number | 500 | No | Maximum zoom level |
| `showToolbar` | boolean | true | No | Show formatting toolbar |
| `toolbarLayout` | 'ribbon' \| 'compact' \| 'minimal' | 'ribbon' | No | Toolbar layout style |
| `toolbarItems` | DocToolbarGroup[] | defaultDocToolbar | No | Custom toolbar configuration |
| `enableFormatting` | boolean | true | No | Enable text formatting |
| `enableStyles` | boolean | true | No | Enable paragraph styles |
| `enableTables` | boolean | true | No | Enable table insertion and editing |
| `enableImages` | boolean | true | No | Enable image insertion |
| `enableShapes` | boolean | true | No | Enable shape insertion |
| `enableCharts` | boolean | true | No | Enable chart insertion |
| `enableComments` | boolean | true | No | Enable commenting system |
| `enableSuggestions` | boolean | true | No | Enable suggestion mode |
| `enableTracking` | boolean | true | No | Enable change tracking |
| `enableVersioning` | boolean | true | No | Enable version control |
| `enableCollaboration` | boolean | true | No | Enable real-time collaboration |
| `collaborativeConfig` | CollaborativeConfig | - | No | Collaborative editing configuration |
| `enableOutline` | boolean | true | No | Enable document outline |
| `outlineVisible` | boolean | false | No | Show outline panel by default |
| `enableTOC` | boolean | true | No | Enable table of contents |
| `tocAutoUpdate` | boolean | true | No | Auto-update table of contents |
| `enableFootnotes` | boolean | true | No | Enable footnotes |
| `enableEndnotes` | boolean | true | No | Enable endnotes |
| `enableBibliography` | boolean | true | No | Enable bibliography |
| `citationStyle` | string | 'APA' | No | Citation style (APA, MLA, Chicago, etc.) |
| `enableHeaders` | boolean | true | No | Enable headers and footers |
| `headerTemplate` | string | - | No | Default header template |
| `footerTemplate` | string | - | No | Default footer template |
| `enableWatermark` | boolean | false | No | Enable watermark |
| `watermarkText` | string | - | No | Watermark text |
| `enableProtection` | boolean | false | No | Enable document protection |
| `protectionType` | 'readonly' \| 'forms' \| 'comments' \| 'tracked' | 'readonly' | No | Document protection type |
| `protectionPassword` | string | - | No | Protection password |
| `enableTemplates` | boolean | true | No | Enable document templates |
| `templates` | DocumentTemplate[] | [] | No | Available document templates |
| `templateCategories` | TemplateCategory[] | [] | No | Template categories |
| `enableExport` | boolean | true | No | Enable document export |
| `exportFormats` | ExportFormat[] | ['docx', 'pdf', 'html'] | No | Available export formats |
| `enablePrint` | boolean | true | No | Enable printing |
| `printOptions` | PrintOptions | defaultPrintOptions | No | Print configuration |
| `enableSpellCheck` | boolean | true | No | Enable spell checking |
| `spellCheckLanguage` | string | 'en-US' | No | Spell check language |
| `enableGrammarCheck` | boolean | true | No | Enable grammar checking |
| `enableAutoSave` | boolean | true | No | Enable auto-save |
| `autoSaveInterval` | number | 30000 | No | Auto-save interval in milliseconds |
| `enableSearch` | boolean | true | No | Enable search functionality |
| `enableReplace` | boolean | true | No | Enable find and replace |
| `enableAdvancedSearch` | boolean | true | No | Enable advanced search options |
| `onDocumentChange` | function | - | No | Callback when document changes |
| `onModeChange` | function | - | No | Callback when editor mode changes |
| `onCommentAdd` | function | - | No | Callback when comment is added |
| `onSuggestionAdd` | function | - | No | Callback when suggestion is added |
| `onVersionSave` | function | - | No | Callback when version is saved |
| `onCollaboratorJoin` | function | - | No | Callback when collaborator joins |
| `onCollaboratorLeave` | function | - | No | Callback when collaborator leaves |
| `onExport` | function | - | No | Callback when document is exported |
| `onPrint` | function | - | No | Callback when document is printed |
| `readOnly` | boolean | false | No | Make document read-only |
| `customStyles` | DocumentStyle[] | [] | No | Custom paragraph styles |
| `customFonts` | FontFamily[] | [] | No | Custom font families |
| `enableAI` | boolean | false | No | Enable AI writing assistance |
| `aiConfig` | AIConfig | - | No | AI assistance configuration |
| `enableAccessibility` | boolean | true | No | Enable accessibility features |
| `accessibilityOptions` | AccessibilityOptions | - | No | Accessibility configuration |

**Note**: DocyFieldDocEditor inherits all DocyFieldBase props including validation, layout, dynamic computed properties, AI integration, and more. See [DocyFieldBase documentation](./DocyFieldBase.md) for the complete list.

### TypeScript Interfaces

```typescript
interface DocumentContent {
  title: string;
  content: string;
  metadata: DocumentMetadata;
  formatting: DocumentFormatting;
  comments: Comment[];
  suggestions: Suggestion[];
  versions: DocumentVersion[];
  outline: OutlineItem[];
  toc?: TableOfContents;
  footnotes?: Footnote[];
  endnotes?: Endnote[];
  bibliography?: BibliographyItem[];
}

interface DocumentMetadata {
  id: string;
  title: string;
  author: string;
  createdAt: string;
  updatedAt: string;
  version: number;
  wordCount: number;
  charCount: number;
  pageCount: number;
  readingTime: number;
  tags: string[];
  category: string;
  language: string;
  status: 'draft' | 'review' | 'approved' | 'published';
}

interface DocumentFormatting {
  pageSize: string;
  pageOrientation: 'portrait' | 'landscape';
  margins: PageMargins;
  defaultFont: string;
  defaultFontSize: number;
  lineSpacing: number;
  paragraphSpacing: number;
  headerFooter: HeaderFooter;
  watermark?: Watermark;
}

interface PageMargins {
  top: number;
  right: number;
  bottom: number;
  left: number;
  header: number;
  footer: number;
}

interface HeaderFooter {
  header: {
    enabled: boolean;
    content: string;
    differentFirstPage: boolean;
    differentOddEven: boolean;
  };
  footer: {
    enabled: boolean;
    content: string;
    differentFirstPage: boolean;
    differentOddEven: boolean;
  };
}

interface Watermark {
  text: string;
  opacity: number;
  angle: number;
  color: string;
  fontSize: number;
}

interface Comment {
  id: string;
  text: string;
  author: string;
  timestamp: string;
  position: TextPosition;
  resolved: boolean;
  replies: CommentReply[];
  highlighted: boolean;
}

interface CommentReply {
  id: string;
  text: string;
  author: string;
  timestamp: string;
}

interface Suggestion {
  id: string;
  type: 'insert' | 'delete' | 'replace' | 'format';
  author: string;
  timestamp: string;
  position: TextPosition;
  originalText: string;
  suggestedText: string;
  status: 'pending' | 'accepted' | 'rejected';
  reason?: string;
}

interface DocumentVersion {
  id: string;
  version: number;
  content: string;
  author: string;
  timestamp: string;
  changes: Change[];
  message: string;
}

interface Change {
  type: 'insert' | 'delete' | 'format' | 'move';
  position: TextPosition;
  content: string;
  author: string;
  timestamp: string;
}

interface TextPosition {
  start: number;
  end: number;
  line?: number;
  column?: number;
}

interface OutlineItem {
  id: string;
  level: number;
  title: string;
  position: number;
  children: OutlineItem[];
  visible: boolean;
}

interface TableOfContents {
  enabled: boolean;
  levels: number[];
  format: 'simple' | 'detailed';
  position: 'top' | 'bottom' | 'custom';
  autoUpdate: boolean;
  items: TOCItem[];
}

interface TOCItem {
  id: string;
  title: string;
  level: number;
  pageNumber: number;
  position: number;
}

interface Footnote {
  id: string;
  number: number;
  text: string;
  position: number;
  pageNumber: number;
}

interface Endnote {
  id: string;
  number: number;
  text: string;
  position: number;
}

interface BibliographyItem {
  id: string;
  type: 'book' | 'article' | 'website' | 'journal';
  title: string;
  author: string;
  year: number;
  publisher?: string;
  url?: string;
  pages?: string;
  citation: string;
}

interface DocumentTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  thumbnail: string;
  content: string;
  formatting: DocumentFormatting;
  variables: TemplateVariable[];
  isPublic: boolean;
  createdBy: string;
  createdAt: string;
}

interface TemplateVariable {
  name: string;
  label: string;
  type: 'text' | 'number' | 'date' | 'image';
  defaultValue: any;
  required: boolean;
  description: string;
}

interface TemplateCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  templates: DocumentTemplate[];
}

interface DocToolbarGroup {
  id: string;
  label: string;
  items: DocToolbarItem[];
  visible: boolean;
  collapsible: boolean;
  position: 'main' | 'contextual';
}

interface DocToolbarItem {
  id: string;
  type: 'button' | 'dropdown' | 'color' | 'font' | 'separator' | 'toggle';
  label: string;
  icon: string;
  tooltip: string;
  command: string;
  keyboard?: string;
  active?: boolean;
  disabled?: boolean;
  visible?: boolean;
  options?: any[];
}

interface CollaborativeConfig {
  endpoint: string;
  roomId: string;
  userInfo: {
    name: string;
    email: string;
    avatar?: string;
    role: 'owner' | 'editor' | 'commenter' | 'viewer';
  };
  permissions: {
    edit: boolean;
    comment: boolean;
    suggest: boolean;
    resolve: boolean;
    export: boolean;
  };
  features: {
    cursors: boolean;
    selections: boolean;
    comments: boolean;
    suggestions: boolean;
    history: boolean;
  };
}

interface PrintOptions {
  paperSize: string;
  orientation: 'portrait' | 'landscape';
  margins: PageMargins;
  scale: number;
  pages: 'all' | 'current' | 'range';
  pageRange?: string;
  copies: number;
  collate: boolean;
  duplex: 'none' | 'horizontal' | 'vertical';
  color: boolean;
  quality: 'draft' | 'normal' | 'high';
}

interface ExportFormat {
  format: string;
  label: string;
  mime: string;
  extension: string;
  options?: Record<string, any>;
}

interface DocumentStyle {
  id: string;
  name: string;
  type: 'paragraph' | 'character' | 'table' | 'list';
  css: Record<string, string>;
  preview: string;
  category: string;
}

interface FontFamily {
  name: string;
  display: string;
  fallback: string[];
  type: 'serif' | 'sans-serif' | 'monospace' | 'cursive' | 'fantasy';
  variants: FontVariant[];
}

interface FontVariant {
  weight: number;
  style: 'normal' | 'italic';
  url?: string;
}

interface AIConfig {
  endpoint: string;
  apiKey: string;
  features: {
    writing: boolean;
    grammar: boolean;
    summarization: boolean;
    translation: boolean;
    completion: boolean;
  };
  model: string;
  temperature: number;
}

interface AccessibilityOptions {
  highContrast: boolean;
  largeText: boolean;
  screenReader: boolean;
  keyboardNavigation: boolean;
  altTextRequired: boolean;
  colorBlindSupport: boolean;
  focusIndicators: boolean;
}
```

### Behavior

1. **Document Editing**:
   - Professional document editing with comprehensive formatting
   - Page layout with rulers, margins, and page breaks
   - Multiple document types and templates
   - Real-time word count and statistics

2. **Collaboration**:
   - Real-time collaborative editing with conflict resolution
   - Comment system with threaded discussions
   - Suggestion mode for review workflows
   - Change tracking and version control

3. **Advanced Features**:
   - Table of contents generation and management
   - Footnotes and endnotes support
   - Bibliography and citation management
   - Headers and footers with page numbering

4. **Document Management**:
   - Version history with restore capabilities
   - Document protection and permissions
   - Template system with variables
   - Export to multiple formats

5. **Accessibility**:
   - Screen reader support and ARIA attributes
   - High contrast and large text options
   - Keyboard navigation throughout
   - Alt text requirements for images

6. **AI Integration**:
   - Writing assistance and suggestions
   - Grammar and spell checking
   - Document summarization
   - Translation capabilities

## Component Requirements

### Technical Specifications
- **Framework**: React 18+ with TypeScript
- **Base Component**: Custom implementation using document editing libraries
- **Integration**: Uses shadcn/ui patterns for consistent styling and theming
- **Wrapper**: Extends DocyFieldBase for consistent field structure
- **Styling**: shadcn/ui patterns with Tailwind CSS v4
- **Document Engine**: Custom document editor or adapted solution
- **Real-time**: WebSocket-based collaboration
- **Accessibility**: WCAG 2.1 AA compliance

### Key Features Required
1. **Professional Editing**: Full document editing with formatting and layout
2. **Real-time Collaboration**: Multiple users editing simultaneously
3. **Document Management**: Versioning, templates, and organization
4. **Review Workflow**: Comments, suggestions, and approval processes
5. **Export Options**: Multiple format support (DOCX, PDF, HTML)
6. **Accessibility**: Complete accessibility support and validation
7. **AI Integration**: Writing assistance and content enhancement

### Usage Examples

```tsx
// Basic document editor
<DocyFieldDocEditor
  name="document"
  label="Document"
  documentType="document"
  pageSize="A4"
  showRuler={true}
  showWordCount={true}
  height={800}
/>

// Collaborative document
<DocyFieldDocEditor
  name="collaborativeDoc"
  label="Collaborative Document"
  enableCollaboration={true}
  collaborativeConfig={{
    endpoint: 'wss://collab.example.com',
    roomId: 'doc-123',
    userInfo: {
      name: 'John Doe',
      email: 'john@example.com',
      avatar: 'john.jpg',
      role: 'editor'
    },
    permissions: {
      edit: true,
      comment: true,
      suggest: true,
      resolve: true,
      export: true
    },
    features: {
      cursors: true,
      selections: true,
      comments: true,
      suggestions: true,
      history: true
    }
  }}
/>

// Academic paper editor
<DocyFieldDocEditor
  name="academicPaper"
  label="Academic Paper"
  documentType="article"
  enableFootnotes={true}
  enableEndnotes={true}
  enableBibliography={true}
  citationStyle="APA"
  enableTOC={true}
  tocAutoUpdate={true}
  spellCheckLanguage="en-US"
  enableGrammarCheck={true}
/>

// Business report editor
<DocyFieldDocEditor
  name="businessReport"
  label="Business Report"
  documentType="report"
  enableHeaders={true}
  headerTemplate="{{company_name}} - {{document_title}}"
  footerTemplate="Page {{page_number}} of {{total_pages}} | {{date}}"
  enableWatermark={true}
  watermarkText="CONFIDENTIAL"
  enableProtection={true}
  protectionType="readonly"
/>

// Template-based document
<DocyFieldDocEditor
  name="templateDoc"
  label="Template Document"
  enableTemplates={true}
  templates={[
    {
      id: '1',
      name: 'Business Letter',
      category: 'business',
      content: letterTemplate,
      variables: [
        { name: 'recipient_name', label: 'Recipient Name', type: 'text', required: true },
        { name: 'company_name', label: 'Company Name', type: 'text', required: true },
        { name: 'date', label: 'Date', type: 'date', defaultValue: new Date() }
      ]
    }
  ]}
  templateCategories={[
    { id: 'business', name: 'Business', description: 'Business documents' }
  ]}
/>

// Review mode document
<DocyFieldDocEditor
  name="reviewDoc"
  label="Document Review"
  mode="review"
  enableComments={true}
  enableSuggestions={true}
  enableTracking={true}
  onCommentAdd={(comment) => {
    console.log('Comment added:', comment);
  }}
  onSuggestionAdd={(suggestion) => {
    console.log('Suggestion added:', suggestion);
  }}
/>

// AI-enhanced document editor
<DocyFieldDocEditor
  name="aiDoc"
  label="AI-Enhanced Document"
  enableAI={true}
  aiConfig={{
    endpoint: '/api/ai',
    apiKey: 'your-api-key',
    features: {
      writing: true,
      grammar: true,
      summarization: true,
      translation: true,
      completion: true
    },
    model: 'gpt-4',
    temperature: 0.7
  }}
  enableSpellCheck={true}
  enableGrammarCheck={true}
/>

// Accessible document editor
<DocyFieldDocEditor
  name="accessibleDoc"
  label="Accessible Document"
  enableAccessibility={true}
  accessibilityOptions={{
    highContrast: false,
    largeText: false,
    screenReader: true,
    keyboardNavigation: true,
    altTextRequired: true,
    colorBlindSupport: true,
    focusIndicators: true
  }}
  customStyles={[
    {
      id: 'heading1',
      name: 'Heading 1',
      type: 'paragraph',
      css: { fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' },
      preview: 'Heading 1 Style'
    }
  ]}
/>

// Export-focused document
<DocyFieldDocEditor
  name="exportDoc"
  label="Export Document"
  enableExport={true}
  exportFormats={[
    { format: 'docx', label: 'Word Document', mime: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', extension: 'docx' },
    { format: 'pdf', label: 'PDF Document', mime: 'application/pdf', extension: 'pdf' },
    { format: 'html', label: 'HTML Document', mime: 'text/html', extension: 'html' },
    { format: 'txt', label: 'Plain Text', mime: 'text/plain', extension: 'txt' }
  ]}
  enablePrint={true}
  printOptions={{
    paperSize: 'A4',
    orientation: 'portrait',
    margins: { top: 25, right: 25, bottom: 25, left: 25, header: 12, footer: 12 },
    scale: 100,
    pages: 'all',
    copies: 1,
    collate: true,
    duplex: 'none',
    color: true,
    quality: 'high'
  }}
/>

// Form integration with validation
<DocyFieldDocEditor
  name="validatedDoc"
  label="Document Content"
  validations={[
    { type: 'required', message: 'Document content is required' },
    { type: 'minLength', value: 100, message: 'Document must be at least 100 characters' }
  ]}
  customValidations={[
    {
      formula: '$exists(validatedDoc.title) and $length(validatedDoc.title) > 0',
      message: 'Document must have a title'
    },
    {
      formula: 'validatedDoc.wordCount >= 500',
      message: 'Document should be at least 500 words'
    }
  ]}
  actions={{
    change: [
      ['setFieldValue', {
        field: 'lastModified',
        value: new Date().toISOString()
      }],
      ['setFieldValue', {
        field: 'documentStats',
        value: {
          wordCount: '{{validatedDoc.wordCount}}',
          charCount: '{{validatedDoc.charCount}}',
          pageCount: '{{validatedDoc.pageCount}}'
        }
      }]
    ]
  }}
/>

// Read-only document viewer
<DocyFieldDocEditor
  name="docViewer"
  label="Document Viewer"
  mode="preview"
  readOnly={true}
  showToolbar={false}
  enableZoom={true}
  zoomLevel={100}
  enablePrint={true}
  enableExport={true}
  modelValue={{
    title: 'Sample Document',
    content: documentContent,
    metadata: {
      author: 'John Doe',
      createdAt: '2023-01-01',
      wordCount: 1250,
      pageCount: 3
    }
  }}
/>
```

### Integration Requirements
- **DocyFieldBase**: Base wrapper component (required)
- **Document Editor Engine**: Custom document editor or library integration
- **Real-time Engine**: WebSocket server for collaboration
- **Export Engine**: Libraries for DOCX, PDF, and HTML generation
- **AI Service**: Integration with AI writing assistance
- **DocyIcon**: For toolbar and interface icons
- **DocyMenu**: For context menus and dropdown options
- **DocyDialog**: For settings, templates, and export dialogs
- **DocyCalendar**: For date fields in templates
- **DocyUpload**: For image and file insertion

### Dependencies Required
- `yjs` or `sharedb`: Real-time collaboration framework
- `mammoth`: DOCX generation and parsing
- `jspdf`: PDF generation
- `html-docx-js`: HTML to DOCX conversion
- `quill` or `slate`: Rich text editing foundation
- `react-hook-form`: Form integration (inherited from DocyFieldBase)
- `class-variance-authority`: Variant management
- `dompurify`: HTML sanitization
- All DocyFieldBase dependencies

### Testing Requirements
1. **Unit Tests**: Document editing, formatting, collaboration features
2. **Integration Tests**: React Hook Form integration, real-time collaboration, export functionality
3. **Visual Tests**: All modes, page layouts, responsive behavior
4. **Accessibility Tests**: Screen reader support, keyboard navigation, ARIA compliance
5. **Performance Tests**: Large document handling, real-time synchronization, memory usage
6. **Collaboration Tests**: Multi-user editing, conflict resolution, presence awareness
7. **Export Tests**: All export formats, print functionality, template processing

## Development Priority
**High** - Essential for document management, collaborative writing, and professional document creation

## Notes
- Built with professional document editing capabilities matching industry standards
- Real-time collaboration with operational transformation for conflict resolution
- Comprehensive accessibility support for inclusive document creation
- Advanced features like footnotes, bibliography, and table of contents
- Template system with variable support for document automation
- AI integration for writing assistance and content enhancement
- Multiple export formats for document sharing and distribution
- Version control and change tracking for document management
- Performance optimized for large documents and real-time collaboration
- Complete keyboard shortcuts and accessibility features throughout