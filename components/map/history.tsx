'use client'

import {
  DeleteButton,
  DeletingConfirmation,
  ErrorMessage,
  Loader
} from '@/components'
import { useMapContext } from '@/contexts'
import { useState } from 'react'

export const History = () => {
  const [deletingItemId, setDeletingItemId] = useState<string | null>(null)
  const [isDeletingLoading, setIsDeletingLoading] = useState(false)
  const { isHistoryLoading, historyPlaces, historyError, fetchHistoryData } =
    useMapContext()

  const deleteById = async (id: string) => {
    setIsDeletingLoading(true)
    try {
      const response = await fetch(`/api/places/${id}`, {
        method: 'DELETE'
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
    } finally {
      setIsDeletingLoading(false)
    }
  }

  return (
    <div className="min-w-[350px] w-[350px]">
      <h4 className="text-h4">Search History</h4>

      {isHistoryLoading && !historyPlaces.length ? (
        <Loader />
      ) : (
        <>
          {!!historyPlaces.length ? (
            <ul className="flex flex-col gap-y-2 py-2">
              {historyPlaces.map((place) => (
                <li className="flex items-center gap-x-1" key={place.id}>
                  <span className="w-10/12 bg-primary-muted rounded text-primary-light p-2 block truncate">
                    {place.formatted_address}_{place.formatted_address}
                  </span>

                  {deletingItemId === place.id ? (
                    <DeletingConfirmation
                      isDisabled={isDeletingLoading}
                      onConfirm={() => deleteById(place.id)}
                      onCancel={() => setDeletingItemId(null)}
                    />
                  ) : (
                    <DeleteButton
                      onDelete={() => setDeletingItemId(place.id)}
                    />
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <span className="text-sm text-secondary-dark">
              History is empty
            </span>
          )}

          {historyError && <ErrorMessage text={historyError} />}
        </>
      )}
    </div>
  )
}
