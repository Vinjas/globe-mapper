import Head from "next/head";
import { Home } from "@/components/Home/Home";

export default function Main() {
  return (
    <>
      <Head>
        <title>GlobeMapper</title>
        <meta name="description" content="Global Interactive Map" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Home />
      </main>
    </>
  );
}
