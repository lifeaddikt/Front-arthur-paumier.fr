import Head from 'next/head'
import Stripe from '../components/Stripe/Stripe.jsx'
import ArrowButton from '../components/ArrowButton/ArrowButton.jsx'
import React, { useEffect, useState, useRef } from 'react'
import collectionService from '../services/collectionService'
import PropTypes from 'prop-types'
import useDraggable from '../hooks/useDraggable'
import { useAppContext } from '../context/state'

const Home = ({ collections }) => {
  const [isVisible, setIsVisible] = useState(true)
  const [count, setCount] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const collectionList = useRef(null)

  const Context = useAppContext()
  const { isExpanded } = Context

  useDraggable(collectionList)

  const title = `${process.env.NEXT_PUBLIC_APP_TITLE} | Site internet`

  const handleScroll = e => {
    setCount(e.target.scrollLeft)
    if (count > 60) {
      setIsVisible(false)
    }
  }

  const handleResize = () => {
    document.documentElement.clientWidth < 768
      ? setIsMobile(true)
      : setIsMobile(false)
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    handleResize()

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <>
      <Head>
        <title key='title'>{title}</title>
        <meta
          key='description'
          name='description'
          content='Generated by create next app'
        />
      </Head>
      <div
        ref={collectionList}
        className='collection-list'
        onScroll={isVisible ? handleScroll : undefined}>
        {collections?.map(collection => (
          <Stripe
            key={collection?.id}
            isMobile={isMobile}
            slug={collection?.slug}
            name={collection?.name}
            desktop_img_url={collection?.acf.desktop_image}
            mobile_img_url={
              collection?.acf.mobile_image ? collection.acf.mobile_image : ''
            }
          />
        ))}
        {isExpanded && <ArrowButton isVisible={isVisible} />}
      </div>
    </>
  )
}

Home.propTypes = {
  collections: PropTypes.array.isRequired,
}

export async function getStaticProps() {
  const collections = await collectionService.loadAllCollections()

  return {
    props: {
      collections,
    },
  }
}

export default Home