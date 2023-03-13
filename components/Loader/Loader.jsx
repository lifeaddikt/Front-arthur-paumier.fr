import React from 'react'

const Loader = () => (
  <div style={{ backgroundColor: 'white', right: 0, left: 0, top: 0, bottom: 0, position: 'absolute', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 9999999999 }}>
    <img src='/images/loader.gif' alt='Loader' width='400' />
  </div>
)

export default Loader
