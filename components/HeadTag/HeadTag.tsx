import Head from 'next/head'
import Script from 'next/script'

interface HeadTagProps {
  description?: string
  title?: string
}

export default function HeadTag({ description }: HeadTagProps) {
  return (
    <>
      <Head>
        <title>Dumb Ways To Die In Product Development</title>
        <meta name="description" content={description ? description : ''} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <Script id="detectTouch" strategy="afterInteractive">
        {`	
          var SUPPORTS_TOUCH	= false;
          window.addEventListener('touchstart', function()
          {			
            SUPPORTS_TOUCH	= true;
          });
        `}
      </Script>
    </>
  )
}
