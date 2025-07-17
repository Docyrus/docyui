# React Components Utilities

This folder contains utility functions and type definitions for the React component migration project.

## Files Overview

### FilterQuery.types.ts
Complete TypeScript definitions for FilterQuery objects used in computed properties like `computedHidden`, `computedRequired`, `computedReadOnly`, and `computedDisabled`.

**Key Features:**
- `FilterQuery` and `FilterRule` interfaces
- Complete `FilterOperator` and `FilterType` enums
- Type guards for runtime type checking
- Example FilterQuery objects for documentation

### FilterJsonataTransformer.js
Native JavaScript class that converts FilterQuery objects to JSONata expressions for data filtering.

**Key Features:**
- Converts FilterQuery objects to JSONata syntax
- Supports all date operators (today, last_30_days, etc.)
- Handles user-specific operators (active_user)
- Built-in date utilities (no external dependencies)
- Validation methods for FilterQuery structure
- Comprehensive operator support

### FilterQuery.examples.md
Comprehensive usage examples and best practices for FilterQuery objects in React components.

**Includes:**
- Basic and advanced FilterQuery examples
- React component integration examples
- Real-world use cases
- Best practices and guidelines
- Complete operator reference

### FieldActions.types.ts
Complete TypeScript definitions for the FieldActions system that enables declarative field interactions.

**Key Features:**
- `FieldActions` and `FieldAction` interfaces
- Action types: `setFieldValue`, `setFieldValueCalculated`, `setFieldOption`, `setFieldOptionCalculated`
- Conditional actions with JSONata expressions
- Type guards for runtime type checking
- Action validation schemas and examples

### FieldActions.examples.md
Comprehensive usage examples and best practices for the FieldActions system in React components.

**Includes:**
- Basic and advanced FieldActions examples
- Real-world use cases (e-commerce, user registration)
- JSONata formula examples
- Best practices for action design
- Testing strategies for actions

### CustomValidation.types.ts
Complete TypeScript definitions for custom validation system using JSONata formulas.

**Key Features:**
- `CustomValidation` interface for JSONata-based validation rules
- `ValidationContext` and `ValidationResult` interfaces
- Common JSONata validation patterns and examples
- Helper functions for validation creation and formula validation
- Type guards for runtime type checking

## Usage in Components

### FilterQuery Example

```tsx
import { FilterQuery } from './utils/FilterQuery.types';

// Hide field if user is not admin
const hiddenCondition: FilterQuery = {
  combinator: 'and',
  rules: [
    {
      field: 'userRole',
      operator: '!=',
      value: 'admin',
      filterType: 'ALPHA'
    }
  ]
};

<DocyFieldText
  name="adminField"
  label="Admin Only Field"
  computedHidden={hiddenCondition}
/>
```

### FieldActions Example

```tsx
import { FieldActions } from './utils/FieldActions.types';

// When quantity changes, calculate total
const changeActions: FieldActions = {
  change: [
    ['setFieldValueCalculated', {
      field: 'total',
      formula: 'quantity * price'
    }]
  ]
};

<DocyFieldText
  name="quantity"
  label="Quantity"
  actions={changeActions}
/>
```

### CustomValidation Example

```tsx
import { CustomValidation } from './utils/CustomValidation.types';

// Complex business logic validation
const customValidations: CustomValidation[] = [
  {
    formula: 'user_role = "admin" and discount_percentage > 50',
    message: 'Admin users cannot apply discounts greater than 50%'
  },
  {
    formula: 'order_total < 100 and discount_percentage > 10',
    message: 'Discounts greater than 10% require minimum order of $100'
  }
];

<DocyFieldText
  name="discountPercentage"
  label="Discount Percentage"
  customValidations={customValidations}
/>
```

### Using the Transformer

```tsx
import { FilterJsonataTransformer } from './utils/FilterJsonataTransformer';

const transformer = new FilterJsonataTransformer({
  currentUser: { userId: '123', fullname: 'John Doe' },
  criterias: [],
  users: []
});

const jsonataExpression = transformer.getJsonataQuery(filterQuery);
```

## Key Concepts

### FilterQuery Structure
```typescript
interface FilterQuery {
  combinator: 'and' | 'or';
  rules: (FilterRule | FilterQuery)[];
}

interface FilterRule {
  field: string;           // Field name in form data
  operator: FilterOperator; // Comparison operator
  value: any;              // Value to compare against
  filterType: FilterType;   // Type of field for proper handling
}
```

### Supported Field Types
- `ALPHA` - Text/string fields
- `NUMERIC` - Number fields
- `DATE`, `DATE_TIME`, `TIME` - Date/time fields
- `BOOLEAN` - Boolean fields
- `LIST`, `MULTI_SELECT` - Array fields
- `OWNER`, `RELATION` - Object reference fields
- `APPROVAL_STATUS` - Approval workflow fields

### Common Operators
- **Basic**: `=`, `!=`, `>`, `>=`, `<`, `<=`
- **Text**: `like`, `starts with`, `ends with`, `not like`
- **Boolean**: `true`, `false`, `empty`, `not empty`
- **Date**: `today`, `last_30_days`, `this_month`, etc.
- **User**: `active_user`

## Integration with DocyFieldBase

FilterQuery objects are used in DocyFieldBase computed properties:

```tsx
<DocyFieldBase
  name="conditionalField"
  label="Conditional Field"
  computedHidden={hiddenFilterQuery}
  computedRequired={requiredFilterQuery}
  computedReadOnly={readOnlyFilterQuery}
  computedDisabled={disabledFilterQuery}
>
  {/* Field content */}
</DocyFieldBase>
```

## Benefits

1. **Type Safety**: Complete TypeScript definitions prevent runtime errors
2. **Flexibility**: Supports simple and complex conditional logic
3. **Reusability**: FilterQuery objects can be shared across components
4. **Performance**: Efficient JSONata conversion for data filtering
5. **Maintainability**: Clear structure makes conditions easy to understand
6. **Extensibility**: Easy to add new operators and field types

## Related Documentation

- [DocyFieldBase](../form/DocyFieldBase.md) - Base form field component
- [DocyFieldText](../form/DocyFieldText.md) - Text input field component
- [JSONata Documentation](https://docs.jsonata.org/overview.html) - JSONata query language reference

## Development Notes

- FilterQuery objects replace simple boolean/string conditions for computed properties
- The transformer class is framework-agnostic and can be used in any JavaScript environment
- All date operations are relative to the current time when the transformer is executed
- User-specific operators require proper user context in the transformer configuration