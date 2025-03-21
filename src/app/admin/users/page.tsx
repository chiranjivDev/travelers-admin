'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  FiSearch,
  FiFilter,
  FiMoreVertical,
  FiEdit2,
  FiTrash2,
  FiShield,
  FiCheck,
  FiX,
  FiUserPlus,
  FiEye,
  FiLock,
  FiUnlock,
} from 'react-icons/fi';
import Modal from '@/components/admin/Modal';
import UserForm from '@/components/admin/UserForm';
import ConfirmDialog from '@/components/admin/ConfirmDialog';
import { useDispatch, useSelector } from 'react-redux';
import {
  DELETE_USER,
  GET_ALL_USERS,
  UPDATE_USER_STATUS,
} from './redux/userAction';
const mockUsers = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    role: 'traveler',
    status: 'active',
    verified: true,
    joinDate: '2023-12-01',
    lastActive: '2024-01-15',
    completedDeliveries: 12,
    rating: 4.8,
    totalEarnings: 1250.5,
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'sender',
    status: 'pending',
    verified: false,
    joinDate: '2023-12-15',
    lastActive: '2024-01-14',
    completedDeliveries: 3,
    rating: 4.5,
    totalEarnings: 450.75,
  },
];

type UserStatus = 'active' | 'suspended' | 'pending' | 'inactive';
type UserRole = 'traveler' | 'sender' | 'both';
type ModalType = 'create' | 'edit' | 'view' | null;
type ActionType = 'delete' | 'suspend' | 'verify' | null;

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<UserStatus | 'all'>('all');
  const [roleFilter, setRoleFilter] = useState<UserRole | 'all'>('all');
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [modalType, setModalType] = useState<ModalType>(null);
  const [actionType, setActionType] = useState<ActionType>(null);

  const dispatch = useDispatch();
  const Users = useSelector((state) => state.users.users);

  useEffect(() => {
    dispatch({ type: GET_ALL_USERS });
  }, []);

  const filteredUsers = Users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === 'all' || user.status === statusFilter;
    const matchesRole = roleFilter === 'all' || user.permissions === roleFilter;

    return matchesSearch && matchesStatus && matchesRole;
  });

  const handleAction = (user: any, action: ActionType) => {
    setSelectedUser(user);
    setActionType(action);
  };

  const handleModal = (type: ModalType, user?: any) => {
    setModalType(type);
    setSelectedUser(user || null);
  };

  const handleUserSubmit = (userData: any) => {
    const { id, status } = userData;
    const payload = {
      id: id,
      status: status,
    };

    if (id) {
      dispatch({ type: UPDATE_USER_STATUS, payload: payload });
    }

    setModalType(null);
    setSelectedUser(null);
  };

  const handleConfirmAction = () => {
    if (!selectedUser || !actionType) return;

    dispatch({
      type: DELETE_USER,
      payload: { userId: selectedUser.id },
    });

    setActionType(null);
    setSelectedUser(null);
  };

  const getActionMessage = () => {
    if (!selectedUser || !actionType) return '';

    switch (actionType) {
      case 'delete':
        return `Are you sure you want to delete the user "${selectedUser.name}"? This action cannot be undone.`;
      case 'suspend':
        return `Are you sure you want to ${selectedUser.status === 'suspended' ? 'unsuspend' : 'suspend'} the user "${selectedUser.name}"?`;
      case 'verify':
        return `Are you sure you want to ${selectedUser.is_email_verified ? 'unverify' : 'verify'} the user "${selectedUser.name}"?`;
      default:
        return '';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">User Management</h1>
          <p className="mt-1 text-gray-400">
            Manage and monitor platform users
          </p>
        </div>

        <motion.button
          onClick={() => handleModal('create')}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium 
            transition-colors duration-200 flex items-center space-x-2"
        >
          <FiUserPlus className="w-5 h-5" />
          <span>Add New User</span>
        </motion.button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Users', value: Users.length },
          {
            label: 'Active Users',
            value: Users.filter((u) => u.status === 'active').length,
          },
          {
            label: 'Pending Verification',
            value: Users.filter((u) => !u.is_email_verified).length,
          },
          {
            label: 'Suspended Users',
            value: Users.filter((u) => u.status === 'suspended').length,
          },
        ].map((stat, index) => (
          <motion.div
            key={index}
            className="bg-gray-800 rounded-lg p-6"
            whileHover={{ y: -4 }}
          >
            <p className="text-gray-400 text-sm">{stat.label}</p>
            <p className="text-2xl font-bold text-white mt-2">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Search */}
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search users..."
            className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg
              text-white placeholder-gray-400 focus:outline-none focus:ring-2 
              focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Status Filter */}
        <div className="relative">
          <FiFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value as UserStatus | 'all')
            }
            className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg
              text-white appearance-none cursor-pointer focus:outline-none focus:ring-2 
              focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            {/* <option value="suspended">Suspended</option> */}
            {/* <option value="pending">Pending</option> */}
            <option value="inactive">Inactive</option>
          </select>
        </div>

        {/* Role Filter */}
        <div className="relative">
          <FiFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value as UserRole | 'all')}
            className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg
              text-white appearance-none cursor-pointer focus:outline-none focus:ring-2 
              focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Roles</option>
            <option value="traveler">Traveler</option>
            <option value="sender">Sender</option>
            <option value="both">Both</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-gray-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-900/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Verified
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Activity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {filteredUsers.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-gray-700/50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
                        <span className="text-lg font-medium text-white">
                          {user.name.charAt(0)}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-white">
                          {user.name}
                        </div>
                        <div className="text-sm text-gray-400">
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                      bg-blue-900/50 text-blue-400"
                    >
                      {user.permissions}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                      ${
                        user.status === 'active'
                          ? 'bg-green-900/50 text-green-400'
                          : user.status === 'suspended'
                            ? 'bg-red-900/50 text-red-400'
                            : 'bg-yellow-900/50 text-yellow-400'
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {user.is_email_verified ? (
                      <FiCheck className="w-5 h-5 text-green-400" />
                    ) : (
                      <FiX className="w-5 h-5 text-red-400" />
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-white">
                      {user.completedDeliveries} deliveries
                    </div>
                    <div className="text-sm text-gray-400">
                      Last active:{' '}
                      {new Date(user.lastActive).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-3">
                      <motion.button
                        onClick={() => handleModal('view', user)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        <FiEye className="w-5 h-5" />
                      </motion.button>
                      <motion.button
                        onClick={() => handleModal('edit', user)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        <FiEdit2 className="w-5 h-5" />
                      </motion.button>
                      {/* <motion.button
                        onClick={() =>
                          handleAction(
                            user,
                            user.is_email_verified ? 'verify' : 'verify'
                          )
                        }
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        <FiShield className="w-5 h-5" />
                      </motion.button>
                      <motion.button
                        onClick={() =>
                          handleAction(
                            user,
                            user.status === 'suspended' ? 'suspend' : 'suspend'
                          )
                        }
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        {user.status === 'suspended' ? (
                          <FiUnlock className="w-5 h-5" />
                        ) : (
                          <FiLock className="w-5 h-5" />
                        )}
                      </motion.button>
                      <motion.button
                        onClick={() => handleAction(user, 'delete')}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="text-gray-400 hover:text-red-400 transition-colors"
                      >
                        <FiTrash2 className="w-5 h-5" />
                      </motion.button> */}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create/Edit User Modal */}
      <Modal
        isOpen={modalType === 'create' || modalType === 'edit'}
        onClose={() => setModalType(null)}
        title={`${modalType === 'create' ? 'Create' : 'Edit'} User`}
      >
        <UserForm
          user={selectedUser}
          onSubmit={handleUserSubmit}
          onCancel={() => setModalType(null)}
        />
      </Modal>

      {/* View User Modal */}
      {modalType === 'view' && selectedUser && (
        <Modal
          isOpen={true}
          onClose={() => setModalType(null)}
          title="User Details"
        >
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-full bg-gray-700 flex items-center justify-center">
                <span className="text-2xl font-medium text-white">
                  {selectedUser.name.charAt(0)}
                </span>
              </div>
              <div>
                <h3 className="text-xl font-medium text-white">
                  {selectedUser.name}
                </h3>
                <p className="text-gray-400">{selectedUser.email}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-400">Role</p>
                <p className="text-white">{selectedUser.permissions}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Status</p>
                <p className="text-white">{selectedUser.status}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Join Date</p>
                <p className="text-white">
                  {new Date(selectedUser.joinDate).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Last Active</p>
                <p className="text-white">
                  {new Date(selectedUser.lastActive).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Completed Deliveries</p>
                <p className="text-white">{selectedUser.completedDeliveries}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Rating</p>
                <p className="text-white">{selectedUser.rating} / 5.0</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Total Earnings</p>
                <p className="text-white">
                  {/* ${selectedUser.totalEarnings.toFixed(2)} */}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Verification</p>
                <p className="text-white">
                  {selectedUser.is_email_verified ? 'Verified' : 'Not Verified'}
                </p>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* Confirmation Dialog */}
      <ConfirmDialog
        isOpen={!!actionType}
        onClose={() => setActionType(null)}
        onConfirm={handleConfirmAction}
        title={`Confirm ${actionType?.charAt(0).toUpperCase()}${actionType?.slice(1)}`}
        message={getActionMessage()}
        confirmText={actionType === 'delete' ? 'Delete' : 'Confirm'}
        type={actionType === 'delete' ? 'danger' : 'warning'}
      />
    </div>
  );
}
