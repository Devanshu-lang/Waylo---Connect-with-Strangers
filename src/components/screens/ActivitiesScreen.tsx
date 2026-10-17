import React, { useState } from 'react';
import { Activity } from '../../data/mockData';

interface ActivitiesScreenProps {
  activities: Activity[];
  onOpenActivityDetail: (act: Activity) => void;
  onToggleJoinActivity: (activityId: string) => void;
  onOpenCreateActivity: () => void;
  onOpenChat: (activity: Activity) => void;
}

export const ActivitiesScreen: React.FC<ActivitiesScreenProps> = ({
  activities,
  onOpenActivityDetail,
  onToggleJoinActivity,
  onOpenCreateActivity,
  onOpenChat
}) => {
  const [activeDayFilter, setActiveDayFilter] = useState<string>('all');
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('all');
  const [search, setSearch] = useState('');

  const filteredActivities = activities.filter((act) => {
    if (activeDayFilter === 'SAT' && act.dayBadge !== 'SAT') return false;
    if (activeDayFilter === 'SUN' && act.dayBadge !== 'SUN') return false;
    if (activeCategoryFilter !== 'all' && act.category !== activeCategoryFilter) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        act.title.toLowerCase().includes(q) ||
        act.location.toLowerCase().includes(q) ||
        act.description.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="flex flex-col w-full pb-28 px-4 sm:px-6 pt-4 max-w-4xl mx-auto">
      {/* Header Bar */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#070235] tracking-tight">
            Curated Public Meetups
          </h1>
          <p className="text-xs text-[#47464f] mt-0.5">
            Small-group hangouts capped at 4–8 people in verified venues
          </p>
        </div>

        <button
          onClick={onOpenCreateActivity}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#fd6a49] text-white text-xs font-bold shadow-[0_4px_14px_rgba(253,106,73,0.3)] hover:opacity-95 active:scale-95 transition-all"
        >
          <span className="material-symbols-outlined text-[16px]">add</span>
          <span className="hidden xs:inline">Propose Meetup</span>
        </button>
      </div>

      {/* Search Input */}
      <div className="relative mb-3">
        <span className="material-symbols-outlined absolute left-3.5 top-3 text-[#787680] text-[20px]">
          search
        </span>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by park, cafe, food crawl, or topic..."
          className="w-full h-11 pl-10 pr-4 rounded-full bg-white border border-[#1e1b4b]/10 text-xs text-[#1a1c1a] focus:outline-none focus:ring-2 focus:ring-[#fd6a49] shadow-sm"
        />
      </div>

      {/* Day Selector Chips */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
        {[
          { id: 'all', label: 'All Days' },
          { id: 'SAT', label: 'Saturday' },
          { id: 'SUN', label: 'Sunday' }
        ].map((day) => (
          <button
            key={day.id}
            onClick={() => setActiveDayFilter(day.id)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
              activeDayFilter === day.id
                ? 'bg-[#070235] text-white'
                : 'bg-white text-[#47464f] hover:bg-[#f4f3f1] border border-[#1e1b4b]/5'
            }`}
          >
            {day.label}
          </button>
        ))}

        <div className="h-4 w-[1px] bg-[#1e1b4b]/10 mx-1 flex-shrink-0" />

        {[
          { id: 'all', label: 'All Vibes' },
          { id: 'coffee', label: '☕ Coffee' },
          { id: 'walk', label: '🗺️ Walks' },
          { id: 'food', label: '🥑 Food' },
          { id: 'cowork', label: '💻 Cowork' },
          { id: 'culture', label: '🎨 Art' }
        ].map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategoryFilter(cat.id)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
              activeCategoryFilter === cat.id
                ? 'bg-[#ffdad2] text-[#3d0600] ring-1 ring-[#fd6a49]'
                : 'bg-white text-[#47464f] hover:bg-[#f4f3f1] border border-[#1e1b4b]/5'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Activities Grid */}
      <div className="space-y-4 mt-3">
        {filteredActivities.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-3xl border border-[#1e1b4b]/5 p-6">
            <span className="material-symbols-outlined text-4xl text-[#787680]">event_busy</span>
            <p className="text-sm font-bold text-[#070235] mt-2">No meetups found</p>
            <p className="text-xs text-[#47464f] mt-1">Try relaxing your search or propose a new small-group hangout!</p>
            <button
              onClick={onOpenCreateActivity}
              className="mt-4 px-4 py-2 rounded-full bg-[#fd6a49] text-white text-xs font-bold"
            >
              Propose This Meetup
            </button>
          </div>
        ) : (
          filteredActivities.map((act) => {
            const spotsRemaining = act.maxCap - act.joinedCount;
            const isFull = spotsRemaining <= 0 && !act.isJoined;

            return (
              <div
                key={act.id}
                className="rounded-3xl bg-white p-5 shadow-sm hover:shadow-md border border-[#1e1b4b]/5 transition-all"
              >
                <div className="flex flex-col sm:flex-row gap-4">
                  {/* Photo with Day pill */}
                  <div
                    onClick={() => onOpenActivityDetail(act)}
                    className="relative w-full sm:w-44 h-40 sm:h-36 rounded-2xl overflow-hidden flex-shrink-0 cursor-pointer"
                  >
                    <img
                      src={act.image}
                      alt={act.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    <span className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full bg-[#1e1b4b] text-white text-[11px] font-bold">
                      {act.dayBadge}
                    </span>
                    <span className="absolute bottom-2 left-2.5 text-white text-[11px] font-semibold flex items-center gap-1">
                      <span className="material-symbols-outlined text-[13px]">groups</span>
                      {act.joinedCount}/{act.maxCap} confirmed
                    </span>
                  </div>

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="text-xs font-bold text-[#ae3115]">
                          {act.time}
                        </span>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
                            act.isJoined
                              ? 'bg-emerald-100 text-emerald-800'
                              : spotsRemaining <= 2
                              ? 'bg-[#ffdad2] text-[#3d0600]'
                              : 'bg-[#e9e8e5] text-[#070235]'
                          }`}
                        >
                          {act.isJoined
                            ? 'Going'
                            : spotsRemaining <= 2
                            ? `${spotsRemaining} spots left`
                            : `${act.joinedCount} joined`}
                        </span>
                      </div>

                      <h3
                        onClick={() => onOpenActivityDetail(act)}
                        className="text-base font-bold text-[#070235] hover:text-[#fd6a49] cursor-pointer leading-snug"
                      >
                        {act.title}
                      </h3>

                      <p className="text-xs text-[#47464f] flex items-center gap-1 mt-1">
                        <span className="material-symbols-outlined text-[15px] text-[#787680]">
                          location_on
                        </span>
                        <span>{act.location}</span>
                      </p>

                      <p className="text-xs text-[#1a1c1a] mt-2 line-clamp-2 leading-relaxed">
                        {act.description}
                      </p>
                    </div>

                    {/* Footer Row */}
                    <div className="flex items-center justify-between mt-4 pt-3 border-t border-[#1e1b4b]/5">
                      <div className="flex items-center gap-2">
                        <img
                          src={act.host.avatar}
                          alt={act.host.name}
                          className="w-6 h-6 rounded-full object-cover"
                        />
                        <span className="text-xs text-[#47464f]">
                          Hosted by <strong className="text-[#1a1c1a] font-semibold">{act.host.name}</strong>
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        {act.isJoined && (
                          <button
                            onClick={() => onOpenChat(act)}
                            className="w-9 h-9 rounded-full bg-[#f4f3f1] hover:bg-[#e9e8e5] text-[#070235] flex items-center justify-center transition-colors"
                            title="Chat with group"
                          >
                            <span className="material-symbols-outlined text-[18px]">chat</span>
                          </button>
                        )}

                        <button
                          onClick={() => onToggleJoinActivity(act.id)}
                          disabled={isFull}
                          className={`px-4 py-2 rounded-full text-xs font-bold transition-all active:scale-95 ${
                            act.isJoined
                              ? 'bg-[#e9e8e5] text-[#1a1c1a]'
                              : isFull
                              ? 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
                              : 'bg-[#fd6a49] text-white shadow-sm hover:opacity-95'
                          }`}
                        >
                          {act.isJoined
                            ? 'Leave'
                            : isFull
                            ? 'Full'
                            : 'Join Group'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
