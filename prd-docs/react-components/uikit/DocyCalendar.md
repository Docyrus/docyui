# DocyCalendar Component

## Overview
DocyCalendar is a comprehensive calendar component built on shadcn/ui patterns that provides date selection, navigation, and event display functionality. It supports single and multiple date selection, date ranges, event visualization, and various display modes. It serves as the primary calendar interface throughout the Docyrus React application.

## Component Specification

### Props
| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-----------|
| `mode` | string | 'single' | No | Selection mode: 'single', 'multiple', 'range' |
| `selected` | Date/Date[]/DateRange | - | No | Selected date(s) |
| `onSelect` | function | - | No | Callback when date is selected |
| `disabled` | function/Date[] | - | No | Disabled dates or function |
| `fromDate` | Date | - | No | Earliest selectable date |
| `toDate` | Date | - | No | Latest selectable date |
| `events` | array | [] | No | Events to display on calendar |
| `showWeekNumbers` | boolean | false | No | Show week numbers |
| `showOutsideDays` | boolean | true | No | Show days from other months |
| `locale` | string | 'en-US' | No | Locale for date formatting |
| `weekStartsOn` | number | 0 | No | First day of week (0-6) |
| `className` | string | - | No | Additional CSS classes |
| `components` | object | - | No | Custom component overrides |

### Selection Modes
1. **Single**: Select one date
2. **Multiple**: Select multiple individual dates
3. **Range**: Select a continuous date range

### Calendar Views
- **Month View**: Standard monthly calendar grid
- **Week View**: Weekly calendar with time slots
- **Day View**: Single day with detailed time slots
- **Year View**: Year overview with month navigation

### Event System
```typescript
interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  startTime?: string;
  endTime?: string;
  color?: string;
  type?: 'meeting' | 'task' | 'reminder' | 'event';
  description?: string;
  location?: string;
}
```

### Accessibility Features
- **Keyboard Navigation**: Arrow keys, Enter, Space, Tab
- **Screen Reader Support**: ARIA labels, roles, and descriptions
- **Focus Management**: Proper focus indicators and trapping
- **Date Announcements**: Clear date and event announcements

## Component Requirements

### Technical Specifications
- **Framework**: React with TypeScript
- **Base Component**: shadcn/ui Calendar component (`pnpm dlx shadcn@latest add calendar`)
- **Extensions**: Event display, multiple selection modes, view switching
- **Styling**: shadcn/ui patterns with class-variance-authority
- **Date Library**: date-fns for date manipulation and formatting
- **Accessibility**: Full ARIA support, keyboard navigation
- **Performance**: Virtualized rendering for large date ranges

### Key Features Required
1. **Multiple Selection Modes**: Single, multiple, and range selection
2. **Event Display**: Visual event indicators with details
3. **Date Navigation**: Month/year navigation with smooth transitions
4. **Keyboard Support**: Full keyboard navigation capabilities
5. **Localization**: Multi-language and locale support
6. **Disabled Dates**: Flexible date disabling system
7. **Custom Components**: Extensible component system
8. **Responsive Design**: Mobile-friendly touch interactions

### Advanced Features
- **Event Tooltips**: Hover information for events
- **Drag and Drop**: Event creation and modification
- **Time Zone Support**: Multi-timezone calendar display
- **Recurring Events**: Support for repeating events
- **Export Functionality**: Calendar data export

### Usage Examples
```tsx
// Basic single date selection
<DocyCalendar
  mode="single"
  selected={selectedDate}
  onSelect={setSelectedDate}
/>

// Multiple date selection
<DocyCalendar
  mode="multiple"
  selected={selectedDates}
  onSelect={setSelectedDates}
/>

// Date range selection
<DocyCalendar
  mode="range"
  selected={dateRange}
  onSelect={setDateRange}
/>

// With events
<DocyCalendar
  mode="single"
  selected={selectedDate}
  onSelect={setSelectedDate}
  events={[
    {
      id: '1',
      title: 'Team Meeting',
      date: new Date('2024-03-15'),
      startTime: '10:00',
      endTime: '11:00',
      color: 'blue',
      type: 'meeting'
    }
  ]}
/>

// With disabled dates
<DocyCalendar
  mode="single"
  selected={selectedDate}
  onSelect={setSelectedDate}
  disabled={[
    new Date('2024-03-10'),
    new Date('2024-03-15')
  ]}
/>

// With date range limits
<DocyCalendar
  mode="single"
  selected={selectedDate}
  onSelect={setSelectedDate}
  fromDate={new Date('2024-01-01')}
  toDate={new Date('2024-12-31')}
/>

// With custom styling
<DocyCalendar
  mode="single"
  selected={selectedDate}
  onSelect={setSelectedDate}
  className="border-2 border-blue-500"
  showWeekNumbers
  weekStartsOn={1}
/>

// Localized calendar
<DocyCalendar
  mode="single"
  selected={selectedDate}
  onSelect={setSelectedDate}
  locale="fr-FR"
  weekStartsOn={1}
/>
```

### Integration Requirements
- **DocyIcon**: Navigation arrows and event icons
- **DocyTooltip**: Event information display
- **DocyPopover**: Event details and actions
- **Date Utilities**: Date formatting and manipulation
- **Theme System**: Calendar theming and customization

### Testing Requirements
1. **Unit Tests**: Date selection, navigation, event display
2. **Integration Tests**: Event handling, keyboard navigation
3. **Accessibility Tests**: Screen reader support, keyboard interaction
4. **Visual Tests**: Different locales, themes, and event displays
5. **Performance Tests**: Large date ranges, many events
6. **Interaction Tests**: Touch gestures, drag and drop

## Development Priority
**High** - Essential component for scheduling and date-related functionality

## Notes
- Built with modern shadcn/ui patterns for consistency
- Supports complex scheduling scenarios
- Full internationalization support
- Optimized for both desktop and mobile use
- TypeScript support with comprehensive type safety
- Integrates with existing event management systems
