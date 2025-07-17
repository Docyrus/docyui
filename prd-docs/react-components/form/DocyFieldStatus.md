# DocyFieldStatus Component

## Overview
DocyFieldStatus is a comprehensive status selection component that extends DocyFieldBase to provide advanced status management functionality. Built on top of shadcn/ui Select component, it offers status selection with visual indicators including colors, icons, and badges, along with workflow management and status transition controls. The component integrates seamlessly with form systems and provides extensive customization options for complex status-driven workflows.

This component serves as the foundation for status selection interfaces and supports both simple status lists and complex workflow-driven status management with transition rules, permissions, and history tracking.

## Component Specification

### Props
DocyFieldStatus inherits ALL props from DocyFieldBase and adds the following status-specific properties:

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `statuses` | StatusOption[] | [] | No | Array of available status options |
| `statusField` | string | 'status' | No | Field name for status value |
| `colorField` | string | 'color' | No | Field name for status color |
| `iconField` | string | 'icon' | No | Field name for status icon |
| `showIcon` | boolean | true | No | Show status icon in display |
| `showColor` | boolean | true | No | Show status color indicator |
| `showBadge` | boolean | false | No | Display status as badge |
| `badgeVariant` | string | 'default' | No | Badge variant style |
| `workflow` | WorkflowConfig | - | No | Status workflow definition |
| `allowedTransitions` | string[] | - | No | Array of allowed status transitions |
| `transitionRules` | TransitionRules | {} | No | Transition validation rules |
| `confirmTransition` | boolean | false | No | Require confirmation for status changes |
| `confirmMessage` | string | 'Are you sure you want to change the status?' | No | Confirmation dialog message |
| `trackHistory` | boolean | false | No | Track status change history |
| `historyField` | string | 'statusHistory' | No | Field name for history tracking |
| `onTransition` | (from: string, to: string, context: any) => Promise<boolean> | - | No | Status transition callback |
| `onTransitionValidate` | (from: string, to: string, context: any) => Promise<boolean> | - | No | Transition validation callback |
| `onHistoryUpdate` | (history: StatusHistory[]) => void | - | No | History update callback |
| `permissions` | StatusPermissions | {} | No | Status change permissions |
| `groupBy` | string | - | No | Group statuses by field |
| `sortBy` | string | 'order' | No | Sort statuses by field |
| `filterBy` | string | - | No | Filter statuses by field |
| `showTooltip` | boolean | true | No | Show tooltip with status details |
| `tooltipPosition` | string | 'top' | No | Tooltip position |
| `allowCustomStatus` | boolean | false | No | Allow creating custom status |
| `customStatusValidator` | (status: string) => boolean | - | No | Custom status validation |
| `statusPrefix` | string | - | No | Prefix for status display |
| `statusSuffix` | string | - | No | Suffix for status display |
| `compactView` | boolean | false | No | Use compact display mode |
| `animateTransition` | boolean | true | No | Animate status transitions |
| `transitionDuration` | number | 300 | No | Animation duration in milliseconds |

**Note**: DocyFieldStatus inherits all DocyFieldBase props including validation, layout, dynamic computed properties, AI integration, and more. See [DocyFieldBase documentation](./DocyFieldBase.md) for the complete list.

### TypeScript Interfaces

```typescript
interface StatusOption {
  value: string;
  label: string;
  color?: string;
  icon?: string;
  description?: string;
  disabled?: boolean;
  group?: string;
  order?: number;
  permissions?: string[];
  metadata?: Record<string, any>;
}

interface WorkflowConfig {
  states: StatusOption[];
  transitions: WorkflowTransition[];
  initialState?: string;
  finalStates?: string[];
  rules?: WorkflowRule[];
}

interface WorkflowTransition {
  from: string;
  to: string;
  label?: string;
  icon?: string;
  color?: string;
  conditions?: TransitionCondition[];
  actions?: TransitionAction[];
  permissions?: string[];
  confirmation?: {
    required: boolean;
    message: string;
    title?: string;
  };
}

interface TransitionCondition {
  field: string;
  operator: 'equals' | 'not_equals' | 'in' | 'not_in' | 'exists' | 'not_exists';
  value: any;
  message?: string;
}

interface TransitionAction {
  type: 'set_field' | 'clear_field' | 'notify' | 'webhook' | 'custom';
  field?: string;
  value?: any;
  config?: Record<string, any>;
}

interface TransitionRules {
  [fromStatus: string]: {
    [toStatus: string]: {
      conditions?: TransitionCondition[];
      permissions?: string[];
      message?: string;
      autoApprove?: boolean;
    };
  };
}

interface StatusHistory {
  id: string;
  from: string;
  to: string;
  timestamp: Date;
  userId: string;
  userInfo: {
    name: string;
    email: string;
    avatar?: string;
  };
  reason?: string;
  metadata?: Record<string, any>;
}

interface StatusPermissions {
  read?: string[];
  write?: string[];
  [statusValue: string]: string[] | undefined;
}

interface StatusDisplayConfig {
  showIcon: boolean;
  showColor: boolean;
  showBadge: boolean;
  showTooltip: boolean;
  badgeVariant: 'default' | 'secondary' | 'success' | 'warning' | 'error';
  compactView: boolean;
  iconSize: 'sm' | 'md' | 'lg';
  colorType: 'dot' | 'background' | 'border' | 'text';
}
```

### Behavior

1. **Status Selection**:
   - Dropdown selection with visual status indicators
   - Support for icons, colors, and badges
   - Grouped status options with custom ordering
   - Search and filter capabilities

2. **Workflow Management**:
   - Define allowed status transitions
   - Validation rules for status changes
   - Conditional transitions based on form data
   - Automatic actions on status change

3. **Permissions System**:
   - Role-based status change permissions
   - Status-specific read/write controls
   - User-level transition restrictions
   - Permission inheritance and delegation

4. **History Tracking**:
   - Complete status change history
   - User attribution and timestamps
   - Reason tracking for changes
   - Audit trail with metadata

5. **Visual Indicators**:
   - Color-coded status display
   - Icon representation
   - Badge variants and styling
   - Tooltips with detailed information

6. **Transition Controls**:
   - Confirmation dialogs for changes
   - Validation before transitions
   - Automatic field updates
   - Webhook and notification triggers

## Component Requirements

### Technical Specifications
- **Framework**: React 18+ with TypeScript
- **Base Component**: shadcn/ui Select component (`pnpm dlx shadcn@latest add select`)
- **Extensions**: Docy-specific features including workflow management, permissions, history tracking, and visual indicators built on top of shadcn base
- **Wrapper**: Extends DocyFieldBase for consistent field structure
- **Styling**: shadcn/ui Select component with Tailwind CSS v4
- **State Management**: Integration with React Hook Form and form context
- **Accessibility**: WCAG 2.1 AA compliance with full keyboard navigation

### Key Features Required
1. **Workflow Integration**: Complete status workflow management with transitions
2. **Visual Indicators**: Colors, icons, badges, and tooltips for status display
3. **Permission System**: Role-based access control for status changes
4. **History Tracking**: Complete audit trail with user attribution
5. **Validation System**: Comprehensive transition validation and rules
6. **Accessibility**: Full keyboard navigation and screen reader support
7. **Customization**: Flexible display options and custom status support

### Usage Examples

```tsx
// Basic status selection
<DocyFieldStatus
  name="taskStatus"
  label="Task Status"
  statuses={[
    { value: 'todo', label: 'To Do', color: '#gray-500', icon: 'circle' },
    { value: 'progress', label: 'In Progress', color: '#blue-500', icon: 'clock' },
    { value: 'review', label: 'Review', color: '#yellow-500', icon: 'eye' },
    { value: 'done', label: 'Done', color: '#green-500', icon: 'check-circle' }
  ]}
  showIcon={true}
  showColor={true}
  required={true}
/>

// Status with workflow transitions
<DocyFieldStatus
  name="orderStatus"
  label="Order Status"
  statuses={orderStatuses}
  workflow={{
    states: orderStatuses,
    transitions: [
      { from: 'pending', to: 'processing', label: 'Start Processing' },
      { from: 'processing', to: 'shipped', label: 'Ship Order' },
      { from: 'shipped', to: 'delivered', label: 'Mark Delivered' },
      { from: 'processing', to: 'cancelled', label: 'Cancel Order' }
    ],
    initialState: 'pending',
    finalStates: ['delivered', 'cancelled']
  }}
  allowedTransitions={['processing', 'shipped', 'cancelled']}
  confirmTransition={true}
  confirmMessage="Are you sure you want to change the order status?"
  onTransition={async (from, to, context) => {
    await updateOrderStatus(context.orderId, to);
    return true;
  }}
/>

// Status with permissions and history
<DocyFieldStatus
  name="ticketStatus"
  label="Ticket Status"
  statuses={ticketStatuses}
  permissions={{
    read: ['user', 'agent', 'admin'],
    write: ['agent', 'admin'],
    'closed': ['admin'] // Only admins can close tickets
  }}
  trackHistory={true}
  historyField="statusHistory"
  onHistoryUpdate={(history) => {
    console.log('Status history updated:', history);
  }}
  transitionRules={{
    'open': {
      'resolved': {
        conditions: [
          { field: 'resolution', operator: 'exists', message: 'Resolution is required' }
        ],
        permissions: ['agent', 'admin']
      }
    }
  }}
/>

// Badge display with grouping
<DocyFieldStatus
  name="projectStatus"
  label="Project Status"
  statuses={projectStatuses}
  showBadge={true}
  badgeVariant="secondary"
  groupBy="category"
  sortBy="order"
  showTooltip={true}
  tooltipPosition="top"
  compactView={true}
/>

// Custom status with validation
<DocyFieldStatus
  name="customStatus"
  label="Custom Status"
  statuses={baseStatuses}
  allowCustomStatus={true}
  customStatusValidator={(status) => {
    return status.length >= 3 && status.length <= 50;
  }}
  statusPrefix="Status: "
  statusSuffix=" (Custom)"
  onTransitionValidate={async (from, to, context) => {
    // Custom validation logic
    if (to === 'custom') {
      return await validateCustomStatus(context.customStatusValue);
    }
    return true;
  }}
/>

// Advanced workflow with actions
<DocyFieldStatus
  name="documentStatus"
  label="Document Status"
  statuses={documentStatuses}
  workflow={{
    states: documentStatuses,
    transitions: [
      {
        from: 'draft',
        to: 'review',
        label: 'Submit for Review',
        conditions: [
          { field: 'content', operator: 'exists', message: 'Content is required' },
          { field: 'title', operator: 'exists', message: 'Title is required' }
        ],
        actions: [
          { type: 'set_field', field: 'submittedAt', value: new Date() },
          { type: 'notify', config: { recipients: ['reviewers'], template: 'review_requested' } }
        ]
      },
      {
        from: 'review',
        to: 'approved',
        label: 'Approve',
        permissions: ['reviewer', 'admin'],
        confirmation: {
          required: true,
          message: 'Are you sure you want to approve this document?',
          title: 'Confirm Approval'
        },
        actions: [
          { type: 'set_field', field: 'approvedAt', value: new Date() },
          { type: 'set_field', field: 'approvedBy', value: '{{currentUser.id}}' }
        ]
      }
    ]
  }}
  animateTransition={true}
  transitionDuration={500}
/>

// Integration with form validation
<DocyFieldStatus
  name="applicationStatus"
  label="Application Status"
  statuses={applicationStatuses}
  validations={[
    { type: 'required', message: 'Application status is required' }
  ]}
  computedRequired={{
    field: 'submissionType',
    operator: 'equals',
    value: 'formal'
  }}
  actions={{
    change: [
      ['setFieldValue', { field: 'lastStatusChange', value: new Date() }],
      ['setFieldOptionCalculated', { 
        field: 'nextActions', 
        option: 'options', 
        formula: 'workflows[status=$].nextActions' 
      }]
    ]
  }}
/>

// Complex status management with all features
<DocyFieldStatus
  name="complexStatus"
  label="Project Status"
  statuses={complexStatuses}
  workflow={complexWorkflow}
  permissions={statusPermissions}
  trackHistory={true}
  historyField="statusHistory"
  showIcon={true}
  showColor={true}
  showBadge={true}
  showTooltip={true}
  badgeVariant="success"
  groupBy="phase"
  sortBy="order"
  filterBy="active"
  allowCustomStatus={true}
  customStatusValidator={validateCustomStatus}
  confirmTransition={true}
  confirmMessage="This will change the project status. Continue?"
  statusPrefix="Phase: "
  compactView={false}
  animateTransition={true}
  transitionDuration={400}
  onTransition={handleStatusTransition}
  onTransitionValidate={validateStatusTransition}
  onHistoryUpdate={updateStatusHistory}
  validations={[
    { type: 'required', message: 'Status is required' },
    { type: 'custom', validator: validateStatusPermissions, message: 'Insufficient permissions' }
  ]}
/>
```

### Integration Requirements
- **DocyFieldBase**: Base wrapper component (required)
- **DocyIcon**: For status icons and UI elements
- **DocyBadge**: For badge display mode
- **DocyTooltip**: For status tooltips
- **DocySpinner**: For loading states
- **DocyButton**: For action buttons
- **DocyDialog**: For confirmation dialogs
- **DocyUserAvatar**: For history user display
- **DocyTimestamp**: For history timestamps

### Dependencies Required
- `react-hook-form`: Form state management (inherited from DocyFieldBase)
- `@radix-ui/react-select`: Base select component (via shadcn/ui)
- `@radix-ui/react-tooltip`: Tooltip functionality
- `@radix-ui/react-dialog`: Confirmation dialogs
- `class-variance-authority`: Variant management
- `date-fns`: Date formatting for history
- `uuid`: Generate unique IDs for history entries
- All DocyFieldBase dependencies

### Testing Requirements
1. **Unit Tests**: Status selection, workflow transitions, permission checks, history tracking
2. **Integration Tests**: React Hook Form integration, validation, actions system
3. **Visual Tests**: All display modes, badges, colors, icons, tooltips, responsive behavior
4. **Accessibility Tests**: Keyboard navigation, screen reader support, ARIA attributes
5. **Workflow Tests**: Transition validation, permission enforcement, action execution
6. **Permission Tests**: Role-based access control, status-specific permissions

## Development Priority
**High** - Essential component for status-driven workflows across the platform

## Notes
- Built on shadcn/ui Select component for consistent design system integration
- Supports both simple status selection and complex workflow management
- Complete permission system ensures secure status transitions
- History tracking provides full audit trail for compliance
- Flexible visual indicators accommodate various UI requirements
- Complete accessibility compliance ensures inclusive user experience
- Workflow integration enables sophisticated business process automation
- Extensible architecture allows for custom status types and behaviors
- Performance optimized for large status lists and complex workflows
- Integration with existing form systems and validation frameworks