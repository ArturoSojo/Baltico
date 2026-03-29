export interface Wine {
  id: string;
  name: string;
  origin: string;
  varieties: string[];
  price: number;
  type: "tinto" | "blanco" | "rosado" | "sparkling";
}

export interface WineCategory {
  country: string;
  flag: string;
  wines: Wine[];
}

export const wineList: WineCategory[] = [
  {
    country: "Chile",
    flag: "🇨🇱",
    wines: [
      { id: "castillo-molina", name: "Castillo de Molina", origin: "Chile", varieties: ["Cabernet Sauvignon"], price: 34.48, type: "tinto" },
      { id: "gato-negro-carmenere", name: "Gato Negro", origin: "Chile", varieties: ["Carmenere", "Cabernet Sauvignon", "Merlot", "Rosé"], price: 25.56, type: "tinto" },
      { id: "gato-negro-sparkling", name: "Gato Negro Sparkling", origin: "Chile", varieties: ["Rosé Brut"], price: 34.48, type: "sparkling" },
      { id: "casillero-diablo", name: "Casillero del Diablo", origin: "Chile", varieties: ["Cabernet Sauvignon", "Merlot"], price: 34.48, type: "tinto" },
      { id: "misiones-rengo", name: "Misiones de Rengo Cuvée 2021", origin: "Chile", varieties: ["Carmenere", "Cabernet Sauvignon"], price: 30.17, type: "tinto" },
      { id: "misiones-sparkling", name: "Misiones de Rengo Sparkling", origin: "Chile", varieties: ["Demi Sec", "Brut"], price: 30.17, type: "sparkling" },
      { id: "la-huerta", name: "La Huerta", origin: "Chile", varieties: ["Varietal"], price: 25.56, type: "tinto" },
    ],
  },
  {
    country: "Argentina",
    flag: "🇦🇷",
    wines: [
      { id: "portillo", name: "Portillo", origin: "Argentina", varieties: ["Pinot Noir"], price: 25.56, type: "tinto" },
      { id: "gato-negro-malbec", name: "Gato Negro", origin: "Argentina", varieties: ["Malbec"], price: 25.56, type: "tinto" },
    ],
  },
  {
    country: "España",
    flag: "🇪🇸",
    wines: [
      { id: "romeo", name: "Romeo 2021", origin: "España", varieties: ["Rosé", "Monastrel", "Merlot", "Tempranillo", "Sauvignon Blanc"], price: 25.56, type: "tinto" },
      { id: "ramon-roqueta", name: "Ramón Roqueta", origin: "España", varieties: ["Garnacha", "Cabernet Sauvignon"], price: 25.56, type: "tinto" },
      { id: "catame", name: "Catame", origin: "España", varieties: ["Merlot", "Tempranillo"], price: 21.55, type: "tinto" },
      { id: "familia-oliveda", name: "Familia Oliveda", origin: "España", varieties: ["Brut", "Extra Brut", "Brut Rosé"], price: 34.48, type: "sparkling" },
    ],
  },
  {
    country: "Francia",
    flag: "🇫🇷",
    wines: [
      { id: "louis-perdrier", name: "Louis Perdrier", origin: "Francia", varieties: ["Demisec", "Brut", "Brut Rosé"], price: 38.79, type: "sparkling" },
      { id: "jp-chenet", name: "J.P. Chenet", origin: "Francia", varieties: ["Blanco"], price: 51.72, type: "blanco" },
      { id: "moet-chandon", name: "Moët & Chandon", origin: "Francia", varieties: ["Imperial", "Ice Imperial"], price: 150.86, type: "sparkling" },
    ],
  },
  {
    country: "Portugal",
    flag: "🇵🇹",
    wines: [
      { id: "aveleda", name: "Aveleda", origin: "Portugal", varieties: ["Fonte Alvarinho"], price: 30.17, type: "blanco" },
      { id: "casal-garcia", name: "Casal Garcia", origin: "Portugal", varieties: ["Blanco"], price: 30.17, type: "blanco" },
      { id: "porto-barros", name: "Porto Barros", origin: "Portugal", varieties: ["Tawny", "Branco"], price: 68.96, type: "tinto" },
    ],
  },
  {
    country: "Italia",
    flag: "🇮🇹",
    wines: [
      { id: "terre-passeri", name: "Terre Passeri", origin: "Italia", varieties: ["San Giovese-Merlot", "Trebbiano-Pinot Grigio"], price: 34.48, type: "tinto" },
      { id: "stelle-fortune", name: "Stelle & Fortune", origin: "Italia", varieties: ["Grand Rosé Brut", "Grand Cuvée Dolce", "Grand Cuvée Brut"], price: 34.48, type: "sparkling" },
      { id: "bottega", name: "Bottega", origin: "Italia", varieties: ["Gold", "White Gold", "Rosé Gold"], price: 60.34, type: "sparkling" },
      { id: "mionetto", name: "Mionetto", origin: "Italia", varieties: ["Prosecco"], price: 51.72, type: "sparkling" },
    ],
  },
];
