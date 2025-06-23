import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Volume2 } from "lucide-react";

export default function TestAudio() {
  return (
    <Card className="border-red-500">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-red-600">
          <Volume2 className="h-5 w-5" />
          Audio Test Component
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <p className="font-medium mb-2">Test Audio 1 (Direct MP3):</p>
            <audio controls preload="auto" src="/audio/odu/1.mp3" className="w-full">
              Your browser does not support audio
            </audio>
          </div>
          
          <div>
            <p className="font-medium mb-2">Test Audio 2 (Phonetic):</p>
            <audio controls preload="auto" src="/audio/odu/1_phonetic.mp3" className="w-full">
              Your browser does not support audio
            </audio>
          </div>
          
          <div className="text-xs text-gray-500">
            <p>File paths:</p>
            <p>/audio/odu/1.mp3</p>
            <p>/audio/odu/1_phonetic.mp3</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}