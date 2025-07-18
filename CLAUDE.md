# DocyUI Project Guidelines

## Project Overview
DocyUI is a component library monorepo built with TypeScript, React, and Tailwind CSS. It uses Turborepo for monorepo management and pnpm as the package manager.

## Development Commands
- `pnpm dev` - Start development servers
- `pnpm build` - Build all packages
- `pnpm lint` - Run linting across all packages
- `pnpm lint:fix` - Auto-fix linting issues
- `pnpm typecheck` - Run TypeScript type checking

## UI Component Guidelines
- React components: Base on ShadCN (https://ui.shadcn.com/docs/components)
- Vue components: Base on ShadCN Vue (https://www.shadcn-vue.com/docs/components)
- Use KiboUI as foundation for both React and Vue implementations
- Components should extend or derive from these base libraries
- Follow their patterns and design principles

## CSS Framework
- Use Tailwind CSS v4 exclusively
- Built-in utility classes may differ from v3 (e.g., some utilities require @reference directive)
- Use @theme directive in CSS for design token definitions
- CSS variables for theming (--background, --foreground, --primary, etc.)
- Follow Tailwind CSS v4 documentation for utility classes and directives

## Color System
- Use ShadCN color patterns from https://ui.shadcn.com/colors
- Supported color palettes: slate, zinc, stone, gray, neutral, blue, green, orange, red, rose, violet, opaque
- Components must use CSS variables for theming (--background, --foreground, --primary, etc.)
- Color selection during init with dynamic CSS generation
- Both light and dark mode support required

## Icon System
- Use Lucide icons exclusively for all components
- React components: Import from 'lucide-react'
- Vue components: Import from 'lucide-vue-next'
- Default icon properties:
  - Size: 20px
  - Stroke width: 1.5px
- Icons are automatically configured during component installation
- External libraries (lucide-react/lucide-vue-next) are included as dependencies

## Code Quality Standards
- Always run `pnpm lint` and `pnpm typecheck` after making changes
- Follow TypeScript best practices
- Use existing patterns and conventions from the codebase
- No comments unless explicitly requested
- Follow existing file organization and naming conventions

## Package Manager
- Use pnpm (version 10+) for all package operations
- Node.js 22+ required

## Monorepo Structure
- `apps/` - Applications (docs site, etc.)
- `packages/` - Reusable packages and components
- Turborepo configuration in `turbo.json`
- Workspace configuration in `pnpm-workspace.yaml`

## Never Create
- Documentation files unless explicitly requested
- Unnecessary new files when editing existing ones would suffice