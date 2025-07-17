# DocyFieldButton Component

## Overview
DocyFieldButton is a specialized button component that extends DocyFieldBase to provide action-oriented functionality within forms. Unlike typical form fields that handle data input, DocyFieldButton handles user actions like form submission, navigation, API calls, and custom operations. It integrates seamlessly with the form system while providing advanced features like loading states, confirmation dialogs, and conditional visibility.

The component is designed for form actions, workflow triggers, data operations, and any scenario requiring user interaction within the form context.

## Component Specification

### Props
DocyFieldButton inherits ALL props from DocyFieldBase and adds the following button-specific properties:

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `text` | string | 'Button' | No | Button text content |
| `type` | 'button' \| 'submit' \| 'reset' | 'button' | No | HTML button type |
| `variant` | 'default' \| 'destructive' \| 'outline' \| 'secondary' \| 'ghost' \| 'link' | 'default' | No | Button visual variant |
| `size` | 'default' \| 'sm' \| 'lg' \| 'icon' | 'default' | No | Button size |
| `icon` | string \| object | - | No | Icon to display in button |
| `iconPosition` | 'left' \| 'right' \| 'only' | 'left' | No | Icon position relative to text |
| `loading` | boolean | false | No | Show loading state |
| `loadingText` | string | 'Loading...' | No | Text to show while loading |
| `loadingIcon` | string | 'spinner' | No | Icon to show while loading |
| `disabled` | boolean | false | No | Disable button interaction |
| `disabledReason` | string | - | No | Tooltip text when disabled |
| `onClick` | function | - | No | Click handler function |
| `onMouseEnter` | function | - | No | Mouse enter handler |
| `onMouseLeave` | function | - | No | Mouse leave handler |
| `onFocus` | function | - | No | Focus handler |
| `onBlur` | function | - | No | Blur handler |
| `href` | string | - | No | Link URL (renders as link button) |
| `target` | string | - | No | Link target attribute |
| `download` | string \| boolean | - | No | Download attribute for file downloads |
| `confirmDialog` | ConfirmDialogConfig | - | No | Confirmation dialog configuration |
| `tooltip` | string | - | No | Tooltip text |
| `tooltipPosition` | 'top' \| 'bottom' \| 'left' \| 'right' | 'top' | No | Tooltip position |
| `badge` | BadgeConfig | - | No | Badge configuration |
| `dropdown` | DropdownConfig | - | No | Dropdown menu configuration |
| `splitButton` | boolean | false | No | Enable split button layout |
| `splitActions` | ActionConfig[] | [] | No | Split button actions |
| `keyboard` | string | - | No | Keyboard shortcut |
| `keyboardGlobal` | boolean | false | No | Enable global keyboard shortcut |
| `autoFocus` | boolean | false | No | Auto-focus on mount |
| `tabIndex` | number | 0 | No | Tab index for keyboard navigation |
| `ariaLabel` | string | - | No | ARIA label for accessibility |
| `ariaDescribedBy` | string | - | No | ARIA described by reference |
| `role` | string | 'button' | No | ARIA role |
| `fullWidth` | boolean | false | No | Take full width of container |
| `justify` | 'start' \| 'center' \| 'end' \| 'between' \| 'around' | 'center' | No | Content justification |
| `align` | 'start' \| 'center' \| 'end' | 'center' | No | Content alignment |
| `animate` | boolean | true | No | Enable button animations |
| `animationType` | 'scale' \| 'fade' \| 'slide' \| 'bounce' | 'scale' | No | Animation type |
| `pulse` | boolean | false | No | Enable pulse animation |
| `ripple` | boolean | true | No | Enable ripple effect on click |
| `rounded` | boolean | true | No | Enable rounded corners |
| `shadow` | boolean | false | No | Enable drop shadow |
| `gradient` | boolean | false | No | Enable gradient background |
| `gradientColors` | string[] | - | No | Custom gradient colors |
| `customStyles` | Record<string, string> | {} | No | Custom CSS styles |
| `className` | string | - | No | Additional CSS classes |
| `dataTestId` | string | - | No | Test ID for testing |
| `form` | string | - | No | Form ID for submit buttons |
| `formAction` | string | - | No | Form action URL |
| `formMethod` | 'get' \| 'post' | 'post' | No | Form method |
| `formTarget` | string | - | No | Form target |
| `formNoValidate` | boolean | false | No | Skip form validation |
| `value` | string | - | No | Button value |
| `name` | string | - | No | Button name attribute |
| `actionType` | 'click' \| 'submit' \| 'reset' \| 'navigate' \| 'api' \| 'custom' | 'click' | No | Action type |
| `actionConfig` | ActionConfig | - | No | Action configuration |
| `successMessage` | string | - | No | Success message to display |
| `errorMessage` | string | - | No | Error message to display |
| `showNotification` | boolean | true | No | Show success/error notifications |
| `notificationDuration` | number | 5000 | No | Notification duration in milliseconds |
| `cooldown` | number | 0 | No | Cooldown time in milliseconds |
| `maxClicks` | number | - | No | Maximum number of clicks |
| `clickCount` | number | 0 | No | Current click count |
| `resetClickCount` | function | - | No | Function to reset click count |
| `trackingEvent` | string | - | No | Analytics event name |
| `trackingData` | Record<string, any> | {} | No | Analytics event data |
| `onSuccess` | function | - | No | Success callback |
| `onError` | function | - | No | Error callback |
| `onComplete` | function | - | No | Complete callback (success or error) |
| `onCooldownEnd` | function | - | No | Cooldown end callback |
| `onMaxClicksReached` | function | - | No | Max clicks reached callback |

**Note**: DocyFieldButton inherits all DocyFieldBase props including validation, layout, dynamic computed properties, AI integration, and more. See [DocyFieldBase documentation](./DocyFieldBase.md) for the complete list.

### TypeScript Interfaces

```typescript
interface ConfirmDialogConfig {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'destructive' | 'warning' | 'info';
  icon?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

interface BadgeConfig {
  text: string;
  variant?: 'default' | 'secondary' | 'destructive' | 'success' | 'warning';
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  dot?: boolean;
  pulse?: boolean;
  max?: number;
}

interface DropdownConfig {
  items: DropdownItem[];
  trigger?: 'click' | 'hover';
  placement?: 'top' | 'bottom' | 'left' | 'right';
  offset?: number;
  closeOnSelect?: boolean;
  searchable?: boolean;
  maxHeight?: number;
}

interface DropdownItem {
  id: string;
  label: string;
  icon?: string;
  value?: any;
  disabled?: boolean;
  separator?: boolean;
  shortcut?: string;
  onClick?: (item: DropdownItem) => void;
  children?: DropdownItem[];
}

interface ActionConfig {
  type: 'click' | 'submit' | 'reset' | 'navigate' | 'api' | 'custom';
  target?: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  url?: string;
  data?: any;
  headers?: Record<string, string>;
  timeout?: number;
  retries?: number;
  onSuccess?: (response: any) => void;
  onError?: (error: any) => void;
  transform?: (response: any) => any;
  validate?: (data: any) => boolean;
  customHandler?: (config: ActionConfig) => Promise<any>;
}

interface ButtonState {
  loading: boolean;
  disabled: boolean;
  clicked: boolean;
  focused: boolean;
  hovered: boolean;
  cooldownActive: boolean;
  cooldownRemaining: number;
  clickCount: number;
  maxClicksReached: boolean;
}

interface NotificationConfig {
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}
```

### Behavior

1. **Button Actions**:
   - Standard click handling with event propagation
   - Form submission with validation integration
   - Navigation with history management
   - API calls with loading states and error handling

2. **Visual States**:
   - Loading state with spinner and custom text
   - Disabled state with optional tooltip
   - Hover and focus states with animations
   - Active state during click interactions

3. **Confirmation**:
   - Optional confirmation dialog before action
   - Customizable dialog content and styling
   - Confirm/cancel callback handling
   - Destructive action warnings

4. **Advanced Features**:
   - Keyboard shortcuts (local and global)
   - Click cooldown and rate limiting
   - Maximum click count enforcement
   - Badge notifications and indicators

5. **Accessibility**:
   - Full keyboard navigation support
   - Screen reader compatible ARIA attributes
   - Focus management and indicators
   - High contrast mode support

6. **Integration**:
   - Form field integration through DocyFieldBase
   - Analytics tracking with custom events
   - Notification system integration
   - Theme and styling consistency

## Component Requirements

### Technical Specifications
- **Framework**: React 18+ with TypeScript
- **Base Component**: shadcn/ui Button component (`pnpm dlx shadcn@latest add button`)
- **Extensions**: Docy-specific features built on top of shadcn Button
- **Wrapper**: Extends DocyFieldBase for consistent field structure
- **Styling**: shadcn/ui Button component with Tailwind CSS v4
- **Icons**: Lucide React icons or custom icon system
- **Animations**: CSS transitions and transforms
- **Accessibility**: WCAG 2.1 AA compliance

### Key Features Required
1. **Action Handling**: Click, submit, reset, navigate, and API actions
2. **Visual States**: Loading, disabled, hover, focus, and active states
3. **Confirmation**: Optional confirmation dialogs for actions
4. **Keyboard Support**: Shortcuts and full keyboard navigation
5. **Rate Limiting**: Cooldown and maximum click enforcement
6. **Notifications**: Success and error message display
7. **Accessibility**: Complete screen reader and keyboard support

### Usage Examples

```tsx
// Basic button
<DocyFieldButton
  name="basicButton"
  text="Click Me"
  onClick={() => console.log('Button clicked')}
/>

// Submit button with loading
<DocyFieldButton
  name="submitButton"
  text="Submit Form"
  type="submit"
  variant="default"
  loading={isSubmitting}
  loadingText="Submitting..."
  disabled={!isValid}
/>

// Destructive action with confirmation
<DocyFieldButton
  name="deleteButton"
  text="Delete Item"
  variant="destructive"
  icon="trash"
  confirmDialog={{
    title: 'Delete Item',
    message: 'Are you sure you want to delete this item? This action cannot be undone.',
    confirmText: 'Delete',
    cancelText: 'Cancel',
    variant: 'destructive',
    icon: 'alert-triangle'
  }}
  onClick={handleDelete}
/>

// API call button
<DocyFieldButton
  name="apiButton"
  text="Fetch Data"
  actionType="api"
  actionConfig={{
    type: 'api',
    method: 'GET',
    url: '/api/data',
    timeout: 5000,
    onSuccess: (response) => {
      console.log('Data fetched:', response);
    },
    onError: (error) => {
      console.error('Failed to fetch data:', error);
    }
  }}
  successMessage="Data fetched successfully"
  errorMessage="Failed to fetch data"
/>

// Navigation button
<DocyFieldButton
  name="navButton"
  text="Go to Dashboard"
  actionType="navigate"
  actionConfig={{
    type: 'navigate',
    target: '/dashboard'
  }}
  icon="arrow-right"
  iconPosition="right"
/>

// Button with dropdown
<DocyFieldButton
  name="dropdownButton"
  text="Actions"
  dropdown={{
    items: [
      { id: 'edit', label: 'Edit', icon: 'edit', onClick: handleEdit },
      { id: 'duplicate', label: 'Duplicate', icon: 'copy', onClick: handleDuplicate },
      { id: 'separator', separator: true },
      { id: 'delete', label: 'Delete', icon: 'trash', onClick: handleDelete }
    ],
    placement: 'bottom',
    closeOnSelect: true
  }}
/>

// Split button
<DocyFieldButton
  name="splitButton"
  text="Save"
  splitButton={true}
  splitActions={[
    { type: 'click', target: 'save', onClick: handleSave },
    { type: 'click', target: 'saveAndClose', onClick: handleSaveAndClose },
    { type: 'click', target: 'saveAs', onClick: handleSaveAs }
  ]}
  onClick={handleSave}
/>

// Button with badge
<DocyFieldButton
  name="badgeButton"
  text="Messages"
  icon="mail"
  badge={{
    text: '5',
    variant: 'destructive',
    position: 'top-right',
    pulse: true
  }}
  onClick={handleMessages}
/>

// Button with keyboard shortcut
<DocyFieldButton
  name="shortcutButton"
  text="Save"
  keyboard="Ctrl+S"
  keyboardGlobal={true}
  icon="save"
  onClick={handleSave}
  tooltip="Save document (Ctrl+S)"
/>

// Rate-limited button
<DocyFieldButton
  name="rateLimitedButton"
  text="Send Email"
  cooldown={5000}
  maxClicks={3}
  onClick={handleSendEmail}
  onCooldownEnd={() => console.log('Cooldown ended')}
  onMaxClicksReached={() => console.log('Max clicks reached')}
/>

// File download button
<DocyFieldButton
  name="downloadButton"
  text="Download Report"
  icon="download"
  href="/api/reports/download"
  download="report.pdf"
  target="_blank"
/>

// Custom styled button
<DocyFieldButton
  name="customButton"
  text="Custom Button"
  gradient={true}
  gradientColors={['#3b82f6', '#8b5cf6']}
  shadow={true}
  pulse={true}
  rounded={true}
  animate={true}
  animationType="bounce"
/>

// Form integration with validation
<DocyFieldButton
  name="validatedButton"
  text="Submit"
  type="submit"
  computedDisabled={{ field: 'isFormValid', operator: 'equals', value: false }}
  actions={{
    click: [
      ['condition', 'isFormValid = true', [
        ['setFieldValue', {
          field: 'submitAttempts',
          value: '{{ submitAttempts + 1 }}'
        }],
        ['setFieldValue', {
          field: 'lastSubmitted',
          value: new Date().toISOString()
        }]
      ]]
    ]
  }}
  validations={[
    { type: 'custom', validator: validateFormState, message: 'Form is not ready for submission' }
  ]}
/>

// Conditional visibility button
<DocyFieldButton
  name="conditionalButton"
  text="Admin Action"
  variant="destructive"
  computedHidden={{ field: 'userRole', operator: 'notEquals', value: 'admin' }}
  confirmDialog={{
    title: 'Admin Action',
    message: 'This action requires admin privileges. Continue?',
    confirmText: 'Continue',
    variant: 'warning'
  }}
/>

// Collaborative button
<DocyFieldButton
  name="collaborativeButton"
  text="Share Document"
  icon="share"
  onClick={handleShare}
  trackingEvent="document_shared"
  trackingData={{
    documentId: 'doc-123',
    shareType: 'public',
    timestamp: new Date().toISOString()
  }}
  successMessage="Document shared successfully"
  notificationDuration={3000}
/>

// Accessibility-focused button
<DocyFieldButton
  name="accessibleButton"
  text="Accessible Action"
  ariaLabel="Perform accessible action for screen readers"
  ariaDescribedBy="button-description"
  role="button"
  tabIndex={0}
  autoFocus={false}
  onClick={handleAccessibleAction}
  onFocus={(e) => console.log('Button focused')}
  onBlur={(e) => console.log('Button blurred')}
/>
```

### Integration Requirements
- **DocyFieldBase**: Base wrapper component (required)
- **shadcn/ui Button**: Core button component
- **DocyIcon**: For button icons and loading indicators
- **DocyDialog**: For confirmation dialogs
- **DocyDropdown**: For dropdown menu functionality
- **DocyTooltip**: For button tooltips and help text
- **DocyBadge**: For badge notifications
- **DocyNotification**: For success/error messages

### Dependencies Required
- `@radix-ui/react-dialog`: Dialog functionality for confirmations
- `@radix-ui/react-dropdown-menu`: Dropdown menu component
- `@radix-ui/react-tooltip`: Tooltip functionality
- `lucide-react`: Icons for buttons
- `react-hook-form`: Form integration (inherited from DocyFieldBase)
- `class-variance-authority`: Variant management
- All DocyFieldBase dependencies

### Testing Requirements
1. **Unit Tests**: Click handling, state management, action execution
2. **Integration Tests**: React Hook Form integration, API calls, navigation
3. **Visual Tests**: All variants, sizes, states, and animations
4. **Accessibility Tests**: Keyboard navigation, screen reader support, ARIA attributes
5. **Performance Tests**: Click handling, animation performance, memory usage
6. **Action Tests**: All action types, confirmation dialogs, rate limiting
7. **User Experience Tests**: Loading states, error handling, notification display

## Development Priority
**High** - Essential for user interactions, form submissions, and workflow triggers

## Notes
- Built on shadcn/ui Button component for consistent design system integration
- Comprehensive action system supports various interaction patterns
- Rate limiting and cooldown features prevent abuse and improve UX
- Confirmation dialogs provide safety for destructive actions
- Keyboard shortcuts enhance power user experience
- Analytics tracking enables usage monitoring and optimization
- Accessibility features ensure inclusive user interactions
- Performance optimized for responsive user interface
- Extensible architecture allows custom action types and handlers
- Complete integration with form validation and field management systems