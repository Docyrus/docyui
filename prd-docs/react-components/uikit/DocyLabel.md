# DocyLabel Component

## Overview
DocyLabel is a form label component built on shadcn/ui patterns that provides accessible labeling for form inputs. It supports various styling options, required indicators, and proper association with form controls. It serves as the primary form labeling component throughout the Docyrus React application.

## Component Specification

### Props
| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-----------|
| `children` | ReactNode | - | No | Label content |
| `htmlFor` | string | - | No | Associated input element ID |
| `required` | boolean | false | No | Show required indicator |
| `optional` | boolean | false | No | Show optional indicator |
| `size` | string | 'default' | No | Label size: 'sm', 'default', 'lg' |
| `weight` | string | 'medium' | No | Font weight: 'normal', 'medium', 'semibold', 'bold' |
| `color` | string | 'default' | No | Label color: 'default', 'muted', 'accent', 'destructive' |
| `disabled` | boolean | false | No | Disabled state styling |
| `className` | string | - | No | Additional CSS classes |
| `requiredIndicator` | ReactNode | '*' | No | Custom required indicator |
| `optionalIndicator` | ReactNode | '(optional)' | No | Custom optional indicator |

### Size System
```typescript
const labelVariants = cva({
  variants: {
    size: {
      sm: "text-sm",
      default: "text-sm",
      lg: "text-base"
    },
    weight: {
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold"
    },
    color: {
      default: "text-foreground",
      muted: "text-muted-foreground",
      accent: "text-accent-foreground",
      destructive: "text-destructive"
    }
  }
})
```

### Features
- **Accessibility**: Proper label association with form controls
- **Required Indicators**: Visual indicators for required fields
- **Optional Indicators**: Visual indicators for optional fields
- **Styling Options**: Multiple size, weight, and color variants
- **Disabled State**: Appropriate styling for disabled inputs
- **Custom Indicators**: Flexible indicator customization

### States
- **Default**: Standard label appearance
- **Required**: With required indicator
- **Optional**: With optional indicator
- **Disabled**: Muted appearance for disabled inputs
- **Error**: Error state styling (inherited from associated input)

## Component Requirements

### Technical Specifications
- **Framework**: React with TypeScript
- **Base Component**: shadcn/ui Label component (`pnpm dlx shadcn@latest add label`)
- **Extensions**: Required/optional indicators, size variants, color options
- **Styling**: shadcn/ui patterns with class-variance-authority
- **Accessibility**: Full ARIA support, proper label association
- **Form Integration**: Seamless integration with form libraries
- **Performance**: Optimized rendering and minimal re-renders

### Key Features Required
1. **Proper Association**: Correct htmlFor attribute handling
2. **Required Indicators**: Visual markers for required fields
3. **Optional Indicators**: Visual markers for optional fields
4. **Size Variants**: Multiple sizes for different contexts
5. **Weight Variants**: Different font weights for emphasis
6. **Color Variants**: Semantic color options
7. **Disabled State**: Appropriate styling for disabled inputs
8. **Custom Indicators**: Flexible indicator customization

### Advanced Features
- **Tooltip Integration**: Help text on hover
- **Icon Support**: Icons within labels
- **Responsive Typography**: Adaptive sizing
- **Theme Integration**: Consistent theming

### Usage Examples
```tsx
// Basic label
<DocyLabel htmlFor="email">Email Address</DocyLabel>
<input id="email" type="email" />

// Required field
<DocyLabel htmlFor="password" required>
  Password
</DocyLabel>
<input id="password" type="password" />

// Optional field
<DocyLabel htmlFor="phone" optional>
  Phone Number
</DocyLabel>
<input id="phone" type="tel" />

// Different sizes
<DocyLabel size="sm" htmlFor="small">Small Label</DocyLabel>
<DocyLabel size="default" htmlFor="default">Default Label</DocyLabel>
<DocyLabel size="lg" htmlFor="large">Large Label</DocyLabel>

// Different weights
<DocyLabel weight="normal" htmlFor="normal">Normal Weight</DocyLabel>
<DocyLabel weight="medium" htmlFor="medium">Medium Weight</DocyLabel>
<DocyLabel weight="semibold" htmlFor="semibold">Semibold Weight</DocyLabel>
<DocyLabel weight="bold" htmlFor="bold">Bold Weight</DocyLabel>

// Different colors
<DocyLabel color="default" htmlFor="default">Default Color</DocyLabel>
<DocyLabel color="muted" htmlFor="muted">Muted Color</DocyLabel>
<DocyLabel color="accent" htmlFor="accent">Accent Color</DocyLabel>
<DocyLabel color="destructive" htmlFor="error">Error Color</DocyLabel>

// Disabled state
<DocyLabel htmlFor="disabled" disabled>
  Disabled Field
</DocyLabel>
<input id="disabled" type="text" disabled />

// Custom indicators
<DocyLabel
  htmlFor="custom"
  required
  requiredIndicator={<span className="text-red-500 ml-1">*</span>}
>
  Custom Required
</DocyLabel>

<DocyLabel
  htmlFor="custom-optional"
  optional
  optionalIndicator={<span className="text-gray-400 ml-1">(optional)</span>}
>
  Custom Optional
</DocyLabel>

// Form integration
<div className="space-y-2">
  <DocyLabel htmlFor="username" required>
    Username
  </DocyLabel>
  <input
    id="username"
    type="text"
    className="w-full p-2 border rounded"
    required
  />
</div>

// With tooltip
<DocyLabel htmlFor="complex" required>
  Complex Field
  <DocyTooltip content="This field requires special formatting">
    <DocyIcon name="help-circle" className="ml-1 cursor-help" />
  </DocyTooltip>
</DocyLabel>

// Group labels
<fieldset>
  <legend>
    <DocyLabel size="lg" weight="semibold">
      Contact Information
    </DocyLabel>
  </legend>
  <div className="space-y-4">
    <div>
      <DocyLabel htmlFor="email" required>Email</DocyLabel>
      <input id="email" type="email" />
    </div>
    <div>
      <DocyLabel htmlFor="phone" optional>Phone</DocyLabel>
      <input id="phone" type="tel" />
    </div>
  </div>
</fieldset>

// Responsive label
<DocyLabel
  htmlFor="responsive"
  className="text-sm md:text-base"
  weight="medium"
>
  Responsive Label
</DocyLabel>
```

### Integration Requirements
- **DocyIcon**: Icons within labels
- **DocyTooltip**: Help text integration
- **Form Libraries**: React Hook Form, Formik integration
- **Theme System**: Consistent color and typography
- **Accessibility**: ARIA label utilities

### Form Library Integration
```tsx
// React Hook Form integration
import { useForm } from 'react-hook-form';

function MyForm() {
  const { register, formState: { errors } } = useForm();

  return (
    <form>
      <div className="space-y-2">
        <DocyLabel
          htmlFor="email"
          required
          color={errors.email ? 'destructive' : 'default'}
        >
          Email Address
        </DocyLabel>
        <input
          id="email"
          {...register('email', { required: 'Email is required' })}
          type="email"
          className={`w-full p-2 border rounded ${
            errors.email ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>
    </form>
  );
}
```

### Accessibility Requirements
- **Label Association**: Proper htmlFor attribute usage
- **Screen Reader Support**: Clear label text
- **Focus Management**: Proper focus indicators
- **Color Contrast**: Sufficient contrast for all text
- **Required Indicators**: Accessible required field marking

### Testing Requirements
1. **Unit Tests**: Label association, indicator rendering, styling variants
2. **Integration Tests**: Form integration, accessibility attributes
3. **Accessibility Tests**: Screen reader compatibility, label association
4. **Visual Tests**: All sizes, weights, and colors across themes
5. **Form Tests**: Integration with various form libraries
6. **Responsive Tests**: Typography scaling and layout

## Development Priority
**High** - Essential component for form accessibility and usability

## Notes
- Built with modern shadcn/ui patterns for consistency
- Full accessibility compliance with WCAG guidelines
- Seamless integration with form libraries
- TypeScript support with comprehensive type safety
- Flexible styling options for various design needs
- Optimized for performance with minimal re-renders
