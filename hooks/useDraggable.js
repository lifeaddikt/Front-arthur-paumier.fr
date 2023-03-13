import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

const useDraggable = ref => {

  const [position, setPosition] = useState({})
  const [isDragging, setIsDragging] = useState(false)

  const mouseMoveHandler = e => {
    setIsDragging(true)
    // How far the mouse has been moved
    const dx = e.clientX - position.x
    const dy = e.clientY - position.y

    // Scroll the element
    ref.current.scrollTop = position.top - dy
    ref.current.scrollLeft = position.left - dx
  }

  const mouseUpHandler = () => {
    if (ref.current) {
      ref.current.removeEventListener('mousemove', mouseMoveHandler)
      ref.current.removeEventListener('mouseup', mouseUpHandler)

      ref.current.style.cursor = 'initial'
      ref.current.style.removeProperty('user-select')
    }
  }

  // Mouse drag
  // I used 2 useEffect because I wanted to use the position state
  // and he makes time to update
  useEffect(() => {
    const mouseDownHandler = e => {
      setPosition({
        // The current scroll
        left: ref.current.scrollLeft,
        top: ref.current.scrollTop,
        // Get the current mouse position
        x: e.clientX,
        y: e.clientY,
      })

      setIsDragging(false)

      ref.current.style.cursor = 'grabbing'
      ref.current.style.userSelect = 'none'
    }

    ref.current.addEventListener('mousedown', mouseDownHandler)

    return () => {
      if (ref.current) {
        ref.current.removeEventListener('mousedown', mouseDownHandler)
      }
    }
  }, [])

  useEffect(() => {
    if (!position.x || !position.y) return

    const mouseOutHandler = e => {
      if (e.relatedTarget === null) {
        mouseUpHandler()
      }
    }

    ref.current.addEventListener('mousemove', mouseMoveHandler)
    ref.current.addEventListener('mouseup', mouseUpHandler)

    window.addEventListener('mouseout', mouseOutHandler)

    return () => {
      window.removeEventListener('mouseout', mouseOutHandler)
      if (ref.current) {
        ref.current.removeEventListener('mousemove', mouseMoveHandler)
        ref.current.removeEventListener('mouseup', mouseUpHandler)
      }
    }
  }, [position, isDragging])

  return { isDragging }
}

useDraggable.propTypes = {
  ref: PropTypes.object.isRequired,
}

export default useDraggable
