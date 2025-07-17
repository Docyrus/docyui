# DocyFieldSelectColor Component

## Overview
DocyFieldSelectColor is a comprehensive color selection component that extends DocyFieldBase to provide advanced color picking functionality. Built on top of shadcn/ui Select component, it offers multiple color selection modes including color picker, predefined palettes, custom colors, and various color formats (hex, rgb, hsl, hsv). The component features color preview, recent colors tracking, eye dropper tool, gradient support, and extensive customization options for complex color selection scenarios.

This component serves as the foundation for color input interfaces across the platform, supporting both simple color selection and advanced color management workflows with professional-grade color tools.

## Component Specification

### Props
DocyFieldSelectColor inherits ALL props from DocyFieldBase and adds the following color-specific properties:

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `format` | 'hex' \| 'rgb' \| 'hsl' \| 'hsv' | 'hex' | No | Color format for output value |
| `showPicker` | boolean | true | No | Show color picker interface |
| `showPalette` | boolean | true | No | Show color palette options |
| `palette` | ColorPalette[] | defaultPalette | No | Custom color palette array |
| `paletteName` | string | 'Default' | No | Name for the color palette |
| `showPreview` | boolean | true | No | Show color preview swatch |
| `previewSize` | 'sm' \| 'md' \| 'lg' | 'md' | No | Size of color preview swatch |
| `allowCustom` | boolean | true | No | Allow custom color selection |
| `allowTransparent` | boolean | false | No | Allow transparent/no color selection |
| `showInput` | boolean | true | No | Show color input field |
| `showEyeDropper` | boolean | false | No | Show eye dropper tool (if supported) |
| `recentColors` | string[] | [] | No | Array of recently used colors |
| `showRecent` | boolean | true | No | Show recent colors section |
| `maxRecent` | number | 10 | No | Maximum number of recent colors to track |
| `onColorChange` | (color: ColorValue) => void | - | No | Callback when color changes |
| `onPaletteChange` | (palette: ColorPalette[]) => void | - | No | Callback when palette changes |
| `onRecentUpdate` | (colors: string[]) => void | - | No | Callback when recent colors update |
| `validator` | (color: string) => boolean | - | No | Custom color validation function |
| `swatches` | ColorSwatch[] | [] | No | Predefined color swatches |
| `showSwatches` | boolean | false | No | Show color swatches section |
| `gradient` | boolean | false | No | Enable gradient color selection |
| `showGradient` | boolean | false | No | Show gradient picker interface |
| `alphaChannel` | boolean | false | No | Enable alpha channel (transparency) |
| `colorSpace` | 'srgb' \| 'p3' \| 'rec2020' | 'srgb' | No | Color space for advanced color handling |
| `presets` | ColorPreset[] | [] | No | Predefined color presets |
| `showPresets` | boolean | false | No | Show color presets section |
| `pickerPosition` | 'top' \| 'bottom' \| 'left' \| 'right' | 'bottom' | No | Position of color picker popover |
| `triggerMode` | 'click' \| 'hover' | 'click' | No | How to trigger color picker |
| `closeOnSelect` | boolean | true | No | Close picker after color selection |
| `debounceMs` | number | 300 | No | Debounce delay for color change events |
| `contrast` | boolean | false | No | Show contrast ratio information |
| `contrastBackground` | string | '#ffffff' | No | Background color for contrast calculation |
| `accessibility` | boolean | false | No | Enable accessibility features and validation |

**Note**: DocyFieldSelectColor inherits all DocyFieldBase props including validation, layout, dynamic computed properties, AI integration, and more. See [DocyFieldBase documentation](./DocyFieldBase.md) for the complete list.

### TypeScript Interfaces

```typescript
interface ColorValue {
  hex: string;
  rgb: { r: number; g: number; b: number; a?: number };
  hsl: { h: number; s: number; l: number; a?: number };
  hsv: { h: number; s: number; v: number; a?: number };
  alpha: number;
  format: 'hex' | 'rgb' | 'hsl' | 'hsv';
}

interface ColorPalette {
  name: string;
  colors: string[];
  description?: string;
  category?: string;
}

interface ColorSwatch {
  name: string;
  color: string;
  description?: string;
  category?: string;
}

interface ColorPreset {
  name: string;
  color: string;
  description?: string;
  group?: string;
  keywords?: string[];
}

interface GradientValue {
  type: 'linear' | 'radial' | 'conic';
  direction?: number | string;
  stops: GradientStop[];
  repeating?: boolean;
}

interface GradientStop {
  color: string;
  position: number; // 0-100
  alpha?: number;
}

interface ColorPickerConfig {
  showPicker: boolean;
  showPalette: boolean;
  showSwatches: boolean;
  showPresets: boolean;
  showRecent: boolean;
  showGradient: boolean;
  alphaChannel: boolean;
  eyeDropper: boolean;
}

interface ColorValidationConfig {
  allowTransparent: boolean;
  validator?: (color: string) => boolean;
  accessibility?: boolean;
  contrast?: boolean;
  contrastBackground?: string;
  minContrast?: number;
}

interface ColorAccessibility {
  contrast: number;
  contrastAA: boolean;
  contrastAAA: boolean;
  luminance: number;
  wcagLevel: 'pass' | 'aa' | 'aaa' | 'fail';
}
```

### Behavior

1. **Color Selection Modes**:
   - Color picker: Full HSV color wheel with brightness slider
   - Palette selection: Predefined color sets with categories
   - Recent colors: Quick access to recently used colors
   - Custom input: Manual color entry with format validation

2. **Color Formats**:
   - Hex: Standard hexadecimal format (#RRGGBB)
   - RGB: Red, Green, Blue values (0-255)
   - HSL: Hue, Saturation, Lightness values
   - HSV: Hue, Saturation, Value values
   - Alpha channel support for transparency

3. **Advanced Features**:
   - Eye dropper tool for sampling colors from screen
   - Gradient creation and editing
   - Color accessibility validation
   - Contrast ratio calculation
   - Color space conversion

4. **User Experience**:
   - Real-time preview with debounced updates
   - Keyboard navigation support
   - Touch-friendly interface for mobile
   - Undo/redo functionality
   - Color history tracking

5. **Integration Features**:
   - Form validation with custom rules
   - Dynamic computed properties
   - Action system integration
   - Accessibility compliance
   - Responsive design

6. **Performance Optimizations**:
   - Debounced color change events
   - Efficient color conversion algorithms
   - Lazy loading of color palettes
   - Memory-efficient recent colors management

## Component Requirements

### Technical Specifications
- **Framework**: React 18+ with TypeScript
- **Base Component**: shadcn/ui Select component (`pnpm dlx shadcn@latest add select`)
- **Extensions**: Docy-specific color features including picker, palettes, gradients, and accessibility tools built on top of shadcn base
- **Wrapper**: Extends DocyFieldBase for consistent field structure
- **Styling**: shadcn/ui Select component with Tailwind CSS v4
- **Color Library**: color2k, chroma-js, or similar for color manipulation
- **Accessibility**: WCAG 2.1 AA compliance with contrast validation
- **Eye Dropper**: EyeDropper API support where available

### Key Features Required
1. **Color Picker Interface**: Full-featured color selection with HSV wheel
2. **Multiple Color Formats**: Support for hex, rgb, hsl, hsv with conversion
3. **Palette System**: Predefined and custom color palettes
4. **Recent Colors**: Track and display recently used colors
5. **Gradient Support**: Create and edit linear/radial gradients
6. **Accessibility Tools**: Contrast checking and WCAG compliance
7. **Eye Dropper**: Screen color sampling where supported
8. **Alpha Channel**: Transparency support with alpha slider

### Usage Examples

```tsx
// Basic color selection
<DocyFieldSelectColor
  name="brandColor"
  label="Brand Color"
  format="hex"
  defaultValue="#3b82f6"
  placeholder="Select brand color"
  required={true}
/>

// Color picker with palette and recent colors
<DocyFieldSelectColor
  name="themeColor"
  label="Theme Color"
  format="rgb"
  showPicker={true}
  showPalette={true}
  showRecent={true}
  maxRecent={8}
  palette={[
    { name: 'Brand Colors', colors: ['#3b82f6', '#ef4444', '#10b981', '#f59e0b'] },
    { name: 'Neutral', colors: ['#374151', '#6b7280', '#9ca3af', '#d1d5db'] }
  ]}
  onColorChange={(color) => console.log('Selected color:', color)}
/>

// Advanced color picker with all features
<DocyFieldSelectColor
  name="accentColor"
  label="Accent Color"
  format="hsl"
  showPicker={true}
  showPalette={true}
  showRecent={true}
  showSwatches={true}
  showPresets={true}
  showEyeDropper={true}
  alphaChannel={true}
  allowTransparent={true}
  accessibility={true}
  contrast={true}
  contrastBackground="#ffffff"
  swatches={[
    { name: 'Primary', color: '#3b82f6', category: 'Brand' },
    { name: 'Secondary', color: '#6366f1', category: 'Brand' },
    { name: 'Success', color: '#10b981', category: 'Status' },
    { name: 'Warning', color: '#f59e0b', category: 'Status' },
    { name: 'Error', color: '#ef4444', category: 'Status' }
  ]}
  presets={[
    { name: 'Ocean Blue', color: '#0ea5e9', group: 'Nature' },
    { name: 'Forest Green', color: '#059669', group: 'Nature' },
    { name: 'Sunset Orange', color: '#ea580c', group: 'Nature' }
  ]}
  validator={(color) => {
    // Custom validation: ensure color is not too light
    const rgb = hexToRgb(color);
    return rgb.r + rgb.g + rgb.b < 600;
  }}
/>

// Gradient color selection
<DocyFieldSelectColor
  name="backgroundGradient"
  label="Background Gradient"
  gradient={true}
  showGradient={true}
  format="hex"
  defaultValue={{
    type: 'linear',
    direction: 45,
    stops: [
      { color: '#3b82f6', position: 0 },
      { color: '#8b5cf6', position: 100 }
    ]
  }}
  onColorChange={(gradient) => console.log('Gradient updated:', gradient)}
/>

// Color picker with validation and actions
<DocyFieldSelectColor
  name="textColor"
  label="Text Color"
  format="hex"
  showPicker={true}
  showPalette={true}
  accessibility={true}
  contrast={true}
  contrastBackground="#f9fafb"
  validations={[
    { type: 'required', message: 'Text color is required' },
    { type: 'custom', validator: validateContrastRatio, message: 'Color must meet WCAG AA contrast requirements' }
  ]}
  customValidations={[
    {
      formula: 'contrast_ratio >= 4.5',
      message: 'Color must have contrast ratio of at least 4.5:1'
    }
  ]}
  actions={{
    change: [
      ['setFieldValue', { field: 'textColorHex', value: 'color.hex' }],
      ['setFieldValueCalculated', { 
        field: 'contrastRatio', 
        formula: 'calculateContrast(color.hex, backgroundColor)' 
      }]
    ]
  }}
/>

// Color selection with computed properties
<DocyFieldSelectColor
  name="statusColor"
  label="Status Color"
  format="hex"
  computedRequired={{
    field: 'showStatus',
    operator: 'equals',
    value: true
  }}
  computedOptions={{
    field: 'statusType',
    options: {
      'success': { palette: [{ name: 'Success', colors: ['#10b981', '#059669', '#047857'] }] },
      'warning': { palette: [{ name: 'Warning', colors: ['#f59e0b', '#d97706', '#b45309'] }] },
      'error': { palette: [{ name: 'Error', colors: ['#ef4444', '#dc2626', '#b91c1c'] }] }
    }
  }}
  showPalette={true}
  allowCustom={false}
/>

// Mobile-optimized color picker
<DocyFieldSelectColor
  name="mobileColor"
  label="Color"
  format="hex"
  showPicker={true}
  showPalette={true}
  showRecent={true}
  pickerPosition="bottom"
  triggerMode="click"
  closeOnSelect={true}
  previewSize="lg"
  palette={[
    { name: 'Popular', colors: ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'] }
  ]}
  className="touch-friendly"
/>

// Advanced color management with all features
<DocyFieldSelectColor
  name="designSystemColor"
  label="Design System Color"
  format="hsl"
  showPicker={true}
  showPalette={true}
  showSwatches={true}
  showPresets={true}
  showRecent={true}
  showGradient={true}
  showEyeDropper={true}
  alphaChannel={true}
  allowTransparent={true}
  accessibility={true}
  contrast={true}
  contrastBackground="#ffffff"
  colorSpace="p3"
  debounceMs={200}
  maxRecent={20}
  palette={designSystemPalette}
  swatches={brandSwatches}
  presets={colorPresets}
  onColorChange={handleColorChange}
  onPaletteChange={handlePaletteChange}
  onRecentUpdate={handleRecentUpdate}
  validator={validateDesignSystemColor}
  validations={[
    { type: 'required', message: 'Color selection is required' },
    { type: 'custom', validator: validateBrandCompliance, message: 'Color must comply with brand guidelines' }
  ]}
  customValidations={[
    {
      formula: 'contrast_ratio >= 4.5',
      message: 'Color must meet WCAG AA contrast requirements'
    },
    {
      formula: '$contains(approved_colors, color.hex)',
      message: 'Color must be from approved design system palette'
    }
  ]}
  actions={{
    change: [
      ['setFieldValue', { field: 'colorHex', value: 'color.hex' }],
      ['setFieldValue', { field: 'colorRgb', value: 'color.rgb' }],
      ['setFieldValue', { field: 'colorHsl', value: 'color.hsl' }],
      ['setFieldValueCalculated', { 
        field: 'accessibility', 
        formula: 'calculateAccessibility(color.hex, contrastBackground)' 
      }],
      ['condition', 'color.alpha < 1', [
        ['setFieldOption', { field: 'backgroundRequired', option: 'required', value: true }]
      ]]
    ]
  }}
/>
```

### Integration Requirements
- **DocyFieldBase**: Base wrapper component (required)
- **DocyIcon**: For UI icons and indicators
- **DocyButton**: For picker triggers and actions
- **DocyTooltip**: For color information and help
- **DocyPopover**: For color picker interface
- **DocyTabs**: For organizing picker sections
- **DocySlider**: For color component sliders
- **DocyInput**: For manual color entry
- **DocyChip**: For color swatches display
- **Color manipulation library**: color2k, chroma-js, or similar

### Dependencies Required
- `react-hook-form`: Form state management (inherited from DocyFieldBase)
- `@radix-ui/react-select`: Base select component (via shadcn/ui)
- `@radix-ui/react-popover`: Color picker popover
- `@radix-ui/react-tabs`: Picker interface tabs
- `@radix-ui/react-slider`: Color component sliders
- `color2k` or `chroma-js`: Color manipulation and conversion
- `react-colorful`: Color picker component
- `use-debounce`: Color change debouncing
- `class-variance-authority`: Variant management
- All DocyFieldBase dependencies

### Testing Requirements
1. **Unit Tests**: Color conversion, validation, picker functionality, palette management
2. **Integration Tests**: React Hook Form integration, validation, actions system
3. **Visual Tests**: All color formats, picker interfaces, responsive behavior
4. **Accessibility Tests**: Keyboard navigation, screen reader support, contrast validation
5. **Performance Tests**: Color conversion performance, debouncing, memory usage
6. **Color Tests**: Format conversion accuracy, gradient generation, accessibility calculations
7. **Browser Tests**: Eye dropper API support, color space handling, mobile touch interactions

## Development Priority
**Medium** - Important for design and branding features, but not as critical as basic form fields

## Notes
- Built on shadcn/ui Select component for consistent design system integration
- Supports professional color management features for design workflows
- Eye dropper functionality requires modern browser support and user permissions
- Color accessibility features help ensure WCAG compliance
- Gradient support enables advanced design capabilities
- Mobile-optimized interface with touch-friendly controls
- Extensible architecture allows for future color space and format additions
- Performance optimized for real-time color manipulation
- Integration with existing form systems and validation frameworks
- Comprehensive color format support for various use cases
- Professional-grade color tools suitable for design applications