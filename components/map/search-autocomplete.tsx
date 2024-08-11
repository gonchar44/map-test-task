'use client'

import { FC, useEffect, useRef, useState } from 'react'
import { buildMapPlaceCard } from '@/app/map/utils'
import { mapZoom } from '@/app/map/constants'
import { ErrorMessage } from '@/components'
import { useMapContext } from '@/contexts'

interface Props {
  isLoaded: boolean
  map: google.maps.Map | null
  onSelectAddress: (address: string) => void
}

export const SearchAutocomplete: FC<Props> = ({
  isLoaded,
  map,
  onSelectAddress
}) => {
  const { fetchHistoryData } = useMapContext()
  const [errorMessage, setErrorMessage] = useState('')
  const [autocomplete, setAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null)
  const autocompleteRef = useRef<HTMLInputElement>(null)

  const setupAutocomplete = () => {
    const options = { componentRestrictions: { country: 'dk' } }
    const gAutocomplete = new google.maps.places.Autocomplete(
      autocompleteRef.current as HTMLInputElement,
      options
    )

    setAutocomplete(gAutocomplete)
  }

  // Setting the autocomplete
  useEffect(() => {
    if (isLoaded) {
      setupAutocomplete()
    }
  }, [isLoaded])

  const setMarker = (
    place: google.maps.places.PlaceResult,
    position: google.maps.LatLng
  ) => {
    if (!map) return

    map.setCenter(position!)
    map.setZoom(mapZoom)

    const marker = new google.maps.marker.AdvancedMarkerElement({
      map,
      position,
      title: 'Marker 1'
    })

    // Opening of card info on address selection
    const { name, formatted_address, url } = place
    const placeCard = new google.maps.InfoWindow({
      position,
      content: buildMapPlaceCard({
        title: name!,
        address: formatted_address!,
        url: url!
      }),
      maxWidth: 220,
      minWidth: 220
    })

    placeCard.open({
      map,
      anchor: marker
    })
  }

  const saveToHistory = async (
    place: google.maps.places.PlaceResult,
    position: google.maps.LatLng
  ) => {
    setErrorMessage('')

    const { name, formatted_address } = place
    const { lng, lat } = position

    const data = new FormData()
    data.append('name', name!)
    data.append('formatted_address', formatted_address!)
    data.append('lng', `${lng()}`)
    data.append('lat', `${lat()}`)

    try {
      const response = await fetch('/api/places', {
        method: 'POST',
        body: data
      })
      if (!response.ok) {
        const errorData = await response.json()
        // TODO: solve throw issue
        throw new Error(errorData.error)
      }
      const result = await response.json()
      if (result) {
        fetchHistoryData().then()
      }
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message)
      }
    }
  }

  // Autocomplete changes
  const listenAutocompleteChanges = () => {
    autocomplete?.addListener('place_changed', () => {
      const place = autocomplete.getPlace()
      const position = place.geometry?.location

      onSelectAddress(place.formatted_address as string)
      if (position) {
        setMarker(place, position)
        saveToHistory(place, position)
      }
    })
  }

  useEffect(() => {
    if (autocomplete) {
      listenAutocompleteChanges()
    }
  }, [autocomplete])

  return (
    <div className="w-96 flex flex-col gap-y-1">
      <input
        className="w-full border-2 border-black rounded-2xl px-2 py-1 outline-0 text-black"
        type="text"
        ref={autocompleteRef}
      />

      {errorMessage && <ErrorMessage text={errorMessage} />}
    </div>
  )
}
