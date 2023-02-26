import Head from 'next/head'
import { useContext, useEffect } from 'react';
import Hero from './components/Hero'


export default function Home() {

  useEffect(() => {
    console.log("Parent Page Rendered");
  }, []);

  return (
    <>
      <Head>
        <title>Certified</title>
        <meta name="description" content="Authentic Certificates" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="../public/favicon.png" />
      </Head>
      <Hero/>
    </>
  )
}
