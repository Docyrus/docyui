# DocyFieldPassword Component

## Overview
DocyFieldPassword is a specialized input component that extends DocyFieldBase to provide secure password input functionality. It builds upon the shadcn/ui Input component with Docy-specific features including visibility toggle, password strength assessment, confirmation field support, and advanced validation rules. The component supports password generation, custom strength indicators, and comprehensive security validation patterns.

This component is designed to handle various password input scenarios from simple login forms to complex registration flows with confirmation fields and strength requirements.

## Component Specification

### Props
DocyFieldPassword inherits ALL props from DocyFieldBase and adds the following password-specific properties:

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `showToggle` | boolean | true | No | Show password visibility toggle button |
| `showStrength` | boolean | false | No | Show password strength indicator |
| `strengthLevels` | StrengthLevel[] | defaultLevels | No | Custom strength level definitions |
| `confirmPassword` | boolean | false | No | Enable password confirmation functionality |
| `confirmPasswordField` | string | - | No | Name of the confirmation field to validate against |
| `minLength` | number | 8 | No | Minimum password length |
| `maxLength` | number | 128 | No | Maximum password length |
| `requireUppercase` | boolean | false | No | Require at least one uppercase letter |
| `requireLowercase` | boolean | false | No | Require at least one lowercase letter |
| `requireNumbers` | boolean | false | No | Require at least one number |
| `requireSpecialChars` | boolean | false | No | Require at least one special character |
| `specialChars` | string | '!@#$%^&*()_+-=[]{}|;:,.<>?' | No | Allowed special characters |
| `generator` | boolean | false | No | Show password generator button |
| `generatorOptions` | GeneratorOptions | defaultOptions | No | Password generator configuration |
| `onStrengthChange` | function | - | No | Callback fired when password strength changes |
| `strengthThreshold` | number | 3 | No | Minimum strength level required (1-5) |
| `showStrengthText` | boolean | true | No | Show strength level text description |
| `customStrengthValidator` | function | - | No | Custom strength validation function |
| `hideConfirmationUntilValid` | boolean | false | No | Hide confirmation field until main password is valid |
| `instantValidation` | boolean | false | No | Validate password in real-time as user types |
| `maskedValue` | boolean | false | No | Store masked value instead of plain text |
| `autoComplete` | string | 'current-password' | No | HTML autocomplete attribute |

**Note**: DocyFieldPassword inherits all DocyFieldBase props including validation, layout, dynamic computed properties, AI integration, and more. See [DocyFieldBase documentation](./DocyFieldBase.md) for the complete list.

### TypeScript Interfaces

```typescript
interface StrengthLevel {
  level: number; // 1-5 strength level
  label: string; // Display label (e.g., "Weak", "Strong")
  color: string; // CSS color class
  criteria: string[]; // Array of criteria descriptions
  minScore: number; // Minimum score for this level
}

interface GeneratorOptions {
  length: number; // Default password length
  includeUppercase: boolean; // Include uppercase letters
  includeLowercase: boolean; // Include lowercase letters
  includeNumbers: boolean; // Include numbers
  includeSpecialChars: boolean; // Include special characters
  excludeSimilar: boolean; // Exclude similar characters (0, O, l, I)
  excludeAmbiguous: boolean; // Exclude ambiguous characters
  customCharset?: string; // Custom character set
  minLength: number; // Minimum generator length
  maxLength: number; // Maximum generator length
}

interface PasswordStrengthResult {
  score: number; // Strength score (0-100)
  level: number; // Strength level (1-5)
  feedback: string[]; // Improvement suggestions
  criteria: CriteriaCheck[]; // Individual criteria results
  estimatedTime: string; // Estimated crack time
}

interface CriteriaCheck {
  name: string; // Criteria name
  met: boolean; // Whether criteria is satisfied
  description: string; // Criteria description
}

interface PasswordFieldProps extends DocyFieldBaseProps {
  showToggle?: boolean;
  showStrength?: boolean;
  strengthLevels?: StrengthLevel[];
  confirmPassword?: boolean;
  confirmPasswordField?: string;
  minLength?: number;
  maxLength?: number;
  requireUppercase?: boolean;
  requireLowercase?: boolean;
  requireNumbers?: boolean;
  requireSpecialChars?: boolean;
  specialChars?: string;
  generator?: boolean;
  generatorOptions?: GeneratorOptions;
  onStrengthChange?: (result: PasswordStrengthResult) => void;
  strengthThreshold?: number;
  showStrengthText?: boolean;
  customStrengthValidator?: (password: string) => PasswordStrengthResult;
  hideConfirmationUntilValid?: boolean;
  instantValidation?: boolean;
  maskedValue?: boolean;
  autoComplete?: string;
}
```

### Behavior

1. **Password Input Handling**:
   - Secure password input with masked characters
   - Real-time strength assessment as user types
   - Configurable validation criteria with instant feedback

2. **Visibility Toggle**:
   - Eye icon to toggle password visibility
   - Maintains focus and cursor position during toggle
   - Accessible keyboard navigation and screen reader support

3. **Strength Assessment**:
   - Real-time password strength calculation
   - Configurable strength levels with visual indicators
   - Detailed feedback for password improvement
   - Estimated crack time calculation

4. **Password Confirmation**:
   - Automatic confirmation field validation
   - Real-time matching feedback
   - Optional hiding of confirmation until main password is valid

5. **Password Generation**:
   - Built-in secure password generator
   - Configurable generation options
   - One-click generation with customizable criteria

6. **Advanced Security Features**:
   - Comprehensive validation rules
   - Custom character set support
   - Ambiguous character exclusion
   - Breach detection integration (optional)

## Component Requirements

### Technical Specifications
- **Framework**: React 18+ with TypeScript
- **Base Component**: shadcn/ui Input component (`pnpm dlx shadcn@latest add input`)
- **Extensions**: Docy-specific features including password strength assessment, confirmation validation, and secure generation built on top of shadcn base
- **Wrapper**: Extends DocyFieldBase for consistent field structure
- **Styling**: shadcn/ui Input component with Tailwind CSS v4
- **Security**: Secure password handling with optional masking
- **Validation**: Real-time validation with configurable criteria
- **Accessibility**: WCAG 2.1 AA compliance with password-specific considerations

### Key Features Required
1. **Password Masking**: Secure input with visibility toggle
2. **Strength Assessment**: Real-time password strength evaluation
3. **Confirmation Validation**: Password confirmation field support
4. **Generation**: Built-in secure password generator
5. **Advanced Validation**: Configurable security criteria
6. **Accessibility**: Complete keyboard navigation and screen reader support
7. **Security**: Secure handling of sensitive password data

## Usage Examples

```tsx
// Basic password input
<DocyFieldPassword
  name="password"
  label="Password"
  placeholder="Enter your password"
  required={true}
  showToggle={true}
/>

// Password with strength indicator
<DocyFieldPassword
  name="newPassword"
  label="New Password"
  showStrength={true}
  strengthThreshold={3}
  minLength={8}
  requireUppercase={true}
  requireLowercase={true}
  requireNumbers={true}
  onStrengthChange={(result) => console.log('Strength:', result.level)}
/>

// Password with confirmation
<DocyFieldPassword
  name="password"
  label="Password"
  confirmPassword={true}
  confirmPasswordField="confirmPassword"
  showStrength={true}
  hideConfirmationUntilValid={true}
  validations={[
    { type: 'required', message: 'Password is required' },
    { type: 'minLength', value: 8, message: 'Password must be at least 8 characters' }
  ]}
/>

// Advanced password with generator
<DocyFieldPassword
  name="masterPassword"
  label="Master Password"
  showStrength={true}
  generator={true}
  generatorOptions={{
    length: 16,
    includeUppercase: true,
    includeLowercase: true,
    includeNumbers: true,
    includeSpecialChars: true,
    excludeSimilar: true,
    minLength: 12,
    maxLength: 32
  }}
  strengthLevels={[
    { level: 1, label: 'Very Weak', color: 'text-red-600', criteria: ['Less than 6 characters'], minScore: 0 },
    { level: 2, label: 'Weak', color: 'text-orange-600', criteria: ['6-8 characters'], minScore: 20 },
    { level: 3, label: 'Fair', color: 'text-yellow-600', criteria: ['Mixed case', 'Numbers'], minScore: 40 },
    { level: 4, label: 'Good', color: 'text-blue-600', criteria: ['Special characters', '10+ chars'], minScore: 60 },
    { level: 5, label: 'Strong', color: 'text-green-600', criteria: ['All criteria met'], minScore: 80 }
  ]}
/>

// Registration form with comprehensive validation
<DocyFieldPassword
  name="password"
  label="Choose Password"
  showStrength={true}
  confirmPassword={true}
  confirmPasswordField="confirmPassword"
  minLength={8}
  maxLength={128}
  requireUppercase={true}
  requireLowercase={true}
  requireNumbers={true}
  requireSpecialChars={true}
  specialChars="!@#$%^&*()_+-=[]{}|;:,.<>?"
  strengthThreshold={4}
  instantValidation={true}
  validations={[
    { type: 'required', message: 'Password is required' },
    { type: 'custom', validator: validatePasswordComplexity, message: 'Password does not meet security requirements' }
  ]}
  customValidations={[
    { formula: 'length >= 8', message: 'Password must be at least 8 characters long' },
    { formula: 'length <= 128', message: 'Password cannot exceed 128 characters' },
    { formula: '$contains(., /[A-Z]/)', message: 'Password must contain at least one uppercase letter' },
    { formula: '$contains(., /[a-z]/)', message: 'Password must contain at least one lowercase letter' },
    { formula: '$contains(., /[0-9]/)', message: 'Password must contain at least one number' },
    { formula: '$contains(., /[!@#$%^&*()_+\\-=\\[\\]{}|;:,.<>?]/)', message: 'Password must contain at least one special character' }
  ]}
/>

// Login form with simple password
<DocyFieldPassword
  name="password"
  label="Password"
  placeholder="Enter your password"
  showToggle={true}
  showStrength={false}
  autoComplete="current-password"
  validations={[
    { type: 'required', message: 'Password is required' }
  ]}
/>

// Admin password with custom strength validator
<DocyFieldPassword
  name="adminPassword"
  label="Administrator Password"
  showStrength={true}
  customStrengthValidator={(password) => {
    // Custom enterprise password validation
    const score = calculateEnterprisePasswordScore(password);
    return {
      score,
      level: Math.ceil(score / 20),
      feedback: getEnterprisePasswordFeedback(password),
      criteria: checkEnterprisePasswordCriteria(password),
      estimatedTime: calculateCrackTime(password)
    };
  }}
  onStrengthChange={(result) => {
    if (result.level >= 4) {
      setPasswordApproved(true);
    }
  }}
/>

// Complete form integration with React Hook Form
<form onSubmit={handleSubmit(onSubmit)}>
  <DocyFieldPassword
    name="currentPassword"
    label="Current Password"
    showToggle={true}
    autoComplete="current-password"
    validations={[
      { type: 'required', message: 'Current password is required' }
    ]}
  />
  
  <DocyFieldPassword
    name="newPassword"
    label="New Password"
    showStrength={true}
    confirmPassword={true}
    confirmPasswordField="confirmNewPassword"
    minLength={12}
    requireUppercase={true}
    requireLowercase={true}
    requireNumbers={true}
    requireSpecialChars={true}
    generator={true}
    autoComplete="new-password"
    computedRequired={{ field: 'changePassword', operator: 'equals', value: true }}
    validations={[
      { type: 'required', message: 'New password is required' },
      { type: 'custom', validator: validatePasswordDifferent, message: 'New password must be different from current password' }
    ]}
  />
</form>
```

### Integration Requirements
- **DocyFieldBase**: Base wrapper component (required)
- **DocyIcon**: For visibility toggle and generator icons
- **DocyButton**: For password generator trigger
- **DocyProgress**: For strength indicator display
- **DocyTooltip**: For strength criteria display
- **Password strength library**: For security assessment
- **Crypto utilities**: For secure password generation

### Dependencies Required
- `react-hook-form`: Form state management (inherited from DocyFieldBase)
- `zxcvbn` or similar: Password strength assessment
- `crypto-js`: Secure password generation utilities
- `@radix-ui/react-progress`: Progress indicator for strength
- `@radix-ui/react-tooltip`: Tooltip for strength feedback
- `class-variance-authority`: Variant management
- All DocyFieldBase dependencies

### Testing Requirements
1. **Unit Tests**: Password validation, strength calculation, generation logic
2. **Integration Tests**: React Hook Form integration, confirmation validation
3. **Security Tests**: Password masking, secure generation, breach detection
4. **Visual Tests**: All strength indicators, toggle states, responsive behavior  
5. **Accessibility Tests**: Keyboard navigation, screen reader support, ARIA attributes
6. **Performance Tests**: Real-time strength calculation, large form rendering
7. **Usability Tests**: Password generation flow, confirmation matching feedback

## Development Priority
**High** - Critical security component required for authentication and user management

## Notes
- Password security is paramount - implement secure handling throughout
- Strength assessment should be real-time but performant
- Confirmation validation must be instant and clear
- Password generation should follow cryptographically secure practices
- Accessibility is crucial for password fields due to screen reader considerations
- Consider implementing breach detection for enhanced security
- Support for enterprise password policies and compliance requirements
- Ensure proper password masking in form data and logging
- Implement secure cleanup of password values from memory when possible