// Content utilities for Velite
import { docs, components } from '@/content'

export function getDocBySlug(slug: string) {
  return docs.find((doc) => doc.slug === slug)
}

export function getComponentBySlug(slug: string) {
  return components.find((component) => component.slug === slug)
}

export function getAllDocs() {
  return docs.filter((doc) => doc.published)
}

export function getAllComponents() {
  return components.filter((component) => component.published)
}

export function getDocsNav() {
  const docsList = getAllDocs()
  
  return [
    {
      title: "Getting Started",
      items: docsList.map(doc => ({
        title: doc.title,
        href: `/docs/${doc.slug}`,
      }))
    },
    {
      title: "Components",
      items: getAllComponents().map(component => ({
        title: component.title,
        href: `/docs/components/${component.slug}`,
      }))
    }
  ]
}