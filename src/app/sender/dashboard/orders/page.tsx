'use client';

import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { SENDER_PACKAGES } from '../redux/packagesAction';
import { TRIPS } from '@/app/traveler/redux/tripsAction';
import { CREATE_ORDER, FETCH_ORDERS } from '../redux/orderAction';
import GenericModal from './GenericModal';
import { CreateNewOrder } from './CreateNewOrder';

const CreateOrder = () => {
  const { senderPackages } = useSelector((state) => state.packages);
  const { trips } = useSelector((state) => state.trips);
  const { orders, fetchOrdersLoading, createOrderSuccess } = useSelector(
    (state) => state.order
  );

  const [selectedSenderPackage, setSelectedSenderPackage] = useState(null);
  const [selectedTrip, setSelectedTrip] = useState('');

  console.log('selected sender package: ', selectedSenderPackage);
  console.log('sender packages', senderPackages);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const dispatch = useDispatch();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      dispatch({
        type: SENDER_PACKAGES,
        payload: { senderId: user?.userId || 'defaultSenderId' },
      });
      dispatch({ type: TRIPS });
      dispatch({ type: FETCH_ORDERS });
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (createOrderSuccess) {
      dispatch({ type: FETCH_ORDERS });
    }
  }, [createOrderSuccess]);

  // handle create order
  const handleCreateOrder = () => {
    if (!selectedTrip || !selectedSenderPackage) {
      alert('Please select both a sender package and a trip.');
      return;
    }

    const payload = {
      senderId: user?.userId,
      traveler_package_id: selectedTrip,
      sender_package_id: selectedSenderPackage?.packageId,
      pickup_datetime: '2025-01-12T10:00:00Z',
      delivery_datetime: '2025-01-13T15:00:00Z',
      is_insured: true,
      order_instruction: 'Handle with care',
    };
    dispatch({ type: CREATE_ORDER, payload });
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        width: '85%',
        marginInline: 'auto',
      }}
    >
      {/* Search Traveler and place order modal */}
      <div>
        <GenericModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          title="Place Order"
        >
          <CreateNewOrder
            selectedSenderPackage={selectedSenderPackage}
            onClose={handleCloseModal}
          />
        </GenericModal>
      </div>

      {/* Header */}
      <div className="bg-gray-800 p-6 rounded-xl shadow-md mb-3 w-full border border-gray-700">
        <h2 className="text-xl font-semibold text-white mb-6">
          Order Management
        </h2>

        <div className="flex items-end space-x-6">
          {/* Select a package */}
          <div className="flex-1">
            <label
              htmlFor="sender-package"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Select a Package
            </label>
            <select
              id="sender-package"
              // value={selectedSenderPackage}
              // onChange={(e) => setSelectedSenderPackage(e.target.value)}
              value={selectedSenderPackage?.packageID || ''}
              onChange={(e) => {
                const selectedPackage = senderPackages.find(
                  (pkg) => pkg.packageID === e.target.value
                );
                setSelectedSenderPackage(selectedPackage);
              }}
              className="w-full p-3 border border-gray-700 bg-gray-900 text-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select a Package</option>
              {senderPackages?.map((pkg) => (
                <option key={pkg.packageID} value={pkg.packageID}>
                  {pkg.name}
                </option>
              ))}
            </select>
          </div>

          {/* Select a trip/traveler package */}
          {/* <div className="flex-1">
            <label
              htmlFor="trip-package"
              className="block text-sm font-medium text-gray-300 mb-2">
              Select a Trip
            </label>
            <select
              id="trip-package"
              value={selectedTrip}
              onChange={(e) => setSelectedTrip(e.target.value)}
              className="w-full p-3 border border-gray-700 bg-gray-900 text-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select a Trip</option>
              {trips?.map((trip) => (
                <option key={trip.id} value={trip.id}>
                  {trip.name}
                </option>
              ))}
            </select>
          </div> */}

          {/* Place Order Button */}
          <div>
            <button
              // onClick={handleCreateOrder}
              onClick={handleOpenModal}
              className="py-3 px-6 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
            >
              {/* Place Order */}
              Find Traveler
            </button>
          </div>
        </div>
      </div>

      {/* Orders section */}
      {fetchOrdersLoading ? (
        <div className="flex justify-center items-center my-6">
          <p className="text-gray-300">Loading orders...</p>
        </div>
      ) : orders?.length > 0 ? (
        <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
          <div className="p-6 border-b border-gray-700">
            <h2 className="text-xl font-semibold text-white">Created Orders</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-900/50">
                <tr>
                  <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider py-3 px-6">
                    Order ID
                  </th>
                  <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider py-3 px-6">
                    Pickup Address
                  </th>
                  <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider py-3 px-6">
                    Delivery Address
                  </th>
                  <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider py-3 px-6">
                    Pickup Date
                  </th>
                  <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider py-3 px-6">
                    Delivery Date
                  </th>
                  <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider py-3 px-6">
                    Status
                  </th>
                  <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider py-3 px-6">
                    Payment
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {orders.map((order) => (
                  <tr
                    key={order.order_id}
                    className="hover:bg-gray-700/50 transition-colors"
                  >
                    <td className="py-4 px-6">
                      <div className="text-sm font-medium text-white">
                        {order.order_id}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-sm text-gray-300">
                        {order.pickup_address}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-sm text-gray-300">
                        {order.delivery_address}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-sm text-gray-300">
                        {new Date(order.pickup_datetime).toLocaleString()}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-sm text-gray-300">
                        {new Date(order.delivery_datetime).toLocaleString()}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          order.order_status === 'Delivered'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {order.order_status}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-sm text-gray-300">
                        {order.payment_status}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-300">No orders yet.</p>
        </div>
      )}
    </div>
  );
};

export default CreateOrder;
