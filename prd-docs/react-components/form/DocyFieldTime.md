# DocyFieldTime Component

## Overview
DocyFieldTime is a specialized time input component that extends DocyFieldBase to provide comprehensive time selection functionality. Built on shadcn/ui Input component, it offers time picker with dropdown interface, time validation, multiple format options, and timezone support. The component supports manual time entry, time picker interface, and advanced features like time shortcuts, disabled times, and step intervals.

This component serves as the primary time input field throughout the Docyrus React application, providing a consistent and accessible time selection experience for scheduling, appointments, and time-based data entry.

## Component Specification

### Props
DocyFieldTime inherits ALL props from DocyFieldBase and adds the following time-specific properties:

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `format` | string | 'HH:mm' | No | Time display format ('12h', '24h', or custom format string) |
| `placeholder` | string | 'Select time...' | No | Placeholder text when no time is selected |
| `showTimePicker` | boolean | true | No | Show time picker dropdown interface |
| `minTime` | string | - | No | Minimum selectable time (HH:mm format) |
| `maxTime` | string | - | No | Maximum selectable time (HH:mm format) |
| `step` | number | 15 | No | Time step interval in minutes |
| `timezone` | string | - | No | Timezone for time display and calculations |
| `utc` | boolean | false | No | Store and process time as UTC |
| `showSeconds` | boolean | false | No | Show seconds in time picker and display |
| `showMilliseconds` | boolean | false | No | Show milliseconds in time picker and display |
| `use12Hour` | boolean | false | No | Use 12-hour format with AM/PM |
| `showNow` | boolean | true | No | Show "Now" button for current time |
| `showClear` | boolean | true | No | Show clear button to reset selection |
| `shortcuts` | TimeShortcut[] | [] | No | Time shortcuts like "Now", "Start of day", "End of day" |
| `disabledHours` | number[] | [] | No | Array of disabled hours (0-23) |
| `disabledMinutes` | number[] | [] | No | Array of disabled minutes (0-59) |
| `mask` | string | - | No | Input mask pattern for manual entry |
| `autoComplete` | boolean | true | No | Auto-complete time input based on partial entry |
| `onTimeChange` | function | - | No | Callback when time value changes |
| `onTimezoneChange` | function | - | No | Callback when timezone changes |
| `dropdownPosition` | 'bottom' \| 'top' \| 'auto' | 'auto' | No | Time picker dropdown position |
| `closeOnSelect` | boolean | true | No | Close picker after time selection |
| `allowManualEntry` | boolean | true | No | Allow manual time entry in input field |
| `strictParsing` | boolean | false | No | Enable strict time parsing validation |
| `parseFormats` | string[] | [] | No | Additional time formats to parse |
| `hourCycle` | 'h11' \| 'h12' \| 'h23' \| 'h24' | 'h23' | No | Hour cycle for time formatting |
| `allowSeconds` | boolean | false | No | Allow seconds input in manual entry |
| `allowMilliseconds` | boolean | false | No | Allow milliseconds input in manual entry |
| `timeZoneOffset` | number | - | No | Manual timezone offset in minutes |
| `showTimeZone` | boolean | false | No | Show timezone selector |
| `availableTimezones` | string[] | [] | No | List of available timezones for selection |

**Note**: DocyFieldTime inherits all DocyFieldBase props including validation, layout, dynamic computed properties, actions, and more. See [DocyFieldBase documentation](./DocyFieldBase.md) for the complete list.

### TypeScript Interfaces

```typescript
interface TimeShortcut {
  label: string;
  value: string; // Time in HH:mm format
  icon?: string;
  description?: string;
}

interface TimeRange {
  start: string;
  end: string;
}

interface TimeFieldProps extends DocyFieldBaseProps {
  format?: string;
  placeholder?: string;
  showTimePicker?: boolean;
  minTime?: string;
  maxTime?: string;
  step?: number;
  timezone?: string;
  utc?: boolean;
  showSeconds?: boolean;
  showMilliseconds?: boolean;
  use12Hour?: boolean;
  showNow?: boolean;
  showClear?: boolean;
  shortcuts?: TimeShortcut[];
  disabledHours?: number[];
  disabledMinutes?: number[];
  mask?: string;
  autoComplete?: boolean;
  onTimeChange?: (time: string | null) => void;
  onTimezoneChange?: (timezone: string) => void;
  dropdownPosition?: 'bottom' | 'top' | 'auto';
  closeOnSelect?: boolean;
  allowManualEntry?: boolean;
  strictParsing?: boolean;
  parseFormats?: string[];
  hourCycle?: 'h11' | 'h12' | 'h23' | 'h24';
  allowSeconds?: boolean;
  allowMilliseconds?: boolean;
  timeZoneOffset?: number;
  showTimeZone?: boolean;
  availableTimezones?: string[];
}

interface TimeFieldState {
  isOpen: boolean;
  selectedTime: string | null;
  inputValue: string;
  isValid: boolean;
  parsedTime: string | null;
  currentTimezone: string;
  displayFormat: string;
}
```

### Behavior

1. **Time Selection Methods**:
   - **Time Picker**: Visual time picker with hour, minute, and optional second selection
   - **Manual Entry**: Direct typing with format validation and auto-completion
   - **Shortcuts**: Quick selection buttons for common times

2. **Time Formats**:
   - **24-hour Format**: HH:mm (default), HH:mm:ss with seconds
   - **12-hour Format**: h:mm AM/PM, h:mm:ss AM/PM with seconds
   - **Custom Formats**: Flexible formatting with custom patterns

3. **Validation and Constraints**:
   - Min/max time validation with visual feedback
   - Disabled hours and minutes support
   - Step interval validation for time increments
   - Time zone validation and conversion

4. **Timezone Support**:
   - Display time in specified timezone
   - Convert between timezones automatically
   - UTC storage with local display
   - Timezone-aware validation and calculations

5. **Advanced Features**:
   - Input masking for guided manual entry
   - Auto-completion based on partial input
   - Multiple parsing formats for flexible input
   - Millisecond precision support

## Component Requirements

### Technical Specifications
- **Framework**: React 18+ with TypeScript
- **Base Component**: shadcn/ui Input component (`pnpm dlx shadcn@latest add input`)
- **Extensions**: Docy-specific features including time picker, timezone support, advanced validation, and time shortcuts built on top of shadcn Input
- **Wrapper**: Extends DocyFieldBase for consistent field structure
- **Styling**: shadcn/ui Input component with Tailwind CSS v4
- **Time Library**: date-fns for time manipulation and formatting
- **Masking**: Input masking for manual time entry
- **Accessibility**: WCAG 2.1 AA compliance with keyboard navigation and screen reader support

### Key Features Required
1. **Time Picker Interface**: Visual time selection with scrollable hour/minute lists
2. **Manual Entry**: Direct text input with format validation and auto-completion
3. **Time Shortcuts**: Quick selection for common times and time ranges
4. **Timezone Support**: Multi-timezone display and conversion
5. **Validation System**: Min/max times, disabled times, and format validation
6. **Flexible Formatting**: Multiple time formats with localization support
7. **Accessibility**: Full keyboard navigation and screen reader support
8. **Responsive Design**: Mobile-friendly touch interactions

### Usage Examples

```tsx
// Basic time selection
<DocyFieldTime
  name="appointmentTime"
  label="Appointment Time"
  required={true}
  format="h:mm a"
  use12Hour={true}
  placeholder="Select appointment time"
/>

// Time picker with constraints
<DocyFieldTime
  name="workingHours"
  label="Working Hours"
  minTime="09:00"
  maxTime="17:00"
  step={30}
  disabledHours={[12]} // Lunch break
  validations={[
    { type: 'required', message: 'Working hours are required' }
  ]}
/>

// Time with shortcuts
<DocyFieldTime
  name="meetingTime"
  label="Meeting Time"
  shortcuts={[
    { label: 'Now', value: new Date().toTimeString().slice(0, 5) },
    { label: 'Start of day', value: '09:00' },
    { label: 'Lunch time', value: '12:00' },
    { label: 'End of day', value: '17:00' }
  ]}
  onTimeChange={(time) => console.log('Time selected:', time)}
/>

// Time with seconds and milliseconds
<DocyFieldTime
  name="preciseTime"
  label="Precise Time"
  showSeconds={true}
  showMilliseconds={true}
  format="HH:mm:ss.SSS"
  allowSeconds={true}
  allowMilliseconds={true}
  step={1}
/>

// Time with timezone support
<DocyFieldTime
  name="globalMeetingTime"
  label="Global Meeting Time"
  timezone="UTC"
  showTimeZone={true}
  availableTimezones={['UTC', 'America/New_York', 'Europe/London', 'Asia/Tokyo']}
  onTimezoneChange={(timezone) => console.log('Timezone changed:', timezone)}
/>

// Time with input mask
<DocyFieldTime
  name="scheduledTime"
  label="Scheduled Time"
  mask="99:99"
  format="HH:mm"
  parseFormats={['HH:mm', 'H:mm', 'HH.mm', 'H.mm']}
  strictParsing={false}
  autoComplete={true}
/>

// Advanced time field with computed properties
<DocyFieldTime
  name="deliveryTime"
  label="Delivery Time"
  computedLabel="'Delivery at ' & $formatTime(deliveryTime, 'h:mm a')"
  computedRequired={{ field: 'deliveryType', operator: 'equals', value: 'scheduled' }}
  computedDisabled={{ field: 'deliveryDate', operator: 'isNull', value: true }}
  actions={{
    change: [
      ['setFieldValueCalculated', {
        field: 'estimatedArrival',
        formula: '$addMinutes(deliveryTime, travelDuration)'
      }]
    ]
  }}
/>

// Complete form integration with validation
<form onSubmit={handleSubmit(onSubmit)}>
  <DocyFieldTime
    name="startTime"
    label="Start Time"
    required={true}
    format="HH:mm"
    validations={[
      { type: 'required', message: 'Start time is required' }
    ]}
    customValidations={[
      {
        formula: '$time(startTime) < $time("09:00")',
        message: 'Start time cannot be before 9:00 AM'
      }
    ]}
    onTimeChange={(time) => {
      // Update end time minimum when start time changes
      const startMinutes = parseTimeToMinutes(time);
      setMinEndTime(formatMinutesToTime(startMinutes + 30));
    }}
  />
  
  <DocyFieldTime
    name="endTime"
    label="End Time"
    required={true}
    minTime={minEndTime}
    validations={[
      { type: 'required', message: 'End time is required' }
    ]}
    customValidations={[
      {
        formula: '$time(endTime) <= $time(startTime)',
        message: 'End time must be after start time'
      },
      {
        formula: '$minutes($time(endTime) - $time(startTime)) > 480',
        message: 'Duration cannot exceed 8 hours'
      }
    ]}
  />
</form>

// Time field with business hours validation
<DocyFieldTime
  name="businessHours"
  label="Business Hours"
  use12Hour={true}
  format="h:mm a"
  minTime="08:00"
  maxTime="20:00"
  step={15}
  shortcuts={[
    { label: 'Morning', value: '09:00' },
    { label: 'Afternoon', value: '14:00' },
    { label: 'Evening', value: '18:00' }
  ]}
  disabledHours={[0, 1, 2, 3, 4, 5, 6, 7, 21, 22, 23]}
  customValidations={[
    {
      formula: '$dayOfWeek($now()) = 0 or $dayOfWeek($now()) = 6',
      message: 'Business hours are not available on weekends'
    }
  ]}
/>

// Time duration field
<DocyFieldTime
  name="duration"
  label="Duration"
  format="HH:mm"
  placeholder="Hours:Minutes"
  minTime="00:15"
  maxTime="08:00"
  step={15}
  validations={[
    { type: 'required', message: 'Duration is required' }
  ]}
  customValidations={[
    {
      formula: '$minutes($time(duration)) < 15',
      message: 'Minimum duration is 15 minutes'
    }
  ]}
/>

// Time with UTC storage
<DocyFieldTime
  name="utcTime"
  label="UTC Time"
  utc={true}
  timezone="UTC"
  format="HH:mm z"
  placeholder="Select time in UTC"
  validations={[
    { type: 'required', message: 'UTC time is required' }
  ]}
  onTimeChange={(time) => {
    // Time is automatically converted to UTC for storage
    console.log('UTC time:', time);
  }}
/>
```

### Integration Requirements
- **DocyFieldBase**: Base wrapper component (required)
- **DocyInput**: Input component for manual time entry
- **DocyIcon**: For time icons, clear button, and shortcuts
- **DocyButton**: For action buttons and shortcuts
- **DocyPopover**: For time picker dropdown positioning
- **DocySelect**: For timezone selection
- **DocyTooltip**: For disabled time explanations
- **date-fns**: For time manipulation and formatting
- **Input masking library**: For manual time entry formatting

### Dependencies Required
- `react-hook-form`: Form state management (inherited from DocyFieldBase)
- `@radix-ui/react-popover`: Time picker dropdown positioning
- `@radix-ui/react-select`: Timezone selection
- `date-fns`: Time manipulation and formatting library
- `react-input-mask` or `imask`: Input masking for manual entry
- `date-fns-tz`: Timezone handling and conversion
- `class-variance-authority`: Variant management
- All DocyFieldBase dependencies

### Testing Requirements
1. **Unit Tests**: Time selection, validation, formatting, timezone conversion, step intervals
2. **Integration Tests**: React Hook Form integration, time picker interaction, shortcuts functionality
3. **Visual Tests**: All time formats, disabled states, timezone display, responsive behavior
4. **Accessibility Tests**: Keyboard navigation, screen reader support, ARIA attributes, focus management
5. **Performance Tests**: Large time ranges, many disabled times, rapid time changes
6. **Timezone Tests**: Multiple timezones, UTC conversion, daylight saving time handling
7. **Validation Tests**: Min/max times, disabled times, custom validation rules, format validation
8. **Input Tests**: Manual entry, auto-completion, input masking, parsing formats

## Development Priority
**Medium** - Important component for scheduling, appointments, and time-based data entry

## Notes
- Built on shadcn/ui Input component for consistency with design system
- Supports complex time selection scenarios including business constraints
- Full timezone support with automatic conversion and validation
- Optimized for both desktop and mobile interactions
- TypeScript support with comprehensive type safety
- Integrates seamlessly with existing form validation and actions systems
- Performance optimized for large forms with multiple time fields
- Complete accessibility compliance ensures inclusive user experience
- Flexible validation system supports complex business rules and time constraints
- Auto-completion and input masking improve user experience for manual entry