import fs from 'fs-extra'
import path from 'path'
import { glob } from 'glob'
import { fileURLToPath } from 'url'

// Transform relative imports to alias imports for user projects
function transformImportsToAliases(content) {
  // Transform relative imports to alias imports
  return content
    .replace(/from "\.\.\/\.\.\/lib\/utils"/g, 'from "@/lib/utils"')
    .replace(/from "\.\.\/docy-([^"]+)"/g, 'from "@/components/docy-$1"')
    .replace(/from "\.\.\/([^"]+)"/g, 'from "@/components/$1"')
}

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
  
  // Clean up old registry files first
  console.log(`  Cleaning old ${framework} registry files...`)
  if (await fs.pathExists(registryDir)) {
    const existingFiles = await fs.readdir(registryDir)
    for (const file of existingFiles) {
      if (file.endsWith('.json')) {
        await fs.remove(path.join(registryDir, file))
      }
    }
  }
  
  // Get all component directories and files
  const entries = await fs.readdir(componentsDir, { withFileTypes: true })
  
  for (const entry of entries) {
    let componentName, componentData
    
    if (entry.isDirectory()) {
      // Handle folder-based components (e.g., docy-avatar/)
      componentName = entry.name.toLowerCase()
      const componentDir = path.join(componentsDir, entry.name)
      
      // Check if index file exists
      const indexExt = framework === 'react' ? 'ts' : 'ts'
      const indexPath = path.join(componentDir, `index.${indexExt}`)
      
      if (await fs.pathExists(indexPath)) {
        // Read all files in the component directory
        const componentFiles = await glob('**/*', { 
          cwd: componentDir,
          nodir: true
        })
        
        const files = []
        let mainContent = ''
        
        for (const file of componentFiles) {
          const filePath = path.join(componentDir, file)
          const content = await fs.readFile(filePath, 'utf-8')
          
          files.push({
            name: `${entry.name}/${file}`,
            content: transformImportsToAliases(content)
          })
          
          // Use the main component file for metadata extraction
          const mainFilePattern = framework === 'react' ? 
            new RegExp(`${componentName}\\.tsx$`) : 
            new RegExp(`${componentName}\\.vue$`)
          
          if (mainFilePattern.test(file)) {
            mainContent = content
          }
        }
        
        // Extract metadata from main component file
        const metadata = extractComponentMetadata(mainContent, framework, componentName)
        
        // Get all dependencies from all files
        const allDependencies = new Set()
        const allInternalDeps = new Set()
        
        // Read files again without transformation to detect internal dependencies
        for (const file of componentFiles) {
          const filePath = path.join(componentDir, file)
          const originalContent = await fs.readFile(filePath, 'utf-8')
          
          const deps = getComponentDependencies(originalContent, framework)
          deps.forEach(dep => allDependencies.add(dep))
          
          const internalDeps = getInternalComponentDependencies(originalContent, framework)
          internalDeps.forEach(dep => allInternalDeps.add(dep))
        }
        
        // Add internal dependencies to metadata
        if (allInternalDeps.size > 0) {
          metadata.internalDependencies = Array.from(allInternalDeps)
        }
        
        componentData = {
          name: componentName,
          dependencies: Array.from(allDependencies),
          devDependencies: [],
          registryDependencies: [],
          files: files,
          type: "components:ui",
          ...metadata
        }
      } else {
        console.log(`  ⚠ Skipping ${entry.name} - no index file found`)
        continue
      }
      
    } else if (entry.isFile()) {
      // Handle single-file components (e.g., button.tsx)
      const ext = path.extname(entry.name)
      const expectedExt = framework === 'react' ? '.tsx' : '.vue'
      
      if (ext !== expectedExt) {
        continue
      }
      
      componentName = path.basename(entry.name, ext).toLowerCase()
      const filePath = path.join(componentsDir, entry.name)
      const content = await fs.readFile(filePath, 'utf-8')
      
      // Extract metadata from component
      const metadata = extractComponentMetadata(content, framework, componentName)
      
      // Get internal dependencies
      const internalDeps = getInternalComponentDependencies(content, framework)
      if (internalDeps.length > 0) {
        metadata.internalDependencies = internalDeps
      }
      
      componentData = {
        name: componentName,
        dependencies: getComponentDependencies(content, framework),
        devDependencies: [],
        registryDependencies: [],
        files: [
          {
            name: entry.name,
            content: transformImportsToAliases(content)
          }
        ],
        type: "components:ui",
        ...metadata
      }
    } else {
      continue
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

function getInternalComponentDependencies(content, framework) {
  const internalDeps = []
  
  // Extract imports from relative paths
  const importMatches = content.match(/import\s+.*?from\s+['"]([^'"]+)['"]/g)
  
  if (importMatches) {
    importMatches.forEach(importStatement => {
      const packageMatch = importStatement.match(/from\s+['"]([^'"]+)['"]/)
      if (packageMatch) {
        const importPath = packageMatch[1]
        
        // Check for relative imports that look like component imports
        if (importPath.startsWith('../')) {
          // Extract component name from path like "../docy-icon" or "../docy-icon/index"
          const componentMatch = importPath.match(/\.\.\/(docy-[^/"]+)/)
          if (componentMatch) {
            const componentName = componentMatch[1]
            internalDeps.push(componentName)
          }
        }
      }
    })
  }
  
  // Remove duplicates
  return [...new Set(internalDeps)]
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
  // Extract displayName
  const displayNameMatch = content.match(/(\w+)\.displayName\s*=\s*['"]([\w\s]+)['"]/)
  let componentTitle = componentName.charAt(0).toUpperCase() + componentName.slice(1)
  
  if (displayNameMatch) {
    componentTitle = displayNameMatch[2]
  }
  
  // Store the actual component name for usage
  metadata.componentName = componentTitle
  
  // Extract props from interface - improved parsing
  const propsInterfaceMatch = content.match(/interface\s+\w*Props[^{]*\{([\s\S]*?)\}/s)
  if (propsInterfaceMatch) {
    const propsContent = propsInterfaceMatch[1]
    
    // Parse all props dynamically
    const propMatches = propsContent.match(/(\w+)\??\s*:\s*([^;\n]+)/g)
    let props = []
    
    if (propMatches) {
      props = propMatches.map(prop => {
        const [, name, type] = prop.match(/(\w+)\??\s*:\s*(.+)/)
        const optional = prop.includes('?')
        return {
          name: name.trim(),
          type: type.trim(),
          optional
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

    // Add default values to props
    props.forEach(prop => {
      if (defaultValues[prop.name]) {
        prop.default = defaultValues[prop.name]
      }
    })
    
    metadata.props = props
  }
  
  // Extract variants from cva - improved approach to handle any order
  const cvaMatch = content.match(/const\s+\w*[Vv]ariants\s*=\s*cva\s*\(/s)
  if (cvaMatch) {
    // Find the entire cva object to handle variants, compoundVariants, defaultVariants in any order
    const cvaObjectMatch = content.match(/const\s+\w*[Vv]ariants\s*=\s*cva\s*\(\s*"[^"]*",\s*\{([\s\S]*?)\}\s*\)/s)
    if (cvaObjectMatch) {
      const cvaContent = cvaObjectMatch[1]
      // Find the variants object using balanced bracket parsing
      const variantsStartMatch = cvaContent.match(/variants:\s*\{/)
      if (!variantsStartMatch) {
        // No variants found in this CVA
      } else {
      
      const variantsStartPos = variantsStartMatch.index + variantsStartMatch[0].length - 1
      let braceCount = 0
      let variantsEndPos = variantsStartPos
      
      for (let i = variantsStartPos; i < cvaContent.length; i++) {
        if (cvaContent[i] === '{') braceCount++
        else if (cvaContent[i] === '}') {
          braceCount--
          if (braceCount === 0) {
            variantsEndPos = i
            break
          }
        }
      }
      
      const variantsContent = cvaContent.slice(variantsStartPos + 1, variantsEndPos)
      // Parse variants manually to handle complex nesting
      const parseVariants = (content) => {
        const variants = {}
        let pos = 0
        
        // Find each variant block manually
        while (pos < content.length) {
          const variantMatch = content.slice(pos).match(/(\w+):\s*\{/)
          if (!variantMatch) break
          
          const variantName = variantMatch[1]
          const startPos = pos + variantMatch.index + variantMatch[0].length - 1
          
          // Find matching closing brace
          let braceCount = 0
          let endPos = startPos
          for (let i = startPos; i < content.length; i++) {
            if (content[i] === '{') braceCount++
            else if (content[i] === '}') {
              braceCount--
              if (braceCount === 0) {
                endPos = i
                break
              }
            }
          }
          
          const variantContent = content.slice(startPos + 1, endPos)
          
          // Extract individual options from the variant block - handle both quoted and unquoted keys
          const optionRegex = /(\w+|"\w+"):\s*"([^"]*)"/g
          let optionMatch
          const options = []
          
          while ((optionMatch = optionRegex.exec(variantContent)) !== null) {
            const key = optionMatch[1].replace(/"/g, '') // Remove quotes from key if present
            options.push({
              key: key.trim(),
              value: optionMatch[2].trim()
            })
          }
          
          if (options.length > 0) {
            variants[variantName] = options
          }
          
          pos = endPos + 1
        }
        
        return variants
      }
      
      const parsedVariants = parseVariants(variantsContent)
      Object.assign(metadata.variants, parsedVariants)
      }
    }
  }
  
  // Generate examples based on variants
  if (metadata.variants.variant) {
    metadata.examples = metadata.variants.variant.reduce((examples, variant) => {
      examples[variant.key] = {
        code: `<${componentTitle} variant="${variant.key}">${componentTitle}</${componentTitle}>`
      }
      return examples
    }, {})
  }
  
  // Usage examples  
  const variantKeys = Object.keys(metadata.variants || {})
  const hasVariants = variantKeys.length > 0
  
  metadata.usage = {
    import: `import { ${componentTitle} } from "@/components/ui/${componentName}"`,
    basic: `<${componentTitle}>${componentTitle}</${componentTitle}>`,
    withProps: hasVariants ? 
      `<${componentTitle} ${variantKeys.map(key => `${key}="${metadata.variants[key][0]?.key || 'default'}"`).join(' ')}>${componentTitle}</${componentTitle}>` :
      `<${componentTitle}>${componentTitle}</${componentTitle}>`
  }
  
  return metadata
}

function extractVueMetadata(content, metadata, componentName) {
  // Extract displayName - Vue components might use export default { name: 'ComponentName' }
  let componentTitle = componentName.charAt(0).toUpperCase() + componentName.slice(1)
  
  // Try to find Vue component name
  const vueNameMatch = content.match(/name:\s*['"]([\w\s]+)['"]/)
  if (vueNameMatch) {
    componentTitle = vueNameMatch[1]
  }
  
  // Store the actual component name for usage
  metadata.componentName = componentTitle
  
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
          optional
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
    const variantsMatch = content.match(/variants:\s*\{([\s\S]*?)\}\s*,?\s*(?:compoundVariants|defaultVariants)/s)
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
    metadata.examples = metadata.variants.variant.reduce((examples, variant) => {
      examples[variant.key] = {
        code: `<${componentTitle} variant="${variant.key}">${componentTitle}</${componentTitle}>`
      }
      return examples
    }, {})
  }
  
  // Usage examples
  const variantKeys = Object.keys(metadata.variants || {})
  const hasVariants = variantKeys.length > 0
  
  metadata.usage = {
    import: `import ${componentTitle} from "@/components/ui/${componentName}.vue"`,
    basic: `<${componentTitle}>${componentTitle}</${componentTitle}>`,
    withProps: hasVariants ? 
      `<${componentTitle} ${variantKeys.map(key => `${key}="${metadata.variants[key][0]?.key || 'default'}"`).join(' ')}>${componentTitle}</${componentTitle}>` :
      `<${componentTitle}>${componentTitle}</${componentTitle}>`
  }
  
  return metadata
}

buildRegistry().catch(console.error)