import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from 'react'
import { Place } from '@/types'

export interface ProviderProps {
  children: ReactNode
}

export interface MapContextProps {
  isHistoryLoading: boolean
  historyPlaces: Place[]
  historyError: string
  selectedHistoryPlace: Place | null
  setSelectedHistoryPlace: (value: Place | null) => void
  fetchHistoryData: () => Promise<void>
}

export const MapContext = createContext<MapContextProps | null>(null)

export const MapProvider = ({ children }: ProviderProps) => {
  const [isHistoryLoading, setIsHistoryLoading] = useState(false)
  const [historyPlaces, setHistoryPlaces] = useState<Place[]>([])
  const [historyError, setHistoryError] = useState('')
  const [selectedHistoryPlace, setSelectedHistoryPlace] =
    useState<Place | null>(null)

  const fetchHistoryData = async () => {
    setIsHistoryLoading(true)
    try {
      const response = await fetch('/api/places')
      if (!response.ok) {
        const errorData = await response.json()
        // TODO: solve throw issue
        throw new Error(errorData.error)
      }

      const result = await response.json()
      setHistoryPlaces(result.data)
    } catch (error) {
      if (error instanceof Error) {
        setHistoryError(error.message)
      }
    } finally {
      setIsHistoryLoading(false)
    }
  }

  useEffect(() => {
    fetchHistoryData().then()
  }, [])

  return (
    <MapContext.Provider
      value={{
        isHistoryLoading,
        historyPlaces,
        historyError,
        selectedHistoryPlace,
        setSelectedHistoryPlace,
        fetchHistoryData
      }}
    >
      {children}
    </MapContext.Provider>
  )
}

export const useMapContext = () => {
  const context = useContext(MapContext)
  if (!context) {
    throw new Error('useMapContext must be used within a MapProvider')
  }

  return context
}
