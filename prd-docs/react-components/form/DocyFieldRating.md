# DocyFieldRating Component

## Overview
DocyFieldRating is a versatile rating input component that extends DocyFieldBase to provide interactive rating functionality with stars, hearts, thumbs, or custom icons. It supports various rating modes including full ratings, half ratings, and custom precision levels. The component is built with shadcn/ui design patterns for consistency while providing comprehensive rating features like hover effects, tooltips, custom icons, and statistical display.

This component offers a complete rating solution with support for different rating scales, custom icons, color schemes, and accessibility features, making it suitable for feedback forms, product reviews, satisfaction surveys, and quality assessments.

## Component Specification

### Props
DocyFieldRating inherits ALL props from DocyFieldBase and adds the following rating-specific properties:

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `modelValue` | number | 0 | No | Current rating value |
| `max` | number | 5 | No | Maximum rating value |
| `precision` | number | 1 | No | Rating precision (1 for full, 0.5 for half, 0.1 for fine) |
| `size` | 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' | 'md' | No | Rating size |
| `icon` | string \| object | 'star' | No | Rating icon (star, heart, thumb, etc.) |
| `emptyIcon` | string \| object | - | No | Empty state icon (defaults to outlined version of icon) |
| `halfIcon` | string \| object | - | No | Half-filled icon (defaults to half-filled version of icon) |
| `color` | string | 'amber' | No | Rating color (amber, red, blue, green, purple, etc.) |
| `emptyColor` | string | 'gray' | No | Empty state color |
| `hoverColor` | string | - | No | Hover state color (defaults to color) |
| `showValue` | boolean | false | No | Show numeric value next to rating |
| `showText` | boolean | false | No | Show rating text description |
| `ratingTexts` | string[] | [] | No | Custom rating text descriptions |
| `allowHalf` | boolean | false | No | Allow half ratings (sets precision to 0.5) |
| `allowClear` | boolean | false | No | Allow clearing rating by clicking current value |
| `disabled` | boolean | false | No | Disable rating interaction |
| `readonly` | boolean | false | No | Read-only mode (display only) |
| `tooltips` | string[] | [] | No | Hover tooltips for each rating level |
| `showTooltips` | boolean | false | No | Show tooltips on hover |
| `onRatingChange` | function | - | No | Callback when rating changes |
| `onHover` | function | - | No | Callback when hovering over rating |
| `onClear` | function | - | No | Callback when rating is cleared |
| `character` | string | - | No | Custom character instead of icon |
| `count` | number | - | No | Total count for statistics display |
| `showCount` | boolean | false | No | Show count next to rating |
| `variant` | 'filled' \| 'outlined' \| 'minimal' | 'filled' | No | Rating display variant |
| `spacing` | 'tight' \| 'normal' \| 'loose' | 'normal' | No | Spacing between rating items |
| `animation` | 'none' \| 'scale' \| 'bounce' \| 'pulse' | 'scale' | No | Animation on interaction |
| `direction` | 'ltr' \| 'rtl' | 'ltr' | No | Rating direction |
| `highlightSelected` | boolean | true | No | Highlight selected rating with different styling |

**Note**: DocyFieldRating inherits all DocyFieldBase props including validation, layout, dynamic computed properties, AI integration, and more. See [DocyFieldBase documentation](./DocyFieldBase.md) for the complete list.

### TypeScript Interfaces

```typescript
interface RatingConfig {
  max: number;
  precision: number;
  allowHalf: boolean;
  allowClear: boolean;
}

interface RatingDisplay {
  icon: string | IconConfig;
  emptyIcon?: string | IconConfig;
  halfIcon?: string | IconConfig;
  character?: string;
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  variant: 'filled' | 'outlined' | 'minimal';
  spacing: 'tight' | 'normal' | 'loose';
  animation: 'none' | 'scale' | 'bounce' | 'pulse';
}

interface RatingColors {
  color: string;
  emptyColor: string;
  hoverColor?: string;
}

interface RatingText {
  showValue: boolean;
  showText: boolean;
  ratingTexts: string[];
  showCount: boolean;
  count?: number;
}

interface RatingTooltips {
  tooltips: string[];
  showTooltips: boolean;
}

interface RatingCallbacks {
  onRatingChange?: (value: number) => void;
  onHover?: (value: number) => void;
  onClear?: () => void;
}

interface IconConfig {
  name: string;
  library?: 'heroicons' | 'lucide' | 'phosphor';
  variant?: 'outline' | 'solid' | 'duotone';
}
```

### Behavior

1. **Rating Interaction**:
   - Click to set rating value with visual feedback
   - Hover effects with preview highlighting
   - Support for keyboard navigation (arrow keys, Enter, Space)
   - Touch-friendly interaction for mobile devices

2. **Precision Handling**:
   - Full rating (precision: 1) - whole numbers only
   - Half rating (precision: 0.5) - allows 0.5 increments
   - Fine rating (precision: 0.1) - allows decimal ratings
   - Custom precision support for specific use cases

3. **Visual Feedback**:
   - Animated hover effects with configurable animation types
   - Color transitions for different states (empty, filled, hover)
   - Size variants for different contexts
   - Consistent spacing and alignment

4. **Icon System**:
   - Multiple built-in icons (star, heart, thumb, circle, etc.)
   - Custom icon support with different states
   - Character-based ratings for text symbols
   - Automatic half-icon generation

5. **Accessibility**:
   - ARIA labels and descriptions
   - Keyboard navigation support
   - Screen reader announcements
   - Focus management and visual indicators

6. **Statistics and Display**:
   - Count display for aggregate ratings
   - Rating text descriptions
   - Tooltip information on hover
   - Value display options

## Component Requirements

### Technical Specifications
- **Framework**: React 18+ with TypeScript
- **Base Component**: Custom implementation using shadcn/ui design patterns
- **Integration**: Uses shadcn/ui components for consistent styling (Button, Tooltip, Label)
- **Wrapper**: Extends DocyFieldBase for consistent field structure
- **Styling**: shadcn/ui patterns with Tailwind CSS v4
- **Icons**: Integration with icon libraries (Heroicons, Lucide, Phosphor)
- **Accessibility**: WCAG 2.1 AA compliance
- **Animation**: Smooth transitions and hover effects

### Key Features Required
1. **Multiple Rating Types**: Support for stars, hearts, thumbs, and custom icons
2. **Precision Control**: Full, half, and custom precision ratings
3. **Interactive Feedback**: Hover effects, animations, and visual feedback
4. **Accessibility**: Complete keyboard navigation and screen reader support
5. **Customization**: Flexible styling, colors, and display options
6. **Statistics**: Count display and aggregate rating information
7. **Tooltips**: Contextual information on hover

### Usage Examples

```tsx
// Basic star rating
<DocyFieldRating
  name="satisfaction"
  label="How satisfied are you?"
  max={5}
  required={true}
/>

// Half-star rating with custom colors
<DocyFieldRating
  name="productRating"
  label="Product Rating"
  max={5}
  allowHalf={true}
  color="amber"
  emptyColor="gray"
  hoverColor="yellow"
  showValue={true}
/>

// Heart rating with custom size
<DocyFieldRating
  name="favoriteLevel"
  label="How much do you like this?"
  icon="heart"
  max={5}
  size="lg"
  color="red"
  animation="pulse"
/>

// Thumbs up/down rating
<DocyFieldRating
  name="recommendation"
  label="Would you recommend this?"
  icon="thumb-up"
  max={2}
  ratingTexts={["No", "Yes"]}
  showText={true}
  variant="outlined"
/>

// Custom precision rating with tooltips
<DocyFieldRating
  name="qualityRating"
  label="Quality Rating"
  max={10}
  precision={0.1}
  showValue={true}
  tooltips={[
    "Poor", "Fair", "Good", "Very Good", "Excellent",
    "Outstanding", "Exceptional", "Perfect", "Flawless", "Masterpiece"
  ]}
  showTooltips={true}
/>

// Rating with count display
<DocyFieldRating
  name="averageRating"
  label="Average Rating"
  modelValue={4.3}
  readonly={true}
  showValue={true}
  count={127}
  showCount={true}
  precision={0.1}
/>

// Custom character rating
<DocyFieldRating
  name="difficulty"
  label="Difficulty Level"
  character="🔥"
  max={5}
  size="lg"
  spacing="loose"
  ratingTexts={["Very Easy", "Easy", "Medium", "Hard", "Very Hard"]}
  showText={true}
/>

// Clearable rating with custom texts
<DocyFieldRating
  name="experience"
  label="Experience Rating"
  max={5}
  allowClear={true}
  ratingTexts={["Terrible", "Poor", "Average", "Good", "Excellent"]}
  showText={true}
  onRatingChange={(value) => console.log('Rating changed:', value)}
  onClear={() => console.log('Rating cleared')}
/>

// RTL rating with custom icons
<DocyFieldRating
  name="arabicRating"
  label="التقييم"
  direction="rtl"
  icon={{
    name: "star",
    library: "heroicons",
    variant: "solid"
  }}
  emptyIcon={{
    name: "star",
    library: "heroicons",
    variant: "outline"
  }}
  max={5}
  color="gold"
/>

// Minimal variant with tight spacing
<DocyFieldRating
  name="compactRating"
  label="Quick Rating"
  variant="minimal"
  spacing="tight"
  size="sm"
  max={5}
  animation="none"
/>

// Rating with dynamic computed properties
<DocyFieldRating
  name="conditionalRating"
  label="Service Rating"
  computedRequired={{
    field: "hasUsedService",
    operator: "equals",
    value: true
  }}
  computedLabel="'Rate ' & serviceName & ' service'"
  max={5}
  showValue={true}
  validations={[
    { type: 'min', value: 1, message: 'Please provide a rating' }
  ]}
/>

// Rating with custom validation
<DocyFieldRating
  name="employeeRating"
  label="Employee Performance"
  max={5}
  customValidations={[
    {
      formula: "employee_rating >= 4 and feedback = ''",
      message: "High ratings require written feedback"
    }
  ]}
  onRatingChange={(value) => {
    if (value >= 4) {
      // Show feedback field
      setFieldRequired('feedback', true);
    }
  }}
/>

// Rating with actions
<DocyFieldRating
  name="overallSatisfaction"
  label="Overall Satisfaction"
  max={5}
  actions={{
    change: [
      ['condition', 'overall_satisfaction <= 2', [
        ['setFieldValue', {
          field: 'follow_up_required',
          value: true
        }],
        ['setFieldOption', {
          field: 'improvement_suggestions',
          option: 'required',
          value: true
        }]
      ]],
      ['condition', 'overall_satisfaction >= 4', [
        ['setFieldValue', {
          field: 'testimonial_request',
          value: true
        }]
      ]]
    ]
  }}
/>

// Advanced rating with all features
<DocyFieldRating
  name="comprehensiveRating"
  label="Comprehensive Rating"
  description="Rate all aspects of your experience"
  max={5}
  precision={0.5}
  allowClear={true}
  showValue={true}
  showText={true}
  showCount={true}
  count={89}
  size="lg"
  color="amber"
  variant="filled"
  spacing="normal"
  animation="scale"
  ratingTexts={[
    "Terrible",
    "Poor", 
    "Average",
    "Good",
    "Excellent"
  ]}
  tooltips={[
    "Very unsatisfied",
    "Unsatisfied",
    "Neutral",
    "Satisfied",
    "Very satisfied"
  ]}
  showTooltips={true}
  onRatingChange={(value) => console.log('Rating:', value)}
  onHover={(value) => console.log('Hovering:', value)}
  onClear={() => console.log('Rating cleared')}
  validations={[
    { type: 'required', message: 'Please provide a rating' }
  ]}
/>
```

### Integration Requirements
- **DocyIcon**: For rating icons and visual indicators
- **DocyTooltip**: For rating tooltips and help text
- **DocyButton**: For interactive rating elements
- **Animation Library**: For smooth transitions and hover effects
- **Icon Libraries**: Heroicons, Lucide, or Phosphor for rating icons

### Dependencies Required
- `react-hook-form`: Form state management and validation
- `@radix-ui/react-tooltip`: Tooltip functionality
- `class-variance-authority`: Variant management
- `framer-motion` or `react-spring`: Animation support (optional)
- `@heroicons/react`: Icon library integration
- `lucide-react`: Alternative icon library

### Testing Requirements
1. **Unit Tests**: Props validation, rating calculation, precision handling, state management
2. **Integration Tests**: React Hook Form integration, validation flow, callback execution
3. **Interaction Tests**: Click handling, hover effects, keyboard navigation, touch interactions
4. **Visual Tests**: All size variants, color schemes, icon types, animation states
5. **Accessibility Tests**: ARIA attributes, keyboard navigation, screen reader announcements
6. **Performance Tests**: Large rating scales, animation performance, responsive behavior
7. **Edge Cases**: Boundary values, precision edge cases, clear functionality, validation scenarios

## Development Priority
**Medium-High** - Important for feedback forms, surveys, and user experience rating systems

## Notes
- Built with shadcn/ui design patterns for consistency with the design system
- Supports both controlled and uncontrolled modes through React Hook Form
- Flexible icon system allows for custom rating symbols and characters
- Comprehensive accessibility support ensures inclusive user experience
- Animation system provides smooth and engaging interactions
- Precision system accommodates various rating scales and requirements
- Statistics display enables aggregate rating information presentation
- Responsive design adapts to different screen sizes and input methods