import { config } from './cliConfig';
import { writeFileFormatIfNotExists } from './writeFormat';

export async function writeNextConfig() {
  await writeFileFormatIfNotExists(
    [config.cwd, 'next.config.js'],
    `
  const { register } = require('esbuild-register/dist/node');

  register({
    extensions: ['.ts', '.tsx'],
  });
  
  const { i18n } = require('./next-i18next.config');
  
  const { withGuildDocs } = require('@guild-docs/server');
  
  const { getRoutes } = require('./routes.ts');
  
  module.exports = withGuildDocs({
    i18n,
    getRoutes,
  });      
`,
    'typescript'
  );
}

export async function writei18Config() {
  await writeFileFormatIfNotExists(
    [config.cwd, 'next-i18next.config.js'],
    `
  module.exports = {
      i18n: {
        defaultLocale: "en",
        locales: ["en"],
      },
    };
  `,
    'typescript'
  );
}

export async function writeRoutes() {
  await writeFileFormatIfNotExists(
    [config.cwd, 'routes.ts'],
    `
    import { IRoutes, GenerateRoutes } from '@guild-docs/server';

    export function getRoutes(): IRoutes {
      const Routes: IRoutes = {
        _: {
          index: {
            $name: 'Home',
            $routes: [['index', 'Home Page']],
          },
        },
      };
      GenerateRoutes({
        Routes,
        folderPattern: 'docs',
        basePath: 'docs',
        basePathLabel: 'Documentation',
        labels: {
          index: 'Docs',
        },
      });

      return Routes;
    }

    `,

    'typescript'
  );
}

export async function writeTranslations() {
  await writeFileFormatIfNotExists(
    [config.cwd, 'public/locales/en/common.json'],
    `
  {
    "greeting": "Hello!"
  }
  
  `,
    'json'
  );
}

export async function writeApp() {
  await writeFileFormatIfNotExists(
    [config.cwd, 'src/pages/_app.tsx'],
    `
    import 'remark-admonitions/styles/infima.css';
    import 'prism-themes/themes/prism-atom-dark.css';
    import 'tailwindcss/tailwind.css';
    
    import { appWithTranslation } from 'next-i18next';
    import { ReactNode, useMemo } from 'react';
    
    import { Box, ChakraProvider, extendTheme, Stack, chakra } from '@chakra-ui/react';
    
    import { NextNProgress, MdxInternalProps, MDXNavigation, iterateRoutes, ExtendComponents } from '@guild-docs/client';
    
    import type { AppProps } from 'next/app';
    
    const theme = extendTheme({
      colors: {},
    });

    const a = chakra('a', {
      baseStyle: {
        fontWeight: 'bold',
        color: 'blue.600',
      },
    });
    
    ExtendComponents({
      HelloWorld() {
        return <p>Hello World!</p>;
      },
      a
    });
    
    export function AppThemeProvider({ children }: { children: ReactNode }) {
      return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
    }
    
    const serializedMdx = process.env.SERIALIZED_MDX_ROUTES;
    let mdxRoutesData = serializedMdx && JSON.parse(serializedMdx);
    
    function App({ Component, pageProps }: AppProps) {
      const mdxRoutes: MdxInternalProps['mdxRoutes'] | undefined = pageProps.mdxRoutes;
      const Navigation = useMemo(() => {
        const paths = mdxRoutes === 1 ? mdxRoutesData : (mdxRoutesData = mdxRoutes || mdxRoutesData);
    
        return <MDXNavigation paths={iterateRoutes(paths)} />;
      }, [mdxRoutes]);
      return (
        <>
          <NextNProgress />
          <AppThemeProvider>
            <Stack isInline>
              <Box maxW="280px" width="100%">
                {Navigation}
              </Box>
              <Component {...pageProps} />
            </Stack>
          </AppThemeProvider>
        </>
      );
    }
    
    export default appWithTranslation(App);
        `,
    'typescript'
  );
}

export async function writeDocPages() {
  const w1 = writeFileFormatIfNotExists(
    [config.cwd, 'src/pages/docs/[[...slug]].tsx'],
    `
    import { Box, Stack } from '@chakra-ui/react';
    import { MDXPage } from '@guild-docs/client';
    import { MDXPaths, MDXProps } from '@guild-docs/server';
    
    import { getRoutes } from '../../../routes';
    
    import type { GetStaticPaths, GetStaticProps } from 'next';
    
    export default MDXPage(function PostPage({ content, TOC }) {
      return (
        <Stack>
          <Box as="main" maxWidth="80ch" textAlign="justify">
            {content}
          </Box>
          <TOC
            boxProps={{
              paddingRight: '2em',
              position: 'fixed',
              top: 0,
              right: 0,
              fontSize: '2xl',
            }}
          />
        </Stack>
      );
    });
    
    export const getStaticProps: GetStaticProps = ctx => {
      return MDXProps(
        ({ readMarkdownFile, getArrayParam }) => {
          return readMarkdownFile('docs/', getArrayParam('slug'));
        },
        ctx,
        {
          getRoutes,
        }
      );
    };
    
    export const getStaticPaths: GetStaticPaths = ctx => {
      return MDXPaths('docs', { ctx });
    };
      `,
    'typescript'
  );

  const w2 = writeFileFormatIfNotExists(
    [config.cwd, 'src/pages/index.tsx'],
    `
  export default function Index() {
    return <p>Welcome!</p>;
  }
  
  `,
    'typescript'
  );

  await Promise.all([w1, w2]);
}

export async function writeDocsDirectory() {
  await writeFileFormatIfNotExists(
    [config.cwd, 'docs/index.mdx'],
    `
# Index Docs Page

<Translated>greeting</Translated> This is the Index of the Documentation Page!

<HelloWorld />

## Heading 2

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nascetur ridiculus mus mauris vitae ultricies leo integer. Duis at consectetur lorem donec massa sapien. Ipsum dolor sit amet consectetur adipiscing. Habitasse platea dictumst vestibulum rhoncus est pellentesque. Est pellentesque elit ullamcorper dignissim cras tincidunt. Gravida dictum fusce ut placerat orci nulla. Augue lacus viverra vitae congue eu. Risus quis varius quam quisque id diam vel. Imperdiet massa tincidunt nunc pulvinar. Amet tellus cras adipiscing enim eu turpis. Velit scelerisque in dictum non consectetur. In fermentum posuere urna nec.

### Heading 3

Lobortis mattis aliquam faucibus purus. Aliquam eleifend mi in nulla posuere sollicitudin aliquam ultrices. In tellus integer feugiat scelerisque varius morbi enim. In ante metus dictum at tempor. Nunc faucibus a pellentesque sit amet porttitor eget dolor. Eu turpis egestas pretium aenean pharetra magna ac placerat vestibulum. Porttitor rhoncus dolor purus non enim praesent elementum facilisis leo. Lectus vestibulum mattis ullamcorper velit sed ullamcorper. Enim praesent elementum facilisis leo vel fringilla est ullamcorper eget. Suspendisse potenti nullam ac tortor vitae purus faucibus ornare. In dictum non consectetur a erat. Faucibus interdum posuere lorem ipsum dolor. Morbi tristique senectus et netus et malesuada fames ac.

#### Heading 4

Volutpat ac tincidunt vitae semper quis lectus. Risus viverra adipiscing at in. Et malesuada fames ac turpis egestas integer eget aliquet. Sed nisi lacus sed viverra tellus in hac habitasse platea. In iaculis nunc sed augue. Ornare massa eget egestas purus viverra accumsan in. Eu mi bibendum neque egestas congue quisque egestas diam. Placerat orci nulla pellentesque dignissim enim. Augue interdum velit euismod in pellentesque. Lobortis elementum nibh tellus molestie nunc non blandit massa enim. Pellentesque elit ullamcorper dignissim cras tincidunt lobortis. Non blandit massa enim nec. Placerat in egestas erat imperdiet. Nisl pretium fusce id velit ut. Urna molestie at elementum eu facilisis sed odio. Maecenas volutpat blandit aliquam etiam erat velit scelerisque. Curabitur vitae nunc sed velit dignissim sodales ut. A cras semper auctor neque vitae tempus quam. Diam volutpat commodo sed egestas egestas. Tempus iaculis urna id volutpat.

## New Item

Senectus et netus et malesuada fames. Ultrices mi tempus imperdiet nulla malesuada pellentesque elit eget. Lacus luctus accumsan tortor posuere ac ut consequat. Velit laoreet id donec ultrices. Pellentesque habitant morbi tristique senectus et netus et malesuada fames. Interdum velit euismod in pellentesque. Mauris in aliquam sem fringilla ut morbi tincidunt. Aliquet nec ullamcorper sit amet risus nullam eget felis. Vel elit scelerisque mauris pellentesque pulvinar pellentesque habitant morbi tristique. Dui nunc mattis enim ut tellus. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Mauris nunc congue nisi vitae suscipit tellus. Duis convallis convallis tellus id. Ultricies integer quis auctor elit sed. Vitae congue mauris rhoncus aenean vel elit scelerisque mauris pellentesque. Faucibus a pellentesque sit amet porttitor eget dolor morbi. Et malesuada fames ac turpis egestas sed tempus. Ut sem nulla pharetra diam sit. Ultricies integer quis auctor elit sed.

Dolor sit amet consectetur adipiscing elit ut aliquam. Venenatis tellus in metus vulputate eu scelerisque felis imperdiet proin. Iaculis eu non diam phasellus. In dictum non consectetur a erat nam. Est placerat in egestas erat imperdiet sed euismod nisi. Erat imperdiet sed euismod nisi porta lorem mollis. Urna et pharetra pharetra massa massa ultricies mi quis. Pulvinar neque laoreet suspendisse interdum consectetur libero id faucibus nisl. Pellentesque elit ullamcorper dignissim cras. Pellentesque elit eget gravida cum. Dictumst quisque sagittis purus sit amet volutpat consequat. Justo laoreet sit amet cursus sit amet dictum sit. Nibh mauris cursus mattis molestie a iaculis at erat. Malesuada pellentesque elit eget gravida cum sociis. Nunc scelerisque viverra mauris in. Diam quam nulla porttitor massa id neque aliquam vestibulum. At auctor urna nunc id cursus metus aliquam eleifend mi.
      `,
    'mdx'
  );
}

export async function writeTSConfig() {
  await writeFileFormatIfNotExists(
    [config.cwd, 'tsconfig.json'],
    `
{
  "compilerOptions": {
    "target": "es2019",
    "module": "commonjs",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "noEmit": true,
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve"
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}
      `,
    'json'
  );
}

export async function writeTailwindConfig() {
  await Promise.all([
    writeFileFormatIfNotExists(
      [config.cwd, 'postcss.config.js'],
      `
    // If you want to use other PostCSS plugins, see the following:
// https://tailwindcss.com/docs/using-with-preprocessors
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}

    `,
      'typescript'
    ),
    writeFileFormatIfNotExists(
      [config.cwd, 'tailwind.config.js'],
      `
    module.exports = {
      mode: 'jit',
      purge: ['./src/**/*.{js,ts,jsx,tsx}'],
      darkMode: false, // or 'media' or 'class'
      theme: {
        extend: {},
      },
      variants: {
        extend: {},
      },
      plugins: [],
    };
    
    `,
      'typescript'
    ),
  ]);
}
