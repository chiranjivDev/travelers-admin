import { Controller, useWatch } from 'react-hook-form';
import PackagePhotos from './packagePhotos';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { PACKAGE_CATEGORIES } from '@/app/sender/dashboard/redux/packagesAction';

export const PackageDetails = ({ control, errors, getValues, setValue }) => {
  const { categories } = useSelector((state) => state.packages);

  // fetch categories
  const dispatch = useDispatch();
  useEffect(() => {
    if (!categories.length) {
      dispatch({ type: PACKAGE_CATEGORIES });
    }
  }, [dispatch, categories]);

  useEffect(() => {
    if (!categories.length) {
      dispatch({ type: PACKAGE_CATEGORIES });
    }
  }, [dispatch, categories]);

  // Watch the category field
  const selectedCategory = useWatch({
    control,
    name: 'category',
  });

  // Get the subcategories for the selected category
  const subcategories =
    categories?.find((category) => category.categoryId === selectedCategory)
      ?.subcategories || [];

  return (
    <div>
      <h2 className="text-xl font-bold mb-4 text-gray-700">
        Step 1: Package Details
      </h2>
      {/* Name */}
      <div className="mb-4">
        <label className="block text-gray-700">Name</label>
        <Controller
          name="name"
          control={control}
          rules={{ required: 'Name is required' }}
          render={({ field }) => (
            <input {...field} className="border p-2 w-full text-black" />
          )}
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}
      </div>

      {/* Category */}
      <div className="mb-4">
        <label className="block text-gray-700">Category</label>
        <Controller
          name="category"
          control={control}
          rules={{ required: 'Category is required' }}
          render={({ field }) => (
            <select {...field} className="border p-2 w-full text-black">
              <option value="">Select a Category</option>
              {categories.map((category) => (
                <option key={category.categoryId} value={category.categoryId}>
                  {category.name}
                </option>
              ))}
            </select>
          )}
        />
        {errors.category && (
          <p className="text-red-500 text-sm">{errors.category.message}</p>
        )}
      </div>

      {/* Subcategory */}
      {selectedCategory && (
        <div className="mb-4">
          <label className="block text-gray-700">Subcategory</label>
          <Controller
            name="subcategory"
            control={control}
            rules={{ required: 'Subcategory is required' }}
            render={({ field }) => (
              <select {...field} className="border p-2 w-full text-black">
                <option value="">Select a Subcategory</option>
                {subcategories.map((subcategory) => (
                  <option
                    key={subcategory.subcategoryId}
                    value={subcategory.subcategoryId}
                  >
                    {subcategory.name}
                  </option>
                ))}
              </select>
            )}
          />
          {errors.subcategory && (
            <p className="text-red-500 text-sm">{errors.subcategory.message}</p>
          )}
        </div>
      )}

      {/* Description */}
      <div className="mb-4">
        <label className="block text-gray-700">Description</label>
        <Controller
          name="description"
          control={control}
          rules={{ required: 'Description is required' }}
          render={({ field }) => (
            <input {...field} className="border p-2 w-full text-black" />
          )}
        />
        {errors.description && (
          <p className="text-red-500 text-sm">{errors.description.message}</p>
        )}
      </div>

      {/* Price */}
      <div className="mb-4">
        <label className="block text-gray-700">Price</label>
        <Controller
          name="price"
          control={control}
          rules={{ required: 'Price is required' }}
          render={({ field }) => (
            <input
              {...field}
              className="border p-2 w-full text-black"
              type="number"
            />
          )}
        />
        {errors.price && (
          <p className="text-red-500 text-sm">{errors.price.message}</p>
        )}
      </div>

      {/* Dimension Fields */}
      <div className="mb-4">
        <label className="block text-gray-700">Dimensions</label>
        <div className="flex space-x-4">
          {/* Length Field */}
          <div className="w-full">
            <label className="block text-gray-700">Length</label>
            <Controller
              name="dimension.length"
              control={control}
              rules={{ required: 'Length is required' }}
              render={({ field }) => (
                <input
                  {...field}
                  className="border p-2 w-full text-black"
                  type="number"
                  placeholder="Length"
                />
              )}
            />
            {errors.dimension?.length && (
              <p className="text-red-500 text-sm">
                {errors.dimension.length.message}
              </p>
            )}
          </div>

          {/* Width Field */}
          <div className="w-full">
            <label className="block text-gray-700">Width</label>
            <Controller
              name="dimension.width"
              control={control}
              rules={{ required: 'Width is required' }}
              render={({ field }) => (
                <input
                  {...field}
                  className="border p-2 w-full text-black"
                  type="number"
                  placeholder="Width"
                />
              )}
            />
            {errors.dimension?.width && (
              <p className="text-red-500 text-sm">
                {errors.dimension.width.message}
              </p>
            )}
          </div>

          {/* Height Field */}
          <div className="w-full">
            <label className="block text-gray-700">Height</label>
            <Controller
              name="dimension.height"
              control={control}
              rules={{ required: 'Height is required' }}
              render={({ field }) => (
                <input
                  {...field}
                  className="border p-2 w-full text-black"
                  type="number"
                  placeholder="Height"
                />
              )}
            />
            {errors.dimension?.height && (
              <p className="text-red-500 text-sm">
                {errors.dimension.height.message}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Weight */}
      <div className="mb-4">
        <label className="block text-gray-700">Weight</label>
        <Controller
          name="weight"
          control={control}
          rules={{ required: 'Weight is required' }}
          render={({ field }) => (
            <input
              {...field}
              className="border p-2 w-full text-black"
              type="number"
              placeholder="Weight (kg)"
            />
          )}
        />
        {errors.weight && (
          <p className="text-red-500 text-sm">{errors.weight.message}</p>
        )}
      </div>

      {/* Additional Fields */}
      {/* Handling */}
      <div className="mb-4 flex items-center space-x-8">
        {/* Requires Careful Handling */}
        <div className="flex items-center">
          <label
            htmlFor="requiresCarefulHandling"
            className="text-gray-700 mr-2 cursor-pointer"
          >
            Requires Careful Handling
          </label>
          <Controller
            name="requiresCarefulHandling"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                id="requiresCarefulHandling"
                type="checkbox"
                className="mr-2 cursor-pointer"
                checked={field.value || false}
                onChange={(e) => field.onChange(e.target.checked)}
              />
            )}
          />
        </div>

        {/* Is Fragile */}
        <div className="flex items-center">
          <label
            htmlFor="isFragile"
            className="text-gray-700 mr-2 cursor-pointer"
          >
            Fragile Item?
          </label>
          <Controller
            name="isFragile"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                id="isFragile"
                type="checkbox"
                className="mr-2 cursor-pointer"
                checked={field.value || false}
                onChange={(e) => field.onChange(e.target.checked)}
              />
            )}
          />
        </div>
      </div>

      {/* Insurance and Priority */}
      <div className="mb-4 flex items-center space-x-8">
        {/* Insurance */}
        <div className="flex items-center">
          <label
            htmlFor="insurance"
            className="text-gray-700 mr-2 cursor-pointer"
          >
            Is Insured?
          </label>
          <Controller
            name="insurance"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                id="insurance"
                type="checkbox"
                className="mr-2 cursor-pointer"
                checked={field.value || false}
                onChange={(e) => field.onChange(e.target.checked)}
              />
            )}
          />
        </div>

        {/* Priority */}
        <div className="flex items-center">
          <label
            htmlFor="priority"
            className="text-gray-700 mr-2 cursor-pointer"
          >
            Priority
          </label>
          <Controller
            name="priority"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                id="priority"
                type="checkbox"
                className="mr-2 cursor-pointer"
                checked={field.value || false}
                onChange={(e) => field.onChange(e.target.checked)}
              />
            )}
          />
        </div>
      </div>

      {/* Special Instructions */}
      <div className="mb-4">
        <label className="block text-gray-700">Special Instructions</label>
        <Controller
          name="specialInstructions"
          control={control}
          // rules={{
          //   required: 'Special instructions are required.',
          //   maxLength: {
          //     value: 500,
          //     message: 'Special instructions cannot exceed 500 characters.',
          //   },
          // }}
          render={({ field }) => (
            <textarea
              {...field}
              className="border p-2 w-full text-black"
              placeholder="Enter any specific instructions"
            />
          )}
        />
        {/* {errors.specialInstructions && (
          <p className="text-red-500 text-sm">
            {errors.specialInstructions.message}
          </p>
        )} */}
      </div>

      {/* Package Photos */}
      <PackagePhotos
        setValue={setValue}
        getValues={getValues}
        control={control}
      />
    </div>
  );
};
