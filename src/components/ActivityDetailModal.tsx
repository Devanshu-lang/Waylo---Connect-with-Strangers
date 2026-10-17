import React from 'react';
import { Activity } from '../data/mockData';

interface ActivityDetailModalProps {
  activity: Activity | null;
  onClose: () => void;
  onToggleJoin: (activityId: string) => void;
  onOpenChat?: (activity: Activity) => void;
}

export const ActivityDetailModal: React.FC<ActivityDetailModalProps> = ({
  activity,
  onClose,
  onToggleJoin,
  onOpenChat
}) => {
  if (!activity) return null;

  const isFull = activity.joinedCount >= activity.maxCap && !activity.isJoined;
  const spotsLeft = activity.maxCap - activity.joinedCount;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-[#faf9f6] rounded-t-3xl sm:rounded-3xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden border border-[#1e1b4b]/10 animate-in slide-in-from-bottom-6 duration-200">
        {/* Banner Image */}
        <div className="relative h-56 sm:h-64 w-full flex-shrink-0 bg-neutral-900">
          <img
            src={activity.image}
            alt={activity.title}
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

          {/* Day & Spots Badge */}
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full bg-[#1e1b4b] text-white text-xs font-bold tracking-wide">
              {activity.dayBadge}
            </span>
            <span className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#070235] text-xs font-semibold">
              {activity.time}
            </span>
          </div>

          <div className="absolute bottom-4 left-5 right-5 text-white">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight leading-snug">
              {activity.title}
            </h2>
            <p className="flex items-center gap-1 text-xs text-[#e3e2e0] mt-1 font-medium">
              <span className="material-symbols-outlined text-[15px] text-[#ffdad2]">
                location_on
              </span>
              <span>{activity.location}</span>
            </p>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 flex-1">
          {/* Status Row */}
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-white border border-[#1e1b4b]/5">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-[#ffdad2] text-[#ae3115] flex items-center justify-center font-bold text-xs">
                {activity.joinedCount}/{activity.maxCap}
              </div>
              <div>
                <div className="text-xs font-bold text-[#070235]">
                  Small-Group Cap of {activity.maxCap}
                </div>
                <div className="text-[11px] text-[#47464f]">
                  {spotsLeft > 0 ? `${spotsLeft} spots remaining` : 'Group is currently full'}
                </div>
              </div>
            </div>

            {activity.isJoined && (
              <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">check_circle</span>
                You are Going
              </span>
            )}
          </div>

          {/* Host Info */}
          <div className="p-4 rounded-2xl bg-white border border-[#1e1b4b]/5">
            <div className="text-[11px] font-bold text-[#787680] uppercase tracking-wider mb-2.5">
              Meetup Host
            </div>
            <div className="flex items-center gap-3">
              <img
                src={activity.host.avatar}
                alt={activity.host.name}
                className="w-12 h-12 rounded-full object-cover ring-2 ring-[#ffdad2]"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1">
                  <span className="text-sm font-bold text-[#070235]">
                    {activity.host.name}
                  </span>
                  <span
                    className="material-symbols-outlined text-[#fd6a49] text-[16px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    verified
                  </span>
                </div>
                <p className="text-xs text-[#47464f] mt-0.5 truncate">
                  {activity.host.role}
                </p>
              </div>
            </div>
          </div>

          {/* About the Meetup */}
          <div>
            <div className="text-[11px] font-bold text-[#787680] uppercase tracking-wider mb-1.5">
              The Plan
            </div>
            <p className="text-xs text-[#1a1c1a] leading-relaxed">
              {activity.description}
            </p>
          </div>

          {/* Public Meeting Point Guarantee */}
          <div className="p-3.5 rounded-2xl bg-[#ffdad2]/30 border border-[#fd6a49]/20">
            <div className="flex items-start gap-2.5">
              <span className="material-symbols-outlined text-[18px] text-[#ae3115] mt-0.5 flex-shrink-0">
                meeting_room
              </span>
              <div>
                <span className="text-xs font-bold text-[#3d0600] block">
                  Public Meeting Point
                </span>
                <p className="text-xs text-[#640f00] mt-0.5 leading-relaxed">
                  {activity.meetingPoint}
                </p>
              </div>
            </div>
          </div>

          {/* Attendees Roster */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-[#787680] uppercase tracking-wider">
                Confirmed Attendees ({activity.attendees.length})
              </span>
              <span className="text-[11px] text-[#787680]">Verified community</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {activity.attendees.map((att, idx) => (
                <div
                  key={idx}
                  className="p-2 rounded-xl bg-white border border-[#1e1b4b]/5 flex items-center gap-2"
                >
                  <img
                    src={att.avatar}
                    alt={att.name}
                    className="w-7 h-7 rounded-full object-cover"
                  />
                  <span className="text-xs text-[#1a1c1a] font-medium truncate">
                    {att.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom CTA Action Bar */}
          <div className="pt-2 flex items-center gap-3">
            <button
              onClick={() => onToggleJoin(activity.id)}
              disabled={isFull}
              className={`flex-1 h-12 rounded-full text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all active:scale-95 ${
                activity.isJoined
                  ? 'bg-[#e9e8e5] text-[#1a1c1a] hover:bg-[#dbdad7]'
                  : isFull
                  ? 'bg-neutral-300 text-neutral-500 cursor-not-allowed'
                  : 'bg-[#fd6a49] text-white shadow-[0_4px_14px_rgba(253,106,73,0.3)] hover:opacity-95'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">
                {activity.isJoined ? 'check_circle' : 'group_add'}
              </span>
              <span>
                {activity.isJoined
                  ? 'Leave Meetup'
                  : isFull
                  ? 'Meetup is Full'
                  : 'Join Group Meetup'}
              </span>
            </button>

            {activity.isJoined && onOpenChat && (
              <button
                onClick={() => {
                  onClose();
                  onOpenChat(activity);
                }}
                className="h-12 px-5 rounded-full bg-[#1e1b4b] text-white text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-[#070235] transition-colors"
                title="Open Group Chat"
              >
                <span className="material-symbols-outlined text-[18px]">chat</span>
                <span>Chat</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
