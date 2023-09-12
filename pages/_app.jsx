/* eslint-disable react/prop-types */
import React from 'react'
import '../styles/globals.scss'
import Head from 'next/head'
import { AppWrapper } from '../context/state'

const MyApp = ({ Component, pageProps }) => (
  <AppWrapper>
    <Head>
      <link rel='icon' href='/images/favicon.ico' key='favicon' />
    </Head>
    <Component {...pageProps} />
  </AppWrapper>
)

export default MyApp
