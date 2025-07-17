# DocyFieldAvatarEditor Component

## Overview
DocyFieldAvatarEditor is an advanced avatar management component that extends DocyFieldBase to provide comprehensive avatar editing functionality. Built as a custom implementation using shadcn/ui design patterns (no direct shadcn/ui equivalent), it combines image upload, cropping, resizing, filtering, and capture capabilities into a unified avatar management interface. The component supports multiple input methods including file upload, drag-and-drop, and real-time webcam capture, with advanced editing tools for creating perfect profile pictures.

This specialized field component is designed for user profile management, team member avatars, contact photos, and any scenario requiring high-quality avatar creation and editing with professional-grade tools and intuitive user experience.

## Component Specification

### Props
DocyFieldAvatarEditor inherits ALL props from DocyFieldBase and adds the following avatar-specific properties:

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `size` | number | 120 | No | Avatar size in pixels (width and height) |
| `shape` | 'circle' \| 'square' \| 'rounded' | 'circle' | No | Avatar display shape |
| `cropRatio` | number | 1 | No | Crop aspect ratio (1 = square, 1.5 = 3:2, etc.) |
| `showCrop` | boolean | true | No | Show crop tool for image editing |
| `showResize` | boolean | true | No | Show resize tool for image scaling |
| `showFilters` | boolean | true | No | Show filter options for image enhancement |
| `filters` | FilterOption[] | defaultFilters | No | Available image filters |
| `showUpload` | boolean | true | No | Show file upload button |
| `showWebcam` | boolean | true | No | Show webcam capture button |
| `showRemove` | boolean | true | No | Show remove avatar button |
| `allowedTypes` | string[] | ['image/jpeg', 'image/png', 'image/webp'] | No | Allowed file MIME types |
| `maxFileSize` | number | 5 * 1024 * 1024 | No | Maximum file size in bytes (5MB default) |
| `quality` | number | 0.9 | No | Image compression quality (0-1) |
| `outputFormat` | 'jpeg' \| 'png' \| 'webp' | 'jpeg' | No | Output image format |
| `onImageChange` | (image: AvatarImage) => void | - | No | Callback when image changes |
| `onCropChange` | (cropData: CropData) => void | - | No | Callback when crop area changes |
| `onFilterChange` | (filter: FilterOption) => void | - | No | Callback when filter is applied |
| `onUpload` | (file: File) => void | - | No | Callback when file is uploaded |
| `onWebcamCapture` | (imageData: string) => void | - | No | Callback when webcam capture occurs |
| `onRemove` | () => void | - | No | Callback when avatar is removed |
| `uploadEndpoint` | string | - | No | API endpoint for avatar upload |
| `previewMode` | boolean | false | No | Enable preview-only mode (no editing) |
| `showZoom` | boolean | true | No | Show zoom controls in crop tool |
| `zoomMin` | number | 0.5 | No | Minimum zoom level |
| `zoomMax` | number | 3 | No | Maximum zoom level |
| `zoomStep` | number | 0.1 | No | Zoom step increment |
| `showRotate` | boolean | true | No | Show rotation controls |
| `rotateStep` | number | 90 | No | Rotation step in degrees |
| `showFlip` | boolean | true | No | Show flip controls (horizontal/vertical) |
| `backgroundRemoval` | boolean | false | No | Enable AI background removal |
| `faceDetection` | boolean | false | No | Enable face detection for auto-crop |
| `autoEnhance` | boolean | false | No | Enable automatic image enhancement |
| `cropPresets` | CropPreset[] | [] | No | Predefined crop ratios/sizes |
| `saveFormat` | 'base64' \| 'blob' \| 'file' | 'base64' | No | Format for saving processed image |
| `compressionLevel` | number | 0.8 | No | Compression level for output |
| `watermark` | WatermarkConfig | - | No | Watermark configuration |
| `uploadHeaders` | Record<string, string> | {} | No | Additional headers for upload |
| `webcamConstraints` | MediaStreamConstraints | defaultConstraints | No | Webcam capture constraints |
| `showGrid` | boolean | true | No | Show grid lines in crop tool |
| `gridLines` | number | 3 | No | Number of grid lines (3 = rule of thirds) |
| `enableUndo` | boolean | true | No | Enable undo/redo functionality |
| `maxUndoSteps` | number | 10 | No | Maximum undo steps to retain |
| `showPreview` | boolean | true | No | Show live preview during editing |
| `previewSize` | number | 60 | No | Preview thumbnail size |
| `placeholderImage` | string | - | No | Placeholder image URL when no avatar |
| `loadingText` | string | 'Processing...' | No | Text shown during processing |
| `uploadText` | string | 'Upload Image' | No | Upload button text |
| `webcamText` | string | 'Take Photo' | No | Webcam button text |
| `removeText` | string | 'Remove Avatar' | No | Remove button text |
| `cropText` | string | 'Crop Image' | No | Crop button text |
| `saveText` | string | 'Save Changes' | No | Save button text |
| `cancelText` | string | 'Cancel' | No | Cancel button text |

**Note**: DocyFieldAvatarEditor inherits all DocyFieldBase props including validation, layout, dynamic computed properties, AI integration, and more. See [DocyFieldBase documentation](./DocyFieldBase.md) for the complete list.

### TypeScript Interfaces

```typescript
interface AvatarImage {
  id: string;
  url: string;
  dataUrl?: string;
  blob?: Blob;
  file?: File;
  width: number;
  height: number;
  size: number;
  type: string;
  cropData?: CropData;
  filterData?: FilterData;
  metadata?: ImageMetadata;
  processedAt: Date;
}

interface CropData {
  x: number;
  y: number;
  width: number;
  height: number;
  zoom: number;
  rotation: number;
  flipHorizontal: boolean;
  flipVertical: boolean;
  aspectRatio: number;
}

interface FilterOption {
  id: string;
  name: string;
  displayName: string;
  icon: string;
  cssFilter: string;
  intensity: number;
  adjustable: boolean;
  description: string;
}

interface FilterData {
  filterId: string;
  intensity: number;
  settings: Record<string, any>;
  appliedAt: Date;
}

interface ImageMetadata {
  originalWidth: number;
  originalHeight: number;
  originalSize: number;
  originalType: string;
  processedWidth: number;
  processedHeight: number;
  processedSize: number;
  compressionRatio: number;
  editHistory: EditAction[];
}

interface EditAction {
  type: 'crop' | 'filter' | 'rotate' | 'flip' | 'resize' | 'enhance';
  params: Record<string, any>;
  timestamp: Date;
  undoData?: any;
}

interface CropPreset {
  id: string;
  name: string;
  ratio: number;
  width?: number;
  height?: number;
  icon: string;
  description: string;
}

interface WatermarkConfig {
  enabled: boolean;
  text?: string;
  image?: string;
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center';
  opacity: number;
  size: number;
  color: string;
  font: string;
}

interface WebcamCaptureConfig {
  video: {
    width: { ideal: number };
    height: { ideal: number };
    frameRate: { ideal: number };
    facingMode: 'user' | 'environment';
  };
  audio: boolean;
}

interface ProcessingOptions {
  quality: number;
  format: 'jpeg' | 'png' | 'webp';
  compression: number;
  backgroundRemoval: boolean;
  faceDetection: boolean;
  autoEnhance: boolean;
  watermark?: WatermarkConfig;
}

interface AvatarEditorState {
  currentImage: AvatarImage | null;
  isEditing: boolean;
  isUploading: boolean;
  isProcessing: boolean;
  isCropping: boolean;
  isWebcamActive: boolean;
  cropData: CropData;
  selectedFilter: FilterOption | null;
  undoStack: EditAction[];
  redoStack: EditAction[];
  error: string | null;
  progress: number;
}
```

### Behavior

1. **Image Input Methods**:
   - Drag-and-drop file upload with visual feedback
   - Click-to-browse file selection with type validation
   - Real-time webcam capture with device selection
   - Paste from clipboard support
   - URL import for web images

2. **Crop and Transform Tools**:
   - Interactive crop area with draggable handles
   - Zoom controls with smooth scaling
   - Rotation in 90-degree increments or free rotation
   - Horizontal and vertical flip transformations
   - Aspect ratio locking with preset ratios
   - Grid overlay for composition assistance

3. **Filter and Enhancement System**:
   - Predefined filter library (brightness, contrast, saturation, etc.)
   - Real-time filter preview with adjustable intensity
   - Multiple filter stacking support
   - Custom filter creation with CSS filters
   - AI-powered auto-enhancement
   - Background removal with AI processing

4. **Advanced Processing Features**:
   - Face detection for automatic crop suggestions
   - Smart crop recommendations based on content
   - Automatic image enhancement and correction
   - Watermark application with customizable settings
   - Compression optimization for web delivery
   - Multiple output format support

5. **User Interface Controls**:
   - Responsive editing interface with touch support
   - Undo/redo functionality for all operations
   - Real-time preview during editing
   - Progress indicators for processing operations
   - Keyboard shortcuts for common operations
   - Mobile-optimized controls and gestures

6. **Integration and Output**:
   - Seamless form integration with React Hook Form
   - Multiple output formats (base64, blob, file)
   - Automatic upload to configured endpoints
   - Metadata preservation and export
   - Edit history tracking for audit trails
   - Batch processing capabilities

## Component Requirements

### Technical Specifications
- **Framework**: React 18+ with TypeScript
- **Base Component**: Custom implementation using shadcn/ui design patterns (no direct shadcn/ui equivalent)
- **Design System**: shadcn/ui patterns for consistent styling with Button, Card, Dialog, Slider, and other components
- **Wrapper**: Extends DocyFieldBase for consistent field structure
- **Styling**: shadcn/ui patterns with Tailwind CSS v4
- **Image Processing**: Canvas API for image manipulation and filtering
- **Webcam**: MediaDevices API for camera access
- **File Handling**: HTML5 File API with drag-and-drop support
- **AI Features**: Optional integration with background removal and face detection services
- **Accessibility**: WCAG 2.1 AA compliance with keyboard navigation

### Key Features Required
1. **Multi-Input Support**: File upload, webcam capture, drag-and-drop, and paste functionality
2. **Advanced Cropping**: Interactive crop tool with zoom, rotation, and flip controls
3. **Filter System**: Comprehensive filter library with real-time preview and adjustable intensity
4. **Professional Tools**: Grid overlay, aspect ratio presets, and composition assistance
5. **AI Enhancement**: Optional background removal, face detection, and auto-enhancement
6. **Responsive Design**: Mobile-optimized interface with touch gesture support
7. **Accessibility**: Complete keyboard navigation and screen reader support

### Usage Examples

```tsx
// Basic avatar editor
<DocyFieldAvatarEditor
  name="userAvatar"
  label="Profile Picture"
  size={120}
  shape="circle"
  required={true}
  uploadEndpoint="/api/user/avatar"
/>

// Advanced avatar editor with all features
<DocyFieldAvatarEditor
  name="profilePhoto"
  label="Profile Photo"
  size={200}
  shape="rounded"
  cropRatio={1}
  showCrop={true}
  showResize={true}
  showFilters={true}
  showUpload={true}
  showWebcam={true}
  showRemove={true}
  allowedTypes={['image/jpeg', 'image/png', 'image/webp']}
  maxFileSize={10 * 1024 * 1024} // 10MB
  quality={0.9}
  outputFormat="jpeg"
  onImageChange={(image) => console.log('Image changed:', image)}
  onCropChange={(cropData) => console.log('Crop changed:', cropData)}
  onFilterChange={(filter) => console.log('Filter applied:', filter)}
  uploadEndpoint="/api/profile/photo"
/>

// Team member avatar with webcam focus
<DocyFieldAvatarEditor
  name="teamMemberPhoto"
  label="Team Member Photo"
  size={150}
  shape="circle"
  showWebcam={true}
  showUpload={true}
  faceDetection={true}
  autoEnhance={true}
  webcamConstraints={{
    video: {
      width: { ideal: 1280 },
      height: { ideal: 720 },
      frameRate: { ideal: 30 },
      facingMode: 'user'
    },
    audio: false
  }}
  cropPresets={[
    { id: 'square', name: 'Square', ratio: 1, icon: 'square', description: 'Perfect square crop' },
    { id: 'portrait', name: 'Portrait', ratio: 0.8, icon: 'user', description: 'Portrait orientation' }
  ]}
  filters={[
    { id: 'none', name: 'none', displayName: 'Original', icon: 'image', cssFilter: 'none', intensity: 1, adjustable: false, description: 'No filter applied' },
    { id: 'brightness', name: 'brightness', displayName: 'Bright', icon: 'sun', cssFilter: 'brightness(1.2)', intensity: 1.2, adjustable: true, description: 'Increase brightness' },
    { id: 'contrast', name: 'contrast', displayName: 'Contrast', icon: 'contrast', cssFilter: 'contrast(1.3)', intensity: 1.3, adjustable: true, description: 'Enhance contrast' },
    { id: 'vintage', name: 'vintage', displayName: 'Vintage', icon: 'film', cssFilter: 'sepia(0.5) contrast(1.2)', intensity: 0.5, adjustable: true, description: 'Vintage look' }
  ]}
  onWebcamCapture={(imageData) => {
    console.log('Webcam capture:', imageData);
  }}
/>

// E-commerce product avatar
<DocyFieldAvatarEditor
  name="productImage"
  label="Product Image"
  size={300}
  shape="square"
  cropRatio={1}
  showCrop={true}
  showResize={true}
  showFilters={true}
  backgroundRemoval={true}
  showGrid={true}
  gridLines={3}
  watermark={{
    enabled: true,
    text: '© MyStore',
    position: 'bottom-right',
    opacity: 0.7,
    size: 14,
    color: '#ffffff',
    font: 'Arial'
  }}
  cropPresets={[
    { id: 'square', name: 'Square', ratio: 1, icon: 'square', description: 'Perfect square for thumbnails' },
    { id: 'wide', name: 'Wide', ratio: 1.5, icon: 'rectangle-horizontal', description: 'Wide format for banners' }
  ]}
  uploadEndpoint="/api/products/image"
  onImageChange={(image) => {
    // Update product preview
    updateProductPreview(image);
  }}
/>

// Content creator avatar with advanced editing
<DocyFieldAvatarEditor
  name="creatorAvatar"
  label="Creator Avatar"
  size={250}
  shape="circle"
  showCrop={true}
  showResize={true}
  showFilters={true}
  showZoom={true}
  zoomMin={0.5}
  zoomMax={5}
  zoomStep={0.1}
  showRotate={true}
  rotateStep={1} // 1-degree precision
  showFlip={true}
  backgroundRemoval={true}
  faceDetection={true}
  autoEnhance={true}
  enableUndo={true}
  maxUndoSteps={20}
  filters={[
    { id: 'none', name: 'none', displayName: 'Original', icon: 'image', cssFilter: 'none', intensity: 1, adjustable: false, description: 'No filter' },
    { id: 'cinematic', name: 'cinematic', displayName: 'Cinematic', icon: 'film', cssFilter: 'contrast(1.4) brightness(0.9) saturate(1.2)', intensity: 1, adjustable: true, description: 'Cinematic look' },
    { id: 'portrait', name: 'portrait', displayName: 'Portrait', icon: 'user', cssFilter: 'brightness(1.1) contrast(1.1) saturate(0.9)', intensity: 1, adjustable: true, description: 'Portrait enhancement' },
    { id: 'vibrant', name: 'vibrant', displayName: 'Vibrant', icon: 'palette', cssFilter: 'saturate(1.5) contrast(1.2)', intensity: 1, adjustable: true, description: 'Vibrant colors' }
  ]}
  uploadEndpoint="/api/creator/avatar"
  onImageChange={(image) => {
    // Update creator profile
    updateCreatorProfile({ avatar: image });
  }}
  onCropChange={(cropData) => {
    // Save crop preferences
    saveCropPreferences(cropData);
  }}
/>

// Form integration with validation and actions
<DocyFieldAvatarEditor
  name="userProfilePhoto"
  label="Profile Photo"
  size={180}
  shape="circle"
  required={true}
  showCrop={true}
  showFilters={true}
  showUpload={true}
  showWebcam={true}
  showRemove={true}
  maxFileSize={5 * 1024 * 1024} // 5MB
  quality={0.85}
  outputFormat="jpeg"
  validations={[
    { type: 'required', message: 'Profile photo is required' },
    { type: 'custom', validator: validateImageDimensions, message: 'Image must be at least 200x200 pixels' }
  ]}
  computedRequired={{
    field: 'accountType',
    operator: 'equals',
    value: 'premium'
  }}
  actions={{
    change: [
      ['setFieldValue', { field: 'hasProfilePhoto', value: true }],
      ['setFieldOptionCalculated', {
        field: 'profileComplete',
        option: 'disabled',
        formula: 'userProfilePhoto = null'
      }]
    ]
  }}
  onImageChange={(image) => {
    // Update profile completion status
    updateProfileCompletion('photo', true);
  }}
  onRemove={() => {
    // Update profile completion status
    updateProfileCompletion('photo', false);
  }}
/>

// Mobile-optimized avatar editor
<DocyFieldAvatarEditor
  name="mobileAvatar"
  label="Profile Picture"
  size={120}
  shape="circle"
  showCrop={true}
  showFilters={true}
  showWebcam={true}
  previewMode={false}
  showGrid={false} // Simplified for mobile
  filters={[
    { id: 'none', name: 'none', displayName: 'Original', icon: 'image', cssFilter: 'none', intensity: 1, adjustable: false, description: 'No filter' },
    { id: 'warm', name: 'warm', displayName: 'Warm', icon: 'sun', cssFilter: 'sepia(0.2) saturate(1.1)', intensity: 1, adjustable: false, description: 'Warm tone' },
    { id: 'cool', name: 'cool', displayName: 'Cool', icon: 'snowflake', cssFilter: 'hue-rotate(180deg) saturate(1.1)', intensity: 1, adjustable: false, description: 'Cool tone' }
  ]}
  webcamConstraints={{
    video: {
      width: { ideal: 640 },
      height: { ideal: 480 },
      frameRate: { ideal: 15 },
      facingMode: 'user'
    },
    audio: false
  }}
  uploadEndpoint="/api/mobile/avatar"
  className="mobile-optimized"
/>

// Preview-only mode for display
<DocyFieldAvatarEditor
  name="displayAvatar"
  label="Current Avatar"
  size={100}
  shape="circle"
  previewMode={true}
  showUpload={false}
  showWebcam={false}
  showRemove={false}
  showCrop={false}
  showFilters={false}
  placeholderImage="/images/default-avatar.png"
  className="read-only"
/>
```

### Integration Requirements
- **DocyFieldBase**: Base wrapper component (required)
- **DocyIcon**: For tool icons and status indicators
- **DocyButton**: For action buttons and controls
- **DocyDialog**: For editing modal and confirmations
- **DocyCard**: For image preview and tool panels
- **DocySlider**: For filter intensity and zoom controls
- **DocyProgress**: For upload and processing progress
- **DocyToast**: For status notifications and errors
- **DocySpinner**: For loading states
- **DocyChip**: For filter tags and presets
- **DocyToggle**: For tool toggles and options
- **DocyPopover**: For tool menus and help text
- **Canvas API**: For image processing and manipulation
- **MediaDevices API**: For webcam functionality
- **File API**: For file handling and drag-and-drop

### Dependencies Required
- `react-hook-form`: Form state management (inherited from DocyFieldBase)
- `react-image-crop`: Interactive crop functionality
- `fabric.js` or `konva.js`: Advanced image editing capabilities
- `face-api.js`: Face detection and analysis
- `@tensorflow/tfjs`: AI-powered image processing
- `canvas-api`: Image processing and filtering
- `file-saver`: File download functionality
- `image-compression`: Image compression utilities
- `react-webcam`: Webcam capture component
- `react-dropzone`: Drag-and-drop file handling
- `class-variance-authority`: Variant management
- All DocyFieldBase dependencies

### Testing Requirements
1. **Unit Tests**: Image processing, crop calculations, filter application, webcam integration
2. **Integration Tests**: React Hook Form integration, file upload, validation flow
3. **Visual Tests**: All shapes and sizes, filter effects, responsive behavior
4. **Accessibility Tests**: Keyboard navigation, screen reader support, ARIA attributes
5. **Performance Tests**: Large image handling, filter processing, memory usage
6. **Device Tests**: Webcam access, mobile gestures, cross-browser compatibility
7. **Upload Tests**: File validation, progress tracking, error handling
8. **Processing Tests**: AI features, background removal, face detection accuracy

## Development Priority
**Medium** - Specialized component for avatar management with advanced editing capabilities

## Notes
- Custom implementation using shadcn/ui design patterns for consistent styling
- Comprehensive image editing tools with professional-grade features
- AI-powered enhancements including background removal and face detection
- Multiple input methods accommodate various user preferences and scenarios
- Responsive design with mobile-optimized controls and touch gestures
- Complete accessibility compliance ensures inclusive user experience
- Performance optimized for large image processing and real-time preview
- Extensible architecture allows for future AI and editing enhancements
- Integration with existing form systems and validation frameworks
- Security-focused with file validation and processing safeguards
- Watermark and branding support for commercial applications
- Comprehensive undo/redo system for confident editing experience