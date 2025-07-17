# DocyToggleGroup Component

## Overview
DocyToggleGroup is a group of toggle buttons built on shadcn/ui patterns that provides single or multiple selection functionality. It supports various layouts, sizes, and accessibility features. It serves as the primary toggle group component throughout the Docyrus React application.

## Component Specification

### Props
| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-----------|
| `type` | string | 'single' | No | Selection type: 'single', 'multiple' |
| `value` | string/string[] | - | No | Selected value(s) |
| `defaultValue` | string/string[] | - | No | Default selected value(s) |
| `onValueChange` | function | - | No | Callback when selection changes |
| `disabled` | boolean | false | No | Disable entire group |
| `size` | string | 'default' | No | Toggle size: 'sm', 'default', 'lg' |
| `variant` | string | 'default' | No | Toggle variant: 'default', 'outline' |
| `orientation` | string | 'horizontal' | No | Layout orientation: 'horizontal', 'vertical' |
| `className` | string | - | No | Additional CSS classes |
| `loop` | boolean | true | No | Enable keyboard navigation loop |
| `rovingFocus` | boolean | true | No | Enable roving focus |

### Toggle Item Props
| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-----------|
| `value` | string | - | Yes | Item value |
| `disabled` | boolean | false | No | Disable this item |
| `children` | ReactNode | - | No | Item content |
| `className` | string | - | No | Additional CSS classes |
| `aria-label` | string | - | No | Accessibility label |

### Selection Types
- **single**: Only one item can be selected at a time
- **multiple**: Multiple items can be selected simultaneously

### Layout Options
- **horizontal**: Items arranged horizontally
- **vertical**: Items arranged vertically

## Component Requirements

### Technical Specifications
- **Framework**: React with TypeScript
- **Base Component**: shadcn/ui Toggle Group (`pnpm dlx shadcn@latest add toggle-group`)
- **Extensions**: Enhanced navigation, layouts, accessibility
- **Styling**: shadcn/ui patterns with class-variance-authority
- **Accessibility**: Full ARIA support, keyboard navigation
- **Performance**: Optimized selection handling
- **Form Integration**: Compatible with form libraries

### Key Features Required
1. **Selection Modes**: Single and multiple selection
2. **Keyboard Navigation**: Arrow keys, roving focus
3. **Layout Options**: Horizontal and vertical layouts
4. **Size Variants**: Multiple sizes for different contexts
5. **Accessibility**: Screen reader support and ARIA compliance
6. **Disabled State**: Individual and group disable support
7. **Form Integration**: Compatible with form libraries
8. **Visual Feedback**: Clear selection indicators

### Usage Examples
```tsx
// Basic single selection
<DocyToggleGroup
  type="single"
  value={selectedValue}
  onValueChange={setSelectedValue}
>
  <DocyToggleGroupItem value="option1">Option 1</DocyToggleGroupItem>
  <DocyToggleGroupItem value="option2">Option 2</DocyToggleGroupItem>
  <DocyToggleGroupItem value="option3">Option 3</DocyToggleGroupItem>
</DocyToggleGroup>

// Multiple selection
<DocyToggleGroup
  type="multiple"
  value={selectedValues}
  onValueChange={setSelectedValues}
>
  <DocyToggleGroupItem value="bold">
    <DocyIcon name="bold" size={16} />
  </DocyToggleGroupItem>
  <DocyToggleGroupItem value="italic">
    <DocyIcon name="italic" size={16} />
  </DocyToggleGroupItem>
  <DocyToggleGroupItem value="underline">
    <DocyIcon name="underline" size={16} />
  </DocyToggleGroupItem>
</DocyToggleGroup>

// Text alignment
<DocyToggleGroup
  type="single"
  value={textAlign}
  onValueChange={setTextAlign}
  size="sm"
>
  <DocyToggleGroupItem value="left" aria-label="Align left">
    <DocyIcon name="align-left" size={14} />
  </DocyToggleGroupItem>
  <DocyToggleGroupItem value="center" aria-label="Align center">
    <DocyIcon name="align-center" size={14} />
  </DocyToggleGroupItem>
  <DocyToggleGroupItem value="right" aria-label="Align right">
    <DocyIcon name="align-right" size={14} />
  </DocyToggleGroupItem>
  <DocyToggleGroupItem value="justify" aria-label="Justify">
    <DocyIcon name="align-justify" size={14} />
  </DocyToggleGroupItem>
</DocyToggleGroup>

// View modes
<DocyToggleGroup
  type="single"
  value={viewMode}
  onValueChange={setViewMode}
  variant="outline"
>
  <DocyToggleGroupItem value="grid" aria-label="Grid view">
    <DocyIcon name="grid" size={16} />
    Grid
  </DocyToggleGroupItem>
  <DocyToggleGroupItem value="list" aria-label="List view">
    <DocyIcon name="list" size={16} />
    List
  </DocyToggleGroupItem>
  <DocyToggleGroupItem value="card" aria-label="Card view">
    <DocyIcon name="square" size={16} />
    Card
  </DocyToggleGroupItem>
</DocyToggleGroup>

// Vertical layout
<DocyToggleGroup
  type="single"
  value={selectedPanel}
  onValueChange={setSelectedPanel}
  orientation="vertical"
  className="w-32"
>
  <DocyToggleGroupItem value="files">
    <DocyIcon name="folder" size={16} />
    Files
  </DocyToggleGroupItem>
  <DocyToggleGroupItem value="search">
    <DocyIcon name="search" size={16} />
    Search
  </DocyToggleGroupItem>
  <DocyToggleGroupItem value="settings">
    <DocyIcon name="settings" size={16} />
    Settings
  </DocyToggleGroupItem>
</DocyToggleGroup>

// Filter tags
<DocyToggleGroup
  type="multiple"
  value={activeTags}
  onValueChange={setActiveTags}
  size="sm"
  variant="outline"
>
  {tags.map((tag) => (
    <DocyToggleGroupItem key={tag.id} value={tag.id}>
      {tag.name}
    </DocyToggleGroupItem>
  ))}
</DocyToggleGroup>

// Priority levels
<DocyToggleGroup
  type="single"
  value={priority}
  onValueChange={setPriority}
  size="sm"
>
  <DocyToggleGroupItem value="low">
    <div className="flex items-center space-x-1">
      <div className="w-2 h-2 bg-green-500 rounded-full" />
      <span>Low</span>
    </div>
  </DocyToggleGroupItem>
  <DocyToggleGroupItem value="medium">
    <div className="flex items-center space-x-1">
      <div className="w-2 h-2 bg-yellow-500 rounded-full" />
      <span>Medium</span>
    </div>
  </DocyToggleGroupItem>
  <DocyToggleGroupItem value="high">
    <div className="flex items-center space-x-1">
      <div className="w-2 h-2 bg-red-500 rounded-full" />
      <span>High</span>
    </div>
  </DocyToggleGroupItem>
</DocyToggleGroup>

// Date range
<DocyToggleGroup
  type="single"
  value={dateRange}
  onValueChange={setDateRange}
  variant="outline"
>
  <DocyToggleGroupItem value="today">Today</DocyToggleGroupItem>
  <DocyToggleGroupItem value="week">This Week</DocyToggleGroupItem>
  <DocyToggleGroupItem value="month">This Month</DocyToggleGroupItem>
  <DocyToggleGroupItem value="year">This Year</DocyToggleGroupItem>
</DocyToggleGroup>

// Sort options
<DocyToggleGroup
  type="single"
  value={sortBy}
  onValueChange={setSortBy}
  size="sm"
>
  <DocyToggleGroupItem value="name">
    <DocyIcon name="sort-alpha" size={14} />
    Name
  </DocyToggleGroupItem>
  <DocyToggleGroupItem value="date">
    <DocyIcon name="calendar" size={14} />
    Date
  </DocyToggleGroupItem>
  <DocyToggleGroupItem value="size">
    <DocyIcon name="hard-drive" size={14} />
    Size
  </DocyToggleGroupItem>
</DocyToggleGroup>

// Media controls
<DocyToggleGroup
  type="multiple"
  value={mediaSettings}
  onValueChange={setMediaSettings}
  size="sm"
>
  <DocyToggleGroupItem value="shuffle" aria-label="Shuffle">
    <DocyIcon name="shuffle" size={16} />
  </DocyToggleGroupItem>
  <DocyToggleGroupItem value="repeat" aria-label="Repeat">
    <DocyIcon name="repeat" size={16} />
  </DocyToggleGroupItem>
  <DocyToggleGroupItem value="favorite" aria-label="Favorite">
    <DocyIcon name="heart" size={16} />
  </DocyToggleGroupItem>
</DocyToggleGroup>

// Language selection
<DocyToggleGroup
  type="single"
  value={language}
  onValueChange={setLanguage}
  variant="outline"
  size="sm"
>
  <DocyToggleGroupItem value="en">EN</DocyToggleGroupItem>
  <DocyToggleGroupItem value="es">ES</DocyToggleGroupItem>
  <DocyToggleGroupItem value="fr">FR</DocyToggleGroupItem>
  <DocyToggleGroupItem value="de">DE</DocyToggleGroupItem>
</DocyToggleGroup>

// Chart types
<DocyToggleGroup
  type="single"
  value={chartType}
  onValueChange={setChartType}
>
  <DocyToggleGroupItem value="bar">
    <DocyIcon name="bar-chart" size={16} />
    Bar
  </DocyToggleGroupItem>
  <DocyToggleGroupItem value="line">
    <DocyIcon name="line-chart" size={16} />
    Line
  </DocyToggleGroupItem>
  <DocyToggleGroupItem value="pie">
    <DocyIcon name="pie-chart" size={16} />
    Pie
  </DocyToggleGroupItem>
</DocyToggleGroup>

// Disabled items
<DocyToggleGroup
  type="single"
  value={selectedFeature}
  onValueChange={setSelectedFeature}
>
  <DocyToggleGroupItem value="basic">Basic</DocyToggleGroupItem>
  <DocyToggleGroupItem value="pro">Pro</DocyToggleGroupItem>
  <DocyToggleGroupItem value="enterprise" disabled>
    Enterprise
  </DocyToggleGroupItem>
</DocyToggleGroup>

// Status selection
<DocyToggleGroup
  type="single"
  value={status}
  onValueChange={setStatus}
  variant="outline"
>
  <DocyToggleGroupItem value="active">
    <div className="flex items-center space-x-2">
      <div className="w-2 h-2 bg-green-500 rounded-full" />
      <span>Active</span>
    </div>
  </DocyToggleGroupItem>
  <DocyToggleGroupItem value="inactive">
    <div className="flex items-center space-x-2">
      <div className="w-2 h-2 bg-gray-500 rounded-full" />
      <span>Inactive</span>
    </div>
  </DocyToggleGroupItem>
  <DocyToggleGroupItem value="pending">
    <div className="flex items-center space-x-2">
      <div className="w-2 h-2 bg-yellow-500 rounded-full" />
      <span>Pending</span>
    </div>
  </DocyToggleGroupItem>
</DocyToggleGroup>

// Size variants
<div className="space-y-4">
  <DocyToggleGroup type="single" size="sm" value={small} onValueChange={setSmall}>
    <DocyToggleGroupItem value="1">Small</DocyToggleGroupItem>
    <DocyToggleGroupItem value="2">Options</DocyToggleGroupItem>
  </DocyToggleGroup>
  
  <DocyToggleGroup type="single" size="default" value={medium} onValueChange={setMedium}>
    <DocyToggleGroupItem value="1">Default</DocyToggleGroupItem>
    <DocyToggleGroupItem value="2">Options</DocyToggleGroupItem>
  </DocyToggleGroup>
  
  <DocyToggleGroup type="single" size="lg" value={large} onValueChange={setLarge}>
    <DocyToggleGroupItem value="1">Large</DocyToggleGroupItem>
    <DocyToggleGroupItem value="2">Options</DocyToggleGroupItem>
  </DocyToggleGroup>
</div>

// Form integration
<form className="space-y-4">
  <div>
    <label className="block text-sm font-medium mb-2">Notification Preferences</label>
    <DocyToggleGroup
      type="multiple"
      value={notificationTypes}
      onValueChange={setNotificationTypes}
      variant="outline"
      size="sm"
    >
      <DocyToggleGroupItem value="email">
        <DocyIcon name="mail" size={14} />
        Email
      </DocyToggleGroupItem>
      <DocyToggleGroupItem value="sms">
        <DocyIcon name="message-square" size={14} />
        SMS
      </DocyToggleGroupItem>
      <DocyToggleGroupItem value="push">
        <DocyIcon name="bell" size={14} />
        Push
      </DocyToggleGroupItem>
    </DocyToggleGroup>
  </div>
  
  <div>
    <label className="block text-sm font-medium mb-2">Theme</label>
    <DocyToggleGroup
      type="single"
      value={theme}
      onValueChange={setTheme}
    >
      <DocyToggleGroupItem value="light">
        <DocyIcon name="sun" size={16} />
        Light
      </DocyToggleGroupItem>
      <DocyToggleGroupItem value="dark">
        <DocyIcon name="moon" size={16} />
        Dark
      </DocyToggleGroupItem>
      <DocyToggleGroupItem value="system">
        <DocyIcon name="monitor" size={16} />
        System
      </DocyToggleGroupItem>
    </DocyToggleGroup>
  </div>
  
  <DocyButton type="submit">Save Preferences</DocyButton>
</form>
```

### Integration Requirements
- **DocyIcon**: Icons within toggle items
- **Form Libraries**: React Hook Form integration
- **Theme System**: Consistent styling
- **Keyboard Handler**: Enhanced keyboard navigation

### Accessibility Requirements
- **ARIA Attributes**: radiogroup, radio, group roles
- **Keyboard Navigation**: Arrow keys, Tab, Space, Enter
- **Screen Reader Support**: Selection announcements
- **Focus Management**: Roving focus, focus indicators
- **Semantic HTML**: Proper group and item structure

### Performance Optimization
- **Efficient Selection**: Optimized value updates
- **Event Handling**: Proper event delegation
- **Memory Management**: Cleanup of event listeners
- **Render Optimization**: Prevent unnecessary re-renders

### Testing Requirements
1. **Unit Tests**: Selection logic, keyboard navigation
2. **Integration Tests**: Form integration, value changes
3. **Accessibility Tests**: ARIA attributes, keyboard interaction
4. **Visual Tests**: All variants, sizes, and orientations
5. **Interaction Tests**: Mouse, keyboard, touch interactions
6. **Form Tests**: Form submission, validation

## Development Priority
**Medium** - Useful for grouped toggle functionality and selection interfaces

## Notes
- Built with modern shadcn/ui patterns for consistency
- Optimized for grouped selection scenarios
- Full accessibility compliance with WCAG guidelines
- TypeScript support with comprehensive type safety
- Flexible layout and styling options
- Integrates seamlessly with form libraries
- Supports complex selection workflows
