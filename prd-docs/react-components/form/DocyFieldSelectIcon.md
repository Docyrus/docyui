# DocyFieldSelectIcon

A comprehensive icon selection field component built on shadcn/ui Select, extended with Docy features for selecting icons from multiple libraries, categories, and custom sets.

## Component Overview

DocyFieldSelectIcon is a specialized form field that provides an intuitive interface for selecting icons from various libraries (Lucide, Heroicons, Tabler, etc.). Built on the solid foundation of shadcn/ui Select component, it extends DocyFieldBase to inherit all common field functionality while adding powerful icon-specific features like search, categorization, library switching, and custom icon support.

The component transforms the standard select experience into a visual icon picker with grid display, preview capabilities, and advanced filtering options.

## Props

### Base Props (from DocyFieldBase)
All props from DocyFieldBase are supported. See [DocyFieldBase documentation](../DocyFieldBase.md) for complete details.

### Icon-Specific Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `library` | `string` | `'lucide'` | Current icon library (lucide, heroicons, tabler, etc.) |
| `libraries` | `string[]` | `['lucide']` | Available icon libraries |
| `showLibrarySelect` | `boolean` | `true` | Show library selector dropdown |
| `categories` | `string[]` | `[]` | Icon categories for filtering |
| `showCategories` | `boolean` | `true` | Show category filter tabs |
| `searchable` | `boolean` | `true` | Enable icon search functionality |
| `searchPlaceholder` | `string` | `'Search icons...'` | Search input placeholder |
| `size` | `string` | `'md'` | Icon display size (sm, md, lg, xl) |
| `showPreview` | `boolean` | `true` | Show selected icon preview |
| `previewSize` | `string` | `'lg'` | Preview icon size |
| `gridColumns` | `number` | `6` | Grid columns for icon display |
| `allowCustom` | `boolean` | `false` | Allow custom icon upload/selection |
| `customIcons` | `CustomIcon[]` | `[]` | Custom icon set |
| `showRecent` | `boolean` | `true` | Show recently used icons |
| `maxRecent` | `number` | `10` | Maximum recent icons to remember |
| `onIconChange` | `(icon: string, library: string) => void` | `undefined` | Icon selection callback |
| `onLibraryChange` | `(library: string) => void` | `undefined` | Library change callback |
| `onCategoryChange` | `(category: string) => void` | `undefined` | Category change callback |
| `validator` | `(icon: string) => boolean` | `undefined` | Icon validation function |
| `iconSets` | `IconSet[]` | `[]` | Custom icon sets |
| `showIconSets` | `boolean` | `false` | Show icon sets selector |
| `upload` | `boolean` | `false` | Allow icon upload |
| `uploadFormats` | `string[]` | `['svg', 'png', 'jpg']` | Allowed upload formats |

### Type Definitions

```typescript
interface CustomIcon {
  id: string;
  name: string;
  svg: string;
  category?: string;
  tags?: string[];
}

interface IconSet {
  id: string;
  name: string;
  description?: string;
  icons: CustomIcon[];
  library?: string;
}
```

## Component Requirements

### Installation

Install the required shadcn/ui Select component:

```bash
pnpm dlx shadcn@latest add select
```

### Additional Dependencies

```bash
pnpm install lucide-react @heroicons/react @tabler/icons-react
```

### Required Imports

```typescript
import { DocyFieldSelectIcon } from '@/components/form/DocyFieldSelectIcon';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
```

## Key Features Required

### 1. Icon Library Support
- Multiple icon libraries (Lucide, Heroicons, Tabler, etc.)
- Dynamic library switching
- Library-specific icon loading
- Fallback handling for missing icons

### 2. Search and Filtering
- Real-time icon search
- Category-based filtering
- Tag-based search
- Fuzzy matching support

### 3. Visual Display
- Grid-based icon display
- Configurable grid columns
- Icon size variants
- Preview functionality

### 4. Custom Icon Support
- Custom icon upload
- SVG icon support
- Icon validation
- Custom icon sets

### 5. User Experience
- Recently used icons
- Icon tooltips
- Keyboard navigation
- Loading states

### 6. Integration Features
- Form validation
- Error handling
- Accessibility support
- Theme compatibility

## Usage Examples

### 1. Basic Icon Selection

```typescript
import { DocyFieldSelectIcon } from '@/components/form/DocyFieldSelectIcon';

function BasicIconExample() {
  return (
    <DocyFieldSelectIcon
      name="icon"
      label="Select Icon"
      placeholder="Choose an icon..."
      library="lucide"
      onIconChange={(icon, library) => console.log(`Selected: ${icon} from ${library}`)}
    />
  );
}
```

### 2. Multiple Libraries with Categories

```typescript
function MultiLibraryExample() {
  return (
    <DocyFieldSelectIcon
      name="interface-icon"
      label="Interface Icon"
      libraries={['lucide', 'heroicons', 'tabler']}
      categories={['navigation', 'actions', 'media', 'communication']}
      showLibrarySelect={true}
      showCategories={true}
      gridColumns={8}
      onLibraryChange={(library) => console.log(`Switched to: ${library}`)}
    />
  );
}
```

### 3. Searchable with Custom Icons

```typescript
function SearchableCustomExample() {
  const customIcons = [
    {
      id: 'brand-logo',
      name: 'Brand Logo',
      svg: '<svg>...</svg>',
      category: 'branding',
      tags: ['logo', 'brand', 'identity']
    },
    {
      id: 'custom-arrow',
      name: 'Custom Arrow',
      svg: '<svg>...</svg>',
      category: 'navigation',
      tags: ['arrow', 'direction', 'navigation']
    }
  ];

  return (
    <DocyFieldSelectIcon
      name="custom-icon"
      label="Select Custom Icon"
      searchable={true}
      searchPlaceholder="Search icons and custom graphics..."
      allowCustom={true}
      customIcons={customIcons}
      showRecent={true}
      maxRecent={15}
      size="lg"
      previewSize="xl"
    />
  );
}
```

### 4. Form Integration with Validation

```typescript
function FormIntegrationExample() {
  const validateIcon = (icon: string) => {
    const forbiddenIcons = ['trash', 'delete', 'remove'];
    return !forbiddenIcons.includes(icon);
  };

  return (
    <form>
      <DocyFieldSelectIcon
        name="action-icon"
        label="Action Icon"
        required={true}
        validator={validateIcon}
        errorMessage="This icon is not allowed for this action"
        helpText="Select an appropriate icon for the action button"
        libraries={['lucide', 'heroicons']}
        categories={['actions', 'interface', 'arrows']}
        showPreview={true}
        onIconChange={(icon, library) => {
          console.log(`Valid icon selected: ${icon} from ${library}`);
        }}
      />
    </form>
  );
}
```

### 5. Icon Sets with Upload

```typescript
function IconSetsUploadExample() {
  const iconSets = [
    {
      id: 'business-set',
      name: 'Business Icons',
      description: 'Professional business and office icons',
      icons: [
        { id: 'meeting', name: 'Meeting', svg: '<svg>...</svg>' },
        { id: 'presentation', name: 'Presentation', svg: '<svg>...</svg>' }
      ]
    },
    {
      id: 'social-set',
      name: 'Social Media',
      description: 'Social media platform icons',
      icons: [
        { id: 'facebook', name: 'Facebook', svg: '<svg>...</svg>' },
        { id: 'twitter', name: 'Twitter', svg: '<svg>...</svg>' }
      ]
    }
  ];

  return (
    <DocyFieldSelectIcon
      name="brand-icon"
      label="Brand Icon"
      showIconSets={true}
      iconSets={iconSets}
      upload={true}
      uploadFormats={['svg', 'png', 'jpg', 'webp']}
      allowCustom={true}
      gridColumns={6}
      showLibrarySelect={false}
      onIconChange={(icon, library) => {
        console.log(`Selected from set: ${icon}`);
      }}
    />
  );
}
```

### 6. Advanced Configuration

```typescript
function AdvancedExample() {
  const [selectedIcon, setSelectedIcon] = useState('');
  const [currentLibrary, setCurrentLibrary] = useState('lucide');

  return (
    <DocyFieldSelectIcon
      name="advanced-icon"
      label="Advanced Icon Selection"
      value={selectedIcon}
      library={currentLibrary}
      libraries={['lucide', 'heroicons', 'tabler', 'feather']}
      categories={['all', 'interface', 'navigation', 'media', 'communication', 'business']}
      showLibrarySelect={true}
      showCategories={true}
      searchable={true}
      searchPlaceholder="Search thousands of icons..."
      size="md"
      showPreview={true}
      previewSize="xl"
      gridColumns={10}
      allowCustom={true}
      showRecent={true}
      maxRecent={20}
      showIconSets={true}
      upload={true}
      uploadFormats={['svg', 'png', 'jpg', 'gif', 'webp']}
      onIconChange={(icon, library) => {
        setSelectedIcon(icon);
        console.log(`Icon changed: ${icon} from ${library}`);
      }}
      onLibraryChange={(library) => {
        setCurrentLibrary(library);
        console.log(`Library changed: ${library}`);
      }}
      onCategoryChange={(category) => {
        console.log(`Category changed: ${category}`);
      }}
      validator={(icon) => {
        return icon.length > 0 && !icon.includes('deprecated');
      }}
    />
  );
}
```

### 7. Readonly and Disabled States

```typescript
function StateExample() {
  return (
    <div className="space-y-4">
      <DocyFieldSelectIcon
        name="readonly-icon"
        label="Readonly Icon"
        value="star"
        library="lucide"
        readonly={true}
        showPreview={true}
      />
      
      <DocyFieldSelectIcon
        name="disabled-icon"
        label="Disabled Icon"
        disabled={true}
        placeholder="Icon selection disabled"
        helpText="This field is currently disabled"
      />
    </div>
  );
}
```

## Integration Requirements

### 1. Form Libraries
- React Hook Form integration
- Formik compatibility
- Yup validation schema support
- Custom validation functions

### 2. Icon Libraries
- Lucide React
- Heroicons
- Tabler Icons
- Feather Icons
- Custom SVG libraries

### 3. Styling
- Tailwind CSS classes
- Theme system integration
- Dark mode support
- Size variants

### 4. Accessibility
- ARIA labels and descriptions
- Keyboard navigation
- Screen reader support
- Focus management

## Testing Requirements

### Unit Tests
```typescript
describe('DocyFieldSelectIcon', () => {
  it('should render with basic props', () => {
    render(<DocyFieldSelectIcon name="test" label="Test Icon" />);
    expect(screen.getByLabelText('Test Icon')).toBeInTheDocument();
  });

  it('should show library selector when enabled', () => {
    render(
      <DocyFieldSelectIcon
        name="test"
        label="Test Icon"
        libraries={['lucide', 'heroicons']}
        showLibrarySelect={true}
      />
    );
    expect(screen.getByText('Library')).toBeInTheDocument();
  });

  it('should filter icons by search term', async () => {
    render(
      <DocyFieldSelectIcon
        name="test"
        label="Test Icon"
        searchable={true}
      />
    );
    
    const searchInput = screen.getByPlaceholderText('Search icons...');
    fireEvent.change(searchInput, { target: { value: 'star' } });
    
    await waitFor(() => {
      expect(screen.getByText('star')).toBeInTheDocument();
    });
  });

  it('should call onIconChange when icon is selected', () => {
    const mockOnChange = jest.fn();
    render(
      <DocyFieldSelectIcon
        name="test"
        label="Test Icon"
        onIconChange={mockOnChange}
      />
    );
    
    // Simulate icon selection
    fireEvent.click(screen.getByText('star'));
    expect(mockOnChange).toHaveBeenCalledWith('star', 'lucide');
  });

  it('should validate icons correctly', () => {
    const validator = (icon: string) => icon !== 'forbidden';
    render(
      <DocyFieldSelectIcon
        name="test"
        label="Test Icon"
        validator={validator}
      />
    );
    
    // Test validation logic
    expect(validator('star')).toBe(true);
    expect(validator('forbidden')).toBe(false);
  });
});
```

### Integration Tests
```typescript
describe('DocyFieldSelectIcon Integration', () => {
  it('should work with form libraries', () => {
    // Test React Hook Form integration
    // Test Formik integration
    // Test validation schemas
  });

  it('should handle custom icons correctly', () => {
    // Test custom icon upload
    // Test custom icon sets
    // Test icon validation
  });

  it('should maintain accessibility standards', () => {
    // Test keyboard navigation
    // Test screen reader support
    // Test ARIA attributes
  });
});
```

## Best Practices

1. **Performance**: Use icon lazy loading for large libraries
2. **Accessibility**: Provide meaningful alt text for icons
3. **Validation**: Validate icon formats and sizes
4. **User Experience**: Show loading states during icon loading
5. **Responsive**: Ensure grid adapts to different screen sizes
6. **SEO**: Use semantic HTML structure
7. **Testing**: Test across different icon libraries and browsers

## Related Components

- [DocyFieldBase](../DocyFieldBase.md) - Base field functionality
- [DocyFieldSelect](./DocyFieldSelect.md) - Standard select field
- [DocyFieldImage](./DocyFieldImage.md) - Image selection field
- [DocyFieldColor](./DocyFieldColor.md) - Color picker field