import React, { useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import { useAppContext } from '../../context/state'
import Masonry from 'react-masonry-css'
import useDraggable from '../../hooks/useDraggable'
import styles from './grid.module.scss'
import GridItem from './GridItem.jsx'

const Grid = ({ pictures }) => {
  const Context = useAppContext()
  const { scrollPosition, setScrollPosition, history } = Context
  const router = useRouter()
  const { slug } = router.query
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
    <div onScroll={handleScroll} className={styles.grid} ref={grid} data-scroll-section>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className='my-masonry-grid'
        columnClassName='my-masonry-grid_column'
      >
        {pictures.map(picture => (
          <GridItem key={picture.id} slug={slug} picture={picture} isDragging={isDragging} />
        ))}
      </Masonry>
    </div>
  )
}

Grid.propTypes = {
  pictures: PropTypes.array.isRequired,
}

export default Grid
