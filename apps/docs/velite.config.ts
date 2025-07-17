import { defineConfig, defineCollection, s } from 'velite'
import rehypePrettyCode from 'rehype-pretty-code'
import { type Options as RehypePrettyCodeOptions } from 'rehype-pretty-code'

const rehypePrettyCodeOptions: RehypePrettyCodeOptions = {
  theme: {
    dark: 'github-dark',
    light: 'github-light',
  },
  keepBackground: false,
  defaultLang: {
    block: 'tsx',
    inline: 'plaintext',
  },
}

const docs = defineCollection({
  name: 'Docs',
  pattern: 'docs/**/*.mdx',
  schema: s
    .object({
      title: s.string(),
      description: s.string().optional(),
      published: s.boolean().default(true),
      component: s.boolean().default(false),
      toc: s.toc(),
      code: s.mdx(),
    })
    .transform((data, { meta }) => ({
      ...data,
      slug: (meta as any).basename.replace(/\.mdx$/, ''),
      slugAsParams: (meta as any).basename.replace(/\.mdx$/, ''),
    })),
})

const components = defineCollection({
  name: 'Components',
  pattern: 'components/**/*.mdx',
  schema: s
    .object({
      title: s.string(),
      description: s.string(),
      published: s.boolean().default(true),
      radix: s
        .object({
          link: s.string(),
          api: s.string(),
        })
        .optional(),
      links: s
        .object({
          doc: s.string(),
          api: s.string(),
        })
        .optional(),
      toc: s.toc(),
      code: s.mdx(),
    })
    .transform((data, { meta }) => ({
      ...data,
      slug: (meta as any).basename.replace(/\.mdx$/, ''),
      slugAsParams: (meta as any).basename.replace(/\.mdx$/, ''),
    })),
})

export default defineConfig({
  root: 'content',
  output: {
    data: '.velite',
    assets: 'public/static',
    base: '/static/',
    name: '[name]-[hash:6].[ext]',
    clean: true,
  },
  collections: { docs, components },
  mdx: {
    rehypePlugins: [[rehypePrettyCode, rehypePrettyCodeOptions]],
    remarkPlugins: [],
  },
})