# DocyFieldSelect Component

## Overview
DocyFieldSelect is a comprehensive selection component that extends DocyFieldBase to provide advanced select functionality. Built on top of shadcn/ui Select component, it offers single and multiple selection modes with features like searchable options, custom option rendering, remote data loading, virtual scrolling, and option grouping. The component integrates seamlessly with form systems and provides extensive customization options for complex selection scenarios.

This component serves as the foundation for dropdown selection interfaces and supports both simple option lists and complex data-driven selections with remote loading capabilities.

## Component Specification

### Props
DocyFieldSelect inherits ALL props from DocyFieldBase and adds the following select-specific properties:

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `options` | SelectOption[] | [] | No | Array of selectable options |
| `multiple` | boolean | false | No | Allow multiple selections |
| `searchable` | boolean | false | No | Enable search functionality within options |
| `allowClear` | boolean | false | No | Show clear button to reset selection |
| `placeholder` | string | 'Select an option...' | No | Placeholder text when no selection |
| `emptyText` | string | 'No options available' | No | Text displayed when no options exist |
| `loadingText` | string | 'Loading options...' | No | Text displayed during remote loading |
| `maxSelections` | number | - | No | Maximum number of selections (multiple mode only) |
| `remote` | boolean | false | No | Enable remote data loading |
| `onSearch` | (query: string) => Promise<SelectOption[]> | - | No | Search handler for remote data loading |
| `showSelectAll` | boolean | false | No | Show "Select All" option in multiple mode |
| `groupBy` | string | - | No | Field name to group options by |
| `virtualScroll` | boolean | false | No | Enable virtual scrolling for large option lists |
| `optionHeight` | number | 35 | No | Height of each option (used with virtual scrolling) |
| `maxHeight` | number | 200 | No | Maximum height of dropdown content |
| `closeOnSelect` | boolean | true | No | Close dropdown after selection (single mode only) |
| `clearSearchOnSelect` | boolean | true | No | Clear search input after selection |
| `showOptionIcons` | boolean | true | No | Display icons in options when available |
| `showOptionDescriptions` | boolean | true | No | Display descriptions in options when available |
| `customOptionRenderer` | (option: SelectOption) => ReactNode | - | No | Custom render function for options |
| `customValueRenderer` | (value: any, option?: SelectOption) => ReactNode | - | No | Custom render function for selected values |
| `debounceMs` | number | 300 | No | Debounce delay for search input |
| `minSearchLength` | number | 0 | No | Minimum characters required to trigger search |
| `creatable` | boolean | false | No | Allow creating new options |
| `onCreate` | (inputValue: string) => Promise<SelectOption> | - | No | Handler for creating new options |
| `createText` | string | 'Create "{query}"' | No | Template for create option text |
| `noResultsText` | string | 'No results found' | No | Text when search returns no results |
| `loadingMore` | boolean | false | No | Show loading indicator for infinite scroll |
| `hasNextPage` | boolean | false | No | Whether more options can be loaded |
| `onLoadMore` | () => void | - | No | Handler for loading more options |

**Note**: DocyFieldSelect inherits all DocyFieldBase props including validation, layout, dynamic computed properties, AI integration, and more. See [DocyFieldBase documentation](./DocyFieldBase.md) for the complete list.

### TypeScript Interfaces

```typescript
interface SelectOption {
  value: string | number;
  label: string;
  icon?: string;
  description?: string;
  disabled?: boolean;
  group?: string;
  data?: Record<string, any>; // Additional data for custom rendering
}

interface SelectGroup {
  label: string;
  options: SelectOption[];
}

interface SelectSearchConfig {
  debounceMs?: number;
  minSearchLength?: number;
  searchFields?: string[]; // Fields to search in ('label', 'value', 'description')
  caseSensitive?: boolean;
}

interface SelectCreateConfig {
  creatable: boolean;
  onCreate: (inputValue: string) => Promise<SelectOption>;
  createText?: string;
  validateCreate?: (inputValue: string) => boolean;
}

interface SelectVirtualConfig {
  virtualScroll: boolean;
  optionHeight: number;
  maxHeight: number;
  overscan?: number; // Number of extra items to render
}

interface SelectRemoteConfig {
  remote: boolean;
  onSearch: (query: string, page?: number) => Promise<SelectOption[]>;
  hasNextPage?: boolean;
  onLoadMore?: () => void;
  loadingMore?: boolean;
  pageSize?: number;
}
```

### Behavior

1. **Selection Modes**:
   - Single selection: Standard dropdown behavior with one selected value
   - Multiple selection: Checkbox-style multi-selection with chips display
   - Clear functionality: Optional clear button to reset selections

2. **Search Functionality**:
   - Real-time search filtering with debouncing
   - Configurable search fields and minimum length
   - Case-sensitive/insensitive search options
   - Custom search logic for complex filtering

3. **Remote Data Loading**:
   - Asynchronous option loading with search queries
   - Infinite scroll support for paginated results
   - Loading states and error handling
   - Caching mechanisms for performance

4. **Option Grouping**:
   - Automatic grouping by specified field
   - Custom group headers and styling
   - Collapsible groups with expand/collapse controls

5. **Virtual Scrolling**:
   - Performance optimization for large option lists
   - Configurable item height and overscan
   - Memory-efficient rendering

6. **Advanced Features**:
   - Custom option and value rendering
   - Creatable options with validation
   - Select all/none functionality
   - Keyboard navigation and accessibility

## Component Requirements

### Technical Specifications
- **Framework**: React 18+ with TypeScript
- **Base Component**: shadcn/ui Select component (`pnpm dlx shadcn@latest add select`)
- **Extensions**: Docy-specific features including multiple selection, search, remote loading, virtual scrolling, and advanced customization built on top of shadcn base
- **Wrapper**: Extends DocyFieldBase for consistent field structure
- **Styling**: shadcn/ui Select component with Tailwind CSS v4
- **Virtualization**: Integration with react-window or react-virtualized for large lists
- **Search**: Fuzzy search with fuse.js or similar libraries
- **Accessibility**: WCAG 2.1 AA compliance with full keyboard navigation

### Key Features Required
1. **Multiple Selection**: Checkbox-style multi-selection with visual chips
2. **Search Integration**: Real-time filtering with debouncing and remote search
3. **Remote Data Loading**: Asynchronous data fetching with pagination support
4. **Virtual Scrolling**: Performance optimization for large datasets
5. **Option Grouping**: Automatic grouping with custom headers
6. **Custom Rendering**: Flexible option and value display customization
7. **Accessibility**: Complete keyboard navigation and screen reader support

### Usage Examples

```tsx
// Basic single selection
<DocyFieldSelect
  name="country"
  label="Country"
  options={[
    { value: 'us', label: 'United States', icon: 'flag-us' },
    { value: 'ca', label: 'Canada', icon: 'flag-ca' },
    { value: 'uk', label: 'United Kingdom', icon: 'flag-gb' }
  ]}
  placeholder="Select a country"
  required={true}
/>

// Multiple selection with search
<DocyFieldSelect
  name="skills"
  label="Skills"
  multiple={true}
  searchable={true}
  allowClear={true}
  showSelectAll={true}
  maxSelections={5}
  options={[
    { value: 'js', label: 'JavaScript', icon: 'code' },
    { value: 'ts', label: 'TypeScript', icon: 'code' },
    { value: 'react', label: 'React', icon: 'react' },
    { value: 'vue', label: 'Vue.js', icon: 'vue' },
    { value: 'node', label: 'Node.js', icon: 'nodejs' }
  ]}
  placeholder="Select your skills"
  emptyText="No skills available"
/>

// Remote data loading with search
<DocyFieldSelect
  name="users"
  label="Assign To"
  remote={true}
  searchable={true}
  multiple={true}
  onSearch={async (query) => {
    const response = await fetch(`/api/users?search=${query}`);
    return response.json();
  }}
  hasNextPage={true}
  onLoadMore={loadMoreUsers}
  loadingText="Searching users..."
  noResultsText="No users found"
  minSearchLength={2}
  debounceMs={500}
/>

// Grouped options with custom rendering
<DocyFieldSelect
  name="product"
  label="Product"
  groupBy="category"
  options={[
    { value: 'laptop1', label: 'MacBook Pro', group: 'Laptops', description: '13-inch, M2 chip' },
    { value: 'laptop2', label: 'Dell XPS', group: 'Laptops', description: '15-inch, Intel i7' },
    { value: 'phone1', label: 'iPhone 14', group: 'Phones', description: '128GB, Blue' },
    { value: 'phone2', label: 'Samsung Galaxy', group: 'Phones', description: '256GB, Black' }
  ]}
  customOptionRenderer={(option) => (
    <div className="flex flex-col">
      <span className="font-medium">{option.label}</span>
      <span className="text-sm text-gray-500">{option.description}</span>
    </div>
  )}
  showOptionDescriptions={true}
/>

// Virtual scrolling for large datasets
<DocyFieldSelect
  name="city"
  label="City"
  virtualScroll={true}
  optionHeight={40}
  maxHeight={300}
  searchable={true}
  options={largeCityList} // Assuming thousands of cities
  placeholder="Search and select city"
/>

// Creatable options with validation
<DocyFieldSelect
  name="tags"
  label="Tags"
  multiple={true}
  creatable={true}
  onCreate={async (inputValue) => {
    // Validate and create new tag
    if (inputValue.length < 3) {
      throw new Error('Tag must be at least 3 characters');
    }
    const newTag = await createTag(inputValue);
    return { value: newTag.id, label: newTag.name };
  }}
  createText="Create tag '{query}'"
  options={existingTags}
  maxSelections={10}
/>

// Complex form integration with validation
<DocyFieldSelect
  name="department"
  label="Department"
  options={departmentOptions}
  validations={[
    { type: 'required', message: 'Department is required' }
  ]}
  computedRequired={{
    field: 'employeeType',
    operator: 'equals',
    value: 'fulltime'
  }}
  actions={{
    change: [
      ['setFieldValue', { field: 'managerId', value: null }],
      ['setFieldOptionCalculated', { 
        field: 'managerId', 
        option: 'options', 
        formula: 'departments[name=$].managers' 
      }]
    ]
  }}
/>

// Advanced customization with all features
<DocyFieldSelect
  name="assignedUsers"
  label="Assigned Users"
  multiple={true}
  searchable={true}
  remote={true}
  virtualScroll={true}
  allowClear={true}
  showSelectAll={true}
  maxSelections={20}
  optionHeight={60}
  maxHeight={400}
  debounceMs={300}
  minSearchLength={1}
  onSearch={searchUsers}
  hasNextPage={hasMoreUsers}
  onLoadMore={loadMoreUsers}
  customOptionRenderer={(option) => (
    <div className="flex items-center gap-3 p-2">
      <DocyUserAvatar user={option.data} size="sm" />
      <div className="flex-1">
        <div className="font-medium">{option.label}</div>
        <div className="text-sm text-gray-500">{option.data.email}</div>
      </div>
      {option.data.online && (
        <div className="w-2 h-2 bg-green-500 rounded-full" />
      )}
    </div>
  )}
  customValueRenderer={(value, option) => (
    <div className="flex items-center gap-2">
      <DocyUserAvatar user={option?.data} size="xs" />
      <span>{option?.label}</span>
    </div>
  )}
  validations={[
    { type: 'required', message: 'At least one user must be assigned' },
    { type: 'custom', validator: validateUserPermissions, message: 'Some users do not have required permissions' }
  ]}
/>
```

### Integration Requirements
- **DocyFieldBase**: Base wrapper component (required)
- **DocyIcon**: For option icons and UI elements
- **DocyUserAvatar**: For user option display
- **DocyChip**: For multiple selection display
- **DocySpinner**: For loading states
- **DocyButton**: For clear and select all actions
- **Virtual scrolling library**: react-window or react-virtualized
- **Search library**: fuse.js or similar for fuzzy search

### Dependencies Required
- `react-hook-form`: Form state management (inherited from DocyFieldBase)
- `@radix-ui/react-select`: Base select component (via shadcn/ui)
- `react-window`: Virtual scrolling for large lists
- `fuse.js`: Fuzzy search functionality
- `use-debounce`: Search input debouncing
- `class-variance-authority`: Variant management
- All DocyFieldBase dependencies

### Testing Requirements
1. **Unit Tests**: Option rendering, search functionality, multiple selection, remote loading
2. **Integration Tests**: React Hook Form integration, validation, actions system
3. **Visual Tests**: All selection modes, option groups, custom rendering, responsive behavior
4. **Accessibility Tests**: Keyboard navigation, screen reader support, ARIA attributes
5. **Performance Tests**: Virtual scrolling, large datasets, search performance
6. **Remote Tests**: API integration, error handling, loading states, pagination

## Development Priority
**High** - Essential form component for dropdown selections across the platform

## Notes
- Built on shadcn/ui Select component for consistent design system integration
- Supports both simple option arrays and complex remote data scenarios
- Virtual scrolling enables handling of large datasets without performance issues
- Flexible customization options accommodate various UI requirements
- Complete accessibility compliance ensures inclusive user experience
- Remote loading capabilities support dynamic data scenarios
- Integration with existing form systems and validation frameworks
- Optimized for performance with debouncing and caching mechanisms
- Extensible architecture allows for future enhancements and custom features