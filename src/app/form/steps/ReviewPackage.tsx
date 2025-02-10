// export const ReviewPackage = ({ formData }: any) => {
//   // Helper function to render nested objects
//   const renderNestedData = (data: any) => {
//     return Object.keys(data).map((key) => (
//       <div key={key} className="flex justify-between pl-4">
//         <span className="font-semibold">{key}</span>
//         <span>{data[key]}</span>
//       </div>
//     ));
//   };

//   return (
//     <div>
//       <h2 className="text-xl font-bold mb-4 text-gray-700">
//         Step 5: Review & Submit
//       </h2>
//       <div className="mb-4">
//         <label className="block text-gray-700">Review your details</label>
//         <div className="space-y-2 text-gray-700">
//           {Object.keys(formData).map((key) => {
//             const value = formData[key];

//             // Check if the value is an object and render nested data accordingly
//             if (typeof value === 'object' && value !== null) {
//               return (
//                 <div key={key}>
//                   <span className="font-semibold">{key}</span>
//                   {renderNestedData(value)}
//                 </div>
//               );
//             }

//             // Render simple key-value pairs for non-object values
//             return (
//               <div key={key} className="flex justify-between">
//                 <span className="font-semibold">{key}</span>
//                 <span>{value}</span>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// };

import React from 'react';

export const ReviewPackage = ({ formData }: any) => {
  return (
    <>
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Step 5: Review & Submit
      </h2>
      <div className="space-y-4 text-gray-700">
        {/* General Information */}
        <div className="p-4 bg-white shadow-sm rounded-lg mb-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">
            General Information
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="font-medium text-gray-600">Name</span>
              <span className="text-gray-800">{formData.name || 'N/A'}</span>
            </div>
            {/* <div className="flex justify-between">
              <span className="font-medium text-gray-600">Category</span>
              <span className="text-gray-800">
                {formData.category || 'N/A'}
              </span>
            </div> */}
            {/* <div className="flex justify-between">
              <span className="font-medium text-gray-600">Subcategory</span>
              <span className="text-gray-800">
                {formData.subcategory || 'N/A'}
              </span>
            </div> */}
            <div className="flex justify-between">
              <span className="font-medium text-gray-600">Price</span>
              <span className="text-gray-800">{formData.price || 'N/A'}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-600">Description</span>
              <span className="text-gray-800">
                {formData.description || 'N/A'}
              </span>
            </div>
          </div>
        </div>

        {/* Dimensions */}
        {/* <div className="max-w-2xl mx-auto p-4 bg-white shadow-sm rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Dimensions</h3>
          <div className="flex justify-between">
            <span className="font-medium">Length</span>
            <span>{formData.dimension?.length || 'N/A'}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Width</span>
            <span>{formData.dimension?.width || 'N/A'}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Height</span>
            <span>{formData.dimension?.height || 'N/A'}</span>
          </div>
        </div> */}

        <div className="max-w-2xl mx-auto p-4 bg-white shadow-sm rounded-lg">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">
            Dimensions
          </h3>
          <div className="flex items-center space-x-4 text-gray-800">
            <span className="font-medium">Length:</span>
            <span>{formData.dimension?.length || 'N/A'}</span>
            <span className="font-medium">Width:</span>
            <span>{formData.dimension?.width || 'N/A'}</span>
            <span className="font-medium">Height:</span>
            <span>{formData.dimension?.height || 'N/A'}</span>
          </div>
        </div>

        {/* Origin */}
        <div className="max-w-2xl mx-auto p-4 bg-white shadow-sm rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Origin</h3>
          <div className="flex justify-between">
            <span className="font-medium">Street</span>
            <span>{formData.origin?.street || 'N/A'}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Postal</span>
            <span>{formData.origin?.postal || 'N/A'}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">City</span>
            <span>{formData.origin?.city || 'N/A'}</span>
          </div>
        </div>

        {/* Destination */}
        <div className="max-w-2xl mx-auto p-4 bg-white shadow-sm rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Destination</h3>
          <div className="flex justify-between">
            <span className="font-medium">Street</span>
            <span>{formData.destination?.street || 'N/A'}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Postal</span>
            <span>{formData.destination?.postal || 'N/A'}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">City</span>
            <span>{formData.destination?.city || 'N/A'}</span>
          </div>
        </div>

        {/* Additional Information */}
        <div className="max-w-2xl mx-auto p-4 bg-white shadow-sm rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Additional Information</h3>
          <div className="flex justify-between">
            <span className="font-medium">Pickup Date</span>
            <span>{formData.pickupDate || 'N/A'}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Preferred Time</span>
            <span>{formData.preferredTime || 'N/A'}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Delivery Date</span>
            <span>{formData.deliveryDate || 'N/A'}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Prefered Delivery Time</span>
            <span>{formData.preferredDeliveryTime || 'N/A'}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Phone</span>
            <span>{formData.phone || 'N/A'}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Communication</span>
            <span>{formData.communication?.join(', ') || 'N/A'}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Requires Careful Handling</span>
            <span>{formData.requiresCarefulHandling ? 'Yes' : 'No'}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Is Fragile</span>
            <span>{formData.isFragile ? 'Yes' : 'No'}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Insurance</span>
            <span>{formData.insurance ? 'Yes' : 'No'}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Priority</span>
            <span>{formData.priority ? 'Yes' : 'No'}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Special Instructions</span>
            <span>{formData.specialInstructions || 'N/A'}</span>
          </div>
        </div>
      </div>
    </>
  );
};
