import React, { useState, useCallback } from 'react';
import LifecycleHooks from './LifecycleHooks';

const Nothing = () => 'Nothing'

const LifecycleHookExample = () => {

  const [count, setCount] = useState(0)
  const [isMounted, setIsMounted] = useState(true)
  const LifecycleDemoComponent = isMounted
    ? LifecycleHooks
    : Nothing

  const toggleIsMounted = useCallback(() => setIsMounted(isMounted => !isMounted), [])
  const decreaseCount = useCallback(() => setCount(count => count - 1), [])
  const increaseCount = useCallback(() => setCount(count => count + 1), [])
  const clearCounter = useCallback(() => setCount(0), [])

  return (
    <>
      <button onClick={toggleIsMounted}>
        Mount
        <span role='img' aria-label='mount-icon'>
          &#x26A1;
        </span>
      </button>
      <button onClick={clearCounter}>Clear</button>
      <div>
        <button onClick={decreaseCount}>Minus -</button>
        <button onClick={increaseCount}>Plus  +</button>
      </div>
      <LifecycleDemoComponent count={count} />
    </>
  )
}

export default LifecycleHookExample
