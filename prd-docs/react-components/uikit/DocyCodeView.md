# DocyCodeView Component

## Overview
DocyCodeView is a syntax-highlighted code display component built with shadcn/ui patterns and Tailwind CSS v4. It provides read-only code viewing with syntax highlighting, line numbers, and copy functionality for various programming languages including JSON, HTML, SQL, and Markdown.

## Component Specification

### Props
| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `code` | string | - | Yes | Code content to display |
| `language` | string | 'text' | No | Programming language: 'text', 'json', 'html', 'sql', 'markdown', 'javascript', 'typescript' |
| `showLineNumbers` | boolean | false | No | Show line numbers in the gutter |
| `copyable` | boolean | false | No | Enable copy to clipboard functionality |
| `theme` | string | 'light' | No | Code theme: 'light', 'dark', 'auto' |
| `className` | string | - | No | Additional CSS classes |
| `maxHeight` | string | - | No | Maximum height with scroll |
| `wrap` | boolean | true | No | Enable line wrapping |
| `tabSize` | number | 2 | No | Tab size in spaces |

### Language Support
```typescript
const supportedLanguages = {
  text: 'Plain text',
  json: 'JSON with validation',
  html: 'HTML markup',
  sql: 'SQL queries',
  markdown: 'Markdown content',
  javascript: 'JavaScript code',
  typescript: 'TypeScript code'
} as const
```

### Theme System
- **Light**: Default light theme with clean syntax highlighting
- **Dark**: Dark theme optimized for low-light environments
- **Auto**: Automatically matches system/user preference

### Key Features
1. **Syntax Highlighting**: Language-specific syntax highlighting with proper tokenization
2. **Copy Functionality**: One-click copy to clipboard with feedback
3. **Line Numbers**: Optional line number display in gutter
4. **Code Validation**: Built-in linting for JSON and other supported languages
5. **Responsive Design**: Adapts to container size with optional scrolling
6. **Read-Only**: Prevents editing while maintaining selection capabilities

## Component Requirements

### Technical Specifications
- **Framework**: React with TypeScript
- **Base Component**: Custom implementation (no direct shadcn/ui equivalent)
- **Integration**: Uses shadcn/ui design tokens and styling patterns
- **Styling**: shadcn/ui patterns with class-variance-authority
- **Syntax Highlighting**: CodeMirror 6 or Prism.js integration
- **Performance**: Virtual scrolling for large code blocks
- **Accessibility**: Full keyboard navigation, screen reader support

### Key Features Required
1. **Multi-Language Support**: Comprehensive language detection and highlighting
2. **Copy Functionality**: Clipboard integration with user feedback
3. **Theme System**: Light/dark theme support with system preference detection
4. **Line Numbers**: Optional line number display with proper alignment
5. **Code Validation**: Real-time syntax validation for supported languages
6. **Responsive Layout**: Proper handling of various container sizes

### Usage Examples
```tsx
// Basic code display
<DocyCodeView code="console.log('Hello World')" language="javascript" />

// JSON with validation and copy
<DocyCodeView 
  code='{"name": "John", "age": 30}' 
  language="json" 
  copyable 
  showLineNumbers 
/>

// SQL query display
<DocyCodeView 
  code="SELECT * FROM users WHERE active = 1" 
  language="sql" 
  theme="dark"
/>

// HTML with line wrapping
<DocyCodeView 
  code="<div class='container'><h1>Title</h1></div>" 
  language="html" 
  wrap={false}
  showLineNumbers
/>

// Large code block with scrolling
<DocyCodeView 
  code={longCodeString}
  language="typescript"
  maxHeight="400px"
  copyable
  showLineNumbers
/>

// Markdown content
<DocyCodeView 
  code="# Title\n\nThis is **bold** text" 
  language="markdown"
  theme="auto"
/>
```

### Integration Requirements
- **Forms**: Display generated code, configuration previews
- **Documentation**: Code examples and API responses
- **Debug Views**: Error logs, API payloads, configuration dumps
- **Templates**: Template code preview before application

### Accessibility Requirements
- **Keyboard Navigation**: Full keyboard support for scrolling and selection
- **Screen Reader**: Proper ARIA labels and code structure announcement
- **Focus Management**: Clear focus indicators and tab order
- **High Contrast**: Support for high contrast modes and custom themes

### Dependencies Required
- `@codemirror/lang-json`: JSON language support with validation
- `@codemirror/lang-html`: HTML language support
- `@codemirror/lang-sql`: SQL language support
- `@codemirror/lang-markdown`: Markdown language support
- `@codemirror/lang-javascript`: JavaScript/TypeScript support
- `class-variance-authority`: Variant management
- Clipboard API utilities

### Testing Requirements
1. **Unit Tests**: Language detection, syntax highlighting, copy functionality
2. **Visual Tests**: All themes, languages, and layout configurations
3. **Accessibility Tests**: Keyboard navigation, screen reader compatibility
4. **Performance Tests**: Large code block rendering, virtual scrolling
5. **Integration Tests**: Usage in forms, modals, and various containers

## Development Priority
**Medium** - Important for developer experience and configuration display

## Notes
- Built with CodeMirror 6 for modern syntax highlighting performance
- Leverages Tailwind v4's improved theming system
- Read-only implementation optimized for display rather than editing
- Supports validation and linting for data formats like JSON
- Designed for seamless integration with form components and documentation