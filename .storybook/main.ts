import { defineMain } from '@storybook/tanstack-react/node'
import type { Plugin, UserConfig } from 'vite'

export default defineMain({
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@chromatic-com/storybook',
    '@storybook/addon-vitest',
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
    '@storybook/addon-onboarding',
    '@storybook/addon-mcp',
  ],
  framework: '@storybook/tanstack-react',
  async viteFinal(config: UserConfig) {
    // Exclude Node-only bare packages from Vite's dep optimizer (esbuild).
    // sb.mock() handles the source-level stub for ~/db/client in preview.ts,
    // but esbuild's scanner may still discover these packages transitively
    // before any mock can intercept — excluding them prevents that.
    config.optimizeDeps ??= {}
    config.optimizeDeps.exclude ??= []
    config.optimizeDeps.exclude.push(
      '@tanstack/start-storage-context',
      'postgres',
      'drizzle-orm',
      // Exclude server-function modules so Vite serves them as individual ESM
      // files (not pre-bundled chunks). This lets the sb.mock() plugin in
      // preview.ts intercept the imports and return the factory mocks instead
      // of the original modules (which pull in Node.js-only deps).
      '/src/utils/blog.functions.ts',
      '/src/utils/stats-queries.functions.ts',
      '/src/utils/sponsors.functions.ts',
    )
    // Force Vite to pre-bundle CJS packages that don't have named ESM exports
    config.optimizeDeps.include ??= []
    config.optimizeDeps.include.push(
      'use-sync-external-store/shim/with-selector',
    )
    // Stub the virtual modules produced by inline `'use server'` functions and
    // the @tanstack/react-start RSC machinery. There are two variants:
    //   - virtual:tanstack-rsc-ssr-decode  (server path, Node.js streams)
    //   - virtual:tanstack-rsc-browser-decode  (client path, browser streams)
    // @storybook/tanstack-react handles createServerFn from *.functions.ts files,
    // but the RSC decode helpers aren't provided in Storybook's Vite context.
    // Provide no-op stubs so the bundle resolves without errors.
    //
    // Also stub stats.server.ts: the @storybook/addon-vitest mock transform
    // converts TypeScript `export type { ... }` re-exports into static value
    // imports BEFORE type-erasure runs. This causes ESM link-time errors
    // because `stats.server.ts` only has type-only exports for types like
    // `StatsQueryParams`. Intercepting the file here lets us supply the
    // expected named exports as runtime values so the link check passes.
    config.plugins ??= []
    ;(config.plugins as Plugin[]).push({
      name: 'stub-tanstack-rsc-decode',
      resolveId(id) {
        if (
          id === 'virtual:tanstack-rsc-ssr-decode' ||
          id === 'virtual:tanstack-rsc-browser-decode'
        )
          return `\0${id}`
      },
      load(id) {
        if (
          id === '\0virtual:tanstack-rsc-ssr-decode' ||
          id === '\0virtual:tanstack-rsc-browser-decode'
        )
          return `export async function createFromReadableStream() { return {} }`

        // Provide a browser-safe stub for the server-only stats module.
        // All type re-exports are materialised as undefined values so the
        // auto-spy mock transform can import them without throwing a
        // "does not provide an export named" SyntaxError at link time.
        if (id.endsWith('/src/utils/stats.server.ts')) {
          return `
            export const StatsQueryParams = undefined
            export const Library = undefined
            export const GitHubStats = undefined
            export const NpmPackageStats = undefined
            export const NpmStats = undefined
            export const OSSStats = undefined
            export const OSSStatsWithDelta = undefined
            export const fetchGitHubOwnerStats = () => Promise.resolve(null)
            export const fetchGitHubRepoStats = () => Promise.resolve(null)
            export const refreshNpmOrgStats = () => Promise.resolve(null)
            export const fetchSingleNpmPackageFresh = () => Promise.resolve(null)
            export const computeNpmOrgStats = () => Promise.resolve(null)
            export const getOSSStats = () => Promise.resolve(null)
            export const fetchNpmDownloadsBulk = () => Promise.resolve(null)
            export const fetchRecentDownloadStats = () => Promise.resolve(null)
          `
        }

        // auth.functions.ts imports from ~/auth/index.server which loads the
        // entire auth stack (session, oauth, repositories) and ultimately
        // db/client.ts → postgres → Buffer (Node.js-only). Stub it here so
        // useCurrentUser → useApplicationBuilder → ApplicationStarter renders
        // without a server-side module chain loading in the browser.
        if (id.endsWith('/src/utils/auth.functions.ts')) {
          return `
            export const getCurrentUser = () => Promise.resolve(null)
            export const requireAuth = () => Promise.resolve(null)
            export const requireCapability = () => Promise.resolve(null)
            export async function loadUser() { return null }
            export async function requireAuthUser() { return null }
            export async function requireCapabilityUser() { return null }
            export const ADMIN_CAPABILITIES = []
            export const requireAnyAdminCapability = () => Promise.resolve(null)
          `
        }

        // users.functions.ts imports from ~/utils/users.server which imports
        // db/client.ts → postgres → Buffer (same Node.js-only chain).
        // Stub it so FrameworkSelect renders without the server chain.
        if (id.endsWith('/src/utils/users.functions.ts')) {
          return `
            export const listUsers = () => Promise.resolve([])
            export const getUser = () => Promise.resolve(null)
            export const updateAdPreference = () => Promise.resolve(null)
            export const updateLastUsedFramework = () => Promise.resolve(null)
            export const updateUserCapabilities = () => Promise.resolve(null)
            export const adminSetAdsDisabled = () => Promise.resolve(null)
            export const bulkUpdateUserCapabilities = () => Promise.resolve(null)
            export const setInterestedInHidingAds = () => Promise.resolve(null)
            export const revertProfileImage = () => Promise.resolve(null)
            export const removeProfileImage = () => Promise.resolve(null)
          `
        }
      },
    })
    return config
  },
})
