import React from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import PropTypes from 'prop-types'
import Grid from '../../components/Grid/Grid'
import collectionService from '../../services/collectionService'
import pictureService from '../../services/pictureService'

const Collection = ({ pictures }) => {
  const router = useRouter()
  const { slug } = router.query
  const capitalizedSlug = slug?.charAt(0)?.toUpperCase() + slug?.slice(1)

  const title = `${process.env.NEXT_PUBLIC_APP_TITLE} | ${capitalizedSlug}`

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
      <Grid pictures={pictures} />
    </>
  )
}

export async function getStaticPaths() {
  const collections = await collectionService.loadAllCollections()
  const paths = collections.map(collection => ({
    params: { slug: collection.slug },
  }))
  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const pictures = await pictureService.loadPicturesByCollection(params.slug)
  return {
    props: {
      pictures,
      revalidate: 10,
    },
  }
}

Collection.propTypes = {
  pictures: PropTypes.array.isRequired,
}

export default Collection
