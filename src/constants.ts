export const DIALECTS = ["Kadazan", "Dusun", "Bajau", "Murut"];

export interface Phrase {
  id: string;
  phrase: string;
  pronunciation: string;
  meaningBM: string;
  meaningEN: string;
  note: string;
}

export interface Lesson {
  id: string;
  title: string;
  icon: string;
  phrasesCount: number;
  progress: number;
  isCompleted: boolean;
  category: string;
  phrases: Phrase[];
}

export const LESSONS: Lesson[] = [
  {
    id: "l1",
    title: "Greetings",
    icon: "Hand",
    phrasesCount: 8,
    progress: 100,
    isCompleted: true,
    category: "Greetings",
    phrases: [
      { id: "p1", phrase: "Kopiwosion", pronunciation: "Ko-pee-wo-sion", meaningBM: "Selamat pagi/Salam", meaningEN: "Greetings / Good morning", note: "Standard greeting in Kadazan." },
      { id: "p2", phrase: "Onu habar?", pronunciation: "O-nu ha-bar", meaningBM: "Apa khabar?", meaningEN: "How are you?", note: "Used universally across many districts." },
      { id: "p3", phrase: "Abantu", pronunciation: "A-ban-too", meaningBM: "Khabar baik", meaningEN: "I am fine", note: "Polite response to 'Onu habar?'" },
      { id: "p4", phrase: "Kotohuadan", pronunciation: "Ko-to-hua-dan", meaningBM: "Terima kasih", meaningEN: "Thank you", note: "Essential phrase showing gratitude." },
      { id: "p5", phrase: "Poingkuro ko?", pronunciation: "Poing-koo-ro ko", meaningBM: "Bagaimana kamu?", meaningEN: "How's your day?", note: "More casual than Onu habar." },
      { id: "p6", phrase: "Kada kosiou", pronunciation: "Ka-da ko-siou", meaningBM: "Sama-sama", meaningEN: "You are welcome", note: "Literal: 'Don't worry'." },
      { id: "p7", phrase: "Maau oku diti", pronunciation: "Ma-ow o-koo di-tee", meaningBM: "Saya pergi dulu", meaningEN: "I am going now", note: "Polite way to take leave." },
      { id: "p8", phrase: "Kopiruba kagu", pronunciation: "Ko-pee-roo-ba ka-goo", meaningBM: "Jumpa lagi", meaningEN: "See you again", note: "Used when ending a conversation." },
    ]
  },
  {
    id: "l2",
    title: "Family & Kinship",
    icon: "Users",
    phrasesCount: 6,
    progress: 0,
    isCompleted: false,
    category: "Family & Kinship",
    phrases: [
      { id: "f1", phrase: "Tapa", pronunciation: "Ta-pa", meaningBM: "Ayah", meaningEN: "Father", note: "Standard term for father." },
      { id: "f2", phrase: "Tina", pronunciation: "Ti-na", meaningBM: "Ibu", meaningEN: "Mother", note: "Standard term for mother." },
    ]
  },
  { id: "l3", title: "Food & Market", icon: "ShoppingBag", phrasesCount: 10, progress: 0, isCompleted: false, category: "Food & Market", phrases: [] },
  { id: "l4", title: "Nature & Village", icon: "Trees", phrasesCount: 12, progress: 0, isCompleted: false, category: "Nature & Village", phrases: [] },
  { id: "l5", title: "Celebrations", icon: "PartyPopper", phrasesCount: 8, progress: 0, isCompleted: false, category: "Celebrations & Customs", phrases: [] },
  { id: "l6", title: "Numbers & Time", icon: "Clock", phrasesCount: 15, progress: 0, isCompleted: false, category: "Numbers & Time", phrases: [] },
];
