/* eslint-disable @typescript-eslint/no-non-null-assertion, no-else-return */
import sortBy from 'lodash/sortBy.js';
import isString from 'lodash/isString.js';
import isArray from 'lodash/isArray.js';
import flatten from 'lodash/flatten.js';
import map from 'lodash/map.js';
import { readFile } from 'node:fs/promises';
import { existsSync, writeFileSync, readFileSync } from 'node:fs';
import GithubSlugger from 'github-slugger';
import removeMarkdown from 'remove-markdown';
import algoliasearch from 'algoliasearch';
import type { IRoutes } from '@guild-docs/server';
import matter from 'gray-matter';

import type { AlgoliaRecord, AlgoliaSearchItemTOC, AlgoliaRecordSource } from './types';

const extractToC = (content: string) => {
  const slugger = new GithubSlugger();

  const lines = content.split('\n');

  let isCodeBlock = false;
  let currentDepth = 0;
  let currentParent: AlgoliaSearchItemTOC | undefined;

  const slugs = lines.reduce<AlgoliaSearchItemTOC[]>((acum, value) => {
    if (value.match(/^```(.*)/)) {
      if (isCodeBlock) {
        isCodeBlock = false;
      } else {
        isCodeBlock = true;
        return acum;
      }
    } else if (isCodeBlock) {
      return acum;
    }

    const result = value.match(/(##+ )(.+)/);

    if (!result) return acum;

    const depth = result[1]?.length - 3;

    if (depth > 1) {
      return acum;
    }

    const heading = result[2]?.trim();

    const record: AlgoliaSearchItemTOC = {
      children: [],
      title: heading,
      anchor: slugger.slug(heading),
    };

    if (depth > 0) {
      currentParent?.children.push(record);
      if (depth > currentDepth) {
        currentParent = record;
      }
    } else {
      currentParent = record;
      acum.push(record);
    }

    currentDepth = depth;

    return acum;
  }, []);
  return slugs;
};

const contentForRecord = (content: string) => {
  let isCodeBlock = false;
  let isMeta = false;
  return removeMarkdown(
    content
      .split('\n')
      .map(line => {
        if (line.match(/^```(.*)/)) {
          if (isCodeBlock) {
            isCodeBlock = false;
            return null;
          } else {
            isCodeBlock = true;
            return null;
          }
        } else if (isCodeBlock) {
          return null;
        }
        if (line.startsWith('---')) {
          if (isMeta) {
            isMeta = false;
            return null;
          } else {
            isMeta = true;
            return null;
          }
        } else if (isMeta) {
          return null;
        }
        if (line.startsWith('#')) {
          return null;
        }
        return line;
      })
      .filter(line => line !== null)
      .join(' ')
  );
};

async function routesToAlgoliaRecords(
  routes: IRoutes,
  source: AlgoliaRecordSource,
  domain: string,
  objectsPrefix = new GithubSlugger().slug(source)
) {
  const objects: AlgoliaRecord[] = [];

  async function routeToAlgoliaRecords(topPath?: string, parentLevelName?: string, slug?: string, title?: string) {
    if (!slug || !title) {
      return;
    }

    const fileContent = await readFile(topPath ? `./${topPath}/${slug}.mdx` : `./${slug}.mdx`).toString();

    const { data: meta, content } = matter(fileContent);

    const toc = extractToC(content);

    objects.push({
      objectID: `${objectsPrefix}-${slug}`,
      headings: toc.map(t => t.title),
      toc,
      content: contentForRecord(content),
      url: `${domain}/${topPath ? `${topPath}/` : ''}${slug}`,
      domain,
      hierarchy: parentLevelName ? [source, parentLevelName, title] : [source, title],
      source,
      title,
      type: meta.type || 'Documentation',
    });
  }

  await Promise.all(
    map(routes._, async (topRoute, topPath) => {
      if (!topRoute) {
        return Promise.resolve();
      }
      if (isString(topRoute)) {
        console.warn(`ignored ${topRoute}`);
        return Promise.resolve();
      } else if (isArray(topRoute)) {
        console.warn(`ignored ${topRoute}`);
        return Promise.resolve();
      } else {
        if (topRoute.$name && !topRoute.$routes) {
          return await routeToAlgoliaRecords(undefined, undefined, topPath, topRoute.$name);
        } else {
          return await Promise.all(
            map(topRoute.$routes, ([slug, title]) => routeToAlgoliaRecords(topPath, topRoute.$name!, slug, title))
          );
        }
      }
    })
  );

  return objects;
}

async function pluginsToAlgoliaRecords(
  // TODO: fix later
  plugins: any[],
  source: AlgoliaRecordSource,
  domain: string,
  objectsPrefix = new GithubSlugger().slug(source)
): Promise<AlgoliaRecord[]> {
  const objects: AlgoliaRecord[] = [];
  const slugger = new GithubSlugger();

  plugins.forEach((plugin: any) => {
    const toc = extractToC(plugin.readme || '');

    objects.push({
      objectID: slugger.slug(`${objectsPrefix}-${plugin.title}`),
      headings: toc.map(t => t.title),
      toc,
      content: contentForRecord(plugin.readme || ''),
      url: `${domain}/plugins/${plugin.identifier}`,
      domain,
      hierarchy: [source, 'Plugins'],
      source,
      title: plugin.title,
      type: 'Plugin',
    });
  });

  return objects;
}

export type { AlgoliaRecord, AlgoliaSearchItemTOC, AlgoliaRecordSource };

interface IndexToAlgoliaOptions {
  routes?: IRoutes[];
  // TODO: fix later
  plugins?: any[];
  source: AlgoliaRecordSource;
  domain: string;
  lockfilePath: string;
  dryMode?: boolean;
}

export const indexToAlgolia = async ({
  routes: routesArr = [],
  plugins = [],
  source,
  domain,
  // TODO: add `force` flag
  dryMode = true,
  lockfilePath,
}: IndexToAlgoliaOptions) => {
  const objects = [
    ...flatten(await Promise.all(routesArr.map(routes => routesToAlgoliaRecords(routes, source, domain)))),
    ...(await pluginsToAlgoliaRecords(plugins, source, domain)),
  ];

  const recordsAsString = JSON.stringify(sortBy(objects, 'objectID'), (key, value) => (key === 'content' ? '-' : value), 2);

  const lockFileExists = existsSync(lockfilePath);
  const lockfileContent = lockFileExists ? readFileSync(lockfilePath, 'utf-8') : null;

  if (dryMode) {
    console.log(`${lockfilePath} updated!`);
    writeFileSync(lockfilePath, recordsAsString);
  } else {
    if (!lockFileExists || recordsAsString !== lockfileContent) {
      if (['ALGOLIA_APP_ID', 'ALGOLIA_ADMIN_API_KEY', 'ALGOLIA_INDEX_NAME'].some(envVar => !process.env[envVar])) {
        console.error('Some Algolia environment variables are missing!');
        return;
      }
      if (lockFileExists) {
        console.log('changes detected, updating Algolia index!');
      } else {
        console.log('no lockfile detected, push all records');
      }

      const client = algoliasearch(process.env.ALGOLIA_APP_ID!, process.env.ALGOLIA_ADMIN_API_KEY!);
      const index = client.initIndex(process.env.ALGOLIA_INDEX_NAME!);
      index
        .deleteBy({
          filters: `source: "${source}"`,
        })
        .then(() => index.saveObjects(objects))
        .then(({ objectIDs }) => {
          console.log(objectIDs);
        })
        .catch(console.error);

      writeFileSync(lockfilePath, recordsAsString);
    }
  }
};
