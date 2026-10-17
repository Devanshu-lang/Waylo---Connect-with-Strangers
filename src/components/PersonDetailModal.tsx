import React, { useState } from 'react';
import { Person } from '../data/mockData';

interface PersonDetailModalProps {
  person: Person | null;
  onClose: () => void;
  onSendMessage: (person: Person, message: string) => void;
}

export const PersonDetailModal: React.FC<PersonDetailModalProps> = ({
  person,
  onClose,
  onSendMessage
}) => {
  const [customMessage, setCustomMessage] = useState('');
  const [copiedSuccess, setCopiedSuccess] = useState(false);

  if (!person) return null;

  const handleSelectIcebreaker = (prompt: string) => {
    setCustomMessage(prompt);
  };

  const handleSend = () => {
    if (!customMessage.trim()) return;
    onSendMessage(person, customMessage.trim());
    setCustomMessage('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-lg bg-[#faf9f6] rounded-t-3xl sm:rounded-3xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden border border-[#1e1b4b]/10 animate-in slide-in-from-bottom-6 duration-200"
      >
        {/* Sticky Header with Close button */}
        <div className="relative h-64 sm:h-72 w-full flex-shrink-0 bg-neutral-900">
          <img
            src={person.avatar}
            alt={person.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#070235]/90 via-[#070235]/30 to-transparent" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-md flex items-center justify-center transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>

          {/* Arrival Tag */}
          <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#fd6a49]"></span>
            <span className="text-xs text-[#070235] font-bold">
              {person.arrivalTag}
            </span>
          </div>

          {/* Basic Info on Image Bottom */}
          <div className="absolute bottom-4 left-5 right-5 text-white">
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold tracking-tight">
                {person.name}, {person.age}
              </h2>
              {person.isVerified && (
                <span
                  className="material-symbols-outlined text-[#ffdad2] text-[20px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                  title="Verified Community Member"
                >
                  verified
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 text-xs text-[#e3e2e0] mt-1 font-medium">
              <span className="flex items-center gap-0.5">
                <span className="material-symbols-outlined text-[14px]">near_me</span>
                {person.neighborhood} ({person.distance})
              </span>
              <span>•</span>
              <span>Originally from {person.originCity}</span>
            </div>
          </div>
        </div>

        {/* Scrollable Body Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 flex-1">
          {/* Shared Rhythms */}
          <div>
            <div className="text-[11px] font-bold text-[#787680] uppercase tracking-wider mb-2">
              Shared Rhythms & Interests
            </div>
            <div className="flex flex-wrap gap-1.5">
              {person.sharedInterests.map((interest) => (
                <span
                  key={interest}
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#ffdad2] text-[#3d0600] text-xs font-semibold"
                >
                  <span className="material-symbols-outlined text-[14px]">interests</span>
                  {interest}
                </span>
              ))}
            </div>
          </div>

          {/* Bio Quote */}
          <div className="p-4 rounded-2xl bg-white shadow-sm border border-[#1e1b4b]/5">
            <p className="text-sm text-[#1a1c1a] italic leading-relaxed">
              {person.bio}
            </p>
            <p className="text-xs text-[#47464f] mt-2.5 leading-relaxed">
              {person.fullBio}
            </p>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-2xl bg-white border border-[#1e1b4b]/5">
              <span className="font-bold text-[#787680] block uppercase tracking-wider text-[10px] mb-1">
                Profession
              </span>
              <span className="text-[#1a1c1a] font-medium block">
                {person.profession}
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-white border border-[#1e1b4b]/5">
              <span className="font-bold text-[#787680] block uppercase tracking-wider text-[10px] mb-1">
                Languages
              </span>
              <span className="text-[#1a1c1a] font-medium block">
                {person.languages.join(', ')}
              </span>
            </div>
          </div>

          {/* Prompt 1: Ideal Sunday */}
          <div className="p-4 rounded-2xl bg-[#f4f3f1] border border-[#1e1b4b]/5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#070235] mb-1">
              <span className="material-symbols-outlined text-[16px] text-[#fd6a49]">
                wb_sunny
              </span>
              <span>My Ideal Sunday in Bengaluru</span>
            </div>
            <p className="text-xs text-[#47464f] leading-relaxed">
              {person.idealSunday}
            </p>
          </div>

          {/* Prompt 2: Favorite Spot */}
          <div className="p-4 rounded-2xl bg-[#f4f3f1] border border-[#1e1b4b]/5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#070235] mb-1">
              <span className="material-symbols-outlined text-[16px] text-[#fd6a49]">
                location_on
              </span>
              <span>Favorite Hidden Corner</span>
            </div>
            <p className="text-xs text-[#47464f] leading-relaxed">
              {person.favoriteSpot}
            </p>
          </div>

          {/* Low-pressure Icebreakers */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-[#787680] uppercase tracking-wider">
                Low-Pressure Icebreakers (Tap to select)
              </span>
              <span className="text-[11px] text-[#fd6a49] font-medium flex items-center gap-0.5">
                <span className="material-symbols-outlined text-[14px]">auto_awesome</span>
                Tailored
              </span>
            </div>
            <div className="space-y-2">
              {person.icebreakers.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectIcebreaker(prompt)}
                  className="w-full text-left p-3 rounded-xl bg-white hover:bg-[#ffdad2]/30 border border-[#1e1b4b]/5 text-xs text-[#1a1c1a] transition-all flex items-start gap-2 group"
                >
                  <span className="material-symbols-outlined text-[16px] text-[#fd6a49] mt-0.5 group-hover:scale-110 transition-transform">
                    lightbulb
                  </span>
                  <span className="flex-1 leading-snug font-medium">{prompt}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Message Input & Send */}
          <div className="pt-2">
            <div className="text-[11px] font-bold text-[#787680] uppercase tracking-wider mb-2">
              Say Hello to {person.name.split(' ')[0]}
            </div>
            <div className="relative">
              <textarea
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                placeholder={`Hi ${person.name.split(' ')[0]}, saw you enjoy specialty coffee too...`}
                rows={3}
                className="w-full p-3.5 rounded-2xl bg-white border border-[#1e1b4b]/10 text-xs text-[#1a1c1a] focus:outline-none focus:ring-2 focus:ring-[#fd6a49] transition-all placeholder:text-[#787680]"
              />
            </div>
            <div className="flex items-center gap-2 mt-3">
              <button
                onClick={handleSend}
                disabled={!customMessage.trim()}
                className="flex-1 h-11 rounded-full bg-[#fd6a49] disabled:opacity-50 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-[0_4px_14px_rgba(253,106,73,0.3)] hover:opacity-95 active:scale-95 transition-all"
              >
                <span className="material-symbols-outlined text-[18px]">
                  waving_hand
                </span>
                <span>Send Low-Pressure Hello</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
