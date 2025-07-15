import fs from 'fs-extra'
import path from 'path'
import { glob } from 'glob'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

async function buildRegistry() {
  const componentsDir = path.join(__dirname, '../components')
  const componentFiles = await glob('*.json', { cwd: componentsDir })
  
  const registry = {}
  
  for (const file of componentFiles) {
    const componentName = path.basename(file, '.json')
    const componentData = await fs.readJSON(path.join(componentsDir, file))
    registry[componentName] = {
      name: componentName,
      ...componentData
    }
  }
  
  // Write index file
  await fs.writeJSON(
    path.join(componentsDir, 'index.json'),
    registry,
    { spaces: 2 }
  )
  
  console.log(`Built registry with ${Object.keys(registry).length} components`)
}

buildRegistry().catch(console.error)