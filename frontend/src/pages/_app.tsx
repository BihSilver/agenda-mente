import Head from "next/head";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import "../styles/globals.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) {
      return;
    }

    if (process.env.NODE_ENV === "production") {
      navigator.serviceWorker
        .register("/service-worker.js")
        .then(() => console.log("Service Worker registrado"))
        .catch((err) => console.log("Erro:", err));
      return;
    }

    navigator.serviceWorker
      .getRegistrations()
      .then((registrations) => {
        registrations.forEach((registration) => {
          registration.unregister();
        });
      })
      .catch((err) => console.log("Erro ao remover SW em desenvolvimento:", err));
  }, []);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#2563eb" />
        <link rel="manifest" href="/manifest.json" />
      </Head>

      <Component {...pageProps} />
    </>
  );
}
