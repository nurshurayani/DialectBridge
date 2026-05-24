export const DIALECTS = ["Kadazan"];

export interface Phrase {
  id: string;
  phrase: string;
  pronunciation: string;
  meaningBM: string;
  meaningEN: string;
  note: string;
  category?: string;
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
  // Greetings (15 phrases)
  { id: "g1", phrase: "Kopiwosion", pronunciation: "Ko-pee-wo-sion", meaningBM: "Selamat pagi", meaningEN: "Good morning", note: "Standard greeting.", category: "Greetings" },
  { id: "g2", phrase: "Kopiombus", pronunciation: "Ko-pee-om-bus", meaningBM: "Selamat tengahari", meaningEN: "Good afternoon", note: "Midday greeting.", category: "Greetings" },
  { id: "g3", phrase: "Kopuusan", pronunciation: "Ko-poo-san", meaningBM: "Selamat tinggal", meaningEN: "Goodbye", note: "Parting phrase.", category: "Greetings" },
  { id: "g4", phrase: "Misuul", pronunciation: "Mi-sool", meaningBM: "Terima kasih", meaningEN: "Thank you", note: "Showing gratitude.", category: "Greetings" },
  { id: "g5", phrase: "Nung nunu do ngaran nu?", pronunciation: "Noong noo-noo do nga-ran noo", meaningBM: "Siapa nama kamu?", meaningEN: "What is your name?", note: "Asking for name.", category: "Greetings" },
  { id: "g6", phrase: "Okito", pronunciation: "O-ki-to", meaningBM: "Ya", meaningEN: "Yes", note: "Affirmation.", category: "Greetings" },
  { id: "g7", phrase: "Anda", pronunciation: "An-da", meaningBM: "Tidak", meaningEN: "No", note: "Negation.", category: "Greetings" },
  { id: "g8", phrase: "Gisom", pronunciation: "Gi-som", meaningBM: "Maaf", meaningEN: "Sorry", note: "Apology.", category: "Greetings" },
  { id: "g9", phrase: "Onu habar?", pronunciation: "O-nu ha-bar", meaningBM: "Apa khabar?", meaningEN: "How are you?", note: "Common inquiry.", category: "Greetings" },
  { id: "g10", phrase: "Kotohuadan", pronunciation: "Ko-to-hua-dan", meaningBM: "Terima kasih banyak", meaningEN: "Thank you very much", note: "Deep gratitude.", category: "Greetings" },
  { id: "g11", phrase: "Abantu", pronunciation: "A-ban-too", meaningBM: "Khabar baik", meaningEN: "I am fine", note: "Polite response.", category: "Greetings" },
  { id: "g12", phrase: "Siou diti", pronunciation: "See-oh dee-tee", meaningBM: "Maaf/Tumpang tanya", meaningEN: "Excuse me / I'm sorry", note: "Polite apology.", category: "Greetings" },
  { id: "g13", phrase: "Kada kosiou", pronunciation: "Ka-da ko-see-oh", meaningBM: "Sama-sama", meaningEN: "You are welcome", note: "Response showing friendship.", category: "Greetings" },
  { id: "g14", phrase: "Kopiruba kagu", pronunciation: "Ko-pee-roo-ba ka-goo", meaningBM: "Jumpa lagi", meaningEN: "See you again", note: "Until next time.", category: "Greetings" },
  { id: "g15", phrase: "Koikot no", pronunciation: "Koy-kot no", meaningBM: "Selamat datang", meaningEN: "Welcome", note: "Friendly welcome.", category: "Greetings" },

  // Family (15 phrases)
  { id: "f1", phrase: "Tapa", pronunciation: "Ta-pa", meaningBM: "Ayah", meaningEN: "Father", note: "Standard term for father.", category: "Family" },
  { id: "f2", phrase: "Tina", pronunciation: "Ti-na", meaningBM: "Ibu", meaningEN: "Mother", note: "Standard term for mother.", category: "Family" },
  { id: "f3", phrase: "Taki", pronunciation: "Ta-kee", meaningBM: "Datuk", meaningEN: "Grandfather", note: "Elder male.", category: "Family" },
  { id: "f4", phrase: "Todu'", pronunciation: "To-doo", meaningBM: "Nenek", meaningEN: "Grandmother", note: "Elder female.", category: "Family" },
  { id: "f5", phrase: "Tabang", pronunciation: "Ta-bang", meaningBM: "Abang/Kakak", meaningEN: "Elder Sibling", note: "Older sibling.", category: "Family" },
  { id: "f6", phrase: "Tanak", pronunciation: "Ta-nak", meaningBM: "Anak", meaningEN: "Child", note: "Offspring.", category: "Family" },
  { id: "f7", phrase: "Adi", pronunciation: "A-dee", meaningBM: "Adik", meaningEN: "Younger sibling", note: "Younger sibling.", category: "Family" },
  { id: "f8", phrase: "Mama'", pronunciation: "Ma-ma", meaningBM: "Bapa saudara", meaningEN: "Uncle", note: "Uncle.", category: "Family" },
  { id: "f9", phrase: "Inan", pronunciation: "Ee-nan", meaningBM: "Emak saudara", meaningEN: "Aunt", note: "Aunt.", category: "Family" },
  { id: "f10", phrase: "Pinsan", pronunciation: "Pin-san", meaningBM: "Sepupu", meaningEN: "Cousin", note: "Cousin.", category: "Family" },
  { id: "f11", phrase: "Mohoing", pronunciation: "Mo-hoyng", meaningBM: "Ibu bapa", meaningEN: "Parents", note: "Elders.", category: "Family" },
  { id: "f12", phrase: "Pion", pronunciation: "Pee-on", meaningBM: "Menantu/Mertua", meaningEN: "In-law", note: "Relative through marriage.", category: "Family" },
  { id: "f13", phrase: "Sanganu", pronunciation: "Sa-nga-noo", meaningBM: "Keluarga", meaningEN: "Family", note: "The kinship group.", category: "Family" },
  { id: "f14", phrase: "Tanak kusai", pronunciation: "Ta-nak koo-sigh", meaningBM: "Anak lelaki", meaningEN: "Son", note: "Male child.", category: "Family" },
  { id: "f15", phrase: "Tanak tondu", pronunciation: "Ta-nak ton-doo", meaningBM: "Anak perempuan", meaningEN: "Daughter", note: "Female child.", category: "Family" },

  // Colours (15 phrases)
  { id: "c1", phrase: "Oitom", pronunciation: "Oy-tom", meaningBM: "Hitam", meaningEN: "Black", note: "Like the night sky.", category: "Colours" },
  { id: "c2", phrase: "Obulou", pronunciation: "O-boo-loh", meaningBM: "Biru", meaningEN: "Blue", note: "The color of the sea.", category: "Colours" },
  { id: "c3", phrase: "Aragang", pronunciation: "A-ra-gang", meaningBM: "Merah", meaningEN: "Red", note: "The color of strength.", category: "Colours" },
  { id: "c4", phrase: "Osilou", pronunciation: "O-see-loh", meaningBM: "Kuning", meaningEN: "Yellow", note: "Bright like the sun.", category: "Colours" },
  { id: "c5", phrase: "Opurak", pronunciation: "O-poo-rak", meaningBM: "Putih", meaningEN: "White", note: "Pure and clean.", category: "Colours" },
  { id: "c6", phrase: "Otomou", pronunciation: "O-to-moh", meaningBM: "Hijau", meaningEN: "Green", note: "The green forest.", category: "Colours" },
  { id: "c7", phrase: "Obuuboulou", pronunciation: "O-boo-oo-bo-loh", meaningBM: "Biru muda", meaningEN: "Light Blue", note: "Like the morning sky.", category: "Colours" },
  { id: "c8", phrase: "Ososohug", pronunciation: "O-so-so-hoog", meaningBM: "Ungu", meaningEN: "Purple", note: "Plum purple.", category: "Colours" },
  { id: "c9", phrase: "Osohung", pronunciation: "O-so-hoong", meaningBM: "Nila", meaningEN: "Indigo", note: "Deep blue-purple.", category: "Colours" },
  { id: "c10", phrase: "Obuhog", pronunciation: "O-boo-hog", meaningBM: "Kelabu", meaningEN: "Grey", note: "Cloudy gray.", category: "Colours" },
  { id: "c11", phrase: "Orin", pronunciation: "O-rin", meaningBM: "Jingga", meaningEN: "Orange", note: "Vibrant orange.", category: "Colours" },
  { id: "c12", phrase: "Sokulit", pronunciation: "So-koo-lit", meaningBM: "Perang", meaningEN: "Brown", note: "Earth tone.", category: "Colours" },
  { id: "c13", phrase: "Otomou otuong", pronunciation: "O-to-moh o-too-ong", meaningBM: "Hijau tua", meaningEN: "Dark green", note: "Deep forest green.", category: "Colours" },
  { id: "c14", phrase: "Obuhog aragang", pronunciation: "O-boo-hog a-ra-gang", meaningBM: "Merah jambu", meaningEN: "Pink", note: "Light rose.", category: "Colours" },
  { id: "c15", phrase: "Osilou otomou", pronunciation: "O-see-loh o-to-moh", meaningBM: "Hijau muda", meaningEN: "Light Green", note: "Forest green shoot.", category: "Colours" },

  // Numbers (15 phrases)
  { id: "n1", phrase: "Iso", pronunciation: "Ee-so", meaningBM: "Satu", meaningEN: "One", note: "Number one.", category: "Numbers" },
  { id: "n2", phrase: "Duo", pronunciation: "Doo-oh", meaningBM: "Dua", meaningEN: "Two", note: "Number two.", category: "Numbers" },
  { id: "n3", phrase: "Tolu", pronunciation: "To-loo", meaningBM: "Tiga", meaningEN: "Three", note: "Number three.", category: "Numbers" },
  { id: "n4", phrase: "Apat", pronunciation: "A-pat", meaningBM: "Empat", meaningEN: "Four", note: "Number four.", category: "Numbers" },
  { id: "n5", phrase: "Limo", pronunciation: "Lee-mo", meaningBM: "Lima", meaningEN: "Five", note: "Number five.", category: "Numbers" },
  { id: "n6", phrase: "Onom", pronunciation: "O-nom", meaningBM: "Enam", meaningEN: "Six", note: "Number six.", category: "Numbers" },
  { id: "n7", phrase: "Turu", pronunciation: "Too-roo", meaningBM: "Tujuh", meaningEN: "Seven", note: "Number seven.", category: "Numbers" },
  { id: "n8", phrase: "Walu", pronunciation: "Wa-loo", meaningBM: "Lapan", meaningEN: "Eight", note: "Number eight.", category: "Numbers" },
  { id: "n9", phrase: "Siam", pronunciation: "See-am", meaningBM: "Sembilan", meaningEN: "Nine", note: "Number nine.", category: "Numbers" },
  { id: "n10", phrase: "Hopod", pronunciation: "Ho-pod", meaningBM: "Sepuluh", meaningEN: "Ten", note: "Number ten.", category: "Numbers" },
  { id: "n11", phrase: "Hopod om iso", pronunciation: "Ho-pod om ee-so", meaningBM: "Sebelas", meaningEN: "Eleven", note: "Ten and one.", category: "Numbers" },
  { id: "n12", phrase: "Hopod om duo", pronunciation: "Ho-pod om doo-oh", meaningBM: "Dua belas", meaningEN: "Twelve", note: "Ten and two.", category: "Numbers" },
  { id: "n13", phrase: "Duo no hopod", pronunciation: "Doo-oh no ho-pod", meaningBM: "Dua puluh", meaningEN: "Twenty", note: "Two tens.", category: "Numbers" },
  { id: "n14", phrase: "Tolu no hopod", pronunciation: "To-loo no ho-pod", meaningBM: "Tiga puluh", meaningEN: "Thirty", note: "Three tens.", category: "Numbers" },
  { id: "n15", phrase: "Hatus", pronunciation: "Ha-toos", meaningBM: "Seratus", meaningEN: "One hundred", note: "Hundred count.", category: "Numbers" },

  // Body Parts (15 phrases)
  { id: "b1", phrase: "Tulu", pronunciation: "Too-loo", meaningBM: "Kepala", meaningEN: "Head", note: "Top of the body.", category: "Body Parts" },
  { id: "b2", phrase: "Turos", pronunciation: "Too-ros", meaningBM: "Muka", meaningEN: "Face", note: "Look at me.", category: "Body Parts" },
  { id: "b3", phrase: "Longon", pronunciation: "Lo-ngon", meaningBM: "Lengan", meaningEN: "Arm", note: "Upper limb.", category: "Body Parts" },
  { id: "b4", phrase: "Palad", pronunciation: "Pa-lad", meaningBM: "Tapak Tangan", meaningEN: "Palm / Hand", note: "Hold something.", category: "Body Parts" },
  { id: "b5", phrase: "Lukap", pronunciation: "Loo-kap", meaningBM: "Kaki", meaningEN: "Foot", note: "Walk on earth.", category: "Body Parts" },
  { id: "b6", phrase: "Tunduundu'", pronunciation: "Toon-doon-doo", meaningBM: "Jantung/Hati", meaningEN: "Heart", note: "Beat of life.", category: "Body Parts" },
  { id: "b7", phrase: "Mato", pronunciation: "Ma-to", meaningBM: "Mata", meaningEN: "Eye", note: "To see clearly.", category: "Body Parts" },
  { id: "b8", phrase: "Tolingo", pronunciation: "To-lee-ngo", meaningBM: "Telinga", meaningEN: "Ear", note: "To hear the forest.", category: "Body Parts" },
  { id: "b9", phrase: "Todung", pronunciation: "To-doong", meaningBM: "Hidung", meaningEN: "Nose", note: "To smell fragrance.", category: "Body Parts" },
  { id: "b10", phrase: "Kabang", pronunciation: "Ka-bang", meaningBM: "Mulut", meaningEN: "Mouth", note: "To speak truth.", category: "Body Parts" },
  { id: "b11", phrase: "Nipon", pronunciation: "Nee-pon", meaningBM: "Gigi", meaningEN: "Teeth", note: "To chew food.", category: "Body Parts" },
  { id: "b12", phrase: "Dila", pronunciation: "Dee-la", meaningBM: "Lidah", meaningEN: "Tongue", note: "To taste food.", category: "Body Parts" },
  { id: "b13", phrase: "Obat", pronunciation: "O-bat", meaningBM: "Rambut", meaningEN: "Hair", note: "Hair on head.", category: "Body Parts" },
  { id: "b14", phrase: "Hakat", pronunciation: "Ha-kat", meaningBM: "Leher", meaningEN: "Neck", note: "Supports the head.", category: "Body Parts" },
  { id: "b15", phrase: "Riku", pronunciation: "Ree-koo", meaningBM: "Belakang", meaningEN: "Back", note: "Back of body.", category: "Body Parts" },

  // Food (15 phrases)
  { id: "fod1", phrase: "Wasi", pronunciation: "Wa-see", meaningBM: "Nasi", meaningEN: "Rice", note: "Staple food.", category: "Food" },
  { id: "fod2", phrase: "Sada", pronunciation: "Sa-da", meaningBM: "Ikan", meaningEN: "Fish", note: "Common seafood.", category: "Food" },
  { id: "fod3", phrase: "Rinokaan", pronunciation: "Ree-no-ka-an", meaningBM: "Sayur", meaningEN: "Vegetable", note: "Green nutrition.", category: "Food" },
  { id: "fod4", phrase: "Tanak wagas", pronunciation: "Ta-nak wa-gas", meaningBM: "Beras", meaningEN: "Uncooked Rice", note: "Dry rice grains.", category: "Food" },
  { id: "fod5", phrase: "Kakanan", pronunciation: "Ka-ka-nan", meaningBM: "Makanan", meaningEN: "Food", note: "General expression for food.", category: "Food" },
  { id: "fod6", phrase: "Monginum", pronunciation: "Mo-ngi-noom", meaningBM: "Minum", meaningEN: "Drink", note: "To consume liquid.", category: "Food" },
  { id: "fod7", phrase: "Lihing", pronunciation: "Lee-hing", meaningBM: "Lihing", meaningEN: "Traditional Rice Wine", note: "Fermented rice wine.", category: "Food" },
  { id: "fod8", phrase: "Ponsut", pronunciation: "Pon-soot", meaningBM: "Udang", meaningEN: "Shrimp", note: "Fresh water shrimp.", category: "Food" },
  { id: "fod9", phrase: "Hinava", pronunciation: "Hee-na-va", meaningBM: "Hinava", meaningEN: "Traditional raw fish salad", note: "Raw fish cured with lime juice and ginger.", category: "Food" },
  { id: "fod10", phrase: "Punti", pronunciation: "Poon-tee", meaningBM: "Pisang", meaningEN: "Banana", note: "Local sweet banana variety.", category: "Food" },
  { id: "fod11", phrase: "Pinasakan", pronunciation: "Pee-na-sa-kan", meaningBM: "Pinasakan", meaningEN: "Traditional braised fish", note: "Fish braised with wild fruit and ginger.", category: "Food" },
  { id: "fod12", phrase: "Waig", pronunciation: "Wa-ig", meaningBM: "Air", meaningEN: "Water", note: "Essential water.", category: "Food" },
  { id: "fod13", phrase: "Lohing", pronunciation: "Lo-hing", meaningBM: "Daging", meaningEN: "Meat", note: "Any kind of edible meat.", category: "Food" },
  { id: "fod14", phrase: "Tuhau", pronunciation: "Too-how", meaningBM: "Tuhau", meaningEN: "Wild ginger condiment", note: "Sabah wild ginger.", category: "Food" },
  { id: "fod15", phrase: "Bosou", pronunciation: "Bo-soh", meaningBM: "Bosou", meaningEN: "Fermented food", note: "Traditional fermented side dish.", category: "Food" },

  // Nature (15 phrases)
  { id: "nat1", phrase: "Tuhan", pronunciation: "Too-han", meaningBM: "Hutan", meaningEN: "Forest", note: "The lush green forest.", category: "Nature" },
  { id: "nat2", phrase: "Nulu", pronunciation: "Noo-loo", meaningBM: "Gunung", meaningEN: "Mountain", note: "High mountain peaks.", category: "Nature" },
  { id: "nat3", phrase: "Bawang", pronunciation: "Ba-wang", meaningBM: "Sungai", meaningEN: "River", note: "Flowing mountain water.", category: "Nature" },
  { id: "nat4", phrase: "Tadau", pronunciation: "Ta-dow", meaningBM: "Matahari", meaningEN: "Sun", note: "The warm sun.", category: "Nature" },
  { id: "nat5", phrase: "Wulan", pronunciation: "Woo-lan", meaningBM: "Bulan", meaningEN: "Moon", note: "The silver moon.", category: "Nature" },
  { id: "nat6", phrase: "Tombolog", pronunciation: "Tom-bo-log", meaningBM: "Burung", meaningEN: "Bird", note: "Lively forest birds.", category: "Nature" },
  { id: "nat7", phrase: "Watu", pronunciation: "Wa-too", meaningBM: "Batu", meaningEN: "Stone", note: "Ancient river stones.", category: "Nature" },
  { id: "nat8", phrase: "Sook", pronunciation: "Soh-ok", meaningBM: "Hujan", meaningEN: "Rain", note: "Nourishing rain.", category: "Nature" },
  { id: "nat9", phrase: "Doun", pronunciation: "Doh-oon", meaningBM: "Daun", meaningEN: "Leaf", note: "Green leaf.", category: "Nature" },
  { id: "nat10", phrase: "Tana", pronunciation: "Ta-na", meaningBM: "Tanah", meaningEN: "Earth / Soil", note: "Sacred ancestral land.", category: "Nature" },
  { id: "nat11", phrase: "Rasod", pronunciation: "Ra-sod", meaningBM: "Awan", meaningEN: "Cloud", note: "Clouds in the blue sky.", category: "Nature" },
  { id: "nat12", phrase: "Tinggug", pronunciation: "Ting-goog", meaningBM: "Guruh", meaningEN: "Thunder", note: "Rumble of thunder.", category: "Nature" },
  { id: "nat13", phrase: "Lopot", pronunciation: "Lo-pot", meaningBM: "Kabus", meaningEN: "Fog", note: "Morning mountain mist.", category: "Nature" },
  { id: "nat14", phrase: "Tungkusan", pronunciation: "Toong-koo-san", meaningBM: "Warisan", meaningEN: "Heritage", note: "Natural heritage.", category: "Nature" },
  { id: "nat15", phrase: "Kokorisan", pronunciation: "Ko-ko-ree-san", meaningBM: "Pelangi", meaningEN: "Rainbow", note: "Beautiful arc of color.", category: "Nature" },

  // Celebrations (15 phrases)
  { id: "cel1", phrase: "Kaamatan", pronunciation: "Kaa-ma-tan", meaningBM: "Pesta Kaamatan", meaningEN: "Harvest Festival", note: "The most important cultural festival in Sabah.", category: "Celebrations" },
  { id: "cel2", phrase: "Unduk Ngadau", pronunciation: "Oon-dook Nga-dow", meaningBM: "Ratu Cantik Kaamatan", meaningEN: "Harvest Queen beauty title", note: "Beauty pageant held during Kaamatan reflecting Huminodun's beauty.", category: "Celebrations" },
  { id: "cel3", phrase: "Magavau", pronunciation: "Ma-ga-vow", meaningBM: "Upacara memanggil semangat", meaningEN: "Paddy spirit summoning ritual", note: "Ritual to restore and summon the paddy spirit.", category: "Celebrations" },
  { id: "cel4", phrase: "Sumazau", pronunciation: "Soo-ma-zow", meaningBM: "Tarian Sumazau", meaningEN: "Traditional dance", note: "The national dance of the Kadazandusun people, mimicking birds flying.", category: "Celebrations" },
  { id: "cel5", phrase: "Sogit", pronunciation: "So-git", meaningBM: "Sogit (Denda adat)", meaningEN: "Traditional peace offering / fine", note: "A payment/sacrifice to restore communal balance under native law.", category: "Celebrations" },
  { id: "cel6", phrase: "Mogunting", pronunciation: "Mo-goon-ting", meaningBM: "Upacara potong rambut", meaningEN: "First hair cutting ceremony", note: "Ritual marking a baby's integration into the community.", category: "Celebrations" },
  { id: "cel7", phrase: "Mitatab", pronunciation: "Mee-ta-tab", meaningBM: "Upacara keramaian", meaningEN: "Celebration gathering", note: "Festive gathering of friends and family.", category: "Celebrations" },
  { id: "cel8", phrase: "Kotobian Tadau Kaamatan", pronunciation: "Ko-to-bhee-an Ta-dow Kaa-ma-tan", meaningBM: "Selamat Hari Kaamatan", meaningEN: "Happy Harvest Festival", note: "The standard festive greeting during the harvest season.", category: "Celebrations" },
  { id: "cel9", phrase: "Pangkis", pronunciation: "Pang-kees", meaningBM: "Jeritan kemenangan (Sumazau)", meaningEN: "Triumphant Sumazau cry", note: "High-pitched shout made by men during the Sumazau dance.", category: "Celebrations" },
  { id: "cel10", phrase: "Inavol", pronunciation: "Ee-na-vol", meaningBM: "Kain tenunan tradisi", meaningEN: "Traditional hand-woven cloth", note: "Beautifully patterns of the Rungus or Kadazan weaving.", category: "Celebrations" },
  { id: "cel11", phrase: "Gong", pronunciation: "Gong", meaningBM: "Gong", meaningEN: "Traditional brass instrument", note: "An ensemble of gongs is key to Kadazandusun festivities.", category: "Celebrations" },
  { id: "cel12", phrase: "Bambazan", pronunciation: "Bam-ba-zan", meaningBM: "Semangat Padi / Bambaazon", meaningEN: "The sacred paddy spirit", note: "The spirit of Huminodun residing in the harvested rice.", category: "Celebrations" },
  { id: "cel13", phrase: "Kozutan", pronunciation: "Ko-zoo-tan", meaningBM: "Sorakan gembira", meaningEN: "Joyful celebration cheer", note: "A cheer raised during moments of intense celebration.", category: "Celebrations" },
  { id: "cel14", phrase: "Mogonsok", pronunciation: "Mo-gon-sok", meaningBM: "Memasak beramai-ramai", meaningEN: "Group feast cooking", note: "Preparing large meals collectively for a village feast.", category: "Celebrations" },
  { id: "cel15", phrase: "Rampayan", pronunciation: "Ram-pa-yan", meaningBM: "Hiasan tradisi", meaningEN: "Traditional festive decoration", note: "Decorations made from bamboo and young coconut leaves.", category: "Celebrations" }
];

export const LESSONS: Lesson[] = [
  {
    id: "l1",
    title: "Greetings",
    icon: "Hand",
    phrasesCount: 15,
    progress: 100,
    isCompleted: true,
    category: "Greetings",
    phrases: DICTIONARY.filter(item => item.category === "Greetings"),
  },
  {
    id: "l2",
    title: "Family",
    icon: "Users",
    phrasesCount: 15,
    progress: 0,
    isCompleted: false,
    category: "Family",
    phrases: DICTIONARY.filter(item => item.category === "Family"),
  },
  {
    id: "l3",
    title: "Colours",
    icon: "Palette",
    phrasesCount: 15,
    progress: 0,
    isCompleted: false,
    category: "Colours",
    phrases: DICTIONARY.filter(item => item.category === "Colours"),
  },
  {
    id: "l4",
    title: "Numbers",
    icon: "Hash",
    phrasesCount: 15,
    progress: 0,
    isCompleted: false,
    category: "Numbers",
    phrases: DICTIONARY.filter(item => item.category === "Numbers"),
  },
  {
    id: "l5",
    title: "Body Parts",
    icon: "User",
    phrasesCount: 15,
    progress: 0,
    isCompleted: false,
    category: "Body Parts",
    phrases: DICTIONARY.filter(item => item.category === "Body Parts"),
  },
  {
    id: "l9",
    title: "Food",
    icon: "Utensils",
    phrasesCount: 15,
    progress: 0,
    isCompleted: false,
    category: "Food",
    phrases: DICTIONARY.filter(item => item.category === "Food"),
  },
  {
    id: "l10",
    title: "Nature",
    icon: "Trees",
    phrasesCount: 15,
    progress: 0,
    isCompleted: false,
    category: "Nature",
    phrases: DICTIONARY.filter(item => item.category === "Nature"),
  },
  {
    id: "l11",
    title: "Celebrations",
    icon: "Sparkles",
    phrasesCount: 15,
    progress: 0,
    isCompleted: false,
    category: "Celebrations",
    phrases: DICTIONARY.filter(item => item.category === "Celebrations"),
  }
];
