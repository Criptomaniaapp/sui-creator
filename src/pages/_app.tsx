import { AppProps } from "next/app";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Script from "next/script";
import Head from "next/head";
import { FC } from "react";
import { ContextProvider } from "../contexts/ContextProvider";
import { AppBar } from "../components/AppBar";
import { SideBar } from "components/SideBar";
import { ContentContainer } from "../components/ContentContainer";
import { Footer } from "../components/Footer";
import Notifications from "../components/Notification";
require("@solana/wallet-adapter-react-ui/styles.css");
require("../styles/globals.css");
import * as gtag from "../lib/gtag";

const GA_TRACKING_ID = "G-GN8FNZRTHZ";

const App: FC<AppProps> = ({ Component, pageProps }) => {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);
  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
      <Head>
        <title>Solana Token Creator Lite</title>
      </Head>

      <ContextProvider>
        <div className="flex relative z-10">
          <SideBar />
          <div className="flex flex-col min-h-screen w-full">
            <Notifications />
            <AppBar />
            {/* <ContentContainer> */}
            <Component {...pageProps} />
            {/* <Footer/> */}
            {/* </ContentContainer> */}
          </div>
        </div>
      </ContextProvider>
    </>
  );
};

export default App;
