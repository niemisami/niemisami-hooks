import React, { useState, useCallback } from 'react'

const Link = ({ href, children }) =>
  <a href={href} target='__blank' rel="noopener noreferrer">{children}</a>

const initialCoords = {
  accuracy: null,
  altitude: null,
  altitudeAccuracy: null,
  heading: null,
  latitude: null,
  longitude: null,
  speed: null
}

const useGeolocation = () => {
  const [coords, setCoords] = useState(initialCoords)
  const [error, setError] = useState(null)

  const geolocation = navigator.geolocation
  const isGeolocationAvailable = !!geolocation

  // coords is some sort native Coordinates object where every field is read only and needs to be hand picked
  const handleGeolocationSuccess = useCallback(({ coords }) => {
    setCoords({
      accuracy: coords.accuracy,
      altitude: coords.altitude,
      altitudeAccuracy: coords.altitudeAccuracy,
      heading: coords.heading,
      latitude: coords.latitude,
      longitude: coords.longitude,
      speed: coords.speed
    })
    if(error) {
      setError(null)
    }
  }, [error]) // Updates callback function only if error has occured but connection is acquired again 

  const handleGeolocationError = useCallback((error) => {
    setCoords(initialCoords)
    setError(error)
  }, [])
  if(isGeolocationAvailable) {
    geolocation.getCurrentPosition(handleGeolocationSuccess, handleGeolocationError)
  }
  return {
    isGeolocationAvailable,
    coords,
    error
  }
}

const Geolocation = () => {
  const {
    isGeolocationAvailable,
    coords,
    error
  } = useGeolocation()
  if(!isGeolocationAvailable) {
    return (
      <div>
        Geolocation is not supported by your browser <br />
        <Link href='https://www.google.com/chrome/'>Download Google Chrome</Link>
      </div>
    )
  }
  if(error) {
    return (
      <div>
        Can't read device location <br />
        <small>{error.message} (error code {error.code})</small>
      </div>
    )
  }
  return (
    <div>
      Current coordinates <br />
      lat {coords.latitude}<br />
      lng {coords.longitude}
    </div>
  )
}

export default Geolocation
