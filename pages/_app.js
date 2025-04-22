// pages/_app.js
import '../styles/style.css'
import '../styles/globals.css'

// Font awesome:
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons'; 
library.add(fas);

import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
config.autoAddCss = false;


import { Analytics } from "@vercel/analytics/react"

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}