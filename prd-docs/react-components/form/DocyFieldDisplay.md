# DocyFieldDisplay Component

## Overview
DocyFieldDisplay is a specialized read-only display component that extends DocyFieldBase to provide rich, formatted content display functionality. Unlike input fields, this component focuses on presenting data in various formats with advanced rendering capabilities including rich text, markdown, HTML, and interactive elements. It serves as the primary component for displaying read-only data in forms and data views.

This component is designed for scenarios where data needs to be displayed with formatting, transformation, or interactive features while maintaining the consistent field structure provided by DocyFieldBase.

## Component Specification

### Props
DocyFieldDisplay inherits ALL props from DocyFieldBase and adds the following display-specific properties:

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `value` | any | - | No | The value to display |
| `format` | string | - | No | Display format (date, number, currency, percentage, etc.) |
| `formatter` | function | - | No | Custom formatter function for value transformation |
| `emptyText` | string | 'No data' | No | Text to display when value is empty |
| `emptyIcon` | string | - | No | Icon to display when value is empty |
| `showEmpty` | boolean | true | No | Whether to show empty state |
| `clickable` | boolean | false | No | Make the displayed value clickable |
| `copyable` | boolean | false | No | Add copy to clipboard functionality |
| `truncate` | boolean | false | No | Truncate long values with ellipsis |
| `maxLength` | number | - | No | Maximum display length before truncation |
| `showTooltip` | boolean | false | No | Show full value in tooltip when truncated |
| `prefix` | string | - | No | Prefix text or icon to display before value |
| `suffix` | string | - | No | Suffix text or icon to display after value |
| `transform` | function | - | No | Value transformation function |
| `rich` | boolean | false | No | Enable rich text rendering |
| `markdown` | boolean | false | No | Enable markdown rendering |
| `html` | boolean | false | No | Enable HTML rendering (sanitized) |
| `link` | boolean | false | No | Auto-detect and render URLs as links |
| `linkTarget` | string | '_blank' | No | Target attribute for links |
| `badge` | boolean | false | No | Render value as a badge |
| `badgeVariant` | string | 'default' | No | Badge variant (default, secondary, destructive, outline) |
| `icon` | string | - | No | Icon to display alongside value |
| `iconPosition` | 'left' \| 'right' | 'left' | No | Position of icon relative to value |
| `color` | string | - | No | Text color override |
| `size` | string | 'sm' | No | Text size (xs, sm, base, lg, xl, 2xl, etc.) |
| `weight` | string | - | No | Font weight (normal, medium, semibold, bold) |
| `variant` | string | 'default' | No | Display variant (default, muted, accent, success, warning, error) |
| `onClick` | function | - | No | Click handler for clickable displays |
| `onCopy` | function | - | No | Callback when value is copied |

**Note**: DocyFieldDisplay inherits all DocyFieldBase props including validation, layout, dynamic computed properties, and more. See [DocyFieldBase documentation](./DocyFieldBase.md) for the complete list.

### TypeScript Interfaces

```typescript
interface DocyFieldDisplayProps extends DocyFieldBaseProps {
  value?: any;
  format?: 'date' | 'datetime' | 'time' | 'number' | 'currency' | 'percentage' | 'bytes' | 'duration' | 'relative-time' | string;
  formatter?: (value: any) => string;
  emptyText?: string;
  emptyIcon?: string;
  showEmpty?: boolean;
  clickable?: boolean;
  copyable?: boolean;
  truncate?: boolean;
  maxLength?: number;
  showTooltip?: boolean;
  prefix?: string;
  suffix?: string;
  transform?: (value: any) => any;
  rich?: boolean;
  markdown?: boolean;
  html?: boolean;
  link?: boolean;
  linkTarget?: string;
  badge?: boolean;
  badgeVariant?: 'default' | 'secondary' | 'destructive' | 'outline';
  icon?: string;
  iconPosition?: 'left' | 'right';
  color?: string;
  size?: string;
  weight?: string;
  variant?: 'default' | 'muted' | 'accent' | 'success' | 'warning' | 'error';
  onClick?: (value: any) => void;
  onCopy?: (value: any) => void;
}

interface FormatOptions {
  locale?: string;
  currency?: string;
  precision?: number;
  unitDisplay?: 'short' | 'long' | 'narrow';
  notation?: 'standard' | 'scientific' | 'engineering' | 'compact';
}

interface DisplayState {
  isHovered: boolean;
  isTruncated: boolean;
  showTooltip: boolean;
  copiedRecently: boolean;
}
```

### Behavior

1. **Value Formatting**:
   - Built-in formatters for common data types (dates, numbers, currency, etc.)
   - Custom formatter functions for complex transformations
   - Locale-aware formatting with internationalization support
   - Automatic type detection and appropriate formatting

2. **Rich Content Rendering**:
   - **Rich Text Mode**: Renders formatted text with emphasis, links, and styling
   - **Markdown Mode**: Parses and renders markdown content with syntax highlighting
   - **HTML Mode**: Sanitized HTML rendering with XSS protection
   - **Link Detection**: Automatic URL detection and clickable link creation

3. **Interactive Features**:
   - **Copy to Clipboard**: One-click copying with visual feedback
   - **Clickable Values**: Custom click handlers for interactive data
   - **Tooltip Support**: Full value display on hover for truncated content
   - **Keyboard Navigation**: Full accessibility support

4. **Value Transformation**:
   - **Pre-display transformation**: Transform values before formatting
   - **Empty state handling**: Configurable display for null/empty values
   - **Truncation**: Smart truncation with ellipsis and tooltip
   - **Prefix/Suffix**: Additional context display

5. **Visual Variants**:
   - **Badge Mode**: Render values as colored badges
   - **Icon Integration**: Icons alongside values for context
   - **Color Theming**: Semantic color variants (success, warning, error, etc.)
   - **Size Variants**: Responsive text sizing

## Component Requirements

### Technical Specifications
- **Framework**: React 18+ with TypeScript
- **Base Component**: Custom implementation (no direct shadcn/ui equivalent) using shadcn/ui design patterns
- **Integration**: Uses shadcn/ui Badge, Typography, and Tooltip components
- **Wrapper**: Extends DocyFieldBase for consistent field structure
- **Styling**: shadcn/ui patterns with Tailwind CSS v4
- **Sanitization**: DOMPurify for safe HTML rendering
- **Markdown**: Markdown parser with syntax highlighting
- **Accessibility**: WCAG 2.1 AA compliance

### Key Features Required
1. **Rich Content Support**: Markdown, HTML, and rich text rendering
2. **Format System**: Built-in formatters for common data types
3. **Interactive Elements**: Copy functionality and clickable values
4. **Truncation System**: Smart truncation with tooltip support
5. **Badge Rendering**: Styled badge display for status and tags
6. **Empty State**: Configurable empty value display
7. **Accessibility**: Complete keyboard navigation and screen reader support

### Usage Examples

```tsx
// Basic display field
<DocyFieldDisplay
  name="companyName"
  label="Company Name"
  value="Acme Corporation"
/>

// Formatted date display
<DocyFieldDisplay
  name="createdDate"
  label="Created Date"
  value={new Date('2024-01-15')}
  format="date"
/>

// Currency display with copy functionality
<DocyFieldDisplay
  name="totalAmount"
  label="Total Amount"
  value={1234.56}
  format="currency"
  copyable={true}
  prefix="$"
  onCopy={(value) => toast.success('Amount copied!')}
/>

// Badge display for status
<DocyFieldDisplay
  name="status"
  label="Status"
  value="active"
  badge={true}
  badgeVariant="success"
  transform={(value) => value.toUpperCase()}
/>

// Clickable display with custom action
<DocyFieldDisplay
  name="email"
  label="Email Address"
  value="user@example.com"
  clickable={true}
  icon="envelope"
  onClick={(email) => window.location.href = `mailto:${email}`}
/>

// Truncated text with tooltip
<DocyFieldDisplay
  name="description"
  label="Description"
  value="This is a very long description that needs to be truncated..."
  truncate={true}
  maxLength={50}
  showTooltip={true}
/>

// Rich text display with markdown
<DocyFieldDisplay
  name="notes"
  label="Notes"
  value="**Important:** This is a *formatted* note with [links](https://example.com)"
  markdown={true}
  rich={true}
/>

// HTML content display (sanitized)
<DocyFieldDisplay
  name="content"
  label="Content"
  value="<p>This is <strong>HTML</strong> content with <em>formatting</em></p>"
  html={true}
/>

// Number formatting with custom options
<DocyFieldDisplay
  name="fileSize"
  label="File Size"
  value={1024000}
  format="bytes"
  formatter={(bytes) => {
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`;
  }}
/>

// Empty state display
<DocyFieldDisplay
  name="optional"
  label="Optional Field"
  value={null}
  emptyText="Not provided"
  emptyIcon="info"
  showEmpty={true}
/>

// Complete form integration with computed properties
<DocyFieldDisplay
  name="fullName"
  label="Full Name"
  computedFormula="firstName + ' ' + lastName"
  copyable={true}
  clickable={true}
  onClick={(name) => openUserProfile(name)}
/>

// Link detection and rendering
<DocyFieldDisplay
  name="website"
  label="Website"
  value="https://example.com"
  link={true}
  linkTarget="_blank"
  icon="external-link"
  iconPosition="right"
/>

// Percentage display with color coding
<DocyFieldDisplay
  name="progress"
  label="Progress"
  value={0.75}
  format="percentage"
  variant={value > 0.8 ? 'success' : value > 0.5 ? 'warning' : 'error'}
  badge={true}
/>

// Custom formatter with complex logic
<DocyFieldDisplay
  name="lastSeen"
  label="Last Seen"
  value={new Date('2024-01-10')}
  formatter={(date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days} days ago`;
    return date.toLocaleDateString();
  }}
  color="muted"
/>

// Array value display with transformation
<DocyFieldDisplay
  name="tags"
  label="Tags"
  value={['react', 'typescript', 'forms']}
  transform={(tags) => tags.join(', ')}
  badge={true}
  badgeVariant="secondary"
/>

// Conditional display with computed visibility
<DocyFieldDisplay
  name="adminNotes"
  label="Admin Notes"
  value="Internal administrative notes"
  computedHidden={{ field: 'userRole', operator: 'not-equals', value: 'admin' }}
  variant="muted"
  size="sm"
/>
```

### Integration Requirements
- **DocyFieldBase**: Base wrapper component (required)
- **DocyBadge**: For badge rendering
- **DocyIcon**: For icon display
- **DocyTooltip**: For tooltip functionality
- **DocyTypography**: For text styling
- **Markdown Parser**: For markdown content rendering
- **DOMPurify**: For HTML sanitization
- **Copy to Clipboard**: For copy functionality

### Dependencies Required
- `react-hook-form`: Form state management (inherited from DocyFieldBase)
- `dompurify`: HTML sanitization for safe rendering
- `marked` or `remark`: Markdown parsing and rendering
- `prismjs`: Syntax highlighting for code blocks
- `@radix-ui/react-tooltip`: Tooltip functionality
- `class-variance-authority`: Variant management
- All DocyFieldBase dependencies

### Testing Requirements
1. **Unit Tests**: Value formatting, transformation functions, display variants
2. **Integration Tests**: DocyFieldBase integration, form context
3. **Visual Tests**: All display variants, responsive behavior, truncation
4. **Accessibility Tests**: Screen reader support, keyboard navigation, ARIA attributes
5. **Security Tests**: HTML sanitization, XSS prevention
6. **Performance Tests**: Large content rendering, markdown parsing
7. **Format Tests**: All built-in formatters, custom formatters, locale support

## Development Priority
**Medium** - Important display component for read-only data presentation

## Notes
- Built with shadcn/ui design patterns for consistency with the design system
- Focuses on read-only display rather than input functionality
- Comprehensive formatting system supports various data types
- Rich content rendering with security considerations
- Interactive features enhance user experience
- Accessibility compliance ensures inclusive design
- Performance optimized for large datasets and complex formatting
- Extensible architecture allows for custom formatters and transformations