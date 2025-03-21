'use client';

import { FETCH_ORDERS } from '@/app/sender/dashboard/redux/orderAction';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { Check, TrashIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaCheck, FaEllipsisV, FaFlag } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';

const OrderStatusBg = {
  PENDING: 'text-yellow-500',
  ACCEPTED: 'text-green-300',
  REJECTED: 'text-red-500',
  IN_TRANSIT: 'text-blue-300',
  DELIVERED: 'text-green-500',
  CANCELLED: 'text-red-500',
};

const TravelerOrdersPage = () => {
  const { traveler } = useSelector((state) => state.trips);
  const { orders, fetchOrdersLoading } = useSelector((state) => state.order);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [otp, setOtp] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const t = useTranslations('TravelerDashboard.orders');

  console.log('traveler isStripeOnboarded', traveler.isStripeOnboarded);
  console.log('traveler stripe connect id', traveler.stripeAccountId);

  // dispatch
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: FETCH_ORDERS });
  }, []);

  const handleMarkDelivered = async (order) => {
    console.log('mark as delivered', order);
    // Check if the traveler is onboarded and has a Stripe account ID
    if (!traveler?.isStripeOnboarded || !traveler?.stripeAccountId) {
      alert(
        'You must complete Stripe onboarding before marking an order as delivered.',
      );
      return;
    }

    setSelectedOrder(order);
    setIsModalOpen(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}orders/send-otp`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: order?.sender?.email }),
        },
      );

      const data = await response.json();
      if (response.ok) {
        alert('OTP sent successfully');
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error('Failed to send OTP', error);
      alert('Failed to send OTP. Try again.');
    }
  };

  const handleOtpSubmit = async () => {
    if (!otp.trim()) {
      alert('Please enter the OTP');
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}orders/verify`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: selectedOrder?.sender?.email,
            order_id: selectedOrder?.order_id,
            otp: otp,
          }),
        },
      );

      const data = await response.json();

      if (response.ok) {
        setIsModalOpen(false);
        alert('OTP verified successfully. Order marked as Delivered.');
        setOtp('');
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error('OTP verification failed', error);
      alert('Failed to verify OTP. Please try again.');
    }
  };

  const inProgressOrders = orders.filter(
    (order) =>
      order.order_status === 'In Progress' || order.order_status === 'PENDING',
  );
  const showActionsColumn = inProgressOrders.length > 0;
  const router = useRouter();
  const handleRaiseIssue = (order_id: string) => {
    router.push(`/issue/create?order_id=${order_id}`);
  };
  if (orders.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-300">{t('noOrdersAssigned')}</p>
        <Link href={'/issue/create?order_id=randomid'}>Report</Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center p-6 w-4/5 mx-auto">
      <div className="bg-gray-800 rounded-xl border border-gray-700 w-full overflow-hidden">
        <div className="p-6 border-b border-gray-700">
          <h2 className="text-xl font-semibold text-white">
            {t('associatedOrders')}
          </h2>
        </div>
        <table className="w-full">
          <thead className="bg-gray-900/50">
            <tr>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-400 uppercase">
                {t('orderId')}
              </th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-400 uppercase">
                {t('pickupAddress')}
              </th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-400 uppercase">
                {t('deliveryAddress')}
              </th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-400 uppercase">
                {t('status')}
              </th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-400 uppercase">
                {t('payment')}
              </th>
              <th className="text-left text-xs font-medium text-gray-400 uppercase py-3 px-6">
                {t('actions')}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {orders.map((order) => (
              <tr
                key={order.order_id}
                className="hover:bg-gray-700/50 transition-colors"
              >
                <td className="py-4 px-6 text-sm font-medium text-white">
                  {order.order_id}
                </td>
                <td className="py-4 px-6 text-sm text-gray-300">
                  {order.origin?.city}
                </td>
                <td className="py-4 px-6 text-sm text-gray-300">
                  {order.destination?.city}
                </td>
                <td
                  className={`py-4 px-6 text-sm font-medium ${
                    OrderStatusBg[order.order_status]
                  }`}
                >
                  {order.order_status}
                </td>
                <td className="py-4 px-6 text-sm text-gray-300">
                  {order.payment_status}
                </td>
                <td className="py-4 px-6 place-items-center">
                  <Menu>
                    <MenuButton className="  py-1.5 px-3 focus:outline-none">
                      <FaEllipsisV />
                    </MenuButton>

                    <MenuItems
                      transition
                      anchor="bottom start"
                      className="w-48 origin-top-right rounded-xl border border-white/5 bg-slate-500/80 p-1 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
                    >
                      <MenuItem>
                        <button
                          onClick={() => handleRaiseIssue(order.order_id)}
                          className="group flex w-full items-center gap-2 rounded-[5px] py-1.5 px-3 data-[focus]:bg-slate-500/80 duration-300"
                        >
                          <FaFlag className="" />
                          Raise Issue
                        </button>
                      </MenuItem>

                      <div className="my-1 h-px bg-white/5" />
                      {order.order_status === 'PENDING' && (
                        <MenuItem>
                          <button
                            onClick={() => handleMarkDelivered(order)}
                            className="group flex w-full items-center gap-2 rounded-[5px] py-1.5 px-3 data-[focus]:bg-blue-500 duration-300"
                          >
                            <FaCheck />
                            {t('markAsDelivered')}
                          </button>
                        </MenuItem>
                      )}
                    </MenuItems>
                  </Menu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* OTP Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-lg font-semibold text-white mb-4">
              {t('enterOtp')}
            </h2>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full p-2 rounded bg-gray-900 text-white border border-gray-600 focus:outline-none"
              placeholder="Enter OTP"
            />
            <div className="mt-4 flex justify-end space-x-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
              >
                {t('cancel')}
              </button>
              <button
                onClick={handleOtpSubmit}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                {t('confirm')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TravelerOrdersPage;
