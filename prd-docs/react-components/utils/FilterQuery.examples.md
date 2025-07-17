# FilterQuery Usage Examples

This document provides comprehensive examples of how to use FilterQuery objects with the FilterJsonataTransformer in React components.

## Overview

FilterQuery objects are used in computed properties like `computedHidden`, `computedRequired`, `computedReadOnly`, and `computedDisabled` to create dynamic conditional logic in form fields.

## Basic Usage

### Simple Equality Check

```typescript
// Show field only if user type is 'admin'
const computedHidden: FilterQuery = {
  combinator: 'and',
  rules: [
    {
      field: 'userType',
      operator: '=',
      value: 'admin',
      filterType: 'ALPHA'
    }
  ]
};
```

### Numeric Comparison

```typescript
// Require field only if score is greater than 80
const computedRequired: FilterQuery = {
  combinator: 'and',
  rules: [
    {
      field: 'score',
      operator: '>',
      value: 80,
      filterType: 'NUMERIC'
    }
  ]
};
```

### Array/Multi-select Values

```typescript
// Hide field if any of the specified roles are selected
const computedHidden: FilterQuery = {
  combinator: 'and',
  rules: [
    {
      field: 'userRoles',
      operator: '=',
      value: ['guest', 'viewer'],
      filterType: 'MULTI_SELECT'
    }
  ]
};
```

## Advanced Examples

### Multiple Conditions with AND

```typescript
// Field is read-only if status is 'published' AND user is not editor
const computedReadOnly: FilterQuery = {
  combinator: 'and',
  rules: [
    {
      field: 'status',
      operator: '=',
      value: 'published',
      filterType: 'ALPHA'
    },
    {
      field: 'userRole',
      operator: '!=',
      value: 'editor',
      filterType: 'ALPHA'
    }
  ]
};
```

### Multiple Conditions with OR

```typescript
// Hide field if user is guest OR if feature is disabled
const computedHidden: FilterQuery = {
  combinator: 'or',
  rules: [
    {
      field: 'userType',
      operator: '=',
      value: 'guest',
      filterType: 'ALPHA'
    },
    {
      field: 'advancedFeaturesEnabled',
      operator: 'false',
      value: null,
      filterType: 'BOOLEAN'
    }
  ]
};
```

### Nested FilterQuery

```typescript
// Complex condition: (department = 'engineering' AND level = 'senior') OR (experience >= 10)
const computedRequired: FilterQuery = {
  combinator: 'or',
  rules: [
    {
      combinator: 'and',
      rules: [
        {
          field: 'department',
          operator: '=',
          value: 'engineering',
          filterType: 'ALPHA'
        },
        {
          field: 'level',
          operator: '=',
          value: 'senior',
          filterType: 'ALPHA'
        }
      ]
    },
    {
      field: 'experience',
      operator: '>=',
      value: 10,
      filterType: 'NUMERIC'
    }
  ]
};
```

## Date-based Examples

### Current User

```typescript
// Show field only for the currently logged-in user
const computedHidden: FilterQuery = {
  combinator: 'and',
  rules: [
    {
      field: 'assignedTo',
      operator: 'active_user',
      value: null,
      filterType: 'OWNER'
    }
  ]
};
```

### Date Ranges

```typescript
// Require field for recent records (last 30 days)
const computedRequired: FilterQuery = {
  combinator: 'and',
  rules: [
    {
      field: 'createdAt',
      operator: 'last_30_days',
      value: null,
      filterType: 'DATE_TIME'
    }
  ]
};
```

### Specific Date Comparisons

```typescript
// Hide field for future dates
const computedHidden: FilterQuery = {
  combinator: 'and',
  rules: [
    {
      field: 'dueDate',
      operator: 'after_today',
      value: null,
      filterType: 'DATE'
    }
  ]
};
```

## Empty/Null Checks

### Empty Field Check

```typescript
// Require field only if another field is not empty
const computedRequired: FilterQuery = {
  combinator: 'and',
  rules: [
    {
      field: 'parentCategory',
      operator: 'not empty',
      value: null,
      filterType: 'ALPHA'
    }
  ]
};
```

### Boolean Field Check

```typescript
// Disable field if checkbox is not checked
const computedDisabled: FilterQuery = {
  combinator: 'and',
  rules: [
    {
      field: 'agreementAccepted',
      operator: 'false',
      value: null,
      filterType: 'BOOLEAN'
    }
  ]
};
```

## React Component Usage

### Basic Form Field with Dynamic Visibility

```tsx
import { FilterQuery } from '../utils/FilterQuery.types';

const MyFormField = () => {
  const hiddenCondition: FilterQuery = {
    combinator: 'and',
    rules: [
      {
        field: 'showAdvanced',
        operator: 'false',
        value: null,
        filterType: 'BOOLEAN'
      }
    ]
  };

  return (
    <DocyFieldText
      name="advancedSetting"
      label="Advanced Setting"
      computedHidden={hiddenCondition}
      placeholder="Enter advanced configuration"
    />
  );
};
```

### Multiple Conditional Properties

```tsx
const ConditionalField = () => {
  const requiredCondition: FilterQuery = {
    combinator: 'and',
    rules: [
      {
        field: 'accountType',
        operator: '=',
        value: 'business',
        filterType: 'ALPHA'
      }
    ]
  };

  const readOnlyCondition: FilterQuery = {
    combinator: 'or',
    rules: [
      {
        field: 'status',
        operator: '=',
        value: 'locked',
        filterType: 'ALPHA'
      },
      {
        field: 'userRole',
        operator: '=',
        value: 'viewer',
        filterType: 'ALPHA'
      }
    ]
  };

  return (
    <DocyFieldText
      name="businessName"
      label="Business Name"
      computedRequired={requiredCondition}
      computedReadOnly={readOnlyCondition}
    />
  );
};
```

### Using FilterJsonataTransformer

```tsx
import { FilterJsonataTransformer } from '../utils/FilterJsonataTransformer';
import { FilterQuery } from '../utils/FilterQuery.types';

const FormComponent = () => {
  const transformer = new FilterJsonataTransformer({
    currentUser: { userId: '123', fullname: 'John Doe' },
    criterias: [],
    users: []
  });

  const condition: FilterQuery = {
    combinator: 'and',
    rules: [
      {
        field: 'priority',
        operator: '>',
        value: 3,
        filterType: 'NUMERIC'
      }
    ]
  };

  // Convert to JSONata expression
  const jsonataExpression = transformer.getJsonataQuery(condition);
  console.log(jsonataExpression); // "(priority > 3)"

  return (
    <DocyFieldText
      name="urgentTask"
      label="Urgent Task Details"
      computedRequired={condition}
    />
  );
};
```

## Complex Real-world Examples

### Project Management Form

```tsx
const ProjectTaskField = () => {
  // Hide task details if project is not selected
  const hiddenCondition: FilterQuery = {
    combinator: 'or',
    rules: [
      {
        field: 'projectId',
        operator: 'empty',
        value: null,
        filterType: 'RELATION'
      },
      {
        field: 'projectStatus',
        operator: '=',
        value: 'archived',
        filterType: 'ALPHA'
      }
    ]
  };

  // Require assignee for high priority tasks
  const requiredCondition: FilterQuery = {
    combinator: 'and',
    rules: [
      {
        field: 'priority',
        operator: '>=',
        value: 4,
        filterType: 'NUMERIC'
      },
      {
        field: 'taskType',
        operator: '!=',
        value: 'documentation',
        filterType: 'ALPHA'
      }
    ]
  };

  return (
    <DocyFieldText
      name="assignee"
      label="Task Assignee"
      computedHidden={hiddenCondition}
      computedRequired={requiredCondition}
    />
  );
};
```

### User Permission-based Field

```tsx
const AdminOnlyField = () => {
  // Field is read-only unless user is admin and feature is enabled
  const readOnlyCondition: FilterQuery = {
    combinator: 'or',
    rules: [
      {
        field: 'userRole',
        operator: '!=',
        value: 'admin',
        filterType: 'ALPHA'
      },
      {
        combinator: 'and',
        rules: [
          {
            field: 'adminFeaturesEnabled',
            operator: 'false',
            value: null,
            filterType: 'BOOLEAN'
          },
          {
            field: 'maintenanceMode',
            operator: 'true',
            value: null,
            filterType: 'BOOLEAN'
          }
        ]
      }
    ]
  };

  return (
    <DocyFieldText
      name="systemConfiguration"
      label="System Configuration"
      computedReadOnly={readOnlyCondition}
    />
  );
};
```

## Validation and Error Handling

```tsx
import { FilterJsonataTransformer } from '../utils/FilterJsonataTransformer';

const ValidatedFilterField = () => {
  const transformer = new FilterJsonataTransformer({
    currentUser: { userId: '123', fullname: 'John Doe' }
  });

  const condition: FilterQuery = {
    combinator: 'and',
    rules: [
      {
        field: 'status',
        operator: '=',
        value: 'active',
        filterType: 'ALPHA'
      }
    ]
  };

  // Validate FilterQuery structure
  const validation = transformer.validateFilterQuery(condition);
  if (!validation.valid) {
    console.error('Invalid FilterQuery:', validation.error);
    return null;
  }

  // Convert to JSONata
  const jsonataExpression = transformer.getJsonataQuery(condition);

  return (
    <DocyFieldText
      name="activeUserField"
      label="Active User Field"
      computedRequired={condition}
    />
  );
};
```

## Best Practices

1. **Always specify filterType** - This ensures proper value handling and comparison
2. **Use meaningful field names** - Field names should match your form data structure
3. **Validate FilterQuery objects** - Use the transformer's validation method
4. **Keep conditions simple** - Complex nested conditions can be hard to debug
5. **Document complex logic** - Add comments for complex conditional logic
6. **Test edge cases** - Test with empty values, null values, and missing fields

## Available Operators

### Basic Operators
- `=` - Equals
- `!=`, `<>` - Not equals
- `>`, `>=`, `<`, `<=` - Comparison operators

### Text Operators
- `like` - Contains
- `not like` - Does not contain
- `starts with` - Starts with text
- `ends with` - Ends with text

### Boolean/Null Operators
- `true` - Is true
- `false` - Is false
- `empty` - Is null/empty
- `not empty` - Is not null/empty

### Date Operators
- `today`, `tomorrow`, `yesterday`
- `this_week`, `last_week`, `next_week`
- `this_month`, `last_month`, `next_month`
- `this_year`, `last_year`, `next_year`
- `last_7_days`, `last_30_days`, `next_30_days`, etc.

### User Operators
- `active_user` - Current logged-in user

See `FilterQuery.types.ts` for the complete list of available operators.