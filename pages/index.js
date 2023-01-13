import Head from 'next/head'
import Hero from './components/herox'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'

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
      <main className={styles.main}>
        <Hero/>
      </main>
    </>
  )
}
