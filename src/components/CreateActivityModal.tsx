import React, { useState } from 'react';
import { Activity } from '../data/mockData';

interface CreateActivityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (newActivity: Omit<Activity, 'id' | 'joinedCount' | 'isJoined' | 'attendees'>) => void;
}

export const CreateActivityModal: React.FC<CreateActivityModalProps> = ({
  isOpen,
  onClose,
  onCreate
}) => {
  const [title, setTitle] = useState('');
  const [dayBadge, setDayBadge] = useState<'SAT' | 'SUN' | 'FRI' | 'MON'>('SAT');
  const [time, setTime] = useState('Sat • 5:00 PM');
  const [location, setLocation] = useState('Indiranagar 100ft Road (Open public cafe)');
  const [venueName, setVenueName] = useState('Araku Coffee / Maverick & Farmer');
  const [meetingPoint, setMeetingPoint] = useState('Outdoor seating area under the large rain tree');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<'coffee' | 'walk' | 'food' | 'cowork' | 'culture'>('coffee');
  const [maxCap, setMaxCap] = useState(5);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    onCreate({
      title: title.trim(),
      dayBadge,
      time,
      location,
      venueName,
      meetingPoint,
      description: description.trim(),
      category,
      maxCap,
      image: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=800&q=80',
      host: {
        name: 'Maya V.',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBARWM5q6gyiZLJSIjA8jEQQws_nJSNxYcteKn5FQJ352XJ3XCrf0SALZm4PU92rEGVW4YS5DiW7fO_O1npwwvQrJw4m687KYbVGXrEvHYQ91fbjq2RQZk4WNL0Hoa2VbpzJ9Cgs3jCWD9Lfk6gZnVY9T2qqukLSRxc0Pn7TEE5HsIKYLuqNOsn4YEsuBbWT8h542J_XzvfdKk1TDvtSOXuyMq4TrBTFiNvCwStBcuiERK7Me0opXA',
        role: 'Host & Fellow Newcomer'
      }
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-[#faf9f6] rounded-t-3xl sm:rounded-3xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden border border-[#1e1b4b]/10 animate-in slide-in-from-bottom-6 duration-200">
        <div className="p-5 bg-[#070235] text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-[#ffdad2] text-[#3d0600] flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">add_circle</span>
            </div>
            <div>
              <h3 className="text-sm font-bold">Propose a Public Small-Group Meetup</h3>
              <p className="text-[11px] text-[#e3dfff]">Zero pressure, 100% verified public venue</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 sm:p-6 overflow-y-auto space-y-4 flex-1 text-xs">
          <div>
            <label className="font-bold text-[#070235] block mb-1">Meetup Title</label>
            <input
              type="text"
              required
              placeholder="e.g. Morning Pour-Over & Book Chat"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full h-11 px-3.5 rounded-xl bg-white border border-[#1e1b4b]/10 text-xs text-[#1a1c1a] focus:ring-2 focus:ring-[#fd6a49] focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-[#070235] block mb-1">Day & Time</label>
              <input
                type="text"
                required
                placeholder="Sat • 10:30 AM"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full h-11 px-3 rounded-xl bg-white border border-[#1e1b4b]/10 text-xs focus:ring-2 focus:ring-[#fd6a49] focus:outline-none"
              />
            </div>

            <div>
              <label className="font-bold text-[#070235] block mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full h-11 px-3 rounded-xl bg-white border border-[#1e1b4b]/10 text-xs focus:ring-2 focus:ring-[#fd6a49] focus:outline-none"
              >
                <option value="coffee">Coffee & Chat</option>
                <option value="walk">City Walk</option>
                <option value="food">Food Crawl</option>
                <option value="cowork">Coworking Sprint</option>
                <option value="culture">Art & Culture</option>
              </select>
            </div>
          </div>

          <div>
            <label className="font-bold text-[#070235] block mb-1">Public Venue & Neighborhood</label>
            <input
              type="text"
              required
              placeholder="e.g. Cubbon Park / Araku Indiranagar"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full h-11 px-3.5 rounded-xl bg-white border border-[#1e1b4b]/10 text-xs focus:ring-2 focus:ring-[#fd6a49] focus:outline-none"
            />
          </div>

          <div>
            <label className="font-bold text-[#070235] block mb-1">Exact Public Meeting Point</label>
            <input
              type="text"
              required
              placeholder="e.g. Front bench near the red library building"
              value={meetingPoint}
              onChange={(e) => setMeetingPoint(e.target.value)}
              className="w-full h-11 px-3.5 rounded-xl bg-white border border-[#1e1b4b]/10 text-xs focus:ring-2 focus:ring-[#fd6a49] focus:outline-none"
            />
          </div>

          <div>
            <label className="font-bold text-[#070235] block mb-1">What's the plan & vibe?</label>
            <textarea
              required
              rows={3}
              placeholder="Describe what we will do together, duration (typically 60-90 mins), and why it's a chill, low-pressure hangout..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 rounded-xl bg-white border border-[#1e1b4b]/10 text-xs focus:ring-2 focus:ring-[#fd6a49] focus:outline-none"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="font-bold text-[#070235]">Group Cap (Max Attendees)</label>
              <span className="font-bold text-[#fd6a49]">{maxCap} people</span>
            </div>
            <input
              type="range"
              min={3}
              max={8}
              step={1}
              value={maxCap}
              onChange={(e) => setMaxCap(Number(e.target.value))}
              className="w-full accent-[#fd6a49] cursor-pointer"
            />
            <p className="text-[10px] text-[#787680] mt-0.5">
              Capped between 3 to 8 members to keep conversations natural and intimate.
            </p>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full h-12 rounded-full bg-[#fd6a49] text-white text-xs font-bold shadow-[0_4px_14px_rgba(253,106,73,0.3)] hover:opacity-95 transition-all"
            >
              Post Small-Group Meetup
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
