import React, { useState } from 'react';
import { CommunityGroup } from '../../data/mockData';

interface GroupsScreenProps {
  groups: CommunityGroup[];
  onToggleJoinGroup: (groupId: string) => void;
  onOpenGroupDiscussion?: (group: CommunityGroup) => void;
}

export const GroupsScreen: React.FC<GroupsScreenProps> = ({
  groups,
  onToggleJoinGroup,
  onOpenGroupDiscussion
}) => {
  const [filterNeighborhood, setFilterNeighborhood] = useState<string>('all');
  const [selectedGroupModal, setSelectedGroupModal] = useState<CommunityGroup | null>(null);

  const filtered = groups.filter((g) => {
    if (filterNeighborhood !== 'all' && !g.neighborhood.toLowerCase().includes(filterNeighborhood.toLowerCase())) {
      return false;
    }
    return true;
  });

  return (
    <div className="flex flex-col w-full pb-28 px-4 sm:px-6 pt-4 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#070235] tracking-tight">
            Neighborhood Circles
          </h1>
          <p className="text-xs text-[#47464f] mt-0.5">
            Micro-communities organized by neighborhood rhythms and shared crafts
          </p>
        </div>

        <div className="px-3 py-1 rounded-full bg-[#ffdad2] text-[#3d0600] text-xs font-bold">
          {groups.filter(g => g.isJoined).length} Joined
        </div>
      </div>

      {/* Neighborhood Pills */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-3">
        {[
          { id: 'all', label: 'All Circles' },
          { id: 'Indiranagar', label: 'Indiranagar' },
          { id: 'Central', label: 'Central / Cubbon' },
          { id: 'Basavanagudi', label: 'South / Old BLR' }
        ].map((hood) => (
          <button
            key={hood.id}
            onClick={() => setFilterNeighborhood(hood.id)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
              filterNeighborhood === hood.id
                ? 'bg-[#070235] text-white'
                : 'bg-white text-[#47464f] hover:bg-[#f4f3f1] border border-[#1e1b4b]/5'
            }`}
          >
            {hood.label}
          </button>
        ))}
      </div>

      {/* Groups List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
        {filtered.map((grp) => (
          <div
            key={grp.id}
            className="rounded-3xl bg-white p-5 shadow-sm border border-[#1e1b4b]/5 flex flex-col justify-between hover:shadow-md transition-shadow"
          >
            <div>
              <div className="relative h-36 w-full rounded-2xl overflow-hidden mb-3">
                <img
                  src={grp.image}
                  alt={grp.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-bold text-[#070235]">
                  {grp.category}
                </span>
                <span className="absolute bottom-2.5 left-3 text-white text-xs font-semibold flex items-center gap-1">
                  <span className="material-symbols-outlined text-[15px]">people</span>
                  {grp.membersCount} members
                </span>
              </div>

              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-[#070235] leading-snug">
                  {grp.name}
                </h3>
              </div>

              <p className="text-xs text-[#47464f] mt-1.5 leading-relaxed line-clamp-2">
                {grp.description}
              </p>

              {/* Rhythms & Next Meetup */}
              <div className="mt-3 p-3 rounded-2xl bg-[#faf9f6] border border-[#1e1b4b]/5 space-y-1.5 text-[11px]">
                <div className="flex items-center gap-1.5 text-[#070235] font-semibold">
                  <span className="material-symbols-outlined text-[15px] text-[#fd6a49]">
                    calendar_month
                  </span>
                  <span>Regular: {grp.regularRhythm}</span>
                </div>
                <div className="flex items-center gap-1.5 text-[#47464f]">
                  <span className="material-symbols-outlined text-[15px] text-[#787680]">
                    forum
                  </span>
                  <span className="truncate italic">“{grp.recentTopic}”</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 mt-4 pt-2">
              <button
                onClick={() => setSelectedGroupModal(grp)}
                className="flex-1 h-10 rounded-full bg-[#f4f3f1] hover:bg-[#e9e8e5] text-xs font-bold text-[#070235] transition-colors"
              >
                View Guidelines
              </button>

              <button
                onClick={() => onToggleJoinGroup(grp.id)}
                className={`px-5 h-10 rounded-full text-xs font-bold transition-all active:scale-95 ${
                  grp.isJoined
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-[#fd6a49] text-white shadow-sm hover:opacity-95'
                }`}
              >
                {grp.isJoined ? 'Member' : 'Join Circle'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Guidelines Modal */}
      {selectedGroupModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-[#1e1b4b]/10">
            <div className="flex items-center justify-between pb-3 border-b border-[#1e1b4b]/5">
              <div>
                <h3 className="text-base font-bold text-[#070235]">{selectedGroupModal.name}</h3>
                <p className="text-xs text-[#47464f]">{selectedGroupModal.neighborhood} • {selectedGroupModal.membersCount} members</p>
              </div>
              <button
                onClick={() => setSelectedGroupModal(null)}
                className="w-8 h-8 rounded-full bg-[#f4f3f1] text-[#47464f] flex items-center justify-center"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <div className="my-4 space-y-3">
              <span className="text-xs font-bold text-[#070235] uppercase tracking-wider block">
                Circle Norms & Guidelines
              </span>
              <ul className="space-y-2">
                {selectedGroupModal.rules.map((rule, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-[#47464f]">
                    <span className="material-symbols-outlined text-[16px] text-[#fd6a49] mt-0.5">check_circle</span>
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => {
                onToggleJoinGroup(selectedGroupModal.id);
                setSelectedGroupModal(null);
              }}
              className="w-full h-11 rounded-full bg-[#070235] text-white text-xs font-bold hover:bg-[#1e1b4b]"
            >
              {selectedGroupModal.isJoined ? 'Leave Circle' : 'Agree & Join Circle'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
