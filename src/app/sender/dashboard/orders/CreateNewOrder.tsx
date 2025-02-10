'use client';

import { SEARCH_TRAVELER_PACKAGE } from '@/app/traveler/redux/tripsAction';
import { useDebounce } from '@/hooks/useDebounce';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CREATE_ORDER } from '../redux/orderAction';
import { clearOrdersState } from '../redux/orderSlice';
import { useRouter } from 'next/navigation';

export const CreateNewOrder = ({ selectedSenderPackage, onClose }: any) => {
  const { trips } = useSelector((state) => state.trips);
  const { createOrderSuccess, createOrderLoading } = useSelector(
    (state) => state.order
  );

  const [selectedTrip, setSelectedTrip] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const dispatch = useDispatch();
  const router = useRouter();

  console.log('selected sender package: ', selectedSenderPackage);
  console.log('trips', trips);
  console.log('selected trip', selectedTrip);

  useEffect(() => {
    dispatch({
      type: SEARCH_TRAVELER_PACKAGE,
      payload: {
        searchKeyword: '',
        // startDate: selectedSenderPackage?.preferredDate,
        startDate: selectedSenderPackage?.pickupDate,
        endDate: selectedSenderPackage?.deliveryDate,
      },
    });
    console.log('dispatching search');
  }, [dispatch, selectedSenderPackage.packageID]);

  // Debounce the search query
  const debouncedSearch = useDebounce(searchQuery, 700);

  // Handle search input change
  const handleSearchChange = (e) => {
    const keyword = e.target.value;
    setSearchQuery(keyword);
  };

  // Dispatch action when debounced search value changes
  useEffect(() => {
    dispatch({
      type: SEARCH_TRAVELER_PACKAGE,
      payload: {
        searchKeyword: debouncedSearch,
        // startDate: selectedSenderPackage?.preferredDate,
        startDate: selectedSenderPackage?.pickupDate,
        endDate: selectedSenderPackage?.deliveryDate,
      },
    });
  }, [debouncedSearch, dispatch]);

  // Handle Place Order
  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (!selectedTrip) {
      alert('Please select a traveler package.');
      return;
    }
    const payload = {
      senderId: selectedSenderPackage?.sender?.id,
      traveler_package_id: selectedTrip,
      sender_package_id: selectedSenderPackage?.packageID,
    };
    dispatch({ type: CREATE_ORDER, payload });
  };

  // on success navigate to home screen
  useEffect(() => {
    if (createOrderSuccess) {
      onClose();
      dispatch(clearOrdersState());
    }
  }, [createOrderSuccess]);

  // Handle Navigate to Chat
  const handleChatClick = useCallback(
    (travelerId: string) => {
      console.log('traveler id:', travelerId);
      router.push(`/chat?user=${travelerId}`);
    },
    [router]
  );

  // navigate to simple chats
  // const handleChatClick = useCallback(
  //   (travelerId: string) => {
  //     console.log('traveler id:', travelerId);
  //     router.push(`/simple-chat`);
  //   },
  //   [router]
  // );

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        Select a suitable traveler and place order
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
        className={`${trips.length === 0 ? '' : 'h-96'} overflow-y-auto custom-scrollbar space-y-4 mt-6 mb-6`}
      >
        {trips.length === 0 ? (
          <div className="text-center text-gray-600">
            No Traveler Packages found!
          </div>
        ) : (
          trips.map((trip) => (
            <div
              key={trip.id}
              className={`flex items-start p-4 bg-white rounded-lg border border-gray-200 hover:shadow-sm cursor-pointer ${
                selectedTrip === trip.id
                  ? 'bg-blue-100 border-2 border-green-500'
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
                  {trip.name}
                </h3>
                <p className="text-sm text-gray-500 mb-1">📩 {trip.email}</p>
                <p className="text-sm text-gray-500 mb-1">📞 {trip.phone}</p>
                <p className="text-sm text-gray-500 mb-1">
                  🛬 Arrival: {trip.tripDetails.arrivalLocation} on{' '}
                  {trip.tripDetails.arrivalDateTime}
                </p>
                <p className="text-sm text-gray-500">
                  🛫 Departure: {trip.tripDetails.departureLocation} on{' '}
                  {trip.tripDetails.departureDateTime}
                </p>
              </div>
              {/* Chat Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Prevents selecting the trip when clicking chat
                  handleChatClick(trip.traveler.id);
                }}
                className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:ring-2 focus:ring-blue-300 transition-all"
              >
                💬
              </button>
            </div>
          ))
        )}
      </div>

      {/* place order button */}
      <div className="text-center">
        <button
          onClick={handlePlaceOrder}
          disabled={!selectedTrip || createOrderLoading}
          className={`px-6 py-3 text-white font-semibold rounded-lg shadow-md ${
            selectedTrip && !createOrderLoading
              ? 'bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-400'
              : 'bg-gray-400 cursor-not-allowed'
          }`}
        >
          {createOrderLoading ? 'Loading...' : 'Place Order'}
        </button>
      </div>
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
