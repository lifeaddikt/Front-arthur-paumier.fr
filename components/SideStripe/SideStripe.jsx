import React, { useMemo, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { AnimatePresence, motion } from 'framer-motion'
import styles from './sideStripe.module.scss'
import Link from 'next/link'
import Image from 'next/image'
import { useAppContext } from '../../context/state'
import useMediaQueries from '../../hooks/useMediaQueries'
import PropTypes from 'prop-types'

const SideStripe = ({ description }) => {

  const router = useRouter()
  const Context = useAppContext()
  const { isExpanded, setIsExpanded } = Context

  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const isDesktop = useMediaQueries('(min-width: 992px)')
  const isMobile = useMediaQueries('(max-width: 576px)')

  const width = useMemo(() => isMobile ? '100%' : isExpanded ? isDesktop ? '16vw' : '25vw' : '4.75vw', [isDesktop, isMobile, isExpanded])

  const variants = {
    hidden: { opacity: 0, x: -200, y: 0 },
    enter: { opacity: 1, x: 0, y: 0 },
    exit: { opacity: 0, x: 0, y: 0 },
  }

  const spring = {
    type: 'spring',
    stiffness: 700,
    damping: 30,
  }


  return (
    isMounted && <motion.header className={styles.container} initial={{ width }} animate={{ width }} transition={spring}>
      <Link href='/'>
        {isExpanded ?
          <motion.h1 whileTap={{ scale: 0.98 }} className={styles.container__logo}>
          Arthur <br /> Paumier
          </motion.h1>
          : 
          <div style={{ textAlign: 'center', flex: 1 }}>
            <motion.h1 whileTap={{ scale: 0.98 }} className={styles.container__logo}>
              A.P
            </motion.h1>
          </div>}
      </Link>
      {((isMobile && router.pathname !== '/collection/[slug]/picture/[id]') || (!isMobile && isExpanded)) &&
      <AnimatePresence mode='wait'>
        <motion.p 
          key={router.pathname}
          variants={variants} 
          initial='hidden' 
          animate='enter' 
          exit='exit'
          transition={{ type: 'linear' }}
          className={styles.container__description}>
          {description}
        </motion.p>
      </AnimatePresence>}
      <div className={styles.container__bottom} style={{ justifyContent: isExpanded ? 'space-between' : 'center' }}>
        {isExpanded && <p className={styles.container__copyright}>&copy; Victor Paumier, 2023</p>}
        <motion.div whileTap={{ scale: 0.8 }} className={styles.container__expand} onClick={() => setIsExpanded(prev => !prev)}>
          {isExpanded ? 
            <Image draggable='false' layout='fill' src='/images/expand-left.svg' alt='Masquer la barre' title='Masquer' />
            :
            <Image draggable='false' layout='fill' src='/images/expand-right.svg' alt='Deplier la barre' title='Deplier' />
          }
        </motion.div>
      </div>
    </motion.header>
  )
}

SideStripe.propTypes = {
  description: PropTypes.string,
}

export default SideStripe
