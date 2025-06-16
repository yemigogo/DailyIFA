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
    period: "Before Creation",
    periodYoruba: "Kí a tó dá àgbáyé",
    title: "Orunmila's Divine Appointment",
    titleYoruba: "Ìyàn Ọlọ́run Òrúnmìlà",
    description: "Orunmila is chosen by Olodumare as the witness to creation and keeper of divine wisdom. He observes the creation of the universe and records the destinies of all beings.",
    descriptionYoruba: "Òrúnmìlà ni Olódùmarè yàn láti jẹ́ ẹlẹ́rìí ìdá àgbáyé àti aṣọ́ ọgbọ́n ọlọ́run. Ó wo ìdá àgbáyé ó sì kọ àwọn orí gbogbo ẹ̀dá sílẹ̀.",
    significance: "This marks the origin of Ifá wisdom and Orunmila's role as the divine messenger between heaven and earth.",
    significanceYoruba: "Èyí jẹ́ àmì ìbẹ̀rẹ̀ ọgbọ́n Ifá àti ipò Òrúnmìlà gẹ́gẹ́ bí ìránṣẹ́ ọlọ́run láàrin ọ̀run àti ayé.",
    icon: Crown,
    category: "origins"
  },
  {
    id: "2",
    era: "The Primordial Era",
    eraYoruba: "Àkókò Àtẹ̀wọ́n",
    period: "Dawn of Humanity",
    periodYoruba: "Àfẹ̀mọ́júmọ́ Ẹ̀dá",
    title: "Descent to Earth and the First Teachings",
    titleYoruba: "Ìsọ̀kalẹ̀ sí Ayé àti Ẹ̀kọ́ Àkọ́kọ́",
    description: "Orunmila descends to earth to guide humanity. He establishes the sacred groves and begins teaching the mysteries of existence, destiny, and divine communication through the Odù.",
    descriptionYoruba: "Òrúnmìlà sọ̀kalẹ̀ wá sí ayé láti darí ọmọ ènìyàn. Ó gbé àwọn igbó mímọ́ sílẹ̀ ó sì bẹ̀rẹ̀ kíkọ́ àwọn àṣírí ìwàláàyè, orí, àti ìbánisọ̀rọ̀ ọlọ́run nípasẹ̀ Odù.",
    significance: "The foundation of Ifá practice on earth and the establishment of the sacred relationship between divinity and humanity.",
    significanceYoruba: "Ìpìlẹ̀ ìṣe Ifá lórí ayé àti ìgbékalẹ̀ àjọṣe mímọ́ láàrin ọlọ́run àti ọmọ ènìyàn.",
    icon: TreePine,
    category: "origins"
  },
  {
    id: "3",
    era: "Age of Revelation",
    eraYoruba: "Àkókò Ìfihàn",
    period: "Sacred Manifestation",
    periodYoruba: "Ìfihàn Mímọ́",
    title: "The Birth of the 16 Meji Odù",
    titleYoruba: "Ìbí Odù Méjì Mẹ́rìndínlógún",
    description: "The sixteen principal Odù Ifá are revealed to humanity. Each Meji represents fundamental forces of existence and contains hundreds of sacred stories, prayers, and spiritual guidance.",
    descriptionYoruba: "Odù Ifá mẹ́rìndínlógún àkọ́kọ́ ni a fihàn fún ọmọ ènìyàn. Odù Méjì kọ̀ọ̀kan dúró fún àwọn agbára ìpìlẹ̀ ìwàláàyè ó sì ní ọ̀pọ̀lọpọ̀ ìtàn mímọ́, àdúrà, àti ìtọ́nisọ́nà ẹ̀mí.",
    significance: "The establishment of the complete Ifá corpus of wisdom, forming the foundation of all spiritual guidance and divination.",
    significanceYoruba: "Ìgbékalẹ̀ àkójọpọ̀ ọgbọ́n Ifá tí ó pé, tí ó jẹ́ ìpìlẹ̀ gbogbo ìtọ́nisọ́nà ẹ̀mí àti ìfá.",
    icon: Star,
    category: "revelation"
  },
  {
    id: "4",
    era: "Ancient Yorubaland",
    eraYoruba: "Ilẹ̀ Yorùbá Àtẹ̀wọ́n",
    period: "Pre-Colonial Era",
    periodYoruba: "Kí Àjèjì Tó Dé",
    title: "Expansion of the 240 Omoluo Odù",
    titleYoruba: "Ìgbòòrò Odù Ọmọlúwo Igba àti Ogójì",
    description: "The complete system of 256 Odù emerges as the 16 Meji combine to create 240 additional Omoluo configurations, completing the sacred mathematical matrix of Ifá wisdom.",
    descriptionYoruba: "Ètò tí ó pé ti Odù 256 jáde bí Méjì mẹ́rìndínlógún ṣe darapọ̀ láti ṣẹ̀dá Ọmọlúwo àfikún 240, tí ó parí àtòpọ̀ ìṣirò mímọ́ ọgbọ́n Ifá.",
    significance: "The mathematical perfection of Ifá is achieved, creating a comprehensive system for understanding all aspects of human experience.",
    significanceYoruba: "Ìpéye ìṣirò Ifá ni a ṣaṣeyọrí, tí ó ṣẹ̀dá ètò tí ó pé fún òye gbogbo ẹ̀yà ìrírí ọmọ ènìyàn.",
    icon: Scroll,
    category: "revelation"
  },
  {
    id: "5",
    era: "Kingdom Era",
    eraYoruba: "Àkókò Ìjọba",
    period: "12th-15th Century",
    periodYoruba: "Ọ̀rúndún Kejìlá sí Kẹ́ẹ̀dógún",
    title: "Ifá in the Yoruba Kingdoms",
    titleYoruba: "Ifá nínú Àwọn Ìjọba Yorùbá",
    description: "Ifá becomes integral to Yoruba kingdoms including Ife, Oyo, and other city-states. Kings consult Ifá for state decisions, and the Babalawos become powerful advisors in royal courts.",
    descriptionYoruba: "Ifá di ẹ̀yà pàtàkì nínú àwọn ìjọba Yorùbá bí i Ifẹ̀, Ọ̀yọ́, àti àwọn ìlú-ìpínlẹ̀ mìíràn. Àwọn ọba máa wá Ifá fún àwọn ìpinnu ìjọba, àwọn Babaláwo sì di àwọn ìmọ̀ràn alágbára ní àgbà ọba.",
    significance: "Ifá wisdom guides the governance and prosperity of Yoruba civilization, establishing its role in statecraft and society.",
    significanceYoruba: "Ọgbọ́n Ifá ń darí ìṣàkóso àti ọrọ̀ ọ̀rọ̀ sísẹ́ ti ọlaju Yorùbá, tí ó fi ipa rẹ̀ múlẹ̀ nínú ìṣàkóso ìjọba àti àwùjọ.",
    icon: Crown,
    category: "expansion"
  },
  {
    id: "6",
    era: "Trans-Atlantic Period",
    eraYoruba: "Àkókò Òkun Átláńtíìkì",
    period: "16th-19th Century",
    periodYoruba: "Ọ̀rúndún Kẹrìndínlógún sí Kọkàndínlógún",
    title: "Ifá Crosses the Ocean",
    titleYoruba: "Ifá Rékọjá Òkun",
    description: "Through the tragic forced migration of enslaved Yoruba people, Ifá wisdom travels to the Americas. Despite oppression, the sacred traditions survive and adapt in Cuba, Brazil, Trinidad, and beyond.",
    descriptionYoruba: "Nípasẹ̀ ìṣíkiri ìfipa lọ àwọn ọmọ Yorùbá tí wọ́n fi bí ẹrú, ọgbọ́n Ifá lọ sí Amẹ́ríkà. Bí ó tilẹ̀ jẹ́ pé wọ́n ń pọ́n wọn lójú, àṣà mímọ́ náà wà láàyè ó sì ṣe ìyípadà ní Kúbà, Brazil, Trinidad, àti ibòmíràn.",
    significance: "Ifá demonstrates its resilience and universality, adapting to new environments while preserving core spiritual truths.",
    significanceYoruba: "Ifá ń fi agbára rẹ̀ àti ọ́fín gbòókì hàn, tí ó ń yípadà sí àyíká tuntun nígbà tí ó ń tọ́jú àwọn òtítọ́ ẹ̀mí àkọ́kọ́.",
    icon: Globe,
    category: "expansion"
  },
  {
    id: "7",
    era: "Colonial Resistance",
    eraYoruba: "Ìtakòrọ̀ Ìṣàkóso Àjèjì",
    period: "19th-20th Century",
    periodYoruba: "Ọ̀rúndún Kọkàndínlógún sí Ogún",
    title: "Preservation Through Persecution",
    titleYoruba: "Ìtọ́jú Nípasẹ̀ Inúnibíni",
    description: "Despite colonial suppression and missionary campaigns against traditional religion, dedicated Babalawos preserve Ifá through secret practice, oral transmission, and community networks.",
    descriptionYoruba: "Bí ó tilẹ̀ jẹ́ pé ìṣàkóso àjèjì àti àwọn ìpolongo ìṣìn àjèjì takò ẹ̀sìn ìbílẹ̀, àwọn Babaláwo tí ó fara balẹ̀ tọ́jú Ifá nípasẹ̀ ìṣe ìkọ̀kọ̀, ìgbéhàn ẹnu, àti àwọn nẹ́tíwọ́kì àgbègbè.",
    significance: "The strength of Ifá tradition and its practitioners ensures survival through the darkest periods of cultural suppression.",
    significanceYoruba: "Agbára àṣà Ifá àti àwọn tí ń ṣe é dájú wíwà láàyè nípasẹ̀ àwọn àkókò tí ó burú jùlọ ti ìpamọ́ àṣà.",
    icon: Users,
    category: "preservation"
  },
  {
    id: "8",
    era: "Modern Renaissance",
    eraYoruba: "Àtúnṣe Ìgbàlódé",
    period: "20th-21st Century",
    periodYoruba: "Ọ̀rúndún Ogún-Mọ́kànlélógún",
    title: "Global Ifá Revival",
    titleYoruba: "Àtúndá Ifá Káríayé",
    description: "Ifá experiences a worldwide renaissance as practitioners openly share wisdom, establish temples globally, and academic institutions begin documenting its philosophical sophistication.",
    descriptionYoruba: "Ifá ń ní àtúndá káríayé bí àwọn tí ń ṣe é ṣe ń pín ọgbọ́n ní gbangba, gbé àwọn tẹ́ńpìlì kalẹ̀ káríayé, àwọn ilé ẹ̀kọ́ gíga sì bẹ̀rẹ̀ kíkọ ìmọ̀-ọgbọ́n rẹ̀ tí ó jinlẹ̀ sílẹ̀.",
    significance: "Ifá wisdom is recognized globally as a sophisticated philosophical and spiritual system, inspiring new generations of practitioners worldwide.",
    significanceYoruba: "Ọgbọ́n Ifá ni wọ́n mọ̀ káríayé gẹ́gẹ́ bí ètò ìmọ̀-ọgbọ́n àti ẹ̀mí tí ó jinlẹ̀, tí ó ń tu àwọn ìran tuntun ti àwọn tí ń ṣe é káríayé.",
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
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-amber-900 dark:text-amber-100">
            {ts("Sacred History of Ifá", "Ìtàn Mímọ́ Ifá")}
          </h1>
          <p className="text-amber-700 dark:text-amber-300">
            {ts(
              "Journey through the divine origins and spiritual lineage of Orunmila's wisdom",
              "Ìrìn àjò nípasẹ̀ ìpilẹ̀ẹ̀ ọlọ́run àti ìdílé ẹ̀mí ọgbọ́n Òrúnmìlà"
            )}
          </p>
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
        <div className="text-center text-sm text-amber-600 dark:text-amber-400 py-6 border-t border-amber-200 dark:border-amber-800">
          <Scroll className="h-5 w-5 mx-auto mb-2" />
          {ts(
            "This sacred timeline preserves the eternal wisdom of Orunmila for all generations",
            "Àtòkọ́tàn mímọ́ yìí tọ́jú ọgbọ́n àìnípẹ̀kun Òrúnmìlà fún gbogbo ìran"
          )}
        </div>
      </div>
    </div>
  );
}