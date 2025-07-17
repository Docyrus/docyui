# DocyFieldJsonEditor Component

## Overview
DocyFieldJsonEditor is a specialized JSON editor component that extends DocyFieldBase to provide advanced JSON editing, validation, and formatting capabilities. It features real-time JSON validation, syntax highlighting, auto-completion, schema validation, and visual tree representation for complex JSON structures.

The component is designed for configuration management, API response editing, data modeling, and any scenario requiring structured JSON input with validation and formatting support.

## Component Specification

### Props
DocyFieldJsonEditor inherits ALL props from DocyFieldBase and adds the following JSON editor-specific properties:

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `modelValue` | object \| string | {} | No | Current JSON content (object or JSON string) |
| `mode` | 'code' \| 'tree' \| 'form' \| 'text' | 'code' | No | Editor display mode |
| `theme` | 'light' \| 'dark' \| 'auto' | 'light' | No | Editor theme |
| `height` | number \| string | 300 | No | Editor height in pixels or CSS units |
| `width` | number \| string | '100%' | No | Editor width in pixels or CSS units |
| `autoResize` | boolean | true | No | Automatically resize editor to content |
| `minHeight` | number | 200 | No | Minimum editor height |
| `maxHeight` | number | 800 | No | Maximum editor height |
| `showLineNumbers` | boolean | true | No | Show line numbers in code mode |
| `wordWrap` | boolean | true | No | Enable word wrapping |
| `indentSize` | number | 2 | No | Indentation size in spaces |
| `sortKeys` | boolean | false | No | Automatically sort object keys |
| `validateJson` | boolean | true | No | Enable real-time JSON validation |
| `formatOnBlur` | boolean | true | No | Auto-format JSON on blur |
| `formatOnSave` | boolean | true | No | Auto-format JSON on save |
| `autoComplete` | boolean | true | No | Enable auto-completion |
| `bracketMatching` | boolean | true | No | Enable bracket matching |
| `foldingEnabled` | boolean | true | No | Enable code folding |
| `schema` | JSONSchema | - | No | JSON schema for validation |
| `schemaValidation` | boolean | false | No | Enable schema validation |
| `customValidators` | JsonValidator[] | [] | No | Custom validation functions |
| `allowComments` | boolean | false | No | Allow JSON with comments (JSON5) |
| `allowTrailingCommas` | boolean | false | No | Allow trailing commas |
| `allowMultilineStrings` | boolean | false | No | Allow multiline strings |
| `strictMode` | boolean | true | No | Strict JSON parsing |
| `placeholder` | string | 'Enter JSON...' | No | Placeholder text for empty editor |
| `errorDisplay` | 'inline' \| 'tooltip' \| 'panel' | 'inline' | No | How to display validation errors |
| `showValidationSummary` | boolean | true | No | Show validation summary |
| `maxJsonSize` | number | 1048576 | No | Maximum JSON size in bytes (1MB default) |
| `readOnly` | boolean | false | No | Make editor read-only |
| `expandLevel` | number | 3 | No | Default expansion level in tree mode |
| `searchEnabled` | boolean | true | No | Enable search functionality |
| `replaceEnabled` | boolean | true | No | Enable find/replace functionality |
| `minimapEnabled` | boolean | false | No | Show minimap for large JSON |
| `onValidationChange` | function | - | No | Callback when validation state changes |
| `onModeChange` | function | - | No | Callback when editor mode changes |
| `onFormatChange` | function | - | No | Callback when formatting changes |
| `onSearch` | function | - | No | Callback for search operations |
| `customActions` | JsonAction[] | [] | No | Custom toolbar actions |
| `toolbarEnabled` | boolean | true | No | Show editor toolbar |
| `statusBarEnabled` | boolean | true | No | Show status bar with JSON info |
| `contextMenuEnabled` | boolean | true | No | Enable context menu |
| `duplicateKeyHandling` | 'error' \| 'warning' \| 'ignore' | 'error' | No | How to handle duplicate keys |
| `undoRedoEnabled` | boolean | true | No | Enable undo/redo functionality |
| `historySize` | number | 50 | No | Maximum undo/redo history size |

**Note**: DocyFieldJsonEditor inherits all DocyFieldBase props including validation, layout, dynamic computed properties, AI integration, and more. See [DocyFieldBase documentation](./DocyFieldBase.md) for the complete list.

### TypeScript Interfaces

```typescript
interface JSONSchema {
  type: string;
  properties?: Record<string, JSONSchema>;
  required?: string[];
  items?: JSONSchema;
  additionalProperties?: boolean | JSONSchema;
  minItems?: number;
  maxItems?: number;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  enum?: any[];
  default?: any;
  title?: string;
  description?: string;
}

interface JsonValidator {
  name: string;
  validate: (json: any) => JsonValidationResult;
  description?: string;
}

interface JsonValidationResult {
  valid: boolean;
  errors: JsonValidationError[];
  warnings: JsonValidationError[];
}

interface JsonValidationError {
  path: string;
  message: string;
  line?: number;
  column?: number;
  severity: 'error' | 'warning' | 'info';
}

interface JsonAction {
  id: string;
  label: string;
  icon?: string;
  tooltip?: string;
  command: string;
  keyboard?: string;
  enabled?: boolean;
  visible?: boolean;
}

interface JsonEditorState {
  mode: 'code' | 'tree' | 'form' | 'text';
  isValid: boolean;
  errors: JsonValidationError[];
  warnings: JsonValidationError[];
  size: number;
  lines: number;
  selection?: EditorSelection;
  cursorPosition?: CursorPosition;
}

interface EditorSelection {
  start: { line: number; column: number };
  end: { line: number; column: number };
  text: string;
}

interface JsonPath {
  path: string[];
  value: any;
  type: string;
}

interface JsonTreeNode {
  key: string;
  value: any;
  type: string;
  path: string[];
  expanded: boolean;
  children?: JsonTreeNode[];
}
```

### Behavior

1. **Multi-Mode Display**:
   - Code mode: Raw JSON with syntax highlighting
   - Tree mode: Visual tree representation with expand/collapse
   - Form mode: Form-based editing for structured data
   - Text mode: Plain text editor with minimal formatting

2. **Real-time Validation**:
   - JSON syntax validation with error highlighting
   - Schema validation against JSON Schema
   - Custom validation rules and business logic
   - Duplicate key detection and handling

3. **Editing Features**:
   - Auto-completion for JSON keys and values
   - Bracket matching and auto-closing
   - Code folding for large JSON structures
   - Find and replace with path-based search

4. **Formatting and Beautification**:
   - Auto-formatting with configurable indentation
   - Key sorting for consistent structure
   - Minification and prettification
   - Comment and trailing comma support (JSON5)

5. **Schema Integration**:
   - JSON Schema validation with detailed errors
   - Schema-based auto-completion
   - Type checking and constraint validation
   - Default value population from schema

6. **Advanced Features**:
   - Undo/redo with history management
   - Search and replace across JSON paths
   - Export/import in various formats
   - Collaborative editing capabilities

## Component Requirements

### Technical Specifications
- **Framework**: React 18+ with TypeScript
- **Base Component**: Custom implementation using Monaco Editor or JSONEditor
- **Integration**: Uses shadcn/ui patterns for consistent styling and theming
- **Wrapper**: Extends DocyFieldBase for consistent field structure
- **Styling**: shadcn/ui patterns with Tailwind CSS v4
- **JSON Engine**: Monaco Editor JSON support or dedicated JSON editor library
- **Schema Validation**: AJV (Another JSON Schema Validator)
- **Accessibility**: WCAG 2.1 AA compliance

### Key Features Required
1. **Multi-Mode Interface**: Code, tree, form, and text editing modes
2. **Real-time Validation**: JSON syntax and schema validation
3. **Advanced Editing**: Auto-completion, formatting, search/replace
4. **Schema Support**: JSON Schema validation and auto-completion
5. **Error Handling**: Comprehensive error display and recovery
6. **Performance**: Efficient handling of large JSON documents
7. **Accessibility**: Full keyboard navigation and screen reader support

### Usage Examples

```tsx
// Basic JSON editor
<DocyFieldJsonEditor
  name="configuration"
  label="Configuration"
  placeholder="Enter JSON configuration..."
  height={400}
  formatOnBlur={true}
/>

// JSON editor with schema validation
<DocyFieldJsonEditor
  name="userProfile"
  label="User Profile"
  schemaValidation={true}
  schema={{
    type: 'object',
    properties: {
      name: { type: 'string', minLength: 2 },
      email: { type: 'string', format: 'email' },
      age: { type: 'number', minimum: 0, maximum: 120 },
      roles: { type: 'array', items: { type: 'string' } }
    },
    required: ['name', 'email']
  }}
  mode="form"
/>

// API response editor
<DocyFieldJsonEditor
  name="apiResponse"
  label="API Response"
  mode="tree"
  expandLevel={2}
  readOnly={true}
  height={500}
  minimapEnabled={true}
  modelValue={{
    status: 200,
    data: {
      users: [
        { id: 1, name: 'John Doe', email: 'john@example.com' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
      ]
    },
    meta: {
      total: 2,
      page: 1,
      perPage: 10
    }
  }}
/>

// Configuration editor with custom validation
<DocyFieldJsonEditor
  name="appConfig"
  label="Application Configuration"
  allowComments={true}
  allowTrailingCommas={true}
  customValidators={[
    {
      name: 'required-fields',
      validate: (json) => {
        const required = ['apiUrl', 'version', 'features'];
        const missing = required.filter(field => !json[field]);
        return {
          valid: missing.length === 0,
          errors: missing.map(field => ({
            path: field,
            message: `Required field '${field}' is missing`,
            severity: 'error'
          })),
          warnings: []
        };
      }
    }
  ]}
  errorDisplay="panel"
/>

// Large JSON document editor
<DocyFieldJsonEditor
  name="largeJson"
  label="Large JSON Document"
  height={600}
  autoResize={false}
  maxJsonSize={5242880} // 5MB
  foldingEnabled={true}
  minimapEnabled={true}
  searchEnabled={true}
  replaceEnabled={true}
  onValidationChange={(state) => {
    console.log('Validation state:', state);
  }}
/>

// Form-based JSON editor
<DocyFieldJsonEditor
  name="formData"
  label="Form Data"
  mode="form"
  schema={{
    type: 'object',
    properties: {
      personalInfo: {
        type: 'object',
        title: 'Personal Information',
        properties: {
          firstName: { type: 'string', title: 'First Name' },
          lastName: { type: 'string', title: 'Last Name' },
          birthDate: { type: 'string', format: 'date' }
        }
      },
      preferences: {
        type: 'object',
        title: 'Preferences',
        properties: {
          theme: { type: 'string', enum: ['light', 'dark'] },
          notifications: { type: 'boolean', default: true }
        }
      }
    }
  }}
  height={400}
/>

// JSON with custom actions
<DocyFieldJsonEditor
  name="customJson"
  label="Custom JSON Editor"
  customActions={[
    {
      id: 'validate-schema',
      label: 'Validate Schema',
      icon: 'check-circle',
      command: 'validateSchema',
      keyboard: 'Ctrl+Shift+V'
    },
    {
      id: 'format-json',
      label: 'Format JSON',
      icon: 'code',
      command: 'formatJson',
      keyboard: 'Ctrl+Shift+F'
    },
    {
      id: 'export-json',
      label: 'Export JSON',
      icon: 'download',
      command: 'exportJson'
    }
  ]}
  onModeChange={(mode) => {
    console.log('Mode changed to:', mode);
  }}
/>

// Collaborative JSON editing
<DocyFieldJsonEditor
  name="sharedJson"
  label="Shared JSON Configuration"
  height={450}
  collaborativeMode={true}
  undoRedoEnabled={true}
  historySize={100}
  contextMenuEnabled={true}
  statusBarEnabled={true}
  onFormatChange={(formatted) => {
    console.log('JSON formatted:', formatted);
  }}
/>

// Form integration with validation
<DocyFieldJsonEditor
  name="validatedJson"
  label="Validated JSON"
  validations={[
    { type: 'required', message: 'JSON configuration is required' }
  ]}
  customValidations={[
    {
      formula: '$exists(validatedJson.apiUrl)',
      message: 'API URL must be specified in the configuration'
    },
    {
      formula: '$type(validatedJson.features) = "array"',
      message: 'Features must be an array'
    }
  ]}
  actions={{
    change: [
      ['setFieldValue', {
        field: 'lastModified',
        value: new Date().toISOString()
      }],
      ['condition', '$exists(validatedJson.apiUrl)', [
        ['setFieldOption', {
          field: 'apiKey',
          option: 'required',
          value: true
        }]
      ]]
    ]
  }}
/>

// Dynamic schema validation
<DocyFieldJsonEditor
  name="dynamicSchema"
  label="Dynamic Schema Validation"
  schemaValidation={true}
  schema={computedSchema}
  mode="code"
  height={350}
  computedRequired={{ field: 'requiresJson', operator: 'equals', value: true }}
  duplicateKeyHandling="warning"
  strictMode={false}
/>
```

### Integration Requirements
- **DocyFieldBase**: Base wrapper component (required)
- **Monaco Editor**: For code editing with JSON support
- **JSONEditor**: Alternative JSON editor library
- **AJV**: JSON Schema validation
- **DocyIcon**: For toolbar and status icons
- **DocyMenu**: For context menus and action menus
- **DocyTooltip**: For validation error tooltips
- **DocyDialog**: For export/import dialogs

### Dependencies Required
- `monaco-editor`: Advanced code editor
- `ajv`: JSON Schema validation
- `jsoneditor`: Dedicated JSON editor (alternative)
- `react-json-view`: Tree view component
- `react-hook-form`: Form integration (inherited from DocyFieldBase)
- `class-variance-authority`: Variant management
- `lodash`: Utility functions for JSON manipulation
- All DocyFieldBase dependencies

### Testing Requirements
1. **Unit Tests**: JSON parsing, validation, schema checking, formatting
2. **Integration Tests**: React Hook Form integration, schema validation, custom validators
3. **Visual Tests**: All modes, themes, responsive behavior, error display
4. **Accessibility Tests**: Keyboard navigation, screen reader support, ARIA attributes
5. **Performance Tests**: Large JSON handling, real-time validation, memory usage
6. **Validation Tests**: Schema validation, custom validators, error handling
7. **Editor Tests**: Multi-mode switching, search/replace, undo/redo functionality

## Development Priority
**High** - Critical for configuration management, API integration, and data modeling workflows

## Notes
- Built with multiple editor engines for flexibility and performance
- Comprehensive JSON Schema support for robust validation
- Multi-mode interface accommodates different editing preferences
- Real-time validation ensures data integrity
- Performance optimized for large JSON documents
- Accessibility features ensure inclusive data editing experience
- Extensible validation system supports custom business logic
- Collaborative editing enables team configuration management
- Complete error handling and recovery mechanisms
- Integration with AI assistance for JSON generation and validation