import React, { useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAppContext } from '../../context/state'

const Test = () => {
  const ref = useRef(null)

  const Context = useAppContext()

  const variants = {
    hidden: { opacity: 0, x: -200, y: 0 },
    enter: { opacity: 1, x: 0, y: 0 },
    exit: { opacity: 0, x: 0, y: -100 },
  }

  return (
    <motion.div
      key='modal'
      variants={variants} 
      initial='hidden' 
      animate='enter' 
      exit='exit' 
      transition={{ delay: 2 }}
      style={{ height: '3000px' }} ref={ref} >
      <h1 style={{ marginBottom: '1000px' }}>CC</h1>
      <p style={{ marginBottom: '1000px' }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim perferendis animi delectus voluptas id laborum iusto vel neque eum culpa, placeat nesciunt ullam. Totam, suscipit! Vitae nemo laudantium ab fugiat.</p>
      <p style={{ marginBottom: '1000px' }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim perferendis animi delectus voluptas id laborum iusto vel neque eum culpa, placeat nesciunt ullam. Totam, suscipit! Vitae nemo laudantium ab fugiat.</p>
      <p style={{ marginBottom: '1000px' }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim perferendis animi delectus voluptas id laborum iusto vel neque eum culpa, placeat nesciunt ullam. Totam, suscipit! Vitae nemo laudantium ab fugiat.</p>
    </motion.div>
  )}

export default Test
