#!/usr/bin/env node
import { Command } from 'commander'
import { addCommand } from './commands/add.js'

const program = new Command()

program
  .name('@docyui/vue')
  .description('CLI for adding Vue components from DocyUI')
  .version('0.0.1')

// Set framework to Vue by default
process.env.DOCYRUS_FRAMEWORK = 'vue'

program.addCommand(addCommand)

program.parse()