# DocyFieldCheckbox Component

## Overview
DocyFieldCheckbox is a comprehensive checkbox field component that extends DocyFieldBase to provide checkbox-specific functionality. It supports single checkboxes, checkbox groups, indeterminate states, and custom styling. Built on the shadcn/ui Checkbox component, it provides a consistent and accessible checkbox experience throughout the Docyrus platform.

This component handles various checkbox scenarios including boolean toggles, multi-select groups, and complex validation requirements while maintaining full integration with the form system and DocyFieldBase features.

## Component Specification

### Props
DocyFieldCheckbox inherits ALL props from DocyFieldBase and adds the following checkbox-specific properties:

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `extends` | DocyFieldBase | - | Yes | Inherits all base field props (see DocyFieldBase.md) |
| `checked` | boolean | false | No | Checked state of the checkbox |
| `indeterminate` | boolean | false | No | Indeterminate state for partial selection |
| `options` | CheckboxOption[] | - | No | Array of options for checkbox group |
| `orientation` | 'horizontal' \| 'vertical' | 'vertical' | No | Layout orientation for checkbox group |
| `inline` | boolean | false | No | Display checkbox inline with minimal spacing |
| `reverse` | boolean | false | No | Reverse the order of checkbox and label |
| `color` | string | - | No | Custom checkbox color (CSS color value) |
| `size` | 'sm' \| 'md' \| 'lg' | 'md' | No | Checkbox size variant |
| `icon` | string | - | No | Custom check icon (overrides default checkmark) |
| `description` | string | - | No | Helper text displayed below checkbox |
| `onIndeterminateChange` | function | - | No | Callback when indeterminate state changes |
| `groupValue` | string[] | [] | No | Array of selected values in checkbox group |
| `onGroupChange` | function | - | No | Callback when checkbox group selection changes |
| `selectAll` | boolean | false | No | Show select all/none functionality in groups |
| `selectAllLabel` | string | 'Select All' | No | Label for select all checkbox |
| `spacing` | 'compact' \| 'normal' \| 'loose' | 'normal' | No | Spacing between checkboxes in group |
| `columns` | number | 1 | No | Number of columns for group layout |
| `showCount` | boolean | false | No | Show count of selected items in group |
| `maxSelection` | number | - | No | Maximum number of selections allowed in group |
| `minSelection` | number | - | No | Minimum number of selections required in group |

**Note**: DocyFieldCheckbox inherits all DocyFieldBase props including validation, layout, dynamic computed properties, AI integration, and more. See [DocyFieldBase documentation](./DocyFieldBase.md) for the complete list.

### TypeScript Interfaces

```typescript
interface CheckboxOption {
  value: string;
  label: string;
  description?: string;
  icon?: string;
  disabled?: boolean;
  color?: string;
  badge?: string | number;
}

interface CheckboxFieldProps extends DocyFieldBaseProps {
  checked?: boolean;
  indeterminate?: boolean;
  options?: CheckboxOption[];
  orientation?: 'horizontal' | 'vertical';
  inline?: boolean;
  reverse?: boolean;
  color?: string;
  size?: 'sm' | 'md' | 'lg';
  icon?: string;
  description?: string;
  onIndeterminateChange?: (indeterminate: boolean) => void;
  groupValue?: string[];
  onGroupChange?: (values: string[]) => void;
  selectAll?: boolean;
  selectAllLabel?: string;
  spacing?: 'compact' | 'normal' | 'loose';
  columns?: number;
  showCount?: boolean;
  maxSelection?: number;
  minSelection?: number;
}

interface CheckboxGroupState {
  selectedValues: string[];
  isIndeterminate: boolean;
  allSelected: boolean;
  selectionCount: number;
}
```

### Behavior

1. **Single Checkbox**:
   - Standard boolean toggle functionality
   - Support for indeterminate state for partial selections
   - Click-to-edit mode integration
   - Custom styling and sizing options

2. **Checkbox Groups**:
   - Multiple selection with array value handling
   - Select all/none functionality with indeterminate state
   - Configurable layout (columns, orientation, spacing)
   - Min/max selection constraints with validation

3. **State Management**:
   - Proper React Hook Form integration
   - Indeterminate state handling for group selections
   - Real-time validation and error display
   - Selection count tracking and display

4. **Accessibility**:
   - Complete ARIA attribute support
   - Keyboard navigation (Space, Tab, Arrow keys)
   - Screen reader announcements for state changes
   - Proper focus management in groups

5. **Advanced Features**:
   - Custom icons and colors
   - Badge/count display on options
   - Responsive column layouts
   - Integration with computed properties

## Component Requirements

### Technical Specifications
- **Framework**: React 18+ with TypeScript
- **Base Component**: shadcn/ui Checkbox component (`pnpm dlx shadcn@latest add checkbox`)
- **Extensions**: Docy-specific features including checkbox groups, indeterminate state, custom styling, and advanced validation built on top of shadcn base
- **Wrapper**: Extends DocyFieldBase for consistent field structure
- **Styling**: shadcn/ui Checkbox component with Tailwind CSS v4
- **Form Integration**: React Hook Form compatibility with proper validation
- **Accessibility**: WCAG 2.1 AA compliance

### Key Features Required
1. **Single Checkbox**: Basic boolean toggle with indeterminate state
2. **Checkbox Groups**: Multi-select functionality with array values
3. **Select All/None**: Group-level selection controls
4. **Custom Styling**: Size variants, colors, and icons
5. **Layout Options**: Orientation, columns, and spacing controls
6. **Validation**: Min/max selection constraints
7. **Accessibility**: Complete keyboard navigation and screen reader support

### Usage Examples

```tsx
// Basic single checkbox
<DocyFieldCheckbox
  name="newsletter"
  label="Subscribe to newsletter"
  description="Receive weekly updates about new features"
  required={true}
/>

// Checkbox with indeterminate state
<DocyFieldCheckbox
  name="selectAll"
  label="Select all items"
  indeterminate={hasPartialSelection}
  checked={allSelected}
  onIndeterminateChange={handleIndeterminateChange}
/>

// Checkbox group with options
<DocyFieldCheckbox
  name="interests"
  label="Select your interests"
  options={[
    { value: 'technology', label: 'Technology', icon: 'laptop' },
    { value: 'design', label: 'Design', icon: 'palette' },
    { value: 'marketing', label: 'Marketing', icon: 'megaphone' },
    { value: 'development', label: 'Development', icon: 'code' }
  ]}
  orientation="horizontal"
  columns={2}
  selectAll={true}
  showCount={true}
/>

// Checkbox group with validation
<DocyFieldCheckbox
  name="skills"
  label="Select your skills"
  options={skillsOptions}
  minSelection={2}
  maxSelection={5}
  validations={[
    { type: 'required', message: 'Please select at least 2 skills' }
  ]}
  customValidations={[
    {
      formula: '$count(skills) >= 2 and $count(skills) <= 5',
      message: 'Please select between 2 and 5 skills'
    }
  ]}
/>

// Inline checkbox with custom styling
<DocyFieldCheckbox
  name="terms"
  label="I agree to the terms and conditions"
  inline={true}
  size="lg"
  color="#3B82F6"
  icon="shield-check"
  required={true}
  validations={[
    { type: 'required', message: 'You must accept the terms to continue' }
  ]}
/>

// Checkbox with computed properties
<DocyFieldCheckbox
  name="premium"
  label="Premium Features"
  computedLabel="'Premium Features (' + (premium ? 'Active' : 'Inactive') + ')'"
  computedDisabled={{ field: 'userType', operator: 'equals', value: 'basic' }}
  computedRequired={{ field: 'accountType', operator: 'equals', value: 'business' }}
  description="Access to advanced features and priority support"
/>

// Checkbox group with actions
<DocyFieldCheckbox
  name="categories"
  label="Product Categories"
  options={categoryOptions}
  actions={{
    change: [
      ['condition', '$count(categories) > 0', [
        ['setFieldOption', {
          field: 'subcategories',
          option: 'hidden',
          value: false
        }]
      ]],
      ['setFieldValueCalculated', {
        field: 'category_count',
        formula: '$count(categories)'
      }]
    ]
  }}
/>

// Advanced checkbox group with all features
<DocyFieldCheckbox
  name="permissions"
  label="User Permissions"
  options={[
    { 
      value: 'read', 
      label: 'Read Access', 
      description: 'View content and data',
      icon: 'eye',
      badge: 'Basic'
    },
    { 
      value: 'write', 
      label: 'Write Access', 
      description: 'Create and edit content',
      icon: 'edit',
      badge: 'Standard'
    },
    { 
      value: 'admin', 
      label: 'Admin Access', 
      description: 'Full system administration',
      icon: 'shield',
      badge: 'Premium',
      color: '#EF4444'
    }
  ]}
  orientation="vertical"
  spacing="loose"
  selectAll={true}
  selectAllLabel="Grant all permissions"
  showCount={true}
  maxSelection={3}
  validations={[
    { type: 'required', message: 'At least one permission is required' }
  ]}
  customValidations={[
    {
      formula: '$contains(permissions, "admin") and $not($contains(permissions, "read"))',
      message: 'Admin access requires read access'
    }
  ]}
/>
```

### Integration Requirements
- **DocyFieldBase**: Base wrapper component (required)
- **DocyCheckbox**: Base checkbox component from uikit
- **DocyIcon**: For custom icons and option icons
- **DocyBadge**: For option badges and count display
- **DocyLabel**: For proper labeling and accessibility
- **FilterQuery**: For computed properties evaluation
- **CustomValidation**: For complex validation rules

### Dependencies Required
- `react-hook-form`: Form state management (inherited from DocyFieldBase)
- `@radix-ui/react-checkbox`: Base checkbox primitive (via shadcn/ui)
- `class-variance-authority`: Variant management
- `@radix-ui/react-label`: Label association
- All DocyFieldBase dependencies

### Testing Requirements
1. **Unit Tests**: Single checkbox behavior, group selection, indeterminate state, validation
2. **Integration Tests**: React Hook Form integration, DocyFieldBase inheritance, actions system
3. **Visual Tests**: All size variants, orientations, spacing options, responsive behavior
4. **Accessibility Tests**: Keyboard navigation, screen reader support, ARIA attributes, focus management
5. **Performance Tests**: Large checkbox groups, real-time validation, computed properties
6. **Validation Tests**: Min/max selection constraints, custom validation rules, error display
7. **Group Tests**: Select all/none functionality, partial selection states, column layouts

## Development Priority
**High** - Essential form input component for boolean and multi-select scenarios

## Notes
- Built on shadcn/ui Checkbox component for consistency and accessibility
- Supports both single checkboxes and complex checkbox groups
- Integrates seamlessly with DocyFieldBase for advanced form features
- Provides comprehensive accessibility support for all user types
- Optimized for performance with large option lists
- Flexible styling system accommodates various design requirements
- Complete validation system supports complex business logic
- Responsive design ensures optimal experience across all devices