# FieldActions Usage Examples

This document provides comprehensive examples of how to use the FieldActions system in form fields to create dynamic field interactions.

## Overview

The FieldActions system allows you to define declarative actions that are triggered when field events occur (currently only 'change' event is supported). Actions can modify other fields' values or options using static values or JSONata formulas.

## Basic Usage

### Setting Static Values

```tsx
// When company type changes, automatically set has_employees to true
<DocyFieldBase
  name="companyType"
  label="Company Type"
  actions={{
    change: [
      ['setFieldValue', {
        field: 'has_employees',
        value: true
      }]
    ]
  }}
>
  <Select />
</DocyFieldBase>
```

### Setting Calculated Values

```tsx
// When quantity changes, calculate net total using formula
<DocyFieldBase
  name="quantity"
  label="Quantity"
  actions={{
    change: [
      ['setFieldValueCalculated', {
        field: 'net_total',
        formula: 'amount * qty * (1 - discount)'
      }]
    ]
  }}
>
  <Input type="number" />
</DocyFieldBase>
```

### Setting Field Options

```tsx
// When "Has Children" checkbox changes, hide/show kids count field
<DocyFieldBase
  name="hasKids"
  label="Has Children"
  actions={{
    change: [
      ['setFieldOption', {
        field: 'kids_count',
        option: 'hidden',
        value: true
      }]
    ]
  }}
>
  <Checkbox />
</DocyFieldBase>
```

### Setting Calculated Options

```tsx
// When employee count changes, make HR contact required if > 10
<DocyFieldBase
  name="employeeCount"
  label="Number of Employees"
  actions={{
    change: [
      ['setFieldOptionCalculated', {
        field: 'hr_contact',
        option: 'required',
        formula: 'employee_count > 10'
      }]
    ]
  }}
>
  <Input type="number" />
</DocyFieldBase>
```

## Conditional Actions

### Simple Conditional Logic

```tsx
// Only calculate net total if both amount and quantity are greater than 0
<DocyFieldBase
  name="amount"
  label="Amount"
  actions={{
    change: [
      ['condition', 'amount > 0 and qty > 0', [
        ['setFieldValueCalculated', {
          field: 'net_total',
          formula: 'amount * qty * (1 - discount)'
        }]
      ]]
    ]
  }}
>
  <Input type="number" />
</DocyFieldBase>
```

### Complex Conditional Logic

```tsx
// Different actions based on product type
<DocyFieldBase
  name="productType"
  label="Product Type"
  actions={{
    change: [
      ['condition', 'product_type = "physical"', [
        ['setFieldOption', {
          field: 'shipping_weight',
          option: 'required',
          value: true
        }],
        ['setFieldOption', {
          field: 'digital_delivery',
          option: 'hidden',
          value: true
        }]
      ]],
      ['condition', 'product_type = "digital"', [
        ['setFieldOption', {
          field: 'shipping_weight',
          option: 'hidden',
          value: true
        }],
        ['setFieldOption', {
          field: 'digital_delivery',
          option: 'required',
          value: true
        }]
      ]]
    ]
  }}
>
  <Select />
</DocyFieldBase>
```

## Advanced Examples

### Multiple Actions

```tsx
// When user type changes, trigger multiple actions
<DocyFieldBase
  name="userType"
  label="User Type"
  actions={{
    change: [
      ['setFieldValue', {
        field: 'permissions_level',
        value: 'basic'
      }],
      ['condition', 'user_type = "admin"', [
        ['setFieldValue', {
          field: 'permissions_level',
          value: 'full'
        }],
        ['setFieldOption', {
          field: 'admin_settings',
          option: 'hidden',
          value: false
        }]
      ]],
      ['condition', 'user_type = "guest"', [
        ['setFieldOption', {
          field: 'user_profile',
          option: 'disabled',
          value: true
        }]
      ]]
    ]
  }}
>
  <Select />
</DocyFieldBase>
```

### Nested Conditional Actions

```tsx
// Complex shipping calculation with nested conditions
<DocyFieldBase
  name="productWeight"
  label="Product Weight (kg)"
  actions={{
    change: [
      ['condition', 'product_type = "physical"', [
        ['condition', 'product_weight > 0', [
          ['setFieldValueCalculated', {
            field: 'base_shipping_cost',
            formula: 'product_weight * shipping_rate_per_kg'
          }]
        ]],
        ['condition', 'product_weight > 50', [
          ['setFieldValueCalculated', {
            field: 'shipping_cost',
            formula: 'base_shipping_cost * 1.5 + 25'
          }],
          ['setFieldOption', {
            field: 'special_handling',
            option: 'required',
            value: true
          }]
        ]],
        ['condition', 'product_weight <= 50', [
          ['setFieldValueCalculated', {
            field: 'shipping_cost',
            formula: 'base_shipping_cost + 5'
          }]
        ]]
      ]]
    ]
  }}
>
  <Input type="number" />
</DocyFieldBase>
```

### Form-wide Calculations

```tsx
// When any line item changes, recalculate order totals
<DocyFieldBase
  name="lineItemPrice"
  label="Line Item Price"
  actions={{
    change: [
      ['setFieldValueCalculated', {
        field: 'line_total',
        formula: 'line_item_price * quantity'
      }],
      ['setFieldValueCalculated', {
        field: 'order_subtotal',
        formula: '$sum(line_items.line_total)'
      }],
      ['setFieldValueCalculated', {
        field: 'tax_amount',
        formula: 'order_subtotal * tax_rate'
      }],
      ['setFieldValueCalculated', {
        field: 'order_total',
        formula: 'order_subtotal + tax_amount + shipping_cost'
      }]
    ]
  }}
>
  <Input type="number" />
</DocyFieldBase>
```

## Real-world Use Cases

### E-commerce Product Form

```tsx
const ProductForm = () => {
  return (
    <form>
      {/* Product type determines available fields */}
      <DocyFieldBase
        name="productType"
        label="Product Type"
        actions={{
          change: [
            ['condition', 'product_type = "physical"', [
              ['setFieldOption', { field: 'weight', option: 'required', value: true }],
              ['setFieldOption', { field: 'dimensions', option: 'hidden', value: false }],
              ['setFieldOption', { field: 'download_url', option: 'hidden', value: true }]
            ]],
            ['condition', 'product_type = "digital"', [
              ['setFieldOption', { field: 'weight', option: 'hidden', value: true }],
              ['setFieldOption', { field: 'dimensions', option: 'hidden', value: true }],
              ['setFieldOption', { field: 'download_url', option: 'required', value: true }]
            ]]
          ]
        }}
      >
        <Select />
      </DocyFieldBase>

      {/* Dynamic pricing based on category */}
      <DocyFieldBase
        name="category"
        label="Category"
        actions={{
          change: [
            ['setFieldValueCalculated', {
              field: 'suggested_price',
              formula: 'category_pricing[category].base_price'
            }],
            ['condition', 'category = "premium"', [
              ['setFieldValueCalculated', {
                field: 'minimum_price',
                formula: 'suggested_price * 0.8'
              }]
            ]]
          ]
        }}
      >
        <Select />
      </DocyFieldBase>

      {/* Inventory management */}
      <DocyFieldBase
        name="stockQuantity"
        label="Stock Quantity"
        actions={{
          change: [
            ['condition', 'stock_quantity <= 5', [
              ['setFieldOption', {
                field: 'low_stock_alert',
                option: 'hidden',
                value: false
              }]
            ]],
            ['condition', 'stock_quantity = 0', [
              ['setFieldValue', {
                field: 'availability_status',
                value: 'out_of_stock'
              }]
            ]]
          ]
        }}
      >
        <Input type="number" />
      </DocyFieldBase>
    </form>
  );
};
```

### User Registration Form

```tsx
const UserRegistrationForm = () => {
  return (
    <form>
      {/* Account type determines required fields */}
      <DocyFieldBase
        name="accountType"
        label="Account Type"
        actions={{
          change: [
            ['condition', 'account_type = "business"', [
              ['setFieldOption', { field: 'company_name', option: 'required', value: true }],
              ['setFieldOption', { field: 'tax_id', option: 'required', value: true }],
              ['setFieldOption', { field: 'business_type', option: 'hidden', value: false }]
            ]],
            ['condition', 'account_type = "personal"', [
              ['setFieldOption', { field: 'company_name', option: 'hidden', value: true }],
              ['setFieldOption', { field: 'tax_id', option: 'hidden', value: true }],
              ['setFieldOption', { field: 'business_type', option: 'hidden', value: true }]
            ]]
          ]
        }}
      >
        <Select />
      </DocyFieldBase>

      {/* Age verification */}
      <DocyFieldBase
        name="birthDate"
        label="Birth Date"
        actions={{
          change: [
            ['setFieldValueCalculated', {
              field: 'age',
              formula: '$floor(($now() - $toMillis(birth_date)) / (365.25 * 24 * 60 * 60 * 1000))'
            }],
            ['condition', 'age < 18', [
              ['setFieldOption', {
                field: 'parental_consent',
                option: 'required',
                value: true
              }]
            ]]
          ]
        }}
      >
        <Input type="date" />
      </DocyFieldBase>

      {/* Location-based features */}
      <DocyFieldBase
        name="country"
        label="Country"
        actions={{
          change: [
            ['setFieldValueCalculated', {
              field: 'currency',
              formula: 'country_settings[country].currency'
            }],
            ['setFieldValueCalculated', {
              field: 'tax_rate',
              formula: 'country_settings[country].tax_rate'
            }],
            ['condition', 'country = "US"', [
              ['setFieldOption', {
                field: 'state',
                option: 'required',
                value: true
              }]
            ]]
          ]
        }}
      >
        <Select />
      </DocyFieldBase>
    </form>
  );
};
```

## Available Field Options

The following field options can be modified using `setFieldOption` and `setFieldOptionCalculated`:

- `hidden` - Show/hide the field
- `disabled` - Enable/disable the field
- `required` - Make field required/optional
- `readOnly` - Make field read-only/editable
- `label` - Change the field label
- `placeholder` - Change the placeholder text
- `description` - Change the field description
- `help` - Change the help text

## JSONata Formula Examples

### Basic Calculations
```javascript
// Simple arithmetic
"amount * quantity"

// Percentage calculations
"amount * (1 - discount_rate)"

// Conditional values
"age >= 18 ? 'adult' : 'minor'"
```

### Array Operations
```javascript
// Sum array values
"$sum(line_items.amount)"

// Count items
"$count(selected_items)"

// Filter and sum
"$sum(line_items[category='food'].amount)"
```

### Date Operations
```javascript
// Calculate age
"$floor(($now() - $toMillis(birth_date)) / (365.25 * 24 * 60 * 60 * 1000))"

// Add days to date
"$toMillis(start_date) + (days * 24 * 60 * 60 * 1000)"
```

### String Operations
```javascript
// Concatenation
"first_name & ' ' & last_name"

// Uppercase
"$uppercase(company_name)"

// Conditional text
"status = 'active' ? 'Active User' : 'Inactive User'"
```

## Best Practices

1. **Keep Actions Simple**: Break complex logic into multiple simple actions
2. **Use Meaningful Field Names**: Field names should clearly indicate their purpose
3. **Test Conditions Thoroughly**: Ensure conditional logic handles edge cases
4. **Document Complex Formulas**: Add comments for complex JSONata expressions
5. **Performance Considerations**: Avoid circular dependencies between field actions
6. **Error Handling**: Validate action configurations during development

## Debugging Actions

```tsx
// Add logging to debug action execution
<DocyFieldBase
  name="debugField"
  label="Debug Field"
  actions={{
    change: [
      ['condition', 'debug_mode = true', [
        ['setFieldValue', {
          field: 'debug_log',
          value: 'Action executed at ' + new Date().toISOString()
        }]
      ]]
    ]
  }}
>
  <Input />
</DocyFieldBase>
```

## Testing Actions

```tsx
// Test action execution in unit tests
import { render, fireEvent } from '@testing-library/react';
import { FieldActionExecutor } from '../utils/FieldActionExecutor';

test('should execute setFieldValue action', async () => {
  const executor = new FieldActionExecutor();
  const mockSetFieldValue = jest.fn();
  
  const action = ['setFieldValue', { field: 'target', value: 'test' }];
  const context = {
    fieldValue: 'source_value',
    formData: {},
    setFieldValue: mockSetFieldValue,
    setFieldOption: jest.fn(),
    evaluateFormula: jest.fn()
  };
  
  await executor.executeAction(action, context);
  
  expect(mockSetFieldValue).toHaveBeenCalledWith('target', 'test');
});
```

For more information, see:
- [FieldActions.types.ts](./FieldActions.types.ts) - Complete TypeScript definitions
- [DocyFieldBase.md](../form/DocyFieldBase.md) - Base form field component
- [JSONata Documentation](https://docs.jsonata.org/) - JSONata query language reference