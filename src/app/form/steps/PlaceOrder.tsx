'use client';
import { CREATE_ORDER } from '@/app/sender/dashboard/redux/orderAction';
import { clearOrdersState } from '@/app/sender/dashboard/redux/orderSlice';
import { SEARCH_TRAVELER_PACKAGE } from '@/app/traveler/redux/tripsAction';
import { useDebounce } from '@/hooks/useDebounce';
import { useRouter } from 'next/navigation';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const PlaceOrder = () => {
  const [selectedTrip, setSelectedTrip] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  // redux state
  const { trips } = useSelector((state) => state.trips);
  const { createOrderSuccess } = useSelector((state) => state.order);
  const { sendPackageResponse } = useSelector((state) => state.packages);

  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (!trips.length) {
      dispatch({
        type: SEARCH_TRAVELER_PACKAGE,
        payload: {
          searchKeyword: '',
          // startDate: sendPackageResponse?.preferredDate,
          startDate: sendPackageResponse?.pickupDate,
          endDate: sendPackageResponse?.deliveryDate,
        },
      });
    }
  }, [dispatch]);

  // handle create Order
  const handleCreateOrder = (e) => {
    e.preventDefault();
    if (!selectedTrip) {
      alert('Please select a traveler package.');
      return;
    }
    const payload = {
      senderId: sendPackageResponse?.sender?.id,
      traveler_package_id: selectedTrip,
      sender_package_id: sendPackageResponse?.packageID,
    };
    dispatch({ type: CREATE_ORDER, payload });
  };

  // on success navigate to home screen
  useEffect(() => {
    if (createOrderSuccess) {
      router.push('/');
      dispatch(clearOrdersState());
    }
  }, [createOrderSuccess]);

  // Debounce the search query
  const debouncedSearch = useDebounce(searchQuery, 700);
  // Handle search input change
  const handleSearchChange = (e) => {
    const keyword = e.target.value;
    setSearchQuery(keyword);
  };

  // Dispatch action when debounced search value changes
  useEffect(() => {
    // if (debouncedSearch) {
    dispatch({
      type: SEARCH_TRAVELER_PACKAGE,
      payload: {
        searchKeyword: debouncedSearch,
        // startDate: sendPackageResponse?.preferredDate,
        startDate: sendPackageResponse?.pickupDate,
        endDate: sendPackageResponse?.deliveryDate,
      },
    });
    // }
  }, [debouncedSearch, dispatch]);

  // handle cancel
  const handleCancel = (e) => {
    e.preventDefault();
    router.push('/');

    // dispatch({
    //   type: SEARCH_TRAVELER_PACKAGE,
    //   payload: {
    //     searchKeyword: '',
    //     startDate: '2025-01-20',
    //     endDate: '2025-01-21',
    //   },
    // });

    // dispatch({
    //   type: SEARCH_TRAVELER_PACKAGE,
    //   payload: {
    //     searchKeyword: '',
    //     startDate: sendPackageResponse?.preferredDate,
    //     endDate: sendPackageResponse?.deliveryDate,
    //   },
    // });
    console.log('create package response', sendPackageResponse);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        Select a Traveler and Place Your Order
      </h2>

      {/* Search Bar UI */}
      <div className="mb-6">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search for a Traveler package"
          className="p-3 border border-gray-300 rounded-lg w-full bg-white text-gray-700 shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
        />
      </div>

      {/* Vertical Scroll List of Traveler Packages mock api reponse */}
      <div
        className={`${trips.length === 0 ? '' : 'h-96'} overflow-y-auto space-y-4 mt-6 mb-6`}
      >
        {trips.length === 0 ? (
          <div className="text-center text-gray-600">
            No Traveler Packages found!
          </div>
        ) : (
          trips.map((trip) => (
            <div
              key={trip.id}
              className={`flex items-start p-4 bg-white rounded-lg shadow-md hover:shadow-lg cursor-pointer ${
                selectedTrip === trip.id
                  ? 'bg-blue-100 border-2 border-green-500' // Design for selected trip
                  : ''
              }`}
              onClick={() => setSelectedTrip(trip.id)}
            >
              <div className="flex-shrink-0">
                <img
                  src="https://images.unsplash.com/photo-1521727857535-28d2047314ac?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt={trip.name}
                  className="w-16 h-16 object-cover rounded-full self-start"
                />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-600">
                  {trip.name} by {trip.traveler.name}
                </h3>
                <p className="text-sm text-gray-500">{trip.email}</p>
                <p className="text-sm text-gray-500">{trip.phone}</p>
                <p className="text-sm text-gray-500">
                  Arrival: {trip.tripDetails.arrivalLocation} on{' '}
                  {trip.tripDetails.arrivalDateTime}
                </p>
                <p className="text-sm text-gray-500">
                  Departure: {trip.tripDetails.departureLocation} on{' '}
                  {trip.tripDetails.departureDateTime}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Button Container */}
      <div className="flex justify-end space-x-4">
        {/* Cancel Button */}
        <button
          onClick={handleCancel}
          className="py-3 px-6 bg-red-600 text-white font-medium rounded-lg shadow-md hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
        >
          Cancel
        </button>

        {/* Place Order Button */}
        <button
          onClick={handleCreateOrder}
          className={`py-3 px-6 font-medium rounded-lg shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-blue-400 
    ${selectedTrip ? 'bg-green-600 text-white hover:bg-green-500' : 'bg-gray-400 text-gray-700 cursor-not-allowed'}`}
          disabled={!selectedTrip}
        >
          Place Order
        </button>
      </div>

      {/* Dropdown  */}
      {/* Select a trip/traveler package */}
      {/* <select
        value={selectedTrip}
        onChange={(e) => setSelectedTrip(e.target.value)}
        className="mb-6 p-3 border border-gray-300 rounded-lg w-full bg-white text-gray-700 shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
      >
        <option value="">Select a Traveler</option>
        {trips?.map((trip) => (
          <option key={trip.id} value={trip.id}>
            {trip.name}
          </option>
        ))}
      </select> */}
    </div>
  );
};

const mockApiTrips = [
  {
    id: 'faee5359-9cbd-48bd-966d-02b50a554d57',
    name: 'Package Name 1',
    email: 'cvt1@gmail.com',
    phone: '+918719087038',
    contactMethods: 'Email',
    availability: 'Morning',
    tripDetails: {
      arrivalDateTime: '2025-01-15',
      arrivalLocation: 'Munich, Germany',
      departureDateTime: '2025-01-14',
      departureLocation: 'Frankfurt, Germany',
    },
    traveler: {
      name: 'cvt1',
      phone: '+1234567890',
    },
  },
  {
    id: 'b6eead62-3c98-429e-9804-063ea79b5a3d',
    name: 'Package Name 2',
    email: 'cvt2@gmail.com',
    phone: '+918719087039',
    contactMethods: 'Phone',
    availability: 'Afternoon',
    tripDetails: {
      arrivalDateTime: '2025-02-20',
      arrivalLocation: 'Paris, France',
      departureDateTime: '2025-02-19',
      departureLocation: 'Berlin, Germany',
    },
    traveler: {
      name: 'cvt2',
      phone: '+1234567891',
    },
  },
  {
    id: '93f89f65-0a1f-4790-9373-b32fc87a39d4',
    name: 'Package Name 3',
    email: 'cvt3@gmail.com',
    phone: '+918719087040',
    contactMethods: 'SMS',
    availability: 'Evening',
    tripDetails: {
      arrivalDateTime: '2025-03-05',
      arrivalLocation: 'Rome, Italy',
      departureDateTime: '2025-03-04',
      departureLocation: 'Barcelona, Spain',
    },
    traveler: {
      name: 'cvt3',
      phone: '+1234567892',
    },
  },
  {
    id: 'c1e3a91e-fd7d-4706-a0ed-ef8d8f0843a5',
    name: 'Package Name 4',
    email: 'cvt4@gmail.com',
    phone: '+918719087041',
    contactMethods: 'Email',
    availability: 'Morning',
    tripDetails: {
      arrivalDateTime: '2025-04-10',
      arrivalLocation: 'New York, USA',
      departureDateTime: '2025-04-09',
      departureLocation: 'Los Angeles, USA',
    },
    traveler: {
      name: 'cvt4',
      phone: '+1234567893',
    },
  },
  {
    id: '8c4b1b6f-d58c-4eaf-9221-cf24351539be',
    name: 'Package Name 5',
    email: 'cvt5@gmail.com',
    phone: '+918719087042',
    contactMethods: 'Phone',
    availability: 'Afternoon',
    tripDetails: {
      arrivalDateTime: '2025-05-25',
      arrivalLocation: 'Tokyo, Japan',
      departureDateTime: '2025-05-24',
      departureLocation: 'Seoul, South Korea',
    },
    traveler: {
      name: 'cvt5',
      phone: '+1234567894',
    },
  },
];
