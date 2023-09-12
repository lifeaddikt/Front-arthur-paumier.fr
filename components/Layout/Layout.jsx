import React from 'react'
import styles from './layout.module.scss'
import SideStrip from '../SideStripe/SideStripe.jsx'
import PropTypes from 'prop-types'

const Layout = ({ description, children }) => (
  <div className={styles.container}> 
    <SideStrip description={description} />
    <main>{children}</main>
  </div>
)

Layout.propTypes = {
  description: PropTypes.string,
  children: PropTypes.node.isRequired,
}

export default Layout
