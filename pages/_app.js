// pages/_app.js
import '../styles/style.css'
import '../styles/globals.css'

import { Analytics } from "@vercel/analytics/react"

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}