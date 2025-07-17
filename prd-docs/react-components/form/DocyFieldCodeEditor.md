# DocyFieldCodeEditor Component

## Overview
DocyFieldCodeEditor is a comprehensive code editor component that extends DocyFieldBase to provide advanced syntax highlighting, code completion, and editing capabilities. It supports multiple programming languages, themes, and editor configurations, making it ideal for technical documentation, code snippets, configuration files, and development workflows.

The component integrates Monaco Editor (VS Code's editor) or CodeMirror for a professional coding experience with features like IntelliSense, error detection, multi-cursor support, and customizable keybindings.

## Component Specification

### Props
DocyFieldCodeEditor inherits ALL props from DocyFieldBase and adds the following code editor-specific properties:

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `modelValue` | string | '' | No | Current code content |
| `language` | string | 'javascript' | No | Programming language for syntax highlighting |
| `theme` | 'light' \| 'dark' \| 'vs' \| 'hc-black' \| 'monokai' \| 'github' | 'light' | No | Editor theme |
| `height` | number \| string | 300 | No | Editor height in pixels or CSS units |
| `width` | number \| string | '100%' | No | Editor width in pixels or CSS units |
| `autoResize` | boolean | true | No | Automatically resize editor to content |
| `minHeight` | number | 100 | No | Minimum editor height |
| `maxHeight` | number | 1000 | No | Maximum editor height |
| `showLineNumbers` | boolean | true | No | Show line numbers |
| `showGutter` | boolean | true | No | Show gutter area |
| `wordWrap` | boolean | true | No | Enable word wrapping |
| `autoIndent` | boolean | true | No | Enable automatic indentation |
| `tabSize` | number | 2 | No | Tab size in spaces |
| `insertSpaces` | boolean | true | No | Insert spaces instead of tabs |
| `showMinimap` | boolean | false | No | Show minimap (Monaco only) |
| `showFolding` | boolean | true | No | Enable code folding |
| `highlightActiveLineGutter` | boolean | true | No | Highlight active line in gutter |
| `highlightActiveLineText` | boolean | true | No | Highlight active line text |
| `brackets` | boolean | true | No | Enable bracket matching |
| `autoCloseBrackets` | boolean | true | No | Auto-close brackets |
| `autoSurround` | boolean | true | No | Auto-surround selection with brackets/quotes |
| `snippets` | boolean | true | No | Enable code snippets |
| `autocompletion` | boolean | true | No | Enable auto-completion |
| `linting` | boolean | true | No | Enable syntax error detection |
| `formatOnSave` | boolean | false | No | Auto-format code on save |
| `formatOnType` | boolean | false | No | Auto-format while typing |
| `readOnly` | boolean | false | No | Make editor read-only |
| `placeholder` | string | 'Enter code...' | No | Placeholder text for empty editor |
| `customKeyBindings` | KeyBinding[] | [] | No | Custom keyboard shortcuts |
| `extensions` | Extension[] | [] | No | Additional editor extensions |
| `lintRules` | LintRule[] | [] | No | Custom linting rules |
| `customTheme` | EditorTheme | - | No | Custom theme configuration |
| `onSelectionChange` | function | - | No | Callback for selection changes |
| `onCursorMove` | function | - | No | Callback for cursor movement |
| `onFold` | function | - | No | Callback for code folding |
| `onSearch` | function | - | No | Callback for search operations |
| `searchEnabled` | boolean | true | No | Enable search functionality |
| `replaceEnabled` | boolean | true | No | Enable find/replace functionality |
| `gotoLineEnabled` | boolean | true | No | Enable go-to-line functionality |
| `commandPalette` | boolean | true | No | Enable command palette |
| `emmetEnabled` | boolean | false | No | Enable Emmet abbreviations |
| `vimModeEnabled` | boolean | false | No | Enable Vim key bindings |
| `collaborativeMode` | boolean | false | No | Enable collaborative editing |
| `collaborativeConfig` | CollaborativeConfig | - | No | Configuration for collaborative editing |

**Note**: DocyFieldCodeEditor inherits all DocyFieldBase props including validation, layout, dynamic computed properties, AI integration, and more. See [DocyFieldBase documentation](./DocyFieldBase.md) for the complete list.

### TypeScript Interfaces

```typescript
interface KeyBinding {
  key: string; // Key combination (e.g., 'Ctrl+S', 'Alt+F')
  command: string; // Command to execute
  when?: string; // Context when binding is active
}

interface Extension {
  name: string;
  config?: Record<string, any>;
}

interface LintRule {
  rule: string;
  severity: 'error' | 'warning' | 'info';
  message?: string;
}

interface EditorTheme {
  name: string;
  base: 'vs' | 'vs-dark' | 'hc-black';
  colors: Record<string, string>;
  tokenColors: TokenColor[];
}

interface TokenColor {
  scope: string | string[];
  settings: {
    foreground?: string;
    background?: string;
    fontStyle?: string;
  };
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
    selections: boolean;
    comments: boolean;
    history: boolean;
  };
}

interface SelectionRange {
  startLine: number;
  startColumn: number;
  endLine: number;
  endColumn: number;
}

interface CursorPosition {
  line: number;
  column: number;
}
```

### Behavior

1. **Syntax Highlighting**:
   - Support for 50+ programming languages
   - Automatic language detection based on file extension
   - Custom syntax highlighting rules
   - Theme-based color schemes

2. **Code Intelligence**:
   - Auto-completion with IntelliSense
   - Error detection and inline diagnostics
   - Code snippets and templates
   - Symbol navigation and definition lookup

3. **Editor Features**:
   - Multi-cursor editing
   - Code folding and unfolding
   - Find and replace with regex support
   - Go-to-line functionality
   - Command palette access

4. **Formatting and Linting**:
   - Auto-formatting on save or type
   - Configurable linting rules
   - Code validation and error reporting
   - Custom formatting providers

5. **Collaboration**:
   - Real-time collaborative editing
   - User cursors and selections
   - Change history and version control
   - Comment and annotation system

6. **Customization**:
   - Custom themes and color schemes
   - Configurable key bindings
   - Extension system for additional features
   - Personalized editor settings

## Component Requirements

### Technical Specifications
- **Framework**: React 18+ with TypeScript
- **Base Component**: Custom implementation using Monaco Editor or CodeMirror
- **Integration**: Uses shadcn/ui patterns for consistent styling and theming
- **Wrapper**: Extends DocyFieldBase for consistent field structure
- **Styling**: shadcn/ui patterns with Tailwind CSS v4
- **Editor Engine**: Monaco Editor (VS Code) or CodeMirror 6
- **Language Support**: Prism.js or Monaco's built-in language support
- **Accessibility**: WCAG 2.1 AA compliance

### Key Features Required
1. **Multi-Language Support**: Syntax highlighting for 50+ languages
2. **Code Intelligence**: Auto-completion, error detection, IntelliSense
3. **Advanced Editing**: Multi-cursor, code folding, find/replace
4. **Theming**: Multiple themes with custom theme support
5. **Formatting**: Auto-formatting with configurable rules
6. **Collaboration**: Real-time editing with multiple users
7. **Accessibility**: Full keyboard navigation and screen reader support

### Usage Examples

```tsx
// Basic code editor
<DocyFieldCodeEditor
  name="sourceCode"
  label="Source Code"
  language="javascript"
  height={400}
  placeholder="Enter your JavaScript code..."
/>

// Python editor with linting
<DocyFieldCodeEditor
  name="pythonScript"
  label="Python Script"
  language="python"
  linting={true}
  lintRules={[
    { rule: 'unused-variable', severity: 'warning' },
    { rule: 'syntax-error', severity: 'error' }
  ]}
  formatOnSave={true}
  autoIndent={true}
/>

// JSON configuration editor
<DocyFieldCodeEditor
  name="config"
  label="Configuration"
  language="json"
  height={300}
  autoResize={true}
  minHeight={150}
  maxHeight={600}
  formatOnType={true}
  brackets={true}
  autoCloseBrackets={true}
/>

// SQL query editor with custom theme
<DocyFieldCodeEditor
  name="sqlQuery"
  label="SQL Query"
  language="sql"
  theme="monokai"
  height={250}
  showMinimap={true}
  wordWrap={false}
  snippets={true}
  autocompletion={true}
/>

// Read-only code display
<DocyFieldCodeEditor
  name="exampleCode"
  label="Code Example"
  language="typescript"
  readOnly={true}
  height={200}
  showLineNumbers={true}
  theme="github"
  modelValue={`
interface User {
  id: string;
  name: string;
  email: string;
  roles: string[];
}

const createUser = (data: Partial<User>): User => {
  return {
    id: generateId(),
    roles: ['user'],
    ...data
  };
};
  `}
/>

// Collaborative editing
<DocyFieldCodeEditor
  name="sharedCode"
  label="Shared Code"
  language="javascript"
  collaborativeMode={true}
  collaborativeConfig={{
    endpoint: 'wss://collab.example.com',
    roomId: 'project-123',
    userInfo: {
      name: 'John Doe',
      color: '#3b82f6',
      avatar: 'https://avatar.com/john.jpg'
    },
    features: {
      cursors: true,
      selections: true,
      comments: true,
      history: true
    }
  }}
/>

// HTML editor with Emmet support
<DocyFieldCodeEditor
  name="htmlTemplate"
  label="HTML Template"
  language="html"
  emmetEnabled={true}
  autoSurround={true}
  height={350}
  formatOnSave={true}
  customKeyBindings={[
    { key: 'Ctrl+Shift+F', command: 'format' },
    { key: 'Ctrl+/', command: 'toggle-comment' }
  ]}
/>

// Advanced configuration with custom extensions
<DocyFieldCodeEditor
  name="advancedCode"
  label="Advanced Code Editor"
  language="javascript"
  height={500}
  extensions={[
    { name: 'bracket-matching' },
    { name: 'auto-close-tags' },
    { name: 'color-picker', config: { showPreview: true } }
  ]}
  customTheme={{
    name: 'custom-dark',
    base: 'vs-dark',
    colors: {
      'editor.background': '#1a1a1a',
      'editor.foreground': '#d4d4d4',
      'editor.lineHighlightBackground': '#2d2d2d'
    },
    tokenColors: [
      {
        scope: 'keyword',
        settings: { foreground: '#569cd6', fontStyle: 'bold' }
      }
    ]
  }}
/>

// Form integration with validation
<DocyFieldCodeEditor
  name="validatedCode"
  label="Validated Code"
  language="javascript"
  validations={[
    { type: 'required', message: 'Code is required' },
    { type: 'minLength', value: 10, message: 'Code must be at least 10 characters' }
  ]}
  customValidations={[
    {
      formula: '$not($contains(validatedCode, "console.log"))',
      message: 'Please remove console.log statements'
    },
    {
      formula: '$contains(validatedCode, "function") or $contains(validatedCode, "=>")',
      message: 'Code must contain at least one function'
    }
  ]}
  onSelectionChange={(selection) => {
    console.log('Selection changed:', selection);
  }}
/>

// Dynamic language switching
<DocyFieldCodeEditor
  name="dynamicLanguage"
  label="Multi-Language Editor"
  language={selectedLanguage}
  height={400}
  computedRequired={{ field: 'requiresCode', operator: 'equals', value: true }}
  actions={{
    change: [
      ['setFieldValue', {
        field: 'lastModified',
        value: new Date().toISOString()
      }]
    ]
  }}
/>
```

### Integration Requirements
- **DocyFieldBase**: Base wrapper component (required)
- **Monaco Editor**: Primary editor engine (`monaco-editor` package)
- **CodeMirror**: Alternative editor engine (`@codemirror/view`, `@codemirror/state`)
- **Prism.js**: Syntax highlighting library
- **DocyIcon**: For editor toolbar icons
- **DocyMenu**: For context menus and command palette
- **DocyTooltip**: For hover information and help text

### Dependencies Required
- `monaco-editor`: VS Code editor integration
- `@monaco-editor/react`: React wrapper for Monaco
- `@codemirror/view`: CodeMirror view layer
- `@codemirror/state`: CodeMirror state management
- `@codemirror/language`: Language support
- `prismjs`: Syntax highlighting
- `react-hook-form`: Form integration (inherited from DocyFieldBase)
- `class-variance-authority`: Variant management
- All DocyFieldBase dependencies

### Testing Requirements
1. **Unit Tests**: Language switching, syntax highlighting, editor configurations
2. **Integration Tests**: React Hook Form integration, validation, collaborative features
3. **Visual Tests**: All themes, responsive behavior, editor layouts
4. **Accessibility Tests**: Keyboard navigation, screen reader support, ARIA attributes
5. **Performance Tests**: Large file handling, real-time collaboration, syntax parsing
6. **Editor Tests**: Multi-cursor editing, code folding, find/replace functionality
7. **Collaboration Tests**: Real-time editing, conflict resolution, user presence

## Development Priority
**High** - Essential for technical documentation, code management, and development workflows

## Notes
- Built with Monaco Editor for VS Code-like experience
- Supports extensive language ecosystem with custom syntax highlighting
- Collaborative editing enables team development workflows
- Performance optimized for large code files
- Accessibility features ensure inclusive development experience
- Extensible architecture allows custom editor enhancements
- Integration with AI code assistance and generation capabilities
- Complete keyboard shortcuts and command palette support
- Real-time validation and error detection for improved code quality