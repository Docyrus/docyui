# DocyAccordion Component

## Overview
DocyAccordion is a vertically stacked set of interactive headings that reveal or hide associated content panels. Built with shadcn/ui patterns and Tailwind CSS v4, it provides a clean, accessible solution for organizing content in collapsible sections. This component is perfect for FAQs, nested navigation, content organization, and space-efficient information display in the Docyrus React application.

## Component Specification

### Props
| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `type` | string | 'single' | No | Accordion behavior: 'single' or 'multiple' |
| `defaultValue` | string \| string[] | - | No | Default open item(s) |
| `value` | string \| string[] | - | No | Controlled open item(s) |
| `onValueChange` | function | - | No | Callback when open items change |
| `collapsible` | boolean | true | No | Allow all items to be closed (single mode) |
| `disabled` | boolean | false | No | Disable all accordion items |
| `className` | string | - | No | Additional CSS classes |
| `children` | ReactNode | - | Yes | DocyAccordionItem components |

### DocyAccordionItem Props
| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `value` | string | - | Yes | Unique identifier for the item |
| `disabled` | boolean | false | No | Disable this specific item |
| `className` | string | - | No | Additional CSS classes |
| `children` | ReactNode | - | Yes | DocyAccordionTrigger and DocyAccordionContent |

### DocyAccordionTrigger Props
| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `children` | ReactNode | - | Yes | Trigger content (heading text) |
| `className` | string | - | No | Additional CSS classes |
| `icon` | string | - | No | Custom icon (uses DocyIcon) |
| `iconPosition` | string | 'right' | No | Icon position: 'left' or 'right' |

### DocyAccordionContent Props
| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `children` | ReactNode | - | Yes | Content to show/hide |
| `className` | string | - | No | Additional CSS classes |

### Accordion Types
1. **single**: Only one item can be open at a time
2. **multiple**: Multiple items can be open simultaneously

### Key Features
- **Smooth Animations**: Fluid expand/collapse transitions
- **Keyboard Navigation**: Full keyboard support (Arrow keys, Enter, Space)
- **Accessibility**: ARIA attributes and focus management
- **Flexible Icons**: Custom icon support with positioning options
- **Controlled/Uncontrolled**: Both controlled and uncontrolled modes
- **Collapsible**: Option to allow all items to be closed

## Component Requirements

### Technical Specifications
- **Framework**: React with TypeScript
- **Base Component**: shadcn/ui Accordion component (`pnpm dlx shadcn@latest add accordion`)
- **Extensions**: Custom icon support, enhanced styling, and Docy-specific enhancements
- **Styling**: shadcn/ui patterns with Radix UI Accordion primitive
- **Animation**: Smooth height transitions with data attributes
- **Accessibility**: Full ARIA support, keyboard navigation, focus management
- **State Management**: Controlled and uncontrolled modes with proper state handling

### Key Features Required
1. **Single/Multiple Modes**: Support for both single and multiple open items
2. **Keyboard Navigation**: Arrow keys, Enter, Space key support
3. **Smooth Animations**: Height-based animations with proper easing
4. **Icon Integration**: Custom icons with flexible positioning
5. **Accessibility**: ARIA attributes, focus management, screen reader support
6. **Controlled State**: Support for both controlled and uncontrolled usage
7. **Collapsible**: Option to allow all items to be closed in single mode
8. **Disable Support**: Disable entire accordion or individual items

### Animation Requirements
- **Expand/Collapse**: Smooth height transitions using CSS transforms
- **Icon Rotation**: Chevron icon rotation animation
- **Performance**: Hardware-accelerated animations for smooth experience
- **Timing**: Consistent animation timing across all interactions

### Usage Examples
```tsx
// Basic accordion (single mode)
<DocyAccordion type="single" defaultValue="item-1">
  <DocyAccordionItem value="item-1">
    <DocyAccordionTrigger>
      What is Docyrus?
    </DocyAccordionTrigger>
    <DocyAccordionContent>
      Docyrus is a comprehensive document management platform designed for modern workflows.
    </DocyAccordionContent>
  </DocyAccordionItem>
  <DocyAccordionItem value="item-2">
    <DocyAccordionTrigger>
      How do I get started?
    </DocyAccordionTrigger>
    <DocyAccordionContent>
      Sign up for an account and follow the onboarding guide to set up your workspace.
    </DocyAccordionContent>
  </DocyAccordionItem>
</DocyAccordion>

// Multiple mode accordion
<DocyAccordion type="multiple" defaultValue={['item-1', 'item-3']}>
  <DocyAccordionItem value="item-1">
    <DocyAccordionTrigger>
      Features Overview
    </DocyAccordionTrigger>
    <DocyAccordionContent>
      <ul>
        <li>Document collaboration</li>
        <li>Real-time editing</li>
        <li>Version control</li>
        <li>Advanced search</li>
      </ul>
    </DocyAccordionContent>
  </DocyAccordionItem>
  <DocyAccordionItem value="item-2">
    <DocyAccordionTrigger>
      Security & Privacy
    </DocyAccordionTrigger>
    <DocyAccordionContent>
      Enterprise-grade security with end-to-end encryption and compliance certifications.
    </DocyAccordionContent>
  </DocyAccordionItem>
  <DocyAccordionItem value="item-3">
    <DocyAccordionTrigger>
      Pricing Plans
    </DocyAccordionTrigger>
    <DocyAccordionContent>
      Choose from our flexible pricing tiers designed for individuals, teams, and enterprises.
    </DocyAccordionContent>
  </DocyAccordionItem>
</DocyAccordion>

// With custom icons
<DocyAccordion type="single" collapsible>
  <DocyAccordionItem value="settings">
    <DocyAccordionTrigger icon="settings" iconPosition="left">
      Account Settings
    </DocyAccordionTrigger>
    <DocyAccordionContent>
      Manage your account preferences, profile information, and security settings.
    </DocyAccordionContent>
  </DocyAccordionItem>
  <DocyAccordionItem value="billing">
    <DocyAccordionTrigger icon="credit-card" iconPosition="left">
      Billing & Subscription
    </DocyAccordionTrigger>
    <DocyAccordionContent>
      View your billing history, update payment methods, and manage subscriptions.
    </DocyAccordionContent>
  </DocyAccordionItem>
</DocyAccordion>

// Controlled accordion
const [openItems, setOpenItems] = useState<string[]>(['item-1']);

<DocyAccordion 
  type="multiple" 
  value={openItems}
  onValueChange={setOpenItems}
>
  <DocyAccordionItem value="item-1">
    <DocyAccordionTrigger>
      Controlled Item 1
    </DocyAccordionTrigger>
    <DocyAccordionContent>
      This accordion is controlled by parent component state.
    </DocyAccordionContent>
  </DocyAccordionItem>
  <DocyAccordionItem value="item-2">
    <DocyAccordionTrigger>
      Controlled Item 2
    </DocyAccordionTrigger>
    <DocyAccordionContent>
      State changes are managed externally.
    </DocyAccordionContent>
  </DocyAccordionItem>
</DocyAccordion>

// Disabled items
<DocyAccordion type="single">
  <DocyAccordionItem value="available">
    <DocyAccordionTrigger>
      Available Feature
    </DocyAccordionTrigger>
    <DocyAccordionContent>
      This feature is currently available and accessible.
    </DocyAccordionContent>
  </DocyAccordionItem>
  <DocyAccordionItem value="disabled" disabled>
    <DocyAccordionTrigger>
      Coming Soon
    </DocyAccordionTrigger>
    <DocyAccordionContent>
      This feature is coming soon and currently disabled.
    </DocyAccordionContent>
  </DocyAccordionItem>
</DocyAccordion>

// Complex content with nested components
<DocyAccordion type="single" defaultValue="documentation">
  <DocyAccordionItem value="documentation">
    <DocyAccordionTrigger>
      API Documentation
    </DocyAccordionTrigger>
    <DocyAccordionContent>
      <div className="space-y-4">
        <DocyCodeView language="typescript">
          {`interface ApiResponse {
  data: any;
  status: number;
  message: string;
}`}
        </DocyCodeView>
        <DocyButton variant="outline" size="sm">
          View Full Documentation
        </DocyButton>
      </div>
    </DocyAccordionContent>
  </DocyAccordionItem>
</DocyAccordion>

// Navigation accordion
<DocyAccordion type="single" className="w-64">
  <DocyAccordionItem value="dashboard">
    <DocyAccordionTrigger icon="home">
      Dashboard
    </DocyAccordionTrigger>
    <DocyAccordionContent>
      <nav className="space-y-2 pl-4">
        <a href="#overview" className="block py-1 text-sm">Overview</a>
        <a href="#analytics" className="block py-1 text-sm">Analytics</a>
        <a href="#reports" className="block py-1 text-sm">Reports</a>
      </nav>
    </DocyAccordionContent>
  </DocyAccordionItem>
  <DocyAccordionItem value="projects">
    <DocyAccordionTrigger icon="folder">
      Projects
    </DocyAccordionTrigger>
    <DocyAccordionContent>
      <nav className="space-y-2 pl-4">
        <a href="#active" className="block py-1 text-sm">Active Projects</a>
        <a href="#archived" className="block py-1 text-sm">Archived</a>
        <a href="#templates" className="block py-1 text-sm">Templates</a>
      </nav>
    </DocyAccordionContent>
  </DocyAccordionItem>
</DocyAccordion>
```

### Integration Requirements
- **DocyIcon**: Icon component for custom trigger icons
- **Forms**: Organizing form sections and field groups
- **Navigation**: Nested menu systems and sidebar navigation
- **Content**: FAQ sections, help documentation, and content organization
- **Data**: Hierarchical data display and filtering interfaces

### Accessibility Requirements
- **ARIA Labels**: Proper accordion labeling and state announcement
- **Keyboard Navigation**: Arrow keys, Enter, Space, Home, End key support
- **Focus Management**: Proper focus handling and visible focus indicators
- **Screen Readers**: Clear content structure and state announcements
- **Semantic HTML**: Proper heading hierarchy and content structure

### Dependencies Required
- `@radix-ui/react-accordion`: Base accordion primitive
- `@radix-ui/react-icons`: Chevron icon for default trigger
- `DocyIcon`: Custom icon component integration
- `class-variance-authority`: For component variants
- `clsx`: For conditional class management

### Testing Requirements
1. **Unit Tests**: Single/multiple modes, controlled/uncontrolled state, disabled items
2. **Integration Tests**: Icon integration, keyboard navigation, focus management
3. **Accessibility Tests**: ARIA attributes, keyboard navigation, screen reader compatibility
4. **Animation Tests**: Smooth transitions, performance under load
5. **Interaction Tests**: Click handling, keyboard interactions, state changes

## Development Priority
**Medium** - Useful for content organization, navigation, and space-efficient information display

## Notes
- Built on Radix UI Accordion primitive for robust accessibility
- Leverages data attributes for smooth CSS animations
- Supports both controlled and uncontrolled usage patterns
- Icon integration provides enhanced visual hierarchy
- Keyboard navigation follows WAI-ARIA accordion pattern
- Smooth animations use CSS transforms for optimal performance
- Flexible content support allows for rich, interactive accordion panels