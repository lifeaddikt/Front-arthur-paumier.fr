import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/future/image'
import PropTypes from 'prop-types'

const GridItem = ({ slug, picture, isDragging }) => {
  const [isLoading, setIsLoading] = useState(true)
  return (
    <motion.div whileTap={{ scale: 0.995 }}>
      <Link href={`${slug}/picture/${picture.id}`}>
        <a style={{ display: 'contents' }} onClick={isDragging ? e => e.preventDefault() : null} onMouseDown={e => { e.target.style.cursor = 'grabbing'}} onMouseUp={e => { e.target.style.cursor = 'pointer'}} onMouseOut={e => { e.target.style.cursor = 'pointer'}}>
          <Image
            draggable='false'
            src={picture._embedded['wp:featuredmedia'][0].media_details.sizes.full.source_url}
            width={isLoading ? picture._embedded['wp:featuredmedia'][0].media_details.width : 0}
            height={isLoading ? picture._embedded['wp:featuredmedia'][0].media_details.height : 0}
            sizes='25vw' /// A FAIRE
            style={{ width: '100%', height: '100%', display: 'block' }}
            alt='à faire'
            placeholder='blur'
            blurDataURL={picture.base64}
            onLoadingComplete={() => setIsLoading(false)}
          />
        </a>
      </Link>
    </motion.div>
  )}

GridItem.propTypes = {
  slug: PropTypes.string.isRequired,
  picture: PropTypes.object.isRequired,
  isDragging: PropTypes.bool.isRequired,
}

export default GridItem
