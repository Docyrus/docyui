# DocyFieldEmailEditor Component

## Overview
DocyFieldEmailEditor is a specialized email composition and template editor component that extends DocyFieldBase to provide advanced email editing capabilities. It features email-specific formatting, template management, recipient handling, attachment support, and email preview functionality with responsive design testing.

The component is designed for email marketing campaigns, transactional emails, newsletters, and any application requiring professional email composition with template support.

## Component Specification

### Props
DocyFieldEmailEditor inherits ALL props from DocyFieldBase and adds the following email editor-specific properties:

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `modelValue` | EmailContent | - | No | Current email content object |
| `mode` | 'compose' \| 'template' \| 'preview' \| 'test' | 'compose' | No | Editor mode |
| `theme` | 'light' \| 'dark' \| 'auto' | 'light' | No | Editor theme |
| `height` | number \| string | 600 | No | Editor height in pixels or CSS units |
| `width` | number \| string | '100%' | No | Editor width in pixels or CSS units |
| `autoResize` | boolean | true | No | Automatically resize editor to content |
| `minHeight` | number | 400 | No | Minimum editor height |
| `maxHeight` | number | 1200 | No | Maximum editor height |
| `showToolbar` | boolean | true | No | Show email formatting toolbar |
| `toolbarItems` | EmailToolbarGroup[] | defaultEmailToolbar | No | Custom toolbar configuration |
| `showSubjectLine` | boolean | true | No | Show subject line editor |
| `showRecipients` | boolean | true | No | Show recipient fields (To, CC, BCC) |
| `showAttachments` | boolean | true | No | Show attachment section |
| `showPreview` | boolean | true | No | Show email preview pane |
| `previewMode` | 'desktop' \| 'mobile' \| 'tablet' | 'desktop' | No | Preview device mode |
| `previewTheme` | 'light' \| 'dark' | 'light' | No | Preview theme |
| `enableTemplates` | boolean | true | No | Enable email template system |
| `templates` | EmailTemplate[] | [] | No | Available email templates |
| `templateCategories` | TemplateCategory[] | [] | No | Template categories |
| `enableVariables` | boolean | true | No | Enable template variables |
| `variables` | EmailVariable[] | [] | No | Available template variables |
| `enablePersonalization` | boolean | true | No | Enable personalization features |
| `personalizationRules` | PersonalizationRule[] | [] | No | Personalization rules |
| `enableTracking` | boolean | true | No | Enable email tracking |
| `trackingOptions` | TrackingOptions | defaultTracking | No | Email tracking configuration |
| `enableScheduling` | boolean | false | No | Enable email scheduling |
| `schedulingOptions` | SchedulingOptions | - | No | Email scheduling configuration |
| `enableAttachments` | boolean | true | No | Enable file attachments |
| `attachmentHandler` | function | - | No | Custom attachment handler |
| `maxAttachmentSize` | number | 25165824 | No | Maximum attachment size (25MB) |
| `maxAttachments` | number | 10 | No | Maximum number of attachments |
| `allowedAttachmentTypes` | string[] | ['pdf', 'doc', 'docx', 'jpg', 'png'] | No | Allowed attachment types |
| `enableImages` | boolean | true | No | Enable image insertion |
| `imageHandler` | function | - | No | Custom image handler |
| `enableImageOptimization` | boolean | true | No | Enable automatic image optimization |
| `enableLinkTracking` | boolean | true | No | Enable link click tracking |
| `linkTrackingDomain` | string | - | No | Domain for link tracking |
| `enableSpamCheck` | boolean | true | No | Enable spam score checking |
| `spamCheckService` | string | - | No | Spam checking service endpoint |
| `enableA11y` | boolean | true | No | Enable accessibility validation |
| `a11yRules` | A11yRule[] | defaultA11yRules | No | Accessibility validation rules |
| `enableRespCheck` | boolean | true | No | Enable responsive design checking |
| `respCheckDevices` | Device[] | defaultDevices | No | Devices for responsive testing |
| `enablePlainText` | boolean | true | No | Enable plain text version |
| `autoPlainText` | boolean | true | No | Auto-generate plain text version |
| `enableUnsubscribe` | boolean | true | No | Enable unsubscribe link |
| `unsubscribeText` | string | 'Unsubscribe' | No | Unsubscribe link text |
| `enableFooter` | boolean | true | No | Enable email footer |
| `footerTemplate` | string | - | No | Default footer template |
| `enableBranding` | boolean | true | No | Enable company branding |
| `brandingOptions` | BrandingOptions | - | No | Branding configuration |
| `enableSigning` | boolean | false | No | Enable email signing |
| `signatureTemplate` | string | - | No | Email signature template |
| `enableEncryption` | boolean | false | No | Enable email encryption |
| `encryptionOptions` | EncryptionOptions | - | No | Encryption configuration |
| `onTemplateSelect` | function | - | No | Callback when template is selected |
| `onVariableInsert` | function | - | No | Callback when variable is inserted |
| `onPreviewModeChange` | function | - | No | Callback when preview mode changes |
| `onSpamScoreChange` | function | - | No | Callback when spam score changes |
| `onA11yCheck` | function | - | No | Callback when accessibility check runs |
| `onRespCheck` | function | - | No | Callback when responsive check runs |
| `onAttachmentAdd` | function | - | No | Callback when attachment is added |
| `onAttachmentRemove` | function | - | No | Callback when attachment is removed |
| `onSend` | function | - | No | Callback when email is sent |
| `onSave` | function | - | No | Callback when email is saved |
| `onSchedule` | function | - | No | Callback when email is scheduled |
| `readOnly` | boolean | false | No | Make editor read-only |
| `enableDrafts` | boolean | true | No | Enable draft saving |
| `draftInterval` | number | 30000 | No | Draft saving interval in milliseconds |
| `enableCollaboration` | boolean | false | No | Enable collaborative editing |
| `collaborativeConfig` | CollaborativeConfig | - | No | Collaborative editing configuration |

**Note**: DocyFieldEmailEditor inherits all DocyFieldBase props including validation, layout, dynamic computed properties, AI integration, and more. See [DocyFieldBase documentation](./DocyFieldBase.md) for the complete list.

### TypeScript Interfaces

```typescript
interface EmailContent {
  subject: string;
  htmlBody: string;
  plainBody?: string;
  recipients: {
    to: EmailRecipient[];
    cc: EmailRecipient[];
    bcc: EmailRecipient[];
  };
  attachments: EmailAttachment[];
  variables: Record<string, any>;
  metadata: EmailMetadata;
}

interface EmailRecipient {
  email: string;
  name?: string;
  type?: 'to' | 'cc' | 'bcc';
}

interface EmailAttachment {
  id: string;
  filename: string;
  size: number;
  type: string;
  url: string;
  contentId?: string;
}

interface EmailMetadata {
  templateId?: string;
  campaignId?: string;
  trackingId?: string;
  scheduledDate?: string;
  priority?: 'low' | 'normal' | 'high';
  tags?: string[];
  customHeaders?: Record<string, string>;
}

interface EmailTemplate {
  id: string;
  name: string;
  description?: string;
  category: string;
  thumbnail?: string;
  subject: string;
  htmlContent: string;
  plainContent?: string;
  variables: string[];
  tags?: string[];
  isPublic?: boolean;
  createdBy?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface TemplateCategory {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  color?: string;
  templates?: EmailTemplate[];
}

interface EmailVariable {
  name: string;
  label: string;
  type: 'text' | 'number' | 'date' | 'boolean' | 'image' | 'link';
  defaultValue?: any;
  description?: string;
  required?: boolean;
  validation?: ValidationRule[];
  examples?: string[];
}

interface PersonalizationRule {
  id: string;
  name: string;
  condition: string;
  action: string;
  priority: number;
  enabled: boolean;
}

interface TrackingOptions {
  openTracking: boolean;
  clickTracking: boolean;
  unsubscribeTracking: boolean;
  bounceTracking: boolean;
  spamTracking: boolean;
  customEvents: string[];
}

interface SchedulingOptions {
  timezone: string;
  allowPastDates: boolean;
  minAdvanceTime: number;
  maxAdvanceTime: number;
  businessHoursOnly: boolean;
  businessHours: {
    start: string;
    end: string;
    days: number[];
  };
}

interface A11yRule {
  id: string;
  name: string;
  description: string;
  severity: 'error' | 'warning' | 'info';
  check: (content: string) => A11yResult;
}

interface A11yResult {
  passed: boolean;
  message: string;
  suggestions?: string[];
}

interface Device {
  name: string;
  width: number;
  height: number;
  userAgent: string;
  type: 'desktop' | 'tablet' | 'mobile';
}

interface BrandingOptions {
  logo: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  fonts: {
    primary: string;
    secondary: string;
  };
  companyName: string;
  address?: string;
  website?: string;
  socialLinks?: SocialLink[];
}

interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

interface EncryptionOptions {
  method: 'pgp' | 's/mime';
  keyId: string;
  passphrase?: string;
  certificate?: string;
}

interface EmailToolbarGroup {
  id: string;
  label: string;
  items: EmailToolbarItem[];
  visible?: boolean;
  collapsible?: boolean;
}

interface EmailToolbarItem {
  id: string;
  type: 'button' | 'dropdown' | 'color' | 'separator' | 'variable';
  label?: string;
  icon?: string;
  tooltip?: string;
  command?: string;
  keyboard?: string;
  active?: boolean;
  disabled?: boolean;
  visible?: boolean;
  options?: any[];
}

interface SpamCheckResult {
  score: number;
  issues: SpamIssue[];
  recommendations: string[];
}

interface SpamIssue {
  type: string;
  severity: 'low' | 'medium' | 'high';
  message: string;
  suggestion: string;
}

interface CollaborativeConfig {
  endpoint: string;
  roomId: string;
  userInfo: {
    name: string;
    email: string;
    role: string;
    avatar?: string;
  };
  permissions: {
    edit: boolean;
    comment: boolean;
    approve: boolean;
  };
}
```

### Behavior

1. **Email Composition**:
   - Subject line editing with character count
   - Recipient management (To, CC, BCC) with validation
   - Rich text email body with email-specific formatting
   - Plain text version generation and editing

2. **Template System**:
   - Template library with categories and search
   - Template preview and application
   - Variable insertion and replacement
   - Template customization and saving

3. **Personalization**:
   - Dynamic content based on recipient data
   - Conditional content blocks
   - A/B testing support
   - Rule-based personalization

4. **Email Testing**:
   - Spam score checking and recommendations
   - Accessibility validation
   - Responsive design testing across devices
   - Link validation and tracking setup

5. **Attachment Management**:
   - File upload with drag-and-drop support
   - Attachment preview and management
   - Size and type validation
   - Inline image embedding

6. **Collaboration**:
   - Real-time collaborative editing
   - Comment and approval workflows
   - Version history and rollback
   - Role-based permissions

## Component Requirements

### Technical Specifications
- **Framework**: React 18+ with TypeScript
- **Base Component**: Custom implementation using email-specific editor
- **Integration**: Uses shadcn/ui patterns for consistent styling and theming
- **Wrapper**: Extends DocyFieldBase for consistent field structure
- **Styling**: shadcn/ui patterns with Tailwind CSS v4
- **Email Engine**: Custom email editor with HTML/text support
- **Template Engine**: Handlebars or similar for variable replacement
- **Accessibility**: WCAG 2.1 AA compliance with email-specific considerations

### Key Features Required
1. **Email-Specific Editing**: Subject, recipients, body, and attachments
2. **Template Management**: Library, categories, variables, and customization
3. **Personalization**: Dynamic content and conditional logic
4. **Testing Suite**: Spam, accessibility, and responsive testing
5. **Attachment Support**: File upload, preview, and management
6. **Collaboration**: Real-time editing and approval workflows
7. **Accessibility**: Email accessibility validation and compliance

### Usage Examples

```tsx
// Basic email composition
<DocyFieldEmailEditor
  name="emailContent"
  label="Email Message"
  showSubjectLine={true}
  showRecipients={true}
  showAttachments={true}
  height={600}
/>

// Email template editor
<DocyFieldEmailEditor
  name="emailTemplate"
  label="Email Template"
  mode="template"
  enableTemplates={true}
  templates={[
    {
      id: '1',
      name: 'Welcome Email',
      category: 'onboarding',
      subject: 'Welcome to {{company_name}}!',
      htmlContent: '<h1>Welcome {{user_name}}!</h1><p>Thanks for joining us.</p>',
      variables: ['company_name', 'user_name']
    }
  ]}
  variables={[
    { name: 'company_name', label: 'Company Name', type: 'text', defaultValue: 'Acme Corp' },
    { name: 'user_name', label: 'User Name', type: 'text', required: true }
  ]}
/>

// Marketing campaign editor
<DocyFieldEmailEditor
  name="campaign"
  label="Marketing Campaign"
  enablePersonalization={true}
  enableTracking={true}
  trackingOptions={{
    openTracking: true,
    clickTracking: true,
    unsubscribeTracking: true,
    bounceTracking: true,
    spamTracking: true,
    customEvents: ['button_click', 'image_view']
  }}
  personalizationRules={[
    {
      id: '1',
      name: 'VIP Customer',
      condition: 'customer_tier === "VIP"',
      action: 'show_vip_content',
      priority: 1,
      enabled: true
    }
  ]}
/>

// Newsletter editor with advanced features
<DocyFieldEmailEditor
  name="newsletter"
  label="Newsletter"
  enableSpamCheck={true}
  enableA11y={true}
  enableRespCheck={true}
  spamCheckService="/api/spam-check"
  a11yRules={[
    {
      id: 'alt-text',
      name: 'Image Alt Text',
      description: 'All images must have alt text',
      severity: 'error',
      check: (content) => checkImageAltText(content)
    }
  ]}
  respCheckDevices={[
    { name: 'iPhone 12', width: 390, height: 844, userAgent: 'iOS', type: 'mobile' },
    { name: 'iPad Air', width: 820, height: 1180, userAgent: 'iPadOS', type: 'tablet' },
    { name: 'Desktop', width: 1920, height: 1080, userAgent: 'Desktop', type: 'desktop' }
  ]}
/>

// Transactional email editor
<DocyFieldEmailEditor
  name="transactionalEmail"
  label="Transactional Email"
  enableBranding={true}
  enableFooter={true}
  brandingOptions={{
    logo: '/logo.png',
    colors: {
      primary: '#3b82f6',
      secondary: '#64748b',
      accent: '#10b981'
    },
    fonts: {
      primary: 'Inter',
      secondary: 'Georgia'
    },
    companyName: 'Acme Corporation',
    address: '123 Main St, City, State 12345',
    website: 'https://acme.com'
  }}
  footerTemplate={`
    <div style="text-align: center; margin-top: 40px;">
      <p>{{company_name}} | {{company_address}}</p>
      <p><a href="{{unsubscribe_url}}">Unsubscribe</a></p>
    </div>
  `}
/>

// Collaborative email editor
<DocyFieldEmailEditor
  name="collaborativeEmail"
  label="Team Email"
  enableCollaboration={true}
  collaborativeConfig={{
    endpoint: 'wss://collab.example.com',
    roomId: 'email-123',
    userInfo: {
      name: 'John Doe',
      email: 'john@example.com',
      role: 'editor',
      avatar: 'john.jpg'
    },
    permissions: {
      edit: true,
      comment: true,
      approve: false
    }
  }}
  onSend={(email) => {
    console.log('Email sent:', email);
  }}
/>

// Scheduled email editor
<DocyFieldEmailEditor
  name="scheduledEmail"
  label="Scheduled Email"
  enableScheduling={true}
  schedulingOptions={{
    timezone: 'America/New_York',
    allowPastDates: false,
    minAdvanceTime: 300000, // 5 minutes
    maxAdvanceTime: 31536000000, // 1 year
    businessHoursOnly: true,
    businessHours: {
      start: '09:00',
      end: '17:00',
      days: [1, 2, 3, 4, 5] // Monday to Friday
    }
  }}
  onSchedule={(email, scheduledDate) => {
    console.log('Email scheduled:', email, scheduledDate);
  }}
/>

// Email with attachment support
<DocyFieldEmailEditor
  name="emailWithAttachments"
  label="Email with Attachments"
  enableAttachments={true}
  attachmentHandler={async (files) => {
    const uploadedFiles = [];
    for (const file of files) {
      const formData = new FormData();
      formData.append('file', file);
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });
      const result = await response.json();
      uploadedFiles.push({
        id: result.id,
        filename: file.name,
        size: file.size,
        type: file.type,
        url: result.url
      });
    }
    return uploadedFiles;
  }}
  maxAttachmentSize={52428800} // 50MB
  maxAttachments={5}
  allowedAttachmentTypes={['pdf', 'doc', 'docx', 'xls', 'xlsx', 'jpg', 'png', 'zip']}
/>

// A/B testing email editor
<DocyFieldEmailEditor
  name="abTestEmail"
  label="A/B Test Email"
  enableVariables={true}
  variables={[
    { name: 'subject_a', label: 'Subject A', type: 'text' },
    { name: 'subject_b', label: 'Subject B', type: 'text' },
    { name: 'cta_text_a', label: 'CTA Text A', type: 'text' },
    { name: 'cta_text_b', label: 'CTA Text B', type: 'text' }
  ]}
  onVariableInsert={(variable, value) => {
    console.log('Variable inserted:', variable, value);
  }}
/>

// Form integration with validation
<DocyFieldEmailEditor
  name="validatedEmail"
  label="Email Content"
  validations={[
    { type: 'required', message: 'Email content is required' }
  ]}
  customValidations={[
    {
      formula: '$length(validatedEmail.subject) > 0',
      message: 'Subject line is required'
    },
    {
      formula: '$length(validatedEmail.recipients.to) > 0',
      message: 'At least one recipient is required'
    },
    {
      formula: '$length(validatedEmail.htmlBody) > 50',
      message: 'Email body should be more detailed'
    }
  ]}
  actions={{
    change: [
      ['setFieldValue', {
        field: 'lastModified',
        value: new Date().toISOString()
      }],
      ['condition', '$length(validatedEmail.subject) > 50', [
        ['setFieldOption', {
          field: 'subjectWarning',
          option: 'visible',
          value: true
        }]
      ]]
    ]
  }}
/>

// Email preview with responsive testing
<DocyFieldEmailEditor
  name="previewEmail"
  label="Email Preview"
  mode="preview"
  previewMode="mobile"
  enableRespCheck={true}
  onPreviewModeChange={(mode) => {
    console.log('Preview mode changed:', mode);
  }}
  onRespCheck={(results) => {
    console.log('Responsive check results:', results);
  }}
/>
```

### Integration Requirements
- **DocyFieldBase**: Base wrapper component (required)
- **Email Editor Engine**: Custom email editor or adapted rich text editor
- **Template Engine**: Handlebars or similar for variable processing
- **Spam Checker**: Integration with spam checking services
- **A11y Checker**: Accessibility validation for email content
- **DocyIcon**: For toolbar and interface icons
- **DocyMenu**: For template selection and variable insertion
- **DocyDialog**: For recipient management and settings
- **DocyUpload**: For attachment and image upload
- **DocyCalendar**: For email scheduling

### Dependencies Required
- `handlebars`: Template variable processing
- `dompurify`: HTML sanitization for email content
- `email-validator`: Email address validation
- `mime-types`: File type detection for attachments
- `image-size`: Image dimension detection
- `html-to-text`: Plain text generation from HTML
- `react-hook-form`: Form integration (inherited from DocyFieldBase)
- `class-variance-authority`: Variant management
- All DocyFieldBase dependencies

### Testing Requirements
1. **Unit Tests**: Email composition, template processing, variable replacement
2. **Integration Tests**: React Hook Form integration, attachment handling, scheduling
3. **Visual Tests**: All modes, responsive preview, template rendering
4. **Accessibility Tests**: Email accessibility validation, keyboard navigation
5. **Performance Tests**: Large email handling, template processing, collaboration
6. **Email Tests**: Spam checking, deliverability, rendering across email clients
7. **Security Tests**: Content sanitization, attachment validation, XSS prevention

## Development Priority
**High** - Essential for email marketing, transactional emails, and communication workflows

## Notes
- Built with email-specific requirements and limitations in mind
- Comprehensive template system with variable support enables efficient email creation
- Spam checking and accessibility validation ensure email deliverability and compliance
- Responsive testing across devices ensures consistent email rendering
- Collaboration features enable team-based email campaign development
- Attachment management with security considerations
- Integration with email service providers for sending and tracking
- Performance optimized for email template processing and preview generation
- Accessibility features ensure inclusive email creation experience
- Complete email workflow support from composition to delivery