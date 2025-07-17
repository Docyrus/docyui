# DocyIcon Component

A versatile icon component that supports multiple icon libraries, emoji display, and basic animations. Built with shadcn/ui patterns and Tailwind CSS v4.

## Features

- 🎨 Multiple icon libraries support (Lucide, Heroicons, Tabler, Phosphor)
- 😀 Emoji detection and rendering
- 📐 Size variants (xs, sm, md, lg, xl, 2xl)
- ⚡ Animation support (spin, pulse, bounce)
- 🎭 Fallback handling for missing icons
- ♿ Full accessibility support
- 📘 Complete TypeScript support

## Basic Usage

```tsx
import { DocyIcon } from "@docyui/react"

// Basic icon
<DocyIcon name="user" />

// Different sizes
<DocyIcon name="home" size="lg" />
<DocyIcon name="star" size={24} />

// With animations
<DocyIcon name="loader" animation="spin" />
<DocyIcon name="heart" animation="pulse" />

// Emoji support
<DocyIcon name="🚀" />
<DocyIcon name="🎉" size="xl" />

// Special characters
<DocyIcon name="dot" />

// Custom styling
<DocyIcon 
  name="settings" 
  className="text-blue-500 hover:text-blue-600" 
  size="md"
  color="blue"
/>
```

## Icon Libraries

Currently supported:
- **Lucide** (default) - ✅ Available
- **Heroicons** - 🚧 Coming soon
- **Tabler** - 🚧 Coming soon  
- **Phosphor** - 🚧 Coming soon
- **Custom** - 🚧 Coming soon

```tsx
// Using different libraries (when available)
<DocyIcon name="home" lib="lucide" />
<DocyIcon name="user" lib="heroicons" />
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `string` | - | Icon name or emoji character (required) |
| `lib` | `"lucide" \| "heroicons" \| "tabler" \| "phosphor" \| "custom"` | `"lucide"` | Icon library to use |
| `size` | `"xs" \| "sm" \| "md" \| "lg" \| "xl" \| "2xl" \| number` | `"md"` | Icon size |
| `color` | `string` | `"currentColor"` | Icon color |
| `animation` | `"spin" \| "pulse" \| "bounce"` | - | Animation type |
| `className` | `string` | - | Additional CSS classes |

## Size Reference

| Size | Pixels | Tailwind Class |
|------|--------|----------------|
| `xs` | 12px | `w-3 h-3` |
| `sm` | 14px | `w-3.5 h-3.5` |
| `md` | 16px | `w-4 h-4` |
| `lg` | 20px | `w-5 h-5` |
| `xl` | 24px | `w-6 h-6` |
| `2xl` | 32px | `w-8 h-8` |

## Accessibility

The component includes proper ARIA attributes:
- `role="img"` for emoji and special characters
- `aria-label` for meaningful descriptions
- Proper focus handling when used in interactive elements

## TypeScript

Full TypeScript support with exported types:

```tsx
import type { DocyIconProps, IconSize, IconLibrary } from "@docyui/react"

const MyComponent: React.FC<{ iconName: string }> = ({ iconName }) => {
  return <DocyIcon name={iconName} size="lg" />
}
```