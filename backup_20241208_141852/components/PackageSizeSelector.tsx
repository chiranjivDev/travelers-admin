interface PackageSizeSelectorProps {
  value: string;
  onChange: (size: 'small' | 'medium' | 'large' | 'custom') => void;
}

export default function PackageSizeSelector({ value, onChange }: PackageSizeSelectorProps) {
  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">Package Size</label>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          {
            id: 'small',
            name: 'Small Package',
            dimensions: '30 × 25 × 10 cm',
            weight: 'Up to 5 kg',
            description: 'Perfect for small items like books, clothes, or electronics'
          },
          {
            id: 'medium',
            name: 'Medium Package',
            dimensions: '50 × 35 × 25 cm',
            weight: 'Up to 10 kg',
            description: 'Ideal for medium-sized items like home appliances or multiple items'
          },
          {
            id: 'large',
            name: 'Large Package',
            dimensions: '70 × 50 × 35 cm',
            weight: 'Up to 20 kg',
            description: 'Suitable for large items like furniture or bulky equipment'
          },
          {
            id: 'custom',
            name: 'Custom Size',
            dimensions: 'Custom dimensions',
            weight: 'Custom weight',
            description: 'Specify custom dimensions for your package'
          }
        ].map((size) => (
          <button
            key={size.id}
            type="button"
            onClick={() => onChange(size.id as 'small' | 'medium' | 'large' | 'custom')}
            className={`relative flex flex-col p-4 border rounded-lg transition-all duration-200 ${
              value === size.id
                ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200'
                : 'border-gray-200 hover:border-blue-300'
            }`}
          >
            <div className="flex items-center justify-center mb-3">
              <svg
                className={`w-8 h-8 ${value === size.id ? 'text-blue-500' : 'text-gray-400'}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
            </div>
            <h3 className={`text-sm font-medium ${value === size.id ? 'text-blue-700' : 'text-gray-900'}`}>
              {size.name}
            </h3>
            <p className="mt-1 text-xs text-gray-500">{size.dimensions}</p>
            <p className="mt-1 text-xs text-gray-500">{size.weight}</p>
            <p className="mt-2 text-xs text-gray-500 line-clamp-2">{size.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
} 