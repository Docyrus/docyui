# DocyFieldDateRange Component

## Overview
DocyFieldDateRange is a comprehensive date range input component that extends DocyFieldBase to provide date range selection functionality. Built on shadcn/ui Calendar component extended with Docy-specific features, it offers intuitive date range selection with calendar interface, preset ranges, advanced validation, and multiple display options. The component provides a seamless experience for selecting start and end dates with visual feedback, range validation, and accessibility features.

This component serves as the primary date range input field throughout the Docyrus React application, providing consistent and accessible date range selection for reporting, scheduling, filtering, and data analysis features.

## Component Specification

### Props
DocyFieldDateRange inherits ALL props from DocyFieldBase and adds the following date range-specific properties:

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `startDate` | Date | - | No | Range start date value |
| `endDate` | Date | - | No | Range end date value |
| `format` | string | 'MM/dd/yyyy' | No | Date display format (see date-fns format strings) |
| `placeholder` | string | 'Select date range...' | No | Placeholder text when no range is selected |
| `separator` | string | ' - ' | No | Separator between start and end dates in display |
| `minDate` | Date | - | No | Minimum selectable date for both start and end |
| `maxDate` | Date | - | No | Maximum selectable date for both start and end |
| `minRange` | number | 0 | No | Minimum range duration in days |
| `maxRange` | number | - | No | Maximum range duration in days |
| `disabledDates` | Date[] \| function | [] | No | Array of disabled dates or function returning boolean |
| `showPresets` | boolean | true | No | Show preset range buttons |
| `presets` | DateRangePreset[] | [] | No | Array of preset date ranges |
| `showCalendar` | boolean | true | No | Show calendar picker interface |
| `showInput` | boolean | true | No | Show input fields for manual date entry |
| `allowSameDate` | boolean | false | No | Allow same start and end date |
| `weekStartsOn` | number | 0 | No | First day of week (0=Sunday, 1=Monday, etc.) |
| `showWeekNumbers` | boolean | false | No | Show week numbers in calendar |
| `locale` | string | 'en-US' | No | Date formatting locale |
| `onRangeChange` | function | - | No | Callback when date range changes |
| `onStartDateChange` | function | - | No | Callback when start date changes |
| `onEndDateChange` | function | - | No | Callback when end date changes |
| `onPresetSelect` | function | - | No | Callback when preset is selected |
| `validateRange` | function | - | No | Custom range validation function |
| `calendarPosition` | 'bottom' \| 'top' \| 'auto' | 'auto' | No | Calendar popover position |
| `closeOnSelect` | boolean | true | No | Close calendar after range selection |
| `showClear` | boolean | true | No | Show clear button to reset selection |
| `showToday` | boolean | false | No | Show "Today" preset button |
| `allowPartialRange` | boolean | false | No | Allow selecting only start or end date |
| `highlightToday` | boolean | true | No | Highlight today's date in calendar |
| `showOutsideDays` | boolean | true | No | Show days from adjacent months |
| `yearRange` | [number, number] | [1900, 2100] | No | Selectable year range |
| `inputMask` | string | - | No | Input mask for manual date entry |
| `strictParsing` | boolean | false | No | Enable strict date parsing |
| `parseFormats` | string[] | [] | No | Additional date formats to parse |
| `timeZone` | string | - | No | Time zone for date handling |

**Note**: DocyFieldDateRange inherits all DocyFieldBase props including validation, layout, dynamic computed properties, actions, and more. See [DocyFieldBase documentation](./DocyFieldBase.md) for the complete list.

### TypeScript Interfaces

```typescript
interface DateRangePreset {
  label: string;
  value: DateRange;
  icon?: string;
  description?: string;
  group?: string;
}

interface DateRange {
  from: Date;
  to: Date;
}

interface DateRangeFieldProps extends DocyFieldBaseProps {
  startDate?: Date;
  endDate?: Date;
  format?: string;
  placeholder?: string;
  separator?: string;
  minDate?: Date;
  maxDate?: Date;
  minRange?: number;
  maxRange?: number;
  disabledDates?: Date[] | ((date: Date) => boolean);
  showPresets?: boolean;
  presets?: DateRangePreset[];
  showCalendar?: boolean;
  showInput?: boolean;
  allowSameDate?: boolean;
  weekStartsOn?: number;
  showWeekNumbers?: boolean;
  locale?: string;
  onRangeChange?: (range: DateRange | null) => void;
  onStartDateChange?: (date: Date | null) => void;
  onEndDateChange?: (date: Date | null) => void;
  onPresetSelect?: (preset: DateRangePreset) => void;
  validateRange?: (range: DateRange) => boolean | string;
  calendarPosition?: 'bottom' | 'top' | 'auto';
  closeOnSelect?: boolean;
  showClear?: boolean;
  showToday?: boolean;
  allowPartialRange?: boolean;
  highlightToday?: boolean;
  showOutsideDays?: boolean;
  yearRange?: [number, number];
  inputMask?: string;
  strictParsing?: boolean;
  parseFormats?: string[];
  timeZone?: string;
}

interface DateRangeFieldState {
  isOpen: boolean;
  selectedRange: DateRange | null;
  startInputValue: string;
  endInputValue: string;
  isValid: boolean;
  activeInput: 'start' | 'end' | null;
  hoveredDate: Date | null;
  previewRange: DateRange | null;
}
```

### Behavior

1. **Range Selection Modes**:
   - **Calendar Selection**: Visual calendar interface with start/end date highlighting
   - **Input Fields**: Separate start and end date inputs with validation
   - **Preset Selection**: Quick selection buttons for common date ranges
   - **Hybrid Mode**: Combination of calendar and input methods

2. **Range Validation**:
   - Min/max date constraints for both start and end dates
   - Minimum and maximum range duration validation
   - Custom validation functions for business rules
   - Disabled dates exclusion with visual feedback

3. **User Interaction Patterns**:
   - Click first date to set start, click second date to set end
   - Hover effects showing preview range during selection
   - Keyboard navigation with arrow keys and Enter/Escape
   - Manual input with format validation and parsing

4. **Visual Feedback**:
   - Range highlighting in calendar during selection
   - Hover effects for range preview
   - Clear visual distinction between start and end dates
   - Invalid range indicators and error messages

5. **Preset Management**:
   - Common preset ranges (Today, Yesterday, Last 7 days, etc.)
   - Custom preset definitions with icons and descriptions
   - Grouped presets for better organization
   - Preset validation against date constraints

## Component Requirements

### Technical Specifications
- **Framework**: React 18+ with TypeScript
- **Base Component**: shadcn/ui Calendar component (`pnpm dlx shadcn@latest add calendar`)
- **Extensions**: Docy-specific features including range selection, presets, enhanced validation, and advanced date handling built on top of shadcn Calendar
- **Wrapper**: Extends DocyFieldBase for consistent field structure
- **Styling**: shadcn/ui Calendar and Input components with Tailwind CSS v4
- **Date Library**: date-fns for date manipulation and formatting
- **Accessibility**: WCAG 2.1 AA compliance with keyboard navigation and screen reader support

### Key Features Required
1. **Range Selection**: Start and end date selection with visual feedback
2. **Preset Ranges**: Quick selection buttons for common date ranges
3. **Calendar Interface**: Visual date picker with range highlighting
4. **Input Fields**: Manual date entry with format validation
5. **Range Validation**: Min/max dates, duration constraints, and custom validation
6. **Localization**: Multi-language support with proper date formatting
7. **Accessibility**: Full keyboard navigation and screen reader support
8. **Responsive Design**: Mobile-friendly touch interactions

## Usage Examples

```tsx
// Basic date range selection
<DocyFieldDateRange
  name="reportPeriod"
  label="Report Period"
  required={true}
  placeholder="Select date range for report"
  minDate={subDays(new Date(), 90)} // Last 90 days
  maxDate={new Date()} // Up to today
/>

// Date range with presets
<DocyFieldDateRange
  name="analyticsRange"
  label="Analytics Period"
  showPresets={true}
  presets={[
    { label: 'Today', value: { from: new Date(), to: new Date() } },
    { label: 'Yesterday', value: { from: subDays(new Date(), 1), to: subDays(new Date(), 1) } },
    { label: 'Last 7 days', value: { from: subDays(new Date(), 7), to: new Date() } },
    { label: 'Last 30 days', value: { from: subDays(new Date(), 30), to: new Date() } },
    { label: 'This month', value: { from: startOfMonth(new Date()), to: endOfMonth(new Date()) } },
    { label: 'Last month', value: { from: startOfMonth(subMonths(new Date(), 1)), to: endOfMonth(subMonths(new Date(), 1)) } }
  ]}
  onRangeChange={(range) => console.log('Range selected:', range)}
  onPresetSelect={(preset) => console.log('Preset selected:', preset.label)}
/>

// Business date range with validation
<DocyFieldDateRange
  name="projectTimeline"
  label="Project Timeline"
  format="MMM d, yyyy"
  separator=" to "
  minDate={new Date()}
  minRange={7} // Minimum 7 days
  maxRange={365} // Maximum 1 year
  allowSameDate={false}
  disabledDates={(date) => {
    const day = date.getDay();
    return day === 0 || day === 6; // Disable weekends
  }}
  validateRange={(range) => {
    const workDays = differenceInBusinessDays(range.to, range.from);
    return workDays >= 5 || 'Project must span at least 5 business days';
  }}
  validations={[
    { type: 'required', message: 'Project timeline is required' }
  ]}
/>

// Event booking with availability constraints
<DocyFieldDateRange
  name="eventDates"
  label="Event Dates"
  showPresets={false}
  allowPartialRange={true}
  highlightToday={true}
  minDate={addDays(new Date(), 1)} // Tomorrow minimum
  maxDate={addDays(new Date(), 180)} // 6 months maximum
  disabledDates={[
    new Date('2024-12-25'), // Christmas
    new Date('2024-01-01'), // New Year
    new Date('2024-07-04')  // Independence Day
  ]}
  onStartDateChange={(date) => console.log('Start date:', date)}
  onEndDateChange={(date) => console.log('End date:', date)}
/>

// Vacation request with grouped presets
<DocyFieldDateRange
  name="vacationDates"
  label="Vacation Dates"
  format="EEEE, MMM d, yyyy"
  presets={[
    { label: 'Long weekend', value: { from: nextFriday(new Date()), to: nextMonday(new Date()) }, group: 'Quick' },
    { label: 'Next week', value: { from: startOfWeek(addWeeks(new Date(), 1)), to: endOfWeek(addWeeks(new Date(), 1)) }, group: 'Quick' },
    { label: 'Christmas week', value: { from: new Date('2024-12-23'), to: new Date('2024-12-30') }, group: 'Holidays' },
    { label: 'New Year week', value: { from: new Date('2024-12-30'), to: new Date('2025-01-06') }, group: 'Holidays' }
  ]}
  minRange={1}
  maxRange={14} // Maximum 2 weeks
  customValidations={[
    {
      formula: '$count($filter(existingVacations, function($v) { $v.from <= endDate and $v.to >= startDate })) = 0',
      message: 'Selected dates overlap with existing vacation'
    }
  ]}
/>

// Localized date range
<DocyFieldDateRange
  name="eventoPeriodo"
  label="Período del Evento"
  locale="es-ES"
  format="dd/MM/yyyy"
  separator=" al "
  weekStartsOn={1} // Monday
  showWeekNumbers={true}
  placeholder="Seleccionar rango de fechas"
  presets={[
    { label: 'Hoy', value: { from: new Date(), to: new Date() } },
    { label: 'Esta semana', value: { from: startOfWeek(new Date(), { weekStartsOn: 1 }), to: endOfWeek(new Date(), { weekStartsOn: 1 }) } },
    { label: 'Este mes', value: { from: startOfMonth(new Date()), to: endOfMonth(new Date()) } }
  ]}
/>

// Advanced range with computed properties
<DocyFieldDateRange
  name="billingPeriod"
  label="Billing Period"
  computedLabel="'Billing: ' & $formatDate(startDate, 'MMM d') & ' - ' & $formatDate(endDate, 'MMM d, yyyy')"
  computedRequired={{ field: 'billingType', operator: 'equals', value: 'custom' }}
  computedDisabled={{ field: 'accountStatus', operator: 'equals', value: 'suspended' }}
  actions={{
    change: [
      ['setFieldValueCalculated', {
        field: 'billingDays',
        formula: '$ceil(($millis(endDate) - $millis(startDate)) / (1000 * 60 * 60 * 24)) + 1'
      }],
      ['setFieldValueCalculated', {
        field: 'estimatedAmount',
        formula: 'dailyRate * billingDays'
      }]
    ]
  }}
  minRange={1}
  maxRange={31}
  format="MMM d, yyyy"
/>

// Complete form integration with cross-field validation
<form onSubmit={handleSubmit(onSubmit)}>
  <DocyFieldDateRange
    name="campaignPeriod"
    label="Campaign Period"
    required={true}
    minDate={new Date()}
    maxRange={90}
    presets={[
      { label: '1 week', value: { from: new Date(), to: addDays(new Date(), 7) } },
      { label: '2 weeks', value: { from: new Date(), to: addDays(new Date(), 14) } },
      { label: '1 month', value: { from: new Date(), to: addDays(new Date(), 30) } }
    ]}
    validations={[
      { type: 'required', message: 'Campaign period is required' }
    ]}
    customValidations={[
      {
        formula: '$date(startDate) >= $date(launchDate)',
        message: 'Campaign cannot start before product launch date'
      }
    ]}
    onRangeChange={(range) => {
      // Update budget calculation based on campaign duration
      const duration = differenceInDays(range.to, range.from) + 1;
      setValue('campaignDuration', duration);
      setValue('estimatedBudget', duration * dailyBudget);
    }}
  />
  
  <DocyFieldNumber
    name="dailyBudget"
    label="Daily Budget"
    required={true}
    min={0}
    prefix="$"
    format="currency"
  />
  
  <DocyFieldNumber
    name="estimatedBudget"
    label="Estimated Total Budget"
    readOnly={true}
    prefix="$"
    format="currency"
  />
</form>
```

## Integration Requirements
- **DocyFieldBase**: Base wrapper component (required)
- **DocyCalendar**: Calendar component for date selection interface
- **DocyIcon**: For calendar icons, preset icons, and clear button
- **DocyButton**: For preset buttons and action buttons
- **DocyPopover**: For calendar dropdown positioning
- **DocyTooltip**: For preset descriptions and disabled date explanations
- **DocyInput**: For manual date entry fields
- **DocySeparator**: For visual separation between presets and calendar
- **date-fns**: For date manipulation and formatting
- **Input masking library**: For manual date entry formatting

## Dependencies Required
- `react-hook-form`: Form state management (inherited from DocyFieldBase)
- `@radix-ui/react-popover`: Calendar dropdown positioning
- `@radix-ui/react-calendar`: Base calendar functionality (via shadcn/ui)
- `date-fns`: Date manipulation and formatting library
- `react-input-mask` or `imask`: Input masking for manual entry
- `class-variance-authority`: Variant management
- All DocyFieldBase dependencies

## Testing Requirements
1. **Unit Tests**: Range selection, preset selection, validation, formatting, range calculation
2. **Integration Tests**: React Hook Form integration, calendar interaction, preset functionality, cross-field validation
3. **Visual Tests**: All preset combinations, calendar states, error states, responsive behavior
4. **Accessibility Tests**: Keyboard navigation, screen reader support, ARIA attributes, focus management, range announcement
5. **Performance Tests**: Large preset lists, complex validation, rapid range changes, calendar rendering
6. **Localization Tests**: Different locales, date formats, RTL languages, time zones, preset translations
7. **Validation Tests**: Min/max dates, range duration, disabled dates, custom validation rules, cross-field dependencies

## Development Priority
**High** - Essential component for reporting, analytics, scheduling, and filtering functionality

## Notes
- Built on shadcn/ui Calendar component for consistency with design system
- Supports complex date range scenarios including business constraints and preset management
- Full internationalization support with locale-specific formatting and preset translations
- Optimized for both desktop and mobile interactions with touch-friendly preset buttons
- TypeScript support with comprehensive type safety for range validation
- Integrates seamlessly with existing form validation and actions systems
- Performance optimized for forms with multiple date range fields and complex validation
- Complete accessibility compliance ensures inclusive user experience
- Flexible preset system supports grouped presets and custom validation
- Advanced range validation supports business rules and cross-field dependencies