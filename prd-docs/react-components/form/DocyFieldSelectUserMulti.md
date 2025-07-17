# DocyFieldSelectUserMulti

A comprehensive multi-user selection field component built on shadcn/ui Select with advanced user management features including avatars, tags, roles, groups, and filtering capabilities.

## Component Overview

DocyFieldSelectUserMulti extends the shadcn/ui Select component with Docy-specific features for selecting multiple users. It provides a rich interface with user avatars, role-based filtering, group management, and customizable tag display. The component inherits all base field functionality from DocyFieldBase and adds specialized multi-user selection capabilities.

**Base Component**: shadcn/ui Select (`pnpm dlx shadcn@latest add select`)  
**Extends**: DocyFieldBase  
**Category**: Form Field  
**Type**: Multi-Selection Field

## Props

### Extends DocyFieldBase Props

This component inherits all props from DocyFieldBase including `label`, `description`, `required`, `disabled`, `error`, `validationRules`, etc.

### User Multi-Selection Specific Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `User[]` | `[]` | Array of selected users |
| `maxUsers` | `number` | `undefined` | Maximum number of users that can be selected |
| `minUsers` | `number` | `0` | Minimum number of users required |
| `showAvatars` | `boolean` | `true` | Show user avatars in selected tags |
| `avatarSize` | `"sm" \| "md" \| "lg"` | `"sm"` | Size of avatars in tags |
| `showStatus` | `boolean` | `true` | Show user online/offline status |
| `showRole` | `boolean` | `true` | Show user role in dropdown |
| `showEmail` | `boolean` | `true` | Show user email in dropdown |
| `tagVariant` | `"default" \| "primary" \| "secondary" \| "success" \| "warning" \| "error"` | `"default"` | Visual style variant for selected user tags |
| `tagSize` | `"sm" \| "md" \| "lg"` | `"sm"` | Size of selected user tags |
| `tagLimit` | `number` | `undefined` | Maximum number of tags to display (rest shown as "+N more") |
| `tagClosable` | `boolean` | `true` | Allow removing users by clicking tag close button |
| `filterByRole` | `string[]` | `[]` | Filter users by specific roles |
| `filterByStatus` | `("active" \| "inactive" \| "pending")[]` | `[]` | Filter users by status |
| `filterByGroup` | `string[]` | `[]` | Filter users by specific groups |
| `excludeUsers` | `string[]` | `[]` | Array of user IDs to exclude from selection |
| `searchFields` | `("name" \| "email" \| "role" \| "department")[]` | `["name", "email"]` | Fields to search across |
| `groupBy` | `"role" \| "department" \| "status" \| "none"` | `"none"` | Group users in dropdown |
| `sortBy` | `"name" \| "email" \| "role" \| "lastActive"` | `"name"` | Sort users by field |
| `showSelectAll` | `boolean` | `false` | Show "Select All" option |
| `showClearAll` | `boolean` | `true` | Show "Clear All" option |
| `onUserAdd` | `(user: User) => void` | `undefined` | Callback when user is added |
| `onUserRemove` | `(user: User) => void` | `undefined` | Callback when user is removed |
| `onSelectionChange` | `(users: User[]) => void` | `undefined` | Callback when selection changes |
| `userEndpoint` | `string` | `"/api/users"` | API endpoint for user data |
| `cacheUsers` | `boolean` | `true` | Cache user data for performance |
| `currentUser` | `User` | `undefined` | Current user context |
| `excludeCurrentUser` | `boolean` | `false` | Exclude current user from selection |

## Component Requirements

### Installation

```bash
# Install required shadcn/ui components
pnpm dlx shadcn@latest add select
pnpm dlx shadcn@latest add avatar
pnpm dlx shadcn@latest add badge
pnpm dlx shadcn@latest add input
pnpm dlx shadcn@latest add scroll-area
pnpm dlx shadcn@latest add separator
```

### Dependencies

```json
{
  "dependencies": {
    "@docyrus/field-base": "*",
    "@docyrus/user-avatar": "*",
    "@docyrus/user-badge": "*",
    "@docyrus/user-search": "*",
    "@docyrus/tag": "*",
    "@docyrus/validation": "*",
    "@docyrus/api": "*",
    "react": "^18.0.0",
    "react-dom": "^18.0.0"
  }
}
```

## Key Features Required

### 1. Multi-User Selection
- Select multiple users from dropdown
- Remove users with tag close buttons
- Keyboard navigation support
- Maximum/minimum user limits

### 2. User Display
- User avatars with status indicators
- Role and department badges
- Email addresses
- Online/offline status

### 3. Search & Filtering
- Real-time search across multiple fields
- Filter by role, status, group
- Exclude specific users
- Search highlighting

### 4. User Interface
- Customizable tag appearance
- Tag limit with overflow indicator
- Grouped user display
- Select all/clear all options

### 5. Data Management
- API integration for user data
- Caching for performance
- Lazy loading support
- Real-time user status updates

### 6. Accessibility
- ARIA labels and roles
- Keyboard navigation
- Screen reader support
- Focus management

## Usage Examples

### 1. Basic Multi-User Selection

```tsx
import { DocyFieldSelectUserMulti } from '@docyrus/fields';

function TeamAssignmentForm() {
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);

  return (
    <DocyFieldSelectUserMulti
      label="Assign Team Members"
      description="Select team members for this project"
      value={selectedUsers}
      onChange={setSelectedUsers}
      required
      maxUsers={5}
      showAvatars
      tagClosable
    />
  );
}
```

### 2. Role-Based User Selection

```tsx
import { DocyFieldSelectUserMulti } from '@docyrus/fields';

function ProjectManagerSelection() {
  const [managers, setManagers] = useState<User[]>([]);

  return (
    <DocyFieldSelectUserMulti
      label="Project Managers"
      description="Select project managers with appropriate permissions"
      value={managers}
      onChange={setManagers}
      filterByRole={['project_manager', 'senior_manager']}
      showRole
      showStatus
      maxUsers={3}
      minUsers={1}
      tagVariant="primary"
      groupBy="role"
    />
  );
}
```

### 3. Department-Based Selection with Exclusions

```tsx
import { DocyFieldSelectUserMulti } from '@docyrus/fields';

function ReviewerSelection() {
  const [reviewers, setReviewers] = useState<User[]>([]);
  const currentUser = useCurrentUser();

  return (
    <DocyFieldSelectUserMulti
      label="Document Reviewers"
      description="Select reviewers from the legal department"
      value={reviewers}
      onChange={setReviewers}
      filterByGroup={['legal', 'compliance']}
      excludeCurrentUser
      currentUser={currentUser}
      showEmail
      showRole
      tagLimit={3}
      searchFields={['name', 'email', 'role']}
      onUserAdd={(user) => console.log('Added reviewer:', user.name)}
      onUserRemove={(user) => console.log('Removed reviewer:', user.name)}
    />
  );
}
```

### 4. Large Team Selection with Search

```tsx
import { DocyFieldSelectUserMulti } from '@docyrus/fields';

function CompanyWideSelection() {
  const [participants, setParticipants] = useState<User[]>([]);

  return (
    <DocyFieldSelectUserMulti
      label="Event Participants"
      description="Select participants from across the organization"
      value={participants}
      onChange={setParticipants}
      showSelectAll
      showClearAll
      maxUsers={50}
      tagLimit={5}
      tagSize="md"
      showAvatars
      showStatus
      groupBy="department"
      sortBy="name"
      searchFields={['name', 'email', 'department']}
      userEndpoint="/api/users/active"
      cacheUsers
    />
  );
}
```

### 5. Status-Based Filtering

```tsx
import { DocyFieldSelectUserMulti } from '@docyrus/fields';

function ActiveUserSelection() {
  const [activeUsers, setActiveUsers] = useState<User[]>([]);

  return (
    <DocyFieldSelectUserMulti
      label="Active Contributors"
      description="Select only active users for this workflow"
      value={activeUsers}
      onChange={setActiveUsers}
      filterByStatus={['active']}
      showStatus
      showRole
      tagVariant="success"
      avatarSize="md"
      maxUsers={10}
      onSelectionChange={(users) => {
        console.log('Selection changed:', users.length, 'users selected');
      }}
    />
  );
}
```

### 6. Custom Validation Example

```tsx
import { DocyFieldSelectUserMulti } from '@docyrus/fields';

function ValidatedUserSelection() {
  const [users, setUsers] = useState<User[]>([]);

  const validateUsers = (selectedUsers: User[]) => {
    if (selectedUsers.length < 2) {
      return 'At least 2 users must be selected';
    }
    
    const hasManager = selectedUsers.some(user => 
      user.role === 'manager' || user.role === 'senior_manager'
    );
    
    if (!hasManager) {
      return 'At least one manager must be selected';
    }
    
    return null;
  };

  return (
    <DocyFieldSelectUserMulti
      label="Project Team"
      description="Select team with at least one manager"
      value={users}
      onChange={setUsers}
      validationRules={[validateUsers]}
      showRole
      showStatus
      minUsers={2}
      maxUsers={8}
      tagVariant="primary"
      groupBy="role"
    />
  );
}
```

### 7. Integration with Form Library

```tsx
import { useForm } from 'react-hook-form';
import { DocyFieldSelectUserMulti } from '@docyrus/fields';

interface FormData {
  assignedUsers: User[];
  reviewers: User[];
  approvers: User[];
}

function WorkflowForm() {
  const { control, handleSubmit } = useForm<FormData>();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <DocyFieldSelectUserMulti
        name="assignedUsers"
        label="Assigned Users"
        control={control}
        required
        maxUsers={5}
        showAvatars
        tagClosable
      />
      
      <DocyFieldSelectUserMulti
        name="reviewers"
        label="Reviewers"
        control={control}
        filterByRole={['reviewer', 'senior_reviewer']}
        minUsers={1}
        maxUsers={3}
        showRole
      />
      
      <DocyFieldSelectUserMulti
        name="approvers"
        label="Final Approvers"
        control={control}
        filterByRole={['approver', 'manager']}
        minUsers={1}
        maxUsers={2}
        tagVariant="success"
      />
    </form>
  );
}
```

## Integration Requirements

### API Integration

```typescript
// Expected User interface
interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: string;
  department: string;
  status: 'active' | 'inactive' | 'pending';
  lastActive: Date;
  groups: string[];
}

// Expected API response
interface UserResponse {
  users: User[];
  total: number;
  page: number;
  hasMore: boolean;
}
```

### Event Handlers

```typescript
// User selection events
onUserAdd?: (user: User) => void;
onUserRemove?: (user: User) => void;
onSelectionChange?: (users: User[]) => void;

// Search events
onSearchChange?: (query: string) => void;
onFilterChange?: (filters: UserFilters) => void;
```

### Styling Integration

```css
/* Custom CSS variables for theming */
:root {
  --docy-user-tag-bg: var(--color-background-secondary);
  --docy-user-tag-border: var(--color-border-primary);
  --docy-user-tag-text: var(--color-text-primary);
  --docy-user-avatar-size-sm: 24px;
  --docy-user-avatar-size-md: 32px;
  --docy-user-avatar-size-lg: 40px;
  --docy-user-status-active: var(--color-success);
  --docy-user-status-inactive: var(--color-neutral);
}
```

## Testing Requirements

### Unit Tests

```typescript
describe('DocyFieldSelectUserMulti', () => {
  it('should select multiple users', () => {
    // Test multi-user selection
  });

  it('should respect maxUsers limit', () => {
    // Test maximum user constraint
  });

  it('should filter users by role', () => {
    // Test role-based filtering
  });

  it('should show user avatars and status', () => {
    // Test user display features
  });

  it('should handle search across multiple fields', () => {
    // Test search functionality
  });
});
```

### Integration Tests

```typescript
describe('DocyFieldSelectUserMulti Integration', () => {
  it('should integrate with form validation', () => {
    // Test form integration
  });

  it('should handle API data loading', () => {
    // Test API integration
  });

  it('should support keyboard navigation', () => {
    // Test accessibility
  });
});
```

### Accessibility Tests

```typescript
describe('DocyFieldSelectUserMulti Accessibility', () => {
  it('should have proper ARIA labels', () => {
    // Test ARIA implementation
  });

  it('should support keyboard navigation', () => {
    // Test keyboard accessibility
  });

  it('should work with screen readers', () => {
    // Test screen reader compatibility
  });
});
```

## Performance Considerations

1. **User Data Caching**: Implement caching for frequently accessed user data
2. **Lazy Loading**: Load users on-demand for large datasets
3. **Search Debouncing**: Debounce search input to reduce API calls
4. **Virtual Scrolling**: Use virtual scrolling for large user lists
5. **Memoization**: Memoize expensive computations and renders

## Migration Guide

### From DocyFieldSelectUser (Single)

```typescript
// Before (single user)
<DocyFieldSelectUser
  value={selectedUser}
  onChange={setSelectedUser}
/>

// After (multi user)
<DocyFieldSelectUserMulti
  value={selectedUser ? [selectedUser] : []}
  onChange={(users) => setSelectedUser(users[0])}
  maxUsers={1}
/>
```

### From Legacy Multi-Select

```typescript
// Before (legacy)
<DocyUserMultiSelect
  users={users}
  onUserChange={handleUserChange}
/>

// After (new component)
<DocyFieldSelectUserMulti
  value={users}
  onChange={handleUserChange}
  showAvatars
  tagClosable
/>
```