# DocyFieldBase Component

## Overview
DocyFieldBase is the foundational wrapper component that provides common functionality and structure for ALL form field components in the Docyrus platform (except DocyFormView and DocyFieldset). It serves as a wrapper component that handles shared behaviors like validation, labels, help text, error display, accessibility features, form integration, and dynamic computed properties.

This component is designed to be used by all other form field components such as DocyFieldText, DocyFieldSelect, DocyFieldCheckbox, etc., ensuring consistency across the form system while providing a flexible foundation for different field types.

## Component Specification

### Props
| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `name` | string | - | Yes | Field name for form identification and validation |
| `fieldId` | string | - | No | Unique field identifier |
| `validations` | ValidationRule[] | [] | No | Array of validation rules |
| `actions` | FieldActions | {} | No | Field action handlers and callbacks |
| `hidden` | boolean | false | No | Whether field is hidden |
| `forceReadOnly` | boolean | false | No | Force read-only mode regardless of other settings |
| `readOnly` | boolean | null | No | Whether field is read-only |
| `clickToEdit` | boolean | false | No | Enable click-to-edit functionality |
| `label` | string | - | No | Field label text |
| `description` | string | - | No | Additional field description |
| `help` | string | - | No | Help text with tooltip |
| `agentDescription` | string | - | No | AI agent description for context |
| `typeformLabel` | string | - | No | Label used for typeform integration |
| `hideLabel` | boolean | false | No | Whether to hide the label |
| `fieldLabelIcon` | string | - | No | Icon to show in label |
| `columnSpan` | number \| number[] | 1 | No | Grid column span (responsive array supported) |
| `rowSpan` | number \| number[] | 1 | No | Grid row span (responsive array supported) |
| `labelAlign` | string | - | No | Label alignment |
| `labelWidth` | number \| string | - | No | Fixed label width |
| `labelSize` | string | - | No | Label text size |
| `placeholder` | string | - | No | Placeholder text for input fields |
| `collapsible` | boolean | false | No | Whether field can be collapsed |
| `defaultCollapsed` | boolean | false | No | Default collapsed state |
| `disabled` | boolean | false | No | Whether field is disabled |
| `disabledMessage` | string | - | No | Tooltip message when disabled |
| `inline` | boolean | false | No | Whether field should be inline |
| `isolated` | boolean | false | No | Whether field should be isolated from form context |
| `defaultValue` | any | null | No | Default field value |
| `preventKeyEnter` | boolean | false | No | Prevent enter key default behavior |
| `size` | string | 'sm' | No | Field size |
| `variant` | string | - | No | Field visual variant |
| `showFieldLabelIcon` | boolean | true | No | Whether to show field type icon in label |
| `corners` | string | - | No | Border radius style |
| `validationMessagePlacement` | 'outside' \| 'inside' | 'outside' | No | Where to place validation messages |
| `required` | boolean | - | No | Whether field is required |
| `computedHidden` | string \| FilterQuery | null | No | FilterQuery rules for dynamic hidden state |
| `computedDisabled` | string \| FilterQuery | null | No | FilterQuery rules for dynamic disabled state |
| `computedReadonly` | string \| FilterQuery | null | No | FilterQuery rules for dynamic readonly state |
| `computedRequired` | string \| FilterQuery | null | No | FilterQuery rules for dynamic required state |
| `computedLabel` | string | null | No | JSONata script for dynamic label generation |
| `computedDescription` | string | null | No | JSONata script for dynamic description generation |
| `computedFormula` | string | null | No | JSONata script for dynamic value calculation |
| `customValidations` | CustomValidation[] | null | No | Additional custom validation rules with JSONata formulas |

### TypeScript Interfaces

```typescript
interface ValidationRule {
  type: string;
  message: string;
  value?: any;
  options?: Record<string, any>;
}

interface CustomValidation {
  formula: string; // JSONata formula for validation logic
  message: string; // Error message to display when validation fails
}

// FieldActions for declarative action system
// See: docs/react-components/utils/FieldActions.types.ts
interface FieldActions {
  change?: FieldAction[]; // Actions to execute on field change
}

type FieldAction = 
  | ['setFieldValue', { field: string; value: any }]
  | ['setFieldValueCalculated', { field: string; formula: string }]
  | ['setFieldOption', { field: string; option: string; value: any }]
  | ['setFieldOptionCalculated', { field: string; option: string; formula: string }]
  | ['condition', string, FieldAction[]];

// FilterQuery for conditional logic evaluation
// See: docs/react-components/utils/FilterQuery.types.ts
interface FilterQuery {
  combinator: 'and' | 'or';
  rules: (FilterRule | FilterQuery)[];
}

interface FilterRule {
  field: string;
  operator: string;
  value: any;
  filterType: 'ALPHA' | 'NUMERIC' | 'LIST' | 'DATE' | 'DATE_TIME' | 'TIME' | 'OWNER' | 'MULTI_SELECT' | 'RELATION' | 'APPROVAL_STATUS' | 'BOOLEAN';
}
```

### Behavior

1. **Form Integration**:
   - Integrates with React Hook Form for validation and state management
   - Provides consistent field registration and error handling
   - Supports isolated mode for standalone field usage

2. **Dynamic Computed Properties**:
   - **computedLabel, computedDescription, computedFormula**: JSONata scripts for dynamic content generation (see [JSONata Documentation](https://docs.jsonata.org/overview.html))
   - **computedHidden, computedRequired, computedReadOnly, computedDisabled**: FilterQuery objects for conditional logic
   - Real-time evaluation based on form context and data changes

3. **Layout Management**:
   - Responsive grid system with columnSpan and rowSpan arrays
   - Flexible label positioning and sizing
   - Collapsible field sections with animation support

4. **Validation System**:
   - Built-in validation rules with custom message support
   - Real-time validation feedback with configurable placement
   - Custom validation using JSONata formulas for complex business logic
   - Configurable validation message placement (inside/outside field)

5. **Actions System**:
   - Declarative action system using JSON notation
   - Triggered on field events (currently 'change' event)
   - Actions can modify other fields' values or options
   - Support for conditional actions with JSONata expressions
   - Available actions:
     - `setFieldValue`: Set another field's value to a static value
     - `setFieldValueCalculated`: Set another field's value using JSONata formula
     - `setFieldOption`: Set another field's option (hidden, disabled, required, etc.)
     - `setFieldOptionCalculated`: Set another field's option using JSONata formula
     - `condition`: Execute nested actions only if JSONata condition is true

6. **Dynamic Content Generation**:
   - JSONata-based computed properties for labels, descriptions, and values
   - FilterQuery-based conditional logic for field states
   - Real-time evaluation based on form context changes

## Component Requirements

### Technical Specifications
- **Framework**: React 18+ with TypeScript
- **Base Component**: Custom implementation (no direct shadcn/ui equivalent)
- **Integration**: Uses shadcn/ui patterns for consistent styling and Label components
- **Styling**: shadcn/ui patterns with Tailwind CSS v4
- **Form Library**: React Hook Form integration
- **JSONata**: For computed formula evaluation
- **FilterQuery**: For conditional logic evaluation (specification pending)
- **Accessibility**: WCAG 2.1 AA compliance

### Key Features Required
1. **Consistent Field Structure**: Standardized layout for all field types
2. **Validation Integration**: Seamless React Hook Form integration with JSONata custom validations
3. **Dynamic Behavior**: Real-time computed property evaluation
4. **Actions System**: Declarative field interaction handling with JSONata support
5. **Responsive Design**: Mobile-first responsive layout system
6. **Accessibility**: Complete keyboard navigation and screen reader support
7. **Theme Integration**: Consistent with shadcn/ui design system

### Usage Examples

```tsx
// Basic wrapper usage (how other field components will use DocyFieldBase)
<DocyFieldBase
  name="username"
  label="Username"
  required={true}
  validations={[
    { type: 'minLength', value: 3, message: 'Username must be at least 3 characters' }
  ]}
>
  <Input placeholder="Enter username" />
</DocyFieldBase>

// With dynamic computed properties
<DocyFieldBase
  name="displayName"
  computedLabel="'Full Name: ' & firstName & ' ' & lastName"
  computedRequired={{ field: 'userType', operator: 'equals', value: 'admin' }}
  computedHidden={{ field: 'showAdvanced', operator: 'equals', value: false }}
>
  <Input />
</DocyFieldBase>

// With agent description for context
<DocyFieldBase
  name="jobDescription"
  label="Job Description"
  agentDescription="This field contains the main job description for the position"
>
  <Textarea />
</DocyFieldBase>

// Grid layout with responsive spans
<DocyFieldBase
  name="address"
  label="Address"
  columnSpan={[12, 6, 4]} // Mobile: 12 cols, Tablet: 6 cols, Desktop: 4 cols
  rowSpan={2}
>
  <Textarea />
</DocyFieldBase>

// With computed formula
<DocyFieldBase
  name="total"
  label="Total Amount"
  computedFormula="price * quantity * (1 + taxRate)"
>
  <Input type="number" disabled />
</DocyFieldBase>

// Collapsible field section
<DocyFieldBase
  name="advancedOptions"
  label="Advanced Options"
  collapsible={true}
  defaultCollapsed={true}
>
  <div className="space-y-4">
    {/* Advanced field content */}
  </div>
</DocyFieldBase>

// Click-to-edit mode
<DocyFieldBase
  name="title"
  label="Title"
  clickToEdit={true}
  readOnly={!isEditing}
>
  <Input />
</DocyFieldBase>

// Field with actions - set static value
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

// Field with calculated actions
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

// Field with conditional actions
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

// Field with option actions
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

// Field with calculated option actions
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

// Field with multiple complex actions
<DocyFieldBase
  name="productType"
  label="Product Type"
  actions={{
    change: [
      ['setFieldValue', {
        field: 'requires_shipping',
        value: true
      }],
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

// Field with custom validations using JSONata formulas
<DocyFieldBase
  name="email"
  label="Email Address"
  validations={[
    { type: 'required', message: 'Email is required' },
    { type: 'email', message: 'Please enter a valid email address' }
  ]}
  customValidations={[
    {
      formula: '$not($contains(email, "@company.com"))',
      message: 'Please use your company email address'
    },
    {
      formula: '$length(email) < 5',
      message: 'Email address is too short'
    }
  ]}
>
  <Input type="email" />
</DocyFieldBase>

// Field with complex business logic validation
<DocyFieldBase
  name="discountPercentage"
  label="Discount Percentage"
  customValidations={[
    {
      formula: 'user_role = "admin" and discount_percentage > 50',
      message: 'Admin users cannot apply discounts greater than 50%'
    },
    {
      formula: 'user_role != "admin" and discount_percentage > 20',
      message: 'Regular users cannot apply discounts greater than 20%'
    },
    {
      formula: 'order_total < 100 and discount_percentage > 10',
      message: 'Discounts greater than 10% require minimum order of $100'
    }
  ]}
>
  <Input type="number" />
</DocyFieldBase>
```

### Integration Requirements
- **DocyIcon**: For field label icons and validation indicators
- **DocyToast**: For validation error notifications
- **JSONata Library**: For computed formula evaluation and action formulas
- **FilterQuery Engine**: For conditional logic evaluation
- **FieldActions System**: For declarative field interaction handling

### Dependencies Required
- `react-hook-form`: Form state management and validation
- `@hookform/resolvers`: Validation schema resolvers
- `jsonata`: For computed formula evaluation
- `class-variance-authority`: Variant management
- `@radix-ui/react-tooltip`: Help text tooltips
- `@radix-ui/react-collapsible`: Collapsible field support

### Testing Requirements
1. **Unit Tests**: Props validation, computed properties, field interactions, action execution
2. **Integration Tests**: React Hook Form integration, validation flow, field actions
3. **Visual Tests**: All size variants, layout configurations, responsive behavior
4. **Accessibility Tests**: ARIA attributes, keyboard navigation, screen reader support
5. **Performance Tests**: Large form rendering, computed property evaluation, action processing
6. **Action Tests**: Action validation, conditional execution, formula evaluation, field updates
7. **Custom Validation Tests**: JSONata formula validation, error message display, business logic validation

## Development Priority
**High** - Foundational component that ALL other form field components depend on

## Notes
- Built with modern shadcn/ui patterns for consistency with design system
- Designed to be extremely flexible while maintaining consistency
- JSONata expressions provide powerful dynamic content generation
- FilterQuery objects enable complex conditional logic
- Responsive design system supports all device types
- Complete accessibility compliance for inclusive user experience