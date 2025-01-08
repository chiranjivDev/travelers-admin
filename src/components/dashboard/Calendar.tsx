'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiChevronLeft, FiChevronRight, FiCalendar } from 'react-icons/fi'

interface Event {
  id: string
  title: string
  type: 'trip' | 'delivery'
  date: string
  status: string
}

interface CalendarProps {
  events: Event[]
  onEventClick: (event: Event) => void
}

export default function Calendar({ events, onEventClick }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate()

  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay()

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)))
  }

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)))
  }

  const getEventsForDate = (date: number) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(date).padStart(2, '0')}`
    return events.filter(event => event.date === dateStr)
  }

  return (
    <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
      {/* Calendar Header */}
      <div className="p-6 border-b border-gray-700">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white flex items-center">
            <FiCalendar className="w-5 h-5 mr-2" />
            Schedule
          </h2>
          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prevMonth}
              className="p-2 rounded-lg bg-gray-700 text-gray-300 hover:bg-gray-600"
            >
              <FiChevronLeft className="w-5 h-5" />
            </motion.button>
            <span className="text-white font-medium">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </span>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={nextMonth}
              className="p-2 rounded-lg bg-gray-700 text-gray-300 hover:bg-gray-600"
            >
              <FiChevronRight className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="p-6">
        {/* Weekday Headers */}
        <div className="grid grid-cols-7 gap-2 mb-4">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="text-center text-sm font-medium text-gray-400">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7 gap-2">
          {/* Empty cells for days before the first of the month */}
          {Array.from({ length: firstDayOfMonth }).map((_, index) => (
            <div key={`empty-${index}`} className="aspect-square" />
          ))}

          {/* Actual calendar days */}
          {Array.from({ length: daysInMonth }).map((_, index) => {
            const date = index + 1
            const dateEvents = getEventsForDate(date)
            const isSelected = selectedDate?.getDate() === date &&
                             selectedDate?.getMonth() === currentDate.getMonth() &&
                             selectedDate?.getFullYear() === currentDate.getFullYear()

            return (
              <motion.div
                key={date}
                whileHover={{ scale: 1.05 }}
                className={`aspect-square p-2 rounded-lg border ${
                  isSelected
                    ? 'border-blue-500 bg-blue-500/20'
                    : 'border-gray-700 hover:border-gray-600'
                } cursor-pointer relative`}
                onClick={() => setSelectedDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), date))}
              >
                <div className="text-sm font-medium text-gray-300">{date}</div>
                {dateEvents.length > 0 && (
                  <div className="absolute bottom-2 left-2 right-2">
                    <div className="flex gap-1">
                      {dateEvents.map((event) => (
                        <div
                          key={event.id}
                          className={`h-1 rounded-full flex-1 ${
                            event.type === 'trip' ? 'bg-purple-500' : 'bg-blue-500'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Selected Date Events */}
      <AnimatePresence>
        {selectedDate && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-gray-700"
          >
            <div className="p-6">
              <h3 className="text-lg font-medium text-white mb-4">
                Events for {selectedDate.toLocaleDateString()}
              </h3>
              <div className="space-y-2">
                {getEventsForDate(selectedDate.getDate()).map((event) => (
                  <motion.div
                    key={event.id}
                    whileHover={{ scale: 1.02 }}
                    className="p-4 rounded-lg bg-gray-700 cursor-pointer"
                    onClick={() => onEventClick(event)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-medium text-white">{event.title}</div>
                        <div className="text-xs text-gray-400 capitalize">{event.type}</div>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        event.status === 'confirmed'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {event.status}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
