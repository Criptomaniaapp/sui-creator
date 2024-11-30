import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
        <meta
          httpEquiv="Content-Security-Policy"
          content="
            default-src 'self';
            script-src 'self' 'unsafe-eval' 'unsafe-inline';
            style-src 'self' 'unsafe-inline';
            img-src 'self' data: https:;
            connect-src 'self' https://fullnode.mainnet.sui.io/ https://api.coingecko.com/;
            frame-src 'self';"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

