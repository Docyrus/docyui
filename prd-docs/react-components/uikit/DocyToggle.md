# DocyToggle Component

## Overview
DocyToggle is a toggle button component built on shadcn/ui patterns that provides pressed/unpressed state functionality. It supports various sizes, variants, and accessibility features. It serves as the primary toggle button component throughout the Docyrus React application.

## Component Specification

### Props
| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-----------|
| `pressed` | boolean | false | No | Toggle pressed state |
| `defaultPressed` | boolean | false | No | Default pressed state |
| `onPressedChange` | function | - | No | Callback when pressed state changes |
| `disabled` | boolean | false | No | Disable toggle interaction |
| `size` | string | 'default' | No | Toggle size: 'sm', 'default', 'lg' |
| `variant` | string | 'default' | No | Toggle variant: 'default', 'outline' |
| `children` | ReactNode | - | No | Toggle content |
| `className` | string | - | No | Additional CSS classes |
| `aria-label` | string | - | No | Accessibility label |

### Variants
- **default**: Solid background when pressed
- **outline**: Outlined style with border

### Size System
```typescript
const toggleVariants = cva({
  variants: {
    size: {
      sm: "h-8 px-2 text-sm",
      default: "h-9 px-3",
      lg: "h-10 px-4"
    }
  }
})
```

### States
- **Unpressed**: Default inactive state
- **Pressed**: Active/selected state
- **Disabled**: Non-interactive state
- **Hover**: Hover state feedback
- **Focus**: Keyboard focus state

## Component Requirements

### Technical Specifications
- **Framework**: React with TypeScript
- **Base Component**: shadcn/ui Toggle (`pnpm dlx shadcn@latest add toggle`)
- **Extensions**: Size variants, enhanced states
- **Styling**: shadcn/ui patterns with class-variance-authority
- **Accessibility**: Full ARIA support, keyboard navigation
- **Performance**: Optimized state management
- **Form Integration**: Compatible with form libraries

### Key Features Required
1. **Toggle State**: Pressed/unpressed state management
2. **Size Variants**: Multiple sizes for different contexts
3. **Variant Styles**: Different visual styles
4. **Accessibility**: Screen reader support and keyboard navigation
5. **Icon Support**: Icons within toggle buttons
6. **Disabled State**: Non-interactive mode
7. **Form Integration**: Compatible with form libraries
8. **Keyboard Navigation**: Space and Enter key support

### Usage Examples
```tsx
// Basic toggle
<DocyToggle
  pressed={isPressed}
  onPressedChange={setIsPressed}
  aria-label="Toggle setting"
>
  Toggle
</DocyToggle>

// Icon toggle
<DocyToggle
  pressed={isBold}
  onPressedChange={setIsBold}
  aria-label="Bold text"
>
  <DocyIcon name="bold" size={16} />
</DocyToggle>

// Text formatting toggles
<div className="flex items-center space-x-1">
  <DocyToggle
    pressed={isBold}
    onPressedChange={setIsBold}
    size="sm"
    aria-label="Bold"
  >
    <DocyIcon name="bold" size={14} />
  </DocyToggle>
  
  <DocyToggle
    pressed={isItalic}
    onPressedChange={setIsItalic}
    size="sm"
    aria-label="Italic"
  >
    <DocyIcon name="italic" size={14} />
  </DocyToggle>
  
  <DocyToggle
    pressed={isUnderline}
    onPressedChange={setIsUnderline}
    size="sm"
    aria-label="Underline"
  >
    <DocyIcon name="underline" size={14} />
  </DocyToggle>
</div>

// View toggles
<div className="flex items-center space-x-1">
  <DocyToggle
    pressed={viewMode === 'grid'}
    onPressedChange={(pressed) => setViewMode(pressed ? 'grid' : 'list')}
    aria-label="Grid view"
  >
    <DocyIcon name="grid" size={16} />
  </DocyToggle>
  
  <DocyToggle
    pressed={viewMode === 'list'}
    onPressedChange={(pressed) => setViewMode(pressed ? 'list' : 'grid')}
    aria-label="List view"
  >
    <DocyIcon name="list" size={16} />
  </DocyToggle>
</div>

// Favorites toggle
<DocyToggle
  pressed={isFavorite}
  onPressedChange={setIsFavorite}
  variant="outline"
  aria-label="Add to favorites"
>
  <DocyIcon 
    name={isFavorite ? 'heart' : 'heart'} 
    size={16} 
    className={isFavorite ? 'text-red-500' : 'text-gray-400'}
  />
  {isFavorite ? 'Favorited' : 'Add to Favorites'}
</DocyToggle>

// Notification toggle
<DocyToggle
  pressed={notificationsEnabled}
  onPressedChange={setNotificationsEnabled}
  className="flex items-center space-x-2"
>
  <DocyIcon 
    name={notificationsEnabled ? 'bell' : 'bell-off'} 
    size={16} 
  />
  <span>{notificationsEnabled ? 'Notifications On' : 'Notifications Off'}</span>
</DocyToggle>

// Visibility toggle
<DocyToggle
  pressed={isVisible}
  onPressedChange={setIsVisible}
  aria-label="Toggle visibility"
>
  <DocyIcon 
    name={isVisible ? 'eye' : 'eye-off'} 
    size={16} 
  />
</DocyToggle>

// Auto-save toggle
<div className="flex items-center space-x-2">
  <DocyToggle
    pressed={autoSave}
    onPressedChange={setAutoSave}
    size="sm"
    aria-label="Auto-save"
  >
    <DocyIcon name="save" size={14} />
  </DocyToggle>
  <span className="text-sm">Auto-save</span>
</div>

// Filter toggles
<div className="flex flex-wrap gap-2">
  {filters.map((filter) => (
    <DocyToggle
      key={filter.id}
      pressed={activeFilters.includes(filter.id)}
      onPressedChange={(pressed) => {
        if (pressed) {
          setActiveFilters([...activeFilters, filter.id]);
        } else {
          setActiveFilters(activeFilters.filter(id => id !== filter.id));
        }
      }}
      size="sm"
      variant="outline"
    >
      {filter.label}
    </DocyToggle>
  ))}
</div>

// Media controls
<div className="flex items-center space-x-2">
  <DocyToggle
    pressed={isShuffled}
    onPressedChange={setIsShuffled}
    size="sm"
    aria-label="Shuffle"
  >
    <DocyIcon name="shuffle" size={16} />
  </DocyToggle>
  
  <DocyToggle
    pressed={isRepeating}
    onPressedChange={setIsRepeating}
    size="sm"
    aria-label="Repeat"
  >
    <DocyIcon name="repeat" size={16} />
  </DocyToggle>
  
  <DocyToggle
    pressed={isMuted}
    onPressedChange={setIsMuted}
    size="sm"
    aria-label="Mute"
  >
    <DocyIcon name={isMuted ? 'volume-x' : 'volume-2'} size={16} />
  </DocyToggle>
</div>

// Layout toggles
<div className="flex items-center space-x-1 border rounded p-1">
  <DocyToggle
    pressed={layout === 'sidebar'}
    onPressedChange={(pressed) => setLayout(pressed ? 'sidebar' : 'default')}
    size="sm"
    aria-label="Show sidebar"
  >
    <DocyIcon name="sidebar" size={14} />
  </DocyToggle>
  
  <DocyToggle
    pressed={layout === 'fullscreen'}
    onPressedChange={(pressed) => setLayout(pressed ? 'fullscreen' : 'default')}
    size="sm"
    aria-label="Fullscreen"
  >
    <DocyIcon name="maximize" size={14} />
  </DocyToggle>
</div>

// Theme toggle
<DocyToggle
  pressed={theme === 'dark'}
  onPressedChange={(pressed) => setTheme(pressed ? 'dark' : 'light')}
  aria-label="Dark mode"
>
  <DocyIcon name={theme === 'dark' ? 'moon' : 'sun'} size={16} />
  {theme === 'dark' ? 'Dark' : 'Light'}
</DocyToggle>

// Disabled toggle
<DocyToggle
  pressed={false}
  disabled
  aria-label="Disabled feature"
>
  <DocyIcon name="lock" size={16} />
  Disabled
</DocyToggle>

// Different sizes
<div className="flex items-center space-x-2">
  <DocyToggle size="sm" pressed={small} onPressedChange={setSmall}>
    Small
  </DocyToggle>
  
  <DocyToggle size="default" pressed={medium} onPressedChange={setMedium}>
    Default
  </DocyToggle>
  
  <DocyToggle size="lg" pressed={large} onPressedChange={setLarge}>
    Large
  </DocyToggle>
</div>

// Toolbar toggle group
<div className="flex items-center space-x-1 p-1 border rounded">
  <DocyToggle
    pressed={alignment === 'left'}
    onPressedChange={(pressed) => setAlignment(pressed ? 'left' : 'center')}
    size="sm"
    aria-label="Align left"
  >
    <DocyIcon name="align-left" size={14} />
  </DocyToggle>
  
  <DocyToggle
    pressed={alignment === 'center'}
    onPressedChange={(pressed) => setAlignment(pressed ? 'center' : 'left')}
    size="sm"
    aria-label="Align center"
  >
    <DocyIcon name="align-center" size={14} />
  </DocyToggle>
  
  <DocyToggle
    pressed={alignment === 'right'}
    onPressedChange={(pressed) => setAlignment(pressed ? 'right' : 'center')}
    size="sm"
    aria-label="Align right"
  >
    <DocyIcon name="align-right" size={14} />
  </DocyToggle>
</div>

// Settings toggle
<div className="space-y-4">
  <div className="flex items-center justify-between">
    <div>
      <div className="font-medium">Email Notifications</div>
      <div className="text-sm text-gray-600">Receive notifications via email</div>
    </div>
    <DocyToggle
      pressed={emailNotifications}
      onPressedChange={setEmailNotifications}
      aria-label="Email notifications"
    >
      {emailNotifications ? 'On' : 'Off'}
    </DocyToggle>
  </div>
  
  <div className="flex items-center justify-between">
    <div>
      <div className="font-medium">Push Notifications</div>
      <div className="text-sm text-gray-600">Receive push notifications</div>
    </div>
    <DocyToggle
      pressed={pushNotifications}
      onPressedChange={setPushNotifications}
      aria-label="Push notifications"
    >
      {pushNotifications ? 'On' : 'Off'}
    </DocyToggle>
  </div>
</div>

// Form integration
<form className="space-y-4">
  <div className="flex items-center space-x-2">
    <DocyToggle
      pressed={agreedToTerms}
      onPressedChange={setAgreedToTerms}
      size="sm"
      aria-label="Agree to terms"
    >
      <DocyIcon name="check" size={14} />
    </DocyToggle>
    <label className="text-sm">I agree to the terms and conditions</label>
  </div>
  
  <div className="flex items-center space-x-2">
    <DocyToggle
      pressed={subscribeNewsletter}
      onPressedChange={setSubscribeNewsletter}
      size="sm"
      aria-label="Subscribe to newsletter"
    >
      <DocyIcon name="mail" size={14} />
    </DocyToggle>
    <label className="text-sm">Subscribe to newsletter</label>
  </div>
  
  <DocyButton type="submit" disabled={!agreedToTerms}>
    Submit
  </DocyButton>
</form>
```

### Integration Requirements
- **DocyIcon**: Icons within toggle buttons
- **Form Libraries**: React Hook Form integration
- **Theme System**: Consistent styling
- **Keyboard Handler**: Keyboard interaction support

### Accessibility Requirements
- **ARIA Attributes**: pressed, label, describedby
- **Keyboard Navigation**: Space, Enter keys
- **Screen Reader Support**: State announcements
- **Focus Management**: Clear focus indicators
- **Semantic HTML**: Proper button semantics

### Performance Optimization
- **Efficient State**: Optimized state updates
- **Event Handling**: Proper event management
- **Memory Management**: Cleanup of event listeners
- **Render Optimization**: Prevent unnecessary re-renders

### Testing Requirements
1. **Unit Tests**: State changes, keyboard interaction
2. **Integration Tests**: Form integration, icon display
3. **Accessibility Tests**: ARIA attributes, keyboard navigation
4. **Visual Tests**: All variants and sizes
5. **Interaction Tests**: Click, keyboard, touch interactions
6. **Form Tests**: Form submission, validation

## Development Priority
**Medium** - Useful for toggle functionality and toolbar interfaces

## Notes
- Built with modern shadcn/ui patterns for consistency
- Optimized for toolbar and settings interfaces
- Full accessibility compliance with WCAG guidelines
- TypeScript support with comprehensive type safety
- Flexible styling and customization options
- Integrates seamlessly with form libraries
- Supports complex toggle scenarios
