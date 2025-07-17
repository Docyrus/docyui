# DocyFieldFileUpload Component

## Overview
DocyFieldFileUpload is a comprehensive file upload component that extends DocyFieldBase to provide advanced file handling functionality. Built using shadcn/ui design patterns as a custom implementation (no direct shadcn/ui equivalent), it offers drag-and-drop file uploads with features like progress tracking, file validation, preview generation, multiple file support, chunked uploads, and resumable transfers. The component integrates seamlessly with form systems and provides extensive customization options for various file upload scenarios.

This component serves as the foundation for file input interfaces and supports both simple single-file uploads and complex multi-file scenarios with advanced upload management capabilities.

## Component Specification

### Props
DocyFieldFileUpload inherits ALL props from DocyFieldBase and adds the following file-specific properties:

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `multiple` | boolean | false | No | Allow multiple file selection |
| `accept` | string | - | No | Accepted file types (MIME types or extensions) |
| `maxFiles` | number | - | No | Maximum number of files allowed |
| `maxSize` | number | - | No | Maximum file size in bytes |
| `minSize` | number | - | No | Minimum file size in bytes |
| `dragDrop` | boolean | true | No | Enable drag and drop functionality |
| `showPreview` | boolean | true | No | Show file preview thumbnails |
| `previewSize` | 'sm' \| 'md' \| 'lg' | 'md' | No | Size of preview thumbnails |
| `showProgress` | boolean | true | No | Show upload progress bars |
| `showFileInfo` | boolean | true | No | Show file information (name, size, type) |
| `allowRemove` | boolean | true | No | Allow file removal after selection |
| `uploadEndpoint` | string | - | No | Upload API endpoint URL |
| `uploadMethod` | 'POST' \| 'PUT' \| 'PATCH' | 'POST' | No | HTTP method for upload |
| `uploadHeaders` | Record<string, string> | {} | No | Additional headers for upload requests |
| `chunkSize` | number | 1024 * 1024 | No | Chunk size for large file uploads (bytes) |
| `resumable` | boolean | false | No | Enable resumable uploads |
| `onUploadStart` | (files: FileUploadItem[]) => void | - | No | Callback when upload starts |
| `onUploadProgress` | (file: FileUploadItem, progress: number) => void | - | No | Callback for upload progress updates |
| `onUploadComplete` | (file: FileUploadItem, response: any) => void | - | No | Callback when upload completes |
| `onUploadError` | (file: FileUploadItem, error: Error) => void | - | No | Callback when upload fails |
| `onFileAdd` | (files: FileUploadItem[]) => void | - | No | Callback when files are added |
| `onFileRemove` | (file: FileUploadItem) => void | - | No | Callback when file is removed |
| `validator` | (file: File) => Promise<boolean \| string> | - | No | Custom file validation function |
| `imageCompression` | boolean | false | No | Enable automatic image compression |
| `compressionQuality` | number | 0.8 | No | Image compression quality (0-1) |
| `autoUpload` | boolean | true | No | Automatically start upload when files are added |
| `uploadTimeout` | number | 30000 | No | Upload timeout in milliseconds |
| `retryAttempts` | number | 3 | No | Number of retry attempts for failed uploads |
| `retryDelay` | number | 1000 | No | Delay between retry attempts (ms) |
| `storageType` | 'local' \| 'cloud' \| 's3' \| 'azure' | 'local' | No | Storage backend type |
| `storageConfig` | StorageConfig | {} | No | Storage-specific configuration |
| `thumbnailGeneration` | boolean | true | No | Enable thumbnail generation for images |
| `thumbnailSize` | number | 200 | No | Thumbnail size in pixels |
| `previewFormats` | string[] | ['image/*', 'video/*', 'application/pdf'] | No | File types that support preview |
| `dropText` | string | 'Drop files here or click to upload' | No | Text displayed in drop zone |
| `browseText` | string | 'Browse Files' | No | Text for browse button |
| `uploadingText` | string | 'Uploading...' | No | Text displayed during upload |
| `completedText` | string | 'Upload Complete' | No | Text displayed after successful upload |
| `errorText` | string | 'Upload Failed' | No | Text displayed after failed upload |

**Note**: DocyFieldFileUpload inherits all DocyFieldBase props including validation, layout, dynamic computed properties, AI integration, and more. See [DocyFieldBase documentation](./DocyFieldBase.md) for the complete list.

### TypeScript Interfaces

```typescript
interface FileUploadItem {
  id: string;
  file: File;
  name: string;
  size: number;
  type: string;
  status: 'pending' | 'uploading' | 'completed' | 'error' | 'paused';
  progress: number;
  error?: Error;
  preview?: string; // Data URL for preview
  thumbnail?: string; // Data URL for thumbnail
  uploadResponse?: any;
  chunks?: FileChunk[];
  resumeData?: ResumeData;
}

interface FileChunk {
  index: number;
  start: number;
  end: number;
  blob: Blob;
  uploaded: boolean;
  retryCount: number;
}

interface ResumeData {
  uploadId: string;
  uploadedChunks: number[];
  totalChunks: number;
  lastModified: number;
}

interface StorageConfig {
  // Local storage configuration
  local?: {
    uploadPath: string;
    maxFileSize: number;
    allowedTypes: string[];
  };
  
  // Cloud storage configuration
  cloud?: {
    provider: 'aws' | 'azure' | 'gcp';
    bucket: string;
    region: string;
    accessKey: string;
    secretKey: string;
    endpoint?: string;
  };
  
  // S3-specific configuration
  s3?: {
    bucket: string;
    region: string;
    accessKeyId: string;
    secretAccessKey: string;
    endpoint?: string;
    signedUrlExpiry?: number;
  };
  
  // Azure-specific configuration
  azure?: {
    storageAccount: string;
    containerName: string;
    accessKey: string;
    endpoint?: string;
  };
}

interface FileValidationResult {
  valid: boolean;
  message?: string;
  code?: string;
}

interface CompressionConfig {
  enabled: boolean;
  quality: number;
  maxWidth?: number;
  maxHeight?: number;
  format?: 'jpeg' | 'png' | 'webp';
}

interface UploadConfig {
  method: 'POST' | 'PUT' | 'PATCH';
  headers: Record<string, string>;
  timeout: number;
  retryAttempts: number;
  retryDelay: number;
  chunkSize: number;
  resumable: boolean;
}
```

### Behavior

1. **File Selection**:
   - Drag and drop interface with visual feedback
   - Click-to-browse file selection dialog
   - Multiple file selection support with validation
   - File type and size validation with custom error messages

2. **Upload Management**:
   - Automatic or manual upload initiation
   - Chunked uploads for large files with progress tracking
   - Resumable uploads with persistent state
   - Retry mechanism for failed uploads with exponential backoff

3. **Preview Generation**:
   - Automatic thumbnail generation for images
   - Preview support for various file types (images, videos, PDFs)
   - Configurable preview sizes and formats
   - Lazy loading for performance optimization

4. **Progress Tracking**:
   - Real-time upload progress with visual indicators
   - Individual file progress and overall progress
   - Upload speed calculation and time remaining estimates
   - Pause/resume functionality for long uploads

5. **File Management**:
   - File list with sortable and filterable interface
   - Individual file removal with confirmation
   - Batch operations (select all, remove all)
   - File metadata display (name, size, type, upload date)

6. **Storage Integration**:
   - Multiple storage backend support (local, cloud, S3, Azure)
   - Signed URL generation for secure uploads
   - Storage quota management and validation
   - Automatic cleanup of failed uploads

7. **Advanced Features**:
   - Image compression with quality settings
   - Custom file validation with async support
   - Upload queue management with priority handling
   - Background upload with page navigation support

## Component Requirements

### Technical Specifications
- **Framework**: React 18+ with TypeScript
- **Base Component**: Custom implementation using shadcn/ui design patterns (no direct shadcn/ui equivalent)
- **Design System**: shadcn/ui patterns for consistent styling with Button, Progress, Card, and other components
- **Wrapper**: Extends DocyFieldBase for consistent field structure
- **Styling**: shadcn/ui patterns with Tailwind CSS v4
- **File Handling**: HTML5 File API with drag-and-drop support
- **Upload**: Axios or fetch for HTTP requests with progress tracking
- **Storage**: Integration with various cloud storage providers
- **Compression**: Canvas API or image compression libraries
- **Accessibility**: WCAG 2.1 AA compliance with keyboard navigation

### Key Features Required
1. **Drag and Drop**: Intuitive file selection with visual feedback
2. **Progress Tracking**: Real-time upload progress with cancellation support
3. **File Validation**: Comprehensive validation with custom rules
4. **Preview Generation**: Automatic thumbnails and previews for supported formats
5. **Chunked Uploads**: Large file support with resumable transfers
6. **Storage Integration**: Multiple backend support with unified API
7. **Accessibility**: Complete keyboard navigation and screen reader support

### Usage Examples

```tsx
// Basic single file upload
<DocyFieldFileUpload
  name="avatar"
  label="Profile Picture"
  accept="image/*"
  maxSize={5 * 1024 * 1024} // 5MB
  multiple={false}
  uploadEndpoint="/api/upload/avatar"
  required={true}
/>

// Multiple file upload with validation
<DocyFieldFileUpload
  name="documents"
  label="Supporting Documents"
  multiple={true}
  maxFiles={10}
  accept=".pdf,.doc,.docx,.jpg,.png"
  maxSize={10 * 1024 * 1024} // 10MB per file
  uploadEndpoint="/api/upload/documents"
  showPreview={true}
  allowRemove={true}
  onFileAdd={(files) => console.log('Files added:', files)}
  onUploadComplete={(file, response) => console.log('Upload complete:', file, response)}
/>

// Image upload with compression
<DocyFieldFileUpload
  name="productImages"
  label="Product Images"
  multiple={true}
  accept="image/*"
  maxFiles={5}
  maxSize={20 * 1024 * 1024} // 20MB
  imageCompression={true}
  compressionQuality={0.8}
  thumbnailGeneration={true}
  thumbnailSize={150}
  previewSize="lg"
  uploadEndpoint="/api/upload/products"
  onUploadProgress={(file, progress) => {
    console.log(`Upload progress: ${file.name} - ${progress}%`);
  }}
/>

// Resumable upload for large files
<DocyFieldFileUpload
  name="videoFile"
  label="Video Upload"
  accept="video/*"
  maxSize={500 * 1024 * 1024} // 500MB
  chunkSize={5 * 1024 * 1024} // 5MB chunks
  resumable={true}
  uploadEndpoint="/api/upload/video"
  uploadMethod="PUT"
  uploadHeaders={{
    'X-Upload-Type': 'resumable'
  }}
  retryAttempts={5}
  retryDelay={2000}
  onUploadStart={(files) => console.log('Starting upload:', files)}
  onUploadError={(file, error) => console.error('Upload error:', file, error)}
/>

// Custom validation and storage
<DocyFieldFileUpload
  name="secureFiles"
  label="Secure File Upload"
  multiple={true}
  accept=".pdf,.docx,.xlsx"
  maxSize={50 * 1024 * 1024} // 50MB
  validator={async (file) => {
    // Custom validation logic
    if (file.name.includes('confidential')) {
      return 'Confidential files are not allowed';
    }
    
    // Check file content
    const text = await file.text();
    if (text.includes('sensitive-data')) {
      return 'File contains sensitive data';
    }
    
    return true;
  }}
  storageType="s3"
  storageConfig={{
    s3: {
      bucket: 'secure-uploads',
      region: 'us-west-2',
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      signedUrlExpiry: 3600
    }
  }}
  uploadEndpoint="/api/upload/secure"
/>

// Complete form integration with validation
<DocyFieldFileUpload
  name="applicationFiles"
  label="Application Files"
  multiple={true}
  maxFiles={8}
  accept=".pdf,.doc,.docx,.txt,.jpg,.png"
  maxSize={25 * 1024 * 1024} // 25MB
  dragDrop={true}
  showPreview={true}
  showFileInfo={true}
  allowRemove={true}
  autoUpload={false} // Manual upload trigger
  validations={[
    { type: 'required', message: 'At least one file is required' },
    { type: 'custom', validator: validateFileNames, message: 'Invalid file names detected' }
  ]}
  computedRequired={{
    field: 'applicationType',
    operator: 'in',
    value: ['full-application', 'document-submission']
  }}
  actions={{
    change: [
      ['setFieldValue', { field: 'hasFiles', value: true }],
      ['setFieldOptionCalculated', {
        field: 'submissionReady',
        option: 'disabled',
        formula: 'applicationFiles.length = 0'
      }]
    ]
  }}
/>

// Advanced configuration with all features
<DocyFieldFileUpload
  name="mediaLibrary"
  label="Media Library Upload"
  multiple={true}
  maxFiles={50}
  accept="image/*,video/*,audio/*"
  maxSize={100 * 1024 * 1024} // 100MB
  dragDrop={true}
  showPreview={true}
  previewSize="md"
  showProgress={true}
  showFileInfo={true}
  allowRemove={true}
  uploadEndpoint="/api/upload/media"
  uploadMethod="POST"
  uploadHeaders={{
    'X-Upload-Context': 'media-library',
    'X-User-ID': userId
  }}
  chunkSize={10 * 1024 * 1024} // 10MB chunks
  resumable={true}
  autoUpload={true}
  uploadTimeout={60000} // 1 minute
  retryAttempts={3}
  retryDelay={1500}
  imageCompression={true}
  compressionQuality={0.9}
  thumbnailGeneration={true}
  thumbnailSize={300}
  storageType="cloud"
  storageConfig={{
    cloud: {
      provider: 'aws',
      bucket: 'media-uploads',
      region: 'us-east-1',
      accessKey: process.env.AWS_ACCESS_KEY,
      secretKey: process.env.AWS_SECRET_KEY
    }
  }}
  validator={async (file) => {
    // Check file integrity
    const buffer = await file.arrayBuffer();
    const hash = await calculateHash(buffer);
    
    if (await isDuplicateFile(hash)) {
      return 'This file has already been uploaded';
    }
    
    if (file.type.startsWith('image/')) {
      const image = await loadImage(file);
      if (image.width < 100 || image.height < 100) {
        return 'Images must be at least 100x100 pixels';
      }
    }
    
    return true;
  }}
  onUploadStart={(files) => {
    console.log('Starting upload of', files.length, 'files');
    analytics.track('upload_started', { fileCount: files.length });
  }}
  onUploadProgress={(file, progress) => {
    updateUploadProgress(file.id, progress);
  }}
  onUploadComplete={(file, response) => {
    console.log('Upload complete:', file.name, response);
    analytics.track('upload_completed', { 
      fileName: file.name, 
      fileSize: file.size,
      uploadTime: response.uploadTime
    });
  }}
  onUploadError={(file, error) => {
    console.error('Upload failed:', file.name, error);
    analytics.track('upload_failed', { 
      fileName: file.name, 
      error: error.message 
    });
  }}
  onFileAdd={(files) => {
    console.log('Files added:', files.map(f => f.name));
    updateFileList(files);
  }}
  onFileRemove={(file) => {
    console.log('File removed:', file.name);
    removeFromFileList(file);
  }}
  dropText="Drop your media files here or click to browse"
  browseText="Select Files"
  uploadingText="Uploading to cloud storage..."
  completedText="Successfully uploaded!"
  errorText="Upload failed. Please try again."
  validations={[
    { type: 'required', message: 'At least one media file is required' },
    { type: 'custom', validator: validateMediaFiles, message: 'Some files are not valid media files' }
  ]}
/>
```

### Integration Requirements
- **DocyFieldBase**: Base wrapper component (required)
- **DocyIcon**: For upload icons and status indicators
- **DocyButton**: For browse and action buttons
- **DocyProgress**: For upload progress visualization
- **DocyCard**: For file item display
- **DocyChip**: For file type and status display
- **DocyDialog**: For file removal confirmations
- **DocyToast**: For upload status notifications
- **DocySpinner**: For loading states
- **File handling library**: For file type detection and validation
- **Image processing library**: For compression and thumbnail generation
- **HTTP client**: Axios or fetch for upload requests

### Dependencies Required
- `react-hook-form`: Form state management (inherited from DocyFieldBase)
- `react-dropzone`: Drag and drop file handling
- `axios`: HTTP client for file uploads
- `file-type`: File type detection
- `image-compression`: Image compression functionality
- `canvas-api`: For image processing and thumbnails
- `crypto-js`: For file hashing and integrity checks
- `class-variance-authority`: Variant management
- All DocyFieldBase dependencies

### Testing Requirements
1. **Unit Tests**: File selection, validation, upload logic, compression, storage integration
2. **Integration Tests**: React Hook Form integration, form submission, validation flow
3. **Visual Tests**: All preview modes, progress indicators, responsive behavior
4. **Accessibility Tests**: Keyboard navigation, screen reader support, ARIA attributes
5. **Performance Tests**: Large file handling, multiple uploads, memory usage
6. **Upload Tests**: Network conditions, retry logic, resumable uploads, error handling
7. **Storage Tests**: Different storage backends, signed URLs, quota management
8. **Security Tests**: File validation, malicious file detection, upload sanitization

## Development Priority
**High** - Essential component for file management across the platform

## Notes
- Custom implementation using shadcn/ui design patterns for consistent styling
- Supports multiple storage backends with unified API
- Comprehensive file validation with custom rules and async support
- Chunked uploads enable handling of large files without memory issues
- Resumable uploads provide reliability for unstable network conditions
- Image compression and thumbnail generation optimize storage and performance
- Complete accessibility compliance ensures inclusive user experience
- Extensive customization options accommodate various file upload scenarios
- Integration with existing form systems and validation frameworks
- Performance optimized with lazy loading and efficient memory management
- Security-focused with file validation and sanitization features
- Extensible architecture allows for future enhancements and custom storage providers