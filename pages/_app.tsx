import "../styles/globals.css";
import Head from "next/head";
import type { AppProps } from "next/app";
import ThemeProvider from "../context/ThemeContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Crypto Trader</title>
        <meta
          name="viewport"
          content="width=device-width , initial-scale=1.0"
        />
      </Head>
        <ThemeProvider>
          <Component {...pageProps} />
        </ThemeProvider>
    </>
  );
}
