import { useEffect, useRef, useState } from 'react';
import { LoadScript } from '@react-google-maps/api';

interface AddressAutocompleteProps {
  placeholder: string;
  value: string;
  onChange: (address: string, placeId?: string) => void;
  className?: string;
}

const libraries: 'places'[] = ['places'];

export default function AddressAutocomplete({
  placeholder,
  value,
  onChange,
  className,
}: AddressAutocompleteProps) {
  const [predictions, setPredictions] = useState<
    google.maps.places.AutocompletePrediction[]
  >([]);
  const [showPredictions, setShowPredictions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const autocompleteService =
    useRef<google.maps.places.AutocompleteService | null>(null);
  const placesService = useRef<google.maps.places.PlacesService | null>(null);

  useEffect(() => {
    if (window.google && !autocompleteService.current) {
      autocompleteService.current =
        new google.maps.places.AutocompleteService();
    }
  }, []);

  const handleInput = async (input: string) => {
    onChange(input);

    if (!input || !autocompleteService.current) {
      setPredictions([]);
      return;
    }

    try {
      const request = {
        input,
        componentRestrictions: {},
        types: ['address', 'establishment', 'geocode'],
      };

      const response =
        await autocompleteService.current.getPlacePredictions(request);
      setPredictions(response.predictions);
      setShowPredictions(true);
    } catch (error) {
      console.error('Error fetching address predictions:', error);
      setPredictions([]);
    }
  };

  const handleSelectAddress = (
    prediction: google.maps.places.AutocompletePrediction,
  ) => {
    onChange(prediction.description, prediction.place_id);
    setPredictions([]);
    setShowPredictions(false);
  };

  return (
    <div className="relative w-full">
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => handleInput(e.target.value)}
        onFocus={() =>
          value && predictions.length > 0 && setShowPredictions(true)
        }
        placeholder={placeholder}
        className={className}
      />
      {showPredictions && predictions.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 max-h-60 overflow-y-auto">
          {predictions.map((prediction) => (
            <div
              key={prediction.place_id}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-black"
              onClick={() => handleSelectAddress(prediction)}
            >
              <div className="font-medium">
                {prediction.structured_formatting.main_text}
              </div>
              <div className="text-sm text-gray-600">
                {prediction.structured_formatting.secondary_text}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
