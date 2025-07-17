# DocyFieldSelectMulti Component

## Overview
DocyFieldSelectMulti is a comprehensive multi-selection component that extends DocyFieldBase to provide advanced multi-select functionality. Built on top of shadcn/ui Select component, it offers sophisticated multiple selection capabilities with features like tagging, search, remote data loading, virtual scrolling, selection limits, and custom rendering. The component integrates seamlessly with form systems and provides extensive customization options for complex multi-selection scenarios.

This component serves as the foundation for multi-select dropdown interfaces and supports both simple option arrays and complex data-driven selections with remote loading capabilities, making it ideal for user assignments, category selections, skill tagging, and other multi-value scenarios.

## Component Specification

### Props
DocyFieldSelectMulti inherits ALL props from DocyFieldBase and adds the following multi-select-specific properties:

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `options` | SelectOption[] | [] | No | Array of selectable options |
| `value` | string[] \| number[] | [] | No | Array of selected values |
| `maxSelections` | number | - | No | Maximum number of selections allowed |
| `minSelections` | number | - | No | Minimum number of selections required |
| `searchable` | boolean | false | No | Enable search functionality within options |
| `searchPlaceholder` | string | 'Search options...' | No | Placeholder text for search input |
| `creatable` | boolean | false | No | Allow creating new options from search input |
| `createLabel` | string | 'Create "{query}"' | No | Template for create new option label |
| `clearable` | boolean | false | No | Show clear all button to reset selections |
| `showSelectAll` | boolean | false | No | Show select all/none toggle option |
| `selectAllLabel` | string | 'Select All' | No | Label for select all button |
| `showCount` | boolean | false | No | Show selection count display |
| `countFormat` | string | '{count} selected' | No | Format string for count display |
| `tagRender` | (option: SelectOption) => ReactNode | - | No | Custom renderer for selected tags |
| `tagLimit` | number | - | No | Maximum number of tags to display before showing count |
| `tagVariant` | 'default' \| 'secondary' \| 'destructive' \| 'outline' | 'default' | No | Visual variant for tags |
| `tagSize` | 'sm' \| 'md' \| 'lg' | 'sm' | No | Size of selected tags |
| `tagColor` | string | - | No | Custom color for tags (CSS color value) |
| `tagClosable` | boolean | true | No | Allow individual tags to be closed/removed |
| `virtualScroll` | boolean | false | No | Enable virtual scrolling for large option lists |
| `groupBy` | string | - | No | Field name to group options by |
| `sortBy` | string | - | No | Field name to sort options by |
| `filterBy` | string | - | No | Field name to filter options by |
| `remote` | boolean | false | No | Enable remote data loading |
| `onSearch` | (query: string) => Promise<SelectOption[]> | - | No | Search handler for remote data loading |
| `onSelectionChange` | (values: any[], options: SelectOption[]) => void | - | No | Callback when selection changes |
| `onTagClose` | (value: any, option: SelectOption) => void | - | No | Callback when individual tag is closed |
| `onSelectAll` | (selected: boolean) => void | - | No | Callback when select all is toggled |
| `onClearAll` | () => void | - | No | Callback when clear all is clicked |
| `emptyText` | string | 'No options available' | No | Text displayed when no options exist |
| `loadingText` | string | 'Loading options...' | No | Text displayed during remote loading |
| `noResultsText` | string | 'No results found' | No | Text when search returns no results |
| `maxHeight` | number | 300 | No | Maximum height of dropdown content |
| `debounceMs` | number | 300 | No | Debounce delay for search input |
| `minSearchLength` | number | 0 | No | Minimum characters required to trigger search |
| `closeOnSelect` | boolean | false | No | Close dropdown after each selection |
| `clearSearchOnSelect` | boolean | false | No | Clear search input after selection |
| `showOptionIcons` | boolean | true | No | Display icons in options when available |
| `showOptionDescriptions` | boolean | true | No | Display descriptions in options when available |
| `customOptionRenderer` | (option: SelectOption) => ReactNode | - | No | Custom render function for options |
| `hasNextPage` | boolean | false | No | Whether more options can be loaded |
| `onLoadMore` | () => void | - | No | Handler for loading more options |
| `loadingMore` | boolean | false | No | Show loading indicator for infinite scroll |

**Note**: DocyFieldSelectMulti inherits all DocyFieldBase props including validation, layout, dynamic computed properties, AI integration, and more. See [DocyFieldBase documentation](./DocyFieldBase.md) for the complete list.

### TypeScript Interfaces

```typescript
interface SelectOption {
  value: string | number;
  label: string;
  icon?: string;
  description?: string;
  disabled?: boolean;
  group?: string;
  color?: string;
  badge?: string | number;
  data?: Record<string, any>; // Additional data for custom rendering
}

interface SelectMultiProps extends DocyFieldBaseProps {
  options: SelectOption[];
  value?: (string | number)[];
  maxSelections?: number;
  minSelections?: number;
  searchable?: boolean;
  searchPlaceholder?: string;
  creatable?: boolean;
  createLabel?: string;
  clearable?: boolean;
  showSelectAll?: boolean;
  selectAllLabel?: string;
  showCount?: boolean;
  countFormat?: string;
  tagRender?: (option: SelectOption) => ReactNode;
  tagLimit?: number;
  tagVariant?: 'default' | 'secondary' | 'destructive' | 'outline';
  tagSize?: 'sm' | 'md' | 'lg';
  tagColor?: string;
  tagClosable?: boolean;
  virtualScroll?: boolean;
  groupBy?: string;
  sortBy?: string;
  filterBy?: string;
  remote?: boolean;
  onSearch?: (query: string) => Promise<SelectOption[]>;
  onSelectionChange?: (values: any[], options: SelectOption[]) => void;
  onTagClose?: (value: any, option: SelectOption) => void;
  onSelectAll?: (selected: boolean) => void;
  onClearAll?: () => void;
  emptyText?: string;
  loadingText?: string;
  noResultsText?: string;
  maxHeight?: number;
  debounceMs?: number;
  minSearchLength?: number;
  closeOnSelect?: boolean;
  clearSearchOnSelect?: boolean;
  showOptionIcons?: boolean;
  showOptionDescriptions?: boolean;
  customOptionRenderer?: (option: SelectOption) => ReactNode;
  hasNextPage?: boolean;
  onLoadMore?: () => void;
  loadingMore?: boolean;
}

interface SelectMultiState {
  selectedValues: (string | number)[];
  selectedOptions: SelectOption[];
  isAllSelected: boolean;
  searchQuery: string;
  isSearching: boolean;
  filteredOptions: SelectOption[];
  groupedOptions: Record<string, SelectOption[]>;
}

interface TagConfig {
  variant: 'default' | 'secondary' | 'destructive' | 'outline';
  size: 'sm' | 'md' | 'lg';
  color?: string;
  closable: boolean;
  limit?: number;
  render?: (option: SelectOption) => ReactNode;
}

interface SelectMultiSearchConfig {
  enabled: boolean;
  placeholder: string;
  debounceMs: number;
  minSearchLength: number;
  remote: boolean;
  onSearch?: (query: string) => Promise<SelectOption[]>;
  clearOnSelect: boolean;
}

interface SelectMultiCreateConfig {
  enabled: boolean;
  label: string;
  onCreate: (inputValue: string) => Promise<SelectOption>;
  validateCreate?: (inputValue: string) => boolean;
}

interface SelectMultiVirtualConfig {
  enabled: boolean;
  optionHeight: number;
  maxHeight: number;
  overscan?: number;
}
```

### Behavior

1. **Multi-Selection Management**:
   - Array-based value handling with proper React Hook Form integration
   - Individual tag removal and bulk selection operations
   - Selection limits enforcement with visual feedback
   - Real-time validation and error handling

2. **Tag Display System**:
   - Visual tags for selected options with customizable styling
   - Tag limit with overflow handling (show count beyond limit)
   - Individual tag removal with confirmation callbacks
   - Custom tag rendering for complex display scenarios

3. **Search and Filter**:
   - Real-time search with debouncing for performance
   - Client-side filtering with multiple search fields
   - Remote search capabilities with pagination support
   - Search result highlighting and no-results states

4. **Selection Controls**:
   - Select all/none functionality with indeterminate state
   - Clear all selected options with confirmation
   - Bulk selection operations with callbacks
   - Selection change event handling

5. **Remote Data Loading**:
   - Asynchronous option loading with search queries
   - Infinite scroll support for paginated results
   - Loading states and error handling
   - Caching mechanisms for performance optimization

6. **Advanced Features**:
   - Virtual scrolling for large option lists
   - Option grouping with custom headers
   - Creatable options with validation
   - Custom option and tag rendering

## Component Requirements

### Technical Specifications
- **Framework**: React 18+ with TypeScript
- **Base Component**: shadcn/ui Select component (`pnpm dlx shadcn@latest add select`)
- **Extensions**: Docy-specific multi-selection features including tagging, search, remote loading, virtual scrolling, and advanced customization built on top of shadcn base
- **Wrapper**: Extends DocyFieldBase for consistent field structure
- **Styling**: shadcn/ui Select component with Tailwind CSS v4
- **Tagging**: Custom tag components with shadcn/ui Badge integration
- **Virtualization**: Integration with react-window for large option lists
- **Search**: Debounced search with fuse.js for client-side filtering
- **Accessibility**: WCAG 2.1 AA compliance with full keyboard navigation

### Key Features Required
1. **Multi-Selection Interface**: Tag-based selection display with individual removal
2. **Search Integration**: Real-time filtering with debouncing and remote search
3. **Selection Limits**: Min/max selection constraints with validation
4. **Tag Management**: Customizable tag display with overflow handling
5. **Remote Data Loading**: Asynchronous data fetching with pagination support
6. **Virtual Scrolling**: Performance optimization for large datasets
7. **Bulk Operations**: Select all/none and clear all functionality
8. **Custom Rendering**: Flexible option and tag display customization
9. **Accessibility**: Complete keyboard navigation and screen reader support

### Usage Examples

```tsx
// Basic multi-select with tags
<DocyFieldSelectMulti
  name="skills"
  label="Skills"
  options={[
    { value: 'js', label: 'JavaScript', icon: 'code' },
    { value: 'ts', label: 'TypeScript', icon: 'code' },
    { value: 'react', label: 'React', icon: 'react' },
    { value: 'vue', label: 'Vue.js', icon: 'vue' },
    { value: 'node', label: 'Node.js', icon: 'nodejs' }
  ]}
  placeholder="Select your skills"
  tagVariant="secondary"
  tagSize="sm"
  required={true}
/>

// Multi-select with search and limits
<DocyFieldSelectMulti
  name="teamMembers"
  label="Team Members"
  searchable={true}
  searchPlaceholder="Search team members..."
  maxSelections={5}
  minSelections={2}
  clearable={true}
  showSelectAll={true}
  showCount={true}
  countFormat="{count} of {max} selected"
  options={teamMemberOptions}
  validations={[
    { type: 'required', message: 'Please select at least 2 team members' }
  ]}
  customValidations={[
    {
      formula: '$count(teamMembers) >= 2 and $count(teamMembers) <= 5',
      message: 'Please select between 2 and 5 team members'
    }
  ]}
/>

// Remote data loading with infinite scroll
<DocyFieldSelectMulti
  name="assignedUsers"
  label="Assigned Users"
  remote={true}
  searchable={true}
  virtualScroll={true}
  maxHeight={400}
  onSearch={async (query) => {
    const response = await fetch(`/api/users?search=${query}&limit=20`);
    return response.json();
  }}
  hasNextPage={hasMoreUsers}
  onLoadMore={loadMoreUsers}
  loadingText="Searching users..."
  noResultsText="No users found"
  minSearchLength={2}
  debounceMs={500}
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
/>

// Tag customization with limits
<DocyFieldSelectMulti
  name="categories"
  label="Categories"
  options={categoryOptions}
  tagLimit={3}
  tagVariant="outline"
  tagSize="md"
  tagColor="#3B82F6"
  tagRender={(option) => (
    <div className="flex items-center gap-1">
      <DocyIcon name={option.icon} size="xs" />
      <span>{option.label}</span>
      {option.badge && (
        <DocyBadge size="xs" variant="secondary">
          {option.badge}
        </DocyBadge>
      )}
    </div>
  )}
  onTagClose={(value, option) => {
    console.log('Tag closed:', value, option);
  }}
/>

// Creatable options with validation
<DocyFieldSelectMulti
  name="tags"
  label="Tags"
  searchable={true}
  creatable={true}
  createLabel="Create tag '{query}'"
  onCreate={async (inputValue) => {
    // Validate new tag
    if (inputValue.length < 3) {
      throw new Error('Tag must be at least 3 characters');
    }
    if (existingTags.some(tag => tag.label.toLowerCase() === inputValue.toLowerCase())) {
      throw new Error('Tag already exists');
    }
    
    // Create new tag
    const newTag = await createTag(inputValue);
    return { value: newTag.id, label: newTag.name };
  }}
  options={existingTags}
  maxSelections={10}
  tagVariant="default"
  tagClosable={true}
/>

// Grouped options with custom rendering
<DocyFieldSelectMulti
  name="products"
  label="Products"
  groupBy="category"
  sortBy="label"
  searchable={true}
  options={[
    { value: 'laptop1', label: 'MacBook Pro', group: 'Laptops', description: '13-inch, M2 chip', icon: 'laptop' },
    { value: 'laptop2', label: 'Dell XPS', group: 'Laptops', description: '15-inch, Intel i7', icon: 'laptop' },
    { value: 'phone1', label: 'iPhone 14', group: 'Phones', description: '128GB, Blue', icon: 'phone' },
    { value: 'phone2', label: 'Samsung Galaxy', group: 'Phones', description: '256GB, Black', icon: 'phone' }
  ]}
  showOptionDescriptions={true}
  tagRender={(option) => (
    <div className="flex items-center gap-2">
      <DocyIcon name={option.icon} size="xs" />
      <span>{option.label}</span>
    </div>
  )}
/>

// Advanced form integration with actions
<DocyFieldSelectMulti
  name="departments"
  label="Departments"
  options={departmentOptions}
  maxSelections={3}
  showSelectAll={true}
  clearable={true}
  validations={[
    { type: 'required', message: 'At least one department is required' }
  ]}
  computedRequired={{
    field: 'employeeType',
    operator: 'equals',
    value: 'manager'
  }}
  actions={{
    change: [
      ['setFieldValue', { field: 'managerId', value: null }],
      ['condition', '$count(departments) > 0', [
        ['setFieldOption', { 
          field: 'managerId', 
          option: 'hidden', 
          value: false 
        }],
        ['setFieldOptionCalculated', { 
          field: 'managerId', 
          option: 'options', 
          formula: '$distinct(departments.managers)' 
        }]
      ]]
    ]
  }}
  onSelectionChange={(values, options) => {
    console.log('Selection changed:', values, options);
  }}
/>

// Complex enterprise scenario with all features
<DocyFieldSelectMulti
  name="projectAssignments"
  label="Project Assignments"
  searchable={true}
  searchPlaceholder="Search projects..."
  remote={true}
  virtualScroll={true}
  creatable={true}
  maxSelections={10}
  minSelections={1}
  showSelectAll={true}
  showCount={true}
  clearable={true}
  tagLimit={5}
  tagVariant="outline"
  tagSize="md"
  tagClosable={true}
  maxHeight={400}
  debounceMs={400}
  minSearchLength={2}
  onSearch={searchProjects}
  onCreate={createProject}
  hasNextPage={hasMoreProjects}
  onLoadMore={loadMoreProjects}
  customOptionRenderer={(option) => (
    <div className="flex items-center justify-between p-3">
      <div className="flex items-center gap-3">
        <DocyProjectIcon project={option.data} size="sm" />
        <div>
          <div className="font-medium">{option.label}</div>
          <div className="text-sm text-gray-500">{option.description}</div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <DocyBadge variant="secondary" size="sm">
          {option.data.status}
        </DocyBadge>
        <DocyProgressBar value={option.data.progress} size="sm" />
      </div>
    </div>
  )}
  tagRender={(option) => (
    <div className="flex items-center gap-2">
      <DocyProjectIcon project={option.data} size="xs" />
      <span>{option.label}</span>
      <DocyBadge variant="secondary" size="xs">
        {option.data.progress}%
      </DocyBadge>
    </div>
  )}
  validations={[
    { type: 'required', message: 'At least one project assignment is required' }
  ]}
  customValidations={[
    {
      formula: '$count(projectAssignments) <= userMaxProjects',
      message: 'You have exceeded your maximum project limit'
    },
    {
      formula: '$all(projectAssignments, function($v) { $v.status != "archived" })',
      message: 'Cannot assign to archived projects'
    }
  ]}
  onSelectionChange={(values, options) => {
    // Update project capacity calculations
    updateProjectCapacity(values, options);
  }}
  onTagClose={(value, option) => {
    // Log assignment removal
    logProjectUnassignment(value, option);
  }}
  onSelectAll={(selected) => {
    // Analytics tracking
    trackSelectAllUsage(selected);
  }}
  onClearAll={() => {
    // Confirmation dialog
    showClearConfirmation();
  }}
/>
```

### Integration Requirements
- **DocyFieldBase**: Base wrapper component (required)
- **DocyIcon**: For option icons and UI elements
- **DocyBadge**: For tags and option badges
- **DocyButton**: For clear all and select all actions
- **DocySpinner**: For loading states
- **DocyUserAvatar**: For user option display
- **DocyProgressBar**: For option progress display
- **DocyTooltip**: For tag overflow and help text
- **Virtual scrolling library**: react-window for large option lists
- **Search library**: fuse.js for client-side fuzzy search

### Dependencies Required
- `react-hook-form`: Form state management (inherited from DocyFieldBase)
- `@radix-ui/react-select`: Base select component (via shadcn/ui)
- `react-window`: Virtual scrolling for large lists
- `fuse.js`: Fuzzy search functionality
- `use-debounce`: Search input debouncing
- `class-variance-authority`: Variant management
- `@radix-ui/react-tooltip`: Tag overflow tooltips
- All DocyFieldBase dependencies

### Testing Requirements
1. **Unit Tests**: Multi-selection logic, tag management, search functionality, selection limits
2. **Integration Tests**: React Hook Form integration, validation, actions system, remote loading
3. **Visual Tests**: All tag variants, option rendering, responsive behavior, overflow handling
4. **Accessibility Tests**: Keyboard navigation, screen reader support, ARIA attributes, focus management
5. **Performance Tests**: Virtual scrolling, large datasets, search performance, remote loading
6. **Remote Tests**: API integration, error handling, loading states, pagination, infinite scroll
7. **Selection Tests**: Min/max limits, bulk operations, individual tag removal, validation
8. **Creation Tests**: New option creation, validation, duplication handling, integration

## Development Priority
**High** - Essential form component for multi-selection scenarios across the platform

## Notes
- Built on shadcn/ui Select component for consistent design system integration
- Extends DocyFieldBase for seamless form integration and advanced features
- Tag-based interface provides intuitive multi-selection user experience
- Virtual scrolling enables handling of large datasets without performance degradation
- Remote loading capabilities support dynamic data scenarios with pagination
- Comprehensive validation system supports complex business logic requirements
- Flexible customization options accommodate various UI and UX requirements
- Complete accessibility compliance ensures inclusive user experience
- Optimized for performance with debouncing, caching, and efficient rendering
- Extensible architecture allows for future enhancements and custom features
- Integration with existing form systems and validation frameworks
- Support for both simple multi-selection and complex enterprise scenarios