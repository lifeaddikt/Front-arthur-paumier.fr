import React, { useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import { useAppContext } from '../../context/state'
import Image from 'next/future/image'
import Masonry from 'react-masonry-css'
import { motion } from 'framer-motion'
import useDraggable from '../../hooks/useDraggable'
import Link from 'next/link'

const Grid = ({ pictures }) => {
  const Context = useAppContext()
  const { scrollPosition, setScrollPosition, history } = Context
  const router = useRouter()
  const grid = useRef(null)
  const { isDragging } = useDraggable(grid)

  useEffect(() => {
    setTimeout(() => {

      if (history[history.length - 1].includes('picture')){ 
        grid.current.scrollTo({
          top: scrollPosition,
          behavior: 'smooth',
        })
      }
      
    }, 250)
  }, [])

  const breakpointColumnsObj = {
    default: 3,
    700: 2,
  }

  const handleScroll = e => {
    setScrollPosition(e.target.scrollTop)
  }


  return (
    <div onScroll={handleScroll} style={{ height: '100vh', overflowY: 'auto', backgroundColor: 'black' }} ref={grid} data-scroll-section>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className='my-masonry-grid'
        columnClassName='my-masonry-grid_column'
      >
        {pictures.map(picture => (
          <motion.div whileTap={{ scale: 0.995 }} key={picture.id}>
            <Link href={`${router.asPath}/picture/${picture.id}`}>
              <a style={{ display: 'contents' }} onClick={isDragging ? e => e.preventDefault() : null} onMouseDown={e => { e.target.style.cursor = 'grabbing'}} onMouseUp={e => { e.target.style.cursor = 'pointer'}} onMouseOut={e => { e.target.style.cursor = 'pointer'}}>
                <Image
                  draggable='false'
                  src={
                    picture._embedded['wp:featuredmedia'][0].media_details.sizes
                      .full.source_url
                  }
                  width='0'
                  height='0'
                  sizes='25vw' /// A FAIRE
                  style={{ width: '100%', height: '100%', display: 'block' }}
                  placeholder='blur'
                  blurDataURL='https://live.staticflickr.com/65535/51119804658_41d0955d57_h.jpg'
                  alt='à faire'
                />
              </a>
            </Link>
          </motion.div>
        ))}
      </Masonry>
    </div>
  )
}

Grid.propTypes = {
  pictures: PropTypes.array.isRequired,
}

export default Grid
