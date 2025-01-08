'use client'

import { createContext, useContext, useState, useCallback } from 'react'

interface SavedTripsContextType {
  isTripSaved: (tripId: string) => boolean
  saveTrip: (tripId: string) => void
  unsaveTrip: (tripId: string) => void
  savedTrips: string[]
}

const SavedTripsContext = createContext<SavedTripsContextType | undefined>(undefined)

export function SavedTripsProvider({ children }: { children: React.ReactNode }) {
  const [savedTrips, setSavedTrips] = useState<string[]>([])

  const isTripSaved = useCallback((tripId: string) => {
    return savedTrips.includes(tripId)
  }, [savedTrips])

  const saveTrip = useCallback((tripId: string) => {
    setSavedTrips(prev => [...prev, tripId])
  }, [])

  const unsaveTrip = useCallback((tripId: string) => {
    setSavedTrips(prev => prev.filter(id => id !== tripId))
  }, [])

  return (
    <SavedTripsContext.Provider value={{ isTripSaved, saveTrip, unsaveTrip, savedTrips }}>
      {children}
    </SavedTripsContext.Provider>
  )
}

export function useSavedTrips() {
  const context = useContext(SavedTripsContext)
  if (context === undefined) {
    throw new Error('useSavedTrips must be used within a SavedTripsProvider')
  }
  return context
}
