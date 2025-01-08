'use client';

import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import {
  FiX,
  FiMapPin,
  FiCalendar,
  FiPackage,
  FiDollarSign,
  FiStar,
  FiShield,
  FiClock,
  FiMessageSquare,
  FiInfo,
} from 'react-icons/fi';
import { format, parseISO } from 'date-fns';
import { Package } from '@/data/mockPackages';

const formatDate = (dateString: string) => {
  try {
    return format(parseISO(dateString), 'MMM d, yyyy');
  } catch (error) {
    console.error('Invalid date format:', dateString);
    return 'Invalid date';
  }
};

interface PackageDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  package: Package;
  onChatClick?: (pkg: Package) => void;
}

export default function PackageDetailsModal({
  isOpen,
  onClose,
  package: pkg,
  onChatClick,
}: PackageDetailsModalProps) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-gray-800 p-6 text-left align-middle shadow-xl transition-all">
                <div className="flex justify-between items-start mb-6">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium text-white"
                  >
                    Package Details
                  </Dialog.Title>
                  <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <FiX className="w-5 h-5" />
                  </button>
                </div>

                {/* Sender Information */}
                <div className="mb-6">
                  <h4 className="text-white font-medium mb-3">
                    Sender Information
                  </h4>
                  <div className="bg-gray-700 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                          {pkg.sender.name.charAt(0)}
                        </div>
                        <div>
                          <h5 className="text-white font-medium">
                            {pkg.sender.name}
                          </h5>
                          <div className="flex items-center space-x-2 text-sm text-gray-300">
                            <div className="flex items-center">
                              <FiStar className="text-yellow-400 mr-1" />
                              {/* Commented out the actual code */}
                              {/* <span>{pkg.sender.rating.toFixed(1)}</span> */}
                              <span>
                                {pkg.sender?.rating
                                  ? pkg.sender.rating.toFixed(1)
                                  : 'NA'}
                              </span>
                            </div>
                            <span>•</span>
                            <span>{pkg.sender.reviewCount} reviews</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Route Information */}
                <div className="mb-6">
                  <h4 className="text-white font-medium mb-3">
                    Route Information
                  </h4>
                  <div className="bg-gray-700 rounded-lg p-4 space-y-4">
                    <div className="flex items-center space-x-2">
                      <FiMapPin className="text-gray-400" />
                      <div>
                        <div className="text-white">
                          From: {pkg.pickupLocation}
                        </div>
                        <div className="text-white">
                          To: {pkg.deliveryLocation}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Package Details */}
                <div className="mb-6">
                  <h4 className="text-white font-medium mb-3">
                    Package Details
                  </h4>
                  <div className="bg-gray-700 rounded-lg p-4 grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-gray-400 mb-2">Delivery Date</div>
                      <div className="text-white flex items-center">
                        <FiCalendar className="mr-2" />
                        {formatDate(pkg.deliveryDate)}
                      </div>
                    </div>
                    <div>
                      <div className="text-gray-400 mb-2">Package Size</div>
                      <div className="text-white flex items-center">
                        <FiPackage className="mr-2" />
                        {pkg.dimensions}
                      </div>
                    </div>
                    <div>
                      <div className="text-gray-400 mb-2">Weight</div>
                      <div className="text-white">{pkg.weight} kg</div>
                    </div>
                    <div>
                      <div className="text-gray-400 mb-2">Category</div>
                      <div className="text-white">
                        {pkg.category.name || 'Not specified'}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description & Instructions */}
                <div className="mb-6">
                  <h4 className="text-white font-medium mb-3">
                    Description & Instructions
                  </h4>
                  <div className="bg-gray-700 rounded-lg p-4 space-y-4">
                    <div>
                      <div className="text-gray-400 mb-2">Description</div>
                      <p className="text-white">{pkg.description}</p>
                    </div>
                    {pkg.specialInstructions && (
                      <div>
                        <div className="text-gray-400 mb-2">
                          Special Instructions
                        </div>
                        <p className="text-white">{pkg.specialInstructions}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Features */}
                {(pkg.insurance || pkg.priority || pkg.tracking) && (
                  <div className="mb-6">
                    <h4 className="text-white font-medium mb-3">Features</h4>
                    <div className="bg-gray-700 rounded-lg p-4">
                      <div className="flex flex-wrap gap-3">
                        {pkg.insurance && (
                          <div className="bg-gray-600 rounded-lg px-3 py-2 text-sm text-white flex items-center">
                            <FiShield className="mr-2 text-blue-400" />
                            Insurance Coverage
                          </div>
                        )}
                        {pkg.priority && (
                          <div className="bg-gray-600 rounded-lg px-3 py-2 text-sm text-white flex items-center">
                            <FiClock className="mr-2 text-purple-400" />
                            Priority Delivery
                          </div>
                        )}
                        {pkg.tracking && (
                          <div className="bg-gray-600 rounded-lg px-3 py-2 text-sm text-white flex items-center">
                            <FiInfo className="mr-2 text-green-400" />
                            Package Tracking
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Price */}
                <div className="mb-6">
                  <h4 className="text-white font-medium mb-3">Price</h4>
                  <div className="bg-gray-700 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="text-gray-400">Total Price</div>
                      <div className="text-2xl font-bold text-white">
                        ${pkg.price}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-4">
                  <button
                    onClick={() => onChatClick?.(pkg)}
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
                  >
                    <FiMessageSquare className="w-5 h-5 mr-2" />
                    Chat with Sender
                  </button>
                  <button
                    onClick={onClose}
                    className="flex-1 bg-gray-700 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
