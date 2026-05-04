'use client';

import * as React from 'react';
import { toast } from 'sonner';
import { Label } from '@/components/ui/label';
import { guardiansApi, type Guardian } from '@/lib/api/guardians';

interface GuardianSearchProps {
  value: string;
  onChange: (guardianId: string, guardianDisplay: string) => void;
  required?: boolean;
}

export function GuardianSearch({ value, onChange, required = false }: GuardianSearchProps) {
  const [guardians, setGuardians] = React.useState<Guardian[]>([]);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [showDropdown, setShowDropdown] = React.useState(false);

  // Fetch guardians when search term changes
  React.useEffect(() => {
    const fetchGuardians = async () => {
      try {
        setIsLoading(true);
        const results = await guardiansApi.searchGuardians(searchTerm);
        setGuardians(results);
      } catch (error) {
        console.error(error);
        toast.error('Failed to load guardians');
      } finally {
        setIsLoading(false);
      }
    };

    // Debounce search
    const timeoutId = setTimeout(fetchGuardians, 300);
    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  const handleSelect = (guardian: Guardian) => {
    const display = `${guardian.name}${guardian.phone ? ` (${guardian.phone})` : ''}`;
    onChange(guardian.id, display);
    setSearchTerm(display);
    setShowDropdown(false);
  };

  return (
    <div className="space-y-2">
      <Label className="text-sm font-semibold text-gray-700">
        Select Guardian {required && <span className="text-red-500">*</span>}
      </Label>
      <div className="relative">
        <div
          className="w-full h-10 border border-gray-200 rounded-md px-3 flex items-center cursor-pointer bg-white"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <input
            type="text"
            placeholder="Search by name or phone..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setShowDropdown(true);
            }}
            onFocus={() => setShowDropdown(true)}
            className="w-full outline-none text-sm bg-transparent text-gray-700"
            autoComplete="off"
          />
          {isLoading && (
            <div className="animate-spin h-4 w-4 border-2 border-[#25a194] border-transparent border-t-[#25a194] rounded-full" />
          )}
        </div>

        {/* Dropdown menu */}
        {showDropdown && (searchTerm || guardians.length > 0) && (
          <div className="absolute top-full left-0 right-0 mt-1 border border-gray-200 rounded-md bg-white shadow-lg z-10 max-h-60 overflow-y-auto">
            {isLoading ? (
              <div className="p-3 text-sm text-gray-500 text-center">Loading guardians...</div>
            ) : guardians.length === 0 ? (
              <div className="p-3 text-sm text-gray-500 text-center">No guardians found</div>
            ) : (
              guardians.map((guardian) => (
                <div
                  key={guardian.id}
                  onClick={() => handleSelect(guardian)}
                  className="p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                >
                  <div className="text-sm font-medium text-gray-900">{guardian.name}</div>
                  {guardian.phone && <div className="text-xs text-gray-500">{guardian.phone}</div>}
                </div>
              ))
            )}
          </div>
        )}
      </div>
      <input type="hidden" name="existingGuardianId" value={value} />
    </div>
  );
}
