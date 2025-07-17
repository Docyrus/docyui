# DocyCheckbox Component

## Overview
DocyCheckbox is a toggle checkbox component built on shadcn/ui patterns that provides boolean input functionality with support for indeterminate states, labels, descriptions, and validation. It supports various sizes and states for form inputs. It serves as the primary boolean input component throughout the Docyrus React application.

## Component Specification

### Props
| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-----------|
| `checked` | boolean | false | No | Checkbox checked state |
| `defaultChecked` | boolean | false | No | Default checked state |
| `onCheckedChange` | function | - | No | Callback when checked state changes |
| `disabled` | boolean | false | No | Disable checkbox interaction |
| `indeterminate` | boolean | false | No | Show indeterminate state |
| `required` | boolean | false | No | Mark checkbox as required |
| `id` | string | - | No | Checkbox element ID |
| `name` | string | - | No | Form field name |
| `value` | string | - | No | Checkbox value |
| `label` | string | - | No | Checkbox label text |
| `description` | string | - | No | Helper text description |
| `error` | string | - | No | Error message |
| `size` | string | 'default' | No | Checkbox size: 'sm', 'default', 'lg' |
| `className` | string | - | No | Additional CSS classes |
| `labelClassName` | string | - | No | Label CSS classes |

### Size System
```typescript
const checkboxVariants = cva({
  variants: {
    size: {
      sm: "h-4 w-4",
      default: "h-4 w-4",
      lg: "h-5 w-5"
    }
  }
})
```

### States
- **Unchecked**: Default empty state
- **Checked**: Selected state with checkmark
- **Indeterminate**: Partial selection state
- **Disabled**: Non-interactive state
- **Error**: Invalid state with error styling

### Accessibility Features
- **ARIA Attributes**: Proper aria-checked, aria-describedby
- **Keyboard Navigation**: Space key to toggle
- **Screen Reader Support**: Meaningful labels and descriptions
- **Focus Management**: Clear focus indicators
- **Form Integration**: Proper form submission handling

## Component Requirements

### Technical Specifications
- **Framework**: React with TypeScript
- **Base Component**: shadcn/ui Checkbox component (`pnpm dlx shadcn@latest add checkbox`)
- **Extensions**: Label, description, error states, and size variants
- **Styling**: shadcn/ui patterns with class-variance-authority
- **Accessibility**: Full ARIA support, keyboard navigation
- **Form Integration**: React Hook Form compatibility
- **Performance**: Optimized re-renders, proper event handling

### Key Features Required
1. **Three States**: Checked, unchecked, and indeterminate support
2. **Size Variants**: Multiple sizes for different contexts
3. **Label Integration**: Associated labels with proper accessibility
4. **Error Handling**: Validation states and error messages
5. **Description Support**: Helper text for user guidance
6. **Keyboard Navigation**: Full keyboard accessibility
7. **Form Integration**: Seamless form library integration
8. **Disabled State**: Non-interactive state with visual feedback

### Advanced Features
- **Group Management**: Checkbox groups with select all/none
- **Custom Icons**: Custom check and indeterminate icons
- **Animation**: Smooth state transitions
- **Validation**: Built-in validation support

### Usage Examples
```tsx
// Basic checkbox
<DocyCheckbox
  checked={isChecked}
  onCheckedChange={setIsChecked}
  label="Accept terms and conditions"
/>

// Checkbox with description
<DocyCheckbox
  checked={isChecked}
  onCheckedChange={setIsChecked}
  label="Enable notifications"
  description="Receive email notifications about updates"
/>

// Indeterminate checkbox
<DocyCheckbox
  indeterminate={true}
  label="Select all items"
  onCheckedChange={handleSelectAll}
/>

// Disabled checkbox
<DocyCheckbox
  checked={true}
  disabled={true}
  label="This option is disabled"
/>

// Checkbox with error
<DocyCheckbox
  checked={false}
  onCheckedChange={setIsChecked}
  label="Required field"
  error="This field is required"
  required
/>

// Different sizes
<DocyCheckbox size="sm" label="Small checkbox" />
<DocyCheckbox size="default" label="Default checkbox" />
<DocyCheckbox size="lg" label="Large checkbox" />

// Form integration
<form onSubmit={handleSubmit}>
  <DocyCheckbox
    name="newsletter"
    value="subscribe"
    label="Subscribe to newsletter"
    onCheckedChange={setNewsletterSubscribe}
  />
  <DocyCheckbox
    name="terms"
    value="accepted"
    label="I accept the terms and conditions"
    required
    error={errors.terms}
    onCheckedChange={setTermsAccepted}
  />
</form>

// Checkbox group
<div className="space-y-2">
  <DocyCheckbox
    indeterminate={isIndeterminate}
    checked={allChecked}
    onCheckedChange={handleSelectAll}
    label="Select all"
  />
  <div className="ml-4 space-y-1">
    {items.map((item) => (
      <DocyCheckbox
        key={item.id}
        checked={selectedItems.includes(item.id)}
        onCheckedChange={(checked) => handleItemCheck(item.id, checked)}
        label={item.name}
      />
    ))}
  </div>
</div>

// Custom styled checkbox
<DocyCheckbox
  checked={isChecked}
  onCheckedChange={setIsChecked}
  label="Custom styled checkbox"
  className="data-[state=checked]:bg-blue-500"
  labelClassName="text-blue-900 font-medium"
/>
```

### Integration Requirements
- **DocyLabel**: Label component for proper labeling
- **DocyIcon**: Custom check and indeterminate icons
- **Form Libraries**: React Hook Form, Formik integration
- **Validation**: Form validation library support
- **Theme System**: Color schemes and theming

### Form Integration
```typescript
// React Hook Form integration
import { useForm, Controller } from 'react-hook-form';

function MyForm() {
  const { control, handleSubmit } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="acceptTerms"
        control={control}
        rules={{ required: 'You must accept the terms' }}
        render={({ field, fieldState }) => (
          <DocyCheckbox
            checked={field.value}
            onCheckedChange={field.onChange}
            label="Accept terms and conditions"
            error={fieldState.error?.message}
            required
          />
        )}
      />
    </form>
  );
}
```

### Testing Requirements
1. **Unit Tests**: State changes, event handling, validation
2. **Integration Tests**: Form integration, label association
3. **Accessibility Tests**: ARIA attributes, keyboard navigation
4. **Visual Tests**: All states and sizes across themes
5. **Form Tests**: Form submission, validation, error handling
6. **Interaction Tests**: Click handling, keyboard interaction

## Development Priority
**High** - Essential form input component used throughout the application

## Notes
- Built with modern shadcn/ui patterns for consistency
- Full accessibility compliance with WCAG guidelines
- Seamless integration with popular form libraries
- TypeScript support with comprehensive type safety
- Optimized for performance with proper event handling
- Supports complex checkbox group scenarios
