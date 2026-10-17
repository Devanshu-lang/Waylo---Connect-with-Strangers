import React, { useState } from 'react';
import { CURRENT_USER } from '../../data/mockData';

interface ProfileScreenProps {
  onOpenSafety: () => void;
  currentCity: string;
  onCityChange: (city: string) => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  onOpenSafety,
  currentCity,
  onCityChange
}) => {
  const [user, setUser] = useState(CURRENT_USER);
  const [approxLocationOnly, setApproxLocationOnly] = useState(true);
  const [verifiedOnlyCanMessage, setVerifiedOnlyCanMessage] = useState(true);
  const [newWishlistItem, setNewWishlistItem] = useState('');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [bioEdit, setBioEdit] = useState(user.bio);
  const [roleEdit, setRoleEdit] = useState(user.role);

  const handleAddWishlist = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWishlistItem.trim()) return;
    setUser({
      ...user,
      wishlist: [...user.wishlist, newWishlistItem.trim()]
    });
    setNewWishlistItem('');
  };

  const handleSaveProfile = () => {
    setUser({
      ...user,
      bio: bioEdit,
      role: roleEdit
    });
    setIsEditingProfile(false);
  };

  return (
    <div className="flex flex-col w-full pb-28 px-4 sm:px-6 pt-4 max-w-4xl mx-auto">
      {/* Top Profile Card */}
      <div className="rounded-3xl bg-white p-6 shadow-sm border border-[#1e1b4b]/5 relative overflow-hidden">
        <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-[#ffdad2]/30 blur-2xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
          {/* Avatar */}
          <div className="relative">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-24 h-24 rounded-full object-cover ring-4 ring-[#ffdad2] shadow-md"
            />
            <span
              className="absolute bottom-1 right-1 w-6 h-6 rounded-full bg-[#fd6a49] text-white flex items-center justify-center ring-2 ring-white"
              title="Verified Identity"
            >
              <span
                className="material-symbols-outlined text-[15px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                verified
              </span>
            </span>
          </div>

          {/* Details */}
          <div className="flex-1 text-center sm:text-left">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h1 className="text-xl sm:text-2xl font-extrabold text-[#070235]">
                {user.name}, {user.age}
              </h1>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold">
                {user.stats.trustScore}
              </span>
            </div>

            <p className="text-xs font-semibold text-[#ae3115] mt-0.5">
              {user.role} • {user.neighborhood}
            </p>

            <div className="flex items-center justify-center sm:justify-start gap-1.5 text-xs text-[#787680] mt-1">
              <span className="material-symbols-outlined text-[15px]">luggage</span>
              <span>{user.relocatedText}</span>
            </div>

            <p className="text-xs text-[#47464f] mt-3 leading-relaxed max-w-lg">
              {user.bio}
            </p>

            <div className="flex items-center justify-center sm:justify-start gap-2 mt-4">
              <button
                onClick={() => setIsEditingProfile(true)}
                className="px-4 py-1.5 rounded-full bg-[#f4f3f1] hover:bg-[#e9e8e5] text-xs font-semibold text-[#070235] transition-colors"
              >
                Edit Bio
              </button>
              <button
                onClick={onOpenSafety}
                className="px-4 py-1.5 rounded-full bg-[#ffdad2]/50 hover:bg-[#ffdad2] text-xs font-semibold text-[#3d0600] transition-colors flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-[15px]">shield</span>
                <span>Safety Checkup</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Rhythms & Interests */}
      <div className="mt-5 rounded-3xl bg-white p-5 shadow-sm border border-[#1e1b4b]/5">
        <h2 className="text-xs font-bold text-[#787680] uppercase tracking-wider mb-2.5">
          My Shared Rhythms & Interests
        </h2>
        <div className="flex flex-wrap gap-2">
          {user.interests.map((interest) => (
            <span
              key={interest}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#ffdad2] text-[#3d0600] text-xs font-semibold"
            >
              <span className="material-symbols-outlined text-[14px]">interests</span>
              {interest}
            </span>
          ))}
        </div>
      </div>

      {/* Languages */}
      <div className="mt-4 rounded-3xl bg-white p-5 shadow-sm border border-[#1e1b4b]/5">
        <h2 className="text-xs font-bold text-[#787680] uppercase tracking-wider mb-2">
          Languages I Speak
        </h2>
        <div className="flex items-center gap-2 text-xs font-medium text-[#1a1c1a]">
          {user.languages.map((lang) => (
            <span
              key={lang}
              className="px-3 py-1 rounded-xl bg-[#f4f3f1] border border-[#1e1b4b]/5"
            >
              {lang}
            </span>
          ))}
        </div>
      </div>

      {/* Wishlist in Bengaluru */}
      <div className="mt-4 rounded-3xl bg-white p-5 shadow-sm border border-[#1e1b4b]/5">
        <div className="flex items-center justify-between mb-2.5">
          <h2 className="text-xs font-bold text-[#787680] uppercase tracking-wider">
            Maya’s Bengaluru Exploration Wishlist
          </h2>
          <span className="text-[11px] text-[#fd6a49] font-semibold">Low-pressure ideas</span>
        </div>

        <ul className="space-y-2 mb-3">
          {user.wishlist.map((item, idx) => (
            <li
              key={idx}
              className="flex items-center gap-2.5 text-xs text-[#1a1c1a] p-2.5 rounded-xl bg-[#faf9f6] border border-[#1e1b4b]/5"
            >
              <span className="w-2 h-2 rounded-full bg-[#fd6a49]" />
              <span className="flex-1">{item}</span>
            </li>
          ))}
        </ul>

        {/* Add Wishlist Item */}
        <form onSubmit={handleAddWishlist} className="flex items-center gap-2 mt-2">
          <input
            type="text"
            value={newWishlistItem}
            onChange={(e) => setNewWishlistItem(e.target.value)}
            placeholder="Add to your wishlist (e.g. Try Mysore pak at Venkateshwara)..."
            className="flex-1 h-10 px-3.5 rounded-full bg-[#f4f3f1] text-xs text-[#1a1c1a] focus:outline-none focus:ring-2 focus:ring-[#fd6a49]"
          />
          <button
            type="submit"
            disabled={!newWishlistItem.trim()}
            className="px-4 h-10 rounded-full bg-[#1e1b4b] disabled:opacity-40 text-white text-xs font-bold hover:bg-[#070235]"
          >
            Add
          </button>
        </form>
      </div>

      {/* Privacy & Safety Controls */}
      <div className="mt-4 rounded-3xl bg-white p-5 shadow-sm border border-[#1e1b4b]/5 space-y-4">
        <h2 className="text-xs font-bold text-[#787680] uppercase tracking-wider">
          Safety & Privacy Controls
        </h2>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-[#070235] block">
              Show Approximate Area Only
            </span>
            <span className="text-[11px] text-[#787680]">
              Shows "Indiranagar (1.2 km)" without exact map coordinates
            </span>
          </div>
          <button
            onClick={() => setApproxLocationOnly(!approxLocationOnly)}
            className={`w-11 h-6 rounded-full transition-colors relative flex items-center px-0.5 ${
              approxLocationOnly ? 'bg-[#fd6a49]' : 'bg-[#dbdad7]'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
                approxLocationOnly ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-[#070235] block">
              Verified Members Messaging
            </span>
            <span className="text-[11px] text-[#787680]">
              Only ID-verified users can send you initial icebreakers
            </span>
          </div>
          <button
            onClick={() => setVerifiedOnlyCanMessage(!verifiedOnlyCanMessage)}
            className={`w-11 h-6 rounded-full transition-colors relative flex items-center px-0.5 ${
              verifiedOnlyCanMessage ? 'bg-[#fd6a49]' : 'bg-[#dbdad7]'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
                verifiedOnlyCanMessage ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditingProfile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-[#1e1b4b]/10">
            <h3 className="text-sm font-bold text-[#070235] mb-3">Edit Profile Bio</h3>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-[#070235] block mb-1">Role / Headline</label>
                <input
                  type="text"
                  value={roleEdit}
                  onChange={(e) => setRoleEdit(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl bg-[#faf9f6] border border-[#1e1b4b]/10 text-xs focus:ring-2 focus:ring-[#fd6a49] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#070235] block mb-1">About Me</label>
                <textarea
                  rows={4}
                  value={bioEdit}
                  onChange={(e) => setBioEdit(e.target.value)}
                  className="w-full p-3 rounded-xl bg-[#faf9f6] border border-[#1e1b4b]/10 text-xs focus:ring-2 focus:ring-[#fd6a49] focus:outline-none leading-relaxed"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 mt-4 pt-3 border-t border-[#1e1b4b]/5">
              <button
                onClick={() => setIsEditingProfile(false)}
                className="px-4 py-2 text-xs font-semibold text-[#47464f]"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveProfile}
                className="px-5 py-2 rounded-full bg-[#fd6a49] text-white text-xs font-bold shadow-sm"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
