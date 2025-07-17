/**
 * FieldActions TypeScript Definitions
 * 
 * Field actions system for triggering side effects when field events occur.
 * Uses JSON notation to define actions that can modify other fields' values or options.
 */

/**
 * Field events that can trigger actions
 */
export type FieldEvent = 'change'; // Currently only 'change' event is supported

/**
 * Field options that can be modified by actions
 */
export type FieldOption = 
  | 'hidden'
  | 'disabled' 
  | 'required'
  | 'readOnly'
  | 'label'
  | 'placeholder'
  | 'description'
  | 'help';

/**
 * Base interface for all field actions
 */
export interface BaseFieldAction {
  field: string; // Target field slug/name
}

/**
 * Action to set a field's value to a static value
 */
export interface SetFieldValueAction extends BaseFieldAction {
  value: any; // Static value to set
}

/**
 * Action to set a field's value using a JSONata formula
 */
export interface SetFieldValueCalculatedAction extends BaseFieldAction {
  formula: string; // JSONata expression to calculate the value
}

/**
 * Action to set a field's option to a static value
 */
export interface SetFieldOptionAction extends BaseFieldAction {
  option: FieldOption; // Field option to modify
  value: any; // Static value to set
}

/**
 * Action to set a field's option using a JSONata formula
 */
export interface SetFieldOptionCalculatedAction extends BaseFieldAction {
  option: FieldOption; // Field option to modify
  formula: string; // JSONata expression to calculate the value
}

/**
 * Individual field action tuple
 * Format: [actionType, actionConfig] or [actionType, condition, nestedActions]
 */
export type FieldAction = 
  | ['setFieldValue', SetFieldValueAction]
  | ['setFieldValueCalculated', SetFieldValueCalculatedAction]
  | ['setFieldOption', SetFieldOptionAction]
  | ['setFieldOptionCalculated', SetFieldOptionCalculatedAction]
  | ['condition', string, FieldAction[]]; // Conditional action with JSONata condition

/**
 * Actions configuration for field events
 */
export interface FieldActions {
  change?: FieldAction[]; // Actions to execute on field change
  // Future events can be added here (blur, focus, etc.)
}

/**
 * Type guards for field actions
 */
export function isSetFieldValueAction(action: FieldAction): action is ['setFieldValue', SetFieldValueAction] {
  return action[0] === 'setFieldValue';
}

export function isSetFieldValueCalculatedAction(action: FieldAction): action is ['setFieldValueCalculated', SetFieldValueCalculatedAction] {
  return action[0] === 'setFieldValueCalculated';
}

export function isSetFieldOptionAction(action: FieldAction): action is ['setFieldOption', SetFieldOptionAction] {
  return action[0] === 'setFieldOption';
}

export function isSetFieldOptionCalculatedAction(action: FieldAction): action is ['setFieldOptionCalculated', SetFieldOptionCalculatedAction] {
  return action[0] === 'setFieldOptionCalculated';
}

export function isConditionalAction(action: FieldAction): action is ['condition', string, FieldAction[]] {
  return action[0] === 'condition';
}

/**
 * Action execution context
 */
export interface ActionContext {
  /** Current field value */
  fieldValue: any;
  /** Current form data */
  formData: Record<string, any>;
  /** Function to set another field's value */
  setFieldValue: (field: string, value: any) => void;
  /** Function to set another field's option */
  setFieldOption: (field: string, option: FieldOption, value: any) => void;
  /** JSONata evaluation function */
  evaluateFormula: (formula: string, context?: Record<string, any>) => any;
}

/**
 * Action executor interface
 */
export interface ActionExecutor {
  /** Execute a single action */
  executeAction: (action: FieldAction, context: ActionContext) => Promise<void>;
  /** Execute multiple actions */
  executeActions: (actions: FieldAction[], context: ActionContext) => Promise<void>;
  /** Validate action structure */
  validateAction: (action: FieldAction) => { valid: boolean; error?: string };
}

/**
 * Example FieldActions configurations
 */
export const EXAMPLE_FIELD_ACTIONS = {
  // Simple value setting
  setStaticValue: {
    change: [
      ['setFieldValue', {
        field: 'has_employees',
        value: true
      }]
    ]
  } as FieldActions,

  // Calculated value using formula
  setCalculatedValue: {
    change: [
      ['setFieldValueCalculated', {
        field: 'net_total',
        formula: 'amount * qty * (1 - discount)'
      }]
    ]
  } as FieldActions,

  // Conditional calculated value
  conditionalCalculatedValue: {
    change: [
      ['condition', 'amount > 0 and qty > 0', [
        ['setFieldValueCalculated', {
          field: 'net_total',
          formula: 'amount * qty * (1 - discount)'
        }]
      ]]
    ]
  } as FieldActions,

  // Set field option
  setFieldOption: {
    change: [
      ['setFieldOption', {
        field: 'kids_count',
        option: 'hidden',
        value: true
      }]
    ]
  } as FieldActions,

  // Set field option with formula
  setFieldOptionCalculated: {
    change: [
      ['setFieldOptionCalculated', {
        field: 'kids_count',
        option: 'hidden',
        formula: '$sum(kids)'
      }]
    ]
  } as FieldActions,

  // Conditional field option
  conditionalFieldOption: {
    change: [
      ['condition', 'amount = 0 or qty = 0', [
        ['setFieldOption', {
          field: 'net_total',
          option: 'disabled',
          value: true
        }]
      ]]
    ]
  } as FieldActions,

  // Multiple actions
  multipleActions: {
    change: [
      ['setFieldValue', {
        field: 'has_employees',
        value: true
      }],
      ['setFieldOptionCalculated', {
        field: 'salary_field',
        option: 'required',
        formula: 'has_employees = true'
      }],
      ['condition', 'employee_count > 10', [
        ['setFieldOption', {
          field: 'hr_contact',
          option: 'required',
          value: true
        }]
      ]]
    ]
  } as FieldActions,

  // Complex nested conditions
  complexConditions: {
    change: [
      ['condition', 'product_type = "physical"', [
        ['setFieldOption', {
          field: 'shipping_weight',
          option: 'required',
          value: true
        }],
        ['condition', 'shipping_weight > 50', [
          ['setFieldValueCalculated', {
            field: 'shipping_cost',
            formula: 'shipping_weight * 0.1 + 15'
          }]
        ]]
      ]]
    ]
  } as FieldActions
};

/**
 * Action validation schema
 */
export const ACTION_VALIDATION_RULES = {
  setFieldValue: {
    required: ['field', 'value'],
    types: {
      field: 'string',
      value: 'any'
    }
  },
  setFieldValueCalculated: {
    required: ['field', 'formula'],
    types: {
      field: 'string',
      formula: 'string'
    }
  },
  setFieldOption: {
    required: ['field', 'option', 'value'],
    types: {
      field: 'string',
      option: 'string',
      value: 'any'
    }
  },
  setFieldOptionCalculated: {
    required: ['field', 'option', 'formula'],
    types: {
      field: 'string',
      option: 'string',
      formula: 'string'
    }
  },
  condition: {
    required: ['condition', 'actions'],
    types: {
      condition: 'string',
      actions: 'array'
    }
  }
} as const;