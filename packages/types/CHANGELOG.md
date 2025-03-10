# @guild-docs/types

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

## 2.0.0

### Major Changes

- 228b9cf: Use [MDX 2](https://mdxjs.com/blog/v2/) 🎉

  - Requires `Next.js v12`
  - Requires `"@mdx-js/react": "^2.0.0"`
  - Removed support for [remark-admonitions](https://github.com/elviswolcott/remark-admonitions) due to compatibility issues (and it stopped being maintained at April 28th, 2020)

## 1.1.0

### Minor Changes

- 002534a: Allow static object mdx navigation props

## 1.0.3

### Patch Changes

- 24878ed: Use @guild-docs/mdx-remote with esbuild as peer dependency (no need for esbuild resolutions/overrides)

## 1.0.2

### Patch Changes

- 5addeaa: Pin next-mdx-remote to 3.0.6

## 1.0.1

### Patch Changes

- b4feff4: Update next-mdx-remote with latest esbuild version

## 1.0.0

### Minor Changes

- fb55d6a: export LazyPromise util

## 0.2.27

### Patch Changes

- 3fc9b94: improve MDXNavigation wrapperProps

## 0.2.17

### Patch Changes

- 128ec1a: fix override toc & navigation prop types

## 0.2.16

### Patch Changes

- 919abbb: fix single mdx page outside of docs
- 19b4cb5: mdx component client & server side

## 0.2.14

### Patch Changes

- e4c8fba: add isAccordionDefaultOpen callback & minor improvements/fixes

## 0.2.8

### Patch Changes

- 56217ea: optional handleLinkClick

## 0.2.1

### Patch Changes

- a5abb84: allow customize sidebar label
- 9522198: allow customize navigation default open depth
- d2105c5: update build

## 0.1.1

### Patch Changes

- c673f70: allow customize client components & sync packages

## 0.0.6

### Patch Changes

- 072368d: new building process

## 0.0.5

### Patch Changes

- 88a38cd: add bottom navigation
- 610cf39: improve/fix next/head implementation
- 610cf39: update deps

## 0.0.4

### Patch Changes

- 2029057: improve TOC

## 0.0.3

### Patch Changes

- 3663a0a: add TOC
