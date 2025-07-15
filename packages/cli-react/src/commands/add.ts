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
      console.log()
      console.log(chalk.red('DocyUI configuration not found!'))
      console.log(chalk.gray('Please run the following command first:'))
      console.log(chalk.cyan('  npx @docyui/latest init'))
      console.log()
      console.log(chalk.gray('This will create the necessary configuration file (docyui.json)'))
      console.log(chalk.gray('with your CSS path, aliases, and other settings.'))
      console.log()
      process.exit(1)
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

