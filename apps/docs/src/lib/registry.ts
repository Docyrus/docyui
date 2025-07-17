import { readFileSync } from 'fs'
import { resolve } from 'path'
import { fileURLToPath } from 'url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

export interface ComponentMetadata {
  name: string
  description: string
  props: Array<{
    name: string
    type: string
    optional: boolean
    description: string
  }>
  variants: Record<string, Array<{
    key: string
    value: string
  }>>
  examples: Record<string, {
    code: string
    preview: string
  }>
  usage: {
    import: string
    basic: string
    withProps: string
  }
  dependencies: string[]
  files: Array<{
    name: string
    content: string
  }>
}

export interface RegistryData {
  [componentName: string]: ComponentMetadata
}

let reactRegistry: RegistryData | null = null
let vueRegistry: RegistryData | null = null

export function getComponentRegistry(framework: 'react' | 'vue'): RegistryData {
  if (framework === 'react') {
    if (!reactRegistry) {
      try {
        const registryPath = resolve(__dirname, '../../../../packages/registry/react/index.json')
        const data = readFileSync(registryPath, 'utf-8')
        reactRegistry = JSON.parse(data)
      } catch (error) {
        console.error('Failed to load React registry:', error)
        reactRegistry = {}
      }
    }
    return reactRegistry || {}
  } else {
    if (!vueRegistry) {
      try {
        const registryPath = resolve(__dirname, '../../../../packages/registry/vue/index.json')
        const data = readFileSync(registryPath, 'utf-8')
        vueRegistry = JSON.parse(data)
      } catch (error) {
        console.error('Failed to load Vue registry:', error)
        vueRegistry = {}
      }
    }
    return vueRegistry || {}
  }
}

export function getComponent(name: string, framework: 'react' | 'vue'): ComponentMetadata | null {
  const registry = getComponentRegistry(framework)
  return registry[name] || null
}

export function getAllComponents(framework: 'react' | 'vue'): ComponentMetadata[] {
  const registry = getComponentRegistry(framework)
  return Object.values(registry)
}

export function getComponentNames(): string[] {
  // Get all component names from both frameworks
  const reactRegistry = getComponentRegistry('react')
  const vueRegistry = getComponentRegistry('vue')
  
  const reactNames = Object.keys(reactRegistry)
  const vueNames = Object.keys(vueRegistry)
  
  // Return unique component names
  return [...new Set([...reactNames, ...vueNames])]
}