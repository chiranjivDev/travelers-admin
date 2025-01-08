'use client'

import React from 'react'
import { FiCheck } from 'react-icons/fi'

export interface CheckboxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, ...props }, ref) => {
    return (
      <div className="relative inline-block">
        <input
          type="checkbox"
          className="peer h-4 w-4 opacity-0 absolute"
          ref={ref}
          {...props}
        />
        <div className="h-4 w-4 rounded border border-gray-700 bg-gray-800 peer-checked:border-blue-500 peer-checked:bg-blue-500">
          <FiCheck className="h-3 w-3 text-white hidden peer-checked:block" />
        </div>
      </div>
    )
  }
)
Checkbox.displayName = 'Checkbox'

export { Checkbox }
