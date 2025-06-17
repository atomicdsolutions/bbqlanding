import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          {/* Preconnect to Google Fonts */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          
          {/* Load fonts */}
          <link 
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Montserrat:wght@600;700;800&display=swap" 
            rel="stylesheet"
          />
          
          {/* Meta tags */}
          <meta name="application-name" content="Purple Haze BBQ" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="default" />
          <meta name="apple-mobile-web-app-title" content="Purple Haze BBQ" />
          <meta name="format-detection" content="telephone=no" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="theme-color" content="#5D2E8C" />
          
          {/* Manifest and icons */}
          <link rel="manifest" href="/manifest.json" />
          <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" />
          <link rel="shortcut icon" href="/favicon.ico" />
          
          {/* Social media meta tags */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:url" content="https://purplehaze-bbq.com" />
          <meta name="twitter:title" content="Purple Haze BBQ" />
          <meta name="twitter:description" content="Premium BBQ catering in the DMV area" />
          <meta name="twitter:image" content="https://purplehaze-bbq.com/images/og-image.jpg" />
          <meta name="twitter:creator" content="@purplehazebbq" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="Purple Haze BBQ" />
          <meta property="og:description" content="Premium BBQ catering in the DMV area" />
          <meta property="og:site_name" content="Purple Haze BBQ" />
          <meta property="og:url" content="https://purplehaze-bbq.com" />
          <meta property="og:image" content="https://purplehaze-bbq.com/images/og-image.jpg" />
          
          {/* Facebook Pixel (noscript) */}
          <noscript>
            <img
              height="1"
              width="1"
              style={{ display: 'none' }}
              src={`https://www.facebook.com/tr?id=${process.env.NEXT_PUBLIC_FB_PIXEL_ID}&ev=PageView&noscript=1`}
              alt=""
            />
          </noscript>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;