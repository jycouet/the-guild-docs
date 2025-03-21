import '../../public/style.css';

import { appWithTranslation } from 'next-i18next';

import { extendTheme, theme as chakraTheme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';
import { ExtendComponents, handlePushRoute, CombinedThemeProvider, DocsPage, AppSeoProps } from '@guild-docs/client';
import { Header, Subheader, Footer } from '@theguild/components';

import type { AppProps } from 'next/app';

ExtendComponents({
  HelloWorld() {
    return <p>Hello World!</p>;
  },
});

const styles: typeof chakraTheme['styles'] = {
  global: props => {
    const bg = mode('white', 'gray.850')(props);

    return {
      body: {
        bg,
      },
    };
  },
};

const accentColor = '#1CC8EE';

const theme = extendTheme({
  colors: {
    gray: {
      50: '#fafafa',
      100: '#f5f5f5',
      200: '#e5e5e5',
      300: '#d4d4d4',
      400: '#a3a3a3',
      500: '#737373',
      600: '#525252',
      700: '#404040',
      800: '#262626',
      850: '#1b1b1b',
      900: '#171717',
    },
    accentColor,
  },
  fonts: {
    heading: 'Inter, sans-serif',
    body: 'Inter, sans-serif',
    code: 'Menlo, monospace',
  },
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
  styles,
});

const serializedMdx = process.env.SERIALIZED_MDX_ROUTES;
const mdxRoutes = { data: serializedMdx && JSON.parse(serializedMdx) };

function AppContent(appProps: AppProps) {
  const { Component, pageProps, router } = appProps;
  const isDocs = router.asPath.startsWith('/docs');

  return (
    <>
      <Header accentColor={accentColor} activeLink="/open-source" themeSwitch />
      <Subheader
        activeLink={router.asPath}
        product={{
          title: 'Docs',
          description: 'Lorem ipsum dolor sit amet',
          image: {
            src: '/assets/subheader-logo.svg',
            alt: 'Docs',
          },
          onClick: e => handlePushRoute('/', e),
        }}
        links={[
          {
            children: 'Home',
            title: 'Read about Guild Docs',
            href: '/',
            onClick: e => handlePushRoute('/', e),
          },
          {
            children: 'Docs',
            title: 'View examples',
            href: '/docs',
            onClick: e => handlePushRoute('/docs', e),
          },
        ]}
        cta={{
          children: 'Get Started',
          title: 'Start using The Guild Docs',
          href: '/',
          onClick: e => handlePushRoute('/docs', e),
          target: '_blank',
          rel: 'noopener noreferrer',
        }}
      />
      {isDocs ? (
        <DocsPage
          appProps={appProps}
          accentColor={accentColor}
          mdxRoutes={mdxRoutes}
          mdxNavigationProps={{
            summaryLabelProps: {
              textTransform: 'capitalize',
            },
          }}
        />
      ) : (
        <Component {...pageProps} />
      )}
      <Footer />
    </>
  );
}

const AppContentWrapper = appWithTranslation(function TranslatedApp(appProps) {
  return <AppContent {...appProps} />;
});

const defaultSeo: AppSeoProps = {
  title: 'Guild Docs',
  description: 'Guild Docs Example',
  logo: {
    url: 'https://the-guild-docs.vercel.app/assets/subheader-logo.png',
    width: 50,
    height: 54,
  },
};

export default function App(appProps: AppProps) {
  return (
    <CombinedThemeProvider theme={theme} accentColor={accentColor} defaultSeo={defaultSeo}>
      <AppContentWrapper {...appProps} />
    </CombinedThemeProvider>
  );
}
