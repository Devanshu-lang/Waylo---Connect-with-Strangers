import React, { useState } from 'react';

interface HeaderProps {
  currentCity: string;
  onCityChange: (city: string) => void;
  onOpenSafety: () => void;
  onNavigateToProfile: () => void;
  nearbyCount?: number;
}

const NEIGHBORHOODS = [
  'Bengaluru (All)',
  'Indiranagar',
  'Koramangala',
  'HSR Layout',
  'Lavelle Road / Central',
  'Whitefield',
  'Malleshwaram'
];

export const Header: React.FC<HeaderProps> = ({
  currentCity,
  onCityChange,
  onOpenSafety,
  onNavigateToProfile,
  nearbyCount = 142
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-40 bg-[#faf9f6]/90 backdrop-blur-xl pt-safe shadow-[0_1px_12px_rgba(30,27,75,0.04)] transition-all">
      <div className="max-w-4xl mx-auto h-16 px-4 sm:px-6 flex items-center justify-between gap-2">
        {/* Left: Brand Emblem & City Picker */}
        <div className="flex items-center gap-2 min-w-0 relative">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => onCityChange('Bengaluru')}>
            <img
              alt="WAYLO Brand Emblem"
              className="h-8 w-auto object-contain flex-shrink-0"
              src="https://lh3.googleusercontent.com/aida/AEtjO1VjJhCHMOS1hORBlGE0XsVw9CPcTf3oiTVF5z7efaOQmylPqJkOywrvhrOwnYw3toxMDHJ1OdG0_dl7vaqXypbcVYB4VEG6aKFqiituJsRADWXvrRXDuJtK2cZx6L0GwOwEH0cYZOqTTLdSUzXx2X4-i1Sa6hl6izE1mUeq-R50q_hwldQuEb8IufTsFTD9HUM3nQFimF5flXCwFWY4mZx9Kp6saihIK2lfRjU0sB9ML1IQ72E_7eme0Q"
            />
          </div>

          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-1.5 py-1 px-2.5 rounded-full bg-white/95 hover:bg-[#f4f3f1] border border-[#1e1b4b]/5 shadow-[0_2px_8px_rgba(30,27,75,0.04)] transition-colors min-h-[36px] max-w-[170px]"
            >
              <span className="text-xs text-[#070235] font-bold truncate">
                {currentCity}
              </span>
              <span className="material-symbols-outlined text-[#787680] text-[16px] leading-none">
                expand_more
              </span>
              <span className="hidden xs:inline-flex items-center justify-center px-1.5 py-0.5 rounded-full bg-[#ffdad2] text-[#3d0600] text-[10px] font-bold leading-none">
                {nearbyCount}
              </span>
            </button>

            {/* Neighborhood Dropdown Menu */}
            {dropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setDropdownOpen(false)}
                />
                <div className="absolute top-full left-0 mt-1.5 w-56 rounded-2xl bg-white shadow-xl border border-[#1e1b4b]/10 py-2 z-20 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-3 py-1.5 text-[11px] font-bold text-[#787680] uppercase tracking-wider">
                    Select Area in Bengaluru
                  </div>
                  {NEIGHBORHOODS.map((hood) => (
                    <button
                      key={hood}
                      onClick={() => {
                        onCityChange(hood);
                        setDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3.5 py-2 text-xs flex items-center justify-between hover:bg-[#faf9f6] transition-colors ${
                        currentCity === hood
                          ? 'font-bold text-[#fd6a49] bg-[#ffdad2]/30'
                          : 'text-[#1a1c1a]'
                      }`}
                    >
                      <span>{hood}</span>
                      {currentCity === hood && (
                        <span className="material-symbols-outlined text-[16px] text-[#fd6a49]">
                          check
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Right: Safety Badge & Maya's Profile Avatar */}
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <button
            onClick={onOpenSafety}
            aria-label="Safety and Trust Verification"
            title="Safety Guidelines & Verified Venues"
            className="w-11 h-11 flex items-center justify-center rounded-full text-[#47464f] hover:text-[#070235] hover:bg-[#e9e8e5] transition-colors relative"
          >
            <span className="material-symbols-outlined text-[22px]">
              shield_person
            </span>
            <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-[#fd6a49] ring-2 ring-white"></span>
          </button>

          <button
            onClick={onNavigateToProfile}
            aria-label="Maya Profile"
            className="p-0.5 rounded-full ring-2 ring-[#e3dfff] hover:ring-[#fd6a49] hover:opacity-95 transition-all focus:outline-none"
          >
            <img
              alt="Maya Profile"
              className="w-8 h-8 rounded-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBARWM5q6gyiZLJSIjA8jEQQws_nJSNxYcteKn5FQJ352XJ3XCrf0SALZm4PU92rEGVW4YS5DiW7fO_O1npwwvQrJw4m687KYbVGXrEvHYQ91fbjq2RQZk4WNL0Hoa2VbpzJ9Cgs3jCWD9Lfk6gZnVY9T2qqukLSRxc0Pn7TEE5HsIKYLuqNOsn4YEsuBbWT8h542J_XzvfdKk1TDvtSOXuyMq4TrBTFiNvCwStBcuiERK7Me0opXA"
            />
          </button>
        </div>
      </div>
    </header>
  );
};
