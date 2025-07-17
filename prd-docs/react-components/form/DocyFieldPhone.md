# DocyFieldPhone Component

## Overview
DocyFieldPhone is a specialized phone number input component that extends DocyFieldBase to provide comprehensive phone number handling functionality. It's built on top of the shadcn/ui Input component and offers features like international phone number support, country code selection, automatic formatting, validation, and extension handling.

The component supports various phone number formats, country-specific validation, and integrates with popular phone number validation libraries like libphonenumber for robust international phone number handling.

## Component Specification

### Props
DocyFieldPhone inherits ALL props from DocyFieldBase and adds the following phone-specific properties:

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `extends` | DocyFieldBase | - | Yes | Inherits all base field props (see DocyFieldBase.md) |
| `format` | string | 'national' | No | Phone number format pattern ('national', 'international', 'e164', 'rfc3966') |
| `mask` | string | - | No | Input mask for phone formatting (e.g., '(000) 000-0000') |
| `country` | string | 'US' | No | Default country code (ISO 3166-1 alpha-2) |
| `showCountrySelect` | boolean | true | No | Show country selector dropdown |
| `countries` | string[] | ['US', 'CA', 'GB', 'AU'] | No | Available countries list (ISO codes) |
| `international` | boolean | false | No | Enable international phone numbers |
| `autoFormat` | boolean | true | No | Auto-format phone number as user types |
| `validateFormat` | boolean | true | No | Validate phone number format |
| `allowExtension` | boolean | false | No | Allow phone extensions |
| `extensionSeparator` | string | 'ext.' | No | Extension separator text |
| `onCountryChange` | function | - | No | Callback when country is changed |
| `onFormatChange` | function | - | No | Callback when format is changed |
| `phoneLibphonenumber` | boolean | false | No | Use libphonenumber for validation |
| `showFlag` | boolean | true | No | Show country flag in selector |
| `flagSize` | string | 'sm' | No | Country flag size ('xs', 'sm', 'md', 'lg') |

**Note**: DocyFieldPhone inherits all DocyFieldBase props including validation, layout, dynamic computed properties, actions, and more. See [DocyFieldBase documentation](./DocyFieldBase.md) for the complete list.

### TypeScript Interfaces

```typescript
interface PhoneFieldProps extends DocyFieldBaseProps {
  // Phone-specific props
  format?: 'national' | 'international' | 'e164' | 'rfc3966';
  mask?: string;
  country?: string;
  showCountrySelect?: boolean;
  countries?: string[];
  international?: boolean;
  autoFormat?: boolean;
  validateFormat?: boolean;
  allowExtension?: boolean;
  extensionSeparator?: string;
  onCountryChange?: (country: string) => void;
  onFormatChange?: (format: string) => void;
  phoneLibphonenumber?: boolean;
  showFlag?: boolean;
  flagSize?: 'xs' | 'sm' | 'md' | 'lg';
}

interface PhoneFieldState {
  selectedCountry: string;
  formattedValue: string;
  isValidPhone: boolean;
  extension: string;
  detectedCountry: string;
}

interface CountryData {
  code: string; // ISO 3166-1 alpha-2
  name: string;
  dialCode: string;
  flag: string;
  mask: string;
  priority: number;
}

interface PhoneValidationResult {
  isValid: boolean;
  country: string;
  nationalNumber: string;
  internationalNumber: string;
  e164: string;
  type: 'mobile' | 'landline' | 'voip' | 'unknown';
}
```

### Behavior

1. **Phone Number Formatting**:
   - Real-time formatting as user types based on selected country
   - Multiple format options (national, international, E.164, RFC3966)
   - Automatic masking with country-specific patterns
   - Support for extensions with customizable separators

2. **Country Selection**:
   - Dropdown with country flags and dial codes
   - Search functionality for quick country selection
   - Automatic country detection based on phone number
   - Priority-based country ordering

3. **Validation**:
   - Format validation using built-in or libphonenumber library
   - Country-specific validation rules
   - Real-time validation feedback
   - Extension validation when enabled

4. **International Support**:
   - Support for international dialing codes
   - Country-specific formatting rules
   - Automatic country detection from input
   - Configurable country availability

5. **User Experience**:
   - Auto-formatting prevents invalid input
   - Visual feedback for validation states
   - Accessible keyboard navigation
   - Clear error messages for invalid formats

## Component Requirements

### Technical Specifications
- **Framework**: React 18+ with TypeScript
- **Base Component**: shadcn/ui Input component (`pnpm dlx shadcn@latest add input`)
- **Extensions**: Docy-specific phone features including country selection, formatting, and validation built on shadcn base
- **Wrapper**: Extends DocyFieldBase for consistent field structure
- **Styling**: shadcn/ui Input with Tailwind CSS v4
- **Phone Validation**: Optional libphonenumber integration for robust validation
- **Country Data**: Built-in country codes and formatting rules
- **Accessibility**: WCAG 2.1 AA compliance

### Key Features Required
1. **Phone Number Formatting**: Real-time formatting with country-specific patterns
2. **Country Selection**: Dropdown with flags, search, and dial codes
3. **International Support**: Global phone number format support
4. **Validation**: Format validation with multiple validation backends
5. **Extension Support**: Optional extension handling with customizable separators
6. **Auto-detection**: Country detection from phone number input
7. **Accessibility**: Complete keyboard navigation and screen reader support

### Usage Examples

```tsx
// Basic phone input with US formatting
<DocyFieldPhone
  name="phone"
  label="Phone Number"
  placeholder="Enter your phone number"
  required={true}
/>

// International phone with country selector
<DocyFieldPhone
  name="internationalPhone"
  label="International Phone"
  international={true}
  countries={['US', 'CA', 'GB', 'AU', 'DE', 'FR', 'JP']}
  format="international"
  showCountrySelect={true}
  showFlag={true}
/>

// Phone with extension support
<DocyFieldPhone
  name="businessPhone"
  label="Business Phone"
  allowExtension={true}
  extensionSeparator="ext."
  placeholder="Phone number with extension"
  help="Enter your business phone number with extension if applicable"
/>

// Phone with custom mask and validation
<DocyFieldPhone
  name="customPhone"
  label="Custom Phone Format"
  mask="(000) 000-0000"
  country="US"
  showCountrySelect={false}
  validateFormat={true}
  validations={[
    { type: 'required', message: 'Phone number is required' },
    { type: 'phoneFormat', message: 'Please enter a valid phone number' }
  ]}
/>

// Phone with libphonenumber validation
<DocyFieldPhone
  name="validatedPhone"
  label="Validated Phone"
  phoneLibphonenumber={true}
  international={true}
  validateFormat={true}
  onCountryChange={(country) => console.log('Country changed:', country)}
  onFormatChange={(format) => console.log('Format changed:', format)}
/>

// Phone with computed properties
<DocyFieldPhone
  name="contactPhone"
  label="Contact Phone"
  computedRequired={{ field: 'contactMethod', operator: 'equals', value: 'phone' }}
  computedHidden={{ field: 'hasPhone', operator: 'equals', value: false }}
  countries={['US', 'CA', 'MX']}
  format="national"
/>

// Phone with actions - update related fields
<DocyFieldPhone
  name="primaryPhone"
  label="Primary Phone"
  actions={{
    change: [
      ['setFieldValue', {
        field: 'hasPhone',
        value: true
      }],
      ['setFieldValueCalculated', {
        field: 'phoneCountry',
        formula: 'primaryPhone.country'
      }]
    ]
  }}
  onCountryChange={(country) => {
    // Update related fields based on country
    setFieldValue('timeZone', getTimeZoneForCountry(country));
  }}
/>

// Complete form integration with React Hook Form
<form onSubmit={handleSubmit(onSubmit)}>
  <DocyFieldPhone
    name="phone"
    label="Phone Number"
    validations={[
      { type: 'required', message: 'Phone number is required' },
      { type: 'phoneFormat', message: 'Please enter a valid phone number' }
    ]}
    customValidations={[
      {
        formula: 'phone.country = "US" and $not($contains(phone.number, "555"))',
        message: 'US phone numbers cannot contain 555'
      }
    ]}
    international={true}
    autoFormat={true}
    showCountrySelect={true}
    allowExtension={true}
  />
  
  <DocyFieldPhone
    name="alternatePhone"
    label="Alternate Phone"
    computedRequired={{ field: 'requireAlternate', operator: 'equals', value: true }}
    format="national"
    country="US"
    showCountrySelect={false}
    placeholder="Optional alternate phone number"
  />
</form>

// Phone with advanced configuration
<DocyFieldPhone
  name="enterprisePhone"
  label="Enterprise Phone System"
  international={true}
  countries={['US', 'CA', 'GB', 'AU', 'DE', 'FR', 'JP', 'CN', 'IN', 'BR']}
  format="e164"
  phoneLibphonenumber={true}
  allowExtension={true}
  extensionSeparator="x"
  autoFormat={true}
  validateFormat={true}
  showFlag={true}
  flagSize="md"
  onCountryChange={(country) => {
    // Update business hours based on country
    updateBusinessHours(country);
  }}
  validations={[
    { type: 'required', message: 'Enterprise phone is required' },
    { type: 'businessPhone', message: 'Please enter a valid business phone number' }
  ]}
  customValidations={[
    {
      formula: 'phone.type = "mobile" and userRole = "executive"',
      message: 'Executive users must provide a mobile phone number'
    }
  ]}
/>
```

### Integration Requirements
- **DocyFieldBase**: Base wrapper component (required)
- **DocyIcon**: For country flags and phone icons
- **DocySelect**: For country selection dropdown
- **DocyTooltip**: For help text and validation messages
- **Phone validation library**: libphonenumber-js (optional)
- **Country data**: Built-in country codes and formatting rules

### Dependencies Required
- `react-hook-form`: Form state management (inherited from DocyFieldBase)
- `libphonenumber-js`: Optional phone number validation and formatting
- `imask` or `react-input-mask`: Input masking functionality
- `@radix-ui/react-select`: For country selector dropdown
- `class-variance-authority`: Variant management
- All DocyFieldBase dependencies

### Testing Requirements
1. **Unit Tests**: Phone formatting, country selection, validation logic, extension handling
2. **Integration Tests**: React Hook Form integration, country change callbacks, validation flow
3. **Visual Tests**: All format variants, country flags, responsive behavior
4. **Accessibility Tests**: Keyboard navigation, screen reader support, ARIA attributes
5. **Performance Tests**: Large country lists, real-time formatting, validation performance
6. **Validation Tests**: Format validation, libphonenumber integration, custom validation rules
7. **International Tests**: Multiple country formats, international dialing codes, edge cases

## Development Priority
**High** - Essential form component for contact information and user registration flows

## Notes
- Built on shadcn/ui Input component with extensive phone-specific extensions
- Supports both simple masking and advanced libphonenumber validation
- Country selection includes flags, search, and priority-based ordering
- Real-time formatting provides excellent user experience
- Extension support accommodates business phone systems
- International support handles global phone number formats
- Complete accessibility compliance for inclusive user experience
- Performance optimized for large country lists and real-time formatting
- Integrates seamlessly with DocyFieldBase for consistent field behavior
- Supports all DocyFieldBase features including computed properties and actions