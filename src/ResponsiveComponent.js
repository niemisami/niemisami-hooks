import React, { useState, useEffect } from 'react'

const useWindowWidth = () =>{
  const [width, setWidth] = useState(window.innerWidth)

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  })
  return width
}

const ResponsiveComponent = props => {
  const width = useWindowWidth()
  return (
    <p>Window width is {width}</p>
  )
}


export default ResponsiveComponent
