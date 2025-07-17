# DocyFieldDate Component

## Overview
DocyFieldDate is a comprehensive date input component that extends DocyFieldBase to provide date selection functionality. Built on shadcn/ui Calendar component, it offers date picker with calendar interface, date validation, multiple format options, and range selection capabilities. The component supports single date selection, date ranges, and multiple date selection modes with advanced features like date shortcuts, disabled dates, and localization.

This component serves as the primary date input field throughout the Docyrus React application, providing a consistent and accessible date selection experience.

## Component Specification

### Props
DocyFieldDate inherits ALL props from DocyFieldBase and adds the following date-specific properties:

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `format` | string | 'MM/dd/yyyy' | No | Date display format (see date-fns format strings) |
| `placeholder` | string | 'Select date...' | No | Placeholder text when no date is selected |
| `minDate` | Date | - | No | Minimum selectable date |
| `maxDate` | Date | - | No | Maximum selectable date |
| `disabledDates` | Date[] \| function | [] | No | Array of disabled dates or function returning boolean |
| `showToday` | boolean | true | No | Show "Today" button in calendar |
| `showClear` | boolean | true | No | Show clear button to reset selection |
| `mode` | 'single' \| 'range' \| 'multiple' | 'single' | No | Date selection mode |
| `startDate` | Date | - | No | Range start date (for range mode) |
| `endDate` | Date | - | No | Range end date (for range mode) |
| `locale` | string | 'en-US' | No | Date formatting locale |
| `weekStartsOn` | number | 0 | No | First day of week (0=Sunday, 1=Monday, etc.) |
| `showWeekNumbers` | boolean | false | No | Show week numbers in calendar |
| `shortcuts` | DateShortcut[] | [] | No | Date shortcuts like "Today", "Yesterday", "Last 7 days" |
| `onDateChange` | function | - | No | Callback when single date changes |
| `onRangeChange` | function | - | No | Callback when date range changes |
| `onMultipleChange` | function | - | No | Callback when multiple dates change |
| `calendarPosition` | 'bottom' \| 'top' \| 'auto' | 'auto' | No | Calendar popover position |
| `closeOnSelect` | boolean | true | No | Close calendar after selection (single mode only) |
| `showOutsideDays` | boolean | true | No | Show days from adjacent months |
| `allowPastDates` | boolean | true | No | Allow selection of past dates |
| `allowFutureDates` | boolean | true | No | Allow selection of future dates |
| `yearRange` | [number, number] | [1900, 2100] | No | Selectable year range |
| `timeZone` | string | - | No | Time zone for date handling |
| `inputMask` | string | - | No | Input mask for manual date entry |
| `strictParsing` | boolean | false | No | Enable strict date parsing |
| `parseFormats` | string[] | [] | No | Additional date formats to parse |

**Note**: DocyFieldDate inherits all DocyFieldBase props including validation, layout, dynamic computed properties, actions, and more. See [DocyFieldBase documentation](./DocyFieldBase.md) for the complete list.

### TypeScript Interfaces

```typescript
interface DateShortcut {
  label: string;
  value: Date | DateRange | Date[];
  icon?: string;
  description?: string;
}

interface DateRange {
  from: Date;
  to: Date;
}

interface DateFieldProps extends DocyFieldBaseProps {
  format?: string;
  placeholder?: string;
  minDate?: Date;
  maxDate?: Date;
  disabledDates?: Date[] | ((date: Date) => boolean);
  showToday?: boolean;
  showClear?: boolean;
  mode?: 'single' | 'range' | 'multiple';
  startDate?: Date;
  endDate?: Date;
  locale?: string;
  weekStartsOn?: number;
  showWeekNumbers?: boolean;
  shortcuts?: DateShortcut[];
  onDateChange?: (date: Date | null) => void;
  onRangeChange?: (range: DateRange | null) => void;
  onMultipleChange?: (dates: Date[]) => void;
  calendarPosition?: 'bottom' | 'top' | 'auto';
  closeOnSelect?: boolean;
  showOutsideDays?: boolean;
  allowPastDates?: boolean;
  allowFutureDates?: boolean;
  yearRange?: [number, number];
  timeZone?: string;
  inputMask?: string;
  strictParsing?: boolean;
  parseFormats?: string[];
}

interface DateFieldState {
  isOpen: boolean;
  selectedDate: Date | null;
  selectedRange: DateRange | null;
  selectedDates: Date[];
  inputValue: string;
  isValid: boolean;
  parsedDate: Date | null;
}
```

### Behavior

1. **Date Selection Modes**:
   - **Single Mode**: Select one date with calendar interface
   - **Range Mode**: Select start and end dates for a continuous range
   - **Multiple Mode**: Select multiple individual dates

2. **Input Methods**:
   - **Calendar Picker**: Visual calendar interface with mouse/touch interaction
   - **Manual Entry**: Direct typing with format validation and parsing
   - **Shortcuts**: Quick selection buttons for common date ranges

3. **Validation and Constraints**:
   - Min/max date validation with visual feedback
   - Disabled dates support with custom logic
   - Format validation for manual entry
   - Business day constraints and holiday exclusions

4. **Formatting and Localization**:
   - Flexible date format display with date-fns patterns
   - Locale-specific month names, day names, and formatting
   - Time zone handling for global applications
   - RTL language support

5. **Advanced Features**:
   - Input masking for guided manual entry
   - Multiple parsing formats for flexible input
   - Calendar position auto-adjustment
   - Week number display and custom week start days

## Component Requirements

### Technical Specifications
- **Framework**: React 18+ with TypeScript
- **Base Component**: shadcn/ui Calendar component (`pnpm dlx shadcn@latest add calendar`)
- **Extensions**: Docy-specific features including shortcuts, enhanced validation, range selection, and advanced date handling built on top of shadcn Calendar
- **Wrapper**: Extends DocyFieldBase for consistent field structure
- **Styling**: shadcn/ui Calendar and Input components with Tailwind CSS v4
- **Date Library**: date-fns for date manipulation and formatting
- **Masking**: Input masking for manual date entry
- **Accessibility**: WCAG 2.1 AA compliance with keyboard navigation and screen reader support

### Key Features Required
1. **Multiple Selection Modes**: Single, range, and multiple date selection
2. **Calendar Interface**: Visual date picker with month/year navigation
3. **Manual Entry**: Direct text input with format validation
4. **Date Shortcuts**: Quick selection for common dates and ranges
5. **Validation System**: Min/max dates, disabled dates, and format validation
6. **Localization**: Multi-language support with proper date formatting
7. **Accessibility**: Full keyboard navigation and screen reader support
8. **Responsive Design**: Mobile-friendly touch interactions

### Usage Examples

```tsx
// Basic single date selection
<DocyFieldDate
  name="birthDate"
  label="Birth Date"
  required={true}
  maxDate={new Date()} // Cannot select future dates
  placeholder="Select your birth date"
/>

// Date range selection with shortcuts
<DocyFieldDate
  name="reportPeriod"
  label="Report Period"
  mode="range"
  shortcuts={[
    { label: 'Today', value: { from: new Date(), to: new Date() } },
    { label: 'Last 7 days', value: { from: subDays(new Date(), 7), to: new Date() } },
    { label: 'Last 30 days', value: { from: subDays(new Date(), 30), to: new Date() } },
    { label: 'This month', value: { from: startOfMonth(new Date()), to: endOfMonth(new Date()) } }
  ]}
  onRangeChange={(range) => console.log('Range selected:', range)}
/>

// Multiple date selection for appointments
<DocyFieldDate
  name="availableDates"
  label="Available Dates"
  mode="multiple"
  minDate={new Date()}
  disabledDates={[
    new Date('2024-12-25'), // Christmas
    new Date('2024-01-01')  // New Year
  ]}
  onMultipleChange={(dates) => console.log('Selected dates:', dates)}
/>

// Business date selector with validation
<DocyFieldDate
  name="deliveryDate"
  label="Delivery Date"
  format="EEEE, MMMM do, yyyy"
  minDate={addDays(new Date(), 1)} // Next day minimum
  maxDate={addDays(new Date(), 30)} // Max 30 days
  disabledDates={(date) => {
    const day = date.getDay();
    return day === 0 || day === 6; // Disable weekends
  }}
  validations={[
    { type: 'required', message: 'Delivery date is required' }
  ]}
  allowPastDates={false}
/>

// Localized date field
<DocyFieldDate
  name="eventDate"
  label="Event Date"
  locale="fr-FR"
  format="dd/MM/yyyy"
  weekStartsOn={1} // Monday
  showWeekNumbers={true}
  placeholder="Sélectionner une date"
/>

// Date field with input mask
<DocyFieldDate
  name="appointmentDate"
  label="Appointment Date"
  inputMask="99/99/9999"
  format="MM/dd/yyyy"
  parseFormats={['MM/dd/yyyy', 'M/d/yyyy', 'MM-dd-yyyy']}
  strictParsing={false}
/>

// Advanced range selection with computed properties
<DocyFieldDate
  name="projectTimeline"
  label="Project Timeline"
  mode="range"
  computedLabel="'Project Duration: ' & $formatDate(startDate, 'MMM d') & ' - ' & $formatDate(endDate, 'MMM d, yyyy')"
  computedRequired={{ field: 'projectType', operator: 'equals', value: 'time-bound' }}
  actions={{
    change: [
      ['setFieldValueCalculated', {
        field: 'estimatedDuration',
        formula: '$ceil(($millis(endDate) - $millis(startDate)) / (1000 * 60 * 60 * 24))'
      }]
    ]
  }}
/>

// Complete form integration with React Hook Form
<form onSubmit={handleSubmit(onSubmit)}>
  <DocyFieldDate
    name="startDate"
    label="Start Date"
    required={true}
    validations={[
      { type: 'required', message: 'Start date is required' }
    ]}
    customValidations={[
      {
        formula: '$date(startDate) < $now()',
        message: 'Start date cannot be in the past'
      }
    ]}
    onDateChange={(date) => {
      // Update end date minimum when start date changes
      setMinEndDate(date);
    }}
  />
  
  <DocyFieldDate
    name="endDate"
    label="End Date"
    required={true}
    minDate={minEndDate}
    validations={[
      { type: 'required', message: 'End date is required' }
    ]}
    customValidations={[
      {
        formula: '$date(endDate) <= $date(startDate)',
        message: 'End date must be after start date'
      }
    ]}
  />
</form>

// Date field with time zone support
<DocyFieldDate
  name="globalEventDate"
  label="Event Date (UTC)"
  timeZone="UTC"
  format="MMM d, yyyy 'at' h:mm a z"
  placeholder="Select date and time"
  showToday={false}
  shortcuts={[
    { label: 'Tomorrow 9 AM', value: setHours(addDays(new Date(), 1), 9) },
    { label: 'Next Monday', value: nextMonday(new Date()) },
    { label: 'End of month', value: endOfMonth(new Date()) }
  ]}
/>
```

### Integration Requirements
- **DocyFieldBase**: Base wrapper component (required)
- **DocyCalendar**: Calendar component for date selection interface
- **DocyIcon**: For calendar icons, clear button, and shortcuts
- **DocyButton**: For action buttons and shortcuts
- **DocyPopover**: For calendar dropdown positioning
- **DocyTooltip**: For disabled date explanations
- **date-fns**: For date manipulation and formatting
- **Input masking library**: For manual date entry formatting

### Dependencies Required
- `react-hook-form`: Form state management (inherited from DocyFieldBase)
- `@radix-ui/react-popover`: Calendar dropdown positioning
- `@radix-ui/react-calendar`: Base calendar functionality (via shadcn/ui)
- `date-fns`: Date manipulation and formatting library
- `react-input-mask` or `imask`: Input masking for manual entry
- `class-variance-authority`: Variant management
- All DocyFieldBase dependencies

### Testing Requirements
1. **Unit Tests**: Date selection, validation, formatting, range selection, multiple selection
2. **Integration Tests**: React Hook Form integration, calendar interaction, shortcuts functionality
3. **Visual Tests**: All selection modes, locales, disabled states, responsive behavior
4. **Accessibility Tests**: Keyboard navigation, screen reader support, ARIA attributes, focus management
5. **Performance Tests**: Large date ranges, many disabled dates, rapid date changes
6. **Localization Tests**: Different locales, date formats, RTL languages, time zones
7. **Validation Tests**: Min/max dates, disabled dates, custom validation rules, format validation

## Development Priority
**High** - Essential component for scheduling, reporting, and date-related functionality

## Notes
- Built on shadcn/ui Calendar component for consistency with design system
- Supports complex date selection scenarios including business constraints
- Full internationalization support with locale-specific formatting
- Optimized for both desktop and mobile interactions
- TypeScript support with comprehensive type safety
- Integrates seamlessly with existing form validation and actions systems
- Performance optimized for large forms with multiple date fields
- Complete accessibility compliance ensures inclusive user experience
- Flexible validation system supports complex business rules and date constraints