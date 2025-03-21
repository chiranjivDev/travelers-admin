'use client';

interface Package {
  id: string;
  name: string;
}
interface PackageDropdownProps {
  label: string;
  options: Package[];
  selectedValue: string;
  onSelect: (value: string) => void;
}

export default function TravelerPackageDropdown({
  label,
  options,
  selectedValue,
  onSelect,
}: PackageDropdownProps) {
  return (
    <div className="relative">
      <label className="block text-gray-400 text-sm mb-1">{label}</label>
      <select
        className="w-full bg-gray-800 text-white border border-gray-600 p-2 rounded"
        value={selectedValue}
        onChange={(e) => onSelect(e.target.value)}
      >
        <option value="" disabled>
          Select a package
        </option>
        {options.map((option, index) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
}
