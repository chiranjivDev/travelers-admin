import { useState } from 'react';

interface AddressInputProps {
  label: string;
  value: any;
  onChange: (address: any) => void;
  className?: string;
}

export default function AddressInput({ label, value, onChange, className }: AddressInputProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleChange = (field: string, fieldValue: string) => {
    onChange({
      ...value,
      [field]: fieldValue
    });
  };

  return (
    <div className="space-y-2">
      <div 
        className="flex items-center cursor-pointer text-blue-600 text-sm mb-2" 
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <span className="mr-1">{isExpanded ? '▼' : '▶'}</span>
        <span>{label} Address Details</span>
      </div>
      
      {!isExpanded ? (
        <input
          type="text"
          placeholder={`${label} Address (Click arrow for detailed form)`}
          className={className}
          value={value.streetAddress || ''}
          onChange={(e) => handleChange('streetAddress', e.target.value)}
        />
      ) : (
        <div className="space-y-3 bg-gray-50 p-4 rounded-lg">
          <div>
            <input
              type="text"
              placeholder="Street Address"
              className={className}
              value={value.streetAddress || ''}
              onChange={(e) => handleChange('streetAddress', e.target.value)}
            />
            <p className="text-xs text-gray-600 mt-1">Example: 123 Main St, Apt 4B</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <input
                type="text"
                placeholder="City"
                className={className}
                value={value.city || ''}
                onChange={(e) => handleChange('city', e.target.value)}
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="State/Province"
                className={className}
                value={value.state || ''}
                onChange={(e) => handleChange('state', e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <input
                type="text"
                placeholder="Postal Code"
                className={className}
                value={value.postalCode || ''}
                onChange={(e) => handleChange('postalCode', e.target.value)}
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Country"
                className={className}
                value={value.country || ''}
                onChange={(e) => handleChange('country', e.target.value)}
              />
            </div>
          </div>

          <div>
            <input
              type="text"
              placeholder="Additional Instructions (Optional)"
              className={className}
              value={value.instructions || ''}
              onChange={(e) => handleChange('instructions', e.target.value)}
            />
            <p className="text-xs text-gray-600 mt-1">Example: Ring doorbell, Near green mailbox</p>
          </div>
        </div>
      )}
    </div>
  );
}
