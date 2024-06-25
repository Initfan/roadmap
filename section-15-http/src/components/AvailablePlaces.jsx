import React, { useState, useEffect } from 'react';
import Places from './Places.jsx';
import Error from '../components/Error.jsx'
import { sortPlacesByDistance } from '../loc.js'
import { fetchAvailablePlaces } from '../http.js'

export default function AvailablePlaces({ onSelectPlace }) {
  const [isFetching, setIsFetching] = useState(true)
  const [availablePlaces, setAvailablePlaces] = useState([])
  const [error, setError] = useState()

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const places = await fetchAvailablePlaces()

        navigator.geolocation.getCurrentPosition((position) => {
          const sortedPLaces = sortPlacesByDistance(places, position.coords.latitude, position.coords.longitude)
          setAvailablePlaces(sortedPLaces)
          setIsFetching(false)
        })

        setIsFetching(false)
      } catch (error) {
        setError({ message: error.message || 'Could not fetch places, please try again later.' })
      }
      setIsFetching(false)

    }
    fetchPlaces()
  }, []);

  return !error
    ? <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isFetching}
      loadingText='Fetching place data...'
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
    : <Error title='An error occured!' message={error.message} />

}
