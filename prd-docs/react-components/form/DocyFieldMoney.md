# DocyFieldMoney Component

## Overview
DocyFieldMoney is a specialized monetary input component that extends DocyFieldBase to provide comprehensive money input functionality with currency support. Built on top of the shadcn/ui Input component, it offers advanced money formatting, currency selection, precision handling, conversion capabilities, and financial validation. The component is designed to handle various monetary input scenarios including multi-currency support, exchange rates, regional formatting, and financial calculations.

This component provides a robust foundation for all money-based form fields, ensuring consistent behavior across different currency requirements while maintaining full accessibility and integration with the Docyrus form system.

## Component Specification

### Props
DocyFieldMoney inherits ALL props from DocyFieldBase and adds the following money-specific properties:

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `currency` | string | 'USD' | No | Currency code (ISO 4217: USD, EUR, GBP, etc.) |
| `showCurrency` | boolean | true | No | Display currency selector dropdown |
| `currencyPosition` | 'left' \| 'right' | 'left' | No | Currency symbol/code position relative to amount |
| `allowNegative` | boolean | false | No | Allow negative monetary amounts |
| `precision` | number | 2 | No | Number of decimal places for currency |
| `min` | number | 0 | No | Minimum allowed amount |
| `max` | number | - | No | Maximum allowed amount |
| `format` | string | - | No | Custom money format pattern (e.g., '$#,##0.00') |
| `locale` | string | 'en-US' | No | Locale for number and currency formatting |
| `thousandSeparator` | string | ',' | No | Thousands separator character |
| `decimalSeparator` | string | '.' | No | Decimal separator character |
| `showControls` | boolean | false | No | Display increment/decrement step buttons |
| `step` | number | 1 | No | Step increment for controls and validation |
| `conversion` | boolean | false | No | Enable currency conversion functionality |
| `exchangeRate` | number | 1 | No | Exchange rate for currency conversion |
| `baseCurrency` | string | 'USD' | No | Base currency for conversion calculations |
| `onCurrencyChange` | function | - | No | Callback when currency selection changes |
| `onConversion` | function | - | No | Callback when currency conversion occurs |
| `formatter` | function | - | No | Custom money formatter function |
| `parser` | function | - | No | Custom money parser function |
| `showSymbol` | boolean | true | No | Display currency symbol instead of code |
| `symbolPosition` | 'before' \| 'after' | 'before' | No | Position of currency symbol |
| `currencyOptions` | CurrencyOption[] | - | No | Available currency options for selection |
| `defaultCurrency` | string | 'USD' | No | Default currency when none specified |
| `strictMode` | boolean | false | No | Strict validation for currency format compliance |
| `rounding` | 'up' \| 'down' \| 'nearest' | 'nearest' | No | Rounding behavior for precision |
| `emptyValue` | number \| null | null | No | Value to use when input is empty |
| `selectAllOnFocus` | boolean | false | No | Select all text when field receives focus |
| `alignment` | 'left' \| 'center' \| 'right' | 'right' | No | Text alignment within input |
| `inputMode` | 'numeric' \| 'decimal' | 'decimal' | No | Mobile keyboard input mode |

**Note**: DocyFieldMoney inherits all DocyFieldBase props including validation, layout, dynamic computed properties, AI integration, and more. See [DocyFieldBase documentation](./DocyFieldBase.md) for the complete list.

### TypeScript Interfaces

```typescript
interface MoneyFieldProps extends DocyFieldBaseProps {
  currency?: string;
  showCurrency?: boolean;
  currencyPosition?: 'left' | 'right';
  allowNegative?: boolean;
  precision?: number;
  min?: number;
  max?: number;
  format?: string;
  locale?: string;
  thousandSeparator?: string;
  decimalSeparator?: string;
  showControls?: boolean;
  step?: number;
  conversion?: boolean;
  exchangeRate?: number;
  baseCurrency?: string;
  onCurrencyChange?: (currency: string) => void;
  onConversion?: (fromCurrency: string, toCurrency: string, amount: number) => void;
  formatter?: (value: number, currency: string) => string;
  parser?: (value: string, currency: string) => number;
  showSymbol?: boolean;
  symbolPosition?: 'before' | 'after';
  currencyOptions?: CurrencyOption[];
  defaultCurrency?: string;
  strictMode?: boolean;
  rounding?: 'up' | 'down' | 'nearest';
  emptyValue?: number | null;
  selectAllOnFocus?: boolean;
  alignment?: 'left' | 'center' | 'right';
  inputMode?: 'numeric' | 'decimal';
}

interface CurrencyOption {
  code: string;
  name: string;
  symbol: string;
  decimals: number;
  enabled: boolean;
}

interface MoneyFieldState {
  displayValue: string;
  numericValue: number | null;
  selectedCurrency: string;
  exchangeRate: number;
  isConverting: boolean;
  isValid: boolean;
  isFocused: boolean;
  hasError: boolean;
}

interface MoneyFormatConfig {
  currency: string;
  locale: string;
  precision: number;
  thousandSeparator: string;
  decimalSeparator: string;
  symbolPosition: 'before' | 'after';
  showSymbol: boolean;
  allowNegative: boolean;
  rounding: 'up' | 'down' | 'nearest';
}
```

### Behavior

1. **Money Input Handling**:
   - Real-time parsing and formatting of monetary values
   - Currency-aware input validation and formatting
   - Automatic precision handling based on currency standards
   - Support for different regional money formats

2. **Currency Management**:
   - Dynamic currency selection with dropdown
   - Currency symbol and code display options
   - Support for international currency standards (ISO 4217)
   - Currency-specific decimal precision and formatting

3. **Conversion Features**:
   - Real-time currency conversion with exchange rates
   - Base currency conversion calculations
   - Conversion history and rate tracking
   - Support for multiple exchange rate sources

4. **Formatting and Display**:
   - Locale-specific number formatting
   - Customizable currency symbol positioning
   - Thousands and decimal separator configuration
   - Format patterns for different display requirements

5. **Validation**:
   - Currency-specific validation rules
   - Range validation with min/max amounts
   - Precision validation for decimal places
   - Negative value validation for financial contexts

6. **User Interactions**:
   - Currency selector dropdown integration
   - Step controls for amount increment/decrement
   - Keyboard navigation with currency-aware shortcuts
   - Mobile-optimized numeric input keyboards

## Component Requirements

### Technical Specifications
- **Framework**: React 18+ with TypeScript
- **Base Component**: shadcn/ui Input component (`pnpm dlx shadcn@latest add input`)
- **Extensions**: Currency support, formatting, conversion, and validation built on top of shadcn base
- **Wrapper**: Extends DocyFieldBase for consistent field structure
- **Styling**: shadcn/ui Input component with Tailwind CSS v4
- **Currency**: Integration with currency libraries (react-currency-input-field, intl)
- **Validation**: React Hook Form integration with currency-specific validators
- **Accessibility**: WCAG 2.1 AA compliance with proper ARIA attributes for currency context

### Key Features Required
1. **Currency Selection**: Dropdown with searchable currency options
2. **Money Formatting**: Locale-specific formatting with currency symbols
3. **Conversion Support**: Real-time currency conversion with exchange rates
4. **Precision Control**: Currency-specific decimal place management
5. **Validation**: Financial validation rules with currency context
6. **Step Controls**: Increment/decrement with currency-aware stepping
7. **Regional Support**: International formatting and currency standards
8. **Accessibility**: Complete keyboard navigation and screen reader support for financial data

## Usage Examples

```tsx
// Basic money input
<DocyFieldMoney
  name="amount"
  label="Amount"
  currency="USD"
  placeholder="Enter amount"
  min={0}
  max={10000}
  precision={2}
  required={true}
/>

// Multi-currency input with conversion
<DocyFieldMoney
  name="price"
  label="Price"
  currency="EUR"
  showCurrency={true}
  conversion={true}
  baseCurrency="USD"
  exchangeRate={0.85}
  currencyOptions={[
    { code: 'USD', name: 'US Dollar', symbol: '$', decimals: 2, enabled: true },
    { code: 'EUR', name: 'Euro', symbol: '€', decimals: 2, enabled: true },
    { code: 'GBP', name: 'British Pound', symbol: '£', decimals: 2, enabled: true }
  ]}
  onCurrencyChange={(currency) => console.log('Currency changed:', currency)}
  onConversion={(from, to, amount) => console.log('Conversion:', from, to, amount)}
/>

// Regional formatting (European style)
<DocyFieldMoney
  name="europeanPrice"
  label="European Price"
  currency="EUR"
  locale="de-DE"
  thousandSeparator="."
  decimalSeparator=","
  symbolPosition="after"
  currencyPosition="right"
  format="# ##0,00 €"
  allowNegative={false}
/>

// Financial trading input with controls
<DocyFieldMoney
  name="tradeAmount"
  label="Trade Amount"
  currency="USD"
  precision={4}
  showControls={true}
  step={0.0001}
  allowNegative={true}
  min={-100000}
  max={100000}
  strictMode={true}
  rounding="nearest"
  alignment="right"
  selectAllOnFocus={true}
/>

// Custom formatted money with validation
<DocyFieldMoney
  name="customMoney"
  label="Custom Money"
  currency="JPY"
  precision={0}
  formatter={(value, currency) => `${value.toLocaleString()} ${currency}`}
  parser={(value, currency) => parseInt(value.replace(/[^\d]/g, ''), 10)}
  validations={[
    { type: 'required', message: 'Amount is required' },
    { type: 'min', value: 100, message: 'Minimum amount is ¥100' },
    { type: 'max', value: 1000000, message: 'Maximum amount is ¥1,000,000' }
  ]}
  customValidations={[
    {
      formula: 'amount % 100 != 0',
      message: 'Amount must be in multiples of ¥100'
    }
  ]}
/>

// Complete form integration with React Hook Form
<form onSubmit={handleSubmit(onSubmit)}>
  <DocyFieldMoney
    name="invoiceAmount"
    label="Invoice Amount"
    currency="USD"
    precision={2}
    thousandSeparator=","
    decimalSeparator="."
    showCurrency={true}
    conversion={true}
    min={0.01}
    max={50000}
    validations={[
      { type: 'required', message: 'Invoice amount is required' },
      { type: 'min', value: 0.01, message: 'Amount must be greater than $0.00' }
    ]}
    showControls={true}
    step={0.01}
    alignment="right"
  />
  
  <DocyFieldMoney
    name="discount"
    label="Discount Amount"
    currency="USD"
    precision={2}
    allowNegative={false}
    computedMax="invoiceAmount * 0.3"
    computedRequired={{ field: 'applyDiscount', operator: 'equals', value: true }}
    customValidations={[
      {
        formula: 'discount > invoiceAmount',
        message: 'Discount cannot exceed invoice amount'
      }
    ]}
  />
</form>

// Advanced money field with actions and conversion
<DocyFieldMoney
  name="totalAmount"
  label="Total Amount"
  currency="USD"
  precision={2}
  conversion={true}
  baseCurrency="USD"
  readOnly={true}
  computedFormula="(quantity * unitPrice) - discount + tax"
  actions={{
    change: [
      ['setFieldValue', { 
        field: 'formattedTotal', 
        value: 'Total: $' + (value || 0).toFixed(2) 
      }],
      ['condition', 'value > 1000', [
        ['setFieldOption', { 
          field: 'expeditedShipping', 
          option: 'disabled', 
          value: false 
        }]
      ]],
      ['setFieldValueCalculated', {
        field: 'eurAmount',
        formula: 'totalAmount * 0.85'
      }]
    ]
  }}
  onConversion={(from, to, amount) => {
    console.log(`Converting ${amount} from ${from} to ${to}`);
  }}
/>

// Budget tracking with multiple currencies
<DocyFieldMoney
  name="budget"
  label="Budget"
  currency="USD"
  showCurrency={true}
  conversion={true}
  currencyOptions={[
    { code: 'USD', name: 'US Dollar', symbol: '$', decimals: 2, enabled: true },
    { code: 'EUR', name: 'Euro', symbol: '€', decimals: 2, enabled: true },
    { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$', decimals: 2, enabled: true }
  ]}
  validations={[
    { type: 'required', message: 'Budget amount is required' },
    { type: 'min', value: 1000, message: 'Minimum budget is $1,000' }
  ]}
  customValidations={[
    {
      formula: 'budget > previousBudget * 1.2',
      message: 'Budget increase cannot exceed 20% of previous amount'
    }
  ]}
  showControls={true}
  step={100}
  alignment="right"
/>
```

## Integration Requirements
- **DocyFieldBase**: Base wrapper component (required)
- **shadcn/ui Input**: Base input component for styling and behavior
- **shadcn/ui Select**: For currency selection dropdown
- **DocyIcon**: For currency symbols and control buttons
- **Currency formatting library**: For locale-specific money formatting
- **React Hook Form**: For form state management and validation
- **Exchange rate API**: For real-time currency conversion (optional)

## Dependencies Required
- `react-hook-form`: Form state management (inherited from DocyFieldBase)
- `react-currency-input-field`: Advanced money input formatting and masking
- `@radix-ui/react-select`: Currency selection dropdown
- `currency-codes`: ISO 4217 currency code validation
- `class-variance-authority`: Variant management
- `clsx`: Conditional class names
- All DocyFieldBase dependencies

## Testing Requirements
1. **Unit Tests**: Money parsing, formatting, currency conversion, validation
2. **Integration Tests**: React Hook Form integration, currency selection, conversion flow
3. **Visual Tests**: All currency formats, symbol positions, responsive behavior
4. **Accessibility Tests**: Keyboard navigation, screen reader support, ARIA attributes for financial data
5. **Performance Tests**: Large form rendering, real-time formatting, currency conversion
6. **Localization Tests**: Different currency formats, regional separators, symbol positions
7. **Edge Case Tests**: Very large amounts, micro-currencies, conversion edge cases
8. **Financial Tests**: Precision handling, rounding behavior, negative amounts

## Development Priority
**High** - Essential financial input component required for e-commerce, billing, and financial applications

## Notes
- Built on shadcn/ui Input component with Docy-specific money formatting features
- Supports international currency standards (ISO 4217) with comprehensive formatting
- Provides real-time currency conversion with configurable exchange rates
- Currency-specific validation ensures financial data integrity
- Step controls and precision handling optimized for monetary calculations
- Mobile-optimized with appropriate keyboard modes for financial input
- Complete accessibility compliance ensures inclusive financial form experiences
- Performance optimized for real-time formatting and conversion in financial applications
- Integrates seamlessly with DocyFieldBase for consistent field behavior across forms