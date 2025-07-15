import { Command } from 'commander'
import chalk from 'chalk'
import ora from 'ora'
import prompts from 'prompts'
import { saveConfig, injectCSS, loadConfig, getColorChoices, type DocyrusConfig } from '@docyui/shared'

export const initCommand = new Command()
  .name('init')
  .description('Initialize DocyUI in your project')
  .option('-c, --cwd <cwd>', 'working directory', process.cwd())
  .action(async (options) => {
    const cwd = require('path').resolve(options.cwd)
    const CLI_VERSION = '0.0.1' // TODO: Read from package.json
    
    // Check if config already exists
    let existingConfig: DocyrusConfig | null = null
    try {
      existingConfig = await loadConfig(cwd)
    } catch {
      // Config doesn't exist, continue with init
    }
    
    if (existingConfig) {
      console.log()
      console.log(chalk.yellow('DocyUI configuration already exists!'))
      
      // Check if CSS version needs update
      const needsCSSUpdate = !existingConfig.tailwind.cssVersion || existingConfig.tailwind.cssVersion !== CLI_VERSION
      
      if (needsCSSUpdate) {
        console.log(chalk.cyan('Updating CSS variables to latest version...'))
        
        if (existingConfig.tailwind.cssVariables) {
          const cssPath = require('path').resolve(cwd, existingConfig.tailwind.css)
          await injectCSS(cssPath, existingConfig.tailwind.baseColor) // Force update
          
          // Update CSS version in config
          existingConfig.tailwind.cssVersion = CLI_VERSION
          await saveConfig(cwd, existingConfig)
          
          console.log(chalk.green('CSS variables updated successfully!'))
        }
        
        return
      } else {
        console.log(chalk.gray('Everything is up to date.'))
        return
      }
    }
    
    console.log()
    console.log(chalk.bold('Welcome to DocyUI!'))
    console.log(chalk.gray('Let\'s set up your project.'))
    console.log()
    
    const response = await prompts([
      {
        type: 'select',
        name: 'framework',
        message: 'Which framework are you using?',
        choices: [
          { title: 'React', value: 'react' },
          { title: 'Vue', value: 'vue' }
        ],
        initial: 0
      },
      {
        type: 'select',
        name: 'baseColor',
        message: 'Which color would you like to use as base color?',
        choices: getColorChoices(),
        initial: 0
      },
      {
        type: 'confirm',
        name: 'cssVariables',
        message: 'Would you like to use CSS variables for colors?',
        initial: true
      },
      {
        type: 'text',
        name: 'tailwindCss',
        message: 'Where is your global CSS file?',
        initial: './src/app/globals.css'
      },
      {
        type: 'text',
        name: 'componentsPath',
        message: 'Where would you like to install components?',
        initial: './src/components/ui'
      },
      {
        type: 'text',
        name: 'componentsAlias',
        message: 'What import alias would you like for components?',
        initial: '@/components'
      },
      {
        type: 'text',
        name: 'utilsAlias',
        message: 'What import alias would you like for utils?',
        initial: '@/lib/utils'
      }
    ])
    
    const config: DocyrusConfig = {
      $schema: 'https://ui.docyrus.dev/schema.json',
      framework: response.framework,
      rsc: response.framework === 'react',
      tsx: true,
      componentsPath: response.componentsPath,
      tailwind: {
        css: response.tailwindCss,
        baseColor: response.baseColor,
        cssVariables: response.cssVariables,
        cssVersion: CLI_VERSION
      },
      aliases: {
        components: response.componentsAlias,
        utils: response.utilsAlias
      }
    }
    
    const spinner = ora('Setting up your project...').start()
    
    try {
      // Save configuration
      spinner.text = 'Creating docyui.json...'
      await saveConfig(cwd, config)
      
      // Inject CSS variables if enabled
      if (config.tailwind.cssVariables) {
        spinner.text = 'Adding CSS variables...'
        const cssPath = require('path').resolve(cwd, config.tailwind.css)
        await injectCSS(cssPath, config.tailwind.baseColor)
      }
      
      spinner.succeed(chalk.green('Setup complete!'))
      
      console.log()
      console.log(chalk.cyan('Configuration saved to docyui.json'))
      console.log()
      console.log(chalk.cyan('Next steps:'))
      if (response.framework === 'react') {
        console.log(chalk.gray('1. Run "npx @docyui/react add button" to add your first component'))
      } else {
        console.log(chalk.gray('1. Run "npx @docyui/vue add button" to add your first component'))
      }
      console.log(chalk.gray('2. Make sure Tailwind CSS v4 is installed: "npm install tailwindcss@next"'))
      console.log(chalk.gray('3. Import and use the components in your project'))
      console.log()
      
    } catch (error) {
      spinner.fail(chalk.red('Setup failed'))
      console.error(error)
      process.exit(1)
    }
  })