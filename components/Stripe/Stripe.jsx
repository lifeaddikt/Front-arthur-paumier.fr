/* eslint-disable camelcase */
import React from 'react'
import styles from './stripe.module.scss'
import PropTypes from 'prop-types'
import Link from 'next/link'
import Image from 'next/future/image'
import { motion } from 'framer-motion'

const Stripe = ({ slug, name, desktop_img_url, mobile_img_url, isMobile, setCountImgLoaded }) => (
  <div className={styles.stripe}>
    <Link href={'/collection/' + slug}>
      <motion.h2 whileTap={{ scale: 0.95 }}>{name}</motion.h2>
    </Link>
    <Image
      className={styles.stripe__image}
      draggable='false'
      src={isMobile && mobile_img_url.length > 0 ? mobile_img_url : desktop_img_url}
      alt={`Image de présentation de la collection ${name}.`}
      fill
      style={{ objectFit: 'cover' }}
      sizes='(max-width: 768px) 80vw,
        100vw'
      priority
      onLoadingComplete={() => setCountImgLoaded(prev => prev + 1)}
    />
    <div className={styles.stripe__filter}></div>
  </div>
)

Stripe.propTypes = {
  slug: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  desktop_img_url: PropTypes.string.isRequired,
  mobile_img_url: PropTypes.string,
  isMobile: PropTypes.bool.isRequired,
  setCountImgLoaded: PropTypes.func.isRequired,
}

export default Stripe
