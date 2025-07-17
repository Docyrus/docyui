# DocySonner Component

## Overview
DocySonner is a toast notification system component built on shadcn/ui patterns that provides elegant toast notifications with queuing and positioning. It supports various toast types, actions, and customization options. It serves as the primary toast notification system throughout the Docyrus React application.

## Component Specification

### Props
| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-----------|
| `position` | string | 'bottom-right' | No | Toast position: 'top-left', 'top-center', 'top-right', 'bottom-left', 'bottom-center', 'bottom-right' |
| `expand` | boolean | false | No | Expand toasts on hover |
| `richColors` | boolean | false | No | Enable rich colors for toast types |
| `closeButton` | boolean | false | No | Show close button on toasts |
| `toastOptions` | object | {} | No | Default toast options |
| `className` | string | - | No | Additional CSS classes |
| `offset` | string | - | No | Offset from viewport edge |
| `theme` | string | 'light' | No | Theme: 'light', 'dark', 'system' |
| `visibleToasts` | number | 3 | No | Number of visible toasts |
| `duration` | number | 4000 | No | Default toast duration (ms) |

### Toast Types
- **success**: Success notifications (green)
- **error**: Error notifications (red)
- **warning**: Warning notifications (yellow)
- **info**: Info notifications (blue)
- **loading**: Loading notifications with spinner
- **default**: Basic notifications

### Toast Functions
```typescript
// Basic toast
toast('Hello World!');

// Success toast
toast.success('Operation completed successfully!');

// Error toast
toast.error('Something went wrong!');

// Warning toast
toast.warning('Please check your input.');

// Info toast
toast.info('New update available.');

// Loading toast
toast.loading('Processing...');
```

### Toast Options
```typescript
interface ToastOptions {
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  cancel?: {
    label: string;
    onClick: () => void;
  };
  duration?: number;
  dismissible?: boolean;
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  onDismiss?: () => void;
  onAutoClose?: () => void;
}
```

## Component Requirements

### Technical Specifications
- **Framework**: React with TypeScript
- **Base Component**: shadcn/ui Sonner (`pnpm dlx shadcn@latest add sonner`)
- **Extensions**: Enhanced positioning, actions, theming
- **Styling**: shadcn/ui patterns with class-variance-authority
- **Accessibility**: Full ARIA support, keyboard navigation
- **Performance**: Optimized queuing and animations
- **Portal**: Proper DOM positioning

### Key Features Required
1. **Multiple Toast Types**: Success, error, warning, info, loading
2. **Flexible Positioning**: Multiple position options
3. **Actions**: Action buttons and cancel options
4. **Queuing**: Intelligent toast queuing and stacking
5. **Accessibility**: Screen reader support and keyboard navigation
6. **Theming**: Light, dark, and system themes
7. **Customization**: Flexible styling and content
8. **Performance**: Smooth animations and transitions

### Usage Examples
```tsx
// Setup Sonner provider
import { Toaster } from 'sonner';

function App() {
  return (
    <div>
      {/* Your app content */}
      <Toaster position="bottom-right" />
    </div>
  );
}

// Basic toasts
function BasicToasts() {
  return (
    <div className="space-y-2">
      <DocyButton onClick={() => toast('Hello World!')}>
        Basic Toast
      </DocyButton>
      
      <DocyButton onClick={() => toast.success('Success!')}>
        Success Toast
      </DocyButton>
      
      <DocyButton onClick={() => toast.error('Error occurred!')}>
        Error Toast
      </DocyButton>
      
      <DocyButton onClick={() => toast.warning('Warning!')}>
        Warning Toast
      </DocyButton>
      
      <DocyButton onClick={() => toast.info('Info message')}>
        Info Toast
      </DocyButton>
    </div>
  );
}

// Toast with description
<DocyButton 
  onClick={() => toast.success('Success!', {
    description: 'Your changes have been saved successfully.',
  })}
>
  Success with Description
</DocyButton>

// Toast with action
<DocyButton 
  onClick={() => toast('File uploaded', {
    description: 'Your file has been uploaded successfully.',
    action: {
      label: 'View',
      onClick: () => console.log('View clicked')
    }
  })}
>
  Toast with Action
</DocyButton>

// Toast with cancel button
<DocyButton 
  onClick={() => toast('Are you sure?', {
    description: 'This action cannot be undone.',
    action: {
      label: 'Delete',
      onClick: () => console.log('Delete clicked')
    },
    cancel: {
      label: 'Cancel',
      onClick: () => console.log('Cancel clicked')
    }
  })}
>
  Confirmation Toast
</DocyButton>

// Loading toast
<DocyButton 
  onClick={() => {
    const loadingToast = toast.loading('Uploading file...');
    
    // Simulate async operation
    setTimeout(() => {
      toast.success('File uploaded successfully!', {
        id: loadingToast
      });
    }, 2000);
  }}
>
  Loading Toast
</DocyButton>

// Custom duration
<DocyButton 
  onClick={() => toast('This will stay for 10 seconds', {
    duration: 10000
  })}
>
  Long Duration Toast
</DocyButton>

// Persistent toast
<DocyButton 
  onClick={() => toast.error('Critical error!', {
    duration: Infinity,
    action: {
      label: 'Retry',
      onClick: () => console.log('Retry clicked')
    }
  })}
>
  Persistent Toast
</DocyButton>

// Custom styling
<DocyButton 
  onClick={() => toast('Custom styled toast', {
    className: 'bg-purple-500 text-white',
    style: {
      border: '2px solid purple'
    }
  })}
>
  Custom Styled Toast
</DocyButton>

// Promise toast
<DocyButton 
  onClick={() => {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        Math.random() > 0.5 ? resolve('Success!') : reject('Failed!');
      }, 2000);
    });
    
    toast.promise(promise, {
      loading: 'Processing...',
      success: 'Operation completed!',
      error: 'Operation failed!'
    });
  }}
>
  Promise Toast
</DocyButton>

// Dismiss toast
<DocyButton 
  onClick={() => {
    const toastId = toast('This can be dismissed');
    
    setTimeout(() => {
      toast.dismiss(toastId);
    }, 1000);
  }}
>
  Auto Dismiss Toast
</DocyButton>

// Dismiss all toasts
<DocyButton onClick={() => toast.dismiss()}>
  Dismiss All Toasts
</DocyButton>

// Form submission toast
function FormSubmissionToast() {
  const handleSubmit = async (data: any) => {
    const loadingToast = toast.loading('Saving changes...');
    
    try {
      await saveData(data);
      toast.success('Changes saved successfully!', {
        id: loadingToast,
        description: 'Your profile has been updated.'
      });
    } catch (error) {
      toast.error('Failed to save changes', {
        id: loadingToast,
        description: 'Please try again later.',
        action: {
          label: 'Retry',
          onClick: () => handleSubmit(data)
        }
      });
    }
  };

  return (
    <DocyButton onClick={() => handleSubmit(formData)}>
      Save Changes
    </DocyButton>
  );
}

// File upload toast
function FileUploadToast() {
  const handleFileUpload = async (file: File) => {
    const uploadToast = toast.loading('Uploading file...', {
      description: file.name
    });
    
    try {
      await uploadFile(file);
      toast.success('File uploaded successfully!', {
        id: uploadToast,
        description: `${file.name} has been uploaded.`,
        action: {
          label: 'View',
          onClick: () => viewFile(file)
        }
      });
    } catch (error) {
      toast.error('Upload failed', {
        id: uploadToast,
        description: 'Please try again.',
        action: {
          label: 'Retry',
          onClick: () => handleFileUpload(file)
        }
      });
    }
  };

  return (
    <input
      type="file"
      onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
    />
  );
}

// Network status toast
function NetworkStatusToast() {
  useEffect(() => {
    const handleOnline = () => {
      toast.success('Back online!', {
        description: 'Your connection has been restored.'
      });
    };
    
    const handleOffline = () => {
      toast.error('Connection lost', {
        description: 'Please check your internet connection.',
        duration: Infinity
      });
    };
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return null;
}

// Custom toast component
function CustomToast({ title, message, type }: any) {
  return (
    <DocyButton
      onClick={() => toast.custom(
        <div className="flex items-center space-x-3 p-4 bg-white border rounded-lg shadow-lg">
          <div className={`w-2 h-2 rounded-full ${
            type === 'success' ? 'bg-green-500' : 
            type === 'error' ? 'bg-red-500' : 'bg-blue-500'
          }`} />
          <div>
            <div className="font-semibold">{title}</div>
            <div className="text-sm text-gray-600">{message}</div>
          </div>
        </div>
      )}
    >
      Custom Toast
    </DocyButton>
  );
}

// Toast with different positions
function PositionedToasts() {
  const positions = [
    'top-left', 'top-center', 'top-right',
    'bottom-left', 'bottom-center', 'bottom-right'
  ];

  return (
    <div className="grid grid-cols-3 gap-2">
      {positions.map(position => (
        <DocyButton
          key={position}
          onClick={() => toast(`Toast at ${position}`)}
          size="sm"
        >
          {position}
        </DocyButton>
      ))}
    </div>
  );
}

// Rich colors setup
<Toaster 
  position="bottom-right" 
  richColors 
  closeButton
  expand
  visibleToasts={5}
  duration={3000}
/>

// Dark theme setup
<Toaster 
  position="bottom-right" 
  theme="dark"
  richColors
/>

// System theme setup
<Toaster 
  position="bottom-right" 
  theme="system"
  richColors
/>
```

### Integration Requirements
- **DocyButton**: Trigger elements for toasts
- **Portal**: Proper DOM positioning
- **Animation**: Smooth enter/exit animations
- **Theme System**: Light/dark theme support
- **Icon System**: Toast type icons

### Accessibility Requirements
- **ARIA Attributes**: alert, status, live regions
- **Keyboard Navigation**: Tab, Enter, Escape
- **Screen Reader Support**: Proper announcements
- **Focus Management**: Focus on action buttons
- **Reduced Motion**: Respect user preferences

### Performance Optimization
- **Efficient Queuing**: Optimized toast queue management
- **Memory Management**: Proper cleanup of dismissed toasts
- **Animation Performance**: Hardware-accelerated animations
- **Portal Optimization**: Efficient DOM updates

### Testing Requirements
1. **Unit Tests**: Toast rendering, queuing, actions
2. **Integration Tests**: Promise handling, event callbacks
3. **Accessibility Tests**: ARIA attributes, keyboard navigation
4. **Visual Tests**: All toast types and positions
5. **Performance Tests**: Large toast queues, animations
6. **User Tests**: Real-world notification scenarios

## Development Priority
**Medium** - Useful for user feedback and status notifications

## Notes
- Built with modern shadcn/ui patterns for consistency
- Optimized for elegant notification experiences
- Full accessibility compliance with WCAG guidelines
- TypeScript support with comprehensive type safety
- Flexible positioning and customization
- Supports complex notification workflows
- Integrates with async operations and promises
