import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface SavedPackagesContextType {
  savedPackages: string[]
  savePackage: (packageId: string) => void
  unsavePackage: (packageId: string) => void
  isPackageSaved: (packageId: string) => boolean
  getSavedPackagesCount: () => number
}

const SavedPackagesContext = createContext<SavedPackagesContextType | undefined>(undefined)

export function SavedPackagesProvider({ children }: { children: ReactNode }) {
  const [savedPackages, setSavedPackages] = useState<string[]>([])

  // Load saved packages from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('savedPackages')
    if (saved) {
      setSavedPackages(JSON.parse(saved))
    }
  }, [])

  // Save to localStorage whenever the list changes
  useEffect(() => {
    localStorage.setItem('savedPackages', JSON.stringify(savedPackages))
  }, [savedPackages])

  const savePackage = (packageId: string) => {
    setSavedPackages(prev => {
      if (!prev.includes(packageId)) {
        return [...prev, packageId]
      }
      return prev
    })
  }

  const unsavePackage = (packageId: string) => {
    setSavedPackages(prev => prev.filter(id => id !== packageId))
  }

  const isPackageSaved = (packageId: string) => {
    return savedPackages.includes(packageId)
  }

  const getSavedPackagesCount = () => {
    return savedPackages.length
  }

  return (
    <SavedPackagesContext.Provider
      value={{
        savedPackages,
        savePackage,
        unsavePackage,
        isPackageSaved,
        getSavedPackagesCount,
      }}
    >
      {children}
    </SavedPackagesContext.Provider>
  )
}

export function useSavedPackages() {
  const context = useContext(SavedPackagesContext)
  if (context === undefined) {
    throw new Error('useSavedPackages must be used within a SavedPackagesProvider')
  }
  return context
}
