# DocyFeedback Component

## Overview
DocyFeedback is a versatile feedback message component for displaying information, success, warning, and error messages to users. It provides consistent styling, optional closability, and expandable details sections, built with shadcn/ui patterns and Tailwind CSS v4.

## Component Specification

### Props
| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `variant` | string | 'info' | No | Feedback type: 'info', 'success', 'warning', 'error' |
| `title` | string | - | No | Optional title text for the feedback message |
| `closable` | boolean | false | No | Whether the feedback can be dismissed |
| `children` | ReactNode | - | No | Main content of the feedback message |
| `details` | ReactNode | - | No | Optional collapsible details content |
| `className` | string | - | No | Additional CSS classes |
| `onClose` | function | - | No | Callback fired when feedback is closed |

### Behavior
1. **Variant System**: 
   - Four semantic feedback types with appropriate colors and icons
   - Consistent styling using shadcn/ui design tokens
   - Accessible color contrast for all variants

2. **Content Structure**:
   - Icon indicator matching the variant type
   - Optional title with medium font weight
   - Main content area supporting rich content
   - Expandable details section when provided

3. **Interaction Features**:
   - Closable functionality with close button
   - Collapsible details section with toggle
   - Smooth animations for expand/collapse

### Variant Styles
```typescript
const feedbackVariants = cva(
  "p-4 rounded-md flex items-start",
  {
    variants: {
      variant: {
        info: "bg-blue-50 text-blue-900",
        success: "bg-green-50 text-green-900",
        warning: "bg-yellow-50 text-yellow-900",
        error: "bg-red-50 text-red-900"
      }
    },
    defaultVariants: {
      variant: "info"
    }
  }
)
```

### Icon Mapping
- **Info**: InformationCircleIcon
- **Success**: CheckCircleIcon
- **Warning**: ExclamationTriangleIcon
- **Error**: XCircleIcon

## Component Requirements

### Technical Specifications
- **Framework**: React with TypeScript
- **Base Component**: Custom implementation (no direct shadcn/ui equivalent)
- **Integration**: Uses shadcn/ui design tokens and styling patterns
- **Styling**: shadcn/ui patterns with class-variance-authority
- **Icons**: Heroicons for consistent visual indicators
- **Performance**: Lightweight with minimal re-renders
- **Accessibility**: ARIA attributes, keyboard navigation support

### Key Features Required
1. **Semantic Variants**: Info, success, warning, and error states
2. **Closable Messages**: Optional dismiss functionality
3. **Expandable Details**: Collapsible section for additional information
4. **Icon Integration**: Contextual icons for each variant
5. **Flexible Content**: Support for rich content in main and details areas
6. **Animation Support**: Smooth transitions for details expansion

### Usage Examples
```tsx
// Basic feedback messages
<DocyFeedback variant="info">
  Your changes have been saved successfully.
</DocyFeedback>

<DocyFeedback variant="success" title="Success">
  Account created successfully!
</DocyFeedback>

// Warning with details
<DocyFeedback 
  variant="warning" 
  title="Storage Warning"
  details={
    <div>
      <p>You're using 85% of your storage quota.</p>
      <p>Consider upgrading your plan or removing unused files.</p>
    </div>
  }
>
  You're running low on storage space.
</DocyFeedback>

// Error message with close button
<DocyFeedback 
  variant="error" 
  title="Upload Failed"
  closable
  onClose={() => setError(null)}
>
  The file could not be uploaded. Please try again.
</DocyFeedback>

// Rich content with actions
<DocyFeedback variant="info" title="New Feature Available">
  <div className="space-y-2">
    <p>We've added real-time collaboration features.</p>
    <button className="text-blue-600 hover:text-blue-800 font-medium">
      Learn more
    </button>
  </div>
</DocyFeedback>

// Detailed technical error
<DocyFeedback 
  variant="error"
  title="Connection Error"
  closable
  details={
    <div className="font-mono text-xs">
      <p>Error Code: CONN_TIMEOUT</p>
      <p>Endpoint: /api/v1/documents</p>
      <p>Timestamp: 2024-01-15 14:30:22</p>
    </div>
  }
>
  Unable to connect to the server. Please check your connection.
</DocyFeedback>
```

### Dependencies Required
- `@heroicons/react`: Icon components
- `class-variance-authority`: Variant management
- `clsx`: Conditional class composition

### Testing Requirements
1. **Unit Tests**: Variant rendering, close functionality, details expansion
2. **Visual Tests**: All variants, with/without titles, closable states
3. **Accessibility Tests**: ARIA attributes, keyboard navigation, screen readers
4. **Interaction Tests**: Close button, details toggle, callback execution

## Development Priority
**High** - Essential component for user feedback and error handling

## Notes
- Built with modern shadcn/ui patterns for consistency
- Supports rich content in both main and details areas
- Designed for accessibility with proper ARIA attributes
- Flexible API supporting various use cases from simple messages to complex notifications