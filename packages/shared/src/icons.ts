export type IconConfig = {
  library: 'lucide'
  size: number
  strokeWidth: number
}

export const DEFAULT_ICON_CONFIG: IconConfig = {
  library: 'lucide',
  size: 20,
  strokeWidth: 1.5
}

export function getIconLibrary(framework: 'react' | 'vue'): string {
  return framework === 'react' ? 'lucide-react' : 'lucide-vue-next'
}

export function getIconProps(config: IconConfig, framework: 'react' | 'vue'): string {
  if (framework === 'react') {
    return `size={${config.size}} strokeWidth={${config.strokeWidth}}`
  } else {
    return `:size="${config.size}" :stroke-width="${config.strokeWidth}"`
  }
}

export function processIconImports(content: string, framework: 'react' | 'vue'): string {
  const iconLibrary = getIconLibrary(framework)
  return content.replace(/from ['"]lucide['"];?/g, `from '${iconLibrary}';`)
}

export function addIconProps(content: string, config: IconConfig, framework: 'react' | 'vue'): string {
  const iconProps = getIconProps(config, framework)
  
  if (framework === 'react') {
    return content.replace(
      /<([A-Z][a-zA-Z]*Icon)([^>]*?)(\/?>) /g,
      (match, iconName, props, closing) => {
        if (!props.includes('size=') && !props.includes('strokeWidth=')) {
          props += ` ${iconProps}`
        } else {
          if (!props.includes('size=')) {
            props += ` size={${config.size}}`
          }
          if (!props.includes('strokeWidth=')) {
            props += ` strokeWidth={${config.strokeWidth}}`
          }
        }
        return `<${iconName}${props}${closing}`
      }
    )
  } else {
    return content.replace(
      /<([A-Z][a-zA-Z]*Icon)([^>]*?)(\/?>) /g,
      (match, iconName, props, closing) => {
        if (!props.includes(':size=') && !props.includes('size=') && 
            !props.includes(':stroke-width=') && !props.includes('stroke-width=')) {
          props += ` ${iconProps}`
        } else {
          if (!props.includes(':size=') && !props.includes('size=')) {
            props += ` :size="${config.size}"`
          }
          if (!props.includes(':stroke-width=') && !props.includes('stroke-width=')) {
            props += ` :stroke-width="${config.strokeWidth}"`
          }
        }
        return `<${iconName}${props}${closing}`
      }
    )
  }
}