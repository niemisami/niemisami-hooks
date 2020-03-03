import React, { useState, useCallback, useEffect } from 'react'

import useRotateElement from "./userRotateElement"

const RotateElement = () => {
  const [explicitDegree, setExplicitDegree] = useState(null)
  const [inputValue, setInputValue] = useState(null)
  const [setRef, degrees] = useRotateElement(explicitDegree)

  const handleInputChange = useCallback(event => {
    const { value } = event.target
    if(value != null && Number.isFinite(Number(value))) {
      setExplicitDegree(Math.floor(value))
      setInputValue(Math.floor(value))
    } else {
      setExplicitDegree(null)
      setInputValue(null)
    }
  }, [])

  useEffect(() => {
    if(degrees != null) {
      setInputValue(Math.floor(degrees))
    } else {
      setInputValue(null)
    }
  }, [degrees])

  return (
    <div style={{ position: 'relative'}}>
      <label>Degrees:</label>
      <input value={inputValue} onChange={handleInputChange} type='number' style={{ marginBottom: '2rem' }} />
      <div
        ref={setRef}
        className='dial-circle'
        style={{
          width: '100px',
          height: '40px',
          margin: '0 auto',
          background: 'aquamarine',
          transform: `rotate(${Math.floor(degrees)}deg)`
        }}
      >
        <span className='marker' />
      </div>
    </div>
  )
}

export default RotateElement