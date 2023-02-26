import '../styles/globals.css'
import { AppContextProvider } from './components/AppContext'
import NavBar from './components/Navbar'

export default function App({ Component, pageProps }) {

  return (
    <AppContextProvider>
      <NavBar />
      <Component {...pageProps} />
    </AppContextProvider>
  )
}

