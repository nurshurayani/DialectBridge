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
      { id: "f3", phrase: "Taki", pronunciation: "Ta-kee", meaningBM: "Datuk", meaningEN: "Grandfather", note: "Also used for elderly men in the village." },
      { id: "f4", phrase: "Todu'", pronunciation: "To-doo", meaningBM: "Nenek", meaningEN: "Grandmother", note: "Also used for elderly women in the village." },
      { id: "f5", phrase: "Tabang", pronunciation: "Ta-bang", meaningBM: "Abang/Kakak", meaningEN: "Elder Sibling", note: "Used for siblings older than you." },
      { id: "f6", phrase: "Tanak", pronunciation: "Ta-nak", meaningBM: "Anak", meaningEN: "Child", note: "Refers to one's offspring or a generic child." },
    ]
  },
  {
    id: "l3",
    title: "Colours & Shapes",
    icon: "Palette",
    phrasesCount: 8,
    progress: 0,
    isCompleted: false,
    category: "Basics",
    phrases: [
      { id: "c1", phrase: "Oitom", pronunciation: "Oy-tom", meaningBM: "Hitam", meaningEN: "Black", note: "Like the night sky." },
      { id: "c2", phrase: "Obulou", pronunciation: "O-boo-loh", meaningBM: "Biru", meaningEN: "Blue", note: "The color of the sea and sky." },
      { id: "c3", phrase: "Aragang", pronunciation: "A-ra-gang", meaningBM: "Merah", meaningEN: "Red", note: "The color of blood and strength." },
      { id: "c4", phrase: "Osilou", pronunciation: "O-see-loh", meaningBM: "Kuning", meaningEN: "Yellow", note: "Bright like the morning sun." },
      { id: "c5", phrase: "Opurak", pronunciation: "O-poo-rak", meaningBM: "Putih", meaningEN: "White", note: "Pure and clean." },
      { id: "c6", phrase: "Otomou", pronunciation: "O-to-moh", meaningBM: "Hijau", meaningEN: "Green", note: "The color of our lush forests." },
      { id: "s1", phrase: "Ourod", pronunciation: "Ow-rod", meaningBM: "Bulatan", meaningEN: "Circle", note: "Perfectly round shape." },
      { id: "s2", phrase: "Miagal", pronunciation: "Mee-a-gal", meaningBM: "Segi Empat", meaningEN: "Square", note: "Literal: 'Equal' (sides)." },
    ]
  },
  {
    id: "l4",
    title: "Cardinal Numbers",
    icon: "Hash",
    phrasesCount: 10,
    progress: 0,
    isCompleted: false,
    category: "Basics",
    phrases: [
      { id: "n1", phrase: "Iso", pronunciation: "Ee-so", meaningBM: "Satu", meaningEN: "One", note: "The first number." },
      { id: "n2", phrase: "Duo", pronunciation: "Doo-oh", meaningBM: "Dua", meaningEN: "Two", note: "Balance." },
      { id: "n3", phrase: "Tolu", pronunciation: "To-loo", meaningBM: "Tiga", meaningEN: "Three", note: "A sacred number in many cultures." },
      { id: "n4", phrase: "Apat", pronunciation: "A-pat", meaningBM: "Empat", meaningEN: "Four", note: "The cardinal directions." },
      { id: "n5", phrase: "Limo", pronunciation: "Lee-mo", meaningBM: "Lima", meaningEN: "Five", note: "Like the fingers on your hand." },
      { id: "n6", phrase: "Onom", pronunciation: "O-nom", meaningBM: "Enam", meaningEN: "Six", note: "The next step." },
      { id: "n7", phrase: "Turu", pronunciation: "Too-roo", meaningBM: "Tujuh", meaningEN: "Seven", note: "Considered lucky by some." },
      { id: "n8", phrase: "Walu", pronunciation: "Wa-loo", meaningBM: "Lapan", meaningEN: "Eight", note: "Infinite loop." },
      { id: "n9", phrase: "Siam", pronunciation: "See-am", meaningBM: "Sembilan", meaningEN: "Nine", note: "Almost there." },
      { id: "n10", phrase: "Hopod", pronunciation: "Ho-pod", meaningBM: "Sepuluh", meaningEN: "Ten", note: "The complete set." },
    ]
  },
  {
    id: "l5",
    title: "The Body",
    icon: "User",
    phrasesCount: 6,
    progress: 0,
    isCompleted: false,
    category: "Basics",
    phrases: [
      { id: "b1", phrase: "Tulu", pronunciation: "Too-loo", meaningBM: "Kepala", meaningEN: "Head", note: "Seat of wisdom." },
      { id: "b2", phrase: "Turos", pronunciation: "Too-ros", meaningBM: "Muka", meaningEN: "Face", note: "The window to the soul." },
      { id: "b3", phrase: "Longon", pronunciation: "Lo-ngon", meaningBM: "Lengan", meaningEN: "Arm", note: "For working the land." },
      { id: "b4", phrase: "Palad", pronunciation: "Pa-lad", meaningBM: "Tapak Tangan", meaningEN: "Palm / Hand", note: "For giving and receiving." },
      { id: "b5", phrase: "Lukap", pronunciation: "Loo-kap", meaningBM: "Kaki", meaningEN: "Foot", note: "To walk the ancestral paths." },
      { id: "b6", phrase: "Tunduundu'", pronunciation: "Toon-doon-doo", meaningBM: "Jantung/Hati", meaningEN: "Heart", note: "The rhythm of life." },
    ]
  },
  {
    id: "l6",
    title: "Sacred Seasons",
    icon: "Calendar",
    phrasesCount: 12,
    progress: 0,
    isCompleted: false,
    category: "Calendar",
    phrases: [
      { id: "m1", phrase: "Milatok", pronunciation: "Mee-la-tok", meaningBM: "Januari", meaningEN: "January", note: "The beginning of the cycle." },
      { id: "m2", phrase: "Mansak", pronunciation: "Man-sak", meaningBM: "Februari", meaningEN: "February", note: "Month of growth." },
      { id: "m3", phrase: "Gomot", pronunciation: "Go-mot", meaningBM: "Mac", meaningEN: "March", note: "Transition season." },
      { id: "m4", phrase: "Ngiop", pronunciation: "Ngee-op", meaningBM: "April", meaningEN: "April", note: "The spirit of the rains." },
      { id: "m5", phrase: "Mikat", pronunciation: "Mee-kat", meaningBM: "Mei", meaningEN: "May", note: "The harvest begins." },
      { id: "m6", phrase: "Mahas", pronunciation: "Ma-has", meaningBM: "Jun", meaningEN: "June", note: "The center of the year." },
      { id: "d1", phrase: "Tontolu'", pronunciation: "Ton-to-loo", meaningBM: "Isnin", meaningEN: "Monday", note: "Moon's day." },
      { id: "d7", phrase: "Tiwang", pronunciation: "Tee-wang", meaningBM: "Ahad", meaningEN: "Sunday", note: "Rest and reflection." },
    ]
  },
  {
    id: "l7",
    title: "Rhythms of the Sun",
    icon: "Clock",
    phrasesCount: 5,
    progress: 0,
    isCompleted: false,
    category: "Time",
    phrases: [
      { id: "t1", phrase: "Kosuabon", pronunciation: "Ko-sua-bon", meaningBM: "Pagi", meaningEN: "Morning", note: "When the sun first greets us." },
      { id: "t2", phrase: "Pitangadaau", pronunciation: "Pee-ta-nga-da-ow", meaningBM: "Tengah Hari", meaningEN: "Noon", note: "The sun at its peak." },
      { id: "t3", phrase: "Sosodopon", pronunciation: "So-so-do-pon", meaningBM: "Petang", meaningEN: "Afternoon", note: "As shadows lengthen." },
      { id: "t4", phrase: "Minsosodop", pronunciation: "Min-so-so-dop", meaningBM: "Senja/Malam", meaningEN: "Evening", note: "Nature winding down." },
      { id: "t5", phrase: "Pitanga sodop", pronunciation: "Pee-ta-nga so-dop", meaningBM: "Tengah Malam", meaningEN: "Midnight", note: "The deepest silence." },
    ]
  },
  {
    id: "l8",
    title: "Pathways of Service",
    icon: "Briefcase",
    phrasesCount: 8,
    progress: 0,
    isCompleted: false,
    category: "Occupations",
    phrases: [
      { id: "o1", phrase: "Mongingia'", pronunciation: "Mo-ngi-ngee-a", meaningBM: "Guru", meaningEN: "Teacher", note: "Giver of knowledge." },
      { id: "o2", phrase: "Dokutul", pronunciation: "Do-koo-tool", meaningBM: "Doktor", meaningEN: "Doctor", note: "Healer of the soul and body." },
      { id: "o3", phrase: "Noos", pronunciation: "No-os", meaningBM: "Jururawat", meaningEN: "Nurse", note: "Protector of the weak." },
      { id: "o4", phrase: "Momuumutanom", pronunciation: "Mo-moo-moo-ta-nom", meaningBM: "Petani", meaningEN: "Farmer", note: "Guardian of the earth." },
      { id: "o5", phrase: "Monginginsada'", pronunciation: "Mo-ngi-ngin-sa-da", meaningBM: "Nelayan", meaningEN: "Fisherman", note: "Harvester of the sea." },
      { id: "o6", phrase: "Dolibor", pronunciation: "Do-lee-bor", meaningBM: "Pemandu", meaningEN: "Driver", note: "One who guides the path." },
      { id: "o7", phrase: "Pailot", pronunciation: "Pie-lot", meaningBM: "Juruterbang", meaningEN: "Pilot", note: "Voyager of the skies." },
      { id: "o8", phrase: "Tukang kayu", pronunciation: "Too-kang ka-yoo", meaningBM: "Tukang Kayu", meaningEN: "Carpenter", note: "Shaper of the wood." },
    ]
  },
];
