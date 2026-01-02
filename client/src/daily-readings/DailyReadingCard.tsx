import React, { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { Sparkles, BookOpen } from "lucide-react";

// Initialize Supabase
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default function DailyReadingCard({ userId }) {
  const [reading, setReading] = useState(null);
  const [loading, setLoading] = useState(true);

  // Helper: Create a "Daily Seed" so the reading stays the same for 24 hours
  const getDailyIndex = (count, userId) => {
    const today = new Date().toISOString().slice(0, 10); // e.g. "2024-01-02"
    const uniqueString = today + "-" + (userId || "guest");

    // Simple hash function to turn string into a number
    let hash = 0;
    for (let i = 0; i < uniqueString.length; i++) {
      hash = uniqueString.charCodeAt(i) + ((hash << 5) - hash);
    }

    // Ensure positive number and wrap around total count
    return Math.abs(hash) % count;
  };

  useEffect(() => {
    async function fetchReading() {
      // 1. Get total Odus count
      const { count } = await supabase
        .from("odus")
        .select("*", { count: "exact", head: true });

      if (count) {
        // 2. Calculate YOUR unique daily number
        const dailyIndex = getDailyIndex(count, userId);

        // 3. Fetch that specific Odu
        const { data } = await supabase
          .from("odus")
          .select("*")
          .range(dailyIndex, dailyIndex)
          .single();
        setReading(data);
      }
      setLoading(false);
    }

    fetchReading();
  }, [userId]);

  if (loading)
    return (
      <div className="p-8 text-center text-amber-200 animate-pulse">
        Consulting Ifá...
      </div>
    );
  if (!reading)
    return (
      <div className="p-4 text-amber-500">No reading available today.</div>
    );

  return (
    <div className="bg-slate-900 border border-amber-500/30 p-6 rounded-xl shadow-2xl max-w-2xl mx-auto my-6 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 p-4 opacity-10">
        <BookOpen size={100} className="text-amber-500" />
      </div>

      {/* Header */}
      <div className="flex items-center justify-center gap-2 mb-4">
        <Sparkles className="text-amber-400 w-5 h-5" />
        <span className="text-amber-400 text-sm font-semibold uppercase tracking-widest">
          Your Daily Odu
        </span>
        <Sparkles className="text-amber-400 w-5 h-5" />
      </div>

      {/* Title */}
      <h2 className="text-3xl font-bold text-amber-100 text-center mb-2">
        {reading.name}
      </h2>

      {/* Verse */}
      <div className="bg-slate-800/50 p-6 rounded-lg border-l-4 border-amber-500 mb-6 mx-2">
        <p className="text-amber-50/90 italic text-center text-lg leading-relaxed">
          "{reading.verse_text}"
        </p>
      </div>

      {/* Guidance */}
      <div className="bg-amber-900/20 p-4 rounded-lg">
        <h3 className="font-bold text-amber-400 border-b border-amber-500/20 pb-2 mb-2">
          Guidance for Today
        </h3>
        <p className="text-amber-200">{reading.advice_general}</p>
      </div>
    </div>
  );
}
