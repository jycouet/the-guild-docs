# @guild-docs/client

## 3.0.2

### Patch Changes

- c82e243: fix this weird thing that does not cause any runtime errors within the example app in this repo but breaks graphql-yoga.

  **Original error**

  ```
  Unhandled Runtime Error
  Error: Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: object.

  Check the render method of `Giscus`.
  ```

## 3.0.1

### Patch Changes

- ed86c4f: fix this weird thing that does not cause any runtime errors within the example app in this repo but breaks graphql-yoga.

  **Original error**

  ```
  Unhandled Runtime Error
  Error: Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: object.

  Check the render method of `Pagination`.
  ```

## 3.0.0

### Major Changes

- abd721f: move pagination to the end of the content instead of to the toc

### Minor Changes

- 8b6aef2: Edit on GitHub

  Now it's possible to add an "edit this page on GitHub" button.

  ```tsx
  import Head from 'next/head';
  import type { GetStaticPaths, GetStaticProps } from 'next';
  import { DocsContent, DocsTOC, MDXPage, EditOnGitHubButton } from '@guild-docs/client';
  import { MDXPaths, MDXProps } from '@guild-docs/server';
  import { getRoutes } from '../../../routes';

  export default MDXPage(function PostPage({ content, TOC, MetaHead, BottomNavigation, sourceFilePath }) {
    return (
      <>
        <Head>{MetaHead}</Head>
        <DocsContent>{content}</DocsContent>
        <DocsTOC>
          <TOC />
          <BottomNavigation />
          <EditOnGitHubButton
            repo="the-guild-org/the-guild-docs"
            baseDir="examples/basic"
            branch="main"
            sourceFilePath={sourceFilePath}
          />
        </DocsTOC>
      </>
    );
  });
  ```

### Patch Changes

- Updated dependencies [8b6aef2]
- Updated dependencies [abd721f]
  - @guild-docs/types@3.0.0
  - @guild-docs/mdx-remote@2.0.2

## 2.1.1

### Patch Changes

- 21c6d38: Stick to old mermaid

## 2.1.0

### Minor Changes

- c999a12: Introduce useGoogleAnalytics hook

## 2.0.2

### Patch Changes

- 0df56e5: fix(esm): fix `mermaid` version and prevent further renovate auto updates

## 2.0.1

### Patch Changes

- bfe8a83: Lazy load an image in NPMBadge component

## 2.0.0

### Major Changes

- 228b9cf: Use [MDX 2](https://mdxjs.com/blog/v2/) 🎉

  - Requires `Next.js v12`
  - Requires `"@mdx-js/react": "^2.0.0"`
  - Removed support for [remark-admonitions](https://github.com/elviswolcott/remark-admonitions) due to compatibility issues (and it stopped being maintained at April 28th, 2020)

### Minor Changes

- 228b9cf: feat(client): add support for `mermaid-js`

### Patch Changes

- 228b9cf: Set react-use as peer dependency
- 29ff1da: Update zustand
- Updated dependencies [228b9cf]
  - @guild-docs/mdx-remote@2.0.0
  - @guild-docs/types@2.0.0

## 1.4.0

### Minor Changes

- a5804b8: New ["giscus"](https://github.com/giscus/giscus) integration, a comments system powered by GitHub Discussions.

  ```tsx
  import Head from 'next/head';

  import { DocsContent, DocsTOC, MDXPage } from '@guild-docs/client';
  import { MDXPaths, MDXProps } from '@guild-docs/server';

  import { getRoutes } from '../../../routes';

  import type { GetStaticPaths, GetStaticProps } from 'next';

  export default MDXPage(
    function PostPage({ content, TOC, MetaHead, BottomNavigation }) {
      return (
        <>
          <Head>{MetaHead}</Head>
          <DocsContent>{content}</DocsContent>
          <DocsTOC>
            <TOC />
            <BottomNavigation />
          </DocsTOC>
        </>
      );
    },
    {
      giscus: {
        repo: '[ENTER_REPO_HERE]',
        repoId: '[ENTER REPO ID HERE]',
        category: '[ENTER CATEGORY NAME HERE]',
        categoryId: '[ENTER CATEGORY ID HERE]',
      },
    }
  );
  ```

  The configuration of Giscus has to be made following the https://giscus.app instructions:

  ![Giscus Configuration](https://i.imgur.com/TA0AbKd.png)!

## 1.3.4

### Patch Changes

- 05d93fb: Improve `PackageInstall`

  closes #400

## 1.3.3

### Patch Changes

- 6d89612: Lint fixes
- Updated dependencies [6d89612]
  - @guild-docs/mdx-remote@1.0.2

## 1.3.2

### Patch Changes

- 8015bda: Add "global" prop to "PackageInstall" component

  closes #395

## 1.3.1

### Patch Changes

- 212aab1: fix: remove underline on links when hover
- 7c8dea0: fix scroll on navbar and toc

## 1.3.0

### Minor Changes

- 002534a: Allow static object mdx navigation props
- 3a56509: Remove default "text-transform: capitalize" in mdx navigation

  closes #375

### Patch Changes

- 421d733: link color should be as `accentColor`
- Updated dependencies [002534a]
  - @guild-docs/types@1.1.0

## 1.2.3

### Patch Changes

- b5f02f6: Update next-i18next peer dependency version
- 8f0e267: Flexible peer dependencies

## 1.2.2

### Patch Changes

- 7f1d974: Improve released package
- Updated dependencies [a72fdb4]
  - @guild-docs/mdx-remote@1.0.1

## 1.2.1

### Patch Changes

- f39795a: Don't ship ESM until ChakraUI fixes ESM, see https://github.com/chakra-ui/chakra-ui/issues/4937

## 1.2.0

### Minor Changes

- 3115500: Update Next.js peer dependency to v12

## 1.1.3

### Patch Changes

- f3ab2a8: Stick footer to end of page

## 1.1.2

### Patch Changes

- 24878ed: Use @guild-docs/mdx-remote with esbuild as peer dependency (no need for esbuild resolutions/overrides)
- Updated dependencies [24878ed]
  - @guild-docs/types@1.0.3
  - @guild-docs/mdx-remote@1.0.0

## 1.1.1

### Patch Changes

- 5addeaa: Pin next-mdx-remote to 3.0.6
- Updated dependencies [5addeaa]
  - @guild-docs/types@1.0.2

## 1.1.0

### Minor Changes

- 86cdaee: Clean markdown from TOC & Navigation

### Patch Changes

- b4feff4: Update next-mdx-remote with latest esbuild version
- Updated dependencies [b4feff4]
  - @guild-docs/types@1.0.1

## 1.0.7

### Patch Changes

- 71504e6: pin react-icons to 4.2.0

## 1.0.6

### Patch Changes

- 80ef62e: update next-seo
- f9af428: Create new `"hamburgerSide"` prop for `DocsPage` component & now by default mobile hamburger is at the left side

## 1.0.5

### Patch Changes

- f5fc62c: fix: make badge height consistent

## 1.0.4

### Patch Changes

- aafdd8d: use vanilla img for npm badge

## 1.0.3

### Patch Changes

- 42f9c3b: improve default "blockquote" mdx component

## 1.0.2

### Patch Changes

- cf376eb: auto-include TGCFont fontFamily

## 1.0.0

### Major Changes

- ff7a170: change code highlight from prism to shiki

### Patch Changes

- Updated dependencies [fb55d6a]
  - @guild-docs/types@1.0.0

## 0.2.28

### Patch Changes

- cc233e9: fix explicit link inside heading

## 0.2.27

### Patch Changes

- 3fc9b94: improve MDXNavigation wrapperProps
- Updated dependencies [3fc9b94]
  - @guild-docs/types@0.2.27

## 0.2.26

### Patch Changes

- ce4df6d: add "PackageRun" component

## 0.2.24

### Patch Changes

- 113ddd7: fix heading direct link ssr inline css

## 0.2.23

### Patch Changes

- 39ab56d: update deps
- f6b3879: fix docs 404

## 0.2.20

### Patch Changes

- 73bac83: update @theguild/components
- 4491fcb: export original mdx components

## 0.2.19

### Patch Changes

- 127312f: add "NPMBadge" component

## 0.2.18

### Patch Changes

- 900274e: re-export PackageInstall
- d4aa434: re-export CopyToClipboard
- a00a969: add RemoteGHMarkdown component

## 0.2.17

### Patch Changes

- 128ec1a: fix override toc & navigation prop types
- Updated dependencies [128ec1a]
  - @guild-docs/types@0.2.17

## 0.2.16

### Patch Changes

- 20199cd: guild-components include fonts by default
- 19b4cb5: mdx component client & server side
- Updated dependencies [919abbb]
- Updated dependencies [19b4cb5]
  - @guild-docs/types@0.2.16

## 0.2.15

### Patch Changes

- 9d8ef05: Fixed ToC links overflow

## 0.2.14

### Patch Changes

- e4c8fba: add isAccordionDefaultOpen callback & minor improvements/fixes
- e4c8fba: default style improvements & fix defaultOpenDepth
- Updated dependencies [e4c8fba]
  - @guild-docs/types@0.2.14

## 0.2.13

### Patch Changes

- da82066: fix headings spacings
- a41c026: improve mdx components
- d95cf9e: fix DocsPageProps

## 0.2.12

### Patch Changes

- 6ee94b2: check first if defaultSeo is specified

## 0.2.11

### Patch Changes

- fc7d409: enforce default SEO & improve docs meta tags
- 45b7a70: add next-seo
- 45c4bc9: add "PackageInstall" component
- 24605ad: allow reference to sub-category in routes to specify sub-category location in navigation

## 0.2.10

### Patch Changes

- 9313299: improve static mdx routes data logic

## 0.2.9

### Patch Changes

- bc4569a: add "Tooltip" in default mdx components

## 0.2.8

### Patch Changes

- c60daab: fix & re-export tgc wrappers
- d2af805: @theguild/components wrappers
- 56217ea: optional handleLinkClick
- Updated dependencies [56217ea]
  - @guild-docs/types@0.2.8

## 0.2.6

### Patch Changes

- b660e5e: improve markdown heading & re-export all components

## 0.2.5

### Patch Changes

- c4e42ee: improve mdx heading component
- 0666200: fix missing bottom navigation name

## 0.2.4

### Patch Changes

- 82fdb29: add direct link to heading anchors

## 0.2.3

### Patch Changes

- 2f2b31a: fix navigation collapse logic

## 0.2.1

### Patch Changes

- a5abb84: allow customize sidebar label
- 9522198: allow customize navigation default open depth
- a191976: allow README as index
- d2105c5: update build
- Updated dependencies [a5abb84]
- Updated dependencies [9522198]
- Updated dependencies [d2105c5]
  - @guild-docs/types@0.2.1

## 0.2.0

### Minor Changes

- 3457086: Dark theme integration

## 0.1.1

### Patch Changes

- c673f70: allow customize client components & sync packages
- Updated dependencies [c673f70]
  - @guild-docs/types@0.1.1

## 0.1.0

### Minor Changes

- 0dd6580: Made the Docs navigation available on mobile

## 0.0.12

### Patch Changes

- 1a49b89: fix default lists & extend component types
- e317e09: add renderTitle option to MDXPage
- 201a589: fix empty title
- 072368d: new building process
- Updated dependencies [072368d]
  - @guild-docs/types@0.0.6

## 0.0.11

### Patch Changes

- b8ba4d6: optimize main navigation component
- 3803d70: add docs components

## 0.0.10

### Patch Changes

- 4513fae: highlight current active route
- 88a38cd: add bottom navigation
- 610cf39: improve/fix next/head implementation
- 610cf39: update deps
- Updated dependencies [88a38cd]
- Updated dependencies [610cf39]
- Updated dependencies [610cf39]
  - @guild-docs/types@0.0.5

## 0.0.9

### Patch Changes

- cb5d020: improve TOC logic

## 0.0.8

### Patch Changes

- 2029057: improve TOC
- Updated dependencies [2029057]
  - @guild-docs/types@0.0.4

## 0.0.7

### Patch Changes

- 3663a0a: add TOC
- Updated dependencies [3663a0a]
  - @guild-docs/types@0.0.3
