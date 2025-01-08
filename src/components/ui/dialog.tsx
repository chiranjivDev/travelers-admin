'use client'

import React from 'react'
import { FiX } from 'react-icons/fi'

interface DialogProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  title?: string
  description?: string
}

export function Dialog({
  isOpen,
  onClose,
  children,
  title,
  description
}: DialogProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />

      {/* Dialog */}
      <div className="relative bg-gray-800 rounded-lg shadow-xl max-w-md w-full mx-4">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-300"
        >
          <FiX className="h-5 w-5" />
        </button>

        {/* Content */}
        <div className="p-6">
          {title && (
            <h2 className="text-lg font-medium text-gray-200 mb-2">
              {title}
            </h2>
          )}
          {description && (
            <p className="text-sm text-gray-400 mb-4">{description}</p>
          )}
          {children}
        </div>
      </div>
    </div>
  )
}

interface DialogTriggerProps {
  children: React.ReactNode
  onClick: () => void
}

export function DialogTrigger({ children, onClick }: DialogTriggerProps) {
  return (
    <div onClick={onClick} className="cursor-pointer">
      {children}
    </div>
  )
}

interface DialogContentProps {
  children: React.ReactNode
  className?: string
}

export function DialogContent({
  children,
  className = ''
}: DialogContentProps) {
  return <div className={className}>{children}</div>
}

interface DialogActionsProps {
  children: React.ReactNode
  className?: string
}

export function DialogActions({
  children,
  className = ''
}: DialogActionsProps) {
  return (
    <div
      className={`mt-6 flex justify-end space-x-4 ${className}`}
    >
      {children}
    </div>
  )
}
