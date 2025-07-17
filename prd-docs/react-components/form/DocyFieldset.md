# DocyFieldset Component

## Overview
DocyFieldset is a container component that groups related form fields together with optional labeling, collapsible functionality, and flexible layout options. It supports tab-based navigation, grid layouts, and responsive design. The component can be used standalone or within DocyForm for organizing complex forms into logical sections.

## Component Specification

### Props
| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `id` | string | - | No | Unique identifier for the fieldset |
| `label` | string | - | No | Label text for the fieldset |
| `description` | string | - | No | Description text for the fieldset |
| `titleTheme` | 'primary' \| 'light' | 'primary' | No | Visual theme for the title area |
| `hideLabel` | boolean | false | No | Whether to hide the label |
| `columnCount` | number | 1 | No | Number of columns for grid layout |
| `columnSpan` | number \| [number, number] | 1 | No | Column span in parent grid |
| `rowSpan` | number \| [number, number] | 1 | No | Row span in parent grid |
| `hidden` | boolean | false | No | Whether fieldset is hidden |
| `collapsible` | boolean | false | No | Whether fieldset can be collapsed |
| `collapsed` | boolean | false | No | Initial collapsed state |
| `tabView` | boolean | false | No | Enable tab-based navigation for child fields |
| `tabVariant` | 'underline' \| 'pills' | 'underline' | No | Visual style for tabs |
| `height` | 'full' \| 'fit' \| number | 'fit' | No | Height constraint for fieldset |
| `fieldLabelAlign` | string | - | No | Label alignment for child fields |
| `fieldLabelWidth` | string \| number | - | No | Label width for child fields |
| `gridGap` | string \| number | - | No | Gap between grid items |
| `children` | FormChild[] | [] | No | Child field configuration array |
| `computedHidden` | string \| FilterQuery | null | No | FilterQuery rules for dynamic hidden state |
| `computedCollapsed` | string \| FilterQuery | null | No | FilterQuery rules for dynamic collapsed state |
| `className` | string | - | No | Additional CSS classes |
| `onToggleCollapsed` | function | - | No | Callback when collapsed state changes |
| `onTabChange` | function | - | No | Callback when active tab changes |

### TypeScript Interfaces

```typescript
interface FieldsetProps {
  id?: string;
  label?: string;
  description?: string;
  titleTheme?: 'primary' | 'light';
  hideLabel?: boolean;
  columnCount?: number;
  columnSpan?: number | [number, number];
  rowSpan?: number | [number, number];
  hidden?: boolean;
  collapsible?: boolean;
  collapsed?: boolean;
  tabView?: boolean;
  tabVariant?: 'underline' | 'pills';
  height?: 'full' | 'fit' | number;
  fieldLabelAlign?: string;
  fieldLabelWidth?: string | number;
  gridGap?: string | number;
  children?: FormChild[];
  computedHidden?: string | FilterQuery;
  computedCollapsed?: string | FilterQuery;
  className?: string;
  onToggleCollapsed?: () => void;
  onTabChange?: (tabIndex: number) => void;
}

interface FieldsetTab {
  id: string;
  title: string;
  icon?: string;
}

interface FieldsetState {
  label: string;
  description: string;
  hideLabel: boolean;
  columnCount: number;
  columnSpan: number | [number, number];
  hidden: boolean;
  collapsible: boolean;
  collapsed: boolean;
}
```

### Behavior

1. **Layout Management**:
   - **Grid Layout**: Responsive CSS Grid with configurable column count
   - **Flexible Spacing**: Configurable gap between child fields
   - **Responsive Design**: Adapts to different screen sizes
   - **Height Control**: Fixed, fit-content, or full-height options

2. **Collapsible Functionality**:
   - **Toggle Control**: Clickable header to expand/collapse
   - **Smooth Animation**: CSS transitions for expand/collapse
   - **State Management**: Persistent collapsed state
   - **Computed Collapse**: Dynamic collapse based on FilterQuery

3. **Tab Navigation**:
   - **Tab Bar**: Horizontal tab navigation for child fields
   - **Tab Variants**: Underline or pills visual styles
   - **Tab Switching**: Smooth transition between tabs
   - **Icon Support**: Icons for tabs from field types

4. **Field Organization**:
   - **Logical Grouping**: Groups related fields together
   - **Label Inheritance**: Passes label settings to child fields
   - **Context Provision**: Provides fieldset context to children
   - **Computed Properties**: Dynamic visibility and behavior

5. **Responsive Behavior**:
   - **Mobile Adaptation**: Responsive layout for mobile devices
   - **Grid Breakpoints**: Adapts column count based on screen size
   - **Overflow Handling**: Scroll behavior for constrained heights

## Component Requirements

### Technical Specifications
- **Framework**: React 18+ with TypeScript
- **Base Component**: Custom implementation (no direct shadcn/ui equivalent)
- **Integration**: Uses shadcn/ui patterns for consistent styling and Collapsible components (`pnpm dlx shadcn@latest add collapsible`)
- **Styling**: shadcn/ui patterns with Tailwind CSS v4
- **Layout**: CSS Grid with container queries
- **Animations**: CSS transitions for collapse/expand
- **Context**: React Context for field option inheritance
- **Accessibility**: WCAG 2.1 AA compliance

### Key Features Required
1. **Flexible Layout**: Grid-based responsive layout system
2. **Collapsible Sections**: Smooth expand/collapse with animations
3. **Tab Navigation**: Tabbed interface for complex fieldsets
4. **Context Inheritance**: Field option propagation to children
5. **Computed Properties**: Dynamic behavior based on FilterQuery
6. **Responsive Design**: Mobile-first responsive behavior
7. **Accessibility**: Complete keyboard navigation and screen reader support

### Usage Examples

```tsx
// Basic fieldset with grouped fields
<DocyFieldset
  label="Personal Information"
  description="Please provide your personal details"
>
  <DocyFieldText name="firstName" label="First Name" />
  <DocyFieldText name="lastName" label="Last Name" />
  <DocyFieldDate name="birthDate" label="Date of Birth" />
</DocyFieldset>

// Collapsible fieldset
<DocyFieldset
  label="Advanced Settings"
  collapsible={true}
  collapsed={false}
  onToggleCollapsed={() => console.log('Fieldset toggled')}
>
  <DocyFieldCheckbox name="enableNotifications" label="Enable Notifications" />
  <DocyFieldSelect name="theme" label="Theme" />
  <DocyFieldNumber name="timeout" label="Timeout (seconds)" />
</DocyFieldset>

// Grid layout with multiple columns
<DocyFieldset
  label="Contact Information"
  columnCount={2}
  gridGap={4}
>
  <DocyFieldText name="email" label="Email" />
  <DocyFieldText name="phone" label="Phone" />
  <DocyFieldText name="address" label="Address" columnSpan={2} />
  <DocyFieldText name="city" label="City" />
  <DocyFieldText name="zipCode" label="ZIP Code" />
</DocyFieldset>

// Tab-based fieldset
<DocyFieldset
  label="User Profile"
  tabView={true}
  tabVariant="pills"
  onTabChange={(index) => console.log('Tab changed:', index)}
>
  <DocyFieldText name="username" label="Username" />
  <DocyFieldEmail name="email" label="Email Address" />
  <DocyFieldTextarea name="bio" label="Biography" />
  <DocyFieldSelect name="country" label="Country" />
</DocyFieldset>

// Fieldset with computed properties
<DocyFieldset
  label="Payment Information"
  computedHidden={{
    combinator: 'and',
    rules: [
      {
        field: 'paymentMethod',
        operator: '=',
        value: 'free',
        filterType: 'ALPHA'
      }
    ]
  }}
  computedCollapsed={{
    combinator: 'and',
    rules: [
      {
        field: 'accountType',
        operator: '=',
        value: 'basic',
        filterType: 'ALPHA'
      }
    ]
  }}
>
  <DocyFieldText name="cardNumber" label="Card Number" />
  <DocyFieldText name="expiryDate" label="Expiry Date" />
  <DocyFieldText name="cvv" label="CVV" />
</DocyFieldset>

// Nested fieldsets
<DocyFieldset
  label="Company Information"
  columnCount={1}
>
  <DocyFieldText name="companyName" label="Company Name" />
  
  <DocyFieldset
    label="Business Address"
    columnCount={2}
    fieldLabelAlign="top"
  >
    <DocyFieldText name="businessAddress" label="Address" columnSpan={2} />
    <DocyFieldText name="businessCity" label="City" />
    <DocyFieldText name="businessZip" label="ZIP Code" />
  </DocyFieldset>
  
  <DocyFieldset
    label="Contact Person"
    columnCount={2}
    collapsible={true}
  >
    <DocyFieldText name="contactName" label="Contact Name" />
    <DocyFieldText name="contactEmail" label="Contact Email" />
  </DocyFieldset>
</DocyFieldset>

// Fixed height fieldset with scrolling
<DocyFieldset
  label="Long Form Section"
  height={400}
  className="border border-gray-200"
>
  <DocyFieldText name="field1" label="Field 1" />
  <DocyFieldText name="field2" label="Field 2" />
  <DocyFieldText name="field3" label="Field 3" />
  <DocyFieldText name="field4" label="Field 4" />
  <DocyFieldText name="field5" label="Field 5" />
  <DocyFieldText name="field6" label="Field 6" />
  <DocyFieldText name="field7" label="Field 7" />
  <DocyFieldText name="field8" label="Field 8" />
</DocyFieldset>

// Fieldset with custom styling
<DocyFieldset
  label="Styled Fieldset"
  titleTheme="light"
  fieldLabelAlign="left"
  fieldLabelWidth={120}
  className="bg-gray-50 rounded-lg p-4"
>
  <DocyFieldText name="input1" label="Input 1" />
  <DocyFieldText name="input2" label="Input 2" />
  <DocyFieldSelect name="select1" label="Select 1" />
</DocyFieldset>
```

### Context and Field Inheritance

```tsx
// Fieldset provides context to child fields
interface FieldsetContextValue {
  fieldsetId: string;
  defaultFieldOptions: {
    labelAlign?: string;
    labelWidth?: string | number;
    hideLabel?: boolean;
    size?: string;
    variant?: string;
  };
  tabView?: boolean;
  columnCount?: number;
}

// Child fields automatically inherit fieldset settings
<DocyFieldset
  fieldLabelAlign="top"
  fieldLabelWidth="100%"
  columnCount={2}
>
  {/* These fields will inherit the fieldset settings */}
  <DocyFieldText name="field1" label="Field 1" />
  <DocyFieldText name="field2" label="Field 2" />
</DocyFieldset>
```

### Tab Navigation Implementation

```tsx
// Tab-based fieldset with dynamic tab generation
<DocyFieldset
  label="User Settings"
  tabView={true}
  tabVariant="underline"
  onTabChange={(index) => {
    console.log('Active tab:', index);
    // Handle tab change logic
  }}
>
  {/* Each child field becomes a tab */}
  <DocyFieldText name="profile" label="Profile" />
  <DocyFieldText name="security" label="Security" />
  <DocyFieldText name="notifications" label="Notifications" />
  <DocyFieldText name="billing" label="Billing" />
</DocyFieldset>
```

### Responsive Grid System

```tsx
// Responsive fieldset with different column counts
<DocyFieldset
  label="Responsive Layout"
  columnCount={3} // 3 columns on desktop
  // Automatically adapts to 2 columns on tablet, 1 on mobile
>
  <DocyFieldText name="field1" label="Field 1" />
  <DocyFieldText name="field2" label="Field 2" />
  <DocyFieldText name="field3" label="Field 3" />
  <DocyFieldText name="field4" label="Field 4" columnSpan={2} />
  <DocyFieldText name="field5" label="Field 5" />
</DocyFieldset>
```

### Integration Requirements
- **DocyFieldBase**: All child fields must use DocyFieldBase
- **DocyForm**: Integrates with DocyForm for form-wide settings
- **FilterQuery**: For computed properties and dynamic behavior
- **JSONata**: For dynamic content evaluation

### Dependencies Required
- `react`: React 18+ core library
- `class-variance-authority`: Variant management
- `@radix-ui/react-collapsible`: Collapsible functionality
- `framer-motion`: Animation library
- FilterQuery and JSONata utilities

### Testing Requirements
1. **Unit Tests**: Collapse/expand, tab switching, grid layout
2. **Integration Tests**: Field inheritance, context provision, computed properties
3. **Visual Tests**: All themes, responsive behavior, tab variants
4. **Accessibility Tests**: Keyboard navigation, screen reader support, ARIA attributes
5. **Performance Tests**: Large fieldsets, tab switching performance

## Development Priority
**High** - Essential component for organizing complex forms

## Notes
- Built with modern shadcn/ui patterns for consistency
- Supports nested fieldsets for complex form organization
- Tab functionality provides clean interface for related fields
- Collapsible sections help manage form complexity
- Responsive design ensures good mobile experience
- Complete accessibility compliance for inclusive user experience
- Integrates seamlessly with DocyForm and DocyFieldBase
- Computed properties enable dynamic behavior based on form state