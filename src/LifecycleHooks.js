import React, { useEffect, useState, useRef, memo } from 'react'

// Example from https://dev.to/bunlong/react-component-lifecycle-hooks-cheatsheet-1p6
const LifecycleHookComponent = props => {
  const [desc, setDesc] = useState('user')
  const [prevCount, setPrevCount] = useState(null)

  console.log('Initialize')

  const mounted = useRef()

  useEffect(() => {
    console.log('componentDidMount')
    return () => {
      console.log('componentDidUmnount')
    }
  }, [])

  useEffect(() => {
    if(!mounted.current) {
      console.log('mount componentDidUpdate')
      mounted.current = true
    } else {
      console.log('componentDidUpdate')
    }
  }, [props.count])

  if(prevCount !== props.count) {
    setDesc(LifecycleHooks.getDerivedStateFromProps(props, desc))
    setPrevCount(props.count)
  }

  return (
    <>
      {props.count} {desc}
    </>
  )
}

const shouldComponentUpdate = (prevProps, nextProps) => {
  console.log('shouldComponentUpdate')
}


const LifecycleHooks = memo(LifecycleHookComponent, shouldComponentUpdate)

LifecycleHooks.getDerivedStateFromProps = (nextProps, prevState) => {
  console.log('getDerivedStateFromProps')
  if(!nextProps.count || Math.abs(nextProps.count) !== 1) {
    return 'users'
  }
  return 'user'
}

export default LifecycleHooks
