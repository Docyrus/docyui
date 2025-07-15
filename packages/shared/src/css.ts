import fs from 'fs-extra'
import path from 'path'

export type CSSVars = {
  light: Record<string, string>
  dark: Record<string, string>
}

export type ColorPalette = {
  name: string
  label: string
  description: string
  cssVars: CSSVars
}

const COLOR_PALETTES: Record<string, ColorPalette> = {
  slate: {
    name: 'slate',
    label: 'Slate',
    description: 'Cool gray with balanced undertones',
    cssVars: {
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
  },
  zinc: {
    name: 'zinc',
    label: 'Zinc',
    description: 'Modern neutral gray',
    cssVars: {
      light: {
        'background': '0 0% 100%',
        'foreground': '240 10% 3.9%',
        'primary': '240 5.9% 10%',
        'primary-foreground': '0 0% 98%',
        'secondary': '240 4.8% 95.9%',
        'secondary-foreground': '240 5.9% 10%',
        'muted': '240 4.8% 95.9%',
        'muted-foreground': '240 3.8% 46.1%',
        'accent': '240 4.8% 95.9%',
        'accent-foreground': '240 5.9% 10%',
        'destructive': '0 84.2% 60.2%',
        'destructive-foreground': '0 0% 98%',
        'border': '240 5.9% 90%',
        'input': '240 5.9% 90%',
        'ring': '240 5.9% 10%',
        'radius': '0.5rem'
      },
      dark: {
        'background': '240 10% 3.9%',
        'foreground': '0 0% 98%',
        'primary': '0 0% 98%',
        'primary-foreground': '240 5.9% 10%',
        'secondary': '240 3.7% 15.9%',
        'secondary-foreground': '0 0% 98%',
        'muted': '240 3.7% 15.9%',
        'muted-foreground': '240 5% 64.9%',
        'accent': '240 3.7% 15.9%',
        'accent-foreground': '0 0% 98%',
        'destructive': '0 62.8% 30.6%',
        'destructive-foreground': '0 0% 98%',
        'border': '240 3.7% 15.9%',
        'input': '240 3.7% 15.9%',
        'ring': '240 4.9% 83.9%'
      }
    }
  },
  stone: {
    name: 'stone',
    label: 'Stone',
    description: 'Warm neutral gray',
    cssVars: {
      light: {
        'background': '0 0% 100%',
        'foreground': '20 14.3% 4.1%',
        'primary': '24 9.8% 10%',
        'primary-foreground': '60 9.1% 97.8%',
        'secondary': '60 4.8% 95.9%',
        'secondary-foreground': '24 9.8% 10%',
        'muted': '60 4.8% 95.9%',
        'muted-foreground': '25 5.3% 44.7%',
        'accent': '60 4.8% 95.9%',
        'accent-foreground': '24 9.8% 10%',
        'destructive': '0 84.2% 60.2%',
        'destructive-foreground': '60 9.1% 97.8%',
        'border': '20 5.9% 90%',
        'input': '20 5.9% 90%',
        'ring': '24 9.8% 10%',
        'radius': '0.5rem'
      },
      dark: {
        'background': '20 14.3% 4.1%',
        'foreground': '60 9.1% 97.8%',
        'primary': '60 9.1% 97.8%',
        'primary-foreground': '24 9.8% 10%',
        'secondary': '12 6.5% 15.1%',
        'secondary-foreground': '60 9.1% 97.8%',
        'muted': '12 6.5% 15.1%',
        'muted-foreground': '24 5.4% 63.9%',
        'accent': '12 6.5% 15.1%',
        'accent-foreground': '60 9.1% 97.8%',
        'destructive': '0 62.8% 30.6%',
        'destructive-foreground': '60 9.1% 97.8%',
        'border': '12 6.5% 15.1%',
        'input': '12 6.5% 15.1%',
        'ring': '24 5.7% 82.9%'
      }
    }
  },
  gray: {
    name: 'gray',
    label: 'Gray',
    description: 'Classic neutral gray',
    cssVars: {
      light: {
        'background': '0 0% 100%',
        'foreground': '0 0% 3.9%',
        'primary': '0 0% 9%',
        'primary-foreground': '0 0% 98%',
        'secondary': '0 0% 96.1%',
        'secondary-foreground': '0 0% 9%',
        'muted': '0 0% 96.1%',
        'muted-foreground': '0 0% 45.1%',
        'accent': '0 0% 96.1%',
        'accent-foreground': '0 0% 9%',
        'destructive': '0 84.2% 60.2%',
        'destructive-foreground': '0 0% 98%',
        'border': '0 0% 89.8%',
        'input': '0 0% 89.8%',
        'ring': '0 0% 3.9%',
        'radius': '0.5rem'
      },
      dark: {
        'background': '0 0% 3.9%',
        'foreground': '0 0% 98%',
        'primary': '0 0% 98%',
        'primary-foreground': '0 0% 9%',
        'secondary': '0 0% 14.9%',
        'secondary-foreground': '0 0% 98%',
        'muted': '0 0% 14.9%',
        'muted-foreground': '0 0% 63.9%',
        'accent': '0 0% 14.9%',
        'accent-foreground': '0 0% 98%',
        'destructive': '0 62.8% 30.6%',
        'destructive-foreground': '0 0% 98%',
        'border': '0 0% 14.9%',
        'input': '0 0% 14.9%',
        'ring': '0 0% 83.1%'
      }
    }
  },
  neutral: {
    name: 'neutral',
    label: 'Neutral',
    description: 'Pure neutral colors',
    cssVars: {
      light: {
        'background': '0 0% 100%',
        'foreground': '0 0% 3.9%',
        'primary': '0 0% 9%',
        'primary-foreground': '0 0% 98%',
        'secondary': '0 0% 96.1%',
        'secondary-foreground': '0 0% 9%',
        'muted': '0 0% 96.1%',
        'muted-foreground': '0 0% 45.1%',
        'accent': '0 0% 96.1%',
        'accent-foreground': '0 0% 9%',
        'destructive': '0 84.2% 60.2%',
        'destructive-foreground': '0 0% 98%',
        'border': '0 0% 89.8%',
        'input': '0 0% 89.8%',
        'ring': '0 0% 3.9%',
        'radius': '0.5rem'
      },
      dark: {
        'background': '0 0% 3.9%',
        'foreground': '0 0% 98%',
        'primary': '0 0% 98%',
        'primary-foreground': '0 0% 9%',
        'secondary': '0 0% 14.9%',
        'secondary-foreground': '0 0% 98%',
        'muted': '0 0% 14.9%',
        'muted-foreground': '0 0% 63.9%',
        'accent': '0 0% 14.9%',
        'accent-foreground': '0 0% 98%',
        'destructive': '0 62.8% 30.6%',
        'destructive-foreground': '0 0% 98%',
        'border': '0 0% 14.9%',
        'input': '0 0% 14.9%',
        'ring': '0 0% 83.1%'
      }
    }
  },
  blue: {
    name: 'blue',
    label: 'Blue',
    description: 'Cool and professional blue',
    cssVars: {
      light: {
        'background': '0 0% 100%',
        'foreground': '222.2 84% 4.9%',
        'primary': '221.2 83.2% 53.3%',
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
        'ring': '221.2 83.2% 53.3%',
        'radius': '0.5rem'
      },
      dark: {
        'background': '222.2 84% 4.9%',
        'foreground': '210 40% 98%',
        'primary': '217.2 91.2% 59.8%',
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
        'ring': '224.3 76.3% 94.1%'
      }
    }
  },
  green: {
    name: 'green',
    label: 'Green',
    description: 'Fresh and natural green',
    cssVars: {
      light: {
        'background': '0 0% 100%',
        'foreground': '240 10% 3.9%',
        'primary': '142.1 76.2% 36.3%',
        'primary-foreground': '355.7 100% 97.3%',
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
        'ring': '142.1 76.2% 36.3%',
        'radius': '0.5rem'
      },
      dark: {
        'background': '20 14.3% 4.1%',
        'foreground': '0 0% 95%',
        'primary': '142.1 70.6% 45.3%',
        'primary-foreground': '144.9 80.4% 10%',
        'secondary': '240 3.7% 15.9%',
        'secondary-foreground': '0 0% 98%',
        'muted': '240 3.7% 15.9%',
        'muted-foreground': '240 5% 64.9%',
        'accent': '240 3.7% 15.9%',
        'accent-foreground': '0 0% 98%',
        'destructive': '0 62.8% 30.6%',
        'destructive-foreground': '0 0% 98%',
        'border': '240 3.7% 15.9%',
        'input': '240 3.7% 15.9%',
        'ring': '142.4 71.8% 29.2%'
      }
    }
  },
  orange: {
    name: 'orange',
    label: 'Orange',
    description: 'Energetic and vibrant orange',
    cssVars: {
      light: {
        'background': '0 0% 100%',
        'foreground': '20 14.3% 4.1%',
        'primary': '24.6 95% 53.1%',
        'primary-foreground': '60 9.1% 97.8%',
        'secondary': '60 4.8% 95.9%',
        'secondary-foreground': '24 9.8% 10%',
        'muted': '60 4.8% 95.9%',
        'muted-foreground': '25 5.3% 44.7%',
        'accent': '60 4.8% 95.9%',
        'accent-foreground': '24 9.8% 10%',
        'destructive': '0 84.2% 60.2%',
        'destructive-foreground': '60 9.1% 97.8%',
        'border': '20 5.9% 90%',
        'input': '20 5.9% 90%',
        'ring': '24.6 95% 53.1%',
        'radius': '0.5rem'
      },
      dark: {
        'background': '20 14.3% 4.1%',
        'foreground': '60 9.1% 97.8%',
        'primary': '20.5 90.2% 48.2%',
        'primary-foreground': '60 9.1% 97.8%',
        'secondary': '12 6.5% 15.1%',
        'secondary-foreground': '60 9.1% 97.8%',
        'muted': '12 6.5% 15.1%',
        'muted-foreground': '24 5.4% 63.9%',
        'accent': '12 6.5% 15.1%',
        'accent-foreground': '60 9.1% 97.8%',
        'destructive': '0 62.8% 30.6%',
        'destructive-foreground': '60 9.1% 97.8%',
        'border': '12 6.5% 15.1%',
        'input': '12 6.5% 15.1%',
        'ring': '20.5 90.2% 48.2%'
      }
    }
  },
  red: {
    name: 'red',
    label: 'Red',
    description: 'Bold and attention-grabbing red',
    cssVars: {
      light: {
        'background': '0 0% 100%',
        'foreground': '0 0% 3.9%',
        'primary': '0 72.2% 50.6%',
        'primary-foreground': '0 85.7% 97.3%',
        'secondary': '0 0% 96.1%',
        'secondary-foreground': '0 0% 9%',
        'muted': '0 0% 96.1%',
        'muted-foreground': '0 0% 45.1%',
        'accent': '0 0% 96.1%',
        'accent-foreground': '0 0% 9%',
        'destructive': '0 84.2% 60.2%',
        'destructive-foreground': '0 0% 98%',
        'border': '0 0% 89.8%',
        'input': '0 0% 89.8%',
        'ring': '0 72.2% 50.6%',
        'radius': '0.5rem'
      },
      dark: {
        'background': '0 0% 3.9%',
        'foreground': '0 0% 98%',
        'primary': '0 72.2% 50.6%',
        'primary-foreground': '0 85.7% 97.3%',
        'secondary': '0 0% 14.9%',
        'secondary-foreground': '0 0% 98%',
        'muted': '0 0% 14.9%',
        'muted-foreground': '0 0% 63.9%',
        'accent': '0 0% 14.9%',
        'accent-foreground': '0 0% 98%',
        'destructive': '0 62.8% 30.6%',
        'destructive-foreground': '0 0% 98%',
        'border': '0 0% 14.9%',
        'input': '0 0% 14.9%',
        'ring': '0 72.2% 50.6%'
      }
    }
  },
  rose: {
    name: 'rose',
    label: 'Rose',
    description: 'Soft and elegant rose pink',
    cssVars: {
      light: {
        'background': '0 0% 100%',
        'foreground': '240 10% 3.9%',
        'primary': '346.8 77.2% 49.8%',
        'primary-foreground': '355.7 100% 97.3%',
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
        'ring': '346.8 77.2% 49.8%',
        'radius': '0.5rem'
      },
      dark: {
        'background': '20 14.3% 4.1%',
        'foreground': '0 0% 95%',
        'primary': '346.8 77.2% 49.8%',
        'primary-foreground': '355.7 100% 97.3%',
        'secondary': '240 3.7% 15.9%',
        'secondary-foreground': '0 0% 98%',
        'muted': '240 3.7% 15.9%',
        'muted-foreground': '240 5% 64.9%',
        'accent': '240 3.7% 15.9%',
        'accent-foreground': '0 0% 98%',
        'destructive': '0 62.8% 30.6%',
        'destructive-foreground': '0 0% 98%',
        'border': '240 3.7% 15.9%',
        'input': '240 3.7% 15.9%',
        'ring': '346.8 77.2% 49.8%'
      }
    }
  },
  violet: {
    name: 'violet',
    label: 'Violet',
    description: 'Rich and sophisticated violet',
    cssVars: {
      light: {
        'background': '0 0% 100%',
        'foreground': '224 71.4% 4.1%',
        'primary': '262.1 83.3% 57.8%',
        'primary-foreground': '210 20% 98%',
        'secondary': '220 14.3% 95.9%',
        'secondary-foreground': '220.9 39.3% 11%',
        'muted': '220 14.3% 95.9%',
        'muted-foreground': '220 8.9% 46.1%',
        'accent': '220 14.3% 95.9%',
        'accent-foreground': '220.9 39.3% 11%',
        'destructive': '0 84.2% 60.2%',
        'destructive-foreground': '210 20% 98%',
        'border': '220 13% 91%',
        'input': '220 13% 91%',
        'ring': '262.1 83.3% 57.8%',
        'radius': '0.5rem'
      },
      dark: {
        'background': '224 71.4% 4.1%',
        'foreground': '210 20% 98%',
        'primary': '263.4 70% 50.4%',
        'primary-foreground': '210 20% 98%',
        'secondary': '215 27.9% 16.9%',
        'secondary-foreground': '210 20% 98%',
        'muted': '215 27.9% 16.9%',
        'muted-foreground': '217.9 10.6% 64.9%',
        'accent': '215 27.9% 16.9%',
        'accent-foreground': '210 20% 98%',
        'destructive': '0 62.8% 30.6%',
        'destructive-foreground': '210 20% 98%',
        'border': '215 27.9% 16.9%',
        'input': '215 27.9% 16.9%',
        'ring': '263.4 70% 50.4%'
      }
    }
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

export function getColorVars(baseColor: string): CSSVars {
  const palette = COLOR_PALETTES[baseColor]
  if (!palette) {
    console.warn(`Color palette '${baseColor}' not found, falling back to 'slate'`)
    return COLOR_PALETTES.slate.cssVars
  }
  return palette.cssVars
}

export function getAvailableColors(): ColorPalette[] {
  return Object.values(COLOR_PALETTES)
}

export function getColorChoices(): Array<{ title: string; value: string; description: string }> {
  return Object.values(COLOR_PALETTES).map(palette => ({
    title: palette.label,
    value: palette.name,
    description: palette.description
  }))
}