import Document, { DocumentContext, Head, Html, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)

    return initialProps
  }

  render() {
    return (
      <Html>
        <Head>
        <link rel="shortcut icon" href="/favicon.png"/>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Varela+Round&display=swap" />
        </Head>
        <body>
          <Main />
          <NextScript />
          <div className="z-0 fixed w-[451px] h-[451px] left-[-203px] top-[320px]" style={{background: 'linear-gradient(45deg, #281cdd, #1e2da7 9.09%, hsla(242, 88.4%, 56.3%, 1) 18.18%, #222ca3 27.27%, #17157b 36.36%, hsla(242, 88.4%, 45.3%, 1) 45.45%, #20277b 54.55%, #272597 63.64%, #282685 72.73%, #00cde6 81.82%, #00caf4 90.91%, #0f1a2f)', filter: 'blur(262.016px)'}}></div>
        </body>
      </Html>
    );
  }
}

export default MyDocument;
