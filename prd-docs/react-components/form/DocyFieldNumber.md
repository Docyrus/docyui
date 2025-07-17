# DocyFieldNumber Component

## Overview
DocyFieldNumber is a specialized numeric input component that extends DocyFieldBase to provide comprehensive number input functionality. Built on top of the shadcn/ui Input component, it offers advanced number formatting, validation, step controls, currency support, and precision handling. The component is designed to handle various numeric input scenarios including integers, decimals, currency values, and formatted numbers with customizable separators.

This component provides a robust foundation for all number-based form fields, ensuring consistent behavior across different numeric input requirements while maintaining full accessibility and integration with the Docyrus form system.

## Component Specification

### Props
DocyFieldNumber inherits ALL props from DocyFieldBase and adds the following number-specific properties:

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `min` | number | - | No | Minimum allowed value |
| `max` | number | - | No | Maximum allowed value |
| `step` | number | 1 | No | Step increment for controls and validation |
| `precision` | number | - | No | Number of decimal places to display |
| `showControls` | boolean | false | No | Show increment/decrement buttons |
| `format` | string | - | No | Number format pattern (e.g., '#,##0.00') |
| `prefix` | string | - | No | Prefix text or symbol (e.g., '$', '€') |
| `suffix` | string | - | No | Suffix text or symbol (e.g., '%', 'USD') |
| `thousandSeparator` | string | ',' | No | Thousands separator character |
| `decimalSeparator` | string | '.' | No | Decimal separator character |
| `allowNegative` | boolean | true | No | Allow negative numbers |
| `allowDecimals` | boolean | true | No | Allow decimal values |
| `formatter` | function | - | No | Custom number formatter function |
| `parser` | function | - | No | Custom number parser function |
| `controlsPosition` | 'right' \| 'left' \| 'both' | 'right' | No | Position of step controls |
| `controlsSize` | 'sm' \| 'md' \| 'lg' | 'sm' | No | Size of step controls |
| `emptyValue` | number \| null | null | No | Value to use when input is empty |
| `selectAllOnFocus` | boolean | false | No | Select all text when field receives focus |
| `alignment` | 'left' \| 'center' \| 'right' | 'left' | No | Text alignment within input |
| `leadingIcon` | string | - | No | Icon to display on the left side |
| `trailingIcon` | string | - | No | Icon to display on the right side |
| `inputMode` | 'numeric' \| 'decimal' | 'decimal' | No | Mobile keyboard input mode |

**Note**: DocyFieldNumber inherits all DocyFieldBase props including validation, layout, dynamic computed properties, AI integration, and more. See [DocyFieldBase documentation](./DocyFieldBase.md) for the complete list.

### TypeScript Interfaces

```typescript
interface NumberFieldProps extends DocyFieldBaseProps {
  min?: number;
  max?: number;
  step?: number;
  precision?: number;
  showControls?: boolean;
  format?: string;
  prefix?: string;
  suffix?: string;
  thousandSeparator?: string;
  decimalSeparator?: string;
  allowNegative?: boolean;
  allowDecimals?: boolean;
  formatter?: (value: number) => string;
  parser?: (value: string) => number;
  controlsPosition?: 'right' | 'left' | 'both';
  controlsSize?: 'sm' | 'md' | 'lg';
  emptyValue?: number | null;
  selectAllOnFocus?: boolean;
  alignment?: 'left' | 'center' | 'right';
  leadingIcon?: string;
  trailingIcon?: string;
  inputMode?: 'numeric' | 'decimal';
}

interface NumberFieldState {
  displayValue: string;
  numericValue: number | null;
  isValid: boolean;
  isFocused: boolean;
  hasError: boolean;
}

interface NumberFormatConfig {
  thousandSeparator: string;
  decimalSeparator: string;
  precision?: number;
  prefix?: string;
  suffix?: string;
  allowNegative: boolean;
  allowDecimals: boolean;
}
```

### Behavior

1. **Number Input Handling**:
   - Real-time parsing and formatting of numeric values
   - Support for different number formats and locales
   - Automatic validation against min/max constraints
   - Step increment/decrement with keyboard and mouse controls

2. **Formatting and Display**:
   - Customizable thousands and decimal separators
   - Prefix and suffix support for currency and units
   - Precision control for decimal places
   - Format patterns for complex number displays

3. **Validation**:
   - Built-in range validation (min/max)
   - Step validation for increment conformity
   - Decimal precision validation
   - Custom validation with formatter/parser functions

4. **User Interactions**:
   - Step controls with configurable position and size
   - Keyboard navigation (arrow keys, page up/down)
   - Focus behavior with optional text selection
   - Mobile-optimized numeric keyboards

5. **Value Management**:
   - Separation of display value and numeric value
   - Proper handling of empty states
   - Type-safe number conversion and validation
   - Integration with React Hook Form value management

## Component Requirements

### Technical Specifications
- **Framework**: React 18+ with TypeScript
- **Base Component**: shadcn/ui Input component (`pnpm dlx shadcn@latest add input`)
- **Extensions**: Number formatting, step controls, validation, and currency support built on top of shadcn base
- **Wrapper**: Extends DocyFieldBase for consistent field structure
- **Styling**: shadcn/ui Input component with Tailwind CSS v4
- **Formatting**: Integration with number formatting libraries (react-number-format, intl)
- **Validation**: React Hook Form integration with custom number validators
- **Accessibility**: WCAG 2.1 AA compliance with proper ARIA attributes

### Key Features Required
1. **Number Formatting**: Configurable thousands and decimal separators
2. **Step Controls**: Increment/decrement buttons with keyboard support
3. **Range Validation**: Min/max value constraints with visual feedback
4. **Currency Support**: Prefix/suffix with currency symbols and formatting
5. **Precision Control**: Decimal place management and rounding
6. **Custom Formatting**: Support for custom formatter/parser functions
7. **Mobile Optimization**: Appropriate keyboard modes for different devices
8. **Accessibility**: Complete keyboard navigation and screen reader support

## Usage Examples

```tsx
// Basic number input
<DocyFieldNumber
  name="quantity"
  label="Quantity"
  placeholder="Enter quantity"
  min={0}
  max={100}
  step={1}
  required={true}
/>

// Currency input with formatting
<DocyFieldNumber
  name="price"
  label="Price"
  prefix="$"
  suffix="USD"
  precision={2}
  thousandSeparator=","
  decimalSeparator="."
  allowNegative={false}
  alignment="right"
  showControls={true}
  step={0.01}
/>

// Percentage input with controls
<DocyFieldNumber
  name="taxRate"
  label="Tax Rate"
  suffix="%"
  min={0}
  max={100}
  step={0.25}
  precision={2}
  showControls={true}
  controlsPosition="both"
  controlsSize="md"
  alignment="center"
/>

// Integer input with step controls
<DocyFieldNumber
  name="rating"
  label="Rating"
  min={1}
  max={5}
  step={1}
  allowDecimals={false}
  showControls={true}
  controlsPosition="right"
  leadingIcon="star"
  selectAllOnFocus={true}
/>

// Scientific notation input
<DocyFieldNumber
  name="scientificValue"
  label="Scientific Value"
  format="0.00E+00"
  allowNegative={true}
  precision={2}
  step={0.01}
  placeholder="Enter value in scientific notation"
/>

// Custom formatted number with validation
<DocyFieldNumber
  name="customNumber"
  label="Custom Number"
  formatter={(value) => `${value.toFixed(3)} units`}
  parser={(value) => parseFloat(value.replace(' units', ''))}
  validations={[
    { type: 'required', message: 'Number is required' },
    { type: 'min', value: 0, message: 'Must be positive' },
    { type: 'max', value: 1000, message: 'Must be less than 1000' }
  ]}
  showControls={true}
  step={0.001}
/>

// Complete form integration with React Hook Form
<form onSubmit={handleSubmit(onSubmit)}>
  <DocyFieldNumber
    name="amount"
    label="Amount"
    prefix="$"
    precision={2}
    thousandSeparator=","
    decimalSeparator="."
    min={0}
    max={10000}
    step={0.01}
    showControls={true}
    validations={[
      { type: 'required', message: 'Amount is required' },
      { type: 'min', value: 0.01, message: 'Amount must be greater than $0.00' }
    ]}
    alignment="right"
  />
  
  <DocyFieldNumber
    name="discount"
    label="Discount"
    suffix="%"
    min={0}
    max={100}
    step={5}
    precision={1}
    computedMax={{ field: 'maxDiscount', operator: 'value' }}
    computedRequired={{ field: 'applyDiscount', operator: 'equals', value: true }}
    showControls={true}
    alignment="center"
  />
</form>

// Advanced number field with actions
<DocyFieldNumber
  name="totalPrice"
  label="Total Price"
  prefix="$"
  precision={2}
  thousandSeparator=","
  decimalSeparator="."
  readOnly={true}
  computedFormula="quantity * unitPrice * (1 - discount / 100)"
  actions={{
    change: [
      ['setFieldValue', { field: 'formattedTotal', value: 'Total: $' + value }],
      ['condition', 'value > 1000', [
        ['setFieldOption', { field: 'shippingMethod', option: 'disabled', value: false }]
      ]]
    ]
  }}
  alignment="right"
/>

// Localized number input (European format)
<DocyFieldNumber
  name="europeanPrice"
  label="European Price"
  prefix="€"
  thousandSeparator="."
  decimalSeparator=","
  precision={2}
  format="#.##0,00"
  allowNegative={false}
  showControls={true}
  step={0.01}
  inputMode="decimal"
/>
```

## Integration Requirements
- **DocyFieldBase**: Base wrapper component (required)
- **shadcn/ui Input**: Base input component for styling and behavior
- **DocyIcon**: For leading/trailing icons and control buttons
- **Number formatting library**: For locale-specific number formatting
- **React Hook Form**: For form state management and validation

## Dependencies Required
- `react-hook-form`: Form state management (inherited from DocyFieldBase)
- `react-number-format`: Advanced number formatting and masking
- `@radix-ui/react-select`: For prefix/suffix selectors if needed
- `class-variance-authority`: Variant management
- `clsx`: Conditional class names
- All DocyFieldBase dependencies

## Testing Requirements
1. **Unit Tests**: Number parsing, formatting, validation, step controls
2. **Integration Tests**: React Hook Form integration, validation system
3. **Visual Tests**: All number formats, control positions, responsive behavior
4. **Accessibility Tests**: Keyboard navigation, screen reader support, ARIA attributes
5. **Performance Tests**: Large form rendering, real-time formatting
6. **Localization Tests**: Different number formats, currency symbols, separators
7. **Edge Case Tests**: Very large numbers, scientific notation, precision limits

## Development Priority
**High** - Essential numeric input component required for forms, financial data, and calculations

## Notes
- Built on shadcn/ui Input component with Docy-specific number formatting features
- Supports international number formats with configurable separators
- Provides comprehensive validation for numeric constraints
- Step controls offer enhanced user experience for increment/decrement operations
- Currency and unit support enables financial and measurement applications
- Custom formatter/parser functions allow for specialized number formats
- Mobile-optimized with appropriate keyboard modes
- Complete accessibility compliance ensures inclusive user experience
- Performance optimized for real-time formatting in large forms
- Integrates seamlessly with DocyFieldBase for consistent field behavior