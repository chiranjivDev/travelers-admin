'use client';

import { useAuth } from '@/contexts/AuthContext';
import { redirect, useSearchParams } from 'next/navigation';
import { useState, useRef, ChangeEvent, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { FiUploadCloud } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { CREATE_ISSUE } from '../redux/issueAction';
import { motion } from 'framer-motion';
import { FaCheck } from 'react-icons/fa';
import Link from 'next/link';
import { clearState } from '../redux/issueSlice';

type UserType = 'sender' | 'traveler';
type FileWithPreview = File & { preview?: string };

interface FormData {
  order_id: string;
  issue_type: string;
  description: string;
  user_id: string;
}

export default function CreateIssue() {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const urlParams = useSearchParams();
  const orderId = urlParams.get('order_id') || '';
  const { user } = useAuth();
  const dispatch = useDispatch();
  const { issues, createIssueLoading, createIssueSuccess } = useSelector(
    (state) => state.issues,
  );
  const userType = user?.permissions;

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>({
    defaultValues: {
      order_id: orderId,
      user_id: user?.userId,
    },
  });
  const issue_type = watch('issue_type');
  const issueTypes = {
    sender: [
      'Package Not Delivered',
      'Damaged Package',
      'Wrong Delivery Location',
      'Delayed Delivery',
      'Payment Issue',
      'Other',
    ],
    traveler: [
      'Unable to Pickup Package',
      'Package Condition Issue',
      'Delivery Location Problem',
      'Payment Not Received',
      'Communication Problem',
      'Other',
    ],
  };
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(Array.from(e.target.files));
    }
  };

  const handleFiles = (selectedFiles: File[]) => {
    const validFiles = selectedFiles.filter(
      (file) =>
        file.size <= 10 * 1024 * 1024 &&
        ['image/jpeg', 'image/png', 'application/pdf'].includes(file.type),
    );

    const newFiles = validFiles.map((file) => {
      const fileWithPreview = file as FileWithPreview;
      if (file.type.startsWith('image/')) {
        fileWithPreview.preview = URL.createObjectURL(file);
      }
      return fileWithPreview;
    });

    setFiles((prev) => [...prev, ...newFiles]);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files) {
      handleFiles(Array.from(e.dataTransfer.files));
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => {
      const newFiles = [...prev];
      if (newFiles[index].preview) {
        URL.revokeObjectURL(newFiles[index].preview!);
      }
      newFiles.splice(index, 1);
      return newFiles;
    });
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    console.log(data);
    dispatch({ type: CREATE_ISSUE, payload: data });
  };

  useEffect(() => {
    return () => {
      dispatch(clearState());
    };
  }, []);
  if (!user) {
    redirect('/login');
  }
  if (!orderId) {
    redirect(`/`);
  }
  return createIssueSuccess ? (
    <motion.div
      className="flex items-center w-3/5 mx-auto text-center justify-center flex-col gap-6 py-14"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.5 }}
        transition={{ duration: 0.5 }}
        className="bg-green rounded-full bg-green-500 p-4 flex items-center justify-center"
      >
        <FaCheck size={40} color="white" />
      </motion.div>
      <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
        Issue Raised : {issue_type}
      </h1>
      <p className="text-lg text-gray-400">
        Your issue has been successfully submitted. Our team will review your
        request and get back to you shortly. You can track the status of your
        issue in your dashboard.
      </p>
      <Link href={'/'} className="font-light text-blue-400 underline">
        Return to Home
      </Link>
    </motion.div>
  ) : (
    <div className="max-w-3xl sm:bg-slate-800 mx-auto py-8 my-10 rounded-[10px] px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-secondary-800">
          Report an Issue
        </h1>
        <p className="mt-2 text-secondary-500">
          {userType === 'sender'
            ? 'Describe the issue with your package delivery to get assistance.'
            : 'Report any problems you faced while delivering the package.'}
        </p>
      </div>

      <div className="rounded-lg p-6 sm:p-8">
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            id="order_id"
            {...register('order_id', { required: true })}
            className="hidden"
          />
          <input
            id="user_id"
            {...register('user_id', { required: true })}
            className="hidden"
          />

          {/* Type of Issue */}
          <div className="mb-6">
            <label
              htmlFor="issueType"
              className="block text-sm font-medium text-secondary-700 mb-2"
            >
              Type of Issue
            </label>
            <div className="relative">
              <select
                id="issue_type"
                defaultValue={''}
                {...register('issue_type', { required: true })}
                className="w-full p-3 border border-secondary-300 text-zinc-800 rounded-[10px] appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all focus:border-indigo-500"
              >
                <option value="" className="text-zinc-600">
                  Select the type of issue
                </option>
                {issueTypes[userType].map((type) => (
                  <option key={type} value={type} className="text-zinc-900">
                    {type}
                  </option>
                ))}
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg
                  className="w-4 h-4 text-secondary-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
            {errors.issue_type && (
              <p className="text-red-500 text-sm mt-1">
                Issue type is required
              </p>
            )}
          </div>

          {/* Description */}
          <div className="mb-6">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-secondary-700 mb-2"
            >
              Description
            </label>
            <textarea
              id="description"
              {...register('description', { required: true })}
              placeholder="Please provide detailed information about your issue"
              rows={6}
              className="w-full p-3 transition-all text-slate-700 border border-secondary-300  rounded-[10px] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">
                Description is required
              </p>
            )}
          </div>

          {/* Attachments */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-secondary-700 mb-2">
              Attachments (Optional)
            </label>
            <div
              className={`border-2 border-dashed bg-slate-900 transition-all border-zinc-200  rounded-[10px] p-6 text-center ${
                isDragging
                  ? 'border-indigo-500 bg-slate-900/80'
                  : 'border-secondary-500'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                multiple
                accept=".jpg,.jpeg,.png,.pdf"
              />
              <div className="flex flex-col items-center">
                <FiUploadCloud className="w-12 h-12 text-secondary-400 mb-2" />
                <p className="text-secondary-700 mb-1">
                  Drag & drop files here or click to browse
                </p>
                <p className="text-secondary-500 text-sm">
                  Supported formats: JPG, PNG, PDF (Max size: 10MB)
                </p>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="mt-4 px-4 py-2 bg-secondary-200 text-secondary-700 rounded-md hover:bg-secondary-300 transition-colors"
                >
                  Browse Files
                </button>
              </div>
            </div>

            {/* File Preview */}
            {files.length > 0 && (
              <div className="mt-4 space-y-2">
                <p className="text-sm font-medium text-secondary-700">
                  Attached Files ({files.length})
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {files.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-secondary-100 rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        {file.preview ? (
                          <img
                            src={file.preview}
                            alt="Preview"
                            className="w-10 h-10 object-cover rounded"
                          />
                        ) : (
                          <div className="w-10 h-10 bg-secondary-200 rounded flex items-center justify-center">
                            <span className="text-xs font-medium">
                              {file.name.split('.').pop()?.toUpperCase()}
                            </span>
                          </div>
                        )}
                        <div className="overflow-hidden">
                          <p className="text-sm font-medium text-secondary-700 truncate">
                            {file.name.length > 30
                              ? file.name.slice(0, 30) + '...'
                              : file.name}
                          </p>
                          <p className="text-xs text-secondary-500">
                            {(file.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        className="text-secondary-500 hover:text-error-main"
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-indigo-600 text-white  py-3 px-4 rounded-[10px] hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors disabled:opacity-70"
          >
            {createIssueLoading ? 'Submitting...' : 'Submit Report'}
          </button>
        </form>
      </div>
    </div>
  );
}
