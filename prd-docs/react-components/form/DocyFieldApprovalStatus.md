# DocyFieldApprovalStatus Component

## Overview
DocyFieldApprovalStatus is a specialized approval workflow component that extends DocyFieldBase to provide comprehensive approval process management functionality. Built on top of shadcn/ui Select component, it offers sophisticated approval workflow capabilities including status progression, permissions-based transitions, approval history tracking, comment systems, and notification integration. The component seamlessly integrates with form systems and provides extensive customization options for complex approval-driven processes.

This component serves as the foundation for approval workflow interfaces and supports both simple approval chains and complex multi-stage approval processes with delegation, escalation, and audit trail capabilities.

## Component Specification

### Props
DocyFieldApprovalStatus inherits ALL props from DocyFieldBase and adds the following approval-specific properties:

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `workflow` | ApprovalWorkflow | - | No | Approval workflow definition with stages and transitions |
| `currentStatus` | string | - | No | Current approval status value |
| `allowedTransitions` | string[] | - | No | Array of allowed status transitions for current user |
| `permissions` | ApprovalPermissions | {} | No | User permissions for each approval status |
| `showHistory` | boolean | true | No | Display approval history panel |
| `historyLimit` | number | 10 | No | Maximum number of history items to display |
| `showComments` | boolean | true | No | Show comment input for approval actions |
| `requireComment` | boolean | false | No | Require comment for status changes |
| `commentPlaceholder` | string | 'Add a comment...' | No | Placeholder text for comment input |
| `showApprover` | boolean | true | No | Display approver information |
| `approverField` | string | 'approver' | No | Field name for approver data |
| `showTimestamp` | boolean | true | No | Display timestamps for approval actions |
| `showNotifications` | boolean | true | No | Show notification settings panel |
| `emailNotifications` | boolean | true | No | Enable email notifications for approval actions |
| `slackNotifications` | boolean | false | No | Enable Slack notifications for approval actions |
| `onStatusChange` | (status: string, comment?: string) => Promise<void> | - | No | Callback when status changes |
| `onApprove` | (comment?: string) => Promise<void> | - | No | Callback for approve action |
| `onReject` | (comment?: string) => Promise<void> | - | No | Callback for reject action |
| `onDelegate` | (userId: string, comment?: string) => Promise<void> | - | No | Callback for delegate action |
| `onCommentAdd` | (comment: string) => Promise<void> | - | No | Callback when comment is added |
| `validateTransition` | (from: string, to: string, context: any) => Promise<boolean> | - | No | Validation function for status transitions |
| `formatStatus` | (status: string) => string | - | No | Custom status display formatter |
| `customActions` | ApprovalAction[] | [] | No | Additional custom action buttons |
| `showBadge` | boolean | true | No | Display status as badge |
| `badgeVariant` | string | 'default' | No | Badge variant style (default, success, warning, error) |
| `escalationRules` | EscalationRule[] | [] | No | Automatic escalation rules for delayed approvals |
| `parallelApproval` | boolean | false | No | Enable parallel approval mode |
| `minimumApprovals` | number | 1 | No | Minimum number of approvals required |
| `autoAdvance` | boolean | false | No | Automatically advance to next stage when requirements met |
| `deadlineField` | string | 'deadline' | No | Field name for approval deadline |
| `showDeadline` | boolean | true | No | Display approval deadline |
| `priorityField` | string | 'priority' | No | Field name for approval priority |
| `showPriority` | boolean | true | No | Display approval priority indicator |
| `auditTrail` | boolean | true | No | Enable complete audit trail logging |
| `maxHistoryItems` | number | 50 | No | Maximum history items to store |
| `compactView` | boolean | false | No | Use compact display mode |
| `showProgress` | boolean | true | No | Display approval progress indicator |
| `animateTransitions` | boolean | true | No | Animate status transitions |
| `delegationEnabled` | boolean | true | No | Allow approval delegation |
| `escalationEnabled` | boolean | true | No | Enable automatic escalation |
| `bulkActions` | boolean | false | No | Enable bulk approval actions |

**Note**: DocyFieldApprovalStatus inherits all DocyFieldBase props including validation, layout, dynamic computed properties, AI integration, and more. See [DocyFieldBase documentation](./DocyFieldBase.md) for the complete list.

### TypeScript Interfaces

```typescript
interface ApprovalWorkflow {
  id: string;
  name: string;
  description?: string;
  stages: ApprovalStage[];
  transitions: ApprovalTransition[];
  initialStage: string;
  finalStages: string[];
  settings: WorkflowSettings;
}

interface ApprovalStage {
  id: string;
  name: string;
  description?: string;
  type: 'approval' | 'review' | 'notification' | 'custom';
  icon?: string;
  color?: string;
  order: number;
  required: boolean;
  approvers: ApproverConfig[];
  conditions?: ApprovalCondition[];
  actions?: ApprovalAction[];
  timeouts?: TimeoutConfig;
  delegation?: DelegationConfig;
  escalation?: EscalationConfig;
}

interface ApprovalTransition {
  id: string;
  from: string;
  to: string;
  label: string;
  action: 'approve' | 'reject' | 'delegate' | 'escalate' | 'return' | 'custom';
  icon?: string;
  color?: string;
  permissions?: string[];
  conditions?: ApprovalCondition[];
  requireComment?: boolean;
  confirmationMessage?: string;
  notifications?: NotificationConfig[];
  actions?: ApprovalAction[];
}

interface ApprovalCondition {
  field: string;
  operator: 'equals' | 'not_equals' | 'in' | 'not_in' | 'greater_than' | 'less_than' | 'exists' | 'not_exists';
  value: any;
  message?: string;
}

interface ApproverConfig {
  type: 'user' | 'role' | 'group' | 'dynamic';
  value: string | string[];
  required?: boolean;
  order?: number;
  conditions?: ApprovalCondition[];
  fallback?: ApproverConfig;
}

interface ApprovalPermissions {
  read?: string[];
  write?: string[];
  approve?: string[];
  reject?: string[];
  delegate?: string[];
  escalate?: string[];
  comment?: string[];
  [stageName: string]: string[] | undefined;
}

interface ApprovalHistory {
  id: string;
  timestamp: Date;
  action: 'approve' | 'reject' | 'delegate' | 'escalate' | 'comment' | 'return';
  from?: string;
  to?: string;
  user: ApprovalUser;
  comment?: string;
  attachments?: ApprovalAttachment[];
  metadata?: Record<string, any>;
  duration?: number;
  delegatedTo?: ApprovalUser;
  escalatedTo?: ApprovalUser;
}

interface ApprovalUser {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role?: string;
  department?: string;
  title?: string;
}

interface ApprovalAction {
  id: string;
  type: 'approve' | 'reject' | 'delegate' | 'escalate' | 'return' | 'comment' | 'custom';
  label: string;
  icon?: string;
  color?: string;
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  permissions?: string[];
  conditions?: ApprovalCondition[];
  requireComment?: boolean;
  confirmationMessage?: string;
  handler?: (context: ApprovalContext) => Promise<void>;
}

interface ApprovalContext {
  currentStatus: string;
  workflow: ApprovalWorkflow;
  history: ApprovalHistory[];
  user: ApprovalUser;
  formData: Record<string, any>;
  permissions: ApprovalPermissions;
  metadata: Record<string, any>;
}

interface EscalationRule {
  id: string;
  condition: 'timeout' | 'no_action' | 'custom';
  delay: number; // in minutes
  escalateTo: ApproverConfig;
  message?: string;
  actions?: ApprovalAction[];
  notifications?: NotificationConfig[];
}

interface TimeoutConfig {
  duration: number; // in minutes
  warningAt?: number; // minutes before timeout
  actions?: ApprovalAction[];
  escalation?: EscalationRule;
}

interface DelegationConfig {
  enabled: boolean;
  allowedRoles?: string[];
  requireApproval?: boolean;
  maxDelegations?: number;
  timeLimit?: number;
}

interface EscalationConfig {
  enabled: boolean;
  rules: EscalationRule[];
  maxEscalations?: number;
  finalApprover?: ApproverConfig;
}

interface NotificationConfig {
  type: 'email' | 'slack' | 'webhook' | 'push';
  recipients: string[];
  template?: string;
  delay?: number;
  conditions?: ApprovalCondition[];
  config?: Record<string, any>;
}

interface WorkflowSettings {
  parallelApproval: boolean;
  minimumApprovals: number;
  autoAdvance: boolean;
  requireComments: boolean;
  allowDelegation: boolean;
  allowEscalation: boolean;
  trackHistory: boolean;
  notificationsEnabled: boolean;
  deadlineEnforcement: boolean;
  auditTrail: boolean;
}

interface ApprovalAttachment {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
  uploadedBy: string;
  uploadedAt: Date;
}

interface ApprovalProgress {
  currentStage: string;
  completedStages: string[];
  totalStages: number;
  progressPercentage: number;
  estimatedCompletion?: Date;
  blockedBy?: string[];
}
```

### Behavior

1. **Approval Workflow Management**:
   - Multi-stage approval process with configurable stages
   - Flexible transition rules and conditions
   - Parallel and sequential approval modes
   - Automatic progression and stage validation

2. **Permission System**:
   - Role-based approval permissions
   - Stage-specific access control
   - Dynamic permission evaluation
   - Permission inheritance and delegation

3. **History and Audit Trail**:
   - Complete approval history tracking
   - User attribution with timestamps
   - Comment and attachment support
   - Audit trail for compliance

4. **Comment System**:
   - Rich comment support with formatting
   - Attachment capabilities
   - Required comments for actions
   - Comment threads and replies

5. **Notification Integration**:
   - Email and Slack notifications
   - Customizable notification templates
   - Delayed and conditional notifications
   - Bulk notification management

6. **Delegation and Escalation**:
   - Approval delegation to other users
   - Automatic escalation rules
   - Timeout-based escalation
   - Escalation chains and fallbacks

7. **Status Progression**:
   - Visual progress indicators
   - Deadline tracking and warnings
   - Priority-based processing
   - Batch approval operations

8. **Validation and Controls**:
   - Transition validation rules
   - Condition-based approvals
   - Custom validation functions
   - Business rule enforcement

## Component Requirements

### Technical Specifications
- **Framework**: React 18+ with TypeScript
- **Base Component**: shadcn/ui Select component (`pnpm dlx shadcn@latest add select`)
- **Extensions**: Docy-specific features including approval workflow management, permissions, history tracking, comments, notifications, and delegation built on top of shadcn base
- **Wrapper**: Extends DocyFieldBase for consistent field structure
- **Styling**: shadcn/ui Select component with Tailwind CSS v4
- **State Management**: Integration with React Hook Form and form context
- **Accessibility**: WCAG 2.1 AA compliance with full keyboard navigation

### Key Features Required
1. **Approval Workflow Engine**: Complete workflow management with stages and transitions
2. **Permission System**: Role-based access control with dynamic evaluation
3. **History and Audit**: Complete audit trail with user attribution and timestamps
4. **Comment System**: Rich commenting with attachments and threading
5. **Notification Integration**: Email, Slack, and webhook notifications
6. **Delegation and Escalation**: User delegation and automatic escalation
7. **Progress Tracking**: Visual progress indicators and deadline management
8. **Validation System**: Comprehensive transition validation and business rules
9. **Bulk Operations**: Batch approval and bulk action support
10. **Accessibility**: Full keyboard navigation and screen reader support

### Usage Examples

```tsx
// Basic approval workflow
<DocyFieldApprovalStatus
  name="documentApproval"
  label="Document Approval"
  workflow={{
    id: 'doc-approval',
    name: 'Document Approval',
    stages: [
      { id: 'draft', name: 'Draft', type: 'notification', order: 1, required: false, approvers: [] },
      { id: 'review', name: 'Review', type: 'review', order: 2, required: true, approvers: [{ type: 'role', value: 'reviewer' }] },
      { id: 'approved', name: 'Approved', type: 'approval', order: 3, required: true, approvers: [{ type: 'role', value: 'manager' }] }
    ],
    transitions: [
      { id: 'submit', from: 'draft', to: 'review', label: 'Submit for Review', action: 'approve' },
      { id: 'approve', from: 'review', to: 'approved', label: 'Approve', action: 'approve' },
      { id: 'reject', from: 'review', to: 'draft', label: 'Reject', action: 'reject' }
    ],
    initialStage: 'draft',
    finalStages: ['approved'],
    settings: {
      parallelApproval: false,
      minimumApprovals: 1,
      autoAdvance: true,
      requireComments: false,
      allowDelegation: true,
      allowEscalation: true,
      trackHistory: true,
      notificationsEnabled: true,
      deadlineEnforcement: true,
      auditTrail: true
    }
  }}
  currentStatus="review"
  showHistory={true}
  showComments={true}
  requireComment={true}
  onApprove={async (comment) => {
    await approveDocument(documentId, comment);
  }}
  onReject={async (comment) => {
    await rejectDocument(documentId, comment);
  }}
/>

// Approval workflow with permissions
<DocyFieldApprovalStatus
  name="expenseApproval"
  label="Expense Approval"
  workflow={expenseWorkflow}
  permissions={{
    read: ['employee', 'manager', 'finance'],
    write: ['employee'],
    approve: ['manager', 'finance'],
    reject: ['manager', 'finance'],
    delegate: ['manager'],
    escalate: ['finance'],
    comment: ['employee', 'manager', 'finance']
  }}
  showApprover={true}
  approverField="approver"
  showTimestamp={true}
  showNotifications={true}
  emailNotifications={true}
  slackNotifications={true}
  onStatusChange={async (status, comment) => {
    await updateExpenseStatus(expenseId, status, comment);
  }}
  onDelegate={async (userId, comment) => {
    await delegateExpenseApproval(expenseId, userId, comment);
  }}
/>

// Complex approval with escalation
<DocyFieldApprovalStatus
  name="contractApproval"
  label="Contract Approval"
  workflow={contractWorkflow}
  escalationRules={[
    {
      id: 'manager-timeout',
      condition: 'timeout',
      delay: 1440, // 24 hours
      escalateTo: { type: 'role', value: 'senior-manager' },
      message: 'Contract approval has been escalated due to timeout',
      actions: [
        { id: 'notify', type: 'comment', label: 'Escalated', handler: async (context) => {
          await addEscalationComment(context);
        }}
      ]
    }
  ]}
  parallelApproval={true}
  minimumApprovals={2}
  autoAdvance={false}
  deadlineField="approvalDeadline"
  showDeadline={true}
  priorityField="priority"
  showPriority={true}
  validateTransition={async (from, to, context) => {
    return await validateContractTransition(from, to, context);
  }}
/>

// Approval with custom actions
<DocyFieldApprovalStatus
  name="leaveApproval"
  label="Leave Request Approval"
  workflow={leaveWorkflow}
  customActions={[
    {
      id: 'approve-with-conditions',
      type: 'custom',
      label: 'Approve with Conditions',
      icon: 'check-circle',
      color: 'orange',
      variant: 'warning',
      requireComment: true,
      handler: async (context) => {
        await approveLeaveWithConditions(context);
      }
    },
    {
      id: 'request-more-info',
      type: 'custom',
      label: 'Request More Info',
      icon: 'info-circle',
      color: 'blue',
      variant: 'secondary',
      handler: async (context) => {
        await requestMoreInformation(context);
      }
    }
  ]}
  showBadge={true}
  badgeVariant="success"
  formatStatus={(status) => {
    return `Leave ${status.charAt(0).toUpperCase() + status.slice(1)}`;
  }}
/>

// Approval with history and comments
<DocyFieldApprovalStatus
  name="budgetApproval"
  label="Budget Approval"
  workflow={budgetWorkflow}
  showHistory={true}
  historyLimit={20}
  showComments={true}
  requireComment={true}
  commentPlaceholder="Add your approval comment or feedback..."
  auditTrail={true}
  maxHistoryItems={100}
  onCommentAdd={async (comment) => {
    await addBudgetComment(budgetId, comment);
  }}
  onHistoryUpdate={(history) => {
    console.log('Budget approval history updated:', history);
  }}
/>

// Compact approval view
<DocyFieldApprovalStatus
  name="taskApproval"
  label="Task Approval"
  workflow={taskWorkflow}
  compactView={true}
  showProgress={true}
  animateTransitions={true}
  delegationEnabled={true}
  escalationEnabled={false}
  bulkActions={true}
  showBadge={true}
  badgeVariant="default"
/>

// Integration with form validation
<DocyFieldApprovalStatus
  name="projectApproval"
  label="Project Approval"
  workflow={projectWorkflow}
  validations={[
    { type: 'required', message: 'Project approval status is required' }
  ]}
  computedRequired={{
    field: 'projectType',
    operator: 'equals',
    value: 'enterprise'
  }}
  actions={{
    change: [
      ['setFieldValue', { field: 'lastApprovalChange', value: new Date() }],
      ['setFieldOptionCalculated', { 
        field: 'nextApprovalStage', 
        option: 'options', 
        formula: 'workflow.stages[status=$].nextStages' 
      }]
    ]
  }}
/>

// Full-featured approval system
<DocyFieldApprovalStatus
  name="comprehensiveApproval"
  label="Comprehensive Approval"
  workflow={comprehensiveWorkflow}
  permissions={fullPermissions}
  currentStatus="pending"
  allowedTransitions={['review', 'approved', 'rejected']}
  showHistory={true}
  historyLimit={15}
  showComments={true}
  requireComment={true}
  commentPlaceholder="Enter your approval decision and comments..."
  showApprover={true}
  approverField="currentApprover"
  showTimestamp={true}
  showNotifications={true}
  emailNotifications={true}
  slackNotifications={true}
  customActions={customApprovalActions}
  showBadge={true}
  badgeVariant="primary"
  escalationRules={escalationRules}
  parallelApproval={false}
  minimumApprovals={1}
  autoAdvance={true}
  deadlineField="approvalDeadline"
  showDeadline={true}
  priorityField="priority"
  showPriority={true}
  auditTrail={true}
  maxHistoryItems={50}
  compactView={false}
  showProgress={true}
  animateTransitions={true}
  delegationEnabled={true}
  escalationEnabled={true}
  bulkActions={false}
  onStatusChange={handleStatusChange}
  onApprove={handleApprove}
  onReject={handleReject}
  onDelegate={handleDelegate}
  onCommentAdd={handleCommentAdd}
  validateTransition={validateApprovalTransition}
  formatStatus={formatApprovalStatus}
/>
```

### Integration Requirements
- **DocyFieldBase**: Base wrapper component (required)
- **DocyIcon**: For approval icons and UI elements
- **DocyBadge**: For status badge display
- **DocyButton**: For action buttons
- **DocyDialog**: For confirmation dialogs
- **DocyTooltip**: For help tooltips
- **DocyProgress**: For workflow progress indicators
- **DocyTextarea**: For comment input
- **DocyUserAvatar**: For user display in history
- **DocyTimestamp**: For approval timestamps
- **DocyNotificationPanel**: For notification settings
- **DocySpinner**: For loading states
- **DocyAccordion**: For collapsible history sections

### Dependencies Required
- `react-hook-form`: Form state management (inherited from DocyFieldBase)
- `@radix-ui/react-select`: Base select component (via shadcn/ui)
- `@radix-ui/react-dialog`: Confirmation dialogs
- `@radix-ui/react-tooltip`: Tooltip functionality
- `@radix-ui/react-progress`: Progress indicators
- `@radix-ui/react-accordion`: Collapsible sections
- `class-variance-authority`: Variant management
- `date-fns`: Date formatting and manipulation
- `uuid`: Generate unique IDs for history entries
- `jsonata`: For computed formula evaluation
- `react-hook-form-resolvers`: Form validation
- All DocyFieldBase dependencies

### Testing Requirements
1. **Unit Tests**: Approval workflow logic, permission validation, history tracking, comment system
2. **Integration Tests**: React Hook Form integration, validation, actions system, notification triggers
3. **Workflow Tests**: Stage transitions, escalation rules, delegation logic, parallel approvals
4. **Permission Tests**: Role-based access control, dynamic permission evaluation, security validation
5. **Visual Tests**: All display modes, badges, progress indicators, compact view, responsive behavior
6. **Accessibility Tests**: Keyboard navigation, screen reader support, ARIA attributes, focus management
7. **Performance Tests**: Large workflow handling, history pagination, bulk operations, real-time updates
8. **Notification Tests**: Email delivery, Slack integration, webhook calls, notification scheduling

## Development Priority
**High** - Critical component for approval-driven workflows across business processes

## Notes
- Built on shadcn/ui Select component for consistent design system integration
- Supports both simple approval chains and complex multi-stage workflows
- Complete permission system ensures secure approval processes
- History tracking provides full audit trail for compliance requirements
- Flexible notification system integrates with multiple channels
- Delegation and escalation features handle complex approval scenarios
- Progress tracking provides clear visibility into approval status
- Comment system enables rich collaboration during approval process
- Complete accessibility compliance ensures inclusive user experience
- Workflow integration enables sophisticated business process automation
- Extensible architecture allows for custom approval types and behaviors
- Performance optimized for large approval workflows and history management
- Integration with existing form systems and validation frameworks
- Comprehensive testing coverage ensures reliability in production environments