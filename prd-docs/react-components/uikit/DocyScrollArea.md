# DocyScrollArea Component

## Overview
DocyScrollArea is a custom scrollable area component built on shadcn/ui patterns that provides enhanced scrolling with custom scrollbars. It supports horizontal and vertical scrolling, viewport sizing, and accessibility features. It serves as the primary scrollable container component throughout the Docyrus React application.

## Component Specification

### Props
| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-----------|
| `children` | ReactNode | - | Yes | Scrollable content |
| `type` | string | 'auto' | No | Scroll type: 'auto', 'always', 'hover', 'scroll' |
| `scrollHideDelay` | number | 600 | No | Delay before hiding scrollbars (ms) |
| `dir` | string | 'ltr' | No | Text direction: 'ltr', 'rtl' |
| `className` | string | - | No | Additional CSS classes |
| `viewportClassName` | string | - | No | Viewport CSS classes |
| `scrollbarClassName` | string | - | No | Scrollbar CSS classes |
| `thumbClassName` | string | - | No | Thumb CSS classes |
| `cornerClassName` | string | - | No | Corner CSS classes |
| `orientation` | string | 'vertical' | No | Scrollbar orientation: 'vertical', 'horizontal', 'both' |

### Scroll Types
- **auto**: Show scrollbars when content overflows
- **always**: Always show scrollbars
- **hover**: Show scrollbars on hover
- **scroll**: Show only when scrolling

### Components
- **Viewport**: The scrollable content area
- **Scrollbar**: The scrollbar container
- **Thumb**: The draggable scrollbar thumb
- **Corner**: The corner where scrollbars meet

## Component Requirements

### Technical Specifications
- **Framework**: React with TypeScript
- **Base Component**: shadcn/ui Scroll Area (`pnpm dlx shadcn@latest add scroll-area`)
- **Extensions**: Enhanced scrollbar styling, orientation options
- **Styling**: shadcn/ui patterns with class-variance-authority
- **Accessibility**: Full ARIA support, keyboard navigation
- **Performance**: Optimized scrolling performance
- **Cross-browser**: Consistent behavior across browsers

### Key Features Required
1. **Custom Scrollbars**: Styled scrollbars with consistent appearance
2. **Viewport Control**: Precise control over scrollable area
3. **Orientation Support**: Vertical, horizontal, or both scrollbars
4. **Hide/Show Behavior**: Configurable scrollbar visibility
5. **Keyboard Navigation**: Arrow keys, Page Up/Down, Home/End
6. **Accessibility**: Screen reader support and ARIA compliance
7. **Performance**: Smooth scrolling with large content
8. **Responsive**: Mobile-friendly touch scrolling

### Usage Examples
```tsx
// Basic scroll area
<DocyScrollArea className="h-72 w-48 border rounded">
  <div className="p-4">
    <h4 className="mb-4 text-sm font-medium leading-none">Tags</h4>
    {tags.map((tag) => (
      <div key={tag} className="text-sm mb-2">
        {tag}
      </div>
    ))}
  </div>
</DocyScrollArea>

// Always visible scrollbars
<DocyScrollArea 
  type="always" 
  className="h-72 w-48 border rounded"
>
  <div className="p-4">
    <h4 className="mb-4 text-sm font-medium leading-none">Content</h4>
    <div className="space-y-2">
      {Array.from({ length: 50 }, (_, i) => (
        <div key={i} className="text-sm">
          Item {i + 1}
        </div>
      ))}
    </div>
  </div>
</DocyScrollArea>

// Horizontal scroll area
<DocyScrollArea 
  orientation="horizontal" 
  className="w-96 border rounded"
>
  <div className="flex w-max space-x-4 p-4">
    {Array.from({ length: 20 }, (_, i) => (
      <div key={i} className="shrink-0 w-32 h-20 bg-gray-100 rounded flex items-center justify-center">
        Item {i + 1}
      </div>
    ))}
  </div>
</DocyScrollArea>

// Both orientations
<DocyScrollArea 
  orientation="both" 
  className="h-72 w-96 border rounded"
>
  <div className="p-4" style={{ width: '600px', height: '400px' }}>
    <h4 className="mb-4 text-sm font-medium leading-none">Large Content</h4>
    <div className="grid grid-cols-4 gap-4">
      {Array.from({ length: 100 }, (_, i) => (
        <div key={i} className="w-24 h-24 bg-gray-100 rounded flex items-center justify-center text-sm">
          {i + 1}
        </div>
      ))}
    </div>
  </div>
</DocyScrollArea>

// Code editor scroll area
<DocyScrollArea className="h-96 w-full border rounded bg-gray-900 text-white">
  <div className="p-4 font-mono text-sm">
    <div className="mb-2 text-gray-400">// Example code</div>
    {codeLines.map((line, i) => (
      <div key={i} className="flex">
        <span className="w-8 text-gray-500 text-right mr-4">{i + 1}</span>
        <span>{line}</span>
      </div>
    ))}
  </div>
</DocyScrollArea>

// Chat messages scroll area
<DocyScrollArea className="h-80 w-full border rounded">
  <div className="p-4 space-y-3">
    {messages.map((message) => (
      <div key={message.id} className="flex items-start space-x-3">
        <DocyAvatar src={message.user.avatar} size="sm" />
        <div className="flex-1">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium">{message.user.name}</span>
            <span className="text-xs text-gray-500">{message.timestamp}</span>
          </div>
          <p className="text-sm text-gray-700">{message.text}</p>
        </div>
      </div>
    ))}
  </div>
</DocyScrollArea>

// File explorer scroll area
<DocyScrollArea className="h-96 w-64 border rounded">
  <div className="p-2">
    <div className="mb-2 px-2 py-1 text-xs font-medium text-gray-500 uppercase tracking-wider">
      Files
    </div>
    {files.map((file) => (
      <div key={file.id} className="flex items-center space-x-2 px-2 py-1 hover:bg-gray-100 rounded cursor-pointer">
        <DocyIcon name={file.type === 'folder' ? 'folder' : 'file'} size={16} />
        <span className="text-sm">{file.name}</span>
      </div>
    ))}
  </div>
</DocyScrollArea>

// Data table scroll area
<DocyScrollArea className="h-96 w-full border rounded">
  <table className="w-full">
    <thead className="bg-gray-50">
      <tr>
        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Name
        </th>
        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Email
        </th>
        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Role
        </th>
        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Status
        </th>
      </tr>
    </thead>
    <tbody className="bg-white divide-y divide-gray-200">
      {users.map((user) => (
        <tr key={user.id} className="hover:bg-gray-50">
          <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
            {user.name}
          </td>
          <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
            {user.email}
          </td>
          <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
            {user.role}
          </td>
          <td className="px-4 py-2 whitespace-nowrap">
            <DocyBadge variant={user.status === 'active' ? 'success' : 'secondary'}>
              {user.status}
            </DocyBadge>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</DocyScrollArea>

// Sidebar scroll area
<DocyScrollArea className="h-screen w-64 border-r">
  <div className="p-4">
    <h3 className="mb-4 text-lg font-semibold">Navigation</h3>
    <nav className="space-y-2">
      {navigationItems.map((item) => (
        <a
          key={item.id}
          href={item.href}
          className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-100 text-sm"
        >
          <DocyIcon name={item.icon} size={16} />
          <span>{item.label}</span>
        </a>
      ))}
    </nav>
  </div>
</DocyScrollArea>

// Custom styled scroll area
<DocyScrollArea 
  className="h-72 w-48 border rounded"
  scrollbarClassName="bg-gray-200"
  thumbClassName="bg-blue-500 hover:bg-blue-600"
>
  <div className="p-4">
    <h4 className="mb-4 text-sm font-medium leading-none">Custom Scrollbar</h4>
    <div className="space-y-2">
      {Array.from({ length: 30 }, (_, i) => (
        <div key={i} className="text-sm">
          Custom item {i + 1}
        </div>
      ))}
    </div>
  </div>
</DocyScrollArea>

// Hover-only scrollbars
<DocyScrollArea 
  type="hover" 
  className="h-72 w-48 border rounded"
>
  <div className="p-4">
    <h4 className="mb-4 text-sm font-medium leading-none">Hover Scrollbars</h4>
    <div className="space-y-2">
      {Array.from({ length: 30 }, (_, i) => (
        <div key={i} className="text-sm">
          Hover to see scrollbar {i + 1}
        </div>
      ))}
    </div>
  </div>
</DocyScrollArea>

// RTL scroll area
<DocyScrollArea 
  dir="rtl" 
  className="h-72 w-48 border rounded"
>
  <div className="p-4">
    <h4 className="mb-4 text-sm font-medium leading-none">RTL Content</h4>
    <div className="space-y-2">
      {Array.from({ length: 30 }, (_, i) => (
        <div key={i} className="text-sm">
          عنصر {i + 1}
        </div>
      ))}
    </div>
  </div>
</DocyScrollArea>
```

### Integration Requirements
- **DocyIcon**: File type icons
- **DocyAvatar**: User avatars in lists
- **DocyBadge**: Status indicators
- **DocyButton**: Action buttons within scrollable content
- **Theme System**: Consistent scrollbar styling

### Accessibility Requirements
- **ARIA Attributes**: scrollbar, orientation, valuenow
- **Keyboard Navigation**: Arrow keys, Page Up/Down, Home/End
- **Screen Reader Support**: Scroll position announcements
- **Focus Management**: Focus indicators within scrollable area
- **Reduced Motion**: Respect user motion preferences

### Performance Optimization
- **Efficient Scrolling**: Hardware-accelerated scrolling
- **Content Virtualization**: Handle large datasets efficiently
- **Debounced Events**: Throttled scroll event handling
- **Memory Management**: Proper cleanup of event listeners

### Testing Requirements
1. **Unit Tests**: Scrollbar behavior, orientation, visibility
2. **Integration Tests**: Content scrolling, keyboard navigation
3. **Accessibility Tests**: ARIA attributes, keyboard interaction
4. **Visual Tests**: All scroll types and orientations
5. **Performance Tests**: Large content sets, smooth scrolling
6. **Mobile Tests**: Touch scrolling, responsive behavior

## Development Priority
**Medium** - Useful for custom scrolling experiences and content organization

## Notes
- Built with modern shadcn/ui patterns for consistency
- Provides consistent scrollbar appearance across browsers
- Full accessibility compliance with WCAG guidelines
- TypeScript support with comprehensive type safety
- Optimized for both desktop and mobile scrolling
- Extensible styling for custom scrollbar designs
- Supports complex content layouts and orientations
