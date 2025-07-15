import fs from 'fs-extra'
import path from 'path'

export type CSSVars = {
  light: Record<string, string>
  dark: Record<string, string>
}

const BASE_CSS_VARS: CSSVars = {
  light: {
    'background': '0 0% 100%',
    'foreground': '222.2 84% 4.9%',
    'primary': '222.2 47.4% 11.2%',
    'primary-foreground': '210 40% 98%',
    'secondary': '210 40% 96%',
    'secondary-foreground': '222.2 84% 4.9%',
    'muted': '210 40% 96%',
    'muted-foreground': '215.4 16.3% 46.9%',
    'accent': '210 40% 96%',
    'accent-foreground': '222.2 84% 4.9%',
    'destructive': '0 84.2% 60.2%',
    'destructive-foreground': '210 40% 98%',
    'border': '214.3 31.8% 91.4%',
    'input': '214.3 31.8% 91.4%',
    'ring': '222.2 84% 4.9%',
    'radius': '0.5rem'
  },
  dark: {
    'background': '222.2 84% 4.9%',
    'foreground': '210 40% 98%',
    'primary': '210 40% 98%',
    'primary-foreground': '222.2 47.4% 11.2%',
    'secondary': '217.2 32.6% 17.5%',
    'secondary-foreground': '210 40% 98%',
    'muted': '217.2 32.6% 17.5%',
    'muted-foreground': '215 20.2% 65.1%',
    'accent': '217.2 32.6% 17.5%',
    'accent-foreground': '210 40% 98%',
    'destructive': '0 62.8% 30.6%',
    'destructive-foreground': '210 40% 98%',
    'border': '217.2 32.6% 17.5%',
    'input': '217.2 32.6% 17.5%',
    'ring': '212.7 26.8% 83.9%'
  }
}

export function generateCSSVariables(vars: CSSVars): string {
  const lightVars = Object.entries(vars.light)
    .map(([key, value]) => `    --${key}: ${value};`)
    .join('\n')
  
  const darkVars = Object.entries(vars.dark)
    .map(([key, value]) => `    --${key}: ${value};`)
    .join('\n')

  return `@import "tailwindcss";

@theme {
  --color-border: hsl(var(--border));
  --color-input: hsl(var(--input));
  --color-ring: hsl(var(--ring));
  --color-background: hsl(var(--background));
  --color-foreground: hsl(var(--foreground));
  --color-primary: hsl(var(--primary));
  --color-primary-foreground: hsl(var(--primary-foreground));
  --color-secondary: hsl(var(--secondary));
  --color-secondary-foreground: hsl(var(--secondary-foreground));
  --color-destructive: hsl(var(--destructive));
  --color-destructive-foreground: hsl(var(--destructive-foreground));
  --color-muted: hsl(var(--muted));
  --color-muted-foreground: hsl(var(--muted-foreground));
  --color-accent: hsl(var(--accent));
  --color-accent-foreground: hsl(var(--accent-foreground));
  --radius: var(--radius);
}

:root {
${lightVars}
}

.dark {
${darkVars}
}

* {
  border-color: hsl(var(--border));
}

body {
  background-color: hsl(var(--background));
  color: hsl(var(--foreground));
}`
}

export async function injectCSS(cssFilePath: string, baseColor: string = 'slate', forceUpdate: boolean = false): Promise<void> {
  const cssVars = getColorVars(baseColor)
  
  let existingContent = ''
  if (await fs.pathExists(cssFilePath)) {
    existingContent = await fs.readFile(cssFilePath, 'utf-8')
  }
  
  const hasDocyUICSS = existingContent.includes('@theme') && existingContent.includes('--color-background: hsl(var(--background))')
  
  // If CSS exists and we're not forcing update, skip
  if (hasDocyUICSS && !forceUpdate) {
    console.log('DocyUI CSS variables already exist, skipping injection.')
    return
  }
  
  await fs.ensureDir(path.dirname(cssFilePath))
  
  let newContent = existingContent
  
  // If updating, remove existing DocyUI CSS blocks
  if (hasDocyUICSS && forceUpdate) {
    // Remove existing DocyUI blocks
    newContent = removeExistingDocyUICSS(newContent)
  }
  
  // Add Tailwind import if not present
  if (!newContent.includes('@import "tailwindcss"')) {
    newContent = '@import "tailwindcss";\n\n' + newContent
  }
  
  // Generate and add our CSS blocks
  const themeBlock = `@theme {
  --color-border: hsl(var(--border));
  --color-input: hsl(var(--input));
  --color-ring: hsl(var(--ring));
  --color-background: hsl(var(--background));
  --color-foreground: hsl(var(--foreground));
  --color-primary: hsl(var(--primary));
  --color-primary-foreground: hsl(var(--primary-foreground));
  --color-secondary: hsl(var(--secondary));
  --color-secondary-foreground: hsl(var(--secondary-foreground));
  --color-destructive: hsl(var(--destructive));
  --color-destructive-foreground: hsl(var(--destructive-foreground));
  --color-muted: hsl(var(--muted));
  --color-muted-foreground: hsl(var(--muted-foreground));
  --color-accent: hsl(var(--accent));
  --color-accent-foreground: hsl(var(--accent-foreground));
  --radius: var(--radius);
}`

  const lightVars = Object.entries(cssVars.light)
    .map(([key, value]) => `    --${key}: ${value};`)
    .join('\n')
  
  const darkVars = Object.entries(cssVars.dark)
    .map(([key, value]) => `    --${key}: ${value};`)
    .join('\n')

  const rootBlock = `:root {
${lightVars}
}`

  const darkBlock = `.dark {
${darkVars}
}`

  const baseStyles = `* {
  border-color: hsl(var(--border));
}

body {
  background-color: hsl(var(--background));
  color: hsl(var(--foreground));
}`

  // Add our blocks to the end of the file
  newContent += `\n\n${themeBlock}\n\n${rootBlock}\n\n${darkBlock}\n\n${baseStyles}`
  
  await fs.writeFile(cssFilePath, newContent)
}

function removeExistingDocyUICSS(content: string): string {
  // Remove @theme block
  content = content.replace(/@theme\s*\{[^}]*\}/gs, '')
  
  // Remove :root block with DocyUI variables
  content = content.replace(/:root\s*\{[^}]*--background[^}]*\}/gs, '')
  
  // Remove .dark block with DocyUI variables  
  content = content.replace(/\.dark\s*\{[^}]*--background[^}]*\}/gs, '')
  
  // Remove base styles
  content = content.replace(/\*\s*\{[^}]*border-color[^}]*\}/gs, '')
  content = content.replace(/body\s*\{[^}]*background-color[^}]*\}/gs, '')
  
  // Clean up extra whitespace
  content = content.replace(/\n\s*\n\s*\n/g, '\n\n')
  content = content.trim()
  
  return content
}

function getColorVars(_baseColor: string): CSSVars {
  // For now, we'll use the default slate colors
  // Later, this can be expanded to support different base colors
  return BASE_CSS_VARS
}