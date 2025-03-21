'use client';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import {
  CREATE_ORDER,
  FETCH_ORDERS,
} from '../sender/dashboard/redux/orderAction';
import { SENDER_PACKAGES } from '../sender/dashboard/redux/packagesAction';
import { TRIPS } from '../traveler/redux/tripsAction';
import { useAuth } from '@/contexts/AuthContext';

const CreateOrder = () => {
  const { senderPackages } = useSelector((state) => state.packages);
  const { trips } = useSelector((state) => state.trips);
  const { orders, fetchOrdersLoading, createOrderSuccess } = useSelector(
    (state) => state.order,
  );

  const [selectedSenderPackage, setSelectedSenderPackage] = useState('');
  const [selectedTrip, setSelectedTrip] = useState('');

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
      }}
    >
      <h2 className="text-lg font-bold mb-4">Order Management</h2>

      {/* Select a package */}
      <select
        value={selectedSenderPackage}
        onChange={(e) => setSelectedSenderPackage(e.target.value)}
        className="mb-4 p-2 border rounded w-64 bg-white text-gray-800"
      >
        <option value="">Select a Package</option>
        {senderPackages?.map((pkg) => (
          <option key={pkg.id} value={pkg.id}>
            {pkg.name}
          </option>
        ))}
      </select>

      {/* Select a trip/traveler package */}
      <select
        value={selectedTrip}
        onChange={(e) => setSelectedTrip(e.target.value)}
        className="mb-4 p-2 border rounded w-64 bg-white text-gray-800"
      >
        <option value="">Select a Trip</option>
        {trips?.map((trip) => (
          <option key={trip.id} value={trip.id}>
            {trip.name}
          </option>
        ))}
      </select>

      {/* Place Order Button */}
      <button
        onClick={handleCreateOrder}
        className="py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 mb-6"
      >
        Place Order
      </button>

      {/* Created Orders */}
      <h3 className="text-lg font-semibold mb-4">Created Orders</h3>
      {fetchOrdersLoading ? (
        <div className="flex justify-center items-center my-6">
          <p>Loading orders...</p>
        </div>
      ) : orders?.length > 0 ? (
        <table className="border-collapse border border-gray-300 w-full">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Order ID</th>
              <th className="border border-gray-300 px-4 py-2">
                Pickup Address
              </th>
              <th className="border border-gray-300 px-4 py-2">
                Delivery Address
              </th>
              <th className="border border-gray-300 px-4 py-2">Pickup Date</th>
              <th className="border border-gray-300 px-4 py-2">
                Delivery Date
              </th>
              <th className="border border-gray-300 px-4 py-2">Status</th>
              <th className="border border-gray-300 px-4 py-2">Payment</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.order_id}>
                <td className="border border-gray-300 px-4 py-2">
                  {order.order_id}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {order.pickup_address}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {order.delivery_address}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {new Date(order.pickup_datetime).toLocaleString()}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {new Date(order.delivery_datetime).toLocaleString()}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {order.order_status}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {order.payment_status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
};

export default CreateOrder;
