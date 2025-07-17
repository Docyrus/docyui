# DocyFieldRelation Component

## Overview
DocyFieldRelation is a comprehensive relationship field component that extends DocyFieldBase to provide advanced relationship selection and management functionality. Built on top of shadcn/ui Select component, it offers sophisticated relationship linking capabilities including record selection, preview, creation, editing, and deletion operations. The component integrates seamlessly with data sources and provides extensive customization options for complex relationship scenarios.

This component serves as the foundation for linking records between entities and supports both simple foreign key relationships and complex multi-entity associations with full CRUD operations.

## Component Specification

### Props
DocyFieldRelation inherits ALL props from DocyFieldBase and adds the following relation-specific properties:

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `entity` | string | - | Yes | Target entity/table name for relationship |
| `valueField` | string | 'id' | No | Field used for storing the relationship value |
| `displayField` | string | 'name' | No | Field used for displaying the relationship |
| `searchFields` | string[] | ['name'] | No | Fields to search across when filtering |
| `multiple` | boolean | false | No | Allow multiple relationship selections |
| `allowCreate` | boolean | false | No | Allow creating new records directly |
| `allowEdit` | boolean | false | No | Allow editing existing records |
| `allowDelete` | boolean | false | No | Allow deleting records |
| `showPreview` | boolean | true | No | Show record preview on hover/click |
| `previewFields` | string[] | - | No | Fields to show in preview popup |
| `filters` | FilterQuery | {} | No | Additional filters for data queries |
| `orderBy` | string | 'name' | No | Default sorting field |
| `limit` | number | 100 | No | Maximum number of records to load |
| `dataSource` | DataSourceConfig | - | No | Data source configuration |
| `endpoint` | string | - | No | API endpoint for data fetching |
| `cacheResults` | boolean | true | No | Cache query results for performance |
| `cacheTimeout` | number | 5 | No | Cache timeout in minutes |
| `onRecordCreate` | (record: any) => Promise<any> | - | No | Callback when creating new records |
| `onRecordEdit` | (record: any) => Promise<any> | - | No | Callback when editing records |
| `onRecordDelete` | (recordId: string) => Promise<void> | - | No | Callback when deleting records |
| `onRecordSelect` | (record: any) => void | - | No | Callback when selecting records |
| `onPreviewOpen` | (record: any) => void | - | No | Callback when preview opens |
| `onCreate` | () => void | - | No | Callback for create button click |
| `onEdit` | (record: any) => void | - | No | Callback for edit button click |
| `onDelete` | (record: any) => void | - | No | Callback for delete button click |
| `createModal` | boolean | true | No | Show create form in modal |
| `editModal` | boolean | true | No | Show edit form in modal |
| `searchable` | boolean | true | No | Enable search functionality |
| `placeholder` | string | 'Select a record...' | No | Placeholder text when no selection |
| `emptyText` | string | 'No records found' | No | Text when no records available |
| `loadingText` | string | 'Loading records...' | No | Text during data loading |
| `createText` | string | 'Create new record' | No | Text for create button |
| `editText` | string | 'Edit record' | No | Text for edit button |
| `deleteText` | string | 'Delete record' | No | Text for delete button |
| `previewText` | string | 'Preview record' | No | Text for preview button |
| `confirmDelete` | boolean | true | No | Show confirmation dialog for delete |
| `deleteConfirmText` | string | 'Are you sure you want to delete this record?' | No | Delete confirmation message |
| `virtualScroll` | boolean | false | No | Enable virtual scrolling for large datasets |
| `optionHeight` | number | 45 | No | Height of each option (for virtual scrolling) |
| `maxHeight` | number | 300 | No | Maximum height of dropdown |
| `debounceMs` | number | 300 | No | Debounce delay for search |
| `minSearchLength` | number | 1 | No | Minimum characters to trigger search |
| `showRecordActions` | boolean | true | No | Show action buttons in options |
| `showRecordIcons` | boolean | true | No | Show record type icons |
| `customOptionRenderer` | (record: any) => ReactNode | - | No | Custom option rendering function |
| `customValueRenderer` | (value: any, record?: any) => ReactNode | - | No | Custom value rendering function |
| `customPreviewRenderer` | (record: any) => ReactNode | - | No | Custom preview content renderer |

**Note**: DocyFieldRelation inherits all DocyFieldBase props including validation, layout, dynamic computed properties, AI integration, and more. See [DocyFieldBase documentation](./DocyFieldBase.md) for the complete list.

### TypeScript Interfaces

```typescript
interface RelationRecord {
  id: string | number;
  [key: string]: any; // Dynamic fields based on entity
}

interface DataSourceConfig {
  type: 'api' | 'static' | 'computed';
  url?: string;
  method?: 'GET' | 'POST';
  headers?: Record<string, string>;
  params?: Record<string, any>;
  data?: RelationRecord[];
  transform?: (data: any) => RelationRecord[];
}

interface RelationPreviewConfig {
  showPreview: boolean;
  previewFields?: string[];
  previewTemplate?: string;
  previewSize?: 'sm' | 'md' | 'lg';
  previewPosition?: 'top' | 'bottom' | 'left' | 'right';
}

interface RelationCRUDConfig {
  allowCreate: boolean;
  allowEdit: boolean;
  allowDelete: boolean;
  createModal: boolean;
  editModal: boolean;
  confirmDelete: boolean;
  createFields?: string[];
  editFields?: string[];
  createValidations?: ValidationRule[];
  editValidations?: ValidationRule[];
}

interface RelationSearchConfig {
  searchable: boolean;
  searchFields: string[];
  debounceMs: number;
  minSearchLength: number;
  caseSensitive?: boolean;
  fuzzySearch?: boolean;
  highlightMatches?: boolean;
}

interface RelationDisplayConfig {
  displayField: string;
  valueField: string;
  showRecordActions: boolean;
  showRecordIcons: boolean;
  customOptionRenderer?: (record: any) => ReactNode;
  customValueRenderer?: (value: any, record?: any) => ReactNode;
  customPreviewRenderer?: (record: any) => ReactNode;
}

interface RelationPaginationConfig {
  limit: number;
  virtualScroll: boolean;
  optionHeight: number;
  maxHeight: number;
  infiniteScroll?: boolean;
  pageSize?: number;
}
```

### Behavior

1. **Relationship Selection**:
   - Single or multiple record selection from target entity
   - Real-time search across configured fields
   - Preview functionality on hover or click
   - Support for complex filtering and sorting

2. **CRUD Operations**:
   - Create new records directly from the field
   - Edit existing records inline or in modal
   - Delete records with confirmation
   - Form validation for create/edit operations

3. **Data Management**:
   - Flexible data source configuration (API, static, computed)
   - Result caching for performance optimization
   - Virtual scrolling for large datasets
   - Infinite scroll for paginated data

4. **User Experience**:
   - Intuitive search and filter interface
   - Rich preview with customizable fields
   - Responsive design with mobile support
   - Keyboard navigation and accessibility

5. **Integration**:
   - Seamless form integration with validation
   - Dynamic field updates based on selections
   - Action system integration for field interactions
   - AI-powered suggestions and automation

6. **Performance**:
   - Debounced search for optimal API usage
   - Result caching with configurable timeout
   - Virtual scrolling for large datasets
   - Lazy loading of related data

## Component Requirements

### Technical Specifications
- **Framework**: React 18+ with TypeScript
- **Base Component**: shadcn/ui Select component (`pnpm dlx shadcn@latest add select`)
- **Extensions**: Docy-specific features including relationship management, CRUD operations, preview functionality, and advanced data handling built on top of shadcn base
- **Wrapper**: Extends DocyFieldBase for consistent field structure
- **Styling**: shadcn/ui Select component with Tailwind CSS v4
- **Data Fetching**: Integration with React Query or SWR for caching
- **Virtualization**: react-window for large datasets
- **Accessibility**: WCAG 2.1 AA compliance with full keyboard navigation

### Key Features Required
1. **Entity Relationship Management**: Link records between different entities with full CRUD support
2. **Advanced Search**: Multi-field search with debouncing and fuzzy matching
3. **Record Preview**: Rich preview functionality with customizable field display
4. **CRUD Operations**: Create, edit, and delete records directly from the field
5. **Data Source Flexibility**: Support for API, static, and computed data sources
6. **Performance Optimization**: Caching, virtual scrolling, and lazy loading
7. **Accessibility**: Complete keyboard navigation and screen reader support

### Usage Examples

```tsx
// Basic relationship selection
<DocyFieldRelation
  name="categoryId"
  label="Category"
  entity="categories"
  displayField="name"
  valueField="id"
  searchFields={['name', 'description']}
  placeholder="Select a category"
  required={true}
/>

// Multiple relationship with search
<DocyFieldRelation
  name="tagIds"
  label="Tags"
  entity="tags"
  multiple={true}
  searchable={true}
  allowCreate={true}
  showPreview={true}
  previewFields={['name', 'description', 'color']}
  filters={{ active: true }}
  orderBy="name"
  limit={50}
/>

// Full CRUD relationship management
<DocyFieldRelation
  name="assignedUserId"
  label="Assigned User"
  entity="users"
  displayField="fullName"
  valueField="id"
  searchFields={['firstName', 'lastName', 'email']}
  allowCreate={true}
  allowEdit={true}
  allowDelete={true}
  createModal={true}
  editModal={true}
  confirmDelete={true}
  showPreview={true}
  previewFields={['fullName', 'email', 'department', 'role']}
  onRecordCreate={async (userData) => {
    const newUser = await createUser(userData);
    return newUser;
  }}
  onRecordEdit={async (userData) => {
    const updatedUser = await updateUser(userData.id, userData);
    return updatedUser;
  }}
  onRecordDelete={async (userId) => {
    await deleteUser(userId);
  }}
/>

// API-driven relationship with caching
<DocyFieldRelation
  name="companyId"
  label="Company"
  entity="companies"
  endpoint="/api/companies"
  dataSource={{
    type: 'api',
    url: '/api/companies',
    method: 'GET',
    headers: { 'Authorization': 'Bearer token' },
    transform: (data) => data.companies
  }}
  cacheResults={true}
  cacheTimeout={10}
  searchable={true}
  virtualScroll={true}
  optionHeight={60}
  maxHeight={400}
  debounceMs={300}
  minSearchLength={2}
/>

// Custom rendering with preview
<DocyFieldRelation
  name="projectId"
  label="Project"
  entity="projects"
  displayField="title"
  searchFields={['title', 'description', 'code']}
  showPreview={true}
  previewFields={['title', 'description', 'status', 'dueDate', 'team']}
  customOptionRenderer={(project) => (
    <div className="flex items-center gap-3 p-2">
      <div className={`w-3 h-3 rounded-full ${getStatusColor(project.status)}`} />
      <div className="flex-1">
        <div className="font-medium">{project.title}</div>
        <div className="text-sm text-gray-500">{project.code}</div>
      </div>
      <div className="text-xs text-gray-400">
        {formatDate(project.dueDate)}
      </div>
    </div>
  )}
  customValueRenderer={(value, project) => (
    <div className="flex items-center gap-2">
      <div className={`w-2 h-2 rounded-full ${getStatusColor(project?.status)}`} />
      <span>{project?.title}</span>
    </div>
  )}
  customPreviewRenderer={(project) => (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <h3 className="font-semibold">{project.title}</h3>
        <DocyChip variant={project.status} size="sm">{project.status}</DocyChip>
      </div>
      <p className="text-sm text-gray-600">{project.description}</p>
      <div className="grid grid-cols-2 gap-2 text-sm">
        <div>
          <span className="font-medium">Due Date:</span>
          <span className="ml-2">{formatDate(project.dueDate)}</span>
        </div>
        <div>
          <span className="font-medium">Team:</span>
          <span className="ml-2">{project.team}</span>
        </div>
      </div>
    </div>
  )}
/>

// Advanced filtering and computed relationships
<DocyFieldRelation
  name="managerId"
  label="Manager"
  entity="users"
  displayField="fullName"
  searchFields={['firstName', 'lastName', 'email']}
  filters={{
    role: 'manager',
    department: { $computed: 'form.department' },
    active: true
  }}
  computedHidden={{
    field: 'employeeType',
    operator: 'equals',
    value: 'contractor'
  }}
  actions={{
    change: [
      ['setFieldValue', { field: 'reportingStructure', value: { $computed: 'selectedRecord.team' } }],
      ['triggerValidation', { field: 'salaryRange' }]
    ]
  }}
  validations={[
    { type: 'required', message: 'Manager is required for employees' },
    { type: 'custom', validator: validateManagerHierarchy, message: 'Invalid manager hierarchy' }
  ]}
/>

// Performance-optimized for large datasets
<DocyFieldRelation
  name="locationId"
  label="Location"
  entity="locations"
  displayField="fullAddress"
  valueField="id"
  searchFields={['name', 'address', 'city', 'state']}
  virtualScroll={true}
  optionHeight={80}
  maxHeight={500}
  limit={1000}
  debounceMs={200}
  minSearchLength={3}
  cacheResults={true}
  cacheTimeout={15}
  endpoint="/api/locations/search"
  dataSource={{
    type: 'api',
    url: '/api/locations/search',
    method: 'POST',
    params: { include: ['coordinates', 'timezone'] },
    transform: (data) => data.locations.map(loc => ({
      id: loc.id,
      fullAddress: `${loc.name}, ${loc.address}, ${loc.city}, ${loc.state}`,
      ...loc
    }))
  }}
  customOptionRenderer={(location) => (
    <div className="flex items-start gap-3 p-3">
      <DocyIcon name="map-pin" className="w-4 h-4 text-gray-400 mt-1" />
      <div className="flex-1">
        <div className="font-medium">{location.name}</div>
        <div className="text-sm text-gray-500">{location.address}</div>
        <div className="text-xs text-gray-400">{location.city}, {location.state}</div>
      </div>
    </div>
  )}
/>

// Complex relationship with nested data
<DocyFieldRelation
  name="customerOrderId"
  label="Customer Order"
  entity="orders"
  displayField="orderNumber"
  searchFields={['orderNumber', 'customerName', 'customerEmail']}
  allowCreate={false}
  allowEdit={true}
  allowDelete={false}
  showPreview={true}
  previewFields={['orderNumber', 'customerName', 'total', 'status', 'items']}
  filters={{
    status: { $in: ['pending', 'processing', 'shipped'] },
    customerId: { $computed: 'form.customerId' }
  }}
  onRecordSelect={(order) => {
    // Auto-populate related fields
    setFieldValue('customerName', order.customerName);
    setFieldValue('customerEmail', order.customerEmail);
    setFieldValue('orderTotal', order.total);
  }}
  onEdit={async (order) => {
    const updatedOrder = await openOrderEditModal(order);
    if (updatedOrder) {
      // Refresh the field options
      refetchOrders();
    }
  }}
  customPreviewRenderer={(order) => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold">Order #{order.orderNumber}</h3>
        <DocyChip variant={order.status}>{order.status}</DocyChip>
      </div>
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div>
          <span className="font-medium">Customer:</span>
          <div className="mt-1">{order.customerName}</div>
          <div className="text-gray-500">{order.customerEmail}</div>
        </div>
        <div>
          <span className="font-medium">Total:</span>
          <div className="mt-1 font-semibold">${order.total}</div>
        </div>
      </div>
      <div>
        <span className="font-medium">Items:</span>
        <div className="mt-1 space-y-1">
          {order.items.map(item => (
            <div key={item.id} className="flex justify-between text-sm">
              <span>{item.name}</span>
              <span>{item.quantity}x ${item.price}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )}
/>
```

### Integration Requirements
- **DocyFieldBase**: Base wrapper component (required)
- **DocyIcon**: For action buttons and record type icons
- **DocyButton**: For CRUD operation buttons
- **DocyModal**: For create/edit forms
- **DocyDialog**: For delete confirmations
- **DocyChip**: For status indicators and tags
- **DocySpinner**: For loading states
- **DocyTooltip**: For preview functionality
- **DocyForm**: For create/edit forms within modals
- **React Query/SWR**: For data fetching and caching
- **Virtual scrolling library**: react-window for large datasets

### Dependencies Required
- `react-hook-form`: Form state management (inherited from DocyFieldBase)
- `@radix-ui/react-select`: Base select component (via shadcn/ui)
- `@tanstack/react-query`: Data fetching and caching
- `react-window`: Virtual scrolling for large datasets
- `fuse.js`: Fuzzy search functionality
- `use-debounce`: Search input debouncing
- `class-variance-authority`: Variant management
- `date-fns`: Date formatting and manipulation
- All DocyFieldBase dependencies

### Testing Requirements
1. **Unit Tests**: Record selection, CRUD operations, search functionality, preview display
2. **Integration Tests**: React Hook Form integration, validation, data source integration
3. **API Tests**: Endpoint integration, caching behavior, error handling
4. **Visual Tests**: All relationship modes, preview functionality, responsive behavior
5. **Accessibility Tests**: Keyboard navigation, screen reader support, ARIA attributes
6. **Performance Tests**: Virtual scrolling, large datasets, search performance, caching efficiency
7. **CRUD Tests**: Create, edit, delete operations, validation, error handling

## Development Priority
**High** - Essential component for entity relationships and complex data linking across the platform

## Notes
- Built on shadcn/ui Select component for consistent design system integration
- Supports both simple foreign key relationships and complex multi-entity associations
- CRUD operations provide complete record management within the field interface
- Preview functionality enhances user experience with rich record details
- Performance optimizations handle large datasets efficiently
- Flexible data source configuration supports various backend architectures
- Complete accessibility compliance ensures inclusive user experience
- Caching mechanisms optimize API usage and response times
- Integration with existing form systems and validation frameworks
- Extensible architecture allows for future enhancements and custom features
- AI integration capabilities for smart suggestions and automation