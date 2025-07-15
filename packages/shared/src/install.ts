import fs from 'fs-extra'
import path from 'path'
import chalk from 'chalk'
import prettier from 'prettier'
import { fetchComponent, type DocyrusConfig, processIconImports, addIconProps, getIconLibrary } from './index.js'

export async function installComponent(
  componentName: string,
  config: DocyrusConfig,
  cwd: string,
  overwrite: boolean,
  framework: 'react' | 'vue'
): Promise<void> {
  const component = await fetchComponent(componentName, framework)
  if (!component) {
    throw new Error(`Component ${componentName} not found for ${framework}`)
  }
  
  // Write component files
  for (const file of component.files) {
    const filePath = path.join(cwd, config.componentsPath, file.name)
    
    if (await fs.pathExists(filePath) && !overwrite) {
      console.log(chalk.yellow(`  File ${file.name} already exists, skipping...`))
      continue
    }
    
    await fs.ensureDir(path.dirname(filePath))
    
    // Process import paths and icon configurations
    let processedContent = file.content
    processedContent = processedContent.replace(/@\/components/g, config.aliases.components)
    processedContent = processedContent.replace(/@\/lib\/utils/g, config.aliases.utils)
    
    // Configure icon properties based on framework and config
    processedContent = processIconImports(processedContent, framework)
    processedContent = addIconProps(processedContent, config.icons, framework)
    
    // Format the content with prettier
    const parser = file.name.endsWith('.vue') ? 'vue' : 
                  (file.name.endsWith('.ts') || file.name.endsWith('.tsx')) ? 'typescript' : 'babel'
    
    const formatted = await prettier.format(processedContent, {
      parser,
      singleQuote: true,
      semi: false,
      tabWidth: 2
    })
    
    await fs.writeFile(filePath, formatted)
  }
  
  // Add lucide icon dependency based on framework
  const iconDependency = getIconLibrary(framework)
  const allDependencies = [...(component.dependencies || [])]
  
  // Add icon dependency if not already present
  if (!allDependencies.includes(iconDependency)) {
    allDependencies.push(iconDependency)
  }
  
  // Log dependencies to install
  if (allDependencies.length) {
    console.log(chalk.blue(`  Dependencies to install: ${allDependencies.join(', ')}`))
  }
  
  if (component.devDependencies?.length) {
    console.log(chalk.blue(`  Dev dependencies to install: ${component.devDependencies.join(', ')}`))
  }
}