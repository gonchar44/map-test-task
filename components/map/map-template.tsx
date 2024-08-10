'use client'

import { Loader } from '@/components'
import { useJsApiLoader } from '@react-google-maps/api'
import { mapLibraries, mapOptions } from '@/app/map/constants'
import { useEffect, useRef, useState } from 'react'
import Field from '@/components/map/field'
import { buildMapPlaceCard } from '@/app/map/utils'

export const MapTemplate = () => {
  // Local states
  const [map, setMap] = useState<google.maps.Map | null>(null)
  const [autocomplete, setAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null)
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null)

  // Refs & Map loader
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY as string,
    libraries: mapLibraries
  })
  const mapRef = useRef<HTMLDivElement>(null)
  const autocompleteRef = useRef<HTMLInputElement>(null)

  const setupMap = () => {
    const gMap = new google.maps.Map(
      mapRef.current as HTMLDivElement,
      mapOptions
    )

    setMap(gMap)
  }

  const setupAutocomplete = () => {
    const options = { componentRestrictions: { country: 'dk' } }
    const gAutocomplete = new google.maps.places.Autocomplete(
      autocompleteRef.current as HTMLInputElement,
      options
    )

    setAutocomplete(gAutocomplete)
  }

  // Setting the map
  useEffect(() => {
    if (isLoaded) {
      setupMap()
      setupAutocomplete()
    }
  }, [isLoaded])

  const setMarker = (place: google.maps.places.PlaceResult) => {
    if (!map) return

    const position = place.geometry?.location
    map.setCenter(position!)

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
    <section className="w-full flex flex-col items-center py-5">
      {isLoaded ? (
        <div className="w-full lg:w-8/12 flex flex-col items-center gap-y-3">
          {/*Search box*/}
          <Field ref={autocompleteRef} />

          {selectedAddress && (
            <span className="font-bold text-black">{selectedAddress}</span>
          )}

          {/*Map block*/}
          <div
            className="w-full 2xl:w-8/12 h-[600px] 2xl:h-[800px]"
            ref={mapRef}
          ></div>
        </div>
      ) : (
        <Loader />
      )}
    </section>
  )
}
