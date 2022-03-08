/* eslint-disable @next/next/next-script-for-ga */
import Head from 'next/head'

export function reportWebVitals(metric) {
  // console.log(metric)
}

const App = ({ Component, pageProps }) => {
  return (
    <>
        <Head>
            {/* <script dangerouslySetInnerHTML={{
              __html: `
              console.log('s');`
            }}>
                
            </script> */}
        </Head>
          <Component {...pageProps} />
    </>
  )
}


export default App
