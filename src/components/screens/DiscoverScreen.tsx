import React, { useRef } from 'react';
import { Person, Activity } from '../../data/mockData';

interface DiscoverScreenProps {
  people: Person[];
  activities: Activity[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  onOpenTuneFilters: () => void;
  onOpenSafety: () => void;
  onOpenPersonDetail: (person: Person) => void;
  onOpenIcebreakers: (person: Person) => void;
  onOpenActivityDetail: (act: Activity) => void;
  onToggleJoinActivity: (activityId: string) => void;
  onSayHello: (person: Person) => void;
  onViewAllActivities: () => void;
}

const CATEGORY_CHIPS = [
  { id: 'coffee', label: 'Coffee & Chat', emoji: '☕' },
  { id: 'walk', label: 'City Walkers', emoji: '🗺️' },
  { id: 'food', label: 'Food Explorers', emoji: '🥑' },
  { id: 'cowork', label: 'Coworking', emoji: '💻' },
  { id: 'newcomers', label: 'Just Arrived (< 2 wks)', emoji: '🎒' },
  { id: 'verified', label: 'Verified only', icon: 'verified_user' }
];

export const DiscoverScreen: React.FC<DiscoverScreenProps> = ({
  people,
  activities,
  searchQuery,
  onSearchChange,
  selectedCategory,
  onSelectCategory,
  onOpenTuneFilters,
  onOpenSafety,
  onOpenPersonDetail,
  onOpenIcebreakers,
  onOpenActivityDetail,
  onToggleJoinActivity,
  onSayHello,
  onViewAllActivities
}) => {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col w-full pb-28">
      {/* Top Welcome / Hero Card */}
      <div className="px-4 sm:px-6 pt-4">
        <div className="relative overflow-hidden rounded-3xl bg-white p-5 sm:p-6 shadow-sm border border-[#1e1b4b]/5">
          {/* Subtle Ambient Background Gradients */}
          <div className="absolute -top-10 -right-10 w-36 h-36 rounded-full bg-[#ffdad2]/40 blur-2xl pointer-events-none" />
          <div className="absolute -bottom-12 -left-10 w-32 h-32 rounded-full bg-[#e3dfff]/30 blur-2xl pointer-events-none" />

          {/* Location Kicker */}
          <div className="relative flex items-center gap-1.5 mb-2">
            <span className="inline-flex items-center justify-center w-2 h-2 rounded-full bg-[#fd6a49] animate-pulse" />
            <span className="text-[11px] font-bold text-[#ae3115] uppercase tracking-wider">
              Bengaluru • Indiranagar
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#070235] tracking-tight mb-2">
            Hey Maya 👋 <span className="text-[#1a1c1a] font-bold">New in Bengaluru?</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xs sm:text-sm text-[#47464f] max-w-md mb-4 leading-relaxed">
            Your city is full of people you haven't met yet.{' '}
            <span className="font-semibold text-[#070235]">184 people nearby</span> are looking to connect for low-pressure adventures.
          </p>

          {/* Search Bar */}
          <div className="relative flex items-center">
            <span className="material-symbols-outlined absolute left-4 text-[#787680] text-[20px] pointer-events-none">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Try 'Specialty coffee', 'Book reading', 'Metro walk'..."
              className="w-full h-12 pl-11 pr-11 rounded-full bg-[#f4f3f1] text-[#1a1c1a] text-xs sm:text-sm placeholder:text-[#787680] focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#fd6a49] transition-all shadow-inner"
            />
            <button
              onClick={onOpenTuneFilters}
              aria-label="Tune Search Filters"
              className="absolute right-2 w-8 h-8 rounded-full bg-[#1e1b4b] text-white flex items-center justify-center hover:bg-[#070235] transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]">tune</span>
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal Category Chips */}
      <div className="w-full mt-4">
        <div className="flex items-center gap-2 overflow-x-auto px-4 sm:px-6 no-scrollbar py-1">
          {CATEGORY_CHIPS.map((chip) => {
            const isSelected = selectedCategory === chip.id;
            return (
              <button
                key={chip.id}
                onClick={() => onSelectCategory(isSelected ? 'all' : chip.id)}
                className={`flex-shrink-0 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold shadow-sm transition-all active:scale-95 whitespace-nowrap ${
                  isSelected
                    ? 'bg-[#ffdad2] text-[#3d0600] ring-1 ring-[#fd6a49]'
                    : 'bg-white text-[#47464f] hover:bg-[#f4f3f1] border border-[#1e1b4b]/5'
                }`}
              >
                {chip.emoji && <span>{chip.emoji}</span>}
                {chip.icon && (
                  <span className="material-symbols-outlined text-[15px] text-[#ae3115]">
                    {chip.icon}
                  </span>
                )}
                <span>{chip.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* SECTION: People You Might Connect With */}
      <section className="mt-6">
        <div className="px-4 sm:px-6 flex items-center justify-between mb-3">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-[#070235] tracking-tight">
              People You Might Connect With
            </h2>
            <p className="text-xs text-[#47464f]">
              Matched by fresh arrivals, shared rhythms & neighborhood proximity
            </p>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => scrollCarousel('left')}
              aria-label="Previous card"
              className="w-8 h-8 rounded-full bg-[#efeeeb] text-[#47464f] flex items-center justify-center hover:bg-[#e9e8e5] transition-colors active:scale-95"
            >
              <span className="material-symbols-outlined text-[18px]">chevron_left</span>
            </button>
            <button
              onClick={() => scrollCarousel('right')}
              aria-label="Next card"
              className="w-8 h-8 rounded-full bg-[#efeeeb] text-[#47464f] flex items-center justify-center hover:bg-[#e9e8e5] transition-colors active:scale-95"
            >
              <span className="material-symbols-outlined text-[18px]">chevron_right</span>
            </button>
          </div>
        </div>

        {/* Carousel of People */}
        <div
          ref={carouselRef}
          className="flex gap-4 overflow-x-auto px-4 sm:px-6 snap-x snap-mandatory no-scrollbar pb-2 pt-1"
        >
          {people.length === 0 ? (
            <div className="w-full py-8 text-center bg-white rounded-3xl border border-[#1e1b4b]/5 p-6">
              <span className="material-symbols-outlined text-3xl text-[#787680]">person_search</span>
              <p className="text-xs text-[#47464f] mt-2">No people match this search or filter in your area.</p>
              <button
                onClick={() => {
                  onSearchChange('');
                  onSelectCategory('all');
                }}
                className="mt-3 px-4 py-1.5 rounded-full bg-[#1e1b4b] text-white text-xs font-semibold"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            people.map((person) => (
              <div
                key={person.id}
                className="min-w-[86%] sm:min-w-[320px] max-w-[340px] snap-center rounded-3xl bg-white p-4 shadow-sm border border-[#1e1b4b]/5 flex flex-col justify-between relative group hover:shadow-md transition-shadow"
              >
                <div>
                  {/* Photo with Overlay */}
                  <div
                    onClick={() => onOpenPersonDetail(person)}
                    className="relative h-48 w-full rounded-2xl overflow-hidden mb-3 cursor-pointer"
                  >
                    <img
                      src={person.avatar}
                      alt={person.name}
                      className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#070235]/80 via-transparent to-transparent" />

                    {/* Arrival Tag */}
                    <div className="absolute top-2.5 left-2.5 flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md shadow-sm">
                      <span className="w-2 h-2 rounded-full bg-[#fd6a49]" />
                      <span className="text-[11px] text-[#070235] font-bold">
                        {person.arrivalTag}
                      </span>
                    </div>

                    {/* Bottom Info on Card Photo */}
                    <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-end justify-between text-white">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-base font-bold text-white">
                            {person.name}, {person.age}
                          </span>
                          {person.isVerified && (
                            <span
                              className="material-symbols-outlined text-[#ffdad2] text-[18px]"
                              style={{ fontVariationSettings: "'FILL' 1" }}
                            >
                              verified
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-1 text-[11px] text-[#e3e2e0]">
                          <span className="material-symbols-outlined text-[13px]">near_me</span>
                          <span>{person.neighborhood} ({person.distance})</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Shared Interests & Bio */}
                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-1.5">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#ffdad2] text-[#3d0600] text-[11px] font-semibold">
                        <span className="material-symbols-outlined text-[13px]">interests</span>
                        {person.sharedInterests.length} shared: {person.sharedInterests.join(', ')}
                      </span>
                    </div>

                    <p
                      onClick={() => onOpenPersonDetail(person)}
                      className="text-xs text-[#47464f] leading-relaxed line-clamp-2 cursor-pointer hover:text-[#070235]"
                    >
                      {person.bio}
                    </p>

                    <div className="flex items-center gap-1.5 text-[#47464f] text-[11px] pt-1">
                      <span className="material-symbols-outlined text-[15px] text-[#787680]">translate</span>
                      <span>{person.languages.join(', ')}</span>
                    </div>
                  </div>
                </div>

                {/* Card Actions: Say Hello & Icebreaker */}
                <div className="flex items-center gap-2 mt-4 pt-1">
                  <button
                    onClick={() => onSayHello(person)}
                    className="flex-1 h-11 rounded-full bg-[#fd6a49] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-[0_4px_14px_rgba(253,106,73,0.3)] hover:opacity-95 active:scale-95 transition-all"
                  >
                    <span className="material-symbols-outlined text-[18px]">waving_hand</span>
                    <span>Say Hello</span>
                  </button>

                  <button
                    onClick={() => onOpenIcebreakers(person)}
                    title="Send low-pressure icebreaker"
                    className="w-11 h-11 rounded-full bg-[#e9e8e5] hover:bg-[#dbdad7] text-[#070235] flex items-center justify-center active:scale-95 transition-all"
                  >
                    <span className="material-symbols-outlined text-[20px]">lightbulb</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* SECTION: Things To Do Together */}
      <section className="mt-8 px-4 sm:px-6">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-[#070235] tracking-tight">
              Things To Do Together
            </h2>
            <p className="text-xs text-[#47464f]">
              Curated, public small-group meetups this weekend
            </p>
          </div>
          <button
            onClick={onViewAllActivities}
            className="text-xs font-semibold text-[#ae3115] hover:underline flex items-center gap-0.5"
          >
            <span>View all</span>
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          </button>
        </div>

        <div className="space-y-3">
          {activities.slice(0, 3).map((act) => {
            const spotsRemaining = act.maxCap - act.joinedCount;
            const isFull = spotsRemaining <= 0 && !act.isJoined;

            return (
              <div
                key={act.id}
                className="rounded-3xl bg-white p-4 shadow-sm hover:shadow-md border border-[#1e1b4b]/5 transition-all"
              >
                <div className="flex gap-3 items-start">
                  {/* Activity Thumbnail */}
                  <div
                    onClick={() => onOpenActivityDetail(act)}
                    className="relative w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0 cursor-pointer"
                  >
                    <img
                      src={act.image}
                      alt={act.title}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded-full bg-[#1e1b4b] text-white text-[10px] font-bold">
                      {act.dayBadge}
                    </span>
                  </div>

                  {/* Activity Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1 mb-0.5">
                      <span className="text-[11px] font-bold text-[#ae3115]">
                        {act.time}
                      </span>
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold ${
                          act.isJoined
                            ? 'bg-emerald-100 text-emerald-800'
                            : spotsRemaining <= 2
                            ? 'bg-[#ffdad2] text-[#3d0600]'
                            : 'bg-[#e9e8e5] text-[#070235]'
                        }`}
                      >
                        {act.isJoined
                          ? 'Joined'
                          : spotsRemaining <= 2
                          ? `${spotsRemaining} spots left`
                          : `${act.joinedCount} joined`}
                      </span>
                    </div>

                    <h3
                      onClick={() => onOpenActivityDetail(act)}
                      className="text-sm font-bold text-[#070235] truncate leading-snug cursor-pointer hover:text-[#fd6a49]"
                    >
                      {act.title}
                    </h3>

                    <p className="text-xs text-[#47464f] flex items-center gap-1 mt-0.5">
                      <span className="material-symbols-outlined text-[15px] text-[#787680]">
                        location_on
                      </span>
                      <span className="truncate">{act.location}</span>
                    </p>

                    {/* Host & Action */}
                    <div className="flex items-center justify-between mt-3 pt-1">
                      <div className="flex items-center gap-1.5">
                        <img
                          src={act.host.avatar}
                          alt={act.host.name}
                          className="w-5 h-5 rounded-full object-cover"
                        />
                        <span className="text-[11px] text-[#47464f]">
                          Hosted by <strong className="text-[#1a1c1a] font-semibold">{act.host.name}</strong>
                        </span>
                      </div>

                      <button
                        onClick={() => onToggleJoinActivity(act.id)}
                        disabled={isFull}
                        className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all active:scale-95 ${
                          act.isJoined
                            ? 'bg-[#e9e8e5] text-[#1a1c1a]'
                            : isFull
                            ? 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
                            : act.joinedCount >= 5
                            ? 'bg-[#fd6a49] text-white shadow-sm hover:opacity-95'
                            : 'bg-[#f4f3f1] hover:bg-[#ffdad2] text-[#070235] hover:text-[#3d0600]'
                        }`}
                      >
                        {act.isJoined
                          ? 'Leave'
                          : isFull
                          ? 'Full'
                          : act.joinedCount >= 5
                          ? 'Claim Spot'
                          : 'Join Group'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION: Safe & Privacy First Banner */}
      <section className="mt-8 px-4 sm:px-6">
        <div
          onClick={onOpenSafety}
          className="rounded-3xl bg-[#f4f3f1] hover:bg-[#e9e8e5]/80 p-4 sm:p-5 flex items-start gap-3.5 cursor-pointer border border-[#1e1b4b]/5 transition-colors"
        >
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center flex-shrink-0 text-[#070235] shadow-sm">
            <span className="material-symbols-outlined text-[22px]">verified_user</span>
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-[#070235]">Safe & Privacy First</h3>
              <span className="text-[11px] text-[#fd6a49] font-semibold flex items-center">
                Learn more
                <span className="material-symbols-outlined text-[14px]">chevron_right</span>
              </span>
            </div>
            <p className="text-xs text-[#47464f] mt-1 leading-relaxed">
              No precise live locations are ever shared. Meetups take place exclusively in verified, bustling public venues so you can connect with total peace of mind.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
