import fs from 'fs-extra'
import path from 'path'
import { glob } from 'glob'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

async function buildRegistry() {
  const registryDir = path.join(__dirname, '..')
  const cliReactDir = path.join(__dirname, '../../cli-react/src/components')
  const cliVueDir = path.join(__dirname, '../../cli-vue/src/components')
  
  // Ensure registry directories exist
  await fs.ensureDir(path.join(registryDir, 'react'))
  await fs.ensureDir(path.join(registryDir, 'vue'))
  
  // Build React components
  console.log('Building React components...')
  await buildFrameworkComponents('react', cliReactDir)
  
  // Build Vue components
  console.log('Building Vue components...')
  await buildFrameworkComponents('vue', cliVueDir)
  
  console.log('Registry build completed!')
  
  // Generate MDX content for docs
  console.log('Generating MDX content...')
  const { generateComponentMDX } = await import('./generate-mdx.js')
  await generateComponentMDX()
}

async function buildFrameworkComponents(framework, componentsDir) {
  const registryDir = path.join(__dirname, '..', framework)
  const registry = {}
  
  // Get all component files
  const pattern = framework === 'react' ? '*.tsx' : '*.vue'
  const componentFiles = await glob(pattern, { cwd: componentsDir })
  
  for (const file of componentFiles) {
    const componentName = path.basename(file, path.extname(file)).toLowerCase()
    const filePath = path.join(componentsDir, file)
    const content = await fs.readFile(filePath, 'utf-8')
    
    // Extract metadata from component
    const metadata = extractComponentMetadata(content, framework, componentName)
    
    // Create component JSON
    const componentData = {
      name: componentName,
      dependencies: getComponentDependencies(content, framework),
      devDependencies: [],
      registryDependencies: [],
      files: [
        {
          name: file,
          content: content
        }
      ],
      type: "components:ui",
      ...metadata
    }
    
    // Write individual component file
    await fs.writeJSON(
      path.join(registryDir, `${componentName}.json`),
      componentData,
      { spaces: 2 }
    )
    
    // Add to registry
    registry[componentName] = componentData
    
    console.log(`  ✓ ${componentName} (${framework})`)
  }
  
  // Write framework index
  await fs.writeJSON(
    path.join(registryDir, 'index.json'),
    registry,
    { spaces: 2 }
  )
}

function getComponentDependencies(content, framework) {
  const dependencies = []
  
  // Extract all import statements
  const importMatches = content.match(/import\s+.*?from\s+['"]([^'"]+)['"]/g)
  
  if (importMatches) {
    importMatches.forEach(importStatement => {
      const packageMatch = importStatement.match(/from\s+['"]([^'"]+)['"]/)
      if (packageMatch) {
        const packageName = packageMatch[1]
        
        // Skip relative imports and built-in modules
        if (!packageName.startsWith('.') && !packageName.startsWith('/') && !packageName.startsWith('@/')) {
          // Skip Node.js built-ins
          const builtins = ['react', 'vue', 'fs', 'path', 'url']
          if (!builtins.includes(packageName)) {
            dependencies.push(packageName)
          }
        }
      }
    })
  }
  
  // Remove duplicates
  return [...new Set(dependencies)]
}

function extractComponentMetadata(content, framework, componentName) {
  const metadata = {
    props: [],
    variants: {},
    examples: {},
    description: `${componentName.charAt(0).toUpperCase() + componentName.slice(1)} component`,
    usage: {}
  }
  
  if (framework === 'react') {
    return extractReactMetadata(content, metadata, componentName)
  } else if (framework === 'vue') {
    return extractVueMetadata(content, metadata, componentName)
  }
  
  return metadata
}

function extractReactMetadata(content, metadata, componentName) {
  // Extract props from interface - improved parsing
  const propsInterfaceMatch = content.match(/interface\s+\w*Props[^{]*\{([\s\S]*?)\}/s)
  if (propsInterfaceMatch) {
    const propsContent = propsInterfaceMatch[1]
    
    // Handle extends clause
    const extendsMatch = content.match(/interface\s+\w*Props\s+extends\s+([^{]+)\{/)
    const baseProps = []
    if (extendsMatch) {
      const extendsList = extendsMatch[1]
      if (extendsList.includes('ButtonHTMLAttributes')) {
        baseProps.push({
          name: 'className',
          type: 'string',
          optional: true,
          description: 'CSS class name'
        })
        baseProps.push({
          name: 'disabled',
          type: 'boolean',
          optional: true,
          description: 'Disabled state'
        })
        baseProps.push({
          name: 'onClick',
          type: 'MouseEventHandler',
          optional: true,
          description: 'Click handler'
        })
      }
      if (extendsList.includes('VariantProps')) {
        baseProps.push({
          name: 'variant',
          type: '"default" | "destructive" | "outline" | "secondary" | "ghost" | "link"',
          optional: true,
          description: 'Button variant'
        })
        baseProps.push({
          name: 'size',
          type: '"default" | "sm" | "lg" | "icon"',
          optional: true,
          description: 'Button size'
        })
      }
    }
    
    // Parse explicit props
    const propMatches = propsContent.match(/(\w+)\??\s*:\s*([^;\n]+)/g)
    let explicitProps = []
    
    if (propMatches) {
      explicitProps = propMatches.map(prop => {
        const [, name, type] = prop.match(/(\w+)\??\s*:\s*(.+)/)
        const optional = prop.includes('?')
        return {
          name: name.trim(),
          type: type.trim(),
          optional,
          description: `${name} property`
        }
      })
    }
    
    // Parse defaultVariants to add default values
    const defaultVariantsMatch = content.match(/defaultVariants:\s*\{([\s\S]*?)\}/s)
    const defaultValues = {}
    if (defaultVariantsMatch) {
      const defaultContent = defaultVariantsMatch[1]
      const defaults = defaultContent.match(/(\w+):\s*['"]([\w-]+)['"]/g)
      if (defaults) {
        defaults.forEach(defaultProp => {
          const [, key, value] = defaultProp.match(/(\w+):\s*['"]([\w-]+)['"]/)
          defaultValues[key] = value
        })
      }
    }

    // Add default values to variant props
    baseProps.forEach(prop => {
      if (defaultValues[prop.name]) {
        prop.default = defaultValues[prop.name]
      }
    })
    
    metadata.props = [...baseProps, ...explicitProps]
  }
  
  // Extract variants from cva - simplified approach
  const cvaMatch = content.match(/const\s+\w*[Vv]ariants\s*=\s*cva\s*\(/s)
  if (cvaMatch) {
    // Find the variants object within the cva call
    const variantsMatch = content.match(/variants:\s*\{([\s\S]*?)\}\s*,?\s*defaultVariants/s)
    if (variantsMatch) {
      const variantsContent = variantsMatch[1]
      
      // Use regex to find all variant objects
      const variantBlockRegex = /(\w+):\s*\{([\s\S]*?)\}/g
      let variantMatch
      
      while ((variantMatch = variantBlockRegex.exec(variantsContent)) !== null) {
        const variantName = variantMatch[1]
        const variantOptions = variantMatch[2]
        
        // Extract individual options from the variant block
        const optionRegex = /(\w+):\s*"([^"]+)"/g
        let optionMatch
        const options = []
        
        while ((optionMatch = optionRegex.exec(variantOptions)) !== null) {
          options.push({
            key: optionMatch[1].trim(),
            value: optionMatch[2].trim()
          })
        }
        
        if (options.length > 0) {
          metadata.variants[variantName] = options
        }
      }
    }
  }
  
  // Generate examples based on variants
  if (metadata.variants.variant) {
    const componentTitle = componentName.charAt(0).toUpperCase() + componentName.slice(1)
    metadata.examples = metadata.variants.variant.reduce((examples, variant) => {
      examples[variant.key] = {
        code: `<${componentTitle} variant="${variant.key}">${componentTitle}</${componentTitle}>`,
        preview: `<button class="${variant.value}">${componentTitle}</button>`
      }
      return examples
    }, {})
  }
  
  // Usage examples
  const componentTitle = componentName.charAt(0).toUpperCase() + componentName.slice(1)
  metadata.usage = {
    import: `import { ${componentTitle} } from "@/components/ui/${componentName}"`,
    basic: `<${componentTitle}>${componentTitle}</${componentTitle}>`,
    withProps: `<${componentTitle} variant="outline" size="sm">${componentTitle}</${componentTitle}>`
  }
  
  return metadata
}

function extractVueMetadata(content, metadata, componentName) {
  // Extract props from interface - improved multi-line support
  const propsInterfaceMatch = content.match(/interface\s+\w*Props[^{]*\{([\s\S]*?)\}/s)
  if (propsInterfaceMatch) {
    const propsContent = propsInterfaceMatch[1]
    const propMatches = propsContent.match(/(\w+)\??\s*:\s*([^;\n}]+)/g)
    
    if (propMatches) {
      metadata.props = propMatches.map(prop => {
        const [, name, type] = prop.match(/(\w+)\??\s*:\s*(.+)/)
        const optional = prop.includes('?')
        return {
          name: name.trim(),
          type: type.trim(),
          optional,
          description: `${name} property`
        }
      })
      
      // Parse defaultVariants to add default values
      const defaultVariantsMatch = content.match(/defaultVariants:\s*\{([\s\S]*?)\}/s)
      const defaultValues = {}
      if (defaultVariantsMatch) {
        const defaultContent = defaultVariantsMatch[1]
        const defaults = defaultContent.match(/(\w+):\s*['"]([\w-]+)['"]/g)
        if (defaults) {
          defaults.forEach(defaultProp => {
            const [, key, value] = defaultProp.match(/(\w+):\s*['"]([\w-]+)['"]/)
            defaultValues[key] = value
          })
        }
      }

      // Add default values to props
      metadata.props.forEach(prop => {
        if (defaultValues[prop.name]) {
          prop.default = defaultValues[prop.name]
        }
      })
    }
  }
  
  // Extract variants from cva - simplified approach
  const cvaMatch = content.match(/const\s+\w*[Vv]ariants\s*=\s*cva\s*\(/s)
  if (cvaMatch) {
    // Find the variants object within the cva call
    const variantsMatch = content.match(/variants:\s*\{([\s\S]*?)\}\s*,?\s*defaultVariants/s)
    if (variantsMatch) {
      const variantsContent = variantsMatch[1]
      
      // Use regex to find all variant objects
      const variantBlockRegex = /(\w+):\s*\{([\s\S]*?)\}/g
      let variantMatch
      
      while ((variantMatch = variantBlockRegex.exec(variantsContent)) !== null) {
        const variantName = variantMatch[1]
        const variantOptions = variantMatch[2]
        
        // Extract individual options from the variant block (Vue uses single quotes)
        const optionRegex = /(\w+):\s*'([^']+)'/g
        let optionMatch
        const options = []
        
        while ((optionMatch = optionRegex.exec(variantOptions)) !== null) {
          options.push({
            key: optionMatch[1].trim(),
            value: optionMatch[2].trim()
          })
        }
        
        if (options.length > 0) {
          metadata.variants[variantName] = options
        }
      }
    }
  }
  
  // Generate examples based on variants
  if (metadata.variants.variant) {
    const componentTitle = componentName.charAt(0).toUpperCase() + componentName.slice(1)
    metadata.examples = metadata.variants.variant.reduce((examples, variant) => {
      examples[variant.key] = {
        code: `<${componentTitle} variant="${variant.key}">${componentTitle}</${componentTitle}>`,
        preview: `<button class="${variant.value}">${componentTitle}</button>`
      }
      return examples
    }, {})
  }
  
  // Usage examples
  const componentTitle = componentName.charAt(0).toUpperCase() + componentName.slice(1)
  metadata.usage = {
    import: `import ${componentTitle} from "@/components/ui/${componentTitle}.vue"`,
    basic: `<${componentTitle}>${componentTitle}</${componentTitle}>`,
    withProps: `<${componentTitle} variant="outline" size="sm">${componentTitle}</${componentTitle}>`
  }
  
  return metadata
}

buildRegistry().catch(console.error)