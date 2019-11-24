import React, { useState, useCallback } from 'react';
import './App.css';
import LifecycleHooks from './LifecycleHooks';
import ResponsiveComponent from './ResponsiveComponent';

const Nothing = () => 'Nothing'
const Title = ({ children }) => <p className='title'>{children}</p>
const Block = ({ title, children }) => (
  <div className='mt-3'>
    <Title>{title}</Title>
    {children}
  </div>
)

const App = () => {
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
    <div className="App">
      <Block title='Lifecycle Hooks'>
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
      </Block>
      <Block title='Window width listener'>
        <ResponsiveComponent />
      </Block>
    </div>
  );
}

export default App;
