# DocyFieldEmail Component

## Overview
DocyFieldEmail is a specialized email input component that extends DocyFieldBase to provide comprehensive email-specific functionality. Built on top of the shadcn/ui Input component, it handles email validation, autocomplete suggestions, domain validation, multiple email addresses, and advanced email verification features.

This component provides a complete email input solution with features like domain suggestions, international email support, multiple email management, and real-time validation to ensure proper email format and deliverability.

## Component Specification

### Props
DocyFieldEmail inherits ALL props from DocyFieldBase and adds the following email-specific properties:

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `multiple` | boolean | false | No | Allow multiple email addresses |
| `separator` | string | ',' | No | Email separator for multiple mode |
| `domains` | string[] | [] | No | Suggested email domains for autocomplete |
| `showDomainSuggestions` | boolean | true | No | Show domain suggestions dropdown |
| `validateDomain` | boolean | false | No | Validate domain existence via DNS lookup |
| `allowInternational` | boolean | true | No | Allow international domain names |
| `maxEmails` | number | 10 | No | Maximum number of emails in multiple mode |
| `emailPattern` | RegExp | - | No | Custom email validation pattern |
| `domainValidation` | function | - | No | Custom domain validation function |
| `onEmailAdd` | function | - | No | Callback when email is added in multiple mode |
| `onEmailRemove` | function | - | No | Callback when email is removed in multiple mode |
| `autocomplete` | string[] | [] | No | Email autocomplete suggestions |
| `showAutocomplete` | boolean | true | No | Show autocomplete dropdown |
| `verifyEmail` | boolean | false | No | Enable email verification |
| `verificationEndpoint` | string | - | No | Email verification API endpoint |
| `allowDuplicates` | boolean | false | No | Allow duplicate emails in multiple mode |
| `caseSensitive` | boolean | false | No | Case-sensitive email comparison |
| `trimWhitespace` | boolean | true | No | Automatically trim whitespace |
| `showEmailCounter` | boolean | true | No | Show email count in multiple mode |
| `emailChipVariant` | string | 'default' | No | Visual variant for email chips |
| `suggestionLimit` | number | 10 | No | Maximum number of autocomplete suggestions |
| `domainSuggestionDelay` | number | 300 | No | Delay for domain suggestions (ms) |
| `validateOnBlur` | boolean | true | No | Validate emails when input loses focus |
| `validateOnType` | boolean | false | No | Validate emails while typing |

**Note**: DocyFieldEmail inherits all DocyFieldBase props including validation, layout, dynamic computed properties, AI integration, and more. See [DocyFieldBase documentation](./DocyFieldBase.md) for the complete list.

### TypeScript Interfaces

```typescript
interface EmailValidationResult {
  isValid: boolean;
  error?: string;
  suggestions?: string[];
}

interface EmailVerificationResult {
  isValid: boolean;
  isDeliverable: boolean;
  domain: string;
  error?: string;
}

interface EmailDomainSuggestion {
  domain: string;
  score: number;
  isPopular: boolean;
}

interface EmailAutocompleteSuggestion {
  email: string;
  name?: string;
  domain: string;
  recent: boolean;
}

interface EmailChipProps {
  email: string;
  variant: 'default' | 'valid' | 'invalid' | 'pending';
  onRemove: (email: string) => void;
  removable: boolean;
}

interface EmailFieldState {
  emails: string[];
  suggestions: EmailAutocompleteSuggestion[];
  domainSuggestions: EmailDomainSuggestion[];
  validationStatus: Record<string, EmailValidationResult>;
  verificationStatus: Record<string, EmailVerificationResult>;
  isValidating: boolean;
  isVerifying: boolean;
}
```

### Behavior

1. **Email Input Handling**:
   - Real-time email format validation with customizable patterns
   - Support for both single and multiple email addresses
   - Automatic whitespace trimming and case normalization
   - Duplicate detection and prevention

2. **Domain Suggestions**:
   - Intelligent domain suggestions based on popular email providers
   - Real-time domain completion as user types
   - Support for international domains and custom domain lists
   - Typo correction for common domain misspellings

3. **Multiple Email Management**:
   - Email chip display with remove functionality
   - Configurable separators (comma, semicolon, space)
   - Maximum email limit enforcement
   - Drag-and-drop reordering support

4. **Validation System**:
   - Built-in RFC 5322 compliant email validation
   - Optional domain existence verification
   - Custom validation patterns and functions
   - Real-time or on-blur validation modes

5. **Autocomplete Features**:
   - Recent email suggestions from browser history
   - Custom autocomplete lists with contact integration
   - Smart suggestion ranking based on usage frequency
   - Keyboard navigation for suggestion selection

6. **Email Verification**:
   - Optional email deliverability checking
   - Integration with external verification services
   - Async verification with loading states
   - Verification result caching

## Component Requirements

### Technical Specifications
- **Framework**: React 18+ with TypeScript
- **Base Component**: shadcn/ui Input component (`pnpm dlx shadcn@latest add input`)
- **Extensions**: Docy-specific features including multiple email handling, domain suggestions, verification, and advanced validation built on top of shadcn base
- **Wrapper**: Extends DocyFieldBase for consistent field structure
- **Styling**: shadcn/ui Input component with Tailwind CSS v4
- **Validation**: React Hook Form integration with custom email validators
- **DNS Lookup**: Optional domain validation via DNS API
- **Accessibility**: WCAG 2.1 AA compliance with proper ARIA attributes

### Key Features Required
1. **Email Validation**: RFC 5322 compliant email format validation
2. **Multiple Email Support**: Chip-based multiple email management
3. **Domain Suggestions**: Intelligent domain autocomplete
4. **Verification System**: Optional email deliverability checking
5. **Autocomplete**: Recent emails and custom suggestion lists
6. **International Support**: Unicode domain names and internationalization
7. **Performance**: Debounced validation and efficient rendering
8. **Accessibility**: Complete keyboard navigation and screen reader support

### Usage Examples

```tsx
// Basic email input
<DocyFieldEmail
  name="email"
  label="Email Address"
  placeholder="Enter your email address"
  required={true}
/>

// Multiple emails with domain suggestions
<DocyFieldEmail
  name="recipients"
  label="Send To"
  multiple={true}
  maxEmails={5}
  separator=","
  domains={['company.com', 'gmail.com', 'outlook.com']}
  showDomainSuggestions={true}
  onEmailAdd={(email) => console.log('Added:', email)}
  onEmailRemove={(email) => console.log('Removed:', email)}
/>

// Email with verification
<DocyFieldEmail
  name="businessEmail"
  label="Business Email"
  verifyEmail={true}
  verificationEndpoint="/api/verify-email"
  validateDomain={true}
  allowInternational={true}
  validations={[
    { type: 'required', message: 'Business email is required' },
    { type: 'email', message: 'Please enter a valid email address' }
  ]}
/>

// Custom domain validation
<DocyFieldEmail
  name="companyEmail"
  label="Company Email"
  domainValidation={(domain) => {
    const allowedDomains = ['company.com', 'subsidiary.com'];
    return allowedDomains.includes(domain) || {
      isValid: false,
      error: 'Please use your company email address'
    };
  }}
  emailPattern={/^[a-zA-Z0-9._%+-]+@(company\.com|subsidiary\.com)$/}
/>

// Autocomplete with recent emails
<DocyFieldEmail
  name="contacts"
  label="Contact Email"
  autocomplete={[
    { email: 'john.doe@company.com', name: 'John Doe', recent: true },
    { email: 'jane.smith@company.com', name: 'Jane Smith', recent: false },
    { email: 'support@company.com', name: 'Support Team', recent: true }
  ]}
  showAutocomplete={true}
  suggestionLimit={5}
/>

// Multiple emails with custom separator
<DocyFieldEmail
  name="emailList"
  label="Email List"
  multiple={true}
  separator=";"
  maxEmails={20}
  allowDuplicates={false}
  showEmailCounter={true}
  emailChipVariant="default"
  validateOnType={true}
/>

// Advanced validation with custom rules
<DocyFieldEmail
  name="adminEmail"
  label="Admin Email"
  validations={[
    { type: 'required', message: 'Admin email is required' },
    { type: 'email', message: 'Please enter a valid email address' }
  ]}
  customValidations={[
    {
      formula: '$not($contains(adminEmail, "@admin.company.com"))',
      message: 'Admin email must use @admin.company.com domain'
    },
    {
      formula: '$length(adminEmail) > 50',
      message: 'Email address is too long'
    }
  ]}
  actions={{
    change: [
      ['setFieldValue', {
        field: 'emailVerified',
        value: false
      }]
    ]
  }}
/>

// International email support
<DocyFieldEmail
  name="internationalEmail"
  label="International Email"
  allowInternational={true}
  domains={['企业.中国', 'компания.рф', 'société.fr']}
  placeholder="Enter international email address"
  caseSensitive={false}
/>

// Email with computed properties
<DocyFieldEmail
  name="notificationEmail"
  computedLabel="'Notification Email (' + userRole + ')'"
  computedRequired={{ field: 'emailNotifications', operator: 'equals', value: true }}
  computedHidden={{ field: 'userType', operator: 'equals', value: 'guest' }}
  multiple={true}
  maxEmails={3}
/>

// Complete form integration with React Hook Form
<form onSubmit={handleSubmit(onSubmit)}>
  <DocyFieldEmail
    name="primaryEmail"
    label="Primary Email"
    validations={[
      { type: 'required', message: 'Primary email is required' },
      { type: 'email', message: 'Please enter a valid email address' }
    ]}
    verifyEmail={true}
    showDomainSuggestions={true}
    validateOnBlur={true}
  />
  
  <DocyFieldEmail
    name="ccEmails"
    label="CC Recipients"
    multiple={true}
    maxEmails={10}
    separator=","
    computedHidden={{ field: 'sendCopy', operator: 'equals', value: false }}
    onEmailAdd={(email) => trackEmailAdd(email)}
    onEmailRemove={(email) => trackEmailRemove(email)}
  />
  
  <DocyFieldEmail
    name="bccEmails"
    label="BCC Recipients"
    multiple={true}
    maxEmails={5}
    separator=";"
    computedRequired={{ field: 'requireBcc', operator: 'equals', value: true }}
    allowDuplicates={false}
    showEmailCounter={true}
  />
</form>

// Email with custom chip styling
<DocyFieldEmail
  name="teamEmails"
  label="Team Members"
  multiple={true}
  emailChipVariant="team"
  maxEmails={15}
  onEmailAdd={(email) => {
    // Custom validation logic
    if (email.endsWith('@competitor.com')) {
      throw new Error('Competitor emails not allowed');
    }
  }}
  domainSuggestionDelay={500}
  trimWhitespace={true}
/>
```

### Integration Requirements
- **DocyFieldBase**: Base wrapper component (required)
- **DocyChip**: For email chip display in multiple mode
- **DocyPopover**: For suggestion dropdowns
- **DocySpinner**: For loading states during verification
- **DocyTooltip**: For validation error display
- **DNS Lookup Service**: For domain validation
- **Email Verification API**: For deliverability checking

### Dependencies Required
- `react-hook-form`: Form state management (inherited from DocyFieldBase)
- `@radix-ui/react-popover`: For suggestion dropdowns
- `email-validator`: For RFC 5322 email validation
- `punycode`: For international domain support
- `debounce`: For performance optimization
- `class-variance-authority`: Variant management
- All DocyFieldBase dependencies

### Testing Requirements
1. **Unit Tests**: Email validation, multiple email handling, domain suggestions, verification logic
2. **Integration Tests**: React Hook Form integration, autocomplete functionality, API integration
3. **Visual Tests**: All variants, chip display, dropdown states, responsive behavior
4. **Accessibility Tests**: Keyboard navigation, screen reader support, ARIA attributes
5. **Performance Tests**: Large email lists, suggestion rendering, validation performance
6. **Validation Tests**: RFC 5322 compliance, custom patterns, domain validation
7. **Internationalization Tests**: Unicode domains, international email formats
8. **API Tests**: Email verification, domain lookup, error handling

## Development Priority
**High** - Essential form field component frequently used across the platform

## Notes
- Built on shadcn/ui Input component with extensive email-specific enhancements
- Supports both single and multiple email input modes
- Comprehensive validation including format, domain, and deliverability checking
- Intelligent domain suggestions with typo correction
- International email support with Unicode domains
- Performance optimized with debounced validation and efficient rendering
- Complete accessibility compliance for inclusive user experience
- Integrates seamlessly with React Hook Form and DocyFieldBase
- Extensive customization options for various use cases
- Real-time validation and verification capabilities
- Mobile-optimized for touch interactions