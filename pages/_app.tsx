import { Press_Start_2P } from '@next/font/google'
import type { AppProps } from 'next/app'

import '@/styles/globals.css'

const pressStart = Press_Start_2P({ subsets: ['latin'], weight: '400' })

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${pressStart.style.fontFamily};
        }
      `}</style>
      <Component {...pageProps} />
    </>
  )
}
