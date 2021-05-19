import 'remark-admonitions/styles/infima.css';
import 'prism-themes/themes/prism-atom-dark.css';
import 'tailwindcss/tailwind.css';

import { appWithTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

import dynamic from 'next/dynamic';
import { MdxInternalProps, iterateRoutes, ExtendComponents } from '@guild-docs/client';

import type { AppProps } from 'next/app';

ExtendComponents({
  HelloWorld() {
    return <p>Hello World!</p>;
  },
});

const Header = dynamic<any>(() => import('the-guild-components').then(v => v.Header), {
  ssr: false,
});

const Subheader = dynamic<any>(() => import('the-guild-components').then(v => v.Subheader), {
  ssr: false,
});

const Docs = dynamic(() => import('the-guild-components').then(v => v.Docs), {
  ssr: false,
});

const DocsContent = dynamic(() => import('the-guild-components').then(v => v.DocsContent), {
  ssr: false,
});

const DocsLegend = dynamic<any>(() => import('the-guild-components').then(v => v.DocsLegend), {
  ssr: false,
});

const DocsNavigation = dynamic<any>(() => import('the-guild-components').then(v => v.DocsNavigation), {
  ssr: false,
});

const Footer = dynamic(() => import('the-guild-components').then(v => v.Footer), {
  ssr: false,
});

const GlobalStyles = dynamic(() => import('the-guild-components').then(v => v.GlobalStyles), {
  ssr: false,
});

const serializedMdx = process.env.SERIALIZED_MDX_ROUTES;
let mdxRoutesData = serializedMdx && JSON.parse(serializedMdx);

function App({ Component, pageProps }: AppProps) {
  const router = useRouter() || {};

  const asPath = router.asPath || '_';

  const isDocs = asPath.includes('docs');
  const mdxRoutes: MdxInternalProps['mdxRoutes'] | undefined = pageProps.mdxRoutes;
  const paths = mdxRoutes === 1 ? mdxRoutesData : (mdxRoutesData = mdxRoutes || mdxRoutesData);
  const docsPaths = iterateRoutes(paths).filter(path => path.href === 'docs')[0].paths;

  return (
    <>
      <GlobalStyles />
      <Header accentColor="#1CC8EE" activeLink="/open-source" />
      <Subheader
        {...{
          product: {
            title: 'Docs',
            description: 'Library description',
            image: {
              src: 'https://theguildcomponents.netlify.app/static/media/envelop.51536952.svg',
              alt: 'Docs',
            },
          },
          links: [
            {
              label: 'Home',
              title: 'Visit our Homepage',
              href: '/',
            },
            {
              label: 'API & Doc',
              title: 'Learn more about Envelop',
              href: '/docs',
            },
            {
              label: 'Github',
              title: 'See our Github profile',
              href: 'https://github.com/dotansimha/envelop',
            },
          ],
          cta: {
            label: 'Learn more',
            title: 'Learn more about Docs',
            href: '/docs',
          },
        }}
        activeLink={router.asPath}
      />

      {isDocs ? (
        <Docs>
          <DocsNavigation items={docsPaths} />
          <DocsContent>
            <Component {...pageProps} />
          </DocsContent>
          <DocsLegend
            items={pageProps.toc}
            prev={{
              href: '#',
              name: 'Article 1',
            }}
            current={{
              href: '#',
              name: 'Article 2',
            }}
            next={{
              href: '#',
              name: 'Article 3',
            }}
          />
        </Docs>
      ) : (
        <Component {...pageProps} />
      )}

      <Footer />
    </>
  );
}

export default appWithTranslation(App);
