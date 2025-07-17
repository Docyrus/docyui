# DocyDialog Component

## Overview
DocyDialog is a comprehensive dialog component that provides versatile modal interactions including alerts, confirmations, and choice-based dialogs. Built with shadcn/ui patterns and Tailwind CSS v4, it offers contextual variants with visual feedback, smooth animations, and flexible action systems for user interactions.

## Component Specification

### Props
| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `open` | boolean | false | No | Controls dialog visibility |
| `onOpenChange` | function | - | No | Callback fired when dialog open state changes |
| `type` | string | 'alert' | No | Dialog type: 'alert', 'confirm', 'choices' |
| `variant` | string | 'info' | No | Visual variant: 'info', 'success', 'warning', 'error' |
| `title` | string | 'Dialog Title' | No | Dialog title text |
| `text` | string | - | No | Dialog content text |
| `htmlText` | boolean | false | No | Whether to render text content as HTML |
| `showCancelButton` | boolean | true | No | Show cancel button (for confirm type) |
| `cancelButtonText` | string | 'Cancel' | No | Cancel button text |
| `okButtonText` | string | 'Ok' | No | OK button text |
| `options` | array | [] | No | Choice options for 'choices' type |
| `zIndex` | string/number | '50' | No | Z-index value: '10', '20', '30', '40', '50', '99999' |
| `translate` | boolean | false | No | Enable i18n translation for text content |
| `onOk` | function | - | No | Callback fired when OK button is clicked |
| `onCancel` | function | - | No | Callback fired when Cancel button is clicked |
| `className` | string | - | No | Additional CSS classes |

### Dialog Types

#### Alert Dialog
- Single action confirmation
- Only OK button displayed
- Closes dialog on OK click
- Suitable for notifications and simple acknowledgments

#### Confirm Dialog
- Two-button confirmation flow
- OK and Cancel buttons
- Separate handlers for each action
- Ideal for destructive or important actions

#### Choices Dialog
- Multiple custom action buttons
- Dynamic button generation from options array
- Each option can have custom styling and handlers
- Perfect for multi-option decision flows

### Variant System
Each variant provides appropriate visual styling and iconography:

1. **info**: Blue theme with information icon
2. **success**: Green theme with checkmark icon  
3. **warning**: Yellow theme with warning triangle icon
4. **error**: Red theme with error circle icon

### Options Interface
For 'choices' type dialogs:
```typescript
interface DialogOption {
  label: string;
  value: any;
  color?: string;
  variant?: 'primary' | 'secondary' | 'destructive' | 'outline' | 'ghost' | 'link';
  icon?: string;
}
```

### Behavior
1. **Display Management**:
   - Modal overlay with backdrop
   - Smooth enter/exit animations with scale and opacity
   - Focus management and keyboard navigation
   - Closes on overlay click or ESC key

2. **Visual Feedback**:
   - Contextual icons based on variant
   - Consistent color theming across buttons and backgrounds
   - Responsive design with mobile-friendly layouts
   - Proper spacing and typography hierarchy

3. **Action Handling**:
   - Automatic dialog closing after action
   - Support for custom action handlers
   - Prevention of accidental clicks during animations
   - Proper event propagation management

## Component Requirements

### Technical Specifications
- **Framework**: React with TypeScript
- **Base Component**: shadcn/ui AlertDialog component (`pnpm dlx shadcn@latest add alert-dialog`)
- **Extensions**: Multiple dialog types (alert, confirm, choices), variant system, HTML content support built on top of shadcn AlertDialog
- **Styling**: shadcn/ui patterns with class-variance-authority
- **Accessibility**: Full ARIA support, keyboard navigation, focus management
- **Animation**: Smooth transitions using Framer Motion or CSS animations
- **Portal**: Renders in document body for proper stacking
- **Sanitization**: XSS protection for HTML content rendering

### Key Features Required
1. **Type System**: Three distinct dialog types (alert, confirm, choices)
2. **Variant System**: Four visual variants with appropriate icons and colors
3. **Flexible Actions**: Support for custom button configurations and handlers
4. **HTML Content**: Safe HTML rendering with XSS protection
5. **Internationalization**: Optional i18n support for text content
6. **Z-Index Management**: Configurable stacking order
7. **Responsive Design**: Mobile-friendly layouts and interactions
8. **Animation System**: Smooth enter/exit animations with proper timing

### Advanced Features
- **HTML Sanitization**: Safe rendering of HTML content using XSS protection
- **Icon Integration**: Automatic icon display based on variant
- **Responsive Buttons**: Adaptive button layouts for different screen sizes
- **Focus Trap**: Proper focus management within dialog
- **Keyboard Navigation**: ESC to close, tab navigation
- **Custom Styling**: Support for additional CSS classes

### Usage Examples
```tsx
// Basic alert dialog
<DocyDialog 
  open={isOpen}
  onOpenChange={setIsOpen}
  type="alert"
  variant="info"
  title="Information"
  text="This is an informational message."
/>

// Success notification
<DocyDialog 
  open={isOpen}
  onOpenChange={setIsOpen}
  type="alert"
  variant="success"
  title="Success"
  text="Operation completed successfully!"
  okButtonText="Got it"
/>

// Warning confirmation
<DocyDialog 
  open={isOpen}
  onOpenChange={setIsOpen}
  type="confirm"
  variant="warning"
  title="Confirm Action"
  text="Are you sure you want to proceed? This action cannot be undone."
  onOk={() => handleConfirm()}
  onCancel={() => handleCancel()}
/>

// Error dialog
<DocyDialog 
  open={isOpen}
  onOpenChange={setIsOpen}
  type="alert"
  variant="error"
  title="Error"
  text="An error occurred while processing your request."
  okButtonText="Try Again"
  onOk={() => handleRetry()}
/>

// Choices dialog
<DocyDialog 
  open={isOpen}
  onOpenChange={setIsOpen}
  type="choices"
  variant="info"
  title="Select Action"
  text="Choose how you would like to proceed:"
  options={[
    { label: "Save Draft", value: "draft", variant: "secondary", icon: "save" },
    { label: "Publish", value: "publish", variant: "primary", icon: "upload" },
    { label: "Delete", value: "delete", variant: "destructive", icon: "trash" }
  ]}
  onOk={(option) => handleChoice(option)}
/>

// HTML content with sanitization
<DocyDialog 
  open={isOpen}
  onOpenChange={setIsOpen}
  type="alert"
  variant="info"
  title="Rich Content"
  text="<p>This is <strong>HTML content</strong> with <em>formatting</em>.</p>"
  htmlText={true}
/>

// High z-index dialog
<DocyDialog 
  open={isOpen}
  onOpenChange={setIsOpen}
  type="confirm"
  variant="warning"
  title="High Priority"
  text="This dialog appears above other elements."
  zIndex="99999"
  onOk={() => handleHighPriorityAction()}
/>

// Internationalized dialog
<DocyDialog 
  open={isOpen}
  onOpenChange={setIsOpen}
  type="confirm"
  variant="error"
  title="dialog.confirm.title"
  text="dialog.confirm.deleteMessage"
  cancelButtonText="dialog.button.cancel"
  okButtonText="dialog.button.confirm"
  translate={true}
  onOk={() => handleDelete()}
/>

// Custom styling
<DocyDialog 
  open={isOpen}
  onOpenChange={setIsOpen}
  type="alert"
  variant="success"
  title="Custom Dialog"
  text="Dialog with custom styling."
  className="custom-dialog-styles"
  showCancelButton={false}
/>
```

### Dependencies Required
- `@radix-ui/react-dialog`: Accessible dialog primitives
- `@heroicons/react`: Icon components (CheckCircle, ExclamationTriangle, XCircle, InformationCircle)
- `framer-motion`: Animation library
- `class-variance-authority`: Variant management
- `xss`: HTML sanitization library
- `react-i18next`: Internationalization support (optional)
- `DocyButton`: Button component integration
- `DocyIcon`: Icon component integration

### Testing Requirements
1. **Unit Tests**: Dialog types, variants, prop validation, action handlers
2. **Integration Tests**: Button interactions, HTML sanitization, i18n integration
3. **Accessibility Tests**: ARIA attributes, keyboard navigation, focus management
4. **Visual Tests**: All variants and types, responsive behavior, animations
5. **Interaction Tests**: Click handlers, overlay dismissal, ESC key handling
6. **Security Tests**: XSS protection, HTML sanitization validation

## Development Priority
**High** - Essential component for user feedback and confirmation flows

## Notes
- Built with modern shadcn/ui patterns for consistency and maintainability
- Leverages Radix UI for robust accessibility and behavior
- XSS protection is mandatory for HTML content rendering
- Supports both controlled and uncontrolled usage patterns
- Flexible action system accommodates various use cases
- Proper focus management ensures excellent keyboard navigation
- Responsive design works across all device sizes
- Full TypeScript support with excellent developer experience