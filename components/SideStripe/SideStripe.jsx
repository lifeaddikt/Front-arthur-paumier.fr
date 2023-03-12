import React, { useEffect, useState, useMemo } from 'react'
import { useRouter } from 'next/router'
import { AnimatePresence, motion } from 'framer-motion'
import styles from './sideStripe.module.scss'
import Link from 'next/link'
import websiteService from '../../services/websiteService'
import collectionService from '../../services/collectionService'
import Image from 'next/image'
import { useAppContext } from '../../context/state'
import useMediaQueries from '../../hooks/useMediaQueries'

const SideStripe = () => {

  // Pour éviter les problèmes de mort de next js de mor
  const [mounted, setMounted] = useState(false)

  const router = useRouter()
  const [description, setDescription] = useState('')
  const Context = useAppContext()
  const { isExpanded, setIsExpanded } = Context

  const isDesktop = useMediaQueries('(min-width: 992px)')
  const isMobile = useMediaQueries('(max-width: 576px)')

  const width = useMemo(() => isMobile ? '100%' : isDesktop ? '16vw' : '25vw', [isDesktop, isMobile])

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

  useEffect(() => {
    setMounted(true)
  }, [])

  const data = useMemo(() => {
    switch (router.pathname) {
      case '/':
        return websiteService.loadWebsiteInformation()
      case '/collection/[slug]':
        return collectionService.loadCollection(router.query.slug)
      default:
        return null
    }
  }, [router.pathname, router.query.slug, router.query.id])
  
  useEffect(() => {
    if(data){
      data.then(data => {
        switch (router.pathname) {
          case '/':
            setDescription(data.description)
            break
          case '/collection/[slug]':
            setDescription(data[0]?.description)
            break
          default:
            break
        }
        return null
      })
    }
  }, [router, data])

  return (
    mounted && <motion.header className={styles.container} initial={{ width }} animate={{ width: isExpanded ? width : '4.75vw' }} transition={spring}>
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
        {isExpanded && <p className={styles.container__copyright}>&copy; Victor Paumier, 2022</p>}
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

export default SideStripe
