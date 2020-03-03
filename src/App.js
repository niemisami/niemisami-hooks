import React from 'react'
import LifecycleHookExample from './LifecycleHookExample'
import ResponsiveComponent from './ResponsiveComponent'
import ApiComponent from './ApiComponent'
import Geolocation from './Geolocation'

import './App.css'
import RotateElement from './RotateExample'

const Title = ({ children }) => <p className='title'>{children}</p>
const Block = ({ title, children }) => (
  <div className='mt-3'>
    <Title>{title}</Title>
    {children}
  </div>
)

const App = () => (
  <div className="App">
    <Block title='Lifecycle Hooks'>
      <LifecycleHookExample />
    </Block>
    <Block title='Window width listener'>
      <ResponsiveComponent />
    </Block>
    <Block title='Turku city bikes'>
      <ApiComponent />
    </Block>
    <Block title='Geolocation'>
      <Geolocation />
    </Block>
    <Block title='Rotating element'>
      <RotateElement />
    </Block>
  </div>
)

export default App
