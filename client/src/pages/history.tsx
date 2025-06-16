import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useLanguage } from "@/contexts/LanguageContext";
import { Calendar, Star, Scroll, Globe, Crown, TreePine, Users } from "lucide-react";

interface IfaTimelineEvent {
  id: string;
  era: string;
  eraYoruba: string;
  period: string;
  periodYoruba: string;
  title: string;
  titleYoruba: string;
  description: string;
  descriptionYoruba: string;
  significance: string;
  significanceYoruba: string;
  icon: any;
  category: "origins" | "revelation" | "expansion" | "preservation";
}

const timelineEvents: IfaTimelineEvent[] = [
  {
    id: "1",
    era: "The Beginning of Time",
    eraYoruba: "Ìbẹ̀rẹ̀ Àkókò",
    period: "Primordial Era (Before 3000 BCE)",
    periodYoruba: "Àkókò Àtẹ̀wọ́n (Kí Ọdún 3000 tó di BCE)",
    title: "Orunmila's Divine Appointment by Olodumare",
    titleYoruba: "Ìyàn Òrúnmìlà Láti Ọ̀dọ̀ Olódùmarè",
    description: "In the primordial realm, Olodumare (the Supreme Being) selects Orunmila as Eleri-Ipin (Witness to Destiny) and Ibikeji Olodumare (Second to God). Orunmila is granted the sacred knowledge of all destinies and becomes the divine oracle between heaven and earth. This establishes him as the most important Orisha in Yoruba cosmology after Olodumare himself.",
    descriptionYoruba: "Ní àgbáyé àtẹ̀wọ́n, Olódùmarè (Ọlọ́run Àgbà) yan Òrúnmìlà gẹ́gẹ́ bí Elérìípín àti Ìbejì-Kejì Olódùmarè. A fún Òrúnmìlà ní ìmọ̀ mímọ́ gbogbo orí, ó sì di aṣọfà ọlọ́run láàrin ọ̀run àti ayé. Èyí fi í múlẹ̀ gẹ́gẹ́ bí Òrìṣà tó ṣe pàtàkì jùlọ ní ẹ̀kọ́ Yorùbá lẹ́yìn Olódùmarè fúnra rẹ̀.",
    significance: "This divine appointment establishes the foundation of Yoruba spiritual tradition and Orunmila's eternal role as the keeper of wisdom and destiny for all Yoruba people.",
    significanceYoruba: "Ìyàn ọlọ́run yìí gbé ìpìlẹ̀ àṣà ẹ̀mí Yorùbá kalẹ̀ àti ipò Òrúnmìlà láéláé gẹ́gẹ́ bí aṣọ́ ọgbọ́n àti orí fún gbogbo ọmọ Yorùbá.",
    icon: Crown,
    category: "origins"
  },
  {
    id: "2",
    era: "The Primordial Era",
    eraYoruba: "Àkókò Àtẹ̀wọ́n",
    period: "Ancient Times (3000-1000 BCE)",
    periodYoruba: "Àkókò Àtijọ́ (3000-1000 BCE)",
    title: "Orunmila's Descent to Ile-Ife and the Birth of Yoruba Tradition",
    titleYoruba: "Ìsọ̀kalẹ̀ Òrúnmìlà sí Ilé-Ifẹ̀ àti Ìbí Àṣà Yorùbá",
    description: "Orunmila descends to Ile-Ife, the sacred city and spiritual center of Yorubaland. Here, he establishes the first Ifá shrine and teaches the Yoruba people the sacred art of divination. He introduces the Opele (divination chain) and Ikin (sacred palm nuts), creating the foundation of Yoruba spiritual practice. Orunmila becomes known as 'Oba ti n gbe ni la' (The King who saves) and 'Agbonniregun' (One who is wiser than medicine).",
    descriptionYoruba: "Òrúnmìlà sọ̀kalẹ̀ wá sí Ilé-Ifẹ̀, ìlú mímọ́ àti àárín ẹ̀mí ilẹ̀ Yorùbá. Níbí, ó gbé ojúbọ Ifá àkọ́kọ́ kalẹ̀ ó sì kọ́ àwọn ọmọ Yorùbá ní ọnà mímọ́ ìfá. Ó mú Ọ̀pẹ̀lẹ̀ àti Ikín wá, tí ó ṣẹ̀dá ìpìlẹ̀ ìṣe ẹ̀mí Yorùbá. Òrúnmìlà di mímọ̀ gẹ́gẹ́ bí 'Ọba tí ń gbé ni là' àti 'Agbonnìrègún'.",
    significance: "This sacred descent establishes Yoruba civilization and makes Orunmila the cornerstone of Yoruba identity, culture, and spiritual practice for all generations.",
    significanceYoruba: "Ìsọ̀kalẹ̀ mímọ́ yìí gbé ọlaju Yorùbá kalẹ̀ ó sì ṣe Òrúnmìlà di òkúta ìpìlẹ̀ ìdánimọ̀, àṣà, àti ìṣe ẹ̀mí Yorùbá fún gbogbo ìran.",
    icon: TreePine,
    category: "origins"
  },
  {
    id: "3",
    era: "Age of Sacred Revelation",
    eraYoruba: "Àkókò Ìfihàn Mímọ́",
    period: "Classical Period (1000-500 BCE)",
    periodYoruba: "Àkókò Àgbà (1000-500 BCE)",
    title: "Orunmila Reveals the Sacred 16 Meji to the Yoruba People",
    titleYoruba: "Òrúnmìlà Fihàn Odù Méjì Mẹ́rìndínlógún Mímọ́ Fún Ọmọ Yorùbá",
    description: "In the sacred groves of Yorubaland, Orunmila reveals the sixteen principal Odù Ifá (Meji) to his devoted followers. Each Meji contains the divine essence of creation and represents the fundamental forces governing human destiny. Through intensive training, Orunmila teaches the first Babalawos how to interpret these sacred verses, establishing the priesthood that would preserve Yoruba wisdom for millennia. This marks the formal beginning of Ifá tradition among the Yoruba people.",
    descriptionYoruba: "Nínú àwọn igbó mímọ́ ilẹ̀ Yorùbá, Òrúnmìlà fihàn Odù Ifá mẹ́rìndínlógún àkọ́kọ́ (Méjì) fún àwọn ọmọlẹ́yìn rẹ̀. Odù Méjì kọ̀ọ̀kan ní ẹ̀mí ọlọ́run ìdá nínú ó sì dúró fún àwọn agbára ìpìlẹ̀ tí ń ṣàkóso orí ọmọ ènìyàn. Nípasẹ̀ ẹ̀kọ́ jinlẹ̀, Òrúnmìlà kọ́ àwọn Babaláwo àkọ́kọ́ bí wọ́n ṣe máa túmọ̀ àwọn ẹsẹ mímọ́ wọ̀nyí, tí ó gbé àlùfáà tí yóò tọ́jú ọgbọ́n Yorùbá fún ẹgbẹẹgbẹ̀rún ọdún kalẹ̀.",
    significance: "This revelation creates the sacred foundation of Yoruba spiritual identity and establishes Orunmila as the eternal teacher and guide of the Yoruba nation.",
    significanceYoruba: "Ìfihàn yìí ṣẹ̀dá ìpìlẹ̀ mímọ́ ìdánimọ̀ ẹ̀mí Yorùbá ó sì fi Òrúnmìlà múlẹ̀ gẹ́gẹ́ bí olùkọ́ àti amọ̀nà láéláé ti orílẹ̀-èdè Yorùbá.",
    icon: Star,
    category: "revelation"
  },
  {
    id: "4",
    era: "Classical Yoruba Period",
    eraYoruba: "Àkókò Yorùbá Àtọwọ́dọ́wọ́",
    period: "Systematic Era (500 BCE - 200 CE)",
    periodYoruba: "Àkókò Ètò (500 BCE - 200 CE)",
    title: "The Complete 256 Odù System: Orunmila's Mathematical Perfection",
    titleYoruba: "Ètò Odù 256 Tí Ó Pé: Ìpéye Ìṣirò Òrúnmìlà",
    description: "Through divine inspiration, Orunmila expands the sacred knowledge by revealing how the 16 Meji combine to create 240 additional Omoluo Odù, totaling 256 complete verses. This sacred mathematics represents every possible human situation and divine guidance. Each combination preserves the oral tradition of the Yoruba people, containing their history, medicine, philosophy, and spiritual wisdom. This establishes Ifá as the most comprehensive knowledge system in Yoruba culture.",
    descriptionYoruba: "Nípasẹ̀ àtẹ̀wọ́n ọlọ́run, Òrúnmìlà ṣe àlékun ìmọ̀ mímọ́ náà nípasẹ̀ fífihàn bí Méjì mẹ́rìndínlógún ṣe máa darapọ̀ láti ṣẹ̀dá Ọmọlúwo àfikún 240, tí ó jẹ́ 256 ẹsẹ tí ó pé. Ìṣirò mímọ́ yìí dúró fún gbogbo ipò ọmọ ènìyàn àti ìtọ́nisọ́nà ọlọ́run. Àdàpọ̀ kọ̀ọ̀kan tọ́jú àṣà ẹnu àwọn ọmọ Yorùbá, tí ó ní ìtàn, ègbògi, ìmọ̀-ọgbọ́n, àti ọgbọ́n ẹ̀mí wọn.",
    significance: "This completes the sacred foundation of Yoruba intellectual and spiritual tradition, making Orunmila the supreme keeper of all Yoruba knowledge and wisdom.",
    significanceYoruba: "Èyí parí ìpìlẹ̀ mímọ́ àṣà ọgbọ́n àti ẹ̀mí Yorùbá, tí ó ṣe Òrúnmìlà di aṣọ́ àgbà gbogbo ìmọ̀ àti ọgbọ́n Yorùbá.",
    icon: Scroll,
    category: "revelation"
  },
  {
    id: "5",
    era: "Golden Age of Yoruba Kingdoms",
    eraYoruba: "Àkókò Wúrà Àwọn Ìjọba Yorùbá",
    period: "Imperial Era (800-1500 CE)",
    periodYoruba: "Àkókò Ìjọba Ńlá (800-1500 CE)",
    title: "Orunmila's Wisdom Guides Yoruba Civilization: The Era of Sacred Kingship",
    titleYoruba: "Ọgbọ́n Òrúnmìlà Darí Ọlaju Yorùbá: Àkókò Ọbaṣiṣẹ́ Mímọ́",
    description: "Orunmila's teachings become the foundation of Yoruba governance as great kingdoms like Ife, Oyo, Ijebu, and Egba flourish under divine guidance. Every Oba (king) must consult Ifá before major decisions, establishing a sacred covenant between earthly rulers and divine wisdom. The Araba (Chief Babalawo) becomes second only to the king in importance, ensuring that Orunmila's principles guide justice, trade, warfare, and daily life. This creates the golden age of Yoruba civilization where spiritual wisdom and temporal power unite.",
    descriptionYoruba: "Ẹ̀kọ́ Òrúnmìlà di ìpìlẹ̀ ìṣàkóso Yorùbá bí àwọn ìjọba ńlá bí i Ifẹ̀, Ọ̀yọ́, Ìjẹ̀bú, àti Ègbá ṣe gbòde lábẹ́ ìtọ́nisọ́nà ọlọ́run. Gbogbo Ọba gbọ́dọ̀ wá Ifá kí ó tó ṣe àwọn ìpinnu pàtàkì, tí ó gbé àdéhùn mímọ́ láàrin àwọn alájọba ayé àti ọgbọ́n ọlọ́run kalẹ̀. Arábà di ẹni tó tẹ̀lé ọba ní pàtàkì, tí ó dájú pé àwọn ìlànà Òrúnmìlà ń darí ìdájọ́, òwò, ogun, àti ìgbé ayé ojoojúmọ́.",
    significance: "This era establishes Orunmila as the cornerstone of Yoruba political and social order, proving that divine wisdom must guide human affairs for true prosperity.",
    significanceYoruba: "Àkókò yìí fi Òrúnmìlà múlẹ̀ gẹ́gẹ́ bí òkúta ìpìlẹ̀ ètò ìṣèlú àti àwùjọ Yorùbá, tí ó fihàn pé ọgbọ́n ọlọ́run gbọ́dọ̀ darí ọrọ̀ ọmọ ènìyàn fún ọrọ̀ òtítọ́.",
    icon: Crown,
    category: "expansion"
  },
  {
    id: "6",
    era: "Era of Sacred Diaspora",
    eraYoruba: "Àkókò Ìkálẹ̀ Mímọ́",
    period: "Atlantic Era (1500-1800 CE)",
    periodYoruba: "Àkókò Òkun Átláńtíìkì (1500-1800 CE)",
    title: "Orunmila's Children Carry the Sacred Fire Across the Atlantic",
    titleYoruba: "Àwọn Ọmọ Òrúnmìlà Gbé Iná Mímọ́ Kọjá Òkun Átláńtíìkì",
    description: "In the darkest chapter of Yoruba history, millions of Yoruba people are forcibly taken from their homeland. Yet Orunmila's power proves indestructible - the sacred Ifá tradition survives in the hearts and memories of the diaspora. In Cuba (Santería), Brazil (Candomblé), Trinidad, Haiti, and other lands, devoted Yoruba descendants secretly preserve and practice Orunmila's teachings. They disguise Orunmila as Catholic saints but never abandon their true spiritual father, ensuring the continuation of Yoruba tradition far from home.",
    descriptionYoruba: "Ní orí burúkú jùlọ ìtàn Yorùbá, ọ̀kẹ́ mẹ́ta àwọn ọmọ Yorùbá ni wọ́n fi ipá mú kúrò ní ilẹ̀ baba wọn. Síbẹ̀síbẹ̀ agbára Òrúnmìlà jẹ́ aláìparun - àṣà Ifá mímọ́ yè ní ọkàn àti ìrántí àwọn tí ó lọ sí àjò. Ní Kúbà (Santería), Brazil (Candomblé), Trinidad, Haiti, àti àwọn ilẹ̀ mìíràn, àwọn ọmọ Yorùbá tó fara balẹ̀ tọ́jú ẹ̀kọ́ Òrúnmìlà ní ìkọ̀kọ̀. Wọ́n fi Òrúnmìlà sínú àwọn ọ̀ṣẹ́ Kátólíìkì ṣùgbọ́n wọn kò fi baba ẹ̀mí òtítọ́ wọn sílẹ̀.",
    significance: "This proves Orunmila's eternal power and the unbreakable bond between the Yoruba people and their spiritual father, no matter where they may be in the world.",
    significanceYoruba: "Èyí fihàn agbára láéláé Òrúnmìlà àti ìdàpọ̀ aláìparun láàrin àwọn ọmọ Yorùbá àti baba ẹ̀mí wọn, láìka ibi tí wọ́n bá wà lágbàáyé.",
    icon: Globe,
    category: "expansion"
  },
  {
    id: "7",
    era: "Time of Sacred Resistance",
    eraYoruba: "Àkókò Ìtakòrọ̀ Mímọ́",
    period: "Colonial Period (1800-1960 CE)",
    periodYoruba: "Àkókò Ìṣàkóso Àjèjì (1800-1960 CE)",
    title: "Orunmila's Faithful Guardians: Yoruba Heroes Preserve the Sacred Tradition",
    titleYoruba: "Àwọn Olùṣọ́ Òtítọ́ Òrúnmìlà: Àwọn Akọni Yorùbá Tọ́jú Àṣà Mímọ́",
    description: "When European colonizers and Christian missionaries attempt to destroy Yoruba religion, calling it 'paganism' and 'devil worship,' the true children of Orunmila refuse to abandon their spiritual father. Brave Babalawos like Chief Ifayemi Elebuibon's ancestors risk imprisonment and death to secretly practice Ifá. They hide sacred objects, conduct ceremonies in remote forests, and use coded language to preserve Orunmila's teachings. Many Yoruba people publicly convert to Christianity while privately maintaining their devotion to Orunmila, creating a dual practice that ensures survival.",
    descriptionYoruba: "Nígbà tí àwọn aṣàkóso Yúróòpù àti àwọn ọmọlẹ́ṣin Kristéènì gbìyànjú láti pa ẹ̀sìn Yorùbá run, tí wọ́n ń pè é ní 'ẹ̀sìn àìmọ́' àti 'ìbọ̀rìṣà eṣù,' àwọn ọmọ òtítọ́ Òrúnmìlà kọ̀ láti fi baba ẹ̀mí wọn sílẹ̀. Àwọn Babaláwo onígboyà bí i àwọn baba Chief Ifayemi Elebuibon gba ewu ẹ̀wọ̀n àti ikú láti ṣe Ifá ní ìkọ̀kọ̀. Wọ́n fi àwọn ohun mímọ́ pamọ́, wọ́n ṣe àwọn àjọ́dún nínú igbó òkèrè, wọ́n sì lo èdè àmì láti tọ́jú ẹ̀kọ́ Òrúnmìlà.",
    significance: "This era creates the sacred heroes of Yoruba tradition who prove that no earthly power can destroy the bond between Orunmila and his people.",
    significanceYoruba: "Àkókò yìí ṣẹ̀dá àwọn akọni mímọ́ àṣà Yorùbá tí wọ́n fihàn pé kò sí agbára ayé tí ó lè ba ìdàpọ̀ láàrin Òrúnmìlà àti àwọn ènìyàn rẹ̀ jẹ́.",
    icon: Users,
    category: "preservation"
  },
  {
    id: "8",
    era: "The New Dawn of Orunmila",
    eraYoruba: "Àfẹ̀mọ́júmọ́ Tuntun Òrúnmìlà",
    period: "Modern Era (1960-Present)",
    periodYoruba: "Àkókò Ìgbàlódé (1960-Báyìí)",
    title: "Orunmila's Global Awakening: The Return of Sacred Wisdom to the World",
    titleYoruba: "Ìjí Òrúnmìlà Lágbàáyé: Ìpadàbọ̀ Ọgbọ́n Mímọ́ Sí Àgbáyé",
    description: "In this blessed era, Orunmila's wisdom breaks free from centuries of suppression and emerges into global recognition. Yoruba communities worldwide proudly reclaim their spiritual heritage. Great Babalawos like Chief Ifayemi Elebuibon, Wande Abimbola, and others become international ambassadors of Yoruba tradition. Universities study Ifá as sophisticated philosophy, governments recognize traditional Yoruba religion, and Orunmila's temples rise in America, Europe, Asia, and beyond. Young Yoruba people rediscover their ancestral wisdom with pride, while people of all races seek Orunmila's guidance. This marks the fulfillment of ancient prophecy - that Orunmila's light would shine across all nations.",
    descriptionYoruba: "Ní àkókò ìbùkún yìí, ọgbọ́n Òrúnmìlà yọ́ kúrò nínú ìpamọ́ ọ̀pọ̀lọpọ̀ ọdún ó sì farahàn sí ìgbà mímọ̀ lágbàáyé. Àwọn àgbègbè Yorùbá káríayé ń gba ọ̀rọ̀ ẹ̀mí wọn padà pẹ̀lú ìgbéraga. Àwọn Babaláwo ńlá bí i Chief Ifayemi Elebuibon, Wande Abimbola, àti àwọn mìíràn di aṣojú àgbáyé àṣà Yorùbá. Àwọn yunifásítì ń kẹ́kọ̀ọ́ Ifá gẹ́gẹ́ bí ìmọ̀-ọgbọ́n jinlẹ̀, àwọn ìjọba ń mọ ẹ̀sìn ìbílẹ̀ Yorùbá, àwọn ilé Òrúnmìlà sì ń dìde ní Amẹ́ríkà, Yúróòpù, Éṣíà, àti ibòmíràn. Àwọn ọ̀dọ́ Yorùbá ń tún ọgbọ́n àwọn baba ńlá wọn wá pẹ̀lú ìgbéraga.",
    significance: "This era fulfills Orunmila's eternal promise that his wisdom would eventually reach every corner of the earth, uniting all humanity under divine guidance.",
    significanceYoruba: "Àkókò yìí mú ìlérí láéláé Òrúnmìlà ṣẹ pé ọgbọ́n rẹ̀ yóò dé gbogbo igun ayé, tí yóò sì so gbogbo ọmọ ènìyàn pọ̀ lábẹ́ ìtọ́nisọ́nà ọlọ́run.",
    icon: Star,
    category: "preservation"
  }
];

export default function IfaTimeline() {
  const { language, ts } = useLanguage();

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "origins": return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300";
      case "revelation": return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
      case "expansion": return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
      case "preservation": return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300";
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "origins": return language === "english" ? "Divine Origins" : "Ìpilẹ̀ẹ̀ Ọlọ́run";
      case "revelation": return language === "english" ? "Sacred Revelation" : "Ìfihàn Mímọ́";
      case "expansion": return language === "english" ? "Global Expansion" : "Ìgbòòrò Àgbáyé";
      case "preservation": return language === "english" ? "Cultural Preservation" : "Ìtọ́jú Àṣà";
      default: return "";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 dark:from-amber-950 dark:to-orange-950 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-amber-900 dark:text-amber-100">
              {ts("Sacred History of Òrúnmìlà", "Ìtàn Mímọ́ Òrúnmìlà")}
            </h1>
            <h2 className="text-xl font-semibold text-amber-800 dark:text-amber-200">
              {ts("The Eternal Father of Yoruba Wisdom", "Baba Láéláé Ọgbọ́n Yorùbá")}
            </h2>
          </div>
          
          <div className="bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-900/20 dark:to-orange-900/20 p-6 rounded-lg max-w-3xl mx-auto">
            <p className="text-amber-800 dark:text-amber-200 leading-relaxed">
              {ts(
                "For thousands of years, Òrúnmìlà has been the divine cornerstone of Yoruba civilization. Known as Elérìípín (Witness to Destiny), Agbonnìrègún (One Wiser than Medicine), and Ìbejì-Kejì Olódùmarè (Second to God), he is the sacred teacher who gave the Yoruba people their spiritual identity, cultural foundation, and eternal wisdom through the 256 sacred Odù of Ifá.",
                "Fún ẹgbẹẹgbẹ̀rún ọdún, Òrúnmìlà ti jẹ́ òkúta ìpìlẹ̀ ọlọ́run ọlaju Yorùbá. Tí a mọ̀ sí Elérìípín, Agbonnìrègún, àti Ìbejì-Kejì Olódùmarè, òun ni olùkọ́ mímọ́ tí ó fún àwọn ọmọ Yorùbá ní ìdánimọ̀ ẹ̀mí, ìpìlẹ̀ àṣà, àti ọgbọ́n láéláé nípasẹ̀ Odù mímọ́ 256 ti Ifá."
              )}
            </p>
          </div>
          
          <div className="text-sm text-amber-600 dark:text-amber-400 font-medium">
            {ts(
              "Journey through the divine timeline of Yoruba's greatest spiritual heritage",
              "Ìrìn àjò nípasẹ̀ àtòkọ́tàn ọlọ́run ọ̀rọ̀ ẹ̀mí Yorùbá tó tóbi jùlọ"
            )}
          </div>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-amber-300 dark:bg-amber-700"></div>
          
          <div className="space-y-8">
            {timelineEvents.map((event, index) => {
              const Icon = event.icon;
              return (
                <div key={event.id} className="relative">
                  {/* Timeline dot */}
                  <div className="absolute left-6 w-4 h-4 bg-amber-500 rounded-full border-4 border-white dark:border-amber-950 shadow-lg"></div>
                  
                  {/* Content */}
                  <Card className="ml-16 bg-white dark:bg-amber-950 shadow-lg hover:shadow-xl transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Badge className={getCategoryColor(event.category)}>
                              {getCategoryLabel(event.category)}
                            </Badge>
                            <Icon className="h-5 w-5 text-amber-600" />
                          </div>
                          <CardTitle className="text-amber-900 dark:text-amber-100">
                            {language === "english" ? event.title : event.titleYoruba}
                          </CardTitle>
                          <CardDescription className="text-amber-700 dark:text-amber-300">
                            <Calendar className="h-4 w-4 inline mr-1" />
                            {language === "english" ? event.era : event.eraYoruba} • {language === "english" ? event.period : event.periodYoruba}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-medium text-amber-900 dark:text-amber-100 mb-2">
                          {ts("Historical Account:", "Ìṣẹ̀lẹ̀ Ìtàn:")}
                        </h4>
                        <p className="text-amber-800 dark:text-amber-200 text-sm leading-relaxed">
                          {language === "english" ? event.description : event.descriptionYoruba}
                        </p>
                      </div>

                      <Separator className="bg-amber-200 dark:bg-amber-800" />

                      <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 p-4 rounded-lg">
                        <h4 className="font-medium text-amber-900 dark:text-amber-100 mb-2">
                          {ts("Spiritual Significance:", "Ìṣe Ẹ̀mí:")}
                        </h4>
                        <p className="text-amber-800 dark:text-amber-200 text-sm italic">
                          {language === "english" ? event.significance : event.significanceYoruba}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center py-8 border-t border-amber-200 dark:border-amber-800 space-y-4">
          <div className="bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-900/20 dark:to-orange-900/20 p-6 rounded-lg">
            <Scroll className="h-8 w-8 mx-auto mb-3 text-amber-600" />
            <h3 className="font-bold text-amber-900 dark:text-amber-100 mb-2">
              {ts("The Living Legacy of Òrúnmìlà", "Ọ̀rọ̀ Òrúnmìlà Tó Ń Gbé")}
            </h3>
            <p className="text-amber-800 dark:text-amber-200 text-sm leading-relaxed max-w-2xl mx-auto">
              {ts(
                "This sacred timeline chronicles the eternal bond between Òrúnmìlà and the Yoruba people. From his divine appointment by Olódùmarè to his global recognition today, every era proves that Yoruba tradition is not just history - it is the living foundation of one of humanity's greatest spiritual civilizations. Òrúnmìlà's wisdom continues to guide millions of people worldwide, preserving the sacred heritage of the Yoruba nation for all future generations.",
                "Àtòkọ́tàn mímọ́ yìí ṣe àkọsílẹ̀ ìdàpọ̀ láéláé láàrin Òrúnmìlà àti àwọn ọmọ Yorùbá. Láti ìyàn rẹ̀ láti ọ̀dọ̀ Olódùmarè títí dé ìgbà mímọ̀ rẹ̀ lónìí, gbogbo àkókò ń fihàn pé àṣà Yorùbá kì í ṣe ìtàn lásán - ó jẹ́ ìpìlẹ̀ tó ń gbé ti ọ̀kan lára àwọn ọlaju ẹ̀mí tó tóbi jùlọ ti ọmọ ènìyàn. Ọgbọ́n Òrúnmìlà ń bá àwọn mílíọ̀nù ènìyàn lọ káríayé, tí ó ń tọ́jú ọ̀rọ̀ mímọ́ orílẹ̀-èdè Yorùbá fún gbogbo àwọn ìran tó ń bọ̀."
              )}
            </p>
          </div>
          
          <div className="text-xs text-amber-600 dark:text-amber-400 font-medium">
            {ts(
              "Àṣẹ Òrúnmìlà • May Orunmila's Blessings Be Upon All Who Seek Wisdom",
              "Àṣẹ Òrúnmìlà • Kí Ìbùkún Òrúnmìlà Wà Lórí Gbogbo Ẹni Tó Ń Wá Ọgbọ́n"
            )}
          </div>
        </div>
      </div>
    </div>
  );
}