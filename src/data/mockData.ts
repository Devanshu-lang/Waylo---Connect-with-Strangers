export interface Person {
  id: string;
  name: string;
  age: number;
  neighborhood: string;
  distance: string;
  arrivalTag: string;
  avatar: string;
  isVerified: boolean;
  sharedInterests: string[];
  bio: string;
  fullBio: string;
  languages: string[];
  profession: string;
  icebreakers: string[];
  idealSunday: string;
  favoriteSpot: string;
  originCity: string;
}

export interface Activity {
  id: string;
  title: string;
  dayBadge: 'SAT' | 'SUN' | 'FRI' | 'MON';
  time: string;
  location: string;
  venueName: string;
  image: string;
  host: {
    name: string;
    avatar: string;
    role: string;
  };
  joinedCount: number;
  maxCap: number;
  isJoined?: boolean;
  category: 'coffee' | 'walk' | 'food' | 'cowork' | 'culture';
  description: string;
  meetingPoint: string;
  attendees: {
    name: string;
    avatar: string;
  }[];
}

export interface CommunityGroup {
  id: string;
  name: string;
  category: string;
  membersCount: number;
  description: string;
  regularRhythm: string;
  neighborhood: string;
  image: string;
  isJoined?: boolean;
  nextMeetup: string;
  rules: string[];
  recentTopic: string;
  tags: string[];
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  text: string;
  timestamp: string;
  isMe: boolean;
}

export interface ChatThread {
  id: string;
  partnerId?: string;
  name: string;
  avatar: string;
  isGroup: boolean;
  lastMessage: string;
  lastTimestamp: string;
  unreadCount: number;
  statusText?: string;
  messages: ChatMessage[];
}

export const INITIAL_PEOPLE: Person[] = [
  {
    id: 'arjun',
    name: 'Arjun M.',
    age: 27,
    neighborhood: 'Indiranagar',
    distance: '1.2 km away',
    arrivalTag: 'New in town (3 days)',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBbiax3peAniEkcbBRg3T_bMoIlW-GGhRQPPEWBpdb2fJdbPgz9-aoReZiTF8SE3JAGEIky74p5_4NA8JHz0A7VEB9eDHI9XovFZbdUcL7PMtXCVf2Q-F58nLuQmcD8Nl9AKBLyjol0yhSHGLO_njp2Lz0dW4EDI5KEcYkOh27o-ip6iqs1a68nyxgXOj95350AFF3-nkir6pvuDRIMp3BNNgmoiOIk9k4_VE-F19lMmK2PYp1lCsg',
    isVerified: true,
    sharedInterests: ['Specialty Coffee', 'Architecture', 'Weekend Treks'],
    bio: '“Recently relocated from Munich for a design role. Looking for weekend brunch & heritage walk buddies!”',
    fullBio: 'Industrial designer working on smart mobility. Just moved back to India after 4 years in Bavaria. Big fan of pourover brewing, modernist architecture, and quiet weekend trail runs.',
    languages: ['English', 'Hindi', 'German'],
    profession: 'Industrial Designer @ Mobility Studio',
    originCity: 'Munich, Germany',
    idealSunday: 'Slow manual brew with Ethiopian beans, cycling through Defence Colony, and sketchbooks in the sun.',
    favoriteSpot: 'Araku Coffee & Someshwara Temple courtyard in Ulsoor',
    icebreakers: [
      'What was the biggest culture shock moving from Munich to Bengaluru?',
      'Have you found a reliable manual pourover spot in Indiranagar yet?',
      'Up for a morning architecture sketch walk around Ulsoor Lake?'
    ]
  },
  {
    id: 'clara',
    name: 'Clara S.',
    age: 24,
    neighborhood: 'Koramangala',
    distance: '2.8 km away',
    arrivalTag: 'Visiting for 2 weeks',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDtaX_nlphxB-71KNcOT1_iQ31fKhSz0-8Z6-HGR59h45_3vEhJMdncJYxk-oSdNWyoIxOYC0asLuSsBaaBkg7gIwGTnvJqJ9m_L7LcOz9GvuxCLGDt58if07iCgsKxwxzezhEdMnbRHmlMEymPoD76qZKaCft_70ouDfFmmGKmheYw7KjCzzDzOZZIkeL8s41PZnajVCV44GrtFTVu-V_ene-5yOz8YgkKBsW9sVttrZZdIt-gk38',
    isVerified: true,
    sharedInterests: ['Art Galleries', 'Food Walks'],
    bio: '“Solo traveler exploring South India cuisine and quiet cafes to sketch. Happy to discover hidden street murals!”',
    fullBio: 'Illustrator and freelance textile researcher from Lyon. Traveling solo across Karnataka and Tamil Nadu before heading to Kochi. Always carrying watercolours and looking for local markets.',
    languages: ['French', 'English'],
    profession: 'Freelance Illustrator & Textile Researcher',
    originCity: 'Lyon, France',
    idealSunday: 'Watercolour painting at KR Flower Market at dawn followed by steaming filter coffee in small steel tumblers.',
    favoriteSpot: 'National Gallery of Modern Art (NGMA) garden cafe',
    icebreakers: [
      'What is your favorite watercolor subject you have sketched so far in Karnataka?',
      'Have you tried the crispy ghee roast dosa at Vidyarthi Bhavan?',
      'Want to visit the clay pottery studios in pottery town this Saturday?'
    ]
  },
  {
    id: 'rohan',
    name: 'Rohan K.',
    age: 29,
    neighborhood: 'HSR Layout',
    distance: '3.4 km away',
    arrivalTag: 'Bangalore native & host',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    isVerified: true,
    sharedInterests: ['Filter Coffee', 'Trail Running', 'Specialty Coffee'],
    bio: '“Born and raised in Bangalore. Love showing curious newcomers old-school Darshini joints and peaceful canopy walks.”',
    fullBio: 'Software architect at a clean energy startup. Runner, amateur birdwatcher, and lifelong South Bangalore enthusiast. Believes the best talks happen over 15-rupee filter coffee.',
    languages: ['Kannada', 'English', 'Hindi'],
    profession: 'Software Architect @ GreenGrid',
    originCity: 'Bengaluru, India',
    idealSunday: '7 AM 10k run around Agara Lake, followed by hot button idlis at Taaza Thindi.',
    favoriteSpot: 'Sankey Tank western walking loop at 6:30 AM',
    icebreakers: [
      'What is your all-time top 1 Darshini recommendation for newcomers?',
      'Do you have a favorite tree canopy trail that stays cool at noon?',
      'Which filter coffee blend is the gold standard in old Bangalore?'
    ]
  },
  {
    id: 'sophia',
    name: 'Sophia L.',
    age: 25,
    neighborhood: 'Lavelle Road',
    distance: '2.1 km away',
    arrivalTag: 'New in town (1 week)',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80',
    isVerified: true,
    sharedInterests: ['Book Clubs', 'Architecture', 'Art Galleries'],
    bio: '“Moved from Singapore for a climate research fellowship. Looking for peaceful reading spots and botanical garden walks.”',
    fullBio: 'Environmental policy researcher spending 6 months in Bengaluru. Keen on urban greenery, community gardens, quiet book cafes, and weekend flea markets.',
    languages: ['English', 'Mandarin'],
    profession: 'Climate Policy Fellow',
    originCity: 'Singapore',
    idealSunday: 'Browsing second-hand book stalls on Church Street, then reading for hours in Cubbon Park.',
    favoriteSpot: 'The terrace cafe at Bangalore International Centre (BIC)',
    icebreakers: [
      'What are you currently reading on your weekend park visits?',
      'Have you checked out the bookshops on Church Street yet?',
      'Are you interested in seeing the sustainable urban permaculture garden in Indiranagar?'
    ]
  }
];

export const INITIAL_ACTIVITIES: Activity[] = [
  {
    id: 'act-1',
    title: 'Sunset Filter Coffee & Sketch Walk',
    dayBadge: 'SAT',
    time: 'Sat • 4:30 PM',
    location: 'Cubbon Park (Central Bamboo Grove)',
    venueName: 'Cubbon Park Central Pavilion',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuABdb6tLhUZW_qPwBEPJzLlIGAIpyIlJCi2n2wdvCcX3oXz21X5J-HOIjZ3RfQWzLXB_Jb6_L7ot2oFEHkxDbZy69K9tu3KFCFSxeNlIlayUHyxkAz_BFuKps_mGzASLz57x5uBSBXuhUb0Q9cNEC97NU1gNk5yCW4csVuLVt207mWtiHhrpNnD7x0jFUGRzOiSAZJbJMKbGWfqIUJBidx_bZFUs8bhcww-czLnfD_NCr4ztTOK4zM',
    host: {
      name: 'Priya',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuActoxYZYr1lzOpzNJ7f_8NPE1dCfB2VOXdbxxvLCH1vkv3Pz0B3QAC4dB4NKt_hO_EmCMPmSEbZGkGZJVs-paPIpYSx-v8IMLhPg1NNJFI20sHowFHwAgyi1oXRBtVhKy4Ng519qXWnXRIw31S1LYtNWrEkJcO1DjhSq7YlHHNUuZpGV8lqTOZWpSCyq-b7wCl04lk7lpFmflKzKFXYZkGTdRm9hQc-0xmBmUbJhpCr6SNLHD29Ac',
      role: 'Urban Sketcher & Longtime Host'
    },
    joinedCount: 4,
    maxCap: 6,
    isJoined: false,
    category: 'culture',
    description: 'A relaxed, zero-pressure gathering under the massive bamboo groves. We will bring sketchbooks, watercolours, or just your favorite notebook. We grab hot filter coffee in flasks and sit together before catching the golden hour light.',
    meetingPoint: 'Meet right outside the Central Library red building under the giant bamboo clusters. Look for Priya with the terracotta canvas tote bag.',
    attendees: [
      { name: 'Priya (Host)', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuActoxYZYr1lzOpzNJ7f_8NPE1dCfB2VOXdbxxvLCH1vkv3Pz0B3QAC4dB4NKt_hO_EmCMPmSEbZGkGZJVs-paPIpYSx-v8IMLhPg1NNJFI20sHowFHwAgyi1oXRBtVhKy4Ng519qXWnXRIw31S1LYtNWrEkJcO1DjhSq7YlHHNUuZpGV8lqTOZWpSCyq-b7wCl04lk7lpFmflKzKFXYZkGTdRm9hQc-0xmBmUbJhpCr6SNLHD29Ac' },
      { name: 'Arjun M.', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBbiax3peAniEkcbBRg3T_bMoIlW-GGhRQPPEWBpdb2fJdbPgz9-aoReZiTF8SE3JAGEIky74p5_4NA8JHz0A7VEB9eDHI9XovFZbdUcL7PMtXCVf2Q-F58nLuQmcD8Nl9AKBLyjol0yhSHGLO_njp2Lz0dW4EDI5KEcYkOh27o-ip6iqs1a68nyxgXOj95350AFF3-nkir6pvuDRIMp3BNNgmoiOIk9k4_VE-F19lMmK2PYp1lCsg' },
      { name: 'Clara S.', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDtaX_nlphxB-71KNcOT1_iQ31fKhSz0-8Z6-HGR59h45_3vEhJMdncJYxk-oSdNWyoIxOYC0asLuSsBaaBkg7gIwGTnvJqJ9m_L7LcOz9GvuxCLGDt58if07iCgsKxwxzezhEdMnbRHmlMEymPoD76qZKaCft_70ouDfFmmGKmheYw7KjCzzDzOZZIkeL8s41PZnajVCV44GrtFTVu-V_ene-5yOz8YgkKBsW9sVttrZZdIt-gk38' },
      { name: 'Sameer V.', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80' }
    ]
  },
  {
    id: 'act-2',
    title: 'Sunday Street Food Crawl',
    dayBadge: 'SUN',
    time: 'Sun • 6:00 PM',
    location: 'VV Puram Food Street (Old Bangalore)',
    venueName: 'VV Puram Food Street Entrance',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB0RScbAM5zjgDwtbqEJSvJF0xRd3tdATsAsA303sMEUoENsqKeROA-GRySInwySPHaKigHGsj1MoMTkOWgb21-q8LkCfXkKq2-7xSzYn9N6QjgHLu43VvxKNX6T9t6PlH_d032yHwSiRno-ySsf_a_9RrWv4hdSLzd279_O0W3xM7hpHKGgroJpSXM03N3SkOhWYAdnmnz7Zf6JdqXGaU6bKJm67Cmzs9Ur2RWL1MeIM7YU0Zf8gM',
    host: {
      name: 'Rohan K.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      role: 'Local Foodie Guide'
    },
    joinedCount: 6,
    maxCap: 8,
    isJoined: false,
    category: 'food',
    description: 'An evening tasting tour through Bangalore’s most iconic vegetarian food street. We will sample crispy paddus, hot congress buns, gulkand with ice cream, and authentic South Indian chaat together.',
    meetingPoint: 'Front gate of VB Bakery on Food Street. Look for Rohan holding a blue WAYLO meetup card.',
    attendees: [
      { name: 'Rohan (Host)', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80' },
      { name: 'Vikram', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80' },
      { name: 'Ananya', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80' },
      { name: 'Mark', avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&q=80' },
      { name: 'Nisha', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80' },
      { name: 'Tanvi', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80' }
    ]
  },
  {
    id: 'act-3',
    title: 'Indiranagar 12th Main Specialty Coffee Hop',
    dayBadge: 'SAT',
    time: 'Sat • 10:30 AM',
    location: '12th Main Road, Indiranagar',
    venueName: 'Maverick & Farmer / Araku Patio',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80',
    host: {
      name: 'Arjun M.',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBbiax3peAniEkcbBRg3T_bMoIlW-GGhRQPPEWBpdb2fJdbPgz9-aoReZiTF8SE3JAGEIky74p5_4NA8JHz0A7VEB9eDHI9XovFZbdUcL7PMtXCVf2Q-F58nLuQmcD8Nl9AKBLyjol0yhSHGLO_njp2Lz0dW4EDI5KEcYkOh27o-ip6iqs1a68nyxgXOj95350AFF3-nkir6pvuDRIMp3BNNgmoiOIk9k4_VE-F19lMmK2PYp1lCsg',
      role: 'Coffee Explorer'
    },
    joinedCount: 3,
    maxCap: 5,
    isJoined: false,
    category: 'coffee',
    description: 'Casual morning crawl to taste three distinct single-origin roasts across two leafy Indiranagar cafes. Low-key banter, talk about coffee notes, and nice outdoor patios.',
    meetingPoint: 'Courtyard entrance of Maverick & Farmer, 12th Main Indiranagar.',
    attendees: [
      { name: 'Arjun (Host)', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBbiax3peAniEkcbBRg3T_bMoIlW-GGhRQPPEWBpdb2fJdbPgz9-aoReZiTF8SE3JAGEIky74p5_4NA8JHz0A7VEB9eDHI9XovFZbdUcL7PMtXCVf2Q-F58nLuQmcD8Nl9AKBLyjol0yhSHGLO_njp2Lz0dW4EDI5KEcYkOh27o-ip6iqs1a68nyxgXOj95350AFF3-nkir6pvuDRIMp3BNNgmoiOIk9k4_VE-F19lMmK2PYp1lCsg' },
      { name: 'Dev', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80' },
      { name: 'Zara', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80' }
    ]
  },
  {
    id: 'act-4',
    title: 'Quiet Coworking & Focused Sprint',
    dayBadge: 'MON',
    time: 'Mon • 10:00 AM',
    location: 'Blue Tokai Indiranagar',
    venueName: 'Blue Tokai Cafe & Roastery',
    image: 'https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?auto=format&fit=crop&w=800&q=80',
    host: {
      name: 'Maya V.',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBARWM5q6gyiZLJSIjA8jEQQws_nJSNxYcteKn5FQJ352XJ3XCrf0SALZm4PU92rEGVW4YS5DiW7fO_O1npwwvQrJw4m687KYbVGXrEvHYQ91fbjq2RQZk4WNL0Hoa2VbpzJ9Cgs3jCWD9Lfk6gZnVY9T2qqukLSRxc0Pn7TEE5HsIKYLuqNOsn4YEsuBbWT8h542J_XzvfdKk1TDvtSOXuyMq4TrBTFiNvCwStBcuiERK7Me0opXA',
      role: 'Maya (You)'
    },
    joinedCount: 2,
    maxCap: 4,
    isJoined: true,
    category: 'cowork',
    description: 'A cozy 2-hour focused co-working sprint followed by an informal lunch. Bring your laptop and noise-cancelling headphones for good collaborative focus.',
    meetingPoint: 'Upstairs mezzanine table with power plugs.',
    attendees: [
      { name: 'Maya (Host)', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBARWM5q6gyiZLJSIjA8jEQQws_nJSNxYcteKn5FQJ352XJ3XCrf0SALZm4PU92rEGVW4YS5DiW7fO_O1npwwvQrJw4m687KYbVGXrEvHYQ91fbjq2RQZk4WNL0Hoa2VbpzJ9Cgs3jCWD9Lfk6gZnVY9T2qqukLSRxc0Pn7TEE5HsIKYLuqNOsn4YEsuBbWT8h542J_XzvfdKk1TDvtSOXuyMq4TrBTFiNvCwStBcuiERK7Me0opXA' },
      { name: 'Arjun M.', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBbiax3peAniEkcbBRg3T_bMoIlW-GGhRQPPEWBpdb2fJdbPgz9-aoReZiTF8SE3JAGEIky74p5_4NA8JHz0A7VEB9eDHI9XovFZbdUcL7PMtXCVf2Q-F58nLuQmcD8Nl9AKBLyjol0yhSHGLO_njp2Lz0dW4EDI5KEcYkOh27o-ip6iqs1a68nyxgXOj95350AFF3-nkir6pvuDRIMp3BNNgmoiOIk9k4_VE-F19lMmK2PYp1lCsg' }
    ]
  }
];

export const INITIAL_GROUPS: CommunityGroup[] = [
  {
    id: 'grp-1',
    name: 'Indiranagar Coffee Walkers',
    category: 'Neighborhood Circle',
    membersCount: 142,
    description: 'Newcomers & longtime residents in 100ft & 12th Main area who enjoy casual morning walks to discover new specialty roasters.',
    regularRhythm: 'Every Saturday 9:30 AM',
    neighborhood: 'Indiranagar',
    image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80',
    isJoined: true,
    nextMeetup: 'This Sat at Maverick & Farmer',
    rules: [
      'Strictly public coffee spots only',
      'No networking or pitch decks',
      'Respect everyone’s social battery'
    ],
    recentTopic: 'Has anyone tested the new cold brew tap at Bloom & Brew?',
    tags: ['Specialty Coffee', 'Morning Walks', 'Indiranagar']
  },
  {
    id: 'grp-2',
    name: 'Munich & European Expats in BLR',
    category: 'Cultural Circle',
    membersCount: 78,
    description: 'A cozy hub for folks who moved from Germany, France, or wider Europe to Bengaluru. Swap tips on bread, tech visas, and weekend getaways.',
    regularRhythm: 'Bi-weekly Sunday Brunch',
    neighborhood: 'Central / Koramangala',
    image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=800&q=80',
    isJoined: false,
    nextMeetup: 'Sunday brunch at Lavelle Road',
    rules: [
      'Friendly welcome to both newcomers and curious locals',
      'Shared bill splitting transparency',
      'Positive, low-pressure conversations'
    ],
    recentTopic: 'Where can you find authentic sourdough rye bread in South Bangalore?',
    tags: ['Expats', 'Brunch', 'New In Town']
  },
  {
    id: 'grp-3',
    name: 'Cubbon Park Sketch & Journal Tribe',
    category: 'Creative Hub',
    membersCount: 215,
    description: 'Open-air artists, casual doodlers, and journalers who sit quietly under the bamboo groves every weekend with watercolor pads.',
    regularRhythm: 'Sundays 4:00 PM',
    neighborhood: 'Cubbon Park / Central BLR',
    image: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=800&q=80',
    isJoined: false,
    nextMeetup: 'Sunset meet this Saturday',
    rules: [
      'All skill levels welcome (zero judgment)',
      'Carry your own art supplies or a simple pen',
      'Leave no trash behind in Cubbon Park'
    ],
    recentTopic: 'Priya shared new photos of the blooming tabebuia trees!',
    tags: ['Sketching', 'Creative', 'Cubbon Park']
  },
  {
    id: 'grp-4',
    name: 'Bangalore Dosa & Darshini Crawlers',
    category: 'Food Explorers',
    membersCount: 320,
    description: 'Hunting for the crispiest benne masala dosa, softest thatte idli, and strongest filter coffee from Malleshwaram to Basavanagudi.',
    regularRhythm: 'Sunday Mornings 7:30 AM',
    neighborhood: 'Old Bangalore / Basavanagudi',
    image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80',
    isJoined: false,
    nextMeetup: 'Sunday 8 AM at CTR Shri Sagar',
    rules: [
      'Early birds preferred (7:30 AM starts)',
      'Appreciate local culinary heritage',
      'Share your favorite neighborhood gems'
    ],
    recentTopic: 'CTR vs Vidyarthi Bhavan - the eternal gentle debate continues',
    tags: ['Dosa', 'Breakfast', 'Local Food']
  }
];

export const INITIAL_THREADS: ChatThread[] = [
  {
    id: 'thread-arjun',
    partnerId: 'arjun',
    name: 'Arjun M.',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBbiax3peAniEkcbBRg3T_bMoIlW-GGhRQPPEWBpdb2fJdbPgz9-aoReZiTF8SE3JAGEIky74p5_4NA8JHz0A7VEB9eDHI9XovFZbdUcL7PMtXCVf2Q-F58nLuQmcD8Nl9AKBLyjol0yhSHGLO_njp2Lz0dW4EDI5KEcYkOh27o-ip6iqs1a68nyxgXOj95350AFF3-nkir6pvuDRIMp3BNNgmoiOIk9k4_VE-F19lMmK2PYp1lCsg',
    isGroup: false,
    lastMessage: 'Have you tried the pour-over at Araku yet? The terrace is great.',
    lastTimestamp: '10:42 AM',
    unreadCount: 1,
    statusText: 'Active now • Indiranagar',
    messages: [
      {
        id: 'm1',
        senderId: 'arjun',
        senderName: 'Arjun',
        text: 'Hey Maya! 👋 Saw you just moved here from Delhi. How are you settling in?',
        timestamp: '10:30 AM',
        isMe: false
      },
      {
        id: 'm2',
        senderId: 'maya',
        senderName: 'Maya',
        text: 'Hey Arjun! Really loving the weather here compared to Delhi heat. Still figuring out good coffee spots around Indiranagar though!',
        timestamp: '10:35 AM',
        isMe: true
      },
      {
        id: 'm3',
        senderId: 'arjun',
        senderName: 'Arjun',
        text: 'Have you tried the pour-over at Araku yet? The terrace is great.',
        timestamp: '10:42 AM',
        isMe: false
      }
    ]
  },
  {
    id: 'thread-clara',
    partnerId: 'clara',
    name: 'Clara S.',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDtaX_nlphxB-71KNcOT1_iQ31fKhSz0-8Z6-HGR59h45_3vEhJMdncJYxk-oSdNWyoIxOYC0asLuSsBaaBkg7gIwGTnvJqJ9m_L7LcOz9GvuxCLGDt58if07iCgsKxwxzezhEdMnbRHmlMEymPoD76qZKaCft_70ouDfFmmGKmheYw7KjCzzDzOZZIkeL8s41PZnajVCV44GrtFTVu-V_ene-5yOz8YgkKBsW9sVttrZZdIt-gk38',
    isGroup: false,
    lastMessage: 'Would love to sketch the old stone arches together this Saturday!',
    lastTimestamp: 'Yesterday',
    unreadCount: 1,
    statusText: 'Visiting • Koramangala',
    messages: [
      {
        id: 'c1',
        senderId: 'clara',
        senderName: 'Clara',
        text: 'Bonjour Maya! I saw in your profile that you love architecture sketching.',
        timestamp: 'Yesterday 3:15 PM',
        isMe: false
      },
      {
        id: 'c2',
        senderId: 'clara',
        senderName: 'Clara',
        text: 'Would love to sketch the old stone arches together this Saturday!',
        timestamp: 'Yesterday 3:18 PM',
        isMe: false
      }
    ]
  },
  {
    id: 'thread-meetup-group',
    name: 'Sunset Filter Coffee & Sketch Walk',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuABdb6tLhUZW_qPwBEPJzLlIGAIpyIlJCi2n2wdvCcX3oXz21X5J-HOIjZ3RfQWzLXB_Jb6_L7ot2oFEHkxDbZy69K9tu3KFCFSxeNlIlayUHyxkAz_BFuKps_mGzASLz57x5uBSBXuhUb0Q9cNEC97NU1gNk5yCW4csVuLVt207mWtiHhrpNnD7x0jFUGRzOiSAZJbJMKbGWfqIUJBidx_bZFUs8bhcww-czLnfD_NCr4ztTOK4zM',
    isGroup: true,
    lastMessage: 'Priya: I will bring an extra watercolor palette for anyone who needs!',
    lastTimestamp: '9:15 AM',
    unreadCount: 0,
    statusText: '4 members • Meetup Chat',
    messages: [
      {
        id: 'g1',
        senderId: 'priya',
        senderName: 'Priya (Host)',
        text: 'Welcome everyone! Looking forward to Saturday at Cubbon Park. Weather looks mild and pleasant.',
        timestamp: 'Yesterday',
        isMe: false
      },
      {
        id: 'g2',
        senderId: 'arjun',
        senderName: 'Arjun',
        text: 'Awesome, I will bring some freshly ground estate beans in a thermos!',
        timestamp: '8:45 AM',
        isMe: false
      },
      {
        id: 'g3',
        senderId: 'priya',
        senderName: 'Priya (Host)',
        text: 'I will bring an extra watercolor palette for anyone who needs!',
        timestamp: '9:15 AM',
        isMe: false
      }
    ]
  }
];

export const CURRENT_USER = {
  name: 'Maya Verma',
  age: 26,
  role: 'Product Designer',
  neighborhood: 'Indiranagar, Bengaluru',
  relocatedText: 'Relocated 2 weeks ago from New Delhi',
  avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBARWM5q6gyiZLJSIjA8jEQQws_nJSNxYcteKn5FQJ352XJ3XCrf0SALZm4PU92rEGVW4YS5DiW7fO_O1npwwvQrJw4m687KYbVGXrEvHYQ91fbjq2RQZk4WNL0Hoa2VbpzJ9Cgs3jCWD9Lfk6gZnVY9T2qqukLSRxc0Pn7TEE5HsIKYLuqNOsn4YEsuBbWT8h542J_XzvfdKk1TDvtSOXuyMq4TrBTFiNvCwStBcuiERK7Me0opXA',
  isVerified: true,
  bio: 'Product Designer exploring Bengaluru’s creative corners. Enthusiast of manual filter coffee, modernist brick architecture, botanical garden walks, and quiet Sunday sketch sessions. Looking for zero-pressure, open-hearted friendships.',
  interests: ['Specialty Coffee', 'Architecture', 'Weekend Treks', 'Urban Sketching', 'Indie Books', 'Film Photography'],
  languages: ['English', 'Hindi', 'Spanish'],
  wishlist: [
    'Find the quintessential benne masala dosa in South Bangalore',
    'Morning cycle ride through Cubbon Park tree avenues',
    'Visit the pottery studios in Pottery Town on a Sunday',
    'Attend a weekend design talk at Bangalore International Centre'
  ],
  stats: {
    connections: 18,
    meetupsAttended: 3,
    trustScore: '100% ID Verified'
  }
};
