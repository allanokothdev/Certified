import '../styles/globals.css'
import NavBar from './components/Navbar'
import "@biconomy/web3-auth/dist/src/style.css"
import dynamic from "next/dynamic";
import { Suspense } from "react";

export default function App({ Component, pageProps }) {
  return (
    <>
      <div className=" max-w-full w-screen">
        <NavBar />
        <Component {...pageProps}/>
      </div>
    </>
  )
}

