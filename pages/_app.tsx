import Layout from '../components/layout/layout'
import Head from 'next/head'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
        <title>NextJS Events</title>
        <meta name='description' content='Find a lot here' />
        <meta name='viewport' content='initial-scale=1.0, width=device-width'/>
      </Head>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
