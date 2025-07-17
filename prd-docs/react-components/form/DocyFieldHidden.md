# DocyFieldHidden Component

## Overview
DocyFieldHidden is a specialized form component that extends DocyFieldBase to provide hidden field functionality for form data management. Unlike visible input fields, this component manages data that is not displayed to users but is essential for form processing, tracking, and state management. It supports dynamic values, computed properties, security features, and advanced data handling capabilities.

This component is ideal for maintaining form state, tracking metadata, storing computed values, managing security tokens, and handling complex data transformations without exposing sensitive information to the user interface.

## Component Specification

### Props
DocyFieldHidden inherits ALL props from DocyFieldBase and adds the following hidden-specific properties:

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `value` | any | - | No | Current hidden field value (supports any data type) |
| `serialize` | boolean | false | No | Automatically serialize complex values to string |
| `serializer` | function | JSON.stringify | No | Custom serialization function for complex values |
| `deserializer` | function | JSON.parse | No | Custom deserialization function for complex values |
| `trackChanges` | boolean | false | No | Track value changes for audit trails |
| `persist` | boolean | false | No | Persist value across browser sessions |
| `encrypt` | boolean | false | No | Encrypt sensitive values before storage |
| `computeValue` | function | - | No | Function to compute value from other fields |
| `dependencies` | string[] | [] | No | Field names that trigger value recomputation |
| `onValueComputed` | function | - | No | Callback when computed value changes |
| `debug` | boolean | false | No | Enable debug mode for development |
| `debugLabel` | string | - | No | Custom label for debug display |
| `exposeInDevTools` | boolean | false | No | Expose field in React DevTools |

**Note**: DocyFieldHidden inherits all DocyFieldBase props including validation, dynamic computed properties, actions, and more. See [DocyFieldBase documentation](./DocyFieldBase.md) for the complete list.

### TypeScript Interfaces

```typescript
interface HiddenFieldProps extends DocyFieldBaseProps {
  value?: any;
  serialize?: boolean;
  serializer?: (value: any) => string;
  deserializer?: (value: string) => any;
  trackChanges?: boolean;
  persist?: boolean;
  encrypt?: boolean;
  computeValue?: (formData: Record<string, any>) => any;
  dependencies?: string[];
  onValueComputed?: (value: any, previousValue: any) => void;
  debug?: boolean;
  debugLabel?: string;
  exposeInDevTools?: boolean;
}

interface HiddenFieldState {
  currentValue: any;
  previousValue: any;
  isComputing: boolean;
  changeHistory: ChangeRecord[];
  lastUpdated: Date;
}

interface ChangeRecord {
  timestamp: Date;
  previousValue: any;
  newValue: any;
  trigger: 'manual' | 'computed' | 'action' | 'deserialization';
  source?: string;
}

interface EncryptionConfig {
  algorithm: 'AES-256-GCM' | 'AES-128-GCM';
  keySource: 'session' | 'environment' | 'user';
  saltLength: number;
}
```

### Behavior

1. **Value Management**:
   - Supports any data type (primitive, object, array, function references)
   - Automatic serialization/deserialization for complex types
   - Optional encryption for sensitive data
   - Persistence across browser sessions when enabled

2. **Computed Values**:
   - Real-time value computation based on other form fields
   - Dependency tracking for efficient updates
   - Debounced computation to prevent excessive calculations
   - Callback notifications for computed value changes

3. **Change Tracking**:
   - Optional audit trail of value changes
   - Timestamp and source tracking for each change
   - History retention with configurable limits
   - Integration with form validation system

4. **Security Features**:
   - Client-side encryption for sensitive data
   - Secure serialization preventing code injection
   - Optional exposure control for development tools
   - Validation of deserialized data types

5. **Development Support**:
   - Debug mode with console logging
   - React DevTools integration when enabled
   - Custom debug labels for identification
   - Performance monitoring for computed values

## Component Requirements

### Technical Specifications
- **Framework**: React 18+ with TypeScript
- **Base Component**: Custom implementation (no shadcn/ui equivalent) using HTML hidden input
- **Extensions**: Docy-specific features including value computation, encryption, change tracking, and advanced data handling
- **Wrapper**: Extends DocyFieldBase for consistent field structure
- **Styling**: Hidden implementation (no visual styling required)
- **Encryption**: Client-side encryption for sensitive data (crypto-js or Web Crypto API)
- **Persistence**: LocalStorage/SessionStorage integration
- **Validation**: React Hook Form integration with custom validators
- **Accessibility**: N/A (hidden from users and assistive technologies)

### Key Features Required
1. **Universal Data Support**: Handle any JavaScript data type
2. **Computed Values**: Real-time computation from other form fields
3. **Change Tracking**: Audit trail and history management
4. **Security**: Encryption and secure serialization
5. **Persistence**: Cross-session data retention
6. **Development Tools**: Debug mode and DevTools integration
7. **Performance**: Efficient dependency tracking and computation

### Usage Examples

```tsx
// Basic hidden field for form metadata
<DocyFieldHidden
  name="formVersion"
  value="2.1.0"
/>

// Hidden field with computed value from other fields
<DocyFieldHidden
  name="fullName"
  computeValue={(formData) => `${formData.firstName} ${formData.lastName}`}
  dependencies={['firstName', 'lastName']}
  onValueComputed={(value) => console.log('Full name computed:', value)}
/>

// Tracking field with change history
<DocyFieldHidden
  name="lastModified"
  value={new Date().toISOString()}
  trackChanges={true}
  serialize={true}
  onValueComputed={(value, previousValue) => {
    console.log('Value changed from', previousValue, 'to', value);
  }}
/>

// Encrypted sensitive data field
<DocyFieldHidden
  name="apiKey"
  value={userApiKey}
  encrypt={true}
  persist={true}
  serialize={true}
  debug={false}
  exposeInDevTools={false}
/>

// Complex object with custom serialization
<DocyFieldHidden
  name="formState"
  value={{
    step: 1,
    completedSections: ['basic', 'contact'],
    validationErrors: {}
  }}
  serialize={true}
  serializer={(obj) => btoa(JSON.stringify(obj))}
  deserializer={(str) => JSON.parse(atob(str))}
  persist={true}
/>

// Computed total with dependencies
<DocyFieldHidden
  name="orderTotal"
  computeValue={(formData) => {
    const subtotal = formData.items?.reduce((sum, item) => 
      sum + (item.price * item.quantity), 0) || 0;
    const tax = subtotal * (formData.taxRate || 0);
    const shipping = formData.shippingCost || 0;
    return subtotal + tax + shipping;
  }}
  dependencies={['items', 'taxRate', 'shippingCost']}
  serialize={true}
  onValueComputed={(total) => {
    console.log('Order total computed:', total);
  }}
/>

// Debug mode for development
<DocyFieldHidden
  name="debugInfo"
  value={{ 
    timestamp: Date.now(),
    userAgent: navigator.userAgent,
    formId: 'user-registration'
  }}
  debug={true}
  debugLabel="Form Debug Data"
  exposeInDevTools={true}
  trackChanges={true}
/>

// Form integration with React Hook Form
<form onSubmit={handleSubmit(onSubmit)}>
  <DocyFieldText
    name="firstName"
    label="First Name"
    required={true}
  />
  
  <DocyFieldText
    name="lastName"
    label="Last Name"
    required={true}
  />
  
  <DocyFieldHidden
    name="submissionId"
    value={generateSubmissionId()}
    persist={true}
    trackChanges={true}
  />
  
  <DocyFieldHidden
    name="userProfile"
    computeValue={(formData) => ({
      displayName: `${formData.firstName} ${formData.lastName}`,
      initials: `${formData.firstName?.[0]}${formData.lastName?.[0]}`,
      slug: `${formData.firstName}-${formData.lastName}`.toLowerCase()
    })}
    dependencies={['firstName', 'lastName']}
    serialize={true}
    onValueComputed={(profile) => {
      console.log('User profile computed:', profile);
    }}
  />
  
  <DocyFieldHidden
    name="formMetadata"
    value={{
      version: '1.0',
      created: new Date().toISOString(),
      source: 'web-form'
    }}
    serialize={true}
    encrypt={false}
    persist={true}
  />
</form>

// Advanced computed field with validation
<DocyFieldHidden
  name="validationSummary"
  computeValue={(formData) => {
    const errors = [];
    const warnings = [];
    
    if (!formData.email?.includes('@')) {
      errors.push('Invalid email format');
    }
    
    if (formData.password?.length < 8) {
      errors.push('Password too short');
    }
    
    if (formData.age < 18) {
      warnings.push('User is under 18');
    }
    
    return {
      hasErrors: errors.length > 0,
      hasWarnings: warnings.length > 0,
      errors,
      warnings,
      isValid: errors.length === 0
    };
  }}
  dependencies={['email', 'password', 'age']}
  onValueComputed={(summary) => {
    if (summary.hasErrors) {
      console.warn('Form validation errors:', summary.errors);
    }
  }}
  serialize={true}
  trackChanges={true}
/>

// Security token management
<DocyFieldHidden
  name="csrfToken"
  value={getCsrfToken()}
  encrypt={true}
  persist={false}
  exposeInDevTools={false}
  validations={[
    { type: 'required', message: 'CSRF token is required' }
  ]}
  customValidations={[
    {
      formula: '$length(csrfToken) >= 32',
      message: 'CSRF token must be at least 32 characters'
    }
  ]}
/>

// Performance tracking field
<DocyFieldHidden
  name="performanceMetrics"
  computeValue={(formData) => ({
    formLoadTime: performance.now() - formStartTime,
    fieldCount: Object.keys(formData).length,
    lastFieldUpdate: Date.now(),
    validationCount: validationCounter
  })}
  dependencies={['*']} // Special dependency for all fields
  onValueComputed={(metrics) => {
    if (metrics.formLoadTime > 5000) {
      console.warn('Form load time exceeds threshold:', metrics.formLoadTime);
    }
  }}
  debug={true}
  debugLabel="Performance Metrics"
/>
```

### Integration Requirements
- **DocyFieldBase**: Base wrapper component (required)
- **Crypto library**: For encryption functionality (crypto-js or Web Crypto API)
- **Storage API**: For persistence (localStorage/sessionStorage)
- **Performance API**: For performance tracking
- **JSON utilities**: For serialization/deserialization

### Dependencies Required
- `react-hook-form`: Form state management (inherited from DocyFieldBase)
- `crypto-js`: Client-side encryption (optional)
- `lodash.debounce`: Debounced computation (optional)
- `class-variance-authority`: Variant management
- All DocyFieldBase dependencies

### Testing Requirements
1. **Unit Tests**: Value handling, serialization, encryption, computed values
2. **Integration Tests**: React Hook Form integration, dependency tracking
3. **Performance Tests**: Large form rendering, computation efficiency
4. **Security Tests**: Encryption/decryption, secure serialization
5. **Persistence Tests**: Cross-session data retention, storage limits
6. **Computation Tests**: Dependency tracking, debounced updates
7. **Debug Tests**: Development mode functionality, DevTools integration

## Development Priority
**Medium** - Specialized component for advanced form state management and data handling

## Notes
- Custom implementation with no shadcn/ui equivalent (uses HTML hidden input)
- Designed for advanced form state management and data tracking
- Supports complex data types with secure serialization
- Encryption provides client-side security for sensitive data
- Computed values enable real-time data derivation from other fields
- Change tracking provides audit trails for compliance requirements
- Debug mode facilitates development and troubleshooting
- Performance optimized for large forms with many hidden fields
- Essential for complex forms requiring metadata, tracking, and computed values