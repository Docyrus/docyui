# DocySkeleton Component

## Overview
DocySkeleton is a loading skeleton component built on shadcn/ui patterns that provides placeholder content while data is loading. It supports various shapes, sizes, and animation effects. It serves as the primary loading placeholder component throughout the Docyrus React application.

## Component Specification

### Props
| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-----------|
| `className` | string | - | No | Additional CSS classes |
| `width` | string/number | '100%' | No | Skeleton width |
| `height` | string/number | '1rem' | No | Skeleton height |
| `variant` | string | 'default' | No | Skeleton variant: 'default', 'text', 'circular', 'rectangular' |
| `animation` | string | 'pulse' | No | Animation type: 'pulse', 'wave', 'none' |
| `lines` | number | 1 | No | Number of skeleton lines |
| `loading` | boolean | true | No | Show skeleton when loading |
| `children` | ReactNode | - | No | Content to show when not loading |

### Skeleton Variants
- **default**: Basic rectangular skeleton
- **text**: Text line skeleton with appropriate height
- **circular**: Circular skeleton for avatars
- **rectangular**: Rectangular skeleton for images/cards

### Animation Types
- **pulse**: Pulsing opacity animation
- **wave**: Shimmer wave animation
- **none**: No animation (static)

### Common Patterns
- **Avatar**: Circular skeleton for user avatars
- **Text**: Multiple lines for text content
- **Card**: Rectangular skeleton for content cards
- **Button**: Button-shaped skeleton
- **Image**: Image placeholder skeleton

## Component Requirements

### Technical Specifications
- **Framework**: React with TypeScript
- **Base Component**: shadcn/ui Skeleton (`pnpm dlx shadcn@latest add skeleton`)
- **Extensions**: Multiple variants, animation types, line support
- **Styling**: shadcn/ui patterns with class-variance-authority
- **Accessibility**: Proper ARIA attributes for loading states
- **Performance**: Optimized animations and rendering
- **Responsive**: Adaptive sizing and layout

### Key Features Required
1. **Multiple Variants**: Different skeleton shapes and styles
2. **Animation Options**: Pulse, wave, and static animations
3. **Flexible Sizing**: Customizable width and height
4. **Line Support**: Multiple skeleton lines for text
5. **Loading States**: Conditional rendering based on loading state
6. **Accessibility**: Screen reader support for loading states
7. **Performance**: Smooth animations without blocking UI
8. **Responsive**: Adaptive sizing for different screen sizes

### Usage Examples
```tsx
// Basic skeleton
<DocySkeleton className="h-4 w-full" />

// Avatar skeleton
<DocySkeleton variant="circular" className="h-12 w-12" />

// Text skeleton with multiple lines
<DocySkeleton variant="text" lines={3} />

// Card skeleton
<div className="space-y-3">
  <DocySkeleton variant="rectangular" className="h-48 w-full" />
  <DocySkeleton variant="text" className="h-4 w-3/4" />
  <DocySkeleton variant="text" className="h-4 w-1/2" />
</div>

// User card skeleton
<div className="flex items-center space-x-4">
  <DocySkeleton variant="circular" className="h-10 w-10" />
  <div className="space-y-2">
    <DocySkeleton variant="text" className="h-4 w-32" />
    <DocySkeleton variant="text" className="h-3 w-24" />
  </div>
</div>

// Table skeleton
<div className="space-y-2">
  <div className="flex space-x-4">
    <DocySkeleton className="h-4 w-1/4" />
    <DocySkeleton className="h-4 w-1/4" />
    <DocySkeleton className="h-4 w-1/4" />
    <DocySkeleton className="h-4 w-1/4" />
  </div>
  {Array.from({ length: 5 }, (_, i) => (
    <div key={i} className="flex space-x-4">
      <DocySkeleton className="h-4 w-1/4" />
      <DocySkeleton className="h-4 w-1/4" />
      <DocySkeleton className="h-4 w-1/4" />
      <DocySkeleton className="h-4 w-1/4" />
    </div>
  ))}
</div>

// Dashboard skeleton
<div className="space-y-6">
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    {Array.from({ length: 3 }, (_, i) => (
      <div key={i} className="p-4 border rounded-lg">
        <DocySkeleton className="h-6 w-1/2 mb-2" />
        <DocySkeleton className="h-8 w-full" />
      </div>
    ))}
  </div>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div className="space-y-4">
      <DocySkeleton className="h-6 w-1/3" />
      <DocySkeleton variant="rectangular" className="h-64 w-full" />
    </div>
    <div className="space-y-4">
      <DocySkeleton className="h-6 w-1/3" />
      <div className="space-y-2">
        {Array.from({ length: 8 }, (_, i) => (
          <div key={i} className="flex items-center space-x-3">
            <DocySkeleton variant="circular" className="h-8 w-8" />
            <div className="space-y-1">
              <DocySkeleton className="h-4 w-32" />
              <DocySkeleton className="h-3 w-24" />
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
</div>

// Blog post skeleton
<article className="space-y-4">
  <DocySkeleton variant="rectangular" className="h-48 w-full" />
  <DocySkeleton className="h-8 w-3/4" />
  <div className="flex items-center space-x-4">
    <DocySkeleton variant="circular" className="h-10 w-10" />
    <div className="space-y-1">
      <DocySkeleton className="h-4 w-24" />
      <DocySkeleton className="h-3 w-32" />
    </div>
  </div>
  <div className="space-y-2">
    <DocySkeleton variant="text" lines={4} />
  </div>
</article>

// Chat skeleton
<div className="space-y-4">
  {Array.from({ length: 5 }, (_, i) => (
    <div key={i} className={`flex ${i % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
      <div className={`flex items-start space-x-3 max-w-xs ${
        i % 2 === 0 ? 'flex-row' : 'flex-row-reverse space-x-reverse'
      }`}>
        <DocySkeleton variant="circular" className="h-8 w-8" />
        <div className="space-y-1">
          <DocySkeleton className="h-4 w-48" />
          <DocySkeleton className="h-4 w-32" />
        </div>
      </div>
    </div>
  ))}
</div>

// Product grid skeleton
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {Array.from({ length: 9 }, (_, i) => (
    <div key={i} className="border rounded-lg p-4">
      <DocySkeleton variant="rectangular" className="h-48 w-full mb-4" />
      <DocySkeleton className="h-6 w-full mb-2" />
      <DocySkeleton className="h-4 w-3/4 mb-2" />
      <DocySkeleton className="h-5 w-1/4" />
    </div>
  ))}
</div>

// Settings skeleton
<div className="space-y-6">
  <div className="space-y-4">
    <DocySkeleton className="h-6 w-1/4" />
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <DocySkeleton className="h-4 w-1/3" />
        <DocySkeleton className="h-6 w-12" />
      </div>
      <div className="flex items-center justify-between">
        <DocySkeleton className="h-4 w-1/4" />
        <DocySkeleton className="h-6 w-12" />
      </div>
      <div className="flex items-center justify-between">
        <DocySkeleton className="h-4 w-1/2" />
        <DocySkeleton className="h-6 w-12" />
      </div>
    </div>
  </div>
  <div className="space-y-4">
    <DocySkeleton className="h-6 w-1/4" />
    <div className="space-y-3">
      <DocySkeleton className="h-10 w-full" />
      <DocySkeleton className="h-10 w-full" />
      <DocySkeleton className="h-20 w-full" />
    </div>
  </div>
</div>

// Profile skeleton
<div className="space-y-6">
  <div className="flex items-center space-x-6">
    <DocySkeleton variant="circular" className="h-24 w-24" />
    <div className="space-y-2">
      <DocySkeleton className="h-6 w-48" />
      <DocySkeleton className="h-4 w-32" />
      <DocySkeleton className="h-4 w-40" />
    </div>
  </div>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    {Array.from({ length: 3 }, (_, i) => (
      <div key={i} className="text-center">
        <DocySkeleton className="h-8 w-16 mx-auto mb-2" />
        <DocySkeleton className="h-4 w-20 mx-auto" />
      </div>
    ))}
  </div>
</div>

// Wave animation skeleton
<DocySkeleton 
  animation="wave" 
  className="h-4 w-full" 
/>

// No animation skeleton
<DocySkeleton 
  animation="none" 
  className="h-4 w-full" 
/>

// Conditional skeleton
<DocySkeleton loading={isLoading}>
  <div className="p-4">
    <h3 className="text-lg font-semibold mb-2">Loaded Content</h3>
    <p>This content is shown when loading is complete.</p>
  </div>
</DocySkeleton>

// Custom skeleton component
function ProductCardSkeleton() {
  return (
    <div className="border rounded-lg p-4 space-y-4">
      <DocySkeleton variant="rectangular" className="h-48 w-full" />
      <div className="space-y-2">
        <DocySkeleton className="h-6 w-full" />
        <DocySkeleton className="h-4 w-3/4" />
        <div className="flex items-center justify-between">
          <DocySkeleton className="h-5 w-1/4" />
          <DocySkeleton className="h-8 w-20" />
        </div>
      </div>
    </div>
  );
}

// Data fetching skeleton
function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers().then(data => {
      setUsers(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 5 }, (_, i) => (
          <div key={i} className="flex items-center space-x-4">
            <DocySkeleton variant="circular" className="h-10 w-10" />
            <div className="space-y-2">
              <DocySkeleton className="h-4 w-32" />
              <DocySkeleton className="h-3 w-24" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {users.map(user => (
        <div key={user.id} className="flex items-center space-x-4">
          <DocyAvatar src={user.avatar} />
          <div>
            <div className="font-medium">{user.name}</div>
            <div className="text-sm text-gray-500">{user.email}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
```

### Integration Requirements
- **Loading States**: Integration with data fetching
- **Animation**: Smooth loading animations
- **Responsive**: Adaptive skeleton sizing
- **Theme System**: Consistent styling across themes

### Accessibility Requirements
- **ARIA Attributes**: aria-busy, aria-live, role="status"
- **Screen Reader Support**: Loading announcements
- **Reduced Motion**: Respect user motion preferences
- **Semantic HTML**: Proper loading state structure

### Performance Optimization
- **Efficient Animations**: Hardware-accelerated animations
- **Minimal DOM**: Lightweight skeleton structure
- **Memory Management**: Proper cleanup of animations
- **Render Optimization**: Avoid unnecessary re-renders

### Animation Implementation
```css
/* Pulse animation */
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

/* Wave animation */
@keyframes wave {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

.skeleton-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.skeleton-wave {
  position: relative;
  overflow: hidden;
}

.skeleton-wave::after {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
  animation: wave 2s linear infinite;
}
```

### Testing Requirements
1. **Unit Tests**: Animation behavior, variant rendering
2. **Integration Tests**: Loading state transitions
3. **Accessibility Tests**: ARIA attributes, screen reader support
4. **Visual Tests**: All variants and animations
5. **Performance Tests**: Animation smoothness, memory usage
6. **Responsive Tests**: Adaptive sizing across screen sizes

## Development Priority
**Medium** - Useful for improving perceived performance and user experience

## Notes
- Built with modern shadcn/ui patterns for consistency
- Optimized for smooth loading experiences
- Full accessibility compliance with WCAG guidelines
- TypeScript support with comprehensive type safety
- Flexible sizing and animation options
- Integrates seamlessly with data fetching patterns
- Respects user motion preferences
