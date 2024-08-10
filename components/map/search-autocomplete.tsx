'use client'

import { FC, useEffect, useRef, useState } from 'react'
import { buildMapPlaceCard } from '@/app/map/utils'
import { mapZoom } from '@/app/map/constants'

interface Props {
  isLoaded: boolean
  map: google.maps.Map | null
  setSelectedAddress: (address: string) => void
}

const SearchAutocomplete: FC<Props> = ({
  isLoaded,
  map,
  setSelectedAddress
}) => {
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

  const setMarker = (place: google.maps.places.PlaceResult) => {
    if (!map) return

    const position = place.geometry?.location
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

  // Autocomplete changes
  const listenAutocompleteChanges = () => {
    autocomplete?.addListener('place_changed', () => {
      const place = autocomplete.getPlace()
      const position = place.geometry?.location

      setSelectedAddress(place.formatted_address as string)
      if (position) {
        setMarker(place)
      }
    })
  }

  useEffect(() => {
    if (autocomplete) {
      listenAutocompleteChanges()
    }
  }, [autocomplete])

  return (
    <input
      className="w-96 border-2 border-black rounded-2xl px-2 py-1 outline-0 text-black"
      type="text"
      ref={autocompleteRef}
    />
  )
}

export default SearchAutocomplete
