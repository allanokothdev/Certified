import '../styles/globals.css'
import NavBar from './components/Navbar'

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

