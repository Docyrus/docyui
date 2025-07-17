# DocyFieldRadioGroup Component

## Overview
DocyFieldRadioGroup is a comprehensive radio button group component that extends DocyFieldBase to provide advanced radio selection functionality. Built on top of shadcn/ui RadioGroup component, it offers flexible layout options, custom styling, icon support, and enhanced accessibility features. The component supports various orientations, column layouts, custom option rendering, and integrates seamlessly with form systems for single-choice selections.

This component serves as the primary interface for radio button groups where users need to select exactly one option from a predefined set of choices, with support for rich option content including icons, descriptions, and custom layouts.

## Component Specification

### Props
DocyFieldRadioGroup inherits ALL props from DocyFieldBase and adds the following radio-specific properties:

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `options` | RadioOption[] | [] | Yes | Array of radio button options |
| `orientation` | 'horizontal' \| 'vertical' | 'vertical' | No | Layout orientation of radio buttons |
| `columns` | number | 1 | No | Number of columns for grid layout |
| `inline` | boolean | false | No | Display radio buttons inline |
| `size` | 'sm' \| 'md' \| 'lg' | 'md' | No | Size of radio buttons |
| `color` | string | 'primary' | No | Custom radio button color theme |
| `showDescriptions` | boolean | true | No | Show option descriptions when available |
| `icon` | string | - | No | Default icon for all radio options |
| `selectedIcon` | string | - | No | Icon to show for selected state |
| `reverse` | boolean | false | No | Reverse label and radio button order |
| `optionRender` | (option: RadioOption) => ReactNode | - | No | Custom option renderer function |
| `groupClassName` | string | - | No | CSS class for the radio group container |
| `optionClassName` | string | - | No | CSS class for individual radio options |
| `spacing` | 'sm' \| 'md' \| 'lg' | 'md' | No | Spacing between radio options |
| `bordered` | boolean | false | No | Add border styling to options |
| `cardStyle` | boolean | false | No | Display options as card-style selections |
| `allowDeselect` | boolean | false | No | Allow deselecting the current selection |
| `onOptionFocus` | (option: RadioOption) => void | - | No | Callback when option receives focus |
| `onOptionBlur` | (option: RadioOption) => void | - | No | Callback when option loses focus |
| `onOptionHover` | (option: RadioOption) => void | - | No | Callback when option is hovered |
| `highlightSelected` | boolean | true | No | Highlight selected option with background |
| `compactMode` | boolean | false | No | Compact display mode for limited space |
| `iconPosition` | 'left' \| 'right' | 'left' | No | Position of option icons |
| `alignItems` | 'start' \| 'center' \| 'end' | 'center' | No | Vertical alignment of option content |

**Note**: DocyFieldRadioGroup inherits all DocyFieldBase props including validation, layout, dynamic computed properties, AI integration, and more. See [DocyFieldBase documentation](./DocyFieldBase.md) for the complete list.

### TypeScript Interfaces

```typescript
interface RadioOption {
  value: string | number;
  label: string;
  description?: string;
  icon?: string;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
  data?: Record<string, any>; // Additional data for custom rendering
}

interface RadioGroupLayout {
  orientation: 'horizontal' | 'vertical';
  columns: number;
  inline: boolean;
  spacing: 'sm' | 'md' | 'lg';
  compactMode: boolean;
}

interface RadioGroupStyling {
  size: 'sm' | 'md' | 'lg';
  color: string;
  bordered: boolean;
  cardStyle: boolean;
  highlightSelected: boolean;
  corners?: string;
}

interface RadioGroupBehavior {
  allowDeselect: boolean;
  reverse: boolean;
  showDescriptions: boolean;
  iconPosition: 'left' | 'right';
  alignItems: 'start' | 'center' | 'end';
}

interface RadioGroupCallbacks {
  onOptionFocus?: (option: RadioOption) => void;
  onOptionBlur?: (option: RadioOption) => void;
  onOptionHover?: (option: RadioOption) => void;
  optionRender?: (option: RadioOption) => ReactNode;
}
```

### Behavior

1. **Single Selection**:
   - Only one option can be selected at a time
   - Selecting a new option automatically deselects the previous one
   - Optional deselection support to clear current selection

2. **Layout Options**:
   - Vertical stacking (default) or horizontal arrangement
   - Grid layout with configurable columns
   - Inline display for compact forms
   - Responsive column adjustments

3. **Visual Styling**:
   - Multiple size variants (sm, md, lg)
   - Customizable color themes
   - Card-style option display
   - Bordered options for enhanced visibility
   - Compact mode for space-constrained layouts

4. **Icon Support**:
   - Option-specific icons
   - Global icon settings
   - Selected state indicators
   - Configurable icon positioning

5. **Accessibility Features**:
   - Full keyboard navigation
   - Screen reader support
   - ARIA attributes and roles
   - Focus management and indication

6. **Custom Rendering**:
   - Option-level custom rendering
   - Flexible content layout
   - Support for rich option content
   - Styling customization per option

## Component Requirements

### Technical Specifications
- **Framework**: React 18+ with TypeScript
- **Base Component**: shadcn/ui RadioGroup component (`pnpm dlx shadcn@latest add radio-group`)
- **Extensions**: Docy-specific features including flexible layouts, custom styling, icon support, and enhanced accessibility built on top of shadcn base
- **Wrapper**: Extends DocyFieldBase for consistent field structure
- **Styling**: shadcn/ui RadioGroup component with Tailwind CSS v4
- **Icons**: Integration with DocyIcon component system
- **Accessibility**: WCAG 2.1 AA compliance with full keyboard navigation

### Key Features Required
1. **Flexible Layouts**: Support for vertical, horizontal, grid, and inline arrangements
2. **Custom Styling**: Multiple size variants, color themes, and visual styles
3. **Icon Integration**: Option icons, selected state indicators, and positioning options
4. **Rich Content**: Support for descriptions, custom rendering, and complex option content
5. **Enhanced Accessibility**: Complete keyboard navigation and screen reader support
6. **Responsive Design**: Layout adaptation across different screen sizes
7. **Form Integration**: Seamless integration with React Hook Form and validation systems

### Usage Examples

```tsx
// Basic radio group
<DocyFieldRadioGroup
  name="gender"
  label="Gender"
  options={[
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' },
    { value: 'prefer-not-to-say', label: 'Prefer not to say' }
  ]}
  required={true}
/>

// Horizontal layout with icons
<DocyFieldRadioGroup
  name="paymentMethod"
  label="Payment Method"
  orientation="horizontal"
  size="lg"
  options={[
    { value: 'credit', label: 'Credit Card', icon: 'credit-card' },
    { value: 'debit', label: 'Debit Card', icon: 'credit-card' },
    { value: 'paypal', label: 'PayPal', icon: 'paypal' },
    { value: 'bank', label: 'Bank Transfer', icon: 'bank' }
  ]}
  cardStyle={true}
  showDescriptions={true}
/>

// Grid layout with descriptions
<DocyFieldRadioGroup
  name="subscriptionPlan"
  label="Subscription Plan"
  columns={2}
  options={[
    { 
      value: 'basic', 
      label: 'Basic Plan', 
      description: 'Perfect for individuals getting started',
      icon: 'user'
    },
    { 
      value: 'pro', 
      label: 'Pro Plan', 
      description: 'Great for growing teams and businesses',
      icon: 'users'
    },
    { 
      value: 'enterprise', 
      label: 'Enterprise Plan', 
      description: 'Advanced features for large organizations',
      icon: 'building'
    },
    { 
      value: 'custom', 
      label: 'Custom Plan', 
      description: 'Tailored solution for specific needs',
      icon: 'settings'
    }
  ]}
  cardStyle={true}
  bordered={true}
  size="lg"
/>

// Compact inline layout
<DocyFieldRadioGroup
  name="priority"
  label="Priority Level"
  inline={true}
  compactMode={true}
  size="sm"
  options={[
    { value: 'low', label: 'Low', icon: 'arrow-down' },
    { value: 'medium', label: 'Medium', icon: 'minus' },
    { value: 'high', label: 'High', icon: 'arrow-up' },
    { value: 'urgent', label: 'Urgent', icon: 'alert-triangle' }
  ]}
  color="orange"
  spacing="sm"
/>

// Custom option rendering
<DocyFieldRadioGroup
  name="theme"
  label="Theme Selection"
  options={[
    { 
      value: 'light', 
      label: 'Light Theme', 
      description: 'Clean and bright interface',
      data: { preview: '/images/light-theme.jpg' }
    },
    { 
      value: 'dark', 
      label: 'Dark Theme', 
      description: 'Easy on the eyes for extended use',
      data: { preview: '/images/dark-theme.jpg' }
    },
    { 
      value: 'auto', 
      label: 'Auto Theme', 
      description: 'Matches your system preferences',
      data: { preview: '/images/auto-theme.jpg' }
    }
  ]}
  optionRender={(option) => (
    <div className="flex items-center gap-4 p-3">
      <img 
        src={option.data.preview} 
        alt={option.label}
        className="w-16 h-10 rounded object-cover"
      />
      <div className="flex-1">
        <div className="font-medium">{option.label}</div>
        <div className="text-sm text-gray-500">{option.description}</div>
      </div>
    </div>
  )}
  cardStyle={true}
  size="lg"
/>

// Advanced form integration with validation
<DocyFieldRadioGroup
  name="userType"
  label="User Type"
  options={[
    { value: 'student', label: 'Student', icon: 'graduation-cap' },
    { value: 'teacher', label: 'Teacher', icon: 'user-check' },
    { value: 'admin', label: 'Administrator', icon: 'shield' },
    { value: 'parent', label: 'Parent', icon: 'users' }
  ]}
  validations={[
    { type: 'required', message: 'Please select a user type' }
  ]}
  computedRequired={{
    field: 'registrationStep',
    operator: 'greaterThan',
    value: 1
  }}
  actions={{
    change: [
      ['setFieldValue', { field: 'permissions', value: null }],
      ['setFieldOptionCalculated', { 
        field: 'permissions', 
        option: 'options', 
        formula: 'userTypes[type=$].defaultPermissions' 
      }],
      ['condition', 'value="admin"', [
        ['setFieldValue', { field: 'requiresApproval', value: true }]
      ]]
    ]
  }}
  orientation="horizontal"
  cardStyle={true}
  highlightSelected={true}
/>

// Reverse layout with custom styling
<DocyFieldRadioGroup
  name="alignment"
  label="Text Alignment"
  options={[
    { value: 'left', label: 'Left Align', icon: 'align-left' },
    { value: 'center', label: 'Center Align', icon: 'align-center' },
    { value: 'right', label: 'Right Align', icon: 'align-right' },
    { value: 'justify', label: 'Justify', icon: 'align-justify' }
  ]}
  orientation="horizontal"
  reverse={true}
  iconPosition="right"
  size="sm"
  color="blue"
  onOptionFocus={(option) => console.log('Focused:', option.label)}
  onOptionBlur={(option) => console.log('Blurred:', option.label)}
  groupClassName="border rounded-lg p-4"
  optionClassName="hover:bg-gray-50"
/>

// Accessible radio group with complex content
<DocyFieldRadioGroup
  name="accessibility"
  label="Accessibility Preference"
  options={[
    { 
      value: 'high-contrast', 
      label: 'High Contrast', 
      description: 'Enhanced visibility for better readability',
      icon: 'eye'
    },
    { 
      value: 'large-text', 
      label: 'Large Text', 
      description: 'Increased font size for easier reading',
      icon: 'type'
    },
    { 
      value: 'screen-reader', 
      label: 'Screen Reader Optimized', 
      description: 'Enhanced compatibility with assistive technology',
      icon: 'volume-2'
    },
    { 
      value: 'standard', 
      label: 'Standard', 
      description: 'Default accessibility settings',
      icon: 'settings'
    }
  ]}
  showDescriptions={true}
  cardStyle={true}
  bordered={true}
  alignItems="start"
  spacing="lg"
  allowDeselect={true}
  onOptionHover={(option) => {
    // Show accessibility preview
    showAccessibilityPreview(option.value);
  }}
/>
```

### Integration Requirements
- **DocyFieldBase**: Base wrapper component (required)
- **DocyIcon**: For option icons and UI elements
- **DocyLabel**: For option labels and descriptions
- **DocyButton**: For interactive elements (if needed)
- **shadcn/ui RadioGroup**: Base radio group component
- **Tailwind CSS**: For styling and layout
- **React Hook Form**: Form state management (inherited from DocyFieldBase)

### Dependencies Required
- `react-hook-form`: Form state management (inherited from DocyFieldBase)
- `@radix-ui/react-radio-group`: Base radio group component (via shadcn/ui)
- `class-variance-authority`: Variant management for styling
- `clsx`: Class name utilities
- All DocyFieldBase dependencies

### Testing Requirements
1. **Unit Tests**: Option rendering, selection behavior, layout variations, custom rendering
2. **Integration Tests**: React Hook Form integration, validation, actions system
3. **Visual Tests**: All orientations, sizes, card styles, icon positions, responsive behavior
4. **Accessibility Tests**: Keyboard navigation, screen reader support, ARIA attributes, focus management
5. **Interaction Tests**: Option selection, deselection, hover states, focus/blur events
6. **Layout Tests**: Grid layouts, responsive behavior, spacing variations

## Development Priority
**Medium** - Important form component for single-choice selections with enhanced UX requirements

## Notes
- Built on shadcn/ui RadioGroup component for consistent design system integration
- Supports flexible layouts including grid, inline, and responsive arrangements
- Enhanced accessibility ensures inclusive user experience across all interaction modes
- Card-style options provide modern, visually appealing selection interface
- Icon support adds visual clarity and improves user comprehension
- Custom rendering capabilities accommodate complex option content requirements
- Integration with existing form systems and validation frameworks
- Responsive design adapts to different screen sizes and usage contexts
- Extensible architecture allows for future enhancements and custom features
- Performance optimized for large option sets with efficient rendering patterns