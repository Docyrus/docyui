# DocyForm Component

## Overview
DocyForm is the main form container component that manages form layout, submission, validation, and field interaction. It supports multiple layout types including Grid/Flex layout, Wizard-style forms, and TypeForm-style single-field presentation. The component provides comprehensive form management including data provider integration, action handling, validation, and navigation.

## Component Specification

### Props
| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `form` | FormApi | - | Yes | TanStack Form instance created with useForm |
| `layout` | 'grid' \| 'column' | 'grid' | No | Layout type for form fields |
| `columnCount` | number | null | No | Number of columns for grid layout |
| `fieldSize` | string | null | No | Default size for all fields |
| `fieldLabelAlign` | string | null | No | Default label alignment for all fields |
| `fieldLabelSize` | string | null | No | Default label size for all fields |
| `fieldLabelWidth` | string \| number | null | No | Default label width for all fields |
| `fieldCorners` | string | null | No | Default corner style for all fields |
| `fieldVariant` | string | null | No | Default variant for all fields |
| `showFieldLabelIcon` | boolean | true | No | Whether to show field type icons in labels |
| `mode` | 'add' \| 'edit' \| 'view' | 'add' | No | Form mode determines behavior and styling |
| `narrow` | boolean | false | No | Whether to use narrow layout |
| `validationMessagePlacement` | 'outside' \| 'inside' | 'outside' | No | Where to place validation messages |
| `validateOnBlur` | boolean | false | No | Whether to validate fields on blur |
| `clickToEdit` | boolean | false | No | Enable click-to-edit functionality in view mode |
| `actionUrl` | string | null | No | URL for form submission |
| `dataSource` | object | null | No | Data source for CRUD operations |
| `submitHandler` | function | null | No | Custom submit handler function |
| `typeform` | boolean | false | No | Enable TypeForm-style single-field presentation |
| `typeformAvatarUrl` | string | null | No | Avatar URL for TypeForm mode |
| `tabView` | boolean | false | No | Enable tab-based form navigation |
| `children` | array | [] | No | Form field configuration array |
| `className` | string | - | No | Additional CSS classes |
| `onSubmit` | function | - | No | Form submission callback |
| `onSuccess` | function | - | No | Success callback |
| `onFailure` | function | - | No | Failure callback |

### TypeScript Interfaces

```typescript
import { useForm } from '@tanstack/react-form';
import type { FormApi, FieldApi } from '@tanstack/form-core';

interface FormMode {
  add: 'add';
  edit: 'edit';
  view: 'view';
}

interface FormLayout {
  grid: 'grid';
  column: 'column';
}

interface FormDataSource {
  updateRecord: (id: string, data: FormData) => Promise<any>;
  insertRecord: (data: FormData) => Promise<any>;
  [key: string]: any;
}

interface TanStackFormIntegration {
  form: FormApi<any>;
  onSubmit: (values: any) => Promise<void> | void;
  defaultValues?: Record<string, any>;
  validators?: {
    onChange?: (values: any) => any;
    onChangeAsync?: (values: any) => Promise<any>;
    onSubmit?: (values: any) => any;
    onSubmitAsync?: (values: any) => Promise<any>;
  };
}

interface FormChild {
  type: string;
  options: {
    name: string;
    label?: string;
    title?: string;
    fieldType?: string;
    hidden?: boolean;
    columnSpan?: number;
    rowSpan?: number;
    [key: string]: any;
  };
  children?: FormChild[];
}

interface FormTab {
  id: string;
  title: string;
  icon?: string;
}

interface DefaultFieldOptions {
  size?: string;
  labelAlign?: string;
  labelSize?: string;
  labelWidth?: string | number;
  showFieldLabelIcon?: boolean;
  corners?: string;
  variant?: string;
  validationMessagePlacement?: 'outside' | 'inside';
  validateOnBlur?: boolean;
  readOnly?: boolean;
  clickToEdit?: boolean;
  typeform?: boolean;
  typeformAvatarUrl?: string;
  formMode?: FormMode;
}
```

### Behavior

1. **Layout Management**:
   - **Grid Layout**: Responsive CSS Grid with configurable column count
   - **Column Layout**: CSS Column layout for newspaper-style forms
   - **TypeForm Layout**: Single-field presentation with navigation controls
   - **Tab Layout**: Tabbed interface for complex forms with fieldsets

2. **Form Modes**:
   - **Add Mode**: New record creation with insert operations
   - **Edit Mode**: Existing record modification with update operations
   - **View Mode**: Read-only display with optional click-to-edit

3. **TypeForm Features**:
   - Single-field presentation with smooth scrolling
   - Navigation controls (previous/next buttons)
   - Avatar integration for personalized experience
   - Field-by-field progression with validation
   - Automatic submission on completion

4. **Data Management**:
   - TanStack Form integration for form state
   - Data provider integration for CRUD operations
   - Form validation with error handling
   - Field action system for dynamic interactions
   - Computed property evaluation

5. **Navigation and Interaction**:
   - Field-to-field navigation in TypeForm mode
   - Validation error navigation with smooth scrolling
   - Tab switching for complex forms
   - Keyboard navigation support

6. **Submission Handling**:
   - Multiple submission strategies (URL, DataSource, Custom Handler)
   - reCAPTCHA integration for spam protection
   - Before-submit validation hooks
   - Success/failure callback handling

## Component Requirements

### Technical Specifications
- **Framework**: React 18+ with TypeScript
- **Base Component**: Custom implementation (no direct shadcn/ui equivalent)
- **Integration**: Uses shadcn/ui Form components and patterns (`pnpm dlx shadcn@latest add form`)
- **Styling**: shadcn/ui patterns with Tailwind CSS v4
- **Form Library**: TanStack Form integration
- **Data Provider**: Custom data provider system
- **Validation**: Real-time validation with error display
- **Navigation**: Smooth scrolling and field targeting
- **Accessibility**: WCAG 2.1 AA compliance

### Key Features Required
1. **Multiple Layout Types**: Grid, column, TypeForm, and tab layouts
2. **Form Mode Management**: Add, edit, and view modes with appropriate behaviors
3. **TypeForm Integration**: Single-field presentation with navigation
4. **Data Provider Integration**: CRUD operations with external data sources
5. **Validation System**: Real-time validation with error navigation
6. **Action System**: Dynamic field interactions and calculations
7. **Responsive Design**: Mobile-first responsive layout system
8. **Accessibility**: Complete keyboard navigation and screen reader support

### Usage Examples

```tsx
// Basic grid form
<DocyForm
  layout="grid"
  columnCount={2}
  mode="add"
  onSubmit={handleSubmit}
>
  <DocyFieldText name="firstName" label="First Name" />
  <DocyFieldText name="lastName" label="Last Name" />
  <DocyFieldEmail name="email" label="Email" />
</DocyForm>

// TypeForm-style single-field presentation
<DocyForm
  typeform={true}
  typeformAvatarUrl="/avatar.jpg"
  mode="add"
  onSubmit={handleSubmit}
>
  <DocyFieldText name="name" typeformLabel="What's your name?" />
  <DocyFieldEmail name="email" typeformLabel="What's your email address?" />
  <DocyFieldText name="company" typeformLabel="What company do you work for?" />
</DocyForm>

// Tab-based form with fieldsets
<DocyForm
  tabView={true}
  mode="edit"
  onSubmit={handleSubmit}
>
  <DocyFieldset label="Personal Information">
    <DocyFieldText name="firstName" label="First Name" />
    <DocyFieldText name="lastName" label="Last Name" />
  </DocyFieldset>
  
  <DocyFieldset label="Contact Details">
    <DocyFieldEmail name="email" label="Email" />
    <DocyFieldText name="phone" label="Phone" />
  </DocyFieldset>
  
  <DocyFieldset label="Preferences">
    <DocyFieldCheckbox name="newsletter" label="Subscribe to newsletter" />
    <DocyFieldSelect name="theme" label="Preferred theme" />
  </DocyFieldset>
</DocyForm>

// Data source integration
<DocyForm
  mode="edit"
  dataSource={{
    updateRecord: async (id, data) => {
      const response = await fetch(`/api/users/${id}`, {
        method: 'PUT',
        body: data
      });
      return response.json();
    },
    insertRecord: async (data) => {
      const response = await fetch('/api/users', {
        method: 'POST',
        body: data
      });
      return response.json();
    }
  }}
  onSuccess={(data) => console.log('Success:', data)}
  onFailure={(error) => console.error('Error:', error)}
>
  <DocyFieldText name="username" label="Username" />
  <DocyFieldEmail name="email" label="Email" />
</DocyForm>

// Custom field options
<DocyForm
  layout="grid"
  columnCount={3}
  fieldSize="lg"
  fieldLabelAlign="top"
  fieldVariant="outline"
  showFieldLabelIcon={true}
  validationMessagePlacement="inside"
  validateOnBlur={true}
>
  <DocyFieldText name="title" label="Title" />
  <DocyFieldText name="description" label="Description" />
  <DocyFieldSelect name="category" label="Category" />
</DocyForm>

// View mode with click-to-edit
<DocyForm
  mode="view"
  clickToEdit={true}
  layout="grid"
  columnCount={2}
>
  <DocyFieldText name="firstName" label="First Name" />
  <DocyFieldText name="lastName" label="Last Name" />
  <DocyFieldEmail name="email" label="Email" />
</DocyForm>

// Wizard-style form (using TypeForm navigation)
<DocyForm
  typeform={true}
  mode="add"
  onSubmit={handleWizardSubmit}
>
  <DocyFieldText 
    name="step1" 
    typeformLabel="Welcome! Let's start with your name"
    required={true}
  />
  <DocyFieldSelect 
    name="step2" 
    typeformLabel="What's your role?"
    options={roleOptions}
    required={true}
  />
  <DocyFieldTextarea 
    name="step3" 
    typeformLabel="Tell us about your experience"
    rows={4}
  />
</DocyForm>

// Complex form with custom submit handler
<DocyForm
  layout="grid"
  columnCount={2}
  submitHandler={async () => {
    // Custom validation
    const isValid = await validateBusinessLogic();
    if (!isValid) {
      throw new Error('Business validation failed');
    }
    
    // Custom submission logic
    await sendAnalytics();
    await updateCache();
  }}
  onSubmit={handleSubmit}
>
  <DocyFieldText name="projectName" label="Project Name" />
  <DocyFieldSelect name="priority" label="Priority" />
  <DocyFieldDate name="deadline" label="Deadline" />
</DocyForm>
```

### TanStack Form Integration

```tsx
import { useForm } from '@tanstack/react-form';
import type { FieldApi } from '@tanstack/form-core';

// Basic TanStack Form integration
function MyFormComponent() {
  const form = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
    },
    onSubmit: async ({ value }) => {
      // Handle form submission
      console.log('Form submitted:', value);
    },
  });

  return (
    <DocyForm
      form={form}
      layout="grid"
      columnCount={2}
      mode="add"
    >
      <form.Field
        name="firstName"
        validators={{
          onChange: ({ value }) => 
            !value ? 'First name is required' : undefined,
        }}
        children={(field) => (
          <DocyFieldText
            name={field.name}
            label="First Name"
            value={field.state.value}
            onChange={(e) => field.handleChange(e.target.value)}
            error={field.state.meta.errors.join(', ')}
          />
        )}
      />
      
      <form.Field
        name="lastName"
        validators={{
          onChange: ({ value }) => 
            !value ? 'Last name is required' : undefined,
        }}
        children={(field) => (
          <DocyFieldText
            name={field.name}
            label="Last Name"
            value={field.state.value}
            onChange={(e) => field.handleChange(e.target.value)}
            error={field.state.meta.errors.join(', ')}
          />
        )}
      />
      
      <form.Field
        name="email"
        validators={{
          onChange: ({ value }) => {
            if (!value) return 'Email is required';
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
              return 'Invalid email format';
            }
            return undefined;
          },
        }}
        children={(field) => (
          <DocyFieldEmail
            name={field.name}
            label="Email"
            value={field.state.value}
            onChange={(e) => field.handleChange(e.target.value)}
            error={field.state.meta.errors.join(', ')}
          />
        )}
      />
    </DocyForm>
  );
}

// Advanced TanStack Form with async validation
function AdvancedFormComponent() {
  const form = useForm({
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validators: {
      onSubmit: ({ value }) => {
        if (value.password !== value.confirmPassword) {
          return 'Passwords do not match';
        }
        return undefined;
      },
    },
    onSubmit: async ({ value }) => {
      // Handle form submission with loading state
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Form submitted:', value);
    },
  });

  return (
    <DocyForm
      form={form}
      layout="grid"
      columnCount={1}
      mode="add"
    >
      <form.Field
        name="username"
        validators={{
          onChangeAsync: async ({ value }) => {
            if (!value) return 'Username is required';
            if (value.length < 3) return 'Username must be at least 3 characters';
            
            // Simulate async validation
            await new Promise(resolve => setTimeout(resolve, 300));
            const isAvailable = await checkUsernameAvailability(value);
            return isAvailable ? undefined : 'Username is already taken';
          },
        }}
        children={(field) => (
          <DocyFieldText
            name={field.name}
            label="Username"
            value={field.state.value}
            onChange={(e) => field.handleChange(e.target.value)}
            error={field.state.meta.errors.join(', ')}
            loading={field.state.meta.isValidating}
          />
        )}
      />
      
      <form.Field
        name="password"
        validators={{
          onChange: ({ value }) => {
            if (!value) return 'Password is required';
            if (value.length < 8) return 'Password must be at least 8 characters';
            return undefined;
          },
        }}
        children={(field) => (
          <DocyFieldPassword
            name={field.name}
            label="Password"
            value={field.state.value}
            onChange={(e) => field.handleChange(e.target.value)}
            error={field.state.meta.errors.join(', ')}
          />
        )}
      />
      
      <form.Field
        name="confirmPassword"
        validators={{
          onChange: ({ value, fieldApi }) => {
            if (!value) return 'Please confirm your password';
            const password = fieldApi.form.getFieldValue('password');
            return value !== password ? 'Passwords do not match' : undefined;
          },
        }}
        children={(field) => (
          <DocyFieldPassword
            name={field.name}
            label="Confirm Password"
            value={field.state.value}
            onChange={(e) => field.handleChange(e.target.value)}
            error={field.state.meta.errors.join(', ')}
          />
        )}
      />
    </DocyForm>
  );
}

// TypeForm integration with TanStack Form
function TypeFormComponent() {
  const form = useForm({
    defaultValues: {
      name: '',
      email: '',
      role: '',
      experience: '',
    },
    onSubmit: async ({ value }) => {
      console.log('TypeForm submitted:', value);
    },
  });

  return (
    <DocyForm
      form={form}
      typeform={true}
      typeformAvatarUrl="/avatar.jpg"
      mode="add"
    >
      <form.Field
        name="name"
        validators={{
          onChange: ({ value }) => 
            !value ? 'Name is required' : undefined,
        }}
        children={(field) => (
          <DocyFieldText
            name={field.name}
            typeformLabel="What's your name?"
            value={field.state.value}
            onChange={(e) => field.handleChange(e.target.value)}
            error={field.state.meta.errors.join(', ')}
          />
        )}
      />
      
      <form.Field
        name="email"
        validators={{
          onChange: ({ value }) => {
            if (!value) return 'Email is required';
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
              return 'Invalid email format';
            }
            return undefined;
          },
        }}
        children={(field) => (
          <DocyFieldEmail
            name={field.name}
            typeformLabel="What's your email address?"
            value={field.state.value}
            onChange={(e) => field.handleChange(e.target.value)}
            error={field.state.meta.errors.join(', ')}
          />
        )}
      />
      
      <form.Field
        name="role"
        validators={{
          onChange: ({ value }) => 
            !value ? 'Please select a role' : undefined,
        }}
        children={(field) => (
          <DocyFieldSelect
            name={field.name}
            typeformLabel="What's your role?"
            value={field.state.value}
            onChange={(value) => field.handleChange(value)}
            error={field.state.meta.errors.join(', ')}
            options={[
              { value: 'developer', label: 'Developer' },
              { value: 'designer', label: 'Designer' },
              { value: 'manager', label: 'Manager' },
            ]}
          />
        )}
      />
    </DocyForm>
  );
}
```

### Form Context and Providers

```tsx
import { createContext, useContext } from 'react';
import type { FormApi } from '@tanstack/form-core';

// The form provides context to all child fields
interface FormContextValue {
  formId: string;
  mode: FormMode;
  defaultFieldOptions: DefaultFieldOptions;
  tanstackForm: FormApi<any>;
  handleActions: (actions: FieldAction[], data: any) => void;
  setFieldValue: (field: string, value: any) => void;
  setFieldOption: (field: string, option: string, value: any) => void;
  showValidationErrors: () => void;
  scrollToField: (fieldId: string) => void;
  gotoNextField: () => void;
  gotoPreviousField: () => void;
}

// Usage in child components
const FormContext = createContext<FormContextValue | null>(null);

export function useFormContext() {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormContext must be used within a DocyForm');
  }
  return context;
}

// TanStack Form specific helpers
export function useFormField<T = any>(name: string) {
  const { tanstackForm } = useFormContext();
  return tanstackForm.getFieldInfo(name);
}

export function useFormState() {
  const { tanstackForm } = useFormContext();
  return tanstackForm.state;
}
```

### TypeForm Integration

```tsx
// TypeForm-specific features
interface TypeFormNavigation {
  currentFieldIndex: number;
  totalFields: number;
  canGoNext: boolean;
  canGoPrevious: boolean;
  gotoNext: () => void;
  gotoPrevious: () => void;
  gotoFirst: () => void;
  percentComplete: number;
}

// TypeForm navigation controls
<DocyForm typeform={true}>
  {/* Fields use typeformLabel instead of label */}
  <DocyFieldText 
    name="name" 
    typeformLabel="What's your name?"
    placeholder="Enter your full name"
  />
  
  {/* Navigation controls are automatically added */}
</DocyForm>
```

### Integration Requirements
- **DocyFieldBase**: All form fields must use DocyFieldBase as wrapper
- **DocyFieldset**: For grouping related fields
- **TanStack Form**: For form state management and validation
- **Data Provider**: For CRUD operations and data management
- **JSONata**: For computed properties and dynamic content

### Dependencies Required
- `@tanstack/react-form`: Form state management and validation
- `@tanstack/form-core`: Core form utilities and validation
- `jsonata`: For computed formula evaluation
- `framer-motion`: For TypeForm animations
- `uuid`: For unique form and field IDs
- `class-variance-authority`: Variant management

### Testing Requirements
1. **Unit Tests**: Layout rendering, mode switching, TypeForm navigation
2. **Integration Tests**: Form submission, data source integration, validation flow
3. **Visual Tests**: All layout types, responsive behavior, TypeForm presentation
4. **Accessibility Tests**: Keyboard navigation, screen reader support, ARIA attributes
5. **Performance Tests**: Large form rendering, field interaction performance
6. **TypeForm Tests**: Navigation flow, field progression, submission handling

## Development Priority
**High** - Core form container that manages all form functionality

## Notes
- **TanStack Form Integration**: Uses TanStack Form for superior performance and developer experience
  - Type-safe form handling with excellent TypeScript support
  - Powerful validation system with async validation support
  - Optimized re-renders and performance
  - Flexible field-level and form-level validation
  - Built-in loading states and error handling
- Built with modern shadcn/ui patterns for consistency with design system
- Supports multiple layout paradigms for different use cases
- TypeForm mode provides engaging single-field user experience
- Comprehensive data management with flexible submission strategies
- Full accessibility compliance for inclusive user experience
- Designed for high performance with large forms and complex interactions
- Extensible architecture allows for additional layout types and features