import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function WisdomSection() {
  return (
    <div className="space-y-6 bg-black p-6 rounded-lg">
      <Card className="bg-gray-900 border-l-4 border-l-indigo-400">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-indigo-300">
            🧠 Ancient Knowledge System
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-200 leading-relaxed">
            Ifá is one of the oldest systems of knowledge known to humanity, rooted in the Yoruba civilization of West Africa. 
            Long before written records, Ifá preserved its sacred teachings through oral chants called{" "}
            <span className="text-green-400 font-semibold">Ẹsẹ Ifá</span>, passed from{" "}
            <span className="text-green-400 font-semibold">Babaláwo</span> to apprentice for generations.
          </p>
        </CardContent>
      </Card>

      <Card className="bg-gray-900 border-l-4 border-l-yellow-400">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-yellow-300">
            🕰️ Historical Roots
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
              <span className="text-gray-200">
                Ifá emerged from <span className="text-green-400 font-semibold">Ilé-Ifẹ̀</span>, the spiritual heart of the Yoruba people.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
              <span className="text-gray-200">
                Revealed by <span className="text-green-400 font-semibold">Òrúnmìlà</span>, the Orisha of wisdom and destiny.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
              <span className="text-gray-200">
                Wisdom is encoded in 256 sacred patterns called <span className="text-green-400 font-semibold">Odu Ifá</span>.
              </span>
            </li>
          </ul>
        </CardContent>
      </Card>

      <Card className="bg-gray-900 border-l-4 border-l-green-400">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-green-300">
            🧭 The Wisdom of Ifá
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 mb-4">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <h4 className="font-semibold text-green-300">Ètò àṣẹ</h4>
                <p className="text-gray-300 text-sm">The law of spiritual cause and effect.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <h4 className="font-semibold text-green-300">Ìwà lẹ̀wà</h4>
                <p className="text-gray-300 text-sm">"Character is the ultimate beauty."</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <h4 className="font-semibold text-green-300">àṣẹ</h4>
                <p className="text-gray-300 text-sm">
                  Nature and all things carry <span className="text-green-400 font-semibold">àṣẹ</span> – the sacred force of life.
                </p>
              </div>
            </div>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg border-l-4 border-l-amber-400">
            <blockquote className="italic text-amber-300 text-center">
              "Ìwà Pẹ̀lẹ́ ni oríṣà ń gbà"
            </blockquote>
            <p className="text-amber-400 text-sm text-center mt-2">
              It is good character the Orisha accepts.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gray-900 border-l-4 border-l-purple-400">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-purple-300">
            🔍 Why Ancient Wisdom Still Matters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-200 mb-4">
            Even in today's digital world, Ifá offers answers to timeless questions:
          </p>
          <div className="space-y-3 mb-4">
            {[
              "How should I live?",
              "How do I align with my purpose?", 
              "How can I resolve conflict and restore balance?"
            ].map((question, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-purple-300 font-medium">{question}</span>
              </div>
            ))}
          </div>
          <div className="bg-gray-800 p-4 rounded-lg border-l-4 border-l-blue-400">
            <p className="text-blue-300 text-center">
              Ifá wisdom encourages reflection, connection, and spiritual clarity in everyday life.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}