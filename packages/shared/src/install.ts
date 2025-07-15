import fs from 'fs-extra'
import path from 'path'
import chalk from 'chalk'
import prettier from 'prettier'
import { fetchComponent, type DocyrusConfig } from './index.js'

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
    
    // Process import paths
    let processedContent = file.content
    processedContent = processedContent.replace(/@\/components/g, config.aliases.components)
    processedContent = processedContent.replace(/@\/lib\/utils/g, config.aliases.utils)
    
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
  
  // Log dependencies to install
  if (component.dependencies?.length) {
    console.log(chalk.blue(`  Dependencies to install: ${component.dependencies.join(', ')}`))
  }
  
  if (component.devDependencies?.length) {
    console.log(chalk.blue(`  Dev dependencies to install: ${component.devDependencies.join(', ')}`))
  }
}