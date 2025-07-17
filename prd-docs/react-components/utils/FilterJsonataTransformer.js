/**
 * FilterJsonataTransformer
 * 
 * Converts FilterQuery objects to JSONata expressions for data filtering.
 * Based on the original Vue useFilterJsonataTransformer but implemented as a native JavaScript class.
 * 
 * Usage:
 * const transformer = new FilterJsonataTransformer({
 *   currentUser: { userId: '123', fullname: 'John Doe' },
 *   criterias: [],
 *   users: []
 * });
 * 
 * const jsonataQuery = transformer.getJsonataQuery(filterQuery);
 */

/**
 * Date utility functions (simplified versions of date-fns)
 */
class DateUtils {
  static addDays(date, days) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  static subDays(date, days) {
    return this.addDays(date, -days);
  }

  static addMonths(date, months) {
    const result = new Date(date);
    result.setMonth(result.getMonth() + months);
    return result;
  }

  static subMonths(date, months) {
    return this.addMonths(date, -months);
  }

  static startOfDay(date) {
    const result = new Date(date);
    result.setHours(0, 0, 0, 0);
    return result;
  }

  static endOfDay(date) {
    const result = new Date(date);
    result.setHours(23, 59, 59, 999);
    return result;
  }

  static startOfWeek(date, weekStartsOn = 1) { // Monday = 1
    const result = new Date(date);
    const day = result.getDay();
    const diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;
    result.setDate(result.getDate() - diff);
    return this.startOfDay(result);
  }

  static endOfWeek(date, weekStartsOn = 1) {
    const result = this.startOfWeek(date, weekStartsOn);
    result.setDate(result.getDate() + 6);
    return this.endOfDay(result);
  }

  static startOfMonth(date) {
    const result = new Date(date);
    result.setDate(1);
    return this.startOfDay(result);
  }

  static endOfMonth(date) {
    const result = new Date(date);
    result.setMonth(result.getMonth() + 1, 0);
    return this.endOfDay(result);
  }

  static startOfYear(date) {
    const result = new Date(date);
    result.setMonth(0, 1);
    return this.startOfDay(result);
  }

  static endOfYear(date) {
    const result = new Date(date);
    result.setMonth(11, 31);
    return this.endOfDay(result);
  }

  static formatISO(date) {
    return date.toISOString();
  }

  static getYear(date) {
    return new Date(date).getFullYear();
  }
}

/**
 * FilterJsonataTransformer Class
 */
export class FilterJsonataTransformer {
  constructor(config = {}) {
    this.currentUser = config.currentUser || null;
    this.criterias = config.criterias || [];
    this.users = config.users || [];
  }

  /**
   * Get static operator condition for special date and user operators
   */
  getStaticOperatorCondition(field, operator, value) {
    const now = Date.now();
    
    switch (operator) {
      // USER
      case 'active_user':
        return `${field} ${this.getOperator('=')} "${this.currentUser?.userId || ''}"`;
        
      // DATE - Single day operators
      case 'today':
        return `(${field} ${this.getOperator('>=')} "${DateUtils.formatISO(DateUtils.startOfDay(now))}" and ${field} ${this.getOperator('<=')} "${DateUtils.formatISO(DateUtils.endOfDay(now))}")`;
        
      case 'tomorrow':
        return `${field} ${this.getOperator('=')} "${DateUtils.formatISO(DateUtils.addDays(DateUtils.startOfDay(now), 1))}"`;
        
      case 'yesterday':
        return `${field} ${this.getOperator('=')} "${DateUtils.formatISO(DateUtils.subDays(DateUtils.startOfDay(now), 1))}"`;
        
      case 'before_today':
        return `${field} ${this.getOperator('<=')} "${DateUtils.formatISO(DateUtils.subDays(DateUtils.startOfDay(now), 1))}"`;
        
      case 'after_today':
        return `${field} ${this.getOperator('>=')} "${DateUtils.formatISO(DateUtils.addDays(DateUtils.startOfDay(now), 1))}"`;

      // DATE - Day range operators (last X days)
      case 'last_7_days':
        return `and(${field} ${this.getOperator('>=')} "${DateUtils.formatISO(DateUtils.subDays(DateUtils.startOfDay(now), 6))}", ${field} ${this.getOperator('<')} "${DateUtils.formatISO(DateUtils.endOfDay(now))}")`;
        
      case 'last_15_days':
        return `and(${field} ${this.getOperator('>=')} "${DateUtils.formatISO(DateUtils.subDays(DateUtils.startOfDay(now), 14))}", ${field} ${this.getOperator('<')} "${DateUtils.formatISO(DateUtils.endOfDay(now))}")`;
        
      case 'last_30_days':
        return `and(${field} ${this.getOperator('>=')} "${DateUtils.formatISO(DateUtils.subDays(DateUtils.startOfDay(now), 29))}", ${field} ${this.getOperator('<')} "${DateUtils.formatISO(DateUtils.endOfDay(now))}")`;
        
      case 'last_60_days':
        return `and(${field} ${this.getOperator('>=')} "${DateUtils.formatISO(DateUtils.subDays(DateUtils.startOfDay(now), 59))}", ${field} ${this.getOperator('<')} "${DateUtils.formatISO(DateUtils.endOfDay(now))}")`;
        
      case 'last_90_days':
        return `and(${field} ${this.getOperator('>=')} "${DateUtils.formatISO(DateUtils.subDays(DateUtils.startOfDay(now), 89))}", ${field} ${this.getOperator('<')} "${DateUtils.formatISO(DateUtils.endOfDay(now))}")`;
        
      case 'last_120_days':
        return `and(${field} ${this.getOperator('>=')} "${DateUtils.formatISO(DateUtils.subDays(DateUtils.startOfDay(now), 119))}", ${field} ${this.getOperator('<')} "${DateUtils.formatISO(DateUtils.endOfDay(now))}")`;

      // DATE - Day range operators (next X days)
      case 'next_7_days':
        return `and(${field} ${this.getOperator('<=')} "${DateUtils.formatISO(DateUtils.addDays(DateUtils.endOfDay(now), 6))}", ${field} ${this.getOperator('>')} "${DateUtils.formatISO(DateUtils.startOfDay(now))}")`;
        
      case 'next_15_days':
        return `and(${field} ${this.getOperator('<=')} "${DateUtils.formatISO(DateUtils.addDays(DateUtils.endOfDay(now), 14))}", ${field} ${this.getOperator('>')} "${DateUtils.formatISO(DateUtils.startOfDay(now))}")`;
        
      case 'next_30_days':
        return `and(${field} ${this.getOperator('<=')} "${DateUtils.formatISO(DateUtils.addDays(DateUtils.endOfDay(now), 29))}", ${field} ${this.getOperator('>')} "${DateUtils.formatISO(DateUtils.startOfDay(now))}")`;
        
      case 'next_60_days':
        return `and(${field} ${this.getOperator('<=')} "${DateUtils.formatISO(DateUtils.addDays(DateUtils.endOfDay(now), 59))}", ${field} ${this.getOperator('>')} "${DateUtils.formatISO(DateUtils.startOfDay(now))}")`;
        
      case 'next_90_days':
        return `and(${field} ${this.getOperator('<=')} "${DateUtils.formatISO(DateUtils.addDays(DateUtils.endOfDay(now), 89))}", ${field} ${this.getOperator('>')} "${DateUtils.formatISO(DateUtils.startOfDay(now))}")`;
        
      case 'next_120_days':
        return `and(${field} ${this.getOperator('<=')} "${DateUtils.formatISO(DateUtils.addDays(DateUtils.endOfDay(now), 119))}", ${field} ${this.getOperator('>')} "${DateUtils.formatISO(DateUtils.startOfDay(now))}")`;

      // DATE - Week operators
      case 'last_week':
        const lastWeekStart = DateUtils.subDays(DateUtils.startOfWeek(now), 7);
        const lastWeekEnd = DateUtils.subDays(DateUtils.endOfWeek(now), 7);
        return `and(${field} ${this.getOperator('>=')} "${DateUtils.formatISO(lastWeekStart)}", ${field} ${this.getOperator('<=')} "${DateUtils.formatISO(lastWeekEnd)}")`;
        
      case 'this_week':
        return `and(${field} ${this.getOperator('>=')} "${DateUtils.formatISO(DateUtils.startOfWeek(now))}", ${field} ${this.getOperator('<=')} "${DateUtils.formatISO(DateUtils.endOfWeek(now))}")`;
        
      case 'next_week':
        const nextWeekStart = DateUtils.addDays(DateUtils.startOfWeek(now), 7);
        const nextWeekEnd = DateUtils.addDays(DateUtils.endOfWeek(now), 7);
        return `and(${field} ${this.getOperator('>=')} "${DateUtils.formatISO(nextWeekStart)}", ${field} ${this.getOperator('<=')} "${DateUtils.formatISO(nextWeekEnd)}")`;

      // DATE - Month operators
      case 'last_month':
        const lastMonth = DateUtils.subMonths(now, 1);
        return `and(${field} ${this.getOperator('>=')} "${DateUtils.formatISO(DateUtils.startOfMonth(lastMonth))}", ${field} ${this.getOperator('<=')} "${DateUtils.formatISO(DateUtils.endOfMonth(lastMonth))}")`;
        
      case 'this_month':
        return `and(${field} ${this.getOperator('>=')} "${DateUtils.formatISO(DateUtils.startOfMonth(now))}", ${field} ${this.getOperator('<=')} "${DateUtils.formatISO(DateUtils.endOfMonth(now))}")`;
        
      case 'next_month':
        const nextMonth = DateUtils.addMonths(now, 1);
        return `and(${field} ${this.getOperator('>=')} "${DateUtils.formatISO(DateUtils.startOfMonth(nextMonth))}", ${field} ${this.getOperator('<=')} "${DateUtils.formatISO(DateUtils.endOfMonth(nextMonth))}")`;

      // DATE - Year operators
      case 'last_year':
        const lastYear = new Date(DateUtils.getYear(now) - 1, 0, 1);
        const lastYearEnd = new Date(DateUtils.getYear(now) - 1, 11, 31);
        return `and(${field} ${this.getOperator('>=')} "${DateUtils.formatISO(DateUtils.startOfDay(lastYear))}", ${field} ${this.getOperator('<=')} "${DateUtils.formatISO(DateUtils.endOfDay(lastYearEnd))}")`;
        
      case 'this_year':
        return `and(${field} ${this.getOperator('>=')} "${DateUtils.formatISO(DateUtils.startOfYear(now))}", ${field} ${this.getOperator('<=')} "${DateUtils.formatISO(DateUtils.endOfYear(now))}")`;
        
      case 'next_year':
        const nextYear = new Date(DateUtils.getYear(now) + 1, 0, 1);
        const nextYearEnd = new Date(DateUtils.getYear(now) + 1, 11, 31);
        return `and(${field} ${this.getOperator('>=')} "${DateUtils.formatISO(DateUtils.startOfDay(nextYear))}", ${field} ${this.getOperator('<=')} "${DateUtils.formatISO(DateUtils.endOfDay(nextYearEnd))}")`;

      // DATE - Quarter operators
      case 'first_quarter':
        const year = DateUtils.getYear(now);
        return `and(${field} ${this.getOperator('>=')} "${DateUtils.formatISO(new Date(year, 0, 1))}", ${field} ${this.getOperator('<=')} "${DateUtils.formatISO(DateUtils.endOfDay(new Date(year, 2, 31)))}")`;
        
      case 'second_quarter':
        return `and(${field} ${this.getOperator('>=')} "${DateUtils.formatISO(new Date(DateUtils.getYear(now), 3, 1))}", ${field} ${this.getOperator('<=')} "${DateUtils.formatISO(DateUtils.endOfDay(new Date(DateUtils.getYear(now), 5, 30)))}")`;
        
      case 'third_quarter':
        return `and(${field} ${this.getOperator('>=')} "${DateUtils.formatISO(new Date(DateUtils.getYear(now), 6, 1))}", ${field} ${this.getOperator('<=')} "${DateUtils.formatISO(DateUtils.endOfDay(new Date(DateUtils.getYear(now), 8, 30)))}")`;
        
      case 'fourth_quarter':
        return `and(${field} ${this.getOperator('>=')} "${DateUtils.formatISO(new Date(DateUtils.getYear(now), 9, 1))}", ${field} ${this.getOperator('<=')} "${DateUtils.formatISO(DateUtils.endOfDay(new Date(DateUtils.getYear(now), 11, 31)))}")`;

      // DATE - Month range operators
      case 'last_6_months':
        return `and(${field} ${this.getOperator('>=')} "${DateUtils.formatISO(DateUtils.startOfDay(DateUtils.subMonths(now, 6)))}", ${field} ${this.getOperator('<')} "${DateUtils.formatISO(DateUtils.endOfDay(now))}")`;
        
      case 'last_3_months':
        return `and(${field} ${this.getOperator('>=')} "${DateUtils.formatISO(DateUtils.startOfDay(DateUtils.subMonths(now, 3)))}", ${field} ${this.getOperator('<')} "${DateUtils.formatISO(DateUtils.endOfDay(now))}")`;

      // DATE - Variable day operators
      case 'x_days_ago':
        const daysAgo = DateUtils.subDays(now, value);
        return `and(${field} ${this.getOperator('>=')} "${DateUtils.formatISO(DateUtils.startOfDay(daysAgo))}", ${field} ${this.getOperator('<=')} "${DateUtils.formatISO(DateUtils.endOfDay(daysAgo))}")`;
        
      case 'x_days_later':
        const daysLater = DateUtils.addDays(now, value);
        return `and(${field} ${this.getOperator('>=')} "${DateUtils.formatISO(DateUtils.startOfDay(daysLater))}", ${field} ${this.getOperator('<=')} "${DateUtils.formatISO(DateUtils.endOfDay(daysLater))}")`;
        
      case 'before_last_x_days':
        return `${field} ${this.getOperator('<=')} "${DateUtils.formatISO(DateUtils.startOfDay(DateUtils.subDays(now, value)))}"`;
        
      case 'in_last_x_days':
        return `and(${field} ${this.getOperator('>=')} "${DateUtils.formatISO(DateUtils.startOfDay(DateUtils.subDays(now, value)))}", ${field} ${this.getOperator('<=')} "${DateUtils.formatISO(DateUtils.endOfDay(now))}")`;
        
      case 'after_last_x_days':
        return `and(${field} ${this.getOperator('>=')} "${DateUtils.formatISO(DateUtils.startOfDay(DateUtils.subDays(now, value)))}", ${field} ${this.getOperator('<=')} "${DateUtils.formatISO(DateUtils.endOfDay(now))}")`;
        
      case 'in_next_x_days':
        return `and(${field} ${this.getOperator('>=')} "${DateUtils.formatISO(DateUtils.startOfDay(now))}", ${field} ${this.getOperator('<=')} "${DateUtils.formatISO(DateUtils.endOfDay(DateUtils.addDays(now, value)))}")`;

      default:
        throw new Error(`Undefined operator: ${operator}`);
    }
  }

  /**
   * Get logical combinator
   */
  getCombinator(combinator) {
    switch (combinator) {
      case 'and':
        return 'and';
      case 'or':
        return 'or';
      default:
        return 'and';
    }
  }

  /**
   * Get JSONata operator
   */
  getOperator(operator) {
    switch (operator) {
      case 'empty':
        return '= null';
      case 'not empty':
        return '!= null';
      case 'true':
        return 'true';
      case 'false':
        return 'false';
      case '=':
        return '=';
      case '<>':
      case '!=':
        return '!=';
      case '>':
        return '>';
      case '>=':
        return '>=';
      case '<':
        return '<';
      case '<=':
        return '<=';
      case 'like':
      case 'starts with':
        return 'like';
      case 'ends with':
        return 'like';
      case 'not like':
        return 'not.like';
      default:
        return 'custom';
    }
  }

  /**
   * Build value for JSONata expression
   */
  valueBuilder(value, filterType) {
    if (typeof value === 'undefined') {
      value = null;
    }

    // If object with id property
    if (value !== null && value instanceof Object && value.hasOwnProperty('id') && value.id !== null) {
      return `"${value.id}"`;
    }
    else if (typeof value === 'string') {
      return `"${value}"`;
    }
    else if (Array.isArray(value)) {
      if (value.length === 0) {
        return '[]';
      }
      else if (typeof value[0] === 'string') {
        return `[${value.map(v => `"${v}"`).join(',')}]`;
      }
      else if (typeof value[0] === 'object') {
        if (value[0].hasOwnProperty('id')) {
          return `[${value.map(v => `"${v.id}"`).join(',')}]`;
        }
        else {
          return JSON.stringify(value);
        }
      }
      else {
        return `[${value.join(',')}]`;
      }
    }
    else {
      return value;
    }
  }

  /**
   * Build condition for a single rule
   */
  conditionBuilder(field, operator, value, filterType) {
    const op = this.getOperator(operator);
    const objectFieldTypes = ['OWNER', 'LIST', 'RELATION'];

    // Handle approval status fields
    if (filterType === 'APPROVAL_STATUS') {
      field = `${field}.status`;
    }

    switch (op) {
      case '= null':
      case '!= null':
        return `${field} ${op}`;
        
      case 'like':
        return operator === 'starts with'
          ? `$startsWith(${field}, ${this.valueBuilder(value, filterType)})`
          : operator === 'ends with'
            ? `$endsWith(${field}, ${this.valueBuilder(value, filterType)})`
            : `$includes(${field}, ${this.valueBuilder(value, filterType)})`;
            
      case 'not.like':
        return `$includes(${field}, ${this.valueBuilder(value, filterType)}) = false`;
        
      case 'true':
        return `${field} = true`;
        
      case 'false':
        return `${field} != true`;
        
      case '!=':
        if (Array.isArray(value) && value.length > 0) {
          return `${field} in ${this.valueBuilder(value, filterType)} = false`;
        }
        else {
          return `${field} != ${this.valueBuilder(value, filterType)}`;
        }
        
      case '=':
        return `$isEqualOrContained(${field}, ${this.valueBuilder(value)})`;
        
      case '>':
      case '<=':
      case '>=':
      case '<':
        return `${field} ${op} ${this.valueBuilder(value, filterType)}`;
        
      case 'custom':
        return this.getStaticOperatorCondition(field, operator, value);
        
      default:
        const criteria = this.criterias.find(c => c.name === operator);
        if (criteria && criteria.custom === 0) {
          return this.getStaticOperatorCondition(field, operator, value);
        }
        else {
          return `${field} ${op} ${this.valueBuilder(value, filterType)}`;
        }
    }
  }

  /**
   * Build query recursively
   */
  buildQuery(query, combinator) {
    if (query) {
      if (query.rules) {
        return this.buildQuery(query.rules, query.combinator);
      }
      else {
        const queries = [];
        query.forEach(q => {
          if (q.rules) {
            if (q.rules[0]) {
              queries.push(this.buildQuery(q.rules, q.combinator));
            }
          }
          else {
            queries.push(this.conditionBuilder(q.field, q.operator, q.value, q.filterType));
          }
        });
        return `(${queries.join(` ${this.getCombinator(combinator)} `)})`;
      }
    }
  }

  /**
   * Convert FilterQuery to JSONata expression
   */
  getJsonataQuery(query) {
    if (!query) {
      return null;
    }
    
    const transformedQuery = this.buildQuery(query);
    return transformedQuery;
  }

  /**
   * Validate FilterQuery structure
   */
  validateFilterQuery(query) {
    if (!query) {
      return { valid: true };
    }

    if (typeof query !== 'object') {
      return { valid: false, error: 'FilterQuery must be an object' };
    }

    if (!query.combinator || !['and', 'or'].includes(query.combinator)) {
      return { valid: false, error: 'FilterQuery must have a valid combinator (and/or)' };
    }

    if (!Array.isArray(query.rules)) {
      return { valid: false, error: 'FilterQuery rules must be an array' };
    }

    for (let i = 0; i < query.rules.length; i++) {
      const rule = query.rules[i];
      
      // Check if it's a nested FilterQuery
      if (rule.combinator && rule.rules) {
        const nestedValidation = this.validateFilterQuery(rule);
        if (!nestedValidation.valid) {
          return { valid: false, error: `Nested FilterQuery at index ${i}: ${nestedValidation.error}` };
        }
      }
      // Check if it's a FilterRule
      else if (rule.field && rule.operator && rule.filterType) {
        if (typeof rule.field !== 'string') {
          return { valid: false, error: `Rule at index ${i}: field must be a string` };
        }
        if (typeof rule.operator !== 'string') {
          return { valid: false, error: `Rule at index ${i}: operator must be a string` };
        }
        if (typeof rule.filterType !== 'string') {
          return { valid: false, error: `Rule at index ${i}: filterType must be a string` };
        }
      }
      else {
        return { valid: false, error: `Rule at index ${i}: must be either a FilterRule or FilterQuery` };
      }
    }

    return { valid: true };
  }
}

export default FilterJsonataTransformer;