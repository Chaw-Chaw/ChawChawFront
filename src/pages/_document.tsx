import Document, {
  Head,
  Main,
  NextScript,
  DocumentContext,
  DocumentInitialProps,
  Html,
} from "next/document";
import React, { ReactElement } from "react";
import { ServerStyleSheet } from "styled-components";

// _document.js는 index.html을 꾸며주는거다라고 생각하면 된다.

export default class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(
              <>
                <App {...props} />
              </>
            ),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }
  render(): ReactElement {
    return (
      <Html lang="kr">
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@200;300;400;600;700;900&display=swap"
            rel="stylesheet"
          />
          <link rel="canonical" href="https://www.chawchaw.vercel.app" />
        </Head>
        <body>
          <div id="root">
            <Main />
            <NextScript />
          </div>
          <div id="notification"></div>
        </body>
      </Html>
    );
  }
}
