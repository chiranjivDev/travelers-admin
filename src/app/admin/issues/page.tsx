'use client';

import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  FiDollarSign,
  FiSearch,
  FiFilter,
  FiDownload,
  FiEye,
  FiCheckCircle,
  FiXCircle,
  FiClock,
} from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { FaEllipsisV, FaInfo, FaInfoCircle, FaTrash } from 'react-icons/fa';
import {
  Button,
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
  Field,
  Label,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Select,
  Textarea,
} from '@headlessui/react';
import { ISSUES, UPDATE_ISSUE } from '@/app/issue/redux/issueAction';
import clsx from 'clsx';
import { ChevronDownIcon } from 'lucide-react';
import { MdChat } from 'react-icons/md';
import { clearUpdateStatus } from '@/app/issue/redux/issueSlice';

const statusColors = {
  Completed: 'bg-green-500',
  Pending: 'bg-yellow-500',
  Failed: 'bg-red-500',
  Refunded: 'bg-purple-500',
};

const StatusIcon = ({ status }) => {
  switch (status) {
    case 'Completed':
      return <FiCheckCircle className="w-5 h-5 text-green-500" />;
    case 'Pending':
      return <FiClock className="w-5 h-5 text-yellow-500" />;
    case 'Failed':
      return <FiXCircle className="w-5 h-5 text-red-500" />;
    default:
      return null;
  }
};

function CustomImage() {
  const [loading, setLoading] = useState(true);
  return (
    <div className="relative w-full h-32  rounded-lg overflow-hidden">
      {loading && (
        <div className="absolute inset-0 rounded-[10px] bg-gradient-to-r from-gray-500 to-gray-200 animate-pulse"></div>
      )}
      <img
        src={
          'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png'
        }
        alt={'image'}
        className={`rounded-[10px] shadow-md w-full h-full object-cover ${loading ? 'hidden' : ''}`}
        onLoad={() => setLoading(false)}
      />
    </div>
  );
}

type IssueDetailsProps = {
  close: () => void;
  isOpen: boolean;
  issue: any;
};

function IssueDetails({ close, isOpen, issue }: IssueDetailsProps) {
  const [loading, setLoading] = useState(false);
  const [remark, setRemark] = useState<string>('');
  const [remarkError, setRemarkError] = useState<string | null>(null);
  const { updateIssueSuccess } = useSelector((state) => state.issues);

  const dispatch = useDispatch();

  const handleSubmit = () => {
    if (!remark) {
      setRemarkError('Remark is required');
      return;
    }
    dispatch({
      type: UPDATE_ISSUE,
      payload: {
        id: issue.issue_id,
        body: {
          remark: remark,
          status: 'Resolved',
        },
      },
    });
  };

  useEffect(() => {
    if (updateIssueSuccess) {
      close();
    }
  }, [updateIssueSuccess]);

  useEffect(() => {
    return () => {
      dispatch(clearUpdateStatus());
    };
  }, []);
  if (!issue) {
    return null;
  }
  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-10 focus:outline-none "
      onClose={close}
    >
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="w-4/5 rounded-xl bg-white/5 p-6 backdrop-blur-3xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
          >
            {loading ? (
              <div className="flex flex-col gap-4 items-center justify-center py-[88px]">
                <div className="w-12 h-12 rounded-full border-4 border-gray-700 border-b-gray-300 animate-spin"></div>
                <div className="text-lg font-bold">
                  Loading Issue Details....
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-start gap-3">
                  <DialogTitle
                    as="h1"
                    className="text-2xl/7 font-bold text-white"
                  >
                    Issue Details
                  </DialogTitle>
                  <span
                    className={`inline-flex items-center text-white px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      issue.status === 'Open'
                        ? 'bg-blue-500'
                        : issue.status === 'Under Review'
                          ? 'bg-orange-400'
                          : 'bg-green-500'
                    }`}
                  >
                    {issue.status}
                  </span>
                </div>
                <p className="mt-2 text-sm/6 text-white/50">
                  Complete information about the reported issue.
                </p>
                <div className="mt-4 flex flex-col gap-3">
                  <p className="text-base text-gray-300">
                    <span className="font-medium text-gray-100">Issue ID:</span>{' '}
                    {issue.issue_id}
                  </p>
                  <p className="text-base text-gray-300">
                    <span className="font-medium text-gray-100">Order ID:</span>{' '}
                    {issue.order_id}
                  </p>

                  <p className="text-base text-gray-300">
                    <span className="font-medium text-gray-100">
                      Issue raised By:
                    </span>{' '}
                    {issue.user.name}{' '}
                    <small className="text-gray-400">({issue.user.id})</small>
                  </p>
                  <p className="text-base text-gray-300">
                    <span className="font-medium text-gray-100">
                      Issue Raised At:
                    </span>{' '}
                    {new Date(issue.created_at).toLocaleDateString()}{' '}
                    {new Date(issue.created_at).toLocaleTimeString('en-us', {
                      hour12: true,
                      hour: 'numeric',
                      minute: '2-digit',
                    })}
                  </p>

                  <p className="text-base text-gray-300">
                    <span className="font-medium text-gray-100">
                      Issue Type:
                    </span>{' '}
                    {issue.issue_type}
                  </p>
                  <p className=" text-gray-300">
                    <span className="font-medium text-gray-100">
                      Description:
                    </span>{' '}
                    {issue.description}
                  </p>
                  <p className="text-base text-gray-300">
                    <span className="font-medium text-gray-100">Images:</span>{' '}
                  </p>
                  <div className="mt-4 w-4/5 grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[1, 2, 3, 4].map((img, index) => (
                      <CustomImage key={index} />
                    ))}
                  </div>
                </div>
                {issue.remark && (
                  <div className="my-4">
                    <div className="px-5 py-3 bg-indigo-700/40 w-max text-white rounded-[10px]">
                      <p>Remark By Admin : {issue.remark}</p>
                    </div>
                  </div>
                )}
                {issue.status !== 'Resolved' && (
                  <div className="mt-4 flex flex-col gap-3 items-start">
                    <Field className="w-full">
                      <Label className="text-sm/6 font-medium text-white">
                        Remark
                      </Label>
                      <Description className="text-sm/6 text-white/50">
                        Leave a remark for the user
                      </Description>
                      <Textarea
                        className={clsx(
                          'mt-3 block w-full resize-none rounded-[10px] border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white',
                          'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25',
                        )}
                        rows={3}
                        placeholder="Please enter a remark for the user..."
                        value={remark}
                        onChange={(e) => setRemark(e.target.value)}
                      />
                      {remarkError && !remark && (
                        <div className="text-sm/6 text-red-600">
                          {remarkError}
                        </div>
                      )}
                    </Field>
                  </div>
                )}
                {issue.status !== 'Resolved' && (
                  <div className="mt-4 w-full flex justify-end">
                    <Button
                      className="inline-flex items-center disabled:bg-indigo-600/30 disabled:opacity-80 gap-2 rounded-[10px] bg-indigo-600 px-5 py-2 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-indigo-700 duration-300 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                      onClick={handleSubmit}
                      disabled={issue.status === 'Resolved'}
                    >
                      Mark as Resolved
                    </Button>
                  </div>
                )}
              </>
            )}
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}

export default function IssuesPage() {
  const { issues } = useSelector((state) => state.issues);
  const dispatch = useDispatch();
  console.log(issues);
  let [isOpen, setIsOpen] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState(null);

  function open(issueId: string) {
    setSelectedIssue(issues.find((issue) => issue.issue_id === issueId));
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }

  function handleStatusChange(issue_id: string, newStatus: string) {
    dispatch({
      type: UPDATE_ISSUE,
      payload: {
        id: issue_id,
        body: {
          status: newStatus,
        },
      },
    });
  }

  useEffect(() => {
    dispatch({ type: ISSUES });
  }, []);
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">Dispute Management</h1>
          <p className="text-gray-400 mt-1">Monitor all Reports</p>
        </div>
      </div>
      <IssueDetails close={close} isOpen={isOpen} issue={selectedIssue} />
      {/* Issues Table */}
      <div className="bg-gray-800 rounded-lg overflow-hidden">
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
              {[...issues]
                .sort(
                  (a, b) =>
                    new Date(b.created_at).getTime() -
                    new Date(a.created_at).getTime(),
                ) // Sorting
                .map((issue) => (
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
                      <div className="mt-4">
                        <div className="relative">
                          <Select
                            className={clsx(
                              'mt-3 block appearance-none rounded-[5px] border-none bg-white/5 py-1.5 pl-3 pr-6 text-sm/6 text-white w-32',
                              'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25',
                              '*:text-black',
                            )}
                            value={issue.status}
                            onChange={(e) =>
                              handleStatusChange(issue.issue_id, e.target.value)
                            }
                          >
                            <option value="Open">Open</option>
                            <option value="Under Review">Under Review</option>
                            <option value="Resolved">Resolved</option>
                          </Select>
                          <ChevronDownIcon
                            className="group pointer-events-none absolute top-2.5 right-2.5 size-4 fill-white/60"
                            aria-hidden="true"
                          />
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-6 place-items-center">
                      <Menu>
                        <MenuButton className="py-1.5 px-3 focus:outline-none">
                          <FaEllipsisV />
                        </MenuButton>
                        <MenuItems
                          transition
                          anchor="bottom start"
                          className="w-40 origin-top-right rounded-xl border border-white/5 bg-slate-500/60 p-1 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
                        >
                          <MenuItem>
                            <button
                              onClick={() => open(issue.issue_id)}
                              className="group flex w-full items-center gap-2 rounded-[5px] py-1.5 px-3 data-[focus]:bg-slate-500/80 duration-300"
                            >
                              <FaInfoCircle />
                              Views Details
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
    </div>
  );
}
