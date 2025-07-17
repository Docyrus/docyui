# DocyIsolatedHtmlView Component

## Overview
DocyIsolatedHtmlView is a specialized component that renders HTML content within a sandboxed iframe, providing complete isolation from the parent application. It includes a comprehensive CSS reset system, proper document structure, and responsive styling. This component is essential for safely displaying user-generated HTML content, email previews, or any HTML that requires complete style isolation.

## Component Specification

### Props
| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `content` | string | - | Yes | HTML content to render inside the iframe |
| `className` | string | - | No | Additional CSS classes for the iframe container |
| `onLoad` | function | - | No | Callback fired when iframe content is loaded |
| `onError` | function | - | No | Callback fired when iframe content fails to load |

### Ref Methods
| Method | Return Type | Description |
|--------|-------------|-------------|
| `getIframe()` | HTMLIFrameElement \| null | Returns the iframe DOM element |
| `getDocument()` | Document \| null | Returns the iframe's document object |
| `getBody()` | HTMLBodyElement \| null | Returns the iframe's body element |
| `updateContent(content: string)` | void | Updates the iframe content programmatically |

### TypeScript Interfaces
```typescript
interface DocyIsolatedHtmlViewProps {
  content: string;
  className?: string;
  onLoad?: () => void;
  onError?: (error: Error) => void;
}

interface DocyIsolatedHtmlViewRef {
  getIframe(): HTMLIFrameElement | null;
  getDocument(): Document | null;
  getBody(): HTMLBodyElement | null;
  updateContent(content: string): void;
}
```

## Behavior

### Content Isolation
- Creates a completely isolated sandbox environment using iframe
- Prevents any CSS or JavaScript from affecting the parent application
- Provides full document structure with proper DOCTYPE and meta tags
- Automatically handles content updates and re-rendering

### CSS Reset System
The component includes a comprehensive CSS reset that provides:
- Modern box-sizing reset with border-box
- Font size inflation prevention
- Consistent system font stack
- Margin and padding normalization
- Accessible typography defaults
- Responsive image handling
- Form element inheritance
- Table styling with proper borders and spacing

### Document Structure
Generated iframe content follows this structure:
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
  <style>/* CSS Reset */</style>
  <!-- User content here -->
</body>
</html>
```

### Responsive Behavior
- Iframe adapts to container sizing
- Viewport meta tag ensures proper mobile rendering
- CSS reset includes responsive image handling
- Text wrapping and line height optimizations for readability

## Component Requirements

### Technical Specifications
- **Framework**: React with TypeScript
- **Base Component**: Custom implementation (no direct shadcn/ui equivalent)
- **Integration**: Uses shadcn/ui design tokens and styling patterns
- **Styling**: Tailwind CSS v4 with custom CSS reset injection
- **Accessibility**: Proper iframe labeling and focus management
- **Performance**: Efficient content updates without full re-renders
- **Security**: Sandboxed iframe environment for content isolation

### Key Features Required
1. **Content Isolation**: Complete HTML/CSS/JS isolation using iframe sandbox
2. **CSS Reset System**: Comprehensive reset for consistent rendering across browsers
3. **Dynamic Content Updates**: Real-time content updates with proper cleanup
4. **Document Structure**: Full HTML5 document with proper meta tags
5. **Responsive Design**: Mobile-first approach with viewport meta tag
6. **Typography System**: Consistent font stack and sizing
7. **Table Styling**: Pre-configured table styles with proper borders and spacing
8. **Ref Interface**: Programmatic access to iframe and document elements

### Advanced Features
- **Content Sanitization**: Optional HTML sanitization before rendering
- **Loading States**: Visual feedback during content loading
- **Error Handling**: Proper error boundaries for malformed HTML
- **Performance Optimization**: Debounced content updates for rapid changes
- **Memory Management**: Proper cleanup of iframe resources

### CSS Reset Features
The component must include these specific reset styles:
- Box-sizing border-box for all elements
- Font size inflation prevention
- System font stack: `-apple-system, BlinkMacSystemFont, "San Francisco", "Segoe UI", Roboto, "Helvetica Neue", sans-serif`
- Base font size: 14px
- Margin/padding normalization
- List style removal for role="list"
- Heading text-wrap balance
- Image responsive handling
- Form element font inheritance
- Table styling with green header background (#4CAF50)
- Consistent border styling (#d1d5db)

## Usage Examples

### Basic Usage
```tsx
import { DocyIsolatedHtmlView } from '@/components/ui/docy-isolated-html-view';

function EmailPreview() {
  const emailContent = `
    <h1>Welcome to Docyrus</h1>
    <p>This is an email preview with <strong>HTML content</strong>.</p>
    <table>
      <thead>
        <tr>
          <th>Feature</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Email Preview</td>
          <td>Active</td>
        </tr>
      </tbody>
    </table>
  `;

  return (
    <DocyIsolatedHtmlView 
      content={emailContent}
      className="w-full h-96 border rounded-lg"
    />
  );
}
```

### With Ref Access
```tsx
import { useRef } from 'react';
import { DocyIsolatedHtmlView } from '@/components/ui/docy-isolated-html-view';

function DocumentPreview() {
  const viewRef = useRef<DocyIsolatedHtmlViewRef>(null);

  const handlePrint = () => {
    const iframe = viewRef.current?.getIframe();
    if (iframe?.contentWindow) {
      iframe.contentWindow.print();
    }
  };

  const handleUpdateContent = () => {
    viewRef.current?.updateContent('<h1>Updated Content</h1>');
  };

  return (
    <div>
      <DocyIsolatedHtmlView 
        ref={viewRef}
        content="<h1>Initial Content</h1>"
        className="w-full h-64 border"
        onLoad={() => console.log('Content loaded')}
        onError={(error) => console.error('Load error:', error)}
      />
      <button onClick={handlePrint}>Print</button>
      <button onClick={handleUpdateContent}>Update</button>
    </div>
  );
}
```

### Dynamic Content Updates
```tsx
import { useState, useEffect } from 'react';
import { DocyIsolatedHtmlView } from '@/components/ui/docy-isolated-html-view';

function LivePreview() {
  const [htmlContent, setHtmlContent] = useState('<p>Loading...</p>');

  useEffect(() => {
    // Simulate real-time content updates
    const interval = setInterval(() => {
      const timestamp = new Date().toLocaleTimeString();
      setHtmlContent(`
        <div>
          <h2>Live Update</h2>
          <p>Last updated: ${timestamp}</p>
          <div style="background: #f0f0f0; padding: 10px; border-radius: 4px;">
            <p>This content updates every second!</p>
          </div>
        </div>
      `);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <DocyIsolatedHtmlView 
      content={htmlContent}
      className="w-full h-48 border rounded shadow"
    />
  );
}
```

### User-Generated Content
```tsx
import { DocyIsolatedHtmlView } from '@/components/ui/docy-isolated-html-view';

function UserContentDisplay({ userHtml }: { userHtml: string }) {
  // Note: In production, sanitize userHtml before passing to component
  const sanitizedHtml = sanitizeHtml(userHtml);

  return (
    <div className="user-content-preview">
      <h3>User Content Preview</h3>
      <DocyIsolatedHtmlView 
        content={sanitizedHtml}
        className="w-full min-h-32 max-h-96 border border-gray-300 rounded-md overflow-auto"
        onError={(error) => {
          console.error('Failed to render user content:', error);
          // Handle error - show fallback or error message
        }}
      />
    </div>
  );
}
```

### Email Template Preview
```tsx
import { DocyIsolatedHtmlView } from '@/components/ui/docy-isolated-html-view';

function EmailTemplatePreview({ template }: { template: string }) {
  const processedTemplate = template.replace(/{{(\w+)}}/g, '<span style="background: yellow; padding: 2px 4px; border-radius: 2px;">$1</span>');

  return (
    <div className="email-preview">
      <div className="mb-4">
        <h3>Email Template Preview</h3>
        <p className="text-sm text-gray-600">Variables are highlighted in yellow</p>
      </div>
      <DocyIsolatedHtmlView 
        content={processedTemplate}
        className="w-full h-80 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50"
      />
    </div>
  );
}
```

## Dependencies Required
- **React**: ^18.0.0
- **TypeScript**: ^5.0.0
- **Tailwind CSS**: v4.x
- **DOMPurify**: ^3.0.0 (optional, for HTML sanitization)

## Testing Requirements

### Unit Tests
- Content rendering and updates
- Ref method functionality
- Error handling for malformed HTML
- CSS reset application
- Component cleanup and memory management

### Integration Tests
- Parent-child isolation verification
- Event handler execution
- Dynamic content update performance
- Responsive behavior testing

### Accessibility Tests
- Iframe accessibility attributes
- Focus management
- Screen reader compatibility
- Keyboard navigation support

### Visual Tests
- CSS reset consistency across browsers
- Table rendering with proper styling
- Typography and spacing verification
- Mobile responsiveness

### Security Tests
- Content isolation verification
- XSS prevention testing
- Iframe sandbox effectiveness
- Script execution prevention

## Development Priority
**Medium** - Specialized component for content isolation and HTML preview functionality

## Notes
- The component provides complete isolation from parent styles and scripts
- CSS reset ensures consistent rendering across different browsers and contexts
- Table styling includes specific green header background matching design system
- Iframe sandbox prevents any JavaScript execution from user content
- Consider implementing HTML sanitization for user-generated content
- The component is optimized for email previews and document rendering
- Memory management is crucial for components with frequent content updates
- Consider adding loading states for large HTML content
- The CSS reset is specifically tuned for readability and consistency
- Component should handle edge cases like empty content or malformed HTML gracefully