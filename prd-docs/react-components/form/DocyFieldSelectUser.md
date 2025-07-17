# DocyFieldSelectUser Component

## Overview
DocyFieldSelectUser is a specialized user selection component that extends DocyFieldBase to provide advanced user selection functionality. Built on top of shadcn/ui Select component, it offers sophisticated user selection capabilities with features like avatar display, user search, role-based filtering, group management, status indicators, and permissions handling. The component integrates seamlessly with form systems and provides extensive customization options for user assignment scenarios.

This component serves as the foundation for user selection interfaces and supports both simple user lists and complex data-driven selections with remote loading capabilities, making it ideal for task assignments, team management, approval workflows, and other user-centric scenarios.

## Component Specification

### Props
DocyFieldSelectUser inherits ALL props from DocyFieldBase and adds the following user-specific properties:

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `multiple` | boolean | false | No | Allow multiple user selection |
| `showAvatar` | boolean | true | No | Show user avatars in options and selections |
| `avatarSize` | 'xs' \| 'sm' \| 'md' \| 'lg' | 'sm' | No | Size of user avatars |
| `showStatus` | boolean | true | No | Show user online/offline status |
| `showRole` | boolean | true | No | Show user role information |
| `showEmail` | boolean | true | No | Show user email address |
| `filterByRole` | string[] | [] | No | Filter users by specific roles |
| `filterByStatus` | ('active' \| 'inactive' \| 'pending')[] | ['active'] | No | Filter users by status |
| `filterByGroup` | string[] | [] | No | Filter users by group membership |
| `excludeUsers` | string[] | [] | No | Exclude specific users from selection |
| `searchFields` | string[] | ['name', 'email'] | No | Fields to search across |
| `searchPlaceholder` | string | 'Search users...' | No | Search input placeholder text |
| `groupBy` | 'role' \| 'department' \| 'team' \| 'status' | - | No | Group users by specified field |
| `sortBy` | 'name' \| 'email' \| 'role' \| 'lastSeen' | 'name' | No | Sort users by specified field |
| `showGroups` | boolean | false | No | Show user group information |
| `showPermissions` | boolean | false | No | Show user permission levels |
| `onUserChange` | (users: UserOption[]) => void | - | No | Callback when user selection changes |
| `onUserAdd` | (user: UserOption) => void | - | No | Callback when user is added to selection |
| `onUserRemove` | (user: UserOption) => void | - | No | Callback when user is removed from selection |
| `userEndpoint` | string | '/api/users' | No | API endpoint for fetching user data |
| `cacheUsers` | boolean | true | No | Cache user data for performance |
| `refreshInterval` | number | 300000 | No | Auto-refresh interval in milliseconds (5 minutes) |
| `currentUser` | UserOption | - | No | Current user context for filtering |
| `excludeCurrentUser` | boolean | false | No | Exclude current user from selection |
| `maxSelections` | number | - | No | Maximum number of users that can be selected |
| `minSelections` | number | - | No | Minimum number of users required |
| `allowClear` | boolean | false | No | Show clear button to reset selection |
| `searchable` | boolean | true | No | Enable user search functionality |
| `remote` | boolean | true | No | Enable remote user data loading |
| `virtualScroll` | boolean | false | No | Enable virtual scrolling for large user lists |
| `onSearch` | (query: string) => Promise<UserOption[]> | - | No | Custom search handler for remote data |
| `hasNextPage` | boolean | false | No | Whether more users can be loaded |
| `onLoadMore` | () => void | - | No | Handler for loading more users |
| `loadingText` | string | 'Loading users...' | No | Text displayed during loading |
| `noResultsText` | string | 'No users found' | No | Text when search returns no results |
| `emptyText` | string | 'No users available' | No | Text when no users exist |
| `maxHeight` | number | 300 | No | Maximum height of dropdown |
| `debounceMs` | number | 300 | No | Debounce delay for search input |
| `minSearchLength` | number | 2 | No | Minimum characters required to trigger search |
| `customUserRenderer` | (user: UserOption) => ReactNode | - | No | Custom renderer for user options |
| `customSelectionRenderer` | (user: UserOption) => ReactNode | - | No | Custom renderer for selected users |
| `showSelectAll` | boolean | false | No | Show select all users option (multiple mode) |
| `selectAllLabel` | string | 'Select All Users' | No | Label for select all button |
| `tagVariant` | 'default' \| 'secondary' \| 'destructive' \| 'outline' | 'default' | No | Visual variant for selected user tags |
| `tagSize` | 'sm' \| 'md' \| 'lg' | 'sm' | No | Size of selected user tags |
| `tagClosable` | boolean | true | No | Allow individual user tags to be closed |
| `showUserCount` | boolean | false | No | Show count of selected users |
| `countFormat` | string | '{count} users selected' | No | Format string for user count display |

**Note**: DocyFieldSelectUser inherits all DocyFieldBase props including validation, layout, dynamic computed properties, AI integration, and more. See [DocyFieldBase documentation](./DocyFieldBase.md) for the complete list.

### TypeScript Interfaces

```typescript
interface UserOption {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role?: string;
  department?: string;
  team?: string;
  status: 'active' | 'inactive' | 'pending';
  isOnline?: boolean;
  lastSeen?: Date;
  groups?: string[];
  permissions?: string[];
  metadata?: Record<string, any>;
}

interface UserSelectProps extends DocyFieldBaseProps {
  multiple?: boolean;
  showAvatar?: boolean;
  avatarSize?: 'xs' | 'sm' | 'md' | 'lg';
  showStatus?: boolean;
  showRole?: boolean;
  showEmail?: boolean;
  filterByRole?: string[];
  filterByStatus?: ('active' | 'inactive' | 'pending')[];
  filterByGroup?: string[];
  excludeUsers?: string[];
  searchFields?: string[];
  searchPlaceholder?: string;
  groupBy?: 'role' | 'department' | 'team' | 'status';
  sortBy?: 'name' | 'email' | 'role' | 'lastSeen';
  showGroups?: boolean;
  showPermissions?: boolean;
  onUserChange?: (users: UserOption[]) => void;
  onUserAdd?: (user: UserOption) => void;
  onUserRemove?: (user: UserOption) => void;
  userEndpoint?: string;
  cacheUsers?: boolean;
  refreshInterval?: number;
  currentUser?: UserOption;
  excludeCurrentUser?: boolean;
  maxSelections?: number;
  minSelections?: number;
  allowClear?: boolean;
  searchable?: boolean;
  remote?: boolean;
  virtualScroll?: boolean;
  onSearch?: (query: string) => Promise<UserOption[]>;
  hasNextPage?: boolean;
  onLoadMore?: () => void;
  loadingText?: string;
  noResultsText?: string;
  emptyText?: string;
  maxHeight?: number;
  debounceMs?: number;
  minSearchLength?: number;
  customUserRenderer?: (user: UserOption) => ReactNode;
  customSelectionRenderer?: (user: UserOption) => ReactNode;
  showSelectAll?: boolean;
  selectAllLabel?: string;
  tagVariant?: 'default' | 'secondary' | 'destructive' | 'outline';
  tagSize?: 'sm' | 'md' | 'lg';
  tagClosable?: boolean;
  showUserCount?: boolean;
  countFormat?: string;
}

interface UserSelectState {
  selectedUsers: UserOption[];
  searchQuery: string;
  isSearching: boolean;
  filteredUsers: UserOption[];
  groupedUsers: Record<string, UserOption[]>;
  loadingMore: boolean;
  hasNextPage: boolean;
  userCache: Map<string, UserOption>;
}

interface UserFilterConfig {
  roles?: string[];
  status?: ('active' | 'inactive' | 'pending')[];
  groups?: string[];
  excludeUsers?: string[];
  excludeCurrentUser?: boolean;
}

interface UserDisplayConfig {
  showAvatar: boolean;
  avatarSize: 'xs' | 'sm' | 'md' | 'lg';
  showStatus: boolean;
  showRole: boolean;
  showEmail: boolean;
  showGroups: boolean;
  showPermissions: boolean;
}

interface UserSearchConfig {
  enabled: boolean;
  fields: string[];
  placeholder: string;
  debounceMs: number;
  minSearchLength: number;
  remote: boolean;
  onSearch?: (query: string) => Promise<UserOption[]>;
}

interface UserGroupConfig {
  groupBy?: 'role' | 'department' | 'team' | 'status';
  sortBy: 'name' | 'email' | 'role' | 'lastSeen';
  showSelectAll: boolean;
  selectAllLabel: string;
}

interface UserTagConfig {
  variant: 'default' | 'secondary' | 'destructive' | 'outline';
  size: 'sm' | 'md' | 'lg';
  closable: boolean;
  showCount: boolean;
  countFormat: string;
}
```

### Behavior

1. **User Selection Management**:
   - Single or multiple user selection with proper form integration
   - Individual user tag removal and bulk selection operations
   - Selection limits enforcement with visual feedback
   - Real-time validation and error handling

2. **User Display System**:
   - Avatar display with customizable sizes and fallbacks
   - Status indicators (online/offline/away) with real-time updates
   - Role and permission information display
   - Group membership and team information

3. **Search and Filter**:
   - Real-time user search with debouncing for performance
   - Multi-field search across name, email, role, and custom fields
   - Role-based filtering with permission validation
   - Status-based filtering (active, inactive, pending)
   - Group-based filtering and exclusion rules

4. **User Data Management**:
   - Remote user data loading with caching mechanisms
   - Automatic data refresh with configurable intervals
   - User context awareness with current user exclusion
   - Pagination and infinite scroll support for large user lists

5. **Advanced Features**:
   - Virtual scrolling for large user directories
   - User grouping by role, department, team, or status
   - Custom user and selection rendering
   - Bulk operations (select all/none for filtered users)
   - Real-time user presence and activity indicators

6. **Integration Features**:
   - Form validation with user-specific business rules
   - Action system integration for user-based workflows
   - Permission-based user filtering and access control
   - User analytics and interaction tracking

## Component Requirements

### Technical Specifications
- **Framework**: React 18+ with TypeScript
- **Base Component**: shadcn/ui Select component (`pnpm dlx shadcn@latest add select`)
- **Extensions**: Docy-specific user selection features including avatars, status indicators, role filtering, and advanced user management built on top of shadcn base
- **Wrapper**: Extends DocyFieldBase for consistent field structure
- **Styling**: shadcn/ui Select component with Tailwind CSS v4
- **User Management**: Integration with user directory services
- **Avatars**: User avatar display with fallback support
- **Search**: Debounced search with fuzzy matching capabilities
- **Caching**: Intelligent user data caching with refresh strategies
- **Accessibility**: WCAG 2.1 AA compliance with full keyboard navigation

### Key Features Required
1. **User Selection Interface**: Avatar-based selection with status indicators
2. **Advanced Filtering**: Role, status, group, and permission-based filtering
3. **Search Integration**: Real-time user search with multi-field support
4. **User Context**: Current user awareness and exclusion capabilities
5. **Data Management**: Remote loading, caching, and refresh mechanisms
6. **Status Indicators**: Real-time user presence and activity display
7. **Bulk Operations**: Select all/none functionality for filtered users
8. **Custom Rendering**: Flexible user display and selection customization
9. **Performance**: Virtual scrolling and efficient data handling
10. **Integration**: Seamless form and validation system integration

### Usage Examples

```tsx
// Basic single user selection
<DocyFieldSelectUser
  name="assignedTo"
  label="Assigned To"
  placeholder="Select a user"
  showAvatar={true}
  showStatus={true}
  showRole={true}
  filterByStatus={['active']}
  required={true}
/>

// Multiple user selection with limits
<DocyFieldSelectUser
  name="teamMembers"
  label="Team Members"
  multiple={true}
  maxSelections={5}
  minSelections={2}
  showAvatar={true}
  showStatus={true}
  showRole={true}
  allowClear={true}
  showSelectAll={true}
  showUserCount={true}
  countFormat="{count} of {max} members selected"
  validations={[
    { type: 'required', message: 'Please select at least 2 team members' }
  ]}
/>

// Role-based filtering with search
<DocyFieldSelectUser
  name="reviewers"
  label="Reviewers"
  multiple={true}
  filterByRole={['admin', 'manager', 'senior_dev']}
  filterByStatus={['active']}
  searchable={true}
  searchFields={['name', 'email', 'role']}
  searchPlaceholder="Search reviewers..."
  groupBy="role"
  sortBy="name"
  showGroups={true}
  showPermissions={true}
  maxSelections={3}
  customValidations={[
    {
      formula: '$all(reviewers, function($user) { $user.permissions.canReview = true })',
      message: 'All selected users must have review permissions'
    }
  ]}
/>

// Current user exclusion with department filtering
<DocyFieldSelectUser
  name="delegates"
  label="Delegates"
  multiple={true}
  excludeCurrentUser={true}
  filterByGroup={['same_department']}
  filterByStatus={['active']}
  showAvatar={true}
  showStatus={true}
  showRole={true}
  showEmail={true}
  customUserRenderer={(user) => (
    <div className="flex items-center gap-3 p-2">
      <DocyUserAvatar 
        user={user} 
        size="sm" 
        showStatus={true}
        statusPosition="bottom-right"
      />
      <div className="flex-1">
        <div className="font-medium">{user.name}</div>
        <div className="text-sm text-gray-500">{user.email}</div>
        <div className="text-xs text-gray-400">{user.role} • {user.department}</div>
      </div>
      {user.permissions?.includes('delegate') && (
        <DocyBadge variant="secondary" size="xs">
          Can Delegate
        </DocyBadge>
      )}
    </div>
  )}
/>

// Remote data loading with caching
<DocyFieldSelectUser
  name="projectManagers"
  label="Project Managers"
  multiple={true}
  remote={true}
  userEndpoint="/api/users/managers"
  cacheUsers={true}
  refreshInterval={600000} // 10 minutes
  virtualScroll={true}
  maxHeight={400}
  onSearch={async (query) => {
    const response = await fetch(`/api/users/search?q=${query}&role=manager`);
    return response.json();
  }}
  hasNextPage={hasMoreManagers}
  onLoadMore={loadMoreManagers}
  filterByRole={['project_manager', 'senior_manager']}
  showAvatar={true}
  showStatus={true}
  showRole={true}
  groupBy="department"
  loadingText="Searching managers..."
  noResultsText="No managers found"
  minSearchLength={2}
  debounceMs={400}
/>

// Custom rendering with advanced features
<DocyFieldSelectUser
  name="approvers"
  label="Approval Chain"
  multiple={true}
  maxSelections={3}
  filterByRole={['director', 'vp', 'c_level']}
  filterByStatus={['active']}
  showAvatar={true}
  showStatus={true}
  showRole={true}
  showPermissions={true}
  sortBy="role"
  tagVariant="outline"
  tagSize="md"
  tagClosable={true}
  customUserRenderer={(user) => (
    <div className="flex items-center justify-between p-3">
      <div className="flex items-center gap-3">
        <DocyUserAvatar 
          user={user} 
          size="md" 
          showStatus={true}
          statusPosition="bottom-right"
        />
        <div>
          <div className="font-medium">{user.name}</div>
          <div className="text-sm text-gray-500">{user.email}</div>
          <div className="text-xs text-gray-400">{user.role}</div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {user.permissions?.includes('final_approval') && (
          <DocyBadge variant="success" size="sm">
            Final Approver
          </DocyBadge>
        )}
        {user.isOnline && (
          <div className="w-2 h-2 bg-green-500 rounded-full" />
        )}
      </div>
    </div>
  )}
  customSelectionRenderer={(user) => (
    <div className="flex items-center gap-2">
      <DocyUserAvatar user={user} size="xs" showStatus={true} />
      <span className="font-medium">{user.name}</span>
      <DocyBadge variant="secondary" size="xs">
        {user.role}
      </DocyBadge>
    </div>
  )}
  onUserChange={(users) => {
    // Update approval workflow
    updateApprovalChain(users);
  }}
  onUserAdd={(user) => {
    // Log user addition
    logUserAssignment(user, 'approver');
  }}
  onUserRemove={(user) => {
    // Log user removal
    logUserUnassignment(user, 'approver');
  }}
/>

// Form integration with actions
<DocyFieldSelectUser
  name="taskAssignee"
  label="Task Assignee"
  filterByRole={['developer', 'senior_dev', 'tech_lead']}
  filterByStatus={['active']}
  showAvatar={true}
  showStatus={true}
  showRole={true}
  validations={[
    { type: 'required', message: 'Task must be assigned to someone' }
  ]}
  customValidations={[
    {
      formula: 'taskAssignee.permissions.canComplete = true',
      message: 'Selected user must have task completion permissions'
    }
  ]}
  actions={{
    change: [
      ['setFieldValueCalculated', {
        field: 'estimatedHours',
        formula: 'taskAssignee.role = "senior_dev" ? 4 : 8'
      }],
      ['setFieldOptionCalculated', {
        field: 'priority',
        option: 'options',
        formula: 'taskAssignee.workload > 80 ? highPriorityOptions : normalPriorityOptions'
      }],
      ['condition', 'taskAssignee.role = "tech_lead"', [
        ['setFieldOption', {
          field: 'requiresReview',
          option: 'hidden',
          value: true
        }]
      ]]
    ]
  }}
/>

// Complex enterprise scenario
<DocyFieldSelectUser
  name="crossFunctionalTeam"
  label="Cross-Functional Team"
  multiple={true}
  maxSelections={10}
  minSelections={3}
  searchable={true}
  searchFields={['name', 'email', 'role', 'department', 'skills']}
  searchPlaceholder="Search team members..."
  remote={true}
  virtualScroll={true}
  cacheUsers={true}
  refreshInterval={300000}
  filterByStatus={['active']}
  excludeCurrentUser={false}
  groupBy="department"
  sortBy="name"
  showAvatar={true}
  showStatus={true}
  showRole={true}
  showEmail={true}
  showGroups={true}
  showPermissions={true}
  allowClear={true}
  showSelectAll={true}
  showUserCount={true}
  countFormat="{count} team members selected"
  tagVariant="outline"
  tagSize="md"
  tagClosable={true}
  maxHeight={500}
  debounceMs={300}
  minSearchLength={2}
  onSearch={async (query) => {
    const response = await fetch(`/api/users/search?q=${query}&includeSkills=true`);
    return response.json();
  }}
  hasNextPage={hasMoreUsers}
  onLoadMore={loadMoreUsers}
  customUserRenderer={(user) => (
    <div className="flex items-center justify-between p-3">
      <div className="flex items-center gap-3">
        <DocyUserAvatar 
          user={user} 
          size="md" 
          showStatus={true}
          statusPosition="bottom-right"
        />
        <div className="flex-1">
          <div className="font-medium">{user.name}</div>
          <div className="text-sm text-gray-500">{user.email}</div>
          <div className="text-xs text-gray-400">
            {user.role} • {user.department}
          </div>
          {user.metadata?.skills && (
            <div className="flex gap-1 mt-1">
              {user.metadata.skills.slice(0, 3).map(skill => (
                <DocyBadge key={skill} variant="secondary" size="xs">
                  {skill}
                </DocyBadge>
              ))}
              {user.metadata.skills.length > 3 && (
                <DocyBadge variant="outline" size="xs">
                  +{user.metadata.skills.length - 3}
                </DocyBadge>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2">
        {user.permissions?.includes('project_lead') && (
          <DocyBadge variant="success" size="sm">
            Lead
          </DocyBadge>
        )}
        <DocyWorkloadIndicator 
          workload={user.metadata?.workload || 0} 
          size="sm" 
        />
      </div>
    </div>
  )}
  customSelectionRenderer={(user) => (
    <div className="flex items-center gap-2">
      <DocyUserAvatar user={user} size="xs" showStatus={true} />
      <span className="font-medium">{user.name}</span>
      <DocyBadge variant="secondary" size="xs">
        {user.department}
      </DocyBadge>
    </div>
  )}
  validations={[
    { type: 'required', message: 'Please select at least 3 team members' }
  ]}
  customValidations={[
    {
      formula: '$count($distinct(crossFunctionalTeam.department)) >= 2',
      message: 'Team must include members from at least 2 different departments'
    },
    {
      formula: '$count($filter(crossFunctionalTeam, function($user) { $user.permissions.projectLead = true })) >= 1',
      message: 'Team must include at least one project lead'
    },
    {
      formula: '$sum(crossFunctionalTeam.metadata.workload) / $count(crossFunctionalTeam) <= 75',
      message: 'Average team workload cannot exceed 75%'
    }
  ]}
  onUserChange={(users) => {
    // Update project capacity and resource allocation
    updateProjectCapacity(users);
    calculateTeamVelocity(users);
  }}
  onUserAdd={(user) => {
    // Log team member addition
    logTeamMemberAddition(user);
    // Update user workload
    updateUserWorkload(user.id, 'add');
  }}
  onUserRemove={(user) => {
    // Log team member removal
    logTeamMemberRemoval(user);
    // Update user workload
    updateUserWorkload(user.id, 'remove');
  }}
/>
```

### Integration Requirements
- **DocyFieldBase**: Base wrapper component (required)
- **DocyUserAvatar**: For user avatar display with status indicators
- **DocyBadge**: For role, status, and permission badges
- **DocyIcon**: For status icons and UI elements
- **DocySpinner**: For loading states
- **DocyButton**: For clear all and select all actions
- **DocyTooltip**: For user information tooltips
- **DocyWorkloadIndicator**: For user workload display
- **User Directory Service**: For user data management and search
- **Permission System**: For role-based filtering and access control

### Dependencies Required
- `react-hook-form`: Form state management (inherited from DocyFieldBase)
- `@radix-ui/react-select`: Base select component (via shadcn/ui)
- `@radix-ui/react-avatar`: Avatar component (via shadcn/ui)
- `react-window`: Virtual scrolling for large user lists
- `fuse.js`: Fuzzy search functionality for user search
- `use-debounce`: Search input debouncing
- `class-variance-authority`: Variant management
- `@radix-ui/react-tooltip`: User information tooltips
- All DocyFieldBase dependencies

### Testing Requirements
1. **Unit Tests**: User selection logic, filtering, search functionality, avatar display
2. **Integration Tests**: React Hook Form integration, validation, actions system, user directory
3. **Visual Tests**: All avatar variants, status indicators, role badges, responsive behavior
4. **Accessibility Tests**: Keyboard navigation, screen reader support, ARIA attributes, focus management
5. **Performance Tests**: Virtual scrolling, large user lists, search performance, caching efficiency
6. **Remote Tests**: User API integration, error handling, loading states, pagination
7. **Permission Tests**: Role-based filtering, access control, permission validation
8. **Real-time Tests**: Status updates, presence indicators, data refresh mechanisms
9. **Selection Tests**: Single/multiple modes, limits enforcement, bulk operations
10. **Customization Tests**: Custom rendering, theming, configuration options

## Development Priority
**High** - Critical component for user management and assignment workflows across the platform

## Notes
- Built on shadcn/ui Select component for consistent design system integration
- Extends DocyFieldBase for seamless form integration and advanced features
- Avatar-based interface provides intuitive user selection experience
- Real-time status indicators enhance user awareness and collaboration
- Advanced filtering capabilities support complex organizational structures
- Virtual scrolling enables handling of large user directories without performance issues
- Comprehensive caching mechanisms optimize user data loading and refresh
- Role-based filtering integrates with permission systems for access control
- Custom rendering options accommodate various UI and UX requirements
- Complete accessibility compliance ensures inclusive user experience
- Optimized for performance with debouncing, caching, and efficient data handling
- Extensible architecture allows for future enhancements and custom features
- Integration with existing form systems, validation frameworks, and user management
- Support for both simple user selection and complex enterprise scenarios
- Real-time user presence and activity tracking for enhanced collaboration