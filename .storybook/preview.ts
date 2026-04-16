import addonDocs from "@storybook/addon-docs";
import addonA11y from "@storybook/addon-a11y";
import { definePreview } from '@storybook/tanstack-react';
import { sb, fn } from 'storybook/test';
import '../src/styles/app.css';

// Mock server-only module that @storybook/tanstack-react doesn't handle yet.
// createServerFn is mocked by the integration, but getRequest (used inside
// server function handlers) is still statically imported and fails in browser.
sb.mock(import('@tanstack/react-start/server'), { spy: true });

// Mock server-function modules using factory functions so the original modules
// are never loaded. Loading them would transitively pull in Node.js-only
// dependencies (postgres, GitHub API, crypto, Buffer, etc.) that crash in browser.
// Individual stories override return values via beforeEach on the imported fn mocks.
sb.mock(import('../src/utils/blog.functions.ts'), async () => ({
  fetchBlogPost: fn().mockResolvedValue(null),
  fetchRecentPosts: fn().mockResolvedValue([]),
}));
sb.mock(import('../src/utils/stats-queries.functions.ts'), async () => ({
  getOSSStats: fn().mockResolvedValue({
    github: { starCount: 42_000, contributorCount: 520 },
    npm: { totalDownloads: 2_100_000_000, ratePerDay: 120_000 },
  }),
  fetchNpmDownloadsBulk: fn().mockResolvedValue(null),
  fetchRecentDownloadStats: fn().mockResolvedValue(null),
}));
sb.mock(import('../src/utils/sponsors.functions.ts'), async () => ({
  getSponsorsForSponsorPack: fn().mockResolvedValue([]),
}));

const preview = definePreview({
  tags: ['autodocs'],
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
      test: 'todo'
    }
  },

  addons: [addonA11y(), addonDocs()]
})

export default preview;