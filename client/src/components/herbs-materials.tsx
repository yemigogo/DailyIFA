import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Leaf, Gem, Apple } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface HerbsMaterialsProps {
  oduId: number;
  oduName: string;
}

// Traditional herbs, materials, and foods for Odu
const oduHerbsMaterials: { [key: number]: any } = {
  1: { // Ogbe Meji
    herbs: [
      { name: "White Sage", yoruba: "Seji Funfun", properties: "Purification, clarity", usage: "Burn for cleansing" },
      { name: "Frankincense", yoruba: "Kundẹ", properties: "Divine connection", usage: "Burn during prayers" },
      { name: "Basil", yoruba: "Efinrin", properties: "Protection, blessing", usage: "Fresh leaves on altar" }
    ],
    materials: [
      { name: "White Candle", yoruba: "Fìtílà Funfun", purpose: "Light, illumination", ritual: "Light during reading" },
      { name: "Clear Quartz", yoruba: "Òkúta Funfun", purpose: "Amplify energy", ritual: "Hold while meditating" },
      { name: "White Cloth", yoruba: "Aṣọ Funfun", purpose: "Purity", ritual: "Cover altar space" }
    ],
    foods: [
      { name: "Honey", yoruba: "Oyin", purpose: "Sweetness, attraction", offering: "Pour on altar" },
      { name: "Coconut", yoruba: "Àgbọn", purpose: "Clarity, wisdom", offering: "Break and offer" }
    ]
  },
  2: { // Oyeku Meji
    herbs: [
      { name: "Rue", yoruba: "Ewé Ìyàngbà", properties: "Protection from evil", usage: "Carry in pouch" },
      { name: "Black Pepper", yoruba: "Iyẹ̀rẹ̀ Dúdú", properties: "Banishing negativity", usage: "Sprinkle around space" },
      { name: "Garlic", yoruba: "Àyù", properties: "Strong protection", usage: "Hang near entrance" }
    ],
    materials: [
      { name: "Black Candle", yoruba: "Fìtílà Dúdú", purpose: "Absorb negativity", ritual: "Burn for protection" },
      { name: "Black Tourmaline", yoruba: "Òkúta Dúdú", purpose: "Ground negative energy", ritual: "Keep in pocket" },
      { name: "Iron Nail", yoruba: "Irin", purpose: "Deflect harm", ritual: "Drive into ground" }
    ],
    foods: [
      { name: "Black Beans", yoruba: "Ẹ̀wà Dúdú", purpose: "Grounding", offering: "Cook and offer" },
      { name: "Palm Wine", yoruba: "Emu", purpose: "Ancestral connection", offering: "Pour libation" }
    ]
  }
  // Add more Odu as needed
};

export default function HerbsMaterials({ oduId, oduName }: HerbsMaterialsProps) {
  const { ts } = useLanguage();
  const data = oduHerbsMaterials[oduId];

  if (!data) {
    return (
      <Card className="border-amber-200 dark:border-amber-800">
        <CardContent className="p-6 text-center">
          <p className="text-amber-600 dark:text-amber-400">
            {ts("Traditional materials for this Odu coming soon", "Àwọn ohun èlò ìbílẹ̀ fún Odù yìí ń bọ̀")}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-amber-200 dark:border-amber-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-amber-900 dark:text-amber-100">
          <Leaf className="h-5 w-5" />
          {ts("Traditional Sacred Materials", "Àwọn Ohun Èlò Mímọ́ Ìbílẹ̀")}
        </CardTitle>
        <p className="text-sm text-amber-700 dark:text-amber-300">
          {ts("Authentic herbs, materials, and offerings for", "Àwọn ewébẹ, ohun èlò, àti ẹbọ gidi fún")} {oduName}
        </p>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="herbs" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="herbs" className="flex items-center gap-2">
              <Leaf className="h-4 w-4" />
              {ts("Herbs", "Ewébẹ")}
            </TabsTrigger>
            <TabsTrigger value="materials" className="flex items-center gap-2">
              <Gem className="h-4 w-4" />
              {ts("Materials", "Ohun Èlò")}
            </TabsTrigger>
            <TabsTrigger value="foods" className="flex items-center gap-2">
              <Apple className="h-4 w-4" />
              {ts("Offerings", "Ẹbọ")}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="herbs" className="space-y-4">
            <div className="grid gap-4">
              {data.herbs.map((herb: any, index: number) => (
                <Card key={index} className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-semibold text-green-800 dark:text-green-200">
                          {herb.name}
                        </h4>
                        <p className="text-sm text-green-600 dark:text-green-400 italic">
                          {herb.yoruba}
                        </p>
                      </div>
                      <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">
                        <Leaf className="h-3 w-3 mr-1" />
                        {ts("Herb", "Ewé")}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div>
                        <span className="text-xs font-medium text-green-700 dark:text-green-300">
                          {ts("Properties:", "Àwọn Agbára:")}
                        </span>
                        <p className="text-sm text-green-600 dark:text-green-400">{herb.properties}</p>
                      </div>
                      <div>
                        <span className="text-xs font-medium text-green-700 dark:text-green-300">
                          {ts("Usage:", "Bí A Ti Ń Lò:")}
                        </span>
                        <p className="text-sm text-green-600 dark:text-green-400">{herb.usage}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="materials" className="space-y-4">
            <div className="grid gap-4">
              {data.materials.map((material: any, index: number) => (
                <Card key={index} className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-semibold text-blue-800 dark:text-blue-200">
                          {material.name}
                        </h4>
                        <p className="text-sm text-blue-600 dark:text-blue-400 italic">
                          {material.yoruba}
                        </p>
                      </div>
                      <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100">
                        <Gem className="h-3 w-3 mr-1" />
                        {ts("Material", "Ohun Èlò")}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div>
                        <span className="text-xs font-medium text-blue-700 dark:text-blue-300">
                          {ts("Purpose:", "Ìdí:")}
                        </span>
                        <p className="text-sm text-blue-600 dark:text-blue-400">{material.purpose}</p>
                      </div>
                      <div>
                        <span className="text-xs font-medium text-blue-700 dark:text-blue-300">
                          {ts("Ritual Use:", "Ìlò Nínú Ẹbọ:")}
                        </span>
                        <p className="text-sm text-blue-600 dark:text-blue-400">{material.ritual}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="foods" className="space-y-4">
            <div className="grid gap-4">
              {data.foods.map((food: any, index: number) => (
                <Card key={index} className="bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-semibold text-orange-800 dark:text-orange-200">
                          {food.name}
                        </h4>
                        <p className="text-sm text-orange-600 dark:text-orange-400 italic">
                          {food.yoruba}
                        </p>
                      </div>
                      <Badge variant="secondary" className="bg-orange-100 text-orange-800 dark:bg-orange-800 dark:text-orange-100">
                        <Apple className="h-3 w-3 mr-1" />
                        {ts("Offering", "Ẹbọ")}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div>
                        <span className="text-xs font-medium text-orange-700 dark:text-orange-300">
                          {ts("Purpose:", "Ìdí:")}
                        </span>
                        <p className="text-sm text-orange-600 dark:text-orange-400">{food.purpose}</p>
                      </div>
                      <div>
                        <span className="text-xs font-medium text-orange-700 dark:text-orange-300">
                          {ts("How to Offer:", "Bí A Ti Ń Rú:")}
                        </span>
                        <p className="text-sm text-orange-600 dark:text-orange-400">{food.offering}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-700">
          <p className="text-xs text-amber-700 dark:text-amber-300 font-medium">
            {ts(
              "⚠️ Important: These are traditional practices for educational purposes. Always consult with a qualified Babalawo before using herbs or performing rituals.",
              "⚠️ Pàtàkì: Àwọn wọ̀nyí jẹ́ àṣà ìbílẹ̀ fún ẹ̀kọ́. Bá Babáláwo tó yẹ gbà ìmọ̀ràn ṣáájú lílo ewébẹ tàbí ṣíṣe ẹbọ."
            )}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}