/**
 * CustomValidation TypeScript Definitions
 * 
 * Custom validation system for form fields using JSONata formulas
 * for complex business logic validation beyond standard validation rules.
 */

/**
 * Custom validation rule with JSONata formula
 */
export interface CustomValidation {
  /** JSONata formula that returns true if validation fails */
  formula: string;
  /** Error message to display when validation fails */
  message: string;
}

/**
 * Validation context for formula evaluation
 */
export interface ValidationContext {
  /** Current field value */
  fieldValue: any;
  /** All form values */
  formValues: Record<string, any>;
  /** Current user context */
  user?: {
    userId: string;
    role: string;
    permissions: string[];
    [key: string]: any;
  };
  /** Additional context data */
  context?: Record<string, any>;
}

/**
 * Validation result
 */
export interface ValidationResult {
  /** Whether validation passed */
  valid: boolean;
  /** Error message if validation failed */
  message?: string;
  /** Additional validation metadata */
  metadata?: Record<string, any>;
}

/**
 * Custom validation executor interface
 */
export interface CustomValidationExecutor {
  /** Execute a single custom validation */
  executeValidation: (
    validation: CustomValidation,
    context: ValidationContext
  ) => Promise<ValidationResult>;
  
  /** Execute multiple custom validations */
  executeValidations: (
    validations: CustomValidation[],
    context: ValidationContext
  ) => Promise<ValidationResult[]>;
  
  /** Validate CustomValidation structure */
  validateCustomValidation: (validation: CustomValidation) => {
    valid: boolean;
    error?: string;
  };
}

/**
 * Example CustomValidation configurations
 */
export const EXAMPLE_CUSTOM_VALIDATIONS = {
  // Email domain validation
  emailDomain: {
    formula: '$not($contains(email, "@company.com"))',
    message: 'Please use your company email address'
  } as CustomValidation,

  // Length validation
  minLength: {
    formula: '$length(password) < 8',
    message: 'Password must be at least 8 characters long'
  } as CustomValidation,

  // Role-based validation
  adminDiscountLimit: {
    formula: 'user_role = "admin" and discount_percentage > 50',
    message: 'Admin users cannot apply discounts greater than 50%'
  } as CustomValidation,

  // Cross-field validation
  passwordConfirmation: {
    formula: 'password != password_confirmation',
    message: 'Password confirmation does not match'
  } as CustomValidation,

  // Date validation
  futureDate: {
    formula: '$toMillis(due_date) <= $now()',
    message: 'Due date must be in the future'
  } as CustomValidation,

  // Numeric range validation
  discountRange: {
    formula: 'discount_percentage < 0 or discount_percentage > 100',
    message: 'Discount percentage must be between 0 and 100'
  } as CustomValidation,

  // Array validation
  minimumItems: {
    formula: '$count(selected_items) < 3',
    message: 'Please select at least 3 items'
  } as CustomValidation,

  // Complex business logic
  orderMinimum: {
    formula: 'order_total < 100 and discount_percentage > 10',
    message: 'Discounts greater than 10% require minimum order of $100'
  } as CustomValidation,

  // User permission validation
  featureAccess: {
    formula: '$not("premium_features" in user_permissions) and feature_enabled = true',
    message: 'Premium features require a premium subscription'
  } as CustomValidation,

  // Time-based validation
  businessHours: {
    formula: '$hour($now()) < 9 or $hour($now()) > 17',
    message: 'Orders can only be placed during business hours (9 AM - 5 PM)'
  } as CustomValidation,

  // Conditional validation
  conditionalRequired: {
    formula: 'account_type = "business" and $not($exists(tax_id))',
    message: 'Tax ID is required for business accounts'
  } as CustomValidation,

  // Pattern validation
  phoneFormat: {
    formula: '$not($match(phone_number, /^\\+?[1-9]\\d{1,14}$/))',
    message: 'Please enter a valid phone number'
  } as CustomValidation,

  // Dynamic validation based on context
  inventoryCheck: {
    formula: 'quantity > available_stock',
    message: 'Requested quantity exceeds available stock'
  } as CustomValidation,

  // Multi-field dependency validation
  shippingAddress: {
    formula: 'shipping_required = true and $not($exists(shipping_address))',
    message: 'Shipping address is required for physical products'
  } as CustomValidation,

  // User-specific validation
  userLevelAccess: {
    formula: 'user_level < 5 and access_level = "advanced"',
    message: 'Advanced access requires user level 5 or higher'
  } as CustomValidation
};

/**
 * Common JSONata validation patterns
 */
export const JSONATA_VALIDATION_PATTERNS = {
  // Check if field exists and is not empty
  required: '$exists(field_name) and field_name != ""',
  
  // Check string length
  minLength: '$length(field_name) >= min_length',
  maxLength: '$length(field_name) <= max_length',
  
  // Check numeric range
  minValue: 'field_name >= min_value',
  maxValue: 'field_name <= max_value',
  
  // Check array length
  minItems: '$count(array_field) >= min_items',
  maxItems: '$count(array_field) <= max_items',
  
  // Check if value is in array
  inArray: 'field_name in allowed_values',
  notInArray: '$not(field_name in forbidden_values)',
  
  // Date comparisons
  afterDate: '$toMillis(field_name) > $toMillis(comparison_date)',
  beforeDate: '$toMillis(field_name) < $toMillis(comparison_date)',
  
  // String patterns
  email: '$match(field_name, /^[^@]+@[^@]+\\.[^@]+$/)',
  phone: '$match(field_name, /^\\+?[1-9]\\d{1,14}$/)',
  url: '$match(field_name, /^https?:\\/\\/.+$/)',
  
  // User permissions
  hasPermission: 'permission_name in user_permissions',
  hasRole: 'user_role in allowed_roles',
  
  // Cross-field validation
  fieldsMatch: 'field_name_1 = field_name_2',
  fieldsDiffer: 'field_name_1 != field_name_2',
  
  // Conditional validation
  conditionalRequired: 'condition = true and $not($exists(required_field))',
  
  // File validation
  fileType: '$substringAfter(file_name, ".") in allowed_extensions',
  fileSize: 'file_size <= max_file_size'
} as const;

/**
 * Type guard for CustomValidation
 */
export function isCustomValidation(obj: any): obj is CustomValidation {
  return typeof obj === 'object' &&
         typeof obj.formula === 'string' &&
         typeof obj.message === 'string';
}

/**
 * Helper to create CustomValidation objects
 */
export function createCustomValidation(
  formula: string,
  message: string
): CustomValidation {
  return { formula, message };
}

/**
 * Helper to validate JSONata formula syntax
 */
export function validateJsonataFormula(formula: string): {
  valid: boolean;
  error?: string;
} {
  try {
    // This would use actual JSONata parser in real implementation
    // For now, just basic string validation
    if (!formula || typeof formula !== 'string') {
      return { valid: false, error: 'Formula must be a non-empty string' };
    }
    
    if (formula.trim().length === 0) {
      return { valid: false, error: 'Formula cannot be empty' };
    }
    
    return { valid: true };
  } catch (error) {
    return { valid: false, error: `Invalid JSONata formula: ${error.message}` };
  }
}