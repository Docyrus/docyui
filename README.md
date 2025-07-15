# DocyUI CLI

Modern, type-safe UI component library with CLI-based distribution for React and Vue.js applications.

## Installation & Usage

### 1. Initialize Your Project

```bash
npx @docyui/latest init
```

This will configure:
- Framework selection (React/Vue)
- Base color selection (Slate)
- Component paths and import aliases
- CSS variables setup

### 2. Add Components

#### React Components
```bash
# Single component
npx @docyui/react add button

# Multiple components
npx @docyui/react add button card dialog

# Interactive selection
npx @docyui/react add
```

#### Vue Components
```bash
# Single component
npx @docyui/vue add button

# Multiple components
npx @docyui/vue add button card dialog

# Interactive selection
npx @docyui/vue add
```

### pnpm Support
```bash
pnpm dlx @docyui/latest init
pnpm dlx @docyui/react add button
pnpm dlx @docyui/vue add button
```

## CLI Architecture

### Published Packages

#### `@docyui/latest`
- **Purpose**: Project initialization only
- **Commands**: `init`
- Creates `docyui.json` configuration and sets up Tailwind CSS

#### `@docyui/react`
- **Purpose**: React component installation
- **Commands**: `add [components...]`
- Installs React components with JSX/TSX support and Radix UI integration

#### `@docyui/vue`
- **Purpose**: Vue component installation
- **Commands**: `add [components...]`
- Installs Vue components with Composition API support

### Internal Structure

#### `@docyui/shared` (Private Package)
- **Purpose**: Internal shared utilities for all CLI packages
- **Not Published**: Local workspace package only
- **Contains**:
  - `config.ts` - Configuration management (no DEFAULT_CONFIG)
  - `registry.ts` - Component fetching from GitHub
  - `css.ts` - CSS injection utilities
  - `install.ts` - Unified component installation logic

#### `registry/`
- **Purpose**: Component definitions and metadata
- **Structure**: JSON files containing component code and dependencies
- **Frameworks**: Separate React and Vue component definitions

## How It Works

1. **Registry System**: Components stored as JSON in `/packages/registry/`
2. **Shared Logic**: Common utilities in private `@docyui/shared` package
3. **Framework-Specific**: Each CLI package handles framework-specific logic
4. **Local Installation**: Components copied directly to your project with proper import path processing

## Configuration (`docyui.json`)

```json
{
  "framework": "react",
  "componentsPath": "./src/components/ui",
  "tailwind": {
    "css": "./src/app/globals.css",
    "baseColor": "slate",
    "cssVariables": true
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils"
  }
}
```

## Development

### Setup
```bash
# Install dependencies
pnpm install

# Build all packages
pnpm build

# Development mode
pnpm dev
```

### Package Structure
```
packages/
├── shared/             # @docyui/shared (private)
├── cli-latest/         # @docyui/latest
├── cli-react/          # @docyui/react  
├── cli-vue/            # @docyui/vue
└── registry/           # Component definitions
```

### Key Features
- **Clean Code**: DRY principles with shared utilities
- **Framework Consistency**: Unified installation logic across React/Vue
- **No Code Duplication**: Common logic centralized in `@docyui/shared`
- **Type Safety**: Full TypeScript support across all packages

## Why CLI-First?

- ✅ **Full Control**: Components copied to your project
- ✅ **Customizable**: Modify components as needed
- ✅ **Tree Shakable**: Only install what you use
- ✅ **No Bundle Bloat**: Copy-paste approach
- ✅ **Framework Agnostic**: Separate packages for React/Vue
- ✅ **Clean Architecture**: Shared utilities without code duplication

## License

MIT