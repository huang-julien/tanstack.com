import type { Meta, StoryObj } from '@storybook/tanstack-react'
import type { QueryClient } from '@tanstack/react-query'
import { expect, waitFor } from 'storybook/test'
import { Route } from '../routes/blog.$'
import preview from '../../.storybook/preview'

const seedRecentPosts = (qc: QueryClient) => {
  // The blog page right rail mounts `RecentPostsWidget`, which runs its own
  // `useSuspenseQuery(['recentPosts'])`. The route loader override doesn't
  // cover that, so pre-seed the cache here to avoid hitting `fetchRecentPosts`
  // (a server function) from the story sandbox.
  qc.setQueryData(
    ['recentPosts'],
    [
      {
        slug: 'why-tanstack',
        title: 'Why TanStack',
        published: '2026-01-15',
      },
      {
        slug: 'short-post',
        title: 'A Short Post',
        published: '2026-02-01',
      },
    ],
  )
}

// Page story for `/blog/$`. The real loader fetches a markdown post and
// renders it to RSC server-side; here we replace the loader with one that
// returns plain JSX as `contentRsc` so the page renders deterministically.
const meta = preview.meta({
  parameters: {
    queryClient: { seed: seedRecentPosts },
    tanstack: {
      router: {
        route: Route,
        path: '/blog/$',
        params: { _splat: 'why-tanstack' },
        routeOverrides: {
          '/blog/$': {
            loader: async () => ({
              authors: ['tannerlinsley'],
              contentRsc: (
                <>
                  <p>
                    <small>
                      <em>by Tanner Linsley on January 15, 2026.</em>
                    </small>
                  </p>
                  <p>
                    TanStack started as a single library — a tiny hook for
                    caching server state — and has grown into a full suite of
                    type-safe, framework-agnostic tools used by millions of
                    developers. This post is a short retrospective on{' '}
                    <em>why</em> we keep building things this way: open source,
                    headless, and unapologetically composable.
                  </p>
                  <h2 id="introduction">Introduction</h2>
                  <p>
                    Most UI libraries make a decision for you about how the DOM
                    should look. TanStack libraries make a decision about
                    behavior and let you own the markup. The result is fewer
                    abstractions to fight and more code that survives a
                    redesign.
                  </p>
                  <ul>
                    <li>
                      <strong>Headless by default.</strong> Logic and
                      accessibility, not styles.
                    </li>
                    <li>
                      <strong>Type-safe end to end.</strong> From router params
                      to query data.
                    </li>
                    <li>
                      <strong>Framework-agnostic where possible.</strong> React,
                      Solid, Vue, Svelte, Angular.
                    </li>
                  </ul>
                  <h2 id="the-libraries">The Libraries</h2>
                  <p>
                    Each library solves one problem and composes cleanly with
                    the others. Use one, use all, or pull a single hook into an
                    otherwise unrelated stack.
                  </p>
                  <h3 id="query">Query</h3>
                  <p>
                    Async state management for server data: caching, retries,
                    revalidation, optimistic updates, and devtools. The starting
                    point for most TanStack adopters.
                  </p>
                  <h3 id="router">Router</h3>
                  <p>
                    A fully type-safe router with first-class search params,
                    loaders, and nested layouts. Pairs naturally with Query for
                    data-driven routing.
                  </p>
                  <h3 id="table">Table</h3>
                  <p>
                    Headless data grids with sorting, filtering, grouping,
                    pagination, and virtualization. You bring the markup; we
                    bring the behavior.
                  </p>
                  <h2 id="conclusion">Conclusion</h2>
                  <p>
                    The web rewards libraries that get out of your way. We plan
                    to keep doing that — independently, sustainably, and in the
                    open. Thanks for reading, and see you in the issues.
                  </p>
                  <p>
                    <strong>— Tanner</strong>
                  </p>
                </>
              ),
              description:
                'A short retrospective on why TanStack libraries are built the way they are: headless, type-safe, and framework-agnostic.',
              filePath: 'src/blog/why-tanstack.md',
              headings: [
                { id: 'introduction', label: 'Introduction', level: 'h2' },
                { id: 'the-libraries', label: 'The Libraries', level: 'h2' },
                { id: 'query', label: 'Query', level: 'h3' },
                { id: 'router', label: 'Router', level: 'h3' },
                { id: 'table', label: 'Table', level: 'h3' },
                { id: 'conclusion', label: 'Conclusion', level: 'h2' },
              ],
              headerImage: undefined,
              isUnpublished: false,
              published: '2026-01-15',
              title: 'Why TanStack',
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
    // Title comes from the mocked loader's `title` field.
    await waitFor(async () => {
      await expect(
        canvas.getByRole('heading', { name: /why tanstack/i, level: 1 }),
      ).toBeVisible()
    })

    // Markdown body sections — h2 headings are rendered inside the prose
    // container with the ids from the mocked `headings` array.
    await expect(
      canvas.getByRole('heading', { name: /introduction/i, level: 2 }),
    ).toBeVisible()
    await expect(
      canvas.getByRole('heading', { name: /the libraries/i, level: 2 }),
    ).toBeVisible()
    await expect(
      canvas.getByRole('heading', { name: /conclusion/i, level: 2 }),
    ).toBeVisible()
    // h3 subsections from the libraries section
    await expect(
      canvas.getByRole('heading', { name: /^query$/i, level: 3 }),
    ).toBeVisible()

    // Edit-on-GitHub link uses the mocked filePath.
    const editLink = canvas.getByRole('link', { name: /edit on github/i })
    await expect(editLink).toHaveAttribute(
      'href',
      'https://github.com/tanstack/tanstack.com/edit/main/src/blog/why-tanstack.md',
    )
  },
})

// Single-heading post: the TOC is hidden when `headings.length <= 1`, so the
// layout collapses to the narrower max-width branch.
export const NoToc = meta.story({
  parameters: {
    tanstack: {
      router: {
        route: Route,
        path: '/blog/$',
        params: { _splat: 'short-post' },
        routeOverrides: {
          '/blog/$': {
            loader: async () => ({
              authors: ['tannerlinsley'],
              contentRsc: (
                <>
                  <p>
                    <small>
                      <em>by Tanner Linsley on February 1, 2026.</em>
                    </small>
                  </p>
                  <p>
                    A short post with no extra headings — just enough body to
                    exercise the layout branch where the table of contents rail
                    collapses and the prose container takes the narrower
                    max-width.
                  </p>
                  <p>That's it. See you next time.</p>
                </>
              ),
              description:
                'A short post used to exercise the no-TOC layout branch.',
              filePath: 'src/blog/short-post.md',
              headings: [{ id: 'short', label: 'Short', level: 'h2' }],
              headerImage: undefined,
              isUnpublished: false,
              published: '2026-02-01',
              title: 'A Short Post',
            }),
          },
        },
      },
    },
  },
  play: async ({ canvas }) => {
    await waitFor(async () => {
      await expect(
        canvas.getByRole('heading', { name: /a short post/i, level: 1 }),
      ).toBeVisible()
    })
  },
})
