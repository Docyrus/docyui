# DocyPagination Component

## Overview
DocyPagination is a page navigation component built on shadcn/ui patterns that provides navigation controls for paginated content. It supports various layouts, page size options, and accessibility features. It serves as the primary pagination interface throughout the Docyrus React application.

## Component Specification

### Props
| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-----------|
| `total` | number | 0 | Yes | Total number of items |
| `page` | number | 1 | No | Current page number |
| `pageSize` | number | 10 | No | Items per page |
| `onPageChange` | function | - | No | Callback when page changes |
| `onPageSizeChange` | function | - | No | Callback when page size changes |
| `showSizeChanger` | boolean | true | No | Show page size selector |
| `pageSizeOptions` | array | [10, 20, 50, 100] | No | Available page sizes |
| `showQuickJumper` | boolean | false | No | Show quick page jumper |
| `showTotal` | boolean | true | No | Show total items count |
| `totalText` | string | 'Total {total} items' | No | Total items text template |
| `size` | string | 'default' | No | Component size: 'sm', 'default', 'lg' |
| `variant` | string | 'default' | No | Style variant: 'default', 'outline', 'ghost' |
| `disabled` | boolean | false | No | Disable all interactions |
| `className` | string | - | No | Additional CSS classes |
| `hideOnSinglePage` | boolean | false | No | Hide when only one page |
| `showPrevNext` | boolean | true | No | Show previous/next buttons |
| `showFirstLast` | boolean | true | No | Show first/last buttons |
| `siblingCount` | number | 1 | No | Number of siblings to show |
| `boundaryCount` | number | 1 | No | Number of boundary pages |

### Size System
```typescript
const paginationVariants = cva({
  variants: {
    size: {
      sm: "text-sm [&>*]:h-8 [&>*]:px-2",
      default: "text-sm [&>*]:h-9 [&>*]:px-3",
      lg: "text-base [&>*]:h-10 [&>*]:px-4"
    },
    variant: {
      default: "[&>*]:border [&>*]:bg-background",
      outline: "[&>*]:border-2 [&>*]:bg-transparent",
      ghost: "[&>*]:border-0 [&>*]:bg-transparent"
    }
  }
})
```

### Navigation Elements
- **First Page**: Jump to first page
- **Previous Page**: Go to previous page
- **Page Numbers**: Direct page selection
- **Next Page**: Go to next page
- **Last Page**: Jump to last page
- **Page Size Selector**: Change items per page
- **Quick Jumper**: Direct page input
- **Total Counter**: Items count display

### Pagination Logic
```typescript
interface PaginationInfo {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  startIndex: number;
  endIndex: number;
  hasNext: boolean;
  hasPrevious: boolean;
}
```

## Component Requirements

### Technical Specifications
- **Framework**: React with TypeScript
- **Base Component**: shadcn/ui Pagination component (`pnpm dlx shadcn@latest add pagination`)
- **Extensions**: Page size selector, quick jumper, total counter
- **Styling**: shadcn/ui patterns with class-variance-authority
- **Accessibility**: Full ARIA support, keyboard navigation
- **Performance**: Optimized rendering for large page counts
- **Responsive**: Mobile-friendly layout adaptation

### Key Features Required
1. **Page Navigation**: Previous, next, first, last page controls
2. **Direct Navigation**: Click on page numbers for direct access
3. **Page Size Control**: Dropdown to change items per page
4. **Quick Jumper**: Input field for direct page navigation
5. **Total Display**: Show total items and current range
6. **Responsive Design**: Mobile-friendly layout
7. **Accessibility**: Screen reader support and keyboard navigation
8. **Customization**: Flexible styling and configuration options

### Advanced Features
- **Ellipsis Handling**: Smart page number truncation
- **Boundary Pages**: Always show first and last pages
- **Sibling Pages**: Configurable adjacent page display
- **Loading States**: Support for async page changes
- **URL Integration**: Sync with URL parameters

### Usage Examples
```tsx
// Basic pagination
<DocyPagination
  total={1000}
  page={currentPage}
  pageSize={20}
  onPageChange={setCurrentPage}
/>

// With page size selector
<DocyPagination
  total={500}
  page={currentPage}
  pageSize={pageSize}
  onPageChange={setCurrentPage}
  onPageSizeChange={setPageSize}
  showSizeChanger={true}
  pageSizeOptions={[10, 25, 50, 100]}
/>

// With quick jumper
<DocyPagination
  total={2000}
  page={currentPage}
  pageSize={50}
  onPageChange={setCurrentPage}
  showQuickJumper={true}
/>

// Compact layout
<DocyPagination
  total={100}
  page={currentPage}
  pageSize={10}
  onPageChange={setCurrentPage}
  size="sm"
  showSizeChanger={false}
  showTotal={false}
/>

// Custom styling
<DocyPagination
  total={300}
  page={currentPage}
  pageSize={20}
  onPageChange={setCurrentPage}
  variant="outline"
  className="justify-center"
/>

// With custom total text
<DocyPagination
  total={150}
  page={currentPage}
  pageSize={15}
  onPageChange={setCurrentPage}
  totalText="Showing {start}-{end} of {total} results"
/>

// Disabled state
<DocyPagination
  total={100}
  page={currentPage}
  pageSize={10}
  onPageChange={setCurrentPage}
  disabled={isLoading}
/>

// Hide on single page
<DocyPagination
  total={5}
  page={1}
  pageSize={10}
  onPageChange={setCurrentPage}
  hideOnSinglePage={true}
/>

// Custom boundary and sibling count
<DocyPagination
  total={1000}
  page={currentPage}
  pageSize={20}
  onPageChange={setCurrentPage}
  siblingCount={2}
  boundaryCount={2}
/>

// Mobile responsive
<DocyPagination
  total={500}
  page={currentPage}
  pageSize={20}
  onPageChange={setCurrentPage}
  showPrevNext={true}
  showFirstLast={false}
  className="sm:hidden"
/>

// With loading state
<DocyPagination
  total={totalItems}
  page={currentPage}
  pageSize={pageSize}
  onPageChange={async (page) => {
    setIsLoading(true);
    await fetchData(page);
    setCurrentPage(page);
    setIsLoading(false);
  }}
  disabled={isLoading}
/>
```

### Integration Requirements
- **DocyIcon**: Navigation arrows and icons
- **DocyButton**: Page navigation buttons
- **DocySelect**: Page size selector
- **DocyInput**: Quick jumper input
- **Data Fetching**: API integration for paginated data
- **URL Routing**: URL parameter synchronization

### URL Integration
```tsx
// URL parameter integration
import { useSearchParams } from 'react-router-dom';

function PaginatedList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1');
  const pageSize = parseInt(searchParams.get('pageSize') || '20');

  const handlePageChange = (newPage: number) => {
    setSearchParams({
      ...Object.fromEntries(searchParams),
      page: newPage.toString()
    });
  };

  const handlePageSizeChange = (newSize: number) => {
    setSearchParams({
      ...Object.fromEntries(searchParams),
      page: '1',
      pageSize: newSize.toString()
    });
  };

  return (
    <DocyPagination
      total={totalItems}
      page={page}
      pageSize={pageSize}
      onPageChange={handlePageChange}
      onPageSizeChange={handlePageSizeChange}
    />
  );
}
```

### Accessibility Requirements
- **ARIA Attributes**: navigation, current page, page numbers
- **Keyboard Navigation**: Arrow keys, Enter, Tab
- **Screen Reader Support**: Proper announcements
- **Focus Management**: Clear focus indicators
- **Semantic HTML**: Proper navigation structure

### Responsive Design
- **Mobile Layout**: Simplified navigation on small screens
- **Touch Targets**: Appropriate button sizes for touch
- **Breakpoint Handling**: Adaptive feature visibility
- **Scroll Behavior**: Horizontal scrolling for many pages

### Testing Requirements
1. **Unit Tests**: Page calculation, navigation logic, size changes
2. **Integration Tests**: Data fetching, URL synchronization
3. **Accessibility Tests**: ARIA attributes, keyboard navigation
4. **Visual Tests**: All sizes and variants across themes
5. **Responsive Tests**: Mobile and tablet layouts
6. **Performance Tests**: Large page counts, smooth interactions

## Development Priority
**High** - Essential component for data tables and content listing

## Notes
- Built with modern shadcn/ui patterns for consistency
- Optimized for both simple and complex pagination scenarios
- Full accessibility compliance with WCAG guidelines
- TypeScript support with comprehensive type safety
- Flexible configuration for various use cases
- Integrates seamlessly with data fetching and routing
