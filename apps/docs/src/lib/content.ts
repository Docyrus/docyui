// Content utilities for Astro Content Collections
import { getCollection, type CollectionEntry } from 'astro:content';

export async function getDocBySlug(slug: string): Promise<CollectionEntry<'docs'> | undefined> {
  const docs = await getCollection('docs');
  return docs.find((doc) => doc.slug === slug);
}

export async function getComponentBySlug(slug: string): Promise<CollectionEntry<'components'> | undefined> {
  const components = await getCollection('components');
  return components.find((component) => component.slug === slug);
}

export async function getAllDocs(): Promise<CollectionEntry<'docs'>[]> {
  const docs = await getCollection('docs');
  return docs.filter((doc) => doc.data.published);
}

export async function getAllComponents(): Promise<CollectionEntry<'components'>[]> {
  const components = await getCollection('components');
  return components.filter((component) => component.data.published);
}

export async function getDocsNav() {
  const docsList = await getAllDocs();
  const componentsList = await getAllComponents();
  
  return [
    {
      title: "Getting Started",
      items: docsList.map(doc => ({
        title: doc.data.title,
        href: `/docs/${doc.slug}`,
      }))
    },
    {
      title: "Components",
      items: componentsList.map(component => ({
        title: component.data.title,
        href: `/docs/components/${component.slug}`,
      }))
    }
  ]
}