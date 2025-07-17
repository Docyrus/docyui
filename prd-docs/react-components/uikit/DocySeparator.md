# DocySeparator Component

## Overview
DocySeparator is a visual separator component built on shadcn/ui patterns that provides content division and visual hierarchy. It supports horizontal and vertical orientations with customizable styling. It serves as the primary separator component throughout the Docyrus React application.

## Component Specification

### Props
| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-----------|
| `orientation` | string | 'horizontal' | No | Separator orientation: 'horizontal', 'vertical' |
| `decorative` | boolean | true | No | Whether separator is decorative or semantic |
| `className` | string | - | No | Additional CSS classes |
| `asChild` | boolean | false | No | Render as child element |

### Orientations
- **horizontal**: Horizontal line separator
- **vertical**: Vertical line separator

### Use Cases
- **Content Division**: Separate content sections
- **Menu Items**: Divide menu items
- **Toolbar**: Separate toolbar sections
- **Lists**: Divide list items
- **Cards**: Separate card sections
- **Navigation**: Divide navigation elements

### Decorative vs Semantic
- **Decorative**: Pure visual separator (default)
- **Semantic**: Meaningful content separator for screen readers

## Component Requirements

### Technical Specifications
- **Framework**: React with TypeScript
- **Base Component**: shadcn/ui Separator (`pnpm dlx shadcn@latest add separator`)
- **Extensions**: Enhanced styling and orientation options
- **Styling**: shadcn/ui patterns with class-variance-authority
- **Accessibility**: Proper ARIA attributes for semantic separators
- **Performance**: Lightweight rendering
- **Responsive**: Mobile-friendly sizing

### Key Features Required
1. **Orientation Support**: Horizontal and vertical orientations
2. **Decorative Mode**: Pure visual separation
3. **Semantic Mode**: Meaningful content separation
4. **Flexible Styling**: Customizable appearance
5. **Accessibility**: Proper ARIA attributes
6. **Responsive**: Mobile-friendly sizing
7. **Performance**: Minimal overhead
8. **Integration**: Works with various layout components

### Usage Examples
```tsx
// Basic horizontal separator
<div className="space-y-4">
  <p>First section content</p>
  <DocySeparator />
  <p>Second section content</p>
</div>

// Vertical separator
<div className="flex items-center space-x-4">
  <span>First item</span>
  <DocySeparator orientation="vertical" className="h-4" />
  <span>Second item</span>
  <DocySeparator orientation="vertical" className="h-4" />
  <span>Third item</span>
</div>

// Menu with separators
<div className="border rounded-lg p-2">
  <div className="px-2 py-1 hover:bg-gray-100 rounded cursor-pointer">
    Edit
  </div>
  <div className="px-2 py-1 hover:bg-gray-100 rounded cursor-pointer">
    Copy
  </div>
  <DocySeparator className="my-1" />
  <div className="px-2 py-1 hover:bg-gray-100 rounded cursor-pointer">
    Share
  </div>
  <div className="px-2 py-1 hover:bg-gray-100 rounded cursor-pointer">
    Export
  </div>
  <DocySeparator className="my-1" />
  <div className="px-2 py-1 hover:bg-gray-100 rounded cursor-pointer text-red-600">
    Delete
  </div>
</div>

// Toolbar with separators
<div className="flex items-center space-x-2 p-2 border rounded">
  <DocyButton size="sm" variant="ghost">
    <DocyIcon name="bold" size={16} />
  </DocyButton>
  <DocyButton size="sm" variant="ghost">
    <DocyIcon name="italic" size={16} />
  </DocyButton>
  <DocyButton size="sm" variant="ghost">
    <DocyIcon name="underline" size={16} />
  </DocyButton>
  
  <DocySeparator orientation="vertical" className="h-6" />
  
  <DocyButton size="sm" variant="ghost">
    <DocyIcon name="align-left" size={16} />
  </DocyButton>
  <DocyButton size="sm" variant="ghost">
    <DocyIcon name="align-center" size={16} />
  </DocyButton>
  <DocyButton size="sm" variant="ghost">
    <DocyIcon name="align-right" size={16} />
  </DocyButton>
  
  <DocySeparator orientation="vertical" className="h-6" />
  
  <DocyButton size="sm" variant="ghost">
    <DocyIcon name="link" size={16} />
  </DocyButton>
  <DocyButton size="sm" variant="ghost">
    <DocyIcon name="image" size={16} />
  </DocyButton>
</div>

// Card with sections
<DocyCard>
  <div className="p-4">
    <h3 className="text-lg font-semibold mb-2">Card Title</h3>
    <p className="text-gray-600">Card description content</p>
  </div>
  
  <DocySeparator />
  
  <div className="p-4">
    <h4 className="font-medium mb-2">Details</h4>
    <ul className="text-sm text-gray-600">
      <li>Detail 1</li>
      <li>Detail 2</li>
      <li>Detail 3</li>
    </ul>
  </div>
  
  <DocySeparator />
  
  <div className="p-4">
    <div className="flex justify-end space-x-2">
      <DocyButton variant="outline" size="sm">Cancel</DocyButton>
      <DocyButton size="sm">Save</DocyButton>
    </div>
  </div>
</DocyCard>

// Navigation breadcrumb with separators
<nav className="flex items-center space-x-2 text-sm">
  <a href="/" className="text-blue-600 hover:underline">Home</a>
  <DocySeparator orientation="vertical" className="h-4" />
  <a href="/products" className="text-blue-600 hover:underline">Products</a>
  <DocySeparator orientation="vertical" className="h-4" />
  <span className="text-gray-500">Current Page</span>
</nav>

// List with separators
<div className="space-y-0">
  {items.map((item, index) => (
    <div key={item.id}>
      <div className="py-3 px-4 hover:bg-gray-50">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium">{item.title}</h4>
            <p className="text-sm text-gray-600">{item.description}</p>
          </div>
          <DocyButton variant="ghost" size="sm">
            <DocyIcon name="chevron-right" size={16} />
          </DocyButton>
        </div>
      </div>
      {index < items.length - 1 && <DocySeparator />}
    </div>
  ))}
</div>

// Sidebar with separators
<div className="w-64 border-r">
  <div className="p-4">
    <h3 className="font-semibold mb-4">Navigation</h3>
    <nav className="space-y-2">
      <a href="/dashboard" className="block px-3 py-2 rounded hover:bg-gray-100">
        Dashboard
      </a>
      <a href="/projects" className="block px-3 py-2 rounded hover:bg-gray-100">
        Projects
      </a>
      <a href="/tasks" className="block px-3 py-2 rounded hover:bg-gray-100">
        Tasks
      </a>
    </nav>
  </div>
  
  <DocySeparator />
  
  <div className="p-4">
    <h3 className="font-semibold mb-4">Settings</h3>
    <nav className="space-y-2">
      <a href="/profile" className="block px-3 py-2 rounded hover:bg-gray-100">
        Profile
      </a>
      <a href="/preferences" className="block px-3 py-2 rounded hover:bg-gray-100">
        Preferences
      </a>
    </nav>
  </div>
</div>

// Form sections with separators
<form className="space-y-6">
  <div className="space-y-4">
    <h3 className="text-lg font-semibold">Personal Information</h3>
    <div className="grid grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium mb-1">First Name</label>
        <input className="w-full p-2 border rounded" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Last Name</label>
        <input className="w-full p-2 border rounded" />
      </div>
    </div>
  </div>
  
  <DocySeparator />
  
  <div className="space-y-4">
    <h3 className="text-lg font-semibold">Contact Information</h3>
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Email</label>
        <input type="email" className="w-full p-2 border rounded" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Phone</label>
        <input type="tel" className="w-full p-2 border rounded" />
      </div>
    </div>
  </div>
  
  <DocySeparator />
  
  <div className="flex justify-end space-x-2">
    <DocyButton variant="outline">Cancel</DocyButton>
    <DocyButton type="submit">Save</DocyButton>
  </div>
</form>

// Stats with separators
<div className="flex items-center justify-around p-6 border rounded">
  <div className="text-center">
    <p className="text-2xl font-bold">1,234</p>
    <p className="text-sm text-gray-600">Users</p>
  </div>
  
  <DocySeparator orientation="vertical" className="h-12" />
  
  <div className="text-center">
    <p className="text-2xl font-bold">5,678</p>
    <p className="text-sm text-gray-600">Projects</p>
  </div>
  
  <DocySeparator orientation="vertical" className="h-12" />
  
  <div className="text-center">
    <p className="text-2xl font-bold">9,012</p>
    <p className="text-sm text-gray-600">Tasks</p>
  </div>
</div>

// Footer with separators
<footer className="bg-gray-50 p-6">
  <div className="flex items-center justify-between">
    <div className="flex items-center space-x-4">
      <span className="text-sm text-gray-600">© 2024 Company Name</span>
      <DocySeparator orientation="vertical" className="h-4" />
      <a href="/privacy" className="text-sm text-gray-600 hover:text-gray-900">
        Privacy Policy
      </a>
      <DocySeparator orientation="vertical" className="h-4" />
      <a href="/terms" className="text-sm text-gray-600 hover:text-gray-900">
        Terms of Service
      </a>
    </div>
    
    <div className="flex items-center space-x-4">
      <a href="/support" className="text-sm text-gray-600 hover:text-gray-900">
        Support
      </a>
      <DocySeparator orientation="vertical" className="h-4" />
      <a href="/contact" className="text-sm text-gray-600 hover:text-gray-900">
        Contact
      </a>
    </div>
  </div>
</footer>

// Custom styled separators
<div className="space-y-4">
  <p>Content section 1</p>
  <DocySeparator className="bg-blue-500 h-0.5" />
  <p>Content section 2</p>
  <DocySeparator className="bg-gradient-to-r from-blue-500 to-purple-500 h-1" />
  <p>Content section 3</p>
</div>

// Dashed separator
<div className="space-y-4">
  <p>Section 1</p>
  <DocySeparator className="border-dashed" />
  <p>Section 2</p>
</div>

// Semantic separator (for screen readers)
<div>
  <section>
    <h2>First Section</h2>
    <p>First section content</p>
  </section>
  
  <DocySeparator decorative={false} role="separator" />
  
  <section>
    <h2>Second Section</h2>
    <p>Second section content</p>
  </section>
</div>

// Responsive separator
<div className="space-y-4">
  <p>Mobile content</p>
  <DocySeparator className="block md:hidden" />
  <div className="hidden md:flex items-center space-x-4">
    <span>Desktop content</span>
    <DocySeparator orientation="vertical" className="h-4" />
    <span>More content</span>
  </div>
</div>
```

### Integration Requirements
- **DocyCard**: Section divisions within cards
- **DocyButton**: Toolbar and menu separations
- **DocyIcon**: Icons adjacent to separators
- **Layout Components**: Content organization
- **Navigation**: Menu and breadcrumb separations

### Accessibility Requirements
- **ARIA Attributes**: role="separator" for semantic separators
- **Decorative**: aria-hidden="true" for decorative separators
- **Screen Reader**: Proper semantic separation
- **Focus Management**: Non-focusable decorative separators
- **Semantic HTML**: Meaningful content structure

### Styling Options
```css
/* Custom separator styles */
.separator-dotted {
  border-style: dotted;
}

.separator-dashed {
  border-style: dashed;
}

.separator-double {
  border-style: double;
}

.separator-gradient {
  background: linear-gradient(to right, #3b82f6, #8b5cf6);
  border: none;
  height: 2px;
}
```

### Performance Optimization
- **Minimal DOM**: Lightweight element structure
- **CSS-based**: Pure CSS styling without JavaScript
- **Efficient Rendering**: Fast rendering performance
- **Memory Efficient**: Minimal memory footprint

### Testing Requirements
1. **Unit Tests**: Orientation rendering, decorative vs semantic
2. **Integration Tests**: Layout integration, responsive behavior
3. **Accessibility Tests**: ARIA attributes, screen reader support
4. **Visual Tests**: Both orientations and styling variations
5. **Responsive Tests**: Mobile and desktop layouts
6. **Performance Tests**: Rendering efficiency

## Development Priority
**Low** - Simple utility component for visual organization

## Notes
- Built with modern shadcn/ui patterns for consistency
- Minimal and lightweight implementation
- Full accessibility support for both decorative and semantic use
- TypeScript support with comprehensive type safety
- Flexible styling and customization options
- Works seamlessly with layout components
- Responsive design considerations
