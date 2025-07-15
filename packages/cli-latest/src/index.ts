#!/usr/bin/env node
import { Command } from 'commander'
import { initCommand } from './commands/init.js'

const program = new Command()

program
  .name('@docyui/latest')
  .description('CLI for initializing DocyUI projects')
  .version('0.0.1')

program.addCommand(initCommand)

program.parse()