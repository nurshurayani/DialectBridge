export const DIALECTS = ["Kadazan"];

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

export const DICTIONARY: Phrase[] = [
  // Page 6-7: Colours
  { id: "d_c1", phrase: "Oitom", pronunciation: "Oy-tom", meaningBM: "Hitam", meaningEN: "Black", note: "One of the four primary colours." },
  { id: "d_c2", phrase: "Obulou", pronunciation: "O-boo-loh", meaningBM: "Biru", meaningEN: "Blue", note: "The colour of the sea." },
  { id: "d_c3", phrase: "Aragang", pronunciation: "A-ra-gang", meaningBM: "Merah", meaningEN: "Red", note: "The colour of strength." },
  { id: "d_c4", phrase: "Osilou", pronunciation: "O-see-loh", meaningBM: "Kuning", meaningEN: "Yellow", note: "The colour of the sun." },
  { id: "d_c5", phrase: "Opurak", pronunciation: "O-poo-rak", meaningBM: "Putih", meaningEN: "White", note: "Pure and clean." },
  { id: "d_c6", phrase: "Otomou", pronunciation: "O-to-moh", meaningBM: "Hijau", meaningEN: "Green", note: "The colour of forests." },
  { id: "d_c7", phrase: "Obuhog", pronunciation: "O-boo-hog", meaningBM: "Kelabu", meaningEN: "Grey", note: "The colour of rain clouds." },
  { id: "d_c8", phrase: "Orin", pronunciation: "O-rin", meaningBM: "Jingga", meaningEN: "Orange", note: "Vibrant and bright." },
  { id: "d_c9", phrase: "Sokulit", pronunciation: "So-koo-lit", meaningBM: "Perang", meaningEN: "Brown", note: "The colour of the earth." },
  { id: "d_c10", phrase: "Moruun", pronunciation: "Mo-roon", meaningBM: "Merah tua", meaningEN: "Maroon", note: "Dark and deep red." },
  
  // Page 8: Numbers
  { id: "d_n1", phrase: "Iso", pronunciation: "Ee-so", meaningBM: "Satu", meaningEN: "One", note: "First count." },
  { id: "d_n2", phrase: "Duo", pronunciation: "Doo-oh", meaningBM: "Dua", meaningEN: "Two", note: "Pair." },
  { id: "d_n3", phrase: "Tolu", pronunciation: "To-loo", meaningBM: "Tiga", meaningEN: "Three", note: "Triple." },
  { id: "d_n4", phrase: "Apat", pronunciation: "A-pat", meaningBM: "Empat", meaningEN: "Four", note: "Square base." },
  { id: "d_n5", phrase: "Limo", pronunciation: "Lee-mo", meaningBM: "Lima", meaningEN: "Five", note: "Hand count." },
  { id: "d_n6", phrase: "Onom", pronunciation: "O-nom", meaningBM: "Enam", meaningEN: "Six", note: "Next step." },
  { id: "d_n7", phrase: "Turu", pronunciation: "Too-roo", meaningBM: "Tujuh", meaningEN: "Seven", note: "Lucky seven." },
  { id: "d_n8", phrase: "Walu", pronunciation: "Wa-loo", meaningBM: "Lapan", meaningEN: "Eight", note: "Octopus legs." },
  { id: "d_n9", phrase: "Siam", pronunciation: "See-am", meaningBM: "Sembilan", meaningEN: "Nine", note: "Last single digit." },
  { id: "d_n10", phrase: "Hopod", pronunciation: "Ho-pod", meaningBM: "Sepuluh", meaningEN: "Ten", note: "Full set." },
  
  // Page 9: Body
  { id: "d_b1", phrase: "Tulu", pronunciation: "Too-loo", meaningBM: "Kepala", meaningEN: "Head", note: "Top of the body." },
  { id: "d_b2", phrase: "Turos", pronunciation: "Too-ros", meaningBM: "Muka", meaningEN: "Face", note: "Look at me." },
  { id: "d_b3", phrase: "Longon", pronunciation: "Lo-ngon", meaningBM: "Lengan", meaningEN: "Arm", note: "Upper limb." },
  { id: "d_b4", phrase: "Palad", pronunciation: "Pa-lad", meaningBM: "Tapak Tangan", meaningEN: "Palm / Hand", note: "Hold something." },
  { id: "d_b5", phrase: "Lukap", pronunciation: "Loo-kap", meaningBM: "Kaki", meaningEN: "Foot", note: "Walk on earth." },
  { id: "d_b6", phrase: "Tunduundu'", pronunciation: "Toon-doon-doo", meaningBM: "Jantung/Hati", meaningEN: "Heart", note: "Beat of life." },
  { id: "d_b7", phrase: "Mato", pronunciation: "Ma-to", meaningBM: "Mata", meaningEN: "Eye", note: "To see clearly." },
  { id: "d_b8", phrase: "Tolingo", pronunciation: "To-lee-ngo", meaningBM: "Telinga", meaningEN: "Ear", note: "To hear the forest." },
  { id: "d_b9", phrase: "Todung", pronunciation: "To-doong", meaningBM: "Hidung", meaningEN: "Nose", note: "To smell incense." },
  { id: "d_b10", phrase: "Kabang", pronunciation: "Ka-bang", meaningBM: "Mulut", meaningEN: "Mouth", note: "To speak truth." },
  { id: "d_b11", phrase: "Nipon", pronunciation: "Nee-pon", meaningBM: "Gigi", meaningEN: "Teeth", note: "To chew food." },
  { id: "d_b12", phrase: "Dila", pronunciation: "Dee-la", meaningBM: "Lidah", meaningEN: "Tongue", note: "To taste seasons." },
  
  // Page 17: House
  { id: "d_h1", phrase: "Totobon", pronunciation: "To-to-bon", meaningBM: "Pintu", meaningEN: "Door", note: "Entry to the home." },
  { id: "d_h2", phrase: "Tinongusan", pronunciation: "Tee-no-ngoo-san", meaningBM: "Bumbung", meaningEN: "Roof", note: "Shelter above us." },
  { id: "d_h3", phrase: "Titigaon", pronunciation: "Tee-tee-ga-on", meaningBM: "Tingkap", meaningEN: "Window", note: "Light into the room." },
];

export const LESSONS: Lesson[] = [
  {
    id: "l1",
    title: "Greetings",
    icon: "Hand",
    phrasesCount: 12,
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
      { id: "p9", phrase: "Isai ngaran nu?", pronunciation: "Ee-sai nga-ran noo", meaningBM: "Siapa nama kamu?", meaningEN: "What is your name?", note: "Basic acquaintance question." },
      { id: "p10", phrase: "Ngaran ku nopo diti...", pronunciation: "Nga-ran koo no-po dee-tee", meaningBM: "Nama saya ialah...", meaningEN: "My name is...", note: "Introducing yourself." },
      { id: "p11", phrase: "Miagal nopo", pronunciation: "Mee-a-gal no-po", meaningBM: "Sama-sama", meaningEN: "You are welcome", note: "A versatile polite response." },
      { id: "p12", phrase: "Siou diti", pronunciation: "See-oh dee-tee", meaningBM: "Maaf / tumpang tanya", meaningEN: "Excuse me / I'm sorry", note: "Polite apology or getting attention." },
    ]
  },
  {
    id: "l2",
    title: "Family & Kinship",
    icon: "Users",
    phrasesCount: 12,
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
      { id: "f7", phrase: "Adi", pronunciation: "A-dee", meaningBM: "Adik", meaningEN: "Younger sibling", note: "General term for younger brother or sister." },
      { id: "f8", phrase: "Mama'", pronunciation: "Ma-ma", meaningBM: "Bapa saudara", meaningEN: "Uncle", note: "Mother's or father's brother." },
      { id: "f9", phrase: "Inan", pronunciation: "Ee-nan", meaningBM: "Emak saudara", meaningEN: "Aunt", note: "Mother's or father's sister." },
      { id: "f10", phrase: "Pinsan", pronunciation: "Pin-san", meaningBM: "Sepupu", meaningEN: "Cousin", note: "Relative from uncle or aunt." },
      { id: "f11", phrase: "Mohoing", pronunciation: "Mo-hoyng", meaningBM: "Ibu bapa / orang tua", meaningEN: "Parents / Elders", note: "Plural or singular reference to elders." },
      { id: "f12", phrase: "Pion", pronunciation: "Pee-on", meaningBM: "Menantu/Mertua", meaningEN: "In-law", note: "Relative through marriage." },
    ]
  },
  {
    id: "l3",
    title: "Colours & Shapes",
    icon: "Palette",
    phrasesCount: 12,
    progress: 0,
    isCompleted: false,
    category: "Basics",
    phrases: [
      { id: "c1", phrase: "Oitom", pronunciation: "Oy-tom", meaningBM: "Hitam", meaningEN: "Black", note: "Like the night sky." },
      { id: "c2", phrase: "Obulou", pronunciation: "O-boo-loh", meaningBM: "Biru", meaningEN: "Blue", note: "The colour of the sea and sky." },
      { id: "c3", phrase: "Aragang", pronunciation: "A-ra-gang", meaningBM: "Merah", meaningEN: "Red", note: "The colour of blood and strength." },
      { id: "c4", phrase: "Osilou", pronunciation: "O-see-loh", meaningBM: "Kuning", meaningEN: "Yellow", note: "Bright like the morning sun." },
      { id: "c5", phrase: "Opurak", pronunciation: "O-poo-rak", meaningBM: "Putih", meaningEN: "White", note: "Pure and clean." },
      { id: "c6", phrase: "Otomou", pronunciation: "O-to-moh", meaningBM: "Hijau", meaningEN: "Green", note: "The colour of our lush forests." },
      { id: "c7", phrase: "Obuuboulou", pronunciation: "O-boo-oo-bo-loh", meaningBM: "Biru muda", meaningEN: "Light Blue", note: "Like the clear morning sky." },
      { id: "c8", phrase: "Ososohug", pronunciation: "O-so-so-hoog", meaningBM: "Ungu", meaningEN: "Purple", note: "The colour of royalty and grapes." },
      { id: "c9", phrase: "Osohung", pronunciation: "O-so-hoong", meaningBM: "Nila", meaningEN: "Indigo", note: "Deep blue-purple." },
      { id: "s1", phrase: "Ourod", pronunciation: "Ow-rod", meaningBM: "Bulatan", meaningEN: "Circle", note: "Perfectly round shape." },
      { id: "s2", phrase: "Miagal", pronunciation: "Mee-a-gal", meaningBM: "Segi Empat", meaningEN: "Square", note: "Literal: 'Equal' (sides)." },
      { id: "s3", phrase: "Tolu pasagi'", pronunciation: "To-loo pa-sa-gee", meaningBM: "Segi tiga", meaningEN: "Triangle", note: "Shape with three sides." },
    ]
  },
  {
    id: "l4",
    title: "Cardinal Numbers",
    icon: "Hash",
    phrasesCount: 12,
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
      { id: "n11", phrase: "Hopod om iso", pronunciation: "Ho-pod om ee-so", meaningBM: "Sebelas", meaningEN: "Eleven", note: "Ten and one." },
      { id: "n12", phrase: "Hopod om duo", pronunciation: "Ho-pod om doo-oh", meaningBM: "Dua belas", meaningEN: "Twelve", note: "Ten and two." },
    ]
  },
  {
    id: "l5",
    title: "The Body",
    icon: "User",
    phrasesCount: 12,
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
      { id: "b7", phrase: "Mata", pronunciation: "Ma-ta", meaningBM: "Mata", meaningEN: "Eye", note: "For seeing the beauty of Sabah." },
      { id: "b8", phrase: "Tolingo", pronunciation: "To-lee-ngo", meaningBM: "Telinga", meaningEN: "Ear", note: "For listening to ancestral stories." },
      { id: "b9", phrase: "Todung", pronunciation: "To-doong", meaningBM: "Hidung", meaningEN: "Nose", note: "For smelling the mountain mist." },
      { id: "b10", phrase: "Kabang", pronunciation: "Ka-bang", meaningBM: "Mulut", meaningEN: "Mouth", note: "For speaking our mother tongue." },
      { id: "b11", phrase: "Nipon", pronunciation: "Nee-pon", meaningBM: "Gigi", meaningEN: "Teeth", note: "A strong smile." },
      { id: "b12", phrase: "Dila", pronunciation: "Dee-la", meaningBM: "Lidah", meaningEN: "Tongue", note: "Our instrument of speech." },
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
      { id: "m7", phrase: "Madas", pronunciation: "Ma-das", meaningBM: "Julai", meaningEN: "July", note: "The height of summer." },
      { id: "m8", phrase: "Magus", pronunciation: "Ma-goos", meaningBM: "Ogos", meaningEN: "August", note: "Month of celebration." },
      { id: "m9", phrase: "Manom", pronunciation: "Ma-nom", meaningBM: "September", meaningEN: "September", note: "Transition to autumn." },
      { id: "m10", phrase: "Gumas", pronunciation: "Goo-mas", meaningBM: "Oktober", meaningEN: "October", note: "Harvest spirit lingers." },
      { id: "d1", phrase: "Tontolu'", pronunciation: "Ton-to-loo", meaningBM: "Isnin", meaningEN: "Monday", note: "Moon's day." },
      { id: "d7", phrase: "Tiwang", pronunciation: "Tee-wang", meaningBM: "Ahad", meaningEN: "Sunday", note: "Rest and reflection." },
    ]
  },
  {
    id: "l7",
    title: "Rhythms of the Sun",
    icon: "Clock",
    phrasesCount: 12,
    progress: 0,
    isCompleted: false,
    category: "Time",
    phrases: [
      { id: "t1", phrase: "Kosuabon", pronunciation: "Ko-sua-bon", meaningBM: "Pagi", meaningEN: "Morning", note: "When the sun first greets us." },
      { id: "t2", phrase: "Pitangadaau", pronunciation: "Pee-ta-nga-da-ow", meaningBM: "Tengah Hari", meaningEN: "Noon", note: "The sun at its peak." },
      { id: "t3", phrase: "Sosodopon", pronunciation: "So-so-do-pon", meaningBM: "Petang", meaningEN: "Afternoon", note: "As shadows lengthen." },
      { id: "t4", phrase: "Minsosodop", pronunciation: "Min-so-so-dop", meaningBM: "Senja/Malam", meaningEN: "Evening", note: "Nature winding down." },
      { id: "t5", phrase: "Pitanga sodop", pronunciation: "Pee-ta-nga so-dop", meaningBM: "Tengah Malam", meaningEN: "Midnight", note: "The deepest silence." },
      { id: "t6", phrase: "Tadau", pronunciation: "Ta-dow", meaningBM: "Hari", meaningEN: "Day", note: "The light of the sun." },
      { id: "t7", phrase: "Wulan", pronunciation: "Woo-lan", meaningBM: "Bulan", meaningEN: "Month / Moon", note: "The silver light of night." },
      { id: "t8", phrase: "Toun", pronunciation: "Tohn", meaningBM: "Tahun", meaningEN: "Year", note: "The full cycle of seasons." },
      { id: "t9", phrase: "Id dondo", pronunciation: "Id don-do", meaningBM: "Sekarang", meaningEN: "Now", note: "In the present moment." },
      { id: "t10", phrase: "Suab", pronunciation: "Sua-ab", meaningBM: "Esok", meaningEN: "Tomorrow", note: "Planning for the future." },
      { id: "t11", phrase: "Dahau", pronunciation: "Da-how", meaningBM: "Semalam", meaningEN: "Yesterday", note: "Honoring the past." },
      { id: "t12", phrase: "Timpu", pronunciation: "Teem-poo", meaningBM: "Waktu", meaningEN: "Time", note: "The flow of existence." },
    ]
  },
  {
    id: "l8",
    title: "Pathways of Service",
    icon: "Briefcase",
    phrasesCount: 12,
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
      { id: "o9", phrase: "Pulisi", pronunciation: "Poo-lee-see", meaningBM: "Polis", meaningEN: "Policeman", note: "Protector of the peace." },
      { id: "o10", phrase: "Askar", pronunciation: "As-kar", meaningBM: "Askar", meaningEN: "Soldier", note: "Guardian of the land." },
      { id: "o11", phrase: "Jurukamera", pronunciation: "Joo-roo-ka-me-ra", meaningBM: "Jurukamera", meaningEN: "Cameraman", note: "Capturer of moments." },
      { id: "o12", phrase: "Mekanik", pronunciation: "Me-ka-neek", meaningBM: "Mekanik", meaningEN: "Mechanic", note: "Fixer of engines." },
    ]
  },
];
