import type { Meta, StoryObj } from '@storybook/tanstack-react'
import { expect, waitFor } from 'storybook/test'
import { Route } from '../routes/$libraryId/$version.docs.community-resources'
import preview from '../../.storybook/preview'

// Page-level story for the community-resources route. The real route loader
// hits a remote markdown source via `loadDocs`; here we mock it so the story
// renders with deterministic frontmatter sections.
const meta = preview.meta({
  parameters: {
    tanstack: {
      router: {
        route: Route,
        path: '/$libraryId/$version/docs/community-resources',
        params: { libraryId: 'query', version: 'latest' },
        routeOverrides: {
          '/$libraryId/$version/docs/community-resources': {
            loader: async () => ({
              doc: {
                frontmatter: {
                  articles: [
                    {
                      title: 'Why TanStack Query?',
                      description:
                        'A deep dive into the case for query caching and async state management.',
                      url: 'https://example.com/articles/why-tanstack-query',
                    },
                    {
                      title: 'Migrating to v5',
                      description: 'Upgrade guide with codemods and patterns.',
                      url: 'https://example.com/articles/migrating-v5',
                    },
                  ],
                  utilities: [
                    {
                      title: 'query-devtools-extra',
                      description: 'Companion devtools panels for power users.',
                      url: 'https://example.com/utilities/devtools-extra',
                    },
                  ],
                },
              },
            }),
          },
        },
      },
    },
  },
  tags: ['ai-generated'],
})

export default meta
type Story = StoryObj<typeof meta>

export const Default = meta.story({
  play: async ({ canvas }) => {
    // Title and intro
    await waitFor(async () => {
      await expect(
        canvas.getByRole('heading', { name: /community resources/i }),
      ).toBeVisible()
    })
    await expect(canvas.getByText(/submit a pr on github/i)).toBeVisible()

    // Section headings derived from the mocked frontmatter keys
    await expect(
      canvas.getByRole('heading', { name: /^article$/i }),
    ).toBeVisible()
    await expect(
      canvas.getByRole('heading', { name: /^utility$/i }),
    ).toBeVisible()

    // Resource cards link out to the URLs from the mocked loader
    const articleLink = canvas.getByRole('link', {
      name: /why tanstack query/i,
    })
    await expect(articleLink).toHaveAttribute(
      'href',
      'https://example.com/articles/why-tanstack-query',
    )
  },
})

export const EmptyFrontmatter = meta.story({
  parameters: {
    tanstack: {
      router: {
        route: Route,
        path: '/$libraryId/$version/docs/community-resources',
        params: { libraryId: 'query', version: 'latest' },
        routeOverrides: {
          '/$libraryId/$version/docs/community-resources': {
            loader: async () => ({ doc: null }) as never,
          },
        },
      },
    },
  },
  play: async ({ canvas }) => {
    // Even with no doc, the title + intro still render — the body sections
    // are conditional on frontmatter shape.
    await waitFor(async () => {
      await expect(
        canvas.getByRole('heading', { name: /community resources/i }),
      ).toBeVisible()
    })
    // No section headings should be present.
    await expect(
      canvas.queryByRole('heading', { name: /^article$/i }),
    ).toBeNull()
  },
})
