import { Web3ReactProvider } from "@web3-react/core";
import type { AppProps } from "next/app";
import getLibrary from "../getLibrary";
import "../styles/globals.css";
import { MantineProvider } from '@mantine/core';

function NextWeb3App({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider
        withGlobalStyles
        withNormalizeCSS
      >
    <Web3ReactProvider getLibrary={getLibrary}>
      <Component {...pageProps} />
    </Web3ReactProvider>
    </MantineProvider>
  );
}

export default NextWeb3App;
