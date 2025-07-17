# DocyAspectRatio Component

## Overview
DocyAspectRatio is a container component built on shadcn/ui patterns that maintains content within a desired aspect ratio. It supports various common ratios and custom ratios. It serves as the primary aspect ratio container throughout the Docyrus React application.

## Component Specification

### Props
| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-----------|
| `ratio` | number | 1 | No | Aspect ratio (width/height) |
| `children` | ReactNode | - | Yes | Content to maintain aspect ratio |
| `className` | string | - | No | Additional CSS classes |
| `asChild` | boolean | false | No | Render as child element |

### Common Ratios
- **1:1 (Square)**: ratio={1}
- **4:3 (Traditional)**: ratio={4/3}
- **16:9 (Widescreen)**: ratio={16/9}
- **21:9 (Ultrawide)**: ratio={21/9}
- **3:2 (Photography)**: ratio={3/2}
- **9:16 (Vertical)**: ratio={9/16}

### Use Cases
- **Images**: Maintain consistent image dimensions
- **Videos**: Responsive video embeds
- **Cards**: Consistent card proportions
- **Thumbnails**: Uniform thumbnail sizes
- **Placeholders**: Consistent placeholder dimensions

## Component Requirements

### Technical Specifications
- **Framework**: React with TypeScript
- **Base Component**: shadcn/ui Aspect Ratio (`pnpm dlx shadcn@latest add aspect-ratio`)
- **Extensions**: Common ratio presets, responsive behavior
- **Styling**: shadcn/ui patterns with class-variance-authority
- **Accessibility**: Proper content structure
- **Performance**: Efficient ratio calculations
- **Responsive**: Mobile-friendly scaling

### Key Features Required
1. **Aspect Ratio Maintenance**: Consistent width/height ratios
2. **Responsive Behavior**: Scales with container width
3. **Flexible Content**: Supports any content type
4. **Common Ratios**: Easy-to-use preset ratios
5. **Custom Ratios**: Support for any custom ratio
6. **Overflow Handling**: Proper content overflow management
7. **Accessibility**: Maintains content accessibility
8. **Performance**: Efficient CSS-based implementation

### Usage Examples
```tsx
// Square aspect ratio (1:1)
<DocyAspectRatio ratio={1} className="bg-muted">
  <img
    src="/square-image.jpg"
    alt="Square image"
    className="object-cover w-full h-full"
  />
</DocyAspectRatio>

// Widescreen aspect ratio (16:9)
<DocyAspectRatio ratio={16/9} className="bg-muted">
  <img
    src="/widescreen-image.jpg"
    alt="Widescreen image"
    className="object-cover w-full h-full"
  />
</DocyAspectRatio>

// Traditional aspect ratio (4:3)
<DocyAspectRatio ratio={4/3} className="bg-muted">
  <img
    src="/traditional-image.jpg"
    alt="Traditional image"
    className="object-cover w-full h-full"
  />
</DocyAspectRatio>

// Video embed
<DocyAspectRatio ratio={16/9} className="bg-muted">
  <iframe
    src="https://www.youtube.com/embed/dQw4w9WgXcQ"
    title="YouTube video"
    className="w-full h-full"
    allowFullScreen
  />
</DocyAspectRatio>

// Card with consistent aspect ratio
<DocyCard className="overflow-hidden">
  <DocyAspectRatio ratio={16/9}>
    <img
      src="/card-image.jpg"
      alt="Card image"
      className="object-cover w-full h-full"
    />
  </DocyAspectRatio>
  <div className="p-4">
    <h3 className="font-semibold">Card Title</h3>
    <p className="text-sm text-muted-foreground">Card description</p>
  </div>
</DocyCard>

// Image gallery with consistent thumbnails
<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
  {images.map((image) => (
    <DocyAspectRatio key={image.id} ratio={1} className="bg-muted rounded overflow-hidden">
      <img
        src={image.thumbnail}
        alt={image.alt}
        className="object-cover w-full h-full hover:scale-105 transition-transform"
      />
    </DocyAspectRatio>
  ))}
</div>

// Product showcase
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  <DocyAspectRatio ratio={1} className="bg-muted rounded">
    <img
      src="/product-main.jpg"
      alt="Product main image"
      className="object-cover w-full h-full"
    />
  </DocyAspectRatio>
  <div className="grid grid-cols-2 gap-2">
    {productImages.map((image, index) => (
      <DocyAspectRatio key={index} ratio={1} className="bg-muted rounded">
        <img
          src={image.src}
          alt={image.alt}
          className="object-cover w-full h-full cursor-pointer hover:opacity-80"
        />
      </DocyAspectRatio>
    ))}
  </div>
</div>

// Avatar with aspect ratio
<DocyAspectRatio ratio={1} className="w-20 h-20 rounded-full overflow-hidden">
  <img
    src="/avatar.jpg"
    alt="User avatar"
    className="object-cover w-full h-full"
  />
</DocyAspectRatio>

// Placeholder with aspect ratio
<DocyAspectRatio ratio={16/9} className="bg-muted rounded flex items-center justify-center">
  <div className="text-center">
    <DocyIcon name="image" size={48} className="mx-auto mb-2 text-muted-foreground" />
    <p className="text-sm text-muted-foreground">No image available</p>
  </div>
</DocyAspectRatio>

// Banner with aspect ratio
<DocyAspectRatio ratio={21/9} className="bg-gradient-to-r from-blue-500 to-purple-600 rounded">
  <div className="flex items-center justify-center w-full h-full text-white">
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-2">Welcome</h1>
      <p className="text-xl">Discover amazing content</p>
    </div>
  </div>
</DocyAspectRatio>

// Map embed
<DocyAspectRatio ratio={16/9} className="bg-muted rounded">
  <iframe
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.1..."
    title="Google Maps"
    className="w-full h-full border-0"
    allowFullScreen
    loading="lazy"
  />
</DocyAspectRatio>

// Instagram-style posts
<div className="max-w-md mx-auto space-y-4">
  {posts.map((post) => (
    <DocyCard key={post.id} className="overflow-hidden">
      <div className="flex items-center p-4">
        <DocyAvatar src={post.user.avatar} className="mr-3" />
        <div>
          <p className="font-semibold">{post.user.name}</p>
          <p className="text-sm text-muted-foreground">{post.location}</p>
        </div>
      </div>
      <DocyAspectRatio ratio={1}>
        <img
          src={post.image}
          alt={post.caption}
          className="object-cover w-full h-full"
        />
      </DocyAspectRatio>
      <div className="p-4">
        <p className="text-sm">{post.caption}</p>
      </div>
    </DocyCard>
  ))}
</div>

// Portfolio grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {portfolioItems.map((item) => (
    <div key={item.id} className="group cursor-pointer">
      <DocyAspectRatio ratio={4/3} className="bg-muted rounded overflow-hidden">
        <img
          src={item.image}
          alt={item.title}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity duration-300 flex items-center justify-center">
          <div className="text-white text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
            <p className="text-sm">{item.category}</p>
          </div>
        </div>
      </DocyAspectRatio>
    </div>
  ))}
</div>

// Vertical aspect ratio for mobile stories
<DocyAspectRatio ratio={9/16} className="bg-muted rounded overflow-hidden max-w-xs mx-auto">
  <div className="relative w-full h-full">
    <img
      src="/story-background.jpg"
      alt="Story background"
      className="object-cover w-full h-full"
    />
    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
      <p className="text-white text-lg font-semibold">Story Title</p>
      <p className="text-white text-sm">Story description</p>
    </div>
  </div>
</DocyAspectRatio>

// Loading skeleton with aspect ratio
<DocyAspectRatio ratio={16/9} className="bg-muted rounded animate-pulse">
  <div className="flex items-center justify-center w-full h-full">
    <DocyIcon name="image" size={48} className="text-muted-foreground" />
  </div>
</DocyAspectRatio>

// Custom ratio example
<DocyAspectRatio ratio={5/4} className="bg-muted rounded">
  <div className="flex items-center justify-center w-full h-full">
    <p className="text-muted-foreground">Custom 5:4 ratio</p>
  </div>
</DocyAspectRatio>

// Responsive aspect ratio
<DocyAspectRatio 
  ratio={16/9} 
  className="bg-muted rounded w-full max-w-2xl mx-auto"
>
  <img
    src="/responsive-image.jpg"
    alt="Responsive image"
    className="object-cover w-full h-full"
  />
</DocyAspectRatio>
```

### Integration Requirements
- **DocyCard**: Card layouts with consistent proportions
- **DocyIcon**: Placeholder icons
- **DocyAvatar**: User avatars with consistent sizing
- **Image Components**: Consistent image dimensions
- **Layout Components**: Grid and container layouts

### Accessibility Requirements
- **Alt Text**: Proper alt text for images
- **Semantic HTML**: Maintain proper content structure
- **Focus Management**: Proper focus indicators for interactive content
- **Screen Reader**: Accessible content within aspect ratio containers
- **Keyboard Navigation**: Maintain keyboard accessibility

### Responsive Behavior
```css
/* CSS implementation concept */
.aspect-ratio-container {
  position: relative;
  width: 100%;
}

.aspect-ratio-container::before {
  content: '';
  display: block;
  padding-top: calc(100% / var(--aspect-ratio));
}

.aspect-ratio-content {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
```

### Performance Optimization
- **CSS-based**: Uses CSS for efficient ratio calculations
- **Minimal JavaScript**: Minimal runtime overhead
- **Lazy Loading**: Compatible with image lazy loading
- **Smooth Scaling**: Efficient responsive scaling

### Testing Requirements
1. **Unit Tests**: Ratio calculations, content rendering
2. **Integration Tests**: Image loading, responsive behavior
3. **Accessibility Tests**: Content accessibility, focus management
4. **Visual Tests**: Various ratios and content types
5. **Responsive Tests**: Scaling across screen sizes
6. **Performance Tests**: Rendering efficiency, memory usage

## Development Priority
**Low** - Utility component for specific layout needs

## Notes
- Built with modern shadcn/ui patterns for consistency
- CSS-based implementation for optimal performance
- Works with any content type (images, videos, components)
- Maintains accessibility of contained content
- TypeScript support with comprehensive type safety
- Responsive by default
- Minimal runtime overhead
