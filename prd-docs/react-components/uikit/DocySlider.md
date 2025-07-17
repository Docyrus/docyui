# DocySlider Component

## Overview
DocySlider is a range slider component built on shadcn/ui patterns that provides value selection through draggable thumbs. It supports single and multiple values, step intervals, and accessibility features. It serves as the primary slider input component throughout the Docyrus React application.

## Component Specification

### Props
| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-----------|
| `value` | number/array | - | No | Current slider value(s) |
| `defaultValue` | number/array | - | No | Default slider value(s) |
| `onValueChange` | function | - | No | Callback when value changes |
| `min` | number | 0 | No | Minimum value |
| `max` | number | 100 | No | Maximum value |
| `step` | number | 1 | No | Step interval |
| `disabled` | boolean | false | No | Disable slider |
| `orientation` | string | 'horizontal' | No | Slider orientation: 'horizontal', 'vertical' |
| `name` | string | - | No | Form field name |
| `className` | string | - | No | Additional CSS classes |
| `trackClassName` | string | - | No | Track CSS classes |
| `rangeClassName` | string | - | No | Range CSS classes |
| `thumbClassName` | string | - | No | Thumb CSS classes |
| `formatValue` | function | - | No | Value formatting function |
| `showTooltip` | boolean | false | No | Show value tooltip |
| `marks` | array | - | No | Step marks configuration |

### Slider Types
- **Single Value**: One draggable thumb
- **Range**: Two thumbs for min/max selection
- **Multi-Value**: Multiple thumbs for complex ranges

### Orientations
- **Horizontal**: Left-to-right slider
- **Vertical**: Bottom-to-top slider

### Features
- **Step Marks**: Visual indicators for specific values
- **Value Tooltip**: Display current value on hover/drag
- **Keyboard Support**: Arrow keys for precise control
- **Touch Support**: Mobile-friendly drag interactions

## Component Requirements

### Technical Specifications
- **Framework**: React with TypeScript
- **Base Component**: shadcn/ui Slider (`pnpm dlx shadcn@latest add slider`)
- **Extensions**: Tooltips, marks, formatting, orientation
- **Styling**: shadcn/ui patterns with class-variance-authority
- **Accessibility**: Full ARIA support, keyboard navigation
- **Performance**: Optimized dragging and value updates
- **Touch Support**: Mobile-friendly interactions

### Key Features Required
1. **Value Selection**: Single and range value selection
2. **Step Control**: Configurable step intervals
3. **Orientation Support**: Horizontal and vertical layouts
4. **Keyboard Navigation**: Arrow keys for precise control
5. **Touch Support**: Mobile-friendly drag interactions
6. **Value Formatting**: Custom value display formatting
7. **Accessibility**: Screen reader support and ARIA compliance
8. **Visual Feedback**: Tooltips and marks for better UX

### Usage Examples
```tsx
// Basic slider
<DocySlider
  value={value}
  onValueChange={setValue}
  min={0}
  max={100}
  step={1}
  className="w-full"
/>

// Range slider
<DocySlider
  value={[20, 80]}
  onValueChange={setRange}
  min={0}
  max={100}
  step={5}
  className="w-full"
/>

// Price range slider
<div className="space-y-2">
  <div className="flex justify-between text-sm">
    <span>Price Range</span>
    <span>${priceRange[0]} - ${priceRange[1]}</span>
  </div>
  <DocySlider
    value={priceRange}
    onValueChange={setPriceRange}
    min={0}
    max={1000}
    step={10}
    formatValue={(value) => `$${value}`}
    showTooltip
    className="w-full"
  />
</div>

// Volume slider
<div className="flex items-center space-x-4">
  <DocyIcon name="volume-x" size={16} />
  <DocySlider
    value={volume}
    onValueChange={setVolume}
    min={0}
    max={100}
    step={1}
    className="flex-1"
  />
  <DocyIcon name="volume-2" size={16} />
  <span className="text-sm w-8">{volume}%</span>
</div>

// Brightness slider
<div className="space-y-2">
  <div className="flex justify-between text-sm">
    <span>Brightness</span>
    <span>{brightness}%</span>
  </div>
  <DocySlider
    value={brightness}
    onValueChange={setBrightness}
    min={0}
    max={100}
    step={5}
    marks={[0, 25, 50, 75, 100]}
    className="w-full"
  />
</div>

// Vertical slider
<div className="flex items-center space-x-4 h-48">
  <span className="text-sm">Volume</span>
  <DocySlider
    value={verticalValue}
    onValueChange={setVerticalValue}
    orientation="vertical"
    min={0}
    max={100}
    step={1}
    className="h-full"
  />
  <span className="text-sm">{verticalValue}%</span>
</div>

// Temperature slider
<div className="space-y-2">
  <div className="flex justify-between text-sm">
    <span>Temperature</span>
    <span>{temperature}°C</span>
  </div>
  <DocySlider
    value={temperature}
    onValueChange={setTemperature}
    min={-10}
    max={40}
    step={0.5}
    formatValue={(value) => `${value}°C`}
    marks={[-10, 0, 10, 20, 30, 40]}
    className="w-full"
  />
</div>

// Age range slider
<div className="space-y-2">
  <div className="flex justify-between text-sm">
    <span>Age Range</span>
    <span>{ageRange[0]} - {ageRange[1]} years</span>
  </div>
  <DocySlider
    value={ageRange}
    onValueChange={setAgeRange}
    min={18}
    max={80}
    step={1}
    marks={[18, 25, 35, 50, 65, 80]}
    className="w-full"
  />
</div>

// Disabled slider
<div className="space-y-2">
  <div className="flex justify-between text-sm text-gray-500">
    <span>Disabled Setting</span>
    <span>{disabledValue}</span>
  </div>
  <DocySlider
    value={disabledValue}
    disabled
    min={0}
    max={100}
    className="w-full"
  />
</div>

// Color opacity slider
<div className="space-y-2">
  <div className="flex justify-between text-sm">
    <span>Opacity</span>
    <span>{Math.round(opacity * 100)}%</span>
  </div>
  <DocySlider
    value={opacity}
    onValueChange={setOpacity}
    min={0}
    max={1}
    step={0.01}
    formatValue={(value) => `${Math.round(value * 100)}%`}
    className="w-full"
  />
  <div 
    className="w-full h-8 bg-blue-500 rounded"
    style={{ opacity }}
  />
</div>

// Progress/buffer slider
<div className="space-y-2">
  <div className="flex justify-between text-sm">
    <span>Progress</span>
    <span>{formatTime(progress)} / {formatTime(duration)}</span>
  </div>
  <DocySlider
    value={progress}
    onValueChange={setProgress}
    min={0}
    max={duration}
    step={1}
    className="w-full"
  />
</div>

// Zoom slider
<div className="flex items-center space-x-2">
  <DocyIcon name="zoom-out" size={16} />
  <DocySlider
    value={zoom}
    onValueChange={setZoom}
    min={10}
    max={200}
    step={10}
    formatValue={(value) => `${value}%`}
    className="flex-1"
  />
  <DocyIcon name="zoom-in" size={16} />
  <span className="text-sm w-12">{zoom}%</span>
</div>

// Rating slider
<div className="space-y-2">
  <div className="flex justify-between text-sm">
    <span>Rating</span>
    <span>{rating}/5 stars</span>
  </div>
  <DocySlider
    value={rating}
    onValueChange={setRating}
    min={1}
    max={5}
    step={0.5}
    marks={[1, 2, 3, 4, 5]}
    className="w-full"
  />
  <div className="flex items-center space-x-1">
    {Array.from({ length: 5 }, (_, i) => (
      <DocyIcon
        key={i}
        name="star"
        size={16}
        className={i < Math.floor(rating) ? 'text-yellow-500' : 'text-gray-300'}
      />
    ))}
  </div>
</div>

// Multi-value slider
<div className="space-y-2">
  <div className="flex justify-between text-sm">
    <span>Distribution</span>
    <span>{multiValues.join(', ')}</span>
  </div>
  <DocySlider
    value={multiValues}
    onValueChange={setMultiValues}
    min={0}
    max={100}
    step={1}
    className="w-full"
  />
</div>

// Form integration
<form className="space-y-4">
  <div className="space-y-2">
    <DocyLabel htmlFor="budget">Budget Range</DocyLabel>
    <DocySlider
      id="budget"
      name="budget"
      value={budgetRange}
      onValueChange={setBudgetRange}
      min={0}
      max={10000}
      step={100}
      formatValue={(value) => `$${value.toLocaleString()}`}
      className="w-full"
    />
    <div className="flex justify-between text-sm text-gray-600">
      <span>${budgetRange[0].toLocaleString()}</span>
      <span>${budgetRange[1].toLocaleString()}</span>
    </div>
  </div>
  
  <div className="space-y-2">
    <DocyLabel htmlFor="experience">Experience Level</DocyLabel>
    <DocySlider
      id="experience"
      name="experience"
      value={experience}
      onValueChange={setExperience}
      min={1}
      max={10}
      step={1}
      marks={[1, 3, 5, 7, 10]}
      className="w-full"
    />
    <div className="flex justify-between text-xs text-gray-600">
      <span>Beginner</span>
      <span>Intermediate</span>
      <span>Expert</span>
    </div>
  </div>
  
  <DocyButton type="submit">Apply Filters</DocyButton>
</form>

// Custom styled slider
<DocySlider
  value={customValue}
  onValueChange={setCustomValue}
  min={0}
  max={100}
  step={1}
  className="w-full"
  trackClassName="bg-gray-200 h-2"
  rangeClassName="bg-gradient-to-r from-blue-500 to-purple-500"
  thumbClassName="bg-white border-2 border-blue-500 shadow-lg"
/>
```

### Integration Requirements
- **DocyIcon**: Volume, zoom, and other slider icons
- **DocyLabel**: Form labels for sliders
- **DocyButton**: Form submission and actions
- **DocyTooltip**: Value tooltips on hover
- **Form Libraries**: React Hook Form integration
- **Theme System**: Consistent styling

### Form Integration
```tsx
// React Hook Form integration
import { Controller, useForm } from 'react-hook-form';

function FilterForm() {
  const { control, handleSubmit } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="priceRange"
        control={control}
        defaultValue={[0, 100]}
        render={({ field }) => (
          <DocySlider
            value={field.value}
            onValueChange={field.onChange}
            min={0}
            max={1000}
            step={10}
            className="w-full"
          />
        )}
      />
    </form>
  );
}
```

### Accessibility Requirements
- **ARIA Attributes**: slider, valuenow, valuemin, valuemax
- **Keyboard Navigation**: Arrow keys, Page Up/Down, Home/End
- **Screen Reader Support**: Value announcements
- **Focus Management**: Clear focus indicators
- **Touch Support**: Mobile-friendly interactions

### Performance Optimization
- **Debounced Updates**: Throttled value change events
- **Efficient Rendering**: Optimized thumb positioning
- **Memory Management**: Proper event cleanup
- **Smooth Dragging**: Hardware-accelerated interactions

### Testing Requirements
1. **Unit Tests**: Value changes, step intervals, constraints
2. **Integration Tests**: Form integration, event handling
3. **Accessibility Tests**: ARIA attributes, keyboard navigation
4. **Visual Tests**: All orientations and styling
5. **Performance Tests**: Smooth dragging, value updates
6. **Touch Tests**: Mobile interactions, gestures

## Development Priority
**Medium** - Useful for numeric input and range selection

## Notes
- Built with modern shadcn/ui patterns for consistency
- Optimized for both desktop and mobile interactions
- Full accessibility compliance with WCAG guidelines
- TypeScript support with comprehensive type safety
- Supports complex multi-value scenarios
- Flexible styling and customization options
- Integrates seamlessly with form libraries
