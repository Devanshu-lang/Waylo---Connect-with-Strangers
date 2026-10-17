import React from 'react';
import { Person } from '../data/mockData';

interface IcebreakerModalProps {
  person: Person | null;
  onClose: () => void;
  onSelectPrompt: (prompt: string) => void;
}

export const IcebreakerModal: React.FC<IcebreakerModalProps> = ({
  person,
  onClose,
  onSelectPrompt
}) => {
  if (!person) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl p-5 sm:p-6 shadow-2xl border border-[#1e1b4b]/10 animate-in slide-in-from-bottom-6 duration-200">
        <div className="flex items-center justify-between pb-3 border-b border-[#1e1b4b]/5">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-[#ffdad2] text-[#ae3115] flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">lightbulb</span>
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#070235]">
                Low-Pressure Icebreakers
              </h3>
              <p className="text-[11px] text-[#47464f]">
                Tailored for {person.name} ({person.arrivalTag})
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#f4f3f1] hover:bg-[#e9e8e5] text-[#47464f] flex items-center justify-center"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <p className="text-xs text-[#47464f] my-3 leading-relaxed">
          Starting a conversation with a new arrival should never feel like a job interview or dating app opening line. Tap any prompt to initiate:
        </p>

        <div className="space-y-2.5">
          {person.icebreakers.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => {
                onSelectPrompt(prompt);
                onClose();
              }}
              className="w-full text-left p-3.5 rounded-2xl bg-[#faf9f6] hover:bg-[#ffdad2]/40 border border-[#1e1b4b]/5 text-xs text-[#1a1c1a] font-medium transition-all flex items-start gap-2.5 group"
            >
              <span className="material-symbols-outlined text-[18px] text-[#fd6a49] flex-shrink-0 group-hover:scale-110 transition-transform">
                chat
              </span>
              <span className="leading-relaxed">{prompt}</span>
            </button>
          ))}
        </div>

        <div className="mt-4 pt-3 border-t border-[#1e1b4b]/5 flex items-center justify-between text-[11px] text-[#787680]">
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px] text-[#fd6a49]">verified</span>
            Safe & verified members only
          </span>
          <button
            onClick={onClose}
            className="text-xs font-semibold text-[#070235] hover:underline"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
