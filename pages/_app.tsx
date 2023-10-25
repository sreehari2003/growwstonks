import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import { Child } from "@app/types";
import "@app/styles/globals.css";

type ComponentWithPageLayout = AppProps & {
  Component: AppProps["Component"] & {
    Layout?: (arg: Child) => JSX.Element;
  };
};

const inter = Inter({ subsets: ["latin"] });

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const MyApp = ({ Component, pageProps }: ComponentWithPageLayout) => {
  return (
    <main className={inter.className}>
      <QueryClientProvider client={queryClient}>
        {Component.Layout ? (
          <Component.Layout>
            <Component {...pageProps} />
          </Component.Layout>
        ) : (
          <Component {...pageProps} />
        )}
      </QueryClientProvider>
    </main>
  );
};
export default MyApp;
