/* eslint-disable react/prop-types */
import React from 'react'
import '../styles/globals.scss'
import Layout from '../components/Layout/Layout'
import Head from 'next/head'
import { AppWrapper } from '../context/state'

const MyApp = ({ Component, pageProps }) => (
  <AppWrapper>
    <Head>
      <link rel='icon' href='/images/favicon.ico' key='favicon' />
    </Head>
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </AppWrapper>
)

export default MyApp
