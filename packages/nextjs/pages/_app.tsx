import { useEffect, useState } from "react";
import type { AppProps } from "next/app";
import { RainbowKitProvider, darkTheme, lightTheme } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import PlausibleProvider from "next-plausible";
import { ThemeProvider, useTheme } from "next-themes";
import NextNProgress from "nextjs-progressbar";
import { Toaster } from "react-hot-toast";
import { WagmiConfig } from "wagmi";
import { Footer } from "~~/components/Footer";
import { BlockieAvatar } from "~~/components/scaffold-eth";
import { wagmiConfig } from "~~/services/web3/wagmiConfig";
import { appChains } from "~~/services/web3/wagmiConnectors";
import "~~/styles/globals.css";

const ScaffoldEthAppChildren = (props: AppProps) => {
  const { Component, pageProps } = props;
  const { resolvedTheme } = useTheme();
  const isDarkMode = resolvedTheme === "dark";
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <WagmiConfig config={wagmiConfig}>
      <NextNProgress />
      <RainbowKitProvider
        chains={appChains.chains}
        avatar={BlockieAvatar}
        theme={mounted ? (isDarkMode ? darkTheme() : lightTheme()) : lightTheme()}
      >
        <main className="relative flex flex-col flex-1">
          <Component {...pageProps} />
        </main>
        <Footer />
        <Toaster />
      </RainbowKitProvider>
    </WagmiConfig>
  );
};

const ScaffoldEthApp = (props: AppProps) => {
  return (
    <PlausibleProvider domain="scaffoldeth.io">
      <ThemeProvider
        attribute="data-theme"
        defaultTheme="system"
        value={{ light: "scaffoldEth", dark: "scaffoldEthDark" }}
      >
        <ScaffoldEthAppChildren {...props} />
      </ThemeProvider>
    </PlausibleProvider>
  );
};

export default ScaffoldEthApp;
