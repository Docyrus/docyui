import fs from 'fs-extra'
import path from 'path'

export type DocyrusConfig = {
  $schema?: string
  framework: 'react' | 'vue'
  rsc: boolean
  tsx: boolean
  componentsPath: string
  tailwind: {
    css: string
    baseColor: string
    cssVariables: boolean
    cssVersion: string
  }
  aliases: {
    components: string
    utils: string
  }
}


export async function loadConfig(cwd: string): Promise<DocyrusConfig> {
  const configPath = path.join(cwd, 'docyui.json')
  
  if (await fs.pathExists(configPath)) {
    const userConfig = await fs.readJSON(configPath)
    return userConfig
  }
  
  throw new Error('DocyUI configuration not found. Run "npx @docyui/latest init" first.')
}

export async function saveConfig(cwd: string, config: DocyrusConfig): Promise<void> {
  const configPath = path.join(cwd, 'docyui.json')
  await fs.writeJSON(configPath, config, { spaces: 2 })
}