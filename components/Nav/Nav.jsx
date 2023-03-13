import React from 'react'
import Image from 'next/image'
import styles from './nav.module.scss'
import Link from 'next/link'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import { motion, AnimatePresence } from 'framer-motion'

const Nav = ({ previousPictureId, nextPictureId }) => {
  const router = useRouter()
  const { slug, id } = router.query

  const filter = {
    filter: 'brightness(0) saturate(100%) invert(51%) sepia(0%) saturate(16%) hue-rotate(24deg) brightness(98%) contrast(97%)',
    opacity: 0.25,
    cursor: 'default',
  }

  return (
    <AnimatePresence mode='wait'>
      <motion.nav className={styles.nav} key={id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { delay: 0 } }} transition={{ delay: 0.75 }}>
        <ul>
          <Link href={previousPictureId !== undefined ? `/collection/${slug}/picture/${previousPictureId }` : '#'}>
            <motion.li style={previousPictureId === undefined ? filter : {}} whileTap={{ scale: previousPictureId === undefined ? 1 : 0.8 }}>
              <div className={styles.nav__image} style={{ color: previousPictureId === undefined ? 'red' : 'black' }}>
                <Image draggable='false' layout='fill' src='/images/prev.svg' alt="Voir l'image précédente" />
              </div>
              <p>Prev</p>
            </motion.li>
          </Link>
          <Link href={nextPictureId !== undefined ? `/collection/${slug}/picture/${nextPictureId}` : '#'}>
            <motion.li style={nextPictureId === undefined ? filter : {}} whileTap={{ scale: nextPictureId === undefined ? 1 : 0.8 }}>
              <p>Next</p>
              <div className={styles.nav__image}>
                <Image draggable='false' layout='fill' src='/images/next.svg' alt="Voir l'image suivante" />
              </div>
            </motion.li>
          </Link>
          <Link href={`/collection/${slug}`}>
            <motion.li whileTap={{ scale: 0.8 }}>
              <div className={styles.nav__image}>
                <Image draggable='false' layout='fill' src='/images/grid.svg' alt='Retourner à la galerie' />
              </div>
              <p>Grid</p>
            </motion.li>
          </Link>
        </ul>
      </motion.nav>
    </AnimatePresence>
  )}

Nav.propTypes = {
  previousPictureId: PropTypes.number,
  nextPictureId: PropTypes.number,
}

export default Nav
