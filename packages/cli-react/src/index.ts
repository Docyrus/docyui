#!/usr/bin/env node
import { Command } from 'commander'
import { addCommand } from './commands/add.js'

const program = new Command()

program
  .name('@docyui/react')
  .description('CLI for adding React components from DocyUI')
  .version('0.0.1')

// Set framework to React by default
process.env.DOCYRUS_FRAMEWORK = 'react'

program.addCommand(addCommand)

program.parse()