/**
 * FilterQuery TypeScript Definitions
 * 
 * Based on the Docyrus FilterQuery specification for conditional logic evaluation
 * Used in computed properties like computedHidden, computedRequired, computedReadOnly, computedDisabled
 */

/**
 * Logical combinator for FilterQuery rules
 */
export type FilterCombinator = 'and' | 'or';

/**
 * Filter field types that determine how values are processed and compared
 */
export type FilterType = 
  | 'ALPHA'           // Text/string fields
  | 'NUMERIC'         // Number fields
  | 'LIST'            // List/array fields
  | 'DATE'            // Date fields
  | 'DATE_TIME'       // DateTime fields
  | 'TIME'            // Time fields
  | 'OWNER'           // User/owner fields
  | 'MULTI_SELECT'    // Multi-select fields
  | 'RELATION'        // Relation fields
  | 'APPROVAL_STATUS' // Approval status fields
  | 'BOOLEAN';        // Boolean fields

/**
 * Filter operators for different comparison types
 */
export type FilterOperator = 
  // Basic comparison operators
  | '='              // Equals
  | '!='             // Not equals
  | '<>'             // Not equals (alternative)
  | '>'              // Greater than
  | '>='             // Greater than or equal
  | '<'              // Less than
  | '<='             // Less than or equal
  
  // Text operators
  | 'like'           // Contains
  | 'not like'       // Does not contain
  | 'starts with'    // Starts with
  | 'ends with'      // Ends with
  
  // Null/empty operators
  | 'empty'          // Is null/empty
  | 'not empty'      // Is not null/empty
  
  // Boolean operators
  | 'true'           // Is true
  | 'false'          // Is false
  
  // User-specific operators
  | 'active_user'    // Current active user
  
  // Date operators - relative to current date
  | 'today'
  | 'tomorrow'
  | 'yesterday'
  | 'before_today'
  | 'after_today'
  
  // Week-based operators
  | 'this_week'
  | 'last_week'
  | 'next_week'
  
  // Month-based operators
  | 'this_month'
  | 'last_month'
  | 'next_month'
  
  // Year-based operators
  | 'this_year'
  | 'last_year'
  | 'next_year'
  
  // Quarter-based operators
  | 'first_quarter'
  | 'second_quarter'
  | 'third_quarter'
  | 'fourth_quarter'
  
  // Day range operators
  | 'last_7_days'
  | 'last_15_days'
  | 'last_30_days'
  | 'last_60_days'
  | 'last_90_days'
  | 'last_120_days'
  | 'next_7_days'
  | 'next_15_days'
  | 'next_30_days'
  | 'next_60_days'
  | 'next_90_days'
  | 'next_120_days'
  
  // Month range operators
  | 'last_3_months'
  | 'last_6_months'
  
  // Variable day operators (require value parameter)
  | 'x_days_ago'
  | 'x_days_later'
  | 'before_last_x_days'
  | 'in_last_x_days'
  | 'after_last_x_days'
  | 'in_next_x_days';

/**
 * Individual filter rule
 */
export interface FilterRule {
  /** Field slug/name to filter on */
  field: string;
  
  /** Comparison operator */
  operator: FilterOperator;
  
  /** Value to compare against (type depends on operator and filterType) */
  value: any;
  
  /** Type of field being filtered */
  filterType: FilterType;
}

/**
 * FilterQuery object with combinator and rules
 */
export interface FilterQuery {
  /** Logical combinator for combining rules */
  combinator: FilterCombinator;
  
  /** Array of rules or nested FilterQuery objects */
  rules: (FilterRule | FilterQuery)[];
}

/**
 * User data structure for user-related filters
 */
export interface FilterUser {
  userId: string;
  fullname: string;
  email: string;
  [key: string]: any;
}

/**
 * Criteria data structure for custom operators
 */
export interface FilterCriteria {
  name: string;
  custom: number;
  [key: string]: any;
}

/**
 * Configuration for FilterJsonataTransformer
 */
export interface FilterTransformerConfig {
  /** Current user data for user-specific operators */
  currentUser?: FilterUser;
  
  /** Available criteria for custom operators */
  criterias?: FilterCriteria[];
  
  /** Additional users data for lookups */
  users?: FilterUser[];
}

/**
 * Type guard to check if an object is a FilterRule
 */
export function isFilterRule(obj: FilterRule | FilterQuery): obj is FilterRule {
  return typeof (obj as FilterRule).field === 'string' && 
         typeof (obj as FilterRule).operator === 'string' &&
         typeof (obj as FilterRule).filterType === 'string';
}

/**
 * Type guard to check if an object is a FilterQuery
 */
export function isFilterQuery(obj: FilterRule | FilterQuery): obj is FilterQuery {
  return typeof (obj as FilterQuery).combinator === 'string' && 
         Array.isArray((obj as FilterQuery).rules);
}

/**
 * Helper type for complex filter values
 */
export type FilterValue = 
  | string 
  | number 
  | boolean 
  | null 
  | undefined
  | string[] 
  | number[] 
  | { id: string; [key: string]: any }
  | { id: string; [key: string]: any }[];

/**
 * Example FilterQuery objects for documentation
 */
export const EXAMPLE_FILTER_QUERIES = {
  // Simple rule: field equals value
  simpleEqual: {
    combinator: 'and',
    rules: [
      {
        field: 'status',
        operator: '=',
        value: 'active',
        filterType: 'ALPHA'
      }
    ]
  } as FilterQuery,
  
  // Multiple rules with AND combinator
  multipleAnd: {
    combinator: 'and',
    rules: [
      {
        field: 'status',
        operator: '=',
        value: 'active',
        filterType: 'ALPHA'
      },
      {
        field: 'priority',
        operator: '>',
        value: 3,
        filterType: 'NUMERIC'
      }
    ]
  } as FilterQuery,
  
  // Multiple rules with OR combinator
  multipleOr: {
    combinator: 'or',
    rules: [
      {
        field: 'status',
        operator: '=',
        value: 'urgent',
        filterType: 'ALPHA'
      },
      {
        field: 'priority',
        operator: '>=',
        value: 5,
        filterType: 'NUMERIC'
      }
    ]
  } as FilterQuery,
  
  // Nested FilterQuery
  nested: {
    combinator: 'and',
    rules: [
      {
        field: 'department',
        operator: '=',
        value: 'engineering',
        filterType: 'ALPHA'
      },
      {
        combinator: 'or',
        rules: [
          {
            field: 'level',
            operator: '=',
            value: 'senior',
            filterType: 'ALPHA'
          },
          {
            field: 'experience',
            operator: '>=',
            value: 5,
            filterType: 'NUMERIC'
          }
        ]
      }
    ]
  } as FilterQuery,
  
  // Date-based rule
  dateRule: {
    combinator: 'and',
    rules: [
      {
        field: 'createdAt',
        operator: 'last_30_days',
        value: null,
        filterType: 'DATE_TIME'
      }
    ]
  } as FilterQuery,
  
  // User-based rule
  userRule: {
    combinator: 'and',
    rules: [
      {
        field: 'assignedTo',
        operator: 'active_user',
        value: null,
        filterType: 'OWNER'
      }
    ]
  } as FilterQuery,
  
  // Array value rule
  arrayRule: {
    combinator: 'and',
    rules: [
      {
        field: 'tags',
        operator: '=',
        value: ['important', 'urgent'],
        filterType: 'MULTI_SELECT'
      }
    ]
  } as FilterQuery
};