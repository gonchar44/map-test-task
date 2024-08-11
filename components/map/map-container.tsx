'use client'

import { History, MapTemplate } from '@/components'
import { MapProvider } from '@/contexts'

export const MapContainer = () => (
  <MapProvider>
    <div className="flex flex-col-reverse items-center gap-y-5 xl:flex-row xl:items-start w-full p-5">
      <History />
      <MapTemplate />
    </div>
  </MapProvider>
)
