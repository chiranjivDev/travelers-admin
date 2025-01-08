'use client'

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { FiChevronDown, FiSearch } from 'react-icons/fi';

interface StationSelectProps {
  value?: string;
  onChange: (value: string, details?: any) => void;
  className?: string;
  id?: string;
  placeholder?: string;
}

interface StationDetails {
  id: string;
  name: string;
  city: string;
  description: string;
  address: {
    street: string;
    postalCode: string;
    city: string;
    state: string;
    country: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  terminals?: string[];
}

const STATIONS: Record<string, StationDetails[]> = {
  'Germany - Major International Airports': [
    { 
      id: 'fra', 
      name: 'Frankfurt Airport (FRA)', 
      city: 'Frankfurt',
      description: 'The busiest airport in Germany',
      address: {
        street: '60547 Frankfurt Airport',
        postalCode: '60547',
        city: 'Frankfurt',
        state: 'Hesse',
        country: 'Germany',
        coordinates: {
          lat: 50.0379,
          lng: 8.5622
        }
      },
      terminals: ['Terminal 1', 'Terminal 2']
    },
    { 
      id: 'muc', 
      name: 'Munich Airport (MUC)', 
      city: 'Munich',
      description: 'The second largest airport in Germany',
      address: {
        street: 'Nordallee 25',
        postalCode: '85356',
        city: 'Munich',
        state: 'Bavaria',
        country: 'Germany',
        coordinates: {
          lat: 48.3537,
          lng: 11.7750
        }
      },
      terminals: ['Terminal 1', 'Terminal 2', 'Satellite Terminal']
    },
    { 
      id: 'ber', 
      name: 'Berlin Brandenburg Airport (BER)', 
      city: 'Berlin',
      description: 'Main international airport serving Berlin, replaced Tegel and Schönefeld airports',
      address: {
        street: 'Willy-Brandt-Platz',
        postalCode: '12529',
        city: 'Schönefeld',
        state: 'Brandenburg',
        country: 'Germany',
        coordinates: {
          lat: 52.3667,
          lng: 13.5033
        }
      },
      terminals: ['Terminal 1', 'Terminal 2']
    },
    { 
      id: 'dus', 
      name: 'Düsseldorf Airport (DUS)', 
      city: 'Düsseldorf',
      description: 'Major airport serving the Rhine-Ruhr metropolitan region',
      address: {
        street: 'Flughafenstraße 120',
        postalCode: '40474',
        city: 'Düsseldorf',
        state: 'North Rhine-Westphalia',
        country: 'Germany',
        coordinates: {
          lat: 51.2875,
          lng: 6.7667
        }
      },
      terminals: ['Terminal A', 'Terminal B', 'Terminal C']
    },
    {
      id: 'ham',
      name: 'Hamburg Airport (HAM)',
      city: 'Hamburg',
      description: 'Major international airport serving northern Germany',
      address: {
        street: 'Flughafenstraße 1-3',
        postalCode: '22335',
        city: 'Hamburg',
        state: 'Hamburg',
        country: 'Germany',
        coordinates: {
          lat: 53.6304,
          lng: 10.0067
        }
      },
      terminals: ['Terminal 1', 'Terminal 2']
    },
    {
      id: 'str',
      name: 'Stuttgart Airport (STR)',
      city: 'Stuttgart',
      description: 'International airport serving Stuttgart and the surrounding region',
      address: {
        street: 'Flughafenstraße 32',
        postalCode: '70629',
        city: 'Stuttgart',
        state: 'Baden-Württemberg',
        country: 'Germany',
        coordinates: {
          lat: 48.6899,
          lng: 9.2220
        }
      },
      terminals: ['Terminal 1', 'Terminal 2', 'Terminal 3', 'Terminal 4']
    },
    {
      id: 'cgn',
      name: 'Cologne Bonn Airport (CGN)',
      city: 'Cologne',
      description: 'International airport located between Cologne and Bonn',
      address: {
        street: 'Kennedystraße',
        postalCode: '51147',
        city: 'Cologne',
        state: 'North Rhine-Westphalia',
        country: 'Germany',
        coordinates: {
          lat: 50.8659,
          lng: 7.1427
        }
      },
      terminals: ['Terminal 1', 'Terminal 2']
    },
    {
      id: 'haj',
      name: 'Hanover Airport (HAJ)',
      city: 'Hanover',
      description: 'International airport serving the city of Hanover in Lower Saxony',
      address: {
        street: 'Flughafenstraße 4',
        postalCode: '30855',
        city: 'Langenhagen',
        state: 'Lower Saxony',
        country: 'Germany',
        coordinates: {
          lat: 52.4611,
          lng: 9.6850
        }
      },
      terminals: ['Terminal A', 'Terminal B', 'Terminal C']
    },
    {
      id: 'nue',
      name: 'Nuremberg Airport (NUE)',
      city: 'Nuremberg',
      description: 'International airport serving the city of Nuremberg in Bavaria',
      address: {
        street: 'Flughafenstraße 100',
        postalCode: '90411',
        city: 'Nuremberg',
        state: 'Bavaria',
        country: 'Germany',
        coordinates: {
          lat: 49.4987,
          lng: 11.0780
        }
      },
      terminals: ['Terminal 1']
    }
  ],
  'Germany - Regional Airports': [
    {
      id: 'bre',
      name: 'Bremen Airport (BRE)',
      city: 'Bremen',
      description: 'Regional airport serving Bremen and surrounding areas',
      address: {
        street: 'Flughafenallee 20',
        postalCode: '28199',
        city: 'Bremen',
        state: 'Bremen',
        country: 'Germany',
        coordinates: {
          lat: 53.0475,
          lng: 8.7873
        }
      },
      terminals: ['Main Terminal']
    },
    {
      id: 'lej',
      name: 'Leipzig/Halle Airport (LEJ)',
      city: 'Leipzig',
      description: 'Regional airport located between Leipzig and Halle',
      address: {
        street: 'Flughafenring 11',
        postalCode: '04435',
        city: 'Schkeuditz',
        state: 'Saxony',
        country: 'Germany',
        coordinates: {
          lat: 51.4239,
          lng: 12.2167
        }
      },
      terminals: ['Terminal A', 'Terminal B']
    },
    {
      id: 'dtm',
      name: 'Dortmund Airport (DTM)',
      city: 'Dortmund',
      description: 'Regional airport serving Dortmund and nearby regions',
      address: {
        street: 'Flughafenring 11',
        postalCode: '44319',
        city: 'Dortmund',
        state: 'North Rhine-Westphalia',
        country: 'Germany',
        coordinates: {
          lat: 51.5180,
          lng: 7.6122
        }
      },
      terminals: ['Main Terminal']
    },
    {
      id: 'fmo',
      name: 'Münster Osnabrück Airport (FMO)',
      city: 'Münster',
      description: 'Regional airport located near Münster and Osnabrück',
      address: {
        street: 'Flughafenstraße 40',
        postalCode: '48268',
        city: 'Greven',
        state: 'North Rhine-Westphalia',
        country: 'Germany',
        coordinates: {
          lat: 52.1346,
          lng: 7.6848
        }
      },
      terminals: ['Main Terminal']
    },
    {
      id: 'fkb',
      name: 'Karlsruhe/Baden-Baden Airport (FKB)',
      city: 'Baden-Baden',
      description: 'Regional airport serving southwestern Germany',
      address: {
        street: 'Flughafenstraße 1',
        postalCode: '77836',
        city: 'Rheinmünster',
        state: 'Baden-Württemberg',
        country: 'Germany',
        coordinates: {
          lat: 48.7794,
          lng: 8.0805
        }
      },
      terminals: ['Main Terminal']
    },
    {
      id: 'nrn',
      name: 'Weeze Airport (NRN)',
      city: 'Weeze',
      description: 'Regional airport near the Dutch border',
      address: {
        street: 'Flughafen-Ring 1',
        postalCode: '47652',
        city: 'Weeze',
        state: 'North Rhine-Westphalia',
        country: 'Germany',
        coordinates: {
          lat: 51.6024,
          lng: 6.1422
        }
      },
      terminals: ['Main Terminal']
    }
  ],
  'Iran - Major International Airports': [
    { 
      id: 'ika', 
      name: 'Tehran Imam Khomeini International Airport (IKA)', 
      city: 'Tehran',
      description: 'Main international gateway in Tehran',
      address: {
        street: 'Tehran Qom Old Rd',
        postalCode: '7635131558',
        city: 'Tehran',
        state: 'Tehran Province',
        country: 'Iran',
        coordinates: {
          lat: 35.4161,
          lng: 51.1522
        }
      },
      terminals: ['Terminal 1', 'Terminal 2', 'Terminal 3']
    },
    { 
      id: 'thr', 
      name: 'Tehran Mehrabad International Airport (THR)', 
      city: 'Tehran',
      description: 'Primarily for domestic flights, with some regional international flights',
      address: {
        street: 'Azadi Street',
        postalCode: '1387833411',
        city: 'Tehran',
        state: 'Tehran Province',
        country: 'Iran',
        coordinates: {
          lat: 35.6892,
          lng: 51.3134
        }
      },
      terminals: ['Terminal 1', 'Terminal 2', 'Terminal 4', 'Terminal 6']
    },
    { 
      id: 'mhd', 
      name: 'Mashhad International Airport (MHD)', 
      city: 'Mashhad',
      description: 'Major pilgrimage and tourism hub',
      address: {
        street: 'Airport Blvd',
        postalCode: '9165931167',
        city: 'Mashhad',
        state: 'Razavi Khorasan Province',
        country: 'Iran',
        coordinates: {
          lat: 36.2352,
          lng: 59.6408
        }
      },
      terminals: ['International Terminal', 'Domestic Terminal']
    },
    {
      id: 'syz',
      name: 'Shiraz International Airport (SYZ)',
      city: 'Shiraz',
      description: 'Serving Shiraz, popular for tourism and cultural visits',
      address: {
        street: 'Airport Blvd',
        postalCode: '7188113777',
        city: 'Shiraz',
        state: 'Fars Province',
        country: 'Iran',
        coordinates: {
          lat: 29.5392,
          lng: 52.5898
        }
      },
      terminals: ['International Terminal', 'Domestic Terminal']
    },
    {
      id: 'ifn',
      name: 'Isfahan International Airport (IFN)',
      city: 'Isfahan',
      description: 'Located in Isfahan, connecting historical and cultural hubs',
      address: {
        street: 'Airport Blvd',
        postalCode: '8159184111',
        city: 'Isfahan',
        state: 'Isfahan Province',
        country: 'Iran',
        coordinates: {
          lat: 32.7505,
          lng: 51.8616
        }
      },
      terminals: ['Main Terminal']
    },
    {
      id: 'tbz',
      name: 'Tabriz International Airport (TBZ)',
      city: 'Tabriz',
      description: 'Serving Tabriz and northwestern Iran',
      address: {
        street: 'Airport Road',
        postalCode: '5169873741',
        city: 'Tabriz',
        state: 'East Azerbaijan Province',
        country: 'Iran',
        coordinates: {
          lat: 38.1339,
          lng: 46.2350
        }
      },
      terminals: ['Main Terminal']
    },
    {
      id: 'kih',
      name: 'Kish International Airport (KIH)',
      city: 'Kish Island',
      description: 'Serving Kish Island, a major tourism and free trade zone',
      address: {
        street: 'Airport Blvd',
        postalCode: '7941773175',
        city: 'Kish Island',
        state: 'Hormozgan Province',
        country: 'Iran',
        coordinates: {
          lat: 26.5261,
          lng: 53.9802
        }
      },
      terminals: ['International Terminal', 'Domestic Terminal']
    },
    {
      id: 'gsm',
      name: 'Qeshm International Airport (GSM)',
      city: 'Qeshm',
      description: 'Located on Qeshm Island, a key trade and tourism hub',
      address: {
        street: 'Airport Road',
        postalCode: '7951619555',
        city: 'Qeshm',
        state: 'Hormozgan Province',
        country: 'Iran',
        coordinates: {
          lat: 26.7545,
          lng: 55.9024
        }
      },
      terminals: ['Main Terminal']
    },
    {
      id: 'awz',
      name: 'Ahvaz International Airport (AWZ)',
      city: 'Ahvaz',
      description: 'Located in Ahvaz, southwestern Iran',
      address: {
        street: 'Airport Road',
        postalCode: '6165699375',
        city: 'Ahvaz',
        state: 'Khuzestan Province',
        country: 'Iran',
        coordinates: {
          lat: 31.3374,
          lng: 48.7621
        }
      },
      terminals: ['Main Terminal']
    },
    {
      id: 'bnd',
      name: 'Bandar Abbas International Airport (BND)',
      city: 'Bandar Abbas',
      description: 'Serving Bandar Abbas, a key port city',
      address: {
        street: 'Airport Blvd',
        postalCode: '7915893111',
        city: 'Bandar Abbas',
        state: 'Hormozgan Province',
        country: 'Iran',
        coordinates: {
          lat: 27.2183,
          lng: 56.3778
        }
      },
      terminals: ['Main Terminal']
    }
  ],
  'Iran - Regional Airports': [
    {
      id: 'omh',
      name: 'Urmia Airport (OMH)',
      city: 'Urmia',
      description: 'Serving Urmia, with some international connections',
      address: {
        street: 'Airport Road',
        postalCode: '5735115111',
        city: 'Urmia',
        state: 'West Azerbaijan Province',
        country: 'Iran',
        coordinates: {
          lat: 37.6680,
          lng: 45.0687
        }
      },
      terminals: ['Main Terminal']
    },
    {
      id: 'ras',
      name: 'Rasht Airport (RAS)',
      city: 'Rasht',
      description: 'Located in Rasht, northern Iran',
      address: {
        street: 'Airport Road',
        postalCode: '4199613855',
        city: 'Rasht',
        state: 'Gilan Province',
        country: 'Iran',
        coordinates: {
          lat: 37.3253,
          lng: 49.6187
        }
      },
      terminals: ['Main Terminal']
    },
    {
      id: 'ksh',
      name: 'Kermanshah Airport (KSH)',
      city: 'Kermanshah',
      description: 'Serving Kermanshah, a growing regional hub',
      address: {
        street: 'Airport Road',
        postalCode: '6714415333',
        city: 'Kermanshah',
        state: 'Kermanshah Province',
        country: 'Iran',
        coordinates: {
          lat: 34.3459,
          lng: 47.1581
        }
      },
      terminals: ['Main Terminal']
    },
    {
      id: 'zah',
      name: 'Zahedan International Airport (ZAH)',
      city: 'Zahedan',
      description: 'Located in southeastern Iran',
      address: {
        street: 'Airport Road',
        postalCode: '9816733785',
        city: 'Zahedan',
        state: 'Sistan and Baluchestan Province',
        country: 'Iran',
        coordinates: {
          lat: 29.4754,
          lng: 60.9062
        }
      },
      terminals: ['Main Terminal']
    },
    {
      id: 'azd',
      name: 'Yazd Airport (AZD)',
      city: 'Yazd',
      description: 'Serving Yazd, a UNESCO World Heritage city',
      address: {
        street: 'Airport Road',
        postalCode: '8917198639',
        city: 'Yazd',
        state: 'Yazd Province',
        country: 'Iran',
        coordinates: {
          lat: 31.9048,
          lng: 54.2765
        }
      },
      terminals: ['Main Terminal']
    },
    {
      id: 'ajk',
      name: 'Arak Airport (AJK)',
      city: 'Arak',
      description: 'Serving Arak and central Iran',
      address: {
        street: 'Airport Road',
        postalCode: '3818777777',
        city: 'Arak',
        state: 'Markazi Province',
        country: 'Iran',
        coordinates: {
          lat: 34.1381,
          lng: 49.8472
        }
      },
      terminals: ['Main Terminal']
    },
    {
      id: 'buz',
      name: 'Bushehr Airport (BUZ)',
      city: 'Bushehr',
      description: 'Located in Bushehr, a coastal city',
      address: {
        street: 'Airport Road',
        postalCode: '7515615468',
        city: 'Bushehr',
        state: 'Bushehr Province',
        country: 'Iran',
        coordinates: {
          lat: 28.9448,
          lng: 50.8346
        }
      },
      terminals: ['Main Terminal']
    },
    {
      id: 'abd',
      name: 'Abadan International Airport (ABD)',
      city: 'Abadan',
      description: 'Located in Abadan, southwestern Iran',
      address: {
        street: 'Airport Road',
        postalCode: '6319997468',
        city: 'Abadan',
        state: 'Khuzestan Province',
        country: 'Iran',
        coordinates: {
          lat: 30.3711,
          lng: 48.2283
        }
      },
      terminals: ['Main Terminal']
    }
  ]
};

const StationSelect: React.FC<StationSelectProps> = ({
  value,
  onChange,
  className = '',
  id,
  placeholder = 'Select airport'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredAirports = useMemo(() => {
    return Object.entries(STATIONS).flatMap(([country, stations]) =>
      stations.filter(station =>
        station.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        station.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        country.toLowerCase().includes(searchTerm.toLowerCase()) ||
        station.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        station.address.street.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm]);

  const selectedAirport = filteredAirports.find(airport => airport.id === value);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full p-3 bg-gray-800/90 border border-gray-700 rounded-lg text-left
          focus:outline-none focus:ring-2 focus:ring-blue-500/20 hover:bg-gray-800 
          transition-colors ${className}`}
      >
        <div className="flex items-center justify-between">
          <span className={selectedAirport ? 'text-white' : 'text-gray-400'}>
            {selectedAirport ? `${selectedAirport.name} (${selectedAirport.id})` : placeholder}
          </span>
          <FiChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-200
            ${isOpen ? 'transform rotate-180' : ''}`} />
        </div>
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-2">
          <div className="p-2 bg-gray-800 border border-gray-700 rounded-lg shadow-xl">
            <div className="relative mb-2">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search airports..."
                className="w-full p-2 pl-8 bg-gray-800/90 border border-gray-700 rounded-lg
                  text-white placeholder:text-gray-400 focus:border-blue-500 
                  focus:ring-2 focus:ring-blue-500/20"
              />
              <FiSearch className="absolute left-2.5 top-1/2 transform -translate-y-1/2 
                text-gray-400 w-4 h-4" />
            </div>

            <div className="max-h-60 overflow-y-auto">
              {filteredAirports.map((airport, index) => (
                <button
                  key={airport.id}
                  onClick={() => {
                    onChange(airport.id, airport);
                    setIsOpen(false);
                    setSearchTerm('');
                  }}
                  className={`w-full px-3 py-2 text-left hover:bg-gray-700/50 transition-colors
                    ${index === 0 ? 'rounded-t-lg' : ''}
                    ${index === filteredAirports.length - 1 ? 'rounded-b-lg' : ''}
                    ${value === airport.id ? 'bg-gray-700/50' : ''}`}
                >
                  <div className="flex flex-col">
                    <span className="text-white font-medium">
                      {airport.name} ({airport.id})
                    </span>
                    <span className="text-sm text-gray-400">
                      {airport.city}, {airport.country}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StationSelect; 