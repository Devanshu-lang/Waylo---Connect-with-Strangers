import React from 'react';

interface SafetyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SafetyModal: React.FC<SafetyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-[#faf9f6] rounded-t-3xl sm:rounded-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden border border-[#1e1b4b]/10 animate-in slide-in-from-bottom-6 duration-200">
        {/* Header */}
        <div className="p-5 sm:p-6 bg-[#070235] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-[#ffdad2]">
              <span className="material-symbols-outlined text-[22px]">verified_user</span>
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold">Safety & Privacy First</h2>
              <p className="text-xs text-[#e3dfff]">Built for peaceful, low-pressure human connections</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4 text-xs text-[#1a1c1a] flex-1">
          <div className="p-4 rounded-2xl bg-white border border-[#1e1b4b]/5 space-y-1">
            <div className="flex items-center gap-2 font-bold text-[#070235] text-sm">
              <span className="material-symbols-outlined text-[18px] text-[#fd6a49]">storefront</span>
              <span>100% Public, Verified Venues</span>
            </div>
            <p className="text-[#47464f] leading-relaxed">
              Every meetup on WAYLO must happen at approved, bustling public spaces: parks, specialty cafes, cultural centres, or open street food markets. No private apartments or isolated destinations are permitted.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-[#1e1b4b]/5 space-y-1">
            <div className="flex items-center gap-2 font-bold text-[#070235] text-sm">
              <span className="material-symbols-outlined text-[18px] text-[#fd6a49]">location_off</span>
              <span>Zero Live GPS Tracking</span>
            </div>
            <p className="text-[#47464f] leading-relaxed">
              We never broadcast your live location or home address. The app only displays general neighborhood badges (e.g. Indiranagar, ~1.2 km away) to protect your daily privacy.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-[#1e1b4b]/5 space-y-1">
            <div className="flex items-center gap-2 font-bold text-[#070235] text-sm">
              <span className="material-symbols-outlined text-[18px] text-[#fd6a49]">groups</span>
              <span>Intimate Small Groups (Cap of 4–8)</span>
            </div>
            <p className="text-[#47464f] leading-relaxed">
              Mass parties can feel chaotic and overwhelming. Our meetups are intentionally capped at 4 to 8 people to ensure comfortable, low-pressure conversations where everyone gets heard.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-[#1e1b4b]/5 space-y-1">
            <div className="flex items-center gap-2 font-bold text-[#070235] text-sm">
              <span className="material-symbols-outlined text-[18px] text-[#fd6a49]">shield</span>
              <span>Zero-Harassment Community Rule</span>
            </div>
            <p className="text-[#47464f] leading-relaxed">
              WAYLO is not a dating swipe deck or a high-pressure sales pitch. Any unwanted romantic pressure or aggressive sales will lead to immediate community removal.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-white border-t border-[#1e1b4b]/10 flex items-center justify-between">
          <span className="text-[11px] text-[#787680] flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px] text-emerald-600">verified</span>
            Trust & Safety Guarantee
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-full bg-[#1e1b4b] text-white text-xs font-bold hover:bg-[#070235] transition-colors"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};
