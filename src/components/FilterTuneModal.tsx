import React, { useState } from 'react';

interface FilterTuneModalProps {
  isOpen: boolean;
  onClose: () => void;
  radius: number;
  onRadiusChange: (val: number) => void;
  verifiedOnly: boolean;
  onToggleVerifiedOnly: (val: boolean) => void;
  selectedArrivalFilter: string;
  onArrivalFilterChange: (val: string) => void;
  onReset: () => void;
}

export const FilterTuneModal: React.FC<FilterTuneModalProps> = ({
  isOpen,
  onClose,
  radius,
  onRadiusChange,
  verifiedOnly,
  onToggleVerifiedOnly,
  selectedArrivalFilter,
  onArrivalFilterChange,
  onReset
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl p-5 sm:p-6 shadow-2xl border border-[#1e1b4b]/10 animate-in slide-in-from-bottom-6 duration-200">
        <div className="flex items-center justify-between pb-3 border-b border-[#1e1b4b]/5">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#1e1b4b] text-white flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px]">tune</span>
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#070235]">Discovery Filters</h3>
              <p className="text-[11px] text-[#47464f]">Tune your neighborhood connection radius</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#f4f3f1] hover:bg-[#e9e8e5] text-[#47464f] flex items-center justify-center"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <div className="space-y-5 my-4">
          {/* Maximum Distance */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-[#070235]">Neighborhood Radius</span>
              <span className="text-xs font-bold text-[#fd6a49]">{radius} km</span>
            </div>
            <input
              type="range"
              min={1}
              max={15}
              step={1}
              value={radius}
              onChange={(e) => onRadiusChange(Number(e.target.value))}
              className="w-full accent-[#fd6a49] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-[#787680] mt-1">
              <span>Walking (1-3 km)</span>
              <span>Metro/Quick ride (5-10 km)</span>
              <span>All BLR (15 km)</span>
            </div>
          </div>

          {/* New Arrival Filter */}
          <div>
            <span className="text-xs font-bold text-[#070235] block mb-2">
              Arrival Timeline
            </span>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'all', label: 'Any Arrival' },
                { id: '2wks', label: '< 2 Weeks' },
                { id: '1mo', label: '< 1 Month' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => onArrivalFilterChange(item.id)}
                  className={`py-2 px-2 rounded-xl text-xs font-semibold border transition-all text-center ${
                    selectedArrivalFilter === item.id
                      ? 'bg-[#ffdad2] border-[#fd6a49] text-[#3d0600]'
                      : 'bg-[#faf9f6] border-[#1e1b4b]/10 text-[#47464f] hover:bg-[#f4f3f1]'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Verified Members Only Toggle */}
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#faf9f6] border border-[#1e1b4b]/5">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[20px] text-[#fd6a49]">
                verified_user
              </span>
              <div>
                <span className="text-xs font-bold text-[#070235] block">
                  Verified Members Only
                </span>
                <span className="text-[11px] text-[#787680]">
                  Hide unverified newcomer profiles
                </span>
              </div>
            </div>
            <button
              onClick={() => onToggleVerifiedOnly(!verifiedOnly)}
              className={`w-11 h-6 rounded-full transition-colors relative flex items-center px-0.5 ${
                verifiedOnly ? 'bg-[#fd6a49]' : 'bg-[#dbdad7]'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
                  verifiedOnly ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-3 border-t border-[#1e1b4b]/5 flex items-center justify-between gap-3">
          <button
            onClick={onReset}
            className="px-4 py-2 text-xs font-semibold text-[#47464f] hover:text-[#070235]"
          >
            Reset Filters
          </button>
          <button
            onClick={onClose}
            className="flex-1 h-11 rounded-full bg-[#070235] text-white text-xs font-bold hover:bg-[#1e1b4b] transition-colors"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};
