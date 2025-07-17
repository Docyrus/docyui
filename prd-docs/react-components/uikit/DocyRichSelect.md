# DocyRichSelect Component

## Overview
DocyRichSelect is a sophisticated selection component that provides a rich, interactive interface for choosing from a collection of items with support for categories, search functionality, content preview, and multiple layout options. Built with shadcn/ui patterns and Tailwind CSS v4, it offers both list and grid layouts with responsive design and accessibility features.

## Component Specification

### Props
| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `value` | string/object | - | No | Currently selected value |
| `onValueChange` | function | - | No | Callback fired when value changes |
| `data` | array | [] | Yes | Array of selectable items |
| `categoryData` | array | [] | No | Array of category filters |
| `idField` | string | 'id' | No | Field name for item ID |
| `labelField` | string | 'name' | No | Field name for item label |
| `descriptionField` | string | 'description' | No | Field name for item description |
| `contentField` | string | - | No | Field name for item content |
| `iconField` | string | - | No | Field name for item icon |
| `imageField` | string | - | No | Field name for item image |
| `colorField` | string | - | No | Field name for item color theme |
| `size` | string | 'normal' | No | Component size: 'full', 'thin', 'normal', 'large' |
| `itemsPerRow` | number | 2 | No | Items per row: 1, 2, 3, 4, -1 (auto) |
| `height` | string | '80vh' | No | Maximum height of the component |
| `itemWidth` | string | - | No | Custom width for items |
| `defaultIcon` | string | 'database' | No | Default icon for items without icon |
| `defaultColor` | string | 'sky' | No | Default color theme |
| `returnType` | string | 'object' | No | Return type: 'object', 'value' |
| `disabled` | boolean | false | No | Disable all interactions |
| `loading` | boolean | false | No | Show loading overlay |
| `forceOpenDetail` | boolean | false | No | Force content detail view |
| `initialSelectionRestricted` | string | null | No | Restrict initial selection to specific ID |
| `contentMode` | boolean | false | No | Enable side-by-side content preview |
| `searchable` | boolean | true | No | Enable search functionality |
| `categorizable` | boolean | true | No | Enable category filtering |
| `onClose` | function | - | No | Callback fired when component closes |
| `onLoadMore` | function | - | No | Callback for loading more items |
| `className` | string | - | No | Additional CSS classes |

### Data Structure
```typescript
interface SelectItem {
  id: string | number;
  name: string;
  description?: string;
  content?: string;
  icon?: string;
  image?: {
    signed_url: string;
  };
  color?: string;
  [key: string]: any;
}

interface CategoryItem {
  id: string | number;
  name: string;
  filterByField?: string;
}
```

### Behavior
1. **Selection Modes**:
   - Single selection with radio button behavior
   - Content preview mode for items with content
   - Immediate selection for items without content
   - Restricted selection mode for specific scenarios

2. **Layout System**:
   - Grid layout with configurable items per row
   - Responsive breakpoints with container queries
   - Adaptive sizing based on component size
   - Side-by-side content preview mode

3. **Interactive Features**:
   - Search with real-time filtering
   - Category-based filtering with scrollable tabs
   - Content detail view with smooth transitions
   - Hover states and visual feedback
   - Keyboard navigation support

4. **Content Management**:
   - Rich content display with HTML rendering
   - Image and icon support with fallbacks
   - Color theming per item
   - Content preview with "Read More" functionality

## Component Requirements

### Technical Specifications
- **Framework**: React with TypeScript
- **Base Component**: shadcn/ui Select component (`pnpm dlx shadcn@latest add select`)
- **Extensions**: Rich content display, grid layouts, search functionality, and category filtering built on top of shadcn Select
- **Styling**: shadcn/ui patterns with class-variance-authority
- **Accessibility**: Full ARIA support, keyboard navigation, focus management
- **Responsive**: Container queries for adaptive layouts
- **Performance**: Virtualization for large datasets, optimized re-renders

### Key Features Required
1. **Selection System**: Radio group behavior with visual selection indicators
2. **Search Functionality**: Real-time filtering with debounced input
3. **Category Filtering**: Horizontal scrollable category tabs with active states
4. **Content Preview**: Side-by-side content view with smooth transitions
5. **Responsive Grid**: Container query-based responsive grid system
6. **Rich Content**: Support for icons, images, colors, and HTML content
7. **Loading States**: Skeleton loading and overlay states
8. **Accessibility**: Full keyboard navigation and screen reader support

### Advanced Features
- **Content Detail View**: Expandable content preview with navigation
- **Scroll Management**: Smooth scrolling to selected items
- **Category Navigation**: Horizontal scroll controls with hover states
- **Restricted Selection**: Ability to restrict selection to specific items
- **Custom Layouts**: Flexible grid and list layout options
- **Theme Support**: Per-item color theming with consistent patterns

### Size Variants
```typescript
const sizeVariants = {
  full: {
    1: 'w-full',
    2: 'w-full', 
    3: 'w-full'
  },
  normal: {
    1: 'w-[384px]',
    2: 'w-[768px]',
    3: 'w-[1152px]'
  },
  thin: {
    1: 'w-[320px]',
    2: 'w-[672px]',
    3: 'w-[896px]',
    4: 'w-[1152px]'
  },
  large: {
    1: 'w-[448px]',
    2: 'w-[896px]',
    3: 'w-[1280px]'
  }
} as const
```

## Usage Examples

### Basic Selection
```tsx
const [selectedItem, setSelectedItem] = useState(null);

<DocyRichSelect
  data={items}
  value={selectedItem}
  onValueChange={setSelectedItem}
  labelField="title"
  descriptionField="subtitle"
  iconField="icon"
/>
```

### With Categories and Search
```tsx
<DocyRichSelect
  data={templates}
  categoryData={categories}
  value={selectedTemplate}
  onValueChange={setSelectedTemplate}
  size="large"
  itemsPerRow={3}
  searchable={true}
  categorizable={true}
/>
```

### Content Preview Mode
```tsx
<DocyRichSelect
  data={articles}
  value={selectedArticle}
  onValueChange={setSelectedArticle}
  contentMode={true}
  contentField="content"
  imageField="thumbnail"
  size="full"
  height="90vh"
/>
```

### Grid Layout Options
```tsx
// Thin layout with 4 items per row
<DocyRichSelect
  data={icons}
  size="thin"
  itemsPerRow={4}
  value={selectedIcon}
  onValueChange={setSelectedIcon}
/>

// Large layout with 2 items per row
<DocyRichSelect
  data={templates}
  size="large"
  itemsPerRow={2}
  value={selectedTemplate}
  onValueChange={setSelectedTemplate}
/>
```

### Custom Styling and Theming
```tsx
<DocyRichSelect
  data={statusOptions}
  colorField="statusColor"
  iconField="statusIcon"
  defaultColor="slate"
  itemWidth="w-48"
  className="custom-select"
/>
```

### Loading and Disabled States
```tsx
<DocyRichSelect
  data={items}
  loading={isLoading}
  disabled={isDisabled}
  onLoadMore={handleLoadMore}
  value={selectedItem}
  onValueChange={setSelectedItem}
/>
```

### Restricted Selection
```tsx
<DocyRichSelect
  data={plans}
  initialSelectionRestricted="premium-plan"
  forceOpenDetail={true}
  contentMode={true}
  onClose={handleClose}
/>
```

### Custom Field Mapping
```tsx
<DocyRichSelect
  data={users}
  idField="userId"
  labelField="fullName"
  descriptionField="role"
  imageField="avatar"
  colorField="departmentColor"
  returnType="value"
/>
```

## Dependencies Required
- `@radix-ui/react-radio-group`: Accessible radio group primitives
- `@radix-ui/react-scroll-area`: Smooth scrolling areas
- `@heroicons/react`: Search and navigation icons
- `class-variance-authority`: Variant management
- `DocyIcon`: Icon component integration
- `DocyAvatar`: Avatar component for images
- `DocyButton`: Button components for actions
- `DocyLoaderMask`: Loading overlay component

## Testing Requirements
1. **Unit Tests**: Selection behavior, search filtering, category filtering, data transformations
2. **Integration Tests**: Category interactions, content preview, keyboard navigation
3. **Visual Tests**: All size variants, responsive behavior, theming variations
4. **Accessibility Tests**: ARIA attributes, keyboard navigation, focus management, screen reader support
5. **Performance Tests**: Large dataset handling, search performance, rendering optimization
6. **Interaction Tests**: Selection flow, content preview, category navigation, scroll behavior

## Development Priority
**High** - Complex selection component used in multiple critical workflows throughout the application

## Notes
- Built with modern shadcn/ui patterns for consistency and maintainability
- Leverages container queries for responsive design without media queries
- Supports both controlled and uncontrolled usage patterns
- Content preview mode provides rich detail views
- Flexible theming system with per-item color support
- Optimized for large datasets with virtualization support
- Full TypeScript support with comprehensive type definitions
- Accessibility-first design with complete keyboard navigation
- Integrates seamlessly with existing Docyrus component ecosystem