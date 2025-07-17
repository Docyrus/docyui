# DocyFieldSwitch Component

## Overview
DocyFieldSwitch is a comprehensive toggle switch field component that extends DocyFieldBase to provide advanced switch functionality. Built on the shadcn/ui Switch component, it offers toggle switches with animations, custom styling, confirmation dialogs, and various states for form inputs and settings. This component provides a consistent and accessible switch experience throughout the Docyrus platform.

This component handles various switch scenarios including boolean toggles, confirmation-required switches, custom styling, and integration with the form system while maintaining full integration with DocyFieldBase features.

## Component Specification

### Props
DocyFieldSwitch inherits ALL props from DocyFieldBase and adds the following switch-specific properties:

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `extends` | DocyFieldBase | - | Yes | Inherits all base field props (see DocyFieldBase.md) |
| `checked` | boolean | false | No | Switch checked state |
| `size` | 'sm' \| 'md' \| 'lg' | 'md' | No | Switch size variant |
| `color` | string | - | No | Custom switch color (CSS color value) |
| `thumbColor` | string | - | No | Custom thumb color (CSS color value) |
| `trackColor` | string | - | No | Custom track color (CSS color value) |
| `activeColor` | string | - | No | Active state color (CSS color value) |
| `reverse` | boolean | false | No | Reverse the order of label and switch |
| `showLabels` | boolean | false | No | Show on/off text labels on the switch |
| `onLabel` | string | 'On' | No | Custom "on" label text |
| `offLabel` | string | 'Off' | No | Custom "off" label text |
| `confirmChange` | boolean | false | No | Require confirmation dialog before state change |
| `confirmMessage` | string | 'Are you sure you want to change this setting?' | No | Custom confirmation dialog message |
| `loading` | boolean | false | No | Show loading state during async operations |
| `icon` | string | - | No | Custom icon displayed on switch |
| `thumbIcon` | string | - | No | Custom icon displayed on thumb |
| `animation` | boolean | true | No | Enable smooth animations |
| `onToggle` | function | - | No | Callback function when switch is toggled |
| `onConfirm` | function | - | No | Callback function when confirmation is accepted |
| `onCancel` | function | - | No | Callback function when confirmation is cancelled |
| `loadingText` | string | 'Loading...' | No | Text shown during loading state |
| `confirmTitle` | string | 'Confirm Change' | No | Title for confirmation dialog |
| `confirmButtonText` | string | 'Confirm' | No | Confirm button text |
| `cancelButtonText` | string | 'Cancel' | No | Cancel button text |
| `orientation` | 'horizontal' \| 'vertical' | 'horizontal' | No | Switch orientation |
| `spacing` | 'compact' \| 'normal' \| 'loose' | 'normal' | No | Spacing between switch and label |

**Note**: DocyFieldSwitch inherits all DocyFieldBase props including validation, layout, dynamic computed properties, AI integration, and more. See [DocyFieldBase documentation](./DocyFieldBase.md) for the complete list.

### TypeScript Interfaces

```typescript
interface SwitchFieldProps extends DocyFieldBaseProps {
  checked?: boolean;
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  thumbColor?: string;
  trackColor?: string;
  activeColor?: string;
  reverse?: boolean;
  showLabels?: boolean;
  onLabel?: string;
  offLabel?: string;
  confirmChange?: boolean;
  confirmMessage?: string;
  loading?: boolean;
  icon?: string;
  thumbIcon?: string;
  animation?: boolean;
  onToggle?: (checked: boolean) => void;
  onConfirm?: (checked: boolean) => void;
  onCancel?: () => void;
  loadingText?: string;
  confirmTitle?: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
  orientation?: 'horizontal' | 'vertical';
  spacing?: 'compact' | 'normal' | 'loose';
}

interface SwitchFieldState {
  checked: boolean;
  loading: boolean;
  confirming: boolean;
  animating: boolean;
}

interface ConfirmationDialogProps {
  open: boolean;
  title: string;
  message: string;
  confirmText: string;
  cancelText: string;
  onConfirm: () => void;
  onCancel: () => void;
}
```

### Behavior

1. **Toggle Functionality**:
   - Smooth binary state transitions with animations
   - Confirmation dialogs for critical switches
   - Loading states during async operations
   - Custom styling and sizing options

2. **State Management**:
   - Proper React Hook Form integration
   - Real-time validation and error display
   - Confirmation state handling
   - Loading state management

3. **Accessibility**:
   - Complete ARIA attribute support
   - Keyboard navigation (Space key, Enter key)
   - Screen reader announcements for state changes
   - Proper focus management and indicators

4. **Advanced Features**:
   - Custom icons and colors for branding
   - Confirmation dialogs with customizable messages
   - Loading states with customizable text
   - Integration with computed properties and actions
   - Responsive design with size variants

5. **Animation System**:
   - Smooth thumb sliding transitions
   - Color transition effects
   - Spring physics for natural motion
   - GPU-accelerated animations

## Component Requirements

### Technical Specifications
- **Framework**: React 18+ with TypeScript
- **Base Component**: shadcn/ui Switch component (`pnpm dlx shadcn@latest add switch`)
- **Extensions**: Docy-specific features including confirmation dialogs, loading states, custom styling, and advanced animations built on top of shadcn base
- **Wrapper**: Extends DocyFieldBase for consistent field structure
- **Styling**: shadcn/ui Switch component with Tailwind CSS v4
- **Form Integration**: React Hook Form compatibility with proper validation
- **Accessibility**: WCAG 2.1 AA compliance

### Key Features Required
1. **Toggle Switch**: Binary on/off state with smooth transitions
2. **Confirmation System**: Optional confirmation dialogs for critical actions
3. **Loading States**: Async operation support with loading indicators
4. **Custom Styling**: Size variants, colors, and icon support
5. **Animation System**: Smooth transitions and state changes
6. **Accessibility**: Complete keyboard navigation and screen reader support
7. **Form Integration**: Seamless React Hook Form integration

### Usage Examples

```tsx
// Basic toggle switch
<DocyFieldSwitch
  name="notifications"
  label="Enable notifications"
  description="Receive email notifications for important updates"
  required={true}
/>

// Switch with confirmation
<DocyFieldSwitch
  name="destructiveMode"
  label="Destructive mode"
  description="Enable dangerous operations"
  confirmChange={true}
  confirmMessage="Are you sure you want to enable destructive mode? This action cannot be undone."
  confirmTitle="Enable Destructive Mode"
  color="#EF4444"
  size="lg"
/>

// Switch with custom styling
<DocyFieldSwitch
  name="darkMode"
  label="Dark mode"
  description="Toggle between light and dark themes"
  size="md"
  color="#3B82F6"
  thumbColor="#FFFFFF"
  trackColor="#E5E7EB"
  activeColor="#1D4ED8"
  showLabels={true}
  onLabel="Dark"
  offLabel="Light"
  animation={true}
/>

// Switch with loading state
<DocyFieldSwitch
  name="autoSave"
  label="Auto-save documents"
  description="Automatically save changes as you work"
  loading={isSaving}
  loadingText="Saving..."
  onToggle={async (checked) => {
    setIsSaving(true);
    await saveSettings({ autoSave: checked });
    setIsSaving(false);
  }}
/>

// Switch with icons
<DocyFieldSwitch
  name="soundEnabled"
  label="Sound effects"
  description="Enable audio feedback"
  icon="volume-2"
  thumbIcon="music"
  size="lg"
  reverse={true}
  spacing="loose"
/>

// Switch with validation
<DocyFieldSwitch
  name="termsAccepted"
  label="I accept the terms and conditions"
  required={true}
  validations={[
    { type: 'required', message: 'You must accept the terms to continue' }
  ]}
  customValidations={[
    {
      formula: 'terms_accepted = true',
      message: 'Terms must be accepted to proceed'
    }
  ]}
/>

// Switch with computed properties
<DocyFieldSwitch
  name="premium"
  label="Premium Features"
  computedLabel="'Premium Features (' + (premium ? 'Active' : 'Inactive') + ')'"
  computedDisabled={{ field: 'userType', operator: 'equals', value: 'basic' }}
  computedRequired={{ field: 'accountType', operator: 'equals', value: 'business' }}
  description="Access to advanced features and priority support"
  color="#F59E0B"
  confirmChange={true}
  confirmMessage="Changing premium status will affect your subscription billing. Continue?"
/>

// Switch with actions
<DocyFieldSwitch
  name="emailNotifications"
  label="Email notifications"
  description="Receive notifications via email"
  actions={{
    change: [
      ['condition', 'email_notifications = true', [
        ['setFieldOption', {
          field: 'notification_frequency',
          option: 'hidden',
          value: false
        }]
      ]],
      ['condition', 'email_notifications = false', [
        ['setFieldOption', {
          field: 'notification_frequency',
          option: 'hidden',
          value: true
        }],
        ['setFieldValue', {
          field: 'notification_frequency',
          value: 'never'
        }]
      ]]
    ]
  }}
/>

// Advanced switch with all features
<DocyFieldSwitch
  name="maintenanceMode"
  label="Maintenance mode"
  description="Put the system into maintenance mode"
  size="lg"
  color="#EF4444"
  thumbColor="#FFFFFF"
  trackColor="#FEE2E2"
  activeColor="#DC2626"
  showLabels={true}
  onLabel="ON"
  offLabel="OFF"
  icon="wrench"
  thumbIcon="alert-triangle"
  confirmChange={true}
  confirmTitle="Enable Maintenance Mode"
  confirmMessage="This will make the system unavailable to users. Are you sure you want to continue?"
  confirmButtonText="Enable Maintenance"
  cancelButtonText="Cancel"
  loading={isToggling}
  loadingText="Updating system..."
  reverse={true}
  spacing="loose"
  orientation="horizontal"
  animation={true}
  onToggle={async (checked) => {
    setIsToggling(true);
    await toggleMaintenanceMode(checked);
    setIsToggling(false);
  }}
  onConfirm={(checked) => {
    console.log('Maintenance mode confirmed:', checked);
  }}
  onCancel={() => {
    console.log('Maintenance mode change cancelled');
  }}
  validations={[
    { type: 'required', message: 'Maintenance mode selection is required' }
  ]}
  customValidations={[
    {
      formula: 'user_role = "admin"',
      message: 'Only administrators can change maintenance mode'
    }
  ]}
/>
```

### Integration Requirements
- **DocyFieldBase**: Base wrapper component (required)
- **DocySwitch**: Base switch component from uikit
- **DocyDialog**: For confirmation dialogs
- **DocyIcon**: For custom icons and switch icons
- **DocySpinner**: For loading states
- **DocyLabel**: For proper labeling and accessibility
- **FilterQuery**: For computed properties evaluation
- **CustomValidation**: For complex validation rules

### Dependencies Required
- `react-hook-form`: Form state management (inherited from DocyFieldBase)
- `@radix-ui/react-switch`: Base switch primitive (via shadcn/ui)
- `@radix-ui/react-dialog`: Confirmation dialogs
- `class-variance-authority`: Variant management
- `@radix-ui/react-label`: Label association
- `framer-motion`: Animation system (optional)
- All DocyFieldBase dependencies

### Testing Requirements
1. **Unit Tests**: Toggle behavior, confirmation dialogs, loading states, validation
2. **Integration Tests**: React Hook Form integration, DocyFieldBase inheritance, actions system
3. **Visual Tests**: All size variants, colors, animations, responsive behavior
4. **Accessibility Tests**: Keyboard navigation, screen reader support, ARIA attributes, focus management
5. **Performance Tests**: Animation performance, async operations, computed properties
6. **Validation Tests**: Required validation, custom validation rules, error display
7. **Confirmation Tests**: Dialog behavior, confirmation callbacks, cancellation handling
8. **Animation Tests**: Smooth transitions, spring physics, GPU acceleration

## Development Priority
**Medium** - Important form input component for settings and boolean configurations

## Notes
- Built on shadcn/ui Switch component for consistency and accessibility
- Supports confirmation dialogs for critical actions
- Integrates seamlessly with DocyFieldBase for advanced form features
- Provides comprehensive accessibility support for all user types
- Optimized for performance with smooth animations
- Flexible styling system accommodates various design requirements
- Complete validation system supports complex business logic
- Responsive design ensures optimal experience across all devices
- Advanced features like loading states and custom icons enhance user experience