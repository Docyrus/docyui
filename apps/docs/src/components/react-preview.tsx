import React from 'react';
import type { ComponentMetadata } from '../lib/registry';

interface ReactPreviewProps {
  component: ComponentMetadata;
  name: string;
  props?: Record<string, any>;
}

const ReactPreview: React.FC<ReactPreviewProps> = ({ component, name, props = {} }) => {
  const [ImportedComponent, setImportedComponent] = React.useState<any>(null);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const loadComponent = async () => {
      try {
        // Dynamic import using the component name
        const module = await import(`../../../../packages/cli-react/src/components/${name}/index.ts`);
        const Component = module.default || module[component.componentName || ''] || Object.values(module)[0];
        
        if (Component) {
          setImportedComponent(() => Component);
        } else {
          setError('Component not found in module exports');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load component');
      }
    };

    loadComponent();
  }, [name, component.componentName]);

  if (error) {
    return <div className="text-red-500 text-sm">Error loading component: {error}</div>;
  }

  if (!ImportedComponent) {
    return <div className="text-gray-500 text-sm">Loading...</div>;
  }

  // Registry'den default props'ları al
  const getDefaultProps = () => {
    const defaultProps = { ...props };
    
    // Eğer registry'de examples varsa ilk example'ı kullan
    if (component.examples && Object.keys(component.examples).length > 0) {
      const firstExample = Object.values(component.examples)[0];
      if (firstExample && typeof firstExample === 'object' && 'code' in firstExample) {
        // Example kodundan text content varsa al
        const textMatch = firstExample.code.match(/>([^<]+)</);
        if (textMatch && !defaultProps.children) {
          defaultProps.children = textMatch[1];
        }
      }
    }
    
    // Eğer hala children yoksa component adını kullan
    if (!defaultProps.children && component.componentName) {
      defaultProps.children = component.componentName;
    }
    
    return defaultProps;
  };
  
  return <ImportedComponent {...getDefaultProps()} />;
};

export default ReactPreview;