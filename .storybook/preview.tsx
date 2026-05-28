import * as React from 'react'
import { definePreview } from '@storybook/tanstack-react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from '../src/components/ThemeProvider'
import { ToastProvider } from '../src/components/ToastProvider'
import { SearchProvider } from '../src/contexts/SearchContext'
import '../src/styles/app.css'

// A fresh QueryClient per story keeps cached data from leaking between stories
// and matches the per-request client the real app constructs in `getRouter`.
const makeQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: { staleTime: 1000 * 60 * 5, retry: false },
    },
  })

export default definePreview({
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo',
    },
  },
  async beforeEach() {
    // The app's head script normally sets these classes from localStorage.
    // Seed both so ThemeProvider initialises consistently in the story sandbox.
    localStorage.setItem('theme', 'light')
    const root = document.documentElement
    root.classList.remove('dark', 'auto')
    root.classList.add('light')
  },
  decorators: [
    (Story, context) => {
      const [queryClient] = React.useState(() => {
        const qc = makeQueryClient()
        // Stories can pre-seed the cache via `parameters.queryClient.seed`,
        // e.g. for `useSuspenseQuery` calls that would otherwise suspend
        // forever or call a server function in the story sandbox.
        const seed = context.parameters?.queryClient?.seed as
          | ((client: QueryClient) => void)
          | undefined
        seed?.(qc)
        return qc
      })
      return (
        <QueryClientProvider client={queryClient}>
          <ThemeProvider>
            <ToastProvider>
              <SearchProvider>
                <Story />
              </SearchProvider>
            </ToastProvider>
          </ThemeProvider>
        </QueryClientProvider>
      )
    },
  ],
})
