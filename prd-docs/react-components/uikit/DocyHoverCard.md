# DocyHoverCard Component

## Overview
DocyHoverCard is a hover-triggered card component built on shadcn/ui patterns that displays rich content on hover. It supports various content types, positioning, and accessibility features. It serves as the primary hover card component throughout the Docyrus React application.

## Component Specification

### Props
| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-----------|
| `children` | ReactNode | - | Yes | Trigger element |
| `content` | ReactNode | - | Yes | Card content |
| `side` | string | 'bottom' | No | Card position: 'top', 'right', 'bottom', 'left' |
| `align` | string | 'center' | No | Card alignment: 'start', 'center', 'end' |
| `sideOffset` | number | 8 | No | Distance from trigger |
| `alignOffset` | number | 0 | No | Alignment offset |
| `openDelay` | number | 700 | No | Delay before showing (ms) |
| `closeDelay` | number | 300 | No | Delay before hiding (ms) |
| `disabled` | boolean | false | No | Disable hover card |
| `className` | string | - | No | Additional CSS classes |
| `contentClassName` | string | - | No | Content CSS classes |
| `arrowClassName` | string | - | No | Arrow CSS classes |
| `avoidCollisions` | boolean | true | No | Avoid viewport collisions |
| `collisionBoundary` | Element | - | No | Collision boundary element |
| `sticky` | string | 'partial' | No | Sticky behavior |

### Content Types
- **User Profile**: User information and stats
- **Link Preview**: URL preview with metadata
- **Image Preview**: Larger image view
- **Quick Info**: Contextual information
- **Rich Content**: Custom HTML/React content

### Positioning Options
- **Side**: Controls which side of trigger the card appears
- **Align**: Controls alignment along the side
- **Offset**: Distance and alignment adjustments
- **Collision**: Automatic repositioning

### Hover Behavior
- **Delay**: Configurable show/hide delays
- **Persistent**: Card stays open when hovered
- **Dismissible**: Closes when clicking outside
- **Smooth**: Smooth transitions

## Component Requirements

### Technical Specifications
- **Framework**: React with TypeScript
- **Base Component**: shadcn/ui Hover Card (`pnpm dlx shadcn@latest add hover-card`)
- **Extensions**: Rich content support, positioning options
- **Styling**: shadcn/ui patterns with class-variance-authority
- **Accessibility**: Full ARIA support, keyboard navigation
- **Performance**: Optimized rendering and positioning
- **Portal**: Proper DOM positioning

### Key Features Required
1. **Hover Trigger**: Show card on mouse hover
2. **Rich Content**: Support for complex card content
3. **Smart Positioning**: Automatic collision detection
4. **Configurable Delays**: Customizable show/hide timing
5. **Accessibility**: Keyboard navigation and screen reader support
6. **Performance**: Efficient rendering and positioning
7. **Smooth Animation**: Fluid show/hide transitions
8. **Portal Support**: Proper DOM positioning

### Usage Examples
```tsx
// Basic hover card
<DocyHoverCard
  content={
    <div className="p-4 w-80">
      <h3 className="font-semibold mb-2">More Information</h3>
      <p className="text-sm text-gray-600">
        This is additional information that appears when you hover over the trigger element.
      </p>
    </div>
  }
>
  <DocyButton variant="outline">Hover for info</DocyButton>
</DocyHoverCard>

// User profile hover card
<DocyHoverCard
  content={
    <div className="p-4 w-72">
      <div className="flex items-center gap-3 mb-3">
        <DocyAvatar src={user.avatar} size="lg" />
        <div>
          <h3 className="font-semibold">{user.name}</h3>
          <p className="text-sm text-gray-600">{user.role}</p>
        </div>
      </div>
      <p className="text-sm text-gray-600 mb-3">{user.bio}</p>
      <div className="flex gap-4 text-sm">
        <div>
          <span className="font-medium">{user.followers}</span>
          <span className="text-gray-600 ml-1">Followers</span>
        </div>
        <div>
          <span className="font-medium">{user.following}</span>
          <span className="text-gray-600 ml-1">Following</span>
        </div>
      </div>
      <div className="flex gap-2 mt-3">
        <DocyButton size="sm">Follow</DocyButton>
        <DocyButton size="sm" variant="outline">Message</DocyButton>
      </div>
    </div>
  }
  openDelay={500}
>
  <DocyAvatar src={user.avatar} size="md" className="cursor-pointer" />
</DocyHoverCard>

// Link preview hover card
<DocyHoverCard
  content={
    <div className="p-0 w-80 overflow-hidden">
      <img 
        src={linkPreview.image} 
        alt={linkPreview.title}
        className="w-full h-40 object-cover"
      />
      <div className="p-4">
        <h3 className="font-semibold mb-1">{linkPreview.title}</h3>
        <p className="text-sm text-gray-600 mb-2">{linkPreview.description}</p>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <img src={linkPreview.favicon} alt="" className="w-4 h-4" />
          <span>{linkPreview.domain}</span>
        </div>
      </div>
    </div>
  }
>
  <a href={linkPreview.url} className="text-blue-600 hover:underline">
    {linkPreview.title}
  </a>
</DocyHoverCard>

// Image preview hover card
<DocyHoverCard
  content={
    <div className="p-2">
      <img 
        src={image.fullSize} 
        alt={image.alt}
        className="max-w-md max-h-80 object-contain"
      />
      {image.caption && (
        <p className="text-sm text-gray-600 mt-2 text-center">
          {image.caption}
        </p>
      )}
    </div>
  }
  side="right"
>
  <img 
    src={image.thumbnail} 
    alt={image.alt}
    className="w-16 h-16 object-cover rounded cursor-pointer"
  />
</DocyHoverCard>

// Repository hover card
<DocyHoverCard
  content={
    <div className="p-4 w-80">
      <div className="flex items-center gap-2 mb-3">
        <DocyIcon name="folder" size={20} />
        <h3 className="font-semibold">{repo.name}</h3>
        <DocyBadge variant="secondary" className="ml-auto">
          {repo.visibility}
        </DocyBadge>
      </div>
      <p className="text-sm text-gray-600 mb-3">{repo.description}</p>
      <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-blue-500 rounded-full" />
          <span>{repo.language}</span>
        </div>
        <div className="flex items-center gap-1">
          <DocyIcon name="star" size={14} />
          <span>{repo.stars}</span>
        </div>
        <div className="flex items-center gap-1">
          <DocyIcon name="git-fork" size={14} />
          <span>{repo.forks}</span>
        </div>
      </div>
      <div className="flex gap-2">
        <DocyButton size="sm" variant="outline">
          <DocyIcon name="star" size={14} className="mr-1" />
          Star
        </DocyButton>
        <DocyButton size="sm" variant="outline">
          <DocyIcon name="git-fork" size={14} className="mr-1" />
          Fork
        </DocyButton>
      </div>
    </div>
  }
>
  <a href={repo.url} className="text-blue-600 hover:underline font-medium">
    {repo.name}
  </a>
</DocyHoverCard>

// Status hover card
<DocyHoverCard
  content={
    <div className="p-3 w-64">
      <div className="flex items-center gap-2 mb-2">
        <div className={`w-2 h-2 rounded-full ${
          status.health === 'healthy' ? 'bg-green-500' : 
          status.health === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
        }`} />
        <span className="font-medium">{status.service}</span>
      </div>
      <div className="space-y-1 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">Status:</span>
          <span className={status.health === 'healthy' ? 'text-green-600' : 'text-red-600'}>
            {status.health}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Uptime:</span>
          <span>{status.uptime}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Response Time:</span>
          <span>{status.responseTime}ms</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Last Check:</span>
          <span>{status.lastCheck}</span>
        </div>
      </div>
    </div>
  }
>
  <div className="flex items-center gap-2 cursor-pointer">
    <div className={`w-2 h-2 rounded-full ${
      status.health === 'healthy' ? 'bg-green-500' : 'bg-red-500'
    }`} />
    <span className="text-sm">{status.service}</span>
  </div>
</DocyHoverCard>

// Chart data hover card
<DocyHoverCard
  content={
    <div className="p-3 w-48">
      <div className="text-sm">
        <div className="font-medium mb-1">{dataPoint.date}</div>
        <div className="space-y-1">
          <div className="flex justify-between">
            <span className="text-gray-600">Value:</span>
            <span className="font-medium">{dataPoint.value}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Change:</span>
            <span className={`font-medium ${
              dataPoint.change > 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {dataPoint.change > 0 ? '+' : ''}{dataPoint.change}%
            </span>
          </div>
        </div>
      </div>
    </div>
  }
>
  <div className="w-3 h-3 bg-blue-500 rounded-full cursor-pointer" />
</DocyHoverCard>

// File info hover card
<DocyHoverCard
  content={
    <div className="p-3 w-64">
      <div className="flex items-center gap-2 mb-2">
        <DocyIcon name="file" size={16} />
        <span className="font-medium">{file.name}</span>
      </div>
      <div className="space-y-1 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">Size:</span>
          <span>{file.size}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Type:</span>
          <span>{file.type}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Modified:</span>
          <span>{file.modified}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Created:</span>
          <span>{file.created}</span>
        </div>
      </div>
      <div className="mt-3 pt-2 border-t">
        <DocyButton size="sm" variant="outline" className="w-full">
          Open File
        </DocyButton>
      </div>
    </div>
  }
>
  <div className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded cursor-pointer">
    <DocyIcon name="file" size={16} />
    <span className="text-sm">{file.name}</span>
  </div>
</DocyHoverCard>

// Custom positioning
<DocyHoverCard
  content={<div className="p-4">Custom positioned card</div>}
  side="left"
  align="start"
  sideOffset={12}
  alignOffset={-8}
>
  <DocyButton>Custom Position</DocyButton>
</DocyHoverCard>

// Disabled hover card
<DocyHoverCard
  content={<div className="p-4">This won't show</div>}
  disabled
>
  <DocyButton disabled>Disabled Hover</DocyButton>
</DocyHoverCard>
```

### Integration Requirements
- **DocyAvatar**: User avatars in profile cards
- **DocyIcon**: Icons within card content
- **DocyButton**: Action buttons in cards
- **DocyBadge**: Status indicators
- **Portal**: Proper DOM positioning
- **Animation**: Smooth transitions

### Accessibility Requirements
- **ARIA Attributes**: haspopup, expanded, describedby
- **Keyboard Navigation**: Tab, Enter, Escape
- **Screen Reader Support**: Proper announcements
- **Focus Management**: Focus indicators
- **Reduced Motion**: Respect user preferences

### Performance Optimization
- **Lazy Loading**: Load content on demand
- **Debounced Hover**: Prevent excessive updates
- **Portal Optimization**: Efficient DOM updates
- **Memory Management**: Proper cleanup

### Testing Requirements
1. **Unit Tests**: Hover behavior, positioning, content rendering
2. **Integration Tests**: Complex content, interactions
3. **Accessibility Tests**: ARIA attributes, keyboard navigation
4. **Visual Tests**: All positions and content types
5. **Performance Tests**: Frequent hover interactions
6. **Mobile Tests**: Touch interactions, responsive behavior

## Development Priority
**Medium** - Useful component for rich contextual information

## Notes
- Built with modern shadcn/ui patterns for consistency
- Optimized for rich content display
- Full accessibility compliance with WCAG guidelines
- TypeScript support with comprehensive type safety
- Flexible positioning system
- Smooth animations and transitions
- Extensible for custom content types
