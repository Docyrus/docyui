# DocyCarousel Component

## Overview
DocyCarousel is an image and content carousel component built on shadcn/ui patterns that provides interactive slideshow functionality. It supports navigation controls, indicators, autoplay, and responsive behavior. It serves as the primary carousel component throughout the Docyrus React application.

## Component Specification

### Props
| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-----------|
| `items` | array | [] | Yes | Carousel items array |
| `autoplay` | boolean | false | No | Enable autoplay |
| `autoplayInterval` | number | 5000 | No | Autoplay interval in ms |
| `loop` | boolean | true | No | Enable infinite loop |
| `showIndicators` | boolean | true | No | Show dot indicators |
| `showNavigation` | boolean | true | No | Show prev/next buttons |
| `showThumbnails` | boolean | false | No | Show thumbnail navigation |
| `pauseOnHover` | boolean | true | No | Pause autoplay on hover |
| `swipeable` | boolean | true | No | Enable swipe gestures |
| `responsive` | boolean | true | No | Enable responsive behavior |
| `itemsPerView` | number | 1 | No | Items visible at once |
| `spacing` | number | 16 | No | Spacing between items |
| `orientation` | string | 'horizontal' | No | Carousel orientation: 'horizontal', 'vertical' |
| `className` | string | - | No | Additional CSS classes |
| `itemClassName` | string | - | No | Item CSS classes |
| `indicatorClassName` | string | - | No | Indicator CSS classes |
| `navigationClassName` | string | - | No | Navigation CSS classes |
| `onSlideChange` | function | - | No | Callback when slide changes |
| `onAutoplayToggle` | function | - | No | Callback when autoplay toggles |

### Carousel Item Structure
```typescript
interface CarouselItem {
  id: string;
  type: 'image' | 'video' | 'content';
  src?: string;
  alt?: string;
  title?: string;
  description?: string;
  content?: ReactNode;
  thumbnail?: string;
  link?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}
```

### Navigation Types
- **Arrows**: Previous/next navigation buttons
- **Indicators**: Dot indicators for direct navigation
- **Thumbnails**: Thumbnail preview navigation
- **Keyboard**: Arrow key navigation support

### Responsive Behavior
- **Desktop**: Full carousel with all features
- **Tablet**: Optimized touch interactions
- **Mobile**: Swipe gestures and simplified navigation

### Animation Options
- **Slide**: Horizontal sliding transition
- **Fade**: Fade in/out transition
- **Scale**: Scale transition effect
- **Custom**: Custom transition animations

## Component Requirements

### Technical Specifications
- **Framework**: React with TypeScript
- **Base Component**: shadcn/ui Carousel component (`pnpm dlx shadcn@latest add carousel`)
- **Extensions**: Multiple item types, thumbnails, autoplay
- **Styling**: shadcn/ui patterns with class-variance-authority
- **Accessibility**: Full ARIA support, keyboard navigation
- **Touch Support**: Swipe gestures for mobile
- **Performance**: Optimized rendering and lazy loading

### Key Features Required
1. **Multiple Content Types**: Images, videos, and custom content
2. **Navigation Controls**: Arrows, indicators, and thumbnails
3. **Autoplay**: Automatic slideshow with pause/resume
4. **Touch Gestures**: Swipe support for mobile devices
5. **Responsive Design**: Adaptive behavior across screen sizes
6. **Keyboard Navigation**: Arrow key support
7. **Accessibility**: Screen reader support and ARIA compliance
8. **Performance**: Lazy loading and optimized rendering

### Advanced Features
- **Infinite Loop**: Seamless looping between slides
- **Multi-item View**: Display multiple items at once
- **Lazy Loading**: Load images on demand
- **Video Support**: Embedded video playback
- **Custom Transitions**: Configurable animation effects

### Usage Examples
```tsx
// Basic image carousel
<DocyCarousel
  items={[
    {
      id: '1',
      type: 'image',
      src: '/images/slide1.jpg',
      alt: 'Slide 1',
      title: 'Beautiful Landscape',
      description: 'A stunning view of mountains and lakes'
    },
    {
      id: '2',
      type: 'image',
      src: '/images/slide2.jpg',
      alt: 'Slide 2',
      title: 'City Skyline',
      description: 'Modern architecture and urban beauty'
    },
    {
      id: '3',
      type: 'image',
      src: '/images/slide3.jpg',
      alt: 'Slide 3',
      title: 'Ocean View',
      description: 'Peaceful ocean waves and sandy beaches'
    }
  ]}
/>

// Autoplay carousel
<DocyCarousel
  items={imageItems}
  autoplay
  autoplayInterval={3000}
  pauseOnHover
  loop
/>

// Product carousel with thumbnails
<DocyCarousel
  items={productImages.map(image => ({
    id: image.id,
    type: 'image',
    src: image.large,
    alt: image.alt,
    thumbnail: image.small,
    title: image.title
  }))}
  showThumbnails
  showIndicators={false}
/>

// Multi-item carousel
<DocyCarousel
  items={teamMembers.map(member => ({
    id: member.id,
    type: 'content',
    content: (
      <div className="text-center p-4">
        <DocyAvatar src={member.avatar} size="lg" className="mx-auto mb-4" />
        <h3 className="font-semibold">{member.name}</h3>
        <p className="text-gray-600">{member.role}</p>
      </div>
    )
  }))}
  itemsPerView={3}
  spacing={24}
  showIndicators={false}
/>

// Testimonial carousel
<DocyCarousel
  items={testimonials.map(testimonial => ({
    id: testimonial.id,
    type: 'content',
    content: (
      <div className="text-center p-8">
        <blockquote className="text-lg italic mb-4">
          "{testimonial.quote}"
        </blockquote>
        <div className="flex items-center justify-center gap-4">
          <DocyAvatar src={testimonial.avatar} size="md" />
          <div>
            <p className="font-semibold">{testimonial.name}</p>
            <p className="text-gray-600">{testimonial.company}</p>
          </div>
        </div>
      </div>
    )
  }))}
  autoplay
  autoplayInterval={8000}
  showNavigation={false}
/>

// Video carousel
<DocyCarousel
  items={videos.map(video => ({
    id: video.id,
    type: 'video',
    src: video.url,
    title: video.title,
    description: video.description,
    thumbnail: video.thumbnail
  }))}
  autoplay={false}
  showThumbnails
/>

// Feature showcase carousel
<DocyCarousel
  items={features.map(feature => ({
    id: feature.id,
    type: 'content',
    content: (
      <div className="p-12 text-center">
        <DocyIcon name={feature.icon} size={48} className="mx-auto mb-6 text-blue-600" />
        <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
        <p className="text-gray-600 mb-6">{feature.description}</p>
        <DocyButton 
          onClick={feature.action.onClick}
          className="px-8 py-3"
        >
          {feature.action.label}
        </DocyButton>
      </div>
    )
  }))}
  showIndicators
  showNavigation
  className="bg-gradient-to-r from-blue-50 to-purple-50"
/>

// Mobile-optimized carousel
<DocyCarousel
  items={mobileItems}
  showNavigation={false}
  showIndicators
  swipeable
  className="md:hidden"
/>

// Vertical carousel
<DocyCarousel
  items={verticalItems}
  orientation="vertical"
  className="h-96"
  showIndicators={false}
/>

// Controlled carousel
<DocyCarousel
  items={items}
  currentSlide={activeSlide}
  onSlideChange={setActiveSlide}
  autoplay={isPlaying}
  onAutoplayToggle={setIsPlaying}
/>

// News carousel
<DocyCarousel
  items={news.map(article => ({
    id: article.id,
    type: 'content',
    content: (
      <div className="p-6">
        <img 
          src={article.image} 
          alt={article.title}
          className="w-full h-48 object-cover rounded-lg mb-4"
        />
        <h3 className="text-xl font-semibold mb-2">{article.title}</h3>
        <p className="text-gray-600 mb-4">{article.excerpt}</p>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">{article.date}</span>
          <DocyButton variant="outline" size="sm">
            Read More
          </DocyButton>
        </div>
      </div>
    )
  }))}
  autoplay
  pauseOnHover
  showIndicators
/>
```

### Integration Requirements
- **DocyIcon**: Navigation arrows and indicators
- **DocyButton**: Action buttons and controls
- **DocyAvatar**: User avatars in content slides
- **DocyImage**: Optimized image component
- **Touch Library**: Swipe gesture support
- **Animation Library**: Smooth transitions

### Accessibility Requirements
- **ARIA Attributes**: carousel, slider, tab roles
- **Keyboard Navigation**: Arrow keys, Tab, Enter
- **Screen Reader Support**: Proper announcements
- **Focus Management**: Focus indicators and trapping
- **Reduced Motion**: Respect user motion preferences

### Performance Optimization
- **Lazy Loading**: Load images on demand
- **Preloading**: Preload next/previous images
- **Efficient Rendering**: Virtualization for large datasets
- **Memory Management**: Proper cleanup of resources

### Touch Gestures
- **Swipe**: Navigate between slides
- **Pinch**: Zoom functionality (for images)
- **Pan**: Fine-grained control
- **Tap**: Pause/resume autoplay

### Responsive Design
```typescript
const responsiveConfig = {
  mobile: {
    itemsPerView: 1,
    showNavigation: false,
    showThumbnails: false,
    spacing: 8
  },
  tablet: {
    itemsPerView: 2,
    showNavigation: true,
    showThumbnails: false,
    spacing: 16
  },
  desktop: {
    itemsPerView: 3,
    showNavigation: true,
    showThumbnails: true,
    spacing: 24
  }
};
```

### Testing Requirements
1. **Unit Tests**: Navigation, autoplay, item rendering
2. **Integration Tests**: Touch gestures, keyboard navigation
3. **Accessibility Tests**: ARIA attributes, screen reader support
4. **Visual Tests**: All variants and responsive states
5. **Performance Tests**: Large item sets, smooth animations
6. **Mobile Tests**: Touch interactions, swipe gestures

## Development Priority
**Medium** - Useful component for showcasing content and media

## Notes
- Built with modern shadcn/ui patterns for consistency
- Optimized for both simple and complex carousel scenarios
- Full accessibility compliance with WCAG guidelines
- TypeScript support with comprehensive type safety
- Supports various content types and layouts
- Mobile-friendly with touch gesture support
- Extensible architecture for custom requirements
