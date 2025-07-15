import { Command } from 'commander'
import chalk from 'chalk'
import ora from 'ora'
import prompts from 'prompts'
import { fetchComponent, fetchFrameworkRegistry, loadConfig, installComponent, type DocyrusConfig } from '@docyui/shared'

export const addCommand = new Command()
  .name('add')
  .description('Add a React component to your project')
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
      // If config doesn't exist, create a default React config
      config = {
        $schema: 'https://ui.docyrus.dev/schema.json',
        framework: 'react',
        rsc: true,
        tsx: true,
        componentsPath: './src/components/ui',
        tailwind: {
          css: '',
          baseColor: 'slate',
          cssVariables: true,
          cssVersion: '0.0.1'
        },
        icons: {
          library: 'lucide',
          size: 20,
          strokeWidth: 1.5
        },
        aliases: {
          components: '@/components',
          utils: '@/lib/utils'
        }
      }
      
      console.log(chalk.yellow('No configuration found. Using default React configuration.'))
      console.log(chalk.gray('Run "npx @docyui/latest init" to create a configuration file.'))
      console.log()
      
      // Prompt for CSS file path if not configured
      if (!config.tailwind.css) {
        const cssResponse = await prompts({
          type: 'text',
          name: 'cssPath',
          message: 'Where is your global CSS file?',
          initial: './src/app/globals.css'
        })
        
        if (!cssResponse.cssPath) {
          console.log(chalk.red('CSS file path is required for component installation.'))
          process.exit(1)
        }
        
        config.tailwind.css = cssResponse.cssPath
      }
    }
    
    // Override framework to React
    config.framework = 'react'
    
    if (!components.length) {
      const registry = await fetchFrameworkRegistry('react')
      const choices = Object.keys(registry).map(name => ({
        title: name,
        value: name,
        description: registry[name].description || 'React component'
      }))
      
      const response = await prompts({
        type: 'multiselect',
        name: 'components',
        message: 'Which React components would you like to add?',
        choices,
        min: 1
      })
      
      if (!response.components?.length) {
        console.log(chalk.yellow('No components selected.'))
        process.exit(0)
      }
      
      components = response.components
    }
    
    const spinner = ora('Installing React components...').start()
    
    try {
      for (const componentName of components) {
        spinner.text = `Installing ${componentName}...`
        
        const component = await fetchComponent(componentName, 'react')
        if (!component) {
          spinner.fail(chalk.red(`Component ${componentName} not found for React`))
          continue
        }
        
        // Install registry dependencies first
        if (component.registryDependencies?.length) {
          for (const dep of component.registryDependencies) {
            await installComponent(dep, config, cwd, options.overwrite, 'react')
          }
        }
        
        // Install the component
        await installComponent(componentName, config, cwd, options.overwrite, 'react')
        
        spinner.succeed(chalk.green(`Installed ${componentName} (React)`))
      }
      
      spinner.succeed(chalk.green('All React components installed successfully!'))
      
      // Show post-install instructions
      console.log()
      console.log(chalk.cyan('Next steps:'))
      console.log(chalk.gray('- Install any required dependencies'))
      console.log(chalk.gray('- Import and use the components in your React project'))
      
    } catch (error) {
      spinner.fail(chalk.red('Failed to install React components'))
      console.error(error)
      process.exit(1)
    }
  })

