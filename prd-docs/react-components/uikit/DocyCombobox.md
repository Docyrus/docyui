# DocyCombobox Component

## Overview
DocyCombobox is an autocomplete input component built on shadcn/ui patterns that combines a text input with a dropdown list of suggestions. It supports searching, filtering, keyboard navigation, and custom rendering. It serves as the primary autocomplete input component throughout the Docyrus React application.

## Component Specification

### Props
| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-----------|
| `value` | string | - | No | Current input value |
| `onValueChange` | function | - | No | Callback when value changes |
| `selected` | string | - | No | Selected option value |
| `onSelectedChange` | function | - | No | Callback when selection changes |
| `options` | array | [] | Yes | Array of selectable options |
| `placeholder` | string | - | No | Input placeholder text |
| `disabled` | boolean | false | No | Disable combobox interaction |
| `loading` | boolean | false | No | Show loading state |
| `error` | string | - | No | Error message |
| `label` | string | - | No | Input label |
| `description` | string | - | No | Helper text description |
| `required` | boolean | false | No | Mark input as required |
| `searchable` | boolean | true | No | Enable search functionality |
| `clearable` | boolean | true | No | Enable clear button |
| `multiple` | boolean | false | No | Allow multiple selections |
| `className` | string | - | No | Additional CSS classes |
| `popoverClassName` | string | - | No | Popover CSS classes |
| `renderOption` | function | - | No | Custom option renderer |
| `renderSelected` | function | - | No | Custom selected value renderer |
| `onSearch` | function | - | No | Custom search handler |
| `emptyMessage` | string | 'No results found' | No | Message when no options |

### Option Structure
```typescript
interface ComboboxOption {
  value: string;
  label: string;
  disabled?: boolean;
  group?: string;
  description?: string;
  icon?: string;
  data?: any;
}
```

### Features
- **Search Functionality**: Real-time filtering of options
- **Keyboard Navigation**: Arrow keys, Enter, Escape support
- **Custom Rendering**: Flexible option and selection display
- **Loading States**: Async data loading support
- **Error Handling**: Validation and error display
- **Accessibility**: Full ARIA support and screen reader compatibility

### States
- **Closed**: Default state with input field
- **Open**: Dropdown visible with options
- **Loading**: Fetching options state
- **Error**: Invalid state with error styling
- **Disabled**: Non-interactive state

## Component Requirements

### Technical Specifications
- **Framework**: React with TypeScript
- **Base Component**: shadcn/ui Combobox component (`pnpm dlx shadcn@latest add combobox`)
- **Extensions**: Multiple selection, custom rendering, async loading
- **Styling**: shadcn/ui patterns with class-variance-authority
- **Accessibility**: Full ARIA support, keyboard navigation
- **Performance**: Virtualization for large option lists
- **Search**: Efficient filtering and highlighting

### Key Features Required
1. **Search and Filter**: Real-time option filtering
2. **Keyboard Navigation**: Full keyboard accessibility
3. **Custom Rendering**: Flexible option and value display
4. **Async Loading**: Support for remote data fetching
5. **Multiple Selection**: Multi-select functionality
6. **Error Handling**: Validation states and error messages
7. **Accessibility**: Screen reader support and ARIA compliance
8. **Performance**: Optimized for large datasets

### Advanced Features
- **Grouped Options**: Option categorization and headers
- **Virtual Scrolling**: Performance optimization for large lists
- **Debounced Search**: Optimized search performance
- **Custom Icons**: Option and selection icons
- **Tagging**: Free-form text input with suggestions

### Usage Examples
```tsx
// Basic combobox
<DocyCombobox
  value={inputValue}
  onValueChange={setInputValue}
  selected={selectedValue}
  onSelectedChange={setSelectedValue}
  options={[
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' }
  ]}
  placeholder="Select an option..."
/>

// With search functionality
<DocyCombobox
  value={searchTerm}
  onValueChange={setSearchTerm}
  selected={selectedUser}
  onSelectedChange={setSelectedUser}
  options={users.map(user => ({
    value: user.id,
    label: user.name,
    description: user.email
  }))}
  placeholder="Search users..."
  searchable
/>

// Multiple selection
<DocyCombobox
  multiple
  selected={selectedTags}
  onSelectedChange={setSelectedTags}
  options={tagOptions}
  placeholder="Select tags..."
/>

// With custom rendering
<DocyCombobox
  value={searchTerm}
  onValueChange={setSearchTerm}
  selected={selectedUser}
  onSelectedChange={setSelectedUser}
  options={users}
  renderOption={(option) => (
    <div className="flex items-center gap-2">
      <DocyAvatar src={option.data.avatar} size="sm" />
      <div>
        <div className="font-medium">{option.label}</div>
        <div className="text-sm text-gray-500">{option.description}</div>
      </div>
    </div>
  )}
  renderSelected={(option) => (
    <div className="flex items-center gap-2">
      <DocyAvatar src={option.data.avatar} size="xs" />
      <span>{option.label}</span>
    </div>
  )}
/>

// With loading state
<DocyCombobox
  value={searchTerm}
  onValueChange={setSearchTerm}
  selected={selectedValue}
  onSelectedChange={setSelectedValue}
  options={options}
  loading={isLoading}
  placeholder="Search..."
/>

// With error state
<DocyCombobox
  value={searchTerm}
  onValueChange={setSearchTerm}
  selected={selectedValue}
  onSelectedChange={setSelectedValue}
  options={options}
  error="Please select a valid option"
  required
/>

// Grouped options
<DocyCombobox
  value={searchTerm}
  onValueChange={setSearchTerm}
  selected={selectedValue}
  onSelectedChange={setSelectedValue}
  options={[
    { value: 'react', label: 'React', group: 'Frontend' },
    { value: 'vue', label: 'Vue', group: 'Frontend' },
    { value: 'node', label: 'Node.js', group: 'Backend' },
    { value: 'express', label: 'Express', group: 'Backend' }
  ]}
  placeholder="Select technology..."
/>

// Async search
<DocyCombobox
  value={searchTerm}
  onValueChange={setSearchTerm}
  selected={selectedValue}
  onSelectedChange={setSelectedValue}
  options={searchResults}
  onSearch={async (term) => {
    setIsLoading(true);
    const results = await searchAPI(term);
    setSearchResults(results);
    setIsLoading(false);
  }}
  loading={isLoading}
  placeholder="Search remotely..."
/>
```

### Integration Requirements
- **DocyIcon**: Icons for dropdown, clear, and loading states
- **DocySpinner**: Loading indicators
- **DocyAvatar**: User option rendering
- **DocyPopover**: Dropdown positioning and behavior
- **DocyLabel**: Input labeling
- **Search Utilities**: Text matching and highlighting

### Accessibility Requirements
- **ARIA Attributes**: combobox, listbox, option roles
- **Keyboard Navigation**: Arrow keys, Enter, Escape, Tab
- **Screen Reader Support**: Proper announcements and descriptions
- **Focus Management**: Logical focus flow
- **Live Regions**: Dynamic content announcements

### Performance Optimization
- **Virtual Scrolling**: Handle large option lists
- **Debounced Search**: Reduce API calls
- **Memoization**: Optimize option filtering
- **Lazy Loading**: Load options on demand

### Testing Requirements
1. **Unit Tests**: Filtering, selection, keyboard navigation
2. **Integration Tests**: Async loading, custom rendering
3. **Accessibility Tests**: ARIA attributes, keyboard interaction
4. **Visual Tests**: All states and rendering modes
5. **Performance Tests**: Large datasets, search performance
6. **User Tests**: Real-world usage scenarios

## Development Priority
**High** - Essential component for searchable select inputs

## Notes
- Built with modern shadcn/ui patterns for consistency
- Optimized for both simple and complex selection scenarios
- Full accessibility compliance with WCAG guidelines
- TypeScript support with comprehensive type safety
- Supports both local and remote data sources
- Extensible architecture for custom requirements
