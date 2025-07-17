# DocyFieldList Component

## Overview
DocyFieldList is a powerful dynamic list management component that extends DocyFieldBase to provide comprehensive list functionality. This is a custom implementation using shadcn/ui design patterns, specifically designed to handle dynamic arrays of data with nested field structures. The component enables users to add, remove, reorder, and manage collections of items where each item can contain multiple fields with complex validation and interaction logic.

Unlike basic array inputs, DocyFieldList provides a complete interface for managing collections of structured data, making it ideal for scenarios like managing multiple addresses, contact entries, product variants, or any repeatable form sections. Each list item can contain its own nested fields with independent validation, actions, and computed properties.

## Component Specification

### Props
DocyFieldList inherits ALL props from DocyFieldBase and adds the following list-specific properties:

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `itemFields` | FieldDefinition[] | [] | Yes | Field definitions for each item in the list |
| `minItems` | number | 0 | No | Minimum number of items required |
| `maxItems` | number | - | No | Maximum number of items allowed |
| `defaultItem` | object | {} | No | Default template for new items |
| `showAddButton` | boolean | true | No | Show add item button |
| `addButtonText` | string | 'Add Item' | No | Text for add item button |
| `showRemoveButton` | boolean | true | No | Show remove item button |
| `showReorder` | boolean | false | No | Enable item reordering |
| `reorderMethod` | 'drag' \| 'buttons' | 'drag' | No | Method for reordering items |
| `showItemNumbers` | boolean | true | No | Show item numbers/indices |
| `itemNumberStart` | number | 1 | No | Starting number for item numbering |
| `showItemTitle` | boolean | true | No | Show item title/header |
| `itemTitleField` | string | - | No | Field name to use for item title |
| `itemTitleTemplate` | string | - | No | JSONata template for dynamic item titles |
| `collapsible` | boolean | false | No | Items can be collapsed/expanded |
| `defaultCollapsed` | boolean | false | No | Items collapsed by default |
| `onItemAdd` | (item: object, index: number) => void | - | No | Callback when item is added |
| `onItemRemove` | (item: object, index: number) => void | - | No | Callback when item is removed |
| `onItemMove` | (fromIndex: number, toIndex: number) => void | - | No | Callback when item is moved |
| `onItemChange` | (item: object, index: number, field: string, value: any) => void | - | No | Callback when item field changes |
| `validateItem` | (item: object, index: number) => ValidationResult | - | No | Custom item validation function |
| `layout` | 'vertical' \| 'horizontal' \| 'grid' | 'vertical' | No | Layout mode for list items |
| `spacing` | 'none' \| 'sm' \| 'md' \| 'lg' | 'md' | No | Spacing between items |
| `itemClassName` | string | - | No | CSS class for item containers |
| `addButtonPosition` | 'top' \| 'bottom' \| 'both' | 'bottom' | No | Position of add button |
| `emptyText` | string | 'No items added yet' | No | Text shown when list is empty |
| `sortable` | boolean | false | No | Enable sorting with drag handles |
| `sortField` | string | - | No | Field name for automatic sorting |
| `sortOrder` | 'asc' \| 'desc' | 'asc' | No | Sort order for automatic sorting |
| `showItemActions` | boolean | true | No | Show item action buttons |
| `itemActions` | ItemAction[] | [] | No | Custom action buttons for each item |
| `allowDuplicates` | boolean | true | No | Allow duplicate items |
| `duplicateCheck` | (item: object, items: object[]) => boolean | - | No | Custom duplicate check function |
| `animateChanges` | boolean | true | No | Animate item add/remove/reorder |
| `virtualized` | boolean | false | No | Enable virtualization for large lists |
| `itemHeight` | number | - | No | Fixed height for virtual scrolling |
| `maxVisibleItems` | number | - | No | Maximum visible items before scrolling |

**Note**: DocyFieldList inherits all DocyFieldBase props including validation, layout, dynamic computed properties, actions, and more. See [DocyFieldBase documentation](./DocyFieldBase.md) for the complete list.

### TypeScript Interfaces

```typescript
interface FieldDefinition {
  name: string;
  type: string;
  label?: string;
  required?: boolean;
  validation?: ValidationRule[];
  props?: Record<string, any>;
  columnSpan?: number | number[];
  computedHidden?: FilterQuery;
  computedRequired?: FilterQuery;
  computedDisabled?: FilterQuery;
  actions?: FieldActions;
}

interface ValidationResult {
  valid: boolean;
  errors?: string[];
  warnings?: string[];
}

interface ItemAction {
  id: string;
  label: string;
  icon?: string;
  variant?: 'default' | 'destructive' | 'outline' | 'ghost';
  disabled?: boolean;
  onClick: (item: object, index: number) => void;
  condition?: (item: object, index: number) => boolean;
}

interface ListLayoutConfig {
  layout: 'vertical' | 'horizontal' | 'grid';
  spacing: 'none' | 'sm' | 'md' | 'lg';
  columns?: number; // For grid layout
  responsive?: boolean;
}

interface ListReorderConfig {
  showReorder: boolean;
  reorderMethod: 'drag' | 'buttons';
  sortable: boolean;
  sortField?: string;
  sortOrder: 'asc' | 'desc';
  animateChanges: boolean;
}

interface ListItemConfig {
  showItemNumbers: boolean;
  itemNumberStart: number;
  showItemTitle: boolean;
  itemTitleField?: string;
  itemTitleTemplate?: string;
  collapsible: boolean;
  defaultCollapsed: boolean;
  showItemActions: boolean;
  itemActions: ItemAction[];
}

interface ListValidationConfig {
  minItems: number;
  maxItems?: number;
  allowDuplicates: boolean;
  duplicateCheck?: (item: object, items: object[]) => boolean;
  validateItem?: (item: object, index: number) => ValidationResult;
}

interface ListVirtualizationConfig {
  virtualized: boolean;
  itemHeight?: number;
  maxVisibleItems?: number;
  overscan?: number;
}
```

### Behavior

1. **Dynamic List Management**:
   - Add/remove items dynamically with validation
   - Automatic item indexing and numbering
   - Configurable minimum and maximum item limits
   - Default item templates for consistent structure

2. **Nested Field Support**:
   - Each item contains its own field definitions
   - Independent validation per item and field
   - Computed properties within item context
   - Actions that can affect other items or fields

3. **Reordering and Sorting**:
   - Drag-and-drop reordering with visual feedback
   - Button-based reordering for accessibility
   - Automatic sorting by specified field
   - Animated transitions for smooth UX

4. **Item Display and Organization**:
   - Collapsible items for space efficiency
   - Custom item titles with dynamic templates
   - Configurable numbering and labeling
   - Multiple layout modes (vertical, horizontal, grid)

5. **Validation and Data Integrity**:
   - Per-item validation with custom rules
   - Duplicate detection with custom logic
   - Required field validation within items
   - Form-level validation integration

6. **Performance Optimization**:
   - Virtual scrolling for large lists
   - Lazy loading of item content
   - Efficient re-rendering with React keys
   - Debounced validation and actions

## Component Requirements

### Technical Specifications
- **Framework**: React 18+ with TypeScript
- **Base Component**: Custom implementation using shadcn/ui design patterns
- **UI Components**: Built with shadcn/ui Button, Card, Collapsible, and other components
- **Wrapper**: Extends DocyFieldBase for consistent field structure
- **Styling**: shadcn/ui patterns with Tailwind CSS v4
- **Drag & Drop**: @dnd-kit/core for accessible drag-and-drop functionality
- **Animation**: framer-motion for smooth transitions
- **Virtualization**: react-window for large list performance
- **Accessibility**: WCAG 2.1 AA compliance with full keyboard navigation

### Key Features Required
1. **Dynamic Item Management**: Add, remove, and modify list items with validation
2. **Nested Field Support**: Complete field definition system within each item
3. **Reordering Interface**: Drag-and-drop and button-based reordering
4. **Flexible Layout**: Support for vertical, horizontal, and grid layouts
5. **Validation System**: Item-level and field-level validation with custom rules
6. **Performance Optimization**: Virtual scrolling and efficient rendering
7. **Accessibility**: Complete keyboard navigation and screen reader support

### Usage Examples

```tsx
// Basic contact list
<DocyFieldList
  name="contacts"
  label="Contact Information"
  itemFields={[
    { name: 'name', type: 'text', label: 'Name', required: true },
    { name: 'email', type: 'email', label: 'Email', required: true },
    { name: 'phone', type: 'phone', label: 'Phone' },
    { name: 'type', type: 'select', label: 'Type', props: {
      options: [
        { value: 'home', label: 'Home' },
        { value: 'work', label: 'Work' },
        { value: 'mobile', label: 'Mobile' }
      ]
    }}
  ]}
  minItems={1}
  maxItems={5}
  itemTitleField="name"
  showItemNumbers={true}
  required={true}
/>

// Product variants with validation
<DocyFieldList
  name="productVariants"
  label="Product Variants"
  itemFields={[
    { name: 'sku', type: 'text', label: 'SKU', required: true },
    { name: 'name', type: 'text', label: 'Variant Name', required: true },
    { name: 'price', type: 'money', label: 'Price', required: true },
    { name: 'stock', type: 'number', label: 'Stock Quantity' },
    { name: 'attributes', type: 'selectMulti', label: 'Attributes', props: {
      options: variantAttributes
    }}
  ]}
  minItems={1}
  allowDuplicates={false}
  duplicateCheck={(item, items) => 
    items.some(existing => existing.sku === item.sku)
  }
  validateItem={(item, index) => {
    const errors = [];
    if (item.price <= 0) errors.push('Price must be greater than 0');
    if (item.stock < 0) errors.push('Stock cannot be negative');
    return { valid: errors.length === 0, errors };
  }}
  itemTitleTemplate="name + ' (' + sku + ')'"
  showReorder={true}
  reorderMethod="drag"
/>

// Address collection with collapsible items
<DocyFieldList
  name="addresses"
  label="Addresses"
  itemFields={[
    { name: 'type', type: 'select', label: 'Type', props: {
      options: [
        { value: 'home', label: 'Home' },
        { value: 'work', label: 'Work' },
        { value: 'billing', label: 'Billing' },
        { value: 'shipping', label: 'Shipping' }
      ]
    }},
    { name: 'street', type: 'text', label: 'Street Address', required: true },
    { name: 'city', type: 'text', label: 'City', required: true },
    { name: 'state', type: 'text', label: 'State/Province', required: true },
    { name: 'zipCode', type: 'text', label: 'ZIP/Postal Code', required: true },
    { name: 'country', type: 'select', label: 'Country', required: true, props: {
      options: countryOptions
    }}
  ]}
  collapsible={true}
  defaultCollapsed={true}
  itemTitleField="type"
  showItemNumbers={false}
  spacing="lg"
  layout="vertical"
/>

// Team members with custom actions
<DocyFieldList
  name="teamMembers"
  label="Team Members"
  itemFields={[
    { name: 'userId', type: 'selectUser', label: 'User', required: true },
    { name: 'role', type: 'select', label: 'Role', required: true, props: {
      options: teamRoles
    }},
    { name: 'permissions', type: 'selectMulti', label: 'Permissions', props: {
      options: permissionOptions
    }},
    { name: 'startDate', type: 'date', label: 'Start Date', required: true },
    { name: 'active', type: 'switch', label: 'Active', props: { defaultValue: true }}
  ]}
  itemActions={[
    {
      id: 'makeAdmin',
      label: 'Make Admin',
      icon: 'shield',
      variant: 'outline',
      onClick: (item, index) => makeUserAdmin(item.userId),
      condition: (item) => item.role !== 'admin'
    },
    {
      id: 'sendInvite',
      label: 'Send Invite',
      icon: 'mail',
      variant: 'default',
      onClick: (item, index) => sendInvite(item.userId),
      condition: (item) => !item.active
    }
  ]}
  onItemAdd={(item, index) => {
    console.log('New team member added:', item);
    trackEvent('team_member_added', { role: item.role });
  }}
  onItemRemove={(item, index) => {
    console.log('Team member removed:', item);
    trackEvent('team_member_removed', { userId: item.userId });
  }}
  maxItems={10}
  showReorder={true}
/>

// Dynamic questionnaire with computed properties
<DocyFieldList
  name="questions"
  label="Survey Questions"
  itemFields={[
    { name: 'type', type: 'select', label: 'Question Type', required: true, props: {
      options: [
        { value: 'text', label: 'Text Input' },
        { value: 'number', label: 'Number Input' },
        { value: 'select', label: 'Single Choice' },
        { value: 'multiSelect', label: 'Multiple Choice' },
        { value: 'rating', label: 'Rating Scale' }
      ]
    }},
    { name: 'question', type: 'textarea', label: 'Question Text', required: true },
    { name: 'required', type: 'switch', label: 'Required' },
    { name: 'options', type: 'fieldList', label: 'Answer Options', 
      computedHidden: {
        field: 'type',
        operator: 'not_in',
        value: ['select', 'multiSelect']
      },
      props: {
        itemFields: [
          { name: 'value', type: 'text', label: 'Option Value', required: true },
          { name: 'label', type: 'text', label: 'Option Label', required: true }
        ],
        minItems: 2,
        itemTitleField: 'label'
      }
    },
    { name: 'validation', type: 'fieldset', label: 'Validation Rules',
      props: {
        fields: [
          { name: 'minLength', type: 'number', label: 'Minimum Length' },
          { name: 'maxLength', type: 'number', label: 'Maximum Length' },
          { name: 'pattern', type: 'text', label: 'Regex Pattern' }
        ]
      }
    }
  ]}
  itemTitleField="question"
  collapsible={true}
  showReorder={true}
  reorderMethod="drag"
  animateChanges={true}
  actions={{
    change: [
      ['condition', '$count(questions) > 0', [
        ['setFieldValue', { field: 'hasQuestions', value: true }]
      ]]
    ]
  }}
/>

// Large dataset with virtualization
<DocyFieldList
  name="inventoryItems"
  label="Inventory Items"
  itemFields={[
    { name: 'productId', type: 'text', label: 'Product ID', required: true },
    { name: 'quantity', type: 'number', label: 'Quantity', required: true },
    { name: 'location', type: 'text', label: 'Location' },
    { name: 'lastUpdated', type: 'date', label: 'Last Updated' }
  ]}
  virtualized={true}
  itemHeight={120}
  maxVisibleItems={10}
  showItemNumbers={true}
  layout="grid"
  spacing="sm"
  sortable={true}
  sortField="productId"
  sortOrder="asc"
/>

// Complex form with nested lists and validation
<DocyFieldList
  name="orderItems"
  label="Order Items"
  itemFields={[
    { name: 'product', type: 'selectProduct', label: 'Product', required: true },
    { name: 'quantity', type: 'number', label: 'Quantity', required: true, props: {
      min: 1
    }},
    { name: 'unitPrice', type: 'money', label: 'Unit Price', required: true },
    { name: 'discount', type: 'number', label: 'Discount %', props: {
      min: 0, max: 100
    }},
    { name: 'customizations', type: 'fieldList', label: 'Customizations', props: {
      itemFields: [
        { name: 'type', type: 'select', label: 'Type', props: {
          options: customizationTypes
        }},
        { name: 'value', type: 'text', label: 'Value' },
        { name: 'price', type: 'money', label: 'Additional Price' }
      ],
      showItemNumbers: false,
      itemTitleField: 'type'
    }}
  ]}
  minItems={1}
  validateItem={(item, index) => {
    const errors = [];
    if (item.quantity <= 0) errors.push('Quantity must be greater than 0');
    if (item.unitPrice <= 0) errors.push('Unit price must be greater than 0');
    if (item.discount < 0 || item.discount > 100) {
      errors.push('Discount must be between 0 and 100');
    }
    return { valid: errors.length === 0, errors };
  }}
  customValidations={[
    {
      formula: '$sum(orderItems.quantity * orderItems.unitPrice) > 0',
      message: 'Order total must be greater than 0'
    }
  ]}
  itemTitleTemplate="product.name + ' (x' + quantity + ')'"
  showReorder={true}
  onItemChange={(item, index, field, value) => {
    if (field === 'quantity' || field === 'unitPrice') {
      // Recalculate totals when quantity or price changes
      updateOrderTotals();
    }
  }}
  actions={{
    change: [
      ['setFieldValueCalculated', {
        field: 'orderTotal',
        formula: '$sum(orderItems.(quantity * unitPrice * (1 - discount / 100)))'
      }]
    ]
  }}
/>
```

### Integration Requirements
- **DocyFieldBase**: Base wrapper component (required)
- **DocyButton**: For add/remove/action buttons
- **DocyCard**: For item container styling
- **DocyCollapsible**: For collapsible items
- **DocyIcon**: For icons in buttons and headers
- **DocySpinner**: For loading states
- **DocyAlert**: For validation messages
- **DocyFieldRenderer**: For rendering nested fields
- **@dnd-kit/core**: For drag-and-drop functionality
- **framer-motion**: For animations
- **react-window**: For virtualization

### Dependencies Required
- `react-hook-form`: Form state management (inherited from DocyFieldBase)
- `@dnd-kit/core`: Drag and drop functionality
- `@dnd-kit/sortable`: Sortable list implementation
- `@dnd-kit/utilities`: Drag and drop utilities
- `framer-motion`: Animation library
- `react-window`: Virtual scrolling
- `use-debounce`: Debounced actions
- `class-variance-authority`: Variant management
- All DocyFieldBase dependencies

### Testing Requirements
1. **Unit Tests**: Item management, validation, reordering, nested fields
2. **Integration Tests**: React Hook Form integration, validation system, actions
3. **Visual Tests**: All layout modes, responsive behavior, animations
4. **Accessibility Tests**: Keyboard navigation, screen reader support, ARIA attributes
5. **Performance Tests**: Virtual scrolling, large datasets, rendering efficiency
6. **Drag & Drop Tests**: Reordering functionality, accessibility, touch support
7. **Nested Field Tests**: Complex field definitions, validation, computed properties

## Development Priority
**High** - Essential component for managing dynamic collections and complex form structures

## Notes
- Custom implementation using shadcn/ui design patterns for consistent styling
- Supports unlimited nesting depth with other DocyField components
- Drag-and-drop functionality is fully accessible with keyboard alternatives
- Virtual scrolling enables efficient handling of large datasets
- Flexible validation system supports both simple and complex business rules
- Animation system provides smooth user experience without performance impact
- Integration with existing form systems and validation frameworks
- Extensible architecture allows for custom field types and actions
- Performance optimized with efficient re-rendering and lazy loading
- Complete accessibility compliance ensures inclusive user experience