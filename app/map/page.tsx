import { MapContainer } from '@/components'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Find your address',
  description: 'Find your address quickly and conveniently'
}

const Map = () => (
  <main className="flex flex-col items-center p-5">
    <h3 className="text-h3">Find your address</h3>

    <MapContainer />
  </main>
)

export default Map
