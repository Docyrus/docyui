# DocyFieldInlineData Component

## Overview
DocyFieldInlineData is a specialized form field component that extends DocyFieldBase to provide inline data display and editing capabilities. It enables viewing and manipulating structured data arrays within forms, supporting multiple display formats (table, list, cards, JSON), inline editing, sorting, filtering, and real-time data management. This component is designed for scenarios where users need to view and edit related data collections without navigating away from the parent form, such as managing product specifications, contact lists, or configuration settings.

This component provides a custom implementation using shadcn/ui design patterns, offering flexible data visualization with comprehensive interaction capabilities including CRUD operations, search functionality, and seamless integration with the parent form's state management system.

## Component Specification

### Props
DocyFieldInlineData inherits ALL props from DocyFieldBase and adds the following inline-data-specific properties:

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `data` | array | [] | Yes | Array of data objects to display |
| `format` | 'table' \| 'list' \| 'cards' \| 'json' | 'table' | No | Display format for the data |
| `columns` | ColumnDefinition[] | [] | No | Column definitions for table format |
| `showHeader` | boolean | true | No | Whether to show table header |
| `showActions` | boolean | true | No | Whether to show action buttons |
| `actions` | ActionDefinition[] | [] | No | Custom action button definitions |
| `editable` | boolean | false | No | Enable inline editing capabilities |
| `editableFields` | string[] | [] | No | Array of field names that can be edited |
| `sortable` | boolean | true | No | Enable sorting functionality |
| `sortBy` | string | - | No | Default field to sort by |
| `sortOrder` | 'asc' \| 'desc' | 'asc' | No | Default sort order |
| `filterable` | boolean | true | No | Enable filtering functionality |
| `filterBy` | string | - | No | Default field to filter by |
| `searchable` | boolean | true | No | Enable search functionality |
| `searchFields` | string[] | [] | No | Array of field names to search in |
| `paginated` | boolean | false | No | Enable pagination |
| `pageSize` | number | 10 | No | Number of items per page |
| `maxHeight` | string | '400px' | No | Maximum container height |
| `scrollable` | boolean | true | No | Enable scrolling for overflow |
| `onDataChange` | function | - | No | Callback when data array changes |
| `onEdit` | function | - | No | Callback when item is edited |
| `onDelete` | function | - | No | Callback when item is deleted |
| `onAdd` | function | - | No | Callback when item is added |
| `onAction` | function | - | No | Callback for custom actions |
| `onSort` | function | - | No | Callback when sort changes |
| `onFilter` | function | - | No | Callback when filter changes |
| `showAddButton` | boolean | true | No | Whether to show add new item button |
| `addButtonText` | string | 'Add Item' | No | Text for add button |
| `showDeleteButton` | boolean | true | No | Whether to show delete buttons |
| `showEditButton` | boolean | true | No | Whether to show edit buttons |
| `confirmDelete` | boolean | true | No | Show confirmation dialog for delete |
| `deleteMessage` | string | 'Are you sure?' | No | Confirmation message for delete |
| `emptyMessage` | string | 'No data available' | No | Message when data is empty |
| `loadingMessage` | string | 'Loading...' | No | Message while loading |
| `errorMessage` | string | 'Error loading data' | No | Message when error occurs |
| `selectable` | boolean | false | No | Enable row selection |
| `multiSelect` | boolean | false | No | Allow multiple row selection |
| `selectedItems` | any[] | [] | No | Array of selected items |
| `onSelectionChange` | function | - | No | Callback when selection changes |
| `rowHeight` | 'compact' \| 'normal' \| 'comfortable' | 'normal' | No | Row height setting |
| `showRowNumbers` | boolean | false | No | Show row numbers |
| `showBorder` | boolean | true | No | Show table borders |
| `striped` | boolean | false | No | Alternate row colors |
| `hoverHighlight` | boolean | true | No | Highlight rows on hover |
| `exportable` | boolean | false | No | Enable data export |
| `exportFormats` | string[] | ['csv', 'json'] | No | Available export formats |
| `onExport` | function | - | No | Callback for data export |
| `virtualScrolling` | boolean | false | No | Enable virtual scrolling for large datasets |
| `itemHeight` | number | 40 | No | Height of each item for virtual scrolling |
| `groupBy` | string | - | No | Field to group data by |
| `groupCollapsible` | boolean | false | No | Allow collapsing groups |
| `showGroupSummary` | boolean | false | No | Show summary for groups |
| `customRenderer` | function | - | No | Custom renderer for data items |
| `loading` | boolean | false | No | Whether data is loading |
| `error` | string | - | No | Error message to display |
| `refreshable` | boolean | false | No | Enable refresh functionality |
| `onRefresh` | function | - | No | Callback for refresh action |
| `autoRefresh` | boolean | false | No | Enable auto-refresh |
| `refreshInterval` | number | 30000 | No | Auto-refresh interval in ms |

**Note**: DocyFieldInlineData inherits all DocyFieldBase props including validation, layout, dynamic computed properties, actions system, and more. See [DocyFieldBase documentation](./DocyFieldBase.md) for the complete list.

### TypeScript Interfaces

```typescript
interface ColumnDefinition {
  key: string;
  label: string;
  type?: 'text' | 'number' | 'date' | 'boolean' | 'currency' | 'custom';
  width?: number | string;
  minWidth?: number;
  maxWidth?: number;
  sortable?: boolean;
  filterable?: boolean;
  searchable?: boolean;
  editable?: boolean;
  required?: boolean;
  align?: 'left' | 'center' | 'right';
  format?: string;
  render?: (value: any, row: any, index: number) => ReactNode;
  validator?: (value: any) => string | null;
  options?: { label: string; value: any }[];
  placeholder?: string;
  hidden?: boolean;
  resizable?: boolean;
  className?: string;
  headerClassName?: string;
  cellClassName?: string;
}

interface ActionDefinition {
  key: string;
  label: string;
  icon?: string;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean | ((row: any) => boolean);
  hidden?: boolean | ((row: any) => boolean);
  onClick: (row: any, index: number) => void;
  confirmation?: {
    message: string;
    title?: string;
    confirmText?: string;
    cancelText?: string;
  };
  className?: string;
  tooltip?: string;
}

interface DataItem {
  id?: string | number;
  [key: string]: any;
}

interface SortConfig {
  field: string;
  direction: 'asc' | 'desc';
}

interface FilterConfig {
  field: string;
  operator: 'equals' | 'contains' | 'startsWith' | 'endsWith' | 'gt' | 'lt' | 'gte' | 'lte' | 'in' | 'notIn';
  value: any;
}

interface SelectionConfig {
  selectedItems: any[];
  selectAll?: boolean;
  indeterminate?: boolean;
}

interface PaginationConfig {
  page: number;
  pageSize: number;
  total: number;
  showSizeChanger?: boolean;
  pageSizeOptions?: number[];
}

interface InlineDataCallbacks {
  onDataChange?: (data: any[], action: 'add' | 'edit' | 'delete' | 'sort' | 'filter') => void;
  onEdit?: (item: any, index: number, field?: string) => void;
  onDelete?: (item: any, index: number) => void;
  onAdd?: (newItem: any) => void;
  onAction?: (actionKey: string, item: any, index: number) => void;
  onSort?: (sortConfig: SortConfig) => void;
  onFilter?: (filterConfig: FilterConfig[]) => void;
  onSelectionChange?: (selectedItems: any[], allSelected: boolean) => void;
  onExport?: (format: string, data: any[]) => void;
  onRefresh?: () => void;
  customRenderer?: (item: any, index: number, format: string) => ReactNode;
}

interface GroupData {
  key: string;
  label: string;
  items: any[];
  collapsed?: boolean;
  summary?: Record<string, any>;
}
```

### Behavior

1. **Data Display Management**:
   - Multiple display formats (table, list, cards, JSON)
   - Responsive layout adaptation
   - Virtual scrolling for large datasets
   - Grouping and aggregation capabilities

2. **Inline Editing**:
   - Field-level editing permissions
   - Real-time validation during editing
   - Automatic save or manual submission
   - Edit mode state management

3. **Search and Filtering**:
   - Global search across specified fields
   - Column-specific filtering
   - Advanced filter operators
   - Filter persistence and clearing

4. **Sorting and Pagination**:
   - Multi-column sorting capabilities
   - Configurable pagination options
   - Large dataset handling
   - Sort persistence and state management

5. **Selection Management**:
   - Single and multi-selection modes
   - Bulk operations on selected items
   - Selection state persistence
   - Keyboard navigation support

6. **Data Operations**:
   - CRUD operations (Create, Read, Update, Delete)
   - Batch operations for multiple items
   - Data validation and error handling
   - Change tracking and undo functionality

7. **Export and Refresh**:
   - Multiple export formats (CSV, JSON, Excel)
   - Manual and automatic refresh capabilities
   - Real-time data updates
   - Conflict resolution for concurrent edits

## Component Requirements

### Technical Specifications
- **Framework**: React 18+ with TypeScript
- **Base Component**: Custom implementation using shadcn/ui design patterns
- **Installation**: Uses multiple shadcn/ui components: `pnpm dlx shadcn@latest add table button input select checkbox dialog`
- **Wrapper**: Extends DocyFieldBase for consistent field structure
- **Styling**: shadcn/ui patterns with Tailwind CSS v4
- **Form Integration**: React Hook Form with array field support
- **Validation**: Integration with CustomValidation system
- **Actions**: Support for FieldActions system
- **Accessibility**: WCAG 2.1 AA compliance with table navigation

### Key Features Required
1. **Multiple Display Formats**: Table, list, cards, and JSON views
2. **Inline Editing**: Real-time editing with validation
3. **Search and Filter**: Global search and column-specific filtering
4. **Sorting**: Multi-column sorting with persistence
5. **Selection**: Single and multi-selection with bulk operations
6. **Pagination**: Configurable pagination with size options
7. **Export**: Multiple export formats with custom formatting
8. **Virtual Scrolling**: Performance optimization for large datasets
9. **Accessibility**: Complete keyboard navigation and screen reader support

### Usage Examples

```tsx
// Basic table view with simple data
<DocyFieldInlineData
  name="employees"
  label="Employee List"
  data={[
    { id: 1, name: 'John Doe', department: 'Engineering', salary: 75000 },
    { id: 2, name: 'Jane Smith', department: 'Marketing', salary: 65000 },
    { id: 3, name: 'Bob Johnson', department: 'Sales', salary: 70000 }
  ]}
  columns={[
    { key: 'name', label: 'Name', type: 'text', sortable: true },
    { key: 'department', label: 'Department', type: 'text', sortable: true },
    { key: 'salary', label: 'Salary', type: 'currency', sortable: true }
  ]}
  sortable={true}
  filterable={true}
  searchable={true}
  searchFields={['name', 'department']}
  onDataChange={(data, action) => console.log('Data changed:', action, data)}
/>

// Editable table with inline editing
<DocyFieldInlineData
  name="products"
  label="Product Catalog"
  data={productData}
  format="table"
  editable={true}
  editableFields={['name', 'price', 'quantity']}
  columns={[
    { key: 'name', label: 'Product Name', type: 'text', editable: true, required: true },
    { key: 'price', label: 'Price', type: 'currency', editable: true, required: true },
    { key: 'quantity', label: 'Quantity', type: 'number', editable: true },
    { key: 'category', label: 'Category', type: 'text', sortable: true },
    { key: 'lastUpdated', label: 'Last Updated', type: 'date', sortable: true }
  ]}
  showActions={true}
  actions={[
    {
      key: 'duplicate',
      label: 'Duplicate',
      icon: 'copy',
      variant: 'outline',
      onClick: (row) => duplicateProduct(row)
    },
    {
      key: 'archive',
      label: 'Archive',
      icon: 'archive',
      variant: 'secondary',
      onClick: (row) => archiveProduct(row),
      confirmation: {
        message: 'Are you sure you want to archive this product?',
        title: 'Archive Product'
      }
    }
  ]}
  onEdit={(item, index, field) => updateProduct(item.id, { [field]: item[field] })}
  onDelete={(item) => deleteProduct(item.id)}
  onAdd={(newItem) => createProduct(newItem)}
/>

// Card view with selection and bulk operations
<DocyFieldInlineData
  name="contacts"
  label="Contact Directory"
  data={contactData}
  format="cards"
  selectable={true}
  multiSelect={true}
  selectedItems={selectedContacts}
  onSelectionChange={(selected) => setSelectedContacts(selected)}
  customRenderer={(item, index) => (
    <div className="p-4 border rounded-lg">
      <div className="flex items-center space-x-3">
        <img src={item.avatar} alt={item.name} className="w-10 h-10 rounded-full" />
        <div>
          <h3 className="font-semibold">{item.name}</h3>
          <p className="text-sm text-gray-600">{item.email}</p>
          <p className="text-sm text-gray-500">{item.department}</p>
        </div>
      </div>
    </div>
  )}
  searchable={true}
  searchFields={['name', 'email', 'department']}
  actions={[
    {
      key: 'email',
      label: 'Send Email',
      icon: 'mail',
      onClick: (contact) => sendEmail(contact.email)
    },
    {
      key: 'call',
      label: 'Call',
      icon: 'phone',
      onClick: (contact) => makeCall(contact.phone),
      disabled: (contact) => !contact.phone
    }
  ]}
  showAddButton={true}
  onAdd={() => openContactForm()}
/>

// List view with grouping and pagination
<DocyFieldInlineData
  name="orders"
  label="Order History"
  data={orderData}
  format="list"
  groupBy="status"
  groupCollapsible={true}
  showGroupSummary={true}
  paginated={true}
  pageSize={20}
  sortBy="orderDate"
  sortOrder="desc"
  columns={[
    { key: 'orderNumber', label: 'Order #', type: 'text' },
    { key: 'customerName', label: 'Customer', type: 'text' },
    { key: 'orderDate', label: 'Date', type: 'date' },
    { key: 'total', label: 'Total', type: 'currency' },
    { key: 'status', label: 'Status', type: 'text' }
  ]}
  customRenderer={(item, index) => (
    <div className="flex justify-between items-center p-3 border-b">
      <div>
        <div className="font-semibold">Order #{item.orderNumber}</div>
        <div className="text-sm text-gray-600">{item.customerName}</div>
      </div>
      <div className="text-right">
        <div className="font-semibold">{formatCurrency(item.total)}</div>
        <div className={`text-sm ${getStatusColor(item.status)}`}>
          {item.status}
        </div>
      </div>
    </div>
  )}
  actions={[
    {
      key: 'view',
      label: 'View Details',
      icon: 'eye',
      onClick: (order) => viewOrderDetails(order.id)
    },
    {
      key: 'refund',
      label: 'Refund',
      icon: 'refund',
      variant: 'destructive',
      onClick: (order) => processRefund(order.id),
      disabled: (order) => order.status !== 'completed',
      confirmation: {
        message: 'Are you sure you want to process a refund for this order?',
        title: 'Process Refund'
      }
    }
  ]}
  onDataChange={(data, action) => logOrderActivity(action, data)}
/>

// JSON view with syntax highlighting and editing
<DocyFieldInlineData
  name="configuration"
  label="System Configuration"
  data={configData}
  format="json"
  editable={true}
  maxHeight="600px"
  scrollable={true}
  onDataChange={(data) => updateConfiguration(data)}
  showActions={true}
  actions={[
    {
      key: 'validate',
      label: 'Validate',
      icon: 'check',
      variant: 'outline',
      onClick: (config) => validateConfiguration(config)
    },
    {
      key: 'reset',
      label: 'Reset to Default',
      icon: 'refresh',
      variant: 'secondary',
      onClick: () => resetConfiguration(),
      confirmation: {
        message: 'This will reset all configuration to default values. Are you sure?',
        title: 'Reset Configuration'
      }
    }
  ]}
  refreshable={true}
  onRefresh={() => reloadConfiguration()}
/>

// Virtual scrolling for large datasets
<DocyFieldInlineData
  name="largeDataset"
  label="Large Dataset (10,000+ items)"
  data={largeData}
  format="table"
  virtualScrolling={true}
  itemHeight={50}
  maxHeight="400px"
  columns={[
    { key: 'id', label: 'ID', type: 'text', width: 80 },
    { key: 'name', label: 'Name', type: 'text', width: 200 },
    { key: 'value', label: 'Value', type: 'number', width: 120 },
    { key: 'timestamp', label: 'Timestamp', type: 'date', width: 180 }
  ]}
  sortable={true}
  filterable={true}
  searchable={true}
  searchFields={['name']}
  exportable={true}
  exportFormats={['csv', 'json', 'excel']}
  onExport={(format, data) => exportData(format, data)}
/>

// Advanced filtering with computed properties
<DocyFieldInlineData
  name="analytics"
  label="Sales Analytics"
  data={analyticsData}
  format="table"
  columns={[
    { key: 'product', label: 'Product', type: 'text', sortable: true },
    { key: 'sales', label: 'Sales', type: 'number', sortable: true },
    { key: 'revenue', label: 'Revenue', type: 'currency', sortable: true },
    { 
      key: 'avgPrice', 
      label: 'Avg Price', 
      type: 'currency', 
      render: (_, row) => formatCurrency(row.revenue / row.sales)
    },
    {
      key: 'performance',
      label: 'Performance',
      type: 'custom',
      render: (_, row) => (
        <div className="flex items-center space-x-2">
          <div className={`w-2 h-2 rounded-full ${getPerformanceColor(row.performance)}`} />
          <span>{row.performance}%</span>
        </div>
      )
    }
  ]}
  actions={[
    {
      key: 'analyze',
      label: 'Analyze',
      icon: 'chart',
      onClick: (row) => analyzeProduct(row.product)
    }
  ]}
  sortBy="revenue"
  sortOrder="desc"
  filterable={true}
  onFilter={(filters) => applyAnalyticsFilters(filters)}
  exportable={true}
  onExport={(format, data) => exportAnalytics(format, data)}
/>

// Auto-refresh with real-time updates
<DocyFieldInlineData
  name="systemStatus"
  label="System Status Monitor"
  data={systemData}
  format="table"
  autoRefresh={true}
  refreshInterval={5000}
  loading={isLoading}
  error={error}
  columns={[
    { key: 'service', label: 'Service', type: 'text' },
    { 
      key: 'status', 
      label: 'Status', 
      type: 'custom',
      render: (value) => (
        <span className={`px-2 py-1 rounded text-xs ${getStatusStyle(value)}`}>
          {value}
        </span>
      )
    },
    { key: 'uptime', label: 'Uptime', type: 'text' },
    { key: 'lastCheck', label: 'Last Check', type: 'date' }
  ]}
  onRefresh={() => refreshSystemStatus()}
  refreshable={true}
  actions={[
    {
      key: 'restart',
      label: 'Restart',
      icon: 'refresh',
      variant: 'destructive',
      onClick: (service) => restartService(service.id),
      disabled: (service) => service.status === 'restarting',
      confirmation: {
        message: 'Are you sure you want to restart this service?',
        title: 'Restart Service'
      }
    }
  ]}
/>
```

### Integration Requirements
- **DocyFieldBase**: Base wrapper component (required)
- **DocyTable**: Table display component
- **DocyButton**: Action buttons and controls
- **DocyInput**: Search and filter inputs
- **DocySelect**: Filter dropdowns
- **DocyCheckbox**: Selection controls
- **DocyDialog**: Confirmation dialogs
- **DocyPagination**: Pagination controls
- **DocyScrollArea**: Scrollable container
- **DocyToast**: Status notifications
- **FilterQuery**: For computed field properties
- **CustomValidation**: For inline editing validation
- **FieldActions**: For data manipulation actions

### Dependencies Required
- `react-hook-form`: Form state management and validation
- `@hookform/resolvers`: Validation schema resolvers
- `@radix-ui/react-table`: Table functionality
- `@radix-ui/react-dialog`: Confirmation dialogs
- `@radix-ui/react-checkbox`: Selection controls
- `@radix-ui/react-select`: Filter dropdowns
- `@tanstack/react-virtual`: Virtual scrolling
- `fuse.js`: Advanced search functionality
- `papaparse`: CSV export functionality
- `jsonata`: For computed formula evaluation
- `class-variance-authority`: Variant management
- `date-fns`: Date formatting and manipulation
- All DocyFieldBase dependencies

### Testing Requirements
1. **Unit Tests**: Data manipulation, sorting, filtering, search functionality
2. **Integration Tests**: Form integration, validation, action handling
3. **Visual Tests**: All display formats, responsive behavior, theme variations
4. **Accessibility Tests**: Keyboard navigation, screen reader support, table navigation
5. **Performance Tests**: Large dataset handling, virtual scrolling, search performance
6. **Export Tests**: All export formats, data integrity, formatting
7. **Edit Tests**: Inline editing, validation, save/cancel operations
8. **Selection Tests**: Single/multi-selection, bulk operations, keyboard selection

## Development Priority
**Medium** - Specialized component for data-heavy applications with complex interaction requirements

## Notes
- Built with shadcn/ui design patterns for consistency with design system
- Performance optimized for large datasets through virtual scrolling
- Flexible display formats accommodate different data presentation needs
- Comprehensive inline editing capabilities with real-time validation
- Advanced search and filtering provide powerful data discovery
- Full accessibility compliance ensures inclusive user experience
- Extensible architecture allows for custom renderers and actions
- Integration with form state management maintains data consistency
- Export functionality supports multiple formats for data portability
- Real-time updates and refresh capabilities support dynamic data scenarios