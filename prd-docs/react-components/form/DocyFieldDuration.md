# DocyFieldDuration Component

## Overview
DocyFieldDuration is a specialized duration input component that extends DocyFieldBase to provide comprehensive time duration entry functionality. Built on shadcn/ui Input component, it offers flexible duration input with multiple time units, format conversion, validation, and advanced features like step controls, range validation, and automatic unit conversion. The component supports manual duration entry, unit selection, and sophisticated duration calculations.

This component serves as the primary duration input field throughout the Docyrus React application, providing a consistent and accessible duration entry experience for timers, work tracking, scheduling, and time-based calculations.

## Component Specification

### Props
DocyFieldDuration inherits ALL props from DocyFieldBase and adds the following duration-specific properties:

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `format` | string | 'HH:MM:SS' | No | Duration display format ('HH:MM:SS', 'HH:MM', 'days', 'hours', 'minutes', 'seconds') |
| `units` | string[] | ['hours', 'minutes', 'seconds'] | No | Available time units for selection |
| `precision` | string | 'seconds' | No | Precision level ('seconds', 'minutes', 'hours', 'days') |
| `showUnits` | boolean | true | No | Show unit selector dropdown |
| `defaultUnit` | string | 'hours' | No | Default time unit when no value is set |
| `minDuration` | number | 0 | No | Minimum duration in seconds |
| `maxDuration` | number | - | No | Maximum duration in seconds |
| `step` | number | 1 | No | Step increment for duration controls |
| `showControls` | boolean | false | No | Show increment/decrement buttons |
| `separators` | object | { hours: ':', minutes: ':', seconds: '.' } | No | Custom separators for duration display |
| `compact` | boolean | false | No | Compact display format without labels |
| `showDays` | boolean | false | No | Include days in duration format |
| `showHours` | boolean | true | No | Include hours in duration format |
| `showMinutes` | boolean | true | No | Include minutes in duration format |
| `showSeconds` | boolean | true | No | Include seconds in duration format |
| `allowNegative` | boolean | false | No | Allow negative durations |
| `autoConvert` | boolean | true | No | Auto-convert between units based on value |
| `onUnitChange` | function | - | No | Callback when unit selection changes |
| `onDurationChange` | function | - | No | Callback when duration value changes |
| `parser` | function | - | No | Custom parser for duration input |
| `formatter` | function | - | No | Custom formatter for duration display |
| `placeholder` | string | 'Enter duration...' | No | Placeholder text when no duration is set |
| `allowFractional` | boolean | false | No | Allow fractional time units (e.g., 1.5 hours) |
| `unitLabels` | object | { seconds: 's', minutes: 'm', hours: 'h', days: 'd' } | No | Custom unit labels for display |
| `showZero` | boolean | false | No | Show zero values in duration display |
| `roundTo` | number | - | No | Round duration to specified decimal places |
| `inputMode` | 'text' | 'time' | 'numeric' | 'text' | No | Input mode for mobile keyboards |
| `mask` | string | - | No | Input mask pattern for duration entry |
| `shortcuts` | DurationShortcut[] | [] | No | Duration shortcuts like "30min", "1h", "8h" |
| `showMilliseconds` | boolean | false | No | Include milliseconds in duration format |
| `strictParsing` | boolean | false | No | Enable strict duration parsing validation |
| `parseFormats` | string[] | [] | No | Additional duration formats to parse |
| `displayFormat` | string | - | No | Override format for display (different from input format) |
| `live` | boolean | false | No | Live update duration while typing |
| `autoFocus` | boolean | false | No | Auto-focus the duration input |
| `selectOnFocus` | boolean | false | No | Select all text when input receives focus |

**Note**: DocyFieldDuration inherits all DocyFieldBase props including validation, layout, dynamic computed properties, actions, and more. See [DocyFieldBase documentation](./DocyFieldBase.md) for the complete list.

### TypeScript Interfaces

```typescript
interface DurationShortcut {
  label: string;
  value: number; // Duration in seconds
  unit?: string; // Unit to display with
  icon?: string;
  description?: string;
}

interface DurationSeparators {
  hours?: string;
  minutes?: string;
  seconds?: string;
  days?: string;
}

interface DurationUnitLabels {
  seconds?: string;
  minutes?: string;
  hours?: string;
  days?: string;
}

interface DurationFieldProps extends DocyFieldBaseProps {
  format?: string;
  units?: string[];
  precision?: string;
  showUnits?: boolean;
  defaultUnit?: string;
  minDuration?: number;
  maxDuration?: number;
  step?: number;
  showControls?: boolean;
  separators?: DurationSeparators;
  compact?: boolean;
  showDays?: boolean;
  showHours?: boolean;
  showMinutes?: boolean;
  showSeconds?: boolean;
  allowNegative?: boolean;
  autoConvert?: boolean;
  onUnitChange?: (unit: string) => void;
  onDurationChange?: (duration: number | null, unit: string) => void;
  parser?: (input: string) => number | null;
  formatter?: (duration: number, unit: string) => string;
  placeholder?: string;
  allowFractional?: boolean;
  unitLabels?: DurationUnitLabels;
  showZero?: boolean;
  roundTo?: number;
  inputMode?: 'text' | 'time' | 'numeric';
  mask?: string;
  shortcuts?: DurationShortcut[];
  showMilliseconds?: boolean;
  strictParsing?: boolean;
  parseFormats?: string[];
  displayFormat?: string;
  live?: boolean;
  autoFocus?: boolean;
  selectOnFocus?: boolean;
}

interface DurationFieldState {
  duration: number | null; // Duration in seconds
  unit: string;
  inputValue: string;
  isValid: boolean;
  parsedDuration: number | null;
  displayValue: string;
  formattedDuration: string;
}
```

### Behavior

1. **Duration Input Methods**:
   - **Manual Entry**: Direct typing with format validation and auto-parsing
   - **Unit Selection**: Dropdown to select time units (seconds, minutes, hours, days)
   - **Controls**: Optional increment/decrement buttons for precise adjustment
   - **Shortcuts**: Quick selection buttons for common durations

2. **Duration Formats**:
   - **Time Format**: HH:MM:SS, HH:MM, MM:SS with customizable separators
   - **Numeric Format**: Single number with unit label (e.g., "2.5 hours")
   - **Compound Format**: Mixed units (e.g., "1h 30m 45s")
   - **Custom Formats**: Flexible formatting with custom patterns

3. **Validation and Constraints**:
   - Min/max duration validation with visual feedback
   - Unit-specific validation and conversion
   - Step interval validation for duration increments
   - Negative duration support with validation

4. **Unit Conversion**:
   - Automatic conversion between time units
   - Precision-aware conversion with rounding
   - Real-time unit switching with value preservation
   - Fractional unit support for precise durations

5. **Advanced Features**:
   - Input masking for guided manual entry
   - Auto-completion based on partial input
   - Multiple parsing formats for flexible input
   - Live updating while typing
   - Millisecond precision support

## Component Requirements

### Technical Specifications
- **Framework**: React 18+ with TypeScript
- **Base Component**: shadcn/ui Input component (`pnpm dlx shadcn@latest add input`)
- **Extensions**: Docy-specific features including duration parsing, unit conversion, validation, and shortcuts built on top of shadcn Input
- **Wrapper**: Extends DocyFieldBase for consistent field structure
- **Styling**: shadcn/ui Input component with Tailwind CSS v4
- **Duration Library**: Custom duration utilities with second-based calculations
- **Masking**: Input masking for duration entry patterns
- **Accessibility**: WCAG 2.1 AA compliance with keyboard navigation and screen reader support

### Key Features Required
1. **Duration Parsing**: Intelligent parsing of various duration input formats
2. **Unit Management**: Dynamic unit selection with automatic conversion
3. **Format Flexibility**: Multiple display formats for different use cases
4. **Validation System**: Min/max durations, step validation, and custom rules
5. **Controls Integration**: Optional increment/decrement buttons
6. **Shortcuts Support**: Quick selection for common duration values
7. **Precision Control**: Configurable precision levels and rounding
8. **Accessibility**: Full keyboard navigation and screen reader support
9. **Responsive Design**: Mobile-friendly touch interactions and input modes

### Usage Examples

```tsx
// Basic duration input
<DocyFieldDuration
  name="taskDuration"
  label="Task Duration"
  required={true}
  format="HH:MM"
  defaultUnit="hours"
  placeholder="Enter task duration"
/>

// Duration with unit selection
<DocyFieldDuration
  name="workDuration"
  label="Work Duration"
  units={['minutes', 'hours', 'days']}
  showUnits={true}
  defaultUnit="hours"
  minDuration={900} // 15 minutes
  maxDuration={28800} // 8 hours
  validations={[
    { type: 'required', message: 'Work duration is required' }
  ]}
/>

// Duration with controls and shortcuts
<DocyFieldDuration
  name="sessionDuration"
  label="Session Duration"
  format="HH:MM:SS"
  showControls={true}
  step={300} // 5 minutes
  shortcuts={[
    { label: '15 min', value: 900 },
    { label: '30 min', value: 1800 },
    { label: '1 hour', value: 3600 },
    { label: '2 hours', value: 7200 }
  ]}
  onDurationChange={(duration, unit) => 
    console.log(`Duration: ${duration} seconds in ${unit}`)
  }
/>

// Duration with days and precise formatting
<DocyFieldDuration
  name="projectDuration"
  label="Project Duration"
  format="days"
  showDays={true}
  showHours={true}
  showMinutes={false}
  showSeconds={false}
  allowFractional={true}
  defaultUnit="days"
  maxDuration={2592000} // 30 days
  separators={{ days: 'd ', hours: 'h ' }}
/>

// Duration with custom validation
<DocyFieldDuration
  name="breakDuration"
  label="Break Duration"
  format="MM:SS"
  precision="seconds"
  minDuration={300} // 5 minutes
  maxDuration={3600} // 1 hour
  validations={[
    { type: 'required', message: 'Break duration is required' }
  ]}
  customValidations={[
    {
      formula: 'breakDuration < 600',
      message: 'Break must be at least 10 minutes'
    },
    {
      formula: 'breakDuration > 1800',
      message: 'Break cannot exceed 30 minutes'
    }
  ]}
/>

// Duration with live updates and masking
<DocyFieldDuration
  name="timerDuration"
  label="Timer Duration"
  format="HH:MM:SS"
  mask="99:99:99"
  live={true}
  autoFocus={true}
  selectOnFocus={true}
  parseFormats={['HH:MM:SS', 'HH:MM', 'MM:SS', 'SS']}
  onDurationChange={(duration) => {
    // Live update timer display
    updateTimerDisplay(duration);
  }}
/>

// Duration with negative values and advanced features
<DocyFieldDuration
  name="adjustmentDuration"
  label="Time Adjustment"
  format="HH:MM"
  allowNegative={true}
  showControls={true}
  step={60} // 1 minute
  unitLabels={{ hours: 'hrs', minutes: 'mins' }}
  formatter={(duration, unit) => {
    const sign = duration < 0 ? '-' : '+';
    const abs = Math.abs(duration);
    return `${sign}${formatDuration(abs, unit)}`;
  }}
/>

// Duration with computed properties
<DocyFieldDuration
  name="estimatedDuration"
  label="Estimated Duration"
  format="HH:MM"
  computedLabel="'Estimated: ' & $formatDuration(estimatedDuration)"
  computedRequired={{ field: 'taskType', operator: 'equals', value: 'timed' }}
  computedDisabled={{ field: 'autoCalculate', operator: 'equals', value: true }}
  actions={{
    change: [
      ['setFieldValueCalculated', {
        field: 'totalCost',
        formula: 'estimatedDuration * hourlyRate / 3600'
      }]
    ]
  }}
/>

// Complete form integration with duration calculations
<form onSubmit={handleSubmit(onSubmit)}>
  <DocyFieldDuration
    name="plannedDuration"
    label="Planned Duration"
    required={true}
    format="HH:MM"
    defaultUnit="hours"
    minDuration={1800} // 30 minutes
    validations={[
      { type: 'required', message: 'Planned duration is required' }
    ]}
    customValidations={[
      {
        formula: 'plannedDuration < 1800',
        message: 'Minimum duration is 30 minutes'
      }
    ]}
    onDurationChange={(duration) => {
      // Calculate estimated cost based on duration
      const cost = (duration / 3600) * hourlyRate;
      setFieldValue('estimatedCost', cost);
    }}
  />
  
  <DocyFieldDuration
    name="actualDuration"
    label="Actual Duration"
    format="HH:MM:SS"
    showControls={true}
    step={60}
    customValidations={[
      {
        formula: 'actualDuration > (plannedDuration * 1.5)',
        message: 'Actual duration significantly exceeds planned duration'
      }
    ]}
    shortcuts={[
      { label: 'Same as planned', value: 'plannedDuration' },
      { label: 'Half planned', value: 'plannedDuration / 2' },
      { label: 'Double planned', value: 'plannedDuration * 2' }
    ]}
  />
</form>

// Duration with work hours validation
<DocyFieldDuration
  name="workHours"
  label="Daily Work Hours"
  format="HH:MM"
  defaultUnit="hours"
  minDuration={3600} // 1 hour
  maxDuration={43200} // 12 hours
  step={900} // 15 minutes
  shortcuts={[
    { label: '4 hours', value: 14400 },
    { label: '6 hours', value: 21600 },
    { label: '8 hours', value: 28800 },
    { label: '10 hours', value: 36000 }
  ]}
  customValidations={[
    {
      formula: 'workHours > 32400', // 9 hours
      message: 'Work hours over 9 hours require approval'
    }
  ]}
/>

// Duration with millisecond precision
<DocyFieldDuration
  name="precisionDuration"
  label="Precision Duration"
  format="HH:MM:SS.sss"
  showMilliseconds={true}
  precision="milliseconds"
  step={100} // 100ms
  allowFractional={true}
  roundTo={3}
  validations={[
    { type: 'required', message: 'Precision duration is required' }
  ]}
/>

// Duration with business rules
<DocyFieldDuration
  name="meetingDuration"
  label="Meeting Duration"
  format="HH:MM"
  defaultUnit="minutes"
  minDuration={900} // 15 minutes
  maxDuration={14400} // 4 hours
  step={900} // 15 minutes
  shortcuts={[
    { label: '15 min', value: 900 },
    { label: '30 min', value: 1800 },
    { label: '1 hour', value: 3600 },
    { label: '2 hours', value: 7200 }
  ]}
  customValidations={[
    {
      formula: 'meetingDuration > 7200 and attendeeCount > 5',
      message: 'Long meetings with many attendees require approval'
    },
    {
      formula: '$dayOfWeek($now()) = 5 and meetingDuration > 3600',
      message: 'Friday meetings should be under 1 hour'
    }
  ]}
/>
```

### Integration Requirements
- **DocyFieldBase**: Base wrapper component (required)
- **DocyInput**: Input component for duration entry
- **DocyIcon**: For duration icons, controls, and shortcuts
- **DocyButton**: For increment/decrement controls and shortcuts
- **DocySelect**: For unit selection dropdown
- **DocyTooltip**: For validation messages and help text
- **Duration utilities**: Custom duration parsing and formatting functions
- **Input masking library**: For duration pattern formatting

### Dependencies Required
- `react-hook-form`: Form state management (inherited from DocyFieldBase)
- `@radix-ui/react-select`: Unit selection dropdown
- `class-variance-authority`: Variant management
- `react-input-mask` or `imask`: Input masking for duration patterns
- Custom duration utilities for parsing and formatting
- All DocyFieldBase dependencies

### Testing Requirements
1. **Unit Tests**: Duration parsing, validation, formatting, unit conversion, step calculations
2. **Integration Tests**: React Hook Form integration, unit selection, controls functionality
3. **Visual Tests**: All duration formats, disabled states, unit displays, responsive behavior
4. **Accessibility Tests**: Keyboard navigation, screen reader support, ARIA attributes, focus management
5. **Performance Tests**: Large duration values, rapid input changes, complex validation
6. **Validation Tests**: Min/max durations, step validation, custom validation rules, format validation
7. **Input Tests**: Manual entry, auto-completion, input masking, parsing formats, live updates
8. **Conversion Tests**: Unit conversion accuracy, precision handling, fractional values, negative durations

## Development Priority
**Medium** - Important component for time tracking, scheduling, and duration-based calculations

## Notes
- Built on shadcn/ui Input component for consistency with design system
- Supports complex duration scenarios including work tracking and time calculations
- Full unit conversion with precision control and validation
- Optimized for both desktop and mobile interactions with appropriate input modes
- TypeScript support with comprehensive type safety
- Integrates seamlessly with existing form validation and actions systems
- Performance optimized for large forms with multiple duration fields
- Complete accessibility compliance ensures inclusive user experience
- Flexible validation system supports complex business rules and duration constraints
- Auto-completion and input masking improve user experience for manual entry
- Real-time validation and live updates provide immediate feedback
- Extensible architecture allows for custom parsers and formatters