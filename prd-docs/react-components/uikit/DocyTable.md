# DocyTable Component

## Overview
DocyTable is a comprehensive data table component built on shadcn/ui patterns that provides sorting, filtering, pagination, and selection capabilities. It supports responsive design, custom cell rendering, and accessibility features. It serves as the primary data display component throughout the Docyrus React application.

## Component Specification

### Props
| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-----------|
| `data` | array | [] | Yes | Table data array |
| `columns` | array | [] | Yes | Column definitions |
| `loading` | boolean | false | No | Show loading state |
| `error` | string | - | No | Error message to display |
| `sortable` | boolean | true | No | Enable column sorting |
| `filterable` | boolean | true | No | Enable column filtering |
| `selectable` | boolean | false | No | Enable row selection |
| `pagination` | boolean | true | No | Enable pagination |
| `pageSize` | number | 10 | No | Items per page |
| `currentPage` | number | 1 | No | Current page number |
| `onPageChange` | function | - | No | Page change callback |
| `onSort` | function | - | No | Sort change callback |
| `onFilter` | function | - | No | Filter change callback |
| `onSelect` | function | - | No | Selection change callback |
| `selectedRows` | array | [] | No | Selected row IDs |
| `variant` | string | 'default' | No | Table variant: 'default', 'striped', 'bordered' |
| `size` | string | 'default' | No | Table size: 'sm', 'default', 'lg' |
| `className` | string | - | No | Additional CSS classes |
| `emptyMessage` | string | 'No data available' | No | Empty state message |

### Column Definition
```typescript
interface TableColumn {
  id: string;
  header: string;
  accessor: string | ((row: any) => any);
  sortable?: boolean;
  filterable?: boolean;
  width?: string;
  minWidth?: string;
  maxWidth?: string;
  align?: 'left' | 'center' | 'right';
  render?: (value: any, row: any) => ReactNode;
  filter?: {
    type: 'text' | 'select' | 'date' | 'number';
    options?: Array<{ label: string; value: any }>;
  };
}
```

### Size System
```typescript
const tableVariants = cva({
  variants: {
    size: {
      sm: "text-sm [&_td]:py-2 [&_th]:py-2",
      default: "text-sm [&_td]:py-3 [&_th]:py-3",
      lg: "text-base [&_td]:py-4 [&_th]:py-4"
    },
    variant: {
      default: "border-collapse border-spacing-0",
      striped: "[&_tbody_tr:nth-child(even)]:bg-muted/50",
      bordered: "border [&_td]:border [&_th]:border"
    }
  }
})
```

### Features
- **Sorting**: Click column headers to sort data
- **Filtering**: Column-specific filters
- **Selection**: Single or multiple row selection
- **Pagination**: Built-in pagination controls
- **Responsive**: Mobile-friendly layout
- **Custom Rendering**: Flexible cell content
- **Loading States**: Skeleton loading indicators
- **Empty States**: Customizable empty data display

## Component Requirements

### Technical Specifications
- **Framework**: React with TypeScript
- **Base Component**: shadcn/ui Table component (`pnpm dlx shadcn@latest add table`)
- **Extensions**: Sorting, filtering, pagination, selection
- **Styling**: shadcn/ui patterns with class-variance-authority
- **Accessibility**: Full ARIA support, keyboard navigation
- **Performance**: Virtualization for large datasets
- **Responsive**: Mobile-friendly responsive design

### Key Features Required
1. **Data Display**: Structured tabular data presentation
2. **Sorting**: Column-based data sorting
3. **Filtering**: Column-specific filtering options
4. **Selection**: Row selection with checkboxes
5. **Pagination**: Built-in pagination controls
6. **Custom Rendering**: Flexible cell content rendering
7. **Loading States**: Skeleton loading indicators
8. **Responsive Design**: Mobile-friendly layout

### Advanced Features
- **Virtual Scrolling**: Performance for large datasets
- **Drag and Drop**: Row reordering
- **Inline Editing**: Edit cells directly
- **Column Resizing**: Adjustable column widths
- **Export Functionality**: CSV/Excel export
- **Grouping**: Row grouping and aggregation

### Usage Examples
```tsx
// Basic table
<DocyTable
  data={users}
  columns={[
    { id: 'name', header: 'Name', accessor: 'name' },
    { id: 'email', header: 'Email', accessor: 'email' },
    { id: 'role', header: 'Role', accessor: 'role' }
  ]}
/>

// Table with custom rendering
<DocyTable
  data={users}
  columns={[
    {
      id: 'avatar',
      header: 'Avatar',
      accessor: 'avatar',
      render: (value, row) => (
        <DocyAvatar src={value} user={row} size="sm" />
      )
    },
    { id: 'name', header: 'Name', accessor: 'name' },
    {
      id: 'status',
      header: 'Status',
      accessor: 'status',
      render: (value) => (
        <DocyBadge variant={value === 'active' ? 'success' : 'secondary'}>
          {value}
        </DocyBadge>
      )
    },
    {
      id: 'actions',
      header: 'Actions',
      accessor: () => null,
      render: (_, row) => (
        <div className="flex gap-2">
          <DocyButton size="sm" variant="outline">Edit</DocyButton>
          <DocyButton size="sm" variant="destructive">Delete</DocyButton>
        </div>
      )
    }
  ]}
/>

// Sortable and filterable table
<DocyTable
  data={products}
  columns={[
    {
      id: 'name',
      header: 'Product Name',
      accessor: 'name',
      sortable: true,
      filterable: true,
      filter: { type: 'text' }
    },
    {
      id: 'category',
      header: 'Category',
      accessor: 'category',
      sortable: true,
      filterable: true,
      filter: {
        type: 'select',
        options: [
          { label: 'Electronics', value: 'electronics' },
          { label: 'Clothing', value: 'clothing' },
          { label: 'Books', value: 'books' }
        ]
      }
    },
    {
      id: 'price',
      header: 'Price',
      accessor: 'price',
      sortable: true,
      align: 'right',
      render: (value) => `$${value.toFixed(2)}`
    }
  ]}
  onSort={(column, direction) => {
    console.log('Sort:', column, direction);
  }}
  onFilter={(filters) => {
    console.log('Filters:', filters);
  }}
/>

// Selectable table
<DocyTable
  data={items}
  columns={columns}
  selectable={true}
  selectedRows={selectedRows}
  onSelect={(selected) => {
    setSelectedRows(selected);
  }}
/>

// Paginated table
<DocyTable
  data={allData}
  columns={columns}
  pagination={true}
  pageSize={20}
  currentPage={currentPage}
  onPageChange={setCurrentPage}
/>

// Different variants
<DocyTable
  data={data}
  columns={columns}
  variant="striped"
  size="sm"
/>

<DocyTable
  data={data}
  columns={columns}
  variant="bordered"
  size="lg"
/>

// Loading state
<DocyTable
  data={[]}
  columns={columns}
  loading={true}
/>

// Error state
<DocyTable
  data={[]}
  columns={columns}
  error="Failed to load data"
/>

// Empty state
<DocyTable
  data={[]}
  columns={columns}
  emptyMessage="No products found"
/>

// Responsive table
<DocyTable
  data={data}
  columns={columns}
  className="min-w-full"
/>

// Custom column widths
<DocyTable
  data={data}
  columns={[
    { id: 'id', header: 'ID', accessor: 'id', width: '80px' },
    { id: 'name', header: 'Name', accessor: 'name', minWidth: '200px' },
    { id: 'description', header: 'Description', accessor: 'description', maxWidth: '300px' }
  ]}
/>
```

### Integration Requirements
- **DocyButton**: Action buttons in cells
- **DocyBadge**: Status indicators
- **DocyAvatar**: User representation
- **DocyIcon**: Sort indicators and icons
- **DocyInput**: Filter inputs
- **DocySelect**: Filter dropdowns
- **DocyCheckbox**: Row selection
- **DocyPagination**: Pagination controls
- **DocySpinner**: Loading indicators

### Data Processing
```typescript
// Sorting function
const sortData = (data: any[], column: string, direction: 'asc' | 'desc') => {
  return [...data].sort((a, b) => {
    const aValue = a[column];
    const bValue = b[column];
    
    if (direction === 'asc') {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    } else {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
    }
  });
};

// Filtering function
const filterData = (data: any[], filters: Record<string, any>) => {
  return data.filter(row => {
    return Object.entries(filters).every(([column, value]) => {
      if (!value) return true;
      const cellValue = row[column];
      return cellValue.toString().toLowerCase().includes(value.toLowerCase());
    });
  });
};
```

### Accessibility Requirements
- **ARIA Attributes**: table, columnheader, rowheader, grid roles
- **Keyboard Navigation**: Arrow keys, Tab, Enter
- **Screen Reader Support**: Proper table structure
- **Focus Management**: Logical focus flow
- **Sort Indicators**: Clear sort direction indicators

### Performance Optimization
- **Virtual Scrolling**: Handle large datasets
- **Memoization**: Optimize re-renders
- **Debounced Filtering**: Efficient search
- **Lazy Loading**: Load data on demand

### Testing Requirements
1. **Unit Tests**: Sorting, filtering, selection, pagination
2. **Integration Tests**: Data loading, event handling
3. **Accessibility Tests**: ARIA attributes, keyboard navigation
4. **Visual Tests**: All variants and states
5. **Performance Tests**: Large datasets, smooth scrolling
6. **Mobile Tests**: Responsive behavior, touch interactions

## Development Priority
**High** - Essential component for data presentation and management

## Notes
- Built with modern shadcn/ui patterns for consistency
- Optimized for both simple and complex data scenarios
- Full accessibility compliance with WCAG guidelines
- TypeScript support with comprehensive type safety
- Supports various data types and custom rendering
- Integrates seamlessly with data fetching and state management
- Extensible architecture for custom requirements
