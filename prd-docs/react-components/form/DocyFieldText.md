# DocyFieldText Component

## Overview
DocyFieldText is the foundational text input component that extends DocyFieldBase to provide text-specific functionality. It handles various text input types including regular text, numbers, passwords, emails, URLs, and more. The component supports advanced features like input masking, prefix/suffix selectors, decimal formatting, and icon integration.

This component serves as the base implementation for all text-based form fields and demonstrates how field components should integrate with DocyFieldBase as their wrapper.

## Component Specification

### Props
DocyFieldText inherits ALL props from DocyFieldBase and adds the following text-specific properties:

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `modelValue` | string \| number | - | No | Current field value |
| `inputType` | 'text' \| 'number' \| 'password' \| 'email' \| 'url' \| 'search' \| 'tel' | 'text' | No | HTML input type |
| `leadingIcon` | string \| object \| boolean | - | No | Icon to display on the left side of input |
| `trailingIcon` | string \| object \| boolean | - | No | Icon to display on the right side of input |
| `trailingIconClickEvent` | boolean | false | No | Whether trailing icon is clickable |
| `autocomplete` | string \| boolean | 'off' | No | HTML autocomplete attribute |
| `alignment` | 'left' \| 'center' \| 'right' | 'left' | No | Text alignment within input |
| `inputAttrs` | object | {} | No | Additional HTML attributes for input element |
| `prefixSelectorOptions` | PrefixSelectorConfig | - | No | Configuration for prefix dropdown selector |
| `suffixSelectorOptions` | SuffixSelectorConfig | - | No | Configuration for suffix dropdown selector |
| `mask` | string \| object | - | No | Input mask configuration |
| `maskOptions` | object | {} | No | Additional masking options |
| `decimalConfig` | DecimalConfig | - | No | Decimal number formatting configuration |
| `restrictedValues` | string[] | [] | No | Values that are not allowed |
| `fixedLabel` | string | - | No | Fixed label for display-only mode |
| `onLabelClick` | function | - | No | Callback when fixed label is clicked |
| `maxLength` | number | - | No | Maximum character length |
| `minLength` | number | - | No | Minimum character length |
| `pattern` | string | - | No | HTML pattern attribute for validation |

**Note**: DocyFieldText inherits all DocyFieldBase props including validation, layout, dynamic computed properties, AI integration, and more. See [DocyFieldBase documentation](./DocyFieldBase.md) for the complete list.

### TypeScript Interfaces

```typescript
interface PrefixSelectorConfig {
  options: SelectorOption[];
  prefixTemplate?: string; // Template for display: 'icon', 'label', 'value', or combinations
  defaultValue?: string;
  placeholder?: string;
}

interface SuffixSelectorConfig {
  options: SelectorOption[];
  defaultValue?: string;
  placeholder?: string;
}

interface SelectorOption {
  value: string;
  label: string;
  icon?: string;
  description?: string;
}

interface DecimalConfig {
  separator: '.' | ','; // Decimal separator
  thousandsSeparator: ',' | '.' | ' ' | ''; // Thousands separator
  precision: number; // Number of decimal places
  allowNegative: boolean; // Allow negative numbers
  min?: number; // Minimum value
  max?: number; // Maximum value
}

interface MaskConfig {
  mask: string | RegExp | Array<string | RegExp>;
  prepare?: (str: string) => string;
  validate?: (value: string) => boolean;
  commit?: (value: string) => string;
  overwrite?: boolean;
  eager?: boolean;
}
```

### Behavior

1. **Input Handling**:
   - Real-time value updates with proper React Hook Form integration
   - Support for various HTML input types with appropriate validation
   - Character limits with visual feedback

2. **Masking and Formatting**:
   - Input masking for phone numbers, dates, credit cards, etc.
   - Decimal number formatting with configurable separators
   - Automatic formatting on blur and real-time validation

3. **Icon Integration**:
   - Leading and trailing icons with flexible configuration
   - Icon click events for interactive functionality
   - Proper spacing and alignment with text content

4. **Prefix/Suffix Selectors**:
   - Dropdown selectors for phone country codes, currency symbols, etc.
   - Customizable display templates (icon, label, value combinations)
   - Integration with main input value

5. **Advanced Features**:
   - Click-to-edit mode with seamless transitions
   - Fixed label mode for display-only scenarios
   - Restricted values validation
   - Pattern-based validation

## Component Requirements

### Technical Specifications
- **Framework**: React 18+ with TypeScript
- **Base Component**: shadcn/ui Input component (`pnpm dlx shadcn@latest add input`)
- **Extensions**: Docy-specific features including input masking, prefix/suffix selectors, decimal formatting, and advanced validation built on top of shadcn base
- **Wrapper**: Extends DocyFieldBase for consistent field structure
- **Styling**: shadcn/ui Input component with Tailwind CSS v4
- **Masking**: Integration with input masking libraries (imask, react-input-mask)
- **Validation**: React Hook Form integration with custom validators
- **Accessibility**: WCAG 2.1 AA compliance

### Key Features Required
1. **Text Input Types**: Support for all HTML5 input types
2. **Input Masking**: Flexible masking system for various formats
3. **Decimal Formatting**: Configurable number formatting
4. **Icon Integration**: Leading and trailing icon support
5. **Selector Integration**: Prefix and suffix dropdown selectors
6. **Validation**: Real-time validation with custom rules
7. **Accessibility**: Complete keyboard navigation and screen reader support

### Usage Examples

```tsx
// Basic text input
<DocyFieldText
  name="firstName"
  label="First Name"
  placeholder="Enter your first name"
  required={true}
/>

// Password input with visibility toggle
<DocyFieldText
  name="password"
  label="Password"
  inputType="password"
  trailingIcon="eye"
  trailingIconClickEvent={true}
  onTrailingIconClick={togglePasswordVisibility}
/>

// Phone number with prefix selector
<DocyFieldText
  name="phone"
  label="Phone Number"
  inputType="tel"
  prefixSelectorOptions={{
    options: [
      { value: '+1', label: 'US', icon: 'flag-us' },
      { value: '+44', label: 'UK', icon: 'flag-gb' },
      { value: '+49', label: 'DE', icon: 'flag-de' }
    ],
    prefixTemplate: 'icon value',
    defaultValue: '+1'
  }}
  mask="+1 (000) 000-0000"
/>

// Email input with validation
<DocyFieldText
  name="email"
  label="Email Address"
  inputType="email"
  leadingIcon="envelope"
  validations={[
    { type: 'email', message: 'Please enter a valid email address' }
  ]}
  autocomplete="email"
/>

// Currency input with decimal formatting
<DocyFieldText
  name="price"
  label="Price"
  inputType="number"
  leadingIcon="dollar-sign"
  decimalConfig={{
    separator: '.',
    thousandsSeparator: ',',
    precision: 2,
    allowNegative: false,
    min: 0
  }}
  alignment="right"
/>

// Search input with trailing action
<DocyFieldText
  name="search"
  label="Search"
  inputType="search"
  placeholder="Search products..."
  trailingIcon="search"
  trailingIconClickEvent={true}
  onTrailingIconClick={performSearch}
/>

// URL input with fixed label
<DocyFieldText
  name="website"
  label="Website"
  inputType="url"
  fixedLabel="Visit Website"
  onLabelClick={(url) => window.open(url, '_blank')}
  readOnly={true}
/>

// Complete form integration with React Hook Form
<form onSubmit={handleSubmit(onSubmit)}>
  <DocyFieldText
    name="username"
    label="Username"
    validations={[
      { type: 'required', message: 'Username is required' },
      { type: 'minLength', value: 3, message: 'Username must be at least 3 characters' },
      { type: 'pattern', value: /^[a-zA-Z0-9_]+$/, message: 'Username can only contain letters, numbers, and underscores' }
    ]}
    restrictedValues={['admin', 'root', 'system']}
    maxLength={20}
    autocomplete="username"
  />
  
  <DocyFieldText
    name="displayName"
    label="Display Name"
    computedLabel="'Display Name (' + username + ')'"
    computedRequired={{ field: 'accountType', operator: 'equals', value: 'business' }}
    maxLength={50}
  />
</form>

// Advanced masking with custom validation
<DocyFieldText
  name="creditCard"
  label="Credit Card Number"
  mask="0000 0000 0000 0000"
  maskOptions={{
    prepare: (str) => str.replace(/\D/g, ''),
    validate: (value) => luhnCheck(value)
  }}
  validations={[
    { type: 'custom', validator: validateCreditCard, message: 'Please enter a valid credit card number' }
  ]}
/>
```

### Integration Requirements
- **DocyFieldBase**: Base wrapper component (required)
- **DocyIcon**: For leading and trailing icons
- **DocyMenu**: For prefix/suffix selector dropdowns
- **Input masking library**: For format validation and input masks
- **Decimal formatting library**: For number formatting

### Dependencies Required
- `react-hook-form`: Form state management (inherited from DocyFieldBase)
- `imask` or `react-input-mask`: Input masking functionality
- `@radix-ui/react-select`: For prefix/suffix selectors
- `class-variance-authority`: Variant management
- All DocyFieldBase dependencies

### Testing Requirements
1. **Unit Tests**: Input types, masking, validation, icon interactions
2. **Integration Tests**: React Hook Form integration, selector functionality
3. **Visual Tests**: All input types, icon placements, responsive behavior
4. **Accessibility Tests**: Keyboard navigation, screen reader support, ARIA attributes
5. **Performance Tests**: Large form rendering, real-time validation
6. **Mask Tests**: Various masking scenarios, decimal formatting accuracy

## Development Priority
**High** - Foundational text input component that other text-based fields will extend

## Notes
- Built as a comprehensive example of how field components should integrate with DocyFieldBase
- Supports all HTML5 input types with appropriate validation and formatting
- Flexible masking system accommodates various international formats
- Icon integration provides enhanced user experience
- Prefix/suffix selectors enable complex input scenarios
- Serves as the foundation for specialized text fields like DocyFieldEmail, DocyFieldPhone, etc.
- Complete accessibility compliance ensures inclusive user experience
- Performance optimized for large forms with many text inputs