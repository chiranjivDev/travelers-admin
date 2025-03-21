'use client';

import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useTranslations } from 'next-intl';
import { FaEllipsisV, FaFlag, FaTrash } from 'react-icons/fa';
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Popover,
  PopoverButton,
  PopoverPanel,
} from '@headlessui/react';
import { useRouter } from 'next/navigation';
import {
  DELETE_ISSUE,
  ISSUES,
  USER_ISSUES,
} from '@/app/issue/redux/issueAction';

const CreateOrder = () => {
  const { userIssues, userIssueLoading } = useSelector((state) => state.issues);
  const t = useTranslations('SenderDashboard.orders');
  const dispatch = useDispatch();
  const { user } = useAuth();
  const handleDeleteIssue = (issue_id: string) => {
    console.log('deleting issue');
    dispatch({
      type: DELETE_ISSUE,
      payload: {
        issue_id,
        user_id: user?.userId,
      },
    });
  };

  useEffect(() => {
    if (user) {
      dispatch({ type: USER_ISSUES, payload: user?.userId });
    }
  }, [dispatch, user]);

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
      {/* Issues section */}
      {userIssueLoading ? (
        <div className="flex justify-center items-center my-6">
          <p className="text-gray-300">Loading Issues...</p>
        </div>
      ) : userIssues?.length > 0 ? (
        <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
          <div className="p-6 border-b border-gray-700">
            <h2 className="text-xl font-semibold text-white">Raised Issues</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-900/50">
                <tr>
                  <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider py-3 px-6">
                    Issue ID
                  </th>
                  <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider py-3 px-6">
                    Issue Type
                  </th>
                  <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider py-3 px-6">
                    Description
                  </th>
                  <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider py-3 px-6">
                    Created At
                  </th>
                  <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider py-3 px-6">
                    Order ID
                  </th>
                  <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider py-3 px-6">
                    Status
                  </th>
                  <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider py-3 px-6">
                    Options
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {userIssues.map((issue) => (
                  <tr
                    key={issue.issue_id}
                    className="hover:bg-gray-700/50 transition-colors"
                  >
                    <td className="py-4 px-6">
                      <div className="text-sm font-medium text-white">
                        {issue.issue_id}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-sm text-gray-300">
                        {issue.issue_type}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-sm text-gray-300">
                        {issue.description}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-sm text-gray-300">
                        {new Date(issue.created_at).toLocaleString()}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-sm text-gray-300">
                        {issue.order_id}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <Popover>
                        <PopoverButton
                          className={`inline-flex items-center outline-none justify-center gap-2 text-center px-2.5 py-0.5 rounded-full text-xs font-medium text-white ${
                            issue.status === 'Resolved' && issue.remark
                              ? 'cursor-pointer'
                              : 'cursor-default'
                          } ${
                            issue.status === 'Open'
                              ? 'bg-blue-500'
                              : issue.status === 'Under Review'
                                ? 'bg-orange-500'
                                : 'bg-green-500'
                          }`}
                        >
                          <span>{issue.status}</span>
                          {issue.status === 'Resolved' && issue.remark && (
                            <div className="bg-red-500 rounded-full w-2 h-2 " />
                          )}
                        </PopoverButton>
                        {issue.remark && (
                          <PopoverPanel
                            transition
                            anchor="bottom"
                            className="divide-y px-5 py-4 w-52 ring-2 ring-indigo-500 backdrop-blur-md text-wrap divide-white/50 rounded-[10px] bg-white/20 text-sm/6 transition translate-y-4 duration-200 ease-in-out [--anchor-gap:var(--spacing-5)] data-[closed]:-translate-y-1 data-[closed]:opacity-0"
                          >
                            <span className="font-medium text-indigo-300 ">
                              Remark By Admin
                            </span>
                            <br />
                            {issue.remark}
                          </PopoverPanel>
                        )}
                      </Popover>
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
                              onClick={() => handleDeleteIssue(issue.issue_id)}
                              className="group flex w-full items-center gap-2 rounded-[5px] py-1.5 px-3 data-[focus]:bg-slate-500/80 duration-300"
                            >
                              <FaTrash />
                              Delete Issue
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
          <p className="text-gray-300">No Issues Raised</p>
        </div>
      )}
    </div>
  );
};

export default CreateOrder;
