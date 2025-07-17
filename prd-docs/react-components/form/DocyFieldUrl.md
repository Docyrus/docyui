# DocyFieldUrl Component

## Overview
DocyFieldUrl is a specialized URL input component that extends DocyFieldBase to provide comprehensive URL-specific functionality. Built on top of the shadcn/ui Input component, it handles URL validation, protocol management, link testing, preview generation, and domain filtering to ensure valid and accessible URLs.

This component provides a complete URL input solution with features like automatic protocol detection, URL validation, connection testing, favicon display, URL shortening, and real-time preview to ensure proper URL format and accessibility.

## Component Specification

### Props
DocyFieldUrl inherits ALL props from DocyFieldBase and adds the following URL-specific properties:

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `protocol` | string | 'https' | No | Default protocol to use when none specified |
| `protocols` | string[] | ['http', 'https'] | No | Array of allowed protocols |
| `requireProtocol` | boolean | true | No | Whether protocol is required in URL |
| `autoProtocol` | boolean | true | No | Auto-add protocol if missing |
| `showProtocolSelect` | boolean | false | No | Show protocol dropdown selector |
| `validateDomain` | boolean | false | No | Validate domain existence via DNS lookup |
| `showPreview` | boolean | false | No | Show URL preview/favicon |
| `previewHeight` | number | 200 | No | Preview height in pixels |
| `testConnection` | boolean | false | No | Test URL connectivity |
| `testTimeout` | number | 5000 | No | Connection test timeout (ms) |
| `onTest` | function | - | No | Callback when URL test completes |
| `onPreview` | function | - | No | Callback when preview loads |
| `allowedDomains` | string[] | [] | No | Whitelist of allowed domains |
| `blockedDomains` | string[] | [] | No | Blacklist of blocked domains |
| `shortenUrl` | boolean | false | No | Enable URL shortening |
| `shortenService` | string | 'default' | No | URL shortening service ('default', 'tinyurl', 'bitly') |
| `maxLength` | number | 2048 | No | Maximum URL length |
| `allowLocalhost` | boolean | false | No | Allow localhost URLs |
| `allowIp` | boolean | false | No | Allow IP address URLs |
| `allowFragment` | boolean | true | No | Allow URL fragments (#section) |
| `allowQuery` | boolean | true | No | Allow URL query parameters |
| `stripWww` | boolean | false | No | Automatically strip www from URLs |
| `forceLowercase` | boolean | false | No | Force URL to lowercase |
| `showFavicon` | boolean | false | No | Show favicon next to URL |
| `faviconSize` | number | 16 | No | Favicon size in pixels |
| `validateSsl` | boolean | false | No | Validate SSL certificate for HTTPS URLs |
| `allowFileProtocol` | boolean | false | No | Allow file:// protocol |
| `allowFtpProtocol` | boolean | false | No | Allow ftp:// protocol |
| `customProtocols` | string[] | [] | No | Additional custom protocols to allow |
| `urlPattern` | RegExp | - | No | Custom URL validation pattern |
| `domainValidation` | function | - | No | Custom domain validation function |
| `connectionTest` | function | - | No | Custom connection test function |
| `previewGenerator` | function | - | No | Custom preview generation function |
| `showConnectionStatus` | boolean | false | No | Show connection status indicator |
| `retryFailedConnections` | boolean | true | No | Retry failed connection tests |
| `cacheResults` | boolean | true | No | Cache validation and test results |
| `debounceDelay` | number | 300 | No | Debounce delay for validation (ms) |

**Note**: DocyFieldUrl inherits all DocyFieldBase props including validation, layout, dynamic computed properties, AI integration, and more. See [DocyFieldBase documentation](./DocyFieldBase.md) for the complete list.

### TypeScript Interfaces

```typescript
interface UrlValidationResult {
  isValid: boolean;
  protocol?: string;
  domain?: string;
  error?: string;
  suggestions?: string[];
}

interface UrlConnectionResult {
  isReachable: boolean;
  statusCode?: number;
  responseTime?: number;
  sslValid?: boolean;
  error?: string;
}

interface UrlPreviewData {
  title?: string;
  description?: string;
  image?: string;
  favicon?: string;
  url: string;
  error?: string;
}

interface UrlShortenResult {
  shortUrl: string;
  originalUrl: string;
  service: string;
  error?: string;
}

interface ProtocolOption {
  value: string;
  label: string;
  icon?: string;
  description?: string;
}

interface DomainValidationResult {
  isValid: boolean;
  exists: boolean;
  error?: string;
  suggestions?: string[];
}

interface UrlFieldState {
  url: string;
  protocol: string;
  domain: string;
  isValidating: boolean;
  isTesting: boolean;
  isGeneratingPreview: boolean;
  validationResult: UrlValidationResult | null;
  connectionResult: UrlConnectionResult | null;
  previewData: UrlPreviewData | null;
  shortenResult: UrlShortenResult | null;
  favicon: string | null;
}
```

### Behavior

1. **URL Input Handling**:
   - Real-time URL format validation with protocol detection
   - Automatic protocol addition when missing
   - Support for various protocols (HTTP, HTTPS, FTP, custom)
   - URL normalization and formatting

2. **Protocol Management**:
   - Configurable default and allowed protocols
   - Optional protocol selector dropdown
   - Automatic protocol detection from user input
   - Custom protocol support for specialized use cases

3. **Domain Validation**:
   - DNS lookup for domain existence verification
   - Domain whitelist and blacklist filtering
   - Support for international domains (IDN)
   - Localhost and IP address validation options

4. **Connection Testing**:
   - Optional URL connectivity verification
   - Configurable timeout and retry logic
   - SSL certificate validation for HTTPS URLs
   - Status code and response time reporting

5. **Preview Generation**:
   - URL preview with title, description, and image
   - Favicon display and caching
   - Custom preview generators
   - Iframe preview for supported content

6. **URL Shortening**:
   - Integration with popular shortening services
   - Custom shortening service support
   - Original URL preservation
   - Short URL validation and expansion

7. **Validation System**:
   - Comprehensive URL format validation
   - Custom validation patterns and functions
   - Real-time validation with debouncing
   - Error handling and suggestion system

## Component Requirements

### Technical Specifications
- **Framework**: React 18+ with TypeScript
- **Base Component**: shadcn/ui Input component (`pnpm dlx shadcn@latest add input`)
- **Extensions**: Docy-specific features including protocol management, connection testing, preview generation, and URL shortening built on top of shadcn base
- **Wrapper**: Extends DocyFieldBase for consistent field structure
- **Styling**: shadcn/ui Input component with Tailwind CSS v4
- **Validation**: React Hook Form integration with custom URL validators
- **DNS Lookup**: Optional domain validation via DNS API
- **Connection Testing**: HTTP/HTTPS connectivity verification
- **Preview Generation**: URL metadata extraction and display
- **Accessibility**: WCAG 2.1 AA compliance with proper ARIA attributes

### Key Features Required
1. **URL Validation**: Comprehensive URL format and accessibility validation
2. **Protocol Management**: Flexible protocol handling and selection
3. **Domain Validation**: DNS lookup and domain filtering
4. **Connection Testing**: Real-time URL connectivity verification
5. **Preview System**: URL metadata and favicon display
6. **URL Shortening**: Integration with shortening services
7. **Performance**: Debounced validation and result caching
8. **Accessibility**: Complete keyboard navigation and screen reader support

### Usage Examples

```tsx
// Basic URL input
<DocyFieldUrl
  name="website"
  label="Website URL"
  placeholder="Enter website URL"
  required={true}
/>

// URL with protocol selector
<DocyFieldUrl
  name="endpoint"
  label="API Endpoint"
  showProtocolSelect={true}
  protocols={['http', 'https', 'ftp']}
  protocol="https"
  requireProtocol={true}
/>

// URL with connection testing
<DocyFieldUrl
  name="apiUrl"
  label="API URL"
  testConnection={true}
  testTimeout={3000}
  validateSsl={true}
  showConnectionStatus={true}
  onTest={(result) => console.log('Connection test:', result)}
/>

// URL with preview
<DocyFieldUrl
  name="linkUrl"
  label="Link URL"
  showPreview={true}
  previewHeight={150}
  showFavicon={true}
  faviconSize={20}
  onPreview={(preview) => console.log('Preview loaded:', preview)}
/>

// URL with domain restrictions
<DocyFieldUrl
  name="companyUrl"
  label="Company Website"
  allowedDomains={['company.com', 'subsidiary.com']}
  blockedDomains={['competitor.com']}
  validateDomain={true}
  domainValidation={(domain) => {
    const allowedDomains = ['company.com', 'subsidiary.com'];
    return allowedDomains.includes(domain) || {
      isValid: false,
      error: 'Please use a company domain'
    };
  }}
/>

// URL with shortening
<DocyFieldUrl
  name="shareUrl"
  label="Share URL"
  shortenUrl={true}
  shortenService="tinyurl"
  maxLength={100}
  validations={[
    { type: 'required', message: 'URL is required' },
    { type: 'url', message: 'Please enter a valid URL' }
  ]}
/>

// Advanced URL validation
<DocyFieldUrl
  name="resourceUrl"
  label="Resource URL"
  protocols={['http', 'https', 'ftp', 'sftp']}
  allowLocalhost={true}
  allowIp={true}
  allowFileProtocol={true}
  customProtocols={['git', 'ssh']}
  urlPattern={/^(https?|ftp|git|ssh):\/\/[\w\-]+(\.[\w\-]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?$/}
  connectionTest={(url) => {
    // Custom connection test logic
    return fetch(url, { method: 'HEAD' })
      .then(response => ({
        isReachable: response.ok,
        statusCode: response.status,
        responseTime: Date.now() - startTime
      }))
      .catch(error => ({
        isReachable: false,
        error: error.message
      }));
  }}
/>

// URL with custom validation
<DocyFieldUrl
  name="secureUrl"
  label="Secure URL"
  validations={[
    { type: 'required', message: 'Secure URL is required' },
    { type: 'url', message: 'Please enter a valid URL' }
  ]}
  customValidations={[
    {
      formula: '$not($contains(secureUrl, "https://"))',
      message: 'URL must use HTTPS protocol'
    },
    {
      formula: '$contains(secureUrl, "localhost")',
      message: 'Localhost URLs are not allowed'
    }
  ]}
  protocol="https"
  requireProtocol={true}
  validateSsl={true}
/>

// URL with computed properties
<DocyFieldUrl
  name="redirectUrl"
  computedLabel="'Redirect URL (' + userRole + ')'"
  computedRequired={{ field: 'enableRedirect', operator: 'equals', value: true }}
  computedHidden={{ field: 'redirectType', operator: 'equals', value: 'none' }}
  showPreview={true}
  testConnection={true}
  actions={{
    change: [
      ['setFieldValue', {
        field: 'urlTested',
        value: false
      }],
      ['setFieldValueCalculated', {
        field: 'urlDomain',
        formula: '$substringAfter($substringAfter(redirectUrl, "://"), "/")'
      }]
    ]
  }}
/>

// Complete form integration
<form onSubmit={handleSubmit(onSubmit)}>
  <DocyFieldUrl
    name="primaryUrl"
    label="Primary Website"
    validations={[
      { type: 'required', message: 'Primary website is required' },
      { type: 'url', message: 'Please enter a valid URL' }
    ]}
    testConnection={true}
    showPreview={true}
    showFavicon={true}
    shortenUrl={true}
    protocol="https"
    showProtocolSelect={true}
  />
  
  <DocyFieldUrl
    name="backupUrl"
    label="Backup URL"
    computedRequired={{ field: 'requireBackup', operator: 'equals', value: true }}
    allowedDomains={['backup.company.com']}
    testConnection={true}
    validateSsl={true}
    retryFailedConnections={true}
  />
  
  <DocyFieldUrl
    name="feedUrl"
    label="RSS Feed URL"
    protocols={['http', 'https', 'feed']}
    customProtocols={['rss']}
    allowFragment={false}
    stripWww={true}
    forceLowercase={true}
    urlPattern={/^(https?|feed|rss):\/\/.*\.(xml|rss|atom)$/}
  />
</form>

// URL with custom preview
<DocyFieldUrl
  name="mediaUrl"
  label="Media URL"
  showPreview={true}
  previewHeight={300}
  previewGenerator={(url) => {
    // Custom preview logic for media URLs
    return fetch(`/api/media-preview?url=${encodeURIComponent(url)}`)
      .then(response => response.json())
      .then(data => ({
        title: data.title,
        description: data.description,
        image: data.thumbnail,
        url: url
      }));
  }}
  allowedDomains={['youtube.com', 'vimeo.com', 'soundcloud.com']}
  testConnection={true}
/>

// URL with file protocol support
<DocyFieldUrl
  name="fileUrl"
  label="File Path"
  allowFileProtocol={true}
  protocols={['file', 'http', 'https']}
  allowLocalhost={true}
  showProtocolSelect={true}
  placeholder="file:///path/to/file or http://server/file"
  validations={[
    { type: 'required', message: 'File path is required' }
  ]}
  customValidations={[
    {
      formula: '$contains(fileUrl, "file://") and $not($contains(fileUrl, ".."))',
      message: 'File paths cannot contain parent directory references'
    }
  ]}
/>

// URL with FTP support
<DocyFieldUrl
  name="ftpUrl"
  label="FTP Server"
  allowFtpProtocol={true}
  protocols={['ftp', 'ftps', 'sftp']}
  showProtocolSelect={true}
  testConnection={true}
  testTimeout={10000}
  placeholder="ftp://server.example.com/path"
  connectionTest={(url) => {
    // Custom FTP connection test
    return testFtpConnection(url);
  }}
/>
```

### Integration Requirements
- **DocyFieldBase**: Base wrapper component (required)
- **DocySelect**: For protocol selection dropdown
- **DocyButton**: For connection test and preview actions
- **DocySpinner**: For loading states during testing/preview
- **DocyTooltip**: For validation and status indicators
- **DocyCard**: For preview display
- **DocyImage**: For favicon and preview images
- **DNS Lookup Service**: For domain validation
- **HTTP Client**: For connection testing
- **URL Shortening APIs**: For shortening services
- **Metadata Extraction Service**: For preview generation

### Dependencies Required
- `react-hook-form`: Form state management (inherited from DocyFieldBase)
- `@radix-ui/react-select`: For protocol selection
- `url-parse`: For URL parsing and validation
- `punycode`: For international domain support
- `debounce`: For performance optimization
- `class-variance-authority`: Variant management
- `validator`: For URL validation helpers
- `dns-lookup`: For domain validation (optional)
- `fetch`: For connection testing and preview generation
- All DocyFieldBase dependencies

### Testing Requirements
1. **Unit Tests**: URL validation, protocol handling, domain filtering, connection testing
2. **Integration Tests**: React Hook Form integration, preview functionality, shortening services
3. **Visual Tests**: All variants, preview display, protocol selector, responsive behavior
4. **Accessibility Tests**: Keyboard navigation, screen reader support, ARIA attributes
5. **Performance Tests**: Validation performance, connection timeouts, preview loading
6. **Validation Tests**: URL format validation, custom patterns, domain validation
7. **Protocol Tests**: All supported protocols, custom protocols, protocol detection
8. **Connection Tests**: HTTP/HTTPS testing, SSL validation, timeout handling
9. **Preview Tests**: Metadata extraction, favicon loading, error handling
10. **Edge Cases**: Invalid URLs, network failures, malformed responses

## Development Priority
**Medium** - Specialized form field component used for URL inputs across the platform

## Notes
- Built on shadcn/ui Input component with extensive URL-specific enhancements
- Comprehensive URL validation including format, protocol, and accessibility checking
- Intelligent protocol management with auto-detection and selection
- Real-time connection testing with configurable timeout and retry logic
- Rich preview system with metadata extraction and favicon display
- URL shortening integration with popular services
- Domain filtering with whitelist/blacklist support
- Performance optimized with debounced validation and result caching
- Complete accessibility compliance for inclusive user experience
- Integrates seamlessly with React Hook Form and DocyFieldBase
- Extensive customization options for various URL input scenarios
- Support for specialized protocols (FTP, file, custom protocols)
- International domain support with IDN validation
- Mobile-optimized for touch interactions and responsive design