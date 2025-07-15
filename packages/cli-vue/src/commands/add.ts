import { Command } from 'commander'
import chalk from 'chalk'
import ora from 'ora'
import prompts from 'prompts'
import { fetchComponent, fetchFrameworkRegistry, loadConfig, installComponent, type DocyrusConfig } from '@docyui/shared'

export const addCommand = new Command()
  .name('add')
  .description('Add a Vue component to your project')
  .argument('[components...]', 'components to add')
  .option('-y, --yes', 'skip confirmation prompt', false)
  .option('-o, --overwrite', 'overwrite existing files', false)
  .option('-c, --cwd <cwd>', 'working directory', process.cwd())
  .action(async (components: string[], options) => {
    const cwd = require('path').resolve(options.cwd)
    let config: DocyrusConfig
    
    try {
      config = await loadConfig(cwd)
    } catch {
      // If config doesn't exist, create a default Vue config
      config = {
        $schema: 'https://ui.docyrus.dev/schema.json',
        framework: 'vue',
        rsc: false,
        tsx: false,
        componentsPath: './src/components/ui',
        tailwind: {
          css: './src/app/globals.css',
          baseColor: 'slate',
          cssVariables: true,
          cssVersion: '0.0.1'
        },
        aliases: {
          components: '@/components',
          utils: '@/lib/utils'
        }
      }
      
      console.log(chalk.yellow('No configuration found. Using default Vue configuration.'))
      console.log(chalk.gray('Run "npx @docyui/latest init" to create a configuration file.'))
      console.log()
    }
    
    // Override framework to Vue
    config.framework = 'vue'
    
    if (!components.length) {
      const registry = await fetchFrameworkRegistry('vue')
      const choices = Object.keys(registry).map(name => ({
        title: name,
        value: name,
        description: registry[name].description || 'Vue component'
      }))
      
      const response = await prompts({
        type: 'multiselect',
        name: 'components',
        message: 'Which Vue components would you like to add?',
        choices,
        min: 1
      })
      
      if (!response.components?.length) {
        console.log(chalk.yellow('No components selected.'))
        process.exit(0)
      }
      
      components = response.components
    }
    
    const spinner = ora('Installing Vue components...').start()
    
    try {
      for (const componentName of components) {
        spinner.text = `Installing ${componentName}...`
        
        const component = await fetchComponent(componentName, 'vue')
        if (!component) {
          spinner.fail(chalk.red(`Component ${componentName} not found for Vue`))
          continue
        }
        
        // Install registry dependencies first
        if (component.registryDependencies?.length) {
          for (const dep of component.registryDependencies) {
            await installComponent(dep, config, cwd, options.overwrite, 'vue')
          }
        }
        
        // Install the component
        await installComponent(componentName, config, cwd, options.overwrite, 'vue')
        
        spinner.succeed(chalk.green(`Installed ${componentName} (Vue)`))
      }
      
      spinner.succeed(chalk.green('All Vue components installed successfully!'))
      
      // Show post-install instructions
      console.log()
      console.log(chalk.cyan('Next steps:'))
      console.log(chalk.gray('- Install any required dependencies'))
      console.log(chalk.gray('- Import and use the components in your Vue project'))
      
    } catch (error) {
      spinner.fail(chalk.red('Failed to install Vue components'))
      console.error(error)
      process.exit(1)
    }
  })

