import fs from 'fs-extra'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Generate MDX content for components
async function generateComponentMDX() {
  const registryDir = path.join(__dirname, '..')
  const docsContentDir = path.join(__dirname, '../../../apps/docs/src/content/components')
  
  // Ensure content directory exists
  await fs.ensureDir(docsContentDir)
  
  // Clean up old MDX files first
  console.log('  Cleaning old MDX files...')
  if (await fs.pathExists(docsContentDir)) {
    const existingFiles = await fs.readdir(docsContentDir)
    for (const file of existingFiles) {
      if (file.endsWith('.mdx') && file !== 'index.mdx') {
        await fs.remove(path.join(docsContentDir, file))
      }
    }
  }
  
  // Get all React component JSON files
  const reactDir = path.join(registryDir, 'react')
  const componentFiles = await fs.readdir(reactDir)
  const jsonFiles = componentFiles.filter(file => file.endsWith('.json'))
  
  for (const file of jsonFiles) {
    const componentName = path.basename(file, '.json')
    const componentData = await fs.readJSON(path.join(reactDir, file))
    
    const mdxContent = generateMDXContent(componentName, componentData)
    const mdxPath = path.join(docsContentDir, `${componentName}.mdx`)
    
    await fs.writeFile(mdxPath, mdxContent)
    console.log(`  ✓ Generated ${componentName}.mdx`)
  }
}

function generateMDXContent(componentName, data) {
  // Use componentName from metadata if available (displayName), otherwise use default
  const title = data.componentName || componentName.charAt(0).toUpperCase() + componentName.slice(1)
  
  // Use examples if available, otherwise generate from variants
  const examples = data.examples ? 
    Object.keys(data.examples).map(exampleKey => {
      const exampleName = exampleKey.charAt(0).toUpperCase() + exampleKey.slice(1).replace(/[-_]/g, ' ');
      return `### ${exampleName}

<ComponentPreview name="${componentName}" variant="${exampleKey}" />
`;
    }).join('\n') :
    data.variants?.variant?.map(variant => {
      return `### ${variant.key.charAt(0).toUpperCase() + variant.key.slice(1)}

<ComponentPreview name="${componentName}" variant="${variant.key}" />
`;
    }).join('\n') || ''
  
  const propsTable = data.props?.map(prop => {
    const defaultValue = prop.default ? `<code>${prop.default}</code>` : ''
    return `<td class="p-3"><code>${prop.name}</code></td><td class="p-3"><code>${prop.type}</code></td><td class="p-3">${defaultValue}</td>`
  }).join('\n') || ''
  
  // Generate variants section separately to avoid complex template literals
  const variantsSection = generateVariantsSection(data)
  
  return `---
title: ${title}
description: ${data.description || `${title} component for DocyUI`}
---

<div class="not-prose my-8">
  <ComponentPreview name="${componentName}" />
</div>

## Installation

${data.internalDependencies && data.internalDependencies.length > 0 ? `
<div class="not-prose mb-6">
  <div class="rounded-lg border border-amber-200 bg-amber-50 dark:border-amber-700 dark:bg-amber-950/30 p-4">
    <div class="flex items-start gap-3">
      <div class="mt-0.5">
        <svg class="h-5 w-5 text-amber-600 dark:text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
      <div class="flex-1">
        <h4 class="text-sm font-semibold text-amber-900 dark:text-amber-100">Required Components</h4>
        <p class="mt-1 text-sm text-amber-700 dark:text-amber-300">
          This component depends on the following DocyUI components:
        </p>
        <div class="mt-2 flex flex-wrap gap-2">
          ${data.internalDependencies.map(dep => 
            `<a href="/docs/components/${dep}" class="inline-flex items-center gap-1 rounded-md bg-amber-100 dark:bg-amber-900/50 px-2 py-1 text-xs font-medium text-amber-800 dark:text-amber-200 hover:bg-amber-200 dark:hover:bg-amber-900/70 transition-colors">
              <svg class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              ${dep}
            </a>`
          ).join('\n          ')}
        </div>
      </div>
    </div>
  </div>
</div>
` : ''}

<InstallTabs component="${componentName}" ${data.internalDependencies && data.internalDependencies.length > 0 ? `dependencies="${data.internalDependencies.join(' ')}"` : ''} />

## Usage

<div class="not-prose">
  <div class="rounded-lg border bg-muted shadow-sm p-3 my-3">    
    \`\`\`tsx
    ${data.usage?.import || `import { ${title} } from "@/components/ui/${componentName}"`}

    export default function Component() {
      return (
        ${data.usage?.basic || `<${title}>${title}</${title}>`}
      )
    }
    \`\`\`
  </div>
</div>

${examples ? `## Examples\n\n<div class="not-prose grid gap-6 my-8">\n${examples}\n</div>` : ''}

## API Reference

### Props

<div class="not-prose overflow-x-auto my-6">
  <table class="w-full text-sm">
    <thead>
      <tr class="border-b">
        <th class="text-left p-3 font-medium">Prop</th>
        <th class="text-left p-3 font-medium">Type</th>
        <th class="text-left p-3 font-medium">Default</th>
      </tr>
    </thead>
    <tbody class="divide-y">
${propsTable ? propsTable.split('\n').map(row => `      <tr class="hover:bg-muted/50">${row}</tr>`).join('\n') : ''}
    </tbody>
  </table>
</div>

${variantsSection}
`
}

function generateVariantsSection(data) {
  if (!data.variants || Object.keys(data.variants).length === 0) {
    return ''
  }

  let variantsHtml = `
### Variants

<div class="not-prose space-y-8 my-8">
`

  Object.entries(data.variants).forEach(([variantType, variants]) => {
    variantsHtml += `  <div class="variant-group">
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center gap-3">
          <h4 class="text-lg font-semibold text-foreground capitalize">${variantType}</h4>
          <span class="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
            <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
            ${variants.length} variant${variants.length > 1 ? 's' : ''}
          </span>
        </div>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
`

    variants.forEach(variant => {
      const colorBar = variantType === 'color' 
        ? '<div class="h-6 w-full bg-' + variant.key + '-500 bg-gradient-to-r from-' + variant.key + '-400 to-' + variant.key + '-600 opacity-80"></div>'
        : ''
      
      const valueDisplay = variant.value && variant.value.trim() 
        ? '<div class="mt-2 text-xs text-muted-foreground font-mono opacity-75">' + variant.value + '</div>'
        : ''

      variantsHtml += '        <div class="variant-item">\n'
      variantsHtml += '          <div class="variant-card relative overflow-hidden rounded-lg border border-border bg-card p-4">\n'
      variantsHtml += '            ' + colorBar + '\n'
      variantsHtml += '            <div class="' + (colorBar ? 'pt-2' : '') + '">\n'
      variantsHtml += '              <code class="text-sm font-mono font-medium text-foreground">' + variant.key + '</code>\n'
      variantsHtml += '              ' + valueDisplay + '\n'
      variantsHtml += '            </div>\n'
      variantsHtml += '          </div>\n'
      variantsHtml += '        </div>\n'
    })

    variantsHtml += `      </div>
    </div>
`
  })

  variantsHtml += '</div>'

  return variantsHtml
}

// Run the function if this script is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  generateComponentMDX().then(() => {
    console.log('✅ Component MDX files generated successfully!')
  }).catch(error => {
    console.error('❌ Error generating MDX files:', error)
    process.exit(1)
  })
}

export { generateComponentMDX }