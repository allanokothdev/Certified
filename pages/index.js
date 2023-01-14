import Head from 'next/head'
import Hero from './create-program'
import { Inter } from '@next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Certified</title>
        <meta name="description" content="Authentic Certificates" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="../public/favicon.png" />
      </Head>
      <main>
        <Hero/>
      </main>
    </>
  )
}
