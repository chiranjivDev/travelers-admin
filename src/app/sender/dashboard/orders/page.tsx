'use client';

import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { SENDER_PACKAGES } from '../redux/packagesAction';
import { TRIPS } from '@/app/traveler/redux/tripsAction';
import { FETCH_ORDERS } from '../redux/orderAction';
import GenericModal from './GenericModal';
import { CreateNewOrder } from './CreateNewOrder';
import { useTranslations } from 'next-intl';
import { FaEllipsisV, FaFlag } from 'react-icons/fa';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { ChevronDownIcon, PencilIcon, TrashIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

const CreateOrder = () => {
  const { senderPackages } = useSelector((state) => state.packages);
  const { orders, fetchOrdersLoading, createOrderSuccess } = useSelector(
    (state) => state.order,
  );
  const t = useTranslations('SenderDashboard.orders');

  const [selectedSenderPackage, setSelectedSenderPackage] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const dispatch = useDispatch();
  const { user } = useAuth();
  const router = useRouter();
  const handleRaiseIssue = (order_id: string) => {
    router.push(`/issue/create?order_id=${order_id}`);
  };

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
              value={selectedSenderPackage?.packageID || ''}
              onChange={(e) => {
                const selectedPackage = senderPackages.find(
                  (pkg) => pkg.packageID === e.target.value,
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

          {/* Place Order Button */}
          <div>
            <button
              onClick={handleOpenModal}
              className="py-3 px-6 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
            >
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
            <h2 className="text-xl font-semibold text-white">{t('title')}</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-900/50">
                <tr>
                  <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider py-3 px-6">
                    {t('orderId')}
                  </th>
                  <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider py-3 px-6">
                    {t('pickupAddress')}
                  </th>
                  <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider py-3 px-6">
                    {t('deliveryAddress')}
                  </th>
                  <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider py-3 px-6">
                    {t('pickupDate')}
                  </th>
                  <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider py-3 px-6">
                    {t('deliveryDate')}
                  </th>
                  <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider py-3 px-6">
                    {t('status')}
                  </th>
                  <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider py-3 px-6">
                    {t('payment')}
                  </th>
                  <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider py-3 px-6">
                    {/* {t('payment')} */}
                    Options
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
                        {order?.origin?.city}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-sm text-gray-300">
                        {order?.destination?.city}
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
                    <td className="py-4 px-6 place-items-center">
                      <Menu>
                        <MenuButton className="  py-1.5 px-3 focus:outline-none">
                          <FaEllipsisV />
                        </MenuButton>

                        <MenuItems
                          transition
                          anchor="bottom start"
                          className="w-40 origin-top-right rounded-xl border border-white/5 bg-slate-500/60 p-1 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
                        >
                          <MenuItem>
                            <button
                              onClick={() => handleRaiseIssue(order.order_id)}
                              className="group flex w-full items-center gap-2 rounded-[5px] py-1.5 px-3 data-[focus]:bg-slate-500/80 duration-300"
                            >
                              <FaFlag />
                              Raise Issue
                            </button>
                          </MenuItem>
                        </MenuItems>
                      </Menu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-300">{t('noOrders')}</p>
        </div>
      )}
    </div>
  );
};

export default CreateOrder;
