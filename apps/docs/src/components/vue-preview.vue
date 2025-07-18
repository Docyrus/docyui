<template>
  <div v-if="error" class="text-red-500 text-sm">Error loading component: {{ error }}</div>
  <div v-else-if="!ImportedComponent" class="text-gray-500 text-sm">Loading...</div>
  <component v-else :is="ImportedComponent" v-bind="getDefaultProps()" />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { ComponentMetadata } from '../lib/registry';

interface Props {
  component: ComponentMetadata;
  name: string;
  props?: Record<string, any>;
}

const props = withDefaults(defineProps<Props>(), {
  props: () => ({})
});

const ImportedComponent = ref<any>(null);
const error = ref<string | null>(null);

// Registry'den default props'ları al
const getDefaultProps = () => {
  const defaultProps = { ...props.props };
  
  // Eğer registry'de examples varsa ilk example'ı kullan
  if (props.component.examples && Object.keys(props.component.examples).length > 0) {
    const firstExample = Object.values(props.component.examples)[0];
    if (firstExample && typeof firstExample === 'object' && 'code' in firstExample) {
      // Example kodundan text content varsa al
      const textMatch = firstExample.code.match(/>([^<]+)</);
      if (textMatch && !defaultProps.children) {
        defaultProps.children = textMatch[1];
      }
    }
  }
  
  // Eğer hala children yoksa component adını kullan
  if (!defaultProps.children && props.component.componentName) {
    defaultProps.children = props.component.componentName;
  }
  
  return defaultProps;
};

onMounted(async () => {
  try {
    // Dynamic import using the component name
    const module = await import(`../../../../packages/cli-vue/src/components/${props.name}/index.ts`);
    const Component = module.default || module[props.component.componentName || ''] || Object.values(module)[0];
    
    if (Component) {
      ImportedComponent.value = Component;
    } else {
      error.value = 'Component not found in module exports';
    }
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Failed to load component';
  }
});
</script>