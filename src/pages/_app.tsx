import { AppProps } from "next/dist/next-server/lib/router/router";
import { Header } from "../components/Header";
import "../styles/globals.scss";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
