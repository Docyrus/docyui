# DocyFieldInlineForm Component

## Overview
DocyFieldInlineForm is a specialized form field component that extends DocyFieldBase to provide inline form editing capabilities. It enables embedding complete forms within other forms, supporting nested data structures, dynamic field generation, and inline editing workflows. The component is designed for scenarios where users need to edit related data without navigating away from the parent form, such as editing contact information, address details, or product specifications inline.

This component provides a flexible foundation for complex form interactions including modal forms, collapsible sections, auto-submission, and dynamic field validation with full integration into the parent form's state management system.

## Component Specification

### Props
DocyFieldInlineForm inherits ALL props from DocyFieldBase and adds the following inline-form-specific properties:

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `fields` | FieldDefinition[] | [] | Yes | Array of field definitions for the inline form |
| `layout` | 'horizontal' \| 'vertical' \| 'grid' | 'vertical' | No | Form layout orientation |
| `gridColumns` | number | 2 | No | Number of columns when using grid layout |
| `showSubmit` | boolean | true | No | Whether to show submit button |
| `submitText` | string | 'Save' | No | Text for submit button |
| `showCancel` | boolean | true | No | Whether to show cancel button |
| `cancelText` | string | 'Cancel' | No | Text for cancel button |
| `showReset` | boolean | false | No | Whether to show reset button |
| `resetText` | string | 'Reset' | No | Text for reset button |
| `autoSubmit` | boolean | false | No | Auto-submit form on field changes |
| `autoSubmitDelay` | number | 1000 | No | Delay before auto-submit (ms) |
| `modal` | boolean | false | No | Show inline form in modal dialog |
| `modalTitle` | string | - | No | Title for modal dialog |
| `modalSize` | 'sm' \| 'md' \| 'lg' \| 'xl' \| 'full' | 'md' | No | Size of modal dialog |
| `modalTrigger` | ReactNode | - | No | Custom trigger element for modal |
| `collapsible` | boolean | false | No | Whether form section is collapsible |
| `collapsed` | boolean | false | No | Initial collapsed state |
| `collapsibleTitle` | string | - | No | Title for collapsible section |
| `onSubmit` | function | - | No | Callback when form is submitted |
| `onCancel` | function | - | No | Callback when form is cancelled |
| `onReset` | function | - | No | Callback when form is reset |
| `onFieldChange` | function | - | No | Callback when any field changes |
| `validation` | ValidationSchema | - | No | Form-level validation schema |
| `showValidation` | boolean | true | No | Whether to show validation errors |
| `validationMode` | 'onChange' \| 'onBlur' \| 'onSubmit' | 'onChange' | No | When to trigger validation |
| `entity` | string | - | No | Entity name for data context |
| `entityId` | string \| number | - | No | Entity ID for editing existing data |
| `dataSource` | DataSourceConfig | - | No | External data source configuration |
| `initialData` | Record<string, any> | {} | No | Initial form data |
| `transformData` | function | - | No | Transform data before submission |
| `validateOnMount` | boolean | false | No | Run validation when component mounts |
| `resetOnSuccess` | boolean | false | No | Reset form after successful submission |
| `closeOnSuccess` | boolean | false | No | Close modal/collapse after success |
| `showProgress` | boolean | false | No | Show form completion progress |
| `allowPartialSubmit` | boolean | false | No | Allow submitting with validation errors |
| `submitOnEnter` | boolean | true | No | Submit form when Enter key is pressed |
| `cancelOnEscape` | boolean | true | No | Cancel form when Escape key is pressed |
| `spacing` | 'none' \| 'sm' \| 'md' \| 'lg' | 'md' | No | Space between form elements |
| `fieldVariant` | string | - | No | Default variant for all fields |
| `fieldSize` | 'sm' \| 'md' \| 'lg' | 'md' | No | Default size for all fields |

**Note**: DocyFieldInlineForm inherits all DocyFieldBase props including validation, layout, dynamic computed properties, actions system, and more. See [DocyFieldBase documentation](./DocyFieldBase.md) for the complete list.

### TypeScript Interfaces

```typescript
interface FieldDefinition {
  name: string;
  type: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  hidden?: boolean;
  validation?: ValidationRule[];
  options?: any[];
  defaultValue?: any;
  props?: Record<string, any>;
  columnSpan?: number;
  rowSpan?: number;
  computedHidden?: string | FilterQuery;
  computedRequired?: string | FilterQuery;
  computedDisabled?: string | FilterQuery;
  actions?: FieldActions;
}

interface ValidationSchema {
  rules: Record<string, ValidationRule[]>;
  messages?: Record<string, string>;
  groups?: ValidationGroup[];
}

interface ValidationGroup {
  name: string;
  fields: string[];
  validator: (values: Record<string, any>) => boolean | string;
}

interface DataSourceConfig {
  url?: string;
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH';
  headers?: Record<string, string>;
  params?: Record<string, any>;
  transform?: (data: any) => any;
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
}

interface InlineFormCallbacks {
  onSubmit?: (data: Record<string, any>, actions: FormActions) => void | Promise<void>;
  onCancel?: (data: Record<string, any>) => void;
  onReset?: (data: Record<string, any>) => void;
  onFieldChange?: (fieldName: string, value: any, allValues: Record<string, any>) => void;
  transformData?: (data: Record<string, any>) => Record<string, any>;
}

interface FormActions {
  setSubmitting: (isSubmitting: boolean) => void;
  setError: (field: string, message: string) => void;
  setFieldValue: (field: string, value: any) => void;
  reset: () => void;
  close: () => void;
}
```

### Behavior

1. **Nested Form Management**:
   - Independent form state management within parent form context
   - Automatic field registration and validation
   - Data transformation and normalization
   - Seamless integration with parent form submission

2. **Dynamic Field Generation**:
   - Runtime field definition from configuration
   - Conditional field display based on form data
   - Dynamic validation rules and requirements
   - Computed field properties with JSONata expressions

3. **Layout Management**:
   - Responsive grid system with configurable columns
   - Horizontal and vertical layout modes
   - Field spanning and positioning
   - Collapsible sections with animations

4. **Submission Handling**:
   - Multiple submission modes (manual, auto-submit, on-change)
   - Data validation and transformation
   - Success/error handling with callbacks
   - Integration with external data sources

5. **Modal Integration**:
   - Configurable modal dialogs
   - Custom trigger elements
   - Size and positioning options
   - Keyboard navigation support

6. **Accessibility Features**:
   - ARIA labels and descriptions
   - Keyboard navigation support
   - Screen reader compatibility
   - Focus management and trapping

## Component Requirements

### Technical Specifications
- **Framework**: React 18+ with TypeScript
- **Base Component**: Custom implementation using shadcn/ui design patterns
- **Installation**: Uses multiple shadcn/ui components: `pnpm dlx shadcn@latest add dialog form button input`
- **Wrapper**: Extends DocyFieldBase for consistent field structure
- **Styling**: shadcn/ui patterns with Tailwind CSS v4
- **Form Integration**: React Hook Form with nested form support
- **Validation**: Integration with CustomValidation system
- **Actions**: Support for FieldActions system across all inline fields
- **Accessibility**: WCAG 2.1 AA compliance

### Key Features Required
1. **Nested Form Support**: Independent form state within parent form
2. **Dynamic Field Generation**: Runtime field creation from configuration
3. **Modal Integration**: Configurable modal dialogs with keyboard support
4. **Auto-submission**: Configurable auto-submit with debouncing
5. **Data Source Integration**: External API integration for data loading/saving
6. **Validation System**: Multi-level validation with form-level and field-level rules
7. **Layout Flexibility**: Multiple layout modes with responsive behavior
8. **Accessibility**: Complete keyboard navigation and screen reader support

### Usage Examples

```tsx
// Basic inline form with simple fields
<DocyFieldInlineForm
  name="contactInfo"
  label="Contact Information"
  fields={[
    { name: 'firstName', type: 'text', label: 'First Name', required: true },
    { name: 'lastName', type: 'text', label: 'Last Name', required: true },
    { name: 'email', type: 'email', label: 'Email Address', required: true },
    { name: 'phone', type: 'phone', label: 'Phone Number' }
  ]}
  layout="grid"
  gridColumns={2}
  onSubmit={(data) => console.log('Contact saved:', data)}
/>

// Modal inline form with validation
<DocyFieldInlineForm
  name="addressForm"
  label="Address Details"
  modal={true}
  modalTitle="Edit Address"
  modalSize="lg"
  modalTrigger={<Button variant="outline">Edit Address</Button>}
  fields={[
    { name: 'street', type: 'text', label: 'Street Address', required: true, columnSpan: 2 },
    { name: 'city', type: 'text', label: 'City', required: true },
    { name: 'state', type: 'select', label: 'State', required: true, options: stateOptions },
    { name: 'zipCode', type: 'text', label: 'ZIP Code', required: true },
    { name: 'country', type: 'select', label: 'Country', required: true, options: countryOptions }
  ]}
  validation={{
    rules: {
      zipCode: [
        { type: 'pattern', value: /^\d{5}(-\d{4})?$/, message: 'Please enter a valid ZIP code' }
      ]
    }
  }}
  onSubmit={async (data, actions) => {
    actions.setSubmitting(true);
    try {
      await saveAddress(data);
      actions.close();
    } catch (error) {
      actions.setError('general', 'Failed to save address');
    } finally {
      actions.setSubmitting(false);
    }
  }}
/>

// Auto-submit inline form with field dependencies
<DocyFieldInlineForm
  name="productDetails"
  label="Product Configuration"
  autoSubmit={true}
  autoSubmitDelay={2000}
  showSubmit={false}
  showCancel={false}
  fields={[
    { 
      name: 'productType', 
      type: 'select', 
      label: 'Product Type', 
      required: true,
      options: [
        { value: 'digital', label: 'Digital' },
        { value: 'physical', label: 'Physical' }
      ],
      actions: {
        change: [
          ['setFieldOption', { field: 'weight', option: 'hidden', value: true }],
          ['condition', 'productType = "physical"', [
            ['setFieldOption', { field: 'weight', option: 'hidden', value: false }],
            ['setFieldOption', { field: 'weight', option: 'required', value: true }]
          ]]
        ]
      }
    },
    { name: 'price', type: 'money', label: 'Price', required: true },
    { name: 'weight', type: 'number', label: 'Weight (lbs)', hidden: true }
  ]}
  onSubmit={(data) => updateProduct(data)}
  onFieldChange={(field, value, allValues) => {
    console.log(`Field ${field} changed to:`, value);
  }}
/>

// Collapsible form with data source integration
<DocyFieldInlineForm
  name="userPreferences"
  label="User Preferences"
  collapsible={true}
  collapsed={true}
  collapsibleTitle="Advanced Settings"
  entity="user"
  entityId={currentUser.id}
  dataSource={{
    url: '/api/users/{entityId}/preferences',
    method: 'GET',
    onSuccess: (data) => setPreferences(data),
    onError: (error) => showError('Failed to load preferences')
  }}
  fields={[
    { name: 'theme', type: 'select', label: 'Theme', options: themeOptions },
    { name: 'language', type: 'select', label: 'Language', options: languageOptions },
    { name: 'notifications', type: 'switch', label: 'Enable Notifications' },
    { name: 'autoSave', type: 'switch', label: 'Auto-save Documents' },
    { name: 'timezone', type: 'select', label: 'Timezone', options: timezoneOptions }
  ]}
  layout="vertical"
  onSubmit={async (data) => {
    await updateUserPreferences(currentUser.id, data);
    showSuccess('Preferences updated successfully');
  }}
/>

// Complex form with computed fields and custom validation
<DocyFieldInlineForm
  name="orderCalculator"
  label="Order Calculator"
  fields={[
    { name: 'quantity', type: 'number', label: 'Quantity', required: true, defaultValue: 1 },
    { name: 'unitPrice', type: 'money', label: 'Unit Price', required: true },
    { 
      name: 'subtotal', 
      type: 'money', 
      label: 'Subtotal', 
      disabled: true,
      computedFormula: 'quantity * unitPrice'
    },
    { 
      name: 'taxRate', 
      type: 'number', 
      label: 'Tax Rate (%)', 
      defaultValue: 8.25,
      computedHidden: { field: 'taxExempt', operator: 'equals', value: true }
    },
    { name: 'taxExempt', type: 'checkbox', label: 'Tax Exempt' },
    { 
      name: 'tax', 
      type: 'money', 
      label: 'Tax Amount', 
      disabled: true,
      computedFormula: 'taxExempt ? 0 : (subtotal * taxRate / 100)'
    },
    { 
      name: 'total', 
      type: 'money', 
      label: 'Total Amount', 
      disabled: true,
      computedFormula: 'subtotal + tax'
    }
  ]}
  validation={{
    rules: {
      quantity: [
        { type: 'min', value: 1, message: 'Quantity must be at least 1' },
        { type: 'max', value: 1000, message: 'Quantity cannot exceed 1000' }
      ],
      unitPrice: [
        { type: 'min', value: 0.01, message: 'Unit price must be greater than $0.00' }
      ]
    },
    groups: [
      {
        name: 'orderLimits',
        fields: ['quantity', 'unitPrice', 'total'],
        validator: (values) => {
          const total = values.quantity * values.unitPrice;
          return total <= 50000 || 'Order total cannot exceed $50,000';
        }
      }
    ]
  }}
  layout="grid"
  gridColumns={3}
  onSubmit={(data) => processOrder(data)}
/>

// Form with external data loading and transformation
<DocyFieldInlineForm
  name="companyProfile"
  label="Company Profile"
  entity="company"
  entityId={companyId}
  dataSource={{
    url: '/api/companies/{entityId}',
    method: 'GET',
    transform: (data) => ({
      ...data,
      foundedYear: new Date(data.foundedDate).getFullYear()
    })
  }}
  fields={[
    { name: 'name', type: 'text', label: 'Company Name', required: true },
    { name: 'industry', type: 'select', label: 'Industry', options: industryOptions },
    { name: 'foundedYear', type: 'number', label: 'Founded Year' },
    { name: 'employees', type: 'number', label: 'Number of Employees' },
    { name: 'website', type: 'url', label: 'Website' },
    { name: 'description', type: 'textarea', label: 'Description', columnSpan: 2 }
  ]}
  transformData={(data) => ({
    ...data,
    foundedDate: new Date(data.foundedYear, 0, 1).toISOString()
  })}
  onSubmit={async (data, actions) => {
    try {
      await updateCompany(companyId, data);
      showSuccess('Company profile updated');
      actions.close();
    } catch (error) {
      actions.setError('general', error.message);
    }
  }}
/>

// Form with progress tracking and partial submission
<DocyFieldInlineForm
  name="applicationForm"
  label="Job Application"
  showProgress={true}
  allowPartialSubmit={true}
  fields={[
    { name: 'personalInfo', type: 'fieldset', label: 'Personal Information', fields: [
      { name: 'firstName', type: 'text', label: 'First Name', required: true },
      { name: 'lastName', type: 'text', label: 'Last Name', required: true },
      { name: 'email', type: 'email', label: 'Email', required: true }
    ]},
    { name: 'experience', type: 'fieldset', label: 'Experience', fields: [
      { name: 'yearsExperience', type: 'number', label: 'Years of Experience' },
      { name: 'currentRole', type: 'text', label: 'Current Role' },
      { name: 'skills', type: 'select-multi', label: 'Skills', options: skillOptions }
    ]},
    { name: 'additional', type: 'fieldset', label: 'Additional Information', fields: [
      { name: 'portfolio', type: 'url', label: 'Portfolio URL' },
      { name: 'coverLetter', type: 'textarea', label: 'Cover Letter' }
    ]}
  ]}
  submitText="Submit Application"
  resetText="Start Over"
  showReset={true}
  onSubmit={async (data, actions) => {
    const isComplete = validateCompleteness(data);
    if (!isComplete && !confirm('Submit incomplete application?')) {
      return;
    }
    
    actions.setSubmitting(true);
    try {
      await submitApplication(data);
      actions.reset();
      showSuccess('Application submitted successfully');
    } catch (error) {
      actions.setError('general', 'Failed to submit application');
    } finally {
      actions.setSubmitting(false);
    }
  }}
/>
```

### Integration Requirements
- **DocyFieldBase**: Base wrapper component (required)
- **DocyForm**: Form container integration
- **DocyDialog**: Modal dialog support
- **DocyCollapsible**: Collapsible section support
- **DocyButton**: Form action buttons
- **DocyProgress**: Progress tracking display
- **All Field Components**: Dynamic field type resolution
- **FilterQuery**: For computed field properties
- **CustomValidation**: For form-level validation
- **FieldActions**: For inter-field interactions

### Dependencies Required
- `react-hook-form`: Form state management and validation
- `@hookform/resolvers`: Validation schema resolvers
- `@radix-ui/react-dialog`: Modal dialog functionality
- `@radix-ui/react-collapsible`: Collapsible sections
- `jsonata`: For computed formula evaluation
- `class-variance-authority`: Variant management
- `debounce`: For auto-submit delay functionality
- All DocyFieldBase dependencies

### Testing Requirements
1. **Unit Tests**: Field generation, validation, form submission, data transformation
2. **Integration Tests**: React Hook Form integration, nested form behavior, modal functionality
3. **Visual Tests**: All layout modes, responsive behavior, modal sizes
4. **Accessibility Tests**: Keyboard navigation, screen reader support, focus management
5. **Performance Tests**: Large form rendering, auto-submit performance, field computation
6. **Validation Tests**: Form-level validation, custom validation groups, error display
7. **Data Source Tests**: External API integration, data loading, error handling

## Development Priority
**Low** - Complex specialized field for advanced form scenarios

## Notes
- Built with shadcn/ui design patterns for consistency with design system
- Supports complex nested form scenarios with independent state management
- Flexible field definition system enables runtime form generation
- Modal integration provides enhanced user experience for form editing
- Auto-submit functionality enables real-time data persistence
- Complete accessibility compliance ensures inclusive user experience
- Performance optimized for large forms with many nested fields
- Extensible architecture allows for custom field types and validation rules