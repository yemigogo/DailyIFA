// Complete catalog of all 256 Odu Ifa cards
// This provides metadata for all cards, with rich data from database when available

export interface OduCatalogEntry {
  id: number;
  name: string;
  nameYoruba?: string;
  isMajor: boolean;
  imagePath: string;
  subtitle?: string;
  subtitleYoruba?: string;
  description?: string;
}

// Major Odu names (1-16)
const majorOduNames: Record<number, { name: string; nameYoruba: string }> = {
  1: { name: "Eji Ogbe", nameYoruba: "Ẹ̀jì Ogbè" },
  2: { name: "Oyeku Meji", nameYoruba: "Òyẹ̀kú Méjì" },
  3: { name: "Iwori Meji", nameYoruba: "Ìwòrì Méjì" },
  4: { name: "Idi Meji", nameYoruba: "Òdí Méjì" },
  5: { name: "Irosun Meji", nameYoruba: "Ìrosùn Méjì" },
  6: { name: "Owonrin Meji", nameYoruba: "Ọ̀wọ́nrín Méjì" },
  7: { name: "Obara Meji", nameYoruba: "Ọ̀bàrà Méjì" },
  8: { name: "Okanran Meji", nameYoruba: "Ọ̀kànràn Méjì" },
  9: { name: "Ogunda Meji", nameYoruba: "Ògúndá Méjì" },
  10: { name: "Osa Meji", nameYoruba: "Ọ̀sá Méjì" },
  11: { name: "Ika Meji", nameYoruba: "Ìká Méjì" },
  12: { name: "Oturupon Meji", nameYoruba: "Ọ̀túrúpọ̀n Méjì" },
  13: { name: "Otura Meji", nameYoruba: "Ọ̀túrá Méjì" },
  14: { name: "Irete Meji", nameYoruba: "Ìrẹ̀tẹ̀ Méjì" },
  15: { name: "Ose Meji", nameYoruba: "Ọ̀sẹ́ Méjì" },
  16: { name: "Ofun Meji", nameYoruba: "Ọ̀fún Méjì" },
};

// Generate complete 256 Odu catalog
export const generateOduCatalog = (): OduCatalogEntry[] => {
  return Array.from({ length: 256 }, (_, index) => {
    const id = index + 1;
    const isMajor = id <= 16;
    
    const entry: OduCatalogEntry = {
      id,
      isMajor,
      imagePath: `/static/odu_cards/odu_card_${id}.png`,
      name: isMajor && majorOduNames[id] 
        ? majorOduNames[id].name 
        : `Odu ${id}`,
      nameYoruba: isMajor && majorOduNames[id] 
        ? majorOduNames[id].nameYoruba 
        : undefined,
      subtitle: isMajor 
        ? "Sacred Major Odu" 
        : "Combined Odu - Wisdom forthcoming",
      subtitleYoruba: isMajor 
        ? "Odù Àkọ́kọ́ Mímọ́" 
        : "Odù Àpapọ̀",
      description: isMajor 
        ? "One of the 16 principal Odu containing foundational wisdom of Ifá tradition" 
        : "Combined Odu representing the interaction of two Major Odu",
    };
    
    return entry;
  });
};

// Get single Odu by ID
export const getOduById = (id: number): OduCatalogEntry | undefined => {
  const catalog = generateOduCatalog();
  return catalog.find(odu => odu.id === id);
};

// Filter catalog by type
export const filterByType = (
  catalog: OduCatalogEntry[], 
  type: "all" | "major" | "minor"
): OduCatalogEntry[] => {
  if (type === "all") return catalog;
  return catalog.filter(odu => type === "major" ? odu.isMajor : !odu.isMajor);
};

// Search catalog by query
export const searchCatalog = (
  catalog: OduCatalogEntry[], 
  query: string
): OduCatalogEntry[] => {
  if (!query.trim()) return catalog;
  
  const normalizedQuery = query.toLowerCase();
  return catalog.filter(odu => 
    odu.name.toLowerCase().includes(normalizedQuery) ||
    odu.nameYoruba?.toLowerCase().includes(normalizedQuery) ||
    odu.subtitle?.toLowerCase().includes(normalizedQuery) ||
    odu.id.toString().padStart(3, '0').includes(normalizedQuery)
  );
};

// Merge API data into catalog
export const mergeCatalogWithApiData = (
  catalog: OduCatalogEntry[],
  apiOdus: any[]
): OduCatalogEntry[] => {
  return catalog.map(catalogEntry => {
    const apiData = apiOdus.find(odu => odu.id === catalogEntry.id);
    
    if (apiData) {
      return {
        ...catalogEntry,
        name: apiData.name || catalogEntry.name,
        nameYoruba: apiData.nameYoruba || catalogEntry.nameYoruba,
        subtitle: apiData.subtitle || catalogEntry.subtitle,
        subtitleYoruba: apiData.subtitleYoruba || catalogEntry.subtitleYoruba,
        description: apiData.description || catalogEntry.description,
      };
    }
    
    return catalogEntry;
  });
};
