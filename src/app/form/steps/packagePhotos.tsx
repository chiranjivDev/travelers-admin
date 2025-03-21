import { useTranslations } from 'next-intl';
import React from 'react';
import { useWatch } from 'react-hook-form';

const PackagePhotos = ({ control, getValues, setValue }) => {
  const t = useTranslations('SenderForm.steps.step1.packagePhotos');
  const photoguidelines = useTranslations(
    'SenderForm.steps.step1.packagePhotos.photoGuidelines',
  );
  const tips = photoguidelines.raw('tips', { returnObjects: true }) || [];

  const handleFileUpload = (e) => {
    const files = e.target.files;
    const fileArray = Array.from(files).map((file) =>
      URL.createObjectURL(file),
    );

    const updatedPhotos = [...getValues('packagePhotos'), ...fileArray];

    setValue('packagePhotos', updatedPhotos);
  };

  const removePhoto = (index) => {
    const updatedPhotos = getValues('packagePhotos').filter(
      (_, i) => i !== index,
    );
    setValue('packagePhotos', updatedPhotos);
  };

  const packagePhotos = useWatch({ control, name: 'packagePhotos' });

  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold mb-4 text-gray-700">
        {/* Package Photos */}
        {t('title')}
      </h3>
      <p className="text-sm text-gray-600 mb-4">
        {/* Add photos of your package to help travelers better understand its
        appearance and condition. This also helps with package verification
        during pickup and delivery. */}
        {t('description')}
      </p>

      <div className="relative">
        <div className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-blue-400 transition-colors">
          <div className="space-y-2 text-center">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="flex text-sm text-gray-600">
              <label
                htmlFor="file-upload"
                className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
              >
                <span>Upload photos</span>
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  className="sr-only"
                  accept="image/*"
                  multiple
                  onChange={handleFileUpload}
                />
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs text-gray-500">
              PNG, JPG, GIF up to 10MB each
            </p>
          </div>
        </div>
      </div>

      {/* Display uploaded photos */}
      {packagePhotos?.length > 0 && (
        <div className="mt-6">
          <h4 className="text-sm font-medium text-gray-900 mb-3">
            Uploaded Photos
          </h4>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {packagePhotos?.map((photo, index) => (
              <div key={index} className="relative group">
                <div className="aspect-w-1 aspect-h-1 rounded-lg overflow-hidden bg-gray-100">
                  <img
                    src={photo}
                    alt={`Package photo ${index + 1}`}
                    className="object-cover"
                  />
                  <button
                    type="button"
                    className="absolute top-2 right-2 p-1.5 rounded-full bg-red-100 text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => removePhoto(index)}
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Information about photos */}
      <div className="mt-4 bg-blue-50 rounded-lg p-4">
        <h4 className="text-sm font-medium text-blue-900 mb-2">
          {/* Photo Guidelines */}
          {t('photoGuidelines.title')}
        </h4>
        <ul className="text-sm text-blue-700 space-y-1">
          {/* <li>• Take clear, well-lit photos from multiple angles</li>
          <li>• Include any fragile/handling labels if present</li>
          <li>• Show the packaging condition clearly</li>
          <li>• Avoid including personal or sensitive information in photos</li> */}

          {tips?.map((tip, index) => <li key={index}>• {tip}</li>)}
        </ul>
      </div>
    </div>
  );
};

export default PackagePhotos;
