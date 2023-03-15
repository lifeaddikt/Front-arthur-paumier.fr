import React, { useRef, useEffect, useState } from 'react'
import Image from 'next/future/image'
import Link from 'next/link'
import Nav from '../Nav/Nav.jsx'
import Loader from '../Loader/Loader.jsx'
import styles from './overview.module.scss'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'
import { motion, AnimatePresence } from 'framer-motion'
import useDraggable from '../../hooks/useDraggable'
import { useAppContext } from '../../context/state'
import useMediaQueries from '../../hooks/useMediaQueries'


const Overview = ({ pictureData }) => {

  const isMobile = useMediaQueries('(max-width: 576px)')

  const Context = useAppContext()
  const { isExpanded, setIsExpanded } = Context

  const container = useRef(null)
  useDraggable(container)

  const previousPictureId = pictureData.previous?.id
  const nextPictureId = pictureData.next?.id

  const [displayLeftArrow, setDisplayLeftArrow] = useState(false)
  const [displayRightArrow, setDisplayRightArrow] = useState(false)
  const [hasMoved, setHasMoved] = useState(false)
  const [loading, setLoading] = useState(true)

  const leftSide = useRef(null)
  const rightSide = useRef(null)
  const arrow = useRef(null)

  const { date, lieu: place } = pictureData.acf
  const picture = pictureData._embedded['wp:featuredmedia'][0]
  const router = useRouter()
  const { slug, id } = router.query

  const isLandscape = picture.media_details.height > picture.media_details.width

  useEffect(() => {
    setLoading(true)
  }, [id])

  useEffect(() => {
    if(!isMobile && isExpanded)
      setTimeout(() => {
        setIsExpanded(false)
      }, 1500)
  }, [])

  useEffect(() => {
    const handleMouseEnter = e => {
      e.stopPropagation()
      e.target === leftSide.current ? setDisplayLeftArrow(true) : setDisplayRightArrow(true)
    }
  
    const handleMouseLeave = e => {
      e.stopPropagation()
      e.target === leftSide.current ? setDisplayLeftArrow(false) : setDisplayRightArrow(false)
    }

    const moveCursor = e => {
      if(!hasMoved){
        setHasMoved(true)
      }
      const mouseY = e.clientY
      const mouseX = e.clientX
      
      if(arrow.current) {
        arrow.current.style.left = mouseX + 'px'
        arrow.current.style.top = mouseY + 'px'
      }
    }
  

    setTimeout(() => {
      leftSide?.current?.addEventListener('mousemove', moveCursor)
      leftSide?.current?.addEventListener('mouseenter', handleMouseEnter)
      leftSide?.current?.addEventListener('mouseleave', handleMouseLeave)
      rightSide?.current?.addEventListener('mousemove', moveCursor)
      rightSide?.current?.addEventListener('mouseenter', handleMouseEnter)
      rightSide?.current?.addEventListener('mouseleave', handleMouseLeave)
    }, 1000)

    return () => {
      if (leftSide.current && rightSide.current) {
        leftSide.current.removeEventListener('mousemove', moveCursor)
        leftSide.current.removeEventListener('mouseenter', handleMouseEnter)
        leftSide.current.removeEventListener('mouseleave', handleMouseLeave)
        rightSide.current.removeEventListener('mousemove', moveCursor)
        rightSide.current.removeEventListener('mouseenter', handleMouseEnter)
        rightSide.current.removeEventListener('mouseleave', handleMouseLeave)
      }
    }

  })

  const Arrow = () => (
    <motion.div 
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      ref={arrow} 
      style={{
        width: '60px',
        height: '60px',
        position: 'fixed',
        zIndex: 100,
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
      }}>
      <img style={{ rotate: displayLeftArrow ? '180deg' : '0deg' }}src='/images/icon-next.png' alt="Flêche signifiant qu'on peut scroll" />
    </motion.div>
  )

  return (
    <>
      {loading && <Loader />}
      <div className={styles.container} ref={container} style={{ alignItems: isLandscape ? 'flex-start' : 'center' }}>
        {(((displayLeftArrow && previousPictureId !== undefined) || (displayRightArrow && nextPictureId !== undefined)) && hasMoved) && <Arrow />}
        <div className={styles.container__layout}>
          <Link href={`/collection/${slug}`}>
            <motion.div whileTap={{ scale: 0.8 }} className={styles.container__cross}>
              <Image draggable='false' src='/images/cross.jpeg' width='80' height='80' alt='Cliquer pour revenir en arrière' />
            </motion.div>
          </Link>
          <AnimatePresence mode='wait'>
            <motion.div key={id} className={styles.container__picture} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ type: 'Tween', duration: 0.25, delay: 0.25 }} exit={{ opacity: 0, x: 20, transition: { duration: 0.25, delay: 0.25 } }}>
              <div style={{ cursor: previousPictureId !== undefined ? 'none' : 'default' }} className={styles.container__picture__left} ref={leftSide} onMouseDown={() => { setHasMoved(false); setDisplayLeftArrow(false)}} onClick={() => {router.push(previousPictureId !== undefined ? `/collection/${slug}/picture/${previousPictureId }` : '#')}} />
              <div style={{ cursor: nextPictureId !== undefined ? 'none' : 'default' }} className={styles.container__picture__right} ref={rightSide} onMouseDown={() => {setHasMoved(false); setDisplayRightArrow(false)}} onClick={() => {router.push(nextPictureId !== undefined ? `/collection/${slug}/picture/${nextPictureId }` : '#')}} />
              <h2 className={styles.container__picture__place}>{place}</h2>
              <h2 className={styles.container__picture__date}>{date}</h2>
              <Image
                width='0'
                height='0'
                style={{ width: '100%', height: '100%', maxHeight: '800px', display: 'block' }}
                src={picture.source_url}
                alt={picture.alt_text ? picture.alt_text : 'Photo de la collection'}
                sizes='100vw'
                quality='100'
                priority
                onLoadingComplete={() => setLoading(false)}
              />
            </motion.div>
          </AnimatePresence>
          <Nav nextPictureId={nextPictureId} previousPictureId={previousPictureId} />
        </div>
      </div>
    </>
  )}

Overview.propTypes = {
  pictureData: PropTypes.object.isRequired,
}

export default Overview
