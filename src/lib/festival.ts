export const festival = {
  name: "QFest",
  year: "2026",
  title: "Pieces of Us",
  presenter: "Quramo Festival of Words",
  tagline: "Celebrating ten years of African storytelling.",
  mission: "A Lagos literary festival that champions new voices, prize manuscripts, and the stories we still need to tell.",
  dates: "1–3 October 2026",
  datesShort: "OCTOBER 1–3",
  datesLong: "1st – 3rd October 2026",
  city: "Lagos",
  venue: "Eko Hotels & Suites, Victoria Island",
  email: "info@quramo.com",
  web: "https://www.quramo.com",
  instagram: "https://www.instagram.com/quramoofficial",
  x: "https://x.com/quramoofficial",
  handle: "@quramoofficial",
  /** Festival opens 1 Oct 2026, 09:00 WAT (UTC+1) */
  opensAt: "2026-10-01T08:00:00.000Z",
} as const;

export const nav = [
  { href: "/about", label: "About" },
  { href: "/programme", label: "Programme" },
  { href: "/editions", label: "Past editions" },
  { href: "/register", label: "Register" },
] as const;

export const footerNav = {
  main: [
    { href: "/register", label: "Register" },
    { href: "/programme", label: "Programme" },
  ],
  company: [
    { href: "/about", label: "About" },
    { href: "/info", label: "Festival info" },
    { href: "/experiences", label: "Experience rooms" },
    { href: "/editions", label: "Past editions" },
  ],
} as const;

export const stats = [
  { value: "3", label: "Days" },
  { value: "3", label: "Rooms" },
  { value: "10", label: "Years" },
] as const;

export type Session = {
  id: string;
  day: "Thu 1 Oct" | "Fri 2 Oct" | "Sat 3 Oct";
  dayLabel: string;
  dateLabel: string;
  time: string;
  timeDisplay: string;
  kind: string;
  title: string;
  room: string;
  note: string;
};

export const sessions: Session[] = [
  {
    id: "opening",
    day: "Thu 1 Oct",
    dayLabel: "Thursday",
    dateLabel: "OCTOBER 01",
    time: "10:00",
    timeDisplay: "10AM",
    kind: "Opening",
    title: "Opening gathering: Pieces of Us",
    room: "Main Hall",
    note: "Ten years of QFest, told in one room.",
  },
  {
    id: "hub-craft",
    day: "Thu 1 Oct",
    dayLabel: "Thursday",
    dateLabel: "OCTOBER 01",
    time: "11:30",
    timeDisplay: "11:30AM",
    kind: "Masterclass",
    title: "Masterclass studio: page and picture",
    room: "Quramo Hub",
    note: "Craft sessions for writers and filmmakers.",
  },
  {
    id: "prize-five",
    day: "Thu 1 Oct",
    dayLabel: "Thursday",
    dateLabel: "OCTOBER 01",
    time: "16:00",
    timeDisplay: "4PM",
    kind: "Writers’ Prize",
    title: "Quramo Writers’ Prize: the shortlist",
    room: "Word Room",
    note: "New manuscripts, read in public for the first time.",
  },
  {
    id: "prize-night",
    day: "Thu 1 Oct",
    dayLabel: "Thursday",
    dateLabel: "OCTOBER 01",
    time: "19:30",
    timeDisplay: "7:30PM",
    kind: "Prize Night",
    title: "Prize Night",
    room: "Night Stage",
    note: "The 2026 winner, and the story that follows.",
  },
  {
    id: "exchange",
    day: "Fri 2 Oct",
    dayLabel: "Friday",
    dateLabel: "OCTOBER 02",
    time: "11:00",
    timeDisplay: "11AM",
    kind: "Conversation",
    title: "Writers’ exchange",
    room: "Word Room",
    note: "Poets and novelists in close conversation.",
  },
  {
    id: "histories",
    day: "Fri 2 Oct",
    dayLabel: "Friday",
    dateLabel: "OCTOBER 02",
    time: "14:00",
    timeDisplay: "2PM",
    kind: "Conversation",
    title: "Timeless impact: histories we still carry",
    room: "Main Hall",
    note: "Memory, nation, and the work of telling it true.",
  },
  {
    id: "film-afternoon",
    day: "Fri 2 Oct",
    dayLabel: "Friday",
    dateLabel: "OCTOBER 02",
    time: "16:30",
    timeDisplay: "4:30PM",
    kind: "Screen",
    title: "Screen stories",
    room: "Night Stage",
    note: "African film in the festival light.",
  },
  {
    id: "close-up",
    day: "Fri 2 Oct",
    dayLabel: "Friday",
    dateLabel: "OCTOBER 02",
    time: "19:00",
    timeDisplay: "7PM",
    kind: "Up Close",
    title: "Up close and personal",
    room: "Main Hall",
    note: "QFest’s signature long conversation.",
  },
  {
    id: "open-mic",
    day: "Sat 3 Oct",
    dayLabel: "Saturday",
    dateLabel: "OCTOBER 03",
    time: "11:00",
    timeDisplay: "11AM",
    kind: "Live",
    title: "Open page, open mic",
    room: "Night Stage",
    note: "Spoken word, new work, live nerve.",
  },
  {
    id: "book-chats",
    day: "Sat 3 Oct",
    dayLabel: "Saturday",
    dateLabel: "OCTOBER 03",
    time: "13:30",
    timeDisplay: "1:30PM",
    kind: "Book chat",
    title: "Book chats: new stories",
    room: "Word Room",
    note: "Authors, readers, and the books between them.",
  },
  {
    id: "closing",
    day: "Sat 3 Oct",
    dayLabel: "Saturday",
    dateLabel: "OCTOBER 03",
    time: "17:00",
    timeDisplay: "5PM",
    kind: "Closing",
    title: "Closing circle",
    room: "Main Hall",
    note: "What we take with us from ten years of QFest.",
  },
];

export const days = ["Thu 1 Oct", "Fri 2 Oct", "Sat 3 Oct"] as const;

export const passes = [
  {
    id: "festival",
    name: "Full festival",
    detail: "All three days, all rooms, Prize Night included. Free.",
  },
  {
    id: "day",
    name: "Single day",
    detail: "One full day in the Word Room, Hub, and Night Stage. Free.",
  },
  {
    id: "studio",
    name: "Hub studio",
    detail: "Add a masterclass seat at the Quramo Hub. Free — limited seats.",
  },
] as const;

export const editions = [
  {
    year: "2025",
    theme: "A Brave New World",
    note: "Ninth edition at Eko Hotels & Suites, Victoria Island.",
  },
  {
    year: "2017",
    theme: "The first gathering",
    note: "QFest begins in Lagos: books, film, theatre, and open mic.",
  },
] as const;

export const rooms = [
  {
    name: "Quramo Hub",
    copy: "Masterclasses in writing and film. Smaller rooms, sharper tools.",
    position: "14% 76%",
  },
  {
    name: "Word Room",
    copy: "Prize conversations, book chats, and the histories we still argue.",
    position: "22% 40%",
  },
  {
    name: "Night Stage",
    copy: "Screenings, spoken word, and Prize Night under the festival lights.",
    position: "80% 36%",
  },
] as const;

export const keynotes = [
  {
    id: "opening",
    name: "To be announced",
    role: "Opening keynote",
    focus: "Pieces of Us",
    initials: "01",
  },
  {
    id: "prize",
    name: "To be announced",
    role: "Writers’ Prize conversation",
    focus: "New manuscripts",
    initials: "02",
  },
  {
    id: "screen",
    name: "To be announced",
    role: "Screen stories",
    focus: "Page to picture",
    initials: "03",
  },
  {
    id: "night",
    name: "To be announced",
    role: "Night Stage",
    focus: "Spoken word & stage",
    initials: "04",
  },
] as const;

/** Drop logo files in /public/partners and set `logo` paths here. */
export const partners = [
  {
    name: "Quramo",
    logo: "/brand/Qfest-logo.png",
    href: "https://www.quramo.com",
  },
] as const;

export const sponsors = [
  { name: "Media partner" },
  { name: "Hospitality partner" },
  { name: "Broadcast partner" },
  { name: "Community partner" },
  { name: "Education partner" },
  { name: "Travel partner" },
  { name: "Printing partner" },
  { name: "Digital partner" },
] as const;
