import React from 'react';
import Places from './Places.jsx';
import Error from '../components/Error.jsx'
import { sortPlacesByDistance } from '../loc.js'
import { fetchAvailablePlaces } from '../http.js'
import { useFetch } from '../hooks/useFetch.js';

async function fetchSortedPlaces() {
  const places = await fetchAvailablePlaces();

  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition((position) => {
      const sortedPLaces = sortPlacesByDistance(
        places,
        position.coords.latitude,
        position.coords.longitude
      );

      resolve(sortedPLaces)
    })
  })

}


export default function AvailablePlaces({ onSelectPlace }) {
  const { isFetching, error, data: availablePlaces } = useFetch(fetchSortedPlaces, [])

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
