'use client'

import { ErrorMessage, Loader } from '@/components'
import { useMapContext } from '@/contexts'

export const History = () => {
  const { isHistoryLoading, historyPlaces, historyError } = useMapContext()

  return (
    <div className="w-72">
      <h4 className="text-h4">Search History</h4>

      {isHistoryLoading && <Loader />}

      {historyError && <ErrorMessage text={historyError} />}

      {historyPlaces && (
        <ul className="flex flex-col gap-y-2 py-2">
          {historyPlaces.map((place) => (
            <li
              className="flex justify-between items-center bg-primary-muted rounded text-primary-light p-2"
              key={place.id}
            >
              <span className="block truncate">
                {place.formatted_address}_{place.formatted_address}
              </span>
              <button>Del</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
