# DocyWizardPanel Component

## Overview
DocyWizardPanel is a comprehensive wizard/stepper component built with shadcn/ui patterns and Tailwind CSS v4. It provides multiple visual variants for displaying multi-step processes with navigation controls, step validation, and flexible content management. The component supports both simple step navigation and complex form wizards with validation integration.

## Component Specification

### Props
| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `steps` | WizardStep[] | [] | Yes | Array of wizard steps with titles, descriptions, and configurations |
| `activeStepIndex` | number | 0 | No | Currently active step index (0-based) |
| `variant` | string | 'simple' | No | Visual style: 'simple', 'panel', 'panel-border', 'bullet', 'bullet-text', 'circle', 'circle-text', 'progress', 'progress-text' |
| `height` | string \| number | 'full' | No | Container height: 'full', 'fit', or specific pixel value |
| `width` | string \| number | 'full' | No | Container width: 'full', 'fit', or specific pixel value |
| `title` | string | null | No | Main title for progress variants |
| `activeColor` | string | 'sky' | No | Color for active step indicators |
| `completeColor` | string | 'teal' | No | Color for completed step indicators |
| `errorColor` | string | 'red' | No | Color for error step indicators |
| `inactiveColor` | string | 'slate' | No | Color for inactive step indicators |
| `allowNavigation` | boolean | true | No | Enable clicking on steps to navigate |
| `allowReverse` | boolean | true | No | Allow navigation to previous steps |
| `contentScroll` | boolean | true | No | Enable scrolling in content area |
| `autoStepBarScroll` | boolean | true | No | Auto-scroll step bar to active step |
| `buttonAlign` | string | 'center' | No | Button alignment: 'left', 'center', 'right' |
| `nextButton` | ButtonConfig | default | No | Configuration for next button |
| `prevButton` | ButtonConfig | default | No | Configuration for previous button |
| `saveButton` | ButtonConfig | default | No | Configuration for save/finish button |
| `onStepChange` | function | - | No | Callback when step changes |
| `onSave` | function | - | No | Callback when save/finish is clicked |
| `children` | ReactNode | - | No | Content to display for current step |
| `className` | string | - | No | Additional CSS classes |

### Type Definitions
```typescript
interface WizardStep {
  id: string;
  title: string;
  subTitle?: string;
  description?: string;
  status: 'pending' | 'active' | 'complete' | 'error' | 'hidden';
  beforeEnter?: (steps: WizardStep[], currentIndex: number) => boolean;
  content?: ReactNode;
}

interface ButtonConfig {
  size: 'sm' | 'md' | 'lg';
  variant: 'default' | 'secondary' | 'outline' | 'ghost';
  color: string;
  label: string;
  icon?: string;
  disabled?: boolean;
}
```

### Variants

#### 1. Simple (`simple`)
Clean horizontal/vertical step navigation with border indicators and step titles.

#### 2. Panel (`panel`)
Bordered panel style with numbered circles and arrow separators between steps.

#### 3. Panel Border (`panel-border`)
Full-width panel with border styling, numbered indicators, and chevron separators.

#### 4. Bullet (`bullet`)
Minimalist bullet points with step counter and progress indicators.

#### 5. Bullet Text (`bullet-text`)
Vertical bullet navigation with step titles and status indicators.

#### 6. Circle (`circle`)
Circular progress indicators with connecting lines between steps.

#### 7. Circle Text (`circle-text`)
Vertical circular indicators with step titles and descriptions.

#### 8. Progress (`progress`)
Horizontal progress bar with percentage-based completion.

#### 9. Progress Text (`progress-text`)
Progress bar with step titles displayed below the progress indicator.

### Behavior Description

#### Navigation Flow
1. **Forward Navigation**: Users can advance through steps using Next buttons or clicking future steps (if enabled)
2. **Backward Navigation**: Users can return to previous steps using Previous buttons or clicking past steps (if enabled)
3. **Step Validation**: Each step can have a `beforeEnter` function that validates the current step before allowing navigation
4. **Status Management**: Steps maintain status (pending, active, complete, error, hidden) with visual indicators

#### Step Management
- **Active Step**: Currently displayed step with special styling
- **Completed Steps**: Previously finished steps with check marks or completion indicators
- **Error Steps**: Steps with validation errors or issues
- **Hidden Steps**: Steps that are conditionally hidden from navigation

#### Content Management
- **Slot-based Content**: Each step can render custom content through children or step-specific content
- **Responsive Layout**: Adapts to different screen sizes with mobile-optimized navigation
- **Scroll Management**: Handles content overflow with configurable scrolling behavior

## Component Requirements

### Technical Specifications
- **Framework**: React with TypeScript
- **Base Component**: Custom implementation (no direct shadcn/ui equivalent)
- **Integration**: Uses shadcn/ui design tokens and styling patterns
- **Styling**: shadcn/ui patterns with class-variance-authority and Tailwind CSS v4
- **Accessibility**: Full ARIA support, keyboard navigation, focus management
- **Responsive**: Mobile-first design with breakpoint-specific layouts
- **Performance**: Optimized re-renders, proper memoization, efficient DOM updates

### Key Features Required
1. **Multi-Variant Support**: Nine different visual styles for various use cases
2. **Step Status Management**: Complete status tracking with visual indicators
3. **Navigation Control**: Flexible navigation with validation support
4. **Button Configuration**: Customizable navigation buttons with full DocyButton integration
5. **Color Theming**: Consistent color system for all step states
6. **Responsive Design**: Mobile-optimized layouts for all variants
7. **Content Flexibility**: Support for custom content rendering per step
8. **Validation Integration**: Built-in validation support with error handling
9. **Progress Tracking**: Visual progress indicators with percentage completion
10. **Accessibility**: Full keyboard navigation and screen reader support

### Advanced Features
- **Auto-scrolling**: Automatic scroll to active step in navigation
- **Form Integration**: Special form mode with field-level validation
- **Conditional Steps**: Support for hiding/showing steps based on conditions
- **Custom Validation**: Per-step validation functions with error feedback
- **Animation Support**: Smooth transitions between steps and states
- **Keyboard Shortcuts**: Support for keyboard navigation (Enter to advance)

## Usage Examples

### Basic Wizard
```tsx
const steps = [
  { id: 'step1', title: 'Personal Info', status: 'complete' },
  { id: 'step2', title: 'Address', status: 'active' },
  { id: 'step3', title: 'Review', status: 'pending' }
];

<DocyWizardPanel 
  steps={steps} 
  activeStepIndex={1}
  onStepChange={(index, step) => console.log('Step changed:', index, step)}
>
  <div>Step content goes here</div>
</DocyWizardPanel>
```

### Progress Variant
```tsx
<DocyWizardPanel 
  variant="progress"
  steps={steps}
  title="Setup Progress"
  activeColor="blue"
  completeColor="green"
/>
```

### Panel Variant with Custom Buttons
```tsx
<DocyWizardPanel 
  variant="panel"
  steps={steps}
  nextButton={{
    size: 'lg',
    variant: 'default',
    color: 'blue',
    label: 'Continue',
    icon: 'arrow-right'
  }}
  prevButton={{
    size: 'lg',
    variant: 'outline',
    color: 'gray',
    label: 'Back',
    icon: 'arrow-left'
  }}
  allowNavigation={false}
  allowReverse={true}
/>
```

### Circle Text Variant
```tsx
const detailedSteps = [
  {
    id: 'setup',
    title: 'Initial Setup',
    description: 'Configure your basic settings',
    status: 'complete'
  },
  {
    id: 'config',
    title: 'Configuration',
    description: 'Customize your preferences',
    status: 'active'
  },
  {
    id: 'finish',
    title: 'Finish',
    description: 'Review and complete setup',
    status: 'pending'
  }
];

<DocyWizardPanel 
  variant="circle-text"
  steps={detailedSteps}
  height="fit"
  contentScroll={false}
/>
```

### Form Wizard with Validation
```tsx
const formSteps = [
  {
    id: 'personal',
    title: 'Personal Information',
    beforeEnter: (steps, index) => {
      // Validate previous step
      return validatePersonalInfo();
    },
    status: 'active'
  },
  {
    id: 'address',
    title: 'Address Details',
    beforeEnter: (steps, index) => {
      return validateAddress();
    },
    status: 'pending'
  }
];

<DocyWizardPanel 
  variant="panel-border"
  steps={formSteps}
  onSave={handleFormSubmit}
  saveButton={{
    size: 'lg',
    variant: 'default',
    color: 'green',
    label: 'Submit Form',
    icon: 'check'
  }}
/>
```

### Responsive Mobile Layout
```tsx
<DocyWizardPanel 
  variant="bullet"
  steps={steps}
  buttonAlign="right"
  autoStepBarScroll={true}
  className="md:hidden" // Mobile-specific styling
/>
```

### Custom Content Per Step
```tsx
<DocyWizardPanel 
  variant="simple"
  steps={steps}
  activeStepIndex={currentStep}
>
  {currentStep === 0 && <PersonalInfoForm />}
  {currentStep === 1 && <AddressForm />}
  {currentStep === 2 && <ReviewSummary />}
</DocyWizardPanel>
```

### Error Handling
```tsx
const stepsWithError = [
  { id: 'step1', title: 'Step 1', status: 'complete' },
  { id: 'step2', title: 'Step 2', status: 'error' },
  { id: 'step3', title: 'Step 3', status: 'pending' }
];

<DocyWizardPanel 
  variant="circle-text"
  steps={stepsWithError}
  errorColor="red"
  onStepChange={(index, step) => {
    if (step.status === 'error') {
      showErrorMessage('Please fix errors before continuing');
    }
  }}
/>
```

## Dependencies Required
- `@radix-ui/react-slot`: For polymorphic rendering
- `class-variance-authority`: Variant management
- `DocyIcon`: Icon component integration
- `DocyButton`: Button component integration
- `React Hook Form` (optional): Form validation integration
- `Zod` (optional): Schema validation for steps

## Testing Requirements

### Unit Tests
1. **Step Navigation**: Test forward/backward navigation with all variants
2. **Status Management**: Test step status updates and visual indicators
3. **Validation**: Test beforeEnter functions and error handling
4. **Button Configuration**: Test custom button configurations
5. **Props Validation**: Test all prop combinations and edge cases

### Integration Tests
1. **Form Integration**: Test with form libraries and validation
2. **Responsive Behavior**: Test mobile and desktop layouts
3. **Content Rendering**: Test custom content per step
4. **Event Handling**: Test step change and save callbacks

### Accessibility Tests
1. **Keyboard Navigation**: Test arrow keys, Enter, and Tab navigation
2. **Screen Reader**: Test ARIA labels and announcements
3. **Focus Management**: Test focus states and transitions
4. **Color Contrast**: Test all color combinations meet WCAG standards

### Visual Tests
1. **All Variants**: Test visual consistency across variants
2. **Responsive Layouts**: Test mobile and desktop responsive behavior
3. **State Indicators**: Test all step states visual representation
4. **Animation**: Test smooth transitions and hover effects

### Performance Tests
1. **Large Step Sets**: Test with many steps (100+)
2. **Re-render Optimization**: Test memoization and update efficiency
3. **Memory Usage**: Test cleanup and memory leaks
4. **Animation Performance**: Test smooth 60fps animations

## Development Priority
**High** - Core navigation component used in complex forms, onboarding flows, and multi-step processes throughout the application

## Notes
- Built with modern shadcn/ui patterns for consistency and maintainability
- Leverages Tailwind v4's CSS variable system for theme support and color management
- Supports both simple navigation and complex form validation workflows
- Mobile-first responsive design with optimized touch interactions
- Flexible architecture allows for custom step content and validation logic
- Full TypeScript support with excellent IntelliSense and type safety
- Designed for high performance with large numbers of steps and complex content