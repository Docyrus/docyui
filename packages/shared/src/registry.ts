// Using built-in fetch (Node.js 18+)

export type Component = {
  name: string
  description?: string
  dependencies?: string[]
  devDependencies?: string[]
  registryDependencies?: string[]
  files: ComponentFile[]
  framework?: 'react' | 'vue'
}

export type ComponentFile = {
  name: string
  content: string
}

export type Registry = {
  [key: string]: Component
}

const REGISTRY_BASE_URL = 'https://raw.githubusercontent.com/Docyrus/docyui/main/packages/registry'

export async function fetchComponent(name: string, framework: 'react' | 'vue' = 'react'): Promise<Component | null> {
  try {
    const response = await fetch(`${REGISTRY_BASE_URL}/${framework}/${name}.json`)
    if (!response.ok) {
      return null
    }
    const component = await response.json() as Component
    component.framework = framework
    return component
  } catch {
    return null
  }
}

export async function fetchFrameworkRegistry(framework: 'react' | 'vue'): Promise<Registry> {
  try {
    const response = await fetch(`${REGISTRY_BASE_URL}/${framework}/index.json`)
    if (!response.ok) {
      return {}
    }
    const registry = await response.json() as Registry
    
    // Mark all components with their framework
    Object.values(registry).forEach(component => {
      component.framework = framework
    })
    
    return registry
  } catch {
    return {}
  }
}