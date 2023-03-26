import React from 'react'
import { motion } from 'framer-motion'

const Loader = () => (
  <div style={{ backgroundColor: 'white', right: 0, left: 0, top: 0, bottom: 0, position: 'absolute', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 9999999999 }}>
    <motion.img initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} src='/images/loader-black.gif' alt='Loader' width='400' />
  </div>
)

export default Loader
