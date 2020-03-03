
import { useCallback, useEffect, useRef, useState } from 'react'

// Find a help from this article
// https://www.kirupa.com/html5/get_element_position_using_javascript.htm
const getAbsolutePosition = el => {
  let left = 0
  let top = 0
  let element = el
  while(element) {
    left += element.offsetLeft
    top += element.offsetTop
    element = element.offsetParent
  }
  return { left, top }
}

const calculateDegrees = (event, node) => {
  let gestureX
  let gestureY
  if(event.touches) {
    gestureX = event.touches[0].pageX
    gestureY = event.touches[0].pageY
  } else {
    gestureX = event.pageX
    gestureY = event.pageY
  }
  const offset = getAbsolutePosition(node)
  const centerX = offset.left + node.offsetWidth / 2
  const centerY = offset.top + node.offsetHeight / 2
  const radians = Math.atan2(gestureY - centerY, gestureX - centerX)
  const degree = radians * (180 / Math.PI)
  return degree
}

// https://css-tricks.com/get-value-of-css-rotation-through-javascript/
const getElementsInitialAngle = node => {
  const transformProperty = window.getComputedStyle(node, null)
    .getPropertyValue('transform')
  const values = transformProperty
    .split('(')[1]
    .split(')')[0]
    .split(',')

  const posX = values[0]
  const posY = values[1]
  // const c = values[2]
  // const d = values[3]
  const angle = Math.atan2(posY, posX) * (180 / Math.PI)
  return angle
}

const useRotateElement = userDegrees => {
  const ref = useRef(null)
  const raf = useRef(null)
  const elementsInitialAngle = useRef(0)
  const touchStartAngle = useRef(0)
  const [degrees, setDegrees] = useState(0)
  const [isDown, setIsDown] = useState(false)

  useEffect(() => {
    setDegrees(userDegrees)
  }, [userDegrees])

  const setRef = useCallback(node => {
    const gestureEnd = () => {
      setIsDown(false)
    }
    const gestureStart = event => {
      elementsInitialAngle.current = getElementsInitialAngle(node)
      touchStartAngle.current = calculateDegrees(event, node)
      setIsDown(true)
    }
    if(ref.current) {
      ref.current.removeEventListener('touchstart', gestureStart, true)
      document.removeEventListener('touchend', gestureEnd, true)
      document.removeEventListener('touchcancel', gestureEnd, true)
      ref.current.removeEventListener('mousedown', gestureStart, true)
      document.removeEventListener('mouseup', gestureEnd, true)
    }
    if(node) {
      node.addEventListener('mousedown', gestureStart)
      document.addEventListener('mouseup', gestureEnd)
      node.addEventListener('touchstart', gestureStart)
      document.addEventListener('touchend', gestureEnd)
    }
    ref.current = node
  }, [])

  useEffect(() => {
    const gestureMove = event => {
      if(isDown) {
        event.preventDefault()
        // https://gomakethings.com/debouncing-events-with-requestanimationframe-for-better-performance/
        if(!raf.current) {
          raf.current = window.requestAnimationFrame(() => {
            const currentDegree = calculateDegrees(event, ref.current)
            const degreeDelta = currentDegree - touchStartAngle.current
            const travelledDegree = elementsInitialAngle.current + degreeDelta
            // TODO: let user define min and max
            setDegrees(travelledDegree < 0 ? travelledDegree + 360 : travelledDegree)
            raf.current = null
          })
        }
      }
    }
    if(isDown) {
      document.addEventListener('touchmove', gestureMove, { passive: false })
      document.addEventListener('mousemove', gestureMove, { passive: false })
    }
    return () => {
      document.removeEventListener('touchmove', gestureMove)
      document.removeEventListener('mousemove', gestureMove)
      window.cancelAnimationFrame(raf.current)
      raf.current = null
    }
  }, [isDown])

  return [setRef, degrees, ref]
}

export default useRotateElement
