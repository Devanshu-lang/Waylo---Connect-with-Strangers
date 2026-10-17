/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { BottomNav, TabType } from './components/BottomNav';
import { DiscoverScreen } from './components/screens/DiscoverScreen';
import { ActivitiesScreen } from './components/screens/ActivitiesScreen';
import { GroupsScreen } from './components/screens/GroupsScreen';
import { MessagesScreen } from './components/screens/MessagesScreen';
import { ProfileScreen } from './components/screens/ProfileScreen';
import { PersonDetailModal } from './components/PersonDetailModal';
import { IcebreakerModal } from './components/IcebreakerModal';
import { ActivityDetailModal } from './components/ActivityDetailModal';
import { SafetyModal } from './components/SafetyModal';
import { FilterTuneModal } from './components/FilterTuneModal';
import { CreateActivityModal } from './components/CreateActivityModal';

import {
  INITIAL_PEOPLE,
  INITIAL_ACTIVITIES,
  INITIAL_GROUPS,
  INITIAL_THREADS,
  CURRENT_USER,
  Person,
  Activity,
  CommunityGroup,
  ChatThread
} from './data/mockData';

export default function App() {
  // Navigation & City
  const [activeTab, setActiveTab] = useState<TabType>('discover');
  const [currentCity, setCurrentCity] = useState('Bengaluru');

  // Core Data
  const [people, setPeople] = useState<Person[]>(INITIAL_PEOPLE);
  const [activities, setActivities] = useState<Activity[]>(INITIAL_ACTIVITIES);
  const [groups, setGroups] = useState<CommunityGroup[]>(INITIAL_GROUPS);
  const [threads, setThreads] = useState<ChatThread[]>(INITIAL_THREADS);
  const [activeThreadId, setActiveThreadId] = useState<string | null>(null);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [filterRadius, setFilterRadius] = useState<number>(5);
  const [filterVerifiedOnly, setFilterVerifiedOnly] = useState<boolean>(false);
  const [filterArrival, setFilterArrival] = useState<string>('all');

  // Modals
  const [selectedPersonForDetail, setSelectedPersonForDetail] = useState<Person | null>(null);
  const [selectedPersonForIcebreaker, setSelectedPersonForIcebreaker] = useState<Person | null>(null);
  const [selectedActivityForDetail, setSelectedActivityForDetail] = useState<Activity | null>(null);
  const [isSafetyModalOpen, setIsSafetyModalOpen] = useState(false);
  const [isTuneModalOpen, setIsTuneModalOpen] = useState(false);
  const [isCreateActivityOpen, setIsCreateActivityOpen] = useState(false);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // Toggle RSVP on activities
  const handleToggleJoinActivity = (activityId: string) => {
    setActivities((prev) =>
      prev.map((act) => {
        if (act.id === activityId) {
          const newJoined = !act.isJoined;
          const updatedAttendees = newJoined
            ? [
                ...act.attendees,
                { name: 'Maya (You)', avatar: CURRENT_USER.avatar }
              ]
            : act.attendees.filter((att) => !att.name.includes('Maya'));

          const updated = {
            ...act,
            isJoined: newJoined,
            joinedCount: newJoined ? act.joinedCount + 1 : Math.max(1, act.joinedCount - 1),
            attendees: updatedAttendees
          };

          showToast(
            newJoined
              ? `You're on the guestlist for "${act.title}"! 🎉`
              : `Removed your spot for "${act.title}".`
          );

          if (selectedActivityForDetail && selectedActivityForDetail.id === activityId) {
            setSelectedActivityForDetail(updated);
          }
          return updated;
        }
        return act;
      })
    );
  };

  // Toggle Join Community Group
  const handleToggleJoinGroup = (groupId: string) => {
    setGroups((prev) =>
      prev.map((grp) => {
        if (grp.id === groupId) {
          const newStatus = !grp.isJoined;
          showToast(
            newStatus
              ? `Joined ${grp.name}! Welcome to the circle.`
              : `Left ${grp.name}.`
          );
          return {
            ...grp,
            isJoined: newStatus,
            membersCount: newStatus ? grp.membersCount + 1 : grp.membersCount - 1
          };
        }
        return grp;
      })
    );
  };

  // Say Hello -> Opens or starts thread
  const handleSayHello = (person: Person, initialMsg?: string) => {
    const threadId = `thread-${person.id}`;
    const defaultGreeting = initialMsg || `Hey ${person.name.split(' ')[0]}! 👋 Saw your profile on WAYLO. Welcome to Bengaluru!`;

    // Check if thread exists
    const existing = threads.find((t) => t.id === threadId || t.partnerId === person.id);

    if (!existing) {
      const newThread: ChatThread = {
        id: threadId,
        partnerId: person.id,
        name: person.name,
        avatar: person.avatar,
        isGroup: false,
        lastMessage: defaultGreeting,
        lastTimestamp: 'Just now',
        unreadCount: 0,
        statusText: `Active in ${person.neighborhood}`,
        messages: [
          {
            id: `msg-${Date.now()}`,
            senderId: 'maya',
            senderName: 'Maya',
            text: defaultGreeting,
            timestamp: 'Just now',
            isMe: true
          }
        ]
      };
      setThreads([newThread, ...threads]);
    } else if (initialMsg) {
      setThreads((prev) =>
        prev.map((t) => {
          if (t.id === existing.id) {
            return {
              ...t,
              lastMessage: initialMsg,
              lastTimestamp: 'Just now',
              messages: [
                ...t.messages,
                {
                  id: `msg-${Date.now()}`,
                  senderId: 'maya',
                  senderName: 'Maya',
                  text: initialMsg,
                  timestamp: 'Just now',
                  isMe: true
                }
              ]
            };
          }
          return t;
        })
      );
    }

    setActiveThreadId(existing ? existing.id : threadId);
    setActiveTab('messages');
    showToast(`Started low-pressure chat with ${person.name}`);
  };

  // Sending message in an existing thread
  const handleSendMessage = (threadId: string, text: string) => {
    setThreads((prev) =>
      prev.map((t) => {
        if (t.id === threadId) {
          const userMsg = {
            id: `msg-${Date.now()}`,
            senderId: 'maya',
            senderName: 'Maya',
            text,
            timestamp: 'Just now',
            isMe: true
          };
          return {
            ...t,
            lastMessage: text,
            lastTimestamp: 'Just now',
            messages: [...t.messages, userMsg]
          };
        }
        return t;
      })
    );

    // Friendly auto-reply simulation for demo liveliness
    const matchedThread = threads.find((t) => t.id === threadId);
    if (matchedThread && !matchedThread.isGroup) {
      setTimeout(() => {
        setThreads((prev) =>
          prev.map((t) => {
            if (t.id === threadId) {
              const replies = [
                "That's awesome! Let's definitely catch a brew around 12th Main soon.",
                "Sounds like a plan! I love low-key outdoor walks around the parks here.",
                "Totally agree! Looking forward to exploring more spots together."
              ];
              const randomReply = replies[Math.floor(Math.random() * replies.length)];
              return {
                ...t,
                lastMessage: randomReply,
                lastTimestamp: 'Just now',
                messages: [
                  ...t.messages,
                  {
                    id: `msg-reply-${Date.now()}`,
                    senderId: t.partnerId || 'partner',
                    senderName: t.name.split(' ')[0],
                    text: randomReply,
                    timestamp: 'Just now',
                    isMe: false
                  }
                ]
              };
            }
            return t;
          })
        );
      }, 1500);
    }
  };

  // Create new Activity
  const handleCreateActivity = (
    newActData: Omit<Activity, 'id' | 'joinedCount' | 'isJoined' | 'attendees'>
  ) => {
    const newActivity: Activity = {
      ...newActData,
      id: `act-${Date.now()}`,
      joinedCount: 1,
      isJoined: true,
      attendees: [
        { name: 'Maya (Host)', avatar: CURRENT_USER.avatar }
      ]
    };
    setActivities([newActivity, ...activities]);
    showToast(`Meetup "${newActivity.title}" posted to Bengaluru community! 🚀`);
  };

  // Filter People based on Search & Category & Tune Settings
  const filteredPeople = people.filter((p) => {
    if (filterVerifiedOnly && !p.isVerified) return false;

    if (filterArrival === '2wks' && !p.arrivalTag.includes('days') && !p.arrivalTag.includes('2 weeks') && !p.arrivalTag.includes('1 week')) {
      return false;
    }

    if (currentCity !== 'Bengaluru' && currentCity !== 'Bengaluru (All)' && !p.neighborhood.toLowerCase().includes(currentCity.toLowerCase())) {
      return false;
    }

    if (selectedCategory !== 'all') {
      if (selectedCategory === 'coffee' && !p.sharedInterests.some(i => i.toLowerCase().includes('coffee'))) return false;
      if (selectedCategory === 'walk' && !p.sharedInterests.some(i => i.toLowerCase().includes('trek') || i.toLowerCase().includes('walk') || i.toLowerCase().includes('running'))) return false;
      if (selectedCategory === 'food' && !p.sharedInterests.some(i => i.toLowerCase().includes('food') || i.toLowerCase().includes('brunch') || i.toLowerCase().includes('coffee'))) return false;
      if (selectedCategory === 'newcomers' && !p.arrivalTag.toLowerCase().includes('new') && !p.arrivalTag.toLowerCase().includes('visiting')) return false;
      if (selectedCategory === 'verified' && !p.isVerified) return false;
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = p.name.toLowerCase().includes(q);
      const matchBio = p.bio.toLowerCase().includes(q);
      const matchHood = p.neighborhood.toLowerCase().includes(q);
      const matchInterests = p.sharedInterests.some((i) => i.toLowerCase().includes(q));
      return matchName || matchBio || matchHood || matchInterests;
    }

    return true;
  });

  // Total unread messages count
  const unreadCount = threads.reduce((acc, t) => acc + (t.unreadCount || 0), 0);

  return (
    <div className="min-h-screen bg-[#faf9f6] text-[#1a1c1a] flex flex-col font-sans selection:bg-[#ffdad2] selection:text-[#3d0600]">
      {/* Top Header */}
      <Header
        currentCity={currentCity}
        onCityChange={(city) => {
          setCurrentCity(city);
          showToast(`Browsing ${city}`);
        }}
        onOpenSafety={() => setIsSafetyModalOpen(true)}
        onNavigateToProfile={() => setActiveTab('profile')}
        nearbyCount={142}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative w-full pt-16 bg-[#faf9f6]">
        {activeTab === 'discover' && (
          <DiscoverScreen
            people={filteredPeople}
            activities={activities}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            onOpenTuneFilters={() => setIsTuneModalOpen(true)}
            onOpenSafety={() => setIsSafetyModalOpen(true)}
            onOpenPersonDetail={(person) => setSelectedPersonForDetail(person)}
            onOpenIcebreakers={(person) => setSelectedPersonForIcebreaker(person)}
            onOpenActivityDetail={(act) => setSelectedActivityForDetail(act)}
            onToggleJoinActivity={handleToggleJoinActivity}
            onSayHello={(person) => setSelectedPersonForDetail(person)}
            onViewAllActivities={() => setActiveTab('activities')}
          />
        )}

        {activeTab === 'activities' && (
          <ActivitiesScreen
            activities={activities}
            onOpenActivityDetail={(act) => setSelectedActivityForDetail(act)}
            onToggleJoinActivity={handleToggleJoinActivity}
            onOpenCreateActivity={() => setIsCreateActivityOpen(true)}
            onOpenChat={(act) => {
              const thread = threads.find((t) => t.isGroup);
              if (thread) {
                setActiveThreadId(thread.id);
                setActiveTab('messages');
              }
            }}
          />
        )}

        {activeTab === 'groups' && (
          <GroupsScreen
            groups={groups}
            onToggleJoinGroup={handleToggleJoinGroup}
          />
        )}

        {activeTab === 'messages' && (
          <MessagesScreen
            threads={threads}
            activeThreadId={activeThreadId}
            onSelectThread={(tId) => {
              setActiveThreadId(tId || null);
              if (tId) {
                setThreads((prev) =>
                  prev.map((t) => (t.id === tId ? { ...t, unreadCount: 0 } : t))
                );
              }
            }}
            onSendMessage={handleSendMessage}
          />
        )}

        {activeTab === 'profile' && (
          <ProfileScreen
            currentCity={currentCity}
            onCityChange={setCurrentCity}
            onOpenSafety={() => setIsSafetyModalOpen(true)}
          />
        )}
      </main>

      {/* Floating Bottom Tab Bar */}
      <BottomNav
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        unreadCount={unreadCount}
      />

      {/* Person Detail Modal */}
      <PersonDetailModal
        person={selectedPersonForDetail}
        onClose={() => setSelectedPersonForDetail(null)}
        onSendMessage={(person, msg) => handleSayHello(person, msg)}
      />

      {/* Icebreaker Modal */}
      <IcebreakerModal
        person={selectedPersonForIcebreaker}
        onClose={() => setSelectedPersonForIcebreaker(null)}
        onSelectPrompt={(prompt) => {
          if (selectedPersonForIcebreaker) {
            handleSayHello(selectedPersonForIcebreaker, prompt);
          }
        }}
      />

      {/* Activity Detail Modal */}
      <ActivityDetailModal
        activity={selectedActivityForDetail}
        onClose={() => setSelectedActivityForDetail(null)}
        onToggleJoin={handleToggleJoinActivity}
        onOpenChat={(act) => {
          const groupThread = threads.find((t) => t.isGroup);
          if (groupThread) {
            setActiveThreadId(groupThread.id);
            setActiveTab('messages');
          }
        }}
      />

      {/* Safety & Trust Modal */}
      <SafetyModal
        isOpen={isSafetyModalOpen}
        onClose={() => setIsSafetyModalOpen(false)}
      />

      {/* Filter Tune Modal */}
      <FilterTuneModal
        isOpen={isTuneModalOpen}
        onClose={() => setIsTuneModalOpen(false)}
        radius={filterRadius}
        onRadiusChange={setFilterRadius}
        verifiedOnly={filterVerifiedOnly}
        onToggleVerifiedOnly={setFilterVerifiedOnly}
        selectedArrivalFilter={filterArrival}
        onArrivalFilterChange={setFilterArrival}
        onReset={() => {
          setFilterRadius(5);
          setFilterVerifiedOnly(false);
          setFilterArrival('all');
          setSelectedCategory('all');
          setSearchQuery('');
          showToast('Filters reset');
        }}
      />

      {/* Create Activity Modal */}
      <CreateActivityModal
        isOpen={isCreateActivityOpen}
        onClose={() => setIsCreateActivityOpen(false)}
        onCreate={handleCreateActivity}
      />

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-full bg-[#070235] text-white text-xs font-semibold shadow-xl border border-white/10 flex items-center gap-2 animate-in fade-in slide-in-from-top-4 duration-200">
          <span className="material-symbols-outlined text-[16px] text-[#fd6a49]">
            info
          </span>
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
