import React from 'react'
import styles from './layout.module.scss'
import SideStrip from '../SideStripe/SideStripe.jsx'
import PropTypes from 'prop-types'
import { AnimatePresence, motion } from 'framer-motion'
import { useRouter } from 'next/router'

const Layout = ({ children }) => { 
  const router = useRouter()

  const variants = {
    hidden: { opacity: 0 },
    enter: { opacity: 1 },
    exit: { opacity: 0 },
  }

  return (
    <div className={styles.container}> 
      <SideStrip />
      <AnimatePresence mode='wait'>
        <motion.main
          variants={variants} 
          initial='hidden' 
          animate='enter' 
          exit='exit' 
          key={router.pathname}
        >{children}</motion.main>
      </AnimatePresence>
    </div>
  )}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
