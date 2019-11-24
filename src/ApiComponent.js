import React, { useState, useEffect, useCallback } from 'react'

const getNow = () => {
  const now = new Date()
  return now.toLocaleTimeString()
}

// Hook for storing current time as hh:mm.ss fromat
const useRefresh = () => {
  const [refreshTime, setRefreshTimeState] = useState(null)
  const setRefreshTime = useCallback(() => {
    setRefreshTimeState(getNow())
  }, [])
  return [refreshTime, setRefreshTime]
}

// Use open Turku public trasport API (http://data.foli.fi/doc/citybike/v0/index) for requesting and displaying
// available city bikes and their stations
const apiUrl = 'http://data.foli.fi/citybike'
const useCityBikeApi = refreshTime => {
  const [foliResponse, setFoliResponse] = useState({})
  const [error, setError] = useState(null)
  const [lastFetched, setLastFetched] = useState(null)
  useEffect(() => {
    let ignoreResponse = false
    fetch(apiUrl)
      .then(res => res.json())
      .then(res => {
        if(!ignoreResponse) {
          setFoliResponse(res)
          setLastFetched(getNow())
        }
      })
      .catch(error => setError(error))
    return () => { ignoreResponse = true } // Prevent extra renders by ignoring responses after unmount
  }, [refreshTime]) // Make a request on first render and new requests if refresh time changes

  return [parseFoliResponse(foliResponse), lastFetched, error]
}

const parseFoliResponse = (response) => ({
  bikesTotalAvailable: response.bikes_total_avail || 0,
  racks: response.racks || {},
  racksTotal: response.racks_total || 0
})

const ApiComponent = () => {
  const [refreshTime, setRefreshTime] = useRefresh()
  const [cityBikeData, lastFetched, error] = useCityBikeApi(refreshTime)
  return (
    <div>
      {error
        ? 'Error fetching stations'
        : (
          <>
            CityBikes available {cityBikeData.bikesTotalAvailable} pcs.<br />
            CityBike stations {cityBikeData.racksTotal} pcs.<br />
            <small>Last fetched {lastFetched}</small><br />
            <button onClick={setRefreshTime}>Refresh</button>
          </>
        )
      }
    </div>
  )
}

export default ApiComponent
