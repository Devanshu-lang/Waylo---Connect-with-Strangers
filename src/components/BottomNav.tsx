import React from 'react';

export type TabType = 'discover' | 'activities' | 'groups' | 'messages' | 'profile';

interface BottomNavProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  unreadCount?: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onTabChange,
  unreadCount = 2
}) => {
  const tabs = [
    {
      id: 'discover' as TabType,
      label: 'Discover',
      icon: 'explore'
    },
    {
      id: 'activities' as TabType,
      label: 'Activities',
      icon: 'local_activity'
    },
    {
      id: 'groups' as TabType,
      label: 'Groups',
      icon: 'groups_2'
    },
    {
      id: 'messages' as TabType,
      label: 'Messages',
      icon: 'chat_bubble',
      badge: unreadCount
    },
    {
      id: 'profile' as TabType,
      label: 'Profile',
      icon: 'account_circle'
    }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 pointer-events-none px-4 pb-safe">
      <nav
        role="navigation"
        aria-label="Main Navigation"
        className="pointer-events-auto mx-auto max-w-md w-full bg-white/95 backdrop-blur-2xl rounded-full shadow-[0_16px_36px_-6px_rgba(30,27,75,0.14),0_2px_8px_rgba(30,27,75,0.06)] border border-[#1e1b4b]/5 px-1 py-1"
      >
        <div className="flex justify-between items-center">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                aria-current={isActive ? 'page' : undefined}
                className={`group relative flex flex-col items-center justify-center w-16 h-14 rounded-full transition-all focus:outline-none ${
                  isActive
                    ? 'text-[#1e1b4b] bg-[#f4f3f1] font-semibold'
                    : 'text-[#47464f] hover:text-[#1a1c1a]'
                }`}
              >
                <div className="relative flex flex-col items-center justify-center">
                  <div className="relative inline-flex items-center justify-center">
                    <span
                      className="material-symbols-outlined text-[24px] transition-transform group-hover:scale-105"
                      style={isActive ? { fontVariationSettings: "'FILL' 1" } : undefined}
                    >
                      {tab.icon}
                    </span>
                    {Boolean(tab.badge && tab.badge > 0) && (
                      <span className="absolute -top-1 -right-2 flex items-center justify-center min-w-[16px] h-4 px-1 rounded-full bg-[#fd6a49] text-white text-[10px] font-bold">
                        {tab.badge}
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] leading-tight mt-0.5 tracking-tight">
                    {tab.label}
                  </span>
                  {isActive ? (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#fd6a49] mt-0.5"></span>
                  ) : (
                    <span className="w-1.5 h-1.5 mt-0.5"></span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
};
