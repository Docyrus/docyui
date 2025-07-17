# DocySwitch Component

## Overview
DocySwitch is a toggle switch component built on shadcn/ui patterns that provides binary state control with smooth animations. It supports various sizes, labels, descriptions, and states for form inputs and settings. It serves as the primary toggle input component throughout the Docyrus React application.

## Component Specification

### Props
| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-----------|
| `checked` | boolean | false | No | Switch checked state |
| `defaultChecked` | boolean | false | No | Default checked state |
| `onCheckedChange` | function | - | No | Callback when checked state changes |
| `disabled` | boolean | false | No | Disable switch interaction |
| `required` | boolean | false | No | Mark switch as required |
| `id` | string | - | No | Switch element ID |
| `name` | string | - | No | Form field name |
| `value` | string | - | No | Switch value |
| `label` | string | - | No | Switch label text |
| `description` | string | - | No | Helper text description |
| `error` | string | - | No | Error message |
| `size` | string | 'default' | No | Switch size: 'sm', 'default', 'lg' |
| `className` | string | - | No | Additional CSS classes |
| `labelClassName` | string | - | No | Label CSS classes |
| `thumbClassName` | string | - | No | Thumb CSS classes |
| `trackClassName` | string | - | No | Track CSS classes |

### Size System
```typescript
const switchVariants = cva({
  variants: {
    size: {
      sm: "h-4 w-7",
      default: "h-5 w-9",
      lg: "h-6 w-11"
    }
  }
})
```

### Visual Elements
- **Track**: Background container with rounded corners
- **Thumb**: Circular toggle element that slides
- **Label**: Associated text label
- **Description**: Helper text below the switch

### States
- **Unchecked**: Default off state
- **Checked**: Active on state
- **Disabled**: Non-interactive state
- **Error**: Invalid state with error styling
- **Focus**: Keyboard focus state

### Accessibility Features
- **ARIA Attributes**: Proper aria-checked, aria-describedby
- **Keyboard Navigation**: Space key to toggle
- **Screen Reader Support**: Meaningful labels and descriptions
- **Focus Management**: Clear focus indicators
- **Form Integration**: Proper form submission handling

## Component Requirements

### Technical Specifications
- **Framework**: React with TypeScript
- **Base Component**: shadcn/ui Switch component (`pnpm dlx shadcn@latest add switch`)
- **Extensions**: Label, description, error states, and size variants
- **Styling**: shadcn/ui patterns with class-variance-authority
- **Accessibility**: Full ARIA support, keyboard navigation
- **Animation**: Smooth thumb transitions and state changes
- **Form Integration**: React Hook Form compatibility
- **Performance**: Optimized re-renders, proper event handling

### Key Features Required
1. **Toggle Functionality**: Smooth on/off state transitions
2. **Size Variants**: Multiple sizes for different contexts
3. **Label Integration**: Associated labels with proper accessibility
4. **Error Handling**: Validation states and error messages
5. **Description Support**: Helper text for user guidance
6. **Keyboard Navigation**: Full keyboard accessibility
7. **Animation**: Smooth thumb sliding transitions
8. **Form Integration**: Seamless form library integration

### Advanced Features
- **Custom Icons**: Icons inside the switch thumb
- **Loading State**: Pending state during async operations
- **Confirmation**: Confirm before toggle for critical actions
- **Bulk Control**: Group switch management

### Usage Examples
```tsx
// Basic switch
<DocySwitch
  checked={isEnabled}
  onCheckedChange={setIsEnabled}
  label="Enable notifications"
/>

// Switch with description
<DocySwitch
  checked={isDarkMode}
  onCheckedChange={setIsDarkMode}
  label="Dark mode"
  description="Toggle between light and dark themes"
/>

// Disabled switch
<DocySwitch
  checked={true}
  disabled={true}
  label="This option is disabled"
/>

// Switch with error
<DocySwitch
  checked={false}
  onCheckedChange={setIsChecked}
  label="Required setting"
  error="This setting must be enabled"
  required
/>

// Different sizes
<DocySwitch size="sm" label="Small switch" />
<DocySwitch size="default" label="Default switch" />
<DocySwitch size="lg" label="Large switch" />

// Form integration
<form onSubmit={handleSubmit}>
  <DocySwitch
    name="newsletter"
    value="enabled"
    label="Subscribe to newsletter"
    onCheckedChange={setNewsletterEnabled}
  />
  <DocySwitch
    name="terms"
    value="accepted"
    label="I accept the terms and conditions"
    required
    error={errors.terms}
    onCheckedChange={setTermsAccepted}
  />
</form>

// Settings panel
<div className="space-y-4">
  <DocySwitch
    checked={settings.autoSave}
    onCheckedChange={(checked) => updateSetting('autoSave', checked)}
    label="Auto-save"
    description="Automatically save changes as you work"
  />
  <DocySwitch
    checked={settings.notifications}
    onCheckedChange={(checked) => updateSetting('notifications', checked)}
    label="Push notifications"
    description="Receive notifications on your device"
  />
  <DocySwitch
    checked={settings.analytics}
    onCheckedChange={(checked) => updateSetting('analytics', checked)}
    label="Analytics"
    description="Help improve our service by sharing usage data"
  />
</div>

// Privacy settings
<div className="space-y-4">
  <h3 className="font-medium">Privacy Settings</h3>
  <DocySwitch
    checked={privacy.publicProfile}
    onCheckedChange={(checked) => updatePrivacy('publicProfile', checked)}
    label="Public profile"
    description="Make your profile visible to other users"
  />
  <DocySwitch
    checked={privacy.showEmail}
    onCheckedChange={(checked) => updatePrivacy('showEmail', checked)}
    label="Show email address"
    description="Display your email on your public profile"
    disabled={!privacy.publicProfile}
  />
</div>

// Feature flags
<div className="space-y-4">
  <h3 className="font-medium">Feature Flags</h3>
  {featureFlags.map((flag) => (
    <DocySwitch
      key={flag.key}
      checked={flag.enabled}
      onCheckedChange={(checked) => toggleFeature(flag.key, checked)}
      label={flag.name}
      description={flag.description}
      disabled={!flag.available}
    />
  ))}
</div>

// Confirmation switch
<DocySwitch
  checked={isDestructiveMode}
  onCheckedChange={async (checked) => {
    if (checked) {
      const confirmed = await confirmDialog('Enable destructive mode?');
      if (confirmed) {
        setIsDestructiveMode(true);
      }
    } else {
      setIsDestructiveMode(false);
    }
  }}
  label="Destructive mode"
  description="Enable dangerous operations"
/>

// Custom styled switch
<DocySwitch
  checked={isCustom}
  onCheckedChange={setIsCustom}
  label="Custom styled switch"
  className="data-[state=checked]:bg-green-500"
  thumbClassName="data-[state=checked]:bg-white"
  trackClassName="data-[state=unchecked]:bg-gray-200"
/>
```

### Integration Requirements
- **DocyLabel**: Label component for proper labeling
- **DocyIcon**: Custom icons within switches
- **Form Libraries**: React Hook Form, Formik integration
- **Validation**: Form validation library support
- **Animation**: Smooth transition libraries
- **Theme System**: Color schemes and theming

### Form Integration
```tsx
// React Hook Form integration
import { useForm, Controller } from 'react-hook-form';

function SettingsForm() {
  const { control, handleSubmit } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="notifications"
        control={control}
        render={({ field, fieldState }) => (
          <DocySwitch
            checked={field.value}
            onCheckedChange={field.onChange}
            label="Enable notifications"
            description="Receive email notifications"
            error={fieldState.error?.message}
          />
        )}
      />
      <Controller
        name="darkMode"
        control={control}
        render={({ field }) => (
          <DocySwitch
            checked={field.value}
            onCheckedChange={field.onChange}
            label="Dark mode"
            description="Use dark theme"
          />
        )}
      />
    </form>
  );
}
```

### Animation System
- **Thumb Sliding**: Smooth horizontal movement
- **Color Transitions**: Track background color changes
- **Spring Physics**: Natural motion feel
- **Performance**: GPU-accelerated animations

### Accessibility Requirements
- **ARIA Attributes**: switch role, aria-checked, aria-describedby
- **Keyboard Navigation**: Space key to toggle
- **Screen Reader Support**: Proper state announcements
- **Focus Management**: Clear focus indicators
- **Label Association**: Proper htmlFor relationships

### Testing Requirements
1. **Unit Tests**: State changes, event handling, validation
2. **Integration Tests**: Form integration, label association
3. **Accessibility Tests**: ARIA attributes, keyboard navigation
4. **Visual Tests**: All states and sizes across themes
5. **Animation Tests**: Smooth transitions, performance
6. **Form Tests**: Form submission, validation, error handling

## Development Priority
**High** - Essential toggle input component used throughout the application

## Notes
- Built with modern shadcn/ui patterns for consistency
- Full accessibility compliance with WCAG guidelines
- Smooth animations provide excellent user experience
- TypeScript support with comprehensive type safety
- Seamless integration with popular form libraries
- Optimized for performance with proper event handling
- Supports complex settings and configuration scenarios
