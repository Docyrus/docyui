# DocyEmptyState Component

## Overview
DocyEmptyState is a comprehensive empty state component built with shadcn/ui patterns and Tailwind CSS v4. It provides a user-friendly interface for displaying empty states with customizable icons, text, and action buttons. It serves as a consistent way to handle empty data states, no results, and placeholder content throughout the Docyrus React application.

## Component Specification

### Props
| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `title` | string | - | No | Primary heading text for the empty state |
| `description` | string | - | No | Secondary descriptive text providing context |
| `icon` | string | - | No | Icon name to display above the text (uses DocyIcon) |
| `iconColor` | string | 'sky' | No | Icon color using Tailwind color tokens |
| `iconSize` | string | 'lg' | No | Icon size variant: 'sm', 'md', 'lg', 'xl' |
| `buttons` | ButtonConfig[] | - | No | Array of button configurations for actions |
| `variant` | string | 'default' | No | Layout variant: 'default', 'compact', 'card' |
| `className` | string | - | No | Additional CSS classes |
| `spacing` | string | 'default' | No | Spacing variant: 'tight', 'default', 'loose' |

### Button Configuration
```typescript
interface ButtonConfig {
  text: string;           // Button text (supports i18n keys)
  variant?: string;       // Button variant (default, outline, ghost, etc.)
  color?: string;         // Button color theme
  size?: string;          // Button size (sm, default, lg)
  icon?: string;          // Optional icon name
  onClick: () => void;    // Click handler function
  disabled?: boolean;     // Disabled state
  loading?: boolean;      // Loading state
}
```

### Variants
Built following shadcn/ui patterns:

1. **default**: Standard empty state with icon, text, and buttons
2. **compact**: Reduced spacing for tight layouts
3. **card**: Wrapped in a card container with border and background

### Size System
```typescript
const emptyStateVariants = cva({
  variants: {
    spacing: {
      tight: "px-4 py-6",
      default: "px-6 py-12",
      loose: "px-8 py-16"
    },
    variant: {
      default: "text-center",
      compact: "text-center",
      card: "text-center rounded-lg border bg-card p-6"
    }
  }
})
```

### Visual Design
- **Layout**: Centered content with hierarchical text sizes
- **Typography**: Clear title and muted description text
- **Icon**: Large, colored icon for visual emphasis
- **Actions**: Flexible button layout with proper spacing
- **Colors**: Semantic color system with muted text for subtlety

### Accessibility
- **Structure**: Proper heading hierarchy with semantic HTML
- **Focus**: Keyboard navigation support for action buttons
- **Screen Reader**: Descriptive text and proper ARIA labels
- **Contrast**: Sufficient color contrast for readability

## Component Requirements

### Technical Specifications
- **Framework**: React with TypeScript
- **Base Component**: Custom implementation (no direct shadcn/ui equivalent)
- **Integration**: Uses shadcn/ui design tokens and styling patterns
- **Styling**: shadcn/ui patterns with class-variance-authority
- **Internationalization**: Support for i18n text keys in button labels
- **Accessibility**: Full ARIA support, keyboard navigation, semantic HTML
- **Performance**: Optimized re-renders, proper memoization for button arrays

### Key Features Required
1. **Flexible Content**: Customizable title, description, and icon
2. **Icon Integration**: Seamless DocyIcon integration with color and size variants
3. **Action Buttons**: Dynamic button array with full DocyButton feature support
4. **Layout Variants**: Multiple layout options (default, compact, card)
5. **Spacing Control**: Configurable spacing for different contexts
6. **Internationalization**: Built-in i18n support for button text
7. **Semantic HTML**: Proper heading structure and accessibility
8. **Responsive Design**: Adapts to different screen sizes and containers

### Advanced Features
- **Button Array Management**: Dynamic rendering of multiple action buttons
- **Icon Color Theming**: Contextual icon colors matching design system
- **Layout Flexibility**: Variant system for different usage contexts
- **Event Handling**: Proper click event delegation for action buttons
- **Loading States**: Support for loading buttons within empty states

### Usage Examples
```tsx
// Basic empty state
<DocyEmptyState 
  title="No items found"
  description="There are no items to display at the moment."
  icon="inbox"
/>

// With action buttons
<DocyEmptyState 
  title="No documents"
  description="Create your first document to get started."
  icon="file-plus"
  iconColor="blue"
  buttons={[
    {
      text: "Create Document",
      variant: "default",
      icon: "plus",
      onClick: () => createDocument()
    },
    {
      text: "Upload File",
      variant: "outline",
      icon: "upload",
      onClick: () => uploadFile()
    }
  ]}
/>

// Compact variant
<DocyEmptyState 
  variant="compact"
  spacing="tight"
  title="No results"
  description="Try adjusting your search filters."
  icon="search"
  iconColor="gray"
/>

// Card variant
<DocyEmptyState 
  variant="card"
  title="Empty workspace"
  description="This workspace doesn't contain any content yet."
  icon="folder"
  iconColor="purple"
  buttons={[
    {
      text: "Add Content",
      variant: "default",
      onClick: () => addContent()
    }
  ]}
/>

// With internationalization
<DocyEmptyState 
  title="errors.no_data.title"
  description="errors.no_data.description"
  icon="database"
  buttons={[
    {
      text: "actions.refresh",
      variant: "outline",
      onClick: () => refresh()
    }
  ]}
/>

// Loading state with disabled button
<DocyEmptyState 
  title="Loading content..."
  description="Please wait while we fetch your data."
  icon="loader"
  iconColor="blue"
  buttons={[
    {
      text: "Cancel",
      variant: "ghost",
      onClick: () => cancel(),
      disabled: true
    }
  ]}
/>

// Multiple actions with different styles
<DocyEmptyState 
  title="Connection failed"
  description="Unable to connect to the server. Please check your connection."
  icon="wifi-off"
  iconColor="red"
  buttons={[
    {
      text: "Retry",
      variant: "default",
      icon: "refresh-cw",
      onClick: () => retry()
    },
    {
      text: "Go Offline",
      variant: "outline",
      onClick: () => goOffline()
    },
    {
      text: "Settings",
      variant: "ghost",
      icon: "settings",
      onClick: () => openSettings()
    }
  ]}
/>
```

### Dependencies Required
- `class-variance-authority`: Variant management
- `DocyIcon`: Icon component integration
- `DocyButton`: Button component integration
- `react-i18next`: Internationalization support (optional)

### Testing Requirements
1. **Unit Tests**: Variant rendering, button configuration, icon integration
2. **Integration Tests**: Button click handling, i18n text rendering
3. **Accessibility Tests**: ARIA attributes, keyboard navigation, screen reader compatibility
4. **Visual Tests**: All variants, spacing options, and icon color combinations
5. **Responsive Tests**: Layout adaptation across different screen sizes

## Development Priority
**Medium** - Important UX component for consistent empty state handling

## Notes
- Built with modern shadcn/ui patterns for consistency and maintainability
- Leverages Tailwind v4's CSS variable system for theme support
- Flexible button system allows for complex action combinations
- Internationalization support ensures global application compatibility
- Semantic HTML structure improves accessibility and SEO
- Responsive design adapts to various container sizes and layouts