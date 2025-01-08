'use client'

import React, { useState } from 'react'
import { FiChevronDown, FiChevronUp, FiCheck } from 'react-icons/fi'

export interface SelectOption {
  value: string
  label: string
  description?: string
  icon?: string
}

interface SelectProps {
  value: string
  onChange: (value: string) => void
  options: SelectOption[]
  placeholder?: string
  containerClassName?: string
  optionClassName?: string
  renderOption?: (option: SelectOption) => React.ReactNode
}

export const Select: React.FC<SelectProps> = ({
  value,
  onChange,
  options,
  placeholder = "Select...",
  containerClassName = "",
  optionClassName = "",
  renderOption
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const selectedOption = options.find(option => option.value === value)

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${containerClassName}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl text-left flex items-center justify-between text-white hover:bg-gray-700/50 transition-all duration-300"
      >
        {selectedOption ? (
          renderOption ? (
            renderOption(selectedOption)
          ) : (
            selectedOption.label
          )
        ) : (
          <span className="text-gray-400">{placeholder}</span>
        )}
        <FiChevronDown className={`w-5 h-5 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-gray-800 border border-gray-700 rounded-xl shadow-xl overflow-hidden">
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className={optionClassName}
            >
              {renderOption ? renderOption(option) : option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
