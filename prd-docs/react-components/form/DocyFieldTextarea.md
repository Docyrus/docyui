# DocyFieldTextarea Component

## Overview
DocyFieldTextarea is a multi-line text input component that extends DocyFieldBase to provide textarea-specific functionality. Built on top of shadcn/ui Textarea component, it supports advanced features like auto-resize, character counting, text wrapping controls, and various resize behaviors. The component is designed for longer text content input such as descriptions, comments, articles, and formatted text.

This component demonstrates how field components should integrate with DocyFieldBase as their wrapper while extending shadcn/ui components with Docy-specific features.

## Component Specification

### Props
DocyFieldTextarea inherits ALL props from DocyFieldBase and adds the following textarea-specific properties:

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `modelValue` | string | - | No | Current field value |
| `rows` | number | 3 | No | Initial number of visible rows |
| `cols` | number | - | No | Number of columns (width in characters) |
| `autoResize` | boolean | false | No | Auto-resize height based on content |
| `maxLength` | number | - | No | Maximum character limit |
| `minLength` | number | - | No | Minimum character limit |
| `showCharCount` | boolean | false | No | Show character counter |
| `resize` | 'none' \| 'both' \| 'horizontal' \| 'vertical' | 'vertical' | No | Resize behavior |
| `wrap` | 'hard' \| 'soft' \| 'off' | 'soft' | No | Text wrapping behavior |
| `spellcheck` | boolean | true | No | Enable spell checking |
| `autocomplete` | string \| boolean | 'off' | No | HTML autocomplete attribute |
| `inputAttrs` | object | {} | No | Additional HTML attributes for textarea element |
| `minRows` | number | 2 | No | Minimum number of rows when auto-resizing |
| `maxRows` | number | 10 | No | Maximum number of rows when auto-resizing |
| `lineHeight` | number | 1.5 | No | Line height multiplier for auto-resize calculations |
| `showWordCount` | boolean | false | No | Show word counter in addition to character count |
| `submitOnEnter` | boolean | false | No | Submit form when Enter is pressed (with modifier keys) |
| `tabBehavior` | 'default' \| 'indent' \| 'focus' | 'default' | No | Behavior when Tab key is pressed |
| `warnOnLeave` | boolean | false | No | Show warning when leaving with unsaved changes |

**Note**: DocyFieldTextarea inherits all DocyFieldBase props including validation, layout, dynamic computed properties, AI integration, and more. See [DocyFieldBase documentation](./DocyFieldBase.md) for the complete list.

### TypeScript Interfaces

```typescript
interface TextareaFieldProps extends DocyFieldBaseProps {
  modelValue?: string;
  rows?: number;
  cols?: number;
  autoResize?: boolean;
  maxLength?: number;
  minLength?: number;
  showCharCount?: boolean;
  resize?: 'none' | 'both' | 'horizontal' | 'vertical';
  wrap?: 'hard' | 'soft' | 'off';
  spellcheck?: boolean;
  autocomplete?: string | boolean;
  inputAttrs?: Record<string, any>;
  minRows?: number;
  maxRows?: number;
  lineHeight?: number;
  showWordCount?: boolean;
  submitOnEnter?: boolean;
  tabBehavior?: 'default' | 'indent' | 'focus';
  warnOnLeave?: boolean;
  onTextChange?: (value: string, meta: TextChangeMeta) => void;
  onResize?: (dimensions: { width: number; height: number }) => void;
}

interface TextChangeMeta {
  characterCount: number;
  wordCount: number;
  lineCount: number;
  isAtLimit: boolean;
  hasUnsavedChanges: boolean;
}

interface TextareaFieldState {
  currentValue: string;
  characterCount: number;
  wordCount: number;
  lineCount: number;
  isResizing: boolean;
  hasUnsavedChanges: boolean;
  currentHeight: number;
}
```

### Behavior

1. **Multi-line Text Input**:
   - Supports multi-line text input with proper line breaks
   - Configurable initial size with rows and cols
   - Real-time value updates with React Hook Form integration

2. **Auto-resize Functionality**:
   - Automatically adjusts height based on content
   - Respects minimum and maximum row limits
   - Smooth transitions during resize operations
   - Configurable line height for accurate calculations

3. **Character and Word Counting**:
   - Real-time character counting with optional display
   - Word counting with configurable visibility
   - Visual feedback when approaching character limits
   - Validation integration for length constraints

4. **Resize Controls**:
   - Configurable resize behavior (none, both, horizontal, vertical)
   - Manual resize handle when not using auto-resize
   - Maintains aspect ratio during manual resizing
   - Callback events for resize operations

5. **Text Wrapping**:
   - Hard wrapping for fixed-width formatting
   - Soft wrapping for responsive layouts
   - No wrapping for code or pre-formatted text
   - Affects both display and form submission

6. **Enhanced User Experience**:
   - Spell checking integration
   - Submit on Enter with modifier keys
   - Configurable Tab behavior (default, indent, focus)
   - Warning on unsaved changes when leaving

## Component Requirements

### Technical Specifications
- **Framework**: React 18+ with TypeScript
- **Base Component**: shadcn/ui Textarea component (`pnpm dlx shadcn@latest add textarea`)
- **Extensions**: Docy-specific features including auto-resize, character counting, advanced text handling, and enhanced validation built on top of shadcn base
- **Wrapper**: Extends DocyFieldBase for consistent field structure
- **Styling**: shadcn/ui Textarea component with Tailwind CSS v4
- **Auto-resize**: Custom implementation or integration with react-textarea-autosize
- **Validation**: React Hook Form integration with custom validators
- **Accessibility**: WCAG 2.1 AA compliance

### Key Features Required
1. **Multi-line Text Input**: Support for various text content types
2. **Auto-resize**: Dynamic height adjustment based on content
3. **Character Counting**: Real-time character and word counting
4. **Resize Controls**: Configurable resize behavior and constraints
5. **Text Wrapping**: Multiple wrapping modes for different use cases
6. **Enhanced UX**: Spell checking, submit shortcuts, Tab handling
7. **Validation**: Length constraints and custom validation rules
8. **Accessibility**: Complete keyboard navigation and screen reader support

### Usage Examples

```tsx
// Basic textarea
<DocyFieldTextarea
  name="description"
  label="Description"
  placeholder="Enter a detailed description..."
  rows={4}
  required={true}
/>

// Auto-resizing textarea with character count
<DocyFieldTextarea
  name="comments"
  label="Comments"
  autoResize={true}
  minRows={2}
  maxRows={8}
  maxLength={500}
  showCharCount={true}
  showWordCount={true}
/>

// Code editor style textarea
<DocyFieldTextarea
  name="code"
  label="Code Snippet"
  rows={10}
  resize="both"
  wrap="off"
  spellcheck={false}
  tabBehavior="indent"
  className="font-mono"
/>

// Article content with enhanced features
<DocyFieldTextarea
  name="article"
  label="Article Content"
  autoResize={true}
  minRows={5}
  maxRows={20}
  maxLength={5000}
  showCharCount={true}
  showWordCount={true}
  warnOnLeave={true}
  validations={[
    { type: 'required', message: 'Article content is required' },
    { type: 'minLength', value: 100, message: 'Article must be at least 100 characters' }
  ]}
/>

// Form submission with Enter key
<DocyFieldTextarea
  name="quickNote"
  label="Quick Note"
  rows={3}
  submitOnEnter={true}
  placeholder="Type your note and press Ctrl+Enter to save..."
/>

// Feedback form with validation
<DocyFieldTextarea
  name="feedback"
  label="Feedback"
  autoResize={true}
  minRows={3}
  maxRows={10}
  maxLength={1000}
  showCharCount={true}
  validations={[
    { type: 'required', message: 'Feedback is required' },
    { type: 'minLength', value: 20, message: 'Please provide more detailed feedback' }
  ]}
  customValidations={[
    {
      formula: '$not($contains($lowercase(feedback), "spam"))',
      message: 'Please provide constructive feedback'
    }
  ]}
/>

// Dynamic textarea with computed properties
<DocyFieldTextarea
  name="dynamicContent"
  label="Content"
  computedLabel="'Content (' + $string($length(content)) + ' characters)'"
  computedRequired={{ field: 'contentType', operator: 'equals', value: 'detailed' }}
  autoResize={true}
  showCharCount={true}
  actions={{
    change: [
      ['setFieldValueCalculated', {
        field: 'contentSummary',
        formula: '$substring(content, 0, 100) & "..."'
      }]
    ]
  }}
/>

// Complete form integration
<form onSubmit={handleSubmit(onSubmit)}>
  <DocyFieldTextarea
    name="userBio"
    label="User Biography"
    placeholder="Tell us about yourself..."
    autoResize={true}
    minRows={4}
    maxRows={12}
    maxLength={2000}
    showCharCount={true}
    showWordCount={true}
    validations={[
      { type: 'maxLength', value: 2000, message: 'Biography must be under 2000 characters' }
    ]}
    onTextChange={(value, meta) => {
      if (meta.isAtLimit) {
        showWarning('Character limit reached');
      }
    }}
  />
  
  <DocyFieldTextarea
    name="projectDescription"
    label="Project Description"
    computedHidden={{ field: 'hasProject', operator: 'equals', value: false }}
    autoResize={true}
    minRows={3}
    maxRows={8}
    maxLength={1500}
    showCharCount={true}
    validations={[
      { type: 'required', message: 'Project description is required when you have a project' },
      { type: 'minLength', value: 50, message: 'Please provide a more detailed project description' }
    ]}
  />
</form>
```

### Integration Requirements
- **DocyFieldBase**: Base wrapper component (required)
- **shadcn/ui Textarea**: Base textarea component
- **React Hook Form**: Form state management
- **Auto-resize library**: For dynamic height adjustment (react-textarea-autosize or custom implementation)
- **Character counting**: Real-time text analysis utilities
- **Accessibility**: ARIA attributes and keyboard navigation support

### Dependencies Required
- `react-hook-form`: Form state management (inherited from DocyFieldBase)
- `react-textarea-autosize`: Auto-resize functionality (optional)
- `class-variance-authority`: Variant management
- All DocyFieldBase dependencies

### Testing Requirements
1. **Unit Tests**: Auto-resize behavior, character counting, validation, resize controls
2. **Integration Tests**: React Hook Form integration, form submission, character limits
3. **Visual Tests**: All resize modes, character count display, responsive behavior
4. **Accessibility Tests**: Keyboard navigation, screen reader support, ARIA attributes
5. **Performance Tests**: Large text content, real-time character counting, auto-resize performance
6. **UX Tests**: Submit on Enter, Tab behavior, unsaved changes warning, spell checking

## Development Priority
**High** - Essential component for multi-line text input across the platform

## Notes
- Built on top of shadcn/ui Textarea component with extensive Docy-specific enhancements
- Auto-resize functionality provides excellent user experience for dynamic content
- Character and word counting helps users stay within content guidelines
- Flexible resize controls accommodate different use cases from chat to code editing
- Text wrapping modes support various content types and formatting requirements
- Enhanced keyboard interactions improve productivity for power users
- Complete accessibility compliance ensures inclusive user experience
- Performance optimized for large text content and real-time updates
- Serves as foundation for specialized textarea fields like DocyFieldMarkdown, DocyFieldCode, etc.