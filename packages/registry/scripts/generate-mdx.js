import fs from 'fs-extra'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Generate MDX content for components
async function generateComponentMDX() {
  const registryDir = path.join(__dirname, '..')
  const docsContentDir = path.join(__dirname, '../../apps/docs/content/components')
  
  // Ensure content directory exists
  await fs.ensureDir(docsContentDir)
  
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
  const title = componentName.charAt(0).toUpperCase() + componentName.slice(1)
  
  const examples = data.variants?.variant?.map(variant => {
    return `## ${variant.key.charAt(0).toUpperCase() + variant.key.slice(1)}

<ComponentPreview name="${componentName}" variant="${variant.key}" />
`
  }).join('\n') || ''
  
  const propsTable = data.props?.map(prop => {
    const defaultValue = prop.default || (prop.optional ? 'undefined' : '-')
    return `| \`${prop.name}\` | \`${prop.type}\` | \`${defaultValue}\` | ${prop.description} |`
  }).join('\n') || ''
  
  return `---
title: ${title}
description: ${data.description || `${title} component for DocyUI`}
---

import ComponentPreview from '@/components/component-preview.astro'

# ${title}

${data.description || `${title} component for DocyUI.`}

<ComponentPreview name="${componentName}" />

## Installation

\`\`\`bash
npx @docyui/react add ${componentName}
\`\`\`

## Usage

\`\`\`tsx
${data.usage?.import || `import { ${title} } from "@/components/ui/${componentName}"`}

export default function Component() {
  return (
    ${data.usage?.basic || `<${title}>${title}</${title}>`}
  )
}
\`\`\`

${examples ? `## Examples\n\n${examples}` : ''}

## API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
${propsTable}

### Variants

${data.variants?.variant?.map(variant => `- **${variant.key}**: \`${variant.value}\``).join('\n') || 'No variants available.'}
`
}

export { generateComponentMDX }