'use client'

import { Loader } from '@/components'
import { useJsApiLoader } from '@react-google-maps/api'
import { mapLibraries, mapOptions } from '@/app/map/constants'
import { useEffect, useRef, useState } from 'react'
import { SearchAutocomplete } from '@/components'

export const MapTemplate = () => {
  // Local states
  const [map, setMap] = useState<google.maps.Map | null>(null)
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null)

  // Refs & Map loader
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY as string,
    libraries: mapLibraries
  })
  const mapRef = useRef<HTMLDivElement>(null)

  const setupMap = () => {
    const gMap = new google.maps.Map(
      mapRef.current as HTMLDivElement,
      mapOptions
    )

    setMap(gMap)
  }

  // Setting the map
  useEffect(() => {
    if (isLoaded) {
      setupMap()
    }
  }, [isLoaded])

  return (
    <section className="w-full flex flex-col items-center">
      {isLoaded ? (
        <div className="w-full lg:w-8/12 flex flex-col items-center gap-y-3">
          <SearchAutocomplete
            isLoaded={isLoaded}
            map={map}
            onSelectAddress={setSelectedAddress}
          />

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
