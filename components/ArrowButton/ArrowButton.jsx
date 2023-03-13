import React from 'react'
import styles from './ArrowButton.module.scss'
import PropTypes from 'prop-types'

const ArrowButton = ({ isVisible }) => (
  <>
    <div className={isVisible ? styles.button : styles.button__invisible}>
      <img draggable='false' src='/images/icon-next.png' alt="Flêche signifiant qu'on peut scroll" />
    </div>
  </>
)

ArrowButton.propTypes = {
  isVisible: PropTypes.bool.isRequired,
}

export default ArrowButton
