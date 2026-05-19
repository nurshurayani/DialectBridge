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
  // Greetings
  { id: "d_g1", phrase: "Kopiwosion", pronunciation: "Ko-pee-wo-sion", meaningBM: "Selamat pagi", meaningEN: "Good morning", note: "Standard greeting.", category: "Greetings" },
  { id: "d_g2", phrase: "Kopiombus", pronunciation: "Ko-pee-om-bus", meaningBM: "Selamat tengahari", meaningEN: "Good afternoon", note: "Midday greeting.", category: "Greetings" },
  { id: "d_g3", phrase: "Kopuusan", pronunciation: "Ko-poo-san", meaningBM: "Selamat tinggal", meaningEN: "Goodbye", note: "Parting phrase.", category: "Greetings" },
  { id: "d_g4", phrase: "Misuul", pronunciation: "Mi-sool", meaningBM: "Terima kasih", meaningEN: "Thank you", note: "Showing gratitude.", category: "Greetings" },
  { id: "d_g5", phrase: "Nung nunu do ngaran nu?", pronunciation: "Noong noo-noo do nga-ran noo", meaningBM: "Siapa nama kamu?", meaningEN: "What is your name?", note: "Asking for name.", category: "Greetings" },
  { id: "d_g6", phrase: "Okito", pronunciation: "O-ki-to", meaningBM: "Ya", meaningEN: "Yes", note: "Affirmation.", category: "Greetings" },
  { id: "d_g7", phrase: "Anda", pronunciation: "An-da", meaningBM: "Tidak", meaningEN: "No", note: "Negation.", category: "Greetings" },
  { id: "d_g8", phrase: "Gisom", pronunciation: "Gi-som", meaningBM: "Maaf", meaningEN: "Sorry", note: "Apology.", category: "Greetings" },
  { id: "d_g9", phrase: "Onu habar?", pronunciation: "O-nu ha-bar", meaningBM: "Apa khabar?", meaningEN: "How are you?", note: "Common inquiry.", category: "Greetings" },
  { id: "d_g10", phrase: "Kotohuadan", pronunciation: "Ko-to-hua-dan", meaningBM: "Terima kasih", meaningEN: "Thank you", note: "Polite gratitude.", category: "Greetings" },

  // Colours
  { id: "d_c1", phrase: "Oitom", pronunciation: "Oy-tom", meaningBM: "Hitam", meaningEN: "Black", note: "One of the four primary colours.", category: "Colours" },
  { id: "d_c2", phrase: "Obulou", pronunciation: "O-boo-loh", meaningBM: "Biru", meaningEN: "Blue", note: "The colour of the sea.", category: "Colours" },
  { id: "d_c3", phrase: "Aragang", pronunciation: "A-ra-gang", meaningBM: "Merah", meaningEN: "Red", note: "The colour of strength.", category: "Colours" },
  { id: "d_c4", phrase: "Osilou", pronunciation: "O-see-loh", meaningBM: "Kuning", meaningEN: "Yellow", note: "The colour of the sun.", category: "Colours" },
  { id: "d_c5", phrase: "Opurak", pronunciation: "O-poo-rak", meaningBM: "Putih", meaningEN: "White", note: "Pure and clean.", category: "Colours" },
  { id: "d_c6", phrase: "Otomou", pronunciation: "O-to-moh", meaningBM: "Hijau", meaningEN: "Green", note: "The colour of forests.", category: "Colours" },
  
  // Numbers
  { id: "d_n1", phrase: "Iso", pronunciation: "Ee-so", meaningBM: "Satu", meaningEN: "One", note: "First count.", category: "Numbers" },
  { id: "d_n2", phrase: "Duo", pronunciation: "Doo-oh", meaningBM: "Dua", meaningEN: "Two", note: "Pair.", category: "Numbers" },
  { id: "d_n3", phrase: "Tolu", pronunciation: "To-loo", meaningBM: "Tiga", meaningEN: "Three", note: "Triple.", category: "Numbers" },
  { id: "d_n4", phrase: "Apat", pronunciation: "A-pat", meaningBM: "Empat", meaningEN: "Four", note: "Square base.", category: "Numbers" },
  { id: "d_n5", phrase: "Limo", pronunciation: "Lee-mo", meaningBM: "Lima", meaningEN: "Five", note: "Hand count.", category: "Numbers" },
  { id: "d_n6", phrase: "Onom", pronunciation: "O-nom", meaningBM: "Enam", meaningEN: "Six", note: "Next step.", category: "Numbers" },
  { id: "d_n7", phrase: "Turu", pronunciation: "Too-roo", meaningBM: "Tujuh", meaningEN: "Seven", note: "Lucky seven.", category: "Numbers" },
  { id: "d_n8", phrase: "Walu", pronunciation: "Wa-loo", meaningBM: "Lapan", meaningEN: "Eight", note: "Octopus legs.", category: "Numbers" },
  { id: "d_n9", phrase: "Siam", pronunciation: "See-am", meaningBM: "Sembilan", meaningEN: "Nine", note: "Last single digit.", category: "Numbers" },
  { id: "d_n10", phrase: "Hopod", pronunciation: "Ho-pod", meaningBM: "Sepuluh", meaningEN: "Ten", note: "Full set.", category: "Numbers" },
  
  // Body Parts
  { id: "d_b1", phrase: "Tulu", pronunciation: "Too-loo", meaningBM: "Kepala", meaningEN: "Head", note: "Top of the body.", category: "Body Parts" },
  { id: "d_b2", phrase: "Turos", pronunciation: "Too-ros", meaningBM: "Muka", meaningEN: "Face", note: "Look at me.", category: "Body Parts" },
  { id: "d_b3", phrase: "Longon", pronunciation: "Lo-ngon", meaningBM: "Lengan", meaningEN: "Arm", note: "Upper limb.", category: "Body Parts" },
  { id: "d_b4", phrase: "Palad", pronunciation: "Pa-lad", meaningBM: "Tapak Tangan", meaningEN: "Palm / Hand", note: "Hold something.", category: "Body Parts" },
  { id: "d_b5", phrase: "Lukap", pronunciation: "Loo-kap", meaningBM: "Kaki", meaningEN: "Foot", note: "Walk on earth.", category: "Body Parts" },
  { id: "d_b6", phrase: "Tunduundu'", pronunciation: "Toon-doon-doo", meaningBM: "Jantung/Hati", meaningEN: "Heart", note: "Beat of life.", category: "Body Parts" },
  { id: "d_b7", phrase: "Mato", pronunciation: "Ma-to", meaningBM: "Mata", meaningEN: "Eye", note: "To see clearly.", category: "Body Parts" },
  { id: "d_b8", phrase: "Tolingo", pronunciation: "To-lee-ngo", meaningBM: "Telinga", meaningEN: "Ear", note: "To hear the forest.", category: "Body Parts" },
  
  // Family
  { id: "d_f1", phrase: "Tapa", pronunciation: "Ta-pa", meaningBM: "Ayah", meaningEN: "Father", note: "Standard term for father.", category: "Family" },
  { id: "d_f2", phrase: "Tina", pronunciation: "Ti-na", meaningBM: "Ibu", meaningEN: "Mother", note: "Standard term for mother.", category: "Family" },
  { id: "d_f3", phrase: "Taki", pronunciation: "Ta-kee", meaningBM: "Datuk", meaningEN: "Grandfather", note: "Grandfather.", category: "Family" },
  { id: "d_f4", pronunciation: "To-doo", meaningBM: "Nenek", meaningEN: "Grandmother", phrase: "Todu'", note: "Grandmother.", category: "Family" },
  { id: "d_f5", phrase: "Tabang", pronunciation: "Ta-bang", meaningBM: "Abang/Kakak", meaningEN: "Elder Sibling", note: "Older sibling.", category: "Family" },
  { id: "d_f6", phrase: "Tanak", pronunciation: "Ta-nak", meaningBM: "Anak", meaningEN: "Child", note: "Offspring.", category: "Family" },

  // Food
  { id: "d_fod1", phrase: "Wasi", pronunciation: "Wa-see", meaningBM: "Nasi", meaningEN: "Rice", note: "Staple food.", category: "Food" },
  { id: "d_fod2", phrase: "Sada", pronunciation: "Sa-da", meaningBM: "Ikan", meaningEN: "Fish", note: "Common source of protein.", category: "Food" },
  { id: "d_fod3", phrase: "Rinokaan", pronunciation: "Ree-no-ka-an", meaningBM: "Sayur", meaningEN: "Vegetable", note: "Plant-based food.", category: "Food" },

  // Nature
  { id: "d_nat1", phrase: "Tuhan", pronunciation: "Too-han", meaningBM: "Hutan", meaningEN: "Forest", note: "The lush green forest.", category: "Nature" },
  { id: "d_nat2", phrase: "Nulu", pronunciation: "Noo-loo", meaningBM: "Gunung", meaningEN: "Mountain", note: "High peaks.", category: "Nature" },
  { id: "d_nat3", phrase: "Bawang", pronunciation: "Ba-wang", meaningBM: "Sungai", meaningEN: "River", note: "Flowing water.", category: "Nature" },
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
      { id: "p1", phrase: "Kopiwosion", pronunciation: "Ko-pee-wo-sion", meaningBM: "Selamat pagi", meaningEN: "Greetings / Good morning", note: "Standard greeting in Kadazan.", category: "Greetings" },
      { id: "p2", phrase: "Onu habar?", pronunciation: "O-nu ha-bar", meaningBM: "Apa khabar?", meaningEN: "How are you?", note: "Used universally across many districts.", category: "Greetings" },
      { id: "p3", phrase: "Abantu", pronunciation: "A-ban-too", meaningBM: "Khabar baik", meaningEN: "I am fine", note: "Polite response.", category: "Greetings" },
      { id: "p4", phrase: "Kotohuadan", pronunciation: "Ko-to-hua-dan", meaningBM: "Terima kasih", meaningEN: "Thank you", note: "Essential phrase showing gratitude.", category: "Greetings" },
      { id: "p12", phrase: "Siou diti", pronunciation: "See-oh dee-tee", meaningBM: "Maaf", meaningEN: "Excuse me / I'm sorry", note: "Polite apology.", category: "Greetings" },
      { id: "d_g2", phrase: "Kopiombus", pronunciation: "Ko-pee-om-bus", meaningBM: "Selamat tengahari", meaningEN: "Good afternoon", note: "Midday greeting.", category: "Greetings" },
      { id: "d_g3", phrase: "Kopuusan", pronunciation: "Ko-poo-san", meaningBM: "Selamat tinggal", meaningEN: "Goodbye", note: "Parting phrase.", category: "Greetings" },
      { id: "d_g4", phrase: "Misuul", pronunciation: "Mi-sool", meaningBM: "Terima kasih", meaningEN: "Thank you", note: "Showing gratitude.", category: "Greetings" },
      { id: "d_g5", phrase: "Nung nunu do ngaran nu?", pronunciation: "Noong noo-noo do nga-ran noo", meaningBM: "Siapa nama kamu?", meaningEN: "What is your name?", note: "Asking for name.", category: "Greetings" },
      { id: "d_g6", phrase: "Okito", pronunciation: "O-ki-to", meaningBM: "Ya", meaningEN: "Yes", note: "Affirmation.", category: "Greetings" },
      { id: "d_g7", phrase: "Anda", pronunciation: "An-da", meaningBM: "Tidak", meaningEN: "No", note: "Negation.", category: "Greetings" },
      { id: "d_g8", phrase: "Gisom", pronunciation: "Gi-som", meaningBM: "Maaf", meaningEN: "Sorry", note: "Apology.", category: "Greetings" },
    ]
  },
  {
    id: "l2",
    title: "Family",
    icon: "Users",
    phrasesCount: 12,
    progress: 0,
    isCompleted: false,
    category: "Family",
    phrases: [
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
    ]
  },
  {
    id: "l3",
    title: "Colours",
    icon: "Palette",
    phrasesCount: 6,
    progress: 0,
    isCompleted: false,
    category: "Colours",
    phrases: [
      { id: "c1", phrase: "Oitom", pronunciation: "Oy-tom", meaningBM: "Hitam", meaningEN: "Black", note: "Like the night sky.", category: "Colours" },
      { id: "c2", phrase: "Obulou", pronunciation: "O-boo-loh", meaningBM: "Biru", meaningEN: "Blue", note: "The colour of the sea.", category: "Colours" },
      { id: "c3", phrase: "Aragang", pronunciation: "A-ra-gang", meaningBM: "Merah", meaningEN: "Red", note: "The colour of strength.", category: "Colours" },
      { id: "c4", phrase: "Osilou", pronunciation: "O-see-loh", meaningBM: "Kuning", meaningEN: "Yellow", note: "Bright like the sun.", category: "Colours" },
      { id: "c5", phrase: "Opurak", pronunciation: "O-poo-rak", meaningBM: "Putih", meaningEN: "White", note: "Pure and clean.", category: "Colours" },
      { id: "c6", phrase: "Otomou", pronunciation: "O-to-moh", meaningBM: "Hijau", meaningEN: "Green", note: "The forest.", category: "Colours" },
    ]
  },
  {
    id: "l4",
    title: "Numbers",
    icon: "Hash",
    phrasesCount: 10,
    progress: 0,
    isCompleted: false,
    category: "Numbers",
    phrases: [
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
    ]
  },
  {
    id: "l5",
    title: "Body Parts",
    icon: "User",
    phrasesCount: 12,
    progress: 0,
    isCompleted: false,
    category: "Body Parts",
    phrases: [
      { id: "b1", phrase: "Tulu", pronunciation: "Too-loo", meaningBM: "Kepala", meaningEN: "Head", note: "Seat of wisdom.", category: "Body Parts" },
      { id: "b2", phrase: "Turos", pronunciation: "Too-ros", meaningBM: "Muka", meaningEN: "Face", note: "The window to the soul.", category: "Body Parts" },
      { id: "b3", phrase: "Longon", pronunciation: "Lo-ngon", meaningBM: "Lengan", meaningEN: "Arm", note: "For working.", category: "Body Parts" },
      { id: "b4", phrase: "Palad", pronunciation: "Pa-lad", meaningBM: "Tapak Tangan", meaningEN: "Palm / Hand", note: "For giving.", category: "Body Parts" },
      { id: "b5", phrase: "Lukap", pronunciation: "Loo-kap", meaningBM: "Kaki", meaningEN: "Foot", note: "To walk.", category: "Body Parts" },
      { id: "b6", phrase: "Tunduundu'", pronunciation: "Toon-doon-doo", meaningBM: "Jantung/Hati", meaningEN: "Heart", note: "Life's rhythm.", category: "Body Parts" },
      { id: "b7", phrase: "Mato", pronunciation: "Ma-to", meaningBM: "Mata", meaningEN: "Eye", note: "For seeing.", category: "Body Parts" },
      { id: "b8", phrase: "Tolingo", pronunciation: "To-lee-ngo", meaningBM: "Telinga", meaningEN: "Ear", note: "For listening.", category: "Body Parts" },
      { id: "b9", phrase: "Todung", pronunciation: "To-doong", meaningBM: "Hidung", meaningEN: "Nose", note: "For smelling.", category: "Body Parts" },
      { id: "b10", phrase: "Kabang", pronunciation: "Ka-bang", meaningBM: "Mulut", meaningEN: "Mouth", note: "For speaking.", category: "Body Parts" },
      { id: "b11", phrase: "Nipon", pronunciation: "Nee-pon", meaningBM: "Gigi", meaningEN: "Teeth", note: "A smile.", category: "Body Parts" },
      { id: "b12", phrase: "Dila", pronunciation: "Dee-la", meaningBM: "Lidah", meaningEN: "Tongue", note: "Speech.", category: "Body Parts" },
    ]
  },
  {
    id: "l9",
    title: "Food",
    icon: "Utensils",
    phrasesCount: 3,
    progress: 0,
    isCompleted: false,
    category: "Food",
    phrases: [
      { id: "d_fod1", phrase: "Wasi", pronunciation: "Wa-see", meaningBM: "Nasi", meaningEN: "Rice", note: "Staple food.", category: "Food" },
      { id: "d_fod2", phrase: "Sada", pronunciation: "Sa-da", meaningBM: "Ikan", meaningEN: "Fish", note: "Common source of protein.", category: "Food" },
      { id: "d_fod3", phrase: "Rinokaan", pronunciation: "Ree-no-ka-an", meaningBM: "Sayur", meaningEN: "Vegetable", note: "Plant-based food.", category: "Food" },
    ]
  },
  {
    id: "l10",
    title: "Nature",
    icon: "Trees",
    phrasesCount: 3,
    progress: 0,
    isCompleted: false,
    category: "Nature",
    phrases: [
      { id: "d_nat1", phrase: "Tuhan", pronunciation: "Too-han", meaningBM: "Hutan", meaningEN: "Forest", note: "The lush green forest.", category: "Nature" },
      { id: "d_nat2", phrase: "Nulu", pronunciation: "Noo-loo", meaningBM: "Gunung", meaningEN: "Mountain", note: "High peaks.", category: "Nature" },
      { id: "d_nat3", phrase: "Bawang", pronunciation: "Ba-wang", meaningBM: "Sungai", meaningEN: "River", note: "Flowing water.", category: "Nature" },
    ]
  }
];
