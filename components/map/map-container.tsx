'use client'

import { History, MapTemplate } from '@/components'
import { MapProvider } from '@/contexts'

export const MapContainer = () => (
  <MapProvider>
    <div className="flex w-full p-5">
      <History />
      <MapTemplate />
    </div>
  </MapProvider>
)
